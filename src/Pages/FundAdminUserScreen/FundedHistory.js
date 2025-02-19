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
  Icon,
} from "@chakra-ui/react";
import MainLayout from "../../DashboardLayout";
import { GoDotFill } from "react-icons/go";



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
                <Tr key={index}>
                  <Td fontSize="13px">
                    <Flex align="center">
                      <Avatar size="sm" name={student.fundedStudents} mr={2} />
                      {student.fundedStudents}
                    </Flex>
                  </Td>
                  <Td fontSize="13px">{student.amount}</Td>
                  <Td fontSize="13px">{student.transactionId}</Td>
                  <Td fontSize="13px">{student.date}</Td>
                  <Td fontSize="13px">{student.paymentMethod}</Td>
                  <Td>
  <Box 
    fontSize="12px" 
    fontWeight="bold" 
    bg={student.status === "Pending" ? "#FFF7EB" : "#C0FFE1"} 
    borderRadius="16px" 
    p="4px 8px" 
    display="inline-flex" 
    alignItems="center"
    ml="5px"
    color={student.status === "Pending" ? "#FFA30C" : "#027A48"}
  >
    <Icon as={GoDotFill} boxSize={3} mr={1} /> {student.status}
  </Box>
</Td>

                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
  
      </Box>
      </MainLayout>
    );
  };
  

