import { Box, Flex, VStack, Text, Image } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import BackgroundImage from "../../../Asset/onebyone.svg";
import Logo from "../../../Asset/onebyonelogo.svg";
import Footer from "./Footer";
import { motion } from "framer-motion";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import Button from "../../../Components/Button";

export default function AuthenticatedWrapper({ children }) {
  const router = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    {
      title: "Make a Difference Today",
      subtitle:
        "Join a community of mentors, sponsors, and change-makers dedicated to empowering the next generation of leaders. Log in to continue making an impact, or sign up to start your journey.",
    },
    {
      title: "Empowering Education",
      subtitle:
        "Join a community of mentors, sponsors, and change-makers dedicated to empowering the next generation of leaders. Log in to continue making an impact, or sign up to start your journey.",
    },
    {
      title: "Shape Your Future",
      subtitle:
        "Join a community of mentors, sponsors, and change-makers dedicated to empowering the next generation of leaders. Log in to continue making an impact, or sign up to start your journey.",
    },
  ];

  // Auto Slide
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 10000);

    return () => clearInterval(interval);
  }, [slides.length]);

  const handleSlideChange = (index) => setCurrentSlide(index);

  return (
    <Flex minHeight="100vh" flexWrap="wrap">
      {/* Left Content Section */}
      <Box w={["100%", "100%", "50%", "50%"]} pb="64px" px={[4, 8, 12]} position="relative">
        {/* Back Button */}
        <Box px={["3%", "15%"]} pt="100px" onClick={() => router("/")}>
          <Button
            w={["50%", "30%", "20%"]} // 50% width on mobile, 30% on tablet, 20% on desktop
            leftIcon={<Box as={IoArrowBackCircleOutline} boxSize={["20px", "22px", "24px"]} />}
            fontSize={["sm", "md", "md"]} // smaller font on mobile
            colorScheme="green"
            variant="solid"
          >
            Home
          </Button>
        </Box>

        {children}
        <Footer />
      </Box>

      {/* Right Background Image Section */}
      <Flex
        w={["100%", "100%", "50%", "50%"]}
        bgImage={`url(${BackgroundImage})`}
        display={["none", "none", "flex", "flex"]}
        bgPos="center"
        bgSize="cover"
        bgRepeat="no-repeat"
        flexDirection="column"
        justifyContent="flex-end"
        alignItems="center"
        p="8"
      >
        {/* Fixed Slider Box */}
        <Flex
          flexDirection="column"
          justifyContent="space-between"
          alignItems="center"
          position="fixed"
          bottom="0"
        >
          {/* School Logo */}
          <Box mb="4">

            <Image src={Logo} w="150px" cursor="pointer" h="150px" pos="fixed" left="750px" bottom="210px" onClick={() => router("/")} />
          </Box>
          <Flex
            flexDirection="column"
            justifyContent="space-between"
            alignItems="center"
            bg="#CBCBCB1A"
            borderRadius="2xl"
            w="90%"
            maxW="550px"
            py="4"
            px="8"
            position="fixed"
            bottom="60px"
            boxShadow="lg"
          >
            {/* Slide Content */}
            <VStack
              as={motion.div}
              key={currentSlide}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.5 }}
              spacing="4"
              alignItems={"start"}
            >
              <Text
                fontSize="26px"
                textAlign={"left"}
                fontWeight="800"
                color="#fff"
              >
                {slides[currentSlide].title}
              </Text>
              <Text
                fontSize="14px"
                textAlign={"left"}
                fontWeight="400"
                lineHeight="24px"
                color="#fff"
              >
                {slides[currentSlide].subtitle}
              </Text>
            </VStack>

            {/* Pagination Lines */}
            <Flex mt="4" justifyContent="center">
              {slides.map((_, index) => (
                <Box
                  key={index}
                  onClick={() => handleSlideChange(index)}
                  w="160px"
                  h="6px"
                  borderRadius="2xl"
                  bg={index === currentSlide ? "#fff" : "#FFFFFF42"}
                  mx="0.5"
                  cursor="pointer"
                  transition="background-color 0.3s"
                />
              ))}
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
}
