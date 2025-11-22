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
  useDisclosure,
  TableContainer,
} from "@chakra-ui/react";
import { IoIosSearch } from "react-icons/io";
import { IoFilter } from "react-icons/io5";
import MainLayout from "../../DashboardLayout";
import Preloader from "../../Components/Preloader";
import Pagination from "../../Components/Pagination";
import TableRow from "../../Components/TableRow";
import { configuration } from "../../Utils/Helpers";
import { GetAllSuperAdminStudentsApi } from "../../Utils/ApiCall";

export default function Students() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  // ✅ States
  const [pendingStudents, setPendingStudents] = useState([]);
  const [approvedStudents, setApprovedStudents] = useState([]);
  const [rejectedStudents, setRejectedStudents] = useState([]);

  const [currentPagePending, setCurrentPagePending] = useState(1);
  const [currentPageApproved, setCurrentPageApproved] = useState(1);
  const [currentPageRejected, setCurrentPageRejected] = useState(1);

  const [totalPending, setTotalPending] = useState(0);
  const [totalApproved, setTotalApproved] = useState(0);
  const [totalRejected, setTotalRejected] = useState(0);

  const [PostPerPage] = useState(configuration.sizePerPage);
  const [isLoading, setIsLoading] = useState(true);
  const [status, setStatus] = useState("PENDING");

  // ✅ Fetch function
  const GetAllStudents = async (status, page) => {
    try {
      setIsLoading(true);
      const result = await GetAllSuperAdminStudentsApi(page, PostPerPage, status);
      console.log("Fetched Students:", status, result);

      if (result.status === 200 && result.data.data?.students) {
        const students = result.data.data.students;
        const totalItems = result.data.data.totalItems || 0;

        if (status === "PENDING") {
          setPendingStudents(students);
          setTotalPending(totalItems);
        } else if (status === "APPROVED") {
          setApprovedStudents(students);
          setTotalApproved(totalItems);
        } else if (status === "REJECTED") {
          setRejectedStudents(students);
          setTotalRejected(totalItems);
        }
      }
    } catch (error) {
      console.log("Error fetching students:", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  // ✅ Tab fetch handlers
  const FetchPending = () => setCurrentPagePending(1);
  const FetchApproved = () => setCurrentPageApproved(1);
  const FetchRejected = () => setCurrentPageRejected(1);

  // ✅ Effects per tab pagination
  useEffect(() => {
    GetAllStudents("PENDING", currentPagePending);
  }, [currentPagePending]);

  useEffect(() => {
    GetAllStudents("APPROVED", currentPageApproved);
  }, [currentPageApproved]);

  useEffect(() => {
    GetAllStudents("REJECTED", currentPageRejected);
  }, [currentPageRejected]);

  const totalStudents = totalPending + totalApproved + totalRejected;

  return (
    <MainLayout>
      {isLoading && <Preloader />}

      <Box p={{ base: 3, sm: 4, md: 6 }}>
        <Text fontSize={{ base: "18px", md: "21px" }} fontWeight="600" color="#101828" mb="20px">
          Students{" "}
          <span style={{ color: "#667085", fontWeight: "400" }}>
            ({totalStudents})
          </span>
        </Text>

        <Box
          border="1px solid #E7E9EC"
          py={{ base: "16px", md: "20px" }}
          px={{ base: "15px", md: "31px" }}
          borderRadius="10px"
          overflowX={{ base: "auto", md: "visible" }}
        >
          <Tabs
            isFitted
            variant="unstyled"
            index={["PENDING", "APPROVED", "REJECTED"].indexOf(status)}
            onChange={(i) => setStatus(["PENDING", "APPROVED", "REJECTED"][i])}
          >
            {/* Header row */}
            <Flex
              justifyContent={{ base: "center", md: "space-between" }}
              alignItems="center"
              flexWrap="wrap"
              gap={{ base: 3, md: 0 }}
            >
              {/* Tabs */}
              <TabList border="1px solid #E7E9EC" rounded="7px" flexWrap="wrap" justifyContent="center">
                <Tab
                  onClick={FetchPending}
                  fontWeight="500"
                  fontSize="13px"
                  py="8.5px"
                  px="12px"
                  _hover={{ bg: "#F8FAFC" }}
                  _selected={{ color: "#027A48", fontWeight: "600", bg: "#E6FFF2" }}
                  _focus={{ boxShadow: "none" }}
                >
                  Pending ({totalPending})
                </Tab>

                <Tab
                  onClick={FetchApproved}
                  fontWeight="500"
                  fontSize="13px"
                  py="8.5px"
                  px="12px"
                  borderLeft="1px solid #E7E9EC"
                  _hover={{ bg: "#F8FAFC" }}
                  _selected={{ color: "#027A48", fontWeight: "600", bg: "#E6FFF2" }}
                  _focus={{ boxShadow: "none" }}
                >
                  Approved ({totalApproved})
                </Tab>

                <Tab
                  onClick={FetchRejected}
                  fontWeight="500"
                  fontSize="13px"
                  py="8.5px"
                  px="12px"
                  borderLeft="1px solid #E7E9EC"
                  _hover={{ bg: "#F8FAFC" }}
                  _selected={{ color: "#027A48", fontWeight: "600", bg: "#E6FFF2" }}
                  _focus={{ boxShadow: "none" }}
                >
                  Rejected ({totalRejected})
                </Tab>
              </TabList>

              {/* Search + Filter */}
              <Flex alignItems="center" gap={2}>
                <Box
                  p="8px"
                  bg="transparent"
                  border="1px solid #E3E5E8"
                  borderRadius="7px"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  <IoIosSearch fontSize="16px" />
                </Box>

                <Menu isLazy>
                  <MenuButton as={Box}>
                    <HStack
                      border="1px solid #E3E5E8"
                      w={{ base: "80px", md: "96px" }}
                      h="38px"
                      rounded="7px"
                      justify="center"
                      align="center"
                      p="6px"
                      color="#2F2F2F"
                      fontWeight="500"
                      fontSize={{ base: "13px", md: "14px" }}
                    >
                      <IoFilter />
                      <Text>Filter</Text>
                    </HStack>
                  </MenuButton>
                </Menu>
              </Flex>
            </Flex>

            {/* Panels */}
            <TabPanels>
              {/* PENDING */}
              <TabPanel>
                <Box mt="12px" bg="#fff" border="2px solid #EFEFEF" py="30px" px={{ base: "8px", md: "18px" }} rounded="10px">
                  <TableContainer border="1px solid #EDEFF2" borderRadius="7px">
                    <Table variant="simple">
                      <Thead>
                        <Tr>
                          <Th fontSize={{ base: "12px", md: "14px" }}>Name</Th>
                          <Th fontSize={{ base: "12px", md: "14px" }}>School Name</Th>
                          <Th fontSize={{ base: "12px", md: "14px" }}>Essay Score</Th>
                          <Th fontSize={{ base: "12px", md: "14px" }}>Field of Study</Th>
                          <Th fontSize={{ base: "12px", md: "14px" }}>Status</Th>
                          <Th fontSize={{ base: "12px", md: "14px" }}>Actions</Th>
                        </Tr>
                      </Thead>
                      <Tbody>
                        {pendingStudents.length > 0 ? (
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
                          <Tr>
                            <Td colSpan={6} textAlign="center" py={6}>
                              <Text fontSize="14px" color="#767F8E" fontWeight="500">
                                No Pending Students found.
                              </Text>
                            </Td>
                          </Tr>
                        )}
                      </Tbody>
                    </Table>
                  </TableContainer>

                  <Pagination
                    currentPage={currentPagePending}
                    totalPosts={totalPending}
                    postsPerPage={PostPerPage}
                    paginate={setCurrentPagePending}
                  />
                </Box>
              </TabPanel>

              {/* APPROVED */}
              <TabPanel>
                <Box mt="12px" bg="#fff" border="2px solid #EFEFEF" py="30px" px={{ base: "8px", md: "18px" }} rounded="10px">
                  <TableContainer border="1px solid #EDEFF2" borderRadius="7px">
                    <Table variant="simple">
                      <Thead>
                        <Tr>
                          <Th fontSize={{ base: "12px", md: "14px" }}>Name</Th>
                          <Th fontSize={{ base: "12px", md: "14px" }}>School Name</Th>
                          <Th fontSize={{ base: "12px", md: "14px" }}>Essay Score</Th>
                          <Th fontSize={{ base: "12px", md: "14px" }}>Field of Study</Th>
                          <Th fontSize={{ base: "12px", md: "14px" }}>Status</Th>
                          <Th fontSize={{ base: "12px", md: "14px" }}>Actions</Th>
                        </Tr>
                      </Thead>
                      <Tbody>
                        {approvedStudents.length > 0 ? (
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
                          <Tr>
                            <Td colSpan={6} textAlign="center" py={6}>
                              <Text fontSize="14px" color="#767F8E" fontWeight="500">
                                No Approved Students found.
                              </Text>
                            </Td>
                          </Tr>
                        )}
                      </Tbody>
                    </Table>
                  </TableContainer>

                  <Pagination
                    currentPage={currentPageApproved}
                    totalPosts={totalApproved}
                    postsPerPage={PostPerPage}
                    paginate={setCurrentPageApproved}
                  />
                </Box>
              </TabPanel>

              {/* REJECTED */}
              <TabPanel>
                <Box mt="12px" bg="#fff" border="2px solid #EFEFEF" py="30px" px={{ base: "8px", md: "18px" }} rounded="10px">
                  <TableContainer border="1px solid #EDEFF2" borderRadius="7px">
                    <Table variant="simple">
                      <Thead>
                        <Tr>
                          <Th fontSize={{ base: "12px", md: "14px" }}>Name</Th>
                          <Th fontSize={{ base: "12px", md: "14px" }}>School Name</Th>
                          <Th fontSize={{ base: "12px", md: "14px" }}>Essay Score</Th>
                          <Th fontSize={{ base: "12px", md: "14px" }}>Field of Study</Th>
                          <Th fontSize={{ base: "12px", md: "14px" }}>Status</Th>
                          <Th fontSize={{ base: "12px", md: "14px" }}>Actions</Th>
                        </Tr>
                      </Thead>
                      <Tbody>
                        {rejectedStudents.length > 0 ? (
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
                          <Tr>
                            <Td colSpan={6} textAlign="center" py={6}>
                              <Text fontSize="14px" color="#767F8E" fontWeight="500">
                                No Rejected Students found.
                              </Text>
                            </Td>
                          </Tr>
                        )}
                      </Tbody>
                    </Table>
                  </TableContainer>

                  <Pagination
                    currentPage={currentPageRejected}
                    totalPosts={totalRejected}
                    postsPerPage={PostPerPage}
                    paginate={setCurrentPageRejected}
                  />
                </Box>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </Box>
    </MainLayout>
  );
}
