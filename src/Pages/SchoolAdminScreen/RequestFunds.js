import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import MainLayout from '../../DashboardLayout'
import { Text, Flex, HStack, Box, useDisclosure, VStack, Icon, Image, FormErrorMessage } from '@chakra-ui/react'
import TableRow from "../../Components/TableRow"
import Button from "../../Components/Button"
import Input from "../../Components/Input"
import RemoveNotification from "../../Components/RemoveNotification"
import ProfileUpdateNotification from "../../Components/ProfileUpdateNotification"
import ShowToast from "../../Components/ToastNotification"
import Preloader from "../../Components/Preloader"
import { CgSearch } from "react-icons/cg";
import { FaCalendarAlt } from "react-icons/fa";
import { IoFilter } from "react-icons/io5";
import { HiOutlineDocumentArrowUp } from "react-icons/hi2";
import { BiSearch } from "react-icons/bi";
import Pagination from "../../Components/Pagination";
import { configuration } from "../../Utils/Helpers";
import { GetAllStudentApi, GetStudentStatsApi, requestFundApi, getAllSponsorStudentsApi, getAllFundRequestsApi } from "../../Utils/ApiCall";
import moment from "moment";
import { useParams } from 'react-router-dom';
import { FiUploadCloud } from "react-icons/fi";

import ReactSelect from 'react-select'; // ✅ CLEAR

import {
  Stack,
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
  Select,
  ModalOverlay,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  SimpleGrid,
  FormControl,
  FormLabel,
} from '@chakra-ui/react'

export default function RequestFunds() {

  const [All, setAll] = useState(true)
  const [Approved, setApproved] = useState(false)
  const [Pending, setPending] = useState(false)
  const [Rejected, setRejected] = useState(false)



  const [OpenModal, setOpenModal] = useState(false)
  const { isOpen, onOpen, onClose } = useDisclosure()


  const router = useNavigate();

  const [status, setStatus] = useState("PENDING"); // State to manage the status filter
  const [MainData, setMainData] = useState([])
  const [FilterData, setFilterData] = useState([])
  const [totalStudentsCount, setTotalStudentsCount] = useState(0);



  // Pagination settings to follow
  const [CurrentPage, setCurrentPage] = useState(1);
  console.log("currentpage", CurrentPage);
  const [PostPerPage, setPostPerPage] = useState(1000);
  const [TotalPage, setTotalPage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [students, setStudents] = useState([]);
  // const [formData, setFormData] = useState({
  //   student: "",
  //   scholarship: "",
  //   studentClass: "",
  //   term: "",
  //   amount: "",
  //   result: null, // ✅ store image file here
  // });

  const FIELD_ORDER = ["student", "scholarship", "studentClass", "term", "amount", "result"];

  const FIELD_ERRORS = {
    student: "Please select a student",
    scholarship: "Please select a scholarship type",
    studentClass: "Please select a class",
    term: "Please select a term",
    amount: "Please enter a valid amount",
    result: "Please upload a document",
  };

  const INITIAL_FORM = {
    student: "",
    scholarship: "",
    studentClass: "",
    term: "",
    amount: "",
    result: null,
  };

  const [formData, setFormData] = useState(INITIAL_FORM);
  const [touched, setTouched] = useState({});



  //get current post
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
  const [error, setError] = useState('');
  const { student_Id } = useParams(); // Get student ID from URL params
  const [studentId, setStudentId] = useState(null);
  const [editedData, setEditedData] = useState({});
  const { isOpen: isEditModalOpen, onOpen: onOpenEdit, onClose: onCloseEdit } = useDisclosure();
  const { isOpen: isRemoveModalOpen, onOpen: onOpenRemove, onClose: onCloseRemove } = useDisclosure();
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [selectedStudentId, setSelectedStudentId] = useState(null);
  const [fundRequests, setFundRequests] = useState([]);




  const [showToast, setShowToast] = useState({
    show: false,
    message: "",
    status: ""
  })
  const [stats, setStats] = useState({
    totalStudents: 0,

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };



  // When opening the modal (e.g. in a useEffect or a handler)
  const handleOpenEditModal = () => {

    onOpenEdit();
  };


  const openRemoveModal = (id) => {
    setSelectedStudentId(id);
    setIsOpenModal(true);
  };

  const closeRemoveModal = () => {
    setSelectedStudentId(null);
    setIsOpenModal(false);
  };










  const [loading, setLoading] = useState(false);







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
    } else if (title === "field") {
      let filter = MainData.filter(
        (item) =>
          item.intended_field_of_study?.toLowerCase().includes(SearchInput.toLowerCase())

      );
      setFilteredData(filter);
      console.log("filter checking", filter);
    } else if (title === "status") {
      let filter = MainData.filter(
        (item) =>
          item.verification_status?.toLowerCase().includes(SearchInput.toLowerCase())

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
    } else if (title === "class") {
      let filter = MainData.filter((item) =>
        item.class_level?.toLowerCase().includes(SearchInput.toLowerCase())
      );
      setFilteredData(filter);
      console.log("filter checking", filter);
    }
  };

  // Search Filter settings to follow end here

  const getallStudent = async (status) => {

    try {
      const result = await GetAllStudentApi(CurrentPage, PostPerPage, status);
      console.log("📦 Raw API Response:", result);


      if (result.status === 200) {
        const studentList = result.data.data.students;

        setMainData(studentList);
        setStudents(studentList);
        setFilterData(studentList);
        setFilteredData(studentList);
        setTotalStudentsCount(result.data.data.totalCount);

        const totalPosts = result.data.data.totalPages * PostPerPage;
        setTotalPage(totalPosts);
      }

      console.log("students", result.data.data.students);
    } catch (e) {
      console.log("error", e.message);
    } finally {
      setIsLoading(false);
    }
  };

  const validateField = (name, value) => {
    if (name === "amount") {
      return value !== "" && Number(value) > 0 ? "" : FIELD_ERRORS.amount;
    }
    return value ? "" : FIELD_ERRORS[name];
  };

  const errors = FIELD_ORDER.reduce((acc, name) => {
    acc[name] = validateField(name, formData[name]);
    return acc;
  }, {});

  const isFormValid = FIELD_ORDER.every((name) => !errors[name]);

  // Show the error only once the field has been touched
  const showError = (name) => touched[name] && errors[name];

  // Marks the given field as touched
  const touchField = (name) =>
    setTouched((prev) => ({ ...prev, [name]: true }));

  // When the user focuses field N, every field BEFORE it counts as touched.
  // This is what makes "skip field 2, go to 3" show the error under field 2.
  const touchFieldsBefore = (name) => {
    const index = FIELD_ORDER.indexOf(name);
    setTouched((prev) => {
      const next = { ...prev };
      FIELD_ORDER.slice(0, index).forEach((f) => {
        next[f] = true;
      });
      return next;
    });
  };

  const closeFundModal = () => {
    setFormData(INITIAL_FORM);
    setTouched({});
    onCloseEdit();
  };

  const handleSave = async () => {
    if (!isFormValid) {
      setTouched(FIELD_ORDER.reduce((acc, f) => ({ ...acc, [f]: true }), {}));
      return;
    }
    

    const payload = {
      studentId: formData.student,
      type: formData.scholarship,
      amount: formData.amount,
      studentClass: formData.studentClass,
      term: formData.term,
      result: formData.result,
    };

    try {
      setLoading(true);
      await requestFundApi(payload);

      setShowToast({
        show: true,
        message: "Fund request submitted successfully.",
        status: "success",
        duration: 3000,
      });
      setTimeout(() => {
        setShowToast((prev) => ({ ...prev, show: false }));
      }, 3000);

      closeFundModal(); // 👈 closes and resets form + touched
      fetchFundRequests(); // 👈 optional: refresh the table with the new request
    } catch (error) {
      setShowToast({
        show: true,
        message: error.message || "Something went wrong.",
        status: "error",
        duration: 3000,
      });
      setTimeout(() => {
        setShowToast((prev) => ({ ...prev, show: false }));
      }, 3000);
    } finally {
      setLoading(false);
    }
  };



  const options = students.filter(s => s.verification_status === "APPROVED")
    .map(s => ({ label: s.full_name, value: s.id }));

  console.log("options", students);

  const selectedStudent = options.find(o => o.value === formData.student);

  const [totalRequests, setTotalRequests] = useState(0);


  const fetchFundRequests = async () => {
    // const PostPerPage=10
    try {
      const data = await getAllFundRequestsApi(CurrentPage, PostPerPage);

      setFundRequests(data);
      setTotalRequests(data.length)
      console.log("Fund requests data:", data);
      console.log("All fund requests:", data.requests);
    } catch (error) {
      console.error("Error fetching fund requests:", error.message);
    }
  };






  useEffect(() => {
    fetchFundRequests();
    getallStudent("APPROVED")

  }, [CurrentPage]);



  return (
    <MainLayout>
      {
        isLoading && <Preloader />
      }
      {showToast.show && (
        <ShowToast message={showToast.message} status={showToast.status} show={showToast.show} duration={showToast.duration} />
      )}
      <HStack>
        <Text color="#1F2937" fontWeight="600" fontSize="19px">Requests</Text>
        <Text color="#667085" fontWeight="400" fontSize="18px">({totalRequests})</Text>
      </HStack>
      <Text color="#686C75" mt="9px" fontWeight="400" fontSize="15px">View and manage all fund requests in one place.</Text>

      <Box bg="#fff" border="1px solid solidrgb(253, 207, 207)" mt="12px" py='17px' px={["18px", "18px"]} rounded='10px'>
        {/* <Flex justifyContent="space-between" flexWrap="wrap">
          <Flex alignItems="center" flexWrap='wrap' bg="#E8FFF4" rounded='7px' py="3.5px" px="5px" cursor="pointer" mt={["10px", "10px", "0px", "0px"]}>

            <Box borderRight="1px solid #EDEFF2" pr="5px" onClick={filterAll}>
              <Text py='8.5px' px="12px" bg={All ? "#fff" : "transparent"} rounded="7px" color={"#1F2937"} fontWeight={"500"} fontSize={"13px"}>All  <Box color="#667085" as='span' fontWeight="400" fontSize="13px">({stats.totalStudents})</Box></Text>
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
                      <Text>by Class</Text>
                    </HStack>
                  </MenuItem>

                  <MenuItem
                    onClick={() => filterBy("field")}
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
                      <Text>by Field</Text>
                    </HStack>
                  </MenuItem>

                  <MenuItem
                    onClick={() => filterBy("status")}
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
                      <Text>by Status</Text>
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
        </Flex> */}

        <Flex
          justifyContent="space-between"
          flexWrap="wrap"
          mt={["10px", "10px", "10px", "10px"]}
          w={["100%", "100%", "50%", "37%"]}
        >
          <Button w="159px" size="sm"
            onClick={() => handleOpenEditModal()}
          >Request Funds</Button>
        </Flex>

        <Box bg="#fff" border="1px solid #EFEFEF" mt="12px" py='15px' px="15px" rounded='10px' overflowX="auto">

          <TableContainer>
            <Table variant='simple'>

              <Thead bg="#F9FAFB">
                <Tr >
                  <Th fontSize="13px" textTransform="capitalize" color='#2F2F2F' fontWeight="600">name</Th>
                  <Th fontSize="13px" textTransform="capitalize" color='#2F2F2F' fontWeight="600">Type</Th>
                  <Th fontSize="13px" textTransform="capitalize" color='#2F2F2F' fontWeight="600">Amount</Th>
                  <Th fontSize="13px" textTransform="capitalize" color='#2F2F2F' fontWeight="600">Stationay</Th>
                  <Th fontSize="13px" textTransform="capitalize" color='#2F2F2F' fontWeight="600">Total Amount</Th>
                  <Th fontSize="13px" textTransform="capitalize" color='#2F2F2F' fontWeight="600">created at</Th>
                  <Th fontSize="13px" textTransform="capitalize" color='#2F2F2F' fontWeight="600">Action</Th>

                </Tr>
              </Thead>
              <Tbody>


                {fundRequests?.map((item, i) => (
                  <TableRow
                    key={i}
                    type="fund-request"
                    student={item.student.full_name}
                    name={item.name}
                    amount={`₦${item.amount?.toLocaleString()}`}
                    stationary={`₦${item.stationery_fund?.toLocaleString()}`}
                    total={`₦${item.total_amount?.toLocaleString()}`}
                    date={moment(item.created_at).format("lll")}
                    requestType={item.type}
                  />
                ))}



              </Tbody>

            </Table>
          </TableContainer>

          <Modal isOpen={isEditModalOpen} onClose={closeFundModal} scrollBehavior="inside">
            <ModalOverlay />
            <ModalContent maxW={{ base: "90%", md: "600px" }} borderRadius="2xl" py={2}>
              {showToast.show && (
                <ShowToast
                  message={showToast.message}
                  status={showToast.status}
                  show={showToast.show}
                  duration={showToast.duration}
                />
              )}

              <ModalHeader fontWeight="bold" fontSize="xl">
                Request Funds
              </ModalHeader>
              <ModalCloseButton />

              <ModalBody>
                <Stack spacing={4}>
                  {/* Student */}
                  <FormControl isRequired isInvalid={!!showError("student")}>
                    <FormLabel>Student</FormLabel>
                    <ReactSelect
                      name="student"
                      placeholder="Select a student"
                      options={options}
                      value={selectedStudent || null}
                      menuPortalTarget={document.body}
                      menuPosition="fixed"
                      onFocus={() => touchFieldsBefore("student")}
                      onBlur={() => touchField("student")}
                      styles={{
                        menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                        control: (base) => ({
                          ...base,
                          borderColor: showError("student") ? "#E53E3E" : base.borderColor,
                          boxShadow: showError("student") ? "0 0 0 1px #E53E3E" : base.boxShadow,
                          "&:hover": {
                            borderColor: showError("student") ? "#E53E3E" : base.borderColor,
                          },
                        }),
                      }}
                      onChange={(selectedOption) => {
                        handleChange({
                          target: { name: "student", value: selectedOption?.value || "" },
                        });
                        touchField("student");
                      }}
                    />
                    <FormErrorMessage>{errors.student}</FormErrorMessage>
                  </FormControl>

                  {/* Scholarship Type */}
                  <FormControl isRequired isInvalid={!!showError("scholarship")}>
                    <FormLabel>Scholarship Type</FormLabel>
                    <Select
                      name="scholarship"
                      placeholder="Select type"
                      onChange={handleChange}
                      onFocus={() => touchFieldsBefore("scholarship")}
                      onBlur={() => touchField("scholarship")}
                      value={formData.scholarship}
                    >
                      <option value="SCHOOL FEES">School Fees</option>
                      <option value="EXAMINATION FEES">Examination Fees</option>
                    </Select>
                    <FormErrorMessage>{errors.scholarship}</FormErrorMessage>
                  </FormControl>

                  {/* Class and Term */}
                  <Stack direction={{ base: "column", md: "row" }} spacing={4} w="100%" align="flex-start">
                    <FormControl flex={1} isRequired isInvalid={!!showError("studentClass")}>
                      <FormLabel>Class</FormLabel>
                      <Select
                        name="studentClass"
                        placeholder="Select class"
                        onChange={handleChange}
                        onFocus={() => touchFieldsBefore("studentClass")}
                        onBlur={() => touchField("studentClass")}
                        value={formData.studentClass}
                      >
                        <option value="jss1">JSS 1</option>
                        <option value="jss2">JSS 2</option>
                        <option value="jss3">JSS 3</option>
                        <option value="ss1">SS 1</option>
                        <option value="ss2">SS 2</option>
                        <option value="ss3">SS 3</option>
                      </Select>
                      <FormErrorMessage>{errors.studentClass}</FormErrorMessage>
                    </FormControl>

                    <FormControl flex={1} isRequired isInvalid={!!showError("term")}>
                      <FormLabel>Term</FormLabel>
                      <Select
                        name="term"
                        placeholder="Select term"
                        onChange={handleChange}
                        onFocus={() => touchFieldsBefore("term")}
                        onBlur={() => touchField("term")}
                        value={formData.term}
                      >
                        <option value="first term">First Term</option>
                        <option value="second term">Second Term</option>
                        <option value="third term">Third Term</option>
                      </Select>
                      <FormErrorMessage>{errors.term}</FormErrorMessage>
                    </FormControl>
                  </Stack>

                  {/* Amount */}
                  <FormControl isRequired isInvalid={!!showError("amount")}>
                    <FormLabel>Amount</FormLabel>
                    <Input
                      name="amount"
                      type="number"
                      onChange={handleChange}
                      onFocus={() => touchFieldsBefore("amount")}
                      onBlur={() => touchField("amount")}
                      value={formData.amount}
                      placeholder="Enter amount"
                    />
                    <FormErrorMessage>{errors.amount}</FormErrorMessage>
                  </FormControl>

                  {/* Upload */}
                  <FormControl isRequired isInvalid={!!showError("result")}>
                    <FormLabel fontWeight="600">Upload Document (Term Result or Invoice)</FormLabel>
                    <Box
                      border="2px dashed"
                      borderColor={showError("result") ? "red.500" : "#39996B"}
                      borderRadius="10px"
                      p="4"
                      textAlign="center"
                      cursor="pointer"
                      bg="gray.50"
                      _hover={{ bg: "gray.100" }}
                      onClick={() => {
                        touchFieldsBefore("result");
                        document.getElementById("fileInput").click();
                      }}
                    >
                      {formData.result ? (
                        <Text color="green.600" fontWeight="600">
                          📄 {formData.result.name}
                        </Text>
                      ) : (
                        <Text color="gray.500">Click to upload image, PDF, or Word file</Text>
                      )}
                    </Box>

                    <Input
                      id="fileInput"
                      type="file"
                      display="none"
                      accept=".jpg,.jpeg,.png,.pdf,.doc,.docx"
                      onChange={(e) => {
                        const file = e.target.files[0] || null;
                        setFormData((prev) => ({ ...prev, result: file }));
                        touchField("result");
                      }}
                    />
                    <FormErrorMessage>{errors.result}</FormErrorMessage>
                  </FormControl>
                </Stack>
              </ModalBody>

              <ModalFooter>
                <Flex
                  direction={{ base: "column", md: "row" }}
                  w="100%"
                  gap={4}
                  justify="flex-end"
                  align="center"
                >
                  <Button
                    variant="outline"
                    color="#39996B"
                    background="transparent"
                    border="1px solid #39996B"
                    _focus={{ boxShadow: "none" }}
                    _hover={{ background: "#39996B", color: "white" }}
                    onClick={closeFundModal}
                  >
                    Cancel
                  </Button>
                  <Button
                    background="#39996B"
                    color="white"
                    border="1px solid #39996B"
                    _focus={{ boxShadow: "none" }}
                    _hover={{
                      background: "transparent",
                      color: "#111e18ff",
                      border: "1px solid #39996B",
                    }}
                    _disabled={{ opacity: 0.5, cursor: "not-allowed" }}
                    isDisabled={!isFormValid || loading}
                    isLoading={loading}
                    onClick={handleSave}
                  >
                    Request Fund
                  </Button>
                </Flex>
              </ModalFooter>
            </ModalContent>
          </Modal>

          <Pagination
            totalPosts={TotalPage}
            postsPerPage={PostPerPage}
            currentPage={CurrentPage}
            paginate={paginate}
          />

        </Box>
      </Box>

    </MainLayout>
  )
}
