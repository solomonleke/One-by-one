import React, { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom';
import MainLayout from '../../DashboardLayout'
import { Text, Flex, Stack, HStack, VStack, Box, Radio, useDisclosure, Center, Progress, Icon, Avatar, Image, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Switch } from '@chakra-ui/react'
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

import ProfileUpdateNotification from "../../Components/ProfileUpdateNotification"
import eventBus from "../../Components/eventBus"
import { GetAllSponsorStudentApi, getAllSponsorStudentsApi } from "../../Utils/ApiCall";


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
import ShowToast from '../../Components/ToastNotification';
import { configuration } from "../../Utils/Helpers";
import { getScholarshipsBySponsor } from "../../Utils/ApiCall";
import { AddStudentToScholarshipApi } from "../../Utils/ApiCall";
import Preloader from "../../Components/Preloader"



export default function DiscoverStudents() {
  const [OpenModal, setOpenModal] = useState(false);
  const [isLocationFiltered, setIsLocationFiltered] = useState(true);
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [scholarships, setScholarships] = useState([]);
  const [sponsorScholarships, setSponsorScholarships] = useState([]);
  const [showToast, setShowToast] = useState({ show: false, message: '', status: '' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);



  const router = useNavigate();
  const [MainData, setMainData] = useState([])
  const [FilterData, setFilterData] = useState([])
  const [FilteredData, setFilteredData] = useState(null);
  const [SearchInput, setSearchInput] = useState("");
  const [userName, setUserName] = useState('');
  const [TotalPage, setTotalPage] = useState("");
  const [ByDate, setByDate] = useState(false);
  const [selectedScholarship, setSelectedScholarship] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [totalStudentsCount, setTotalStudentsCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  // Pagination settings to follow
  const [CurrentPage, setCurrentPage] = useState(1);
  console.log("currentpage", CurrentPage);
  const [PostPerPage, setPostPerPage] = useState(configuration.sizePerPage);
  const [selectedRequestId, setSelectedRequestId] = useState("");
  const [selectedStudentId, setSelectedStudentId] = useState(null);
  const [isOpening, setIsOpening] = useState(false);
  const [sponsorStudents, setSponsorStudents] = useState([]);

  //get current post
  //change page
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Pagination settings to follow end here

  const filterBy = (title) => {
    console.log("filter checking", title);

    if (title === "essay") {
      let filter = MainData.filter((item) =>
        item.essay_rating?.toLowerCase().includes(SearchInput.toLowerCase())
      );
      setFilteredData(filter);
      console.log("filter checking", filter);
    } else if (title === "class") {
      let filter = MainData.filter((item) =>
        item.class_level?.toLowerCase().includes(SearchInput.toLowerCase())
      );
      setFilteredData(filter);
      console.log("filter checking", filter);

    } else if (title === "amount") {
      let filter = MainData.filter((item) =>
        item.amount_needed?.toLowerCase().includes(SearchInput.toLowerCase())
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

      setFilteredData(filter);
      setSearchInput("s")
      console.log(" Date filter checking", filter);

    }
  };



  const fetchSponsorStudents = async () => {

    try {
      const response = await getAllSponsorStudentsApi(CurrentPage, PostPerPage);
      console.log("Sponsor Students Response:", response);
      setMainData(response.data?.students)
      setSponsorStudents(response.data?.students || []); // Adjust based on response structure
      setFilteredData(response.data?.students || []); // Adjust based on response structure
      setTotalPage(response.data.totalPages)
      setTotalStudentsCount(response.data.totalCount);
      const totalPosts = response.data.totalPages * PostPerPage;
      setTotalPage(totalPosts);
    } catch (error) {
      console.error("Error loading sponsor students:", error.message);
      setSponsorStudents([]);
    } finally {
      setLoading(false);
    }
  };


  const getallStudent = async () => {
    console.log("CurrentPage:", CurrentPage, "PostPerPage:", PostPerPage);

    try {
      const result = await GetAllSponsorStudentApi(CurrentPage, PostPerPage)

      console.log("getallSponsorStudent", result)


      if (result.status === 200) {
        setMainData(result.data.data.students)
        setFilteredData(result.data.data.students)
        setTotalPage(result.data.data.totalPages)
        setTotalStudentsCount(result.data.data.totalCount);
        const totalPosts = result.data.data.totalPages * PostPerPage;
        setTotalPage(totalPosts);
      }
    } catch (e) {

      console.log("error", e.message)
    }

  }



  useEffect(() => {

    const storedName = JSON.parse(localStorage.getItem('onlineUser'));
    if (storedName) {
      setUserName(`${storedName.firstName}`);
    }

  }, []);


  // Listen for student selection from TableRow



  const handleOpenModal = (requestId) => {
    setSelectedRequestId(requestId);   // ✅ Store requestId
    setIsOpening(true);                // ✅ Open modal
  };

  const handleCloseModal = () => {
    setIsOpening(false);
    setSelectedStudentId(null);
  };

  const handleSubmit = async () => {
    if (!selectedScholarship) {
      setShowToast({
        show: true,
        message: "Select a Scholarship.",
        status: "error"
      });
      setTimeout(() => setShowToast({ show: false }), 3000);
      return;
    }

    if (!selectedRequestId) {
      setShowToast({
        show: true,
        message: "No student selected.",
        status: "error"
      });
      setTimeout(() => setShowToast({ show: false }), 3000);
      return;

    }



    try {
      setIsSubmitting(true);

      const selectedScholarshipData = sponsorScholarships.find(
        (sch) => sch.id === selectedScholarship
      );

      console.log("🎓 Selected Scholarship Data:", selectedScholarshipData);


      if (!selectedScholarshipData) {
        throw new Error("Selected scholarship not found.");
      }

      const existingStudentIds = selectedScholarshipData.students
        .map(s => s.id) // Assuming 'id' is the student ID
        .filter(Boolean);

      const updatedStudentIds = [...new Set([...existingStudentIds, selectedRequestId])];

      console.log("🧾 Submitting to API with:", {
        scholarshipId: selectedScholarship,
        studentIds: updatedStudentIds,
        requestId: selectedRequestId
      });

      const response = await AddStudentToScholarshipApi(selectedScholarship, updatedStudentIds, selectedRequestId);
      console.log("✅ Add Student Response:", response);

      if (response.status) {
        setShowToast({
          show: true,
          message: "Student successfully added!",
          status: "success",
        });
        setTimeout(() => setShowToast({ show: false }), 3000);


        setSponsorScholarships(prev =>
          prev.map(sch =>
            sch.id === selectedScholarship
              ? { ...sch, students: [...sch.students, { request_id: selectedRequestId, full_name: "New Student" }] }
              : sch
          )
        );


        handleCloseModal();
      }
    } catch (error) {
      console.error("❌ Submit error:", error);
      setShowToast({
        show: true,
        message: error.message || "Failed to add Student.",
        status: "error",
      });
      setTimeout(() => setShowToast({ show: false }), 3000);
    } finally {
      setIsSubmitting(false);
      setIsLoading(false);
    }
  };










  const fetchScholarshipsBySponsor = async () => {
    try {
      const data = await getScholarshipsBySponsor();

      if (data.status && Array.isArray(data.data)) {
        setSponsorScholarships(data.data); // ✅ Set directly since `data` is an array
      } else {
        console.error("Unexpected response format:", data);
        setError(data.message || "Failed to load scholarships");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const handleStudentSelected = (request) => {
      console.log("Received studentId:", request);
      setSelectedRequestId(request.request_id);
      setIsOpening(true);
    };

    eventBus.on("studentSelected", handleStudentSelected);

    return () => {
      eventBus.removeListener("studentSelected", handleStudentSelected);
    };
  }, []);



  useEffect(() => {

    getallStudent()
    fetchSponsorStudents();
    fetchScholarshipsBySponsor();


  }, [CurrentPage]);



  return (
    <MainLayout>
      {
        isLoading && <Preloader />
      }
      {showToast.show && (
        <ShowToast message={showToast.message} status={showToast.status} show={showToast.show} />
      )}
      <Text fontSize={"21px"} lineHeight={"25.41px"} fontWeight="700">All Students <Box as="span" color="#667085" fontSize="18px" fontWeight="400">({MainData.length})</Box></Text>
      <Text mt="9px" color={"#686C75"} fontWeight={"400"} fontSize={"15px"} mb={5} gap={"9px"} lineHeight={"24px"}>Explore a diverse pool of students and their academic aspirations. Review profiles, understand funding needs, and choose who to support on their educational journey.</Text>

      <Box bg="#fff" border="1px solid #EDEFF2" mt="12px" pt='20px' pb="32px" px={["10px", "10px", "18px", "18px"]} rounded='10px'>
        <Box bg="#fff" border="1px solid #EFEFEF" mt="12px" py='17px' px="18px" rounded='10px'>
          <Flex justifyContent="space-between" flexWrap="wrap">
            <Box bg="#FFF9E6" p="3" border="1px solid #FFA30C80" borderRadius="md" mb="5">
              <HStack alignItems="center" justifyContent="space-between" flexWrap={["wrap", "nowrap"]} gap="10px">
                <Icon as={RxInfoCircled} color="orange.500" mr="2" />
                <Text fontSize="sm" color="gray.700">
                  The students displayed are filtered by your location. You can decide to show all students by turning off the location filter.
                </Text>
                <Switch
                  size="sm"
                  colorScheme="green"
                  isChecked={isLocationFiltered}
                  onChange={() => setIsLocationFiltered(!isLocationFiltered)}
                  _focus={{ boxShadow: "none" }}
                  _focusVisible={{ boxShadow: "none" }}
                />

              </HStack>
            </Box>
            <HStack alignItems="center" justifyContent="space-between" flexWrap="wrap" w="100%">
              <HStack>
                <Text color="#1F2937" fontWeight="600" fontSize="19x">Students</Text>
                <Text color="#667085" fontWeight="400" fontSize="18px">({MainData.length})</Text>
              </HStack>

              <Flex flexWrap="wrap" mt={["10px", "10px", "0px", "0px"]} alignItems="center" justifyContent={"space-between"} >
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
                            onClick={() => filterBy("class")}
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
                              <Text>by class</Text>
                            </HStack>
                          </MenuItem>
                          <MenuItem
                            onClick={() => filterBy("essay")}
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
                              <Text>by Essay Score</Text>
                            </HStack>
                          </MenuItem>
                          <MenuItem
                            onClick={() => filterBy("amount")}
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
                              <Text>by amount awarded</Text>
                            </HStack>
                          </MenuItem>

                          <MenuItem
                            onClick={() => {
                              setFilteredData(null);
                              setSearchInput("");
                              setByDate(false)
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
                    <Th fontSize="13px" textTransform="capitalize" color='#2F2F2F' fontWeight="600">Class level</Th>
                    <Th fontSize="13px" textTransform="capitalize" color='#2F2F2F' fontWeight="600">Essay score</Th>
                    <Th fontSize="13px" textTransform="capitalize" color='#2F2F2F' fontWeight="600">Request Purpose</Th>
                    <Th fontSize="13px" textTransform="capitalize" color='#2F2F2F' fontWeight="600">Amount</Th>
                    <Th fontSize="13px" textTransform="capitalize" color='#2F2F2F' fontWeight="600">actions</Th>

                  </Tr>
                </Thead>
                <Tbody>


                  {!sponsorStudents || sponsorStudents.length === 0 ? (
                    <Text textAlign={"center"} mt="32px" color="black">
                      *--No students found--*
                    </Text>
                  ) : (
                    sponsorStudents
                      .filter((student) =>
                        SearchInput === "" ? true : student.student_full_name?.toLowerCase().includes(SearchInput.toLowerCase())
                      )
                      .map((item, i) => (
                        <TableRow
                          key={i}
                          type="sponsor-admin-discoverstudents"
                          name={item.student_full_name}
                          classLevel={item.class_level}
                          essayScore={item.essay_score === null ? "0%" : item.essay_score}
                          request={item.fund_request_reason}
                          amount={`₦${item.total_amount_requested?.toLocaleString()}`}
                          studentIds={item.id}
                          requestId={item.request_id}
                          onOpen={handleOpenModal}
                          onEdit={() => setOpenModal(true)}
                        />
                      ))
                  )}


                </Tbody>

              </Table>
            </TableContainer>

            <Modal isOpen={isOpening} onClose={handleCloseModal}>
              <ModalOverlay />
              <ModalContent maxW="537px">
                {showToast.show && (
                  <ShowToast message={showToast.message} status={showToast.status} show={showToast.show} />
                )}
                <ModalHeader>
                  <Text fontWeight="700" color="#1F2937" >Add Student to Scholarship</Text>
                  <Text fontSize="14px" fontWeight="400" color="#6B7280" >Select a scholarship to add the student to</Text>
                </ModalHeader>
                <ModalCloseButton />
                <ModalBody borderWidth="1px">
                  {sponsorScholarships.length > 0 ? (
                    sponsorScholarships.map((scholarship, index) => (
                      <Stack
                        key={scholarship.id || index}
                        borderWidth="1px"
                        rounded="11px"
                        py="12px"
                        pl="8px"
                        pr="16px"
                        spacing="10px"
                        mb="21px"
                        w="100%"
                      >
                        <HStack justifyContent="space-between">
                          <Box w="100%" >
                            <Stack >
                              <HStack w="100%" justifyContent="space-between" gap="10px">
                                <HStack>
                                  <Text color="#1F2937" fontSize="13px" fontWeight="600">
                                    {scholarship.name || "Unnamed Scholarship"}
                                  </Text>
                                  <Text fontSize="12px" fontWeight="500" color="#344054">
                                    ({scholarship.amount})
                                  </Text>
                                </HStack>
                                <Radio
                                  value={scholarship.id}
                                  isChecked={selectedScholarship === scholarship.id}
                                  onChange={() => {
                                    console.log("📌 Selected Scholarship:", scholarship.id);
                                    setSelectedScholarship(scholarship.id);
                                  }}

                                  sx={{
                                    "& .chakra-radio__control": {
                                      borderColor: "green.500", // Default border color
                                    },
                                    "& .chakra-radio__control[data-checked]": {
                                      bg: "green.500", // Background when selected
                                      borderColor: "green.500", // Keep border color consistent
                                      position: "relative",
                                    },
                                    "& .chakra-radio__control[data-checked]::after": {
                                      content: '"✔"', // Checkmark symbol
                                      position: "absolute",
                                      top: "50%",
                                      left: "50%",
                                      transform: "translate(-50%, -50%)",
                                      color: "white",
                                      fontSize: "14px",
                                      fontWeight: "bold",
                                    },
                                  }}
                                />


                              </HStack>
                            </Stack>
                          </Box>
                        </HStack>

                        <HStack>
                          {scholarship.students.length > 0 ? (
                            scholarship.students.slice(0, 2).map((student, idx) => (
                              <HStack key={idx} bg="#E8F2ED" p="8px" rounded="31px">
                                <Avatar size="sm" name={student.full_name} />
                                <Text color="#101828" fontSize="13px" fontWeight="500">
                                  {student.full_name}
                                </Text>
                              </HStack>
                            ))
                          ) : null}
                        </HStack>
                      </Stack>
                    ))
                  ) : (
                    <Text fontSize="14px" fontWeight="500" color="#767F8E">
                      No scholarships available.
                    </Text>
                  )}
                </ModalBody>

                <ModalFooter gap="10px">
                  <Button w="80px" background="white" color="green" border="1px solid green" mr={3} onClick={handleCloseModal}>
                    Cancel
                  </Button>
                  <Button
                    w="173px"
                    isLoading={isSubmitting}
                    onClick={handleSubmit}
                  >
                    Confirm
                  </Button>
                </ModalFooter>
              </ModalContent>
            </Modal>


          </Box>
        </Box>

        <Pagination
          totalPosts={TotalPage}
          postsPerPage={PostPerPage}
          currentPage={CurrentPage}
          paginate={paginate}
        />

      </Box>
      <ProfileUpdateNotification isOpen={OpenModal} onClose={() => setOpenModal(false)} />
    </MainLayout>
  )
}
