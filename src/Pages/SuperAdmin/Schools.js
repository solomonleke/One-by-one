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
  const [CurrentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [TotalPage, setTotalPage] = useState("");
  const [pendingSchools, setPendingSchools] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [approvedSchools, setApprovedSchools] = useState([]);
  const [rejectedSchools, setRejectedSchools] = useState([]);
  const [PostPerPage, setPostPerPage] = useState(configuration.sizePerPage);
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

  const GetAllSchool = async (status) => {
    try {
      const result = await GetAllSuperAdminSchoolsApi(CurrentPage, PostPerPage, status);
      console.log("getallSchools", result);



      if (result.status === 200 && result.data.data?.schools?.length > 0) {
        const schools = result.data.data.schools;
        setTotalPage(result.data.data.totalPages);
        if (status === "PENDING") {
          setPendingSchools(schools);
        } else if (status === "APPROVED") {
          setApprovedSchools(schools);
        } else if (status === "REJECTED") {
          setRejectedSchools(schools);
        }
      } else {
        if (status === "PENDING") {
          setPendingSchools([]);
        } else if (status === "APPROVED") {
          setApprovedSchools([]);
        } else if (status === "REJECTED") {
          setRejectedSchools([]);
        }
      }
    } catch (e) {
      console.log("error", e.message);
    } finally {
      setIsLoading(false);
    }
  };
  const totalSchools = pendingSchools.length + approvedSchools.length + rejectedSchools.length;





  // Filter students first


  // Handle page change
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    GetAllSchool(status)
  }, [status, CurrentPage]);

  return (
    <MainLayout>
    {
            isLoading && <Preloader  />
          }
      <Box p={6}>
        <Text fontSize="21px" fontWeight="600" color="#101828" mb="28px">
          Schools <span style={{ color: "#667085", fontWeight: "400" }}>({totalSchools})</span>
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
                  Pending Approval ({pendingSchools.length})
                </Tab>
                <Tab
                  fontWeight="500"
                  fontSize="13px"
                  py="8.5px"
                  px="12px"
                  _selected={{ color: "blue.500" }}
                >
                  Approved ({approvedSchools.length})
                </Tab>
                <Tab
                  fontWeight="500"
                  fontSize="13px"
                  py="8.5px"
                  px="12px"
                  _selected={{ color: "blue.500" }}
                >
                  Rejected ({rejectedSchools.length})
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
                <Box mt="12px" bg="#fff" border="2px solid #EFEFEF" py='30px' px={["8px", "8px", "18px", "18px"]} rounded='10px'>
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
                </Box>
              </TabPanel>
              <TabPanel>
                <Box mt="12px" bg="#fff" border="2px solid #EFEFEF" py='30px' px={["8px", "8px", "18px", "18px"]} rounded='10px'>
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
          totalPosts={TotalPage}
          paginate={paginate}
        />
      </Box>
    </MainLayout >
  );
};

