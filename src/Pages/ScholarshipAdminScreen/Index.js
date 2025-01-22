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


export default function ScholarshipAdmin() {



  const schools = [
    {
      name: "Legendary Scholars Academy", email: "legendaryscholarsacademy@gmail.com",
      Image: scholarshipImage
    },
    { name: "Queen's College", email: "QueenSCollege@gmail.com", Image: scholarshipImage2 },
    { name: "Federal Government College", email: "FederalGovernmentCollege@gmail.com", Image: scholarshipImage3 },
    { name: "Mayflower School", email: "MayflowerSchool@gmail.com", Image: scholarshipImage4 },
    { name: "Chrisland College", email: "ChrislandCollege@gmail.com", Image: scholarshipImage5 },
    { name: "Christ the King College", email: "ChristtheKingCollege@gmail.com", Image: scholarshipImage6 },
    { name: "Corona Secondary School", email: "CoronaSecondarySchool@gmail.com", Image: scholarshipImage7 }
  ];

  const students = [
    { name: "Philip Amaki", email: "philipamaki@gmail.com" },
    { name: "David Folarin", email: "DavidFolarin@gmail.com" },
    { name: "Timothy Salisu", email: "TimothySalisu@gmail.com" },
    { name: "Peter Usman", email: "PeterUsman@gmail.com" },
    { name: "Esther Wakili", email: "EstherWakili@gmail.com" },
    { name: "Simon Ogan", email: "SimonOgan@gmail.com" },
    { name: "Philip Amakiri", email: "PhilipAmakiri@gmail.com" }
  ];

  const data = [
    { name: "Jan", Schools: 200, Students: 150, Funds: 90 },
    { name: "Feb", Schools: 190, Students: 145, Funds: 95 },
    { name: "Mar", Schools: 180, Students: 160, Funds: 92 },
    { name: "Apr", Schools: 210, Students: 155, Funds: 88 },
    { name: "May", Schools: 195, Students: 150, Funds: 87 },
    { name: "Jun", Schools: 185, Students: 170, Funds: 90 },
    { name: "Jul", Schools: 200, Students: 165, Funds: 93 },
    { name: "Aug", Schools: 190, Students: 150, Funds: 89 },
    { name: "Sep", Schools: 200, Students: 160, Funds: 92 },
    { name: "Oct", Schools: 205, Students: 170, Funds: 94 },
    { name: "Nov", Schools: 190, Students: 150, Funds: 88 },
    { name: "Dec", Schools: 200, Students: 160, Funds: 90 },

  ];

  const [userName, setUserName] = useState('');

  useEffect(() => {
    var reloadCount = localStorage.getItem("reloadCount");
    if (!reloadCount) {
      localStorage.setItem('reloadCount', + parseInt(1))

    }
    if (reloadCount < 2) {
      localStorage.setItem('reloadCount', parseInt(reloadCount) + 1);
      setTimeout(() =>
        window.location.reload(1), 2000)
    } else {
      localStorage.removeItem('reloadCount');
    }

    const storedName = JSON.parse(localStorage.getItem('onlineUser'));
    if (storedName) {
      setUserName(`${storedName.firstName}`);
    }
  }, []);

  return (
    <MainLayout>

      <Text fontSize={"21px"} lineHeight={"25.41px"} fontWeight="700">Welcome Back, {userName || "User"}!</Text>
      <Text mt="9px" color={"#686C75"} fontWeight={"400"} fontSize={"15px"} mb={5} gap={"9px"} lineHeight={"24px"}>Review and approve schools, students, and fund requests to drive meaningful impact.</Text>

      <Flex
        w={"1,125px"}
        // h={"101px"}
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
              lineHeight="18.15px">Rank:  <Text as={"span"} fontSize="15px" fontWeight="600" textAlign={"left"} letterSpacing={"-0.25px"}
                lineHeight="18.45px">  #4</Text>
            </Text>
            <Box width="0px" opacity={"0px"} height={"11.5px"} gap={"0px"} border={"1px solid #194B3380"} />
            <Text fontSize="15px" color=" #194B33"
              fontWeight="600" textAlign={"left"} letterSpacing={"-0.25px"}
              lineHeight="18.15px">Schools Verified: <Text as={"span"} fontSize="15px" fontWeight="600" textAlign={"left"} letterSpacing={"-0.25px"}
                lineHeight="18.45px">  24</Text>


            </Text>
            <Box width="0px" opacity={"0px"} height={"11.5px"} gap={"0px"} border={"1px solid #194B3380"} />
            <Text fontSize="14px" display={"flex"} fontWeight="600" cursor="pointer" letterSpacing={"-0.04em"} textAlign={"left"} lineHeight="16.94px" color=" #194B33"
            > View  </Text>  <Icon as={LiaAngleDoubleRightSolid} cursor="pointer" color=" #194B33" />
          </Flex>




        </Box>



      </Flex>


      <Flex mt="27px" justifyContent="space-between" flexWrap="wrap">
        <DashboardCard
          icon={<FaSchoolFlag />}
          title='approved schools'
          value='256'
          w="32.5%"
        />
        <DashboardCard
          icon={<FaUserGraduate />}
          title='approved students'
          value='18'
          w="32.5%"
        />
        <DashboardCard
          icon={<TbCurrencyNaira />}
          title='funds requested'
          value='135'
          w="32.5%"
        />


      </Flex>


      <Flex mt="15px" mb={4} justifyContent="space-between" flexWrap="wrap">
        <Box w={{ base: "100%", md: "60%" }} border="1px solid #eaeaea" p={6} borderRadius={"md"}
          bg="white" boxShadow={"sm"}>
          <HStack justifyContent="space-between" borderBottomWidth={1} mb={4}>
            <Text letterSpacing="-3%" color="#3F4956" Weight="600" size="15px" lineHeight={"18.15px"}>Schools Awaiting Approval</Text>
            <Text color="#39996B" size="14px" weight="600" cursor="pointer" lineHeight={"22px"} letterSpacing="-1%">See All</Text>
          </HStack>

          <VStack borderRadius={"10px"} border=" 1px solid #EDEFF2" spacing={4} align="stretch">
            {schools.map((school, index) => (
              <Flex
                key={index}
                justify="space-between"
                align="center"
                flexWrap={["wrap", "wrap", "nowrap", "nowrap"]}
                p={2}
                borderBottomWidth={index !== schools.length - 1 ? 1 : 0}
                borderColor={"gray.200"}>
                <HStack w={{ Fill: "264px" }} padding={"16px, 30px, 16px, 12px"} h={{ Fixed: "42px" }} gap={"18px"} opacity={"0px"}>
                  <Avatar src={school.Image} w={{ Fixed: "42px" }} opacity={"0px"} h={{ Fixed: "42px" }} gap={"0px"} borderRadius={"280px"} />
                  <Box  >

                    <Text lineHeight={"20px"} fontFamily={"Inter"} textAlign="left" letterSpacing="-0.02em%" color="#101828" fontWeight="500" size="13px">{school.name}</Text>
                    <Text fontSize="12px" color="#667085" fontWeight={"400"} fontFamily={"Inter"} lineHeight={"20px"} textAlign={"left"} letterSpacing={"-0.02em"} >{school.email}</Text>
                  </Box>
                </HStack>


                <HStack>
                  <Button size="7px" border='1px solid #39996B' px={2} boxShadow="0px, 0px, 0px, 1px #9CA7AD2B" rightIcon={<IoCloseOutline />}>Reject</Button>
                  <Button size="5px" border='1px solid #39996B' px={2} boxShadow="0px, 0px, 0px, 1px #9CA7AD2B" rightIcon={<FaCheck />}>Approve</Button>
                </HStack>
              </Flex>
            ))}
          </VStack>
        </Box>

        <Box w={{ base: "100%", md: "38%" }} p={6} borderRadius={"md"}
          bg={"white"} boxShadow={"sm"}>
          <HStack justifyContent={"space-between"} borderBottomWidth={1} mb={4}>
            <Text letterSpacing="-3%" color="#3F4956" Weight="600" size="15px" lineHeight={"18.15px"}>Pending Students Approval</Text>
            <Text color="#39996B" size="14px" weight="600" cursor="pointer" lineHeight={"22px"} letterSpacing="-1%">See All</Text>
          </HStack>

          <VStack spacing={13} align="stretch">{students.map((student, index) => (
            <Flex
              key={index}
              p={"12px"} border=" 1px solid #EDEFF2"
              gap="0px"
              align="center"
              opacity="0px"
              w={{ Fill: "396px" }}
              justify="space-between" borderRadius="10px" height={{ Fixed: "68px" }}
              borderBottomWidth={index !== schools.length - 1 ? 1 : 0}
              borderColor={"gray.200"}>
              <HStack >


                <Avatar size="sm" name={student.name} />
                <Box >
                  <Text fontWeight="500" fontSize="13px" lineHeight="20px" textAlign="left" letterSpacing={"-0.02em"}>{student.name}</Text>
                  <Text fontSize={"11px"} opacity="0px" fontWeight={"400"} lineHeight={"20px"} textAlign={"left"} letterSpacing={"-0.02em"} color="gray.500">{student.email}</Text>
                </Box>
              </HStack>
              <Icon as={IoIosArrowRoundForward} cursor={"pointer"} angle="-180 deg" gap="1px" w={{ Hug: "18.01px" }} h={{ Fixed: "33px" }} color=" #101828" />
            </Flex>
          ))}
          </VStack>
        </Box>
      </Flex>



      <Box p={8} m boxShadow={"md"} borderRadius={"md"} bg={"white"}>
        <Flex justify="space-between" width={{ Fixed: "1,080px" }} gap="0px" opacity="0px" left="18px" top="28px" mb={4} wrap="wrap">
          <Text fontSize="17px" color="#1F2937" letterSpacing={"-0.02em"} fontWeight={600} lineHeight="20.57px" textAlign={"left"} >
            Trends Over Time:  {''} <Text as={"span"} letterSpacing={"-0.02em"} lineHeight={"18.15px"} fontWeight={"500"} fontSize={"15px"} textAlign={"left"}> Schools, Students, And Funds </Text>
            <Icon as={RxInfoCircled} justifyContent={"space-between"} />
          </Text>



          <Flex mb={4} justify={"space-between"} w={{ Hug: "178px" }} gap="9px" opacity="0px" h={{ Hug: "20px" }} maxW={"900px"}>
            <Flex align="center">
              <Box w={"10px"} h={"10px"} bg={"#82ca9d"} mr={2} />
              <Text fontSize={"13px"} fontWeight={"500"} textAlign={"left"} letterSpacing={"-0.02em"} lineHeight={"20px"}>Approved Schools +78%</Text>
            </Flex>
            <Flex align="center">
              <Box w="10px" h="10px" bg="#62b6ff" mr={2} />
              <Text fontSize={"sm"}>Approved Students +21%</Text>
            </Flex>
            <Flex align="center">
              <Box w="10px" h="10px" bg="#ffc658" mr={2} />
              <Text fontSize={"sm"}>Funds Required +42%</Text>
            </Flex>
          </Flex>
        </Flex>
        <ResponsiveContainer width="100%" height={300} ml={12}>
          <LineChart data={data}>
            <CartesianGrid stroke='#ccc' strokeOpacity={0.4} strokeDasharray="3 3" width={"100%"} />
            <XAxis dataKey="name" scale={"point"} padding={{ left: 10, right: 10 }} fontSize="12px" fontWeight="500" />
            <YAxis

            />
            <Tooltip
              contentStyle={{ backgroundColor: "#fff", border: "1px solid #ccc", borderRadius: "8px" }} itemStyle={{ color: "#333" }}
              labelStyle={{ fontWeight: "bold", color: "#666" }} cursor={{ stroke: "#888", strokeWidth: 1 }} />

            <Line
              type="monotone"
              dataKey="Schools"
              stroke="#82ca9d"
              strokeWidth={2}
              dot={false}
              name="Approved Schools" />
            <Line
              type="monotone"
              dataKey="Students"
              stroke="#62b6ff"
              strokeWidth={3}
              dot={false}
              name="Approved Students" />
            <Line
              type="monotone"
              dataKey="Funds"
              stroke="#ffc658"
              strokeWidth={2}
              dot={false}
              name="Funds Required" />


          </LineChart>
        </ResponsiveContainer>
      </Box>
    </MainLayout>


  );
};
