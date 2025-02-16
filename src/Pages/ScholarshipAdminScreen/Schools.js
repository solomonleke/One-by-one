import React, { useState } from 'react'
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


export default function Schools() {
  const router = useNavigate();

  const pendingData = [
    {
        type: "scholarship-admin-schools",
        schoolName: "Legendary Scholars Academy",
        email: "LegendaryScholarsAcademy@gmail.com",
        submissionDate: "11/27/2024 21:19",
        status: "pending",
        buttonText: "Review",
    },
    {
        type: "scholarship-admin-schools",
        schoolName: "Queens's College",
        email: "Queens'sCollege@gmail.com",
        submissionDate: "11/27/2024 21:19",
        status: "pending",
        buttonText: "Review",
    },
    {
        type: "scholarship-admin-schools",
        schoolName: "Federal Government College",
        email: "FederalGovernmentCollege@gmail.com",
        submissionDate: "11/27/2024 21:19",
        status: "pending",
        buttonText: "Review",
    },
    {
        type: "scholarship-admin-schools",
        schoolName: "Mayflower School",
        email: "MayflowerSchool@gmail.com",
        submissionDate: "11/27/2024 21:19",
        status: "pending",
        buttonText: "Review",
    },
    {
        type: "scholarship-admin-schools",
        schoolName: "Chrisland College",
        email: "ChrislandCollege@gmail.com",
        submissionDate: "11/27/2024 21:19",
        status: "pending",
        buttonText: "Review",
    },
    {
        type: "scholarship-admin-schools",
        schoolName: "Christ The King College",
        email: "ChristTheKingCollege@gmail.com",
        submissionDate: "11/27/2024 21:19",
        status: "pending",
        buttonText: "Review",
    },
    {
        type: "scholarship-admin-schools",
        schoolName: "Corona Secondary School",
        email: "CoronaSecondarySchool@gmail.com",
        submissionDate: "11/27/2024 21:19",
        status: "pending",
        buttonText: "Review",
    },
    {
        type: "scholarship-admin-schools",
        schoolName: "Adesoye College",
        email: "AdesoyeCollege@gmail.com",
        submissionDate: "11/27/2024 21:19",
        status: "pending",
        buttonText: "Review",
    },
]

const approvedData = [
  {
      type: "scholarship-admin-schools",
      schoolName: "Legendary Scholars Academy",
      email: "LegendaryScholarsAcademy@gmail.com",
      submissionDate: "11/27/2024 21:19",
      status: "approved",
      buttonText: "Revoke Approval",
  },
  {
      type: "scholarship-admin-schools",
      schoolName: "Queens's College",
      email: "Queens'sCollege@gmail.com",
      submissionDate: "11/27/2024 21:19",
      status: "approved",
      buttonText: "Revoke Approval",
  },
  {
      type: "scholarship-admin-schools",
      schoolName: "Federal Government College",
      email: "FederalGovernmentCollege@gmail.com",
      submissionDate: "11/27/2024 21:19",
      status: "approved",
      buttonText: "Revoke Approval",
  },
  {
      type: "scholarship-admin-schools",
      schoolName: "Mayflower School",
      email: "MayflowerSchool@gmail.com",
      submissionDate: "11/27/2024 21:19",
      status: "approved",
      buttonText: "Revoke Approval",
  },
  {
      type: "scholarship-admin-schools",
      schoolName: "Chrisland College",
      email: "ChrislandCollege@gmail.com",
      submissionDate: "11/27/2024 21:19",
      status: "approved",
      buttonText: "Revoke Approval",
  },
  {
      type: "scholarship-admin-schools",
      schoolName: "Christ The King College",
      email: "ChristTheKingCollege@gmail.com",
      submissionDate: "11/27/2024 21:19",
      status: "approved",
      buttonText: "Revoke Approval",
  },
  {
      type: "scholarship-admin-schools",
      schoolName: "Corona Secondary School",
      email: "CoronaSecondarySchool@gmail.com",
      submissionDate: "11/27/2024 21:19",
      status: "approved",
      buttonText: "Revoke Approval",
  },
  {
      type: "scholarship-admin-schools",
      schoolName: "Adesoye College",
      email: "AdesoyeCollege@gmail.com",
      submissionDate: "11/27/2024 21:19",
      status: "approved",
      buttonText: "Revoke Approval",
  },
]

const rejectedData = [
  {
      type: "scholarship-admin-schools",
      schoolName: "Legendary Scholars Academy",
      email: "LegendaryScholarsAcademy@gmail.com",
      submissionDate: "11/27/2024 21:19",
      status: "rejected",
      buttonText: "Unreject",
  },
  {
      type: "scholarship-admin-schools",
      schoolName: "Queens's College",
      email: "Queens'sCollege@gmail.com",
      submissionDate: "11/27/2024 21:19",
      status: "rejected",
      buttonText: "Unreject",
  },
  {
      type: "scholarship-admin-schools",
      schoolName: "Federal Government College",
      email: "FederalGovernmentCollege@gmail.com",
      submissionDate: "11/27/2024 21:19",
      status: "rejected",
      buttonText: "Unreject",
  },
  {
      type: "scholarship-admin-schools",
      schoolName: "Mayflower School",
      email: "MayflowerSchool@gmail.com",
      submissionDate: "11/27/2024 21:19",
      status: "rejected",
      buttonText: "Unreject",
  },
  {
      type: "scholarship-admin-schools",
      schoolName: "Chrisland College",
      email: "ChrislandCollege@gmail.com",
      submissionDate: "11/27/2024 21:19",
      status: "rejected",
      buttonText: "Unreject",
  },
  {
      type: "scholarship-admin-schools",
      schoolName: "Christ The King College",
      email: "ChristTheKingCollege@gmail.com",
      submissionDate: "11/27/2024 21:19",
      status: "rejected",
      buttonText: "Unreject",
  },
  {
      type: "scholarship-admin-schools",
      schoolName: "Corona Secondary School",
      email: "CoronaSecondarySchool@gmail.com",
      submissionDate: "11/27/2024 21:19",
      status: "rejected",
      buttonText: "Unreject",
  },
  {
      type: "scholarship-admin-schools",
      schoolName: "Adesoye College",
      email: "AdesoyeCollege@gmail.com",
      submissionDate: "11/27/2024 21:19",
      status: "rejected",
      buttonText: "Unreject",
  },
]

    return (
        <MainLayout>
            <Text fontSize={"21px"} lineHeight={"25.41px"} fontWeight="700">Schools <Box as='span' color="#667085" fontWeight="600" fontSize="19px">({pendingData.length + approvedData.length + rejectedData.length})</Box></Text>
            <Text mt="9px" color={"#686C75"} fontWeight={"400"} fontSize={"15px"} mb={5} gap={"9px"} lineHeight={"24px"}>View and manage school approval requests. Quickly review pending applications and take necessary actions like approving or rejecting.</Text>

            <Box bg="#fff" border="1px solid #EFEFEF" mt="12px" py='17px' px={["18px", "18px"]} rounded='10px'>
            <Tabs>
              <HStack justifyContent={"space-between"}>
          <TabList overflowX={"auto"} overflowY={"hidden"}>
            <Tab _selected={{ color: "green", borderColor: "green" }} fontSize={"14px"} fontWeight={"600"} lineHeight={"20px"}><Text fontSize={"14px"} fontWeight={"600"} lineHeight={"20px"}>Pending Approval <Box as="span" color="#667085" fontSize="12px" fontWeight="600">({pendingData.length})</Box></Text></Tab>
            <Tab _selected={{ color: "green", borderColor: "green" }} fontSize={"14px"} fontWeight={"600"} lineHeight={"20px"}><Text fontSize={"14px"} fontWeight={"600"} lineHeight={"20px"}>Approved <Box as="span" color="#667085" fontSize="12px" fontWeight="600">({approvedData.length})</Box></Text></Tab>
            <Tab _selected={{ color: "green", borderColor: "green" }} fontSize={"14px"} fontWeight={"600"} lineHeight={"20px"}><Text fontSize={"14px"} fontWeight={"600"} lineHeight={"20px"}>Rejected <Box as="span" color="#667085" fontSize="12px" fontWeight="600">({rejectedData.length})</Box></Text></Tab>
          </TabList>

          <Box borderWidth="1px" borderColor={"#E3E5E8"} cursor="pointer" borderRadius={"7px"} padding={"10px"}>
          <FaSearch fontSize={"17px"} color="#2F2F2F"/>
          </Box>

          </HStack> 

          <TabIndicator mt='-1.5px' height='2px' bg='green' borderRadius='1px' />

          <TabPanels>
            <TabPanel>
              <Box mt="12px" bg="#fff" border="2px solid #EFEFEF" py='30px' px={["8px","8px","18px","18px"]} rounded='10px'>
              <TableContainer>
                        <Table variant='simple'>

                            <Thead bg="#F9FAFB">
                                <Tr >
                                    <Th fontSize="13px" textTransform="capitalize" color='#2F2F2F' fontWeight="600">name</Th>
                                    <Th fontSize="13px" textTransform="capitalize" color='#2F2F2F' fontWeight="600">submission date</Th>
                                    <Th fontSize="13px" textTransform="capitalize" color='#2F2F2F' fontWeight="600">status</Th>
                                    <Th fontSize="13px" textTransform="capitalize" color='#2F2F2F' fontWeight="600">actions</Th>

                                </Tr>
                            </Thead>
                            <Tbody>

                                {
                                    pendingData.map((item, i) => (

                                        <TableRow
                                            type={item.type}
                                            schoolName={item.schoolName}
                                            email={item.email}
                                            submissionDate={item.submissionDate}
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
              <Box mt="12px" bg="#fff" border="2px solid #EFEFEF" py='30px' px={["8px","8px","18px","18px"]} rounded='10px'>
              <TableContainer>
                        <Table variant='simple'>

                            <Thead bg="#F9FAFB">
                                <Tr >
                                    <Th fontSize="13px" textTransform="capitalize" color='#2F2F2F' fontWeight="600">name</Th>
                                    <Th fontSize="13px" textTransform="capitalize" color='#2F2F2F' fontWeight="600">submission date</Th>
                                    <Th fontSize="13px" textTransform="capitalize" color='#2F2F2F' fontWeight="600">status</Th>
                                    <Th fontSize="13px" textTransform="capitalize" color='#2F2F2F' fontWeight="600">actions</Th>

                                </Tr>
                            </Thead>
                            <Tbody>

                                {
                                    approvedData.map((item, i) => (

                                        <TableRow
                                            type={item.type}
                                            schoolName={item.schoolName}
                                            email={item.email}
                                            submissionDate={item.submissionDate}
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
              <Box mt="12px" bg="#fff" border="2px solid #EFEFEF" py='30px' px={["8px","8px","18px","18px"]} rounded='10px'>
              <TableContainer>
                        <Table variant='simple'>

                            <Thead bg="#F9FAFB">
                                <Tr >
                                    <Th fontSize="13px" textTransform="capitalize" color='#2F2F2F' fontWeight="600">name</Th>
                                    <Th fontSize="13px" textTransform="capitalize" color='#2F2F2F' fontWeight="600">submission date</Th>
                                    <Th fontSize="13px" textTransform="capitalize" color='#2F2F2F' fontWeight="600">status</Th>
                                    <Th fontSize="13px" textTransform="capitalize" color='#2F2F2F' fontWeight="600">actions</Th>

                                </Tr>
                            </Thead>
                            <Tbody>

                                {
                                    rejectedData.map((item, i) => (

                                        <TableRow
                                            type={item.type}
                                            schoolName={item.schoolName}
                                            email={item.email}
                                            submissionDate={item.submissionDate}
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
