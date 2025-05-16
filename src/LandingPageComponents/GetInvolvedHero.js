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
import GetInvolvedImg from "../Asset/GetInvolvedImg.png";


export default function GetInvolvedHero() {
    return (
        <Box
                py={{ base: "60px", md: "105px" }}
                px={{ base: "20px", sm: "30px", md: "50px" }}
                align="center"
                position="relative" 
                overflow="hidden"
                bg="linear-gradient(to right, rgb(0, 25, 6) 0%, rgba(19, 100, 61, 0.95) 80%)"
            >
                <Image
                src={GetInvolvedImg}
                alt="Decorative Flower"
                position="absolute"
                top={{ base: "0", md: "0" }}
                left={{ base: "-20px", md: "0" }}
                w={{ base: "100px", md: "150px" }}
                zIndex="500"
                pointerEvents="none"
            />
                <Box w="100%" maxW={{ base: "100%", md: "933px" }} textAlign="center">
                    <Text
                        fontSize={{ base: "24px", sm: "30px", md: "50px" }}
                        fontWeight="600"
                        letterSpacing={{ base: "-1px", md: "-2px" }}
                        color="white"
                    >
                        Your Role in Changing Lives Starts{" "}
                        <Text as="span" color="#8C9492">
                            Here
                        </Text>
                    </Text>

                    <Text
                        fontSize={{ base: "14px", sm: "16px", md: "18px" }}
                        fontWeight="400"
                        color="#FFFF"
                        mt={{ base: "20px", md: "27px" }}
                    >
                        One by One offers multiple ways to get involved. Choose the role that aligns
                        with your passion and expertise to help students unlock their potential.
                    </Text>
                </Box>
            </Box>
    );
}





