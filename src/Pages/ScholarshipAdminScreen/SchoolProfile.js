import React, { useState } from 'react';
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

export default function SchoolProfile() {
    const router = useNavigate();
    return (
        <MainLayout>
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
        <HStack borderWidth="1px" rounded="10px" py="16px" px="17px" justifyContent="space-between">
            <HStack>
            <Avatar name="Legendary Scholars Academy"/>
            <Text color="#2F2F2F" fontSize="21px" fontWeight="800">Legendary Scholars Academy</Text>
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
                  Legacy Scholars Academy, founded in 2005, is a nurturing
                  educational institution dedicated to empowering students from
                  underserved communities. Our mission is to foster academic
                  excellence, leadership skills, and social responsibility. With
                  a 90% university acceptance rate and top-tier performance in
                  national exams, we prepare students for success and positive
                  community impact.
                </Text>
              </Box>

              <Stack borderWidth="1px" rounded="10px" px="17px" py="16px">
                <Text color="#2F2F2F" fontSize="14px" fontWeight="500">School Details</Text>

                <Box bg="#EAFEF4" rounded="10px" borderWidth="1px" borderColor="#D9E8E1" display="flex" flexDir="column" gap="50px" p="17px" pt="50px">
                    <HStack>
                    <Input label='Email' placeholder='LegacyScholarsAcademy@gmail.com' bg="white" ZIndex="-1"/>

                    <Input label='Founding Year' placeholder='2016'/>

                    <Input label='Address' placeholder='84 Balogun Road, Ago palace way'/>
                    </HStack>

                    <HStack>
                    <Input label='City' placeholder='Okota'/>

                    <Input label='State' placeholder='Lagos'/>

                    <Input label='Zip Code' placeholder='100001'/>
                    </HStack>

                    <HStack>
                    <Input label='School Capacity' placeholder='190'/>
                    <Input placeholder='190' visibility="hidden"/>
                    <Input placeholder='190' visibility="hidden"/>
                    </HStack>
                </Box>
              </Stack>

              <Stack borderWidth="1px" rounded="10px" px="17px" py="16px">
                <Text color="#2F2F2F" fontSize="14px" fontWeight="500">Principal Information</Text>

                <Box bg="#EAFEF4" rounded="10px" borderWidth="1px" borderColor="#D9E8E1" mb="20px" display="flex" flexDir="column" gap="50px" p="17px" pt="50px">
                    <HStack>
                    <Input label='Title' placeholder='Mr.' bg="white"/>

                    <Input label='First Name' placeholder='John'/>

                    <Input label='Last Name' placeholder='Doe'/>
                    </HStack>

                    <HStack>
                    <Input label='Email' placeholder='johndoe@gmail.com'/>

                    <Input label='Phone Number' placeholder='+234000000001'/>

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
              <HStack justifyContent="space-between">
                <Stack>
                <Text color="#626974" fontSize="13px" mt="20px" fontWeight="400">Certificate Of Incorporation</Text>
                <HStack borderWidth="1px" rounded="10px" gap="180px" justifyContent="space-between" px="17px" py="16px">
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
                <HStack borderWidth="1px" rounded="10px" gap="180px" justifyContent="space-between" px="17px" py="16px">
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

              <HStack justifyContent="space-between">
                <Stack>
                <Text color="#626974" fontSize="13px" mt="20px" fontWeight="400">Ministry of Education Approval Letter</Text>
                <HStack borderWidth="1px" rounded="10px" gap="180px" justifyContent="space-between" px="17px" py="16px">
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
                <HStack borderWidth="1px" rounded="10px" gap="220px" justifyContent="space-between" px="17px" py="16px">
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