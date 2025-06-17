import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import MainLayout from '../../DashboardLayout'
import { Text, Flex, HStack, Stack, VStack, Box, Center, Progress, Spacer, Icon, Avatar, Image, Tab, Tabs, TabList, TabPanel, TabPanels, TabIndicator, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter, Input, FormControl, FormLabel, useToast, Select } from '@chakra-ui/react'
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
    amount: '',
  });
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [scholarships, setScholarships] = useState([]);
  const [sponsorScholarships, setSponsorScholarships] = useState([]);
  const [showToast, setShowToast] = useState({ show: false, message: '', status: '' });
  const [error, setError] = useState(null);
  const [stats, setStats] = useState(null);
  const [activeScholarshipCount, setActiveScholarshipCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);


  const [data, setData] = useState({
    scholarshipCount: 0,
  });

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);
  const toast = useToast();


  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: name === 'amount' ? String(Number(value)) : value // Convert to number first, then to string
    });
  };




  const handleSubmit = async () => {
    console.log("Submitting formData:", formData); // Debugging

    setLoading(true);
    try {
      const response = await createScholarshipApi(formData);
      console.log("Server Response:", response); // Debugging

      setShowToast({
        show: true,
        message: "Scholarship successfully created!",
        status: "success",
      });
      setTimeout(() => setShowToast({ show: false }), 3000);

      setFormData({ name: "", purpose: "", motivation: "", amount: "0" });
      closeModal();
    } catch (error) {
      console.error("❌ Error creating scholarship:", error);
      console.error("Server Response:", error.response?.data || "No response data");

      setShowToast({ 
        show: true, 
        message: error.message || "Failed to create scholarship.", 
        status: "error" 
      });
      setTimeout(() => setShowToast({ show: false }), 3000);
    } finally {
      setLoading(false);
      setIsLoading(false);
    }
  };


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
      setIsLoading(false);
    }
  };

  // Component
// Component
const [loadingId, setLoadingId] = React.useState(null);

const fundScholarship = async (Id) => {
  try {
    setLoadingId(Id);  // mark this scholarship as loading
    const data = await fundScholarshipApi(Id);
    if (data.status === true && data.paymentLink) {
      window.location.assign(data.paymentLink);
    } else {
      throw new Error("Payment link not received.");
    }
  } catch (err) {
    setError(err.message);
  } finally {
    setLoadingId(null);  // reset loading state for this scholarship
  }
};


  

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
    
    fetchScholarships();
    fetchScholarshipsBySponsor();
    fetchData();
  }, [isOpen]);

  if (isLoading) return <Preloader message="Fetching scholarships..." />;

  return (
    <MainLayout>
    {showToast.show && (
        <ShowToast message={showToast.message} status={showToast.status} show={showToast.show} />
      )}
      <HStack justifyContent="space-between" w="100%">
        <Box w="80%">
          <Text fontSize={"21px"} lineHeight={"25.41px"} fontWeight="700">My Scholarships <Box as="span" color="#667085" fontSize="18px" fontWeight="400">({data.scholarshipCount})</Box></Text>
          <Text mt="9px" color={"#686C75"} fontWeight={"400"} fontSize={"15px"} mb={5} gap={"9px"} lineHeight={"24px"}>Manage your scholarships effortlessly. Support students, and create new opportunities to make a lasting impact.</Text>
        </Box>

        <Spacer />

        <Box w="20%">
          <Button onClick={openModal}><Box as="span" display="inline-flex" pr="6px" isLoading={loading} ><FaPlus /></Box>Create Scholarship</Button>
        </Box>
      </HStack>

      <Modal isOpen={isOpen} onClose={closeModal} >
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
            <Button  w="173px" onClick={handleSubmit} isLoading={loading}>Create Scholarship</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Box bg="#fff" border="1px solid #EFEFEF" mt="12px" py='17px' px={["10px", "10px", "18px", "18px"]} rounded='10px'>
        <Tabs>
          <TabList overflowX={"auto"} overflowY={"hidden"} _focus={{outline: "none"}}>
            <Tab _selected={{ color: "green", borderColor: "green", fontWeight: "400" }} _focus={{outline: "none"}} fontSize={"13px"} fontWeight={"400"} lineHeight={"20px"}>Paid Scholarships (0) </Tab>
            <Tab _selected={{ color: "green", borderColor: "green", fontWeight: "400" }} _focus={{outline: "none"}} fontSize={"13px"} fontWeight={"400"} lineHeight={"20px"}>Active Scholarships ({activeScholarshipCount}) </Tab>
            <Tab _selected={{ color: "green", borderColor: "green", fontWeight: "400" }} _focus={{outline: "none"}} fontSize={"13px"} fontWeight={"400"} lineHeight={"20px"}>Awaiting Funding ({data.scholarshipCount})</Tab>
          </TabList>

          <TabIndicator mt='-1.5px' height='2px' bg='green' borderRadius='1px' />

          <TabPanels>
            <TabPanel>
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

                        {/* Navigation to Funding History */}
                        <HStack cursor="pointer" onClick={() => router("/sponsor-admin/fundinghistory")}>
                          <Text fontSize="12px" fontWeight="500" color="#39996B">
                            View Funds History
                          </Text>
                          <FaArrowRight color="#39996B" />
                        </HStack>
                      </HStack>
                    </Stack>
                  ))
                ) : (
                  <Text fontSize="14px" fontWeight="500" color="#767F8E">
                    No scholarships available.
                  </Text>
                )}



                
              </Stack>
            </TabPanel>


            <TabPanel>
              <Stack spacing="20px">
                {sponsorScholarships.length > 0 ? (
                  sponsorScholarships.map((scholarship, index) => (
                    <Stack
                      key={scholarship.id || index}
                      borderWidth="1px"
                      rounded="11px"
                      py="12px"
                      pl="8px"
                      pr="16px"
                      spacing="10px"
                    >
                      {/* Scholarship Info */}
                      <HStack justifyContent="space-between">
                        <HStack>
                          <Box bg="#39996B" w="3px" h="61px" rounded="3px"></Box>
                          <Stack>
                            <Text color="#1F2937" fontSize="14px" fontWeight="600">
                              {scholarship.name || "Unnamed Scholarship"}{" "}
                              <Box as="span" display="inline-flex" my="auto">
                                <BsThreeDots />
                              </Box>
                            </Text>
                            <Text color="#767F8E" fontSize="12px" fontWeight="400">
                              Date Created: {scholarship.created_at ? new Date(scholarship.created_at).toLocaleDateString() : "N/A"}
                            </Text>
                          </Stack>
                        </HStack>

                        {/* Action Buttons */}
                        <HStack>
                        <Button
  px="50px"
  color="#39996B"
  background="white"
  onClick={() => fundScholarship(scholarship.id)}
  isLoading={loadingId === scholarship.id}  // only loading for clicked button
  loadingText="Funding"
>
  Fund Scholarship
</Button>

                          <Button px="30px" onClick={() => router("/sponsor-admin/discoverstudents")}>
                            Add Student
                          </Button>
                        </HStack>
                      </HStack>

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
                        ) : null}
                      </HStack>

                      
                    </Stack>
                  ))
                ) : (
                  <Text fontSize="14px" fontWeight="500" color="#767F8E">
                    No scholarships available.
                  </Text>
                )}



                
              </Stack>
            </TabPanel>
            
            <TabPanel>
              <Stack spacing="20px">
                {sponsorScholarships.length > 0 ? (
                  sponsorScholarships.map((scholarship, index) => (
                    <Stack
                      key={scholarship.id || index}
                      borderWidth="1px"
                      rounded="11px"
                      py="12px"
                      pl="8px"
                      pr="16px"
                      spacing="10px"
                    >
                      {/* Scholarship Info */}
                      <HStack justifyContent="space-between">
                        <HStack>
                          <Box bg="#39996B" w="3px" h="61px" rounded="3px"></Box>
                          <Stack>
                            <Text color="#1F2937" fontSize="14px" fontWeight="600">
                              {scholarship.name || "Unnamed Scholarship"}{" "}
                              <Box as="span" display="inline-flex" my="auto">
                                <BsThreeDots />
                              </Box>
                            </Text>
                            <Text color="#767F8E" fontSize="12px" fontWeight="400">
                              Date Created: {scholarship.created_at ? new Date(scholarship.created_at).toLocaleDateString() : "N/A"}
                            </Text>
                          </Stack>
                        </HStack>

                        {/* Action Buttons */}
                        <HStack>
                          
                          <Button px="30px" onClick={() => router("/sponsor-admin/discoverstudents")}>
                            Add Student
                          </Button>
                        </HStack>
                      </HStack>

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
                        ) : null}
                      </HStack>

                      
                    </Stack>
                  ))
                ) : (
                  <Text fontSize="14px" fontWeight="500" color="#767F8E">
                    No scholarships available.
                  </Text>
                )}



                
              </Stack>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </MainLayout>
  )
}