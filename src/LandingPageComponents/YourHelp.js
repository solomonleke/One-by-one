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
import ChildrenImage from "../Asset/ChildrenImage.png"
import HelpImg from "../Asset/HelpImg.png";

export default function YourHelp() {
    return (
<Box
  position="relative"
  overflow="hidden"
  bg="#17422D"
  px={{ base: "20px", lg: "30px" }}
  py={{ base: "40px", md: "60px" }}
  minH={{ base: "auto", md: "762px" }}
  display="flex"
  alignItems="center"
  justifyContent="center"
>            <Image
                src={HelpImg}
                alt="Decorative Flower"
                position="absolute"
                bottom={{ base: "0", md: "0" }}
                left={{ base: "-40px", md: "-40px" }}
                w={{ base: "110px", md: "150px", lg: "170px" }}
                zIndex="500"
                pointerEvents="none"
            />
            <Box display={{ base: "grid", md: "flex" }} w="100%"  justifyContent="center">
                <Box flex="1" mx="auto" mr={{ base: "none", md: "41px", lg: "61px" }} w={{ base: "100%", smd: "400px", md: "auto" }} >
                    <Image src={ChildrenImage} zIndex="1001" w={{ base: "100%", smd: "400px", md: "auto" }} h="auto" borderRadius="10.41px" />
                </Box>
                <VStack flex="1" w="100%" maxW={{ base: "100%", md: "350px", lg: "500px" }} align={{ base: "center", md: "left" }} textAlign="left" >
                    <Text fontSize={{ base: "30px", md: "40px", lg: "50px" }} fontWeight="700"  >
                        Your Help{" "}
                        <Text as="span" color="#8C9492">
                            Matters
                        </Text>
                    </Text>
                    <Text zIndex="501" fontSize={{ base: "13px", md: "15px", lg: "17px" }} textAlign={{ base: "center", md: "left" }} fontWeight="400" color="white">
                        Every student we support is one step closer to achieving their
                        biggest dreams. Your generosity helps provide the essential
                        resources they need to excel.
                    </Text>

                    <Flex p="15px" w="100%" maxW={{ base: "100%", md: "480px" }} border="1px solid rgba(255, 255, 255, 0.23)" color="white" borderRadius="10px" fontWeight="600" align="center">
                        <Box fontSize={{ base: "25px", md: "35px" }}>
                            <PiHandHeartBold />
                        </Box>
                        <Text fontSize={{ base: "11px", md: "12px", lg: "17px" }} ml="5px" >Be the Hope disadvantaged students Deserve</Text>
                    </Flex>
                    <Flex p="15px" w="100%" maxW={{ base: "100%", md: "480px" }} border="1px solid rgba(255, 255, 255, 0.23)" color="white" borderRadius="10px" fontWeight="600" align="center">
                        <Box fontSize={{ base: "25px", md: "35px" }}>
                            <LuHeartHandshake />
                        </Box>
                        <Text fontSize={{ base: "11px", md: "12px", lg: "17px" }} ml="5px" >Support Dreams</Text>
                    </Flex>
                    <Flex p="15px" w="100%" maxW={{ base: "100%", md: "480px" }} border="1px solid rgba(255, 255, 255, 0.23)" color="white" borderRadius="10px" fontWeight="600" align="center">
                        <Box fontSize={{ base: "25px", md: "35px" }}>
                            <PiPlant />
                        </Box>
                        <Text fontSize={{ base: "11px", md: "12px", lg: "17px" }} ml="5px" >Invest in a Brighter Future</Text>
                    </Flex>
                </VStack>
            </Box>

        </Box>
    );
}





