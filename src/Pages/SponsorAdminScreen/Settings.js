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
    // var reloadCount = localStorage.getItem("reloadCount");
    // if(!reloadCount){
    //   localStorage.setItem('reloadCount', + parseInt(1))

    // }
    // if(reloadCount < 2) {
    //   localStorage.setItem('reloadCount', parseInt(reloadCount) + 1);
    //   setTimeout(() =>
    //   window.location.reload(1), 2000)
    // } else {
    //   localStorage.removeItem('reloadCount');
    // }

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
            <Tab _selected={{ color: "green", borderColor: "green" }} fontSize={"14px"} fontWeight={"600"} lineHeight={"20px"}>Securities</Tab>
            <Tab _selected={{ color: "green", borderColor: "green" }} fontSize={"14px"} fontWeight={"600"} lineHeight={"20px"}>My Documents</Tab>
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
                    <HStack justifyContent="space-between" w="100%" flexWrap={["wrap","wrap","no-wrap","no-wrap"]}>
                      <Box w={["100%","100%","30%","30%"]}>
                        <Text fontSize={"14px"} textAlign={["center","center","left","left"]} fontWeight={"500"} lineHeight={"22px"} color={"#1F2937"}>Tell Us About You</Text>
                      </Box>
                      <Box w={["100%","100%","70%","70%"]}>
                        <Box mt="12px" bg="#fff" border="2px solid #EFEFEF" py='17px' px="18px" rounded='10px'>
                          <Text fontSize={"14px"} fontWeight={"400"} lineHeight={"31px"} color={"#626974"}>I’m the Vice Principal at <Box as="span" fontWeight={"700"}>Legacy Scholars Academy,</Box> where I’ve been working for over five years. I oversee student performance and coordinate extracurricular programs. My passion for education comes from a deep belief in the potential of every child, and I strive to create an environment where students feel empowered to achieve their dreams. Outside of work, I love playing the guitar and exploring new cuisines!</Text>
                        </Box>
                      </Box>
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
                        <Text fontSize={"15px"} fontWeight={"500"} lineHeight={"18.15px"} color={"#1F2937"}>Updates and Newsletters</Text>
                        <Text fontSize={"13px"} fontWeight={"400"} lineHeight={"27px"} color={"#626974"}>Regular updates on new features and our monthly newsletter.</Text>
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

            <TabPanel>
              <Box mt="12px" bg="#fff" border="2px solid #EFEFEF" py="20px" px={["8px","8px","18px","18px"]} rounded="10px">
                <VStack alignItems="start">
                  <VStack spacing="15px" w="100%">
                    <HStack justifyContent="space-between" flexWrap={["wrap","wrap","nowrap","nowrap"]} w="100%">
                      <Box w={["100%","100%","80%","80%"]}>
                        <Text fontSize="15px" fontWeight="500" lineHeight="18.15px" color="#1F2937">
                          Password Management
                        </Text>
                        <Text fontSize="13px" fontWeight="400" lineHeight="27px" color="#626974">
                          Update your password regularly to keep your account secure. Create a strong password with a mix of letters,
                          numbers, and special characters.
                        </Text>
                      </Box>
                      <Box w={["40%","40%","20%","20%"]} alignItems={"start"}>
                        <Button background="#fff" color='#39996B'>Change Password</Button>
                      </Box>
                    </HStack>
                    <hr className="remove" />
                    <HStack justifyContent="space-between" w="100%">
                      <Box w={["90%","90%","95%","95%"]}>
                        <Text fontSize="15px" fontWeight="500" lineHeight="18.15px" color="#1F2937">
                          Two-Factor Authentication (2FA)
                        </Text>
                        <Text fontSize="13px" fontWeight="400" lineHeight="27px" color="#626974">
                          Add an extra layer of security to your account. Enable two-factor authentication to require a verification
                          code whenever you <br /> sign in from a new device.
                        </Text>
                      </Box>
                      <Box w={["10%","10%","5%","5%"]}>
                        <Switch colorScheme="teal" size="md" />
                      </Box>
                    </HStack>
                    <hr className="remove" />
                    <HStack justifyContent="space-between" w="100%">
                      <Box w={["90%","90%","95%","95%"]}>
                        <Text fontSize="15px" fontWeight="500" lineHeight="18.15px" color="#1F2937">
                          Login Notifications
                        </Text>
                        <Text fontSize="13px" fontWeight="400" lineHeight="27px" color="#626974">
                          Receive an alert each time your account is accessed from a new device or location. This helps to quickly
                          detect unauthorized <br /> access.
                        </Text>
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

            <TabPanel>
              <Stack spacing={"24px"}>
                <Stack mt={"10px"}>
            <Text fontSize={"17px"} fontWeight={"600"} color={"#1F2937"}>Verification Documents</Text>
            <Text fontSize={"13px"} fontWeight={"400"} color={"#626974"}>Manage and upload the required documents to complete your school’s verification process.</Text>
            </Stack>

            <Box backgroundColor={"#FFF7EB"} py={"14px"} px={"20px"} rounded={"6px"} border={"1px solid #FFA30C80"} id='close'>
              <HStack justifyContent={"space-between"}>
              <HStack>
               <Warning />
              <Text fontSize={"14px"} fontWeight={"400"} color={"#FFA30C"}>Your school cannot be verified until all required documents are uploaded. Ensure the following documents below are uploaded</Text>
              </HStack>
              <Close cursor={"pointer"} id='closer'/>
              </HStack>
            </Box>

            <hr className="remove"/>

            <VStack spacing={4} p="23px" w="100%"  borderWidth={1} borderRadius="lg">
           
      {/* Certificate of Incorporation */}
      <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={4} w="100%"    >
      <VStack align="start" >
      <Text fontWeight="bold" fontSize="13px" color="#626974">Certificate of Incorporation</Text>

      <Box w="100%" >
      {files.certificate   && files.certificate .size ? (
  // File Display Box
  <HStack
    w="100%"
    h="76px"
    borderWidth={1}
    borderRadius="lg"
    borderColor="#D7E8E0"
    p={4}
    justifyContent="space-between"
    flexWrap="wrap"
    spacing={isMobile ? 2 : 4}
  >
    <HStack flex="1" spacing={4}>
      <HStack>
        <TbFileMinus size="30px" color="#96C3AD" />
        <Box>
          <Text color="#353535" fontSize={isMobile ? "10px" : "13px"} fontWeight="450000" isTruncated>
            {files.certificate  ?.name}
          </Text>
          <Text fontSize={isMobile ? "9px" : "11px"} color="#989692">
            {files.certificate  ?.size
              ? `${(files.certificate .size / 1024).toFixed(2)} KB`
              : "0 KB"}
          </Text>
        </Box>
      </HStack>
      <Spacer />
      <Text
        align="end"
        fontSize={isMobile ? "10px" : "13px"}
        color="#39996B"
        cursor="pointer"
        fontWeight="600"
        onClick={() => document.getElementById("certificate Input").click()}
      >
        Update
      </Text>
    </HStack>
    <Input
      id="certificate Input"
      type="file"
      accept=".pdf,.jpg,.jpeg,.png"
      display="none"
      onChange={(e) => handleFileChange(e, "certificate ")}
    />
  </HStack>
) : (
  // Drag & Drop Upload Box
  <Box
    w="100%"
    h="76px"
    borderWidth={1}
    borderStyle="dashed"
    borderRadius="lg"
    borderColor="#BECED7"
    display="flex"
    flexDirection="column"
    p={4}
    spacing={isMobile ? 2 : 4}
    alignItems="center"
    justifyContent="center"
    bg="#E9F8F0"
    cursor="pointer"
    textAlign="center"
    onClick={() => document.getElementById("certificate Input").click()}
  >
    <HStack alignText="center">
      <Icon as={VscCloudUpload} boxSize={6} color="#39996B" />
      <Text color="#39996B" fontWeight="500" fontSize={isMobile ? "10px" : "13px"}>
        Click to Upload
      </Text>
      <Text fontWeight="500" fontSize={isMobile ? "10px" : "13px"}>or drag and drop</Text>
    </HStack>
    <Text fontSize={isMobile ? "9px" : "12px"} color="#98A0B0" fontWeight="400">
      PDF, JPG, JPEG, PNG less than 10MB
    </Text>
    <Input
      id="certificate Input"
      type="file"
      accept=".pdf,.jpg,.jpeg,.png"
      display="none"
      onChange={(e) => handleFileChange(e, "certificate ")}
    />
  </Box>
)
}
      </Box>
    </VStack>
      <VStack align="start" w="100%">
      <Text fontWeight="bold" fontSize="13px" color="#626974">Tax Identification Number</Text>

      
      {files.tin && files.tin.size ? (
  // File Display Box
  <HStack
    w="100%"
    h="76px"
    borderWidth={1}
    borderRadius="lg"
    borderColor="#D7E8E0"
    p={4}
    justifyContent="space-between"
    flexWrap="wrap"
    spacing={isMobile ? 2 : 4}
  >
    <HStack flex="1" spacing={4}>
      <HStack>
        <TbFileMinus size="30px" color="#96C3AD" />
        <Box>
          <Text color="#353535" fontSize={isMobile ? "10px" : "13px"} fontWeight="450000" isTruncated>
            {files.tin?.name}
          </Text>
          <Text fontSize={isMobile ? "9px" : "11px"} color="#989692">
            {files.tin?.size
              ? `${(files.tin.size / 1024).toFixed(2)} KB`
              : "0 KB"}
          </Text>
        </Box>
      </HStack>
      <Spacer />
      <Text
        align="end"
        fontSize={isMobile ? "10px" : "13px"}
        color="#39996B"
        cursor="pointer"
        fontWeight="600"
        onClick={() => document.getElementById("tinInput").click()}
      >
        Update
      </Text>
    </HStack>
    <Input
      id="tinInput"
      type="file"
      accept=".pdf,.jpg,.jpeg,.png"
      display="none"
      onChange={(e) => handleFileChange(e, "tin")}
    />
  </HStack>
) : (
  // Drag & Drop Upload Box
  <Box
    w="100%"
    h="76px"
    borderWidth={1}
    borderStyle="dashed"
    borderRadius="lg"
    borderColor="#BECED7"
    display="flex"
    flexDirection="column"
    p={4}
    spacing={isMobile ? 2 : 4}
    alignItems="center"
    justifyContent="center"
    bg="#E9F8F0"
    cursor="pointer"
    textAlign="center"
    onClick={() => document.getElementById("tinInput").click()}
  >
    <HStack alignText="center">
      <Icon as={VscCloudUpload} boxSize={6} color="#39996B" />
      <Text color="#39996B" fontWeight="500" fontSize={isMobile ? "10px" : "13px"}>
        Click to Upload
      </Text>
      <Text fontWeight="500" fontSize={isMobile ? "10px" : "13px"}>or drag and drop</Text>
    </HStack>
    <Text fontSize={isMobile ? "9px" : "12px"} color="#98A0B0" fontWeight="400">
      PDF, JPG, JPEG, PNG less than 10MB
    </Text>
    <Input
      id="tinInput"
      type="file"
      accept=".pdf,.jpg,.jpeg,.png"
      display="none"
      onChange={(e) => handleFileChange(e, "tin")}
    />
  </Box>
)
}
      
    </VStack>


      </Grid>
      <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={4} w="100%"    >
      <VStack align="start" >
      <Text fontWeight="bold" fontSize="13px" color="#626974">Ministry of Education Approval Letter</Text>

      <Box w="100%" >
      {files.educationApproval && files.educationApproval.size ? (
  // File Display Box
  <HStack
    w="100%"
    h="76px"
    borderWidth={1}
    borderRadius="lg"
    borderColor="#D7E8E0"
    p={4}
    justifyContent="space-between"
    flexWrap="wrap"
    spacing={isMobile ? 2 : 4}
  >
    <HStack flex="1" spacing={4}>
      <HStack>
        <TbFileMinus size="30px" color="#96C3AD" />
        <Box>
          <Text color="#353535" fontSize={isMobile ? "10px" : "13px"} fontWeight="450000" isTruncated>
            {files.educationApproval?.name}
          </Text>
          <Text fontSize={isMobile ? "9px" : "11px"} color="#989692">
            {files.educationApproval?.size
              ? `${(files.educationApproval.size / 1024).toFixed(2)} KB`
              : "0 KB"}
          </Text>
        </Box>
      </HStack>
      <Spacer />
      <Text
        align="end"
        fontSize={isMobile ? "10px" : "13px"}
        color="#39996B"
        cursor="pointer"
        fontWeight="600"
        onClick={() => document.getElementById("educationApprovalInput").click()}
      >
        Update
      </Text>
    </HStack>
    <Input
      id="educationApprovalInput"
      type="file"
      accept=".pdf,.jpg,.jpeg,.png"
      display="none"
      onChange={(e) => handleFileChange(e, "educationApproval")}
    />
  </HStack>
) : (
  // Drag & Drop Upload Box
  <Box
    w="100%"
    h="76px"
    borderWidth={1}
    borderStyle="dashed"
    borderRadius="lg"
    borderColor="#BECED7"
    display="flex"
    flexDirection="column"
    p={4}
    spacing={isMobile ? 2 : 4}
    alignItems="center"
    justifyContent="center"
    bg="#E9F8F0"
    cursor="pointer"
    textAlign="center"
    onClick={() => document.getElementById("educationApprovalInput").click()}
  >
    <HStack alignText="center">
      <Icon as={VscCloudUpload} boxSize={6} color="#39996B" />
      <Text color="#39996B" fontWeight="500" fontSize={isMobile ? "10px" : "13px"}>
        Click to Upload
      </Text>
      <Text fontWeight="500" fontSize={isMobile ? "10px" : "13px"}>or drag and drop</Text>
    </HStack>
    <Text fontSize={isMobile ? "9px" : "12px"} color="#98A0B0" fontWeight="400">
      PDF, JPG, JPEG, PNG less than 10MB
    </Text>
    <Input
      id="educationApprovalInput"
      type="file"
      accept=".pdf,.jpg,.jpeg,.png"
      display="none"
      onChange={(e) => handleFileChange(e, "educationApproval")}
    />
  </Box>
)
}
      </Box>
    </VStack>
      <VStack align="start" w="100%">
      <Text fontWeight="bold" fontSize="13px" color="#626974">School Registration Certificate</Text>

      
      {files.schoolCert && files.schoolCert.size ? (
  // File Display Box
  <HStack
    w="100%"
    h="76px"
    borderWidth={1}
    borderRadius="lg"
    borderColor="#D7E8E0"
    p={4}
    justifyContent="space-between"
    flexWrap="wrap"
    spacing={isMobile ? 2 : 4}
  >
    <HStack flex="1" spacing={4}>
      <HStack>
        <TbFileMinus size="30px" color="#96C3AD" />
        <Box>
          <Text color="#353535" fontSize={isMobile ? "10px" : "13px"} fontWeight="450000" isTruncated>
            {files.schoolCert?.name}
          </Text>
          <Text fontSize={isMobile ? "9px" : "11px"} color="#989692">
            {files.schoolCert?.size
              ? `${(files.schoolCert.size / 1024).toFixed(2)} KB`
              : "0 KB"}
          </Text>
        </Box>
      </HStack>
      <Spacer />
      <Text
        align="end"
        fontSize={isMobile ? "10px" : "13px"}
        color="#39996B"
        cursor="pointer"
        fontWeight="600"
        onClick={() => document.getElementById("schoolCertInput").click()}
      >
        Update
      </Text>
    </HStack>
    <Input
      id="schoolCertInput"
      type="file"
      accept=".pdf,.jpg,.jpeg,.png"
      display="none"
      onChange={(e) => handleFileChange(e, "schoolCert")}
    />
  </HStack>
) : (
  // Drag & Drop Upload Box
  <Box
    w="100%"
    h="76px"
    borderWidth={1}
    borderStyle="dashed"
    borderRadius="lg"
    borderColor="#BECED7"
    display="flex"
    flexDirection="column"
    p={4}
    spacing={isMobile ? 2 : 4}
    alignItems="center"
    justifyContent="center"
    bg="#E9F8F0"
    cursor="pointer"
    textAlign="center"
    onClick={() => document.getElementById("schoolCertInput").click()}
  >
    <HStack alignText="center">
      <Icon as={VscCloudUpload} boxSize={6} color="#39996B" />
      <Text color="#39996B" fontWeight="500" fontSize={isMobile ? "10px" : "13px"}>
        Click to Upload
      </Text>
      <Text fontWeight="500" fontSize={isMobile ? "10px" : "13px"}>or drag and drop</Text>
    </HStack>
    <Text fontSize={isMobile ? "9px" : "12px"} color="#98A0B0" fontWeight="400">
      PDF, JPG, JPEG, PNG less than 10MB
    </Text>
    <Input
      id="schoolCertInput"
      type="file"
      accept=".pdf,.jpg,.jpeg,.png"
      display="none"
      onChange={(e) => handleFileChange(e, "schoolCert")}
    />
  </Box>
)
}
    </VStack>


      </Grid>

        <Divider />

        <Box alignSelf="start" >
      <Text  fontSize="15px" fontWeight="700" color="#1F2937" >Principal's Verification ID</Text>
      <Text fontSize="13px" color="#6B7280" >Upload a valid ID for legitimacy verification (e.g., national ID, passport).</Text>
      </Box>        

      <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={4} w="100%"    >
      <VStack align="start" >
      <Text fontWeight="bold" fontSize="13px" color="#626974">        <Text>Front Side</Text>
</Text>

      <Box w="100%" >
      {files.idFront && files.idFront.size ? (
  // File Display Box
  <HStack
    w="100%"
    h="76px"
    borderWidth={1}
    borderRadius="lg"
    borderColor="#D7E8E0"
    p={4}
    justifyContent="space-between"
    flexWrap="wrap"
    spacing={isMobile ? 2 : 4}
  >
    <HStack flex="1" spacing={4}>
      <HStack>
        <TbFileMinus size="30px" color="#96C3AD" />
        <Box>
          <Text color="#353535" fontSize={isMobile ? "10px" : "13px"} fontWeight="450000" isTruncated>
            {files.idFront?.name}
          </Text>
          <Text fontSize={isMobile ? "9px" : "11px"} color="#989692">
            {files.idFront?.size
              ? `${(files.idFront.size / 1024).toFixed(2)} KB`
              : "0 KB"}
          </Text>
        </Box>
      </HStack>
      <Spacer />
      <Text
        align="end"
        fontSize={isMobile ? "10px" : "13px"}
        color="#39996B"
        cursor="pointer"
        fontWeight="600"
        onClick={() => document.getElementById("idFrontInput").click()}
      >
        Update
      </Text>
    </HStack>
    <Input
      id="idFrontInput"
      type="file"
      accept=".pdf,.jpg,.jpeg,.png"
      display="none"
      onChange={(e) => handleFileChange(e, "idFront")}
    />
  </HStack>
) : (
  // Drag & Drop Upload Box
  <Box
    w="100%"
    h="76px"
    borderWidth={1}
    borderStyle="dashed"
    borderRadius="lg"
    borderColor="#BECED7"
    display="flex"
    flexDirection="column"
    p={4}
    spacing={isMobile ? 2 : 4}
    alignItems="center"
    justifyContent="center"
    bg="#E9F8F0"
    cursor="pointer"
    textAlign="center"
    onClick={() => document.getElementById("idFrontInput").click()}
  >
    <HStack alignText="center">
      <Icon as={VscCloudUpload} boxSize={6} color="#39996B" />
      <Text color="#39996B" fontWeight="500" fontSize={isMobile ? "10px" : "13px"}>
        Click to Upload
      </Text>
      <Text fontWeight="500" fontSize={isMobile ? "10px" : "13px"}>or drag and drop</Text>
    </HStack>
    <Text fontSize={isMobile ? "9px" : "12px"} color="#98A0B0" fontWeight="400">
      PDF, JPG, JPEG, PNG less than 10MB
    </Text>
    <Input
      id="idFrontInput"
      type="file"
      accept=".pdf,.jpg,.jpeg,.png"
      display="none"
      onChange={(e) => handleFileChange(e, "idFront")}
    />
  </Box>
)
}
      </Box>
    </VStack>
      <VStack align="start" w="100%">
      <Text fontWeight="bold" fontSize="13px" color="#626974">Back Side</Text>

      
      {files.idBack && files.idBack.size ? (
  // File Display Box
  <HStack
    w="100%"
    h="76px"
    borderWidth={1}
    borderRadius="lg"
    borderColor="#D7E8E0"
    p={4}
    justifyContent="space-between"
    flexWrap="wrap"
    spacing={isMobile ? 2 : 4}
  >
    <HStack flex="1" spacing={4}>
      <HStack>
        <TbFileMinus size="30px" color="#96C3AD" />
        <Box>
          <Text color="#353535" fontSize={isMobile ? "10px" : "13px"} fontWeight="450000" isTruncated>
            {files.idBack?.name}
          </Text>
          <Text fontSize={isMobile ? "9px" : "11px"} color="#989692">
            {files.idBack?.size
              ? `${(files.idBack.size / 1024).toFixed(2)} KB`
              : "0 KB"}
          </Text>
        </Box>
      </HStack>
      <Spacer />
      <Text
        align="end"
        fontSize={isMobile ? "10px" : "13px"}
        color="#39996B"
        cursor="pointer"
        fontWeight="600"
        onClick={() => document.getElementById("idBackInput").click()}
      >
        Update
      </Text>
    </HStack>
    <Input
      id="idBackInput"
      type="file"
      accept=".pdf,.jpg,.jpeg,.png"
      display="none"
      onChange={(e) => handleFileChange(e, "idBack")}
    />
  </HStack>
) : (
  // Drag & Drop Upload Box
  <Box
    w="100%"
    h="76px"
    borderWidth={1}
    borderStyle="dashed"
    borderRadius="lg"
    borderColor="#BECED7"
    display="flex"
    flexDirection="column"
    p={4}
    spacing={isMobile ? 2 : 4}
    alignItems="center"
    justifyContent="center"
    bg="#E9F8F0"
    cursor="pointer"
    textAlign="center"
    onClick={() => document.getElementById("idBackInput").click()}
  >
    <HStack alignText="center">
      <Icon as={VscCloudUpload} boxSize={6} color="#39996B" />
      <Text color="#39996B" fontWeight="500" fontSize={isMobile ? "10px" : "13px"}>
        Click to Upload
      </Text>
      <Text fontWeight="500" fontSize={isMobile ? "10px" : "13px"}>or drag and drop</Text>
    </HStack>
    <Text fontSize={isMobile ? "9px" : "12px"} color="#98A0B0" fontWeight="400">
      PDF, JPG, JPEG, PNG less than 10MB
    </Text>
    <Input
      id="idBackInput"
      type="file"
      accept=".pdf,.jpg,.jpeg,.png"
      display="none"
      onChange={(e) => handleFileChange(e, "idBack")}
    />
  </Box>
)
}
      
    </VStack>


      </Grid>

     

      <Box align="end"  w="100%" >
      <Button fontSize="8px" w="16px" colorScheme="green" isLoading={loading} onClick={handleSubmit}>
  Save Changes
</Button>

      </Box>
    </VStack>

            </Stack>
            </TabPanel>

          </TabPanels>
        </Tabs>
      </Box>
    </MainLayout>
  )
}
