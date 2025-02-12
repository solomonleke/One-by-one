import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import MainLayout from '../../DashboardLayout'
import { Text, Flex, HStack, Box, useDisclosure } from '@chakra-ui/react'
import TableRow from "../../Components/TableRow"
import Button from "../../Components/Button"
import Input from "../../Components/Input"
import RemoveNotification from "../../Components/RemoveNotification"
import ProfileUpdateNotification from "../../Components/ProfileUpdateNotification"
import { CgSearch } from "react-icons/cg";
import { FaCalendarAlt } from "react-icons/fa";
import { IoFilter } from "react-icons/io5";
import { HiOutlineDocumentArrowUp } from "react-icons/hi2";
import { BiSearch } from "react-icons/bi"; import Pagination from "../../Components/Pagination";
import { configuration } from "../../Utils/Helpers";
import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    TableContainer,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
} from '@chakra-ui/react'

export default function StudentManagement() {

    const [All, setAll] = useState(true)
    const [Approved, setApproved] = useState(false)
    const [Pending, setPending] = useState(false)
    const [Rejected, setRejected] = useState(false)

    const [OpenModal, setOpenModal] = useState(false)
    const { isOpen, onOpen, onClose } = useDisclosure()


    const router = useNavigate();

    const Data = [
        {
            type: "school-admin",
            name: "Moyinoluwa King",
            email: "moyinadeleke@yahoo.com",
            department: "commercial",
            classLevel: "SS3",
            fieldOfStudy: "Computer Science",
            status: "approved"
        },
        {
            type: "school-admin",
            name: "Moyinoluwa King",
            email: "moyinadeleke@yahoo.com",
            department: "commercial",
            classLevel: "SS3",
            fieldOfStudy: "Computer Science",
            status: "rejected"
        },
        {
            type: "school-admin",
            name: "Moyinoluwa King",
            email: "moyinadeleke@yahoo.com",
            department: "commercial",
            classLevel: "SS3",
            fieldOfStudy: "Computer Science",
            status: "pending"
        },
        {
            type: "school-admin",
            name: "Moyinoluwa King",
            email: "moyinadeleke@yahoo.com",
            department: "commercial",
            classLevel: "SS3",
            fieldOfStudy: "Computer Science",
            status: "pending"
        },
        {
            type: "school-admin",
            name: "Moyinoluwa King",
            email: "moyinadeleke@yahoo.com",
            department: "commercial",
            classLevel: "SS3",
            fieldOfStudy: "Computer Science",
            status: "approved"
        },
        {
            type: "school-admin",
            name: "Moyinoluwa King",
            email: "moyinadeleke@yahoo.com",
            department: "commercial",
            classLevel: "SS3",
            fieldOfStudy: "Computer Science",
            status: "rejected"
        },
        {
            type: "school-admin",
            name: "Moyinoluwa King",
            email: "moyinadeleke@yahoo.com",
            department: "commercial",
            classLevel: "SS3",
            fieldOfStudy: "Computer Science",
            status: "rejected"
        },
        {
            type: "school-admin",
            name: "Moyinoluwa King",
            email: "moyinadeleke@yahoo.com",
            department: "commercial",
            classLevel: "SS3",
            fieldOfStudy: "Computer Science",
            status: "approved"
        },
        {
            type: "school-admin",
            name: "Moyinoluwa King",
            email: "moyinadeleke@yahoo.com",
            department: "commercial",
            classLevel: "SS3",
            fieldOfStudy: "Computer Science",
            status: "approved"
        },
        {
            type: "school-admin",
            name: "Moyinoluwa King",
            email: "moyinadeleke@yahoo.com",
            department: "commercial",
            classLevel: "SS3",
            fieldOfStudy: "Computer Science",
            status: "approved"
        },
        {
            type: "school-admin",
            name: "Moyinoluwa King",
            email: "moyinadeleke@yahoo.com",
            department: "commercial",
            classLevel: "SS3",
            fieldOfStudy: "Computer Science",
            status: "approved"
        },
    ]

    const [MainData, setMainData] = useState(Data)
    const [FilterData, setFilterData] = useState(Data)


    // Pagination settings to follow
    const [CurrentPage, setCurrentPage] = useState(1);
    console.log("currentpage", CurrentPage);
    const [PostPerPage, setPostPerPage] = useState(configuration.sizePerPage);

    //get current post
    const indexOfLastSra = CurrentPage * PostPerPage;
    const indexOfFirstSra = indexOfLastSra - PostPerPage;
    const PaginatedData = FilterData.slice(indexOfFirstSra, indexOfLastSra);
    //change page
    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    // Pagination settings to follow end here

    // Search Filter settings to follow
    const [SearchInput, setSearchInput] = useState("");
    const [FilteredData, setFilteredData] = useState(null);

    // filter by date
    const [ByDate, setByDate] = useState(false);
    const [StartDate, setStartDate] = useState("");
    const [EndDate, setEndDate] = useState("");

    const filterAll = () => {
        setAll(true);
        setApproved(false);
        setPending(false);
        setRejected(false);

        setFilterData(Data);
    };
    const filterApproved = () => {
        setAll(false);
        setApproved(true);
        setPending(false);
        setRejected(false);

        const filterData = Data.filter((item) => item.status === "approved");

        setFilterData(filterData);
    };
    const filterPending = () => {
        setAll(false);
        setApproved(false);
        setPending(true);
        setRejected(false);

        const filterData = Data.filter((item) => item.status === "pending");

        setFilterData(filterData);
    };
    const filterRejected = () => {
        setAll(false);
        setApproved(false);
        setPending(false);
        setRejected(true);

        const filterData = Data.filter((item) => item.status === "rejected");

        setFilterData(filterData);
    };

    const filterBy = (title) => {
        console.log("filter checking", title);

        if (title === "role") {
            let filter = Data.filter((item) =>
                item.role?.toLowerCase().includes(SearchInput.toLowerCase())
            );
            setFilteredData(filter);
            console.log("filter checking", filter);
        } else if (title === "email") {
            let filter = Data.filter((item) =>
                item.email?.toLowerCase().includes(SearchInput.toLowerCase())
            );
            setFilteredData(filter);
            console.log("filter checking", filter);
        } else if (title === "name") {
            let filter = Data.filter(
                (item) =>
                    item.firstName?.toLowerCase().includes(SearchInput.toLowerCase()) ||
                    item.lastName?.toLowerCase().includes(SearchInput.toLowerCase())
            );
            setFilteredData(filter);
            console.log("filter checking", filter);
        } else if (title === "date") {
            // add 1 day to end date 
            let endDate = new Date(EndDate)
            endDate.setDate(endDate.getDate() + 1);
            // format date back
            let formatedEndDate = endDate.toISOString().split('T')[0]
            let filter = Data.filter(
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

    return (
        <MainLayout>
            <HStack>
                <Text color="#1F2937" fontWeight="600" fontSize="19px">Students</Text>
                <Text color="#667085" fontWeight="400" fontSize="18px">({Data.length})</Text>
            </HStack>
            <Text color="#686C75" mt="9px" fontWeight="400" fontSize="15px">View and manage all student profiles in one place. Quickly access approval statuses, track eligibility, and update details as needed.</Text>

            <Box bg="#fff" border="1px solidrgb(253, 207, 207)" mt="12px" py='17px' px={["18px", "18px"]} rounded='10px'>
                <Flex justifyContent="space-between" flexWrap="wrap">
                    <Flex alignItems="center" flexWrap='wrap' bg="#E8FFF4" rounded='7px' py="3.5px" px="5px" cursor="pointer" mt={["10px", "10px", "0px", "0px"]}>

                        <Box borderRight="1px solid #EDEFF2" pr="5px" onClick={filterAll}>
                            <Text py='8.5px' px="12px" bg={All ? "#fff" : "transparent"} rounded="7px" color={"#1F2937"} fontWeight={"500"} fontSize={"13px"}>All  <Box color="#667085" as='span' fontWeight="400" fontSize="13px">(526)</Box></Text>
                        </Box>
                        <Box borderRight="1px solid #EDEFF2" pr="5px" onClick={filterApproved}>
                            <Text py='8.5px' px="12px" bg={Approved ? "#fff" : "transparent"} rounded="7px" color={"#1F2937"} fontWeight={"500"} fontSize={"13px"}>Approved</Text>
                        </Box>
                        <Box borderRight="1px solid #EDEFF2" pr="5px" onClick={filterPending}>
                            <Text py='8.5px' px="12px" bg={Pending ? "#fff" : "transparent"} rounded="7px" color={"#1F2937"} fontWeight={"500"} fontSize={"13px"}>Pending</Text>
                        </Box>
                        <Box pr="5px" onClick={filterRejected}>
                            <Text py='8.5px' px="12px" bg={Rejected ? "#fff" : "transparent"} rounded="7px" color={"#1F2937"} fontWeight={"500"} fontSize={"13px"}>Rejected</Text>
                        </Box>

                    </Flex>

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
                                        onClick={() => filterBy("role")}
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
                                            <Text>by role</Text>
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

                <Flex
                    justifyContent="space-between"
                    flexWrap="wrap"
                    mt={["10px", "10px", "10px", "10px"]}
                    w={["100%", "100%", "50%", "37%"]}
                >
                    <Button w="159px" size="sm" onClick={() => {
                        router("/AddStudents")
                    }}>Add student</Button>
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
                                    <Th fontSize="13px" textTransform="capitalize" color='#2F2F2F' fontWeight="600">actions</Th>

                                </Tr>
                            </Thead>
                            <Tbody>

                                {
                                    PaginatedData?.map((item, i) => (

                                        <TableRow
                                            type={item.type}
                                            name={item.name}
                                            email={item.email}
                                            department={item.department}
                                            classLevel={item.classLevel}
                                            fieldOfStudy={item.fieldOfStudy}
                                            status={item.status}
                                            onRemove={onOpen}
                                            onEdit={() => setOpenModal(true)}
                                        />
                                    ))
                                }

                            </Tbody>

                        </Table>
                    </TableContainer>

                    <Pagination
                        postPerPage={PostPerPage}
                        currentPage={CurrentPage}
                        totalPosts={Data.length}
                        paginate={paginate}
                    />
                </Box>
            </Box>
            <RemoveNotification isOpen={isOpen} onClose={onClose} />
            <ProfileUpdateNotification isOpen={OpenModal} onClose={() => setOpenModal(false)} />
        </MainLayout>
    )
}
