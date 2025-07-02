import { useState } from "react";
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



export default function FundedStudents(){
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

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
  
  

  const filteredStudents = students.filter((student) =>
    student.name.toLowerCase().includes(search.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredStudents.slice(indexOfFirstItem, indexOfLastItem);

  return (
      <MainLayout>
      <Box p={6}>
      <Text fontSize="21px" fontWeight="bold" color="#101828">
  Funded Students <span style={{ color: "#667085", fontWeight:"400" }}>(65)</span>
</Text>

        <Text mb={4} fontSize="14px">Explore a diverse pool of students and their academic aspirations. Review profiles, understand funding needs, and choose who to support on their educational journey.</Text>
        
        <Flex  justify="space-between" align="center">
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
              {students.map((student, index) => (
                <Tr key={index}>
                  <Td>
                    <Flex align="center">
                      <Avatar size="sm" name={student.name} mr={2} />
                      {student.name}
                    </Flex>
                  </Td>
                  <Td>{student.school}</Td>
                  <Td>{student.classLevel}</Td>
                  <Td>{student.sponsor}</Td>
                  <Td >{student.tuitionFee}</Td>
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
                                        <Icon as={GoDotFill} boxSize={3} mr={1} /> {student.tuitionStatus}
                                      </Box>
                                  </Td>
                  <Td >{student.stationaryFee}</Td>
                </Tr>
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
  
