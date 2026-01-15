import { useState, useEffect } from "react";
import {
  Box,
  Flex,
  Menu,
  MenuButton,
  HStack,
  Text,
  Table,
  TableContainer,
  Thead,
  Tbody,
  Tr,
  Td,
  Th,
  Tabs,
  TabList,
  TabPanels,
  TabPanel,
  Tab,
  Spinner,
} from "@chakra-ui/react";
import { IoIosSearch } from "react-icons/io";
import { IoFilter } from "react-icons/io5";
import MainLayout from "../../DashboardLayout";
import TableRow from "../../Components/TableRow";
import Pagination from "../../Components/Pagination";
import ShowToast from "../../Components/ToastNotification";
import Preloader from "../../Components/Preloader";
import {
  GetAllSuperAdminTransactionsApi,
  ApproveTransactionApi,
} from "../../Utils/ApiCall";

export default function Transactions() {
  const [transactions, setTransactions] = useState([]);
  const [TotalTransactions, setTotalTransactions] = useState(0); // ✅ total count across all tabs
  const [status, setStatus] = useState("PENDING");
  const [CurrentPage, setCurrentPage] = useState(1);
  const [PostPerPage, setPostPerPage] = useState(10);
  const [TotalPage, setTotalPage] = useState(1);
  const [TotalItems, setTotalItems] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [showToast, setShowToast] = useState({
    show: false,
    message: "",
    status: "",
  });


  const GetAllTransactions = async (currentStatus) => {
    try {
      const result = await GetAllSuperAdminTransactionsApi(
        CurrentPage,
        PostPerPage,
        currentStatus
      );
      console.log("GetAllTransactions result:", result);

      if (result.status === 200 && result.data.data?.funds) {
        const data = result.data.data;

        // ✅ Properly store transactions array
        setTransactions(data.funds);

        // ✅ Update pagination values
        setTotalPage(data.totalPages || 1);
        setCurrentPage(parseInt(data.currentPage) || 1);
        setTotalItems(data.totalItems || data.funds.length || 0);
        setPostPerPage(data.noItemsPerPage || 10);

        // ✅ Track total transactions across all tabs (if API provides it)
        if (data.totalItems) {
          setTotalTransactions(data.totalItems);
        } else {
          // fallback if not in API — accumulate totals manually
          setTotalTransactions(data.totalItems || data.funds.length || 0);
        }
      }
    } catch (e) {
      setShowToast({
        show: true,
        title: "Error fetching transactions",
        message: e.message,
        status: "error",
      });
      setTimeout(() => setShowToast({ show: false }), 3000);
    } finally {
      setLoading(false);
    }
  };

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    GetAllTransactions(status);
  };

  const handleTransactionAction = async (transactionId, newStatus) => {
    console.log("Sending:", { id: transactionId, status: newStatus });
    setIsLoading(true);
    setSelectedTransaction(transactionId);

    try {
      await ApproveTransactionApi(transactionId, newStatus);
      setShowToast({
        show: true,
        message: `Transaction ${newStatus.toLowerCase()} successfully`,
        status: "success",
        duration: 3000,
      });
      setTimeout(() => setShowToast({ show: false }), 3000);

      GetAllTransactions(status); // refresh after update
    } catch (error) {
      setShowToast({
        show: true,
        title: "Failed to update transaction",
        message: error.message,
        status: "error",
      });
      setTimeout(() => setShowToast({ show: false }), 3000);
    } finally {
      setIsLoading(false);
      setSelectedTransaction(null);
    }
  };

  useEffect(() => {
    GetAllTransactions(status);
  }, [status, CurrentPage]);

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

      <Box p={{ base: 3, sm: 4, md: 6 }}>
        <Text fontSize="21px" fontWeight="600" color="#101828" mb="28px">
          Transactions{" "}
          <span style={{ color: "#667085", fontWeight: "400" }}>
            ({TotalTransactions})
          </span>
        </Text>

        <Box border="1px solid #E7E9EC" py={{ base: "16px", md: "20px" }} px={{ base: "15px", md: "31px" }} borderRadius="10px">
          <Tabs
            index={["PENDING", "APPROVED", "FAILED"].indexOf(status)}
            onChange={(index) =>
              setStatus(["PENDING", "APPROVED", "FAILED"][index])
            }
            isFitted
            variant="unstyled"
          >
            <Flex
              justifyContent={{ base: "center", md: "space-between" }}
              alignItems="center"
              flexWrap="wrap"
              gap={{ base: 3, md: 0 }}
            >
              <TabList
                border="1px solid #E7E9EC"
                rounded="7px"
                flexWrap="wrap"
                mb={{ base: "10px", md: "0" }}
              >
                <Tab
                  fontWeight="500"
                  fontSize="13px"
                  py="8.5px"
                  px="12px"
                  _hover={{ bg: "#F8FAFC" }}
                  _selected={{
                    color: "#027A48", // ✅ green text when active
                    fontWeight: "600",
                    bg: "#E6FFF2", // ✅ subtle green background
                  }}
                  _focus={{ boxShadow: "none" }} // ✅ removes blue outline
                >
                  Pending
                </Tab>

                <Tab
                  fontWeight="500"
                  fontSize="13px"
                  py="8.5px"
                  px="12px"
                  borderLeft="1px solid rgb(218, 221, 224)"
                  borderRight="1px solid rgb(218, 221, 224)"
                  _hover={{ bg: "#F8FAFC" }}
                  _selected={{
                    color: "#027A48",
                    fontWeight: "600",
                    bg: "#E6FFF2",
                  }}
                  _focus={{ boxShadow: "none" }}
                >
                  Approved
                </Tab>

                <Tab
                  fontWeight="500"
                  fontSize="13px"
                  py="8.5px"
                  px="12px"
                  _hover={{ bg: "#F8FAFC" }}
                  _selected={{
                    color: "#027A48",
                    fontWeight: "600",
                    bg: "#E6FFF2",
                  }}
                  _focus={{ boxShadow: "none" }}
                >
                  Rejected
                </Tab>
              </TabList>

              <Box
                p="10px"
                border="1px solid #E3E5E8"
                borderRadius="7px"
                display="inline-flex"
                alignItems="center"
                justifyContent="center"
                _hover={{ bg: "#F8FAFC", cursor: "pointer" }}
              >
                <IoIosSearch fontSize="17px" />
              </Box>

              <Menu isLazy>
                <MenuButton as={Box}>
                  <HStack
                    border="1px solid #E3E5E8"
                    w="96px"
                    h="40px"
                    rounded="7px"
                    justify="center"
                    align="center"
                    p="6px"
                    color="#2F2F2F"
                    fontWeight="500"
                    fontSize="14px"
                    _hover={{ bg: "#F8FAFC", cursor: "pointer" }}
                  >
                    <IoFilter />
                    <Text>Filter</Text>
                  </HStack>
                </MenuButton>
              </Menu>
            </Flex>



            <TabPanels>
              {/* === PENDING TRANSACTIONS === */}
              <TabPanel>
                <Box
                  mt="12px"
                  bg="#fff"
                  border="2px solid #EFEFEF"
                  py="20px"
                  rounded="10px"
                >
                  <TableContainer overflowX="auto">
                    <Table variant="simple" size="sm">
                      <Thead bg="#F9FAFB">
                        <Tr>
                          <Th>Transaction ID</Th>
                          <Th>Sponsor</Th>
                          <Th>Scholarship</Th>
                          <Th>Amount</Th>
                          <Th>Cost</Th>
                          <Th>Reference</Th>
                          <Th>Receipt</Th>
                          <Th>Date</Th>
                          <Th>Status</Th>
                          <Th>Action</Th>
                        </Tr>
                      </Thead>
                      <Tbody>
                        {transactions.length > 0 ? (
                          transactions.map((item, i) => (
                            <TableRow
                              key={i}
                              type="super-admin-transactions"
                              transactionId={item.id}
                              user={`${item.sponsor_first_name} ${item.sponsor_last_name}`}
                              scholarship_name={item.scholarship_name}
                              amount={item.funding_amount}
                              scholarship_cost={item.scholarship_cost}
                              reference={item.reference}
                              receipt={item.receipt}
                              date={item.paid_date}
                              status={item.funding_status}
                              loading={isLoading && selectedTransaction === item.id}
                              onApprove={() =>
                                handleTransactionAction(item.id, "APPROVED")
                              }
                              onReject={() =>
                                handleTransactionAction(item.id, "FAILED")
                              }
                            />
                          ))
                        ) : (
                          <Tr>
                            <Td colSpan={10} textAlign="center" py={5}>
                              <Text>No pending transactions</Text>
                            </Td>
                          </Tr>
                        )}
                      </Tbody>
                    </Table>
                  </TableContainer>
                </Box>
              </TabPanel>

              {/* === APPROVED TRANSACTIONS === */}
              <TabPanel>
                {loading ? (
                  <Spinner />
                ) : (
                  <Box
                    mt="12px"
                    bg="#fff"
                    border="2px solid #EFEFEF"
                    py="20px"
                    rounded="10px"
                  >
                    <TableContainer overflowX="auto">
                      <Table variant="simple" size="sm">
                        <Thead bg="#F9FAFB">
                          <Tr>
                            <Th>Transaction ID</Th>
                            <Th>Sponsor</Th>
                            <Th>Scholarship</Th>
                            <Th>Amount</Th>
                            <Th>Cost</Th>
                            <Th>Reference</Th>
                            <Th>Receipt</Th>
                            <Th>Date</Th>
                            <Th>Status</Th>
                            <Th>Action</Th>
                          </Tr>
                        </Thead>
                        <Tbody>
                          {transactions.length > 0 ? (
                            transactions.map((item, i) => (
                              <TableRow
                                key={i}
                                type="super-admin-transactions"
                                transactionId={item.id}
                                user={`${item.sponsor_first_name} ${item.sponsor_last_name}`}
                                scholarship_name={item.scholarship_name}
                                amount={item.funding_amount}
                                scholarship_cost={item.scholarship_cost}
                                reference={item.reference}
                                receipt={item.receipt}
                                date={item.paid_date}
                                status={item.funding_status}
                                loading={isLoading && selectedTransaction === item.id}
                                onReject={() =>
                                  handleTransactionAction(item.id, "FAILED")
                                }
                              />
                            ))
                          ) : (
                            <Tr>
                              <Td colSpan={10} textAlign="center" py={5}>
                                <Text>No approved transactions</Text>
                              </Td>
                            </Tr>
                          )}
                        </Tbody>
                      </Table>
                    </TableContainer>
                  </Box>
                )}
              </TabPanel>

              {/* === FAILED TRANSACTIONS === */}
              <TabPanel>
                {loading ? (
                  <Spinner />
                ) : (
                  <Box
                    mt="12px"
                    bg="#fff"
                    border="2px solid #EFEFEF"
                    py="20px"
                    rounded="10px"
                  >
                    <TableContainer overflowX="auto">
                      <Table variant="simple" size="sm">
                        <Thead bg="#F9FAFB">
                          <Tr>
                            <Th>Transaction ID</Th>
                            <Th>Sponsor</Th>
                            <Th>Scholarship</Th>
                            <Th>Amount</Th>
                            <Th>Cost</Th>
                            <Th>Reference</Th>
                            <Th>Receipt</Th>
                            <Th>Date</Th>
                            <Th>Status</Th>
                            <Th>Action</Th>
                          </Tr>
                        </Thead>
                        <Tbody>
                          {transactions.length > 0 ? (
                            transactions.map((item, i) => (
                              <TableRow
                                key={i}
                                type="super-admin-transactions"
                                transactionId={item.id}
                                user={`${item.sponsor_first_name} ${item.sponsor_last_name}`}
                                scholarship_name={item.scholarship_name}
                                amount={item.funding_amount}
                                scholarship_cost={item.scholarship_cost}
                                reference={item.reference}
                                receipt={item.receipt}
                                date={item.paid_date}
                                status={item.funding_status}
                                loading={isLoading && selectedTransaction === item.id}
                                onApprove={() =>
                                  handleTransactionAction(item.id, "APPROVED")
                                }
                              />
                            ))
                          ) : (
                            <Tr>
                              <Td colSpan={10} textAlign="center" py={5}>
                                <Text>No rejected transactions</Text>
                              </Td>
                            </Tr>
                          )}
                        </Tbody>
                      </Table>
                    </TableContainer>
                  </Box>
                )}
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>

        <Pagination
          currentPage={CurrentPage}
          postsPerPage={PostPerPage}
          totalPosts={TotalItems}
          paginate={paginate}
        />
      </Box>
    </MainLayout>
  );
}
