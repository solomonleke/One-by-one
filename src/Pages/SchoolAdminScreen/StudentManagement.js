import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import MainLayout from '../../DashboardLayout'
import { Text, Flex, HStack, Box } from '@chakra-ui/react'
import TableRow from "../../Components/TableRow"
import Button from "../../Components/Button"
import { CgSearch } from "react-icons/cg";
import { IoFilter } from "react-icons/io5";
import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    TableContainer,
} from '@chakra-ui/react'

export default function StudentManagement() {

    const [All, setAll] = useState(true)
    const [Approved, setApproved] = useState(false)
    const [Pending, setPending] = useState(false)
    const [Rejected, setRejected] = useState(false)


    const router = useNavigate();

    return (
        <MainLayout>
            <HStack>
                <Text color="#1F2937" fontWeight="600" fontSize="19px">Students</Text>
                <Text color="#667085" fontWeight="400" fontSize="18px">(526)</Text>
            </HStack>
            <Text color="#686C75" mt="9px" fontWeight="400" fontSize="15px">View and manage all student profiles in one place. Quickly access approval statuses, track eligibility, and update details as needed.</Text>

            <Box bg="#fff" border="1px solid #EFEFEF" mt="12px" py='17px' px={["18px","18px"]} rounded='10px'>
                <Flex justifyContent="space-between" flexWrap="wrap">
                    <Flex alignItems="center" flexWrap='wrap' bg="#E8FFF4" rounded='7px' py="3.5px" px="5px" cursor="pointer" mt={["10px", "10px", "0px", "0px"]}>

                        <Box borderRight="1px solid #EDEFF2" pr="5px" onClick={() => {
                            setAll(true)
                            setApproved(false)
                            setPending(false)
                            setRejected(false)
                        }}>
                            <Text py='8.5px' px="12px" bg={All ? "#fff" : "transparent"} rounded="7px" color={"#1F2937"} fontWeight={"500"} fontSize={"13px"}>All  <Box color="#667085" as='span' fontWeight="400" fontSize="13px">(526)</Box></Text>
                        </Box>
                        <Box borderRight="1px solid #EDEFF2" pr="5px" onClick={() => {
                            setAll(false)
                            setApproved(true)
                            setPending(false)
                            setRejected(false)
                        }}>
                            <Text py='8.5px' px="12px" bg={Approved ? "#fff" : "transparent"} rounded="7px" color={"#1F2937"} fontWeight={"500"} fontSize={"13px"}>Approved</Text>
                        </Box>
                        <Box borderRight="1px solid #EDEFF2" pr="5px" onClick={() => {
                            setAll(false)
                            setApproved(false)
                            setPending(true)
                            setRejected(false)
                        }}>
                            <Text py='8.5px' px="12px" bg={Pending ? "#fff" : "transparent"} rounded="7px" color={"#1F2937"} fontWeight={"500"} fontSize={"13px"}>Pending</Text>
                        </Box>
                        <Box pr="5px" onClick={() => {
                            setAll(false)
                            setApproved(false)
                            setPending(false)
                            setRejected(true)
                        }}>
                            <Text py='8.5px' px="12px" bg={Rejected ? "#fff" : "transparent"} rounded="7px" color={"#1F2937"} fontWeight={"500"} fontSize={"13px"}>Rejected</Text>
                        </Box>

                    </Flex>

                    <Flex w={["100%", "30%"]} flexWrap="wrap" mt={["10px", "10px", "0px", "0px"]} alignItems="center" justifyContent={"space-between"} >
                        <HStack >
                            <Box border="1px solid #E3E5E8" rounded="7px" p='10px' fontSize="14px">
                                <CgSearch />
                            </Box>
                            <HStack border="1px solid #E3E5E8" rounded="7px" p='6px' color='#2F2F2F' fontWeight="500" fontSize="14px">
                                <IoFilter />
                                <Text>Filter</Text>
                            </HStack>
                        </HStack>
                        <Button w="159px" size="sm" onClick={() => {
                            router("/AddStudents")
                        }}>Add student</Button>
                    </Flex>
                </Flex>

                <Box bg="#fff" border="1px solid #EFEFEF" mt="12px" py='15px' px="15px" rounded='10px' overflowX="auto">

                    <TableContainer>
                        <Table variant='simple'>

                            <Thead bg="#F9FAFB">
                                <Tr >
                                    <Th fontSize="13px" textTransform="capitalize" color='#2F2F2F' fontWeight="600">name</Th>
                                    <Th fontSize="13px" textTransform="capitalize" color='#2F2F2F' fontWeight="600">department</Th>
                                    <Th fontSize="13px" textTransform="capitalize" color='#2F2F2F' fontWeight="600">class level</Th>
                                    <Th fontSize="13px" textTransform="capitalize" color='#2F2F2F' fontWeight="600">field of study</Th>
                                    <Th fontSize="13px" textTransform="capitalize" color='#2F2F2F' fontWeight="600">eligibility status</Th>
                                    <Th fontSize="13px" textTransform="capitalize" color='#2F2F2F' fontWeight="600">actions</Th>

                                </Tr>
                            </Thead>
                            <Tbody>

                                <TableRow
                                    type="school-admin"
                                    name="Moyinoluwa King"
                                    email="moyinadeleke@yahoo.com"
                                    department="commercial"
                                    classLevel="SS3"
                                    fieldOfStudy="Computer Science"
                                    status="approved"
                                />
                                <TableRow
                                    type="school-admin"
                                    name="Moyinoluwa King"
                                    email="moyinadeleke@yahoo.com"
                                    department="commercial"
                                    classLevel="SS3"
                                    fieldOfStudy="Computer Science"
                                    status="approved"
                                />
                                <TableRow
                                    type="school-admin"
                                    name="Moyinoluwa King"
                                    email="moyinadeleke@yahoo.com"
                                    department="commercial"
                                    classLevel="SS3"
                                    fieldOfStudy="Computer Science"
                                    status="approved"
                                />
                                <TableRow
                                    type="school-admin"
                                    name="Paul Smith"
                                    email="paulsmith@yahoo.com"
                                    department="arts"
                                    classLevel="SS3"
                                    fieldOfStudy="Computer Science"
                                    status="pending"
                                />
                                <TableRow
                                    type="school-admin"
                                    name="Paul Smith"
                                    email="paulsmith@yahoo.com"
                                    department="arts"
                                    classLevel="SS3"
                                    fieldOfStudy="Computer Science"
                                    status="pending"
                                />
                                <TableRow
                                    type="school-admin"
                                    name="Daniel Price"
                                    email="danielprice@yahoo.com"
                                    department="science"
                                    classLevel="SS2"
                                    fieldOfStudy="Computer Science"
                                    status="rejected"
                                />
                                <TableRow
                                    type="school-admin"
                                    name="Daniel Price"
                                    email="danielprice@yahoo.com"
                                    department="science"
                                    classLevel="SS2"
                                    fieldOfStudy="Computer Science"
                                    status="rejected"
                                />
                             
                            </Tbody>

                        </Table>
                    </TableContainer>

                </Box>
            </Box>

        </MainLayout>
    )
}
