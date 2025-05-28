import React, { useState, useEffect } from 'react'
import MainLayout from '../../DashboardLayout'
import Button from "../../Components/Button"
import Input from "../../Components/Input"
import { ReactComponent as EditIcon } from "../../Asset/editIcon.svg";
import { ReactComponent as Warning } from "../../Asset/warning.svg";
import { ReactComponent as Close } from "../../Asset/close.svg";
import { ReactComponent as ProfilePicture } from "../../Asset/profileImage.svg"
import { useBreakpointValue, Divider, Grid, Icon, Box, HStack, Text, VStack, Flex, Tabs, Switch, Stack, TabList, Spacer, TabPanels, Tab, TabPanel, TabIndicator } from '@chakra-ui/react'
import { VscCloudUpload } from "react-icons/vsc";
import { TbFileMinus } from "react-icons/tb";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { FaRegFilePdf } from "react-icons/fa";
import ShowToast from '../../Components/ToastNotification';
import { UploadDocumentApi } from "../../Utils/ApiCall";
import { GetAdminStats } from "../../Utils/ApiCall";

export default function Settings() {

  const isMobile = useBreakpointValue({ base: "100%", md: "500px", lg: "528px" });
  const [loading, setLoading] = useState(false);
  const [showToast, setShowToast] = useState({ show: false, message: '', status: '' });
  const initialFiles = {
    certificate: null,
    tin: null,
    educationApproval: null,
    schoolCert: null,
    idFront: null,
    idBack: null,
  };
  
  const [files, setFiles] = useState(() => {
    const savedFiles = JSON.parse(localStorage.getItem("uploadedFiles")) || initialFiles;
    return savedFiles;
  });
  
  

    
  
  const handleFileChange = (e, field) => {
    const file = e.target.files[0];
  
    if (file) {
      setFiles((prev) => {
        const updatedFiles = {
          ...prev,
          [field]: { file, name: file.name, size: file.size }, // Keep actual file in state
        };
        localStorage.setItem(
          "uploadedFiles",
          JSON.stringify(
            Object.fromEntries(
              Object.entries(updatedFiles).map(([key, value]) => [
                key,
                value ? { name: value.name, size: value.size } : null, // Store metadata only
              ])
            )
          )
        );
        return updatedFiles;
      });
    }
  };
  
  
    
  
  const handleSubmit = async () => {
    setLoading(true); // Start loading before the upload process
  
    const ownerType = "ADMIN";
    const studentEmail = ownerType === "STUDENT" ? "student@example.com" : null;
  
    try {
      for (const [key, fileData] of Object.entries(files)) {
        if (fileData?.file) {
          await UploadDocumentApi(fileData.file, key, ownerType, studentEmail);
        }
      }
      
      console.log("All documents uploaded successfully!");
      setShowToast({
        show: true,
        message: "Document upload successful!",
        status: "success",
      });
  
    } catch (error) {
      console.error("Error uploading documents", error);
      setShowToast({ 
        show: true, 
        message: error.message || "Failed to upload documents.", 
        status: "error" 
      });
  
    } finally {
      setLoading(false); // Stop loading after success or failure
      setTimeout(() => setShowToast({ show: false }), 3000);
    }
  };
  
  
  

    const fetchData = async () => {
      try {
        // Call the function correctly
        const data = await GetAdminStats();
        
        console.log("Fetched Data:", data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    
    // Call the function
    fetchData();
    
    
  
  
  

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {

    const storedName = JSON.parse(localStorage.getItem('onlineUser'));
    if (storedName) {
      setFirstName(`${storedName.firstName}`);
      setLastName(`${storedName.lastName}`);
      setEmail(`${storedName.email}`);
    }
  }, []);

  return (
    <MainLayout>
    {showToast.show && (
        <ShowToast message={showToast.message} status={showToast.status} show={showToast.show} />
      )}
      <Text color={"#1F2937"} fontWeight={"700"} fontSize={"24px"} lineHeight={"25.41px"}>Settings</Text>
      <Text mt="9px" color={"#686C75"} fontWeight={"400"} fontSize={"15px"} lineHeight={"24px"}>
        Configure your login credentials, set up two-factor authentication for added security, and adjust account preferences.
      </Text>

      <Box bg="#fff" border="1px solid #EFEFEF" mt="12px" py='17px' px={["10px","10px","18px","18px"]} rounded='10px'>
        <Tabs>
          <TabList overflowX={"auto"} overflowY={"hidden"}>
            <Tab _selected={{ color: "green", borderColor: "green" }} fontSize={"14px"} fontWeight={"600"} lineHeight={"20px"}>Your Profile</Tab>
            <Tab _selected={{ color: "green", borderColor: "green" }} fontSize={"14px"} fontWeight={"600"} lineHeight={"20px"}>Notifications</Tab>
          </TabList>

          <TabIndicator mt='-1.5px' height='2px' bg='green' borderRadius='1px' />

          <TabPanels>
            <TabPanel>
              <Box mt="12px" bg="#fff" border="2px solid #EFEFEF" py='30px' px={["8px","8px","18px","18px"]} rounded='10px'>
                <Text fontSize={"17px"} fontWeight={"600"} lineHeight={"20.57px"} color={"#1F2937"}>Personal Information</Text>
                <Text fontSize={"13px"} fontWeight={"400"} lineHeight={"27px"} color={"#626974"}>Manage and update your profile information, including contact details and profile photo.</Text>

                <VStack alignItems={"start"}>

                  <VStack mt={"20px"} spacing={"15px"} w="100%">
                    <hr className="remove" />
                    <HStack justifyContent="space-between" w="100%">
                      <Box w="30%">
                        <Text fontSize={"14px"} fontWeight={"500"} lineHeight={"22px"} color={"#1F2937"}>First Name</Text>
                      </Box>
                      <Box w="70%">
                        <Input placeholder={firstName} />
                      </Box>
                    </HStack>
                    <hr className="remove" />
                    <HStack justifyContent="space-between" w="100%">
                      <Box w="30%">
                        <Text fontSize={"14px"} fontWeight={"500"} lineHeight={"22px"} color={"#1F2937"}>Last Name</Text>
                      </Box>
                      <Box w="70%">
                        <Input placeholder={lastName} />
                      </Box>
                    </HStack>
                    <hr className="remove" />
                    <HStack justifyContent="space-between" w="100%">
                      <Box w="30%">
                        <Text fontSize={"14px"} fontWeight={"500"} lineHeight={"22px"} color={"#1F2937"}>Email</Text>
                      </Box>
                      <Box w="70%">
                        <Input placeholder={email} />
                      </Box>
                    </HStack>
                    <hr className="remove" />
                    <HStack justifyContent="space-between" w="100%">
                      <Box w="30%">
                        <Text fontSize={"14px"} fontWeight={"500"} lineHeight={"22px"} color={"#1F2937"}>Profile Picture</Text>
                      </Box>
                      <Box w="70%">
                        <HStack spacing={"30px"}>
                          <ProfilePicture />
                          <HStack borderWidth={"1px"} cursor={"pointer"} borderColor={"#39996B"} fontWeight={"500"} color={"#39996B"} borderRadius={"8px"} px={"20px"} py={"8px"}>
                            <Text>Edit</Text>
                            <Box as='span'><EditIcon display={"inline-block"} /></Box>
                          </HStack>
                        </HStack>
                      </Box>
                    </HStack>
                    <hr className="remove" />
                    <HStack justifyContent="space-between" border="2px solid #EFEFEF" py='17px' px="18px" rounded='10px' w="100%" flexWrap={["wrap","nowrap","no-wrap","no-wrap"]}>
                      <Box>
                      <Box w={["100%","100%","30%","30%"]}>
                        <Text fontSize={"14px"} textAlign="left" fontWeight={"500"} lineHeight={"22px"} color={"#1F2937"}>Password Management</Text>
                      </Box>
                      <Box w={["100%","100%","70%","70%"]}>
                          <Text fontSize={"14px"} textAlign="left" fontWeight={"400"} lineHeight={"21px"} color={"#626974"}>Update your password regularly to keep your account secure. Create a strong password with a mix of letters, numbers, and special characters.</Text>
                        </Box>
                      </Box>

                    <Flex justifyContent={["flex-start", "flex-start", "flex-end", "flex-end"]} alignItems="center">
                <Button w="10%" color='greenn.greenn400' background='#fff'>Update</Button>
              </Flex>
                    </HStack>
                  </VStack>
                </VStack>
              </Box>
              <Flex justifyContent="flex-end" alignItems="center" mt="20px">
                <Button w="10%">Update</Button>
              </Flex>
            </TabPanel>


            <TabPanel>
              <Box mt="12px" bg="#fff" border="2px solid #EFEFEF" py='20px' px={["8px","8px","18px","18px"]} rounded='10px'>
                <VStack alignItems={"start"}>

                  <VStack spacing={"15px"} w="100%">
                    <HStack justifyContent="space-between" w="100%">
                      <Box w={["90%","90%","95%","95%"]}>
                        <Text fontSize={"15px"} fontWeight={"500"} lineHeight={"18.15px"} color={"#1F2937"}>Receive All Notifications</Text>
                        <Text fontSize={"13px"} fontWeight={"400"} lineHeight={"27px"} color={"#626974"}>Stay updated with all our latest news and alerts.</Text>
                      </Box>
                      <Box w={["10%","10%","5%","5%"]}>
                        <Switch colorScheme="teal" size="md" />
                      </Box>
                    </HStack>
                    <hr className="remove" />
                    <HStack justifyContent="space-between" w="100%">
                      <Box w={["90%","90%","95%","95%"]}>
                        <Text fontSize={"15px"} fontWeight={"500"} lineHeight={"18.15px"} color={"#1F2937"}>Activity Alerts</Text>
                        <Text fontSize={"13px"} fontWeight={"400"} lineHeight={"27px"} color={"#626974"}>Get notified about account activity and important interactions.</Text>
                      </Box>
                      <Box w={["10%","10%","5%","5%"]}>
                        <Switch colorScheme="teal" size="md" />
                      </Box>
                    </HStack>
                    <hr className="remove" />
                    <HStack justifyContent="space-between" w="100%">
                      <Box w={["90%","90%","95%","95%"]}>
                        <Text fontSize={"15px"} fontWeight={"500"} lineHeight={"18.15px"} color={"#1F2937"}>Email Notifications</Text>
                        <Text fontSize={"13px"} fontWeight={"400"} lineHeight={"27px"} color={"#626974"}>Opt to receive notifications as emails instead of app alerts.</Text>
                      </Box>
                      <Box w={["10%","10%","5%","5%"]}>
                        <Switch colorScheme="teal" size="md" />
                      </Box>
                    </HStack>
                    <hr className="remove" />
                    <HStack justifyContent="space-between" w="100%">
                      <Box w={["90%","90%","95%","95%"]}>
                        <Text fontSize={"15px"} fontWeight={"500"} lineHeight={"18.15px"} color={"#1F2937"}>Push Notifications</Text>
                        <Text fontSize={"13px"} fontWeight={"400"} lineHeight={"27px"} color={"#626974"}>Immediate alerts directly to your device.</Text>
                      </Box>
                      <Box w={["10%","10%","5%","5%"]}>
                        <Switch colorScheme="teal" size="md" />
                      </Box>
                    </HStack>
                  </VStack>
                </VStack>
              </Box>
              <Flex justifyContent="flex-end" alignItems="center" mt="20px">
                <Button w="10%">Update</Button>
              </Flex>
            </TabPanel>

          </TabPanels>
        </Tabs>
      </Box>
    </MainLayout>
  )
}
