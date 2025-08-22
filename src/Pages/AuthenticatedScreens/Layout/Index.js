import { Box, Flex, VStack, Text, Image, useBreakpointValue, HStack } from "@chakra-ui/react";
import React, { useState, useEffect, useCallback, useMemo } from "react";
import Footer from "./Footer";
import { motion } from "framer-motion";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { IoIosArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import Button from "../../../Components/Button";

// Memoized slider component for performance
const SliderContent = React.memo(({ currentSlide, slides, handleSlideChange }) => (
  <Flex
    flexDirection="column"
    justifyContent="space-between"
    alignItems="center"
    bg="rgba(203, 203, 203, 0.1)"
    backdropFilter="blur(10px)"
    borderRadius={["lg", "xl", "2xl"]}
    w={["95%", "90%", "85%"]}
    maxW={["400px", "500px", "550px"]}
    py={[3, 4, 6]}
    px={[4, 6, 8]}
    boxShadow="xl"
    border="1px solid rgba(255, 255, 255, 0.1)"
  >
    <VStack
      as={motion.div}
      key={currentSlide}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      spacing={[3, 4, 4]}
      alignItems="start"
      w="full"
    >
      <Text
        fontSize={["lg", "xl", "2xl"]}
        textAlign="left"
        fontWeight="800"
        color="white"
        lineHeight="shorter"
      >
        {slides[currentSlide].title}
      </Text>
      <Text
        fontSize={["sm", "sm", "md"]}
        textAlign="left"
        fontWeight="400"
        lineHeight={["1.4", "1.5", "1.6"]}
        color="rgba(255, 255, 255, 0.95)"
      >
        {slides[currentSlide].subtitle}
      </Text>
    </VStack>

    <Flex mt={[3, 4, 4]} justifyContent="center" w="full">
      {slides.map((_, index) => (
        <Box
          key={index}
          onClick={() => handleSlideChange(index)}
          w={["80px", "120px", "160px"]}
          h={["4px", "5px", "6px"]}
          borderRadius="full"
          bg={index === currentSlide ? "white" : "rgba(255, 255, 255, 0.3)"}
          mx={1}
          cursor="pointer"
          transition="all 0.3s ease"
          _hover={{
            bg: index === currentSlide ? "white" : "rgba(255, 255, 255, 0.5)",
            transform: "scaleY(1.2)"
          }}
        />
      ))}
    </Flex>
  </Flex>
));

export default function AuthenticatedWrapper({ children }) {
  const router = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);

  // Public folder image paths
  const backgroundImageUrl = "/onebyone.svg";
  const logoUrl = "/onebyonelogo.svg";

  // Responsive values
  const isMobile = useBreakpointValue({ base: true, lg: false });
  const showRightSection = useBreakpointValue({ base: false, md: true });
  const logoSize = useBreakpointValue({ base: "80px", md: "120px", lg: "150px" });
  const buttonWidth = useBreakpointValue({ base: "60%", sm: "40%", md: "30%", lg: "25%" });

  const slides = useMemo(() => [
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
  ], []);

  // Auto Slide with cleanup
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 8000); 
    return () => clearInterval(interval);
  }, [slides.length]);

  const handleSlideChange = useCallback((index) => {
    setCurrentSlide(index);
  }, []);

  const navigateHome = useCallback(() => {
    router("/");
  }, [router]);

  return (
    <Flex minHeight="100vh" direction={["column", "column", "row"]} position="relative">
      {/* Left Content Section */}
      <Box 
        w={["100%", "100%", showRightSection ? "50%" : "100%"]} 
        pb={["32px", "48px", "64px"]} 
        px={[4, 6, 8, 12]} 
        position="relative"
        minH={isMobile ? "100vh" : "auto"}
      >
        {/* Back Button */}
        <HStack px={["5%", "8%", "10%", "15%"]} _hover={{color:"greenn.greenn500"}} cursor="pointer" pt={["60px", "32px", "32px"]} onClick={navigateHome}>
        <Box>
          <IoIosArrowRoundBack /> 
        </Box>
        <Text>Home</Text>
        </HStack>

        {children}
        
        <Footer />
      </Box>

      {/* Right Background Image Section */}
      {showRightSection && (
        <Flex
          w={["100%", "100%", "50%"]}
          bgImage={`url(${backgroundImageUrl})`}
          bgPos="center"
          bgSize="cover"
          bgRepeat="no-repeat"
          bgAttachment={["scroll", "scroll", "fixed"]}
          flexDirection="column"
          justifyContent="flex-end"
          alignItems="center"
          p={[4, 6, 8]}
          position="relative"
          minH="100vh"
        >
          {/* School Logo */}
          <Box
            position="absolute"
            top={["20%", "25%", "50%"]}
            left="50%"
            transform="translateX(-50%)"
            zIndex={2}
          >
            <Image 
              src={logoUrl} 
              w={logoSize}
              h={logoSize}
              cursor="pointer" 
              onClick={navigateHome}
              loading="eager"
              alt="One by One Logo"
              transition="all 0.3s ease"
              _hover={{ 
                transform: "scale(1.05) translateX(-50%)", 
                filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.2))" 
              }}
            />
          </Box>

          {/* Slider Container */}
          <Box
            position="absolute"
            bottom={["60px", "80px", "100px"]}
            left="50%"
            transform="translateX(-50%)"
            w="full"
            display="flex"
            justifyContent="center"
            px={[4, 6, 8]}
          >
            <SliderContent 
              currentSlide={currentSlide}
              slides={slides}
              handleSlideChange={handleSlideChange}
            />
          </Box>
        </Flex>
      )}
    </Flex>
  );
}