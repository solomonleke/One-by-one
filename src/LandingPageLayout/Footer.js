import {
    Box,
    Flex,
    Grid,
    GridItem,
    Heading,
    Link,
    Stack,
    Text,
    IconButton,
    Image,
    useColorModeValue,
  } from "@chakra-ui/react";
  import {
    FaFacebook,
    FaTwitter,
    FaInstagram,
    FaLinkedin,
    FaYoutube,
    FaTiktok,
  } from "react-icons/fa";
  import FooterLogo from "../Asset/FooterLogo.png"
  import { Link as RouterLink, useNavigate } from 'react-router-dom';

  
  const Footer = () => {
    const navigate = useNavigate();

    return (
      <Box bg="#082A26" color="white" p="10px" alignItems="center" alignContent="center" minH="601px">
        {/* Top Section */}
        <Grid
          templateColumns={{ base: "1fr", md: "2fr 1fr 1fr 1fr" }}
          gap={8}
          mb={10}
          borderBottom="1px solid #2D2D2D"
          p={10}
        >
          {/* Logo and Mission */}
          <GridItem >
            <Flex align="center" mb={4}>
            <Image   src={FooterLogo} width={{base:"170px", md:"204px"}}   onClick={()=>navigate("/")}/>

            </Flex>
            <Text fontSize={{base:"14px", md:"16px"}} color="#737373">
              At One by One, we believe in the power of individual impact. Our
              mission is simple: to connect promising students from underserved
              communities with sponsors and mentors who can change their lives.
            </Text>
          </GridItem>
  
          {/* Navigation Links */}
            
          <GridItem >
            <Heading fontSize="16px" mb={3}>Navigation</Heading>
            <Stack spacing={2}>
              <Link href="#" fontSize="15px" fontWeight="500" color="#737373">Home</Link>
              <Link href="#" fontSize="15px" fontWeight="500" color="#737373">About Us</Link>
              <Link href="#" fontSize="15px" fontWeight="500" color="#737373">Get Involved</Link>
              <Link href="#" fontSize="15px" fontWeight="500" color="#737373">Contact Us</Link>
            </Stack>
          </GridItem>
  
          <GridItem>
            <Heading fontSize="16px" mb={3}>Make An Impact</Heading>
            <Stack spacing={2}>
              <Link href="#" fontSize="15px" fontWeight="500" color="#737373">Become A Sponsor</Link>
              <Link href="#" fontSize="15px" fontWeight="500" color="#737373">School Admin</Link>
              <Link href="#" fontSize="15px" fontWeight="500" color="#737373">Scholarship Admin</Link>
              <Link href="#" fontSize="15px" fontWeight="500" color="#737373">Fund Admin</Link>
            </Stack>
          </GridItem>
  
          <GridItem>
            <Heading fontSize="16px" mb={3}>Help</Heading>
            <Stack spacing={2}>
              <Link href="#" fontSize="15px" fontWeight="500" color="#737373">Privacy Policy</Link>
              <Link href="#" fontSize="15px" fontWeight="500" color="#737373">Legal Docs</Link>
              <Link href="#" fontSize="15px" fontWeight="500" color="#737373">Cookie Policy</Link>
            </Stack>
          </GridItem>
        </Grid>
  
        {/* Bottom Section */}
        <Flex
          direction={{ base: "column", md: "row" }}
          justify="space-between"
          align={{ base: "flex-start", md: "center" }}
          px={10}
        >
          <Text fontSize="sm" mb={{ base: 4, md: 0 }} color="#737373">
            Copyright © 2016 - {new Date().getFullYear()} OnebyOne
          </Text>
          <Stack direction="row" spacing={4}>
            <IconButton
              as="a"
              href="#"
              aria-label="Facebook"
              icon={<FaFacebook />}
              variant="ghost"
              color="white"
            />
            <IconButton
              as="a"
              href="#"
              aria-label="Twitter"
              icon={<FaTwitter />}
              variant="ghost"
              color="white"
            />
            <IconButton
              as="a"
              href="#"
              aria-label="Instagram"
              icon={<FaInstagram />}
              variant="ghost"
              color="white"
            />
            <IconButton
              as="a"
              href="#"
              aria-label="YouTube"
              icon={<FaYoutube />}
              variant="ghost"
              color="white"
            />
            <IconButton
              as="a"
              href="#"
              aria-label="LinkedIn"
              icon={<FaLinkedin />}
              variant="ghost"
              color="white"
            />
            <IconButton
              as="a"
              href="#"
              aria-label="TikTok"
              icon={<FaTiktok />}
              variant="ghost"
              color="white"
            />
          </Stack>
        </Flex>
      </Box>
    );
  };
  
  export default Footer;
  