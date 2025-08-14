import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import MainLayout from '../../DashboardLayout'
import { Text, Flex, HStack, Box, VStack, Icon, Tooltip as ChakraTooltip, SimpleGrid} from '@chakra-ui/react'
import DashboardCard from "../../Components/DashboardCard"
import Tooltips from "../../Components/Tooltip"
import PlatformOverviewCard from "../../Components/PlatformOverviewCard"
import Button from "../../Components/Button"
import { HiOutlineUsers } from 'react-icons/hi'
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { RxTimer } from "react-icons/rx";
import { MdOutlineCancel } from 'react-icons/md'
import { IoArrowForward, IoInformationCircleOutline } from "react-icons/io5";
import { GoArrowDown } from "react-icons/go";
import { GoGear, GoReport } from "react-icons/go"
import { CartesianGrid, XAxis, YAxis, LineChart, Line, Tooltip, BarChart, Bar, ResponsiveContainer } from 'recharts'
import { BiInfoCircle, BiSearch } from "react-icons/bi";
// import { InfoOutlineIcon } from '@chakra-ui/icons';
import priceBg from "../../Asset/priceBg.png"
import leftBg from "../../Asset/priceBg2.png"
import Pagination from "../../Components/Pagination";
import RemoveNotification from "../../Components/RemoveNotification"
import { FaCalendarAlt } from "react-icons/fa";
import TableRow from "../../Components/TableRow"
import { CgSearch } from "react-icons/cg";
import { configuration } from "../../Utils/Helpers";
import { IoFilter } from "react-icons/io5";
import moment from "moment";
import { GetSuperAdminFinancialReportsApi, GetPlatformOverviewApi } from "../../Utils/ApiCall";
import ShowToast from "../../Components/ToastNotification"
import Preloader from "../../Components/Preloader"
import ApplicationStatusChart from "./ApplicationStatusChart";
import GeographicalDistributionChart from "./GeographicalDistributionChart";
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Legend } from 'chart.js';


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
  Circle
} from '@chakra-ui/react'
import { FiTrendingUp } from 'react-icons/fi'
import Leaderboard from './Leaderboard'

ChartJS.register(ArcElement, Legend);

export default function ReportAndAnalytics() {

  const SponsorData = [
    { name: 'Jan', value: 1000000 },
    { name: 'Feb', value: 500000 },
    { name: 'Mar', value: 800000 },
    { name: 'Apr', value: 400000 },
    { name: 'May', value: 900000 },
    { name: 'Jun', value: 1300000 },
    { name: 'Jul', value: 600000 },
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

  const fundsData = [
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
  
    const options = {
      responsive: true,
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            label: function (tooltipItem) {
              return `${tooltipItem.label}: ${tooltipItem.raw}%`;
            },
          },
        },
      },
      cutout: '0%',
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

    const SponsorCustomTooltip = ({ active, payload }) => {
      if (active && payload && payload.length) {
        return (
          <Box bg="white" p={2} border="1px solid #ccc" borderRadius="md">
            <Text fontWeight="bold">₦{payload[0].value.toLocaleString()}</Text>
          </Box>
        );
      }
      return null;
    };

    function CustomTooltip({ active, payload, label }) {
      if (active && payload && payload.length) {
        return (
          <Box bg="white" p="8px" boxShadow="sm" borderRadius="md" border="1px solid #EDEFF2">
            <Text fontSize="sm">{label}</Text>
            <Text fontSize="sm">₦{payload[0].value.toLocaleString()}</Text>
          </Box>
        );
      }
    
      return null;
    }

  const availableBalance = "200,158.32"

  const fundsRaised = "1,000,158.32"

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
      const [isLoading, setIsLoading] = useState(false);
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

    const [financialReportsDetails, setFinancialReportsDetails] = useState({});
    const [allocationBreakDown, setAllocationBreakDown] = useState({});
    const [platformOverview, setPlatformOverview] = useState({});
    const [schoolMetrics, setSchoolMetrics] = useState({});
    const [studentMetrics, setStudentMetrics] = useState({});
    const [userMetrics, setUserMetrics] = useState({});
  
    const GetFinancialReportsDetails = async () => {
  
      try {
        const response = await GetSuperAdminFinancialReportsApi()
  
        console.log("getFinancialReportsDetails", response)
  
        setFinancialReportsDetails(response.data.data)
        setAllocationBreakDown(response.data.data.allocationBreakDown)
  
  
      } catch (e) {
  
        console.log("error", e.message)
      }
  
    }



const GetPlatformOverview = async () => {
  try {
    const response = await GetPlatformOverviewApi();

    console.log("getPlatformOverviewDetails", response);

    setPlatformOverview(response.data.data);

    // Handle schoolMetrics
    const schoolMetricsArray = response?.data?.data?.schoolMetrics || [];

    const formattedSchoolMetrics = schoolMetricsArray.reduce((acc, curr) => {
      const key = curr.status?.toUpperCase();
      acc[key] = curr.count;
      return acc;
    }, {});
    setSchoolMetrics(formattedSchoolMetrics);
    console.log("Formatted schoolMetrics:", formattedSchoolMetrics);

    // Handle studentMetrics
    const studentMetricsArray = response?.data?.data?.studentMetrics || [];

    const formattedStudentMetrics = studentMetricsArray.reduce((acc, curr) => {
      const key = curr.status?.toUpperCase();
      acc[key] = curr.count;
      return acc;
    }, {});
    setStudentMetrics(formattedStudentMetrics);
    console.log("Formatted studentMetrics:", formattedStudentMetrics);

// User Metrics
const userMetricsArray = response?.data?.data?.userMetrics || [];

const formattedUserMetrics = userMetricsArray.reduce((acc, curr) => {
  if (!curr.type) return acc; // skip null or undefined types
  const key = curr.type.toUpperCase();
  acc[key] = curr.count;
  return acc;
}, {});

setUserMetrics(formattedUserMetrics);
console.log("Formatted userMetrics:", formattedUserMetrics);

  } catch (e) {
    console.log("error", e.message);
  }
};


console.log("school metrics", schoolMetrics);
console.log("user metrics", userMetrics);

      const data = {
      labels: ['Tuition Fees', 'Stationaries'],
      datasets: [
        {
          data: [allocationBreakDown.tuitionFees, allocationBreakDown.stationeryFees],
          backgroundColor: ['#114D3A', '#4CB97A'],
          borderWidth: 0,
        },
      ],
    };
  
    useEffect(() => {
  
      GetFinancialReportsDetails()
      GetPlatformOverview()
  
    }, []);
  


  return (
<MainLayout>
      {
        isLoading && <Preloader  />
      }
  {/* Header */}
  <Flex
    direction={{ base: 'column', md: 'row' }}
    justify="space-between"
    align={{ base: 'flex-start', md: 'center' }}
    mb={6}
    gap={4}
  >
    <Text
      color="#1F2937"
      fontWeight="600"
      fontSize={{ base: "20px", md: "21px" }}
      textTransform="capitalize"
      lineHeight="25.41px"
    >
      Report and Analytics
    </Text>

    <Button
      w={{ base: "50%", md: "auto" }}
      rightIcon={<GoReport />}
    >
      Download Reports
    </Button>
  </Flex>

  {/* Cards & Chart Section */}
  <Flex
    direction={{ base: 'column', lg: 'row' }}
    wrap="wrap"
    gap={6}
    align="stretch"
  >
    {/* Total Funds Raised Card */}
    <Box
        w={{ base: "100%", md: "48%", xl: "566px" }}
        flexShrink={0}
        display="flex"
        flexDirection="column"
        gap="6px"
        justifyContent="center"
        rounded="11px"
        py="15px"
        px="23px"
        backgroundSize="contain, contain, cover"
        backgroundRepeat="no-repeat, no-repeat, no-repeat"
        backgroundPosition="left center, right center, center"
        sx={{
          backgroundImage: `url(${leftBg}), url(${priceBg}), linear-gradient(90.1deg, #FF644F 0.09%, #E44BEF 101.03%)`,
        }}
      >
        <Text fontSize="14px" color="#FFFFFFC7" fontWeight="500">
          Total Funds Raised
        </Text>
        <Text
          fontSize={{ base: "32px", md: "39.63px" }}
          color="#ffffff"
          fontWeight="800"
          letterSpacing="1px"
        >
          <Box as="span" fontSize="20px" color="#ffffff" fontWeight="700">
            ₦
          </Box>
          {financialReportsDetails.totalFundsRaised ? financialReportsDetails.totalFundsRaised.toLocaleString() : "0"}
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
          Funding History
        </Button>
      </Box>

    {/* Available Balance Card */}
    <Box
        w={{ base: "100%", md: "48%", xl: "566px" }}
        flexShrink={0}
        display="flex"
        flexDirection="column"
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
        <Text fontSize="14px" color="#FFFFFFC7" fontWeight="500">
          Available Balance
        </Text>
        <Text
          fontSize={{ base: "32px", md: "39.63px" }}
          color="#ffffff"
          fontWeight="800"
          letterSpacing="1px"
        >
          <Box as="span" fontSize="20px" color="#ffffff" fontWeight="700">
            ₦
          </Box>
          {financialReportsDetails.availableFunds ? financialReportsDetails.availableFunds.toLocaleString() : "0"}
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


    {/* Allocation Breakdown */}
    <Box
      flex="1"
      minW={{ base: "100%", md: "350px" }}
      bg="white"
      p={6}
      rounded="xl"
      boxShadow="md"
    >
      <Text fontSize="lg" fontWeight="semibold" mb={4}>
        Allocation Breakdown
      </Text>

      <Flex
        direction={{ base: "column", md: "row" }}
        justify="space-between"
        align={{ base: "center", md: "flex-start" }}
        gap={6}
      >
        <Box w="160px" h="160px">
          <Pie data={data} options={options} />
        </Box>

        <VStack align="start" spacing={4}>
          <HStack>
            <Box w="12px" h="12px" bg="#114D3A" borderRadius="full" />
            <Text fontSize="sm">Tuition Fees</Text>
          </HStack>
          <HStack>
            <Box w="12px" h="12px" bg="#4CB97A" borderRadius="full" />
            <Text fontSize="sm">Stationaries</Text>
          </HStack>
        </VStack>
      </Flex>
    </Box>
  </Flex>

  <Stack
      spacing={8}
      direction={{ base: "column", md: "column", lg: "column", xl: "column", "2xl": "row" }}
      align="stretch"
      w="100%"
      mx="auto"
      mt="20px"
      px={{ base: 4, md: 0 }}
    >
      {/* Line Chart Box */}
      <Box
        bg="white"
        borderRadius="10px"
        p={5}
        w={{ base: "100%", md: "100%", lg: "100%", xl: "100%", "2xl": "60%" }}
        boxShadow="md"
      >
        <Tooltips />

        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={fundsData}>
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

      {/* Bar Chart Box */}
      <Box
        bg="#FAFAFA"
        borderRadius="lg"
        p={5}
        w={{ base: "100%", md: "100%", lg: "100%", xl: "100%", "2xl": "40%" }}
        boxShadow="md"
      >
        <Flex justify="space-between" flexWrap="wrap" align="center" mb={4}>
          <Flex align="center" gap={2}>
            <Text fontWeight="bold">Sponsor Contribution Trends</Text>
            <ChakraTooltip label="Monthly sponsor data" aria-label="Info">
              <span>
                <Icon as={BiInfoCircle} boxSize={4} color="gray.500" />
              </span>
            </ChakraTooltip>
          </Flex>

          <Flex align="baseline" gap={2}>
            <Text fontWeight="bold" fontSize="lg">₦500,000</Text>
            <Text color="red.500" fontSize="sm">↓ 5%</Text>
            <Text color="gray.500" fontSize="sm">vs last month</Text>
          </Flex>
        </Flex>

        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={SponsorData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis tickFormatter={(value) => `${value / 1000}k`} />
            <Tooltip content={<SponsorCustomTooltip />} />
            <Bar dataKey="value" fill="#6B9080" radius={[10, 10, 0, 0]} barSize={40} />
          </BarChart>
        </ResponsiveContainer>
      </Box>
    </Stack>

    <Box bg={"#FFFFFF"} mt="20px" border={"1px solid #EDEFF2"} p={"20px"} rounded={"11px"}>
      <Text color="#3F4956" fontSize="15px" fontWeight="600" mb="10px">Platform Overview</Text>

      <Box w="100%">
      <SimpleGrid
        columns={{ base: 1, sm: 1, md: 2, lg: 3, "2xl": "4" }}
        spacing="20px"
        w="100%"
      >
        <PlatformOverviewCard name="Total Active Users" amount={platformOverview.totalActiveUsers} />
        <PlatformOverviewCard name="Total Schools" amount={platformOverview.totalSchools} />
        <PlatformOverviewCard name="Total Students" amount={platformOverview.totalStudents} />
        <PlatformOverviewCard name="Total Students Sponsored" amount={platformOverview.totalStudentsSponsored} />
        <PlatformOverviewCard name="Approved Students" amount={studentMetrics.APPROVED} />
        <PlatformOverviewCard name="Pending Students" amount={studentMetrics.PENDING} />
        <PlatformOverviewCard name="Rejected Students" amount={studentMetrics.REJECTED} />
        <PlatformOverviewCard name="Approved Schools" amount={schoolMetrics.APPROVED} />
        <PlatformOverviewCard name="Pending Schools" amount={schoolMetrics.PENDING} />
        <PlatformOverviewCard name="Rejected Schools" amount={schoolMetrics.REJECTED} />
        <PlatformOverviewCard name="Total Funds Disbursed" amount={`₦${platformOverview.totalFundsDisbursed}`} />
        <PlatformOverviewCard name="School Admins" amount={userMetrics["SCHOOL-ADMIN"]} />
        <PlatformOverviewCard name="Scholarship Admins" amount={userMetrics["SCHOLARSHIP-ADMIN"]} />
        <PlatformOverviewCard name="Sponsors" amount={userMetrics["SPONSOR"]} />
        <PlatformOverviewCard name="Fund Admins" amount={userMetrics["FUND-ADMIN"]} />
        <PlatformOverviewCard name="Super Admins" amount={userMetrics["SUPER-ADMIN"]} />
      </SimpleGrid>
    </Box>

    </Box>

    <SimpleGrid columns={{ base: 1, sm: 1, md: 1, lg: 2, "2xl": 2 }} my="20px" spacing={6}>
    <ApplicationStatusChart />
    <GeographicalDistributionChart />
  </SimpleGrid>

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