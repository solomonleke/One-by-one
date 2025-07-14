import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import MainLayout from '../../DashboardLayout'
import { Text, Flex, HStack, Box, Avatar, VStack, SimpleGrid } from '@chakra-ui/react'
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
import { getAllActiveScholarships } from "../../Utils/ApiCall";



export default function Scholarships() {

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

  const [loading, setLoading] = useState(false);
  const [scholarships, setScholarships] = useState([]);
  const [sponsorScholarships, setSponsorScholarships] = useState([]);
  const [activeScholarshipCount, setActiveScholarshipCount] = useState(0);


  

  const dummyScholarships = [
    {
      id: 1,
      name: "Stem Excellence Scholarship",
      created_at: "2024-05-01T10:30:00Z",
      amount: "500000",
      sponsor: 'Francis Uzoma',
      students: [
        { full_name: "Alice Johnson" },
        { full_name: "Bob Smith" },
        { full_name: "Alan Walker" },
        { full_name: "Joe Aribo" },
      ],
    },
    {
      id: 2,
      name: "Pathway to Excellence Scholarship",
      created_at: "2024-05-01T10:30:00Z",
      amount: "500000",
      sponsor: 'Francis Uzoma',
      students: [
        { full_name: "Philip Amakari" },
        { full_name: "Jane Chucks" },
      ],
    },
    {
      id: 3,
      name: "Stem Excellence Scholarship",
      created_at: "2024-05-01T10:30:00Z",
      amount: "500000",
      sponsor: 'Francis Uzoma',
      students: [
        { full_name: "Simon Abubakar" },
        { full_name: "Sterling John" },
        { full_name: "Alan Walker" },
      ],
    },
    {
      id: 4,
      name: "Pathway to Excellence Scholarship",
      created_at: "2024-05-01T10:30:00Z",
      amount: "500000",
      sponsor: 'Francis Uzoma',
      students: [
        { full_name: "Micheal Odegard" },
        { full_name: "Williams Saliba" },
      ],
    },
    {
      id: 5,
      name: "Stem Excellence Scholarship",
      created_at: "2024-05-01T10:30:00Z",
      amount: "500000",
      sponsor: 'Francis Uzoma',
      students: [],
    },
    {
      id: 6,
      name: "Pathway to Excellence Scholarship",
      created_at: "2024-05-01T10:30:00Z",
      amount: "500000",
      sponsor: 'Francis Uzoma',
      students: [
        { full_name: "Bukayo Saka" },
        { full_name: "Declan Rice" },
      ],
    },
    {
      id: 7,
      name: "Stem Excellence Scholarship",
      created_at: "2024-05-01T10:30:00Z",
      amount: "500000",
      sponsor: 'Francis Uzoma',
      students: [
        { full_name: "Mikel Arteta" },
        { full_name: "Lissandro Trossard" },
        { full_name: "Joe Aribo" },
        { full_name: "Alan Walker" },
        { full_name: "Joel Menes" },
      ],
    },
    {
      id: 8,
      name: "Pathway to Excellence Scholarship",
      created_at: "2024-05-01T10:30:00Z",
      amount: "500000",
      sponsor: 'Francis Uzoma',
      students: [
        { full_name: "Don Callafiorri" },
        { full_name: "Ben White" },
      ],
    },
    {
      id: 9,
      name: "Stem Excellence Scholarship",
      created_at: "2024-05-01T10:30:00Z",
      amount: "500000",
      sponsor: 'Francis Uzoma',
      students: [
        { full_name: "David Raya" },
        { full_name: "Thomas Partey" },
        { full_name: "Fred Jackson" },
      ],
    },
    {
      id: 10,
      name: "Pathway to Excellence Scholarship",
      created_at: "2024-05-01T10:30:00Z",
      amount: "500000",
      sponsor: 'Francis Uzoma',
      students: [
        { full_name: "Havertz Rio" },
        { full_name: "Nketiah Black" },
        { full_name: "Alan Walker" },
        { full_name: "Joe Aribo" },
      ],
    },
    {
      id: 11,
      name: "Merit-Based Award",
      created_at: "2024-04-15T14:20:00Z",
      amount: "300000",
      students: [],
    },
  ];

  const fetchScholarships = async () => {
    try {
      const data = await getAllActiveScholarships(); // now returns `res.data`
      console.log("Scholarships data:", data);
  
      // ✅ Update here
      if (Array.isArray(data.scholarships)) {
        setScholarships(data.scholarships);
        setActiveScholarshipCount(data.scholarships.length);
      } else {
        setError("Scholarship data is not in expected format");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
      setIsLoading(false);
    }
  };
  

  useEffect(() => {
    fetchScholarships();
  }, []);
  
  if (isLoading) {
    return (<Preloader message="Loading..." />)
  }


  return (
    <MainLayout>
      <Text
        color="#1F2937"
        fontWeight="600"
        fontSize={{ base: "20px", md: "21px" }}
        textTransform="capitalize"
        lineHeight="25.41px"
        mb="20px"
      >
        Active Scholarships 
        <Box as="span" color="#667085" fontSize="18px" fontWeight="400"> ({dummyScholarships.length})</Box>
      </Text>

      {dummyScholarships.length > 0 ? (
        <SimpleGrid
          columns={{ base: 1, sm: 1, md: 1, lg: 1, xl: 2, "2xl": 2 }}
          spacing="20px"
          w="100%"
        >
          {dummyScholarships.map((scholarship, index) => (
            <Stack
              key={scholarship.id || index}
              borderWidth="1px"
              borderColor="#E0E0E0"
              rounded="11px"
              py="12px"
              px="16px"
              w="100%"
              minH="150px"
              spacing="16px"
            >
              {/* Scholarship Details */}
              <HStack justifyContent="space-between" flexWrap={["wrap", "wrap", "nowrap", "nowrap"]} w="100%" gap="10px">
                <HStack>
                  <Box bg="#39996B" w="3px" h="33px" rounded="3px"></Box>
                  <Stack>
                    <Text color="#1F2937" fontSize="13px" fontWeight="600">
                      {scholarship.name}
                    </Text>
                    <Text color="#767F8E" fontSize="11px" fontWeight="400">
                      Date Created:{" "}
                      {new Date(scholarship.created_at).toLocaleString()}
                    </Text>
                  </Stack>
                </HStack>

                <HStack>
                  <Text color="#344054" fontSize="12px" fontWeight="400">
                    Amount
                  </Text>
                  <Text color="#344054" fontSize="12px" fontWeight="400">
                    :
                  </Text>
                  <Text color="#3F4956" fontSize="14px" fontWeight="600">
                    ₦
                    {parseInt(scholarship.amount).toLocaleString(undefined, {
                      maximumFractionDigits: 0,
                    })}
                  </Text>
                </HStack>
              </HStack>

              {/* Horizontal Line */}
              <Box borderBottom="1px solid #E0E0E0" />

              {/* Awardees & View Funding History */}
              <HStack justifyContent="space-between" flexWrap={["wrap", "wrap", "nowrap", "nowrap"]} gap="10px" alignItems="center">
                <HStack display="flex" flexWrap="wrap" mt="10px" gap="2px">
                  {scholarship.students.length > 0 ? (
                    <>
                      <HStack
                        bg="#E8F2ED"
                        p="8px"
                        rounded="31px"
                      >
                        <Avatar size="sm" name={scholarship.students[0].full_name} />
                        <Text color="#101828" fontSize="13px" fontWeight="500">
                          {scholarship.students[0].full_name}
                        </Text>
                      </HStack>
                      {scholarship.students.length > 1 && (
                        <HStack
                          bg="#E8F2ED"
                          p="8px"
                          rounded="31px"
                        >
                          <Text
                            color="#101828"
                            fontSize="13px"
                            fontWeight="500"
                          >
                            +{scholarship.students.length - 1}
                          </Text>
                        </HStack>
                      )}
                    </>
                  ) : (
                    <Text color="#767F8E" fontSize="12px" fontWeight="400">
                      No students assigned
                    </Text>
                  )}

                </HStack>

                  <HStack border="1px solid #EDEFF2" py="16px" px="14px" rounded="8px">
                  <Text color="#6B7280" fontSize="13px" fontWeight="500">
                    Sponsor
                  </Text>
                  <Text color="#6B7280" fontSize="13px" fontWeight="500">
                    :
                  </Text>
                  <Text color="#6B7280" fontSize="13px" fontWeight="500">
                    {scholarship.sponsor}
                  </Text>
                </HStack>
              </HStack>
            </Stack>
          ))}
        </SimpleGrid>
      ) : (
        <Text fontSize="14px" fontWeight="500" color="#767F8E">
          No scholarships available.
        </Text>
      )}
    </MainLayout>


  )
}
