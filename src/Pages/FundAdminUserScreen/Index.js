import { Box, Flex, Text, Button, Table, Thead, Tbody, Tr, Th, Td, Icon, Stat, StatLabel, StatNumber, Grid, VStack, HStack, useBreakpointValue } from "@chakra-ui/react";
import { Tooltip } from "recharts";
import { IoIosArrowForward } from "react-icons/io";
import { FaArrowUpLong } from "react-icons/fa6";
import { TbCurrencyNaira } from "react-icons/tb";
import { GoDotFill } from "react-icons/go";
import MainLayout from "../../DashboardLayout";
import { IoInformationCircleOutline } from "react-icons/io5";
import { Bar, BarChart, CartesianGrid, Legend, XAxis, YAxis } from "recharts";
import { useState } from "react";
import { MdKeyboardArrowRight } from "react-icons/md";
import { PiStudent } from "react-icons/pi";
import { useNavigate } from "react-router-dom";

export default function Dashboard(){
  const navigate = useNavigate();

  const dashboardData = {
    availableBalance: "₦200,158.32",
    totalStudentsFunded: 16,
    totalDisbursements: "₦450,180.00",
    recentDisbursements: [
      { name: "Paul Timi", school: "Legendary School Academy", classLevel: "SS3", sponsor: "Esther Blessing", fee: "₦30,000.00", status: "Paid" },
      { name: "Daniel Benibo", school: "Queen’s College", classLevel: "SS2", sponsor: "Martha Nwankwo", fee: "₦30,000.00", status: "Paid" },
      { name: "Grace Onyebiro", school: "Federal Government College", classLevel: "SS3", sponsor: "Lydia Nkemjika", fee: "₦30,000.00", status: "Paid" },
      { name: "James Okafor", school: "Mayflower School", classLevel: "SS3", sponsor: "Lydia Nkemjika", fee: "₦30,000.00", status: "Paid" },
      { name: "Daniel Oji", school: "Christland College", classLevel: "JS2", sponsor: "Rebecca Usman", fee: "₦30,000.00", status: "Paid" },
    ],
    fundDisbursementTrend: "₦134,000",
    fundDisbursementPercent: "12%"
  };

  const [Approved, setApproved] = useState(true)
    const [Pending, setPending] = useState(false)
    const [Rejected, setRejected] = useState(false)
  
    const Data = [
      { name: "JAN", students: 140 },
      { name: "FEB", students: 80 },
      { name: "MAR", students: 20 },
      { name: "APR", students: 180 },
      { name: "MAY", students: 120 },
      { name: "JUN", students: 100 },
      { name: "JUL", students: 40 },
      { name: "AUG", students: 80 },
      { name: "SEP", students: 34 },
      { name: "OCT", students: 10 },
      { name: "NOV", students: 110 },
      { name: "DEC", students: 130 },
  
    ]
    const PendingData = [
      { name: "JAN", students: 40 },
      { name: "FEB", students: 180 },
      { name: "MAR", students: 120 },
      { name: "APR", students: 80 },
      { name: "MAY", students: 20 },
      { name: "JUN", students: 90 },
      { name: "JUL", students: 140 },
      { name: "AUG", students: 80 },
      { name: "SEP", students: 134 },
      { name: "OCT", students: 110 },
      { name: "NOV", students: 130 },
      { name: "DEC", students: 120 },
  
    ]
    const RejectedData = [
      { name: "JAN", students: 130 },
      { name: "FEB", students: 180 },
      { name: "MAR", students: 220 },
      { name: "APR", students: 10 },
      { name: "MAY", students: 20 },
      { name: "JUN", students: 30 },
      { name: "JUL", students: 120 },
      { name: "AUG", students: 30 },
      { name: "SEP", students: 134 },
      { name: "OCT", students: 110 },
      { name: "NOV", students: 150 },
      { name: "DEC", students: 180 },
  
    ]

    const fontSize = useBreakpointValue({ base: "12px", md: "14px", lg: "16px" });
  const iconSize = useBreakpointValue({ base: "16px", md: "18px", lg: "22px" });

  

  return (

    <MainLayout>
    <Box p={5} bg="gray.100" minH="100vh">
      <Text fontSize="2xl" fontWeight="bold" mb={4}>Welcome Back, Kena.</Text>
      <Text mb={6}>Track your impact and manage your scholarships with ease.</Text>

      <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={4}>
  <Stat pt="15px" paddingBottom="15px" pl="23px" pr="23px" bgGradient="linear(to-r, #20553C, #C4EF4B)" borderRadius="md" gap={18}>
    <StatLabel color="white">Available Balance</StatLabel>
    <StatNumber fontSize="40px" color="white">{dashboardData.availableBalance}</StatNumber>
    <Button size="sm" mt={2} w="170px" p="10px 24px" h="40px" fontSize="14px" textColor="#39996B" onClick={() => navigate("/fund-admin/funding-records")} >Funding Records <Icon as={IoIosArrowForward} boxSize={5} ml={2} /></Button>
  </Stat>
  
  <VStack spacing={2} align="stretch" w="full" border="1px solid #EDEFF2" h="181px" overflow="hidden">
      <Box p={4} bg="white" borderRadius="md" border="1px solid #EDEFF2" display="grid" h="181px" gap={2}>
        
        {/* Total Students Funded */}
        <Stat p={4} bg="white" borderRadius="md" border="1px solid #EDEFF2" h="73px">
          <Flex direction="row" justify="space-between" align="center">
            <StatLabel display="flex" align="center" color='#4C515C' fontSize={fontSize}>
              <PiStudent style={{ marginRight: "8px", width: iconSize, height: iconSize, color: "#39996B" }} />
              Total Students Funded
            </StatLabel>
            <StatNumber fontSize={fontSize}>{dashboardData.totalStudentsFunded}</StatNumber>
          </Flex>
        </Stat>

        {/* Total Disbursements */}
        <Stat p={4} bg="white" borderRadius="md" border="1px solid #EDEFF2" h="73px">
          <Flex direction="row" justify="space-between" align="center">
            <StatLabel display="flex" align="center" color='#4C515C' fontSize={fontSize}>
              <TbCurrencyNaira style={{ marginRight: "8px", width: iconSize, height: iconSize, color: "#39996B" }} />
              Total Disbursements
            </StatLabel>
            <StatNumber fontSize={fontSize}>{dashboardData.totalDisbursements}</StatNumber>
          </Flex> 
        </Stat>

      </Box>
    </VStack>
</Grid>

      <Box mt={6} p={4} bg="white" borderRadius="md" boxShadow="md" overflowX="auto">
        <Box display='flex' justifyContent='space-between'>
        <Text fontSize="xl" fontWeight="bold" mb={3}>Recent Disbursements</Text>
        <Text display="flex" fontSize="md" fontWeight="bold" mb={3}>see all <MdKeyboardArrowRight /></Text>
        </Box>
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
              <Tr key={index}>
                <Td onClick={() => navigate("/fund-admin/student-management/student-profile")} cursor="pointer">{item.name}</Td>
                <Td>{item.school}</Td>
                <Td>{item.classLevel}</Td>
                <Td>{item.sponsor}</Td>
                <Td>{item.fee}</Td>
                <Td>
                <Box 
                  fontSize="12px" 
                   fontWeight="bold" 
                   bg="#C0FFE1" 
                    border="1px solid #95C7AF" 
                    borderRadius="16px" 
                   p="4px 8px" 
                    display="inline-flex" 
                    alignItems="center"
                    ml="5px"
                    color="#027A48"
                    >
                      <Icon as={GoDotFill} boxSize={3} mr={1} /> {item.status}
                    </Box>
                </Td>

              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>

      <Box bg="#fff" border="1px solid #EFEFEF" mt="12px" py='17px' px="18px" rounded='10px'>
        <Flex justifyContent="space-between" flexWrap="wrap">
          <Text bg="#fff" color="#667085" p="12px" lineHeight="20px" fontSize="13px" fontWeight="400" label="See how student statuses have changed month over month. Use filters to view trends by approval, pending, or rejection status." placement='top-end'>
            <HStack spacing="5px">
              <Text color={"#1F2937"} fontWeight={"600"} fontSize={"17px"}>Fund Disbursements Overtime </Text>

              <IoInformationCircleOutline />
            </HStack>
          </Text>

          <HStack bg="#E8FFF4" rounded='7px' py="3.5px" px="5px" cursor="pointer" mt={["10px", "10px", "0px", "0px"]}>

            <Box borderRight="1px solid #EDEFF2" pr="5px" onClick={() => {
              setApproved(true) 
              setPending(false)
              setRejected(false)
            }}>
              <Text py='8.5px' px="12px" bg={Approved ? "#fff" : "transparent"} rounded="7px" color={"#1F2937"} fontWeight={"500"} fontSize={"13px"}>Approved</Text>
            </Box>
            <Box borderRight="1px solid #EDEFF2" pr="5px" onClick={() => {
              setApproved(false)
              setPending(true)
              setRejected(false)
            }}>
              <Text py='8.5px' px="12px" bg={Pending ? "#fff" : "transparent"} rounded="7px" color={"#1F2937"} fontWeight={"500"} fontSize={"13px"}>Pending</Text>
            </Box>
            <Box pr="5px" onClick={() => {
              setApproved(false)
              setPending(false)
              setRejected(true)
            }}>
              <Text py='8.5px' px="12px" bg={Rejected ? "#fff" : "transparent"} rounded="7px" color={"#1F2937"} fontWeight={"500"} fontSize={"13px"}>Rejected</Text>
            </Box>

          </HStack>

        </Flex>

        <HStack mt="4px">
          <Text fontSize="26px" fontWeight="700" >134</Text>
          <HStack bg="#C0FFE1" px="3px" alignItems="center" py="1px" fontWeight="500" fontSize="11.66px" rounded="100px" color="#000" spacing="1px">
            <FaArrowUpLong />
            <Text top="1px" pos="relative">12%</Text>
          </HStack>
          <Text color="#686C75" fontWeight="400" fontSize="14px">vs last month</Text>
        </HStack>


        <Box mt="27px" overflowX="auto" w="100%">
          <BarChart width={950} height={300} data={Approved ? Data : Pending ? PendingData : RejectedData} margin={{ top: 0, right: 0, left: 0, bottom: 5 }} barSize={20} label>
            <XAxis dataKey="name" scale={"point"} padding={{ left: 10, right: 10 }} fontSize="12px" fontWeight="500" color="#667085" />
            <YAxis />
            <Tooltip />
            <Legend />
            <CartesianGrid strokeDasharray="3 3" />
            <Bar dataKey={"students"} fill="#39996B" background={{ fill: "#E8FFF4" }} />

          </BarChart>
        </Box>

      </Box>

    </Box>
    </MainLayout>
  );
};


