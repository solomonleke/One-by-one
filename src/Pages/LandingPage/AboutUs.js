import {
    Box,
    Flex,
    Heading,
    Text,
    Button,
    Stack,
    Image,
    Icon,
    HStack,
    VStack,
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
    Grid,
    useColorModeValue,
    grid,
} from '@chakra-ui/react';
import { FaArrowRight } from 'react-icons/fa';
import { FaHandHoldingHeart } from "react-icons/fa6";
import { LuPenTool } from "react-icons/lu";
import { PiHandHeartBold, PiPlant, PiHandCoins } from "react-icons/pi";
import { RiUserSettingsLine } from "react-icons/ri";
import MainLayout from '../../LandingPageLayout'
import LandingPageImg from "../../Asset/LandingPageImg.jpg"
import Image0 from "../../Asset/Image.png"
import Image1 from "../../Asset/Image-1.png"
import Image2 from "../../Asset/Image-2.png"
import Image3 from "../../Asset/Image-3.png"
import AboutUsImg from "../../Asset/AboutUsImg.png"
import AboutProp from "../../Asset/AboutProp.png"
import fingerPrint from "../../Asset/fingerPrint.png"
import greenBackground from "../../Asset/greenBackground.png"
import ChildrenImage from "../../Asset/ChildrenImage.png"
import { PiShootingStar } from "react-icons/pi";
import studentImg from "../../Asset/studentImg.png"
import { FaArrowRightLong } from "react-icons/fa6";
import WhoWeAre from '../../LandingPageComponents/WhoWeAre';


export default function AboutUs() {



    return (
        <MainLayout>
            <WhoWeAre />

            <Box bg="#091C13" align="center" justifyContent="center" py="80px" px="60px">
                <Box align="center" justifyContent="center" display={{ base: "grid", md: "flex" }}>
                    <Box >
                        <Box display={{ base: "grid", md: "flex" }} gap="10px">
                            <VStack borderRadius="15px" mb={{ base: "20px", md: "none" }} borderLeftWidth="3px" borderLeftStyle="solid" borderLeftColor="#39996B29" p={{ base: "20px", md: "30px" }}  >
                                <Text fontSize={{ base: "30px", md: "48px" }} fontWeight="600" color="#98ACA3">100+</Text>
                                <Text fontSize={{ base: "14px", md: "17px" }} fontWeight="400" color="white" >students mentored</Text>
                            </VStack>
                            <VStack borderRadius="15px" mb={{ base: "20px", md: "none" }} borderLeftWidth="3px" borderLeftStyle="solid" borderLeftColor="#39996B29" p="30px"  >
                                <Text fontSize={{ base: "30px", md: "48px" }} fontWeight="600" color="#98ACA3">50+</Text>
                                <Text fontSize={{ base: "14px", md: "17px" }} fontWeight="400" color="white" >partnered schools</Text>
                            </VStack>
                            <VStack borderRadius="15px" mb={{ base: "20px", md: "none" }} borderLeftWidth="3px" borderLeftStyle="solid" borderLeftColor="#39996B29" p="30px"  >
                                <Text fontSize={{ base: "30px", md: "48px" }} fontWeight="600" color="#98ACA3">160+</Text>
                                <Text fontSize={{ base: "14px", md: "17px" }} fontWeight="400" color="white" >sponsored students</Text>
                            </VStack>
                        </Box>
                    </Box>
                </Box>
            </Box>

            <Box py="105px" px="50px">
                <Text fontSize={{ base: "30px", md: "50px" }} fontWeight="600" color="black" >
                    Our{" "}
                    <Text as="span" color="#8C9492">
                        Mission
                    </Text>
                </Text>
                <Text fontSize={{ base: "14px", md: "17px" }} color="#71717A">
                    One by One is built on a simple but powerful idea: every student deserves the chance to succeed, no matter their background.
                    We connect bright, determined students from underserved communities with scholarships, mentorship, and the resources they need to thrive. With the support of our dedicated volunteers and generous sponsors, we’ve created a platform that bridges the gap between potential and opportunity.
                    Through personalized connections, we’re not just funding education—we’re changing lives, one student at a time."
                </Text>
            </Box>

            <Box align="center"  justifyContent="center" bg="#E5FFF3" py={{base:"100px", md: "135px"}} px={{base:"30px", md: "40px", lg: "100px"}} >

            <Text  fontSize={{base:"23px", md:"50px"}} fontWeight="700" textAlign="center" mb={{base:"30px", md:"50px"}} >
              onebyOne’s{" "}
              <Text as="span" color="#8C9492">
                Values
              </Text>
            </Text>

            <Grid display="grid" w="100%"   gap="18px" templateColumns={{ base: "1fr", md: "repeat(2, 1fr)", lg: "repeat(3, 1fr)" }} >
              <Box mx="auto" justifyContents="center" maxW={{ base: "300px", md: "357px" }} alignItems="center" borderRadius="30px"  >
                <VStack textAlign="center" bg="#B7EED4" borderRadius="30px" justifyContent="center" h="168px"  align="center" >
                <PiShootingStar fontSize="42px" />
                </VStack>
                <Text fontSize={{ base: "18px", md: "20px", lg: "24px" }} fontWeight="600" mt="20px" >Innovation</Text>
                <Text fontSize={{ base: "12px", md: "13px", lg: "14px" }} fontWeight="400" mt="20px" letterSpacing="-2%" color="#71717A" >
                We champion the spirit of innovation. We believe in pushing the boundaries
                of design, constantly exploring new ideas, and embracing emerging technologies
                and new ideas
                </Text>
              </Box>
              <Box mx="auto" justifyContents="center" maxW={{ base: "300px", md: "357px" }} alignItems="center"      borderRadius="30px"  >
                <VStack textAlign="center" bg="#B7EED4" borderRadius="30px" justifyContent="center" h="168px"  align="center" >
                <LuPenTool fontSize="42px" />
                </VStack>
                <Text fontSize={{ base: "18px", md: "20px", lg: "24px" }} fontWeight="600" mt="20px" >Craftsmanship</Text>
                <Text fontSize={{ base: "12px", md: "13px", lg: "14px" }} fontWeight="400" mt="20px" letterSpacing="-2%" color="#71717A" >
                At the core of Sparkle lies a commitment to user-centric craftsmanship. We understand that every
                design has a story, and every user interaction is an opportunity to create a meaningful experience.
                </Text>
              </Box>
              <Box mx="auto" justifyContents="center" maxW={{ base: "300px", md: "357px" }} alignItems="center"  borderRadius="30px"  >
                <VStack textAlign="center" bg="#B7EED4" borderRadius="30px" justifyContent="center" h="168px"  align="center" >
                <PiShootingStar fontSize="42px" />
                </VStack>
                <Text fontSize={{ base: "18px", md: "20px", lg: "24px" }} fontWeight="600" mt="20px" >Craftsmanship</Text>
                <Text fontSize={{ base: "12px", md: "13px", lg: "14px" }} fontWeight="400" mt="20px" letterSpacing="-2%" color="#71717A" >
                At the core of Sparkle lies a commitment to user-centric craftsmanship. We understand that every
                design has a story, and every user interaction is an opportunity to create a meaningful experience.
                </Text>
              </Box>
            </Grid>

          </Box>
        </MainLayout>
    );
};


