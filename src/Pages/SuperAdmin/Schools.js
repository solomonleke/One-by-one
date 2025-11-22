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
  TabPanels,
  TabPanel,
  Tabs,
  TabList,
  Tab,
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
import { configuration } from "../../Utils/Helpers";
import Preloader from "../../Components/Preloader"
import { GetAllSuperAdminSchoolsApi } from "../../Utils/ApiCall";



export default function Schools() {
  const [search, setSearch] = useState("");
  const [currentPagePending, setCurrentPagePending] = useState(1);
  const [currentPageApproved, setCurrentPageApproved] = useState(1);
  const [currentPageRejected, setCurrentPageRejected] = useState(1);

  const [totalPendingItems, setTotalPendingItems] = useState(0);
  const [totalApprovedItems, setTotalApprovedItems] = useState(0);
  const [totalRejectedItems, setTotalRejectedItems] = useState(0);

  const [pendingSchools, setPendingSchools] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [approvedSchools, setApprovedSchools] = useState([]);
  const [rejectedSchools, setRejectedSchools] = useState([]);
  const [PostPerPage] = useState(configuration.sizePerPage); // Changed to const as it's from config
  const [status, setStatus] = useState("PENDING");



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

  const GetAllSchool = async (currentStatus, page) => {
    try {
      setIsLoading(true);
      const result = await GetAllSuperAdminSchoolsApi(page, PostPerPage, currentStatus);
      console.log("getallSchools", result);

      if (result.status === 200 && result.data.data?.schools) {
        const schools = result.data.data.schools;
        const totalItems = Number(result.data.data.totalItems) || 0; // Ensure totalItems is a number

        if (currentStatus === "PENDING") {
          setPendingSchools(schools);
          setTotalPendingItems(totalItems); // Set totalItems
        } else if (currentStatus === "APPROVED") {
          setApprovedSchools(schools);
          setTotalApprovedItems(totalItems); // Set totalItems
        } else if (currentStatus === "REJECTED") {
          setRejectedSchools(schools);
          setTotalRejectedItems(totalItems); // Set totalItems
        }
      } else {
        if (currentStatus === "PENDING") {
          setPendingSchools([]);
          setTotalPendingItems(0); // Reset totalItems
        } else if (currentStatus === "APPROVED") {
          setApprovedSchools([]);
          setTotalApprovedItems(0); // Reset totalItems
        } else if (currentStatus === "REJECTED") {
          setRejectedSchools([]);
          setTotalRejectedItems(0); // Reset totalItems
        }
      }
    } catch (e) {
      console.log("error", e.message);
    } finally {
      setIsLoading(false);
    }
  };

  const totalSchools = totalPendingItems + totalApprovedItems + totalRejectedItems; // Sum of total items

  const handleTabChange = (index) => {
    const newStatus = ["PENDING", "APPROVED", "REJECTED"][index];
    setStatus(newStatus);
    // Reset current page for the new tab
    if (newStatus === "PENDING") setCurrentPagePending(1);
    else if (newStatus === "APPROVED") setCurrentPageApproved(1);
    else if (newStatus === "REJECTED") setCurrentPageRejected(1);
  };

  // Effects for each tab's pagination
  useEffect(() => {
    GetAllSchool("PENDING", currentPagePending);
  }, [currentPagePending]);

  useEffect(() => {
    GetAllSchool("APPROVED", currentPageApproved);
  }, [currentPageApproved]);

  useEffect(() => {
    GetAllSchool("REJECTED", currentPageRejected);
  }, [currentPageRejected]);





  // Filter students first


  // No longer need a single useEffect for status and CurrentPage
  // The individual useEffects for each currentPage handle this.

  return (
    <MainLayout>
      {
        isLoading && <Preloader />
      }
      <Box p={{ base: 3, sm: 4, md: 6 }}>
        <Text fontSize="21px" fontWeight="600" color="#101828" mb="28px">
          Schools <span style={{ color: "#667085", fontWeight: "400" }}>({totalSchools})</span>
        </Text>

        <Box
          border="1px solid #E7E9EC"
          py={{ base: "16px", md: "20px" }}
          px={{ base: "15px", md: "31px" }}
          borderRadius="10px"
          overflowX={{ base: "auto", md: "visible" }}
        >
          <Tabs
            index={["PENDING", "APPROVED", "REJECTED"].indexOf(status)}
            onChange={handleTabChange}
            isFitted
            variant="unstyled"
          >
            <Flex
              justifyContent={{ base: "center", md: "space-between" }}
              alignItems="center"
              flexWrap="wrap"
              gap={{ base: 3, md: 0 }}
            >
              <TabList border="1px solid #E7E9EC" rounded="7px" mt={["10px", "10px", "0px", "0px"]}>
                <Tab
                  fontWeight="500"
                  fontSize="13px"
                  py="8.5px"
                  px="12px"
                  _hover={{ bg: "#F8FAFC" }}
                  _selected={{
                    color: "#027A48", // ✅ green text when active
                    fontWeight: "600",
                    bg: "#E6FFF2", // ✅ subtle green background
                  }}
                  _focus={{ boxShadow: "none" }} // ✅ removes blue outline
                >
                  Pending  ({totalPendingItems})
                </Tab>
                <Tab
                  fontWeight="500"
                  fontSize="13px"
                  py="8.5px"
                  px="12px"
                  _hover={{ bg: "#F8FAFC" }}
                  _selected={{
                    color: "#027A48", // ✅ green text when active
                    fontWeight: "600",
                    bg: "#E6FFF2", // ✅ subtle green background
                  }}
                  _focus={{ boxShadow: "none" }} // ✅ removes blue outline
                >
                  Approved ({totalApprovedItems})
                </Tab>
                <Tab
                  fontWeight="500"
                  fontSize="13px"
                  py="8.5px"
                  px="12px"
                  _hover={{ bg: "#F8FAFC" }}
                  _selected={{
                    color: "#027A48", // ✅ green text when active
                    fontWeight: "600",
                    bg: "#E6FFF2", // ✅ subtle green background
                  }}
                  _focus={{ boxShadow: "none" }} // ✅ removes blue outline
                >
                  Rejected ({totalRejectedItems})
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
            </Flex>


            <TabPanels>
              <TabPanel>
                <Box mt="12px" bg="#fff" border="2px solid #EFEFEF" py='30px' px={["4px", "8px", "18px", "18px"]} rounded='10px'>
                  <TableContainer border="1px solid #EDEFF2" borderRadius="7px" mt="15px">
                    <Table variant="simple">
                      <Thead>
                        <Tr>
                          <Th fontSize={{ base: "12px", md: "14px" }}>Name</Th>
                          <Th fontSize={{ base: "12px", md: "14px" }}>Principal</Th>
                          <Th fontSize={{ base: "12px", md: "14px" }}>Approved Students</Th>
                          <Th fontSize={{ base: "12px", md: "14px" }}>State</Th>
                          <Th fontSize={{ base: "12px", md: "14px" }}>City</Th>
                          <Th fontSize={{ base: "12px", md: "14px" }}>Submission Date</Th>
                          <Th fontSize={{ base: "12px", md: "14px" }}>Actions</Th>

                        </Tr>
                      </Thead>
                      <Tbody>
                        {
                          pendingSchools.length > 0 ? (
                            pendingSchools.map((item, i) => (

                              <TableRow
                                key={i}
                                type="super-admin-schools"
                                name={item.schoolName}
                                email={item.schoolEmail}
                                principal={item.principalName}
                                approvedStudents={item.approvedStudents}
                                state={item.state}
                                city={item.city}
                                submissionDate={item.submissionDate}
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
                  <Pagination
                    currentPage={currentPagePending}
                    totalPosts={totalPendingItems}
                    postsPerPage={PostPerPage}
                    paginate={setCurrentPagePending}
                  />
                </Box>
              </TabPanel>
              <TabPanel>
                <Box mt="12px" bg="#fff" border="2px solid #EFEFEF" py='30px' px={["8px", "8px", "18px", "18px"]} rounded='10px'>
                  <TableContainer border="1px solid #EDEFF2" borderRadius="7px" mt="15px">
                    <Table variant="simple">
                      <Thead>
                        <Tr>
                          <Th fontSize={{ base: "12px", md: "14px" }}>Name</Th>
                          <Th fontSize={{ base: "12px", md: "14px" }}>Principal</Th>
                          <Th fontSize={{ base: "12px", md: "14px" }}>Approved Students</Th>
                          <Th fontSize={{ base: "12px", md: "14px" }}>State</Th>
                          <Th fontSize={{ base: "12px", md: "14px" }}>City</Th>
                          <Th fontSize={{ base: "12px", md: "14px" }}>Submission Date</Th>
                          <Th fontSize={{ base: "12px", md: "14px" }}>Actions</Th>

                        </Tr>
                      </Thead>
                      <Tbody>
                        {
                          approvedSchools.length > 0 ? (
                            approvedSchools.map((item, i) => (

                              <TableRow
                                key={i}
                                type="super-admin-schools"
                                name={item.schoolName}
                                email={item.schoolEmail}
                                principal={item.principalName}
                                approvedStudents={item.approvedStudents}
                                state={item.state}
                                city={item.city}
                                submissionDate={item.submissionDate}
                              />

                            ))
                          ) : (
                            <Text textAlign="center" py={5} ml="20px">
                              No Approved Schools found.
                            </Text>
                          )
                        }

                      </Tbody>
                    </Table>
                  </TableContainer>
                  <Pagination
                    currentPage={currentPageApproved}
                    totalPosts={totalApprovedItems}
                    postsPerPage={PostPerPage}
                    paginate={setCurrentPageApproved}
                  />
                </Box>
              </TabPanel>
              <TabPanel>
                <Box
                  mt="12px"
                  bg="#fff"
                  border="2px solid #EFEFEF"
                  py={{ base: "20px", md: "30px" }}
                  px={{ base: "10px", md: "18px" }}
                  rounded="10px"
                  overflowX="auto"
                >
                  <TableContainer border="1px solid #EDEFF2" borderRadius="7px" mt="15px">
                    <Table variant="simple">
                      <Thead>
                        <Tr>
                          <Th fontSize={{ base: "12px", md: "14px" }}>Name</Th>
                          <Th fontSize={{ base: "12px", md: "14px" }}>Principal</Th>
                          <Th fontSize={{ base: "12px", md: "14px" }}>Approved Students</Th>
                          <Th fontSize={{ base: "12px", md: "14px" }}>State</Th>
                          <Th fontSize={{ base: "12px", md: "14px" }}>City</Th>
                          <Th fontSize={{ base: "12px", md: "14px" }}>Submission Date</Th>
                          <Th fontSize={{ base: "12px", md: "14px" }}>Actions</Th>

                        </Tr>
                      </Thead>
                      <Tbody>
                        {
                          rejectedSchools.length > 0 ? (
                            rejectedSchools.map((item, i) => (

                              <TableRow
                                key={i}
                                type="super-admin-schools"
                                name={item.schoolName}
                                email={item.schoolEmail}
                                principal={item.principalName}
                                approvedStudents={item.approvedStudents}
                                state={item.state}
                                city={item.city}
                                submissionDate={item.submissionDate}
                              />

                            ))
                          ) : (
                            <Text textAlign="center" py={5} ml="20px">
                              No Rejected Schools found.
                            </Text>
                          )
                        }

                      </Tbody>
                    </Table>
                  </TableContainer>
                  <Pagination
                    currentPage={currentPageRejected}
                    totalPosts={totalRejectedItems}
                    postsPerPage={PostPerPage}
                    paginate={setCurrentPageRejected}
                  />
                </Box>
              </TabPanel>

            </TabPanels>
          </Tabs>

        </Box>
      </Box>
    </MainLayout >
  );
};
