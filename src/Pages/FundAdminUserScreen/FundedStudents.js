import { useState, useEffect } from "react";
import {
  Box,
  Flex,
  IconButton,
  VStack,
  Text,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  Stack,
  Avatar,
  useBreakpointValue,
  TableContainer,
  Icon,
} from "@chakra-ui/react";
import { FiHome, FiSettings, FiFileText, FiUsers, FiMenu } from "react-icons/fi";
import MainLayout from "../../DashboardLayout";
import { GoArrowLeft, GoArrowRight, GoDotFill } from "react-icons/go";
import InputX from "../../Components/InputX"
import { configuration } from "../../Utils/Helpers";
import { GetAllRequestFundsApi } from "../../Utils/ApiCall";
import TableRow from "../../Components/TableRow"




export default function FundedStudents() {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  console.log("currentpage", currentPage);
  const [postPerPage, setPostPerPage] = useState(configuration.sizePerPage);
  const [TotalPage, setTotalPage] = useState("");
  const [FundRequests, setFundRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [pageNo, setPageNo] = useState(1);

  const students = [
    {
      name: "Paul Timipre",
      school: "Legendary Scholars Academy",
      classLevel: "SS2",
      sponsor: "Esther Ekisagha",
      tuitionFee: "₦200,000.00",
      tuitionStatus: "Paid",
      stationaryFee: "₦200,000.00"
    },
    {
      name: "Daniel Benibo",
      school: "Queen’s College",
      classLevel: "SS3",
      sponsor: "Martha Nwankwo",
      tuitionFee: "₦500,000.00",
      tuitionStatus: "Paid",
      stationaryFee: "₦500,000.00"
    },
    {
      name: "Grace Oyebanjo",
      school: "Federal Government College",
      classLevel: "SS2",
      sponsor: "Lydia Adekola",
      tuitionFee: "₦690,000.00",
      tuitionStatus: "Paid",
      stationaryFee: "₦690,000.00"
    },
    {
      name: "James Okafor",
      school: "Mayflower School",
      classLevel: "SS3",
      sponsor: "Lydia Kemepade",
      tuitionFee: "₦130,000.00",
      tuitionStatus: "Paid",
      stationaryFee: "₦130,000.00"
    },
    {
      name: "Daniel Orji",
      school: "Chrisland College",
      classLevel: "JS2",
      sponsor: "Rebecca Usman",
      tuitionFee: "₦100,000.00",
      tuitionStatus: "Paid",
      stationaryFee: "₦100,000.00"
    },
    {
      name: "Samuel Uzo",
      school: "Christ The King College",
      classLevel: "SS1",
      sponsor: "Esther Opuogbo",
      tuitionFee: "₦200,000.00",
      tuitionStatus: "Paid",
      stationaryFee: "₦200,000.00"
    },
    {
      name: "Lydia Abiodun",
      school: "Corona Secondary School",
      classLevel: "JS3",
      sponsor: "Joseph Soyinka",
      tuitionFee: "₦225,000.00",
      tuitionStatus: "Paid",
      stationaryFee: "₦225,000.00"
    },
    {
      name: "Peter Kemepade",
      school: "Adesoye College",
      classLevel: "SS2",
      sponsor: "Daniel Kuroebi",
      tuitionFee: "₦370,000.00",
      tuitionStatus: "Paid",
      stationaryFee: "₦370,000.00"
    }
  ];

  const fetchFundRequests = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await GetAllRequestFundsApi(pageNo, currentPage, postPerPage, true); // false = unfunded only
      console.log("response", response);
      setFundRequests(response.data?.data.requests || []); // adjust depending on API response structure
      setTotalPage(response.data.data.totalPages || []); // adjust depending on API response structure
      const totalPosts = response.data.totalPages * postPerPage;
      setTotalPage(totalPosts);
    } catch (err) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {

    fetchFundRequests()

  }, [pageNo]);



  const filteredStudents = students.filter((student) =>
    student.name.toLowerCase().includes(search.toLowerCase())
  );



  return (
    <MainLayout>
      <Box p={6}>
        <Text fontSize="21px" fontWeight="bold" color="#101828">
          Funded Students <span style={{ color: "#667085", fontWeight: "400" }}>({FundRequests.length})</span>
        </Text>

        <Text mb={4} fontSize="14px">Explore a diverse pool of students and their academic aspirations. Review profiles, understand funding needs, and choose who to support on their educational journey.</Text>

        <Flex justify="space-between" align="center">
          <InputX label="Search Students" maxW="600px" />

        </Flex>


        <TableContainer border="1px solid #EDEFF2" borderRadius="7px" mt="15px">
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Student Name</Th>
                <Th>School Name</Th>
                <Th>class Level</Th>
                <Th>sponsor</Th>
                <Th>tuition Fee</Th>
                <Th>tuition Status</Th>
                <Th>stationary Fee</Th>

              </Tr>
            </Thead>
            <Tbody>
              {FundRequests.map((student, index) => (
                <TableRow
                  key={index}
                  type="funded-students"
                  name={student.student_name}
                  school={student.school_name}
                  classLevel={student.student_class_level}
                  guardian={student.guardian_name}
                  tuition={student.fees_amount}
                  status={student.fees_status}
                  stationary={student.stationery_fund}
                />
              ))}
            </Tbody>
          </Table>
        </TableContainer>

        {/* Pagination Controls */}
        <Flex mt="15px" justify="space-between" align="center" border="1px solid #EDEFF2" borderRadius="7px" padding="12px 24px">
          {/* Previous Button */}
          {/* <Button 
      leftIcon={<GoArrowLeft />} 
      variant="outline" 
      borderRadius="8px"
    >
      {useBreakpointValue({ base: "", md: "Previous" })}
    </Button> */}

          {/* Pagination Numbers */}
          {/* <Flex gap={2}>
      {useBreakpointValue({
        base: [1, 2, 3, "...", 10],  // Fewer numbers on small screens
        md: [1, 2, 3, "...", 8, 9, 10] // More numbers on larger screens
      }).map((num, index) => (
        <Button key={index} variant={num === 1 ? "solid" : "outline"}>
          {num}
        </Button>
      ))}
    </Flex> */}

          {/* Next Button */}
          {/* <Button 
      rightIcon={<GoArrowRight />} 
      variant="outline" 
      borderRadius="8px"
    >
      {useBreakpointValue({ base: "", md: "Next" })}
    </Button> */}
        </Flex>
      </Box>
    </MainLayout>
  );
};

