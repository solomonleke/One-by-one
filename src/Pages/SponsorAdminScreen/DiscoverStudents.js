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
import RemoveNotification from "../../Components/RemoveNotification"
import ProfileUpdateNotification from "../../Components/ProfileUpdateNotification"

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
} from '@chakra-ui/react'
import { BsThreeDots } from 'react-icons/bs';
import Pagination from "../../Components/Pagination";
import { configuration } from "../../Utils/Helpers";


export default function DiscoverStudents() {
    const [OpenModal, setOpenModal] = useState(false)
    const { isOpen, onOpen, onClose } = useDisclosure()


    const router = useNavigate();

    const Data = [
        {
            type: "sponsor-admin",
            name: "Philip Amakari",
            schoolName: "Legendary Scholars Academy",
            essayScore: "50%",
            classLevel: "SS2",
            amountAwarded: "₦200,000.00",
        },
        {
            type: "sponsor-admin",
            name: "David Folarin",
            schoolName: "Queens's College",
            essayScore: "50%",
            classLevel: "SS3",
            amountAwarded: "₦500,000.00",
        },
        {
            type: "sponsor-admin",
            name: "Timothy Salisu",
            schoolName: "Federal Government College",
            essayScore: "50%",
            classLevel: "SS2",
            amountAwarded: "₦690,000.00",
        },
        {
            type: "sponsor-admin",
            name: "Peter Usman",
            schoolName: "Mayflower School",
            essayScore: "50%",
            classLevel: "SS3",
            amountAwarded: "₦130,000.00",
        },
        {
            type: "sponsor-admin",
            name: "Esther Wakili",
            schoolName: "Chrisland College",
            essayScore: "50%",
            classLevel: "JS3",
            amountAwarded: "₦100,000.00",
        },
        {
            type: "sponsor-admin",
            name: "Simon Ogan",
            schoolName: "Christ The King College",
            essayScore: "50%",
            classLevel: "SS1",
            amountAwarded: "₦200,000.00",
        },
        {
            type: "sponsor-admin",
            name: "Esther Abubakar",
            schoolName: "Corona Secondary School",
            essayScore: "50%",
            classLevel: "JS3",
            amountAwarded: "₦225,000.00",
        },
        {
            type: "sponsor-admin",
            name: "Philip Ezeoke",
            schoolName: "Adesoye College",
            essayScore: "50%",
            classLevel: "SS2",
            amountAwarded: "₦370,000.00",
        },
        {
            type: "sponsor-admin",
            name: "Saviour Promise",
            schoolName: "Divine Grace School",
            essayScore: "50%",
            classLevel: "SS3",
            amountAwarded: "₦900,000.00",
        },
        {
            type: "sponsor-admin",
            name: "Micheal Villian",
            schoolName: "Techstars Scholars Academy",
            essayScore: "50%",
            classLevel: "SS3",
            amountAwarded: "₦400,000.00",
        },
        {
            type: "sponsor-admin",
            name: "Bright Gabriel",
            schoolName: "BlueIce Scholars Academy",
            essayScore: "50%",
            classLevel: "SS3",
            amountAwarded: "₦300,000.00",
        },
        {
            type: "sponsor-admin",
            name: "Saviour Onyedikachi",
            schoolName: "DivineWill Model Academy",
            essayScore: "50%",
            classLevel: "SS1",
            amountAwarded: "₦500,000.00",
        },
        {
            type: "sponsor-admin",
            name: "Saviour Benjamin",
            schoolName: "Divine Model Academy",
            essayScore: "50%",
            classLevel: "JS1",
            amountAwarded: "₦900,000.00",
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

    return(
        <MainLayout>
            <Text fontSize={"21px"} lineHeight={"25.41px"} fontWeight="700">All Students <Box as="span" color="#667085" fontSize="18px" fontWeight="400">({Data.length})</Box></Text>
            <Text mt="9px" color={"#686C75"} fontWeight={"400"} fontSize={"15px"} mb={5} gap={"9px"} lineHeight={"24px"}>Explore a diverse pool of students and their academic aspirations. Review profiles, understand funding needs, and choose who to support on their educational journey.</Text>

            <Box bg="#fff" border="1px solid #EDEFF2" mt="12px" pt='20px' pb="32px" px={["10px","10px","18px","18px"]} rounded='10px'>
                <HStack justifyContent="space-between">
                    <SearchInput label='search students' leftIcon={<CiSearch />}/>

                    <HStack borderWidth="1px" rounded="7px" py="10px" px="24px">
                        <FaFilter />
                        <Text color="#2F2F2F" fontSize="14px" fontWeight="500">Filter</Text>
                    </HStack>
                </HStack>

                <TableContainer>
                        <Table variant='simple'>

                            <Thead bg="#F9FAFB">
                                <Tr >
                                    <Th fontSize="13px" textTransform="capitalize" color='#2F2F2F' fontWeight="600">name</Th>
                                    <Th fontSize="13px" textTransform="capitalize" color='#2F2F2F' fontWeight="600">school name</Th>
                                    <Th fontSize="13px" textTransform="capitalize" color='#2F2F2F' fontWeight="600">essay score</Th>
                                    <Th fontSize="13px" textTransform="capitalize" color='#2F2F2F' fontWeight="600">class level</Th>
                                    <Th fontSize="13px" textTransform="capitalize" color='#2F2F2F' fontWeight="600">amount awarded</Th>
                                    <Th fontSize="13px" textTransform="capitalize" color='#2F2F2F' fontWeight="600">actions</Th>

                                </Tr>
                            </Thead>
                            <Tbody>

                                {
                                    PaginatedData?.map((item, i) => (

                                        <TableRow
                                            type={item.type}
                                            name={item.name}
                                            schoolName={item.schoolName}
                                            essayScore={item.essayScore}
                                            classLevel={item.classLevel}
                                            amountAwarded={item.amountAwarded}
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
            <RemoveNotification isOpen={isOpen} onClose={onClose} />
            <ProfileUpdateNotification isOpen={OpenModal} onClose={() => setOpenModal(false)} />
        </MainLayout>
    )
}