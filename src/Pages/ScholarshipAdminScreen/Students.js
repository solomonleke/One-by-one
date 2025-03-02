import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import MainLayout from '../../DashboardLayout'
import { Text, Flex, HStack, VStack, Box, Center, Progress, Icon, Avatar, Image } from '@chakra-ui/react'
import { Tooltip as Tooltips } from '@chakra-ui/react';
import DashboardCard from "../../Components/DashboardCard"
import Button from "../../Components/Button"
import Input from "../../Components/Input"
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
import { GetAllScholarshipStudentsApi } from "../../Utils/ApiCall";
import { ApproveStudentApi } from "../../Utils/ApiCall";
import ShowToast from '../../Components/ToastNotification';
import { ReactComponent as Revoke } from "../../Asset/revoke.svg";
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
  Tabs,
  Tab,
  TabList,
  TabIndicator,
  TabPanels,
  TabPanel,
  Switch,
  Stack,
  Spacer,


} from '@chakra-ui/react'
import { ReactComponent as ProfilePicture } from "../../Asset/profileImage.svg"
import { FaCloudUploadAlt, FaSearch } from 'react-icons/fa';
import { ReactComponent as EditIcon } from "../../Asset/editIcon.svg";
import { ReactComponent as Warning } from "../../Asset/warning.svg";
import { ReactComponent as Close } from "../../Asset/close.svg";


export default function Students() {
  const router = useNavigate()
  const pendingData = [
    {
      type: "scholarship-admin-students",
      name: "Philip Amakari",
      email: "PhilipAmakari@gmail.com",
      schoolName: "Legendary Scholars Academy",
      fieldOfStudy: "Mass Communication",
      status: "pending",
      buttonText: "Review",
    },
    {
      type: "scholarship-admin-students",
      name: "David Folarin",
      email: "DavidFolarin@gmail.com",
      schoolName: "Queen's College",
      fieldOfStudy: "Bussiness Administration",
      status: "pending",
      buttonText: "Review",
    },
    {
      type: "scholarship-admin-students",
      name: "Timothy Salisu",
      email: "timothySalisu@gmail.com",
      schoolName: "Federal Government College",
      fieldOfStudy: "Chemical Engineering",
      status: "pending",
      buttonText: "Review",
    },
    {
      type: "scholarship-admin-students",
      name: "Peter Usman",
      email: "PeterUsman@gmail.com",
      schoolName: "Mayflower School",
      fieldOfStudy: "Accounting",
      status: "pending",
      buttonText: "Review",
    },
    {
      type: "scholarship-admin-students",
      name: "Esther Wakili",
      email: "EstherWakili@gmail.com",
      schoolName: "Chrisland College",
      fieldOfStudy: "Banking and Finance",
      status: "pending",
      buttonText: "Review",
    },
    {
      type: "scholarship-admin-students",
      name: "Simon Ogan",
      email: "SimonOgan@gmail.com",
      schoolName: "Christ The King College",
      fieldOfStudy: "Law",
      status: "pending",
      buttonText: "Review",
    },
    {
      type: "scholarship-admin-students",
      name: "Esther Abubakar",
      email: "EstherAbubakar@gmail.com",
      schoolName: "Corona Secondary School",
      fieldOfStudy: "Medicine and Surgery",
      status: "pending",
      buttonText: "Review",
    },
    {
      type: "scholarship-admin-students",
      name: "Philip Ezeoke",
      email: "Philiezeoke@gmail.com",
      schoolName: "Adesoye College",
      fieldOfStudy: "Industrial Chemistry",
      status: "pending",
      buttonText: "Review",
    },
  ]

  const approvedData = [
    {
      type: "scholarship-admin-students",
      name: "Philip Amakari",
      email: "PhilipAmakari@gmail.com",
      schoolName: "Legendary Scholars Academy",
      fieldOfStudy: "Mass Communication",
      status: "approved",
      buttonText: "Reject",
    },
    {
      type: "scholarship-admin-students",
      name: "David Folarin",
      email: "DavidFolarin@gmail.com",
      schoolName: "Queen's College",
      fieldOfStudy: "Bussiness Administration",
      status: "approved",
      buttonText: "Reject",
    },
    {
      type: "scholarship-admin-students",
      name: "Timothy Salisu",
      email: "timothySalisu@gmail.com",
      schoolName: "Federal Government College",
      fieldOfStudy: "Chemical Engineering",
      status: "approved",
      buttonText: "Reject",
    },
    {
      type: "scholarship-admin-students",
      name: "Peter Usman",
      email: "PeterUsman@gmail.com",
      schoolName: "Mayflower School",
      fieldOfStudy: "Accounting",
      status: "approved",
      buttonText: "Reject",
    },
    {
      type: "scholarship-admin-students",
      name: "Esther Wakili",
      email: "EstherWakili@gmail.com",
      schoolName: "Chrisland College",
      fieldOfStudy: "Banking and Finance",
      status: "approved",
      buttonText: "Reject",
    },
    {
      type: "scholarship-admin-students",
      name: "Simon Ogan",
      email: "SimonOgan@gmail.com",
      schoolName: "Christ The King College",
      fieldOfStudy: "Law",
      status: "approved",
      buttonText: "Reject",
    },
    {
      type: "scholarship-admin-students",
      name: "Esther Abubakar",
      email: "EstherAbubakar@gmail.com",
      schoolName: "Corona Secondary School",
      fieldOfStudy: "Medicine and Surgery",
      status: "approved",
      buttonText: "Reject",
    },
    {
      type: "scholarship-admin-students",
      name: "Philip Ezeoke",
      email: "Philiezeoke@gmail.com",
      schoolName: "Adesoye College",
      fieldOfStudy: "Industrial Chemistry",
      status: "approved",
      buttonText: "Reject",
    },
  ]

  const rejectedData = [
    {
      type: "scholarship-admin-students",
      name: "Philip Amakari",
      email: "PhilipAmakari@gmail.com",
      schoolName: "Legendary Scholars Academy",
      fieldOfStudy: "Mass Communication",
      status: "rejected",
      buttonText: "Unreject",
    },
    {
      type: "scholarship-admin-students",
      name: "David Folarin",
      email: "DavidFolarin@gmail.com",
      schoolName: "Queen's College",
      fieldOfStudy: "Bussiness Administration",
      status: "rejected",
      buttonText: "Unreject",
    },
    {
      type: "scholarship-admin-students",
      name: "Timothy Salisu",
      email: "timothySalisu@gmail.com",
      schoolName: "Federal Government College",
      fieldOfStudy: "Chemical Engineering",
      status: "rejected",
      buttonText: "Unreject",
    },
    {
      type: "scholarship-admin-students",
      name: "Peter Usman",
      email: "PeterUsman@gmail.com",
      schoolName: "Mayflower School",
      fieldOfStudy: "Accounting",
      status: "rejected",
      buttonText: "Unreject",
    },
    {
      type: "scholarship-admin-students",
      name: "Esther Wakili",
      email: "EstherWakili@gmail.com",
      schoolName: "Chrisland College",
      fieldOfStudy: "Banking and Finance",
      status: "rejected",
      buttonText: "Unreject",
    },
    {
      type: "scholarship-admin-students",
      name: "Simon Ogan",
      email: "SimonOgan@gmail.com",
      schoolName: "Christ The King College",
      fieldOfStudy: "Law",
      status: "rejected",
      buttonText: "Unreject",
    },
    {
      type: "scholarship-admin-students",
      name: "Esther Abubakar",
      email: "EstherAbubakar@gmail.com",
      schoolName: "Corona Secondary School",
      fieldOfStudy: "Medicine and Surgery",
      status: "rejected",
      buttonText: "Unreject",
    },
    {
      type: "scholarship-admin-students",
      name: "Philip Ezeoke",
      email: "Philiezeoke@gmail.com",
      schoolName: "Adesoye College",
      fieldOfStudy: "Industrial Chemistry",
      status: "rejected",
      buttonText: "Unreject",
    },
  ]

  const [showToast, setShowToast] = useState({ show: false, message: '', status: '' });
  const [loading, setLoading] = useState(false);
  const [MainData, setMainData] = useState([])

  const GetAllScholarshipStudent = async () => {

    try {
      const result = await GetAllScholarshipStudentsApi(pageNo, noItems, status)

      console.log("getallscholarshipStudents", result)

      if (result.status === 200) {
        setMainData(result.data.data.students)
      }
    } catch (e) {

      console.log("error", e.message)
    }

  }


  useEffect(() => {

    GetAllScholarshipStudent()

  }, [noItems]);

  const ApproveStudent = async () => {
    try {
      const result = await ApproveStudentApi(status, essayPercentage)

      console.log("approved student", result)

      if (result.status === 200) {
        setLoading(true);
        setShowToast({
          show: true,
          message: "Approved Student!!!",
          status: "success",
        });
      }
    } catch (e) {
      setShowToast({
        show: true,
        message: "Error Approving Student!!!",
        status: "error",
      });
      console.log("error", e.message)
    } finally {
      setLoading(false);
    }
  }
  return (
    <MainLayout>
      <Text fontSize={"21px"} lineHeight={"25.41px"} fontWeight="700">Students <Box as='span' color="#667085" fontWeight="600" fontSize="19px">({pendingData.length + approvedData.length + rejectedData.length})</Box></Text>
      <Text mt="9px" color={"#686C75"} fontWeight={"400"} fontSize={"15px"} mb={5} gap={"9px"} lineHeight={"24px"}>Review and approve student applications. Manage pending requests and take action to accept or reject them.</Text>

      <Box bg="#fff" border="1px solid #EFEFEF" mt="12px" py='17px' px={["18px", "18px"]} rounded='10px'>
        <Tabs>
          <HStack justifyContent={"space-between"}>
            <TabList overflowX={"auto"} overflowY={"hidden"}>
              <Tab _selected={{ color: "green", borderColor: "green" }} fontSize={"14px"} fontWeight={"600"} lineHeight={"20px"}><Text fontSize={"14px"} fontWeight={"600"} lineHeight={"20px"}>Pending Approval <Box as="span" color="#667085" fontSize="12px" fontWeight="600">({pendingData.length})</Box></Text></Tab>
              <Tab _selected={{ color: "green", borderColor: "green" }} fontSize={"14px"} fontWeight={"600"} lineHeight={"20px"}><Text fontSize={"14px"} fontWeight={"600"} lineHeight={"20px"}>Approved <Box as="span" color="#667085" fontSize="12px" fontWeight="600">({approvedData.length})</Box></Text></Tab>
              <Tab _selected={{ color: "green", borderColor: "green" }} fontSize={"14px"} fontWeight={"600"} lineHeight={"20px"}><Text fontSize={"14px"} fontWeight={"600"} lineHeight={"20px"}>Rejected <Box as="span" color="#667085" fontSize="12px" fontWeight="600">({rejectedData.length})</Box></Text></Tab>
            </TabList>

            <Box borderWidth="1px" borderColor={"#E3E5E8"} cursor="pointer" borderRadius={"7px"} padding={"10px"}>
              <FaSearch fontSize={"17px"} color="#2F2F2F" />
            </Box>

          </HStack>

          <TabIndicator mt='-1.5px' height='2px' bg='green' borderRadius='1px' />

          <TabPanels>
            <TabPanel>

              <Box mt="12px" bg="#fff" border="2px solid #EFEFEF" py='30px' px={["8px", "8px", "18px", "18px"]} rounded='10px'>
                <TableContainer>
                  <Table variant='simple'>

                    <Thead bg="#F9FAFB">
                      <Tr >
                        <Th fontSize="13px" textTransform="capitalize" color='#2F2F2F' fontWeight="600">name</Th>
                        <Th fontSize="13px" textTransform="capitalize" color='#2F2F2F' fontWeight="600">school name</Th>
                        <Th fontSize="13px" textTransform="capitalize" color='#2F2F2F' fontWeight="600">field of study</Th>
                        <Th fontSize="13px" textTransform="capitalize" color='#2F2F2F' fontWeight="600">status</Th>
                        <Th fontSize="13px" textTransform="capitalize" color='#2F2F2F' fontWeight="600">actions</Th>

                      </Tr>
                    </Thead>
                    <Tbody>

                      {
                        pendingData.map((item, i) => (

                          <TableRow
                            type={item.type}
                            name={item.full_name}
                            email={item.email}
                            schoolName={item.school_name}
                            fieldOfStudy={item.intended_field_of_study}
                            status={item.status}
                            buttonText={item.buttonText}
                            onButtonClick={() => ApproveStudent(item)}
                          />
                        ))
                      }

                    </Tbody>

                  </Table>
                </TableContainer>
              </Box>
            </TabPanel>


            <TabPanel>
              <Box mt="12px" bg="#fff" border="2px solid #EFEFEF" py='30px' px={["8px", "8px", "18px", "18px"]} rounded='10px'>
                <TableContainer>
                  <Table variant='simple'>

                    <Thead bg="#F9FAFB">
                      <Tr >
                        <Th fontSize="13px" textTransform="capitalize" color='#2F2F2F' fontWeight="600">name</Th>
                        <Th fontSize="13px" textTransform="capitalize" color='#2F2F2F' fontWeight="600">school name</Th>
                        <Th fontSize="13px" textTransform="capitalize" color='#2F2F2F' fontWeight="600">field of study</Th>
                        <Th fontSize="13px" textTransform="capitalize" color='#2F2F2F' fontWeight="600">status</Th>
                        <Th fontSize="13px" textTransform="capitalize" color='#2F2F2F' fontWeight="600">actions</Th>

                      </Tr>
                    </Thead>
                    <Tbody>

                      {
                        approvedData.map((item, i) => (

<TableRow
                            type={item.type}
                            name={item.full_name}
                            email={item.email}
                            schoolName={item.school_name}
                            fieldOfStudy={item.intended_field_of_study}
                            status={item.status}
                            buttonText={item.buttonText}
                          />
                        ))
                      }

                    </Tbody>

                  </Table>
                </TableContainer>
              </Box>
            </TabPanel>

            <TabPanel>
              <Box mt="12px" bg="#fff" border="2px solid #EFEFEF" py='30px' px={["8px", "8px", "18px", "18px"]} rounded='10px'>
                <TableContainer>
                  <Table variant='simple'>

                    <Thead bg="#F9FAFB">
                      <Tr >
                        <Th fontSize="13px" textTransform="capitalize" color='#2F2F2F' fontWeight="600">name</Th>
                        <Th fontSize="13px" textTransform="capitalize" color='#2F2F2F' fontWeight="600">school name</Th>
                        <Th fontSize="13px" textTransform="capitalize" color='#2F2F2F' fontWeight="600">field of study</Th>
                        <Th fontSize="13px" textTransform="capitalize" color='#2F2F2F' fontWeight="600">status</Th>
                        <Th fontSize="13px" textTransform="capitalize" color='#2F2F2F' fontWeight="600">actions</Th>

                      </Tr>
                    </Thead>
                    <Tbody>

                      {
                        rejectedData.map((item, i) => (

                          <TableRow
                            type={item.type}
                            name={item.full_name}
                            email={item.email}
                            schoolName={item.school_name}
                            fieldOfStudy={item.intended_field_of_study}
                            status={item.status}
                            buttonText={item.buttonText}
                          />
                        ))
                      }

                    </Tbody>

                  </Table>
                </TableContainer>
              </Box>
            </TabPanel>

          </TabPanels>
        </Tabs>
      </Box>
    </MainLayout>
  )
}
