import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import MainLayout from '../../DashboardLayout'
import { Text, Flex, HStack, Stack, VStack, Box, Center, Progress, Icon, Avatar, Image } from '@chakra-ui/react'
import { Tooltip as Tooltips } from '@chakra-ui/react';
import DashboardCard from "../../Components/DashboardCard"
import Button from "../../Components/Button"
import { ReactComponent as Scholarship } from "../../Asset/scholarship.svg"
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
import { PiStudent } from 'react-icons/pi';


export default function Index() {

  const [userName, setUserName] = useState('');

  useEffect(() => {
  //   var reloadCount = localStorage.getItem("reloadCount");
  //   if (!reloadCount) {
  //     localStorage.setItem('reloadCount', + parseInt(1))

  //   }
  //   if (reloadCount < 2) {
  //     localStorage.setItem('reloadCount', parseInt(reloadCount) + 1);
  //     setTimeout(() =>
  //       window.location.reload(1), 2000)
  //   } else {
  //     localStorage.removeItem('reloadCount');
  //   }

    const storedName = JSON.parse(localStorage.getItem('onlineUser'));
    if (storedName) {
      setUserName(`${storedName.firstName}`);
    }
  }, []);
    return(
        <MainLayout>
                <Text fontSize={"21px"} lineHeight={"25.41px"} fontWeight="700">Welcome Back, {userName || "User"}.</Text>
                <Text mt="9px" color={"#686C75"} fontWeight={"400"} fontSize={"15px"} mb={5} gap={"9px"} lineHeight={"24px"}>Track your impact and manage your scholarships with ease. Monitor funding trends and create opportunities to change lives.</Text>

              <HStack justifyContent="space-between">
              <Box borderWidth="1px" rounded="10px" px="20px" py="20px" pr="150px" bg="#fff">
                  <Stack>
                    <HStack>
                      <Scholarship />
                      <Text color="#4C515C" fontSize="13px" fontWeight="400">Scholarships Created</Text>
                    </HStack>
                    <Text color="#2F2F2F" fontSize="20px" fontWeight="600">5</Text>
                  </Stack>
                </Box>

                <Box borderWidth="1px" rounded="10px" px="20px" py="20px" pr="150px" bg="#fff">
                  <Stack>
                    <HStack>
                      <PiStudent color="#39996B" fontSize="24px" />
                      <Text color="#4C515C" fontSize="13px" fontWeight="400">Total Student Sponsored</Text>
                    </HStack>
                    <Text color="#2F2F2F" fontSize="20px" fontWeight="600">16</Text>
                  </Stack>
                </Box>

                <Box borderWidth="1px" rounded="10px" px="20px" py="20px" pr="150px" bg="#fff">
                  <Stack>
                    <HStack>
                      <TbCurrencyNaira color="#39996B" fontSize="24px" />
                      <Text color="#4C515C" fontSize="13px" fontWeight="400">Total Donations</Text>
                    </HStack>
                    <Text color="#2F2F2F" fontSize="20px" fontWeight="600">₦150,000</Text>
                  </Stack>
                </Box>
              </HStack>

              <HStack mt="20px" w="100%">
                <Box display="flex" flexDir="column" gap="10px" w="65%" borderWidth="1px" rounded="10px" bg="#fff" px="17px" py="16px">
                  <HStack justifyContent="space-between">
                  <Text color="#3F4956" fontSize="15px" fontWeight="600">Students You're Sponsoring <Box as="span" fontSize="15px" fontWeight="500" color="#3F495680">(16)</Box></Text>
                  <Text cursor="pointer" color="#39996B" fontSize="14px" fontWeight="600">See All</Text>
                  </HStack>

                  <hr className="remove"/>

                  <HStack justifyContent="space-between">
                    <Box display="flex" flexDir="column" alignItems="center" w="207px" h="170px" gap="8px" rounded="12px" borderWidth="1px" py="23px" px="16px">
                      <Avatar size="sm" name="David Folarin" />
                      <Text color="#101828" fontWeight="500" fontSize="14px">David Folarin</Text>
                      <Text color="#667085" fontWeight="400" fontSize="11px">davidfolarin@gmail.com</Text>
                      <Text color="#667085" fontWeight="500" fontSize="11px">Legendary Scholars Academy</Text>
                    </Box>

                   <Box display="flex" flexDir="column" alignItems="center" w="207px" h="170px" gap="8px" rounded="12px" borderWidth="1px" py="23px" px="16px">
                      <Avatar size="sm" name="Timothy Salisu" />
                      <Text color="#101828" fontWeight="500" fontSize="14px">Timothy Salisu</Text>
                      <Text color="#667085" fontWeight="400" fontSize="11px">timothysalisu@gmail.com</Text>
                      <Text color="#667085" fontWeight="500" fontSize="11px">Queen's College</Text>
                    </Box>

                   <Box display="flex" flexDir="column" alignItems="center" w="207px" h="170px" gap="8px" rounded="12px" borderWidth="1px" py="23px" px="16px">
                      <Avatar size="sm" name="Chidinma Precious" />
                      <Text color="#101828" fontWeight="500" fontSize="14px">Chidinma Precious</Text>
                      <Text color="#667085" fontWeight="400" fontSize="11px">chidinmapre..@gmail.com</Text>
                      <Text color="#667085" fontWeight="500" fontSize="11px">Federal Government College</Text>
                    </Box>
                  </HStack>

                  <HStack justifyContent="space-between">
                    <Box display="flex" flexDir="column" alignItems="center" w="207px" h="170px" gap="8px" rounded="12px" borderWidth="1px" py="23px" px="16px">
                      <Avatar size="sm" name="Sarah Folarin" />
                      <Text color="#101828" fontWeight="500" fontSize="14px">Sarah Folarin</Text>
                      <Text color="#667085" fontWeight="400" fontSize="11px">sarahfolarin@gmail.com</Text>
                      <Text color="#667085" fontWeight="500" fontSize="11px">Mayflower School</Text>
                    </Box>

                   <Box display="flex" flexDir="column" alignItems="center" w="207px" h="170px" gap="8px" rounded="12px" borderWidth="1px" py="23px" px="16px">
                      <Avatar size="sm" name="Oladipo Esther" />
                      <Text color="#101828" fontWeight="500" fontSize="14px">Oladipo Esther</Text>
                      <Text color="#667085" fontWeight="400" fontSize="11px">oladipoesther@gmail.com</Text>
                      <Text color="#667085" fontWeight="500" fontSize="11px">Chrisland College</Text>
                    </Box>

                   <Box display="flex" flexDir="column" alignItems="center" w="207px" h="170px" gap="8px" rounded="12px" borderWidth="1px" py="23px" px="16px">
                      <Avatar size="sm" name="Lydia Gbobo" />
                      <Text color="#101828" fontWeight="500" fontSize="14px">Lydia Gbobo</Text>
                      <Text color="#667085" fontWeight="400" fontSize="11px">lydiagbobo@gmail.com</Text>
                      <Text color="#667085" fontWeight="500" fontSize="11px">Corona Secondary School</Text>
                    </Box>
                  </HStack>
                </Box>





                <Box display="flex" flexDir="column" gap="10px" w="35%" borderWidth="1px" rounded="10px" bg="#fff" px="17px" py="16px">
                <HStack justifyContent="space-between">
                  <Text color="#3F4956" fontSize="15px" fontWeight="600">Active Scholarships <Box as="span" fontSize="15px" fontWeight="500" color="#3F495680">(2)</Box></Text>
                  <Text cursor="pointer" color="#39996B" fontSize="14px" fontWeight="600">See All</Text>
                  </HStack>

                  <hr className="remove"/>

                  <Stack borderWidth="1px" rounded="11px" py="12px" pl="8px" pr="16px" spacing="10px">
                    <HStack justifyContent="space-between">
                      <HStack>
                        <Box bg="#39996B" w="3px" h="33px" rounded="3px"></Box>
                         <Stack>
                        <Text color="#1F2937" fontSize="13px" fontWeight="500">STEM Excellence Scholarship</Text>
                        <Text color="#767F8E" fontSize="11px" fontWeight="400">Date Created: Oct 6th, 9:00AM</Text>
                      </Stack>
                      </HStack>
                     
                      <Text color="#3F4956" fontSize="14px" fontWeight="500">₦100,000</Text>
                    </HStack>

                    <hr className="remove"/>

                    <HStack>
                      <HStack bg="#E8F2ED" p="8px" rounded="31px">
                        <Avatar size="sm" name="Philip Amakari"/>
                        <Text color="#101828" fontSize="13px" fontWeight="500">Philip Amakari</Text>
                      </HStack>

                      <HStack bg="#E8F2ED" p="8px" rounded="31px">
                        <Avatar size="sm" name="Chidinma Precious"/>
                        <Text color="#101828" fontSize="13px" fontWeight="500">Chidinma Precious</Text>
                      </HStack>
                    </HStack>
                  </Stack>

                  <Stack borderWidth="1px" rounded="11px" py="12px" pl="8px" pr="16px" spacing="10px">
                    <HStack justifyContent="space-between">
                      <HStack>
                        <Box bg="#39996B" w="3px" h="33px" rounded="3px"></Box>
                         <Stack>
                        <Text color="#1F2937" fontSize="13px" fontWeight="500">Pathway to Excellence Scholarship</Text>
                        <Text color="#767F8E" fontSize="11px" fontWeight="400">Date Created: Oct 6th, 9:00AM</Text>
                      </Stack>
                      </HStack>
                     
                      <Text color="#3F4956" fontSize="14px" fontWeight="500">₦50,000</Text>
                    </HStack>

                    <hr className="remove"/>

                    <HStack>
                      <HStack bg="#E8F2ED" p="8px" rounded="31px">
                        <Avatar size="sm" name="Sarah Divine"/>
                        <Text color="#101828" fontSize="13px" fontWeight="500">Sarah Divine</Text>
                      </HStack>
                      </HStack>
                   
                      
                  </Stack>
                  <HStack bg="#E8F2ED" visibility="hidden" p="6px" rounded="31px">
                        <Avatar size="sm" name="Sarah Divine"/>
                        <Text color="#101828" fontSize="13px" fontWeight="500">Sarah Divine</Text>
                      </HStack>
                </Box>
              </HStack>

              {/* do the chart here */}
                
        </MainLayout>
    )
}