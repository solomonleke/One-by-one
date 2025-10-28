import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import MainLayout from '../../DashboardLayout'
import { Bar, BarChart, CartesianGrid, Legend, XAxis, YAxis, LineChart, Line, Tooltip, ResponsiveContainer, } from 'recharts'
import {
  Text, Flex, HStack, Box,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Grid,
  SimpleGrid,
  Image,
  Spacer,
  useColorModeValue,
  grid,
  Icon,
  Circle
} from '@chakra-ui/react'
import { FiTrendingUp } from 'react-icons/fi';
import { Tooltip as Tooltips } from '@chakra-ui/react';
import DashboardCard from "../../Components/DashboardCard"
import Button from "../../Components/Button"
import priceBg from "../../Asset/priceBg.png"
import leftBg from "../../Asset/priceBg2.png"
import { HiOutlineUsers } from 'react-icons/hi'
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { RxTimer } from "react-icons/rx";
import { MdOutlineCancel } from 'react-icons/md'
import { IoInformationCircleOutline, IoArrowForward } from "react-icons/io5";
import { GoArrowDown } from "react-icons/go";
import { BiSearch } from "react-icons/bi";
import Pagination from "../../Components/Pagination";
import RemoveNotification from "../../Components/RemoveNotification"
import { FaCalendarAlt, FaSchool } from "react-icons/fa";
import TableRow from "../../Components/TableRow"
import { CgSearch } from "react-icons/cg";
import { configuration } from "../../Utils/Helpers";
import { GetAllStudentApi, GetSuperAdminDashboardDetailsApi } from "../../Utils/ApiCall";
import { GetSchoolAdminDashboardGraphDataApi } from "../../Utils/ApiCall";
import { GetStudentStatsApi, UpdateStudentProfile, DeleteStudentProfile } from "../../Utils/ApiCall";
import moment from "moment";
import ShowToast from "../../Components/ToastNotification"
import Leaderboard from "./Leaderboard"
import Preloader from "../../Components/Preloader"

import scholarshipImage8 from "../../Asset/goldIcon.svg"
import { ReactComponent as Sarah } from '../../Asset/sarah.svg';

import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  TableContainer,
  useDisclosure,
  Input,
  Stack,
  Avatar,
  MenuList,
  MenuItem,
  MenuButton,
  Menu,
  ModalOverlay,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
} from '@chakra-ui/react'


export default function Index() {

  const [All, setAll] = useState(true)
  const [Approved, setApproved] = useState(false)
  const [Pending, setPending] = useState(false)
  const [Rejected, setRejected] = useState(false)


  const [OpenModal, setOpenModal] = useState(false)
  const { isOpen, onOpen, onClose } = useDisclosure()

  const [userName, setUserName] = useState('');
  const [SearchInput, setSearchInput] = useState("");
  const [MainData, setMainData] = useState([])
  const [FilterData, setFilterData] = useState([])
  const [FilteredData, setFilteredData] = useState(null);

  const [ByDate, setByDate] = useState(false);
  const [StartDate, setStartDate] = useState("");
  const [EndDate, setEndDate] = useState("");
  const [CurrentPage, setCurrentPage] = useState(1);
  const [PostPerPage, setPostPerPage] = useState(configuration.sizePerPage);
  const [TotalPage, setTotalPage] = useState("");
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [editedData, setEditedData] = useState("");
  const { isOpen: isRemoveModalOpen, onOpen: onOpenRemove, onClose: onCloseRemove } = useDisclosure();
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [selectedStudentId, setSelectedStudentId] = useState(null);
  const [originalData, setOriginalData] = useState(null);
  const [studentId, setStudentId] = useState(null);
  const { isOpen: isEditModalOpen, onOpen: onOpenEdit, onClose: onCloseEdit } = useDisclosure();
  const [showToast, setShowToast] = useState({
    show: false,
    message: "",
    status: ""
  })

  const data = [
    { month: 'Jan', amount: 20000 },
    { month: 'Feb', amount: 30000 },
    { month: 'Mar', amount: 45000 },
    { month: 'Apr', amount: 35000 },
    { month: 'May', amount: 42000 },
    { month: 'Jun', amount: 60000 },
    { month: 'Jul', amount: 30000 },
    { month: 'Aug', amount: 58000 },
    { month: 'Sep', amount: 50000 },
    { month: 'Oct', amount: 48000 },
    { month: 'Nov', amount: 30000 },
    { month: 'Dec', amount: 36000 },
  ];

  const trendsData = [
    { month: 'Jan', schools: 220, students: 100 },
    { month: 'Feb', schools: 210, students: 110 },
    { month: 'Mar', schools: 230, students: 120 },
    { month: 'Apr', schools: 200, students: 105 },
    { month: 'May', schools: 250, students: 130 },
    { month: 'Jun', schools: 210, students: 150 },
    { month: 'Jul', schools: 230, students: 125 },
    { month: 'Aug', schools: 230, students: 90 },
    { month: 'Sep', schools: 240, students: 100 },
    { month: 'Oct', schools: 230, students: 110 },
    { month: 'Nov', schools: 220, students: 95 },
    { month: 'Dec', schools: 220, students: 110 },
  ];

  const disbursedData = [
    {
      fundedStudents: "Philip Amakiri",
      amount: "₦100,000.00",
      transactionId: "TX123456789",
      date: "01/16/2025 15:13",
      paymentMethod: "Bank Transfer",
      status: "COMPLETED"
    },
    {
      fundedStudents: "Solomon Adeleke",
      amount: "₦50,000.00",
      transactionId: "TX987654321",
      date: "01/20/2025 07:17",
      paymentMethod: "Bank Transfer",
      status: "COMPLETED"
    },
    {
      fundedStudents: "Saviour Promise",
      amount: "₦200,000.00",
      transactionId: "TX987654321",
      date: "01/23/2025 10:17",
      paymentMethod: "Bank Transfer",
      status: "COMPLETED"
    },
    {
      fundedStudents: "Peter Charles",
      amount: "₦50,000.00",
      transactionId: "TX057651021",
      date: "05/12/2025 04:17",
      paymentMethod: "Bank Transfer",
      status: "COMPLETED"
    }
  ]

  const navigate = useNavigate();


  const CustomTooltip = ({ active, payload }) => {
    if (active && payload?.length) {
      return (
        <Box bg="white" p="8px" boxShadow="sm" borderRadius="md" border="1px solid #EDEFF2">
          <Text fontSize="sm">₦{payload[0].value.toLocaleString()}</Text>
        </Box>
      );
    }
    return null;
  };

  const TrendsCustomTooltip = ({ active, payload }) => {
    if (active && payload?.length) {
      return (
        <Box bg="white" p="10px" borderRadius="md" boxShadow="sm">
          <Text fontSize="sm"><strong>{payload[0].name}</strong></Text>
          {payload.map((entry, index) => (
            <Text key={index} fontSize="sm" color={entry.color}>
              {entry.name}: {entry.value}
            </Text>
          ))}
        </Box>
      );
    }
    return null;
  };

  const randomAvatarUrl = `https://i.pravatar.cc/300?img=${Math.floor(Math.random() * 70) + 1}`;

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')

  useEffect(() => {

    const storedName = JSON.parse(localStorage.getItem('onlineUser'));
    if (storedName) {
      setFirstName(`${storedName.firstName}`);
      setLastName(`${storedName.lastName}`);
    }
  }, []);

  const [superAdminDetails, setSuperAdminDetails] = useState({});

  const GetSuperAdminDashboardDetails = async () => {


    try {
      const response = await GetSuperAdminDashboardDetailsApi()

      console.log("getSuperAdminDashboardDetails", response)

      setSuperAdminDetails(response.data.data)


    } catch (e) {
      console.log("error", e.message)
    } finally {
      setIsLoading(false)
    }

  }

  useEffect(() => {

    GetSuperAdminDashboardDetails()

  }, []);



  return (
    <MainLayout>
          {
            isLoading && <Preloader  />
          }
      <Text
        color="#1F2937"
        fontWeight="600"
        fontSize={{ base: "20px", md: "21px" }}
        textTransform="capitalize"
        lineHeight="25.41px"
      >
        Welcome back, {firstName || "User"}.
      </Text>

      <Flex
        mt="20px"
        direction={{ base: "column", xl: "row" }}
        gap="30px"
        w="100%"
        alignItems="stretch"
        flexWrap="wrap"
      >
        {/* Left Box */}
        <Box
          w={{ base: "100%", xl: "566px" }}
          flexShrink={0}
          display="flex"
          flexDir="column"
          gap="6px"
          justifyContent="center"
          rounded="11px"
          py="15px"
          px="23px"
          backgroundSize="contain, contain, cover"
          backgroundRepeat="no-repeat, no-repeat, no-repeat"
          backgroundPosition="left center, right center, center"
          sx={{
            backgroundImage: `url(${leftBg}), url(${priceBg}), linear-gradient(90.1deg, #20553C 0.09%, #C4EF4B 101.03%)`,
          }}
        >
          <Text fontSize="14px" color="#FFFFFFC7" fontWeight="500">Available Balance</Text>
          <Text
            fontSize={{ base: "32px", md: "39.63px" }}
            color="#ffffff"
            fontWeight="800"
            letterSpacing="1px"
          >
            <Box as="span" fontSize="20px" color="#ffffff" fontWeight="700">₦</Box>
            {superAdminDetails.availableFunds ? superAdminDetails.availableFunds.toLocaleString() : "0.00"}
          </Text>
          <Button
            w="220px"
            border="none"
            color="#4C515C"
            background="#fff"
            fontWeight="500"
            fontSize="14px"
            rightIcon={<IoArrowForward color="#4C515C" />}
            mt="10px"
          >
            Disbursement Records
          </Button>
        </Box>

        {/* Right Grid */}
        <SimpleGrid
          columns={{ base: 1, xl: 2 }}
          spacing="20px"
          flex="1"
        >
          {[
            {
              title: "Total Schools",
              total: superAdminDetails.totalSchools ? superAdminDetails.totalSchools.toLocaleString() : "0",
              icon: FaSchool,
              navText: "See All",
              navigateTo: "/super-admin-schools"
            },
            {
              title: "Total Students",
              total: superAdminDetails.totalStudents ? superAdminDetails.totalStudents.toLocaleString() : "0",
              icon: FaSchool,
              navText: "See All",
              navigateTo: "/super-admin-students"
            },
            {
              title: "Total Students Sponsored",
              total: superAdminDetails.totalStudentsSponsored ? superAdminDetails.totalStudentsSponsored.toLocaleString() : "0",
              icon: FaSchool,
              navText: "See All",
              navigateTo: "/super-admin/funding"
            },
            {
              title: "Total Funds Disbursed",
              total: (
                superAdminDetails.fundsDisbursed === "0" ||
                superAdminDetails.fundsDisbursed === "0.00" ||
                superAdminDetails.fundsDisbursed === "Undefined" ||
                superAdminDetails.fundsDisbursed === undefined
              )
                ? "₦0.00"
                : `₦${superAdminDetails.fundsDisbursed}`,
              icon: FaSchool,
              navText: "See All",
              navigateTo: "/super-admin-transactions"
            }
          ].map((role, i) => (
            <Box
              key={i}
              w="100%"
              borderRadius="10px"
              border="1px solid #EDEFF2"
              boxShadow="0px 4px 20px rgba(0, 0, 0, 0.1)"
              p="20px"
              display="flex"
              flexDirection="column"
              justifyContent="space-between"
              gap="10px"
            >
              <Stack spacing="8px">
                <HStack justifyContent="space-between" flexWrap={["wrap", "wrap", "wrap", "wrap"]} align="flex-start">
                  <HStack>
                    <role.icon color="#39996B" />
                    <Text fontSize="14px" fontWeight="500" color="#4C515C">{role.title}</Text>
                  </HStack>
                  <Text fontSize="20px" fontWeight="600" color="#2F2F2F">{role.total}</Text>
                </HStack>
                <Box height="1px" bg="#EDEFF2" />
                <HStack spacing="4px" cursor="pointer" onClick={() => navigate(role.navigateTo)}>
                  <Text fontSize="13px" fontWeight="600" color="#39996B">{role.navText}</Text>
                  <IoArrowForward color="#39996B" />
                </HStack>
              </Stack>
            </Box>
          ))}
        </SimpleGrid>
      </Flex>

      <Flex
        mt="20px"
        direction={{ base: "column", lg: "row" }}
        gap="30px"
        w="100%"
        alignItems="stretch"
      >
        <Box
          bg="white"
          borderRadius="10px"
          p="20px"
          w={{ base: "100%", lg: "60%" }}  // Full width on small, 60% on large+
        >
          <HStack justify="space-between" flexWrap={["wrap", "wrap", "nowrap", "nowrap"]} mb="10px">
            <Tooltips
              bg="#fff"
              color="#667085"
              p="12px"
              lineHeight="20px"
              fontSize="13px"
              fontWeight="400"
              label="See how student statuses have changed month over month. Use filters to view trends by approval, pending, or rejection status."
              placement="top-end"
            >
              <HStack spacing="5px">
                <Text color={"#1F2937"} fontWeight="600" fontSize="17px">
                  Fund Disbursements Overtime
                </Text>
                <IoInformationCircleOutline />
              </HStack>
            </Tooltips>

            <HStack>
              <Text fontWeight="700" fontSize="24px" color="#2F2F2F">
                ₦134,000
              </Text>
              <HStack spacing="4px">
                <HStack spacing="4px" bg="#C0FFE1" rounded="166.58px" p="3.33px" border="0.83px solid #95C7AF">
                  <Icon as={FiTrendingUp} color="#00715D" />
                  <Text fontSize="sm" color="#00715D" fontWeight="500">
                    12%
                  </Text>
                </HStack>
                <Text fontSize="sm" color="gray.500">
                  vs last month
                </Text>
              </HStack>
            </HStack>
          </HStack>

          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} />
              <YAxis tickFormatter={(val) => `₦${val / 1000}k`} />
              <Tooltip content={<CustomTooltip />} />
              <Line
                type="monotone"
                dataKey="amount"
                stroke="#1B9A59"
                strokeWidth={2}
                dot={{ stroke: "#1B9A59", strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </Box>

        {/* Table Container */}
        <Box
          w={{ base: "100%", lg: "40%" }}
          overflowX="auto"
          bg="#FFFFFF"
          border="1px solid #EDEFF2"
          rounded="10px"
          px="19px"
          pt="20px"
          pb="32px"
        >
          <HStack justifyContent="space-between" pb="15px">
            <Text fontSize="17px" fontWeight="600" color="#1F2937">Recent Disbursements</Text>
            <HStack spacing="4px" cursor="pointer">
              <Text fontSize="13px" fontWeight="600" color="#39996B">See All</Text>
              <IoArrowForward color="#39996B" />
            </HStack>
          </HStack>
          <TableContainer rounded="7px" border="1px solid #EDEFF2">
            <Table variant="simple" minWidth="600px" bg="#fff" rounded="7px">
              <Thead bg="gray.100">
                <Tr bg="gray.100">
                  <Th fontSize="13px" textTransform="capitalize" color="#2F2F2F" fontWeight="500">
                    funded students
                  </Th>
                  <Th fontSize="13px" textTransform="capitalize" color="#2F2F2F" fontWeight="500">
                    amount
                  </Th>
                  <Th fontSize="13px" textTransform="capitalize" color="#2F2F2F" fontWeight="500">
                    transaction id
                  </Th>
                  <Th fontSize="13px" textTransform="capitalize" color="#2F2F2F" fontWeight="500">
                    date
                  </Th>
                  <Th fontSize="13px" textTransform="capitalize" color="#2F2F2F" fontWeight="500">
                    payment method
                  </Th>
                  <Th fontSize="13px" textTransform="capitalize" color="#2F2F2F" fontWeight="500">
                    status
                  </Th>
                </Tr>
              </Thead>
              <Tbody>
                {disbursedData.map((item, index) => (
                  <TableRow
                    key={index}
                    type="super-admin-recent-disbursement"
                    fundedStudents={item.fundedStudents}
                    amount={item.amount}
                    transactionId={item.transactionId}
                    date={item.date}
                    paymentMethod={item.paymentMethod}
                    status={item.status}
                  />
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        </Box>
      </Flex>

      <Flex
        mt="20px"
        direction={{ base: "column", lg: "row" }}
        gap={{ base: "20px", lg: "30px" }}
        w="100%"
        alignItems="stretch"
        flexWrap="wrap"
      >
        {/* Left Section - Leaderboard */}
        <Leaderboard />

        {/* Right Section - Trends Over Time */}
        <Box
          bg="white"
          borderRadius="10px"
          p={{ base: "16px", md: "20px" }}
          w={{ base: "100%", lg: "50%" }}
          flex="1"
        >
          <Stack spacing={3}>
            <Text fontSize="md" fontWeight="bold">
              Trends Over Time:{" "}
              <Text as="span" color="gray.600">Schools & Students</Text>
            </Text>

            <HStack spacing={4} flexWrap="wrap">
              <HStack>
                <Circle size="10px" bg="#39996B" />
                <Text fontSize="sm" fontWeight="medium">Approved Schools</Text>
                <Text fontSize="sm" color="#39996B">+78%</Text>
              </HStack>
              <HStack>
                <Circle size="10px" bg="#3FC8E4" />
                <Text fontSize="sm" fontWeight="medium">Approved Students</Text>
                <Text fontSize="sm" color="#3FC8E4">+21%</Text>
              </HStack>
            </HStack>
          </Stack>

          <Box mt={6} w="100%" h={{ base: "250px", md: "300px" }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trendsData}>
                <CartesianGrid stroke="#f0f0f0" vertical={false} />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} domain={[0, 500]} />
                <Tooltip content={<TrendsCustomTooltip />} />
                <Line
                  type="monotone"
                  dataKey="schools"
                  stroke="#1B9A59"
                  name="Approved Schools"
                  strokeWidth={2}
                  dot={{ r: 3 }}
                  activeDot={{ r: 6 }}
                />
                <Line
                  type="monotone"
                  dataKey="students"
                  stroke="#00B5D8"
                  name="Approved Students"
                  strokeWidth={2}
                  dot={{ r: 3 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </Box>
        </Box>
      </Flex>


    </MainLayout>




  )
}
