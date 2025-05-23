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
  Divider,
} from "@chakra-ui/react";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaYoutube,
  FaTiktok,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import FooterLogo from "../Asset/FooterLogo.png"
import { Link as RouterLink, useNavigate } from 'react-router-dom';


const Footer = () => {
  const navigate = useNavigate();

  return (
    <Box bg="#082A26" color="white" py="10px" px={{ base: "20px", lg: "30px" }}  alignItems="center" alignContent="center" minH="601px">
      {/* Top Section */}
      <Grid
        templateColumns={{ base: "1fr", md: "2fr 1fr 1fr 1fr" }}
        justifyContent="space-between"
        gap={{ base: 4, md: 0 }}
        mb={10}
      >
        {/* Logo and Mission */}
        <GridItem  >
          <Flex align="center" mb={4}>
            <Image src={FooterLogo} width={{ base: "170px", md: "204px" }} onClick={() => navigate("/")} />

          </Flex>
          <Text fontSize={{ base: "14px", md: "15px", lg: "16px" }} color="#737373">
            At One by One, we believe in the power of individual impact. Our
            mission is simple: to connect promising students from underserved
            communities with sponsors and mentors who can change their lives.
          </Text>
        </GridItem>

        {/* Navigation Links */}
        
        <GridItem alignItems={{ base: "center", md: "flex-end" }} textAlign="center" display="flex" flexDirection="column" >
          <Heading fontSize="16px" mb={3}>Navigation</Heading>
          <Stack spacing={2}>
            <Link onClick={() => navigate("/")} fontSize={{ base: "12px", md: "13px", lg: "15px" }} fontWeight="500" color="#737373">Home</Link>
            <Link onClick={() => navigate("/about-us")} fontSize={{ base: "12px", md: "13px", lg: "15px" }} fontWeight="500" color="#737373">About Us</Link>
            <Link onClick={() => navigate("/get-involved")} fontSize={{ base: "12px", md: "13px", lg: "15px" }} fontWeight="500" color="#737373">Get Involved</Link>
            <Link onClick={() => navigate("/contact-us")} fontSize={{ base: "12px", md: "13px", lg: "15px" }} fontWeight="500" color="#737373">Contact Us</Link>
          </Stack>
        </GridItem>

        <GridItem  alignItems={{ base: "center", md: "flex-end" }} textAlign="center" display="flex" flexDirection="column" >
          <Heading fontSize="16px" mr={{ base: "none", lg: "5px"}} mb={3}>Make An Impact</Heading>
          <Stack spacing={2}>
            <Link href="#" fontSize={{ base: "12px", md: "13px", lg: "15px" }} fontWeight="500" color="#737373">Become A Sponsor</Link>
            <Link href="#" fontSize={{ base: "12px", md: "13px", lg: "15px" }} fontWeight="500" color="#737373">School Admin</Link>
            <Link href="#" fontSize={{ base: "12px", md: "13px", lg: "15px" }} fontWeight="500" color="#737373">Scholarship Admin</Link>
            <Link href="#" fontSize={{ base: "12px", md: "13px", lg: "15px" }} fontWeight="500" color="#737373">Fund Admin</Link>
          </Stack>
        </GridItem>

        <GridItem  alignItems={{ base: "center", md: "flex-end" }} textAlign="center" display="flex" flexDirection="column" p="0">
          <Heading fontSize="16px" mr={{ base: "none", md: "30px"}} mb={3}>Help</Heading>
          <Stack spacing={2}>
            <Link href="#" fontSize={{ base: "12px", md: "13px", lg: "15px" }} fontWeight="500" color="#737373">Privacy Policy</Link>
            <Link href="#" fontSize={{ base: "12px", md: "13px", lg: "15px" }} fontWeight="500" color="#737373">Legal Docs</Link>
            <Link href="#" fontSize={{ base: "12px", md: "13px", lg: "15px" }} fontWeight="500" color="#737373">Cookie Policy</Link>
          </Stack>
        </GridItem>
      </Grid>

      {/* Bottom Section */}
<Flex
  direction={{ base: "column", md: "row" }}
  justify="space-between"
  mx="auto"
  align="center"
  py="30px"
  borderTop="1px solid #172F24"
  borderBottom="1px solid #172F24"
>
  <Text fontSize="sm" mb={{ base: 4, md: 0 }} color="#737373">
    Copyright © 2016 - {new Date().getFullYear()} OnebyOne
  </Text>
  <Stack direction="row" spacing={{ base: "5px", md: "20px" }} align="center">
    {[
      { icon: <FaFacebook />, label: "Facebook" },
      { icon: <FaXTwitter />, label: "Twitter" },
      { icon: <FaInstagram />, label: "Instagram" },
      { icon: <FaYoutube />, label: "YouTube" },
      { icon: <FaLinkedin />, label: "LinkedIn" },
      { icon: <FaTiktok />, label: "TikTok" }
    ].map(({ icon, label }) => (
      <IconButton
        key={label}
        as="a"
        href="#"
        aria-label={label}
        icon={icon}
        variant="ghost"
        fontSize="20px"
        color="white"
        display="flex"
        alignItems="center"
        transition="transform 0.2s ease-in-out"
        _hover={{
          transform: "scale(1.5)"
        }}
      />
    ))}
  </Stack>
</Flex>


    </Box>
  );
};

export default Footer;
