import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
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
import { IoChevronBackOutline, IoCloseOutline } from 'react-icons/io5';
import { BsThreeDots } from 'react-icons/bs';
import { FaSchoolFlag, FaCheck } from "react-icons/fa6";
import { GetScholarshipStudentProfileApi, ApproveStudentApi, UpdateStudentProfile } from '../../Utils/ApiCall';
import Preloader from '../../Components/Preloader';
import ToastNotification from '../../Components/ToastNotification';
import EssayViewerModal from '../../Components/EssayViewerModal';
import ShowToast from '../../Components/ToastNotification';


export default function StudentProfile4() {
  const router = useNavigate();
  const { studentId } = useParams();
  const [studentData, setStudentData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEssayOpen, setIsEssayOpen] = useState(false);
  const [essayPercentage, setEssayPercentage] = useState(0);
  const [buttonLoading, setButtonLoading] = useState(null); // 'APPROVED' or 'REJECTED'


  // const [activeStudentId, setActiveStudentId] = useState(null);


  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const { isOpen: isRemoveModalOpen, onOpen: onOpenRemove, onClose: onCloseRemove } = useDisclosure();
  const [editableStudentData, setEditableStudentData] = useState(null);
  const [showToast, setShowToast] = useState({ show: false, message: '', status: '' });


  const fetchStudentProfile = async () => {
    try {
      const response = await GetScholarshipStudentProfileApi(studentId);

      const data = response?.data || response;
      console.log("Student Profile Data:", data);

      setStudentData({
        ...data,
        subjects: Array.isArray(data.subjects) ? data.subjects : [],
        leadership_roles: Array.isArray(data.leadership_roles) ? data.leadership_roles : [],
        extracurricular_activities: Array.isArray(data.extracurricular_activities) ? data.extracurricular_activities : [],
        field_of_interest: Array.isArray(data.field_of_interest) ? data.field_of_interest : [],
      });
      setEditableStudentData(data);
    } catch (error) {
      console.error("Failed to fetch student profile", error);
    } finally {
      setLoading(false);
    }
  };

  const openEssayModal = () => {
    setIsEssayOpen(true);
  };




  const handleApproveReject = async (verification_status) => {
    try {
      setButtonLoading(verification_status); 
  
      const safeEssayPercentage =
        Number(String(studentData?.essay_rating ?? "0").replace("%", "")) || 0;
  
      const payload = {
        status: verification_status,
        essayPercentage: safeEssayPercentage,
      };
  
      console.log("Approve payload →", payload);
  
      const result = await ApproveStudentApi(studentId, payload);
  
      if (result.status === 200) {
        setShowToast({
          show: true,
          message: `Student ${verification_status === "APPROVED" ? "Approved" : "Rejected"} successfully`,
          status: verification_status === "REJECTED" ? "error" : "success",
        });
  
        setTimeout(() => setShowToast({ show: false }), 3000);
      }
    } catch (e) {
      setShowToast({
        show: true,
        message: e.response?.data?.message || e.message || "Error Approving Student",
        status: "error",
      });
  
      setTimeout(() => setShowToast({ show: false }), 3000);
    } finally {
      setButtonLoading(null);
    }
  };
  




  const handleUpdateStudentProfile = async (updatedFields) => {
    try {
      setLoading(true);
      await UpdateStudentProfile(studentId, updatedFields);
      ToastNotification("Success", "Student profile updated successfully.", "success");
      setEditModalOpen(false);
      fetchStudentProfile(); // Refresh data
    } catch (error) {
      console.error("Update student profile failed", error);
      ToastNotification("Error", error.message || "Failed to update student profile.", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (studentId) fetchStudentProfile();
  }, [studentId]);


  // if (loading) {
  //   return <Preloader />;
  // }

  // if (!studentData) {
  //   return <Text>Student not found.</Text>;
  // }


  return (
    <MainLayout>
      {
        loading && <Preloader />
      }

      {showToast.show && (
        <ShowToast message={showToast.message} status={showToast.status} show={showToast.show} duration={showToast.duration} />
      )}
      {!loading && studentData && (
        <>
          <Flex justifyContent="space-between" flexWrap="wrap" >
            <HStack spacing="10px">
              <Text
                cursor="pointer"
                _hover={{ fontWeight: '500' }}
                color="#626974"
                fontSize="13px"
                fontWeight="400"
                onClick={() => {
                  router('/super-admin-students');
                }}
              >
                Students
              </Text>
              <NextArrow />
              <Text
                cursor="pointer"
                color="#1F2937"
                fontSize="13px"
                fontWeight="500"
                onClick={() => {
                  router('/scholarship-admin/students/student-profile');
                }}
              >
                Student Profile
              </Text>
            </HStack>

            <HStack fontSize="14px" fontWeight="600" spacing="10px" cursor="pointer" onClick={() => router('/scholarship-admin/students')}>
              <IoChevronBackOutline />
              <Text>Back</Text>
            </HStack>
          </Flex>

          <Box bg="#fff" border="1px solid #EFEFEF" mt="12px" py="17px" px={["8px", "8px", "18px", "18px"]} rounded="10px">
            <Flex justifyContent="space-between" flexWrap="wrap" gap="10px">
              <HStack   >
                <Avatar name={studentData.full_name} size="lg" src={studentData.picture} />
                <Stack >
                  <HStack>
                    <Text color="#1F2937" fontSize="25px" fontWeight="700">
                      {studentData.full_name}
                    </Text>
                  </HStack>
                  <Text color="#667085" fontSize="13px" fontWeight="400">
                    {studentData.email}
                  </Text>
                </Stack>
              </HStack>

              {/* <HStack  w={{base:"100%", md: "auto"}} >
                <Button
                  size="7px"
                  border='1px solid #39996B'
                  px={2}
                  boxShadow="0px 0px 0px 1px #9CA7AD2B"
                  rightIcon={<IoCloseOutline />}
                  onClick={() => handleApproveReject('REJECTED')}
                  isLoading={buttonLoading  === 'REJECTED'}
                  loadingText="Rejecting"
                >
                  Reject
                </Button>

                <Button
                  size="5px"
                  
                  border='1px solid #39996B'
                  px={2}
                  boxShadow="0px 0px 0px 1px #9CA7AD2B"
                  rightIcon={<FaCheck />}
                  onClick={() => handleApproveReject('APPROVED')}
                  isLoading={buttonLoading  === 'APPROVED'}
                  loadingText="Approving"
                >
                  Approve
                </Button>
              </HStack> */}

            </Flex>
          </Box>

          <Flex justifyContent={"space-between"} flexWrap="wrap" mt="16px">
            <Box w={["100%", "100%", "40%", "40%"]} >

              <Stack spacing="16px">

                <Box borderColor={"#EDEFF2"} py={"20.5px"} px={["8px", "8px", "17px", "17px"]} borderRadius={"10px"} borderWidth={"1px"}>
                  <ProfileHeading title="Student Details" />



                  <Stack spacing={"14px"} mt="14px">

                    <ProfileCard
                      title="full name"
                      value={studentData.full_name}
                    />

                    <ProfileCard
                      title="date of birth"
                      value={studentData.date_of_birth}
                    />

                    <ProfileCard
                      title="Gender"
                      value={studentData.gender}
                    />


                    <ProfileCard
                      title="phone number"
                      value={studentData.phone_number}
                    />

                    <ProfileCard
                      title="Guardian’s Phone number"
                      value={studentData.guardian_phone_number}
                    />

                    <ProfileCard
                      title="address"
                      value={studentData.address}
                    />

                    <ProfileCard
                      title="city"
                      value={studentData.city}
                    />

                    <ProfileCard
                      title="state"
                      value={studentData.state}
                    />

                    <ProfileCard
                      title="zip code"
                      value={studentData.zip_code}
                    />

                  </Stack>
                </Box>


                <Box borderColor={"#EDEFF2"} py={"20.5px"} px={["8px", "8px", "17px", "17px"]} borderRadius={"10px"} borderWidth={"1px"}>
                  <ProfileHeading title="Academic background" />



                  <Stack spacing={"14px"} mt="14px">
                    <ProfileCard
                      title="department"
                      value={studentData.department}
                    />
                    <ProfileCard
                      title="class level"
                      value={studentData.class_level}
                    />
                    <ProfileCard
                      title="class performance"
                      value={studentData.class_performance}
                    />
                    <ProfileCard
                      title="subject"
                      value={studentData.subjects.join(', ')}
                    />
                  </Stack>
                </Box>
                <Box borderColor={"#EDEFF2"} py={"20.5px"} px={["8px", "8px", "17px", "17px"]} borderRadius={"10px"} borderWidth={"1px"}>
                  <ProfileHeading title="Leadership" />



                  <Stack spacing={"14px"} mt="14px">
                    <ProfileCard
                      title="leadership roles"
                      value={studentData.leadership_roles.join(', ')}
                    />
                    <ProfileCard
                      title="extracurricular activities"
                      value={studentData.extracurricular_activities.join(', ')}
                    />


                  </Stack>
                </Box>
              </Stack>



            </Box>


            <Box w={["100%", "100%", "58%", "58%"]}>


              <Stack spacing="16px">
                <HStack background={"linear-gradient(90deg, #39996B 0%, rgba(57, 153, 107, 0) 100%)"} py={"12px"} px={"16px"} borderRadius={"8px"} justifyContent={"space-between"}>
                  <Text fontWeight={"600"} fontSize={"16px"} lineHeight={"16.94px"} color={"#FFFFFF"}>Essay Score</Text>

                  <Button background="#FFFFFF" w="10%" color="#39996B">
                    {studentData.essay_rating ?? 0}
                  </Button>
                </HStack>

                <HStack bg="#fff" border="1px solid #EFEFEF" rounded={"8px"} py={"12px"} px={"16px"} justifyContent={"space-between"}>
                  <Text textTransform={"capitalize"} fontWeight={"500"} fontSize={"14px"} color={"#2F2F2F"}>intended field of study</Text>
                  <Text textTransform={"capitalize"} fontWeight={"600"} fontSize={"14px"} color={"#2F2F2F"}>{studentData.intended_field_of_study}</Text>
                </HStack>

                <Box borderColor={"#EDEFF2"} p={"20px"} borderRadius={"10px"} borderWidth={"1px"}>
                  <ProfileHeading title="student’s field of interest" />

                  <HStack spacing="13px" mt="18px">
                    {studentData.field_of_interest.map((interest, index) => (
                      <Text key={index} textTransform={"capitalize"} backgroundColor={"#D9FFED"} rounded={"8px"} py={"10px"} px={"16px"} cursor={"pointer"} textColor={"green"} fontWeight={"500"} fontSize={"14px"} letterSpacing={"-1%"} border={"1px solid #39996B7A"}>{interest}</Text>
                    ))}
                  </HStack>

                </Box>


                <Box borderColor={"#EDEFF2"} p={"20px"} borderRadius={"10px"} borderWidth={"1px"}>
                  <ProfileHeading title="Higher education goals" />

                  <Text fontWeight={"400"} mt="18px" fontSize={"13px"} lineHeight={"27px"} color={"#626974"}>{studentData.higher_education_goals}</Text>
                </Box>

                <Box borderColor={"#EDEFF2"} p={"20px"} borderRadius={"10px"} borderWidth={"1px"}>
                  <ProfileHeading title="career goals" />



                  <Text fontWeight={"400"} mt="18px" fontSize={"13px"} lineHeight={"27px"} color={"#626974"}>{studentData.career_goals}</Text>
                </Box>

                <Box borderColor={"#EDEFF2"} p={"20px"} borderRadius={"10px"} borderWidth={"1px"}>

                  <Text fontSize={"14px"} textTransform={"capitalize"} fontWeight={"500"}>student essay</Text>

                  <HStack borderColor={"#EDEFF2"} p={"20px"} borderRadius={"10px"} borderWidth={"1px"}>
                    <HStack>
                      <Pdf />
                      <vStack>
                        <Text color={"#353535"} fontWeight={"500"} fontSize={"13px"} lineHeight={"20px"}>{studentData.full_name}_studentessay.pdf</Text>
                        <Text color={"#989692"} fontSize="11px" fontWeight="400" lineHeight="20px">200KB</Text>
                      </vStack>
                    </HStack>
                    <Spacer />
                    <Text
                      color="#39996B"
                      fontSize="13px"
                      fontWeight="600"
                      cursor="pointer"
                      onClick={openEssayModal}
                    >
                      View
                    </Text>

                  </HStack>
                </Box>



              </Stack>










            </Box>
          </Flex>

          <EssayViewerModal
            isOpen={isEssayOpen}
            onClose={() => setIsEssayOpen(false)}
            essay={studentData.essay}
          />




          <RemoveNotification isOpen={isRemoveModalOpen} onClose={onCloseRemove} />
          {studentData && (
            <ProfileUpdateNotification
              isOpen={isEditModalOpen}
              onClose={() => setEditModalOpen(false)}
              initialData={studentData}
              onUpdate={handleUpdateStudentProfile}
            />
          )}
        </>
      )}
    </MainLayout>
  );
}
