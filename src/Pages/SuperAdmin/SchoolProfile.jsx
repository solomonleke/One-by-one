import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import MainLayout from '../../DashboardLayout';
import Button from '../../Components/Button';
import ProfileCard from '../../Components/ProfileCard';
import Input from '../../Components/Input';
import ProfileHeading from '../../Components/ProfileHeading';
import RemoveNotification from '../../Components/RemoveNotification';
import ProfileUpdateNotification from '../../Components/ProfileUpdateNotification';
import { ReactComponent as NextArrow } from '../../Asset/nextArrow.svg';
import { ReactComponent as Pdf } from '../../Asset/pdf.svg';
import { Box, HStack, Text, useDisclosure, Stack, Menu, Checkbox, Modal, ModalHeader, ModalOverlay, ModalCloseButton, ModalBody, ModalFooter, ModalContent, Flex, Avatar } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { IoChevronBackOutline, IoCloseOutline } from 'react-icons/io5';
import { BsThreeDots } from 'react-icons/bs';
import { FaSchoolFlag, FaCheck } from "react-icons/fa6";
import { GetScholarshipSchoolProfileApi, ApproveSchoolApi } from '../../Utils/ApiCall';
import Preloader from '../../Components/Preloader';
import ScholarshipSchoolDocuments from '../../Components/ScholarshipSchoolDocuments';
import ShowToast from '../../Components/ToastNotification';



export default function SchoolProfile() {
  const router = useNavigate();
  const { schoolId } = useParams();
  const [schoolData, setSchoolData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(null);
  const [showToast, setShowToast] = useState({ show: false, message: '', status: '' });
  const [actionNote, setActionNote] = useState("");
  const {
    isOpen: isRejectOpen,
    onOpen: openReject,
    onClose: closeReject,
  } = useDisclosure();


  useEffect(() => {
    const fetchSchoolProfile = async () => {
      try {
        const res = await GetScholarshipSchoolProfileApi(schoolId);
        console.log("School Profile Response:", res);

        const rawDocs = res?.data?.user?.documents || [];

        // latest document per type
        const latestDocs = {};
        rawDocs.forEach((doc) => {
          if (
            doc.document_type &&
            (!latestDocs[doc.document_type] ||
              new Date(doc.created_at) >
              new Date(latestDocs[doc.document_type].created_at))
          ) {
            latestDocs[doc.document_type] = doc;
          }
        });

        setSchoolData({
          ...res.data,
          documents: Object.values(latestDocs),
        });
      } catch (error) {
        console.error("Failed to fetch school profile", error);
      } finally {
        setLoading(false);
      }
    };

    if (schoolId) fetchSchoolProfile();
  }, [schoolId]);

  const handleApprove = async () => {
    try {
      setActionLoading("APPROVE"); // set string
      await ApproveSchoolApi(schoolId, "APPROVED", null);
      setShowToast({
        show: true,
        message: "School approved successfully!",
        status: "success",
      });
      setTimeout(() => setShowToast({ show: false }), 3000);

      setSchoolData((prev) => ({
        ...prev,
        account_verified: "APPROVED",
      }));
    } catch (error) {
      setShowToast({
        show: true,
        message: error.response?.data?.message || error.message || "Error changing status!",
        status: "error",
      });
      setTimeout(() => setShowToast({ show: false }), 3000);
      console.error(error.message);
    } finally {
      setActionLoading(null);
    }
  };

  const handleReject = async () => {
    try {
      setActionLoading("REJECT");
      await ApproveSchoolApi(schoolId, "REJECTED", actionNote);
      setShowToast({
        show: true,
        message: "School rejected successfully!",
        status: "success",
      });
      setTimeout(() => setShowToast({ show: false }), 3000);

      setSchoolData((prev) => ({
        ...prev,
        account_verified: "REJECTED",
        reason: actionNote,
      }));

      closeReject();
      setActionNote("");
    } catch (error) {
      setShowToast({
        show: true,
        message: error.response?.data?.message || error.message || "Error changing status!",
        status: "error",
      });
      setTimeout(() => setShowToast({ show: false }), 3000);
      console.error(error.message);
    } finally {
      setActionLoading(false);
    }
  };






  if (loading) {
    return <Preloader />;
  }

  if (!schoolData) {
    return <Text>School not found.</Text>;
  }




  return (
    <MainLayout>
      {
        loading && <Preloader />
      }
      {showToast.show && (
        <ShowToast message={showToast.message} status={showToast.status} />
      )}

      <Flex justifyContent="space-between" flexWrap="wrap">
        <HStack spacing="10px">
          <Text
            cursor="pointer"
            _hover={{ fontWeight: '500' }}
            color="#626974"
            fontSize="13px"
            fontWeight="400"
            onClick={() => {
              router('/scholarship-admin/schools');
            }}
          >
            Schools
          </Text>
          <NextArrow />
          <Text
            cursor="pointer"
            color="#1F2937"
            fontSize="13px"
            fontWeight="500"
            onClick={() => {
              router('/scholarship-admin/schools/school-profile');
            }}
          >
            School Details
          </Text>
        </HStack>

        <HStack fontSize="14px" fontWeight="600" spacing="10px" cursor="pointer" onClick={() => router('/scholarship-admin/schools')}>
          <IoChevronBackOutline />
          <Text>Back</Text>
        </HStack>
      </Flex>

      <Box bg="#fff" border="1px solid #EFEFEF" mt="12px" py='17px' px={["18px", "18px"]} rounded='10px' display="flex" flexDir="column" gap="20px">
        <HStack borderWidth="1px" rounded="10px" py="16px" px="17px" justifyContent="space-between" flexWrap={["wrap", "wrap", "nowrap", "nowrap"]} gap="10px">
          <HStack>
            <Avatar
              name={schoolData.school_name}
              src={schoolData.school_logo}
              size="lg"
            />
            <Text color="#2F2F2F" fontSize="21px" fontWeight="800">{schoolData.school_name}</Text>
          </HStack>

          <HStack spacing="8px" w={{ base: "100%", md: "auto" }} justifyContent="flex-end">
            <Button
              size="7px"
              px={2}
              fontSize="12px"
              variant="outline"
              borderColor="greenn.greenn500"
              color="greenn.greenn500"
              background="transparent"
              isLoading={actionLoading === "REJECT"}
              isDisabled={actionLoading !== null}
              loadingText="Rejecting"
              onClick={openReject}
              rightIcon={<IoCloseOutline />}
              _hover={{
                bg: "greenn.greenn500",
                borderColor: "#B91C1C",
                color: "transparent",
              }}
              _active={{
                bg: "#FECACA",
              }}
            >
              Reject
            </Button>

            <Button
              size="7px"
              px={2}
              fontSize="12px"
              variant="outline"
              borderColor="#027A48"
              color="white"
              isLoading={actionLoading === "APPROVE"}
              isDisabled={actionLoading !== null}
              onClick={handleApprove}
              rightIcon={<FaCheck />}
              _hover={{
                bg: "#ECFDF3",
                borderColor: "#065F46",
                color: "#065F46",
              }}
              _active={{
                bg: "#D1FAE5",
              }}
            >
              Approve
            </Button>
          </HStack>

        </HStack>

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
            {schoolData.about_school}
          </Text>
        </Box>

        <Stack borderWidth="1px" rounded="10px" px="17px" py="16px">
          <Text color="#2F2F2F" fontSize="14px" fontWeight="500">School Details</Text>

          <Box bg="#EAFEF4" rounded="10px" borderWidth="1px" borderColor="#D9E8E1" display="flex" flexDir="column" gap="50px" p="17px" pt="50px">
            <HStack flexWrap={["wrap", "wrap", "nowrap", "nowrap"]} gap="50px">
              <Input label='Email' value={schoolData.school_email} isReadOnly />

              <Input label='Founding Year' value={schoolData.founding_year} isReadOnly />

              <Input label='Address' value={schoolData.school_address} isReadOnly />
            </HStack>

            <HStack flexWrap={["wrap", "wrap", "nowrap", "nowrap"]} gap="50px">
              <Input label='City' value={schoolData.city} isReadOnly />

              <Input label='State' value={schoolData.state} isReadOnly />

              <Input label='Zip Code' value={schoolData.zip_code} isReadOnly />
            </HStack>

            <HStack flexWrap={["wrap", "wrap", "nowrap", "nowrap"]} gap="50px">
              <Input label='School Capacity' value={schoolData.class_capacity} isReadOnly />
            </HStack>
          </Box>
        </Stack>

        <Stack borderWidth="1px" rounded="10px" px="17px" py="16px">
          <Text color="#2F2F2F" fontSize="14px" fontWeight="500">Principal Information</Text>

          <Box bg="#EAFEF4" rounded="10px" borderWidth="1px" borderColor="#D9E8E1" mb="20px" display="flex" flexDir="column" gap="50px" p="17px" pt="50px">
            <HStack flexWrap={["wrap", "wrap", "nowrap", "nowrap"]} gap="50px">
              <Input label='Title' value={schoolData.principal_title} isReadOnly />

              <Input label='Full  Name' value={schoolData.principal_fullname} isReadOnly />

            </HStack>

            <HStack flexWrap={["wrap", "wrap", "nowrap", "nowrap"]} gap="50px">
              <Input label='Email' value={schoolData.principal_email} isReadOnly />

              <Input label='Phone Number' value={schoolData.principal_phone} isReadOnly />

              <Input placeholder='100001' visibility="hidden" />
            </HStack>
          </Box>

          <hr className="remover" />

          <Text color="#626974" fontSize="13px" mt="20px" fontWeight="400">NIN</Text>

          <HStack borderWidth="1px" rounded="10px" justifyContent="space-between" px="17px" py="16px">
            <HStack>
              <Pdf />
              <Stack>
                <Text color="#353535" fontSize="13px" fontWeight="500">identify_front.pdf</Text>
                <Text color="#989692" fontSize="11px" fontWeight="400">200 KB</Text>
              </Stack>
            </HStack>

            <Box bg="#ECFDF3" rounded="19.37px" py="2.42px" pr="9.68px" pl="7.26px">
              <HStack py="2px" rounded="16px" px="6px">
                <Box w="6px" h="6px" bg="#027A48" rounded="full"></Box>
                <Text fontSize="13px" fontWeight="600" color="#027A48">Verified</Text>
              </HStack>
            </Box>
          </HStack>
        </Stack>

        <Stack borderWidth="1px" spacing="20px" rounded="10px" px="17px" py="24px">
          <Text color="#2F2F2F" fontSize="14px" fontWeight="500">
            Verify Legal Documents
          </Text>

          {schoolData?.documents?.length === 0 ? (
            <Text fontSize="13px" color="#6B7280">
              No legal documents uploaded by this school.
            </Text>
          ) : (
            <ScholarshipSchoolDocuments documents={schoolData?.documents} />
          )}

        </Stack>



        <Stack borderWidth="1px" spacing="20px" rounded="10px" px="17px" py="16px">
          <Text color="#2F2F2F" fontSize="14px" fontWeight="500">School Verification Checklist</Text>

          <Stack borderWidth="1px" spacing="15px" rounded="10px" px="17px" py="16px">
            <HStack>
              <Checkbox></Checkbox>
              <Text fontSize="13px" fontWeight="400" color="#6B7280">I confirm that I have thoroughly reviewed and verified the school profile.</Text>
            </HStack>

            <HStack>
              <Checkbox></Checkbox>
              <Text fontSize="13px" fontWeight="400" color="#6B7280">I confirm that all documents have been reviewed by me.</Text>
            </HStack>

            <HStack>
              <Checkbox></Checkbox>
              <Text fontSize="13px" fontWeight="400" color="#6B7280">I have physically inspected the school and verified the principal’s identity.</Text>
            </HStack>
          </Stack>
        </Stack>

      </Box>

      <Modal isOpen={isRejectOpen} onClose={closeReject} isCentered size="md">
        <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(5px)" />

        <ModalContent borderRadius="12px" p={0} overflow="hidden">
          {showToast.show && (
            <ShowToast message={showToast.message} status={showToast.status} />
          )}
          <ModalHeader bg="#FEE2E2" color="#B91C1C" fontSize="16px" fontWeight="600">
            Reject School
          </ModalHeader>
          <ModalCloseButton color="#B91C1C" _hover={{ bg: "transparent" }} />

          <ModalBody p={6}>
            <Text fontSize="14px" mb={2} color="#374151">
              Reason for rejection
            </Text>

            <Input
              placeholder="Enter reason for rejection"
              value={actionNote}
              onChange={(e) => setActionNote(e.target.value)}
              size="md"
              borderColor="#D1D5DB"
              focusBorderColor="#F87171"
              rounded="md"
              mb={2}
            />

            <Text fontSize="12px" color="#6B7280">
              This reason will be visible to the school.
            </Text>
          </ModalBody>

          <ModalFooter bg="#F9FAFB" justifyContent="flex-end" gap={3} p={4}>
            <Button
              variant="outline"
              colorScheme="gray"
              onClick={closeReject}
              _hover={{ bg: "#F3F4F6" }}
              size="sm"
            >
              Cancel
            </Button>

            <Button
              colorScheme="red"
              isLoading={actionLoading === "REJECT"}
              onClick={handleReject}
              isDisabled={!actionNote.trim()}
              size="sm"
              _hover={{ bg: "#DC2626" }}
            >
              Reject School
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>



    </MainLayout>
  );
}
