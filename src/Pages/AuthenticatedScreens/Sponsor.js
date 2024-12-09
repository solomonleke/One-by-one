import React, { useState } from "react";
import AuthenticatedWrapper from "./Layout/Index";
import { ReactComponent as VerifyIcon } from "../../Asset/verify.svg";
import { FaArrowLeft } from "react-icons/fa";
import { Box, Text, VStack, HStack, Tag, Wrap, WrapItem } from "@chakra-ui/react";
import TextArea from "../../Components/TextArea";
import Button from "../../Components/Button";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Sponsor = () => {
  const nav = useNavigate();
  const [currentView, setCurrentView] = useState("motivationView");
  const [payload, setPayload] = useState({
    motivation: "",
    fieldsOfInterest: [],
  });

  const switchToMotivationView = () => setCurrentView("motivationView");
  const switchToFieldOfInterestView = () => setCurrentView("fieldOfInterestView");

  const handleInputChange = (key, value) => {
    setPayload((prev) => ({ ...prev, [key]: value }));
  };

  const toggleFieldSelection = (field) => {
    setPayload((prev) => ({
      ...prev,
      fieldsOfInterest: prev.fieldsOfInterest.includes(field)
        ? prev.fieldsOfInterest.filter((item) => item !== field)
        : [...prev.fieldsOfInterest, field],
    }));
  };

  const renderPaginationLines = () => (
    <HStack spacing="4px" align="flex-start">
      {["motivationView", "fieldOfInterestView"].map((view, index) => (
        <Box
          key={view}
          height="8px"
          width="40px"
          bg={currentView === view ? "teal.500" : "gray.300"}
          cursor="pointer"
          borderRadius="md"
          onClick={() => (view === "motivationView" ? switchToMotivationView() : switchToFieldOfInterestView())}
          transition="background-color 0.3s"
        />
      ))}
    </HStack>
  );

  return (
    <AuthenticatedWrapper>
      <Box px={["3%", "15%"]} mt="74px">
      <Box mt="62px" position="relative" overflow="hidden">
          <motion.div
            key={currentView}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "tween", ease: "easeOut", duration: 0.5 }}
          >
          {currentView === "motivationView" && (
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
              <TextArea
                label="Motivation"
                placeholder="What motivates you to sponsor students?"
                value={payload.motivation}
                onChange={(e) => handleInputChange("motivation", e.target.value)}
              />
            </VStack>
          )}

          {currentView === "fieldOfInterestView" && (
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

              <Wrap spacing="10px">
                {["Arts & Humanities", "Science", "Technology", "Business & Finance", "Healthcare & Medicine", "Law & Social Justice", "Engineering", "Math", "General Support (No preference)"].map(
                  (field) => (
                    <WrapItem key={field}>
                      <Tag
                        size="lg"
                        variant="outline"
                        textColor={payload.fieldsOfInterest.includes(field) ? "#39996B" : ""}
                        bg={payload.fieldsOfInterest.includes(field) ? "#39996B7A" : "white"}
                        colorScheme={payload.fieldsOfInterest.includes(field) ? "#39996B7A" : "gray"}
                        py="4"
                        px="6"
                        rounded="xl"
                        color={payload.fieldsOfInterest.includes(field) ? "white" : "gray.700"}
                        cursor="pointer"
                        onClick={() => toggleFieldSelection(field)}
                      >
                        {field}
                      </Tag>
                    </WrapItem>
                  )
                )}
              </Wrap>
            </VStack>
          )}
       </motion.div>
       </Box>

        <HStack mt="150px" align="center" spacing="auto">
          {renderPaginationLines()}
          <HStack>
            {currentView === "motivationView" && (
              <Button onClick={switchToFieldOfInterestView} px="30px">
                Next
              </Button>
            )}
            {currentView === "fieldOfInterestView" && (
              <Button px="30px">Finish</Button>
            )}
          </HStack>
        </HStack>
      </Box>
    </AuthenticatedWrapper>
  );
};

export default Sponsor;
