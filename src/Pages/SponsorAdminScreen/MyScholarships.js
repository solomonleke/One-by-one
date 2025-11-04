import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import MainLayout from '../../DashboardLayout'
import { Text, Flex, HStack, Stack, VStack, Box, Center, Progress, Spacer, Icon, Avatar, Image, Tab, Tabs, TabList, TabPanel, TabPanels, TabIndicator, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter, Input, FormControl, FormLabel, useToast, Select, Divider, ModalCloseButton } from '@chakra-ui/react'
import { Tooltip as Tooltips } from '@chakra-ui/react';
import DashboardCard from "../../Components/DashboardCard"
import Button from "../../Components/Button"
import Preloader from "../../Components/Preloader"
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
import { FaCheck, FaPlus, FaArrowRight } from "react-icons/fa6";
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
import { IoPrintOutline } from "react-icons/io5";
import ShowToast from '../../Components/ToastNotification';
import { createScholarshipApi } from "../../Utils/ApiCall";
import { getActiveScholarships } from "../../Utils/ApiCall";
import { getScholarshipsBySponsor } from "../../Utils/ApiCall";
import { GetSponsorAdminStats, fundScholarshipApi } from "../../Utils/ApiCall";



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
import { BsThreeDots } from 'react-icons/bs';


export default function MyScholarships() {
  const router = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    purpose: '',
    motivation: '',
    amount: '0',
  });
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [scholarships, setScholarships] = useState([]);
  const [sponsorScholarships, setSponsorScholarships] = useState([]);
  const [paidScholarships, setPaidScholarships] = useState([]);
  const [activeScholarships, setActiveScholarships] = useState([]);
  const [awaitingFundingScholarships, setAwaitingFundingScholarships] = useState([]);
  const [awaitingScholarships, setAwaitingScholarships] = useState([]);

  const [showToast, setShowToast] = useState({ show: false, message: '', status: '' });
  const [error, setError] = useState(null);
  const [stats, setStats] = useState(null);
  const [activeScholarshipCount, setActiveScholarshipCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedScholarship, setSelectedScholarship] = useState(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);



  const [data, setData] = useState({
    scholarshipCount: 0,
  });

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);
  const toast = useToast();

  const handleOpenDetails = (scholarship) => {
    setSelectedScholarship(scholarship);
    setIsDetailsOpen(true);
  };

  const handleCloseDetails = () => {
    setIsDetailsOpen(false);
    setSelectedScholarship(null);
  };



  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: name === 'amount' ? String(Number(value)) : value // Convert to number first, then to string
    });
  };




  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const response = await createScholarshipApi(formData);
      console.log("✅ Scholarship created:", response);

      // ✅ Show custom toast
      setShowToast({
        message: "Scholarship successfully created!",
        status: "success",
        show: true,
      });

      // ✅ Reset form and close modal
      setFormData({ name: "", purpose: "", motivation: "", amount: "0" });
      closeModal();
      handleCloseDetails(); // if you have a secondary modal open

      // Optionally refresh data
      fetchActiveScholarships();

      // Auto-hide toast after 3 seconds
      setTimeout(() => {
        setShowToast({ ...showToast, show: false });
      }, 3000);

    } catch (error) {
      console.error("❌ Error creating scholarship:", error);

      setShowToast({
        message: "Failed to create scholarship.",
        status: "error",
        show: true,
      });

      setTimeout(() => {
        setShowToast({ ...showToast, show: false });
      }, 3000);
    } finally {
      setIsLoading(false);
    }
  };


  const fetchActiveScholarships = async () => {
    try {
      const res = await getScholarshipsBySponsor(); // sponsor-specific
      if (res.status && Array.isArray(res.data)) {
        // Filter active scholarships
        const active = res.data.filter(sch => sch.status === "active");
        setActiveScholarships(active);

        // Filter awaiting funding
        const awaiting = res.data.filter(sch => sch.status === "inactive");
        setAwaitingFundingScholarships(awaiting);
      }
    } catch (error) {
      console.error("Error fetching sponsor scholarships:", error);
    }
  };

  const fetchPaidScholarships = async () => {
    try {
      const res = await getActiveScholarships(); // This might return global ones
      if (res.status && Array.isArray(res.data.activeScholarship)) {
        // You can filter by payment flag
        const paid = res.data.activeScholarship.filter(sch => sch.isFunded);
        setPaidScholarships(paid);
      }
    } catch (error) {
      console.error("Error fetching paid scholarships:", error);
    }
  };


  // Component
  // Component
  const [loadingId, setLoadingId] = React.useState(null);
  const [receiptFile, setReceiptFile] = useState(null);
  const [uploadedReceiptFile, setUploadedReceiptFile] = useState(null);



  const fundScholarship = async (Id, receiptFile) => {
    try {
      setLoadingId(Id);

      const data = await fundScholarshipApi(Id, receiptFile);
      console.log("✅ Backend Response:", data);

      if (data.status === true) {
        setShowToast({
          show: true,
          message: data.message || "Scholarship funded successfully!",
          status: "success",
        });
        setTimeout(() => setShowToast({ show: false }), 3000);
      } else {
        throw new Error(data.message || "Funding failed.");
      }
    } catch (err) {
      console.error("🚨 Funding error:", err);
      setShowToast({
        show: true,
        message: err.message || "An error occurred while funding the scholarship.",
        status: "error",
      });
      setTimeout(() => setShowToast({ show: false }), 3000);
    } finally {
      setLoadingId(null);
    }
  };






  const fetchScholarshipsBySponsor = async () => {
    try {
      const data = await getScholarshipsBySponsor();

      if (data.status && Array.isArray(data.data)) {
        setSponsorScholarships((prev) => {
          const updated = [...prev];

          data.data.forEach((newSch) => {
            const existingIndex = updated.findIndex((old) => old.id === newSch.id);

            if (existingIndex !== -1) {
              // Merge and keep all students (avoid overwriting)
              updated[existingIndex] = {
                ...updated[existingIndex],
                ...newSch,
                students: [
                  ...(updated[existingIndex].students || []),
                  ...(newSch.students || []),
                ].filter(
                  (v, i, self) =>
                    i === self.findIndex((s) => s.request_id === v.request_id)
                ), // prevent duplicates
              };
            } else {
              updated.push(newSch);
            }
          });

          return updated;
        });
      } else {
        console.error("Unexpected response format:", data);
        setError(data.message || "Failed to load scholarships");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
      setIsLoading(false);
    }
  };

  const fetchData = async () => {
    try {
      console.log("Fetching Dashboard Stats...");

      const data = await GetSponsorAdminStats();
      console.log("Fetched Dashboard Stats:", data);

      if (data) {
        setStats(data);
        setData({
          scholarshipCount: data.scholarshipCount,
        });
      } else {
        console.error("Dashboard data is null or undefined.");
      }
    } catch (error) {
      console.error("Error fetching dashboard data:", error.message);
    } finally {
      setLoading(false);
      setIsLoading(false);
    }
  };



  useEffect(() => {
    fetchPaidScholarships();
    fetchActiveScholarships();
    fetchData();
  }, [isOpen]);

  const ScholarshipList = ({ scholarships, type }) => (
    <Stack spacing="20px">
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
            {/* Header section */}
            <HStack alignItems="flex-start" spacing="12px">
              <Box bg="#39996B" w="3px" h="33px" rounded="3px" />
              <Stack flex="1">
                <Text color="#1F2937" fontSize="14px" fontWeight="600">
                  {scholarship.name ?? "Unnamed Scholarship"}
                </Text>
                <Text color="#767F8E" fontSize="12px">
                  Date Created:{" "}
                  {scholarship.created_at
                    ? new Date(scholarship.created_at).toLocaleDateString()
                    : "N/A"}
                </Text>
              </Stack>
  
              {/* Buttons (desktop only) */}
              {type === "active" && (
                <HStack
                  spacing="4"
                  display={{ base: "none", md: "flex" }}
                  align="center"
                  justify="flex-end"
                >
                  <Button
                    fontSize="14px"
                    px="50px"
                    color="#39996B"
                    background="white"
                    onClick={() => handleOpenDetails(scholarship)}
                  >
                    Fund Scholarship
                  </Button>
                  <Button
                    px="30px"
                    onClick={() => router("/sponsor-admin/discoverstudents")}
                  >
                    Add Student
                  </Button>
                </HStack>
              )}
  
              {type === "awaiting" && (
                <Button
                  w="200px"
                  px="30px"
                  display={{ base: "none", md: "block" }}
                  onClick={() => router("/sponsor-admin/discoverstudents")}
                >
                  Add Student
                </Button>
              )}
            </HStack>
  
            {/* Students Row + View Funds History (desktop) */}
            <HStack
              flexWrap="wrap"
              spacing="10px"
              justify="space-between"
              align="center"
            >
              <HStack spacing="10px" flexWrap="wrap">
                {scholarship.students?.length > 0 ? (
                  scholarship.students.slice(0, 2).map((student, idx) => (
                    <HStack key={idx} bg="#E8F2ED" p="8px" rounded="31px">
                      <Avatar size="sm" name={student.full_name} />
                      <Text color="#101828" fontSize="13px" fontWeight="500">
                        {student.full_name}
                      </Text>
                    </HStack>
                  ))
                ) : (
                  <Text color="#767F8E" fontSize="12px">
                    No students assigned
                  </Text>
                )}
              </HStack>
  
              {/* ✅ View Funds History now sits beside students (desktop only) */}
              {type === "active" && (
                <HStack
                  cursor="pointer"
                  onClick={() => router("/sponsor-admin/fundinghistory")}
                  display={{ base: "none", md: "flex" }}
                >
                  <Text fontSize="12px" fontWeight="500" color="#39996B">
                    View Funds History
                  </Text>
                  <FaArrowRight color="#39996B" />
                </HStack>
              )}
            </HStack>
  
            {/* Mobile-only buttons + link */}
            {type === "active" && (
              <Stack
                direction="column"
                spacing={2}
                align="center"
                justify="center"
                display={{ base: "flex", md: "none" }}
                mt={2}
              >
                <Button
                  fontSize="12px"
                  px="30px"
                  color="#39996B"
                  background="white"
                  onClick={() => handleOpenDetails(scholarship)}
                >
                  Fund Scholarship
                </Button>
                <Button
                  px="30px"
                  onClick={() => router("/sponsor-admin/discoverstudents")}
                >
                  Add Student
                </Button>
  
                {/* ✅ Mobile version of View Funds History */}
                <HStack
                  w="100%"
                  justify="flex-start"
                  cursor="pointer"
                  onClick={() => router("/sponsor-admin/fundinghistory")}
                >
                  <Text fontSize="12px" fontWeight="500" color="#39996B">
                    View Funds History
                  </Text>
                  <FaArrowRight color="#39996B" />
                </HStack>
              </Stack>
            )}
          </Stack>
        ))
      ) : (
        <Text fontSize="14px" fontWeight="500" color="#767F8E">
          No scholarships available.
        </Text>
      )}
    </Stack>
  );
  
  




  return (
    <MainLayout>
      {
        isLoading && <Preloader />
      }
      {showToast.show && (
        <ShowToast message={showToast.message} status={showToast.status} show={showToast.show} />
      )}
      <HStack justifyContent="space-between" w="100%" flexWrap={{ base: "wrap", md: "nowrap" }}>
        <Box w={{ base: "100%", md: "80%" }}>
          <Text fontSize={"21px"} lineHeight={"25.41px"} fontWeight="700">My Scholarships <Box as="span" color="#667085" fontSize="18px" fontWeight="400">({data.scholarshipCount})</Box></Text>
          <Text mt="9px" color={"#686C75"} fontWeight={"400"} fontSize={"15px"} mb={5} gap={"9px"} lineHeight={"24px"}>Manage your scholarships effortlessly. Support students, and create new opportunities to make a lasting impact.</Text>
        </Box>

        <Spacer />

        <Box w={{ base: "100%", md: "20%" }} mt={{ base: "10px", md: "0" }}>
          <Button onClick={openModal} w="100%"><Box as="span" display="inline-flex" pr="6px" isLoading={loading} ><FaPlus /></Box>Create Scholarship</Button>
        </Box>
      </HStack>

      <Modal isOpen={isOpen} onClose={closeModal} >
        {showToast.show && (
          <ShowToast message={showToast.message} status={showToast.status} show={showToast.show} />
        )}
        <ModalOverlay />
        <ModalContent maxW="537px">
          <ModalHeader px="25px" pt="23px">
            <Text fontSize="19px">Create Scholarship</Text>
            <Text fontSize="14px" color="#6B7280" fontWeight="400" >Fill in the details below to create a scholarship.</Text>
          </ModalHeader>
          <ModalBody>
            <FormControl mb={4}>
              <FormLabel fontSize="14px">Scholarship Name</FormLabel>
              <Input name="name" fontSize="13px" color="#ADB4BF" value={formData.name} onChange={handleChange} placeholder="e.g Operation helping students" />
            </FormControl>
            <FormControl mb={4}>
              <FormLabel fontSize="14px">Purpose of Scholarship</FormLabel>
              <Select
                name="purpose"
                fontSize="13px"
                color="#ADB4BF"
                value={formData.purpose}
                onChange={handleChange}
                placeholder="Select Purpose"
              >
                <option value="memorial">Memorial</option>
                <option value="personal">Personal</option>
                <option value="representing a group">Representing a group</option>
                <option value="representing a place">Representing a place</option>
                <option value="others">Others</option>
              </Select>
            </FormControl>
            <FormControl mb={4}>
              <FormLabel fontSize="14px">Motivation</FormLabel>
              <Input name="motivation" fontSize="13px" color="#ADB4BF" value={formData.motivation} onChange={handleChange} placeholder="What motivates you to sponsor students?" />
            </FormControl>
            <FormControl mb={4}>
              <FormLabel fontSize="14px">Amount</FormLabel>
              <Input name="amount" fontSize="13px" color="#ADB4BF" value={formData.amount} onChange={handleChange} placeholder="Amount" />
            </FormControl>

          </ModalBody>
          <ModalFooter gap="10px">
            <Button onClick={closeModal} w="80px" background="white" color="green" border="1px solid green" mr={3}>Cancel</Button>
            <Button w="173px" onClick={handleSubmit} isLoading={loading}>Create Scholarship</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Box bg="#fff" border="1px solid #EFEFEF" mt="12px" py='17px' px={["10px", "10px", "18px", "18px"]} rounded='10px'>
        <Tabs>
          <TabList overflowX="auto" overflowY="hidden" _focus={{ outline: "none" }}>
            {/* <Tab _selected={{ color: "green", borderColor: "green", fontWeight: "500" }} fontSize="13px">
              Paid Scholarships ({paidScholarships.length})
            </Tab> */}
            <Tab _selected={{ color: "green", borderColor: "green", fontWeight: "500" }} fontSize="13px">
              Active Scholarships ({activeScholarships.length})
            </Tab>
            <Tab _selected={{ color: "green", borderColor: "green", fontWeight: "500" }} fontSize="13px">
              Awaiting Funding ({awaitingFundingScholarships.length})
            </Tab>
          </TabList>

          <TabIndicator mt="-1.5px" height="2px" bg="green" borderRadius="1px" />

          <TabPanels>
            {/* PAID SCHOLARSHIPS */}
            {/* <TabPanel>
              <ScholarshipList scholarships={paidScholarships} type="paid" />
            </TabPanel> */}

            {/* ACTIVE SCHOLARSHIPS */}
            <TabPanel>
              <ScholarshipList scholarships={activeScholarships} type="active" />
            </TabPanel>

            {/* AWAITING FUNDING */}
            <TabPanel>
              <ScholarshipList scholarships={awaitingFundingScholarships} type="awaiting" />
            </TabPanel>
          </TabPanels>
        </Tabs>

        <Modal isOpen={isDetailsOpen} onClose={handleCloseDetails} size="lg" isCentered>
          <ModalOverlay />
          <ModalContent borderRadius="2xl" boxShadow="xl" overflow="hidden">
            {/* Header with Close Button */}
            <ModalHeader
              bg="greenn.greenn500"
              color="white"
              fontFamily="Poppins, sans-serif"
              textAlign="center"
              fontWeight="semibold"
              position="relative"
              py={4}
            >
              Scholarship Details
              <ModalCloseButton color="white" top="12px" right="16px" />
            </ModalHeader>

            {/* Body */}
            <ModalBody px={6} py={5}>
              {selectedScholarship ? (
                <VStack align="start" spacing={4}>
                  <Box w="full" textAlign="center">
                    <Text fontSize="sm" color="gray.500">
                      Scholarship Amount
                    </Text>
                    <Text
                      fontFamily="Montserrat, sans-serif"
                      fontWeight="bold"
                      fontSize="5xl"
                      color="green.700"
                    >
                      ₦
                      {selectedScholarship.amount
                        ? parseInt(selectedScholarship.amount).toLocaleString()
                        : "N/A"}
                    </Text>
                  </Box>

                  <Divider my={2} />

                  <VStack align="center" spacing={2} w="full">
                    <Text fontWeight="700" fontSize="20px">
                      To be paid to:
                    </Text>

                    <VStack spacing={1} align="center">
                      <HStack>
                        <Text fontWeight="600">Account Name:</Text>
                        <Text fontSize="18px">OneByOne</Text>
                      </HStack>

                      <HStack>
                        <Text fontWeight="600">Account Number:</Text>
                        <Text fontSize="18px">2209343074</Text>
                      </HStack>

                      <HStack>
                        <Text fontWeight="600">Bank Name:</Text>
                        <Text fontSize="18px">Zenith Bank</Text>
                      </HStack>

                      <HStack>
                        <Text fontWeight="600">Date:</Text>
                        <Text>
                          {new Date().toLocaleDateString()}
                        </Text>
                      </HStack>
                    </VStack>
                  </VStack>


                  <Divider my={2} />

                  <Box w="full">
                    <Text fontWeight="semibold" mb={2}>
                      Students:
                    </Text>
                    {selectedScholarship.students.length > 0 ? (
                      <VStack align="start" spacing={2}>
                        {selectedScholarship.students.map((student, idx) => (
                          <HStack key={idx} spacing={3}>
                            <Avatar size="sm" name={student.full_name} />
                            <Text>{student.full_name}</Text>
                          </HStack>
                        ))}
                      </VStack>
                    ) : (
                      <Text color="gray.500">No students added yet</Text>
                    )}
                  </Box>
                  <FormControl mb={5}>
                    <FormLabel fontSize="sm" fontWeight="600" color="gray.700">
                      Upload Receipt
                    </FormLabel>

                    <Box
                      position="relative"
                      border="2px dashed"
                      borderColor={receiptFile ? "green.400" : "gray.300"}
                      borderRadius="xl"
                      p={6}
                      textAlign="center"
                      bg={receiptFile ? "green.50" : "gray.50"}
                      _hover={{
                        borderColor: "green.400",
                        bg: "green.50",
                      }}
                      transition="all 0.25s ease"
                    >
                      {/* Hidden input */}
                      <Input
                        id="receipt-upload"
                        type="file"
                        accept=".jpg,.jpeg,.png,.pdf"
                        display="none"
                        onChange={(e) => setReceiptFile(e.target.files[0])}
                      />

                      {/* Label acts as clickable area */}
                      <FormLabel
                        htmlFor="receipt-upload"
                        cursor="pointer"
                        m={0}
                        fontSize="sm"
                        color="gray.600"
                        _hover={{ color: "green.500" }}
                      >
                        {!receiptFile ? (
                          <>
                            <Text fontWeight="600" fontSize="md" mb={1}>
                              Click to upload or drag & drop
                            </Text>
                            <Text fontSize="xs" color="gray.500">
                              JPG, PNG or PDF (max 5MB)
                            </Text>
                          </>
                        ) : (
                          <Flex direction="column" align="center">
                            <Text fontWeight="600" color="green.600" fontSize="sm">
                              {receiptFile.name}
                            </Text>

                          </Flex>
                        )}
                      </FormLabel>
                    </Box>
                  </FormControl>




                </VStack>
              ) : (
                <Text textAlign="center" color="gray.500">
                  Loading details...
                </Text>
              )}
            </ModalBody>

            {/* Footer */}
            <ModalFooter justifyContent="space-between" gap="10px" bg="gray.50" py={4}>
              <Button
                variant="outline"
                background="transparent"
                color="greenn.greenn500"
                borderRadius="full"
                borderColor="greenn.greenn500"
                transition="all 0.2s ease"
                _hover={{
                  background: "greenn.greenn500",
                  color: "white",
                  transform: "scale(1.05)",
                  boxShadow: "0 4px 10px rgba(0, 128, 0, 0.2)",
                }}
                onClick={() => {
                  if (selectedScholarship) window.print();
                }}
              >
                <Flex align="center" justify="center" gap="8px">
                  <Text>Print </Text>
                  <IoPrintOutline size={18} />
                </Flex>
              </Button>

              <HStack spacing={3}>
                <Button
                  colorScheme="green"
                  borderRadius="full"
                  onClick={() => {
                    if (selectedScholarship && receiptFile) {
                      fundScholarship(selectedScholarship.id, receiptFile);
                    } else {
                      setShowToast({
                        title: "Please upload a receipt before proceeding",
                        status: "warning",
                        duration: 3000,
                        isClosable: true,
                      });
                    }
                  }}
                  isLoading={loadingId === selectedScholarship?.id}
                >
                  Initiate Transfer
                </Button>
              </HStack>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Box>
    </MainLayout>
  )
}
