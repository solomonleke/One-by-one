import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import MainLayout from '../../DashboardLayout'
import { Text, Flex, HStack, Box } from '@chakra-ui/react'
import { Tooltip as Tooltips } from '@chakra-ui/react';
import DashboardCard from "../../Components/DashboardCard"
import Button from "../../Components/Button"
import { HiOutlineUsers } from 'react-icons/hi'
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { RxTimer } from "react-icons/rx";
import { MdOutlineCancel } from 'react-icons/md'
import { IoInformationCircleOutline } from "react-icons/io5";
import { GoArrowDown } from "react-icons/go";
import { Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis } from 'recharts'
import { BiSearch } from "react-icons/bi"; import Pagination from "../../Components/Pagination";
import { FaCalendarAlt } from "react-icons/fa";
import TableRow from "../../Components/TableRow"
import { CgSearch } from "react-icons/cg";
import { configuration } from "../../Utils/Helpers";
import { IoFilter } from "react-icons/io5";
import { GetAllStudentApi } from "../../Utils/ApiCall";
import { GetSchoolAdminDashboardGraphDataApi } from "../../Utils/ApiCall";
import { GetStudentStatsApi } from "../../Utils/ApiCall";
import moment from "moment";

import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  TableContainer,
  useDisclosure,
  Input,
  MenuList,
  MenuItem,
  MenuButton,
  Menu,
} from '@chakra-ui/react'


export default function Index() {

  const [All, setAll] = useState(true)
    const [Approved, setApproved] = useState(false)
    const [Pending, setPending] = useState(false)
    const [Rejected, setRejected] = useState(false)


    const [OpenModal, setOpenModal] = useState(false)
    const { isOpen, onOpen, onClose } = useDisclosure()

  const [userName, setUserName] = useState('');
  const [SearchInput, setSearchInput] = useState("");
  const [MainData, setMainData] = useState([])
    const [FilterData, setFilterData] = useState([])
    const [FilteredData, setFilteredData] = useState(null);

  const [ByDate, setByDate] = useState(false);
    const [StartDate, setStartDate] = useState("");
    const [EndDate, setEndDate] = useState("");
    const [CurrentPage, setCurrentPage] = useState(1);
    const [PostPerPage, setPostPerPage] = useState(configuration.sizePerPage);
    const [TotalPage, setTotalPage] = useState("");
    const [stats, setStats] = useState({
      totalStudents: 0,
      approved: 0,
      pending: 0,
      rejected: 0
    });
    



    const filterAll = () => {
        setAll(true);
        setApproved(false);
        setPending(false);
        setRejected(false);

        setFilterData(MainData);
    };
    const filterApproved = () => {
        setAll(false);
        setApproved(true);
        setPending(false);
        setRejected(false);

        const filterData = MainData.filter((item) => item.verification_status === "APPROVED");
        console.log("filterData", filterData, MainData);
        setFilterData(filterData);
    };
    const filterPending = () => {
        setAll(false);
        setApproved(false);
        setPending(true);
        setRejected(false);

        const filterData = MainData.filter((item) => item.verification_status === "PENDING");

        setFilterData(filterData);
    };
    const filterRejected = () => {
        setAll(false);
        setApproved(false);
        setPending(false);
        setRejected(true);

        const filterData = MainData.filter((item) => item.verification_status === "REJECTED");

        setFilterData(filterData);
    };

    const filterBy = (title) => {
        console.log("filter checking", title);

        if (title === "dept") {
            let filter = MainData.filter((item) =>
                item.department?.toLowerCase().includes(SearchInput.toLowerCase())
            );
            setFilteredData(filter);
            console.log("filter checking", filter);
        } else if (title === "email") {
            let filter = MainData.filter((item) =>
                item.email?.toLowerCase().includes(SearchInput.toLowerCase())
            );
            setFilteredData(filter);
            console.log("filter checking", filter);
        } else if (title === "name") {
            let filter = MainData.filter(
                (item) =>
                    item.full_name?.toLowerCase().includes(SearchInput.toLowerCase())

            );
            setFilteredData(filter);
            console.log("filter checking", filter);
        } else if (title === "date") {
            // add 1 day to end date 
            let endDate = new Date(EndDate)
            endDate.setDate(endDate.getDate() + 1);
            // format date back
            let formatedEndDate = endDate.toISOString().split('T')[0]
            let filter = MainData.filter(
                (item) =>
                    item.createdAt >= StartDate && item.createdAt <= formatedEndDate
            );
            setFilteredData(filter);
            setSearchInput("s")
            console.log(" Date filter checking", filter);
            console.log(" Date plus  checking", endDate.toISOString());
        }
    };

    // Search Filter settings to follow end here
    const handleStudentClick = (student_Id) => {
      router(`/school-admin/student-management/student-profile/${student_Id}`);
    };

    const getallStudent = async () => {
      console.log("CurrentPage:", CurrentPage, "PostPerPage:", PostPerPage);

      try {
          const result = await GetAllStudentApi(CurrentPage, PostPerPage)

          console.log("getallStudent", result)

          if (result.status === 200) {
              setMainData(result.data.data.students)
              setFilterData(result.data.data.students)
              setTotalPage(result.data.data.totalPages)
          }
      } catch (e) {

          console.log("error", e.message)
      }

  }

  useEffect(() => {
    // var reloadCount = localStorage.getItem("reloadCount");
    // if(!reloadCount){
    //   localStorage.setItem('reloadCount', + parseInt(1))

    // }
    // if(reloadCount < 2) {
    //   localStorage.setItem('reloadCount', parseInt(reloadCount) + 1);
    //   setTimeout(() =>
    //   window.location.reload(1), 2000)
    // } else {
    //   localStorage.removeItem('reloadCount');
    // }
    
    const storedName = JSON.parse(localStorage.getItem('onlineUser'));
    if (storedName) {
      setUserName(`${storedName.firstName}`);
    }
    
  }, []);

  useEffect(() => {

    getallStudent()

}, [CurrentPage]);

  const router = useNavigate();


  

  const [graphData, setGraphData] = useState([]);

  const GetSchoolDashboardDetails = async () => {

    try {
      const response = await GetSchoolAdminDashboardGraphDataApi()

      console.log("getSchoolDashboardDetails", response)
      if(response.status === 200){
        setGraphData(response.data.data[0])
      }
      
    } catch (e) {

      console.log("error", e.message)
    }

  }

  useEffect(() => {

    GetSchoolDashboardDetails()

  }, []);

  const fetchStudentStats = async () => {
    try {
      const response = await GetStudentStatsApi();
  
      if (response?.status === 200) {
        console.log("Admin Stats Retrieved Successfully");
        console.log("Total Students:", response.stats.totalStudents);
        console.log("Pending Students:", response.stats.pendingStudents);
        console.log("Approved Students:", response.stats.approvedStudents);
        console.log("Rejected Students:", response.stats.rejectedStudents);
  
        return response.stats;
      } else {
        throw new Error(response?.message || "Failed to retrieve student stats");
      }
    } catch (error) {
      console.error("Error fetching student stats:", error.message);
    }
  };
  
  fetchStudentStats();

  useEffect(() => {
    const loadStats = async () => {
      const data = await fetchStudentStats();
      if (data) {
        setStats(data); // Update state with fetched stats
      }
    };

    loadStats();
  }, []);
  
  
  

  

  const Data = [
    { name: graphData.month, students: graphData.count },
    { name: graphData.month, students: graphData.count},
    { name: graphData.month, students: graphData.count},
    { name: graphData.month, students: graphData.count },
    { name: graphData.month, students: graphData.count },
    { name: graphData.month, students: graphData.count },
    { name: graphData.month, students: graphData.count},
    { name: graphData.month, students: graphData.count},
    { name: graphData.month, students: graphData.count},
    { name: graphData.month, students: graphData.count},
    { name: graphData.month, students: graphData.count },
    { name: graphData.month, students: graphData.count },

  ]
  const PendingData = [
    { name: graphData.month, students: graphData.count},
    { name: graphData.month, students: graphData.count },
    { name: graphData.month, students: graphData.count },
    { name: graphData.month, students: graphData.count},
    { name: graphData.month, students: graphData.count},
    { name: graphData.month, students: graphData.count},
    { name: graphData.month, students: graphData.count },
    { name: graphData.month, students: graphData.count},
    { name: graphData.month, students: graphData.count },
    { name: graphData.month, students: graphData.count },
    { name: graphData.month, students: graphData.count },
    { name: graphData.month, students: graphData.count },

  ]
  const RejectedData = [
    { name: graphData.month, students: graphData.count },
    { name: graphData.month, students: graphData.count },
    { name: graphData.month, students: graphData.count },
    { name: graphData.month, students: graphData.count},
    { name: graphData.month, students: graphData.count},
    { name: graphData.month, students: graphData.count},
    { name: graphData.month, students: graphData.count },
    { name: graphData.month, students: graphData.count},
    { name: graphData.month, students: graphData.count },
    { name: graphData.month, students: graphData.count },
    { name: graphData.month, students: graphData.count },
    { name: graphData.month, students: graphData.count },


  ]

  return (
    <MainLayout>

      <Text color={"#1F2937"} fontWeight={"700"} fontSize={"24px"} textTransform="capitalize" lineHeight={"25.41px"}>Welcome back, {userName || "User"}!</Text>

      <Text mt="9px" color={"#686C75"} fontWeight={"400"} fontSize={"15px"} lineHeight={"24px"} > Easily track and manage student information with real-time insights and updates. </Text>
      

      <Flex mt="27px" justifyContent="space-between" flexWrap="wrap">
        <DashboardCard
          icon={<HiOutlineUsers />}
          title='total student'
          value={stats.totalStudents} 
        />
        <DashboardCard
          icon={<IoMdCheckmarkCircleOutline />}
          title='approved'
          value={stats.approvedStudents}
        />
        <DashboardCard
          icon={<RxTimer />}
          title='pending'
          value={stats.pendingStudents}
        />
        <DashboardCard
          icon={<MdOutlineCancel />}
          title='rejected'
          value={stats.rejectedStudents}
        />
      </Flex>

      <Box bg="#fff" border="1px solid #EFEFEF" mt="12px" py='17px' px="18px" rounded='10px'>
        <Flex justifyContent="space-between" flexWrap="wrap">
          <Tooltips bg="#fff" color="#667085" p="12px" lineHeight="20px" fontSize="13px" fontWeight="400" label="See how student statuses have changed month over month. Use filters to view trends by approval, pending, or rejection status." placement='top-end'>
            <HStack spacing="5px">
              <Text color={"#1F2937"} fontWeight={"600"} fontSize={"17px"}>Student Status Over Time</Text>

              <IoInformationCircleOutline />
            </HStack>
          </Tooltips>

          <HStack bg="#E8FFF4" rounded='7px' py="3.5px" px="5px" cursor="pointer" mt={["10px", "10px", "0px", "0px"]}>

            <Box borderRight="1px solid #EDEFF2" pr="5px" onClick={() => {
              setApproved(true) 
              setPending(false)
              setRejected(false)
            }}>
              <Text py='8.5px' px="12px" bg={Approved ? "#fff" : "transparent"} rounded="7px" color={"#1F2937"} fontWeight={"500"} fontSize={"13px"}>Approved</Text>
            </Box>
            <Box borderRight="1px solid #EDEFF2" pr="5px" onClick={() => {
              setApproved(false)
              setPending(true)
              setRejected(false)
            }}>
              <Text py='8.5px' px="12px" bg={Pending ? "#fff" : "transparent"} rounded="7px" color={"#1F2937"} fontWeight={"500"} fontSize={"13px"}>Pending</Text>
            </Box>
            <Box pr="5px" onClick={() => {
              setApproved(false)
              setPending(false)
              setRejected(true)
            }}>
              <Text py='8.5px' px="12px" bg={Rejected ? "#fff" : "transparent"} rounded="7px" color={"#1F2937"} fontWeight={"500"} fontSize={"13px"}>Rejected</Text>
            </Box>

          </HStack>

        </Flex>

        <HStack mt="4px">
          <Text fontSize="26px" fontWeight="700" >{stats.totalStudents} </Text>
          <HStack bg="#FF9F9D" px="3px" alignItems="center" py="1px" fontWeight="500" fontSize="11.66px" rounded="100px" color="#FB3B52" spacing="1px">
            <GoArrowDown />
            <Text top="1px" pos="relative">12%</Text>
          </HStack>
          <Text color="#686C75" fontWeight="400" fontSize="14px">vs last month</Text>
        </HStack>


        <Box mt="27px" overflowX="auto" w="100%">
          <BarChart width={950} height={300} data={Approved ? Data : Pending ? PendingData : RejectedData} margin={{ top: 0, right: 0, left: 0, bottom: 5 }} barSize={20} label>
            <XAxis dataKey="name" scale={"point"} padding={{ left: 10, right: 10 }} fontSize="12px" fontWeight="500" color="#667085" />
            <YAxis />
            <Tooltip />
            <Legend />
            <CartesianGrid strokeDasharray="3 3" />
            <Bar dataKey={"students"} fill="#39996B" background={{ fill: "#E8FFF4" }} />

          </BarChart>
        </Box>

      </Box>


      <Box bg="#fff" border="1px solid #EFEFEF" mt="12px" py='17px' px="18px" rounded='10px'>
        <Flex justifyContent="space-between" flexWrap="wrap">
        <HStack alignItems="center" justifyContent="space-between" flexWrap="wrap" w="100%">
          <HStack>
            <Text color="#1F2937" fontWeight="600" fontSize="19x">Students</Text>
            <Text color="#667085" fontWeight="400" fontSize="18px">({MainData.length})</Text>
          </HStack>

          <Flex  flexWrap="wrap" mt={["10px", "10px", "0px", "0px"]} alignItems="center" justifyContent={"space-between"} >
          <Flex justifyContent="space-between" flexWrap="wrap">
                    <Flex flexWrap="wrap"
                        mt={["10px", "10px", "0px", "0px"]}
                        alignItems="center"
                        justifyContent={"flex-end"} >
                        <HStack flexWrap={["wrap", "nowrap"]} >
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
                                    <HStack
                                        border="1px solid #E3E5E8" rounded="7px" p='6px' color='#2F2F2F' fontWeight="500" fontSize="14px"
                                    >
                                        <Text>Filter</Text>
                                        <IoFilter />
                                    </HStack>
                                </MenuButton>
                                <MenuList>
                                    <MenuItem
                                        onClick={() => filterBy("name")}
                                        textTransform="capitalize"
                                        fontWeight={"500"}
                                        color="#2F2F2F"
                                        _hover={{
                                            color: "#fff",
                                            fontWeight: "400",
                                            bg: "greenn.greenn500",
                                        }}
                                    >
                                        <HStack fontSize="14px">
                                            <Text>by Name</Text>
                                        </HStack>
                                    </MenuItem>
                                    <MenuItem
                                        onClick={() => filterBy("email")}
                                        textTransform="capitalize"
                                        fontWeight={"500"}
                                        color="#2F2F2F"
                                        _hover={{
                                            color: "#fff",
                                            fontWeight: "400",
                                            bg: "greenn.greenn500",
                                        }}
                                    >
                                        <HStack fontSize="14px">
                                            <Text>by email</Text>
                                        </HStack>
                                    </MenuItem>
                                    <MenuItem
                                        onClick={() => filterBy("dept")}
                                        textTransform="capitalize"
                                        fontWeight={"500"}
                                        color="#2F2F2F"
                                        _hover={{
                                            color: "#fff",
                                            fontWeight: "400",
                                            bg: "greenn.greenn500",
                                        }}
                                    >
                                        <HStack fontSize="14px">
                                            <Text>by department</Text>
                                        </HStack>
                                    </MenuItem>
                                    <MenuItem
                                        onClick={() => filterBy("phoneNumber")}
                                        textTransform="capitalize"
                                        fontWeight={"500"}
                                        color="#2F2F2F"
                                        _hover={{
                                            color: "#fff",
                                            fontWeight: "400",
                                            bg: "greenn.greenn500",
                                        }}
                                    >
                                        <HStack fontSize="14px">
                                            <Text>by Phone Number</Text>
                                        </HStack>
                                    </MenuItem>

                                    <MenuItem
                                        onClick={() => setByDate(true)}
                                        textTransform="capitalize"
                                        fontWeight={"500"}
                                        color="#2F2F2F"
                                        _hover={{
                                            color: "#fff",
                                            fontWeight: "400",
                                            bg: "greenn.greenn500",
                                        }}
                                    >
                                        <HStack fontSize="14px">
                                            <Text>by date</Text>
                                        </HStack>
                                    </MenuItem>
                                    <MenuItem
                                        onClick={() => {
                                            setFilteredData(null);
                                            setSearchInput("");
                                            setByDate(false)
                                            setStartDate("")
                                            setEndDate("")
                                        }}
                                        textTransform="capitalize"
                                        fontWeight={"500"}
                                        color="#2F2F2F"
                                        _hover={{
                                            color: "#fff",
                                            fontWeight: "400",
                                            bg: "greenn.greenn500",
                                        }}
                                    >
                                        <HStack fontSize="14px">
                                            <Text>clear filter</Text>
                                        </HStack>
                                    </MenuItem>
                                </MenuList>
                            </Menu>
                            <Button w="159px" size="sm" onClick={() => {
              router("/school-admin/student-management")
            }}>See All students</Button>
                        </HStack>

                    </Flex>
                </Flex>
          </Flex>
          </HStack>
        </Flex>
        <Box bg="#fff" border="1px solid #EFEFEF" mt="12px" py='15px' px="15px" rounded='10px' overflowX="auto">

        <TableContainer>
                        <Table variant='simple'>

                            <Thead bg="#F9FAFB">
                                <Tr >
                                    <Th fontSize="13px" textTransform="capitalize" color='#2F2F2F' fontWeight="600">name</Th>
                                    <Th fontSize="13px" textTransform="capitalize" color='#2F2F2F' fontWeight="600">department</Th>
                                    <Th fontSize="13px" textTransform="capitalize" color='#2F2F2F' fontWeight="600">class level</Th>
                                    <Th fontSize="13px" textTransform="capitalize" color='#2F2F2F' fontWeight="600">field of study</Th>
                                    <Th fontSize="13px" textTransform="capitalize" color='#2F2F2F' fontWeight="600">eligibility status</Th>
                                    <Th fontSize="13px" textTransform="capitalize" color='#2F2F2F' fontWeight="600">created at</Th>
                                    <Th fontSize="13px" textTransform="capitalize" color='#2F2F2F' fontWeight="600">actions</Th>

                                </Tr>
                            </Thead>
                            <Tbody>


                                {SearchInput === "" || FilteredData === null ? (
                                    FilterData?.map((item, i) => (
                                        <TableRow
                                            type={"school-admin"}
                                            name={item.full_name}
                                            email={item.email}
                                            department={item.department}
                                            classLevel={item.class_level}
                                            fieldOfStudy={item.intended_field_of_study}
                                            status={item.verification_status}
                                            date={moment(item.created_at).format("lll")}
                                            onClick={() => handleStudentClick(item.id)}
                                            onRemove={onOpen}
                                            onEdit={() => setOpenModal(true)}
                                        />
                                    ))
                                ) : SearchInput !== "" && FilteredData?.length > 0 ? (
                                    FilteredData?.map((item, i) => (
                                        <TableRow
                                            type={"school-admin"}
                                            name={item.full_name}
                                            email={item.email}
                                            department={item.department}
                                            classLevel={item.class_level}
                                            fieldOfStudy={item.intended_field_of_study}
                                            status={item.verification_status}
                                            onRemove={onOpen}
                                            onEdit={() => setOpenModal(true)}
                                        />
                                    ))
                                ) : (
                                    <Text textAlign={"center"} mt="32px" color="black">
                                        *--No record found--*
                                    </Text>
                                )}

                            </Tbody>

                        </Table>
                    </TableContainer>

        </Box>
      </Box>




    </MainLayout>


  )
}
