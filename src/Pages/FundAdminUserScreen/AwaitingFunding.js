import React from "react";
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Input,
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


const students = [
  { name: "Philip Amakiri", school: "Legendary Scholars Academy", guardian: "Peter Durojaiye", schoolBank: "Zenith", BankAcc: "12345678", guardianBank: "Access", GuardianBankAcc: "12345678", tuition: "₦200,000.00" },
  { name: "David Folarin", school: "Queen's College", guardian: "Lydia Werinipre", schoolBank: "Access", BankAcc: "12345678", guardianBank: "Zenith", GuardianBankAcc: "12345678", tuition: "₦500,000.00" },
  { name: "Timothy Salisu", school: "Federal Government College", guardian: "Grace Izuokumo", schoolBank: "Fidelity", BankAcc: "12345678", guardianBank: "First", GuardianBankAcc: "12345678", tuition: "₦690,000.00" },
  { name: "Peter Usman", school: "Mayflower School", guardian: "Timothy Inengite", schoolBank: "First", BankAcc: "12345678", guardianBank: "Polaris", GuardianBankAcc: "12345678", tuition: "₦130,000.00" },
  { name: "Esther Wakili", school: "Chrisland College", guardian: "Stephen Agbasi", schoolBank: "Polaris", BankAcc: "12345678", guardianBank: "Fidelity", GuardianBankAcc: "12345678", tuition: "₦100,000.00" },
];

export default function FundingTable(){
  return (
    <MainLayout>
    <Box p={6}>
      <Text fontSize="xl" fontWeight="bold">Awaiting Funding (34)</Text>
      <Text mb={4}>Explore a diverse pool of students and their academic aspirations.</Text>
      
      <Flex  justify="space-between" align="center">
      <Input placeholder="Search Students" maxW="600px" />
      <Flex  justify="space-between" align="center" gap={4} marginLeft={4}>
        <Button display="flex"   variant="outline" w="48px" h="48px" borderRadius="full">
        <GoArrowLeft />
        </Button>
        <Button display="flex"   variant="outline" w="48px" h="48px" borderRadius="full">
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
            {students.map((student, index) => (
              <Tr key={index}>
                <Td>
                  <Flex align="center">
                    <Avatar size="sm" name={student.name} mr={2} />
                    {student.name}
                  </Flex>
                </Td>
                <Td>{student.school}</Td>
                <Td>{student.guardian}</Td>
                <Td>
                    <Box display="flex" flexDirection="column">
                    <Flex align="center" justify="space-between" w="full">
                     <Text>{student.schoolBank}</Text>
                      <IoMdOpen color="#97A89F" />
                    </Flex>

                      <Text fontSize="sm">Acc: {student.BankAcc}</Text>
                    </Box>
                  </Td>
                <Td>
                    <Box display="flex" flexDirection="column">
                    <Flex align="center" justify="space-between" w="full">
                      <Text>{student.guardianBank}</Text>
                      <IoMdOpen color="#97A89F" />
                    </Flex>

                      <Text fontSize="sm">Acc: {student.GuardianBankAcc}</Text>
                    </Box>
                  </Td>
                <Td >{student.tuition}</Td>
              </Tr>
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
  <Flex gap={2}>
    {useBreakpointValue({
      base: [1, 2, 3, "...", 10],  // Fewer numbers on small screens
      md: [1, 2, 3, "...", 8, 9, 10] // More numbers on larger screens
    }).map((num, index) => (
      <Button key={index} variant={num === 1 ? "solid" : "outline"}>
        {num}
      </Button>
    ))}
  </Flex>

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


