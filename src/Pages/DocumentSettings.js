import React, { useState, useEffect, useRef } from 'react'
import { ReactComponent as Warning } from "../Asset/warning.svg";
import { ReactComponent as Close } from "../Asset/close.svg";
import { useBreakpointValue, Divider, Grid, Icon, Box, HStack, Text, VStack, Stack, Spacer } from '@chakra-ui/react'
import { VscCloudUpload } from "react-icons/vsc";
import { TbFileMinus } from "react-icons/tb";
import Button from "../Components/Button"
import Input from "../Components/Input"
import ShowToast from '../Components/ToastNotification';

import {
  UploadDocumentApi,
  GetUserProfile,
} from "../Utils/ApiCall";

export default function DocumentSettings() {
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

  const [files, setFiles] = useState(initialFiles);
  const [documents, setDocuments] = useState([]);
  const [showVerificationWarning, setShowVerificationWarning] = useState(true);

  const certificateInputRef = useRef(null);
  const tinInputRef = useRef(null);
  const educationApprovalInputRef = useRef(null);
  const schoolCertInputRef = useRef(null);
  const idFrontInputRef = useRef(null);
  const idBackInputRef = useRef(null);

  const handleFileChange = (e, field) => {
    const file = e.target.files[0];

    if (file) {
      setFiles((prev) => ({
        ...prev,
        [field]: { file, name: file.name, size: file.size },
      }));
    }
  };

  const handleCloseVerificationWarning = () => {
    setShowVerificationWarning(false);
  };

  const areAllDocumentsUploaded = () => {
    const requiredDocuments = ['certificate', 'tin', 'educationApproval', 'schoolCert', 'idFront', 'idBack'];
    return requiredDocuments.every(docType => files[docType] !== null);
  };

  const handleSubmit = async () => {
    setLoading(true); // Start loading before the upload process

    const ownerType = "ADMIN";
    const studentEmail = ownerType === "STUDENT" ? "student@example.com" : null;

    // First, validate all files
    const acceptedFileTypes = ["application/pdf", "image/jpeg", "image/png"];
    for (const [key, fileData] of Object.entries(files)) {
      if (fileData?.file) {
        const fileType = fileData.file.type;
        if (!acceptedFileTypes.includes(fileType)) {
          setShowToast({
            show: true,
            message: `Invalid file type: ${fileData.file.name}. Please use PDF, JPG, or PNG.`,
            status: "error",
          });
          setTimeout(() => setShowToast({ show: false }), 5000);
          setLoading(false);
          return;
        }
      }
    }

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

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const response = await GetUserProfile();
        const docs = (response?.documents || []).filter(
          (doc) => doc.document_type
        );

        const latestDocs = {};
        docs.forEach((doc) => {
          if (
            !latestDocs[doc.document_type] ||
            new Date(doc.created_at) >
            new Date(latestDocs[doc.document_type].created_at)
          ) {
            latestDocs[doc.document_type] = doc;
          }
        });

        const formattedDocs = {};
        for (const key in initialFiles) {
          const doc = Object.values(latestDocs).find(d => d.document_type === key);
          if (doc) {
            formattedDocs[key] = {
              name: doc.document_front_url.split('/').pop(),
              size: null,
              url: doc.document_front_url,
              status: doc.status,
            };
          } else {
            formattedDocs[key] = null;
          }
        }
        setFiles(formattedDocs);
        setDocuments(Object.values(latestDocs));
      } catch (error) {
        console.error("Failed to fetch documents:", error);
      }
    };

    fetchDocuments();
  }, []);

  return (
    <>
      {showToast.show && (
        <ShowToast message={showToast.message} status={showToast.status} show={showToast.show} />
      )}

      <Stack spacing={"24px"}>
        <Stack mt={"10px"}>
          <Text fontSize={"17px"} fontWeight={"600"} color={"#1F2937"}>Verification Documents</Text>
          <Text fontSize={"13px"} fontWeight={"400"} color={"#626974"}>Manage and upload the required documents to complete your school's verification process.</Text>
        </Stack>

        {showVerificationWarning && !areAllDocumentsUploaded() && (
          <Box backgroundColor={"#FFF7EB"} py={"14px"} px={{ base: "10px", md: "20px" }} rounded={"6px"} border={"1px solid #FFA30C80"} id='close'>
            <HStack
              w="100%"
              justify="space-between"
              align="flex-start"
              spacing={3}
            >
              {/* Left: Warning icon + text */}
              <HStack
                spacing={3}
                align="flex-start"
                flex="1"
                minW="0"        // 🔥 allows text to wrap instead of pushing icons
              >
                <Box flexShrink={0}>
                  <Warning />
                </Box>

                <Text
                  fontSize={{ base: "12px", sm: "13px", md: "14px" }}
                  fontWeight="400"
                  color="#FFA30C"
                  lineHeight="1.5"
                  wordBreak="break-word"
                >
                  Your school cannot be verified until all required documents are uploaded.
                  Ensure the following documents below are uploaded.
                </Text>
              </HStack>

              {/* Right: Close icon */}
              <Close
                cursor="pointer"
                id="closer"
                onClick={handleCloseVerificationWarning}
                flexShrink={0}
              />
            </HStack>

          </Box>
        )}

        <hr className="remove" />

        <VStack spacing={4} p={{ base: "10px", md: "23px" }} w="100%" borderWidth={1} borderRadius="lg">

          {/* Certificate of Incorporation */}
          <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={4} w="100%">
            <VStack align="start" w="100%">
              <Text fontWeight="bold" fontSize="13px" color="#626974">Certificate of Incorporation</Text>

              <Box w="100%">
                {files.certificate ? (
                  <HStack
                    w="100%"
                    h="76px"
                    borderWidth={1}
                    borderRadius="lg"
                    // borderColor="#D7E8E0"
                    p={4}
                    justifyContent="space-between"
                    spacing={{ base: 2, sm: 4 }}
                  >
                    <HStack flex="1" w="100%" spacing={4} >
                      <TbFileMinus size="30px" color="#96C3AD" />
                      <Box>
                        <Text
                          color="#353535"
                          fontSize={{ base: "10px", sm: "13px" }}
                          fontWeight="500"
                          isTruncated
                        >
                          {files.certificate?.name}
                        </Text>
                        <Text fontSize={{ base: "9px", sm: "11px" }} color="#989692">
                          {files.certificate?.size
                            ? `${(files.certificate.size / 1024).toFixed(2)} KB`
                            : ""}
                        </Text>
                      </Box>
                    </HStack>

                    {/* Hidden File Input */}
                    <Input
                      ref={certificateInputRef}
                      id="certificateInput"
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png"
                      display="none"
                      onChange={(e) => handleFileChange(e, "certificate")}
                    />
                    {/* Update Button */}
                    <Text
                      fontSize={{ base: "10px", sm: "13px" }}
                      color="#39996B"
                      align="end"
                      cursor="pointer"
                      fontWeight="600"
                      onClick={() => certificateInputRef.current.click()}
                    >
                      Update
                    </Text>

                  </HStack>
                ) : (
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
                    spacing={{ base: 2, sm: 4 }}
                    alignItems="center"
                    justifyContent="center"
                    bg="#E9F8F0"
                    cursor="pointer"
                    textAlign="center"
                    onClick={() => certificateInputRef.current.click()}
                  >
                    <HStack alignText="center">
                      <Icon as={VscCloudUpload} boxSize={6} color="#39996B" />
                      <Text color="#39996B" fontWeight="500" fontSize={{ base: "10px", sm: "13px" }}>
                        Click to Upload
                      </Text>
                      <Text fontWeight="500" fontSize={{ base: "10px", sm: "13px" }}>or drag and drop</Text>
                    </HStack>
                    <Text fontSize={{ base: "9px", sm: "12px" }} color="#98A0B0" fontWeight="400">
                      PDF, JPG, JPEG, PNG less than 10MB
                    </Text>
                    <Input
                      ref={certificateInputRef}
                      id="certificateInput"
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png"
                      display="none"
                      onChange={(e) => handleFileChange(e, "certificate")}
                    />
                  </Box>
                )}
              </Box>

            </VStack>

            <VStack align="start" w="100%">
              <Text fontWeight="bold" fontSize="13px" color="#626974">Tax Identification Number</Text>

              {files.tin ? (
                <HStack
                  w="100%"
                  h="76px"
                  borderWidth={1}
                  borderRadius="lg"
                  // borderColor="#D7E8E0"
                  p={4}
                  justifyContent="space-between"
                  // flexWrap={{ base: "wrap", sm: "nowrap" }}
                  spacing={{ base: 2, sm: 4 }}
                >

                  <HStack spacing={4}>
                    <TbFileMinus size="30px" color="#96C3AD" />
                    <Box>
                      <Text fontSize="13px" fontWeight="500" isTruncated>
                        {files.certificate?.name}
                      </Text>
                      <Text fontSize="11px" color="#989692">
                        {files.certificate?.size
                          ? `${(files.certificate.size / 1024).toFixed(2)} KB`
                          : ""}
                      </Text>
                    </Box>
                  </HStack>

                  <Input
                    ref={tinInputRef}
                    id="tinInput"
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    display="none"
                    onChange={(e) => handleFileChange(e, "tin")}
                  />
                  <Text
                    ml="auto"               // ✅ THIS is the key
                    fontSize="13px"
                    color="#39996B"
                    cursor="pointer"
                    fontWeight="600"
                    onClick={() => certificateInputRef.current.click()}
                  >
                    Update
                  </Text>


                </HStack>
              ) : (
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
                  spacing={{ base: 2, sm: 4 }}
                  alignItems="center"
                  justifyContent="center"
                  bg="#E9F8F0"
                  cursor="pointer"
                  textAlign="center"
                  onClick={() => tinInputRef.current.click()}
                >
                  <HStack alignText="center">
                    <Icon as={VscCloudUpload} boxSize={6} color="#39996B" />
                    <Text color="#39996B" fontWeight="500" fontSize={{ base: "10px", sm: "13px" }}>
                      Click to Upload
                    </Text>
                    <Text fontWeight="500" fontSize={{ base: "10px", sm: "13px" }}>or drag and drop</Text>
                  </HStack>
                  <Text fontSize={{ base: "9px", sm: "12px" }} color="#98A0B0" fontWeight="400">
                    PDF, JPG, JPEG, PNG less than 10MB
                  </Text>
                  <Input
                    ref={tinInputRef}
                    id="tinInput"
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    display="none"
                    onChange={(e) => handleFileChange(e, "tin")}
                  />
                </Box>
              )}
            </VStack>
          </Grid>

          <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={4} w="100%">
            <VStack align="start" w="100%">
              <Text fontWeight="bold" fontSize="13px" color="#626974">Ministry of Education Approval Letter</Text>

              <Box w="100%">
                {files.educationApproval ? (
                  <HStack
                    w="100%"
                    h="76px"
                    borderWidth={1}
                    borderRadius="lg"
                    // borderColor="#D7E8E0"
                    p={4}
                    justifyContent="space-between"
                    // flexWrap={{ base: "wrap", sm: "nowrap" }}
                    spacing={{ base: 2, sm: 4 }}
                  >

                    <HStack spacing={4}>
                      <TbFileMinus size="30px" color="#96C3AD" />
                      <Box>
                        <Text color="#353535" fontSize={{ base: "10px", sm: "13px" }} fontWeight="450000" isTruncated>
                          {files.educationApproval?.name}
                        </Text>
                        <Text fontSize={{ base: "9px", sm: "11px" }} color="#989692">
                          {files.educationApproval?.size
                            ? `${(files.educationApproval.size / 1024).toFixed(2)} KB`
                            : ""}
                        </Text>
                      </Box>
                    </HStack>

                    <Input
                      ref={educationApprovalInputRef}
                      id="educationApprovalInput"
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png"
                      display="none"
                      onChange={(e) => handleFileChange(e, "educationApproval")}
                    />
                    <Text
                      align="end"
                      fontSize={{ base: "10px", sm: "13px" }}
                      color="#39996B"
                      cursor="pointer"
                      fontWeight="600"
                      onClick={() => educationApprovalInputRef.current.click()}
                    >
                      Update
                    </Text>
                  </HStack>
                ) : (
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
                    spacing={{ base: 2, sm: 4 }}
                    alignItems="center"
                    justifyContent="center"
                    bg="#E9F8F0"
                    cursor="pointer"
                    textAlign="center"
                    onClick={() => educationApprovalInputRef.current.click()}
                  >
                    <HStack alignText="center">
                      <Icon as={VscCloudUpload} boxSize={6} color="#39996B" />
                      <Text color="#39996B" fontWeight="500" fontSize={{ base: "10px", sm: "13px" }}>
                        Click to Upload
                      </Text>
                      <Text fontWeight="500" fontSize={{ base: "10px", sm: "13px" }}>or drag and drop</Text>
                    </HStack>
                    <Text fontSize={{ base: "9px", sm: "12px" }} color="#98A0B0" fontWeight="400">
                      PDF, JPG, JPEG, PNG less than 10MB
                    </Text>
                    <Input
                      ref={educationApprovalInputRef}
                      id="educationApprovalInput"
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png"
                      display="none"
                      onChange={(e) => handleFileChange(e, "educationApproval")}
                    />
                  </Box>
                )}
              </Box>
            </VStack>

            <VStack align="start" w="100%">
              <Text fontWeight="bold" fontSize="13px" color="#626974">School Registration Certificate</Text>

              {files.schoolCert ? (
                <HStack
                  w="100%"
                  h="76px"
                  borderWidth={1}
                  borderRadius="lg"
                  // borderColor="#D7E8E0"
                  p={4}
                  justifyContent="space-between"
                  // flexWrap={{ base: "wrap", sm: "nowrap" }}
                  spacing={{ base: 2, sm: 4 }}
                >

                  <HStack spacing={4}>
                    <TbFileMinus size="30px" color="#96C3AD" />
                    <Box>
                      <Text color="#353535" fontSize={{ base: "10px", sm: "13px" }} fontWeight="450000" isTruncated>
                        {files.schoolCert?.name}
                      </Text>
                      <Text fontSize={{ base: "9px", sm: "11px" }} color="#989692">
                        {files.schoolCert?.size
                          ? `${(files.schoolCert.size / 1024).toFixed(2)} KB`
                          : ""}
                      </Text>
                    </Box>
                  </HStack>

                  <Input
                    ref={schoolCertInputRef}
                    id="schoolCertInput"
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    display="none"
                    onChange={(e) => handleFileChange(e, "schoolCert")}
                  />
                  <Text
                    align="end"
                    fontSize={{ base: "10px", sm: "13px" }}
                    color="#39996B"
                    cursor="pointer"
                    fontWeight="600"
                    onClick={() => schoolCertInputRef.current.click()}
                  >
                    Update
                  </Text>
                </HStack>
              ) : (
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
                  spacing={{ base: 2, sm: 4 }}
                  alignItems="center"
                  justifyContent="center"
                  bg="#E9F8F0"
                  cursor="pointer"
                  textAlign="center"
                  onClick={() => schoolCertInputRef.current.click()}
                >
                  <HStack alignText="center">
                    <Icon as={VscCloudUpload} boxSize={6} color="#39996B" />
                    <Text color="#39996B" fontWeight="500" fontSize={{ base: "10px", sm: "13px" }}>
                      Click to Upload
                    </Text>
                    <Text fontWeight="500" fontSize={{ base: "10px", sm: "13px" }}>or drag and drop</Text>
                  </HStack>
                  <Text fontSize={{ base: "9px", sm: "12px" }} color="#98A0B0" fontWeight="400">
                    PDF, JPG, JPEG, PNG less than 10MB
                  </Text>
                  <Input
                    ref={schoolCertInputRef}
                    id="schoolCertInput"
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    display="none"
                    onChange={(e) => handleFileChange(e, "schoolCert")}
                  />
                </Box>
              )}
            </VStack>
          </Grid>

          <Divider />

          <Box alignSelf="start">
            <Text fontSize="15px" fontWeight="700" color="#1F2937">Principal's Verification ID</Text>
            <Text fontSize="13px" color="#6B7280">Upload a valid ID for legitimacy verification (e.g., national ID, passport).</Text>
          </Box>

          <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={4} w="100%">
            <VStack align="start" w="100%">
              <Text fontWeight="bold" fontSize="13px" color="#626974">
                <Text>Front Side</Text>
              </Text>

              <Box w="100%">
                {files.idFront ? (
                  <HStack
                    w="100%"
                    h="76px"
                    borderWidth={1}
                    borderRadius="lg"
                    // borderColor="#D7E8E0"
                    p={4}
                    justifyContent="space-between"
                    // flexWrap={{ base: "wrap", sm: "nowrap" }}
                    spacing={{ base: 2, sm: 4 }}
                  >
                    <HStack flex="1" w="100%" spacing={4}>
                      <HStack>
                        <TbFileMinus size="30px" color="#96C3AD" />
                        <Box>
                          <Text color="#353535" fontSize={{ base: "10px", sm: "13px" }} fontWeight="450000" isTruncated>
                            {files.idFront?.name}
                          </Text>
                          <Text fontSize={{ base: "9px", sm: "11px" }} color="#989692">
                            {files.idFront?.size
                              ? `${(files.idFront.size / 1024).toFixed(2)} KB`
                              : ""}
                          </Text>
                        </Box>
                      </HStack>

                      <Input
                        ref={idFrontInputRef}
                        id="idFrontInput"
                        type="file"
                        accept=".pdf,.jpg,.jpeg,.png"
                        display="none"
                        onChange={(e) => handleFileChange(e, "idFront")}
                      />
                      <Text
                        align="end"
                        fontSize={{ base: "10px", sm: "13px" }}
                        color="#39996B"
                        cursor="pointer"
                        fontWeight="600"
                        onClick={() => idFrontInputRef.current.click()}
                      >
                        Update
                      </Text>
                    </HStack>
                  </HStack>
                ) : (
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
                    spacing={{ base: 2, sm: 4 }}
                    alignItems="center"
                    justifyContent="center"
                    bg="#E9F8F0"
                    cursor="pointer"
                    textAlign="center"
                    onClick={() => idFrontInputRef.current.click()}
                  >
                    <HStack alignText="center">
                      <Icon as={VscCloudUpload} boxSize={6} color="#39996B" />
                      <Text color="#39996B" fontWeight="500" fontSize={{ base: "10px", sm: "13px" }}>
                        Click to Upload
                      </Text>
                      <Text fontWeight="500" fontSize={{ base: "10px", sm: "13px" }}>or drag and drop</Text>
                    </HStack>
                    <Text fontSize={{ base: "9px", sm: "12px" }} color="#98A0B0" fontWeight="400">
                      PDF, JPG, JPEG, PNG less than 10MB
                    </Text>
                    <Input
                      ref={idFrontInputRef}
                      id="idFrontInput"
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png"
                      display="none"
                      onChange={(e) => handleFileChange(e, "idFront")}
                    />
                  </Box>
                )}
              </Box>
            </VStack>

            <VStack align="start" w="100%">
              <Text fontWeight="bold" fontSize="13px" color="#626974">Back Side</Text>

              {files.idBack ? (
                <HStack
                  w="100%"
                  h="76px"
                  borderWidth={1}
                  borderRadius="lg"
                  // borderColor="#D7E8E0"
                  p={4}
                  justifyContent="space-between"
                  // flexWrap={{ base: "wrap", sm: "nowrap" }}
                  spacing={{ base: 2, sm: 4 }}
                >

                  <HStack spacing={4}>
                    <TbFileMinus size="30px" color="#96C3AD" />
                    <Box>
                      <Text color="#353535" fontSize={{ base: "10px", sm: "13px" }} fontWeight="450000" isTruncated>
                        {files.idBack?.name}
                      </Text>
                      <Text fontSize={{ base: "9px", sm: "11px" }} color="#989692">
                        {files.idBack?.size
                          ? `${(files.idBack.size / 1024).toFixed(2)} KB`
                          : ""}
                      </Text>
                    </Box>
                  </HStack>

                  <Input
                    ref={idBackInputRef}
                    id="idBackInput"
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    display="none"
                    onChange={(e) => handleFileChange(e, "idBack")}
                  />
                  <Text
                    align="end"
                    fontSize={{ base: "10px", sm: "13px" }}
                    color="#39996B"
                    cursor="pointer"
                    fontWeight="600"
                    onClick={() => idBackInputRef.current.click()}
                  >
                    Update
                  </Text>

                </HStack>
              ) : (
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
                  spacing={{ base: 2, sm: 4 }}
                  alignItems="center"
                  justifyContent="center"
                  bg="#E9F8F0"
                  cursor="pointer"
                  textAlign="center"
                  onClick={() => idBackInputRef.current.click()}
                >
                  <HStack alignText="center">
                    <Icon as={VscCloudUpload} boxSize={6} color="#39996B" />
                    <Text color="#39996B" fontWeight="500" fontSize={{ base: "10px", sm: "13px" }}>
                      Click to Upload
                    </Text>
                    <Text fontWeight="500" fontSize={{ base: "10px", sm: "13px" }}>or drag and drop</Text>
                  </HStack>
                  <Text fontSize={{ base: "9px", sm: "12px" }} color="#98A0B0" fontWeight="400">
                    PDF, JPG, JPEG, PNG less than 10MB
                  </Text>
                  <Input
                    ref={idBackInputRef}
                    id="idBackInput"
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    display="none"
                    onChange={(e) => handleFileChange(e, "idBack")}
                  />
                </Box>
              )}
            </VStack>
          </Grid>

          <Box align="end" w="100%">
            <Button fontSize='8px' w="16px" colorScheme="green" isLoading={loading} onClick={handleSubmit}>Save Changes</Button>
          </Box>
        </VStack>
      </Stack>
    </>
  )
}
