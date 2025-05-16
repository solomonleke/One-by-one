import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import MainLayout from '../../SuperAdminDashboardLayout'
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
import { BiSearch } from "react-icons/bi";
import Pagination from "../../Components/Pagination";
import RemoveNotification from "../../Components/RemoveNotification"
import { FaCalendarAlt } from "react-icons/fa";
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


export default function Students() {

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
  
  
  if(isLoading) {
    return ( <Preloader message="Loading..." />)
  }


  return (
    <MainLayout>

      <Text color={"#1F2937"} fontWeight={"700"} fontSize={"24px"} textTransform="capitalize" lineHeight={"25.41px"}>Students</Text>


    </MainLayout>


  )
}
