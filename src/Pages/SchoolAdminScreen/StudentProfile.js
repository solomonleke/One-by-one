import React, { useState, useEffect } from 'react';
import MainLayout from '../../DashboardLayout';
import Button from '../../Components/Button';
import ProfileCard from '../../Components/ProfileCard';
import ProfileHeading from '../../Components/ProfileHeading';
import RemoveNotification from '../../Components/RemoveNotification';
import ProfileUpdateNotification from '../../Components/ProfileUpdateNotification';
import { ReactComponent as NextArrow } from '../../Asset/nextArrow.svg';
import { ReactComponent as Pdf } from '../../Asset/pdf.svg';
import { Box, HStack, Text, useDisclosure, Stack, Menu, MenuButton, MenuList, MenuItem, Avatar, Spacer, Flex } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { IoChevronBackOutline } from 'react-icons/io5';
import { BsThreeDots } from 'react-icons/bs';
import { GetStudentProfile } from "../../Utils/ApiCall";
import { useParams } from 'react-router-dom';

export default function StudentProfile() {
  const router = useNavigate();
  const { student_Id } = useParams(); // Get student ID from URL params
  const [studentData, setStudentData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [isEditModalOpen, setEditModalOpen] = useState(false);  
  const { isOpen: isRemoveModalOpen, onOpen: onOpenRemove, onClose: onCloseRemove } = useDisclosure();

  useEffect(() => {
    const fetchStudentProfile = async () => {
      try {
        const response = await GetStudentProfile(student_Id);
        console.log("response", response);
        setStudentData(response); // Store student data
        setLoading(false);
      } catch (err) {
        setError(err.message || 'Failed to fetch student profile');
        setLoading(false);
      }
    };

    fetchStudentProfile();
  }, [student_Id]);

  if (loading) return <Text>Loading student profile...</Text>;
  if (error) return <Text color="red.500">{error}</Text>;



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
              router('/school-admin/student-management');
            }}
          >
            Student Management
          </Text>
          <NextArrow />
          <Text
            cursor="pointer"
            color="#1F2937"
            fontSize="13px"
            fontWeight="500"
            onClick={() => {
              router('/school-admin/student-management/student-profile');
            }}
          >
            Student Profile
          </Text>
        </HStack>

        <HStack fontSize="14px" fontWeight="600" spacing="10px" cursor="pointer" onClick={() => router('/school-admin/student-management')}>
          <IoChevronBackOutline />
          <Text>Back</Text>
        </HStack>
      </Flex>

      <Box bg="#fff" border="1px solid #EFEFEF" mt="12px" py="17px" px={["8px", "8px", "18px", "18px"]} rounded="10px">
        <Flex justifyContent="space-between" flexWrap="wrap">
          <HStack spacing="14px" w={["100%", "100%", "70%", "70%"]}>
          <Avatar name={studentData?.fullName} size="lg" src={studentData?.profileImage || 'https://bit.ly/sage-adebayo'} />
            <Stack spacing="10px">
              <HStack>
                <Text color="#1F2937" fontSize="25px" fontWeight="700">
                  {studentData?.full_name}
                </Text>
                <Menu isLazy>
                  <MenuButton as={Box}>
                    <Flex justifyContent="center" color="#000000" fontSize="16px">
                      <BsThreeDots />
                    </Flex>
                  </MenuButton>
                  <MenuList>
                    <MenuItem
                      onClick={() => setEditModalOpen(true)}
                      textTransform="capitalize"
                      fontWeight="500"
                      color="#2F2F2F"
                      _hover={{ color: '#2F2F2F', fontWeight: '400', bg: '#E8FFF4' }}
                    >
                      <HStack fontSize="14px">
                        <Text>Edit</Text>
                      </HStack>
                    </MenuItem>
                    <MenuItem
                      onClick={onOpenRemove}
                      textTransform="capitalize"
                      fontWeight="500"
                      color="#FF4040"
                      _hover={{ color: '#FF4040', fontWeight: '400', bg: '#E8FFF4' }}
                    >
                      <HStack fontSize="14px">
                        <Text>Remove Student</Text>
                      </HStack>
                    </MenuItem>
                  </MenuList>
                </Menu>
              </HStack>
              <Text color="#667085" fontSize="13px" fontWeight="400">
              {studentData?.email}
              </Text>
            </Stack>
          </HStack>

          <Box mt={["10px", "10px", "0", "0"]}>
            <HStack alignItems="center" backgroundColor="#FFF5E5" spacing="6.32px" borderRadius="16.86px" py="8.45px" px="7.38px">
              <Box pos="relative" top="-1px" rounded="100%" w="8.43px" h="8.43px" bg="#FFA30C"></Box>
              <Text fontWeight="500" fontSize="12px" color={studentData?.status === 'Pending' ? '#FFA30C' : '#28A745'}>
                {studentData?.status}
              </Text>
            </HStack>
          </Box>
        </Flex>
      </Box>

      <Flex justifyContent={"space-between"} flexWrap="wrap" mt="16px">
          <Box w={["100%", "100%", "40%", "40%"]} >

            <Stack spacing="16px">

              <Box borderColor={"#EDEFF2"} py={"20.5px"} px={["8px","8px","17px","17px"]} borderRadius={"10px"} borderWidth={"1px"}>
                <ProfileHeading title="Student Details" />



                <Stack spacing={"14px"} mt="14px">
                <ProfileCard title="Full Name" value={studentData?.fullName} />
                <ProfileCard title="Date of Birth" value={studentData?.dateOfBirth} />
                <ProfileCard title="Gender" value={studentData?.gender} />
                <ProfileCard title="Phone Number" value={studentData?.phoneNumber} />
                <ProfileCard title="Guardian’s Phone Number" value={studentData?.guardianPhoneNumber || 'N/A'} />
                <ProfileCard title="Address" value={studentData?.address} />
                <ProfileCard title="City" value={studentData?.city} />
                <ProfileCard title="State" value={studentData?.state} />
                <ProfileCard title="Zip Code" value={studentData?.zipCode} />
              </Stack>
              </Box>


              <Box borderColor={"#EDEFF2"} py={"20.5px"} px={["8px","8px","17px","17px"]} borderRadius={"10px"} borderWidth={"1px"}>
                <ProfileHeading title="Academic background" />



                <Stack spacing={"14px"} mt="14px">
                  <ProfileCard
                    title="department"
                    value="science"
                  />
                  <ProfileCard
                    title="class level"
                    value="SS2"
                  />
                  <ProfileCard
                    title="department"
                    value="science"
                  />
                  <ProfileCard
                    title="class performance"
                    value="98% average score"
                  />
                  <ProfileCard
                    title="subject"
                    value="Maths, eng, phy, geo, che, biology"
                  />
                </Stack>
              </Box>
              <Box borderColor={"#EDEFF2"} py={"20.5px"} px={["8px","8px","17px","17px"]} borderRadius={"10px"} borderWidth={"1px"}>
                <ProfileHeading title="Leadership" />



                <Stack spacing={"14px"} mt="14px">
                  <ProfileCard
                    title="leadership roles"
                    value="class captain, health prefect"
                  />
                  <ProfileCard
                    title="extracurricular activities"
                    value="health club"
                  />


                </Stack>
              </Box>
            </Stack>



          </Box>


          <Box w={["100%", "100%", "58%", "58%"]}>


            <Stack spacing="16px">
              <HStack background={"linear-gradient(90deg, #39996B 0%, rgba(57, 153, 107, 0) 100%)"} py={"12px"} px={"16px"} borderRadius={"8px"} justifyContent={"space-between"}>
                <Text fontWeight={"600"} fontSize={"16px"} lineHeight={"16.94px"} color={"#FFFFFF"}>Scholarship Need</Text>

                <Button background='#FFFFFF' w='10%' color='#39996B'>Full Scholarship</Button>
              </HStack>

              <HStack bg="#fff" border="1px solid #EFEFEF" rounded={"8px"} py={"12px"} px={"16px"} justifyContent={"space-between"}>
                <Text textTransform={"capitalize"} fontWeight={"500"} fontSize={"14px"} color={"#2F2F2F"}>intended field of study</Text>
                <Text textTransform={"capitalize"} fontWeight={"600"} fontSize={"14px"} color={"#2F2F2F"}>nursing science</Text>
              </HStack>

              <Box borderColor={"#EDEFF2"} p={"20px"} borderRadius={"10px"} borderWidth={"1px"}>
                <ProfileHeading title="student’s field of interest" />

                <HStack spacing="13px" mt="18px">
                  <Text textTransform={"capitalize"} backgroundColor={"#D9FFED"} rounded={"8px"} py={"10px"} px={"16px"} cursor={"pointer"} textColor={"green"} fontWeight={"500"} fontSize={"14px"} letterSpacing={"-1%"} border={"1px solid #39996B7A"}>health and medicine</Text>
                  <Text textTransform={"capitalize"} backgroundColor={"#D9FFED"} rounded={"8px"} py={"10px"} px={"16px"} cursor={"pointer"} textColor={"green"} fontWeight={"500"} fontSize={"14px"} letterSpacing={"-1%"} border={"1px solid #39996B7A"}>science</Text>
                  <Text textTransform={"capitalize"} backgroundColor={"#D9FFED"} rounded={"8px"} py={"10px"} px={"16px"} cursor={"pointer"} textColor={"green"} fontWeight={"500"} fontSize={"14px"} letterSpacing={"-1%"} border={"1px solid #39996B7A"}>nursing process</Text>
                </HStack>

              </Box>


              <Box borderColor={"#EDEFF2"} p={"20px"} borderRadius={"10px"} borderWidth={"1px"}>
                <ProfileHeading title="Higher education goals" />

                <Text fontWeight={"400"} mt="18px" fontSize={"13px"} lineHeight={"27px"} color={"#626974"}>Legacy Scholars Academy, founded in 2005, is a nurturing educational institution dedicated to empowering students from underserved communities. Our mission is to foster academic excellence, leadership skills, and social responsibility.</Text>
              </Box>

              <Box borderColor={"#EDEFF2"} p={"20px"} borderRadius={"10px"} borderWidth={"1px"}>
                <ProfileHeading title="career goals" />



                <Text fontWeight={"400"} mt="18px" fontSize={"13px"} lineHeight={"27px"} color={"#626974"}>Legacy Scholars Academy, founded in 2005, is a nurturing educational institution dedicated to empowering students from underserved communities. Our mission is to foster academic excellence, leadership skills, and social responsibility.</Text>
              </Box>

              <Box borderColor={"#EDEFF2"} p={"20px"} borderRadius={"10px"} borderWidth={"1px"}>

              <Text fontSize={"14px"} textTransform={"capitalize"} fontWeight={"500"}>student essay</Text>

              <HStack  borderColor={"#EDEFF2"} p={"20px"} borderRadius={"10px"} borderWidth={"1px"}>
                <HStack>
                  <Pdf />
                  <vStack>
                    <Text color={"#353535"} fontWeight={"500"} fontSize={"13px"} lineHeight={"20px"}>davidafolarin_studentessay.pdf</Text>
                    <Text color={"#989692"} fontSize={"11px"} fontWeight={"400"} lineHeight={"20px"}>200KB</Text>
                  </vStack>
                </HStack>
              <Spacer/>
                <Text color={"#39996B"} fontSize={"13px"} fontWeight={"600"} lineHeight={"20px"} cursor={"pointer"}>View</Text>
              </HStack>
            </Box>



            </Stack>





          

           

          
          </Box>
        </Flex>


      <RemoveNotification isOpen={isRemoveModalOpen} onClose={onCloseRemove} />
      <ProfileUpdateNotification isOpen={isEditModalOpen} onClose={() => setEditModalOpen(false)} />
    </MainLayout>
  );
}
