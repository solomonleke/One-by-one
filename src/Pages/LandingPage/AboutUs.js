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
import { LuHeartHandshake } from "react-icons/lu";
import { PiHandHeartBold, PiPlant, PiHandCoins } from "react-icons/pi";
import { RiUserSettingsLine } from "react-icons/ri";
import MainLayout from '../../LandingPageLayout'
import LandingPageImg from "../../Asset/LandingPageImg.jpg"
import AboutUsImg from "../../Asset/AboutUsImg.png"
import AboutProp from "../../Asset/AboutProp.png"
import fingerPrint from "../../Asset/fingerPrint.png"
import greenBackground from "../../Asset/greenBackground.png"
import ChildrenImage from "../../Asset/ChildrenImage.png"
import studentImg from "../../Asset/studentImg.png"
import { FaArrowRightLong } from "react-icons/fa6";


export default function AboutUs() {



    return (
        <MainLayout>
            <Box py="105px" px="50px">
                <Text fontSize={{ base: "30px", md: "50px" }}  fontWeight="600" color="black" >
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
                    one student at a time."</Text>
            </Box>
        </MainLayout>
    );
};


