import { useState } from "react";
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



export default function FundedHistory(){

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
    
  return (
      <MainLayout>
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
              {students.map((student, index) => (
                
                  <TableRow
                    key={index}
                    type="funded-history"
                    fundedStudents={student.fundedStudents}
                    amount={student.amount}
                    transactionId={student.transactionId}
                    date={student.date}
                    paymentMethod={student.paymentMethod}
                    status={student.status}
                  />

                
              ))}
            </Tbody>
          </Table>
        </TableContainer>
  
      </Box>
      </MainLayout>
    );
  };
  

