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
  useDisclosure,
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
import { GetAllRequestFundsApi, initiateFundingApi  } from "../../Utils/ApiCall";
import PaymentModal from "../../Components/PaymentModal";
import Preloader from "../../Components/Preloader"
import ShowToast from "../../Components/ToastNotification"


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
const [currentPage, setCurrentPage] = useState(1);
console.log("currentpage", currentPage);
const [postPerPage, setPostPerPage] = useState(configuration.sizePerPage);
const [TotalPage, setTotalPage] = useState("");
const [FundRequests, setFundRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [pageNo, setPageNo] = useState(1);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showToast, setShowToast] = useState({
    show: false,
    message: "",
    status: ""
  })


const handleInitiateFunding = async (id) => {
  try {
    const response = await initiateFundingApi(id, "stationery");
    console.log("🎉 Funding successful:", response);
    // maybe show toast or update UI
  } catch (error) {
    console.error("💥 Funding failed:", error.message);
    // show error message
  }
};

//get current post
//change page
const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
};

// Pagination settings to follow end here

const fetchFundRequests = async () => {
  setLoading(true);
  setError('');
  try {
    const response = await GetAllRequestFundsApi(pageNo, currentPage, postPerPage, false); // false = unfunded only
    console.log("response", response);
    setFundRequests(response.data?.data.requests || []); // adjust depending on API response structure
    setTotalPage(response.data.data.totalPages || []); // adjust depending on API response structure
    const totalPosts = response.data.totalPages * postPerPage;
      setTotalPage(totalPosts);
  } catch (err) {
    setError(err.message || 'Something went wrong');
  } finally {
    setLoading(false);
  }
};

const OpenFundModal = (item)=>{
  setSelectedStudent(item);
  onOpen();
}


useEffect(() => {

  fetchFundRequests()

}, [pageNo]);



  return (
    <MainLayout>
          {
            isLoading && <Preloader  />
          }
    {showToast.show && (
        <ShowToast message={showToast.message} status={showToast.status} show={showToast.show} duration={showToast.duration} />
      )}
      <Box p={6}>
      <Text fontSize="21px" fontWeight="bold" color="#101828">
  Awaiting Funding <span style={{ color: "#667085", fontWeight:"400" }}>({FundRequests.length})</span>
</Text>
        <Text mb={4}>Explore a diverse pool of students and their academic aspirations.</Text>

        <Flex justify="space-between" align="center">
          <InputX label="Search Students" maxW="600px" />
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
                <Th>Take Action</Th>
              </Tr>
            </Thead>
            <Tbody>
  {FundRequests.map((student, index) => {
    const parsedSchoolAccount =
      student.school_account_number &&
      typeof student.school_account_number === "string"
        ? JSON.parse(student.school_account_number)
        : null;

    const parsedGuardianAccount =
      student.guardian_account_number &&
      typeof student.guardian_account_number === "string"
        ? JSON.parse(student.guardian_account_number)
        : null;

    return (
      <TableRow
        key={index}
        type="awaiting-funding"
        name={student.student_name}
        school={student.school_name}
        guardian={student.guardian_name}
        onClick={()=>OpenFundModal(student)}
        schoolBank={
          parsedSchoolAccount
            ? `${parsedSchoolAccount.bank} - ${parsedSchoolAccount.account_name} `
            : "No details"
        }
        BankAcc={parsedSchoolAccount?.account_number || "N/A"}
        guardianBank={
          parsedGuardianAccount
            ? `${parsedGuardianAccount.bank} - ${parsedGuardianAccount.account_name} `
            : "No details"
        }
        GuardianBankAcc={parsedGuardianAccount?.account_number || "N/A"}
        tuition={student.fees_amount}
      />
    );
  })}
</Tbody>


          </Table>
        </TableContainer>

        {/* Pagination Controls */}
        <Flex mt="15px" justify="space-between" align="center" border="1px solid #EDEFF2" borderRadius="7px" padding="12px 24px">
          {/* Previous Button */}
          

          {/* Pagination Numbers */}
          
                    <Pagination
          totalPosts={TotalPage}
          postsPerPage={postPerPage}
          currentPage={currentPage}
          paginate={paginate}
        />

          {/* Next Button */}
         
        </Flex>
      </Box>
      {selectedStudent && (
  <PaymentModal
    isOpen={isOpen}
    onClose={onClose}
    student={selectedStudent}
    onSubmit={() => handleInitiateFunding(selectedStudent.id)} // <-- pass function here
  />
)}

    </MainLayout>
  );
};
