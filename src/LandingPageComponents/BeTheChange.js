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

import HelpImg from "../Asset/HelpImg.png";
import { useNavigate } from 'react-router-dom';

export default function BeTheChange() {

  const navigate = useNavigate();
    return (
        <Flex
          direction={{ base: 'column', md: 'row' }}
          align="center"
          justify="center"
          position="relative"
          overflow="hidden"
          px={{ base: "20px", lg: "30px" }}
          py={20}
          bg="#17422D"
          color="white"
          h={{ base: '400px', md: '578px' }}
          >
            <Image
                src={HelpImg}
                alt="Decorative Flower"
                position="absolute"
                bottom={{ base: "0", md: "0" }}
                left={{ base: "-50px", md: "-40px" }}
                w={{ base: "120px", md: "220px" }}
                zIndex="500"
                pointerEvents="none"
            />
            <Image
                src={HelpImg}
                alt="Decorative Flower"
                position="absolute"
                bottom={{ base: "0", md: "0" }}
                right={{ base: "-50px", md: "-40px" }}
                w={{ base: "120px", md: "220px" }}
                zIndex="500"
                pointerEvents="none"
                transform="scaleX(-1)"
            />
            <Stack spacing={6} maxW="846px" align="center" textAlign="center">
            
            <Heading as="h2" fontSize={{base:"20px", md:"50px"}} fontWeight="bold" >
            Be the Change Students{' '}
          <Box as="span" color="gray.500">
          Are Hoping For!
          </Box>
        </Heading>
            <Text fontSize={{base:"12px", md:"18px"}}>
            It takes just one person to spark a lifetime of opportunities and hope for a student. Are you ready to be the one who makes that difference?
            </Text>
            <Box display={{base: "grid", md: "flex"}} gap="10px" w={{base: "100%", md: "358px"}} alignItems="center">
              <Button _focus={{ boxShadow: 'none' }} w={{base: "100%", md: "171px"}} bg="white" fontSize={{base:"12px", md:"14px"}} px="28px" py="10px" color="#2E2B24" _hover={{ bg: "transparent", color: "white", border: "1px solid white" }} onClick={() => navigate('/sign-up')}>sponsor a student</Button>
              <Button _focus={{ boxShadow: 'none' }} w={{base: "100%", md: "171px"}} border="1px" bg="transparent" fontSize={{base:"12px", md:"14px"}} px="28px" py="10px" color="#ffff" _hover={{ bg: "white", color: "#2E2B24" }} onClick={() => navigate('/sign-up')}>Start Volunteering</Button>
            </Box>
          </Stack>


        </Flex>

    );
}





