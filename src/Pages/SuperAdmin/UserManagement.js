import { useState } from "react";
import {
  Box,
  Flex,
  Menu,
  MenuButton,
  HStack,
  Text,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  Stack,
  Avatar,
  useBreakpointValue,
  TableContainer,
  Icon,
} from "@chakra-ui/react";
import { FiHome, FiSettings, FiFileText, FiUsers, FiMenu } from "react-icons/fi";
import MainLayout from "../../DashboardLayout";
import { GoArrowLeft, GoArrowRight, GoDotFill } from "react-icons/go";
import InputX from "../../Components/InputX"
import Pagination from "../../Components/Pagination";
import TableRow from "../../Components/TableRow"
import { IoIosSearch } from "react-icons/io";
import { IoFilter } from "react-icons/io5";



export default function UserManagement() {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [selectedTab, setSelectedTab] = useState("school"); // Tabs: 'school', 'scholarship', 'sponsor', 'fund'


  const students = [
    {
      name: "Ruth Wakil",
      email: "philipamakiri@gmail.com",
      school: "Legendary Scholars Academy",
      city: "Okota",
      state: "Lagos",
      status: "Disabled",
      dateJoined: "11/27/2024 21:19",
    },
    {
      name: "Andrew Maudubuchi",
      email: "davidfolarin@gmail.com",
      school: "Queen’s College",
      city: "Abeokuta",
      state: "Ogun",
      status: "Active",
      dateJoined: "12/02/2024 12:14",
    },
    {
      name: "Joseph Diongoli",
      email: "timothysalisu@gmail.com",
      school: "Federal Government College",
      city: "Batsari",
      state: "Katsina",
      status: "Active",
      dateJoined: "12/02/2024 12:32",
    },
    {
      name: "David Nwankwo",
      email: "peterusman@gmail.com",
      school: "Mayflower School",
      city: "Oogobo",
      state: "Osun",
      status: "Active",
      dateJoined: "12/09/2024 00:37",
    },
    {
      name: "Martha Murtala",
      email: "estherwakili@gmail.com",
      school: "Chrisland College",
      city: "Eli-osa",
      state: "Lagos",
      status: "Active",
      dateJoined: "12/16/2024 14:48",
    },
    {
      name: "Stephen Fubara",
      email: "simonogan@gmail.com",
      school: "Christ The King College",
      city: "Ikeja",
      state: "Lagos",
      status: "Active",
      dateJoined: "12/17/2024 19:45",
    },
    {
      name: "Andrew Diongoli",
      email: "estherabubakar@gmail.com",
      school: "Corona Secondary School",
      city: "Portharcourt",
      state: "Rivers",
      status: "Active",
      dateJoined: "12/22/2024 07:25",
    },
    {
      name: "Hannah Alamina",
      email: "philipezekee@gmail.com",
      school: "Adesoye College",
      city: "Ikotun",
      state: "Lagos",
      status: "Active",
      dateJoined: "12/23/2024 16:51",
    },
  ];

  const scholarship = [

    {
      "name": "Andrew Maduabuchi",
      "email": "davidtosin@gmail.com",
      "approvedStudents": 15,
      "approvedSchools": 6,
      "city": "Okota",
      "state": "Lagos",
      "status": "Disabled",
      "dateJoined": "11/27/2024 21:19"
    },
    {
      "name": "Joseph Diongoli",
      "email": "timothysalli@gmail.com",
      "approvedStudents": 17,
      "approvedSchools": 4,
      "city": "Abedukuta",
      "state": "Ogun",
      "status": "Active",
      "dateJoined": "12/02/2024 12:14"
    },
    {
      "name": "Ruth Wakili",
      "email": "philipomakin@gmail.com",
      "approvedStudents": 4,
      "approvedSchools": 9,
      "city": "Batsari",
      "state": "Kastina",
      "status": "Active",
      "dateJoined": "12/02/2024 12:32"
    },
    {
      "name": "Martha Murtala",
      "email": "estherwakili@gmail.com",
      "approvedStudents": 6,
      "approvedSchools": 12,
      "city": "Osogbo",
      "state": "OSun",
      "status": "Active",
      "dateJoined": "12/09/2024 00:33"
    },
    {
      "name": "David Nwankwo",
      "email": "peterianian@gmail.com",
      "approvedStudents": 9,
      "approvedSchools": 23,
      "city": "Eti-osa",
      "state": "Lagos",
      "status": "Active",
      "dateJoined": "12/16/2024 16:48"
    },
    {
      "name": "Andrew Diongoli",
      "email": "estherabuzubaker@gmail.com",
      "approvedStudents": 13,
      "approvedSchools": 4,
      "city": "Ikeja",
      "state": "Lagos",
      "status": "Active",
      "dateJoined": "12/17/2024 19:45"
    },
    {
      "name": "Stephen Fubara",
      "email": "simonogan@gmail.com",
      "approvedStudents": 33,
      "approvedSchools": 12,
      "city": "Portharcourt",
      "state": "Rivers",
      "status": "Active",
      "dateJoined": "12/22/2024 07:29"
    },
    {
      "name": "Hannah Alamina",
      "email": "philipike@gmail.com",
      "approvedStudents": 6,
      "approvedSchools": 21,
      "city": "Ikotun",
      "state": "Lagos",
      "status": "Active",
      "dateJoined": "12/23/2024 16:51"
    }
  ]


  const sponsor = [
    {
      name: "Joseph Diongoli",
      email: "timothysalisu@gmail.com",
      scholarshipsCreated: 15,
      fundedScholarships: 4,
      studentsFunded: 6,
      city: "Okota",
      state: "Lagos",
      status: "Active",
      dateJoined: "11/27/2024 21:19",
    },
    {
      name: "Andrew Maudubuchi",
      email: "davidfolarin@gmail.com",
      scholarshipsCreated: 4,
      fundedScholarships: 6,
      studentsFunded: 13,
      city: "Abeokuta",
      state: "Ogun",
      status: "Active",
      dateJoined: "12/02/2024 12:14",
    },
    {
      name: "Ruth Wakil",
      email: "philipamakiri@gmail.com",
      scholarshipsCreated: 9,
      fundedScholarships: 9,
      studentsFunded: 8,
      city: "Batsari",
      state: "Katsina",
      status: "Active",
      dateJoined: "12/02/2024 12:32",
    },
    {
      name: "David Nwankwo",
      email: "peterusman@gmail.com",
      scholarshipsCreated: 17,
      fundedScholarships: 23,
      studentsFunded: 6,
      city: "Oogobo",
      state: "Osun",
      status: "Active",
      dateJoined: "12/09/2024 00:37",
    },
    {
      name: "Martha Murtala",
      email: "estherwakili@gmail.com",
      scholarshipsCreated: 13,
      fundedScholarships: 12,
      studentsFunded: 4,
      city: "Eli-osa",
      state: "Lagos",
      status: "Active",
      dateJoined: "12/16/2024 14:48",
    },
    {
      name: "Stephen Fubara",
      email: "simonogan@gmail.com",
      scholarshipsCreated: 6,
      fundedScholarships: 12,
      studentsFunded: 11,
      city: "Ikeja",
      state: "Lagos",
      status: "Active",
      dateJoined: "12/17/2024 19:45",
    },
    {
      name: "Hannah Alamina",
      email: "philipezekee@gmail.com",
      scholarshipsCreated: 6,
      fundedScholarships: 4,
      studentsFunded: 4,
      city: "Portharcourt",
      state: "Rivers",
      status: "Active",
      dateJoined: "12/22/2024 07:25",
    },
    {
      name: "Andrew Diongoli",
      email: "estherabubakar@gmail.com",
      scholarshipsCreated: 33,
      fundedScholarships: 21,
      studentsFunded: 7,
      city: "Ikotun",
      state: "Lagos",
      status: "Active",
      dateJoined: "12/23/2024 16:51",
    },
  ];

  const funded = [
    {
      "name": "Joseph Diongoli",
      "email": "timothysall@gmail.com",
      "fundedStudents": 15,
      "city": "Oketa",
      "state": "Lagos",
      "status": "Active",
      "dateJoined": "11/27/2024 21:19"
    },
    {
      "name": "Andrew Maduabuchi",
      "email": "davidfolarin@gmail.com",
      "fundedStudents": 4,
      "city": "Abedukuta",
      "state": "Ogun",
      "status": "Active",
      "dateJoined": "12/02/2024 12:14"
    },
    {
      "name": "Ruth Wakili",
      "email": "philipamakin@gmail.com",
      "fundedStudents": 9,
      "city": "Batsari",
      "state": "Kastina",
      "status": "Active",
      "dateJoined": "12/02/2024 12:32"
    },
    {
      "name": "David Nwankwo",
      "email": "peterianian@gmail.com",
      "fundedStudents": 17,
      "city": "Osogbo",
      "state": "OSun",
      "status": "Active",
      "dateJoined": "12/09/2024 00:37"
    },
    {
      "name": "Martha Murtala",
      "email": "estherwakili@gmail.com",
      "fundedStudents": 13,
      "city": "Eti-osa",
      "state": "Lagos",
      "status": "Active",
      "dateJoined": "12/16/2024 16:48"
    },
    {
      "name": "Stephen Fubara",
      "email": "simonogan@gmail.com",
      "fundedStudents": 6,
      "city": "Ikeja",
      "state": "Lagos",
      "status": "Active",
      "dateJoined": "12/17/2024 19:45"
    },
    {
      "name": "Hannah Alamina",
      "email": "philipozoskie@gmail.com",
      "fundedStudents": 6,
      "city": "Portharcourt",
      "state": "Rivers",
      "status": "Active",
      "dateJoined": "12/22/2024 07:25"
    },
    {
      "name": "Andrew Diongoli",
      "email": "estherabuzubaker@gmail.com",
      "fundedStudents": 33,
      "city": "Ikotun",
      "state": "Lagos",
      "status": "Active",
      "dateJoined": "12/23/2024 16:51"
    }
  ]

  const handleTabSwitch = (tab) => {
    setSelectedTab(tab);
    setCurrentPage(1);
    setSearch("");
  };

  const filteredByTab = students.filter((student) => student.role === selectedTab);
  const filteredStudents = filteredByTab.filter((student) =>
    student.name.toLowerCase().includes(search.toLowerCase())
  );


  const getPaginatedData = () => {
    const dataMap = {
      school: students,
      scholarship: scholarship,
      sponsor: sponsor,
      fund: funded,
    };

  
    // Step 1: Get the relevant data by tab
    const dataToFilter = dataMap[selectedTab] || [];
  
    // Step 2: Filter by search
    const filteredData = search.trim()
      ? dataToFilter.filter((item) =>
          Object.values(item).some((value) =>
            String(value).toLowerCase().includes(search.toLowerCase())
          )
        )
      : dataToFilter;
  
    // Step 3: Paginate
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const paginatedItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  
    return {
      paginatedItems,
      totalItems: filteredData.length,
    };
  };
  const { paginatedItems, totalItems } = getPaginatedData();

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };


  return (
    <MainLayout>
      <Box p={6}>
        <Text fontSize="21px" fontWeight="600" color="#101828" mb="28px">
          Users <span style={{ color: "#667085", fontWeight: "400" }}>(59)</span>
        </Text>

        <Box border="1px solid #E7E9EC" py="20px" px="31px" borderRadius="10px">
          <Flex justifyContent="space-between" alignItems="center" flexWrap="wrap" mb="20px">
            <Flex wrap="wrap" gap={2}>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => handleTabSwitch("school")}
                sx={{
    bg: selectedTab === "school" ? "greenn.greenn100" : "transparent",
    color: selectedTab === "school" ? "greenn.greenn500" : "#586375",
    fontWeight: selectedTab === "school" ? "bold" : "normal",
    _hover: {
      bg: "greenn.greenn100",
    },
    _focus: {
      outline: "none",
    },
    
  }}
              >
                School Admins
              </Button>
              <Button
  size="sm"
  variant="ghost"
  onClick={() => handleTabSwitch("scholarship")}
  sx={{
    bg: selectedTab === "scholarship" ? "greenn.greenn100" : "transparent",
    color: selectedTab === "scholarship" ? "greenn.greenn500" : "#586375",
    fontWeight: selectedTab === "scholarship" ? "bold" : "normal",
    _hover: {
      bg: "greenn.greenn100",
    },
    _focus: {
      outline: "none",
    },
    
  }}
>
  Scholarship
</Button>


              <Button
                size="sm"
                variant="ghost"
                onClick={() => handleTabSwitch("sponsor")}
                sx={{
    bg: selectedTab === "sponsor" ? "greenn.greenn100" : "transparent",
    color: selectedTab === "sponsor" ? "greenn.greenn500" : "#586375",
    fontWeight: selectedTab === "sponsor" ? "bold" : "normal",
    _hover: {
      bg: "greenn.greenn100",
    },
    _focus: {
      outline: "none",
    },
    
  }}
              >
                Sponsors
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => handleTabSwitch("fund")}
                sx={{
    bg: selectedTab === "fund" ? "greenn.greenn100" : "transparent",
    color: selectedTab === "fund" ? "greenn.greenn500" : "#586375",
    fontWeight: selectedTab === "fund" ? "bold" : "normal",
    _hover: {
      bg: "greenn.greenn100",
    },
    _focus: {
      outline: "none",
    },
    
  }}
              >
                Fund Admins
              </Button>
            </Flex>


            <Box display="flex" gap="11px" alignItems="center">
              <Box
                p="10px"
                w="41px"
                h="41px"
                bg="transparent"
                border="1px solid #E3E5E8"
                borderRadius="7px"
                display="inline-flex"
                alignItems="center"
                justifyContent="center"
              >
                <IoIosSearch fontSize="17px" />
              </Box>

              <Menu isLazy>
                <MenuButton as={Box}>
                  <HStack
                    border="1px solid #E3E5E8" w="96px" h="40px" rounded="7px" justify="center" align="center" p='6px' color='#2F2F2F' fontWeight="500" fontSize="14px"
                  >
                    <IoFilter />
                    <Text>Filter</Text>
                  </HStack>
                </MenuButton>
              </Menu>
            </Box>

          </Flex>


          <TableContainer border="1px solid #EDEFF2" borderRadius="7px" mt="15px">
            <Table variant="simple">
              {selectedTab === "school" && (
                <Thead>
                  <Tr>
                    <Th fontSize="14px" fontWeight="500" >Name</Th>
                    <Th fontSize="14px" fontWeight="500" >School Name</Th>
                    <Th fontSize="14px" fontWeight="500">City</Th>
                    <Th fontSize="14px" fontWeight="500">State</Th>
                    <Th fontSize="14px" fontWeight="500">Status</Th>
                    <Th fontSize="14px" fontWeight="500">Date Joined</Th>
                    <Th fontSize="14px" fontWeight="500">Actions</Th>

                  </Tr>
                </Thead>
              )}

              {selectedTab === "scholarship" && (
                <Thead>
                  <Tr>
                    <Th fontSize="14px" fontWeight="500" >Name</Th>
                    <Th fontSize="14px" fontWeight="500" >Approved Students</Th>
                    <Th fontSize="14px" fontWeight="500" >Approved Schools</Th>
                    <Th fontSize="14px" fontWeight="500">City</Th>
                    <Th fontSize="14px" fontWeight="500">State</Th>
                    <Th fontSize="14px" fontWeight="500">Status</Th>
                    <Th fontSize="14px" fontWeight="500">Date Joined</Th>
                    <Th fontSize="14px" fontWeight="500">Actions</Th>

                  </Tr>
                </Thead>
              )}

              {selectedTab === "sponsor" && (
                <Thead>
                  <Tr>
                    <Th fontSize="14px" fontWeight="500" >Name</Th>
                    <Th fontSize="14px" fontWeight="500" >scholarships Created</Th>
                    <Th fontSize="14px" fontWeight="500" >funded Scholarships</Th>
                    <Th fontSize="14px" fontWeight="500" >students Funded</Th>
                    <Th fontSize="14px" fontWeight="500">City</Th>
                    <Th fontSize="14px" fontWeight="500">State</Th>
                    <Th fontSize="14px" fontWeight="500">Status</Th>
                    <Th fontSize="14px" fontWeight="500">Date Joined</Th>
                    <Th fontSize="14px" fontWeight="500">Actions</Th>

                  </Tr>
                </Thead>
              )}

              {selectedTab === "fund" && (
                <Thead>
                  <Tr>
                    <Th fontSize="14px" fontWeight="500" >Name</Th>
                    <Th fontSize="14px" fontWeight="500" >funded Students</Th>
                    <Th fontSize="14px" fontWeight="500">City</Th>
                    <Th fontSize="14px" fontWeight="500">State</Th>
                    <Th fontSize="14px" fontWeight="500">Status</Th>
                    <Th fontSize="14px" fontWeight="500">Date Joined</Th>
                    <Th fontSize="14px" fontWeight="500">Actions</Th>

                  </Tr>
                </Thead>
              )}

              {selectedTab === "school" && (
                <Tbody>
                  {paginatedItems.map((item, index) => (
                    <TableRow
                      key={index}
                      type="super-admin-user-management"
                      name={item.name}
                      email={item.email}
                      schoolName={item.school}
                      city={item.city}
                      state={item.state}
                      status={item.status}
                      date={item.dateJoined}
                    />
                  ))}
                </Tbody>

              )}
              {selectedTab === "scholarship" && (
                <Tbody>
                  {paginatedItems.map((item, index) => (
                    <TableRow
                      key={index}
                      type="super-admin-scholarship"
                      name={item.name}
                      email={item.email}
                      approvedStudents={item.approvedStudents}
                      approvedSchools={item.approvedSchools}
                      city={item.city}
                      state={item.state}
                      status={item.status}
                      date={item.dateJoined}
                    />
                  ))}
                </Tbody>
              )}

              {selectedTab === "sponsor" && (
                <Tbody>
                  {paginatedItems.map((item, index) => (
                    <TableRow
                      key={index}
                      type="super-admin-sponsor"
                      name={item.name}
                      email={item.email}
                      scholarshipsCreated={item.scholarshipsCreated}
                      fundedScholarships={item.fundedScholarships}
                      studentsFunded={item.studentsFunded}
                      city={item.city}
                      state={item.state}
                      status={item.status}
                      date={item.dateJoined}
                    />
                  ))}
                </Tbody>
              )}

              {selectedTab === "fund" && (
                <Tbody>
                  {paginatedItems.map((item, index) => (
                    <TableRow
                      key={index}
                      type="super-admin-fund"
                      name={item.name}
                      email={item.email}
                      studentsFunded={item.fundedStudents}
                      city={item.city}
                      state={item.state}
                      status={item.status}
                      date={item.dateJoined}
                    />
                  ))}
                </Tbody>
              )}
            </Table>
          </TableContainer>
        </Box>


        <Pagination
  totalPosts={totalItems}
  postsPerPage={itemsPerPage}
  currentPage={currentPage}
  paginate={(page) => setCurrentPage(page)}
/>



          
      </Box>
    </MainLayout>
  );
};

