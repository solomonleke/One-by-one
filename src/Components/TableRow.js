import React, { useState } from 'react'
import { Box, Flex, HStack, Avatar, Text, Menu, Checkbox, MenuButton, MenuList, MenuItem, useDisclosure, Icon, } from '@chakra-ui/react'
import {

    Tr,
    Td,

} from '@chakra-ui/react';
import { BsThreeDots } from "react-icons/bs"
import { useNavigate } from 'react-router-dom'
import Button from './Button'
import { IoMdOpen } from "react-icons/io";
import { GoDotFill } from "react-icons/go";
import eventBus from './eventBus';
import ReceiptModal from './ReceiptModal';



export default function TableRow({ type, receiptUrl, stationary, total, name, request, requestId, email, studentIds, department, classLevel, onDelete, onClick, onOpen, fieldOfStudy, status, submissionDate, onButtonClick, onEdit, onRemove, school, schoolName, buttonText, guardian, schoolBank, BankAcc, guardianBank, GuardianBankAcc, tuition, fundedStudents, amount, transactionId, date, paymentMethod, sponsor, fee, essayScore, principal, approvedStudents, state, city, scholarshipsCreated, fundedScholarships, studentsFunded, approvedSchools, isLoading, loading, reference, scholarship_cost, scholarship_name, onApprove, onReject, receipt, user }) {

    const router = useNavigate()


    const handleOpenModal = (studentId) => {
        console.log("📌 Student ID Clicked:", studentIds);
        eventBus.emit("studentSelected", studentId); // Send studentId to DiscoverStudents
    };




    return (

        <Tr textTransform="capitalize" cursor="pointer">
            {
                type === "school-admin" && (
                    <>
                        <Td onClick={onClick}>
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
                            <HStack color={status === "APPROVED" ? "#027A48" : status === "PENDING" ? "#FFA30C" : "#FD4739"}>
                                <Box rounded="100%" w="8px" h="8px" bg={status === "APPROVED" ? "#027A48" : status === "PENDING" ? "#FFA30C" : "#FD4739"}></Box>
                                <Text fontWeight="400" fontSize={"13px"} >{status}</Text>
                            </HStack>
                        </Td>
                        <Td><Text fontWeight="400" fontSize={"13px"}>{date}</Text></Td>
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
                                    <MenuItem onClick={onDelete} textTransform="capitalize" fontWeight={"500"} color='#FF4040' _hover={{ color: "#FF4040", fontWeight: "400", bg: "#E8FFF4" }}>
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
                type === "school-admin-students" && (
                    <>
                        <Td display="flex" gap="10px">
                            <Checkbox></Checkbox>
                            <HStack cursor={"pointer"} onClick={() => { router("/sponsor-admin/students/student-profile") }}>
                                <Avatar name={name} size='sm' src='https://bit.ly/tioluwani-kolawole' />
                                <Box>
                                    <Text color={"#101828"} fontWeight={"500"} fontSize={"13px"} >{name}</Text>
                                    <Text color={"#667085"} textTransform={"capitalize"} fontWeight={"400"} fontSize={"11px"} >{schoolName}</Text>

                                </Box>

                            </HStack>
                        </Td>
                        <Td><Text fontWeight="400" fontSize={"13px"} textTransform={"capitalize"} color={department === "arts" ? "#2936e4" : department === "commercial" ? "#a529e4" : "#29e4c1"}>{department}</Text></Td>
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
                type === "sponsor-admin-discoverstudents" && (
                    <>
                        <Td display="flex" gap="10px">
                            <HStack cursor={"pointer"} onClick={() => { router("/sponsor-admin/discoverstudents/student-profile") }}>
                                <Avatar name={name} size='sm' src='https://bit.ly/tioluwani-kolawole' />
                                <Box>
                                    <Text color={"#101828"} fontWeight={"500"} fontSize={"13px"} >{name}</Text>

                                </Box>

                            </HStack>
                        </Td>
                        <Td><Text fontWeight="400" fontSize={"13px"} >{classLevel}</Text></Td>
                        <Td><Text fontWeight="400" fontSize={"13px"} textTransform={"capitalize"}>{essayScore}</Text></Td>
                        <Td><Text fontWeight="400" fontSize={"13px"} textTransform={"capitalize"}>{request}</Text></Td>
                        <Td><Text fontWeight="400" fontSize={"13px"}>{amount}</Text></Td>
                        <Td>
                            <Menu isLazy>
                                <MenuButton as={Box}>

                                    <Flex justifyContent="center" color="#000000" fontSize="16px"><BsThreeDots /></Flex>
                                </MenuButton>
                                <MenuList >

                                    <MenuItem onClick={onEdit} textTransform="capitalize" fontWeight={"500"} color='#2F2F2F' _hover={{ color: "#2F2F2F", fontWeight: "400", bg: "#E8FFF4" }}>
                                        <HStack fontSize="14px">

                                            <Text>View Profile</Text>
                                        </HStack>
                                    </MenuItem>
                                    <MenuItem onClick={() => onOpen(requestId)} textTransform="capitalize" fontWeight={"500"} _hover={{ color: "#2F2F2F", fontWeight: "400", bg: "#E8FFF4" }}>
                                        <HStack fontSize="14px">

                                            <Text >Add to Scholarship</Text>
                                        </HStack>
                                    </MenuItem>

                                </MenuList>
                            </Menu>
                        </Td>
                    </>

                )
            }

            {
                type === "sponsor-admin-history" && (
                    <>
                        <Td fontSize="13px">{date}</Td>
                        <Td fontSize="13px">
                            <Flex align="center">
                                <Avatar size="sm" name={fundedStudents} mr={2} />
                                {fundedStudents}
                            </Flex>
                        </Td>
                        <Td fontSize="13px">{amount}</Td>
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
                        </Td>
                        <Td fontSize="13px">{transactionId}</Td>
                    </>
                )
            }

            {
                type === "scholarship-admin-schools" && (
                    <>
                        <Td onClick={() => { router("/scholarship-admin/schools/school-profile") }}>
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
                            <HStack color={status === "APPROVED" ? "#027A48" : status === "PENDING" ? "#FFA30C" : "#FD4739"}>
                                <Box rounded="100%" w="8px" h="8px" bg={status === "APPROVED" ? "#027A48" : status === "PENDING" ? "#FFA30C" : "#FD4739"}></Box>
                                <Text fontWeight="400" fontSize={"13px"} >{status}</Text>
                            </HStack>
                        </Td>
                        <Td>
                            <Button onClick={onButtonClick} isLoading={loading} background={buttonText === "Revoke Approval" ? "white" : buttonText === "Unreject" ? "white" : "greenn.greenn400"} color={buttonText === "Revoke Approval" ? "greenn.greenn400" : buttonText === "Unreject" ? "greenn.greenn400" : "#fff"}>{buttonText}</Button>
                        </Td>
                    </>

                )
            }
            {
                type === "scholarship-admin-students" && (
                    <>
                        <Td onClick={() => { router("/scholarship-admin/students/student-profile") }}>
                            <HStack cursor={"pointer"}>
                                <Avatar name={name} size='sm' src='https://bit.ly/tioluwani-kolawole' />
                                <Box>
                                    <Text color={"#101828"} fontWeight={"500"} fontSize={"13px"} >{name}</Text>
                                    <Text color={"#667085"} textTransform={"lowercase"} fontWeight={"400"} fontSize={"11px"} >{email}</Text>

                                </Box>

                            </HStack>
                        </Td>
                        {/* <Td><Text color={"#667085"} textTransform={"capitalize"} fontWeight={"400"} fontSize={"13px"} >{schoolName}</Text></Td> */}
                        <Td><Text fontWeight="400" color={"#667085"} fontSize={"13px"}>{fieldOfStudy}</Text></Td>
                        <Td>
                            <HStack color={status === "APPROVED" ? "#027A48" : status === "PENDING" ? "#FFA30C" : "#FD4739"}>
                                <Box rounded="100%" w="8px" h="8px" bg={status === "APPROVED" ? "#027A48" : status === "PENDING" ? "#FFA30C" : "#FD4739"}></Box>
                                <Text fontWeight="400" fontSize={"13px"} >{status}</Text>
                            </HStack>
                        </Td>
                        <Td>

                            <Button isLoading={isLoading} onClick={onButtonClick} background={buttonText === "Reject" ? "white" : buttonText === "Unreject" ? "white" : "greenn.greenn400"} color={buttonText === "Reject" ? "greenn.greenn400" : buttonText === "Unreject" ? "greenn.greenn400" : "#fff"}>{buttonText}</Button>

                        </Td>
                    </>

                )
            }

            {
                type === "awaiting-funding" && (
                    <>
                        <Td fontSize="13px">
                            <Flex align="center">
                                <Avatar size="sm" name={name} mr={2} />
                                {name}
                            </Flex>
                        </Td>
                        <Td fontSize="13px">{school}</Td>
                        <Td fontSize="13px">{guardian}</Td>
                        <Td fontSize="13px">
                            <Box display="flex" flexDirection="column">
                                <Flex align="center" justify="space-between" w="full">
                                    <Text>{schoolBank}</Text>
                                    <IoMdOpen color="#97A89F" />
                                </Flex>

                                <Text fontSize="sm">Acc: {BankAcc}</Text>
                            </Box>
                        </Td>
                        <Td fontSize="13px">
                            <Box display="flex" flexDirection="column">
                                <Flex align="center" justify="space-between" w="full">
                                    <Text>{guardianBank}</Text>
                                    <IoMdOpen color="#97A89F" />
                                </Flex>

                                <Text fontSize="sm">Acc: {GuardianBankAcc}</Text>
                            </Box>
                        </Td>
                        <Td fontSize="13px">{tuition}</Td>
                        <Td>
                            <Menu isLazy>
                                <MenuButton as={Box}>

                                    <Flex justifyContent="center" color="#000000" fontSize="16px"><BsThreeDots /></Flex>
                                </MenuButton>
                                <MenuList >

                                    <MenuItem onClick={onClick} textTransform="capitalize" fontWeight={"500"} color='#2F2F2F' _hover={{ color: "#2F2F2F", fontWeight: "400", bg: "#E8FFF4" }}>
                                        <HStack fontSize="14px">

                                            <Text>Fund Account</Text>
                                        </HStack>
                                    </MenuItem>


                                </MenuList>
                            </Menu>
                        </Td>

                    </>
                )
            }
            {
                type === "funded-students" && (
                    <>
                        <Td fontSize="13px">
                            <Flex align="center">
                                <Avatar size="sm" name={name} mr={2} />
                                {name}
                            </Flex>
                        </Td>
                        <Td fontSize="13px">{school}</Td>
                        <Td fontSize="13px">{classLevel}</Td>
                        <Td fontSize="13px">{guardian}</Td>
                        <Td fontSize="13px">{tuition}</Td>
                        <Td fontSize="13px">
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
                        </Td>
                        <Td fontSize="13px">{stationary}</Td>
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

            {
                type === "super-admin-recent-disbursement" && (
                    <>
                        <Td fontSize="13px" fontWeight="500" color="#101828">{fundedStudents}</Td>
                        <Td fontSize="13px" fontWeight="400" color="#101828">{amount}</Td>
                        <Td fontSize="13px" fontWeight="400" color="#101828">{transactionId}</Td>
                        <Td fontSize="13px" fontWeight="400" color="#101828">{date}</Td>
                        <Td fontSize="13px" fontWeight="400" color="#101828">{paymentMethod}</Td>
                        <Td>
                            <HStack bg={status === "COMPLETED" ? "#ECFDF3" : status === "PENDING" ? "#FFA30C" : "#FD4739"} rounded="16px" py="2px" pl="6px" pr="8px">
                                <Text fontWeight="500" fontSize={"12px"} color={status === "COMPLETED" ? "#027A48" : status === "PENDING" ? "#FFA30C" : "#FD4739"}>{status}</Text>
                            </HStack>
                        </Td>
                    </>
                )
            }
            {
                type === "super-admin-transactions" && (
                    <>
                        <Td fontSize="13px" fontWeight="400" color="#101828">{transactionId}</Td>
                        <Td fontSize="13px" fontWeight="500" color="#101828">{user}</Td>
                        <Td fontSize="13px" fontWeight="500" color="#101828">{scholarship_name}</Td>
                        <Td fontSize="13px" fontWeight="400" color="#101828">{amount}</Td>
                        <Td fontSize="13px" fontWeight="500" color="#101828">{scholarship_cost}</Td>
                        <Td fontSize="13px" fontWeight="500" color="#101828">{reference}</Td>
                        <Td fontSize="13px" fontWeight="500" color="#101828">
                            <ReceiptModal receiptUrl={receipt} />
                        </Td>
                        <Td fontSize="13px" fontWeight="400" color="#101828">{date}</Td>

                        <Td>
                            <HStack
                                bg={
                                    status === "APPROVED"
                                        ? "#ECFDF3"
                                        : status === "PENDING"
                                            ? "#FFF4E5"
                                            : "#FEE2E2"
                                }
                                rounded="16px"
                                py="2px"
                                pl="6px"
                                pr="8px"
                            >
                                <Text
                                    fontWeight="500"
                                    fontSize="12px"
                                    color={
                                        status === "APPROVED"
                                            ? "#027A48"
                                            : status === "PENDING"
                                                ? "#B54708"
                                                : "#B42318"
                                    }
                                >
                                    {status}
                                </Text>
                            </HStack>
                        </Td>

                        {/* ✅ Pass callbacks from parent */}
                        <Td>
                            {status === "APPROVED" ? (
                                <Button
                                    size="sm"
                                    bg="#B42318"
                                    color="white"
                                    _hover={{ bg: "#91190F" }}
                                    isLoading={loading}
                                    onClick={() => onReject(transactionId)}
                                >
                                    Reject
                                </Button>
                            ) : status === "PENDING" ? (
                                <HStack spacing={3}>
                                    <Button
                                        size="sm"
                                        bg="#027A48"
                                        color="white"
                                        _hover={{ bg: "#035E3D" }}
                                        onClick={() => onApprove(transactionId)}
                                        isLoading={loading}
                                    >
                                        Approve
                                    </Button>
                                    <Button
                                        size="sm"
                                        bg="#B42318"
                                        color="white"
                                        _hover={{ bg: "#91190F" }}
                                        onClick={() => onReject(transactionId)}
                                    >
                                        Reject
                                    </Button>
                                </HStack>
                            ) : (
                                <Text color="#667085" fontSize="sm">
                                    <Button
                                        size="sm"
                                        bg="#027A48"
                                        color="white"
                                        _hover={{ bg: "#035E3D" }}
                                        onClick={() => onApprove(transactionId)}
                                        isLoading={loading}
                                    >
                                        Approve
                                    </Button>
                                </Text>
                            )}
                        </Td>

                    </>
                )
            }

            {
                type === "fund-request" && (
                    <>
                        <Td><Text color={"#101828"} fontWeight={"500"} fontSize={"13px"} >{name}</Text></Td>
                        <Td><Text color={"#101828"} textTransform={"capitalize"} fontWeight={"500"} fontSize={"13px"}>{amount}</Text></Td>


                        <Td><Text fontWeight="400" fontSize={"13px"} >{stationary}</Text></Td>
                        <Td><Text fontWeight="400" fontSize={"13px"}>{total}</Text></Td>
                        <Td><Text fontWeight="400" fontSize={"13px"}>{date}</Text></Td>
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
                type === "super-admin-schools" && (
                    <>
                        <Td onClick={() => { router("/super-admin-schools-profile") }}>
                            <HStack spacing={3}>
                                <Avatar name={name} size='sm' src='https://bit.ly/tioluwani-kolawole' />
                                <Box>
                                    <Text fontWeight="medium">{name}</Text>
                                    <Text fontSize="11px" color="gray.500">
                                        {email}
                                    </Text>
                                </Box>
                            </HStack>
                        </Td>
                        <Td fontSize="13px" fontWeight="400" color="#101828">{principal}</Td>
                        <Td fontSize="13px" fontWeight="400" color="#101828">{approvedStudents}</Td>
                        <Td fontSize="13px" fontWeight="400" color="#101828">{state}</Td>
                        <Td fontSize="13px" fontWeight="400" color="#101828">{city}</Td>
                        <Td fontSize="13px" fontWeight="400" color="#101828">{submissionDate}</Td>
                        <Td>
                            <Menu isLazy>
                                <MenuButton as={Box}>

                                    <Flex justifyContent="center" color="#000000" fontSize="16px"><BsThreeDots /></Flex>
                                </MenuButton>
                                <MenuList >

                                    <MenuItem onClick={onEdit} textTransform="capitalize" fontWeight={"500"} color='#2F2F2F' _hover={{ color: "#2F2F2F", fontWeight: "400", bg: "#E8FFF4" }}>
                                        <HStack fontSize="14px">

                                            <Text>View Profile</Text>
                                        </HStack>
                                    </MenuItem>
                                    <MenuItem onClick={() => handleOpenModal(studentIds)} textTransform="capitalize" fontWeight={"500"} _hover={{ color: "#2F2F2F", fontWeight: "400", bg: "#E8FFF4" }}>
                                        <HStack fontSize="14px">

                                            <Text >Remove School</Text>
                                        </HStack>
                                    </MenuItem>

                                </MenuList>
                            </Menu>
                        </Td>
                    </>
                )
            }

            {
                type === "super-admin-students" && (
                    <>
                        <Td onClick={() => { router("/super-admin-students-profile") }}>
                            <HStack spacing={3}>
                                <Avatar name={name} size='sm' src='https://bit.ly/tioluwani-kolawole' />
                                <Box>
                                    <Text fontWeight="medium">{name}</Text>
                                    <Text fontSize="11px" color="gray.500">
                                        {email}
                                    </Text>
                                </Box>
                            </HStack>
                        </Td>
                        <Td fontSize="13px" fontWeight="400" color="#101828">{schoolName}</Td>
                        <Td fontSize="13px" fontWeight="400" color="#101828">{essayScore}</Td>
                        <Td fontSize="13px" fontWeight="400" color="#101828">{fieldOfStudy}</Td>
                        <Td>
                            <Box
                                fontSize="12px"
                                fontWeight="bold"
                                bg={status === "PENDING" ? "#FFF7EB" : "#C0FFE1"}
                                borderRadius="16px"
                                p="4px 8px"
                                display="inline-flex"
                                alignItems="center"
                                ml="5px"
                                color={status === "PENDING" ? "#FFA30C" : "#027A48"}
                            >
                                <Icon as={GoDotFill} boxSize={3} mr={1} /> {status}
                            </Box>
                        </Td>
                        <Td>
                            <Menu isLazy>
                                <MenuButton as={Box}>

                                    <Flex justifyContent="center" color="#000000" fontSize="16px"><BsThreeDots /></Flex>
                                </MenuButton>
                                <MenuList >

                                    <MenuItem onClick={onEdit} textTransform="capitalize" fontWeight={"500"} color='#2F2F2F' _hover={{ color: "#2F2F2F", fontWeight: "400", bg: "#E8FFF4" }}>
                                        <HStack fontSize="14px">

                                            <Text>View Profile</Text>
                                        </HStack>
                                    </MenuItem>
                                    <MenuItem onClick={() => handleOpenModal(studentIds)} textTransform="capitalize" fontWeight={"500"} _hover={{ color: "#2F2F2F", fontWeight: "400", bg: "#E8FFF4" }}>
                                        <HStack fontSize="14px">

                                            <Text color="#FF4040" >Remove Student</Text>
                                        </HStack>
                                    </MenuItem>

                                </MenuList>
                            </Menu>
                        </Td>
                    </>
                )
            }

            {
                type === "super-admin-user-management" && (
                    <>
                        <Td onClick={() => { router("/super-admin-admin-profile") }}>
                            <HStack spacing={3}>
                                <Avatar name={name} size='sm' src='https://bit.ly/tioluwani-kolawole' />
                                <Box>
                                    <Text fontWeight="medium">{name}</Text>
                                    <Text fontSize="11px" color="gray.500">
                                        {email}
                                    </Text>
                                </Box>
                            </HStack>
                        </Td>
                        <Td fontSize="13px" fontWeight="400" color="#101828">{schoolName}</Td>
                        <Td fontSize="13px" fontWeight="400" color="#101828">{city}</Td>
                        <Td fontSize="13px" fontWeight="400" color="#101828">{state}</Td>
                        <Td>
                            <Box
                                fontSize="12px"
                                fontWeight="500"
                                bg="#ECFDF3"
                                borderRadius="16px"
                                p="2px 8px"
                                display="inline-flex"
                                alignItems="center"
                                ml="5px"
                                color="#027A48"
                            >
                                <Icon as={GoDotFill} boxSize={3} mr={1} /> {status}
                            </Box>
                        </Td>
                        <Td fontSize="13px" fontWeight="400" color="#101828">{date}</Td>
                        <Td>
                            <Menu isLazy>
                                <MenuButton as={Box}>

                                    <Flex justifyContent="center" color="#000000" fontSize="16px"><BsThreeDots /></Flex>
                                </MenuButton>
                                <MenuList >

                                    <MenuItem onClick={onEdit} textTransform="capitalize" fontWeight={"500"} color='#2F2F2F' _hover={{ color: "#2F2F2F", fontWeight: "400", bg: "#E8FFF4" }}>
                                        <HStack fontSize="14px">

                                            <Text>View Profile</Text>
                                        </HStack>
                                    </MenuItem>
                                    <MenuItem onClick={() => handleOpenModal(studentIds)} textTransform="capitalize" fontWeight={"500"} _hover={{ color: "#2F2F2F", fontWeight: "400", bg: "#E8FFF4" }}>
                                        <HStack fontSize="14px">

                                            <Text color="#FF4040" >Remove Student</Text>
                                        </HStack>
                                    </MenuItem>

                                </MenuList>
                            </Menu>
                        </Td>
                    </>
                )
            }
            {
                type === "super-admin-scholarship" && (
                    <>
                        <Td onClick={() => { router("/super-admin-admin-profile") }}>
                            <HStack spacing={3}>
                                <Avatar name={name} size='sm' src='https://bit.ly/tioluwani-kolawole' />
                                <Box>
                                    <Text fontWeight="medium">{name}</Text>
                                    <Text fontSize="11px" color="gray.500">
                                        {email}
                                    </Text>
                                </Box>
                            </HStack>
                        </Td>
                        <Td fontSize="13px" fontWeight="400" color="#101828">{approvedStudents}</Td>
                        <Td fontSize="13px" fontWeight="400" color="#101828">{approvedSchools}</Td>
                        <Td fontSize="13px" fontWeight="400" color="#101828">{city}</Td>
                        <Td fontSize="13px" fontWeight="400" color="#101828">{state}</Td>
                        <Td>
                            <Box
                                fontSize="12px"
                                fontWeight="500"
                                bg="#ECFDF3"
                                borderRadius="16px"
                                p="2px 8px"
                                display="inline-flex"
                                alignItems="center"
                                ml="5px"
                                color="#027A48"
                            >
                                <Icon as={GoDotFill} boxSize={3} mr={1} /> {status}
                            </Box>
                        </Td>
                        <Td fontSize="13px" fontWeight="400" color="#101828">{date}</Td>
                        <Td>
                            <Menu isLazy>
                                <MenuButton as={Box}>

                                    <Flex justifyContent="center" color="#000000" fontSize="16px"><BsThreeDots /></Flex>
                                </MenuButton>
                                <MenuList >

                                    <MenuItem onClick={onEdit} textTransform="capitalize" fontWeight={"500"} color='#2F2F2F' _hover={{ color: "#2F2F2F", fontWeight: "400", bg: "#E8FFF4" }}>
                                        <HStack fontSize="14px">

                                            <Text>View Profile</Text>
                                        </HStack>
                                    </MenuItem>
                                    <MenuItem onClick={() => handleOpenModal(studentIds)} textTransform="capitalize" fontWeight={"500"} _hover={{ color: "#2F2F2F", fontWeight: "400", bg: "#E8FFF4" }}>
                                        <HStack fontSize="14px">

                                            <Text color="#FF4040" >Remove Student</Text>
                                        </HStack>
                                    </MenuItem>

                                </MenuList>
                            </Menu>
                        </Td>
                    </>
                )
            }

            {
                type === "super-admin-sponsor" && (
                    <>
                        <Td onClick={() => { router("/super-admin-admin-profile") }}>
                            <HStack spacing={3}>
                                <Avatar name={name} size='sm' src='https://bit.ly/tioluwani-kolawole' />
                                <Box>
                                    <Text fontWeight="medium">{name}</Text>
                                    <Text fontSize="11px" color="gray.500">
                                        {email}
                                    </Text>
                                </Box>
                            </HStack>
                        </Td>
                        <Td fontSize="13px" fontWeight="400" color="#101828">{scholarshipsCreated}</Td>
                        <Td fontSize="13px" fontWeight="400" color="#101828">{fundedScholarships}</Td>
                        <Td fontSize="13px" fontWeight="400" color="#101828">{studentsFunded}</Td>
                        <Td fontSize="13px" fontWeight="400" color="#101828">{city}</Td>
                        <Td fontSize="13px" fontWeight="400" color="#101828">{state}</Td>
                        <Td>
                            <Box
                                fontSize="12px"
                                fontWeight="500"
                                bg="#ECFDF3"
                                borderRadius="16px"
                                p="2px 8px"
                                display="inline-flex"
                                alignItems="center"
                                ml="5px"
                                color="#027A48"
                            >
                                <Icon as={GoDotFill} boxSize={3} mr={1} /> {status}
                            </Box>
                        </Td>
                        <Td fontSize="13px" fontWeight="400" color="#101828">{date}</Td>
                        <Td>
                            <Menu isLazy>
                                <MenuButton as={Box}>

                                    <Flex justifyContent="center" color="#000000" fontSize="16px"><BsThreeDots /></Flex>
                                </MenuButton>
                                <MenuList >

                                    <MenuItem onClick={onEdit} textTransform="capitalize" fontWeight={"500"} color='#2F2F2F' _hover={{ color: "#2F2F2F", fontWeight: "400", bg: "#E8FFF4" }}>
                                        <HStack fontSize="14px">

                                            <Text>View Profile</Text>
                                        </HStack>
                                    </MenuItem>
                                    <MenuItem onClick={() => handleOpenModal(studentIds)} textTransform="capitalize" fontWeight={"500"} _hover={{ color: "#2F2F2F", fontWeight: "400", bg: "#E8FFF4" }}>
                                        <HStack fontSize="14px">

                                            <Text color="#FF4040" >Remove Student</Text>
                                        </HStack>
                                    </MenuItem>

                                </MenuList>
                            </Menu>
                        </Td>
                    </>
                )
            }
            {
                type === "super-admin-fund" && (
                    <>
                        <Td onClick={() => { router("/super-admin-admin-profile") }}>
                            <HStack spacing={3}>
                                <Avatar name={name} size='sm' src='https://bit.ly/tioluwani-kolawole' />
                                <Box>
                                    <Text fontWeight="medium">{name}</Text>
                                    <Text fontSize="11px" color="gray.500">
                                        {email}
                                    </Text>
                                </Box>
                            </HStack>
                        </Td>
                        <Td fontSize="13px" fontWeight="400" color="#101828">{studentsFunded}</Td>
                        <Td fontSize="13px" fontWeight="400" color="#101828">{city}</Td>
                        <Td fontSize="13px" fontWeight="400" color="#101828">{state}</Td>
                        <Td>
                            <Box
                                fontSize="12px"
                                fontWeight="500"
                                bg="#ECFDF3"
                                borderRadius="16px"
                                p="2px 8px"
                                display="inline-flex"
                                alignItems="center"
                                ml="5px"
                                color="#027A48"
                            >
                                <Icon as={GoDotFill} boxSize={3} mr={1} /> {status}
                            </Box>
                        </Td>
                        <Td fontSize="13px" fontWeight="400" color="#101828">{date}</Td>
                        <Td>
                            <Menu isLazy>
                                <MenuButton as={Box}>

                                    <Flex justifyContent="center" color="#000000" fontSize="16px"><BsThreeDots /></Flex>
                                </MenuButton>
                                <MenuList >

                                    <MenuItem onClick={onEdit} textTransform="capitalize" fontWeight={"500"} color='#2F2F2F' _hover={{ color: "#2F2F2F", fontWeight: "400", bg: "#E8FFF4" }}>
                                        <HStack fontSize="14px">

                                            <Text>View Profile</Text>
                                        </HStack>
                                    </MenuItem>
                                    <MenuItem onClick={() => handleOpenModal(studentIds)} textTransform="capitalize" fontWeight={"500"} _hover={{ color: "#2F2F2F", fontWeight: "400", bg: "#E8FFF4" }}>
                                        <HStack fontSize="14px">

                                            <Text color="#FF4040" >Remove Student</Text>
                                        </HStack>
                                    </MenuItem>

                                </MenuList>
                            </Menu>
                        </Td>
                    </>
                )
            }
        </Tr>
    )
}
