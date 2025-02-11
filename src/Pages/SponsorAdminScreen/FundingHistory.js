import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import MainLayout from '../../DashboardLayout'
import { Text, Flex, HStack, VStack, Box, Center, Progress, Icon, Avatar, Image } from '@chakra-ui/react'
import { Tooltip as Tooltips } from '@chakra-ui/react';
import DashboardCard from "../../Components/DashboardCard"
import Button from "../../Components/Button"
import { HiOutlineUsers } from 'react-icons/hi'
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { MdOutlineCancel } from 'react-icons/md'
import { IoInformationCircleOutline } from "react-icons/io5";
import { GoArrowDown } from "react-icons/go";
import { Bar, BarChart, CartesianGrid, Label, Legend, Line, ResponsiveContainer, Pie, PieChart, Tooltip, XAxis, YAxis, LineChart } from 'recharts'
import TableRow from "../../Components/TableRow"
import { CgSearch } from "react-icons/cg";
import { IoFilter } from "react-icons/io5";
import { FaUserGraduate } from "react-icons/fa6";
import { TbCurrencyNaira } from "react-icons/tb";
import { FaSchoolFlag } from "react-icons/fa6";
import { FaGoogleScholar } from "react-icons/fa6";
import { FaCheck } from "react-icons/fa6";
import { IoIosArrowRoundForward } from "react-icons/io";
import { IoCloseOutline } from "react-icons/io5";
import { LiaAngleDoubleRightSolid } from "react-icons/lia";
import { RxInfoCircled } from "react-icons/rx";

import scholarshipImage from "../../Asset/image1.png"
import scholarshipImage2 from "../../Asset/Image2.png"
import scholarshipImage3 from "../../Asset/Image3.png"
import scholarshipImage4 from "../../Asset/Image4.png"
import scholarshipImage5 from "../../Asset/Image5.png"
import scholarshipImage6 from "../../Asset/Image6.png"
import scholarshipImage7 from "../../Asset/Image7.png"
import scholarshipImage8 from "../../Asset/goldIcon.svg"

import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from '@chakra-ui/react'


export default function FundingHistory() {
    return(
        <MainLayout>
                           <Text fontSize={"21px"} lineHeight={"25.41px"} fontWeight="700">Funding History</Text>
                           <Text mt="9px" color={"#686C75"} fontWeight={"400"} fontSize={"15px"} mb={5} gap={"9px"} lineHeight={"24px"}>Keep track of your financial contributions with detailed records. Review past transactions, monitor disbursements, and ensure your impact is well-documented.</Text>

                           <Box mt="12px" bg="white" borderWidth="1px" rounded="10px" pt="20px" pb="32px" px="24px">
                            <Box rounded="7px" borderWidth="1px" p="15px">
                                <HStack bg="#F9FAFB" w="100%" py="10px">
                                    <Box w="15%" color="#2F2F2F" fontSize="13px" fontWeight="500">Date</Box>
                                    <Box w="20%" color="#2F2F2F" fontSize="13px" fontWeight="500">Funded Students</Box>
                                    <Box w="20%" color="#2F2F2F" fontSize="13px" fontWeight="500">Amount</Box>
                                    <Box w="15%" color="#2F2F2F" fontSize="13px" fontWeight="500">Payment Method</Box>
                                    <Box w="15%" color="#2F2F2F" fontSize="13px" fontWeight="500">Status</Box>
                                    <Box w="15%" color="#2F2F2F" fontSize="13px" fontWeight="500">Transaction ID</Box>
                                </HStack>
                                <hr className="remove"/>
                                <HStack w="100%" py="20px">
                                    <Box w="15%" color="#101828" fontSize="13px" fontWeight="400">Jan 15, 2025</Box>
                                    <Box w="20%" color="#101828" fontSize="13px" fontWeight="500">
                                        <HStack>
                                            <Box color="#101828" fontSize="13px" fontWeight="500" cursor="pointer" bg="#E8F2ED" rounded="31px" p="11px">Philip Amakiri</Box>
                                            <Box color="#101828" fontSize="13px" fontWeight="500" cursor="pointer" bg="#E8F2ED" rounded="31px" p="11px">+2</Box>
                                        </HStack>
                                    </Box>
                                    <Box w="20%" color="#101828" fontSize="13px" fontWeight="400">₦100,000.00</Box>
                                    <Box w="15%" color="#101828" fontSize="13px" fontWeight="400">Bank Transfer</Box>
                                    <Box w="15%" color="#2F2F2F" fontSize="13px" fontWeight="500"><HStack py="2px" rounded="16px" px="6px">
                <Box w="8px" h="8px" bg="#FFA30C" rounded="full"></Box>
                <Text fontSize="12px" fontWeight="500" color="#FFA30C">Pending</Text>
              </HStack></Box>
                                    <Box w="15%" color="#101828" fontSize="13px" fontWeight="400">TX123456789</Box>
                                </HStack>
                                <hr className="remove"/>
                                <HStack w="100%" py="20px">
                                    <Box w="15%" color="#101828" fontSize="13px" fontWeight="400">Jan 15, 2025</Box>
                                    <Box w="20%" color="#101828" fontSize="13px" fontWeight="500">
                                        <HStack>
                                            <Box color="#101828" fontSize="13px" fontWeight="500" cursor="pointer" bg="#E8F2ED" rounded="31px" p="11px">Solomon Adeleke</Box>
                                        </HStack>
                                    </Box>
                                    <Box w="20%" color="#101828" fontSize="13px" fontWeight="400">₦50,000.00</Box>
                                    <Box w="15%" color="#101828" fontSize="13px" fontWeight="400">Debit Card</Box>
                                    <Box w="15%" color="#2F2F2F" fontSize="13px" fontWeight="500"><HStack py="2px" rounded="16px" px="6px">
                <Box w="8px" h="8px" bg="#027A48" rounded="full"></Box>
                <Text fontSize="12px" fontWeight="500" color="#027A48">Completed</Text>
              </HStack></Box>
                                    <Box w="15%" color="#101828" fontSize="13px" fontWeight="400">TX987654321</Box>
                                </HStack>
                                <hr className="remove" />
                                <HStack w="100%" py="20px">
                                    <Box w="15%" color="#101828" fontSize="13px" fontWeight="400">Jan 15, 2025</Box>
                                    <Box w="20%" color="#101828" fontSize="13px" fontWeight="500">
                                        <HStack>
                                            <Box color="#101828" fontSize="13px" fontWeight="500" cursor="pointer" bg="#E8F2ED" rounded="31px" p="11px">Saviour Promise</Box>
                                        </HStack>
                                    </Box>
                                    <Box w="20%" color="#101828" fontSize="13px" fontWeight="400">₦50,000.00</Box>
                                    <Box w="15%" color="#101828" fontSize="13px" fontWeight="400">Bank Transfer</Box>
                                    <Box w="15%" color="#2F2F2F" fontSize="13px" fontWeight="500"><HStack py="2px" rounded="16px" px="6px">
                <Box w="8px" h="8px" bg="#027A48" rounded="full"></Box>
                <Text fontSize="12px" fontWeight="500" color="#027A48">Completed</Text>
              </HStack></Box>
                                    <Box w="15%" color="#101828" fontSize="13px" fontWeight="400">TX456789123</Box>
                                </HStack>
                            </Box>
                           </Box>
        </MainLayout>
    )
}