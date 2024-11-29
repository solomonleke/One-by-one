import React, { useState } from "react";
import { useNavigate } from 'react-router-dom'
import AuthenticatedWrapper from "./Layout/Index";
import {
  Box,
  HStack,
  Select,
  Text,
  VStack,
  Tag,
} from "@chakra-ui/react";
import { FaArrowLeft, FaCloudUploadAlt } from "react-icons/fa";
import { motion } from "framer-motion";
import Button from "../../Components/Button";
import Input from "../../Components/Input"
import TextArea from "../../Components/TextArea";

// Step components
const FundAdminProfileComplete = () => {
  // const router = useNavigate();
  return(
    <VStack spacing="70px" alignItems="start">
          <VStack alignItems="start" spacing="22px">
      <FaArrowLeft cursor={"pointer"} onClick={() => {
        // router("/roleSelection")
      }}/>
      <Text
        textTransform="capitalize"
        fontWeight="700"
        fontSize="24px"
        color="#101011"
        fontFamily="heading"
        mt="4"
      >
        complete your fund admin profile
      </Text>
      <Text
        fontSize="small"
        fontWeight="normal"
        color="#6B7280"
        lineHeight="24px"
      >
        Let’s get to know you and verify you as a fund admin
      </Text>
    </VStack>
    
    <Input label="State" placeholder="Enter your state"/>
    <Input label="Local Government" placeholder="e.g Oshodi isolo"/>
    <Input label="City" placeholder="e.g Okota"/>
    <Input label="Home Address" placeholder="e.g 86 Jemtok street"/>
    <Input label="Occupation" placeholder="e.g Banker"/>
    <Input label="Phone Nuber" placeholder="+234"/>
    </VStack>
    )
};

const VerifyIdentityStep = () => {
  return(
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
  )
};

const ProofOfExperienceStep = () => {
  return(
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
    <TextArea label="Describe your experience" placeholder="Tell us about the types of funds you’ve managed." />
  </VStack>
  )
};

// Main Component
export default function FundAdminSignup() {
  const [step, setStep] = useState(1);
  const steps = [FundAdminProfileComplete, VerifyIdentityStep, ProofOfExperienceStep];

  const goToStep = (stepIndex) => setStep(stepIndex);

  const renderPaginationLines = () =>
    steps.map((_, index) => (
      <Box
        key={index}
        height="8px"
        width="40px"
        bg={step === index + 1 ? "teal.500" : "gray.300"}
        cursor="pointer"
        borderRadius="md"
        onClick={() => goToStep(index + 1)}
        transition="background-color 0.3s"
      />
    ));

  return (
    <AuthenticatedWrapper>
      <Box px={["3%", "15%"]} mt="74px">
        <Box mt="62px" position="relative" overflow="hidden">
          <motion.div
            key={step}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "tween", ease: "easeOut", duration: 0.5 }}
          >
            {steps[step - 1]()}
          </motion.div>
        </Box>

        {/* Pagination Lines and Next/Finish Buttons */}
        <HStack mt="150px" align="center" spacing="auto">
          <HStack spacing="4px" align="flex-start">
            {renderPaginationLines()}
          </HStack>
          <HStack>
            <Button
              onClick={() => goToStep(Math.min(step + 1, steps.length))}
              px="30px"
            >
              {step === steps.length ? "Finish" : "Next"}
            </Button>
          </HStack>
        </HStack>
      </Box>
    </AuthenticatedWrapper>
  );
}
