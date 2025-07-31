import React, { useState, useEffect, useRef  } from "react";
import { ReactComponent as LogoSVG } from "../../Asset/schoolLogo.svg";
import { ReactComponent as ProfileUpdateIcon } from "../../Asset/profileUpdateIcon.svg";
import { ReactComponent as VerifySchool } from "../../Asset/verifySchool.svg";
import MainLayout from "../../DashboardLayout";
import { FaRegCheckCircle } from "react-icons/fa";
import { MdWarningAmber } from "react-icons/md";
import { AiOutlineStop } from "react-icons/ai";
import Button from "../../Components/Button";
import LegalDocuments from "../../Components/LegalDocuments";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  ModalFooter,
  ModalHeader,
  Button as ChakraButton,
  Image as ChakraImage,
} from "@chakra-ui/react";

// Inside JSX


import {
  Box,
  HStack,
  Text,
  Flex,
  VStack,
  Spacer,
  Stack,
  Image,
} from "@chakra-ui/react";
import ProfileCard from "../../Components/ProfileCard";
import ProfileHeading from "../../Components/ProfileHeading";
import { GetAdminProfile, UploadProfilePicture } from "../../Utils/ApiCall";

export default function SchoolProfile() {
  const [adminData, setAdminData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [logoSrc, setLogoSrc] = useState(null);           // Current logo (from backend or localStorage)
const [logoPreview, setLogoPreview] = useState(null);   // For preview before upload
const [uploadingLogo, setUploadingLogo] = useState(false);
const [isLogoModalOpen, setIsLogoModalOpen] = useState(false);
const fileInputRef = useRef(null); // <--- New ref


const fetchAdminProfile = async () => {
  try {
    const response = await GetAdminProfile();
    console.log("info", response);
    setAdminData(response.data); // Store school data
    if (response.data?.school_admin?.school_logo) {
      setLogoSrc(response.data.school_admin.school_logo);
    }
    setLoading(false);
  } catch (err) {
    setError(err.message || "Failed to fetch school profile");
    setLoading(false);
  }
};

  


  // Load the profile picture from localStorage on component mount
  useEffect(() => {
    
  }, []);

  // Handle file selection and saving to localStorage
  const handleLogoChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const previewURL = URL.createObjectURL(file);
      setLogoPreview({ file, url: previewURL });
      setIsLogoModalOpen(true); // open modal immediately
    }
  };
  
  const handleLogoUpload = async () => {
    if (!logoPreview?.file) return;
    try {
      setUploadingLogo(true);
      const response = await UploadProfilePicture(logoPreview.file);
      console.log("Upload response", response);

      // If API returns the updated logo URL, use it
      if (response?.school_logo) {
        setLogoSrc(response.school_logo);
      } else {
        // If API does not return, refetch profile
        await fetchAdminProfile();
      }

      setLogoPreview(null);
      setIsLogoModalOpen(false);
    } catch (error) {
      console.error("Error uploading logo", error);
    } finally {
      setUploadingLogo(false);
    }
  };
  
  useEffect(() => {
    fetchAdminProfile();

  }, []);
  

  const schoolEmail = `${adminData?.school_admin.school_name?.toLowerCase()}@gmail.com`;

  return (
    <MainLayout>
      <Box
        backgroundColor={"#fff"}
        p={"20px"}
        borderWidth={"1px"}
        borderRadius={"10px"}
        borderColor={"#EDEFF2"}
      >
        <Box>
          <Box
            background={
              "linear-gradient(90.61deg, #39996B 49.47%, #FFBC4F 99.47%)"
            }
            justifyContent={"space-between"}
            borderTopLeftRadius={"10px"}
            borderTopRightRadius={"10px"}
            px={"20px"}
            borderBottomWidth={"1px"}
            borderBottomColor={"#EDEFF2"}
            height={"100px"}
          ></Box>

          <Flex
            justifyContent={"space-between"}
            flexWrap="wrap"
            mt="22px"
            borderBottom="1px solid #EDEFF2"
          >
            <Box
              position="relative"
              cursor="pointer"
              top={["-72px", "-90px"]}
              left="20px"
            >
              {/* Display uploaded logo or default SVG */}

              {/* School Logo Display */}
              <Image
              src={logoSrc || "/defaultLogo.svg"}
              rounded="full"
              boxShadow="0px 4px 4px 0px #00000040"
              w={["100px", "100px", "129px", "129px"]}
              h={["100px", "100px", "129px", "129px"]}
              objectFit="cover"
              alt="School Logo"
              onClick={() => fileInputRef.current.click()} // <--- No getElementById
            />

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              onChange={handleLogoChange}
            />

            <Box pos="absolute" bottom="0" right="0">
              <ProfileUpdateIcon cursor="pointer" onClick={() => fileInputRef.current.click()} />
            </Box>
          </Box>

          {/* Modal for Preview */}
          <Modal isOpen={isLogoModalOpen} onClose={() => setIsLogoModalOpen(false)} size="md">
            <ModalOverlay />
            <ModalContent>
            <ModalHeader>Logo Preview</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                {logoPreview?.url && <ChakraImage src={logoPreview.url} width="100%" borderRadius="md" alt="Logo Preview" />}
              </ModalBody>
              <ModalFooter>
                <ChakraButton variant="ghost" mr={3} onClick={() => setIsLogoModalOpen(false)}>
                  Cancel
                </ChakraButton>
                <ChakraButton 
                color="#fff"
                  background="greenn.greenn500"
                  _hover={{
                    background: "greenn.greenn600", // Darker green on hover
                    transform: "scale(1.05)",      // Slight zoom effect
                    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
                  }}
                  transition="all 0.2s ease-in-out" onClick={handleLogoUpload} isLoading={uploadingLogo} loadingText="Uploading">
                  Upload
                </ChakraButton>
              </ModalFooter>
            </ModalContent>
          </Modal>

              <Box pos="absolute" bottom="0" right="0">
                <ProfileUpdateIcon
                  cursor={"pointer"}
                  onClick={() => document.getElementById("logoInput").click()}
                />
              </Box>

            <Text
              fontSize={["16px", "24px"]}
              fontWeight="700"
              w={["60%", "60%", "60%", "60%"]}
              pos="relative"
              left={["20px", "0px", "30px", "0px"]}
            >
              {adminData?.school_admin.school_name}
            </Text>

<Box
  w={["", "", "", "20%"]}
  pos="relative"
  top={["-50px", "-50px", "0", "0"]}
>
  <Flex
    align="center"
    justify="center"
    border={
      adminData?.school_admin?.account_verified === "APPROVED"
        ? "1px solid #027A48"
        : adminData?.school_admin?.account_verified === "PENDING"
        ? "1px solid #FFDE00"
        : "1px solid #FF0000"
    }
    borderRadius="8px"
    px={4}
    py={2}
    bg="#fff"
    color={
      adminData?.school_admin?.account_verified === "APPROVED"
        ? "#027A48"
        : adminData?.school_admin?.account_verified === "PENDING"
        ? "#FFDE00"
        : "#FF0000"
    }
    fontWeight="semibold"
    fontSize="sm"
    gap={2}
  >
    {adminData?.school_admin?.account_verified === "APPROVED" ? (
      <FaRegCheckCircle />
    ) : adminData?.school_admin?.account_verified === "PENDING" ? (
      <MdWarningAmber />
    ) : (
      <AiOutlineStop />
    )}
    <Text>{adminData?.school_admin?.account_verified}</Text>
  </Flex>
</Box>


          </Flex>
        </Box>

        {/* Rest of the Page */}
        <Flex justifyContent={"space-between"} flexWrap="wrap" mt="16px">
          <Box w={["100%", "100%", "40%", "40%"]}>
            <Stack spacing="16px">
              <Box
                borderColor={"#EDEFF2"}
                py={"20.5px"}
                px={["8px", "8px", "17px", "17px"]}
                borderRadius={"10px"}
                borderWidth={"1px"}
              >
                <ProfileHeading title="School Details" />

                <Stack spacing={"14px"} mt="14px">
                  <ProfileCard title="email" value={schoolEmail} />
                  <ProfileCard title="founding year" value="2016" />
                  <ProfileCard
                    title="address"
                    value={adminData?.school_admin.school_address}
                  />
                  <ProfileCard
                    title="city"
                    value={adminData?.school_admin.city}
                  />
                  <ProfileCard
                    title="state"
                    value={adminData?.school_admin.state}
                  />
                  <ProfileCard
                    title="zip code"
                    value={adminData?.school_admin.zip_code}
                  />
                </Stack>
              </Box>

              <Box
                borderColor={"#EDEFF2"}
                py={"20.5px"}
                px={["8px", "8px", "17px", "17px"]}
                borderRadius={"10px"}
                borderWidth={"1px"}
              >
                <ProfileHeading title="principal information" />

                <Stack spacing={"14px"} mt="14px">
                  <ProfileCard
                    title="title"
                    value={adminData?.school_admin.principal_title}
                  />
                  <ProfileCard
                    title="first name"
                    value={adminData?.school_admin.principal_fullname}
                  />
                  {/* <ProfileCard title="last name" value="doe" /> */}
                  <ProfileCard
                    title="email"
                    value={adminData?.school_admin.principal_email}
                  />
                  <ProfileCard
                    title="phone number"
                    value={adminData?.school_admin.principal_phone}
                  />
                  <ProfileCard
                    title="NIN"
                    value={adminData?.school_admin.account_verified}
                  />
                </Stack>
              </Box>
              <Box
                borderColor={"#EDEFF2"}
                py={"20.5px"}
                px={["8px", "8px", "17px", "17px"]}
                borderRadius={"10px"}
                borderWidth={"1px"}
              >
                <ProfileHeading title="Bank information" />

                <Stack spacing={"14px"} mt="14px">
                  <ProfileCard
                    title="Bank account name"
                    value={adminData?.school_admin.principal_title}
                  />
                  <ProfileCard
                    title="Bank account number"
                    value={adminData?.school_admin.principal_fullname}
                  />
                  {/* <ProfileCard title="last name" value="doe" /> */}
                  <ProfileCard
                    title="Bank name"
                    value={adminData?.school_admin.principal_email}
                  />
                  {/* <ProfileCard
                    title="phone number"
                    value={adminData?.school_admin.principal_phone}
                  />
                  <ProfileCard
                    title="NIN"
                    value={adminData?.school_admin.account_verified}
                  /> */}
                </Stack>
              </Box>
            </Stack>
          </Box>

          <Box w={["100%", "100%", "58%", "58%"]}>
            <Box
              bg={"#9BF5CA4A"}
              borderWidth={"1px"}
              display={"flex"}
              flexDir={"column"}
              gap={"23px"}
              borderRadius={"16px"}
              p={"16px"}
            >
              <Box
                borderColor={"#EDEFF2"}
                p={"20px"}
                borderRadius={"10px"}
                borderWidth={"1px"}
                backgroundColor={"#fff"}
              >
                <ProfileHeading title="about school" />

                <Text
                  fontWeight={"400"}
                  mt="18px"
                  fontSize={"13px"}
                  lineHeight={"27px"}
                  color={"#626974"}
                >
                  {adminData?.school_admin.about_school}
                </Text>
              </Box>

              <Box
                borderColor={"#EDEFF2"}
                p={"20px"}
                borderRadius={"10px"}
                borderWidth={"1px"}
                backgroundColor={"#fff"}
              >
                <ProfileHeading title="class capacity" />

                <Text
                  fontWeight={"400"}
                  mt="18px"
                  fontSize={"13px"}
                  lineHeight={"27px"}
                  color={"#626974"}
                >
                  {adminData?.school_admin.class_capacity}
                </Text>
              </Box>

              <Box
                borderColor={"#EDEFF2"}
                p={"20px"}
                borderRadius={"10px"}
                borderWidth={"1px"}
                backgroundColor={"#fff"}
              >
                <ProfileHeading title="legal documents" />

                <Stack mt="18px" spacing={"17px"}>
                <LegalDocuments documents={adminData?.documents} />

                </Stack>
              </Box>
            </Box>
          </Box>
        </Flex>
      </Box>
    </MainLayout>
  );
}
