import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import MainLayout from '../../DashboardLayout'
import { Text, Flex, HStack, Box, useDisclosure } from '@chakra-ui/react'
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
import { GetAllStudentApi, GetStudentStatsApi, UpdateStudentProfile, DeleteStudentProfile } from "../../Utils/ApiCall";
import moment from "moment";
import { useParams } from 'react-router-dom';

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

export default function StudentManagement() {

  const [All, setAll] = useState(true)
  const [Approved, setApproved] = useState(false)
  const [Pending, setPending] = useState(false)
  const [Rejected, setRejected] = useState(false)


  const [OpenModal, setOpenModal] = useState(false)
  const { isOpen, onOpen, onClose } = useDisclosure()


  const router = useNavigate();


  const [MainData, setMainData] = useState([])
  const [FilterData, setFilterData] = useState([])
  const [totalStudentsCount, setTotalStudentsCount] = useState(0);



  // Pagination settings to follow
  const [CurrentPage, setCurrentPage] = useState(1);
  console.log("currentpage", CurrentPage);
  const [PostPerPage, setPostPerPage] = useState(configuration.sizePerPage);
  const [TotalPage, setTotalPage] = useState("");
  const [isLoading, setIsLoading] = useState(true);

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
    setEditedData({ ...editedData, [e.target.name]: e.target.value });
    console.log("Updated field:", e.target.name, " Value:", e.target.value);
  };

  const [originalData, setOriginalData] = useState(null);

  // When opening the modal (e.g. in a useEffect or a handler)
  const handleOpenEditModal = (student) => {
    setEditedData(student);
    setOriginalData(student);
    setStudentId(student.id); // 👈 store the ID here
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




  // const handleSave = () => {
  //   setStudentData(editedData);
  //   localStorage.setItem("studentData", JSON.stringify(editedData));
  //   onCloseEdit();
  // };

  const handleSave = async () => {
    try {
      const updatedFields = {};

      for (const key in editedData) {
        if (
          editedData[key] !== originalData[key] &&
          editedData[key] !== "" &&
          editedData[key] !== null
        ) {
          updatedFields[key] = editedData[key];
        }
      }

      console.log("Updated Fields:", updatedFields);

      if (Object.keys(updatedFields).length === 0) {
        setShowToast({
          show: true,
          title: "No changes",
          message: "You haven't made any changes.",
          status: "info",
        });
        setTimeout(() => setShowToast({ show: false }), 3000);
        return;
      }

      const res = await UpdateStudentProfile(studentId, updatedFields);


      if (res.status === true) {
        setShowToast({
          show: true,
          message: res.message || "Student updated successfully",
          status: "success",
        });
        setTimeout(() => setShowToast({ show: false }), 3000);
      }

      setEditedData(res.student);
      setOriginalData(res.student);

      await getallStudent(); // ✅ REFRESH list
      onCloseEdit();         // ✅ Close modal afterwards

    } catch (error) {
      console.error("Error during save:", error);
      if (error.status === true) {
        setShowToast({
          title: "Update Failed",
          description: error.message || "Something went wrong",
          status: "error",
        });
        setTimeout(() => setShowToast({ show: false }), 3000);
      }
    }
  };


  const deleteStudentProfileBtn = async (student_Id) => {
    console.log("student_Id", student_Id);

    try {
      const response = await DeleteStudentProfile(student_Id);
      console.log("response", response);
      console.log("Deleting student with ID:", student_Id);


      if (response.status === true) {
        setShowToast({
          show: true,
          message: response.message,
          status: "success",
        })
        setTimeout(() => setShowToast({ show: false }), 3000);
        await getallStudent();
      }

    } catch (err) {
      setError(err.message || 'Failed to delete student profile');
    }
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

  const getallStudent = async () => {
    try {
      const result = await GetAllStudentApi(CurrentPage, PostPerPage);
      console.log("getallStudent", result);
  
      if (result.status === 200) {
        setMainData(result.data.data.students);
        setFilterData(result.data.data.students);
        setFilteredData(result.data.data.students)
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
  

  const fetchStudentStats = async () => {
    try {
      const response = await GetStudentStatsApi();

      if (response?.status === 200) {
        console.log("Admin Stats Retrieved Successfully");
        console.log("Total Students:", response.stats.totalStudents);

        return response.stats;
      } else {
        throw new Error(response?.message || "Failed to retrieve student stats");
      }
    } catch (error) {
      console.error("Error fetching student stats:", error.message);
    } finally {
      setIsLoading(false)
    }
  };



  useEffect(() => {

    const loadStats = async () => {
      const data = await fetchStudentStats();
      console.log("Data: load stats", data);
      if (data) {
        setStats(data); // Update state with fetched stats
      }
    };

    loadStats();

    getallStudent()
    deleteStudentProfileBtn()


  }, [CurrentPage]);

  const handleStudentClick = (student_Id) => {
    router(`/school-admin/student-management/student-profile/${student_Id}`);
  };

  if (isLoading) {
    return (<Preloader message="fetching students..." />)
  }

  return (
    <MainLayout>
      {showToast.show && (
        <ShowToast message={showToast.message} status={showToast.status} show={showToast.show} duration={showToast.duration} />
      )}
      <HStack>
        <Text color="#1F2937" fontWeight="600" fontSize="19px">Students</Text>
        <Text color="#667085" fontWeight="400" fontSize="18px">({stats.totalStudents})</Text>
      </HStack>
      <Text color="#686C75" mt="9px" fontWeight="400" fontSize="15px">View and manage all student profiles in one place. Quickly access approval statuses, track eligibility, and update details as needed.</Text>

      <Box bg="#fff" border="1px solid solidrgb(253, 207, 207)" mt="12px" py='17px' px={["18px", "18px"]} rounded='10px'>
        <Flex justifyContent="space-between" flexWrap="wrap">
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
                  <Th fontSize="13px" textTransform="capitalize" color='#2F2F2F' fontWeight="600">created at</Th>
                  <Th fontSize="13px" textTransform="capitalize" color='#2F2F2F' fontWeight="600">actions</Th>

                </Tr>
              </Thead>
              <Tbody>


                {(SearchInput === "" && (!FilterData || FilterData.length === 0)) ||
                  (SearchInput !== "" && (!FilteredData || FilteredData.length === 0)) ? (
                  <Text textAlign="center" mt="32px" color="black">
                    *--No record found--*
                  </Text>
                ) : SearchInput === "" ? (
                  FilterData?.map((item, i) => (
                    <TableRow
                      key={i}
                      type="school-admin"
                      name={item.full_name}
                      email={item.email}
                      department={item.department}
                      classLevel={item.class_level}
                      fieldOfStudy={item.intended_field_of_study}
                      status={item.verification_status}
                      date={moment(item.created_at).format("lll")}
                      onClick={() => handleStudentClick(item.id)}
                      onDelete={() => openRemoveModal(item.id)}
                      onEdit={() => handleOpenEditModal(item)}
                    />
                  ))
                ) : (
                  FilteredData?.map((item, i) => (
                    <TableRow
                      key={i}
                      type="school-admin"
                      name={item.full_name}
                      email={item.email}
                      department={item.department}
                      classLevel={item.class_level}
                      fieldOfStudy={item.intended_field_of_study}
                      status={item.verification_status}
                      date={moment(item.created_at).format("lll")}
                      onClick={() => handleStudentClick(item.id)}
                      onDelete={() => openRemoveModal(item.id)}
                      onEdit={() => handleOpenEditModal(item)}
                    />
                  ))
                )}


              </Tbody>

            </Table>
          </TableContainer>

          <Modal isOpen={isEditModalOpen} onClose={onCloseEdit} scrollBehavior="inside">
  <ModalOverlay />
  {showToast.show && (
    <ShowToast
      message={showToast.message}
      status={showToast.status}
      show={showToast.show}
      duration={showToast.duration}
    />
  )}
  <ModalContent maxW="80%" height="80vh">
    <ModalHeader>Edit Student Details</ModalHeader>
    <ModalCloseButton />
    <ModalBody>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
        <FormControl>
          <FormLabel>Full Name</FormLabel>
          <Input name="full_name" value={editedData.full_name || ""} onChange={handleChange} />
        </FormControl>

        <FormControl>
          <FormLabel>Email</FormLabel>
          <Input name="email" value={editedData.email || ""} onChange={handleChange} />
        </FormControl>

        <FormControl>
          <FormLabel>Date of Birth</FormLabel>
          <Input name="dob" value={editedData.dob || ""} onChange={handleChange} />
        </FormControl>

        <FormControl>
          <FormLabel>Gender</FormLabel>
          <Input name="gender" value={editedData.gender || ""} onChange={handleChange} />
        </FormControl>

        <FormControl>
          <FormLabel>Phone Number</FormLabel>
          <Input name="phone_number" value={editedData.phone_number || ""} onChange={handleChange} />
        </FormControl>

        <FormControl>
          <FormLabel>Guardian Phone Number</FormLabel>
          <Input name="guardian_phone_number" value={editedData.guardian_phone_number || ""} onChange={handleChange} />
        </FormControl>

        <FormControl>
          <FormLabel>Address</FormLabel>
          <Input name="address" value={editedData.address || ""} onChange={handleChange} />
        </FormControl>

        <FormControl>
          <FormLabel>City</FormLabel>
          <Input name="city" value={editedData.city || ""} onChange={handleChange} />
        </FormControl>

        <FormControl>
          <FormLabel>State</FormLabel>
          <Input name="state" value={editedData.state || ""} onChange={handleChange} />
        </FormControl>

        <FormControl>
          <FormLabel>Department</FormLabel>
          <Input name="department" value={editedData.department || ""} onChange={handleChange} />
        </FormControl>

        <FormControl>
          <FormLabel>Class Level</FormLabel>
          <Input name="class_level" value={editedData.class_level || ""} onChange={handleChange} />
        </FormControl>

        <FormControl>
          <FormLabel>Intended Field of Study</FormLabel>
          <Input name="intended_field_of_study" value={editedData.intended_field_of_study || ""} onChange={handleChange} />
        </FormControl>

        <FormControl>
          <FormLabel>Class Performance</FormLabel>
          <Input name="class_performance" value={editedData.class_performance || ""} onChange={handleChange} />
        </FormControl>

        <FormControl>
          <FormLabel>Subjects</FormLabel>
          <Input name="subjects" value={editedData.subjects || ""} onChange={handleChange} />
        </FormControl>

        <FormControl>
          <FormLabel>Student Interest</FormLabel>
          <Input name="student_interest" value={editedData.student_interest || ""} onChange={handleChange} />
        </FormControl>

        <FormControl>
          <FormLabel>Scholarship Need</FormLabel>
          <Input name="scholarship_need" value={editedData.scholarship_need || ""} onChange={handleChange} />
        </FormControl>

        <FormControl>
          <FormLabel>Higher Education Goals</FormLabel>
          <Input name="higher_education_goals" value={editedData.higher_education_goals || ""} onChange={handleChange} />
        </FormControl>

        <FormControl>
          <FormLabel>Career Goals</FormLabel>
          <Input name="career_goals" value={editedData.career_goals || ""} onChange={handleChange} />
        </FormControl>
      </SimpleGrid>
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
        _focus={{ boxShadow: 'none' }}
  background="#39996B"
  color="white"
  border="1px solid #39996B"
  onClick={handleSave}
  _hover={{
    background: "transparent",
    color: "#39996B",
    border: "1px solid #39996B",
  }}
>
  Save
</Button>


        <Button
        variant="outline"
        _focus={{ boxShadow: 'none' }}
          color="#39996B"
  background="transparent"
  border="1px solid #39996B"
          onClick={onCloseEdit}
          _hover={{
    background: "#39996B",
    color: "white",
    border: "1px solid #39996B",
  }}          
        >
          Cancel
        </Button>
      </Flex>
    </ModalFooter>
  </ModalContent>
</Modal>



<Pagination
  // totalPosts={TotalPage}
  totalPosts={stats.totalStudents}
  postsPerPage={PostPerPage}
  currentPage={CurrentPage}
  paginate={paginate}
/>

        </Box>
      </Box>
      <RemoveNotification isOpen={isOpenModal} onClose={() => closeRemoveModal()} onClick={() => {
        deleteStudentProfileBtn(selectedStudentId);
        closeRemoveModal();
      }} />
      {/* <ProfileUpdateNotification isOpen={OpenModal} onClose={() => setOpenModal(false)} /> */}
    </MainLayout>
  )
}
