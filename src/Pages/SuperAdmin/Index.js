import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import MainLayout from '../../SuperAdminDashboardLayout'
import {
  Text, Flex, HStack, Box,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Grid,
  SimpleGrid,
  Image,
  Spacer,
  useColorModeValue,
  grid,
} from '@chakra-ui/react'
import { Tooltip as Tooltips } from '@chakra-ui/react';
import DashboardCard from "../../Components/DashboardCard"
import Button from "../../Components/Button"
import priceBg from "../../Asset/priceBg.png"
import leftBg from "../../Asset/priceBg2.png"
import { HiOutlineUsers } from 'react-icons/hi'
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { RxTimer } from "react-icons/rx";
import { MdOutlineCancel } from 'react-icons/md'
import { IoInformationCircleOutline, IoArrowForward } from "react-icons/io5";
import { GoArrowDown } from "react-icons/go";
import { Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis } from 'recharts'
import { BiSearch } from "react-icons/bi";
import Pagination from "../../Components/Pagination";
import RemoveNotification from "../../Components/RemoveNotification"
import { FaCalendarAlt, FaSchool } from "react-icons/fa";
import TableRow from "../../Components/TableRow"
import { CgSearch } from "react-icons/cg";
import { configuration } from "../../Utils/Helpers";
import { IoFilter } from "react-icons/io5";
import { GetAllStudentApi } from "../../Utils/ApiCall";
import { GetSchoolAdminDashboardGraphDataApi } from "../../Utils/ApiCall";
import { GetStudentStatsApi, UpdateStudentProfile, DeleteStudentProfile } from "../../Utils/ApiCall";
import moment from "moment";
import ShowToast from "../../Components/ToastNotification"
import Preloader from "../../Components/Preloader"


import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  TableContainer,
  useDisclosure,
  Input,
  Stack,
  MenuList,
  MenuItem,
  MenuButton,
  Menu,
  ModalOverlay,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
} from '@chakra-ui/react'


export default function Index() {

  const availableBalance = "200,158.32"

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
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [editedData, setEditedData] = useState("");
  const { isOpen: isRemoveModalOpen, onOpen: onOpenRemove, onClose: onCloseRemove } = useDisclosure();
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [selectedStudentId, setSelectedStudentId] = useState(null);
  const [originalData, setOriginalData] = useState(null);
  const [studentId, setStudentId] = useState(null);
  const { isOpen: isEditModalOpen, onOpen: onOpenEdit, onClose: onCloseEdit } = useDisclosure();
  const [showToast, setShowToast] = useState({
    show: false,
    message: "",
    status: ""
  })

  useEffect(() => {
    const storedName = JSON.parse(localStorage.getItem('onlineUser'));
    if (storedName) {
      setUserName(`${storedName.firstName}`);
    }

  }, []);


  if (isLoading) {
    return (<Preloader message="Loading..." />)
  }


  return (
    <MainLayout>
      <Text color={"#1F2937"} fontWeight={"700"} fontSize={"24px"} textTransform="capitalize" lineHeight={"25.41px"}>Welcome back, {userName || "User"}.</Text>

      <HStack
  mt="20px"
  spacing={["50px", "70px", "10px", "400px"]} // Optional: adds consistent gap if needed
  justifyContent="space-between"
  alignItems="flex-start"
  w="100%"
>
  {/* Left Box with Gradient and Images */}
  <Box
    h="217px"
    w="566px"
    flexShrink={0}
    display="flex"
    gap="6px"
    flexDir="column"
    justifyContent="center"
    rounded="11px"
    py="15px"
    px="23px"
    sx={{
      backgroundImage: `url(${leftBg}), url(${priceBg}), linear-gradient(90.1deg, #20553C 0.09%, #C4EF4B 101.03%)`,
      backgroundRepeat: 'no-repeat, no-repeat, no-repeat',
      backgroundPosition: 'left center, right center, center',
      backgroundSize: 'contain, contain, cover',
    }}
  >
    <Text fontSize="14px" color="#FFFFFFC7" fontWeight="500">Available Balance</Text>
    <Text fontSize="39.63px" color="#ffffff" fontWeight="800" letterSpacing="1px">
      <Box as="span" fontSize="20px" color="#ffffff" fontWeight="700">₦</Box>
      {availableBalance}
    </Text>
    <Button
      w="220px"
      border="none"
      color="#4C515C"
      background="#fff"
      fontWeight="500"
      fontSize="14px"
      rightIcon={<IoArrowForward color="#4C515C" />}
    >
      Disbursement Records
    </Button>
  </Box>

  {/* Right SimpleGrid */}
  <SimpleGrid
    columns={{ base: 1, md: 2 }}
    spacing="20px"
    px={{ base: "0", md: "0" }}
    maxW="100%"
    flex="1"
  >
    {/* map of role cards */}
    {[
      {
        title: "Total Schools",
        total: 26,
        icon: FaSchool,
        navText: "See All",
      },
      {
        title: "Total Students",
        total: 40,
        icon: FaSchool,
        navText: "See All",
      },
      {
        title: "Total Students Sponsored",
        total: 16,
        icon: FaSchool,
        navText: "See All",
      },
      {
        title: "Total Funds Disbursed",
        total: '₦450,184 ',
        icon: FaSchool,
        navText: "See All",
      },
    ].map((role, i) => (
      <Box
        key={i}
        w="100%"
        borderRadius="10px"
        border="1px solid #EDEFF2"
        boxShadow="0px 4px 20px rgba(0, 0, 0, 0.1)"
        p={{ base: "15px", md: "25px" }}
        h="101px"
        minW="387px"
        justifyContent="center"
        display="flex"
        flexDirection="column"
      >
        <Stack>
          <HStack justifyContent="space-between" display="flex">
            <HStack justifyContent="space-between">
              <FaSchool color="#39996B" />
              <Text color="#4C515C" fontSize="13px" fontWeight="400">{role.title}</Text>
            </HStack>
            <Text color="#2F2F2F" fontSize="20px" fontWeight="600">{role.total}</Text>
          </HStack>
          <hr className="remove" />
          <HStack gap="4px" cursor="pointer">
            <Text color="#39996B" fontSize="13px" fontWeight="600">{role.navText}</Text>
            <IoArrowForward color="#39996B" />
          </HStack>
        </Stack>
      </Box>
    ))}
  </SimpleGrid>
</HStack>





    </MainLayout>


  )
}
