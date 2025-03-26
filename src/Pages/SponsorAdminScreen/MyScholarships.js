import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import MainLayout from '../../DashboardLayout'
import { Text, Flex, HStack, Stack, VStack, Box, Center, Progress, Spacer, Icon, Avatar, Image, Tab, Tabs, TabList, TabPanel, TabPanels, TabIndicator, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter, Input, FormControl, FormLabel, useToast, Select } from '@chakra-ui/react'
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
import { createScholarshipApi } from "../../Utils/ApiCall";

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
    motivation: '' 
  });
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);
  const toast = useToast();


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setLoading(true);
  
    try {
      await createScholarshipApi(formData);
  
      toast({
        title: "Scholarship Created",
        description: "Scholarship has been successfully created!",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
  
      setFormData({ name: "", purpose: "", motivation: "" });
      closeModal();
    } catch (error) {
      console.error("❌ Error creating scholarship:", error);
  
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to create scholarship",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setLoading(false); // ✅ Always set loading to false, even if an error occurs
    }
  };
  



    return(
        <MainLayout>
            <HStack justifyContent="space-between" w="100%">
                <Box w="80%">
                <Text fontSize={"21px"} lineHeight={"25.41px"} fontWeight="700">My Scholarships <Box as="span" color="#667085" fontSize="18px" fontWeight="400">(5)</Box></Text>
                <Text mt="9px" color={"#686C75"} fontWeight={"400"} fontSize={"15px"} mb={5} gap={"9px"} lineHeight={"24px"}>Manage your scholarships effortlessly. Support students, and create new opportunities to make a lasting impact.</Text>
                </Box>

                <Spacer />

                <Box w="20%">
                <Button onClick={openModal}><Box as="span" display="inline-flex" pr="6px"><FaPlus /></Box>Create Scholarship</Button>
                </Box>
            </HStack>

            <Modal isOpen={isOpen} onClose={closeModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create Scholarship</ModalHeader>
          <ModalBody>
            <FormControl mb={4}>
              <FormLabel>Scholarship Name</FormLabel>
              <Input name="name" value={formData.name} onChange={handleChange} placeholder="Enter scholarship name" />
            </FormControl>
            <FormControl mb={4}>
  <FormLabel>Purpose of Scholarship</FormLabel>
  <Select 
    name="purpose" 
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
              <FormLabel>Motivation</FormLabel>
              <Input name="motivation" value={formData.motivation} onChange={handleChange} placeholder="What motivates you to sponsor students?" />
            </FormControl>

          </ModalBody>
          <ModalFooter>
            <Button onClick={closeModal} mr={3}>Cancel</Button>
            <Button colorScheme="blue" onClick={handleSubmit} isLoading={loading}>Create</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

            <Box bg="#fff" border="1px solid #EFEFEF" mt="12px" py='17px' px={["10px","10px","18px","18px"]} rounded='10px'>
        <Tabs>
          <TabList overflowX={"auto"} overflowY={"hidden"}>
            <Tab _selected={{ color: "green", borderColor: "green", fontWeight: "400" }} fontSize={"13px"} fontWeight={"400"} lineHeight={"20px"}>Active Scholarships (2)</Tab>
            <Tab _selected={{ color: "green", borderColor: "green", fontWeight: "400" }} fontSize={"13px"} fontWeight={"400"} lineHeight={"20px"}>Awaiting Funding (3)</Tab>
          </TabList>

          <TabIndicator mt='-1.5px' height='2px' bg='green' borderRadius='1px' />

          <TabPanels>
          <TabPanel>
            <Stack spacing="20px">
          <Stack borderWidth="1px" rounded="11px" py="12px" pl="8px" pr="16px" spacing="10px">
                    <HStack justifyContent="space-between">
                      <HStack>
                        <Box bg="#39996B" w="3px" h="33px" rounded="3px"></Box>
                         <Stack>
                        <Text color="#1F2937" fontSize="14px" fontWeight="600">STEM Excellence Scholarship</Text>
                        <Text color="#767F8E" fontSize="12px" fontWeight="400">Date Created: Oct 6th, 9:00AM</Text>
                      </Stack>
                      </HStack>
                     
                     <HStack>
                     <Text color="#344054" fontSize="12px" fontWeight="400">Amount:</Text>
                      <Text color="#3F4956" fontSize="17px" fontWeight="600">₦100,000</Text>
                    </HStack>
                    </HStack>

                    <hr className="remove"/>

                    <HStack justifyContent="space-between">
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

                    <HStack cursor="pointer" onClick={() => {
                      router("/sponsor-admin/fundinghistory")
                    }}>
                      <Text fontSize="12px" fontWeight="500" color="#39996B">View Funds History</Text>
                      <FaArrowRight color="#39996B"/>
                    </HStack>
                    </HStack>
                  </Stack>

                  <Stack borderWidth="1px" rounded="11px" py="12px" pl="8px" pr="16px" spacing="10px">
                    <HStack justifyContent="space-between">
                      <HStack>
                        <Box bg="#39996B" w="3px" h="33px" rounded="3px"></Box>
                         <Stack>
                        <Text color="#1F2937" fontSize="14px" fontWeight="600">Pathway to Excellence Scholarship</Text>
                        <Text color="#767F8E" fontSize="12px" fontWeight="400">Date Created: Oct 1st, 10:00AM</Text>
                      </Stack>
                      </HStack>
                     
                     <HStack>
                     <Text color="#344054" fontSize="12px" fontWeight="400">Amount:</Text>
                      <Text color="#3F4956" fontSize="17px" fontWeight="600">₦50,000</Text>
                    </HStack>
                    </HStack>

                    <hr className="remove"/>

                    <HStack justifyContent="space-between">
                    <HStack>
                      <HStack bg="#E8F2ED" p="8px" rounded="31px">
                        <Avatar size="sm" name="Sarah Divine"/>
                        <Text color="#101828" fontSize="13px" fontWeight="500">Sarah Divine</Text>
                      </HStack>
                    </HStack>

                    <HStack cursor="pointer" onClick={() => {
                      router("/sponsor-admin/fundinghistory")
                    }}>
                      <Text fontSize="12px" fontWeight="500" color="#39996B">View Funds History</Text>
                      <FaArrowRight color="#39996B"/>
                    </HStack>
                    </HStack>
                  </Stack>
                  </Stack>
          </TabPanel>


          <TabPanel>
            <Stack spacing="20px">
          <Stack borderWidth="1px" rounded="11px" py="12px" pl="8px" pr="16px" spacing="10px">
                    <HStack justifyContent="space-between">
                      <HStack>
                        <Box bg="#39996B" w="3px" h="61px" rounded="3px"></Box>
                         <Stack>
                        <Text color="#1F2937" fontSize="14px" fontWeight="600">Rising Stars Scholarship <Box as="span" display="inline-flex" my={"auto"}><BsThreeDots /></Box></Text>
                        <Text color="#767F8E" fontSize="12px" fontWeight="400">Amount: <Box as="span" color="#344054" fontSize="12px" fontWeight="500">₦225,000</Box></Text>
                        <Text color="#767F8E" fontSize="12px" fontWeight="400">Date Created: Oct 6th, 9:00AM</Text>
                      </Stack>
                      </HStack>
                     
                     <HStack>
                      <Button px="50px" color="#39996B" background="white">Fund Scholarship</Button>
                      <Button px="30px">Add Student</Button>
                    </HStack>
                    </HStack>

                    <hr className="remove"/>

                    <HStack>
                      <HStack bg="#E8F2ED" p="8px" rounded="31px">
                        <Avatar size="sm" name="Emmanuel Ifeanyi"/>
                        <Text color="#101828" fontSize="13px" fontWeight="500">Emmanuel Ifeanyi</Text>
                      </HStack>

                      <HStack bg="#E8F2ED" p="8px" rounded="31px">
                        <Avatar size="sm" name="Saviour Promise"/>
                        <Text color="#101828" fontSize="13px" fontWeight="500">Saviour Promise</Text>
                      </HStack>

                      <HStack bg="#E8F2ED" p="8px" rounded="31px">
                        <Avatar size="sm" name="Solomon Adeleke"/>
                        <Text color="#101828" fontSize="13px" fontWeight="500">Solomon Adeleke</Text>
                      </HStack>
                    </HStack>
                  </Stack>

                  <Stack borderWidth="1px" rounded="11px" py="12px" pl="8px" pr="16px" spacing="10px">
                    <HStack justifyContent="space-between">
                      <HStack>
                        <Box bg="#39996B" w="3px" h="35px" rounded="3px"></Box>
                         <Stack>
                        <Text color="#1F2937" fontSize="14px" fontWeight="600">Legacy of Learning Scholarship <Box as="span" display="inline-flex" my={"auto"}><BsThreeDots /></Box></Text>
                        <Text color="#767F8E" fontSize="12px" fontWeight="400">Date Created: Oct 6th, 9:00AM</Text>
                      </Stack>
                      </HStack>
                     
                     <HStack>
                      <Button px="50px" color="#39996B" background="white" disabled={true} >Fund Scholarship</Button>
                      <Button px="30px">Add Student</Button>
                    </HStack>
                    </HStack>
                  </Stack>

                  <Stack borderWidth="1px" rounded="11px" py="12px" pl="8px" pr="16px" spacing="10px">
                    <HStack justifyContent="space-between">
                      <HStack>
                        <Box bg="#39996B" w="3px" h="35px" rounded="3px"></Box>
                         <Stack>
                        <Text color="#1F2937" fontSize="14px" fontWeight="600">NextGen Scholars Fund <Box as="span" display="inline-flex" my={"auto"}><BsThreeDots /></Box></Text>
                        <Text color="#767F8E" fontSize="12px" fontWeight="400">Date Created: Oct 6th, 9:00AM</Text>
                      </Stack>
                      </HStack>
                     
                     <HStack>
                      <Button px="50px" color="#39996B" background="white" disabled={true}>Fund Scholarship</Button>
                      <Button px="30px">Add Student</Button>
                    </HStack>
                    </HStack>
                  </Stack>
                  </Stack>
          </TabPanel>
          </TabPanels>
            </Tabs>
            </Box>
        </MainLayout>
    )
}