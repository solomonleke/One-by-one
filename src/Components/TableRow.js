import { Box, Flex, HStack, Avatar, Text,Menu, MenuButton, MenuList, MenuItem, useDisclosure,   } from '@chakra-ui/react'
import {

    Tr,
    Td,

} from '@chakra-ui/react';
import { BsThreeDots } from "react-icons/bs"
import { useNavigate } from 'react-router-dom'

export default function TableRow({ type, name, email, department, classLevel, fieldOfStudy, status, onEdit, onRemove }) {
    const router = useNavigate()
    return (

        <Tr textTransform="capitalize" cursor="pointer">
            {
                type === "school-admin" && (
                    <>
                    <Td onClick={() => {router("/school-admin/student-management/student-profile")}}>
                        <HStack cursor={"pointer"}>
                            <Avatar name={name} size='sm' src='https://bit.ly/tioluwani-kolawole' />
                            <Box>
                            <Text color={"#101828"} fontWeight={"500"} fontSize={"13px"} >{name}</Text>
                            <Text color={"#667085"} textTransform={"lowercase"} fontWeight={"400"} fontSize={"11px"} >{email}</Text>

                            </Box>
                          
                        </HStack>
                    </Td>
                    <Td><Text fontWeight="400" fontSize={"13px"}  textTransform={"capitalize"} color={department === "arts" ? "#2936e4": department === "commercial" ? "#a529e4": "#29e4c1"  }>{department}</Text></Td>
                    <Td><Text fontWeight="400" fontSize={"13px"} >{classLevel}</Text></Td>
                    <Td><Text fontWeight="400" fontSize={"13px"}>{fieldOfStudy}</Text></Td>
                    <Td>
                        <HStack color={status === "approved" ? "#027A48": status === "pending" ? "#FFA30C": "#FD4739"}>
                            <Box rounded="100%" w="8px" h="8px" bg={status === "approved" ? "#027A48": status === "pending" ? "#FFA30C": "#FD4739"}></Box>
                            <Text fontWeight="400" fontSize={"13px"} >{status}</Text>
                        </HStack>
                    </Td>
                    <Td> <Menu isLazy>
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
                        </Menu></Td>
                    </>
                 
                )
            }

            {
                type === "table2" && (
                    <>
                        <Td>sds</Td>
                        <Td>dsd</Td>
                        <Td>dsds</Td>
                        <Td>dsd</Td>
                        <Td>sd</Td>
                        <Td>ds</Td>
                    </>
                )
            }
        </Tr>
    )
}
