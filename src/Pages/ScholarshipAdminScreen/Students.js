import React, { useState, useEffect, useCallback  } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import MainLayout from '../../DashboardLayout'
import { Text, Flex, HStack, VStack, Box, Center, Progress, Icon, Avatar, Image } from '@chakra-ui/react'
import { Tooltip as Tooltips } from '@chakra-ui/react';
import DashboardCard from "../../Components/DashboardCard"
import Button from "../../Components/Button"
import Input from "../../Components/Input"
import { HiOutlineUsers } from 'react-icons/hi'
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { MdOutlineCancel } from 'react-icons/md'
import { IoInformationCircleOutline } from "react-icons/io5";
import { GoArrowDown } from "react-icons/go";
import { Bar, BarChart, CartesianGrid, Label, Legend, Line, ResponsiveContainer, Pie, PieChart, Tooltip, XAxis, YAxis, LineChart } from 'recharts'
import TableRow from "../../Components/TableRow"
import { CgSearch } from "react-icons/cg";
import { IoFilter } from "react-icons/io5";
import { FaUserGraduate } from "react-icons/fa6";
import { TbCurrencyNaira } from "react-icons/tb";
import { FaSchoolFlag } from "react-icons/fa6";
import { FaGoogleScholar } from "react-icons/fa6";
import { FaCheck } from "react-icons/fa6";
import { IoIosArrowRoundForward } from "react-icons/io";
import { IoCloseOutline } from "react-icons/io5";
import { GetAllScholarshipStudentsApi } from "../../Utils/ApiCall";
import { ApproveStudentApi } from "../../Utils/ApiCall";
import ShowToast from '../../Components/ToastNotification';
import { ReactComponent as Revoke } from "../../Asset/revoke.svg";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Tabs,
  Tab,
  TabList,
  TabIndicator,
  TabPanels,
  TabPanel,
  Switch,
  Stack,
  Spacer,


} from '@chakra-ui/react'
import { ReactComponent as ProfilePicture } from "../../Asset/profileImage.svg"
import { FaCloudUploadAlt, FaSearch } from 'react-icons/fa';
import { ReactComponent as EditIcon } from "../../Asset/editIcon.svg";
import { ReactComponent as Warning } from "../../Asset/warning.svg";
import { ReactComponent as Close } from "../../Asset/close.svg";
import { configuration } from "../../Utils/Helpers";
import Pagination from "../../Components/Pagination";
import { BiSearch } from "react-icons/bi";
import { FaCalendarAlt } from "react-icons/fa";
import Preloader from "../../Components/Preloader"

import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";


export default function Students() {
  const [showToast, setShowToast] = useState({ show: false, message: '', status: '' });
  const [MainData, setMainData] = useState([]);
  const [FilteredData, setFilteredData] = useState(null);
  const [SearchInput, setSearchInput] = useState("");
  const [ByDate, setByDate] = useState(false);
  const [StartDate, setStartDate] = useState("");
  const [EndDate, setEndDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("PENDING");
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [pendingStudents, setPendingStudents] = useState([]);
  const [approvedStudents, setApprovedStudents] = useState([]);
  const [rejectedStudents, setRejectedStudents] = useState([]);
  const [currentPagePending, setCurrentPagePending] = useState(1);
const [totalPending, setTotalPending] = useState(0);

const [currentPageApproved, setCurrentPageApproved] = useState(1);
const [totalApproved, setTotalApproved] = useState(0);

const [currentPageRejected, setCurrentPageRejected] = useState(1);
const [totalRejected, setTotalRejected] = useState(0);

  const { student_id } = useParams()
  const [essayPercentage, setEssayPercentage] = useState(0);
  const [loadingStudentId, setLoadingStudentId] = useState(null);
  const [isTotalStudents, setIsTotalStudents] = useState(0);



  const [PostPerPage, setPostPerPage] = useState(configuration.sizePerPage);





  const GetAllScholarshipStudent = async (status, page) => {
    try {
      const result = await GetAllScholarshipStudentsApi(page, PostPerPage, status, search);
      console.log("GetAllScholarshipStudent result:", result);
  
      if (result.status === 200) {
        const Students = result.data.data.students;
        const total = result.data.data.totalItems; // <-- total items count (ask backend if not returned)
  
        if (status === "PENDING") {
          setPendingStudents(Students);
          setTotalPending(total);
        } else if (status === "APPROVED") {
          setApprovedStudents(Students);
          setTotalApproved(total);
        } else if (status === "REJECTED") {
          setRejectedStudents(Students);
          setTotalRejected(total);
        }
      }
    } catch (e) {
      console.error("GetAllScholarshipStudent error:", e.message);
    }
  };
  
  



  const FetchPending = () => {
    setCurrentPagePending(1);
  };
const FetchApproved = () => {
    setCurrentPageApproved(1);
  };
const FetchRejected = () => {
    setCurrentPageRejected(1);
  };


  
  const filterBy = (type) => {
    let filtered = [...MainData];
    if (type === "name") {
      filtered = filtered.filter(item => item.name.toLowerCase().includes(SearchInput.toLowerCase()));
    } else if (type === "email") {
      filtered = filtered.filter(item => item.email.toLowerCase().includes(SearchInput.toLowerCase()));
    } else if (type === "dept") {
      filtered = filtered.filter(item => item.department.toLowerCase().includes(SearchInput.toLowerCase()));
    } else if (type === "phoneNumber") {
      filtered = filtered.filter(item => item.phoneNumber.includes(SearchInput));
    } else if (type === "date" && StartDate && EndDate) {
      filtered = filtered.filter(item => {
        const itemDate = new Date(item.date);
        return itemDate >= new Date(StartDate) && itemDate <= new Date(EndDate);
      });
    }
    setFilteredData(filtered);
  };




  const ApproveStudent = async (student_id, STATUS) => {
    setLoadingStudentId(student_id); // ✅ only this student's button shows loading
      
    try {
      const result = await ApproveStudentApi(student_id, {status: STATUS, essayPercentage: essayPercentage});
      
      console.log("approved student", result);
      
      if (result.status === 200) {
        setShowToast({
          show: true,
          message: `Student ${STATUS === "APPROVED" ? "Approved" : "Rejected"}!!!`,
          status: STATUS === "REJECTED" ? "error" : "success",
        });
        setTimeout(() => setShowToast({ show: false }), 3000);
        
        // Refresh all lists
        GetAllScholarshipStudent("PENDING", currentPagePending);
        GetAllScholarshipStudent("APPROVED", currentPageApproved);
        GetAllScholarshipStudent("REJECTED", currentPageRejected);
      } 
    } catch (e) {
      setShowToast({
        show: true,
        message: e.response?.data?.message || e.message || "Error Approving Student!!!",
        status: "error",
      });
      setTimeout(() => setShowToast({ show: false }), 3000);
      console.log("error", e.message);
    } finally {
      setLoadingStudentId(null); // Reset loading
    }
  }


  useEffect(() => { 
    GetAllScholarshipStudent("PENDING", currentPagePending); 
  }, [currentPagePending]);
  
  useEffect(() => { 
    GetAllScholarshipStudent("APPROVED", currentPageApproved); 
  }, [currentPageApproved]);
  
  useEffect(() => { 
    GetAllScholarshipStudent("REJECTED", currentPageRejected); 
  }, [currentPageRejected]);




  return (
    <MainLayout>
          {
            loading && <Preloader  />
          }
      {showToast.show && (
        <ShowToast message={showToast.message} status={showToast.status} show={showToast.show} duration={showToast.duration} />
      )}
      <Text fontSize={"21px"} lineHeight={"25.41px"} fontWeight="700">Students <Box as='span' color="#667085" fontWeight="600" fontSize="19px">({pendingStudents.length + approvedStudents.length + rejectedStudents.length})</Box></Text>
      <Text mt="9px" color={"#686C75"} fontWeight={"400"} fontSize={"15px"} mb={5} gap={"9px"} lineHeight={"24px"}>Review and approve student applications. Manage pending requests and take action to accept or reject them.</Text>

      <Box bg="#fff" border="1px solid #EFEFEF" mt="12px" py='17px' px={["18px", "18px"]} rounded='10px'>
        <Tabs>
          <HStack justifyContent={"space-between"}>
            <TabList overflowX={"auto"} overflowY={"hidden"}>
              <Tab onClick={FetchPending} _selected={{ color: "green", borderColor: "green" }} fontSize={"14px"} fontWeight={"600"} lineHeight={"20px"}><Text fontSize={"14px"} fontWeight={"600"} lineHeight={"20px"}>Pending Approval <Box as="span" color="#667085" fontSize="12px" fontWeight="600">({pendingStudents.length})</Box></Text></Tab>
              <Tab onClick={FetchApproved} _selected={{ color: "green", borderColor: "green" }} fontSize={"14px"} fontWeight={"600"} lineHeight={"20px"}><Text fontSize={"14px"} fontWeight={"600"} lineHeight={"20px"}>Approved <Box as="span" color="#667085" fontSize="12px" fontWeight="600">({approvedStudents.length})</Box></Text></Tab>
              <Tab onClick={FetchRejected} _selected={{ color: "green", borderColor: "green" }} fontSize={"14px"} fontWeight={"600"} lineHeight={"20px"}><Text fontSize={"14px"} fontWeight={"600"} lineHeight={"20px"}>Rejected <Box as="span" color="#667085" fontSize="12px" fontWeight="600">({rejectedStudents.length})</Box></Text></Tab>
            </TabList>

            <Flex flexWrap="wrap" mt={["10px", "10px", "0px", "0px"]} alignItems="center" justifyContent={"flex-end"}>
              <HStack flexWrap={["wrap", "nowrap"]}>
                {ByDate === false ? (
                  <Input
                    placeholder="Search"
                    size="sm"
                    onChange={(e) => setSearchInput(e.target.value)}
                    value={SearchInput}
                    bColor="#E4E4E4"
                    leftIcon={<BiSearch />}
                  />
                ) : (
                  <HStack flexWrap={["wrap", "nowrap"]}>
                    <Input
                      placeholder="Start Date"
                      type="date"
                      size="sm"
                      onChange={(e) => setStartDate(e.target.value)}
                      value={StartDate}
                      bColor="#E4E4E4"
                      leftIcon={<FaCalendarAlt />}
                    />
                    <Input
                      placeholder="End Date"
                      type="date"
                      size="sm"
                      onChange={(e) => setEndDate(e.target.value)}
                      value={EndDate}
                      bColor="#E4E4E4"
                      leftIcon={<FaCalendarAlt />}
                    />
                    <Flex onClick={() => filterBy("date")} cursor="pointer" px="5px" py="3px" rounded="5px" bg="greenn.greenn500" color="#fff" justifyContent="center" alignItems="center" >
                      <BiSearch />
                    </Flex>
                  </HStack>
                )}
                <Menu isLazy>
                  <MenuButton as={Box}>
                    <HStack border="1px solid #E3E5E8" rounded="7px" p='6px' color='#2F2F2F' fontWeight="500" fontSize="14px">
                      <Text>Filter</Text>
                      <IoFilter />
                    </HStack>
                  </MenuButton>
                  <MenuList>
                    <MenuItem onClick={() => filterBy("name")}><Text>by Name</Text></MenuItem>
                    <MenuItem onClick={() => filterBy("email")}><Text>by Email</Text></MenuItem>
                    <MenuItem onClick={() => filterBy("dept")}><Text>by Department</Text></MenuItem>
                    <MenuItem onClick={() => filterBy("phoneNumber")}><Text>by Phone Number</Text></MenuItem>
                    <MenuItem onClick={() => setByDate(true)}><Text>by Date</Text></MenuItem>
                    <MenuItem onClick={() => {
                      setFilteredData(null);
                      setSearchInput("");
                      setByDate(false);
                      setStartDate("");
                      setEndDate("");
                    }}>
                      <Text>Clear Filter</Text>
                    </MenuItem>
                  </MenuList>
                </Menu>
              </HStack>
            </Flex>

          </HStack>

          <TabIndicator mt='-1.5px' height='2px' bg='green' borderRadius='1px' />

          <TabPanels>
            <TabPanel>

              <Box mt="12px" bg="#fff" border="2px solid #EFEFEF" py='30px' px={["8px", "8px", "18px", "18px"]} rounded='10px'>
                <TableContainer>
                  <Table variant='simple'>

                    <Thead bg="#F9FAFB">
                      <Tr >
                        <Th fontSize="13px" textTransform="capitalize" color='#2F2F2F' fontWeight="600">name</Th>
                        <Th fontSize="13px" textTransform="capitalize" color='#2F2F2F' fontWeight="600">field of study</Th>
                        <Th fontSize="13px" textTransform="capitalize" color='#2F2F2F' fontWeight="600">status</Th>
                        <Th fontSize="13px" textTransform="capitalize" color='#2F2F2F' fontWeight="600">actions</Th>

                      </Tr>
                    </Thead>
                    <Tbody>
                      {/* pending student table */}
                      {
                        pendingStudents.length > 0 ? (
                          pendingStudents.map((item, i) => (
                            <TableRow
                              key={i}
                              type={"scholarship-admin-students"}
                              name={item.full_name}
                              email={item.email}
                              fieldOfStudy={item.intended_field_of_study}
                              status={item.verification_status}
                              isLoading={loadingStudentId === item.id}
                              buttonText={item.verification_status === "PENDING" ? "Approve" : item.verification_status === "APPROVED" ? "Reject" : item.verification_status === "REJECTED" ? "Unreject" : "Approve"}
                              onButtonClick={() => ApproveStudent(item.id,"APPROVED")}
                            />
                          ))
                        ) : (
                          <Text textAlign="center" py={5} ml="20px">
                            No pending students found.
                          </Text>
                        )
                      }

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


            <TabPanel>
              <Box mt="12px" bg="#fff" border="2px solid #EFEFEF" py='30px' px={["8px", "8px", "18px", "18px"]} rounded='10px'>
                <TableContainer>
                  <Table variant='simple'>

                    <Thead bg="#F9FAFB">
                      <Tr >
                        <Th fontSize="13px" textTransform="capitalize" color='#2F2F2F' fontWeight="600">name</Th>
                        <Th fontSize="13px" textTransform="capitalize" color='#2F2F2F' fontWeight="600">field of study</Th>
                        <Th fontSize="13px" textTransform="capitalize" color='#2F2F2F' fontWeight="600">status</Th>
                        <Th fontSize="13px" textTransform="capitalize" color='#2F2F2F' fontWeight="600">actions</Th>

                      </Tr>
                    </Thead>
                    <Tbody>
                      {/* approved student table */}
                      {
                        approvedStudents.length > 0 ? (
                          approvedStudents.map((item, i) => (
                            <TableRow
                              key={i}
                              type={"scholarship-admin-students"}
                              name={item.full_name}
                              email={item.email}
                              fieldOfStudy={item.intended_field_of_study}
                              status={item.verification_status}
                              isLoading={loadingStudentId === item.id}
                              buttonText={item.verification_status === "PENDING" ? "Approve" : item.verification_status === "APPROVED" ? "Reject" : item.verification_status === "REJECTED" ? "Unreject" : "Approve"}
                              onButtonClick={() => ApproveStudent(item.id, "REJECTED")}
                            />
                          ))
                        ) : (
                          <Text textAlign="center" py={5} ml="20px">
                            No Approved students found.
                          </Text>
                        )
                      }

                    </Tbody>

                  </Table>

                  <Pagination
                    currentPage={currentPageApproved}
                    totalPosts={totalApproved}
                    postsPerPage={PostPerPage}
                    paginate={setCurrentPageApproved}
                  />

                </TableContainer>
              </Box>
            </TabPanel>

            <TabPanel>
              <Box mt="12px" bg="#fff" border="2px solid #EFEFEF" py='30px' px={["8px", "8px", "18px", "18px"]} rounded='10px'>
                <TableContainer>
                  <Table variant='simple'>

                    <Thead bg="#F9FAFB">
                      <Tr >
                        <Th fontSize="13px" textTransform="capitalize" color='#2F2F2F' fontWeight="600">name</Th>
                        <Th fontSize="13px" textTransform="capitalize" color='#2F2F2F' fontWeight="600">field of study</Th>
                        <Th fontSize="13px" textTransform="capitalize" color='#2F2F2F' fontWeight="600">status</Th>
                        <Th fontSize="13px" textTransform="capitalize" color='#2F2F2F' fontWeight="600">actions</Th>

                      </Tr>
                    </Thead>
                    <Tbody>

                      {
                        rejectedStudents.length > 0 ? (
                          rejectedStudents.map((item, i) => (
                            <TableRow
                              key={i}
                              type={"scholarship-admin-students"}
                              name={item.full_name}
                              email={item.email}
                              fieldOfStudy={item.intended_field_of_study}
                              status={item.verification_status}
                              isLoading={loadingStudentId === item.id}
                              buttonText={item.verification_status === "PENDING" ? "Approve" : item.verification_status === "APPROVED" ? "Reject" : item.verification_status === "REJECTED" ? "Unreject" : "Approve"}
                              onButtonClick={() => ApproveStudent(item.id, "APPROVED")}
                            />
                          ))
                        ) : (
                          <Text textAlign="center" py={5} ml="20px">
                            No Rejected students found.
                          </Text>
                        )
                      }

                    </Tbody>

                  </Table>

                  <Pagination
                    currentPage={currentPageRejected}
                    totalPosts={totalRejected}
                    postsPerPage={PostPerPage}
                    paginate={setCurrentPageRejected}
                  />

                </TableContainer>
              </Box>
            </TabPanel>

          </TabPanels>
        </Tabs>
      </Box>
    </MainLayout>
  )
}
