import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import MainLayout from '../../DashboardLayout'
import { Text, Flex, HStack, VStack, Box, useDisclosure, Center, Progress, Icon, Avatar, Image } from '@chakra-ui/react'
import { Tooltip as Tooltips } from '@chakra-ui/react';
import DashboardCard from "../../Components/DashboardCard"
import Button from "../../Components/Button"
import Input from "../../Components/Input"
import SearchInput from "../../Components/SearchInput"
import { HiOutlineUsers } from 'react-icons/hi'
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { MdOutlineCancel } from 'react-icons/md'
import { IoInformationCircleOutline } from "react-icons/io5";
import { GoArrowDown } from "react-icons/go";
import { Bar, BarChart, CartesianGrid, Label, Legend, Line, ResponsiveContainer, Pie, PieChart, Tooltip, XAxis, YAxis, LineChart } from 'recharts'
import TableRow from "../../Components/TableRow"
import { CgSearch } from "react-icons/cg";
import { CiSearch } from 'react-icons/ci'
import { IoFilter } from "react-icons/io5";
import { FaUserGraduate } from "react-icons/fa6";
import { TbCurrencyNaira } from "react-icons/tb";
import { FaSchoolFlag } from "react-icons/fa6";
import { FaGoogleScholar } from "react-icons/fa6";
import { FaCheck, FaFilter } from "react-icons/fa6";
import { FaSearch } from "react-icons/fa";
import { IoIosArrowRoundForward } from "react-icons/io";
import { IoCloseOutline } from "react-icons/io5";
import { LiaAngleDoubleRightSolid } from "react-icons/lia";
import { RxInfoCircled } from "react-icons/rx";
import { BiSearch } from "react-icons/bi";
import { FaCalendarAlt } from "react-icons/fa";

import RemoveNotification from "../../Components/RemoveNotification"
import ProfileUpdateNotification from "../../Components/ProfileUpdateNotification"
import { GetAllStudentApi } from "../../Utils/ApiCall";


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
  MenuList,
  MenuItem,
  MenuButton,
  Menu,
} from '@chakra-ui/react'
import { BsThreeDots } from 'react-icons/bs';
import Pagination from "../../Components/Pagination";
import { configuration } from "../../Utils/Helpers";


export default function DiscoverStudents() {
    const [OpenModal, setOpenModal] = useState(false)
    const { isOpen, onOpen, onClose } = useDisclosure()


    const router = useNavigate();

    

    const [MainData, setMainData] = useState([])
    const [FilterData, setFilterData] = useState([])
    const [FilteredData, setFilteredData] = useState(null);
    const [SearchInput, setSearchInput] = useState("");
    const [StartDate, setStartDate] = useState("");
    const [EndDate, setEndDate] = useState("");
    const [userName, setUserName] = useState('');
    const [TotalPage, setTotalPage] = useState("");
    const [ByDate, setByDate] = useState(false);




    // Pagination settings to follow
    const [CurrentPage, setCurrentPage] = useState(1);
    console.log("currentpage", CurrentPage);
    const [PostPerPage, setPostPerPage] = useState(configuration.sizePerPage);
    

    //get current post
    const indexOfLastSra = CurrentPage * PostPerPage;
    const indexOfFirstSra = indexOfLastSra - PostPerPage;

        //change page
    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    // Pagination settings to follow end here

    const handleStudentClick = (student_Id) => {
        router(`/school-admin/student-management/student-profile/${student_Id}`);
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

    const getallStudent = async () => {
        console.log("CurrentPage:", CurrentPage, "PostPerPage:", PostPerPage);
  
        try {
            const result = await GetAllStudentApi(CurrentPage, PostPerPage)
  
            console.log("getallStudent", result)
  
            if (result.status === 200) {
                setMainData(result.data.data.students)
                setTotalPage(result.data.data.totalPages)
            }
        } catch (e) {
  
            console.log("error", e.message)
        }
  
    }

    useEffect(() => {
  
        getallStudent()
    
    }, [CurrentPage]);
  
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
  
    

    return(
        <MainLayout>
            <Text fontSize={"21px"} lineHeight={"25.41px"} fontWeight="700">All Students <Box as="span" color="#667085" fontSize="18px" fontWeight="400">({MainData.length})</Box></Text>
            <Text mt="9px" color={"#686C75"} fontWeight={"400"} fontSize={"15px"} mb={5} gap={"9px"} lineHeight={"24px"}>Explore a diverse pool of students and their academic aspirations. Review profiles, understand funding needs, and choose who to support on their educational journey.</Text>

            <Box bg="#fff" border="1px solid #EDEFF2" mt="12px" pt='20px' pb="32px" px={["10px","10px","18px","18px"]} rounded='10px'>
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

                    <Pagination
                        postPerPage={PostPerPage}
                        currentPage={CurrentPage}
                        totalPosts={MainData.length}
                        paginate={paginate}
                    />
            </Box>
            <RemoveNotification isOpen={isOpen} onClose={onClose} />
            <ProfileUpdateNotification isOpen={OpenModal} onClose={() => setOpenModal(false)} />
        </MainLayout>
    )
}