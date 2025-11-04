import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MainLayout from '../../DashboardLayout';
import {
  Text, Flex, HStack, Box, Progress, Icon, Avatar, Image, Stack,
} from '@chakra-ui/react';
import { Tooltip as Tooltips } from '@chakra-ui/react';
import DashboardCard from "../../Components/DashboardCard";
import { ReactComponent as NextArrow } from '../../Asset/nextArrow.svg';
import Button from "../../Components/Button";
import { IoChevronBackOutline } from "react-icons/io5";
import { FaGoogleScholar } from "react-icons/fa6";
import scholarshipImage8 from "../../Asset/goldIcon.svg";
import { GetScholarshipAdminLeaderboardApi } from "../../Utils/ApiCall"; // <-- same API you used on the other page

export default function ScholarshipAdminLeaderboard() {
  const router = useNavigate();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const [leaderboardData, setLeaderboardData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const randomAvatarUrl = useMemo(
    () => `https://i.pravatar.cc/300?img=${Math.floor(Math.random() * 70) + 1}`,
    []
  );

  // fetch + load current user
  useEffect(() => {
    (async () => {
      try {
        const storedName = JSON.parse(localStorage.getItem('onlineUser'));
        if (storedName) {
          setFirstName(`${storedName.firstName || ''}`);
          setLastName(`${storedName.lastName || ''}`);
        }
        const response = await GetScholarshipAdminLeaderboardApi();
        // response.data.stats should be an array of:
        // { name, lastName, picture, totalSchools }
        setLeaderboardData(Array.isArray(response?.data?.stats) ? response.data.stats : []);
      } catch (e) {
        setError(e?.message || 'Failed to fetch leaderboard');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // Combine data + ensure current user is present + sort
  const processedData = useMemo(() => {
    const toNumber = (v) => Number(String(v ?? 0).replace(/[^\d.-]/g, '')) || 0;

    const data = [...leaderboardData];

    const userExists = data.some(
      (p) =>
        (p?.name || '').toLowerCase() === (firstName || '').toLowerCase() &&
        (p?.lastName || '').toLowerCase() === (lastName || '').toLowerCase()
    );

    if (!userExists && firstName && lastName) {
      data.push({
        name: firstName,
        lastName: lastName,
        picture: randomAvatarUrl,
        totalSchools: 0,
      });
    }

    // sort desc by totalSchools
    return data.sort((a, b) => toNumber(b.totalSchools) - toNumber(a.totalSchools));
  }, [leaderboardData, firstName, lastName, randomAvatarUrl]);

  // derive current user row and progress-to-3rd
  const { youRow, youIndex, youTotal, toThird } = useMemo(() => {
    const toNumber = (v) => Number(String(v ?? 0).replace(/[^\d.-]/g, '')) || 0;

    let youIdx = -1;
    let you = null;

    processedData.forEach((p, idx) => {
      if (
        (p?.name || '').toLowerCase() === (firstName || '').toLowerCase() &&
        (p?.lastName || '').toLowerCase() === (lastName || '').toLowerCase()
      ) {
        youIdx = idx;
        you = p;
      }
    });

    const yourTotal = toNumber(you?.totalSchools);
    const thirdPlaceTotal = toNumber(processedData?.[2]?.totalSchools); // index 2 is rank #3
    const diff = Math.max(thirdPlaceTotal - yourTotal, 0);

    return {
      youRow: you,
      youIndex: youIdx,
      youTotal: yourTotal,
      toThird: diff,
    };
  }, [processedData, firstName, lastName]);

  // progress bar value (simple heuristic)
  const progressValue = useMemo(() => {
    // If third place is 0 (or missing), show full bar if you have any value
    // else show min(100, yourTotal / thirdPlace * 100)
    const third = Number(processedData?.[2]?.totalSchools || 0);
    if (!third) return youTotal ? 100 : 0;
    return Math.max(0, Math.min(100, Math.round((youTotal / third) * 100)));
  }, [processedData, youTotal]);

  return (
    <MainLayout>
      {/* Breadcrumb & back */}
      <Flex justifyContent="space-between" flexWrap="wrap">
        <HStack spacing="10px">
          <Text
            cursor="pointer"
            _hover={{ fontWeight: '500' }}
            color="#626974"
            fontSize="13px"
            fontWeight="400"
            onClick={() => router('/scholarship-admin')}
          >
            Overview
          </Text>
          <NextArrow />
          <Text
            cursor="pointer"
            color="#1F2937"
            fontSize="13px"
            fontWeight="500"
            onClick={() => router('/scholarship-admin/scholarship-admin-leaderboard')}
          >
            Leaderboard
          </Text>
        </HStack>

        <HStack
          fontSize="14px"
          fontWeight="600"
          spacing="10px"
          cursor="pointer"
          onClick={() => router('/scholarship-admin')}
        >
          <IoChevronBackOutline />
          <Text>Back</Text>
        </HStack>
      </Flex>

      {/* Header gradient card */}
      <Flex
        w="100%"
        maxW="1125px"
        mt={{ base: "20px", md: "30px" }}
        background="linear-gradient(90.1deg, #18AB91 0.09%, #BCDC60 60.15%, #FFBC4F 101.02%)"
        borderRadius="10px"
        p={{ base: "12px 14px", md: "13px 19px" }}
        justifyContent="space-between"
        flexDir={{ base: "column", md: "row" }}
        align={{ base: "stretch", md: "center" }}
        gap={{ base: 4, md: 0 }}
        position="relative"
        overflow="hidden"
      >
        {/* LEFT SECTION */}
        <Box w="100%" maxW={{ md: "356px" }}>
          <Flex align="center" mb={2}>
            <Icon as={FaGoogleScholar} color="yellow.400" boxSize={{ base: 4, md: 5 }} mr={2} />
            <Text
              fontWeight="600"
              fontSize={{ base: "16px", md: "18px" }}
              color="#FFFFFF"
              lineHeight="24px"
            >
              Scholarship Admin Leaderboard
            </Text>
          </Flex>

          <Box
            bg="#03493D54"
            cursor="pointer"
            w="100%"
            maxW={{ base: "100%", md: "356px" }}
            borderRadius="6px"
            p="6px"
          >
            <Flex align="center" justify="space-between" flexWrap="wrap" gap={2}>
              <Progress
                value={progressValue}
                height="6px"
                w={{ base: "65%", md: "199px" }}
                borderRadius="2px"
                sx={{
                  "& > div": { backgroundColor: "#42ED9B" },
                  backgroundColor: "#FAFFFD4A",
                }}
              />
              <Text
                fontSize={{ base: "12px", md: "14px" }}
                color="#ffffff"
                textAlign="right"
                fontWeight="500"
              >
                {toThird ? `${toThird} Schools to Rank #3` : "You're at or above #3"}
              </Text>
            </Flex>
          </Box>
        </Box>

        {/* RIGHT SECTION */}
        <Box
          bg="#FFFFFF"
          w="100%"
          maxW={{ base: "100%", md: "364px" }}
          borderRadius="7px"
          mt={{ base: 4, md: "14px" }}
          p={{ base: "8px 10px", md: "8px 13px" }}
        >
          <Flex
            align="center"
            flexWrap="wrap"
            justify={{ base: "space-between", md: "flex-start" }}
            gap={{ base: 2, md: "11px" }}
          >
            <HStack>
              <Image
                src={scholarshipImage8}
                w={{ base: "20px", md: "23.59px" }}
                h={{ base: "28px", md: "33px" }}
                alt="Scholarship"
              />
              <Text
                fontSize={{ base: "14px", md: "15px" }}
                color="#194B33"
                fontWeight="600"
                letterSpacing="-0.03em"
              >
                Super Volunteer
              </Text>
            </HStack>

            <Box
              display={{ base: "none", md: "block" }}
              border="1px solid #194B3380"
              h="11.5px"
            />

            <Text
              fontSize={{ base: "14px", md: "15px" }}
              color="#194B33"
              fontWeight="600"
              letterSpacing="-0.03em"
            >
              Schools Verified:{" "}
              <Text as="span" ml="4px">
                {youTotal}
              </Text>
            </Text>
          </Flex>
        </Box>
      </Flex>

      {/* Leaderboard list */}
      <Box bg="white" rounded="10px" borderWidth="1px" py="21px" px="22px" mt="10px">
        <Stack spacing="10px">
          <HStack justifyContent="space-between">
            <Text color="#3F4956" fontSize="15px" fontWeight="600">Leaderboard</Text>
            <Text color="#3F4956" fontSize="15px" fontWeight="600">Schools Verified</Text>
          </HStack>

          <hr className="remove" />

          {loading && (
            <Text fontSize="14px" color="gray.500">Loading…</Text>
          )}

          {!loading && error && (
            <Text fontSize="14px" color="red.500">{error}</Text>
          )}

          {!loading && !error && processedData.length === 0 && (
            <Text fontSize="14px" color="gray.500">No data available</Text>
          )}

          {!loading && !error && processedData.map((admin, index) => {
            const isYou =
              (admin?.name || '').toLowerCase() === (firstName || '').toLowerCase() &&
              (admin?.lastName || '').toLowerCase() === (lastName || '').toLowerCase();

            return (
              <HStack
                key={`${admin?.name}-${admin?.lastName}-${index}`}
                justifyContent="space-between"
                rounded="10px"
                borderWidth="1px"
                py="21px"
                px="22px"
                bg={isYou ? "#B9FADB" : "transparent"}
              >
                <HStack>
                  <Text color="#194B33" fontSize="12px" fontWeight="500">{index + 1}</Text>
                  <Avatar
                    size="sm"
                    name={`${admin?.name || ''} ${admin?.lastName || ''}`}
                    src={admin?.picture || undefined}
                  />
                  <Text color="#101828" fontSize="13px" fontWeight="500">
                    {admin?.name} {admin?.lastName}
                  </Text>
                  {isYou && (
                    <Text color="#1018286B" fontSize="13px" fontWeight="500">(You)</Text>
                  )}
                  {(index < 3 || isYou) && (
                    <Image src={scholarshipImage8} w={"23.59px"} h={"33px"} />
                  )}
                </HStack>

                <Text color="#194B33" fontSize="18px" fontWeight="600" fontFamily="Clash Display">
                  {admin?.totalSchools ?? 0}
                </Text>
              </HStack>
            );
          })}
        </Stack>
      </Box>
    </MainLayout>
  );
}