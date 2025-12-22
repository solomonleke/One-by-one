import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import MainLayout from '../../DashboardLayout'
import { Text, Flex, HStack, VStack, Box, Center, Progress, Icon, Avatar, Image } from '@chakra-ui/react'
import { Tooltip as Tooltips } from '@chakra-ui/react';
import DashboardCard from "../../Components/DashboardCard"
import Preloader from "../../Components/Preloader"
import Button from "../../Components/Button"
import { HiOutlineUsers } from 'react-icons/hi'
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { MdOutlineCancel } from 'react-icons/md'
import { IoInformationCircleOutline } from "react-icons/io5";
import { GoArrowDown } from "react-icons/go";
import { Bar, BarChart, CartesianGrid, Label, Legend, Line, ResponsiveContainer, Pie, PieChart, Tooltip, XAxis, YAxis, LineChart } from 'recharts'
import TableRow from "../../Components/TableRow"
import { CgSearch } from "react-icons/cg";
import { IoFilter } from "react-icons/io5";
import { FaUserGraduate } from "react-icons/fa6";
import { TbCurrencyNaira } from "react-icons/tb";
import { FaSchoolFlag } from "react-icons/fa6";
import { FaGoogleScholar } from "react-icons/fa6";
import { FaCheck } from "react-icons/fa6";
import { IoIosArrowRoundForward } from "react-icons/io";
import { IoCloseOutline } from "react-icons/io5";
import { LiaAngleDoubleRightSolid } from "react-icons/lia";
import { RxInfoCircled } from "react-icons/rx";
import { configuration } from "../../Utils/Helpers";

import scholarshipImage from "../../Asset/image1.png"
import scholarshipImage2 from "../../Asset/Image2.png"
import scholarshipImage3 from "../../Asset/Image3.png"
import scholarshipImage4 from "../../Asset/Image4.png"
import scholarshipImage5 from "../../Asset/Image5.png"
import scholarshipImage6 from "../../Asset/Image6.png"
import scholarshipImage7 from "../../Asset/Image7.png"
import scholarshipImage8 from "../../Asset/goldIcon.svg"
import { ApproveSchoolApi } from "../../Utils/ApiCall";
import { ApproveStudentApi } from "../../Utils/ApiCall";
import ShowToast from '../../Components/ToastNotification';
import { GetAllScholarshipSchoolsApi } from "../../Utils/ApiCall";
import { GetAllScholarshipStudentsApi } from "../../Utils/ApiCall";
import { GetScholarshipDashboardDetailsApi } from "../../Utils/ApiCall";
import { GetScholarshipDashboardGraphDataApi } from "../../Utils/ApiCall";


import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from '@chakra-ui/react'

export default function ScholarshipAdmin() {

  const router = useNavigate();
  const [loadingSchoolId, setLoadingSchoolId] = useState(null);
  const [buttonType, setButtonType] = useState(null); // "APPROVED" | "REJECTED"


  const schools = [
    {
      name: "Legendary Scholars Academy", email: "legendaryscholarsacademy@gmail.com",
      Image: scholarshipImage
    },
    { name: "Queen's College", email: "QueenSCollege@gmail.com", Image: scholarshipImage2 },
    { name: "Federal Government College", email: "FederalGovernmentCollege@gmail.com", Image: scholarshipImage3 },
    { name: "Mayflower School", email: "MayflowerSchool@gmail.com", Image: scholarshipImage4 },
    { name: "Chrisland College", email: "ChrislandCollege@gmail.com", Image: scholarshipImage5 },
    { name: "Christ the King College", email: "ChristtheKingCollege@gmail.com", Image: scholarshipImage6 },
    { name: "Corona Secondary School", email: "CoronaSecondarySchool@gmail.com", Image: scholarshipImage7 }
  ];

  const students = [
    { name: "Philip Amaki", email: "philipamaki@gmail.com" },
    { name: "David Folarin", email: "DavidFolarin@gmail.com" },
    { name: "Timothy Salisu", email: "TimothySalisu@gmail.com" },
    { name: "Peter Usman", email: "PeterUsman@gmail.com" },
    { name: "Esther Wakili", email: "EstherWakili@gmail.com" },
    { name: "Simon Ogan", email: "SimonOgan@gmail.com" },
    { name: "Philip Amakiri", email: "PhilipAmakiri@gmail.com" }
  ];

  const [studentGraphData, setStudentGraphData] = useState([]);
  const [schoolGraphData, setSchoolGraphData] = useState([]);

  const GetScholarshipDashboardGraphDetails = async () => {

    try {
      const response = await GetScholarshipDashboardGraphDataApi()

      console.log("getScholarshipDashboardGraphDetails", response)
      if (response.status === 200) {
        setStudentGraphData(response.data.data.StudentGraphData[0])
        setSchoolGraphData(response.data.data.SchoolGraphData[0])
      }

    } catch (e) {

      console.log("error", e.message)
    }

  }

  useEffect(() => {

    GetScholarshipDashboardGraphDetails()

  }, []);

  const [scholarshipDetails, setScholarshipDetails] = useState({});

  const GetScholarshipDashboardDetails = async () => {

    try {
      const response = await GetScholarshipDashboardDetailsApi()

      console.log("getScholarshipDashboardDetails", response)

      setScholarshipDetails(response.data.data)


    } catch (e) {

      console.log("error", e.message)
    }

  }


  useEffect(() => {
    GetScholarshipDashboardDetails()

    // var reloadCount = localStorage.getItem("reloadCount");
    // if(!reloadCount){
    //   localStorage.setItem('reloadCount', + parseInt(1))

    // }
    // if(reloadCount < 2) {
    //   localStorage.setItem('reloadCount', parseInt(reloadCount) + 1);
    //   setTimeout(() =>
    //   window.location.reload(1), 2000)
    // } else {
    //   localStorage.removeItem('reloadCount');
    // }

  }, []);

  const data = [
    { name: "JAN", Schools: schoolGraphData, Students: studentGraphData, Funds: scholarshipDetails.fundRequested },
    { name: "FEB", Schools: schoolGraphData, Students: studentGraphData, Funds: scholarshipDetails.fundRequested },
    { name: "MAR", Schools: schoolGraphData, Students: studentGraphData, Funds: scholarshipDetails.fundRequested },
    { name: "APR", Schools: schoolGraphData, Students: studentGraphData, Funds: scholarshipDetails.fundRequested },
    { name: "MAY", Schools: schoolGraphData, Students: studentGraphData, Funds: scholarshipDetails.fundRequested },
    { name: "JUN", Schools: schoolGraphData, Students: studentGraphData, Funds: scholarshipDetails.fundRequested },
    { name: "JUL", Schools: schoolGraphData, Students: studentGraphData, Funds: scholarshipDetails.fundRequested },
    { name: "AUG", Schools: schoolGraphData, Students: studentGraphData, Funds: scholarshipDetails.fundRequested },
    { name: "SEP", Schools: schoolGraphData, Students: studentGraphData, Funds: scholarshipDetails.fundRequested },
    { name: "OCT", Schools: schoolGraphData, Students: studentGraphData, Funds: scholarshipDetails.fundRequested },
    { name: "NOV", Schools: schoolGraphData, Students: studentGraphData, Funds: scholarshipDetails.fundRequested },
    { name: "DEC", Schools: schoolGraphData, Students: studentGraphData, Funds: scholarshipDetails.fundRequested },

  ];

  const [showToast, setShowToast] = useState({ show: false, message: '', status: '' });
  const [SchoolMainData, setSchoolMainData] = useState([]);
  const [StudentMainData, setStudentMainData] = useState([]);
  const [FilteredData, setFilteredData] = useState(null);
  const [SearchInput, setSearchInput] = useState("");
  const [ByDate, setByDate] = useState(false);
  const [StartDate, setStartDate] = useState("");
  const [EndDate, setEndDate] = useState("");
  const [CurrentPage, setCurrentPage] = useState(1);
  const [PostPerPage, setPostPerPage] = useState(configuration.sizePerPage);
  const [TotalPage, setTotalPage] = useState("");
  const [status, setStatus] = useState("PENDING");
  const [essayPercentage, setEssayPercentage] = useState(0);
  const [note, setNote] = useState("");
  const [search, setSearch] = useState("");


  const GetAllScholarshipSchool = async () => {
    try {
      const result = await GetAllScholarshipSchoolsApi(CurrentPage, PostPerPage, status);
      console.log("getallscholarshipSchools", result);

      if (result.status === 200 && result.data.data?.schools?.length > 0) {
        setSchoolMainData(result.data.data.schools);
        setTotalPage(result.data.data.totalPages);
      } else {
        setSchoolMainData([]);
      }
    } catch (e) {
      console.log("error", e.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    GetAllScholarshipSchool();
  }, [CurrentPage, PostPerPage, status]);


  const GetAllScholarshipStudent = async () => {

    try {
      const result = await GetAllScholarshipStudentsApi(CurrentPage, PostPerPage, status, search)

      console.log("getallscholarshipStudents", result)

      if (result.status === 200 && result.data.data?.students?.length > 0) {
        setStudentMainData(result.data.data.students);
        setTotalPage(result.data.data.totalPages);
      } else {
        setStudentMainData([]);
      }
    } catch (e) {

      console.log("error", e.message)
    } finally {
      setIsLoading(false);
    }

  }


  useEffect(() => {
    GetAllScholarshipStudent();
  }, [CurrentPage, PostPerPage, status, search]);

  const [userName, setUserName] = useState('');
  const [userImage, setUserImage] = useState('');
  const [loading, setLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(true);





  const { schoolId } = useParams()
  const { student_id } = useParams()

  const ApproveSchool = async (school_id, status) => {
    try {
      setLoadingSchoolId(school_id);
      setButtonType(status);
  
      const result = await ApproveStudentApi(school_id, { status, essayPercentage });
  
      if (result.status === 200) {
        setShowToast({
          show: true,
          message: status === "APPROVED" ? "Approved School!" : "Rejected School!",
          status: status === "APPROVED" ? "success" : "error",
        });
        setTimeout(() => setShowToast({ show: false }), 3000);
        GetAllScholarshipStudent();
      }
    } catch (e) {
      setShowToast({
        show: true,
        message: e.response?.data?.message || e.message || "Error Approving Student!",
        status: "error",
      });
      setTimeout(() => setShowToast({ show: false }), 3000);
    } finally {
      setLoadingSchoolId(null);
      setButtonType(null);
    }
  };
  


  const ApproveStudent = async (student_id, status) => {
    setLoading(true);
    try {
      const result = await ApproveStudentApi(student_id, { status, essayPercentage })

      console.log("approved student", result)

      if (result.status === 200) {
        setShowToast({
          show: true,
          message: "Approved Student!!!",
          status: "success",
        });
        GetAllScholarshipStudent();
      }
    } catch (e) {
      setShowToast({
        show: true,
        message: e.response?.data?.message || e.message || "Error Approving Student!!!",
        status: "error",
      });
      console.log("error", e.message)
    } finally {
      setLoading(false);
    }
  }


  useEffect(() => {
    //   var reloadCount = localStorage.getItem("reloadCount");
    //   if (!reloadCount) {
    //     localStorage.setItem('reloadCount', + parseInt(1))

    //   }
    //   if (reloadCount < 2) {
    //     localStorage.setItem('reloadCount', parseInt(reloadCount) + 1);
    //     setTimeout(() =>
    //       window.location.reload(1), 2000)
    //   } else {
    //     localStorage.removeItem('reloadCount');
    //   }

    const storedName = JSON.parse(localStorage.getItem('onlineUser'));
    if (storedName) {
      setUserName(`${storedName.firstName}`);
      setUserImage(storedName.profileImg);
    }
  }, []);





  return (
    <MainLayout userName={userName} userImage={userImage}>
      {
        isLoading && <Preloader />
      }
      {showToast.show && (
        <ShowToast message={showToast.message} status={showToast.status} show={showToast.show} duration={showToast.duration} />
      )}

      <Text fontSize={"21px"} lineHeight={"25.41px"} fontWeight="700">Welcome Back, {userName || "User"}!</Text>
      <Text mt="9px" color={"#686C75"} fontWeight={"400"} fontSize={"15px"} mb={5} gap={"9px"} lineHeight={"24px"}>Review and approve schools, students, and fund requests to drive meaningful impact.</Text>

      <Flex
        w="100%"
        maxW="1125px"
        background="linear-gradient(90.1deg, #18AB91 0.09%, #BCDC60 60.15%, #FFBC4F 101.02%)"
        borderRadius="10px"
        p={{ base: "12px", md: "13px 19px" }}
        justifyContent="space-between"
        gap={{ base: 4, md: 0 }}
        flexDir={{ base: "column", md: "row" }}
        align={{ base: "stretch", md: "center" }}
        position="relative"
        overflow="hidden"
      >
        {/* Left Section */}
        <Box w="100%" maxW={{ md: "356px" }}>
          <Flex align="center" mb={2}>
            <Icon as={FaGoogleScholar} color="yellow.400" boxSize={{ base: 4, md: 5 }} mr={2} />
            <Text
              fontWeight="600"
              fontSize={{ base: "16px", md: "18px" }}
              lineHeight="24px"
              textAlign="left"
              color="#FFFFFF"
            >
              Scholarship Admin Leaderboard
            </Text>
          </Flex>

          <Box
            bg="#03493D54"
            cursor="pointer"
            w="100%"
            maxW={{ base: "100%", md: "356px" }}
            borderRadius="6px"
            p="6px"
          >
            <Flex align="center" justify="space-between">
              <Progress
                value={80}
                height="6px"
                w={{ base: "65%", md: "199px" }}
                borderRadius="2px"
                sx={{
                  "& > div": { backgroundColor: "#42ED9B" },
                  backgroundColor: "#FAFFFD4A",
                }}
              />
              <Text
                fontSize={{ base: "12px", md: "14px" }}
                color="#ffffff"
                textAlign="center"
                fontWeight="500"
              >
                5 Schools to Rank #3
              </Text>
            </Flex>
          </Box>
        </Box>

        {/* Right Section */}
        <Box
          bg="#FFFFFF"
          w="100%"
          maxW={{ base: "100%", md: "364px" }}
          borderRadius="7px"
          mt={{ base: 4, md: "14px" }}
          p={{ base: "8px 10px", md: "8px 13px" }}
        >
          <Flex
            align="center"
            flexWrap="wrap"
            justify={{ base: "space-between", md: "flex-start" }}
            gap={{ base: 2, md: "11px" }}
          >
            <Image
              src={scholarshipImage8}
              w={{ base: "20px", md: "23.59px" }}
              h={{ base: "28px", md: "33px" }}
              alt="Scholarship"
            />
            <Text
              fontSize={{ base: "14px", md: "15px" }}
              color="#194B33"
              fontWeight="600"
              letterSpacing="-0.03em"
            >
              Rank:
              <Text as="span" ml="4px">
                #4
              </Text>
            </Text>

            <Box
              display={{ base: "none", md: "block" }}
              border="1px solid #194B3380"
              h="11.5px"
            />

            <Text
              fontSize={{ base: "14px", md: "15px" }}
              color="#194B33"
              fontWeight="600"
              letterSpacing="-0.03em"
            >
              Schools Verified:
              <Text as="span" ml="4px">
                24
              </Text>
            </Text>

            <Box
              display={{ base: "none", md: "block" }}
              border="1px solid #194B3380"
              h="11.5px"
            />

            <Flex
              align="center"
              gap="4px"
              cursor="pointer"
              onClick={() => router("/scholarship-admin/scholarship-admin-leaderboard")}
            >
              <Text
                fontSize={{ base: "13px", md: "14px" }}
                fontWeight="600"
                color="#194B33"
                lineHeight="16.94px"
              >
                View
              </Text>
              <Icon
                as={LiaAngleDoubleRightSolid}
                color="#194B33"
                boxSize={{ base: 4, md: 5 }}
              />
            </Flex>
          </Flex>
        </Box>
      </Flex>


      <Flex mt="27px" justifyContent="space-between" flexWrap="wrap">
        <DashboardCard
          icon={<FaSchoolFlag />}
          title='approved schools'
          value={scholarshipDetails.schoolCount}
          w="32.5%"
          navigateTo="/scholarship-admin/schools"

        />
        <DashboardCard
          icon={<FaUserGraduate />}
          title='approved students'
          value={scholarshipDetails.studentCount}
          w="32.5%"
          navigateTo="/scholarship-admin/students"

        />
        <DashboardCard
          icon={<TbCurrencyNaira />}
          title='funds requested'
          value={scholarshipDetails.fundRequested}
          w="32.5%"
        />


      </Flex>


      <Flex mt="15px" mb={4} justifyContent="space-between" flexWrap="wrap">
        <Box
          w={{ base: "100%", md: "60%" }}
          border="1px solid #eaeaea"
          p={{ base: 4, md: 6 }}
          borderRadius="md"
          bg="white"
          boxShadow="sm"
        >
          <Flex justify="space-between" align="center" mb={4} flexWrap="wrap">
            <Text
              letterSpacing="-3%"
              color="#3F4956"
              fontWeight="600"
              fontSize={{ base: "14px", md: "15px" }}
              lineHeight="18px"
            >
              Schools Awaiting Approval
            </Text>
            <Text
              color="#39996B"
              fontSize={{ base: "12px", md: "14px" }}
              fontWeight="600"
              cursor="pointer"
              onClick={() => router("/scholarship-admin/schools")}
            >
              See All
            </Text>
          </Flex>

          <VStack
  borderRadius="10px"
  border="1px solid #EDEFF2"
  spacing={0} // remove extra spacing between rows
  align="stretch"
>
  {SchoolMainData.length > 0 ? (
    SchoolMainData.map((school, index) => (
      <Flex
        key={school.id}
        justify="space-between"
        align={{ base: "flex-start", md: "center" }}
        flexDirection={{ base: "column", md: "row" }}
        p={3}
        borderBottomWidth={index !== SchoolMainData.length - 1 ? 1 : 0}
        borderColor="gray.200"
        gap={2}
      >
        {/* Left: Avatar + Info */}
        <HStack w={{ base: "100%", md: "60%" }} spacing={3}>
          <Avatar
            name={school.school_name}
            src={school.school_logo} // use school logo
            size="sm"
          />
          <Box>
            <Text
              fontSize={{ base: "12px", md: "13px" }}
              fontWeight="500"
              color="#101828"
              noOfLines={1}
            >
              {school.school_name}
            </Text>
            <Text
              fontSize={{ base: "10px", md: "12px" }}
              fontWeight="400"
              color="#667085"
              noOfLines={1}
            >
              {school.principal_email}
            </Text>
          </Box>
        </HStack>

        {/* Right: Buttons */}
        <HStack
          spacing={2}
          mt={{ base: 2, md: 0 }}
          w={{ base: "100%", md: "auto" }}
          justify={{ base: "flex-start", md: "flex-end" }}
        >
          <Button
            size="sm"
            flex={1} // buttons fill width on mobile
            border="1px solid #39996B"
            px={3}
            boxShadow="0px 0px 0px 1px #9CA7AD2B"
            rightIcon={<IoCloseOutline />}
            onClick={() => ApproveSchool(school.id, "REJECTED")}
            isLoading={loadingSchoolId === school.id && buttonType === "REJECTED"}
          >
            Reject
          </Button>

          <Button
            size="sm"
            flex={1} // buttons fill width on mobile
            border="1px solid #39996B"
            px={3}
            boxShadow="0px 0px 0px 1px #9CA7AD2B"
            rightIcon={<FaCheck />}
            onClick={() => ApproveSchool(school.id, "APPROVED")}
            isLoading={loadingSchoolId === school.id && buttonType === "APPROVED"}
          >
            Approve
          </Button>
        </HStack>
      </Flex>
    ))
  ) : (
    <Text textAlign="center" py={5}>
      No awaiting approval found.
    </Text>
  )}
</VStack>

        </Box>



        <Box w={{ base: "100%", md: "38%" }} p={6} borderRadius={"md"}
          bg={"white"} boxShadow={"sm"}>
          <HStack justifyContent={"space-between"} borderBottomWidth={1} mb={4}>
            <Text letterSpacing="-3%" color="#3F4956" Weight="600" size="15px" lineHeight={"18.15px"}>Pending Students Approval</Text>
            <Text color="#39996B" size="14px" weight="600" cursor="pointer" lineHeight={"22px"} letterSpacing="-1%" onClick={() => {
              router("/scholarship-admin/students")
            }}>See All</Text>
          </HStack>

          <VStack spacing={13} align="stretch">
            {
              StudentMainData.length > 0 ? (
                StudentMainData.map((student, index) => (
                  <Flex
                    key={index}
                    p={"12px"} border=" 1px solid #EDEFF2"
                    gap="0px"
                    cursor="pointer"
                    align="center"
                    opacity="0px"
                    w={{ Fill: "396px" }}
                    justify="space-between" borderRadius="10px" height={{ Fixed: "68px" }}
                    borderBottomWidth={index !== schools.length - 1 ? 1 : 0}
                    borderColor={"gray.200"}
                    onClick={() => {
                      router("/scholarship-admin/students")
                    }}>
                    <HStack onClick={() => {
                      router("/scholarship-admin/students/student-profile")
                    }}>


                      <Avatar size="sm" name={student.full_name} />
                      <Box >
                        <Text fontWeight="500" fontSize="13px" lineHeight="20px" textAlign="left" letterSpacing={"-0.02em"}>{student.full_name}</Text>
                        <Text fontSize={"11px"} opacity="0px" fontWeight={"400"} lineHeight={"20px"} textAlign={"left"} letterSpacing={"-0.02em"} color="gray.500">{student.email}</Text>
                      </Box>
                    </HStack>
                    <Icon as={IoIosArrowRoundForward} cursor={"pointer"} angle="-180 deg" gap="1px" w={{ Hug: "18.01px" }} h={{ Fixed: "33px" }} color=" #101828" />
                  </Flex>
                ))
              ) : (
                <Text textAlign="center" py={5} >
                  No Pending approval found.
                </Text>
              )
            }
          </VStack>
        </Box>
      </Flex>



      <Box p={8} m boxShadow={"md"} borderRadius={"md"} bg={"white"}>
        <Flex justify="space-between" width={{ Fixed: "1,080px" }} gap="0px" opacity="0px" left="18px" top="28px" mb={4} wrap="wrap">
          <Text fontSize="17px" color="#1F2937" letterSpacing={"-0.02em"} fontWeight={600} lineHeight="20.57px" textAlign={"left"} >
            Trends Over Time:  {''} <Text as={"span"} letterSpacing={"-0.02em"} lineHeight={"18.15px"} fontWeight={"500"} fontSize={"15px"} textAlign={"left"}> Schools, Students, And Funds </Text>
            <Icon as={RxInfoCircled} justifyContent={"space-between"} />
          </Text>



          <Flex mb={4} justify={"space-between"} w={{ Hug: "178px" }} gap="9px" opacity="0px" h={{ Hug: "20px" }} maxW={"900px"}>
            <Flex align="center">
              <Box w={"10px"} h={"10px"} bg={"#82ca9d"} mr={2} />
              <Text fontSize={"13px"} fontWeight={"500"} textAlign={"left"} letterSpacing={"-0.02em"} lineHeight={"20px"}>Approved Schools +78%</Text>
            </Flex>
            <Flex align="center">
              <Box w="10px" h="10px" bg="#62b6ff" mr={2} />
              <Text fontSize={"sm"}>Approved Students +21%</Text>
            </Flex>
            <Flex align="center">
              <Box w="10px" h="10px" bg="#ffc658" mr={2} />
              <Text fontSize={"sm"}>Funds Required +42%</Text>
            </Flex>
          </Flex>
        </Flex>
        <ResponsiveContainer width="100%" height={300} ml={12}>
          <LineChart data={data}>
            <CartesianGrid stroke='#ccc' strokeOpacity={0.4} strokeDasharray="3 3" width={"100%"} />
            <XAxis dataKey="name" scale={"point"} padding={{ left: 10, right: 10 }} fontSize="12px" fontWeight="500" />
            <YAxis

            />
            <Tooltip
              contentStyle={{ backgroundColor: "#fff", border: "1px solid #ccc", borderRadius: "8px" }} itemStyle={{ color: "#333" }}
              labelStyle={{ fontWeight: "bold", color: "#666" }} cursor={{ stroke: "#888", strokeWidth: 1 }} />

            <Line
              type="monotone"
              dataKey="Schools"
              stroke="#82ca9d"
              strokeWidth={2}
              dot={false}
              name="Approved Schools" />
            <Line
              type="monotone"
              dataKey="Students"
              stroke="#62b6ff"
              strokeWidth={3}
              dot={false}
              name="Approved Students" />
            <Line
              type="monotone"
              dataKey="Funds"
              stroke="#ffc658"
              strokeWidth={2}
              dot={false}
              name="Funds Required" />


          </LineChart>
        </ResponsiveContainer>
      </Box>
    </MainLayout>


  );
};
