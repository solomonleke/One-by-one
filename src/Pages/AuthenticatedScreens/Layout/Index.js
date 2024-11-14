import { Box, Flex, VStack, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import BackgroundImage from "../../../Asset/onebyone.svg";
import Footer from "./Footer";
import { motion } from "framer-motion";

export default function AuthenticatedWrapper({ children }) {
  const [currentBox, setCurrentBox] = useState(0);
  const boxes = [
    { image: "https://via.placeholder.com/80", text: "Welcome to Step 1" },
    { image: "https://via.placeholder.com/80", text: "Welcome to Step 2" },
    { image: "https://via.placeholder.com/80", text: "Welcome to Step 3" },
  ];

  const nextBox = () => {
    setCurrentBox((prev) => (prev + 1) % boxes.length);
  };

  return (
    <Flex minHeight="100vh">
      {/* Left Content Section */}
      <Box w={["100%", "50%"]} pb="64px">
        {children}
        <Footer />
      </Box>

      {/* Right Background Image Section with Pagination Box */}
      <Flex
        w={["100%", "50%"]}
        bgImage={`url(${BackgroundImage})`}
        bgPos="center"
        bgSize="cover"
        bgRepeat="no-repeat"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        p="8"
      >
        {/* Paginated Box */}
        <VStack
          as={motion.div}
          key={currentBox}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          transition={{ duration: 0.5 }}
          bg="rgba(255, 255, 255, 0.8)"
          borderRadius="md"
          p="4"
          textAlign="center"
          spacing="2"
          maxW="80%"
        >
          <img
            src={boxes[currentBox].image}
            alt="Box content"
            style={{ width: "80px", height: "80px" }}
          />
          <Text fontWeight="bold">{boxes[currentBox].text}</Text>
        </VStack>

        {/* Pagination Indicator */}
        <Flex mt="4">
          {boxes.map((_, index) => (
            <Box
              key={index}
              onClick={() => setCurrentBox(index)}
              w="8px"
              h="8px"
              borderRadius="full"
              bg={index === currentBox ? "teal.500" : "gray.300"}
              mx="1"
              cursor="pointer"
              transition="background-color 0.3s"
            />
          ))}
        </Flex>
      </Flex>
    </Flex>
  );
}
