import {
  Box,
  Flex,
  Heading,
  Text,
  Button,
  Stack,
  Image,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom'

import { FaArrowRightLong } from "react-icons/fa6";
import AboutUsImg from "../Asset/AboutUsImg.png";
import AboutProp from "../Asset/AboutProp.png";

export default function AboutOneByOne() {

    const navigate = useNavigate();

  return (
    <Box position="relative" bg="white" py={20} px={{ base: "20px", lg: "30px" }} overflow="hidden">
      {/* Decorative flower image */}
      <Image
        src={AboutProp}
        alt="Decorative Flower"
        position="absolute"
        top={{ base: "-20px", md: "-40px" }}
        right={{ base: "-20px", md: "-40px" }}
        boxSize={{ base: "150px", md: "250px" }}
        zIndex="500"
        pointerEvents="none"
      />

      <Flex
        direction={{ base: 'column', md: 'row' }}
        align="left"
        justify="left"
        gap={10}
        position="relative"
        zIndex="1"
      >
        <Stack maxW="661px" align="left" textAlign="left">
          <Text fontSize="15px" w="fit-content" color="#FAA51C" fontWeight="700">
            about one by one
          </Text>
          <Text fontSize={{ base: "25px", md: "35px",  lg: "50px" }} fontWeight="600" color="black">
            Transforming Lives Through{" "}
            <Text as="span" color="#8C9492">
              Education & Mentorship
            </Text>
          </Text>
          <Text fontSize={{ base: "10px", md: "17px" }} color="#71717A" w={{ base: "300px", md: "350px",  lg: "500px" }}>
            At One by One, we believe in the power of individual impact. Our
            mission is simple: to connect promising students from
            underserved communities with sponsors and mentors who can change their lives.
          </Text>
          <Flex>
            <Button
              w={{ base: "150px", md: "171px" }}
              bg="#39996B"
              fontWeight="400"
              fontSize={{ base: "12px", md: "14px" }}
              px="28px"
              py="10px"
              color="#ffff"
              _focus={{ boxShadow: 'none' }}
              rightIcon={<FaArrowRightLong />}
              _hover={{ bg: "transparent", color: "#39996B", border: "1px solid #39996B"}}
              onClick={() => {
                navigate("/about-us")}}
            >
              learn more about us
            </Button>
          </Flex>
        </Stack>

        <Image
          src={AboutUsImg}
          alt="About Us"
          w={{ base: "300px", md: "350px", lg: "400px" }}
          h={{ base: "300px", md: "350px", lg: "400px" }}
          zIndex="1"
        />
      </Flex>
    </Box>
  );
}
