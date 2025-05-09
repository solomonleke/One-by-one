import React, { useState, useEffect } from "react";
import { ReactComponent as LogoSVG } from "../../Asset/schoolLogo.svg";
import { ReactComponent as ProfileUpdateIcon } from "../../Asset/profileUpdateIcon.svg";
import { ReactComponent as VerifySchool } from "../../Asset/verifySchool.svg";
import MainLayout from "../../DashboardLayout";
import Button from "../../Components/Button";
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
import { GetAdminProfile } from "../../Utils/ApiCall";

export default function SchoolProfile() {
  const [adminData, setAdminData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAdminProfile = async () => {
      try {
        const response = await GetAdminProfile();
        console.log("response", response);
        setAdminData(response.data); // Store school data
        setLoading(false);
      } catch (err) {
        setError(err.message || "Failed to fetch school profile");
        setLoading(false);
      }
    };

    fetchAdminProfile();
  }, []);

  const [logoSrc, setLogoSrc] = useState(null);

  // Load the profile picture from localStorage on component mount
  useEffect(() => {
    const savedLogo = localStorage.getItem("schoolLogo");
    if (savedLogo) {
      setLogoSrc(savedLogo);
    }
  }, []);

  // Handle file selection and saving to localStorage
  const handleLogoChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const base64Image = reader.result;
        setLogoSrc(base64Image);
        localStorage.setItem("schoolLogo", base64Image); // Save to localStorage
      };
      reader.readAsDataURL(file);
    }
  };

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

              <Image
                src={logoSrc}
                rounded={"full"}
                boxShadow={"0px 4px 4px 0px #00000040"}
                w={["100px", "100px", "129px", "129px"]}
                h={["100px", "100px", "129px", "129px"]}
                objectFit="cover"
                alt="School Logo"
                onClick={() => document.getElementById("logoInput").click()} // Trigger hidden input
              />

              <input
                type="file"
                id="logoInput"
                accept="image/*"
                style={{ display: "none" }} // Hidden input
                onChange={handleLogoChange}
              />
              <Box pos="absolute" bottom="0" right="0">
                <ProfileUpdateIcon
                  cursor={"pointer"}
                  onClick={() => document.getElementById("logoInput").click()}
                />
              </Box>
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
              <Button
                background="#fff"
                color={
                  adminData?.school_admin?.account_verified === "APPROVED"
                    ? "#027A48"
                    : adminData?.school_admin?.account_verified === "PENDING"
                      ? "#FFDE00"
                      : "#FF0000"
                }
                border={
                  adminData?.school_admin?.account_verified === "APPROVED"
                    ? "1px solid #027A48"
                    : adminData?.school_admin?.account_verified === "PENDING"
                      ? "1px solid #FFDE00"
                      : "1px solid #FF0000"
                }
              >
                {" "}
                <span className="right">
                  {adminData?.school_admin?.account_verified === "APPROVED" ? (
                    <VerifySchool className="very" />
                  ) : adminData?.school_admin?.account_verified ===
                    "PENDING" ? (
                    <img
                      src="data:image/png;base64,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"
                      className="verys"
                      alt=""
                    />
                  ) : (
                    <img
                      src="data:image/jpeg;base64,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"
                      className="verys"
                      alt=""
                    />
                  )}
                </span>
                {adminData?.school_admin.account_verified}
              </Button>
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
                  <HStack>
                    <Text
                      fontSize={"13px"}
                      fontWeight={"400"}
                      color={"#626974"}
                    >
                      Certificate of Incorporation
                    </Text>
                    <Spacer />
                    <Text
                      fontWeight={"500"}
                      color={"#027A48"}
                      bg={"#ECFDF3"}
                      borderRadius={"20px"}
                      py={"5px"}
                      px={"12px"}
                      fontSize={"12px"}
                    >
                      Verified
                    </Text>
                  </HStack>

                  <HStack>
                    <Text
                      fontSize={"13px"}
                      fontWeight={"400"}
                      color={"#626974"}
                    >
                      Tax Identification Number (TIN)
                    </Text>
                    <Spacer />
                    <Text
                      fontWeight={"500"}
                      color={"#027A48"}
                      bg={"#ECFDF3"}
                      borderRadius={"20px"}
                      py={"5px"}
                      px={"12px"}
                      fontSize={"12px"}
                    >
                      Verified
                    </Text>
                  </HStack>

                  <HStack>
                    <Text
                      fontSize={"13px"}
                      fontWeight={"400"}
                      color={"#626974"}
                    >
                      Ministry of Education Approval Letter
                    </Text>
                    <Spacer />
                    <Text
                      fontWeight={"500"}
                      color={"#027A48"}
                      bg={"#ECFDF3"}
                      borderRadius={"20px"}
                      py={"5px"}
                      px={"12px"}
                      fontSize={"12px"}
                    >
                      Verified
                    </Text>
                  </HStack>

                  <HStack>
                    <Text
                      fontSize={"13px"}
                      fontWeight={"400"}
                      color={"#626974"}
                    >
                      School Registration Certificate
                    </Text>
                    <Spacer />
                    <Text
                      fontWeight={"500"}
                      color={"#027A48"}
                      bg={"#ECFDF3"}
                      borderRadius={"20px"}
                      py={"5px"}
                      px={"12px"}
                      fontSize={"12px"}
                    >
                      Verified
                    </Text>
                  </HStack>
                </Stack>
              </Box>
            </Box>
          </Box>
        </Flex>
      </Box>
    </MainLayout>
  );
}
