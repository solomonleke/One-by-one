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


export default function Students() {
    return (
        <MainLayout>
        <Text fontSize={"21px"} lineHeight={"25.41px"} fontWeight="700">Students <Box as='span' color="#667085" fontWeight="700" fontSize="19px">(58)</Box></Text>
        <Text mt="9px" color={"#686C75"} fontWeight={"400"} fontSize={"15px"} mb={5} gap={"9px"} lineHeight={"24px"}>Review and approve student applications. Manage pending requests and take action to accept or reject them.</Text>

        <Box bg="#fff" border="1px solid #EFEFEF" mt="12px" py='17px' px={["18px", "18px"]} rounded='10px'>
        <Tabs>
          <HStack justifyContent={"space-between"}>
      <TabList overflowX={"auto"} overflowY={"hidden"}>
        <Tab _selected={{ color: "green", borderColor: "green" }} fontSize={"14px"} fontWeight={"600"} lineHeight={"20px"}>Pending Approval <Box as="span" color="#667085" fontSize="12px" fontWeight="600">(8)</Box></Tab>
        <Tab _selected={{ color: "green", borderColor: "green" }} fontSize={"14px"} fontWeight={"600"} lineHeight={"20px"}>Approved <Box as="span" color="#667085" fontSize="12px" fontWeight="600">(25)</Box></Tab>
        <Tab _selected={{ color: "green", borderColor: "green" }} fontSize={"14px"} fontWeight={"600"} lineHeight={"20px"}>Rejected <Box as="span" color="#667085" fontSize="12px" fontWeight="600">(2)</Box></Tab>
      </TabList>

      <Box borderWidth="1px" borderColor={"#E3E5E8"} cursor="pointer" borderRadius={"7px"} padding={"10px"}>
      <FaSearch fontSize={"17px"} color="#2F2F2F"/>
      </Box>

      </HStack> 

      <TabIndicator mt='-1.5px' height='2px' bg='green' borderRadius='1px' />

      <TabPanels>
        <TabPanel>
          <Box mt="12px" bg="#fff" border="2px solid #EFEFEF" py='30px' px={["8px","8px","18px","18px"]} rounded='10px'>
            <Box justifyContent={"space-between"} w="100%" display="flex" p="10px" bg={"#F9FAFB"}>
              <Box w="25%">
              <Text fontSize="13px" fontWeight="500" color="#2F2F2F">Name</Text>
              </Box>

              <Box w="25%">
              <Text fontSize="13px" fontWeight="500" color="#2F2F2F">School Name</Text>
              </Box>

              <Box w="20%">
              <Text fontSize="13px" fontWeight="500" color="#2F2F2F">Field Of Study</Text>
              </Box>

              <Box w="15%">
              <Text fontSize="13px" fontWeight="500" color="#2F2F2F">Status</Text>
              </Box>

              <Box w="15%">
              <Text fontSize="13px" fontWeight="500" color="#2F2F2F">Actions</Text>
            </Box>

            </Box>

            <hr className="remove"/>

          <Box justifyContent={"space-between"} alignItems={"center"} w="100%" py="10px" display="flex"> 

            <Box w="25%">
            <HStack>
            <Avatar />
            <Stack>
              <Text color="#101828" fontSize="13px" fontWeight="500">Philip Amakari</Text>
              <Text color="#667085" fontSize="12px" fontWeight="400">philipamakari@gmail.com</Text>
            </Stack>
            </HStack>
            </Box>

            <Box w="25%">
              <Text fontSize="13px" fontWeight="400" color="#101828">Legendary Scholars Academy</Text>
            </Box>

            <Box w="20%">
              <Text fontSize="13px" fontWeight="400" color="#101828">Mass Communication</Text>
            </Box>

            <Box w="15%">
              <Box>
              <HStack py="2px" rounded="16px" px="6px">
                <Box w="6px" h="6px" bg="#FFA30C" rounded="full"></Box>
                <Text fontSize="12px" fontWeight="500" color="#FFA30C">Pending</Text>
              </HStack>
              </Box>
            </Box>


            <Box w="15%">
              <Button px="10%">Review</Button>
            </Box>
            </Box>

            <hr className="remove"/>

            <Box justifyContent={"space-between"} alignItems={"center"} w="100%" py="10px" display="flex"> 

            <Box w="25%">
            <HStack>
            <Avatar />
            <Stack>
              <Text color="#101828" fontSize="13px" fontWeight="500">David Folarin</Text>
              <Text color="#667085" fontSize="12px" fontWeight="400">davidfolarin@gmail.com</Text>
            </Stack>
            </HStack>
            </Box>

             <Box w="25%">
              <Text fontSize="13px" fontWeight="400" color="#101828">Queen's College</Text>
            </Box>

            <Box w="20%">
              <Text fontSize="13px" fontWeight="400" color="#101828">Bussiness Administration</Text>
            </Box>

            <Box w="15%">
              <Box>
              <HStack py="2px" rounded="16px" px="6px">
                <Box w="6px" h="6px" bg="#FFA30C" rounded="full"></Box>
                <Text fontSize="12px" fontWeight="500" color="#FFA30C">Pending</Text>
              </HStack>
              </Box>
            </Box>


            <Box w="15%">
              <Button px="10%">Review</Button>
            </Box>
            </Box>

            <hr className="remove"/>

            <Box justifyContent={"space-between"} alignItems={"center"} w="100%" py="10px" display="flex"> 

            <Box w="25%">
            <HStack>
            <Avatar />
            <Stack>
              <Text color="#101828" fontSize="13px" fontWeight="500">Timothy Salisu</Text>
              <Text color="#667085" fontSize="12px" fontWeight="400">timothysalisu@gmail.com</Text>
            </Stack>
            </HStack>
            </Box>

            <Box w="25%">
              <Text fontSize="13px" fontWeight="400" color="#101828">Federal Government College</Text>
            </Box>

            <Box w="20%">
              <Text fontSize="13px" fontWeight="400" color="#101828">Chemical Engineering</Text>
            </Box>

            <Box w="15%">
              <Box>
              <HStack py="2px" rounded="16px" px="6px">
                <Box w="6px" h="6px" bg="#FFA30C" rounded="full"></Box>
                <Text fontSize="12px" fontWeight="500" color="#FFA30C">Pending</Text>
              </HStack>
              </Box>
            </Box>


            <Box w="15%">
              <Button px="10%">Review</Button>
            </Box>
            </Box>

            <hr className="remove"/>

            <Box justifyContent={"space-between"} alignItems={"center"} w="100%" py="10px" display="flex"> 

            <Box w="25%">
            <HStack>
            <Avatar />
            <Stack>
              <Text color="#101828" fontSize="13px" fontWeight="500">Peter Usman</Text>
              <Text color="#667085" fontSize="12px" fontWeight="400">peterusman@gmail.com</Text>
            </Stack>
            </HStack>
            </Box>

            <Box w="25%">
              <Text fontSize="13px" fontWeight="400" color="#101828">Mayflower</Text>
            </Box>

            <Box w="20%">
              <Text fontSize="13px" fontWeight="400" color="#101828">Accounting</Text>
            </Box>

            <Box w="15%">
              <Box>
              <HStack py="2px" rounded="16px" px="6px">
                <Box w="6px" h="6px" bg="#FFA30C" rounded="full"></Box>
                <Text fontSize="12px" fontWeight="500" color="#FFA30C">Pending</Text>
              </HStack>
              </Box>
            </Box>


            <Box w="15%">
              <Button px="10%">Review</Button>
            </Box>
            </Box>

            <hr className="remove"/>

            <Box justifyContent={"space-between"} alignItems={"center"} w="100%" py="10px" display="flex"> 

            <Box w="25%">
            <HStack>
            <Avatar />
            <Stack>
              <Text color="#101828" fontSize="13px" fontWeight="500">Esther Wakali</Text>
              <Text color="#667085" fontSize="12px" fontWeight="400">estherwakali@gmail.com</Text>
            </Stack>
            </HStack>
            </Box>

            <Box w="25%">
              <Text fontSize="13px" fontWeight="400" color="#101828">Chrisland College</Text>
            </Box>

            <Box w="20%">
              <Text fontSize="13px" fontWeight="400" color="#101828">Banking and Finance</Text>
            </Box>

            <Box w="15%">
              <Box>
              <HStack py="2px" rounded="16px" px="6px">
                <Box w="6px" h="6px" bg="#FFA30C" rounded="full"></Box>
                <Text fontSize="12px" fontWeight="500" color="#FFA30C">Pending</Text>
              </HStack>
              </Box>
            </Box>


            <Box w="15%">
              <Button px="10%">Review</Button>
            </Box>
            </Box>

            <hr className="remove"/>

            <Box justifyContent={"space-between"} alignItems={"center"} w="100%" py="10px" display="flex"> 

            <Box w="25%">
            <HStack>
            <Avatar />
            <Stack>
              <Text color="#101828" fontSize="13px" fontWeight="500">Simon Ogan</Text>
              <Text color="#667085" fontSize="12px" fontWeight="400">simonogan@gmail.com</Text>
            </Stack>
            </HStack>
            </Box>

            <Box w="25%">
              <Text fontSize="13px" fontWeight="400" color="#101828">Christ The King College</Text>
            </Box>

            <Box w="20%">
              <Text fontSize="13px" fontWeight="400" color="#101828">Law</Text>
            </Box>

            <Box w="15%">
              <Box>
              <HStack py="2px" rounded="16px" px="6px">
                <Box w="6px" h="6px" bg="#FFA30C" rounded="full"></Box>
                <Text fontSize="12px" fontWeight="500" color="#FFA30C">Pending</Text>
              </HStack>
              </Box>
            </Box>


            <Box w="15%">
              <Button px="10%">Review</Button>
            </Box>
            </Box>

            <hr className="remove"/>

            <Box justifyContent={"space-between"} alignItems={"center"} w="100%" py="10px" display="flex"> 

            <Box w="25%">
            <HStack>
            <Avatar />
            <Stack>
              <Text color="#101828" fontSize="13px" fontWeight="500">Esther Abubakar</Text>
              <Text color="#667085" fontSize="12px" fontWeight="400">estherabubakar@gmail.com</Text>
            </Stack>
            </HStack>
            </Box>

            <Box w="25%">
              <Text fontSize="13px" fontWeight="400" color="#101828">Corona Secondary School</Text>
            </Box>

            <Box w="20%">
              <Text fontSize="13px" fontWeight="400" color="#101828">Medicine and Surgery</Text>
            </Box>

            <Box w="15%">
              <Box>
              <HStack py="2px" rounded="16px" px="6px">
                <Box w="6px" h="6px" bg="#FFA30C" rounded="full"></Box>
                <Text fontSize="12px" fontWeight="500" color="#FFA30C">Pending</Text>
              </HStack>
              </Box>
            </Box>


            <Box w="15%">
              <Button px="10%">Review</Button>
            </Box>
            </Box>

            <hr className="remove"/>

            <Box justifyContent={"space-between"} alignItems={"center"} w="100%" py="10px" display="flex"> 

            <Box w="25%">
            <HStack>
            <Avatar />
            <Stack>
              <Text color="#101828" fontSize="13px" fontWeight="500">Philip Ezeoke</Text>
              <Text color="#667085" fontSize="12px" fontWeight="400">philipezeoke@gmail.com</Text>
            </Stack>
            </HStack>
            </Box>

            <Box w="25%">
              <Text fontSize="13px" fontWeight="400" color="#101828">Adesoye College</Text>
            </Box>

            <Box w="20%">
              <Text fontSize="13px" fontWeight="400" color="#101828">Industrial College</Text>
            </Box>

            <Box w="15%">
              <Box>
              <HStack py="2px" rounded="16px" px="6px">
                <Box w="6px" h="6px" bg="#FFA30C" rounded="full"></Box>
                <Text fontSize="12px" fontWeight="500" color="#FFA30C">Pending</Text>
              </HStack>
              </Box>
            </Box>


            <Box w="15%">
              <Button px="10%">Review</Button>
            </Box>
            </Box>


          </Box>
        </TabPanel>


        <TabPanel>
          <Box mt="12px" bg="#fff" border="2px solid #EFEFEF" py='30px' px={["8px","8px","18px","18px"]} rounded='10px'>
            <Box justifyContent={"space-between"} w="100%" display="flex" p="10px" bg={"#F9FAFB"}>
              <Box w="25%">
              <Text fontSize="13px" fontWeight="500" color="#2F2F2F">Name</Text>
              </Box>

              <Box w="25%">
              <Text fontSize="13px" fontWeight="500" color="#2F2F2F">School Name</Text>
              </Box>

              <Box w="20%">
              <Text fontSize="13px" fontWeight="500" color="#2F2F2F">Field Of Study</Text>
              </Box>

              <Box w="15%">
              <Text fontSize="13px" fontWeight="500" color="#2F2F2F">Status</Text>
              </Box>

              <Box w="15%">
              <Text fontSize="13px" fontWeight="500" color="#2F2F2F">Actions</Text>
            </Box>

            </Box>

            <hr className="remove"/>

          <Box justifyContent={"space-between"} alignItems={"center"} w="100%" py="10px" display="flex"> 

            <Box w="25%">
            <HStack>
            <Avatar />
            <Stack>
              <Text color="#101828" fontSize="13px" fontWeight="500">Philip Amakari</Text>
              <Text color="#667085" fontSize="12px" fontWeight="400">philipamakari@gmail.com</Text>
            </Stack>
            </HStack>
            </Box>

            <Box w="25%">
              <Text fontSize="13px" fontWeight="400" color="#101828">Legendary Scholars Academy</Text>
            </Box>

            <Box w="20%">
              <Text fontSize="13px" fontWeight="400" color="#101828">Mass Communication</Text>
            </Box>

            <Box w="15%">
              <Box>
              <HStack py="2px" rounded="16px" px="6px">
                <Box w="6px" h="6px" bg="#027A48" rounded="full"></Box>
                <Text fontSize="12px" fontWeight="500" color="#027A48">Approved</Text>
              </HStack>
              </Box>
            </Box>


            <Box w="15%">
              <Button px="10%" color="#39996B" background="white" border='1px solid green'>Reject</Button>
            </Box>
            </Box>

            <hr className="remove"/>

            <Box justifyContent={"space-between"} alignItems={"center"} w="100%" py="10px" display="flex"> 

            <Box w="25%">
            <HStack>
            <Avatar />
            <Stack>
              <Text color="#101828" fontSize="13px" fontWeight="500">David Folarin</Text>
              <Text color="#667085" fontSize="12px" fontWeight="400">davidfolarin@gmail.com</Text>
            </Stack>
            </HStack>
            </Box>

             <Box w="25%">
              <Text fontSize="13px" fontWeight="400" color="#101828">Queen's College</Text>
            </Box>

            <Box w="20%">
              <Text fontSize="13px" fontWeight="400" color="#101828">Bussiness Administration</Text>
            </Box>

            <Box w="15%">
              <Box>
              <HStack py="2px" rounded="16px" px="6px">
                <Box w="6px" h="6px" bg="#027A48" rounded="full"></Box>
                <Text fontSize="12px" fontWeight="500" color="#027A48">Approved</Text>
              </HStack>
              </Box>
            </Box>


            <Box w="15%">
              <Button px="10%" color="#39996B" background="white" border='1px solid green'>Reject</Button>
            </Box>
            </Box>

            <hr className="remove"/>

            <Box justifyContent={"space-between"} alignItems={"center"} w="100%" py="10px" display="flex"> 

            <Box w="25%">
            <HStack>
            <Avatar />
            <Stack>
              <Text color="#101828" fontSize="13px" fontWeight="500">Timothy Salisu</Text>
              <Text color="#667085" fontSize="12px" fontWeight="400">timothysalisu@gmail.com</Text>
            </Stack>
            </HStack>
            </Box>

            <Box w="25%">
              <Text fontSize="13px" fontWeight="400" color="#101828">Federal Government College</Text>
            </Box>

            <Box w="20%">
              <Text fontSize="13px" fontWeight="400" color="#101828">Chemical Engineering</Text>
            </Box>

            <Box w="15%">
              <Box>
              <HStack py="2px" rounded="16px" px="6px">
                <Box w="6px" h="6px" bg="#027A48" rounded="full"></Box>
                <Text fontSize="12px" fontWeight="500" color="#027A48">Approved</Text>
              </HStack>
              </Box>
            </Box>


            <Box w="15%">
              <Button px="10%" color="#39996B" background="white" border='1px solid green'>Reject</Button>
            </Box>
            </Box>

            <hr className="remove"/>

            <Box justifyContent={"space-between"} alignItems={"center"} w="100%" py="10px" display="flex"> 

            <Box w="25%">
            <HStack>
            <Avatar />
            <Stack>
              <Text color="#101828" fontSize="13px" fontWeight="500">Peter Usman</Text>
              <Text color="#667085" fontSize="12px" fontWeight="400">peterusman@gmail.com</Text>
            </Stack>
            </HStack>
            </Box>

            <Box w="25%">
              <Text fontSize="13px" fontWeight="400" color="#101828">Mayflower</Text>
            </Box>

            <Box w="20%">
              <Text fontSize="13px" fontWeight="400" color="#101828">Accounting</Text>
            </Box>

            <Box w="15%">
              <Box>
              <HStack py="2px" rounded="16px" px="6px">
                <Box w="6px" h="6px" bg="#027A48" rounded="full"></Box>
                <Text fontSize="12px" fontWeight="500" color="#027A48">Approved</Text>
              </HStack>
              </Box>
            </Box>


            <Box w="15%">
              <Button px="10%" color="#39996B" background="white" border='1px solid green'>Reject</Button>
            </Box>
            </Box>

            <hr className="remove"/>

            <Box justifyContent={"space-between"} alignItems={"center"} w="100%" py="10px" display="flex"> 

            <Box w="25%">
            <HStack>
            <Avatar />
            <Stack>
              <Text color="#101828" fontSize="13px" fontWeight="500">Esther Wakali</Text>
              <Text color="#667085" fontSize="12px" fontWeight="400">estherwakali@gmail.com</Text>
            </Stack>
            </HStack>
            </Box>

            <Box w="25%">
              <Text fontSize="13px" fontWeight="400" color="#101828">Chrisland College</Text>
            </Box>

            <Box w="20%">
              <Text fontSize="13px" fontWeight="400" color="#101828">Banking and Finance</Text>
            </Box>

            <Box w="15%">
              <Box>
              <HStack py="2px" rounded="16px" px="6px">
                <Box w="6px" h="6px" bg="#027A48" rounded="full"></Box>
                <Text fontSize="12px" fontWeight="500" color="#027A48">Approved</Text>
              </HStack>
              </Box>
            </Box>


            <Box w="15%">
              <Button px="10%" color="#39996B" background="white" border='1px solid green'>Reject</Button>
            </Box>
            </Box>

            <hr className="remove"/>

            <Box justifyContent={"space-between"} alignItems={"center"} w="100%" py="10px" display="flex"> 

            <Box w="25%">
            <HStack>
            <Avatar />
            <Stack>
              <Text color="#101828" fontSize="13px" fontWeight="500">Simon Ogan</Text>
              <Text color="#667085" fontSize="12px" fontWeight="400">simonogan@gmail.com</Text>
            </Stack>
            </HStack>
            </Box>

            <Box w="25%">
              <Text fontSize="13px" fontWeight="400" color="#101828">Christ The King College</Text>
            </Box>

            <Box w="20%">
              <Text fontSize="13px" fontWeight="400" color="#101828">Law</Text>
            </Box>

            <Box w="15%">
              <Box>
              <HStack py="2px" rounded="16px" px="6px">
                <Box w="6px" h="6px" bg="#027A48" rounded="full"></Box>
                <Text fontSize="12px" fontWeight="500" color="#027A48">Approved</Text>
              </HStack>
              </Box>
            </Box>


            <Box w="15%">
              <Button px="10%" color="#39996B" background="white" border='1px solid green'>Reject</Button>
            </Box>
            </Box>

            <hr className="remove"/>

            <Box justifyContent={"space-between"} alignItems={"center"} w="100%" py="10px" display="flex"> 

            <Box w="25%">
            <HStack>
            <Avatar />
            <Stack>
              <Text color="#101828" fontSize="13px" fontWeight="500">Esther Abubakar</Text>
              <Text color="#667085" fontSize="12px" fontWeight="400">estherabubakar@gmail.com</Text>
            </Stack>
            </HStack>
            </Box>

            <Box w="25%">
              <Text fontSize="13px" fontWeight="400" color="#101828">Corona Secondary School</Text>
            </Box>

            <Box w="20%">
              <Text fontSize="13px" fontWeight="400" color="#101828">Medicine and Surgery</Text>
            </Box>

            <Box w="15%">
              <Box>
              <HStack py="2px" rounded="16px" px="6px">
                <Box w="6px" h="6px" bg="#027A48" rounded="full"></Box>
                <Text fontSize="12px" fontWeight="500" color="#027A48">Approved</Text>
              </HStack>
              </Box>
            </Box>


            <Box w="15%">
              <Button px="10%" color="#39996B" background="white" border='1px solid green'>Reject</Button>
            </Box>
            </Box>

            <hr className="remove"/>

            <Box justifyContent={"space-between"} alignItems={"center"} w="100%" py="10px" display="flex"> 

            <Box w="25%">
            <HStack>
            <Avatar />
            <Stack>
              <Text color="#101828" fontSize="13px" fontWeight="500">Philip Ezeoke</Text>
              <Text color="#667085" fontSize="12px" fontWeight="400">philipezeoke@gmail.com</Text>
            </Stack>
            </HStack>
            </Box>

            <Box w="25%">
              <Text fontSize="13px" fontWeight="400" color="#101828">Adesoye College</Text>
            </Box>

            <Box w="20%">
              <Text fontSize="13px" fontWeight="400" color="#101828">Industrial College</Text>
            </Box>

            <Box w="15%">
              <Box>
              <HStack py="2px" rounded="16px" px="6px">
                <Box w="6px" h="6px" bg="#027A48" rounded="full"></Box>
                <Text fontSize="12px" fontWeight="500" color="#027A48">Approved</Text>
              </HStack>
              </Box>
            </Box>


            <Box w="15%">
              <Button px="10%" color="#39996B" background="white" border='1px solid green'>Reject</Button>
            </Box>
            </Box>


          </Box>
        </TabPanel>

        <TabPanel>
          <Box mt="12px" bg="#fff" border="2px solid #EFEFEF" py='30px' px={["8px","8px","18px","18px"]} rounded='10px'>
            <Box justifyContent={"space-between"} w="100%" display="flex" p="10px" bg={"#F9FAFB"}>
              <Box w="25%">
              <Text fontSize="13px" fontWeight="500" color="#2F2F2F">Name</Text>
              </Box>

              <Box w="25%">
              <Text fontSize="13px" fontWeight="500" color="#2F2F2F">School Name</Text>
              </Box>

              <Box w="20%">
              <Text fontSize="13px" fontWeight="500" color="#2F2F2F">Field Of Study</Text>
              </Box>

              <Box w="15%">
              <Text fontSize="13px" fontWeight="500" color="#2F2F2F">Status</Text>
              </Box>

              <Box w="15%">
              <Text fontSize="13px" fontWeight="500" color="#2F2F2F">Actions</Text>
            </Box>

            </Box>

            <hr className="remove"/>

          <Box justifyContent={"space-between"} alignItems={"center"} w="100%" py="10px" display="flex"> 

            <Box w="25%">
            <HStack>
            <Avatar />
            <Stack>
              <Text color="#101828" fontSize="13px" fontWeight="500">Philip Amakari</Text>
              <Text color="#667085" fontSize="12px" fontWeight="400">philipamakari@gmail.com</Text>
            </Stack>
            </HStack>
            </Box>

            <Box w="25%">
              <Text fontSize="13px" fontWeight="400" color="#101828">Legendary Scholars Academy</Text>
            </Box>

            <Box w="20%">
              <Text fontSize="13px" fontWeight="400" color="#101828">Mass Communication</Text>
            </Box>

            <Box w="15%">
              <Box>
              <HStack py="2px" rounded="16px" px="6px">
                <Box w="6px" h="6px" bg="#FD4739" rounded="full"></Box>
                <Text fontSize="12px" fontWeight="500" color="#FD4739">Rejected</Text>
              </HStack>
              </Box>
            </Box>


            <Box w="15%">
              <Button px="10%" color="#39996B" background="white" border='1px solid green'>Unreject</Button>
            </Box>
            </Box>

            <hr className="remove"/>

            <Box justifyContent={"space-between"} alignItems={"center"} w="100%" py="10px" display="flex"> 

            <Box w="25%">
            <HStack>
            <Avatar />
            <Stack>
              <Text color="#101828" fontSize="13px" fontWeight="500">David Folarin</Text>
              <Text color="#667085" fontSize="12px" fontWeight="400">davidfolarin@gmail.com</Text>
            </Stack>
            </HStack>
            </Box>

             <Box w="25%">
              <Text fontSize="13px" fontWeight="400" color="#101828">Queen's College</Text>
            </Box>

            <Box w="20%">
              <Text fontSize="13px" fontWeight="400" color="#101828">Bussiness Administration</Text>
            </Box>

            <Box w="15%">
              <Box>
              <HStack py="2px" rounded="16px" px="6px">
                <Box w="6px" h="6px" bg="#FD4739" rounded="full"></Box>
                <Text fontSize="12px" fontWeight="500" color="#FD4739">Rejected</Text>
              </HStack>
              </Box>
            </Box>


            <Box w="15%">
              <Button px="10%" color="#39996B" background="white" border='1px solid green'>Unreject</Button>
            </Box>
            </Box>

            <hr className="remove"/>

            <Box justifyContent={"space-between"} alignItems={"center"} w="100%" py="10px" display="flex"> 

            <Box w="25%">
            <HStack>
            <Avatar />
            <Stack>
              <Text color="#101828" fontSize="13px" fontWeight="500">Timothy Salisu</Text>
              <Text color="#667085" fontSize="12px" fontWeight="400">timothysalisu@gmail.com</Text>
            </Stack>
            </HStack>
            </Box>

            <Box w="25%">
              <Text fontSize="13px" fontWeight="400" color="#101828">Federal Government College</Text>
            </Box>

            <Box w="20%">
              <Text fontSize="13px" fontWeight="400" color="#101828">Chemical Engineering</Text>
            </Box>

            <Box w="15%">
              <Box>
              <HStack py="2px" rounded="16px" px="6px">
                <Box w="6px" h="6px" bg="#FD4739" rounded="full"></Box>
                <Text fontSize="12px" fontWeight="500" color="#FD4739">Rejected</Text>
              </HStack>
              </Box>
            </Box>


            <Box w="15%">
              <Button px="10%" color="#39996B" background="white" border='1px solid green'>Unreject</Button>
            </Box>
            </Box>

            <hr className="remove"/>

            <Box justifyContent={"space-between"} alignItems={"center"} w="100%" py="10px" display="flex"> 

            <Box w="25%">
            <HStack>
            <Avatar />
            <Stack>
              <Text color="#101828" fontSize="13px" fontWeight="500">Peter Usman</Text>
              <Text color="#667085" fontSize="12px" fontWeight="400">peterusman@gmail.com</Text>
            </Stack>
            </HStack>
            </Box>

            <Box w="25%">
              <Text fontSize="13px" fontWeight="400" color="#101828">Mayflower</Text>
            </Box>

            <Box w="20%">
              <Text fontSize="13px" fontWeight="400" color="#101828">Accounting</Text>
            </Box>

            <Box w="15%">
              <Box>
              <HStack py="2px" rounded="16px" px="6px">
                <Box w="6px" h="6px" bg="#FD4739" rounded="full"></Box>
                <Text fontSize="12px" fontWeight="500" color="#FD4739">Rejected</Text>
              </HStack>
              </Box>
            </Box>


            <Box w="15%">
              <Button px="10%" color="#39996B" background="white" border='1px solid green'>Unreject</Button>
            </Box>
            </Box>

            <hr className="remove"/>

            <Box justifyContent={"space-between"} alignItems={"center"} w="100%" py="10px" display="flex"> 

            <Box w="25%">
            <HStack>
            <Avatar />
            <Stack>
              <Text color="#101828" fontSize="13px" fontWeight="500">Esther Wakali</Text>
              <Text color="#667085" fontSize="12px" fontWeight="400">estherwakali@gmail.com</Text>
            </Stack>
            </HStack>
            </Box>

            <Box w="25%">
              <Text fontSize="13px" fontWeight="400" color="#101828">Chrisland College</Text>
            </Box>

            <Box w="20%">
              <Text fontSize="13px" fontWeight="400" color="#101828">Banking and Finance</Text>
            </Box>

            <Box w="15%">
              <Box>
              <HStack py="2px" rounded="16px" px="6px">
                <Box w="6px" h="6px" bg="#FD4739" rounded="full"></Box>
                <Text fontSize="12px" fontWeight="500" color="#FD4739">Rejected</Text>
              </HStack>
              </Box>
            </Box>


            <Box w="15%">
              <Button px="10%" color="#39996B" background="white" border='1px solid green'>Unreject</Button>
            </Box>
            </Box>

            <hr className="remove"/>

            <Box justifyContent={"space-between"} alignItems={"center"} w="100%" py="10px" display="flex"> 

            <Box w="25%">
            <HStack>
            <Avatar />
            <Stack>
              <Text color="#101828" fontSize="13px" fontWeight="500">Simon Ogan</Text>
              <Text color="#667085" fontSize="12px" fontWeight="400">simonogan@gmail.com</Text>
            </Stack>
            </HStack>
            </Box>

            <Box w="25%">
              <Text fontSize="13px" fontWeight="400" color="#101828">Christ The King College</Text>
            </Box>

            <Box w="20%">
              <Text fontSize="13px" fontWeight="400" color="#101828">Law</Text>
            </Box>

            <Box w="15%">
              <Box>
              <HStack py="2px" rounded="16px" px="6px">
                <Box w="6px" h="6px" bg="#FD4739" rounded="full"></Box>
                <Text fontSize="12px" fontWeight="500" color="#FD4739">Rejected</Text>
              </HStack>
              </Box>
            </Box>


            <Box w="15%">
              <Button px="10%" color="#39996B" background="white" border='1px solid green'>Unreject</Button>
            </Box>
            </Box>

            <hr className="remove"/>

            <Box justifyContent={"space-between"} alignItems={"center"} w="100%" py="10px" display="flex"> 

            <Box w="25%">
            <HStack>
            <Avatar />
            <Stack>
              <Text color="#101828" fontSize="13px" fontWeight="500">Esther Abubakar</Text>
              <Text color="#667085" fontSize="12px" fontWeight="400">estherabubakar@gmail.com</Text>
            </Stack>
            </HStack>
            </Box>

            <Box w="25%">
              <Text fontSize="13px" fontWeight="400" color="#101828">Corona Secondary School</Text>
            </Box>

            <Box w="20%">
              <Text fontSize="13px" fontWeight="400" color="#101828">Medicine and Surgery</Text>
            </Box>

            <Box w="15%">
              <Box>
              <HStack py="2px" rounded="16px" px="6px">
                <Box w="6px" h="6px" bg="#FD4739" rounded="full"></Box>
                <Text fontSize="12px" fontWeight="500" color="#FD4739">Rejected</Text>
              </HStack>
              </Box>
            </Box>


            <Box w="15%">
              <Button px="10%" color="#39996B" background="white" border='1px solid green'>Unreject</Button>
            </Box>
            </Box>

            <hr className="remove"/>

            <Box justifyContent={"space-between"} alignItems={"center"} w="100%" py="10px" display="flex"> 

            <Box w="25%">
            <HStack>
            <Avatar />
            <Stack>
              <Text color="#101828" fontSize="13px" fontWeight="500">Philip Ezeoke</Text>
              <Text color="#667085" fontSize="12px" fontWeight="400">philipezeoke@gmail.com</Text>
            </Stack>
            </HStack>
            </Box>

            <Box w="25%">
              <Text fontSize="13px" fontWeight="400" color="#101828">Adesoye College</Text>
            </Box>

            <Box w="20%">
              <Text fontSize="13px" fontWeight="400" color="#101828">Industrial College</Text>
            </Box>

            <Box w="15%">
              <Box>
              <HStack py="2px" rounded="16px" px="6px">
                <Box w="6px" h="6px" bg="#FD4739" rounded="full"></Box>
                <Text fontSize="12px" fontWeight="500" color="#FD4739">Rejected</Text>
              </HStack>
              </Box>
            </Box>


            <Box w="15%">
              <Button px="10%" color="#39996B" background="white" border='1px solid green'>Unreject</Button>
            </Box>
            </Box>


          </Box>
        </TabPanel>

      </TabPanels>
    </Tabs>
        </Box>
    </MainLayout>
    )
}
