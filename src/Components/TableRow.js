import { Box, Flex, HStack, Avatar, Text, Menu, MenuButton, MenuList, MenuItem, useDisclosure, Icon, } from '@chakra-ui/react'
import {

    Tr,
    Td,

} from '@chakra-ui/react';
import { BsThreeDots } from "react-icons/bs"
import { useNavigate } from 'react-router-dom'
import Button from './Button'
import { IoMdOpen } from "react-icons/io";
import { GoDotFill } from "react-icons/go";

export default function TableRow({ type, name, email, department, classLevel, fieldOfStudy, status, submissionDate, onButtonClick, onEdit, onRemove, school, guardian, schoolBank, BankAcc, guardianBank, GuardianBankAcc, tuition, fundedStudents, amount, transactionId, date, paymentMethod, sponsor, fee }) {
    const router = useNavigate()

    const handleStudentClick = (student_Id) => {
        router(`/school-admin/student-management/student-profile/${student_Id}`);
      };
    return (

        <Tr textTransform="capitalize" cursor="pointer">
            {
                type === "school-admin" && (
                    <>
                        <Td onClick={() => {
                            handleStudentClick()
                        }}>
                            <HStack cursor={"pointer"}>
                                <Avatar name={name} size='sm' src='https://bit.ly/tioluwani-kolawole' />
                                <Box>
                                    <Text color={"#101828"} fontWeight={"500"} fontSize={"13px"} >{name}</Text>
                                    <Text color={"#667085"} textTransform={"lowercase"} fontWeight={"400"} fontSize={"11px"} >{email}</Text>

                                </Box>

                            </HStack>
                        </Td>
                        <Td><Text fontWeight="400" fontSize={"13px"} textTransform={"capitalize"} color={department === "arts" ? "#2936e4" : department === "commercial" ? "#a529e4" : "#29e4c1"}>{department}</Text></Td>
                        <Td><Text fontWeight="400" fontSize={"13px"} >{classLevel}</Text></Td>
                        <Td><Text fontWeight="400" fontSize={"13px"}>{fieldOfStudy}</Text></Td>
                        <Td>
                            <HStack color={status === "approved" ? "#027A48" : status === "pending" ? "#FFA30C" : "#FD4739"}>
                                <Box rounded="100%" w="8px" h="8px" bg={status === "approved" ? "#027A48" : status === "pending" ? "#FFA30C" : "#FD4739"}></Box>
                                <Text fontWeight="400" fontSize={"13px"} >{status}</Text>
                            </HStack>
                        </Td>
                        <Td>
                            <Menu isLazy>
                                <MenuButton as={Box}>

                                    <Flex justifyContent="center" color="#000000" fontSize="16px"><BsThreeDots /></Flex>
                                </MenuButton>
                                <MenuList >

                                    <MenuItem onClick={onEdit} textTransform="capitalize" fontWeight={"500"} color='#2F2F2F' _hover={{ color: "#2F2F2F", fontWeight: "400", bg: "#E8FFF4" }}>
                                        <HStack fontSize="14px">

                                            <Text>Edit</Text>
                                        </HStack>
                                    </MenuItem>
                                    <MenuItem onClick={onRemove} textTransform="capitalize" fontWeight={"500"} color='#FF4040' _hover={{ color: "#FF4040", fontWeight: "400", bg: "#E8FFF4" }}>
                                        <HStack fontSize="14px">

                                            <Text >Remove Student</Text>
                                        </HStack>
                                    </MenuItem>

                                </MenuList>
                            </Menu>
                        </Td>
                    </>

                )
            }

{
                type === "sponsor-admin-students" && (
                    <>
                    <Td display="flex" gap="10px">
                        <Checkbox></Checkbox>
                        <HStack cursor={"pointer"} onClick={() => {router("/sponsor-admin/discoverstudents/student-profile")}}>
                            <Avatar name={name} size='sm' src='https://bit.ly/tioluwani-kolawole' />
                            <Box>
                            <Text color={"#101828"} fontWeight={"500"} fontSize={"13px"} >{name}</Text>
                            <Text color={"#667085"} textTransform={"capitalize"} fontWeight={"400"} fontSize={"11px"} >{schoolName}</Text>

                            </Box>
                          
                        </HStack>
                    </Td>
                    <Td><Text fontWeight="400" fontSize={"13px"} textTransform={"capitalize"} color={department === "arts" ? "#2936e4": department === "commercial" ? "#a529e4": "#29e4c1"  }>{department}</Text></Td>
                    <Td><Text fontWeight="400" fontSize={"13px"} >{classLevel}</Text></Td>
                    <Td><Text fontWeight="400" fontSize={"13px"}>{fieldOfStudy}</Text></Td>
                    <Td>
                         <Menu isLazy>
                            <MenuButton as={Box}>

                            <Flex justifyContent="center" color="#000000" fontSize="16px"><BsThreeDots /></Flex>
                            </MenuButton>
                            <MenuList >
                             
                                <MenuItem onClick={onEdit} textTransform="capitalize" fontWeight={"500"} color='#2F2F2F' _hover={{ color: "#2F2F2F", fontWeight: "400", bg: "#E8FFF4" }}>
                                    <HStack fontSize="14px">
                                      
                                        <Text>Edit</Text>
                                    </HStack>
                                </MenuItem>
                                <MenuItem  onClick={onRemove} textTransform="capitalize" fontWeight={"500"} color='#FF4040' _hover={{ color: "#FF4040", fontWeight: "400", bg: "#E8FFF4" }}>
                                    <HStack fontSize="14px">
                                      
                                        <Text >Remove Student</Text>
                                    </HStack>
                                </MenuItem>

                            </MenuList>
                        </Menu>
                        </Td>
                    </>
                 
                )
            }
             {
                type === "scholarship-admin-schools" && (
                    <>
                    <Td onClick={() => {router("/scholarship-admin/schools/school-profile")}}>
                        <HStack cursor={"pointer"}>
                            <Avatar name={schoolName} size='sm' src='https://bit.ly/tioluwani-kolawole' />
                            <Box>
                            <Text color={"#101828"} fontWeight={"500"} fontSize={"13px"} >{schoolName}</Text>
                            <Text color={"#667085"} textTransform={"lowercase"} fontWeight={"400"} fontSize={"11px"} >{email}</Text>

                            </Box>
                          
                        </HStack>
                    </Td>
                    <Td><Text fontWeight="400" fontSize={"13px"} >{submissionDate}</Text></Td>
                    <Td>
                        <HStack color={status === "approved" ? "#027A48": status === "pending" ? "#FFA30C": "#FD4739"}>
                            <Box rounded="100%" w="8px" h="8px" bg={status === "approved" ? "#027A48": status === "pending" ? "#FFA30C": "#FD4739"}></Box>
                            <Text fontWeight="400" fontSize={"13px"} >{status}</Text>
                        </HStack>
                    </Td>
                    <Td>
                        <Button onClick={onButtonClick} background={buttonText === "Revoke Approval" ? "white" : buttonText === "Unreject" ? "white" : "greenn.greenn400"} color={buttonText === "Revoke Approval" ? "greenn.greenn400" : buttonText === "Unreject" ? "greenn.greenn400" : "#fff"}>{buttonText}</Button>
                        </Td>
                    </>
                 
                )
            }
            {
                type === "scholarship-admin-students" && (
                    <>
                    <Td onClick={() => {router("/scholarship-admin/schools/student-profile")}}>
                        <HStack cursor={"pointer"}>
                            <Avatar name={name} size='sm' src='https://bit.ly/tioluwani-kolawole' />
                            <Box>
                            <Text color={"#101828"} fontWeight={"500"} fontSize={"13px"} >{name}</Text>
                            <Text color={"#667085"} textTransform={"lowercase"} fontWeight={"400"} fontSize={"11px"} >{email}</Text>

                            </Box>
                          
                        </HStack>
                    </Td>
                            <Td><Text color={"#667085"} textTransform={"capitalize"} fontWeight={"400"} fontSize={"13px"} >{schoolName}</Text></Td>
                    <Td><Text fontWeight="400" color={"#667085"} fontSize={"13px"}>{fieldOfStudy}</Text></Td>
                    <Td>
                        <HStack color={status === "approved" ? "#027A48": status === "pending" ? "#FFA30C": "#FD4739"}>
                            <Box rounded="100%" w="8px" h="8px" bg={status === "approved" ? "#027A48": status === "pending" ? "#FFA30C": "#FD4739"}></Box>
                            <Text fontWeight="400" fontSize={"13px"} >{status}</Text>
                        </HStack>
                    </Td>
 <Td>
                        <Button onClick={onButtonClick} background={buttonText === "Reject" ? "white" : buttonText === "Unreject" ? "white" : "greenn.greenn400"} color={buttonText === "Reject" ? "greenn.greenn400" : buttonText === "Unreject" ? "greenn.greenn400" : "#fff"}>{buttonText}</Button>
                        </Td>
                    </>
                 
                )
            }

            {
                type === "awaiting-funding" && (
                    <>
                        <Td>
                            <Flex align="center">
                                <Avatar size="sm" name={name} mr={2} />
                                {name}
                            </Flex>
                        </Td>
                        <Td>{school}</Td>
                        <Td>{guardian}</Td>
                        <Td>
                            <Box display="flex" flexDirection="column">
                                <Flex align="center" justify="space-between" w="full">
                                    <Text>{schoolBank}</Text>
                                    <IoMdOpen color="#97A89F" />
                                </Flex>

                                <Text fontSize="sm">Acc: {BankAcc}</Text>
                            </Box>
                        </Td>
                        <Td>
                            <Box display="flex" flexDirection="column">
                                <Flex align="center" justify="space-between" w="full">
                                    <Text>{guardianBank}</Text>
                                    <IoMdOpen color="#97A89F" />
                                </Flex>

                                <Text fontSize="sm">Acc: {GuardianBankAcc}</Text>
                            </Box>
                        </Td>
                        <Td >{tuition}</Td>
                    </>
                )
            }

            {
                type === "funded-history" && (
                    <>
                        <Td fontSize="13px">
                            <Flex align="center">
                                <Avatar size="sm" name={fundedStudents} mr={2} />
                                {fundedStudents}
                            </Flex>
                        </Td>
                        <Td fontSize="13px">{amount}</Td> 
                        <Td fontSize="13px">{transactionId}</Td>
                        <Td fontSize="13px">{date}</Td>
                        <Td fontSize="13px">{paymentMethod}</Td>
                        <Td>
                            <Box
                                fontSize="12px"
                                fontWeight="bold"
                                bg={status === "Pending" ? "#FFF7EB" : "#C0FFE1"}
                                borderRadius="16px"
                                p="4px 8px"
                                display="inline-flex"
                                alignItems="center"
                                ml="5px"
                                color={status === "Pending" ? "#FFA30C" : "#027A48"}
                            >
                                <Icon as={GoDotFill} boxSize={3} mr={1} /> {status}
                            </Box>
                        </Td>                    </>
                )
            }

            {
                type === "fund-index" && (
                    <>
                        <Td cursor="pointer">{name}</Td>
                <Td>{school}</Td>
                <Td>{classLevel}</Td>
                <Td>{sponsor}</Td>
                <Td>{fee}</Td>
                <Td>
                <Box 
                  fontSize="12px" 
                   fontWeight="bold" 
                   bg="#C0FFE1" 
                    border="1px solid #95C7AF" 
                    borderRadius="16px" 
                   p="4px 8px" 
                    display="inline-flex" 
                    alignItems="center"
                    ml="5px"
                    color="#027A48"
                    >
                      <Icon as={GoDotFill} boxSize={3} mr={1} /> {status}
                    </Box>
                </Td>
                    </>
                )
            }
        </Tr>
    )
}
