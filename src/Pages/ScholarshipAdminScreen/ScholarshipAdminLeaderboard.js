import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import MainLayout from '../../DashboardLayout'
import { Text, Flex, HStack, VStack, Box, Center, Progress, Icon, Avatar, Image, Stack } from '@chakra-ui/react'
import { Tooltip as Tooltips } from '@chakra-ui/react';
import DashboardCard from "../../Components/DashboardCard"
import { ReactComponent as NextArrow } from '../../Asset/nextArrow.svg';
import { ReactComponent as Sarah } from '../../Asset/sarah.svg';
import Button from "../../Components/Button"
import { HiOutlineUsers } from 'react-icons/hi'
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { MdOutlineCancel } from 'react-icons/md'
import { IoChevronBackOutline, IoInformationCircleOutline } from "react-icons/io5";
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

export default function ScholarshipAdminLeaderboard() {
  const router = useNavigate();
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')

  useEffect(() => {

    const storedName = JSON.parse(localStorage.getItem('onlineUser'));
    if (storedName) {
      setFirstName(`${storedName.firstName}`);
      setLastName(`${storedName.lastName}`);
    }
  }, []);
  return (
    <MainLayout>
               <Flex justifyContent="space-between" flexWrap="wrap">
        <HStack spacing="10px">
          <Text
            cursor="pointer"
            _hover={{ fontWeight: '500' }}
            color="#626974"
            fontSize="13px"
            fontWeight="400"
            onClick={() => {
              router('/scholarship-admin');
            }}
          >
            Overview
          </Text>
          <NextArrow />
          <Text
            cursor="pointer"
            color="#1F2937"
            fontSize="13px"
            fontWeight="500"
            onClick={() => {
              router('/scholarship-admin/scholarship-admin-leaderboard');
            }}
          >
            Leaderboard
          </Text>
        </HStack>

        <HStack fontSize="14px" fontWeight="600" spacing="10px" cursor="pointer" onClick={() => router('/scholarship-admin')}>
          <IoChevronBackOutline />
          <Text>Back</Text>
        </HStack>
      </Flex>


<Flex
        w={"1,125px"}
        // h={"101px"}
        mt="30px"
        background="linear-gradient(90.1deg, #18AB91 0.09%, #BCDC60 60.15%, #FFBC4F 101.02%)"
        borderRadius="10px"
        p={"13px 19px 13px 19px"}
        justifyContent="space-between"
        gap={"0px"}
        flexWrap={["wrap", "wrap", "nowrap", "nowrap"]}
        position={"relative"}
        overflow={"visible"}
        opacity={"0px"}>
        <Box w={"356px"} h={"65.18px"} gap={"11px"} opacity={"0px"}>
          <Flex align="center" mb={2}>
            <Icon as={FaGoogleScholar} color="yellow.500" boxSize={5} mr={2} />
            <Text fontWeight="600" fontSize={"18px"} lineHeight={"24px"} textAlign={"left"} letterSpacing={"-0.02em"} color="#FFFFFF">Scholarship Admin Leaderboard</Text>

          </Flex>
          <Box


            bg="#03493D54" cursor={"pointer"} width={"356px"} opacity={"0px"} height={"26px"} padding={"6px 6px"} gap="12px" borderRadius={"6px"}>
            <Flex align="center" justify="space-between">
              <Progress

                value={80}
                gap={"0px"}
                opacity={"0px"}
                height="6px"
                width="199px"
                borderRadius="2px 2px"
                sx={{
                  "& > div": {
                    backgroundColor: "#42ED9B",
                  }, backgroundColor: "#FAFFFD4A",

                }}
              />
              <Text fontSize="14px" color="#ffffff" textAlign={"center"} weight={"500"} lineHeight={"16.94px"} letterSpacing="-3%" >5 Schools to Rank #3</Text>
            </Flex>
          </Box>
        </Box>
        <Box
          bg="#FFFFFF"
          width={"363.99px"}
          height={"44px"}

          gap="10px"
          borderRadius="7px"
          opacity="0px"
          padding={{ left: 13, right: 13 }}
          mt={"14px"}

        >


          <Flex align="center" m={"8px"} gap={"11px"} >
            <Image src={scholarshipImage8} w={"23.59px"}
              h={"33px"} gap={"0"} />
            <Text fontSize="15px" color=" #194B33"
              fontWeight="600" textAlign={"left"} letterSpacing={"-0.03em"}
              lineHeight="18.15px">Super Volunteer
            </Text>
            <Box width="0px" opacity={"0px"} height={"11.5px"} gap={"0px"} border={"1px solid #194B3380"} />
            <Text fontSize="15px" color=" #194B33"
              fontWeight="600" textAlign={"left"} letterSpacing={"-0.25px"}
              lineHeight="18.15px">Schools Verified: <Text as={"span"} fontSize="15px" fontWeight="600" textAlign={"left"} letterSpacing={"-0.25px"}
                lineHeight="18.45px">  24</Text>


            </Text>
          </Flex>
        </Box>

      </Flex>

      <Box bg="white" rounded="10px" borderWidth="1px" py="21px" px="22px" mt="10px">
        <Stack spacing="10px">
          <HStack justifyContent="space-between">
          <Text color="#3F4956" fontSize="15px" fontWeight="600">Leaderboard</Text>
          <Text color="#3F4956" fontSize="15px" fontWeight="600">Schools Verified</Text>
          </HStack>

          <hr className="remove"/>

      <HStack justifyContent="space-between" rounded="10px" borderWidth="1px" py="21px" px="22px">
        <HStack>
          <Text color="#194B33" fontSize="12px" fontWeight="500">1</Text>
          <Sarah />
          <Text color="#101828" fontSize="13px" fontWeight="500">Sarah Divine</Text>
          <Image src={scholarshipImage8} w={"23.59px"}
              h={"33px"} gap={"0"} />
        </HStack>


        <Text color="#194B33" fontSize="18px" fontWeight="600" fontFamily="Clash Display">178</Text>
      </HStack>

      <HStack justifyContent="space-between" rounded="10px" borderWidth="1px" py="21px" px="22px">
        <HStack>
          <Text color="#194B33" fontSize="12px" fontWeight="500">2</Text>
          <Avatar name="Elizabeth Nwosu" size="sm" />
          <Text color="#101828" fontSize="13px" fontWeight="500">Elizabeth Nwosu</Text>
          <Image src={scholarshipImage8} w={"23.59px"}
              h={"33px"} gap={"0"} />
        </HStack>


        <Text color="#194B33" fontSize="18px" fontWeight="600" fontFamily="Clash Display">120</Text>
      </HStack>

      <HStack justifyContent="space-between" rounded="10px" borderWidth="1px" py="21px" px="22px">
        <HStack>
          <Text color="#194B33" fontSize="12px" fontWeight="500">3</Text>
          <Avatar name="John Orgi" size="sm" />
          <Text color="#101828" fontSize="13px" fontWeight="500">John Orgi</Text>
          <Image src={scholarshipImage8} w={"23.59px"}
              h={"33px"} gap={"0"} />
        </HStack>


        <Text color="#194B33" fontSize="18px" fontWeight="600" fontFamily="Clash Display">60</Text>
      </HStack>

      <HStack bg="#B9FADB" justifyContent="space-between" rounded="10px" borderWidth="1px" py="21px" px="22px">
        <HStack>
          <Text color="#194B33" fontSize="12px" fontWeight="500">4</Text>
          <Avatar name={`${firstName} ${lastName}`} size="sm" />
          <Text color="#101828" fontSize="13px" fontWeight="500">{firstName} {lastName}</Text>
          <Text color="#1018286B" fontSize="13px" fontWeight="500">(You)</Text>
        </HStack>


        <Text color="#194B33" fontSize="18px" fontWeight="600" fontFamily="Clash Display">24</Text>
      </HStack>

      <HStack justifyContent="space-between" rounded="10px" borderWidth="1px" py="21px" px="22px">
        <HStack>
          <Text color="#194B33" fontSize="12px" fontWeight="500">5</Text>
          <Avatar name="Hannah Illesanmi" size="sm" />
          <Text color="#101828" fontSize="13px" fontWeight="500">Hannah Illesanmi</Text>
        </HStack>


        <Text color="#194B33" fontSize="18px" fontWeight="600" fontFamily="Clash Display">17</Text>
      </HStack>

      <HStack justifyContent="space-between" rounded="10px" borderWidth="1px" py="21px" px="22px">
        <HStack>
          <Text color="#194B33" fontSize="12px" fontWeight="500">6</Text>
          <Avatar name="James Anigbobu" size="sm" />
          <Text color="#101828" fontSize="13px" fontWeight="500">James Anigbogu</Text>
        </HStack>


        <Text color="#194B33" fontSize="18px" fontWeight="600" fontFamily="Clash Display">10</Text>
      </HStack>

      <HStack justifyContent="space-between" rounded="10px" borderWidth="1px" py="21px" px="22px">
        <HStack>
          <Text color="#194B33" fontSize="12px" fontWeight="500">7</Text>
          <Avatar name="Naomi Obiano" size="sm" />
          <Text color="#101828" fontSize="13px" fontWeight="500">Naomi Obiano</Text>
        </HStack>


        <Text color="#194B33" fontSize="18px" fontWeight="600" fontFamily="Clash Display">178</Text>
      </HStack>
        </Stack>
      </Box>


    </MainLayout>
    )
}