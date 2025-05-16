// src/components/Header.jsx
import { Box, Flex, HStack, IconButton, Button, useDisclosure, Stack, Link, Image } from '@chakra-ui/react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import logo from "../Asset/whiteLogo.svg"
import { MdClose } from "react-icons/md";
import { IoMdMenu } from "react-icons/io";


const Links = [
    { name: 'Home', path: '/' },
    { name: 'About us', path: '/about-us' },
    { name: 'Get involved', path: '/get-involved' },
    { name: 'Contact us', path: '/contact-us' },
    { name: 'Super Admin', path: '/super-admin' },
  ];
  
  

const NavLink = ({ name, path, onClose }) => (
  <Link
    as={RouterLink}
    to={path}
    px={2}
    py={1}
    fontSize={{ md: "14px", lg: "16px" }}
    color="#54565A"
    fontWeight="500"
    rounded="md"
    _hover={{ textDecoration: 'none', color: '#39996B' }}
    onClick={onClose} // call onClose to close the dropdown on click
  >
    {name}
  </Link>
);

export default function Header() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();


  return (
    <Box
      px={4}
      w="100%"
      position="fixed"
      top="0"
      left="0"
      zIndex="1000"
      bg="white"
      boxShadow="md"
    >
      <Flex h={16} alignItems="center" justifyContent="space-between" zIndex="1000">
        <Image px="18.5px" py='20px' src={logo} width="150px" onClick={() => navigate("/")} />
        <Box>
          <HStack gap={{ md: "6px", lg: "32px" }} alignItems="center" display={{ base: 'none', md: 'flex' }}>
            {Links.map((link) => (
              <NavLink key={link.name} name={link.name} path={link.path} />
            ))}
          </HStack>
        </Box>
        <Box gap={4} display={{ base: 'none', md: 'flex' }} alignItems="center">
          <Button w={{ md: "100px", lg: "113.5px" }} fontSize={{ md: "14px", lg: "16px" }} border="1px" bg="transparent" color="#39996B" _hover={{ bg: "#39996B", color: "white", border: "1px solid white" }} onClick={() => {
            navigate("/sign-in")
          }} >Login</Button>
          <Button w={{ md: "100px", lg: "113.5px" }} fontSize={{ md: "14px", lg: "16px" }} border="1px" bg="#39996B" color="#ffff" _hover={{ bg: "transparent", color: "#39996B", border: "1px solid #39996B" }} onClick={() => {
            navigate("/sign-up")
          }} >Sign in</Button>
        </Box>
        <IconButton
          size="lg"
          icon={isOpen ? <MdClose size="24px" /> : <IoMdMenu size="24px" />}
          display={{ md: 'none' }}
          onClick={isOpen ? onClose : onOpen}
          variant="ghost"         // removes default bg & border
          bg="transparent"        // ensures no background
          _hover={{ bg: 'transparent' }} // no bg on hover
          _active={{ bg: 'transparent' }} // no bg on active
          _focus={{ boxShadow: 'none' }}  // removes blue ring on focus
          p="0"                   // remove internal padding
          color="#39996B"         // optional: set icon color
        />

      </Flex>

      {isOpen && (
        <Box
          p={4}
          display={{ md: 'none' }}
          position="absolute"
          textAlign="center"
          top="63px" // adjust based on your header height
          bg="white"
          zIndex="1000"
          left="0"
          boxShadow="md"
          w="100%"
        >
          <Stack as="nav" spacing={2} fontWeight="600" mb="10px">
            {Links.map((link) => (
              <NavLink key={link.name} name={link.name} path={link.path} onClose={onClose} />
            ))}
          </Stack>
          <Box gap="10px" alignItems="center">
            <Button w="100%" mb="10px" border="1px" bg="transparent" color="#39996B" onClick={() => {
              navigate("/sign-in")
            }} _hover={{ bg: "#39996B", color: "white", border: "1px solid white" }}>Login</Button>
            <Button w="100%" border="1px" bg="#39996B" color="#ffff" onClick={() => {
              navigate("/sign-up")
            }} _hover={{ bg: "transparent", color: "#39996B", border: "1px solid #39996B" }} >Sign in</Button>
          </Box>
        </Box>
      )}
    </Box>
  );
}
