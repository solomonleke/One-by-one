import { useState, useEffect } from "react";
import {
  Box,
  Flex,
  Text,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Avatar,
  TableContainer,
} from "@chakra-ui/react";
import MainLayout from "../../DashboardLayout";
import TableRow from "../../Components/TableRow"
import { configuration } from "../../Utils/Helpers";
import { GetAllFundingHistoryApi } from "../../Utils/ApiCall"; // Adjust path as needed
import Pagination from "../../Components/Pagination";
import Preloader from "../../Components/Preloader"
import ShowToast from "../../Components/ToastNotification"



export default function FundedHistory(){
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pageNo, setPageNo] = useState(1);
  const [TotalPage, setTotalPage] = useState("");
  const noItems = 10;
  const [error, setError] = useState("");
  const [CurrentPage, setCurrentPage] = useState(1);
  const [PostPerPage, setPostPerPage] = useState(configuration.sizePerPage);
  const [isLoading, setIsLoading] = useState(true);
  const [showToast, setShowToast] = useState({
    show: false,
    message: "",
    status: ""
  })

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
};
  

  const students = [
    {
    fundedStudents: "Philip Amakiri",
      amount: "₦100,000.00",
      transactionId: "TX123456789",
      date: "01/16/2025 15:13",
      paymentMethod: "Bank Transfer",
      status: "Pending",
    },
    {
      fundedStudents: "solomon adeleke",
      amount: "₦50,000.00",
      transactionId: "TX987654321",
      date: "01/20/2025 07:17",
      paymentMethod: "Bank Transfer",
      status: "Completed",
    },
    {
      fundedStudents: "peter charles",
      amount: "₦50,000.00",
      transactionId: "TX456789123",
      date: "02/07/2025 10:14",
      paymentMethod: "Bank Transfer",
      status: "Completed",
    }
]

const fetchFundingHistory = async () => {
  setLoading(true);
  setError("");

  try {
    const response = await GetAllFundingHistoryApi(CurrentPage, PostPerPage);
    console.log("API funding history response:", response.data);
    setHistory(response.data.data.funds || []);
    setTotalPage(response.data.data.totalPages || []); // adjust depending on API response structure
    const totalPosts = response.data.totalPages * PostPerPage;
      setTotalPage(totalPosts);
  } catch (err) {
    setError(err.message || "Error fetching data");
  } finally {
    setLoading(false);
  }
};

useEffect(() => {
  fetchFundingHistory();
}, [CurrentPage, PostPerPage]);


    
  return (
      <MainLayout>
            {
              isLoading && <Preloader  />
            }
      {showToast.show && (
        <ShowToast message={showToast.message} status={showToast.status} show={showToast.show} duration={showToast.duration} />
      )}
      <Box p={6}>
        <Text fontSize="21px" fontWeight="bold">Funding History</Text>
        <Text mb={4} fontSize="14px">Keep track of your financial contributions with detailed records. Review past transactions, monitor disbursements, and ensure your impact is well-documented.</Text>
        <TableContainer border="1px solid #EDEFF2" borderRadius="7px" mt="15px">
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th fontSize="13px">Funded Students</Th>
                <Th fontSize="13px">Amount</Th>
                <Th fontSize="13px">Transaction ID</Th>
                <Th fontSize="13px">Date</Th>
                <Th fontSize="13px">Payment Method</Th>
                <Th fontSize="13px">Status</Th>
              </Tr>
            </Thead>
            <Tbody>
              {history.map((student, index) => (
                
                  <TableRow
                    key={index}
                    type="funded-history"
                    fundedStudents={student.student_name}
                    amount={student.funding_amount}
                    transactionId={student.trx_id}
                    date={student.funding_date}
                    paymentMethod={student.payment_method}
                    status={student.funding_status}
                  />

                
              ))}
            </Tbody>
          </Table>
        </TableContainer>

        <Pagination
          totalPosts={TotalPage}
          postsPerPage={PostPerPage}
          currentPage={CurrentPage}
          paginate={paginate}
        />
  
      </Box>
      </MainLayout>
    );
  };
  

