import { useState } from "react";
import {
  Box,
  Flex,
  Menu,
  MenuButton,
  HStack,
  Text,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  useDisclosure,
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
import Pagination from "../../Components/Pagination";
import TableRow from "../../Components/TableRow"
import { IoIosSearch } from "react-icons/io";
import { IoFilter } from "react-icons/io5";


export default function Schools() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [TotalPage, setTotalPage] = useState("");
  const [search, setSearch] = useState("");
  const itemsPerPage = 5;

  // Pagination settings to follow
  

  // Pagination settings to follow end here

  const students = [
    {
      name: "Philip Amakiri",
      email: "philipamakiri@gmail.com",
      school: "Legendary Scholars Academy",
      essayScore: "50%",
      fieldOfStudy: "Mass Communication",
      status: "Approved",
    },
    {
      name: "David Folarin",
      email: "davidfolarin@gmail.com",
      school: "Queen's College",
      essayScore: "50%",
      fieldOfStudy: "Business Administration",
      status: "Approved",
    },
    {
      name: "Timothy Salisu",
      email: "timothysalisu@gmail.com",
      school: "Federal Government College",
      essayScore: "50%",
      fieldOfStudy: "Chemical Engineering",
      status: "Approved",
    },
    {
      name: "Peter Usman",
      email: "peterusman@gmail.com",
      school: "Mayflower School",
      essayScore: "50%",
      fieldOfStudy: "Accounting",
      status: "Approved",
    },
    {
      name: "Esther Wakili",
      email: "estherwakili@gmail.com",
      school: "Chrisland College",
      essayScore: "50%",
      fieldOfStudy: "Banking And Finance",
      status: "Approved",
    },
    {
      name: "Simon Ogan",
      email: "simonogan@gmail.com",
      school: "Christ The King College",
      essayScore: "50%",
      fieldOfStudy: "Law",
      status: "Approved",
    },
    {
      name: "Esther Abubakar",
      email: "estherabubakar@gmail.com",
      school: "Corona Secondary School",
      essayScore: "50%",
      fieldOfStudy: "Medicine And Surgery",
      status: "Approved",
    },
    {
      name: "Philip Ezeoke",
      email: "philipezeoke@gmail.com",
      school: "Adoseyo College",
      essayScore: "50%",
      fieldOfStudy: "Industrial Chemistry",
      status: "Approved",
    },
  ];

  const [currentPage, setCurrentPage] = useState(1);


// Filter students first
const filteredStudents = students.filter((student) =>
  student.name.toLowerCase().includes(search.toLowerCase())
);

// Then paginate the filtered list
const indexOfLastItem = currentPage * itemsPerPage;
const indexOfFirstItem = indexOfLastItem - itemsPerPage;
const currentItems = filteredStudents.slice(indexOfFirstItem, indexOfLastItem);

// Handle page change
const paginate = (pageNumber) => {
  setCurrentPage(pageNumber);
};


  

  return (
    <MainLayout>
      <Box p={6}>
        <Text fontSize="21px" fontWeight="600" color="#101828" mb="28px">
          Students <span style={{ color: "#667085", fontWeight: "400" }}>(34)</span>
        </Text>

        <Box border="1px solid #E7E9EC"   py="20px" px="31px" borderRadius="10px">
          <Flex justifyContent="space-between" alignItems="center" flexWrap="wrap">
            <Flex alignItems="center" flexWrap='wrap' bg="#fff" border="1px solid #E7E9EC" rounded='7px' py="3.5px" px="5px" cursor="pointer" mt={["10px", "10px", "0px", "0px"]}>


              <Box borderRight="1px solid #EDEFF2" pr="5px" >
                <Text py='8.5px' px="12px" bg="transparent" rounded="7px" color={"#1F2937"} fontWeight={"500"} fontSize={"13px"}>Pending Approval (7)</Text>
              </Box>
              <Box borderRight="1px solid #EDEFF2" pr="5px" >
                <Text py='8.5px' px="12px" bg="transparent" rounded="7px" color={"#1F2937"} fontWeight={"500"} fontSize={"13px"}>Approved (25)</Text>
              </Box>
              <Box borderRight="1px solid #EDEFF2" pr="5px" >
                <Text py='8.5px' px="12px" bg="transparent" rounded="7px" color={"#1F2937"} fontWeight={"500"} fontSize={"13px"}>Rejected (2)</Text>
              </Box>
              <Box pr="5px" >
                <Text py='8.5px' px="12px" bg="transparent" rounded="7px" color={"#1F2937"} fontWeight={"500"} fontSize={"13px"}>Funded Students (25)</Text>
              </Box>

            </Flex>

            <Box display="flex" gap="11px" alignItems="center">
            <Box
              p="10px"
              w="41px"
              h="41px"
              bg="transparent"
              border="1px solid #E3E5E8"
              borderRadius="7px"
              display="inline-flex"
              alignItems="center"
              justifyContent="center"
            >
              <IoIosSearch fontSize="17px" />
            </Box>

            <Menu isLazy>
              <MenuButton as={Box}>
                <HStack
                  border="1px solid #E3E5E8" w="96px" h="40px" rounded="7px" justify="center" align="center" p='6px' color='#2F2F2F' fontWeight="500" fontSize="14px"
                >
                  <IoFilter />
                  <Text>Filter</Text>
                </HStack>
              </MenuButton>
            </Menu>
            </Box>

          </Flex>


          <TableContainer border="1px solid #EDEFF2" borderRadius="7px" mt="15px">
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th fontSize="14px" fontWeight="500" >Name</Th>
                  <Th fontSize="14px" fontWeight="500" >School Name</Th>
                  <Th fontSize="14px" fontWeight="500">Essay Score</Th>
                  <Th fontSize="14px" fontWeight="500">Field of Study</Th>
                  <Th fontSize="14px" fontWeight="500">Status</Th>
                  <Th fontSize="14px" fontWeight="500">Actions</Th>

                </Tr>
              </Thead>
              <Tbody>
                {currentItems.map((item, index) => (
                  <TableRow
                    key={index}
                    type="super-admin-students"
                    name={item.name}
                    email={item.email}
                    schoolName={item.school}
                    essayScore={item.essayScore}
                    fieldOfStudy={item.fieldOfStudy}
                    status={item.status}
                  />
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        </Box>

        


        
        <Pagination
        totalPosts={filteredStudents.length}
        postsPerPage={itemsPerPage}
        currentPage={currentPage}
        paginate={paginate}
      />
      </Box>
    </MainLayout>
  );
};

