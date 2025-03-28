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
import { FaArrowRight } from "react-icons/fa6";
import { GetSponsorAdminStats } from "../../Utils/ApiCall";
import { fetchSponsorStudents } from "../../Utils/ApiCall";
import { getScholarshipsBySponsor } from "../../Utils/ApiCall";
import { getActiveScholarships } from "../../Utils/ApiCall";


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
  const [students, setStudents] = useState([]);
  const [userName, setUserName] = useState('');
  const [stats, setStats] = useState(null);
  const [scholarships, setScholarships] = useState([]);
  const [sponsorScholarships, setSponsorScholarships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useNavigate();
  const [data, setData] = useState({
    scholarshipCount: 0,
    studentSponsoredCount: 0,
    totalDonations: 0,
  });

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        console.log("Fetching students..."); // Debugging Step 1

        const response = await fetchSponsorStudents();
        console.log("Full Students API Response:", JSON.stringify(response, null, 2)); // Debugging Step 2

        if (response?.status === true && Array.isArray(response?.data) && response.data.length > 0) {
          console.log("Setting Students State:", response.data); // Debugging Step 3
          setStudents(response.data);
        } else {
          console.warn("No students available or unexpected response:", response);
        }
      } catch (error) {
        console.error("Error fetching students:", error.message);
      }
    };

    fetchStudents();
  }, []);

  useEffect(() => {
    const fetchScholarships = async () => {
      try {
        const data = await getActiveScholarships();
        if (data.status) {
          setScholarships(data.data.activeScholarship);
        } else {
          setError(data.message || "Failed to load scholarships");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchScholarships();
  }, []);

  useEffect(() => {
    const fetchScholarshipsBySponsor = async () => {
      try {
        const data = await getScholarshipsBySponsor();

        if (data.status && Array.isArray(data.data)) {
          setSponsorScholarships(data.data); // ✅ Set directly since `data` is an array
        } else {
          console.error("Unexpected response format:", data);
          setError(data.message || "Failed to load scholarships");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchScholarshipsBySponsor();
  }, []);


  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("Fetching Dashboard Stats...");

        const data = await GetSponsorAdminStats();
        console.log("Fetched Dashboard Stats:", data);

        if (data) {
          setStats(data);
          setData({
            scholarshipCount: data.scholarshipCount,
            studentSponsoredCount: data.studentSponsoredCount,
            totalDonations: data.totalDonations,
          });
        } else {
          console.error("Dashboard data is null or undefined.");
        }
      } catch (error) {
        console.error("Error fetching dashboard data:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);



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
  return (
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
            <Text color="#2F2F2F" fontSize="20px" fontWeight="600">{data.scholarshipCount}</Text>
          </Stack>
        </Box>

        <Box borderWidth="1px" rounded="10px" px="20px" py="20px" pr="150px" bg="#fff">
          <Stack>
            <HStack>
              <PiStudent color="#39996B" fontSize="24px" />
              <Text color="#4C515C" fontSize="13px" fontWeight="400">Total Student Sponsored</Text>
            </HStack>
            <Text color="#2F2F2F" fontSize="20px" fontWeight="600">{data.studentSponsoredCount}</Text>
          </Stack>
        </Box>

        <Box borderWidth="1px" rounded="10px" px="20px" py="20px" pr="150px" bg="#fff">
          <Stack>
            <HStack>
              <TbCurrencyNaira color="#39996B" fontSize="24px" />
              <Text color="#4C515C" fontSize="13px" fontWeight="400">Total Donations</Text>
            </HStack>
            <Text color="#2F2F2F" fontSize="20px" fontWeight="600">{data.totalDonations}</Text>
          </Stack>
        </Box>
      </HStack>

      <HStack mt="20px" w="100%">
        <Box display="flex" flexDir="column" gap="10px" w="65%" borderWidth="1px" rounded="10px" bg="#fff" px="17px" py="16px">
          <HStack justifyContent="space-between">
            <Text color="#3F4956" fontSize="15px" fontWeight="600">Students You're Sponsoring <Box as="span" fontSize="15px" fontWeight="500" color="#3F495680">(16)</Box></Text>
            <Text cursor="pointer" color="#39996B" fontSize="14px" fontWeight="600">See All</Text>
          </HStack>

          <hr className="remove" />

          <HStack justifyContent="space-between">
            {Array.isArray(scholarships.students) && scholarships.length > 0 ? (
              scholarships.map((student, index) => (
                <Box
                  key={index}
                  display="flex"
                  flexDir="column"
                  alignItems="center"
                  w="207px"
                  h="170px"
                  gap="8px"
                  rounded="12px"
                  borderWidth="1px"
                  py="23px"
                  px="16px"
                >
                  <Avatar size="sm" name={student.full_name} />
                  <Text color="#101828" fontWeight="500" fontSize="14px">
                    {student.full_name}
                  </Text>
                  <Text color="#667085" fontWeight="400" fontSize="11px">
                    {student.student_email}
                  </Text>
                  <Text color="#667085" fontWeight="500" fontSize="11px">
                    {student.full_name}
                  </Text>
                </Box>
              ))
            ) : (
              <Text>No students available</Text>
            )}


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
            <Text color="#3F4956" fontSize="15px" fontWeight="600">Active Scholarships <Box as="span" fontSize="15px" fontWeight="500" color="#3F495680">(1)</Box></Text>
            <Text cursor="pointer" color="#39996B" fontSize="14px" fontWeight="600">See All</Text>
          </HStack>

          <hr className="remove" />

          <Stack borderWidth="1px" rounded="11px" py="12px" pl="8px" pr="16px" spacing="10px">
            <HStack justifyContent="space-between">
              <VStack>
                {Array.isArray(scholarships) && scholarships.length > 0 ? (
                  scholarships.map((scholarship, index) => (
                    <Stack
                      key={scholarship.id || index}
                      borderWidth="1px"
                      rounded="11px"
                      py="12px"
                      pl="8px"
                      pr="16px"
                      spacing="10px"
                    >
                      {/* Scholarship Details */}
                      <HStack justifyContent="space-between">
                        <HStack>
                          <Box bg="#39996B" w="3px" h="33px" rounded="3px"></Box>
                          <Stack>
                            {/* Scholarship Name */}
                            <Text color="#1F2937" fontSize="14px" fontWeight="600">
                              {scholarship?.name ?? "Unnamed Scholarship"}
                            </Text>
                            {/* Date Created (Formatted) */}
                            <Text color="#767F8E" fontSize="12px" fontWeight="400">
                              Date Created:{" "}
                              {scholarship?.created_at
                                ? new Date(scholarship.created_at).toLocaleString()
                                : "N/A"}
                            </Text>
                          </Stack>
                        </HStack>

                        {/* Scholarship Amount */}
                        <HStack>
                          <Text color="#344054" fontSize="12px" fontWeight="400">:</Text>
                          <Text color="#3F4956" fontSize="17px" fontWeight="600">
                            ₦{scholarship?.amount ? parseInt(scholarship.amount).toLocaleString() : "N/A"}
                          </Text>
                        </HStack>
                      </HStack>

                      {/* Horizontal Line */}
                      <hr className="remove" />

                      {/* Awardees & View Funding History */}
                      <HStack justifyContent="space-between">
                        <HStack>
                          {scholarship.students.length > 0 ? (
                            scholarship.students.slice(0, 2).map((student, idx) => (
                              <HStack key={idx} bg="#E8F2ED" p="8px" rounded="31px">
                                <Avatar size="sm" name={student.full_name} />
                                <Text color="#101828" fontSize="13px" fontWeight="500">
                                  {student.full_name}
                                </Text>
                              </HStack>
                            ))
                          ) : (
                            <Text color="#767F8E" fontSize="12px" fontWeight="400">
                              No students assigned
                            </Text>
                          )}
                        </HStack>

                      </HStack>
                    </Stack>
                  ))
                ) : (
                  <Text fontSize="14px" fontWeight="500" color="#767F8E">
                    No scholarships available.
                  </Text>
                )}
              </VStack>
            </HStack>
          </Stack>

        </Box>
      </HStack>

      {/* do the chart here */}

    </MainLayout>
  )
}