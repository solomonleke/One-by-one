import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import AuthenticatedWrapper from "./Layout/Index";
import {
  Box,
  HStack,
  Select,
  Text,
  VStack,
} from "@chakra-ui/react";
import { FaArrowLeft, FaCloudUploadAlt } from "react-icons/fa";
import { motion } from "framer-motion";
import Button from "../../Components/Button";
import Input from "../../Components/Input";
import TextArea from "../../Components/TextArea";
import { CreateAdminApi } from "../../Utils/ApiCall";
import ShowToast from "../../Components/ToastNotification";

const FundAdminSignup = () => {
  const [step, setStep] = useState(1);

  const [payload, setPayload] = useState({
    userType: "FUND-ADMIN",
    state: "",
    localGoverment: "",
    city: "",
    homeAddress: "",
    occupation: "",
    phoneNumber: "",
    experience: "",
  });

  const [showToast, setShowToast] = useState({
    show: false,
    message: "",
    status: ""
  })

  const [Loading, setLoading] = useState(false)

  const nav = useNavigate();

  const handlePayload = (e) => {

    setPayload({ ...payload, [e.target.id]: e.target.value })

  }

  const Submit = async () => {

    setLoading(true)
    try {

      const result = await CreateAdminApi(payload)

      if (result.status === 201) {
        setLoading(false)
        setShowToast({ show: true, message: "Fund Admin created successfully. Kindly Sign in to Continue", status: "success" })
        setTimeout(() => {
          setShowToast({
            show: false,

          })

          nav("/sign-in")
        }, 4000)
      }
    } catch (e) {
      setLoading(false)
      console.log(e.message)
      setShowToast({
        show: true,
        message: e.message,
        status: "error"
      })

      setTimeout(() => {
        setShowToast({
          show: false,

        })
      }, 7000)
    }
  }


  const renderPaginationLines = () =>
    [1, 2, 3].map((index) => (
      <Box
        key={index}
        height="8px"
        width="40px"
        bg={step === index ? "teal.500" : "gray.300"}
        cursor="pointer"
        borderRadius="md"
        onClick={() => setStep(index)}
        transition="background-color 0.3s"
      />
    ));

  return (
    <AuthenticatedWrapper>
      {
                showToast.show && (
                    <ShowToast message={showToast.message} status={showToast.status} show={showToast.show} />

                )
            }
      <Box px={["3%", "15%"]} mt="74px">
        <Box mt="62px" position="relative" overflow="hidden">
          <motion.div
            key={step}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "tween", ease: "easeOut", duration: 0.5 }}
          >
            {step === 1 && (
              <VStack spacing="70px" alignItems="start">
                <VStack alignItems="start" spacing="22px">
                  <FaArrowLeft cursor="pointer" onClick={() => {/* Navigate to role selection */ }} />
                  <Text fontWeight="700" fontSize="24px">Complete your fund admin profile</Text>
                  <Text fontSize="small" color="#6B7280">Let’s get to know you and verify you as a fund admin</Text>
                </VStack>
                <Input label="State" onChange={handlePayload} value={payload.state} placeholder="Enter your state" id="state" />
                <Input label="Local Government" onChange={handlePayload} value={payload.localGoverment} placeholder="e.g Oshodi Isolo" id="localGoverment" />
                <Input label="City" onChange={handlePayload} value={payload.city} placeholder="e.g Okota" id="city" />
                <Input label="Home Address" onChange={handlePayload} value={payload.homeAddress} placeholder="e.g 86 Jemtok street" id="homeAddress" />
                <Input label="Occupation" onChange={handlePayload} value={payload.occupation} placeholder="e.g Banker" id="occupation" />
                <Input label="Phone Number" onChange={handlePayload} value={payload.phoneNumber} placeholder="+234" id="phoneNumber" />
              </VStack>
            )}

            {step === 2 && (
              <VStack spacing="40px" alignItems="start">
                <VStack alignItems="start" spacing="22px">
                  <FaArrowLeft />
                  <Text
                    textTransform="capitalize"
                    fontWeight="700"
                    fontSize="24px"
                    color="#101011"
                    fontFamily="heading"
                    mt="4"
                  >
                    Verify Your Identity
                  </Text>
                  <Text
                    fontSize="small"
                    fontWeight="normal"
                    color="#6B7280"
                    lineHeight="24px"
                  >
                    To help us maintain a secure platform, we need to verify your
                    identity. Please upload one of the following government-issued IDs
                    and complete a quick selfie verification to confirm it’s really you.
                  </Text>
                </VStack>
                <VStack w="100%" alignItems="start">
                  <Text
                    textTransform="capitalize"
                    fontWeight="500"
                    fontSize="14px"
                    color="#101011"
                    fontFamily="heading"
                  >
                    Verify my identity using
                  </Text>

                  <Select
                    border="2px"
                    placeholder="Select option"
                    fontSize="small"
                    fontWeight="normal"
                    w="100%"
                  >
                    <option value="option1">National ID Card</option>
                    <option value="option2">NIN</option>
                    <option value="option3">Driver's License</option>
                    <option value="option4">Voter's Card</option>
                  </Select>
                </VStack>

                <VStack alignItems="start">
                  <Text
                    textTransform="capitalize"
                    fontWeight="500"
                    fontSize="14px"
                    color="#101011"
                    fontFamily="heading"
                  >
                    Front Side
                  </Text>
                  <Box
                    backgroundColor="#E9FFF5"
                    py="30px"
                    px="100px"
                    cursor="pointer"
                    borderRadius="8px"
                    borderWidth="2px"
                    borderStyle="dashed"
                  >
                    <label htmlFor="FrontSide" className="label">
                      <VStack>
                        <HStack>
                          <FaCloudUploadAlt className="labelText" />
                          <Text>
                            <span className="labelText">Click to Upload or</span>
                            <span className="drag"> drag and drop</span>
                          </Text>
                        </HStack>

                        <Text
                          fontSize="small"
                          fontWeight="normal"
                          color="#6B7280"
                          lineHeight="24px"
                        >
                          PDF, JPG, JPEG, PNG less than 10MB
                        </Text>
                      </VStack>
                    </label>
                    <input
                      type="file"
                      id="FrontSide"
                      className="uploadVerification"
                      style={{ display: "none" }}
                    />
                  </Box>
                </VStack>

                <VStack alignItems="start">
                  <Text
                    textTransform="capitalize"
                    fontWeight="500"
                    fontSize="14px"
                    color="#101011"
                    fontFamily="heading"
                  >
                    Back Side
                  </Text>
                  <Box
                    backgroundColor="#E9FFF5"
                    py="30px"
                    px="100px"
                    cursor="pointer"
                    borderRadius="8px"
                    borderWidth="2px"
                    borderStyle="dashed"
                  >
                    <label htmlFor="BackSide" className="label">
                      <VStack>
                        <HStack>
                          <FaCloudUploadAlt className="labelText" />
                          <Text>
                            <span className="labelText">Click to Upload or</span>
                            <span className="drag"> drag and drop</span>
                          </Text>
                        </HStack>

                        <Text
                          fontSize="small"
                          fontWeight="normal"
                          color="#6B7280"
                          lineHeight="24px"
                        >
                          PDF, JPG, JPEG, PNG less than 10MB
                        </Text>
                      </VStack>
                    </label>
                    <input
                      type="file"
                      id="BackSide"
                      className="uploadVerification"
                      style={{ display: "none" }}
                    />
                  </Box>
                </VStack>
              </VStack>
            )}

            {step === 3 && (
              <VStack spacing="70px">
                <VStack spacing="40px" alignItems="start">
                  <VStack alignItems="start" spacing="22px">
                    <FaArrowLeft />
                    <Text
                      textTransform="capitalize"
                      fontWeight="700"
                      fontSize="24px"
                      color="#101011"
                      fontFamily="heading"
                      mt="4"
                    >
                      Proof of Experience
                    </Text>
                    <Text
                      fontSize="small"
                      fontWeight="normal"
                      color="#6B7280"
                      lineHeight="24px"
                    >
                      To help us verify your expertise, please provide details of your <br /> previous experience in fund management or related fields.
                    </Text>
                  </VStack>

                  {/* Add file upload for proof of experience here */}
                  <VStack alignItems={"start"}>
                    <Text textTransform="capitalize"
                      fontWeight="500"
                      fontSize="14px"
                      color="#101011"
                      fontFamily="heading">Upload supporting documents</Text>
                    <Text fontSize="small"
                      fontWeight="normal"
                      color="#6B7280"
                      lineHeight="24px">Examples: employment letters, certificates, project reports, or portfolio <br /> summaries)</Text>
                    <Box
                      backgroundColor="#E9FFF5"
                      py="30px"
                      px="100px"
                      cursor="pointer"
                      borderRadius="8px"
                      borderWidth="2px"
                      borderStyle="dashed"
                    >
                      <label htmlFor="ProofOfExperience" className="label">
                        <VStack>
                          <HStack>
                            <FaCloudUploadAlt className="labelText" />
                            <Text>
                              <span className="labelText">Click to Upload or</span>
                              <span className="drag"> drag and drop</span>
                            </Text>
                          </HStack>

                          <Text
                            fontSize="small"
                            fontWeight="normal"
                            color="#6B7280"
                            lineHeight="24px"
                          >
                            PDF, JPG, JPEG, PNG less than 10MB
                          </Text>
                        </VStack>
                      </label>
                      <input
                        type="file"
                        id="ProofOfExperience"
                        className="uploadVerification"
                        style={{ display: "none" }}
                      />
                    </Box>
                  </VStack>

                </VStack>
                <TextArea label="Describe your experience" onChange={handlePayload} value={payload.experience} placeholder="Tell us about the types of funds you’ve managed." id="experience" />
              </VStack>
            )}
          </motion.div>
        </Box>

        <HStack mt="150px" align="center" spacing="auto">
          <HStack spacing="4px">{renderPaginationLines()}</HStack>
          <HStack>
            <Button
            isLoading={Loading}
              onClick={() => {
                if (step === 3) {
                  Submit();
                } else {
                  setStep(Math.min(step + 1, 3));
                }
              }}
            >
              {step === 3 ? "Finish" : "Next"}
            </Button>
          </HStack>
        </HStack>
      </Box>
    </AuthenticatedWrapper>
  );
};

export default FundAdminSignup;
