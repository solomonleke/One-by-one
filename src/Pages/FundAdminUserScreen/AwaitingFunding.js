import React from "react";
import { useState, useEffect } from 'react'

import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  IconButton,
  Text,
  Avatar,
  Flex,
  Button,
  useBreakpointValue,
} from "@chakra-ui/react";
import { CiCircleInfo } from "react-icons/ci";
import { GoArrowLeft, GoArrowRight } from "react-icons/go";
import MainLayout from "../../DashboardLayout";
import { IoMdOpen } from "react-icons/io";
import TableRow from "../../Components/TableRow"
import InputX from "../../Components/InputX"
import { BiSearch } from "react-icons/bi"; 
import Pagination from "../../Components/Pagination";
import { configuration } from "../../Utils/Helpers";
import { GetAllStudentApi } from "../../Utils/ApiCall";


const students = [
  { name: "Philip Amakiri", school: "Legendary Scholars Academy", guardian: "Peter Durojaiye", schoolBank: "Zenith", BankAcc: "12345678", guardianBank: "Access", GuardianBankAcc: "12345678", tuition: "₦200,000.00" },
  { name: "David Folarin", school: "Queen's College", guardian: "Lydia Werinipre", schoolBank: "Access", BankAcc: "12345678", guardianBank: "Zenith", GuardianBankAcc: "12345678", tuition: "₦500,000.00" },
  { name: "Timothy Salisu", school: "Federal Government College", guardian: "Grace Izuokumo", schoolBank: "Fidelity", BankAcc: "12345678", guardianBank: "First", GuardianBankAcc: "12345678", tuition: "₦690,000.00" },
  { name: "Peter Usman", school: "Mayflower School", guardian: "Timothy Inengite", schoolBank: "First", BankAcc: "12345678", guardianBank: "Polaris", GuardianBankAcc: "12345678", tuition: "₦130,000.00" },
  { name: "Esther Wakili", school: "Chrisland College", guardian: "Stephen Agbasi", schoolBank: "Polaris", BankAcc: "12345678", guardianBank: "Fidelity", GuardianBankAcc: "12345678", tuition: "₦100,000.00" },
];





// Pagination settings to follow end here

export default function FundingTable() {
 
  // Pagination settings to follow
const [CurrentPage, setCurrentPage] = useState(1);
console.log("currentpage", CurrentPage);
const [PostPerPage, setPostPerPage] = useState(configuration.sizePerPage);
const [TotalPage, setTotalPage] = useState("");

//get current post
//change page
const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
};

// Pagination settings to follow end here

const getallStudent = async () => {

  try {
      const result = await GetAllStudentApi(CurrentPage, PostPerPage)

      console.log("getallStudent", result)

      if (result.status === 200) {
          students(result.data.data.students)
          setTotalPage(result.data.data.totalPages)
      }
  } catch (e) {

      console.log("error", e.message)
  }

}


useEffect(() => {

  getallStudent()

}, [CurrentPage]);

  return (
    <MainLayout>
      <Box p={6}>
      <Text fontSize="21px" fontWeight="bold" color="#101828">
  Awaiting Funding <span style={{ color: "#667085", fontWeight:"400" }}>(32)</span>
</Text>
        <Text mb={4}>Explore a diverse pool of students and their academic aspirations.</Text>

        <Flex justify="space-between" align="center">
          <InputX label="Search Students" maxW="600px" />
          <Flex justify="space-between" align="center" gap={4} marginLeft={4}>
            <Button display="flex" variant="outline" w="48px" h="48px" borderRadius="full">
              <GoArrowLeft />
            </Button>
            <Button display="flex" variant="outline" w="48px" h="48px" borderRadius="full">
              <GoArrowRight />
            </Button>
          </Flex>
        </Flex>


        <TableContainer border="1px solid #EDEFF2" borderRadius="7px" mt="15px">
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Student Name</Th>
                <Th>School Name</Th>
                <Th>Guardian Name</Th>
                <Th>
                  <Flex align="center">
                    <Text mr={1}>School Bank Details</Text>
                    <Box as={CiCircleInfo} size="16px" />
                  </Flex>
                </Th>
                <Th>
                  <Flex align="center">
                    <Text mr={1}>Guardian Bank</Text>
                    <Box as={CiCircleInfo} size="16px" />
                  </Flex>
                </Th>

                <Th>Tuition Fee</Th>
              </Tr>
            </Thead>
            <Tbody>
              { students.map((student, index) => (
                <TableRow
                 key={index}
                 type="awaiting-funding"
                 student={student}
                 name={student.name}
                 school={student.school}
                 guardian={student.guardian}
                 schoolBank={student.schoolBank}
                 BankAcc={student.BankAcc}
                 guardianBank={student.guardianBank}
                 GuardianBankAcc={student.schoolBank}
                 tuition={student.tuition}
                  />
                  
                
              ))}
            </Tbody>
          </Table>
        </TableContainer>

        {/* Pagination Controls */}
        <Flex mt="15px" justify="space-between" align="center" border="1px solid #EDEFF2" borderRadius="7px" padding="12px 24px">
          {/* Previous Button */}
          <Button
            leftIcon={<GoArrowLeft />}
            variant="outline"
            borderRadius="8px"
          >
            {useBreakpointValue({ base: "", md: "Previous" })}
          </Button>

          {/* Pagination Numbers */}
          <Pagination
                        currentPage={CurrentPage}
                        totalPosts={TotalPage}
                        paginate={paginate}
                    />

          {/* Next Button */}
          <Button
            rightIcon={<GoArrowRight />}
            variant="outline"
            borderRadius="8px"
          >
            {useBreakpointValue({ base: "", md: "Next" })}
          </Button>
        </Flex>
      </Box>
    </MainLayout>
  );
};


