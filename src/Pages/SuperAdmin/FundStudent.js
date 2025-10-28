import React, { useState, useEffect } from "react";
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  TableContainer,
  Text,
  Flex,
  useDisclosure,
} from "@chakra-ui/react";
import { CiCircleInfo } from "react-icons/ci";
import MainLayout from "../../DashboardLayout";
import TableRow from "../../Components/TableRow";
import InputX from "../../Components/InputX";
import Pagination from "../../Components/Pagination";
import { configuration } from "../../Utils/Helpers";
import { GetAllRequestFundsApi, initiateFundingApi } from "../../Utils/ApiCall";
import PaymentModal from "../../Components/PaymentModal";
import Preloader from "../../Components/Preloader";
import ShowToast from "../../Components/ToastNotification";

export default function FundStudent() {
  // State definitions
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage, setPostPerPage] = useState(configuration.sizePerPage);
  const [TotalPage, setTotalPage] = useState(1);
  const [FundRequests, setFundRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fundingLoading, setFundingLoading] = useState(false); // New loading state for funding
  const [error, setError] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showToast, setShowToast] = useState({
    show: false,
    message: "",
    status: "",
  });

  const handleInitiateFunding = async (id) => {
    console.log("▶ handleInitiateFunding called with ID:", id);
    setFundingLoading(true); // Set loading to true
    try {
      const response = await initiateFundingApi(id, "stationery");
      console.log("✅ Funding successful:", response);
      setShowToast({
        show: true,
        message: "Student funding initiated successfully.",
        status: "success",
      });
      onClose(); // Close modal on success
      fetchFundRequests(); // Refresh the list
    } catch (error) {
      console.error("❌ Funding failed:", error.message);
      setShowToast({
        show: true,
        title: "Funding Failed",
        message: error.message,
        status: "error",
      });
    } finally {
      setFundingLoading(false); // Set loading to false
      setTimeout(() => setShowToast({ show: false }), 3000);
    }
  };

  const paginate = (pageNumber) => {
    console.log("🔁 Changing page to:", pageNumber);
    setCurrentPage(pageNumber);
  };

  const fetchFundRequests = async () => {
    console.log("📡 Fetching fund requests...");
    setLoading(true);
    setError("");
    try {
      console.log(
        `➡ Calling API with currentPage=${currentPage}, postPerPage=${postPerPage}, funded=false`
      );
      const response = await GetAllRequestFundsApi(currentPage, postPerPage, false);

      console.log("✅ API raw response:", response);

      const data = response.data?.data || {};
      console.log("📦 Parsed data:", data);

      if (!data.requests || !Array.isArray(data.requests)) {
        console.warn("⚠️ 'requests' not found or not an array in API response");
      }

      setFundRequests(data.requests || []);
      setTotalPage(data.totalPages || 1);

      console.log(`📊 Requests loaded: ${data.requests?.length || 0}`);
    } catch (err) {
      console.error("🚨 Error fetching fund requests:", err);
      setError(err.message || "Something went wrong");
    } finally {
      console.log("🧹 Finished fetchFundRequests()");
      setLoading(false);
    }
  };

  const OpenFundModal = (item) => {
    console.log("🧾 Opening modal for:", item);
    setSelectedStudent(item);
    onOpen();
  };

  useEffect(() => {
    console.log("🔄 useEffect triggered, currentPage:", currentPage);
    fetchFundRequests();
  }, [currentPage, postPerPage]);

  console.log("🧠 Render start: loading=", loading, "FundRequests=", FundRequests);

  return (
    <MainLayout>
      {loading && <Preloader />}
      {showToast.show && (
        <ShowToast
          message={showToast.message}
          status={showToast.status}
          show={showToast.show}
          duration={showToast.duration}
        />
      )}
      <Box p={6}>
        <Text fontSize="21px" fontWeight="bold" color="#101828">
          Awaiting Funding{" "}
          <span style={{ color: "#667085", fontWeight: "400" }}>
            ({FundRequests.length})
          </span>
        </Text>
        <Text mb={4}>
          Explore a diverse pool of students and their academic aspirations.
        </Text>

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
                console.log(`🧍 Rendering student row ${index + 1}:`, student);

                let parsedSchoolAccount = null;
                let parsedGuardianAccount = null;

                try {
                  if (typeof student.school_account_number === "string") {
                    parsedSchoolAccount = JSON.parse(student.school_account_number);
                  }
                  if (typeof student.guardian_account_number === "string") {
                    parsedGuardianAccount = JSON.parse(student.guardian_account_number);
                  }
                } catch (e) {
                  console.error("⚠️ JSON parse error for account numbers:", e);
                }

                return (
                  <TableRow
                    key={index}
                    type="awaiting-funding"
                    name={student.student_name}
                    school={student.school_name}
                    guardian={student.guardian_name}
                    onClick={() => OpenFundModal(student)}
                    schoolBank={
                      parsedSchoolAccount
                        ? `${parsedSchoolAccount.bank} - ${parsedSchoolAccount.account_name}`
                        : "No details"
                    }
                    BankAcc={parsedSchoolAccount?.account_number || "N/A"}
                    guardianBank={
                      parsedGuardianAccount
                        ? `${parsedGuardianAccount.bank} - ${parsedGuardianAccount.account_name}`
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

        <Flex
          mt="15px"
          justify="space-between"
          align="center"
          border="1px solid #EDEFF2"
          borderRadius="7px"
          padding="12px 24px"
        >
          <Pagination
            totalPosts={TotalPage}
            postsPerPage={postPerPage}
            currentPage={currentPage}
            paginate={paginate}
          />
        </Flex>
      </Box>

      {selectedStudent && (
        <PaymentModal
          isOpen={isOpen}
          onClose={onClose}
          student={selectedStudent}
          onSubmit={() => handleInitiateFunding(selectedStudent.id)}
          isLoading={fundingLoading} // Pass the new loading state
        />
      )}
    </MainLayout>
  );
}
