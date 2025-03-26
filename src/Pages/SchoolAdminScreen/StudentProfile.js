import React, { useState, useEffect } from 'react';
import MainLayout from '../../DashboardLayout';
import Button from '../../Components/Button';
import ProfileCard from '../../Components/ProfileCard';
import Input from '../../Components/Input';
import ProfileHeading from '../../Components/ProfileHeading';
import RemoveNotification from '../../Components/RemoveNotification';
import ProfileUpdateNotification from '../../Components/ProfileUpdateNotification';
import { ReactComponent as NextArrow } from '../../Asset/nextArrow.svg';
import { ReactComponent as Pdf } from '../../Asset/pdf.svg';
import { Box, HStack, Text, useDisclosure, Stack, Menu, MenuButton, MenuList, MenuItem, Avatar, Spacer, Flex, Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton, } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { IoChevronBackOutline } from 'react-icons/io5';
import { BsThreeDots } from 'react-icons/bs';
import { GetStudentProfile } from "../../Utils/ApiCall";
import { useParams } from 'react-router-dom';

export default function StudentProfile() {
  const router = useNavigate();
  const { student_Id } = useParams(); // Get student ID from URL params
  const [studentData, setStudentData] = useState(() => {
    const storedData = localStorage.getItem("studentData");
    return storedData ? JSON.parse(storedData) : { full_name: "", email: "", profileImage: "", dob: "", gender: "", phone_number: "", guardian_phone_number: "", address: "", city: "", state: "", intended_field_of_study: "", class_level: "" , department: "", class_performance: "", subjects: "", scholarship_need: "", student_interest: "", higher_education_goals: "", career_goals: "" };
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editedData, setEditedData] = useState(studentData);
  const { isOpen: isEditModalOpen, onOpen: onOpenEdit, onClose: onCloseEdit } = useDisclosure();
  const { isOpen: isRemoveModalOpen, onOpen: onOpenRemove, onClose: onCloseRemove } = useDisclosure();
  
  useEffect(() => {
    localStorage.setItem("studentData", JSON.stringify(studentData));
  }, [studentData]);

  const handleChange = (e) => {
    setEditedData({ ...editedData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    setStudentData(editedData);
    localStorage.setItem("studentData", JSON.stringify(editedData));
    onCloseEdit();
  };

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
          <Avatar name={studentData?.full_name} size="lg" src={studentData?.profileImage} />
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
                  onClick={onOpenEdit}
                  textTransform="capitalize"
                  fontWeight="500"
                  color="#2F2F2F"
                  _hover={{ color: "#2F2F2F", fontWeight: "400", bg: "#E8FFF4" }}
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
                  _hover={{ color: "#FF4040", fontWeight: "400", bg: "#E8FFF4" }}
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

      {/* Edit Modal */}
      {/* Edit Modal */}
<Modal isOpen={isEditModalOpen} onClose={onCloseEdit}>
  <ModalOverlay />
  <ModalContent minWidth='50%'>
    <ModalHeader>Edit Student Details</ModalHeader>
    <ModalCloseButton />
    <ModalBody>
      <Stack spacing={4}>
        <Input
          name="full_name"
          placeholder="Full Name"
          value={editedData.full_name}
          onChange={handleChange}
        />
        <Input
          name="email"
          placeholder="Email"
          value={editedData.email}
          onChange={handleChange}
        />
        <Input
          name="dob"
          placeholder="Date of birth"
          value={editedData.dob}
          onChange={handleChange}
        />
        <Input
          name="gender"
          placeholder="Gender"
          value={editedData.gender}
          onChange={handleChange}
        />
        <Input
          name="phone_number"
          placeholder="Phone Number"
          value={editedData.phone_number}
          onChange={handleChange}
        />
        <Input
          name="guardian_phone_number"
          placeholder="Guardian Phone Number"
          value={editedData.guardian_phone_number}
          onChange={handleChange}
        />
        <Input
          name="address"
          placeholder="Address"
          value={editedData.address}
          onChange={handleChange}
        />
        <Input
          name="city"
          placeholder="City"
          value={editedData.city}
          onChange={handleChange}
        />
        <Input
          name="state"
          placeholder="State"
          value={editedData.state}
          onChange={handleChange}
        />
        <Input
          name="deparment"
          placeholder="Department"
          value={editedData.department}
          onChange={handleChange}
        />
        <Input
          name="class_level"
          placeholder="Class Level"
          value={editedData.class_level}
          onChange={handleChange}
        />
        <Input
          name="intended_field_of_study"
          placeholder="Intended Field Of Study"
          value={editedData.intended_field_of_study}
          onChange={handleChange}
        />
        <Input
          name="class_performance"
          placeholder="Class Performance"
          value={editedData.class_performance}
          onChange={handleChange}
        />
        <Input
          name="subjects"
          placeholder="Subjects"
          value={editedData.subjects}
          onChange={handleChange}
        />
        <Input
          name="scholarship_need"
          placeholder="Scholarship Need"
          value={editedData.scholarship_need}
          onChange={handleChange}
        />
        <Input
          name="student_interest"
          placeholder="Student Interest"
          value={editedData.student_interest}
          onChange={handleChange}
        />
        <Input
          name="higher_education_goals"
          placeholder="Higher Education Goals"
          value={editedData.higher_education_goals}
          onChange={handleChange}
        />
        <Input
          name="career_goals"
          placeholder="Career Goals"
          value={editedData.career_goals}
          onChange={handleChange}
        />
      </Stack>
      <Flex justify="space-between" align="center" flexWrap='wrap' my='20px'>
      <Button onClick={handleSave} w={['100%','130px','130px','130px']}>
        Save
      </Button>
      <Button onClick={onCloseEdit} w={['100%','130px','130px','130px']}>Cancel</Button>
    </Flex>
    </ModalBody>
    
  </ModalContent>
</Modal>


          <Box mt={["10px", "10px", "0", "0"]}>
            <HStack alignItems="center" spacing="6.32px" borderRadius="16.86px" py="8.45px" px="7.38px">
              <Box pos="relative" top="-1px" rounded="100%" w="8.43px" h="8.43px" bg={studentData?.verification_status === 'PENDING' ? '#FFA30C' : studentData?.verification_status === 'APPROVED' ? '#28A745' : "red"}></Box>
              <Text fontWeight="500" fontSize="12px" color={studentData?.verification_status === 'PENDING' ? '#FFA30C' : studentData?.verification_status === 'APPROVED' ? '#28A745' : "red"}>
                {studentData?.verification_status}
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
                <ProfileCard title="Full Name" value={studentData?.full_name} />
                <ProfileCard title="Date of Birth" value={studentData?.dob} />
                <ProfileCard title="Gender" value={studentData?.gender} />
                <ProfileCard title="Phone Number" value={studentData?.phone_number} />
                <ProfileCard title="Guardian’s Phone Number" value={studentData?.guardian_phone_number || 'N/A'} />
                <ProfileCard title="Address" value={studentData?.address} />
                <ProfileCard title="City" value={studentData?.city} />
                <ProfileCard title="State" value={studentData?.state} />
                <ProfileCard title="Zip Code" value="100101" />
              </Stack>
              </Box>


              <Box borderColor={"#EDEFF2"} py={"20.5px"} px={["8px","8px","17px","17px"]} borderRadius={"10px"} borderWidth={"1px"}>
                <ProfileHeading title="Academic background" />



                <Stack spacing={"14px"} mt="14px">
                  <ProfileCard
                    title="department"
                    value={studentData?.department}
                  />
                  <ProfileCard
                    title="class level"
                    value={studentData?.class_level}
                  />
                  <ProfileCard
                    title="intended field of study"
                    value={studentData?.intended_field_of_study}
                  />
                  <ProfileCard
                    title="class performance"
                    value={studentData?.class_performance}
                  />
                  <ProfileCard
                    title="subject"
                    value={studentData?.subjects}
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

                <Button background='#FFFFFF' w='30%' color='#39996B'>{studentData?.scholarship_need}</Button>
              </HStack>

              <HStack bg="#fff" border="1px solid #EFEFEF" rounded={"8px"} py={"12px"} px={"16px"} justifyContent={"space-between"}>
                <Text textTransform={"capitalize"} fontWeight={"500"} fontSize={"14px"} color={"#2F2F2F"}>intended field of study</Text>
                <Text textTransform={"capitalize"} fontWeight={"600"} fontSize={"14px"} color={"#2F2F2F"}>{studentData?.intended_field_of_study}</Text>
              </HStack>

              <Box borderColor={"#EDEFF2"} p={"20px"} borderRadius={"10px"} borderWidth={"1px"}>
                <ProfileHeading title="student’s field of interest" />

                {
                                            studentData?.student_interest.map((item, i) => (

                                                <HStack key={i} cursor="pointer" px="10px" py="10px" rounded={"25px"} fontSize="13px" _hover={{ bg: "blue.blue500" }} bg="greenn.greenn500">
                                                    <Text color="#fff" fontWeight="500" textTransform="capitalize" >{item}</Text>
                                                    {/* <Box fontSize="20px" color="#fff" onClick={() => removeItem(item)}><IoIosCloseCircle /></Box> */}
                                                </HStack>
                                            ))
                                        }

              </Box>


              <Box borderColor={"#EDEFF2"} p={"20px"} borderRadius={"10px"} borderWidth={"1px"}>
                <ProfileHeading title="Higher education goals" />

                <Text fontWeight={"400"} mt="18px" fontSize={"13px"} lineHeight={"27px"} color={"#626974"}>{studentData?.higher_education_goals}</Text>
              </Box>

              <Box borderColor={"#EDEFF2"} p={"20px"} borderRadius={"10px"} borderWidth={"1px"}>
                <ProfileHeading title="career goals" />



                <Text fontWeight={"400"} mt="18px" fontSize={"13px"} lineHeight={"27px"} color={"#626974"}>{studentData?.career_goals}</Text>
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
      {/* <ProfileUpdateNotification isOpen={isEditModalOpen} onClose={onCloseEdit} /> */}
    </MainLayout>
  );
}
