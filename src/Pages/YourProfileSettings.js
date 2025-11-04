import React, { useState, useEffect } from 'react'
import { ReactComponent as EditIcon } from "../Asset/editIcon.svg";
import { useBreakpointValue, HStack, Text, Textarea, VStack, Flex, Modal, ModalOverlay, ModalContent, ModalCloseButton, ModalBody, Image, ModalHeader, ModalFooter, Box } from '@chakra-ui/react'
import Button from "../Components/Button"
import Input from "../Components/Input"
import ShowToast from '../Components/ToastNotification';
import Preloader from "../Components/Preloader"
import SearchableInput from "../Components/SearchableInput";
import {
  UpdateSchoolProfile,
  UploadAdminProfilePicture,
  GetUserProfile,
  GetAllBanksApi,
  VerifyBanksApi,
  UpdateBankDetailsApi
} from "../Utils/ApiCall";
import { isSchoolAdmin } from '../Authentication/Index';

export default function YourProfileSettings() {
  const isMobile = useBreakpointValue({ base: "100%", md: "500px", lg: "528px" });
  const [loading, setLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [aboutMe, setAboutMe] = useState("");
  const [profilePicture, setProfilePicture] = useState(null); // for new upload
  const [profilePicturePreview, setProfilePicturePreview] = useState(""); // for preview
  const [profilePictureModal, setProfilePictureModal] = useState(false); // for large preview modal
  const [currentProfilePictureUrl, setCurrentProfilePictureUrl] = useState("");
  const [schoolBankName, setSchoolBankName] = useState("");
  const [schoolAccountNumber, setSchoolAccountNumber] = useState("");
  const [schoolAccountName, setSchoolAccountName] = useState("");
  const [schoolBankCode, setSchoolBankCode] = useState("");
  const [verifiedStatus, setVerifiedStatus] = useState("");
  const [isEditable, setIsEditable] = useState(false);
  const [Banks, setBanks] = useState([]);
  const [isVerifying, setIsVerifying] = useState(false);

  const [showToast, setShowToast] = useState({ show: false, message: '', status: '' });

  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePicture(file);
      setProfilePicturePreview(URL.createObjectURL(file));
    }
  };

  const handlePreviewOpen = () => setProfilePictureModal(true);
  const handlePreviewClose = () => setProfilePictureModal(false);

  const fetchProfile = async () => {
    try {
      const data = await GetUserProfile(); // directly gets the data object
      console.log("Profile Data:", data);

      // correct field mapping
      setFirstName(data.first_name || "");
      setLastName(data.last_name || "");
      setEmail(data.email || "");
      setAboutMe(data.about_me || "");
      setCurrentProfilePictureUrl(data.picture || "");
      // New bank fields
      let bankDetails = JSON.parse(data?.school_admin?.school_account)
      console.log("bank details", bankDetails)
      setSchoolBankName(bankDetails?.bank || "");
      setSchoolAccountNumber(bankDetails?.account_number || "");
      setSchoolAccountName(bankDetails?.account_name || "");
      setVerifiedStatus(data?.school_admin?.verified_status || "");

    } catch (error) {
      console.error("Failed to fetch profile", error);
    } finally {
      setLoading(false); // Stop loading after fetching profile
      setIsLoading(false); // Set isLoading to false after fetching profile
    }
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      // Upload profile picture first if a new one is selected
      if (profilePicture) {
        const imageRes = await UploadAdminProfilePicture(profilePicture);
        console.log("Profile picture upload response:", imageRes);
      }

      // Update text fields
      await UpdateSchoolProfile({
        firstName,
        lastName,
        aboutMe,

      });

      if (schoolBankName || schoolAccountNumber || schoolAccountName || schoolBankCode) {
        await UpdateBankDetailsApi({

          schoolBankName: schoolBankName || "",      // send empty string if null
          schoolAccountNumber: schoolAccountNumber || "",
          schoolAccountName: schoolAccountName || "",
          schoolBankCode: schoolBankCode || "",
        });

      }
      // Update Bank Details

      // Refetch profile to reflect changes
      await fetchProfile();

      setShowToast({ show: true, message: "Profile updated!", status: "success" });
    } catch (error) {
      console.error(error.message);
      setShowToast({ show: true, message: "Update failed", status: "error" });
    } finally {
      setLoading(false);
      setTimeout(() => setShowToast({ show: false }), 3000);
    }
  };

  const handleBankSelection = (bank) => {
    setSchoolBankName(bank.name);
    setSchoolBankCode(bank.code);
  };

  const GetAllBanks = async () => {
    try {
      const result = await GetAllBanksApi();
      setBanks(result.data.data);
    } catch (e) {
      setShowToast({
        show: true,
        message: e.message,
        status: "error",
      });
    }
  };

  const VerifyBankDetails = async () => {
    if (schoolAccountNumber.length === 10 && schoolBankCode) {
      setIsVerifying(true);
      try {
        const result = await VerifyBanksApi({
          account_number: schoolAccountNumber,
          bank_code: schoolBankCode,
        });
        if (result.data.status) {
          setSchoolAccountName(result.data.data.account_name);
          setShowToast({
            show: true,
            message: "Account verified successfully",
            status: "success",
          });
          setTimeout(() => {
            setShowToast({ show: false });
          }, 3000);
        } else {
          setShowToast({
            show: true,
            message: result.data.message,
            status: "error",
          });
          setTimeout(() => {
            setShowToast({ show: false });
          }, 3000);
        }
      } catch (e) {
        setShowToast({ show: true, message: e.message, status: "error" });
        setTimeout(() => {
          setShowToast({ show: false });
        }, 3000);
      } finally {
        setIsVerifying(false);
      }
    }
  };

  useEffect(() => {
    fetchProfile();
    GetAllBanks();
  }, []);

  useEffect(() => {
    VerifyBankDetails();
  }, [schoolAccountNumber, schoolBankCode]);


  return (
    <>
      {
        isLoading && <Preloader />
      }
      {showToast.show && (
        <ShowToast message={showToast.message} status={showToast.status} show={showToast.show} />
      )}

      <Box
        mt="12px"
        bg="#fff"
        border="2px solid #EFEFEF"
        py="30px"
        px={["8px", "8px", "18px", "18px"]}
        rounded="10px"
      >
        <Flex justifyContent="space-between" alignItems="center" flexWrap={{ base: "wrap", md: "nowrap" }}>
          <Box mb={{ base: "10px", md: "0" }}>
            <Text fontSize="17px" fontWeight="600" lineHeight="20.57px" color="#1F2937">
              Personal Information
            </Text>
            <Text fontSize="13px" fontWeight="400" lineHeight="27px" color="#626974">
              Manage and update your profile information, including contact details and profile photo.
            </Text>
          </Box>
          {verifiedStatus === 'APPROVED' ? (
            <Text fontSize="14px" color="green.500" fontWeight="500" textAlign={{ base: "center", md: "right" }} w={{ base: "100%", md: "auto" }}>
              Your account has been verified and you can no longer edit this field.
            </Text>
          ) : (
            <Button
              onClick={() => setIsEditable(!isEditable)}
              w={{ base: "100%", md: "150px" }}
              colorScheme={isEditable ? "gray" : "green"}
            >
              {isEditable ? 'View Only' : 'Edit Profile'}
            </Button>
          )}
        </Flex>



        <VStack alignItems="start">
          <VStack mt="20px" spacing="15px" w="100%">
            <hr className="remove" />
            {/* First Name */}
            <HStack justifyContent="space-between" w="100%" flexWrap={{ base: "wrap", sm: "nowrap" }}>
              <Box w={{ base: "100%", sm: "30%" }}>
                <Text fontSize="14px" fontWeight="500" lineHeight="22px" color="#1F2937">
                  First Name
                </Text>
              </Box>
              <Box w={{ base: "100%", sm: "70%" }}>
                <Input value={firstName} isReadOnly={!isEditable} onChange={(e) => setFirstName(e.target.value)} />
              </Box>
            </HStack>

            <hr className="remove" />
            {/* Last Name */}
            <HStack justifyContent="space-between" w="100%" flexWrap={{ base: "wrap", sm: "nowrap" }}>
              <Box w={{ base: "100%", sm: "30%" }}>
                <Text fontSize="14px" fontWeight="500" lineHeight="22px" color="#1F2937">
                  Last Name
                </Text>
              </Box>
              <Box w={{ base: "100%", sm: "70%" }}>
                <Input value={lastName} isReadOnly={!isEditable} onChange={(e) => setLastName(e.target.value)} />
              </Box>
            </HStack>

            <hr className="remove" />
            {/* Email (Read-only) */}
            <HStack justifyContent="space-between" w="100%" flexWrap={{ base: "wrap", sm: "nowrap" }}>
              <Box w={{ base: "100%", sm: "30%" }}>
                <Text fontSize="14px" fontWeight="500" lineHeight="22px" color="#1F2937">
                  Email
                </Text>
              </Box>
              <Box w={{ base: "100%", sm: "70%" }}>
                <Input value={email} isReadOnly />
              </Box>
            </HStack>

            <hr className="remove" />
            {/* Profile Picture */}
            <HStack justifyContent="space-between" w="100%" flexWrap={{ base: "wrap", sm: "nowrap" }}>
              <Box w={{ base: "100%", sm: "30%" }}>
                <Text fontSize="14px" fontWeight="500" lineHeight="22px" color="#1F2937">
                  Profile Picture
                </Text>
              </Box>
              <Box w={{ base: "100%", sm: "70%" }}>
                <HStack spacing="30px" flexWrap={{ base: "wrap", sm: "nowrap" }}>
                  {/* Preview image (existing or uploaded) */}
                  <Image
                    src={profilePicturePreview || currentProfilePictureUrl}
                    boxSize="100px"
                    borderRadius="full"
                    objectFit="cover"
                    cursor="pointer"
                    onClick={handlePreviewOpen}
                  />

                  {/* File input */}
                  <HStack
                    as="label"
                    borderWidth="1px"
                    cursor={isEditable ? "pointer" : "not-allowed"}
                    borderColor="#39996B"
                    fontWeight="500"
                    color="#39996B"
                    borderRadius="8px"
                    px="20px"
                    py="8px"
                  >
                    <Text>Edit</Text>
                    <Box as="span">
                      <EditIcon display="inline-block" />
                    </Box>
                    <input
                      type="file"
                      accept="image/*"
                      hidden
                      disabled={!isEditable}
                      onChange={handleProfilePictureChange}
                    />
                  </HStack>
                </HStack>
              </Box>
            </HStack>

            {/* Modal for preview */}
            <Modal isOpen={profilePictureModal} onClose={handlePreviewClose} isCentered>
              <ModalOverlay />
              <ModalContent maxW={{ base: "90%", md: "auto" }}>
                <ModalHeader>Profile Picture</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  <Flex justifyContent="center">
                    <Image
                      src={profilePicturePreview || currentProfilePictureUrl}
                      width="100%"
                      maxH="70vh"
                      objectFit="contain"
                      borderRadius="md"
                    />
                  </Flex>
                </ModalBody>
                <ModalFooter>
                </ModalFooter>
              </ModalContent>
            </Modal>

            <hr className="remove" />
            {/* About You */}
            <HStack justifyContent="space-between" w="100%" flexWrap={["wrap", "wrap", "no-wrap", "no-wrap"]}>
              <Box w={["100%", "100%", "30%", "30%"]}>
                <Text fontSize="14px" textAlign={["center", "center", "left", "left"]} fontWeight="500" lineHeight="22px" color="#1F2937">
                  Tell Us About You
                </Text>
              </Box>
              <Box w={["100%", "100%", "70%", "70%"]}>
                <Textarea
                  mt="12px"
                  bg="#fff"
                  border="2px solid #EFEFEF"
                  py="17px"
                  px="18px"
                  rounded="10px"
                  value={aboutMe}
                  isReadOnly={!isEditable}
                  onChange={(e) => setAboutMe(e.target.value)}
                />
              </Box>
            </HStack>
          </VStack>
        </VStack>
      </Box>
      {isSchoolAdmin() && (
        <Box
          mt="12px"
          bg="#fff"
          border="2px solid #EFEFEF"
          py="30px"
          px={["8px", "8px", "18px", "18px"]}
          rounded="10px"
        >
          <Text fontSize="17px" fontWeight="600" lineHeight="20.57px" color="#1F2937">
            Bank Information
          </Text>

          <VStack alignItems="start">
            <VStack mt="20px" spacing="15px" w="100%">
              <hr className="remove" />
              {/* School Bank Name */}
              <HStack justifyContent="space-between" w="100%" flexWrap={{ base: "wrap", sm: "nowrap" }}>
                <Box w={{ base: "100%", sm: "30%" }}>
                  <Text fontSize="14px" fontWeight="500" lineHeight="22px" color="#1F2937">
                    School Bank Name
                  </Text>
                </Box>
                <Box w={{ base: "100%", sm: "70%" }}>
                  <SearchableInput
                    value={schoolBankName}
                    onChange={(e) => handleBankSelection(e.target.value)}
                    options={Banks}
                    isReadOnly={!isEditable}
                    placeholder="Search for a bank"
                  />
                </Box>
              </HStack>

              <hr className="remove" />
              {/* School Account Number */}
              <HStack justifyContent="space-between" w="100%" flexWrap={{ base: "wrap", sm: "nowrap" }}>
                <Box w={{ base: "100%", sm: "30%" }}>
                  <Text fontSize="14px" fontWeight="500" lineHeight="22px" color="#1F2937">
                    School Account Number
                  </Text>
                </Box>
                <Box w={{ base: "100%", sm: "70%" }}>
                  <Input
                    value={schoolAccountNumber}
                    isReadOnly={!isEditable}
                    onChange={(e) => setSchoolAccountNumber(e.target.value)}
                  />
                </Box>
              </HStack>

              <hr className="remove" />
              {/* School Account Name */}
              <HStack justifyContent="space-between" w="100%" flexWrap={{ base: "wrap", sm: "nowrap" }}>
                <Box w={{ base: "100%", sm: "30%" }}>
                  <Text fontSize="14px" fontWeight="500" lineHeight="22px" color="#1F2937">
                    School Account Name
                  </Text>
                </Box>
                <Box w={{ base: "100%", sm: "70%" }}>
                  <Input
                    value={schoolAccountName}
                    isReadOnly={!isEditable || isVerifying || schoolAccountName}
                    onChange={(e) => setSchoolAccountName(e.target.value)}
                  />
                </Box>
              </HStack>

              <hr className="remove" />

            </VStack>
          </VStack>
        </Box>
      )}

      <Flex justifyContent="flex-end" alignItems="center" mt="20px">
        <Button
          w={{ base: "100%", md: "200px" }}
          colorScheme="green"
          onClick={handleSave}
          isLoading={loading}
          loadingText="Saving..."
        >
          update
        </Button>
      </Flex>
    </>
  )
}
