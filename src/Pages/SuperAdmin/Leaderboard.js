import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import MainLayout from '../../DashboardLayout'
import { Bar, BarChart, CartesianGrid, Legend, XAxis, YAxis, LineChart, Line, Tooltip, ResponsiveContainer, } from 'recharts'
import {
  Text, Flex, HStack, Box,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Grid,
  SimpleGrid,
  Image,
  Spacer,
  useColorModeValue,
  grid,
  Icon
} from '@chakra-ui/react'
import { FiTrendingUp } from 'react-icons/fi';
import { Tooltip as Tooltips } from '@chakra-ui/react';
import DashboardCard from "../../Components/DashboardCard"
import Button from "../../Components/Button"
import priceBg from "../../Asset/priceBg.png"
import leftBg from "../../Asset/priceBg2.png"
import { HiOutlineUsers } from 'react-icons/hi'
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { RxTimer } from "react-icons/rx";
import { MdOutlineCancel } from 'react-icons/md'
import { IoInformationCircleOutline, IoArrowForward } from "react-icons/io5";
import { GoArrowDown } from "react-icons/go";
import { BiSearch } from "react-icons/bi";
import Pagination from "../../Components/Pagination";
import RemoveNotification from "../../Components/RemoveNotification"
import { FaCalendarAlt, FaSchool } from "react-icons/fa";
import TableRow from "../../Components/TableRow"
import { CgSearch } from "react-icons/cg";
import { configuration } from "../../Utils/Helpers";
import { IoFilter } from "react-icons/io5";
import { GetScholarshipAdminLeaderboardApi } from "../../Utils/ApiCall";
import moment from "moment";
import ShowToast from "../../Components/ToastNotification"
import Preloader from "../../Components/Preloader"

import scholarshipImage8 from "../../Asset/goldIcon.svg"
import { ReactComponent as Sarah } from '../../Asset/sarah.svg';

import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  TableContainer,
  useDisclosure,
  Input,
  Stack,
  Avatar,
  MenuList,
  MenuItem,
  MenuButton,
  Menu,
  ModalOverlay,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
} from '@chakra-ui/react'


export default function Leaderboard() {

  const [loading, setLoading] = useState(true);
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [error, setError] = useState(true);

  const fetchSchoolAdminLeaderboard = async () => {
    try {
      const response = await GetScholarshipAdminLeaderboardApi();
      console.log("info", response);
      setLeaderboardData(response.data.stats || []);
      setLoading(false);
    } catch (err) {
      setError(err.message || "Failed to fetch school admin leaderboard");
      setLoading(false);
    }
  };

  const randomAvatarUrl = `https://i.pravatar.cc/300?img=${Math.floor(Math.random() * 70) + 1}`;

  const [isLoading, setIsLoading] = useState(false);
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')

  useEffect(() => {
    fetchSchoolAdminLeaderboard();
    const storedName = JSON.parse(localStorage.getItem('onlineUser'));
    if (storedName) {
      setFirstName(`${storedName.firstName}`);
      setLastName(`${storedName.lastName}`);
    }
  }, []);


  if (isLoading) {
    return (<Preloader />)
  }


  return (

    <Box
      bg="white"
      rounded="10px"
      borderWidth="1px"
      h={{ base: "auto", md: "425px" }}
      maxH="425px"
      overflowY="scroll"
      py="21px"
      px="22px"
      w={{ base: "100%", lg: "50%" }}
      flex="1"
    >

      <Stack spacing="10px">
        <HStack justifyContent="space-between" flexWrap="wrap">
          <Text color="#3F4956" fontSize="15px" fontWeight="600">
            Scholarship Admin Leaderboard
          </Text>
          <Text color="#3F4956" fontSize="15px" fontWeight="600">
            Schools Verified
          </Text>
        </HStack>

        <hr className="remove" />

        {leaderboardData.length > 0 ? (
          leaderboardData.map((admin, index) => (
            <HStack
              key={index}
              justifyContent="space-between"
              rounded="10px"
              borderWidth="1px"
              py="21px"
              px="22px"
              bg={admin.name === firstName && admin.lastName === lastName ? "#B9FADB" : "transparent"}
              flexWrap="wrap"
            >
              <HStack spacing={2} flexWrap="wrap">
                {/* Rank */}
                <Text color="#194B33" fontSize="12px" fontWeight="500">
                  {index + 1}
                </Text>

                {/* Avatar */}
                <Avatar
                  size="sm"
                  name={`${admin.name} ${admin.lastName}`}
                  src={admin.picture}
                />

                {/* Name */}
                <Text color="#101828" fontSize="13px" fontWeight="500">
                  {admin.name} {admin.lastName}
                </Text>

                {/* Tag (You) */}
                {admin.name === firstName && admin.lastName === lastName && (
                  <Text color="#1018286B" fontSize="13px" fontWeight="500">(You)</Text>
                )}

                {/* Medal icon for top 3 or self */}
                {(index < 3 || (admin.name === firstName && admin.lastName === lastName)) && (
                  <Image
                    src={scholarshipImage8}
                    w="23.59px"
                    h="33px"
                    objectFit="contain"
                  />
                )}
              </HStack>

              {/* Total Schools */}
              <Text
                color="#194B33"
                fontSize="18px"
                fontWeight="600"
                fontFamily="Clash Display"
              >
                {admin.totalSchools}
              </Text>
            </HStack>
          ))
        ) : (
          <Text fontSize="14px" color="gray.500">No data available</Text>
        )}
      </Stack>

    </Box>

  )
}
