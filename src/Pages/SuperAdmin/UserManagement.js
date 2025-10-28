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
import { IoFilter } from "react-icons/io5";
import { configuration } from "../../Utils/Helpers";
import Preloader from "../../Components/Preloader"
import { getAllAdmins } from "../../Utils/ApiCall";



export default function UserManagement() {
  const [search, setSearch] = useState("");
  const [admins, setAdmins] = useState([]);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [PostPerPage, setPostPerPage] = useState(configuration.sizePerPage);
  const [TotalPage, setTotalPage] = useState("");

  const [scholarshipAdmins, setScholarshipAdmins] = useState([]);
  const [fundAdmins, setFundAdmins] = useState([]);
  const [sponsorAdmins, setSponsorAdmins] = useState([]);
  const [schoolAdmins, setSchoolAdmins] = useState([]);  
  const [selectedTab, setSelectedTab] = useState("school"); // Tabs: 'school', 'scholarship', 'sponsor', 'fund'


  

  const handleTabSwitch = (tab) => {
    setSelectedTab(tab);
    setCurrentPage(1);
    setSearch("");
  };

  // const filteredByTab = students.filter((student) => student.role === selectedTab);
  // const filteredStudents = filteredByTab.filter((student) =>
  //   student.name.toLowerCase().includes(search.toLowerCase())
  // );


  

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const fetchAdmins = async (adminType, setState, currentPage , postPerPage) => {
    try {
      const result = await getAllAdmins(adminType, currentPage, postPerPage);
      console.log(`${adminType.toUpperCase()} Data:`, result);
  
      // only update TotalPage for the selected tab
      if (
        (adminType === "SCHOOL-ADMIN" && selectedTab === "school") ||
        (adminType === "SCHOLARSHIP-ADMIN" && selectedTab === "scholarship") ||
        (adminType === "FUND-ADMIN" && selectedTab === "fund") ||
        (adminType === "SPONSOR" && selectedTab === "sponsor")
      ) {
        setTotalPage(result.data.totalPages);
      }
  
      const dataToSet =
        adminType === "SCHOOL-ADMIN"
          ? result.data.schools
          : result.data.admins;
  
      setState(dataToSet);
    } catch (err) {
      console.error(`Error fetching ${adminType}:`, err.message);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };
  
  
  
  

  useEffect(() => {
    console.log("Selected Tab:", selectedTab);
    if (selectedTab === "school") {
      fetchAdmins("SCHOOL-ADMIN", setSchoolAdmins, currentPage, PostPerPage);
    } else if (selectedTab === "scholarship") {
      fetchAdmins("SCHOLARSHIP-ADMIN", setScholarshipAdmins, currentPage, PostPerPage);
    } else if (selectedTab === "fund") {
      fetchAdmins("FUND-ADMIN", setFundAdmins, currentPage, PostPerPage);
    } else if (selectedTab === "sponsor") {
      fetchAdmins("SPONSOR", setSponsorAdmins, currentPage, PostPerPage);
    }
  }, [selectedTab, currentPage, PostPerPage]);
  
  
  
  


  return (
    <MainLayout>
    {
            isLoading && <Preloader  />
          }
      <Box p={6}>
        <Text fontSize="21px" fontWeight="600" color="#101828" mb="28px">
          Users <span style={{ color: "#667085", fontWeight: "400" }}>({schoolAdmins.length + scholarshipAdmins.length + fundAdmins.length + sponsorAdmins.length})</span>
        </Text>

        <Box border="1px solid #E7E9EC" py="20px" px="31px" borderRadius="10px">
          <Flex justifyContent="space-between" alignItems="center" flexWrap="wrap" mb="20px">
            <Flex wrap="wrap" gap={2}>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => handleTabSwitch("school")}
                sx={{
    bg: selectedTab === "school" ? "greenn.greenn100" : "transparent",
    color: selectedTab === "school" ? "greenn.greenn500" : "#586375",
    fontWeight: selectedTab === "school" ? "bold" : "normal",
    _hover: {
      bg: "greenn.greenn100",
    },
    _focus: {
      outline: "none",
    },
    
  }}
              >
                School Admins
              </Button>
              <Button
  size="sm"
  variant="ghost"
  onClick={() => handleTabSwitch("scholarship")}
  sx={{
    bg: selectedTab === "scholarship" ? "greenn.greenn100" : "transparent",
    color: selectedTab === "scholarship" ? "greenn.greenn500" : "#586375",
    fontWeight: selectedTab === "scholarship" ? "bold" : "normal",
    _hover: {
      bg: "greenn.greenn100",
    },
    _focus: {
      outline: "none",
    },
    
  }}
>
  Scholarship
</Button>


              <Button
                size="sm"
                variant="ghost"
                onClick={() => handleTabSwitch("sponsor")}
                sx={{
    bg: selectedTab === "sponsor" ? "greenn.greenn100" : "transparent",
    color: selectedTab === "sponsor" ? "greenn.greenn500" : "#586375",
    fontWeight: selectedTab === "sponsor" ? "bold" : "normal",
    _hover: {
      bg: "greenn.greenn100",
    },
    _focus: {
      outline: "none",
    },
    
  }}
              >
                Sponsors
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => handleTabSwitch("fund")}
                sx={{
    bg: selectedTab === "fund" ? "greenn.greenn100" : "transparent",
    color: selectedTab === "fund" ? "greenn.greenn500" : "#586375",
    fontWeight: selectedTab === "fund" ? "bold" : "normal",
    _hover: {
      bg: "greenn.greenn100",
    },
    _focus: {
      outline: "none",
    },
    
  }}
              >
                Fund Admins
              </Button>
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
              {selectedTab === "school" && (
                <Thead>
                  <Tr>
                    <Th fontSize="14px" fontWeight="500" >Name</Th>
                    <Th fontSize="14px" fontWeight="500" >School Name</Th>
                    <Th fontSize="14px" fontWeight="500">City</Th>
                    <Th fontSize="14px" fontWeight="500">State</Th>
                    <Th fontSize="14px" fontWeight="500">Status</Th>
                    <Th fontSize="14px" fontWeight="500">Date Joined</Th>
                    <Th fontSize="14px" fontWeight="500">Actions</Th>

                  </Tr>
                </Thead>
              )}

              {selectedTab === "scholarship" && (
                <Thead>
                  <Tr>
                    <Th fontSize="14px" fontWeight="500" >Name</Th>
                    <Th fontSize="14px" fontWeight="500" >Approved Students</Th>
                    <Th fontSize="14px" fontWeight="500" >Approved Schools</Th>
                    <Th fontSize="14px" fontWeight="500">City</Th>
                    <Th fontSize="14px" fontWeight="500">State</Th>
                    <Th fontSize="14px" fontWeight="500">Status</Th>
                    <Th fontSize="14px" fontWeight="500">Date Joined</Th>
                    <Th fontSize="14px" fontWeight="500">Actions</Th>

                  </Tr>
                </Thead>
              )}

              {selectedTab === "sponsor" && (
                <Thead>
                  <Tr>
                    <Th fontSize="14px" fontWeight="500" >Name</Th>
                    <Th fontSize="14px" fontWeight="500" >scholarships Created</Th>
                    <Th fontSize="14px" fontWeight="500" >funded Scholarships</Th>
                    <Th fontSize="14px" fontWeight="500" >students Funded</Th>
                    <Th fontSize="14px" fontWeight="500">City</Th>
                    <Th fontSize="14px" fontWeight="500">State</Th>
                    <Th fontSize="14px" fontWeight="500">Status</Th>
                    <Th fontSize="14px" fontWeight="500">Date Joined</Th>
                    <Th fontSize="14px" fontWeight="500">Actions</Th>

                  </Tr>
                </Thead>
              )}

              {selectedTab === "fund" && (
                <Thead>
                  <Tr>
                    <Th fontSize="14px" fontWeight="500" >Name</Th>
                    <Th fontSize="14px" fontWeight="500" >funded Students</Th>
                    <Th fontSize="14px" fontWeight="500">City</Th>
                    <Th fontSize="14px" fontWeight="500">State</Th>
                    <Th fontSize="14px" fontWeight="500">Status</Th>
                    <Th fontSize="14px" fontWeight="500">Date Joined</Th>
                    <Th fontSize="14px" fontWeight="500">Actions</Th>

                  </Tr>
                </Thead>
              )}

              {selectedTab === "school" && (
                <Tbody>
                  {schoolAdmins.map((item, index) => (
                    <TableRow
                      key={index}
                      type="super-admin-user-management"
                      name={`${item.firstName} ${item.lastName}`}
                      email={item.email}
                      schoolName={item.schoolName}
                      city={item.city}
                      state={item.state}
                      status={item.status}
                      date={item.dateJoined}
                    />
                  ))}
                </Tbody>

              )}
              {selectedTab === "scholarship" && (
                <Tbody>
                  {scholarshipAdmins.map((item, index) => (
                    <TableRow
                      key={index}
                      type="super-admin-scholarship"
                      name={`${item.firstName} ${item.lastName}`}
                      email={item.email}
                      approvedStudents={item.totalStudents}
                      approvedSchools={item.totalSchools}
                      city={item.city}
                      state={item.state}
                      status={item.status}
                      date={item.dateJoined}
                    />
                  ))}
                </Tbody>
              )}

              {selectedTab === "sponsor" && (
                <Tbody>
                  {sponsorAdmins.map((item, index) => (
                    <TableRow
                      key={index}
                      type="super-admin-sponsor"
                      name={`${item.firstName} ${item.lastName}`}
                      email={item.email}
                      scholarshipsCreated={item.totalScholarships}
                      fundedScholarships={item.fundedScholarships}
                      studentsFunded={item.totalStudents}
                      city={item.city}
                      state={item.state}
                      status={item.status}
                      date={item.dateJoined}
                    />
                  ))}
                </Tbody>
              )}

              {selectedTab === "fund" && (
                <Tbody>
                  {fundAdmins.map((item, index) => (
                    <TableRow
                      key={index}
                      type="super-admin-fund"
                      name={`${item.firstName} ${item.lastName}`}
                      email={item.email}
                      studentsFunded={item.fundedStudents}
                      city={item.city}
                      state={item.state}
                      status={item.status}
                      date={item.dateJoined}
                    />
                  ))}
                </Tbody>
              )}
            </Table>
          </TableContainer>
        </Box>


        

        <Pagination
  totalPages={TotalPage}   // ✅ clearer and correct
  currentPage={currentPage}
  paginate={paginate}
/>




          
      </Box>
    </MainLayout>
  );
};

