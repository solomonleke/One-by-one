import { useState, useEffect } from "react";
import {
    Box,
    Text,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableContainer,
} from "@chakra-ui/react";
import MainLayout from "../../DashboardLayout";
import TableRow from "../../Components/TableRow";
import { configuration } from "../../Utils/Helpers";
import { GetSponsorHistory } from "../../Utils/ApiCall";
import Pagination from "../../Components/Pagination";
import Preloader from "../../Components/Preloader";
import ShowToast from "../../Components/ToastNotification";

export default function FundedHistory() {
    const [history, setHistory] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");
    const [CurrentPage, setCurrentPage] = useState(1);
    const [PostPerPage, setPostPerPage] = useState(configuration.sizePerPage);
    const [TotalPage, setTotalPage] = useState(1);
    const [showToast, setShowToast] = useState({
        show: false,
        message: "",
        status: "",
    });

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const fetchFundingHistory = async () => {
        setError("");
        try {
            const response = await GetSponsorHistory(CurrentPage, PostPerPage);
            console.log("API funding history response:", response);

            // ✅ Go one level deeper into response.data.data
            const apiData = response?.data?.data;

            if (apiData?.transactions) {
                setHistory(apiData.transactions);
                setTotalPage(apiData.totalPages || 1);
            } else {
                setError("No transactions found.");
            }
        } catch (err) {
            console.error(err);
            setError(err.message || "Error fetching data");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchFundingHistory();
    }, [CurrentPage, PostPerPage]);

    return (
        <MainLayout>
            {isLoading && <Preloader />}
            {showToast.show && (
                <ShowToast
                    message={showToast.message}
                    status={showToast.status}
                    show={showToast.show}
                    duration={showToast.duration}
                />
            )}
            <Box p={6}>
                <Text fontSize="21px" fontWeight="bold">
                    Funding History
                </Text>
                <Text mb={4} fontSize="14px">
                    Keep track of your financial contributions with detailed records.
                    Review past transactions, monitor disbursements, and ensure your
                    impact is well-documented.
                </Text>

                <TableContainer border="1px solid #EDEFF2" borderRadius="7px" mt="15px">
                    <Table variant="simple">
                        <Thead>
                            <Tr>
                                <Th fontSize="13px">Date</Th>
                                <Th fontSize="13px">Funded Students</Th>
                                <Th fontSize="13px">Amount</Th>
                                <Th fontSize="13px">Payment Method</Th>
                                <Th fontSize="13px">Status</Th>
                                <Th fontSize="13px">Transaction ID</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {history.length === 0 ? (
                                <Tr>
                                    <Td colSpan={6} textAlign="center" py={6}>
                                        <Text fontSize="14px" color="#767F8E" fontWeight="500">
                                            No transactions made yet.
                                        </Text>
                                    </Td>
                                </Tr>
                            ) : (
                                history.map((transaction, index) => (
                                    <TableRow
                                        key={transaction.id || index}
                                        type="sponsor-admin-history"
                                        date={transaction.trx_date}
                                        fundedStudents={
                                            transaction.scholarship?.students?.length > 0
                                                ? transaction.scholarship.students.map((s) => s.full_name).join(", ")
                                                : "—"
                                        }

                                        amount={transaction.amount}
                                        paymentMethod={transaction.payment_method || "—"}
                                        status={transaction.status || transaction.type}
                                        transactionId={transaction.reference || transaction.id}
                                    />
                                ))
                            )}
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
}
