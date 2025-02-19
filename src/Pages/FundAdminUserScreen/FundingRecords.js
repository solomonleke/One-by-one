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
  Icon,
  Button,
  HStack,
} from "@chakra-ui/react";
import MainLayout from "../../DashboardLayout";
import { GoDotFill } from "react-icons/go";
import { BiLeftArrow } from "react-icons/bi";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { useNavigate, useNavigationType } from "react-router-dom";



export default function FundingRecords(){

    const navigation = useNavigate();
    
        const transactions = [
          {
            "transactionID": "TX123456789",
            "sponsorName": "Bonye Fubara",
            "student": "Philip Amakiri",
            "amount": "₦100,000.00",
            "date": "01/16/2025 15:13",
            "paymentMethod": "Bank Transfer",
            "paymentStatus": "Pending",
            "receipt": "View"
          },
          {
            "transactionID": "TX989754321",
            "sponsorName": "Nnamdi Eze",
            "student": "Solomon Adeleke",
            "amount": "₦50,000.00",
            "date": "01/20/2025 07:17",
            "paymentMethod": "Card",
            "paymentStatus": "Completed",
            "receipt": "View"
          },
          {
            "transactionID": "TX456789123",
            "sponsorName": "Inye Fubara",
            "student": "Peter Charles",
            "amount": "₦50,000.00",
            "date": "02/07/2025 10:14",
            "paymentMethod": "Bank Transfer",
            "paymentStatus": "Completed",
            "receipt": "View"
          }
        ]
      
  return (
      <MainLayout>
      <Box p={6}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
        <Text fontSize="21px" fontWeight="bold">Funding History</Text>
        <HStack bg="transparent" border="none" fontSize="14px" display="flex" alignItems="center" cursor="pointer" onClick={() => navigation("/fund-admin")}><MdOutlineKeyboardArrowLeft /><Text>Back</Text></HStack>
        </Box>
    
        <TableContainer border="1px solid #EDEFF2" borderRadius="7px" mt="15px">
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th fontSize="13px">Transaction ID</Th>
                <Th fontSize="13px">Sponsor Name</Th>
                <Th fontSize="13px">Students</Th>
                <Th fontSize="13px">Amount (₦)</Th>
                <Th fontSize="13px">Date</Th>
                <Th fontSize="13px">Payment Method</Th>
                <Th fontSize="13px">Payment Status</Th>
                <Th fontSize="13px">Receipt</Th>
              </Tr>
            </Thead>
            <Tbody>
              {transactions.map((transactions, index) => (
                <Tr key={index}>
                  <Td fontSize="13px">{transactions.transactionID}</Td>
                  <Td fontSize="13px">{transactions.sponsorName}</Td>
                  <Td fontSize="13px">{transactions.student}</Td>
                  <Td fontSize="13px">{transactions.amount}</Td>
                  <Td fontSize="13px">{transactions.date}</Td>
                  <Td fontSize="13px">{transactions.paymentMethod}</Td>
                  
                  <Td>
  <Box 
    fontSize="12px" 
    fontWeight="bold" 
    bg={transactions.status === "Pending" ? "#FFF7EB" : "#C0FFE1"} 
    borderRadius="16px" 
    p="4px 8px" 
    display="inline-flex" 
    alignItems="center"
    ml="5px"
    color={transactions.status === "Pending" ? "#FFA30C" : "#027A48"}
  >
    <Icon as={GoDotFill} boxSize={3} mr={1} /> {transactions.status}
  </Box>
</Td>
<Td fontSize="13px">{transactions.receipt}</Td>

                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
  
      </Box>
      </MainLayout>
    );
  };
  
