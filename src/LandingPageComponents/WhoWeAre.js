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
    Wrap,
    useColorModeValue,
    grid,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom'
import { FaArrowRight } from 'react-icons/fa';
import { FaHandHoldingHeart } from "react-icons/fa6";
import { LuHeartHandshake } from "react-icons/lu";
import { PiHandHeartBold, PiPlant, PiHandCoins } from "react-icons/pi";
import Image0 from "../Asset/Image.png"
import Image1 from "../Asset/Image-1.png"
import Image2 from "../Asset/Image-2.png"
import Image3 from "../Asset/Image-3.png"
import ChildrenImage from "../Asset/ChildrenImage.png"
import WhoWeAreImg from "../Asset/WhoWeAre.png";


export default function WhoWeAre() {
    return (
        <Box position="relative" zIndex="900" overflow="hidden" py={{ base: "30px", md: "70px" }} px="50px">
        <Image
                src={WhoWeAreImg}
                alt="Decorative Flower"
                position="absolute"
                bottom={{ base: "0", md: "0" }}
                left={{ base: "-20px", md: "0" }}
                w={{ base: "180px", md: "150px" }}
                zIndex="900"
                pointerEvents="none"
            />
                <Text fontSize={{ base: "30px", md: "50px" }} fontWeight="600" color="black" >
                    Who We{" "}
                    <Text as="span" color="#8C9492">
                        Are
                    </Text>
                </Text>
                <Text fontSize={{ base: "14px", md: "17px" }} color="#71717A">
                    One by One is built on a simple but powerful idea: every student deserves the chance to succeed, no matter their background.
                    We connect bright, determined students from underserved communities with scholarships, mentorship, and the resources they need
                    to thrive. With the support of our dedicated volunteers and generous sponsors, we’ve created a platform that bridges the gap
                    between potential and opportunity. Through personalized connections, we’re not just funding education—we’re changing lives,
                    one student at a time."
                </Text>

                <Box
                    mt="50px"
                    display="flex"
                    flexWrap="wrap"
                    justifyContent="center"
                    gap="25px"
                >
                    <Image src={Image0} maxW={{ base: "100%", sm: "45%", md: "22%" }} w="100%" />
                    <Image src={Image1} maxW={{ base: "100%", sm: "45%", md: "22%" }} w="100%" />
                    <Image src={Image2} maxW={{ base: "100%", sm: "45%", md: "22%" }} w="100%" />
                    <Image src={Image3} maxW={{ base: "100%", sm: "45%", md: "22%" }} w="100%" />
                </Box>
            </Box>
    );
}





