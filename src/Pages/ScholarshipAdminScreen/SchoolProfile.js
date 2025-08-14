import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import MainLayout from '../../DashboardLayout';
import Button from '../../Components/Button';
import ProfileCard from '../../Components/ProfileCard';
import Input from '../../Components/Input';
import ProfileHeading from '../../Components/ProfileHeading';
import RemoveNotification from '../../Components/RemoveNotification';
import ProfileUpdateNotification from '../../Components/ProfileUpdateNotification';
import { ReactComponent as NextArrow } from '../../Asset/nextArrow.svg';
import { ReactComponent as Pdf } from '../../Asset/pdf.svg';
import { Box, HStack, Text, useDisclosure, Stack, Menu, Checkbox, MenuButton, MenuList, MenuItem, Avatar, Spacer, Flex } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { IoChevronBackOutline, IoCloseOutline } from 'react-icons/io5';
import { BsThreeDots } from 'react-icons/bs';
import { FaSchoolFlag, FaCheck } from "react-icons/fa6";
import { GetScholarshipSchoolProfileApi } from '../../Utils/ApiCall';
import Preloader from '../../Components/Preloader';

export default function SchoolProfile() {
    const router = useNavigate();
    const { schoolId } = useParams();
    const [schoolData, setSchoolData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSchoolProfile = async () => {
            try {
                const data = await GetScholarshipSchoolProfileApi(schoolId);
                setSchoolData(data);
            } catch (error) {
                console.error("Failed to fetch school profile", error);
            } finally {
                setLoading(false);
            }
        };

        if (schoolId) {
            fetchSchoolProfile();
        }
    }, [schoolId]);

    if (!schoolData) {
        return <Text>School not found.</Text>;
    }


    return (
        <MainLayout>
              {
      loading && <Preloader  />
    }
                  <Flex justifyContent="space-between" flexWrap="wrap">
        <HStack spacing="10px">
          <Text
            cursor="pointer"
            _hover={{ fontWeight: '500' }}
            color="#626974"
            fontSize="13px"
            fontWeight="400"
            onClick={() => {
              router('/scholarship-admin/schools');
            }}
          >
            Schools
          </Text>
          <NextArrow />
          <Text
            cursor="pointer"
            color="#1F2937"
            fontSize="13px"
            fontWeight="500"
            onClick={() => {
              router('/scholarship-admin/schools/school-profile');
            }}
          >
            School Details
          </Text>
        </HStack>

        <HStack fontSize="14px" fontWeight="600" spacing="10px" cursor="pointer" onClick={() => router('/scholarship-admin/schools')}>
          <IoChevronBackOutline />
          <Text>Back</Text>
        </HStack>
      </Flex>

      <Box bg="#fff" border="1px solid #EFEFEF" mt="12px" py='17px' px={["18px", "18px"]} rounded='10px' display="flex" flexDir="column" gap="20px">
        <HStack borderWidth="1px" rounded="10px" py="16px" px="17px" justifyContent="space-between" flexWrap={["wrap", "wrap", "nowrap", "nowrap"]} gap="10px">
            <HStack>
            <Avatar name={schoolData.school_name}/>
            <Text color="#2F2F2F" fontSize="21px" fontWeight="800">{schoolData.school_name}</Text>
            </HStack>

            <HStack>
                  <Button size="7px" border='1px solid #39996B' px={2} boxShadow="0px, 0px, 0px, 1px #9CA7AD2B" rightIcon={<IoCloseOutline />}>Reject</Button>
                  <Button size="5px" border='1px solid #39996B' px={2} boxShadow="0px, 0px, 0px, 1px #9CA7AD2B" rightIcon={<FaCheck />}>Approve</Button>
                </HStack>
        </HStack>

        <Box
                borderColor={"#EDEFF2"}
                p={"20px"}
                borderRadius={"10px"}
                borderWidth={"1px"}
                backgroundColor={"#fff"}
              >
                <ProfileHeading title="about school" />

                <Text
                  fontWeight={"400"}
                  mt="18px"
                  fontSize={"13px"}
                  lineHeight={"27px"}
                  color={"#626974"}
                >
                  {schoolData.about_school}
                </Text>
              </Box>

              <Stack borderWidth="1px" rounded="10px" px="17px" py="16px">
                <Text color="#2F2F2F" fontSize="14px" fontWeight="500">School Details</Text>

                <Box bg="#EAFEF4" rounded="10px" borderWidth="1px" borderColor="#D9E8E1" display="flex" flexDir="column" gap="50px" p="17px" pt="50px">
                    <HStack flexWrap={["wrap", "wrap", "nowrap", "nowrap"]} gap="50px">
                    <Input label='Email' value={schoolData.school_email} isReadOnly />

                    <Input label='Founding Year' value={schoolData.founding_year} isReadOnly />

                    <Input label='Address' value={schoolData.address} isReadOnly />
                    </HStack>

                    <HStack flexWrap={["wrap", "wrap", "nowrap", "nowrap"]} gap="50px">
                    <Input label='City' value={schoolData.city} isReadOnly />

                    <Input label='State' value={schoolData.state} isReadOnly />

                    <Input label='Zip Code' value={schoolData.zip_code} isReadOnly />
                    </HStack>

                    <HStack flexWrap={["wrap", "wrap", "nowrap", "nowrap"]} gap="50px">
                    <Input label='School Capacity' value={schoolData.school_capacity} isReadOnly />
                    <Input placeholder='190' visibility="hidden"/>
                    <Input placeholder='190' visibility="hidden"/>
                    </HStack>
                </Box>
              </Stack>

              <Stack borderWidth="1px" rounded="10px" px="17px" py="16px">
                <Text color="#2F2F2F" fontSize="14px" fontWeight="500">Principal Information</Text>

                <Box bg="#EAFEF4" rounded="10px" borderWidth="1px" borderColor="#D9E8E1" mb="20px" display="flex" flexDir="column" gap="50px" p="17px" pt="50px">
                    <HStack flexWrap={["wrap", "wrap", "nowrap", "nowrap"]} gap="50px">
                    <Input label='Title' value={schoolData.principal_title} isReadOnly />

                    <Input label='First Name' value={schoolData.principal_first_name} isReadOnly />

                    <Input label='Last Name' value={schoolData.principal_last_name} isReadOnly />
                    </HStack>

                    <HStack flexWrap={["wrap", "wrap", "nowrap", "nowrap"]} gap="50px">
                    <Input label='Email' value={schoolData.principal_email} isReadOnly />

                    <Input label='Phone Number' value={schoolData.principal_phone_number} isReadOnly />

                    <Input placeholder='100001' visibility="hidden"/>
                    </HStack>
                </Box>

                    <hr className="remover"/>

                    <Text color="#626974" fontSize="13px" mt="20px" fontWeight="400">NIN</Text>

                    <HStack borderWidth="1px" rounded="10px" justifyContent="space-between" px="17px" py="16px">
                      <HStack>
                        <Pdf />
                        <Stack>
                          <Text color="#353535" fontSize="13px" fontWeight="500">identify_front.pdf</Text>
                          <Text color="#989692" fontSize="11px" fontWeight="400">200 KB</Text>
                        </Stack>
                      </HStack>

                      <Box bg="#ECFDF3" rounded="19.37px" py="2.42px" pr="9.68px" pl="7.26px">
              <HStack py="2px" rounded="16px" px="6px">
                <Box w="6px" h="6px" bg="#027A48" rounded="full"></Box>
                <Text fontSize="13px" fontWeight="600" color="#027A48">Verified</Text>
              </HStack>
              </Box>
                    </HStack>
              </Stack>

              <Stack borderWidth="1px" spacing="20px" rounded="10px" px="17px" py="24px">
                <Text color="#2F2F2F" fontSize="14px" fontWeight="500">Verify Legal Documents</Text>

              <Box borderWidth="1px" rounded="10px" px="17px" py="8px" pb="16px">
            <Stack spacing="20px">
              <HStack justifyContent="space-between" flexWrap={["wrap", "wrap", "nowrap", "nowrap"]}>
                <Stack>
                <Text color="#626974" fontSize="13px" mt="20px" fontWeight="400">Certificate Of Incorporation</Text>
                <HStack borderWidth="1px" rounded="10px" gap={["40px", "40px", "180px", "180px"]} justifyContent="space-between" px="17px" py="16px" flexWrap={["wrap", "wrap", "nowrap", "nowrap"]}>
                      <HStack>
                        <Pdf />
                        <Stack>
                          <Text color="#353535" fontSize="13px" fontWeight="500">identify_front.pdf</Text>
                          <Text color="#989692" fontSize="11px" fontWeight="400">200 KB</Text>
                        </Stack>
                      </HStack>


                <Text fontSize="13px" fontWeight="600" color="#39996B" cursor="pointer">Click to view</Text>
                    </HStack>
                </Stack>


                <Stack>
                <Text color="#626974" fontSize="13px" mt="20px" fontWeight="400">Tax Identification Number (TIN)</Text>
                <HStack borderWidth="1px" rounded="10px" gap={["40px", "40px", "180px", "180px"]} justifyContent="space-between" px="17px" py="16px" flexWrap={["wrap", "wrap", "nowrap", "nowrap"]}>
                      <HStack>
                        <Pdf />
                        <Stack>
                          <Text color="#353535" fontSize="13px" fontWeight="500">identify_front.pdf</Text>
                          <Text color="#989692" fontSize="11px" fontWeight="400">200 KB</Text>
                        </Stack>
                      </HStack>


                      <Box bg="#FFF2F1" rounded="19.37px" py="2.42px" pr="9.68px" pl="7.26px">
              <HStack py="2px" rounded="16px" px="6px">
                <Box w="6px" h="6px" bg="#FF2020" rounded="full"></Box>
                <Text fontSize="13px" fontWeight="600" color="#FF2020">Missing Info</Text>
              </HStack>
              </Box>
                    </HStack>
                </Stack>
              </HStack>

              <HStack justifyContent="space-between" flexWrap={["wrap", "wrap", "nowrap", "nowrap"]}>
                <Stack>
                <Text color="#626974" fontSize="13px" mt="20px" fontWeight="400">Ministry of Education Approval Letter</Text>
                <HStack borderWidth="1px" rounded="10px" gap={["40px", "40px", "180px", "180px"]} justifyContent="space-between" px="17px" py="16px" flexWrap={["wrap", "wrap", "nowrap", "nowrap"]}>
                      <HStack>
                        <Pdf />
                        <Stack>
                          <Text color="#353535" fontSize="13px" fontWeight="500">identify_front.pdf</Text>
                          <Text color="#989692" fontSize="11px" fontWeight="400">200 KB</Text>
                        </Stack>
                      </HStack>


                <Text fontSize="13px" fontWeight="600" color="#39996B" cursor="pointer">Click to view</Text>
                    </HStack>
                </Stack>


                <Stack>
                <Text color="#626974" fontSize="13px" mt="20px" fontWeight="400">School Registration Certificate</Text>
                <HStack borderWidth="1px" rounded="10px" gap={["40px", "40px", "220px", "220px"]} justifyContent="space-between" px="17px" py="16px" flexWrap={["wrap", "wrap", "nowrap", "nowrap"]}>
                      <HStack>
                        <Pdf />
                        <Stack>
                          <Text color="#353535" fontSize="13px" fontWeight="500">identify_front.pdf</Text>
                          <Text color="#989692" fontSize="11px" fontWeight="400">200 KB</Text>
                        </Stack>
                      </HStack>


                <Text fontSize="13px" fontWeight="600" color="#39996B" cursor="pointer">Click to view</Text>
                    </HStack>
                </Stack>
              </HStack>
            </Stack>
              </Box>
                    
              </Stack>

              <Stack borderWidth="1px" spacing="20px" rounded="10px" px="17px" py="16px">
              <Text color="#2F2F2F" fontSize="14px" fontWeight="500">School Verification Checklist</Text>

              <Stack borderWidth="1px" spacing="15px" rounded="10px" px="17px" py="16px">
                <HStack>
                  <Checkbox></Checkbox>
                  <Text fontSize="13px" fontWeight="400" color="#6B7280">I confirm that I have thoroughly reviewed and verified the school profile.</Text>
                </HStack>

                <HStack>
                  <Checkbox></Checkbox>
                  <Text fontSize="13px" fontWeight="400" color="#6B7280">I confirm that all documents have been reviewed by me.</Text>
                </HStack>

                <HStack>
                  <Checkbox></Checkbox>
                  <Text fontSize="13px" fontWeight="400" color="#6B7280">I have physically inspected the school and verified the principal’s identity.</Text>
                </HStack>
              </Stack>
              </Stack>
       
      </Box>
        </MainLayout>
    );
}
