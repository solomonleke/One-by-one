import {
    Box,
    Stack,
    Flex,
    Text,
    Button,
    Input,
    Icon,
    HStack,
    VStack,
    Link,
    SimpleGrid,
    Textarea,
    FormControl,
    FormLabel,
    Divider,
    FormHelperText,
} from '@chakra-ui/react';
import { MdEmail } from "react-icons/md";
import { FaPhone, FaFacebookF, FaInstagram, FaLinkedinIn, FaXTwitter } from "react-icons/fa6";
import MainLayout from '../../LandingPageLayout';
import ShowToast from "../../Components/ToastNotification"
import { useState } from 'react';

export default function ContactUs() {

    const [showToast, setShowToast] = useState({
        show: false,
        message: "",
        status: ""
    })

    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState("");
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const validateEmail = (email, setEmailError) => {
        if (!email) {
            setEmailError("Email is required");
            return false;
        } else if (!emailRegex.test(email)) {
            setEmailError("Please enter a valid email address");
            return false;
        } else {
            setEmailError("");
            return true;
        }
    };

    const EmailSubmit = () => {
        setShowToast({
            show: true,
            title: "No changes",
            message: "Your message has been sent.",
            status: "info",
          });
          setTimeout(() => setShowToast({ show: false }), 3000);
    } 
    return (
        <MainLayout>
        {showToast.show && (
  <div style={{ position: 'fixed', top: 20, right: 20, zIndex: 1002 }}>
    <ShowToast
      message={showToast.message}
      status={showToast.status}
      show={showToast.show}
      duration={showToast.duration}
    />
  </div>
)}

            <Stack
                direction={{ base: "column", md: "row" }}
                bg="#E5FFF3"
                py={10}
                px={{ base: "20px", lg: "30px" }}
                spacing={10}
                align="flex-start"
                justify="flex-start"
                minH="100vh"
                flexWrap="wrap"
            >
                {/* Left Section */}
                <VStack align="flex-start" flex={1} spacing={6} maxW={{base: "100%", md: "480px", lg: "529px"}}  w="100%">
                    <Text fontSize={{ base: "29px", smd: "29px", md: "39px", lg: "59px" }} fontWeight="600" color="black" letterSpacing="-2px" lineHeight={{ base: "30px", md: "67px" }}>
                        Get In Touch <Text as="span" color="#8C9492">With Us</Text>
                    </Text>
                    <Text fontSize={{ base: "14px", md: "15px", lg: "17px" }} color="#71717A" lineHeight={{ base: "20px", md: "28px" }}>
                        We’re here to help, answer your questions, and hear your ideas.
                        Whether you’re interested in partnering with us, have feedback,
                        or need support, we’d love to connect.
                    </Text>

                    <Box>
                        <Text fontSize={{ base: "17px", md: "19px", lg: "23px" }} letterSpacing="-2px" fontWeight="600" mb={2}>Want To Reach Out Directly?</Text>
                        <SimpleGrid columns={{ base: 1, sm: 1 }} spacing={4}>
                            <Flex
                                align="center"
                                p={4}
                                bg="white"
                                rounded="md"
                                shadow="sm"
                                w="100%"
                                gap={6}
                                wrap="wrap"
                            >
                                <Flex align="center" gap={3}>
                                    <Box
                                        bg="white"
                                        border="1px solid #39996B"
                                        borderRadius="full"
                                        p={2}
                                        display="flex"
                                        alignItems="center"
                                        justifyContent="center"
                                    >
                                        <MdEmail color="#39996B" fontSize={{ base: "12px", md: "24" }} />
                                    </Box>
                                    <Box>
                                        <Text fontSize={{ base: "13px", md: "14px", lg: "16px" }} color="#A1A1AACC" letterSpacing="-1px">Email</Text>
                                        <Text fontSize={{ base: "12px", md: "13px", lg: "15px" }} color="#7F7F85" letterSpacing="-1px">contact@email.com</Text>
                                    </Box>
                                </Flex>

                                <Divider display={{ base: "grid", md: "none", lg: "grid"}} orientation="vertical" border="1px solid #C5EFDB" height="40px" />

                                <Flex align="center" gap={3}>
                                    <Box
                                        bg="white"
                                        border="1px solid #39996B"
                                        borderRadius="full"
                                        p={2}
                                        display="flex"
                                        alignItems="center"
                                        justifyContent="center"
                                    >
                                        <FaPhone color="#39996B" fontSize={{ base: "12px", md: "24" }} />
                                    </Box>
                                    <Box>
                                        <Text fontSize={{ base: "13px", md: "14px", lg: "16px" }} color="#A1A1AACC" letterSpacing="-1px">Phone</Text>
                                        <Text fontSize={{ base: "12px", md: "13px", lg: "15px" }} color="#7F7F85" letterSpacing="-1px">(234) 564 - 6788</Text>
                                    </Box>
                                </Flex>
                            </Flex>
                        </SimpleGrid>
                    </Box>

                    <Box>
                        <Text fontWeight="600" fontSize={{ base: "15px", md: "18px", lg: "23px" }} letterSpacing="-2px" mb="20px">Follow Us:</Text>
                        <HStack spacing={{ base: "20px", md: "30px" }} mb={{ base: "20px", md: "0" }} >
                            <Link href="#"><Icon as={FaFacebookF} color="#39996B" _hover={{transform: "scale(1.3)", transition: "transform 0.2s ease-in-out"}} boxSize={{ base: 4, md: 5 }} /></Link>
                            <Link href="#"><Icon as={FaXTwitter} color="#39996B"  _hover={{transform: "scale(1.3)", transition: "transform 0.2s ease-in-out"}} boxSize={{ base: 4, md: 5 }} /></Link>
                            <Link href="#"><Icon as={FaInstagram} color="#39996B"  _hover={{transform: "scale(1.3)", transition: "transform 0.2s ease-in-out"}} boxSize={{ base: 4, md: 5 }} /></Link>
                            <Link href="#"><Icon as={FaLinkedinIn} color="#39996B"  _hover={{transform: "scale(1.3)", transition: "transform 0.2s ease-in-out"}} boxSize={{ base: 4, md: 5 }} /></Link>
                        </HStack>
                    </Box>
                </VStack>

                {/* Right Section - Contact Form */}
                <Box
                    bg="white"
                    p={{ base: 4, md: 8 }}
                    rounded="2xl"
                    shadow="md"
                    w="100%"
                    flex="1 1 0"
                    maxW={{ base: "100%", md: "550px",lg: "640px" }}
                    mr="auto"  // Pushes right edge inward
                >
                    <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4} mb={4}>
                        <FormControl>
                            <FormLabel fontSize={{ base: "13px", md: "14px", lg: "16px" }}>First Name</FormLabel>
                            <Input fontSize={{ base: "13px", md: "14px", lg: "16px" }} placeholder="First name" />
                        </FormControl>

                        <FormControl>
                            <FormLabel fontSize={{ base: "13px", md: "14px", lg: "16px" }}>Last Name</FormLabel>
                            <Input fontSize={{ base: "13px", md: "14px", lg: "16px" }} placeholder="Last name" />
                        </FormControl>
                    </SimpleGrid>

                    <FormControl mb={4} isInvalid={!!emailError}>
                        <FormLabel fontSize={{ base: "13px", md: "14px", lg: "16px" }}>Email</FormLabel>
                        <Input 
                            fontSize={{ base: "13px", md: "14px", lg: "16px" }} 
                            placeholder="your@email.com" 
                            type="email" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                            onBlur={() => validateEmail(email, setEmailError)}
                        />
                        {emailError ? <FormHelperText color="red.500">{emailError}</FormHelperText> : null}
                    </FormControl>

                    <FormControl mb={4}>
                        <FormLabel fontSize={{ base: "13px", md: "14px", lg: "16px" }}>Phone</FormLabel>
                        <Input placeholder="+234 812-123-4567" type="tel" />
                    </FormControl>

                    <FormControl mb={6}>
                        <FormLabel fontSize={{ base: "13px", md: "14px", lg: "16px" }}>Message</FormLabel>
                        <Textarea fontSize={{ base: "13px", md: "14px", lg: "16px" }} placeholder="Write your message..." rows={4} />
                    </FormControl>

                    <Button
                        bg="#39996B"
                        color="white"
                        _focus={{ boxShadow: 'none' }}
                        rightIcon={<span>&rarr;</span>}
                        w="full"
                        _hover={{ bg: "transparent", color: "#39996B", border: "1px solid #39996B" }}
                        onClick={EmailSubmit}
                    >
                        Send Message
                    </Button>
                </Box>
            </Stack>
        </MainLayout>
    );
}
