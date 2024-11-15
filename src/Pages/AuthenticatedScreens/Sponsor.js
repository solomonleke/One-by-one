import React, { useState } from 'react';
import AuthenticatedWrapper from './Layout/Index';
import { ReactComponent as VerifyIcon } from "../../Asset/verify.svg";
import { FaArrowLeft } from 'react-icons/fa';
import { Box, Text, VStack, HStack, Tag, Wrap, WrapItem } from '@chakra-ui/react';
import TextArea from '../../Components/TextArea';
import Button from "../../Components/Button"; // Assuming you have a custom Button component
import { motion } from "framer-motion";

// Motivation Step
const MotivationStep = () => (
  <VStack spacing="70px" align="start">
    <VStack align="start" spacing="22px">
      <FaArrowLeft />
      <Text fontWeight="700" fontSize="22px" color="#101011" fontFamily="heading">
        Personalize Your Sponsorship Journey
      </Text>
      <Text fontSize="small" fontWeight="medium" color="#6B7280" lineHeight="24px">
        We’d love to learn more about what inspires you to support students.
        Your story helps us connect you with students who align with your values and goals.
      </Text>
    </VStack>
    <TextArea label="Motivation" placeholder="What motivates you to sponsor students?" />
  </VStack>
);

// Field of Interest Step
const FieldOfInterestStep = () => {
  const fields = ["Arts & Humanities", "Science", "Technology", "Business & Finance", "Healthcare & Medicine", "Law & Social Justice", "Engineering", "Math", "General Support (No preference)"];
  const [selectedFields, setSelectedFields] = useState([]);

  const toggleFieldSelection = (field) => {
    setSelectedFields((prevSelected) =>
      prevSelected.includes(field)
        ? prevSelected.filter((item) => item !== field)
        : [...prevSelected, field]
    );
  };

  return (
    <VStack spacing="70px" align="start">
      <VStack align="start" spacing="22px">
        <FaArrowLeft />
        <Text fontWeight="700" fontSize="22px" color="#101011" fontFamily="heading">
          Field of Interest
        </Text>
        <Text fontSize="small" fontWeight="medium" color="#6B7280" lineHeight="24px">
          Do you have specific fields or areas of interest you'd like to support?
          <br /> You can select multiple options.
        </Text>
      </VStack>

      {/* Tag Selection Area */}
      <Wrap spacing="10px">
        {fields.map((field) => (
          <WrapItem key={field}>
            <Tag
              size="lg"
              variant="outline"
              textColor={selectedFields.includes(field) ? "#39996B" : ""}
              bg={selectedFields.includes(field) ? "#39996B7A" : "white"}
              colorScheme={selectedFields.includes(field) ? '#39996B7A' : "gray"}
              py="4"
              px="6"
              rounded="xl"
              color={selectedFields.includes(field) ? "white" : "gray.700"}
              cursor="pointer"
              onClick={() => toggleFieldSelection(field)}
            >
              {field}
            </Tag>
          </WrapItem>
        ))}
      </Wrap>
    </VStack>
  );
};

// Main Sponsor Component
export default function Sponsor() {
  const [step, setStep] = useState(1);

  const goToStep = (stepIndex) => setStep(stepIndex);

  const renderPaginationLines = () => (
    <>
      {[...Array(2)].map((_, index) => (
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
      ))}
    </>
  );

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
            {step === 1 && <MotivationStep />}
            {step === 2 && <FieldOfInterestStep />}
          </motion.div>
        </Box>

        {/* Pagination Lines and Next/Skip Buttons */}
        <HStack mt="150px" align="center" spacing="auto">
          <HStack spacing="4px" align="flex-start">
            {renderPaginationLines()}
          </HStack>
          <HStack>
            <Button onClick={() => goToStep(2)} px='30px'>Skip</Button>
            <Button onClick={() => goToStep(Math.min(step + 1, 2))} px='30px'>
              {step === 2 ? "Finish" : "Next"}
            </Button>
          </HStack>
        </HStack>
      </Box>
    </AuthenticatedWrapper>
  );
}
