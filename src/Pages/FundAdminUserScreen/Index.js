import { 
  Box, Flex, Text, Button, Table, TableContainer, Thead, Tbody, Tr, Th, 
  Stat, StatLabel, StatNumber, Grid, VStack, HStack, useBreakpointValue, Icon 
} from "@chakra-ui/react";
import { Tooltip } from "recharts";
import { IoIosArrowForward } from "react-icons/io";
import { FaArrowUpLong } from "react-icons/fa6";
import { TbCurrencyNaira } from "react-icons/tb";
import { IoInformationCircleOutline } from "react-icons/io5";
import { Bar, BarChart, CartesianGrid, Legend, XAxis, YAxis } from "recharts";
import { useEffect, useState } from "react";
import { MdKeyboardArrowRight } from "react-icons/md";
import { PiStudent } from "react-icons/pi";
import { useNavigate } from "react-router-dom";
import TableRow from "../../Components/TableRow";
import { GetFundAdminMetricsApi } from "../../Utils/ApiCall";
import Preloader from "../../Components/Preloader";
import ShowToast from "../../Components/ToastNotification";
import MainLayout from "../../DashboardLayout";

export default function Dashboard() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');
  const [showToast, setShowToast] = useState({ show: false, message: "", status: "" });
  const [metrics, setMetrics] = useState({});
  const [loading, setLoading] = useState(true);  // <-- Only one loading state
  const [error, setError] = useState("");

  const [Approved, setApproved] = useState(true);
  const [Pending, setPending] = useState(false);
  const [Rejected, setRejected] = useState(false);

  const dashboardData = {
    recentDisbursements: [
      { name: "Paul Timi", school: "Legendary School Academy", classLevel: "SS3", sponsor: "Esther Blessing", fee: "₦30,000.00", status: "Paid" },
      { name: "Daniel Benibo", school: "Queen’s College", classLevel: "SS2", sponsor: "Martha Nwankwo", fee: "₦30,000.00", status: "Paid" },
      { name: "Grace Onyebiro", school: "Federal Government College", classLevel: "SS3", sponsor: "Lydia Nkemjika", fee: "₦30,000.00", status: "Paid" },
      { name: "James Okafor", school: "Mayflower School", classLevel: "SS3", sponsor: "Lydia Nkemjika", fee: "₦30,000.00", status: "Paid" },
      { name: "Daniel Oji", school: "Christland College", classLevel: "JS2", sponsor: "Rebecca Usman", fee: "₦30,000.00", status: "Paid" },
    ]
  };

  const Data = [
    { name: "JAN", students: 140 }, { name: "FEB", students: 80 },
    { name: "MAR", students: 20 },  { name: "APR", students: 180 },
    { name: "MAY", students: 120 }, { name: "JUN", students: 100 }
  ];
  const PendingData = [...Data].reverse();
  const RejectedData = [...Data].map(d => ({ ...d, students: d.students + 50 }));

  const fetchMetrics = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await GetFundAdminMetricsApi();
      setMetrics(response.data?.data || {});
    } catch (err) {
      setError(err.message || "Error fetching metrics");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMetrics();
    const storedName = JSON.parse(localStorage.getItem('onlineUser'));
    if (storedName) setUserName(storedName.firstName);
  }, []);

  const fontSize = useBreakpointValue({ base: "12px", md: "14px", lg: "16px" });
  const iconSize = useBreakpointValue({ base: "16px", md: "18px", lg: "22px" });

  if (loading) return <Preloader message="Loading..." />;

  return (
    <MainLayout>
      {showToast.show && (
        <ShowToast 
          message={showToast.message} 
          status={showToast.status} 
          show={showToast.show} 
          duration={showToast.duration} 
        />
      )}
      
      <Box p={5} bg="gray.100" minH="100vh">
        <Text fontSize="2xl" fontWeight="bold" mb={4}>
          Welcome Back, {userName || "User"}.
        </Text>
        <Text mb={6}>Track your impact and manage your scholarships with ease.</Text>

        {/* Top Stats */}
        <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={4}>
          <Stat bgGradient="linear(to-r, #20553C, #C4EF4B)" borderRadius="md" p={6}>
            <StatLabel color="white">Available Balance</StatLabel>
            <StatNumber fontSize="40px" color="white">
              ₦{Number(metrics?.availableFunds || 0).toLocaleString()}
            </StatNumber>
            <Button 
              size="sm" mt={4} w="170px" color="#39996B"
              onClick={() => navigate("/fund-admin/funding-records")}
            >
              Funding Records <Icon as={IoIosArrowForward} ml={2} />
            </Button>
          </Stat>

          <VStack spacing={2} align="stretch" w="full" border="1px solid #EDEFF2" h="181px">
            <Box p={4} bg="white" borderRadius="md" border="1px solid #EDEFF2" display="grid" gap={2}>
              <Stat border="1px solid #EDEFF2" p={4}>
                <Flex justify="space-between">
                  <StatLabel display="flex" align="center" color="#4C515C" fontSize={fontSize}>
                    <PiStudent style={{ marginRight: "8px", width: iconSize, height: iconSize, color: "#39996B" }} />
                    Total Students Funded
                  </StatLabel>
                  <StatNumber fontSize={fontSize}>{metrics.totalStudentsFunded}</StatNumber>
                </Flex>
              </Stat>
              <Stat border="1px solid #EDEFF2" p={4}>
                <Flex justify="space-between">
                  <StatLabel display="flex" align="center" color="#4C515C" fontSize={fontSize}>
                    <TbCurrencyNaira style={{ marginRight: "8px", width: iconSize, height: iconSize, color: "#39996B" }} />
                    Total Disbursements
                  </StatLabel>
                  <StatNumber fontSize={fontSize}>{metrics.totalDisbursed}</StatNumber>
                </Flex>
              </Stat>
            </Box>
          </VStack>
        </Grid>

        {/* Recent Disbursements Table */}
        <Box mt={6} p={4} bg="white" borderRadius="md" boxShadow="md" overflowX="auto">
          <Flex justify="space-between">
            <Text fontSize="xl" fontWeight="bold">Recent Disbursements</Text>
            <Text display="flex" fontWeight="bold">see all <MdKeyboardArrowRight /></Text>
          </Flex>
          <TableContainer border="1px solid #EDEFF2" borderRadius="7px" mt={4}>
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>Student Name</Th>
                  <Th>School Name</Th>
                  <Th>Class Level</Th>
                  <Th>Sponsor</Th>
                  <Th>Tuition Fee</Th>
                  <Th>Status</Th>
                </Tr>
              </Thead>
              <Tbody>
                {dashboardData.recentDisbursements.map((item, index) => (
                  <TableRow
                    key={index}
                    type="fund-index"
                    name={item.name}
                    school={item.school}
                    classLevel={item.classLevel}
                    sponsor={item.sponsor}
                    fee={item.fee}
                    status={item.status}
                  />
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        </Box>

        {/* Chart */}
        <Box bg="#fff" border="1px solid #EFEFEF" mt="12px" py="17px" px="18px" rounded="10px">
          <Flex justify="space-between" flexWrap="wrap">
            <HStack>
              <Text fontSize="17px" fontWeight="600">Fund Disbursements Over Time</Text>
              <IoInformationCircleOutline />
            </HStack>
            <HStack bg="#E8FFF4" rounded="7px" py="3.5px" px="5px" cursor="pointer">
              <Text 
                py="8.5px" px="12px" rounded="7px" 
                bg={Approved ? "#fff" : "transparent"} onClick={() => {setApproved(true); setPending(false); setRejected(false);}}
              >Approved</Text>
              <Text 
                py="8.5px" px="12px" rounded="7px" 
                bg={Pending ? "#fff" : "transparent"} onClick={() => {setApproved(false); setPending(true); setRejected(false);}}
              >Pending</Text>
              <Text 
                py="8.5px" px="12px" rounded="7px" 
                bg={Rejected ? "#fff" : "transparent"} onClick={() => {setApproved(false); setPending(false); setRejected(true);}}
              >Rejected</Text>
            </HStack>
          </Flex>
          <HStack mt="4px">
            <Text fontSize="26px" fontWeight="700">134</Text>
            <HStack bg="#C0FFE1" px="3px" alignItems="center" py="1px" fontWeight="500" fontSize="11.66px" rounded="100px" color="#000">
              <FaArrowUpLong />
              <Text>12%</Text>
            </HStack>
            <Text color="#686C75" fontWeight="400" fontSize="14px">vs last month</Text>
          </HStack>
          <Box mt="27px" overflowX="auto" w="100%">
            <BarChart width={950} height={300} data={Approved ? Data : Pending ? PendingData : RejectedData} barSize={20}>
              <XAxis dataKey="name" padding={{ left: 10, right: 10 }} fontSize="12px" fontWeight="500" />
              <YAxis />
              <Tooltip />
              <Legend />
              <CartesianGrid strokeDasharray="3 3" />
              <Bar dataKey="students" fill="#39996B" background={{ fill: "#E8FFF4" }} />
            </BarChart>
          </Box>
        </Box>
      </Box>
    </MainLayout>
  );
}
