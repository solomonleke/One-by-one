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
import Pagination from "../../Components/Pagination";
import TableRow from "../../Components/TableRow"
import { IoIosSearch } from "react-icons/io";


export default function Schools() {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const schoolsData = [
    {
      name: 'Legendary Scholars Academy',
      email: 'legendaryscholarsacademy@gmail.com',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/8/89/HD_transparent_picture.png',
      principal: 'Deborah Olabode',
      approvedStudents: 15,
      state: 'Lagos',
      city: 'Okota',
      submissionDate: '11/27/2024 21:19',
    },
    {
      name: 'Queen\'s College',
      email: 'queenscollege@gmail.com',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/8/89/HD_transparent_picture.png',
      principal: 'Elizabeth Aluko',
      approvedStudents: 17,
      state: 'Ogun',
      city: 'Abeokuta',
      submissionDate: '12/02/2024 12:14',
    },
    {
      name: 'Federal Government College',
      email: 'federalgovernmentcollege@gmail.com',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/8/89/HD_transparent_picture.png',
      principal: 'Samuel Olaboda',
      approvedStudents: 4,
      state: 'Katsina',
      city: 'Batseri',
      submissionDate: '12/02/2024 12:32',
    },
    {
      name: 'Mayflower School',
      email: 'mayflowerschool@gmail.com',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/8/89/HD_transparent_picture.png',
      principal: 'Paul Jibrin',
      approvedStudents: 6,
      state: 'Osun',
      city: 'Osogbo',
      submissionDate: '12/09/2024 00:37',
    },
    {
      name: 'Chrisland College',
      email: 'chrislandcollege@gmail.com',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/8/89/HD_transparent_picture.png',
      principal: 'Naomi Nwankwo',
      approvedStudents: 9,
      state: 'Lagos',
      city: 'Eti-osa',
      submissionDate: '12/16/2024 16:48',
    },
    {
      name: 'Christ the King College',
      email: 'christthekingcollege@gmail.com',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/8/89/HD_transparent_picture.png',
      principal: 'Daniel Abubakar',
      approvedStudents: 13,
      state: 'Lagos',
      city: 'Ikeja',
      submissionDate: '12/17/2024 19:45',
    },
    {
      name: 'Corona Secondary School',
      email: 'coronasecondaryschool@gmail.com',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/8/89/HD_transparent_picture.png',
      principal: 'Elizabeth Isa',
      approvedStudents: 33,
      state: 'Rivers',
      city: 'Portharcourt',
      submissionDate: '12/22/2024 07:25',
    },
    {
      name: 'Adesoye College',
      email: 'adesoyecollege@gmail.com',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/8/89/HD_transparent_picture.png',
      principal: 'Elizabeth Umar',
      approvedStudents: 6,
      state: 'Lagos',
      city: 'Ikotun',
      submissionDate: '12/23/2024 16:51',
    },
  ];




  // Filter students first
const filteredSchools = schoolsData.filter((school) =>
  school.name.toLowerCase().includes(search.toLowerCase())
);

// Then paginate the filtered list
const indexOfLastItem = currentPage * itemsPerPage;
const indexOfFirstItem = indexOfLastItem - itemsPerPage;
const currentItems = filteredSchools.slice(indexOfFirstItem, indexOfLastItem);

// Handle page change
const paginate = (pageNumber) => {
  setCurrentPage(pageNumber);
};

  return (
    <MainLayout>
      <Box p={6}>
        <Text fontSize="21px" fontWeight="600" color="#101828" mb="28px">
          Schools <span style={{ color: "#667085", fontWeight: "400" }}>(34)</span>
        </Text>

        <Box border="1px solid #E7E9EC" py="20px" px="31px" borderRadius="10px">
          <Flex justifyContent="space-between" flexWrap="wrap">
            <Flex alignItems="center" flexWrap='wrap' bg="#fff" border="1px solid #E7E9EC" rounded='7px' py="3.5px" px="5px" cursor="pointer" mt={["10px", "10px", "0px", "0px"]}>


              <Box borderRight="1px solid #EDEFF2" pr="5px" >
                <Text py='8.5px' px="12px" bg="transparent" rounded="7px" color={"#1F2937"} fontWeight={"500"} fontSize={"13px"}>Pending Approval (7)</Text>
              </Box>
              <Box borderRight="1px solid #EDEFF2" pr="5px" >
                <Text py='8.5px' px="12px" bg="transparent" rounded="7px" color={"#1F2937"} fontWeight={"500"} fontSize={"13px"}>Approved (25)</Text>
              </Box>
              <Box pr="5px" >
                <Text py='8.5px' px="12px" bg="transparent" rounded="7px" color={"#1F2937"} fontWeight={"500"} fontSize={"13px"}>Rejected (2)</Text>
              </Box>

            </Flex>

            <Box
              p="10px"
              bg="transparent"
              border="1px solid #E3E5E8"
              borderRadius="7px"
              display="inline-flex"
              alignItems="center"
              justifyContent="center"
            >
              <IoIosSearch fontSize="17px" />
            </Box>


          </Flex>


          <TableContainer border="1px solid #EDEFF2" borderRadius="7px" mt="15px">
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>Name</Th>
                  <Th>Principal</Th>
                  <Th>Approved Students</Th>
                  <Th>State</Th>
                  <Th>City</Th>
                  <Th>Submission Date</Th>
                  <Th>Actions</Th>

                </Tr>
              </Thead>
              <Tbody>
                {currentItems.map((item, index) => (
                  <TableRow
                    key={index}
                    type="super-admin-schools"
                    name={item.name}
                    email={item.email}
                    principal={item.principal}
                    approvedStudents={item.approvedStudents}
                    state={item.state}
                    city={item.city}
                    submissionDate={item.submissionDate}
                  />
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        </Box>


        <Pagination
        totalPosts={filteredSchools.length}
        postsPerPage={itemsPerPage}
        currentPage={currentPage}
        paginate={paginate}
      />
      </Box>
    </MainLayout>
  );
};

