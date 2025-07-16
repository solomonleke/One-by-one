import { useState, useEffect } from "react";
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
  Tabs,
  TabList,
  TabPanels,
  TabPanel,
  Tab,
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
import { GetAllSuperAdminStudentsApi } from "../../Utils/ApiCall";


export default function Schools() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [TotalPage, setTotalPage] = useState("");
  const [search, setSearch] = useState("");
  const [pendingStudents, setPendingStudents] = useState([]);
  const [approvedStudents, setApprovedStudents] = useState([]);
  const [rejectedStudents, setRejectedStudents] = useState([]);
  const [CurrentPage, setCurrentPage] = useState(1);
  const [PostPerPage, setPostPerPage] = useState(configuration.sizePerPage);
  const [status, setStatus] = useState("PENDING");
  // Pagination settings to follow


  // Pagination settings to follow end here



  const GetAllStudents = async (status) => {
    try {
      const result = await GetAllSuperAdminStudentsApi(CurrentPage, PostPerPage, status);
      console.log("getallStudents", result);



      if (result.status === 200 && result.data.data?.students?.length > 0) {
        const students = result.data.data.students;
        const totalPosts = result.data.data.totalItems;
        setTotalPage(totalPosts);
        if (status === "PENDING") {
          setPendingStudents(students);
        } else if (status === "APPROVED") {
          setApprovedStudents(students);
        } else if (status === "REJECTED") {
          setRejectedStudents(students);
        }
      } else {
        if (status === "PENDING") {
          setPendingStudents([]);
        } else if (status === "APPROVED") {
          setApprovedStudents([]);
        } else if (status === "REJECTED") {
          setRejectedStudents([]);
        }
      }
    } catch (e) {
      console.log("error", e.message);
    }
  };
  const totalStudents = pendingStudents.length + approvedStudents.length + rejectedStudents.length;




  // Handle page change
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    GetAllStudents(status);
  }, [CurrentPage, PostPerPage]);



  return (
    <MainLayout>
      <Box p={6}>
        <Text fontSize="21px" fontWeight="600" color="#101828" mb="28px">
          Students <span style={{ color: "#667085", fontWeight: "400" }}>({totalStudents})</span>
        </Text>

        <Box border="1px solid #E7E9EC" py="20px" px="31px" borderRadius="10px">
          <Tabs
            index={["PENDING", "APPROVED", "REJECTED"].indexOf(status)}
            onChange={(index) => setStatus(["PENDING", "APPROVED", "REJECTED"][index])}
            isFitted
            variant="unstyled"
          >
            <Flex justifyContent="space-between" flexWrap="wrap" alignItems="center">
              <TabList border="1px solid #E7E9EC" rounded="7px" mt={["10px", "10px", "0px", "0px"]}>
                <Tab
                  fontWeight="500"
                  fontSize="13px"
                  py="8.5px"
                  px="12px"
                  _selected={{ color: "blue.500" }}
                >
                  Pending Approval ({pendingStudents.length})
                </Tab>
                <Tab
                  fontWeight="500"
                  fontSize="13px"
                  py="8.5px"
                  px="12px"
                  _selected={{ color: "blue.500" }}
                >
                  Approved ({approvedStudents.length})
                </Tab>
                <Tab
                  fontWeight="500"
                  fontSize="13px"
                  py="8.5px"
                  px="12px"
                  _selected={{ color: "blue.500" }}
                >
                  Rejected ({rejectedStudents.length})
                </Tab>
              </TabList>

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

            </Flex>


            <TabPanels>
              <TabPanel>
                <Box mt="12px" bg="#fff" border="2px solid #EFEFEF" py='30px' px={["8px", "8px", "18px", "18px"]} rounded='10px'>
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
                        {
                          pendingStudents.length > 0 ? (
                            pendingStudents.map((item, i) => (

                              <TableRow
                                key={i}
                                type="super-admin-students"
                                name={item.studentFullName}
                                email={item.studentEmail}
                                schoolName={item.schoolName}
                                essayScore={item.essayRating}
                                fieldOfStudy={item.fieldOfStudy}
                                status={item.status}
                              />

                            ))
                          ) : (
                            <Text textAlign="center" py={5} ml="20px">
                              No Pending Schools found.
                            </Text>
                          )
                        }

                      </Tbody>
                    </Table>
                  </TableContainer>
                </Box>
              </TabPanel>
              <TabPanel>
                <Box mt="12px" bg="#fff" border="2px solid #EFEFEF" py='30px' px={["8px", "8px", "18px", "18px"]} rounded='10px'>
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
                        {
                          approvedStudents.length > 0 ? (
                            approvedStudents.map((item, i) => (

                              <TableRow
                                key={i}
                                type="super-admin-students"
                                name={item.studentFullName}
                                email={item.studentEmail}
                                schoolName={item.schoolName}
                                essayScore={item.essayRating}
                                fieldOfStudy={item.fieldOfStudy}
                                status={item.status}
                              />

                            ))
                          ) : (
                            <Text textAlign="center" py={5} ml="20px">
                              No Pending Schools found.
                            </Text>
                          )
                        }

                      </Tbody>
                    </Table>
                  </TableContainer>
                </Box>
              </TabPanel>
              <TabPanel>
                <Box mt="12px" bg="#fff" border="2px solid #EFEFEF" py='30px' px={["8px", "8px", "18px", "18px"]} rounded='10px'>
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
                        {
                          rejectedStudents.length > 0 ? (
                            rejectedStudents.map((item, i) => (

                              <TableRow
                                key={i}
                                type="super-admin-students"
                                name={item.studentFullName}
                                email={item.studentEmail}
                                schoolName={item.schoolName}
                                essayScore={item.essayRating}
                                fieldOfStudy={item.fieldOfStudy}
                                status={item.status}
                              />

                            ))
                          ) : (
                            <Text textAlign="center" py={5} ml="20px">
                              No Pending Schools found.
                            </Text>
                          )
                        }

                      </Tbody>
                    </Table>
                  </TableContainer>
                </Box>
              </TabPanel>

            </TabPanels>
          </Tabs>

        </Box>

        <Pagination
          currentPage={CurrentPage}
          postsPerPage={PostPerPage}
          totalPosts={TotalPage}
          paginate={paginate}
        />
      </Box>
    </MainLayout>
  );
};

