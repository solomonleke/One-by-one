import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "../../DashboardLayout";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import {
  Text,
  Grid,
  HStack,
  Stack,
  Link,
  Box,
  Avatar,
  VStack,
} from "@chakra-ui/react";
import DashboardCard from "../../Components/DashboardCard";
import Button from "../../Components/Button";
import Preloader from "../../Components/Preloader";
import { ReactComponent as Scholarship } from "../../Asset/scholarship.svg";
import { PiStudent } from "react-icons/pi";
import { ReactComponent as Warning } from "../../Asset/warning.svg";
import { Link as RouterLink } from "react-router-dom";
import { TbCurrencyNaira } from "react-icons/tb";
import {
  GetSponsorAdminStats,
  fetchSponsorStudents,
  getScholarshipsBySponsor,
  getActiveScholarships,
} from "../../Utils/ApiCall";

export default function Index() {
  const [students, setStudents] = useState([]);
  const [userName, setUserName] = useState("");
  const [stats, setStats] = useState(null);
  const [scholarships, setScholarships] = useState([]);
  const [sponsorScholarships, setSponsorScholarships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useNavigate();
  const [activeScholarshipCount, setActiveScholarshipCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const [data, setData] = useState({
    scholarshipCount: 0,
    studentSponsoredCount: 0,
    totalDonations: 0,
  });

  // === Fetch Students ===
  const fetchStudents = async () => {
    try {
      const response = await fetchSponsorStudents();
      if (
        response?.status === true &&
        Array.isArray(response?.data) &&
        response.data.length > 0
      ) {
        setStudents(response.data);
      }
    } catch (error) {
      console.error("Error fetching students:", error.message);
    }
  };

  // === Fetch Active Scholarships ===
  const fetchScholarships = async () => {
    try {
      const data = await getActiveScholarships();
      if (data.status) {
        setScholarships(data.data.activeScholarship);
        setActiveScholarshipCount(data.data.activeScholarship.length);
      } else {
        setError(data.message || "Failed to load scholarships");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // === Fetch Scholarships by Sponsor ===
  const fetchScholarshipsBySponsor = async () => {
    try {
      const data = await getScholarshipsBySponsor();
      if (data.status && Array.isArray(data.data)) {
        setSponsorScholarships(data.data);
      } else {
        setError(data.message || "Failed to load scholarships");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
      setIsLoading(false);
    }
  };

  // === Fetch Dashboard Stats ===
  const fetchData = async () => {
    try {
      const data = await GetSponsorAdminStats();
      if (data) {
        setStats(data);
        setData({
          scholarshipCount: data.scholarshipCount,
          studentSponsoredCount: data.studentSponsoredCount,
          totalDonations: data.totalDonations,
        });
      }
    } catch (error) {
      console.error("Error fetching dashboard data:", error.message);
    } finally {
      setLoading(false);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    fetchStudents();
    fetchScholarshipsBySponsor();
    fetchScholarships();

    const storedName = JSON.parse(localStorage.getItem("onlineUser"));
    if (storedName) setUserName(`${storedName.firstName}`);
  }, []);

  return (
    <MainLayout>
      {isLoading && <Preloader />}

      {/* Welcome Section */}
      <Text
        fontSize={{ base: "18px", md: "21px" }}
        lineHeight="25px"
        fontWeight="700"
      >
        Welcome Back, {userName || "User"}.
      </Text>
      <Text
        mt={{ base: "5px", md: "9px" }}
        color="#686C75"
        fontWeight="400"
        fontSize={{ base: "13px", md: "15px" }}
        mb={5}
        lineHeight={{ base: "20px", md: "24px" }}
      >
        Track your impact and manage your scholarships with ease. Monitor
        funding trends and create opportunities to change lives.
      </Text>

      <Box
    backgroundColor={"#FFF7EB"}
    py={"14px"}
    px={"20px"}
    rounded={"6px"}
    border={"1px solid #FFA30C80"}
    id="close"
  >
    <HStack justifyContent={"space-between"}>
      <HStack>
        <Warning w="16px" />
        <Text fontSize={"14px"} fontWeight={"400"} color={"#FFA30C"}>
          In order to sponsor a student, you need to create a Scholarship. Go to{" "}
          <Link
            as={RouterLink}
            to="/sponsor-admin/myscholarships" 
            fontWeight="500"
            textDecoration="underline"
            _hover={{ color: "#FF8A00", textDecoration: "none" }}
          >
            My Scholarships
          </Link>{" "}
          to create scholarships
        </Text>
      </HStack>
    </HStack>
  </Box>

      {/* Statistic Cards */}
      <Grid
        justifyContent="space-between"
        gridTemplateColumns={{ base: "1fr", sm: "repeat(2, 1fr)", md: "repeat(3, 1fr)" }}
        gap={{ base: "10px", md: "12px" }}
        mt={{ base: "10px", md: "20px" }}
      >
        <Box borderWidth="1px" rounded="10px" px={{ base: "14px", md: "20px" }} py="16px" bg="#fff">
          <Stack spacing="6px">
            <HStack>
              <Scholarship width={18} height={18} />
              <Text color="#4C515C" fontSize={{ base: "12px", md: "13px" }}>
                Scholarships Created
              </Text>
            </HStack>
            <Text color="#2F2F2F" fontSize={{ base: "18px", md: "20px" }} fontWeight="600">
              {data.scholarshipCount}
            </Text>
          </Stack>
        </Box>

        <Box borderWidth="1px" rounded="10px" px={{ base: "14px", md: "20px" }} py="16px" bg="#fff">
          <Stack spacing="6px">
            <HStack>
              <PiStudent color="#39996B" fontSize="20px" />
              <Text color="#4C515C" fontSize={{ base: "12px", md: "13px" }}>
                Total Student Sponsored
              </Text>
            </HStack>
            <Text color="#2F2F2F" fontSize={{ base: "18px", md: "20px" }} fontWeight="600">
              {data.studentSponsoredCount}
            </Text>
          </Stack>
        </Box>

        <Box borderWidth="1px" rounded="10px" px={{ base: "14px", md: "20px" }} py="16px" bg="#fff">
          <Stack spacing="6px">
            <HStack>
              <TbCurrencyNaira color="#39996B" fontSize="20px" />
              <Text color="#4C515C" fontSize={{ base: "12px", md: "13px" }}>
                Total Donations
              </Text>
            </HStack>
            <Text color="#2F2F2F" fontSize={{ base: "18px", md: "20px" }} fontWeight="600">
              {data.totalDonations}
            </Text>
          </Stack>
        </Box>
      </Grid>

      {/* Students & Scholarships Section */}
      <Grid
        mt={{ base: "16px", md: "20px" }}
        w="100%"
        gridTemplateColumns={{ base: "1fr", md: "65% 35%" }}
        gap={{ base: "12px", md: "16px" }}
      >
        {/* Sponsored Students */}
        <Box
          display="flex"
          flexDir="column"
          gap="10px"
          borderWidth="1px"
          rounded="10px"
          bg="#fff"
          px={{ base: "12px", md: "17px" }}
          py={{ base: "12px", md: "16px" }}
        >
          <HStack justifyContent="space-between" flexWrap="wrap">
            <Text
              color="#3F4956"
              fontSize={{ base: "14px", md: "15px" }}
              fontWeight="600"
            >
              Students You’re Sponsoring{" "}
              <Box as="span" color="#3F495680" fontWeight="500">
                ({data.studentSponsoredCount})
              </Box>
            </Text>
            <Text
              cursor="pointer"
              color="#39996B"
              fontSize={{ base: "13px", md: "14px" }}
              fontWeight="600"
            >
              See All
            </Text>
          </HStack>

          <hr className="remove" />

          <HStack
            flexWrap="wrap"
            justifyContent={{ base: "center", md: "flex-start" }}
          >
            {scholarships && scholarships.length > 0 ? (
              (() => {
                const uniqueStudents = new Map();
                scholarships.forEach((scholarship) => {
                  if (Array.isArray(scholarship.students)) {
                    scholarship.students
                      .filter((student) => !student.is_deleted)
                      .forEach((student) =>
                        uniqueStudents.set(student.id, student)
                      );
                  }
                });

                const studentsArray = Array.from(uniqueStudents.values());
                return studentsArray.length > 0 ? (
                  studentsArray.map((student) => (
                    <Box
                      key={student.id}
                      display="flex"
                      flexDir="column"
                      alignItems="center"
                      w={{ base: "100%", sm: "45%", md: "207px" }}
                      h={{ base: "140px", md: "170px" }}
                      gap="6px"
                      rounded="12px"
                      borderWidth="1px"
                      py={{ base: "16px", md: "23px" }}
                      px="12px"
                      mb="10px"
                    >
                      <Avatar size="sm" name={student.full_name} />
                      <Text
                        color="#101828"
                        fontWeight="500"
                        fontSize={{ base: "12px", md: "14px" }}
                      >
                        {student.full_name}
                      </Text>
                      <Text
                        color="#667085"
                        fontWeight="400"
                        fontSize={{ base: "10px", md: "11px" }}
                      >
                        {student.email}
                      </Text>
                      <Text
                        color="#667085"
                        fontWeight="500"
                        fontSize={{ base: "10px", md: "11px" }}
                      >
                        {student.intended_field_of_study || "No field specified"}
                      </Text>
                    </Box>
                  ))
                ) : (
                  <Text>No students available</Text>
                );
              })()
            ) : (
              <Text>No scholarships available</Text>
            )}
          </HStack>
        </Box>

        {/* Active Scholarships */}
        <Box
          display="flex"
          flexDir="column"
          gap="10px"
          borderWidth="1px"
          rounded="10px"
          bg="#fff"
          px={{ base: "12px", md: "17px" }}
          py={{ base: "12px", md: "16px" }}
        >
          <HStack justifyContent="space-between" flexWrap="wrap">
            <Text color="#3F4956" fontSize={{ base: "14px", md: "15px" }} fontWeight="600">
              Active Scholarships{" "}
              <Box as="span" color="#3F495680" fontWeight="500">
                ({activeScholarshipCount})
              </Box>
            </Text>
            <Text
              cursor="pointer"
              color="#39996B"
              fontSize={{ base: "13px", md: "14px" }}
              fontWeight="600"
              onClick={() => router("/sponsor-admin/myscholarships")}
            >
              See All
            </Text>
          </HStack>

          <hr className="remove" />

          <VStack w="100%" spacing={{ base: "8px", md: "10px" }}>
            {Array.isArray(scholarships) && scholarships.length > 0 ? (
              scholarships.slice(0, 2).map((scholarship, index) => (
                <Stack
                  key={scholarship.id || index}
                  borderWidth="1px"
                  borderColor="#E0E0E0"
                  rounded="11px"
                  py={{ base: "10px", md: "12px" }}
                  pl={{ base: "8px", md: "10px" }}
                  pr={{ base: "10px", md: "16px" }}
                  w="100%"
                  spacing={{ base: "8px", md: "10px" }}
                >
                  <HStack justifyContent="space-between" gap="10px">
                    <HStack>
                      <Box bg="#39996B" w="3px" h="33px" rounded="3px"></Box>
                      <Stack>
                        <Text color="#1F2937" fontSize={{ base: "12px", md: "13px" }} fontWeight="600">
                          {scholarship?.name ?? "Unnamed Scholarship"}
                        </Text>
                        <Text color="#767F8E" fontSize={{ base: "10px", md: "11px" }}>
                          Date Created:{" "}
                          {scholarship?.created_at
                            ? new Date(scholarship.created_at).toLocaleString()
                            : "N/A"}
                        </Text>
                      </Stack>
                    </HStack>
                    <HStack>
                      <Text color="#3F4956" fontSize={{ base: "12px", md: "14px" }} fontWeight="600">
                        ₦
                        {scholarship?.amount
                          ? parseInt(scholarship.amount).toLocaleString()
                          : "N/A"}
                      </Text>
                    </HStack>
                  </HStack>

                  <hr className="remove" />

                  <HStack flexWrap="wrap" mt="6px" gap="6px">
                    {scholarship.students.length > 0 ? (
                      scholarship.students.map((student, idx) => (
                        <HStack
                          key={idx}
                          bg="#E8F2ED"
                          p="6px"
                          rounded="31px"
                          flexShrink={0}
                        >
                          <Avatar size="xs" name={student.full_name} />
                          <Text
                            color="#101828"
                            fontSize={{ base: "11px", md: "13px" }}
                            fontWeight="500"
                          >
                            {student.full_name}
                          </Text>
                        </HStack>
                      ))
                    ) : (
                      <Text
                        color="#767F8E"
                        fontSize={{ base: "11px", md: "12px" }}
                        fontWeight="400"
                      >
                        No students assigned
                      </Text>
                    )}
                  </HStack>
                </Stack>
              ))
            ) : (
              <Text
                fontSize={{ base: "12px", md: "14px" }}
                fontWeight="500"
                color="#767F8E"
              >
                No scholarships available.
              </Text>
            )}
          </VStack>
        </Box>
      </Grid>
        <Box
          mt={{ base: "16px", md: "24px" }}
          borderWidth="1px"
          rounded="10px"
          bg="#fff"
          px={{ base: "12px", md: "17px" }}
          py={{ base: "12px", md: "16px" }}
        >
          <Text
            color="#3F4956"
            fontSize={{ base: "14px", md: "15px" }}
            fontWeight="600"
            mb={{ base: "10px", md: "15px" }}
          >
            Funding Trends Over Time
          </Text>

          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={[
                { name: "Jan", amount: 150 },
                { name: "Feb", amount: 220 },
                { name: "Mar", amount: 100 },
                { name: "Apr", amount: 180 },
                { name: "May", amount: 90 },
                { name: "Jun", amount: 200 },
                { name: "Jul", amount: 270 },
                { name: "Aug", amount: 130 },
                { name: "Sep", amount: 160 },
                { name: "Oct", amount: 190 },
                { name: "Nov", amount: 110 },
                { name: "Dec", amount: 210 },
              ]}
              margin={{ top: 5, right: 10, left: -10, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Bar dataKey="amount" fill="#799E91" radius={[6, 6, 0, 0]} barSize={25} />
            </BarChart>
          </ResponsiveContainer>
        </Box>
    </MainLayout>
  );
}
