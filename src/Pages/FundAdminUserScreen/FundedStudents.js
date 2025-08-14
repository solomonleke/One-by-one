import { useState, useEffect } from "react";
import {
  Box, Flex, Text, Table, Thead, Tbody, Tr, Th, TableContainer
} from "@chakra-ui/react";
import MainLayout from "../../DashboardLayout";
import InputX from "../../Components/InputX";
import { configuration } from "../../Utils/Helpers";
import { GetAllRequestFundsApi } from "../../Utils/ApiCall";
import TableRow from "../../Components/TableRow";
import Preloader from "../../Components/Preloader";
import ShowToast from "../../Components/ToastNotification";

export default function FundedStudents() {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage] = useState(configuration.sizePerPage);
  const [totalPosts, setTotalPosts] = useState(0);
  const [fundRequests, setFundRequests] = useState([]);
  const [loading, setLoading] = useState(true); // <-- one loading state
  const [error, setError] = useState("");
  const [showToast, setShowToast] = useState({
    show: false,
    message: "",
    status: ""
  });

  const fetchFundRequests = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await GetAllRequestFundsApi(currentPage, postPerPage, true);
      const data = response.data?.data || {};
      setFundRequests(data.requests || []);
      setTotalPosts((data.totalPages || 0) * postPerPage);
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFundRequests();
  }, [currentPage, postPerPage]);


  return (
    <MainLayout>
          {
            loading && <Preloader  />
          }
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
          Funded Students{" "}
          <span style={{ color: "#667085", fontWeight: "400" }}>
            ({fundRequests.length})
          </span>
        </Text>

        <Text mb={4} fontSize="14px">
          Explore a diverse pool of students and their academic aspirations...
        </Text>

        <Flex justify="space-between" align="center">
          <InputX label="Search Students" maxW="600px" value={search} onChange={e => setSearch(e.target.value)} />
        </Flex>

        <TableContainer border="1px solid #EDEFF2" borderRadius="7px" mt="15px">
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Student Name</Th>
                <Th>School Name</Th>
                <Th>Class Level</Th>
                <Th>Sponsor</Th>
                <Th>Tuition Fee</Th>
                <Th>Tuition Status</Th>
                <Th>Stationary Fee</Th>
              </Tr>
            </Thead>
            <Tbody>
              {fundRequests
                .filter(student =>
                  student.student_name.toLowerCase().includes(search.toLowerCase())
                )
                .map((student, index) => (
                  <TableRow
                    key={index}
                    type="funded-students"
                    name={student.student_name}
                    school={student.school_name}
                    classLevel={student.student_class_level}
                    guardian={student.guardian_name}
                    tuition={student.fees_amount}
                    status={student.fees_status}
                    stationary={student.stationery_fund}
                  />
                ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
    </MainLayout>
  );
}
