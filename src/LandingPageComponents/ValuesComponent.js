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
import { FaArrowRight } from 'react-icons/fa';
import fingerPrint from "../Asset/fingerPrint.png"
import greenBackground from "../Asset/greenBackground.png"
import valuesImage from "../Asset/valuesImage.png";

export default function Values() {
    return (
        <Box position="relative" overflow="hidden" align="center" bg="white" justifyContent="center" bgImage={greenBackground} bgPosition="center" bgRepeat="no-repeat" bgSize="cover" py={{ base: "100px", md: "135px" }} px={{ base: "20px", lg: "30px" }} >

<Image
        src={valuesImage}
        alt="Decorative Flower"
        position="absolute"
        bottom={{ base: "100px", md: "70px" }}
        right={{ base: "-20px", md: "-80px", lg: "-60px" }}
        boxSize={{ base: "150px", md: "250px" }}
        zIndex="500"
        w={{ base: "110px", md: "190px" }}
        pointerEvents="none"
      />
            <Text fontSize={{ base: "23px", md: "50px" }} fontWeight="700" textAlign="center">
                onebyOne’s{" "}
                <Text as="span" color="#8C9492">
                    Values
                </Text>
            </Text>

            <Grid display="grid"  w="100%" justifyContent="space-between"  gap="18px" templateColumns={{ base: "1fr", smd: "repeat(2, 1fr)", md: "repeat(3, 1fr)", lg: "repeat(3, 1fr)" }} >
                <Box mx="auto"   py="40px" px="18px" mt="34px" boxShadow="0px 4px 20px rgba(0, 0, 0, 0.1)" borderRadius="30px" bg="white" >
                    <HStack  justifyContent="space-between" mb="40px">
                        <Image src={fingerPrint} alt="Fingerprint" w={{ base: "20px", md: "30px", lg: "40px" }} />
                        <FaArrowRight color="#71717A" w={{ base: "20px", md: "30px", lg: "40px" }} />
                    </HStack>
                    <VStack textAlign="left" align="left" >
                        <Text fontSize={{ base: "13px", md: "15px", lg: "21px" }} align="left" fontWeight="600" color="#2E2B24" mb="10px" >Value 1</Text>
                        <Text fontSize={{ base: "12px", md: "13px", lg: "17px" }} fontWeight="400" color="#71717A" >
                            Every student we support is one step
                            closer to achieving their biggest
                            dreams. Your generosity helps provide
                            the essential resources they need to
                            excel in school and far beyond.
                        </Text>
                    </VStack>
                </Box>
                <Box mx="auto"  py="40px" px="18px" mt="34px" boxShadow="0px 4px 20px rgba(0, 0, 0, 0.1)" borderRadius="30px" bg="white" >
                    <HStack  justifyContent="space-between" mb="40px">
                        <Image src={fingerPrint} alt="Fingerprint" w={{ base: "20px", md: "30px", lg: "40px" }} />
                        <FaArrowRight color="#71717A" w={{ base: "20px", md: "30px", lg: "40px" }} />
                    </HStack>
                    <VStack textAlign="left" align="left" >
                        <Text fontSize={{ base: "13px", md: "15px", lg: "21px" }} align="left" fontWeight="600" color="#2E2B24" mb="10px" >Value 2</Text>
                        <Text fontSize={{ base: "12px", md: "13px", lg: "17px" }} fontWeight="400" color="#71717A" >
                            Every student we support is one step
                            closer to achieving their biggest
                            dreams. Your generosity helps provide
                            the essential resources they need to
                            excel in school and far beyond.
                        </Text>
                    </VStack>
                </Box>
                <Box mx="auto"  py="40px" px="18px" mt="34px" boxShadow="0px 4px 20px rgba(0, 0, 0, 0.1)" borderRadius="30px" bg="white" >
                    <HStack  justifyContent="space-between" mb="40px">
                        <Image src={fingerPrint} alt="Fingerprint" w={{ base: "20px", md: "30px", lg: "40px" }} />
                        <FaArrowRight color="#71717A" w={{ base: "20px", md: "30px", lg: "40px" }} />
                    </HStack>
                    <VStack textAlign="left" align="left" >
                        <Text fontSize={{ base: "13px", md: "15px", lg: "21px" }} align="left" fontWeight="600" color="#2E2B24" mb="10px" >Value 3</Text>
                        <Text fontSize={{ base: "12px", md: "13px", lg: "17px" }} fontWeight="400" color="#71717A" >
                            By sponsoring a scholarship or
                            becoming a mentor, you’re offering
                            more than financial support. You’re
                            giving hope, building confidence, and
                            shaping a brighter future.
                        </Text>
                    </VStack>
                </Box>
            </Grid>

        </Box>
    );
}
