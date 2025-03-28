import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
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
import { GetAllScholarshipSchoolsApi } from "../../Utils/ApiCall";
// import { ApproveSchoolApi } from "../../Utils/ApiCall";
import ShowToast from '../../Components/ToastNotification';
import { configuration } from "../../Utils/Helpers";
import Pagination from "../../Components/Pagination";
import { IoCloseOutline } from "react-icons/io5";
import { ReactComponent as Revoke } from "../../Asset/revoke.svg";
import { BiSearch } from "react-icons/bi";
import { FaCalendarAlt } from "react-icons/fa";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
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


export default function Schools() {
    const router = useNavigate();

    const [showToast, setShowToast] = useState({ show: false, message: '', status: '' });
    const [MainData, setMainData] = useState([]);
    const [FilteredData, setFilteredData] = useState(null);
    const [SearchInput, setSearchInput] = useState("");
    const [ByDate, setByDate] = useState(false);
    const [StartDate, setStartDate] = useState("");
    const [EndDate, setEndDate] = useState("");
    const [CurrentPage, setCurrentPage] = useState(1);
    const [PostPerPage, setPostPerPage] = useState(configuration.sizePerPage);
    const [TotalPage, setTotalPage] = useState("");
    const [status, setStatus] = useState("PENDING");
    
    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };
    
    const GetAllScholarshipSchool = async () => {
        try {
            const result = await GetAllScholarshipSchoolsApi(CurrentPage, PostPerPage, status);
            console.log("getallscholarshipSchools", result);
    
            if (result.status === 200 && result.data?.schools?.length > 0) {
                setMainData(result.data.schools);
                setTotalPage(result.data.totalPages);
            } else {
                setMainData([]);
            }
        } catch (e) {
            console.log("error", e.message);
        }
    };
    
    useEffect(() => {
        GetAllScholarshipSchool();
    }, [CurrentPage, PostPerPage, status]);
    
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

    return (
        <MainLayout>
            <Text fontSize={"21px"} lineHeight={"25.41px"} fontWeight="700">Schools <Box as='span' color="#667085" fontWeight="600" fontSize="19px">({MainData.length})</Box></Text>
            <Text mt="9px" color={"#686C75"} fontWeight={"400"} fontSize={"15px"} mb={5} gap={"9px"} lineHeight={"24px"}>View and manage school approval requests. Quickly review pending applications and take necessary actions like approving or rejecting.</Text>

            <Box bg="#fff" border="1px solid #EFEFEF" mt="12px" py='17px' px={["18px", "18px"]} rounded='10px'>
                <Tabs>
                    <HStack justifyContent={"space-between"}>
                        <TabList overflowX={"auto"} overflowY={"hidden"}>
                            <Tab  onClick={() => {
                                setStatus("PENDING")
                            }} _selected={{ color: "green", borderColor: "green" }} fontSize={"14px"} fontWeight={"600"} lineHeight={"20px"}><Text fontSize={"14px"} fontWeight={"600"} lineHeight={"20px"}>Pending Approval <Box as="span" color="#667085" fontSize="12px" fontWeight="600">({MainData.length})</Box></Text></Tab>
                            <Tab onClick={() => {
                                setStatus("APPROVED")
                            }} _selected={{ color: "green", borderColor: "green" }} fontSize={"14px"} fontWeight={"600"} lineHeight={"20px"}><Text fontSize={"14px"} fontWeight={"600"} lineHeight={"20px"}>Approved <Box as="span" color="#667085" fontSize="12px" fontWeight="600">({MainData.length})</Box></Text></Tab>
                            <Tab onClick={() => {
                                setStatus("REJECTED")
                            }} _selected={{ color: "green", borderColor: "green" }} fontSize={"14px"} fontWeight={"600"} lineHeight={"20px"}><Text fontSize={"14px"} fontWeight={"600"} lineHeight={"20px"}>Rejected <Box as="span" color="#667085" fontSize="12px" fontWeight="600">({MainData.length})</Box></Text></Tab>
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
                                                <Th fontSize="13px" textTransform="capitalize" color='#2F2F2F' fontWeight="600">submission date</Th>
                                                <Th fontSize="13px" textTransform="capitalize" color='#2F2F2F' fontWeight="600">status</Th>
                                                <Th fontSize="13px" textTransform="capitalize" color='#2F2F2F' fontWeight="600">actions</Th>

                                            </Tr>
                                        </Thead>
                                        <Tbody>

                                            {
                                                MainData.map((item, i) => (

                                                    <TableRow
                                                        type={item.type}
                                                        schoolName={item.school_name}
                                                        email={item.principal_email}
                                                        submissionDate={item.created_at}
                                                        status={item.status}
                                                        buttonText={item.buttonText}
                                                    />
                                                ))
                                            }

                                        </Tbody>

                                    </Table>

                                    <Pagination
                        currentPage={CurrentPage}
                        totalPosts={TotalPage}
                        paginate={paginate}
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
                                                <Th fontSize="13px" textTransform="capitalize" color='#2F2F2F' fontWeight="600">submission date</Th>
                                                <Th fontSize="13px" textTransform="capitalize" color='#2F2F2F' fontWeight="600">status</Th>
                                                <Th fontSize="13px" textTransform="capitalize" color='#2F2F2F' fontWeight="600">actions</Th>

                                            </Tr>
                                        </Thead>
                                        <Tbody>

                                            {
                                                MainData.map((item, i) => (

                                                    <TableRow
                                                        type={item.type}
                                                        schoolName={item.school_name}
                                                        email={item.email}
                                                        submissionDate={item.created_at}
                                                        status={item.status}
                                                        buttonText={item.buttonText}
                                                    />
                                                ))
                                            }

                                        </Tbody>

                                    </Table>

                                    <Pagination
                        currentPage={CurrentPage}
                        totalPosts={TotalPage}
                        paginate={paginate}
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
                                                <Th fontSize="13px" textTransform="capitalize" color='#2F2F2F' fontWeight="600">submission date</Th>
                                                <Th fontSize="13px" textTransform="capitalize" color='#2F2F2F' fontWeight="600">status</Th>
                                                <Th fontSize="13px" textTransform="capitalize" color='#2F2F2F' fontWeight="600">actions</Th>

                                            </Tr>
                                        </Thead>
                                        <Tbody>

                                            {
                                                MainData.map((item, i) => (

                                                    <TableRow
                                                        type={item.type}
                                                        schoolName={item.school_name}
                                                        email={item.email}
                                                        submissionDate={item.created_at}
                                                        status={item.status}
                                                        buttonText={item.buttonText}
                                                    />
                                                ))
                                            }

                                        </Tbody>

                                    </Table>

                                    <Pagination
                        currentPage={CurrentPage}
                        totalPosts={TotalPage}
                        paginate={paginate}
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
