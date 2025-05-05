// src/components/Header.jsx
import { Box, Flex, HStack, IconButton, Button, useDisclosure, Stack, Link, Image } from '@chakra-ui/react';
import { CgMenuLeft } from "react-icons/cg";
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import logo from "../Asset/whiteLogo.svg"


const Links = [
    { name: 'Home', path: '/' },
    { name: 'About us', path: '/about-us' },
    { name: 'Get involved', path: '/get-involved' },
    { name: 'Contact us', path: '/contact-us' },
  ];
  
  

const NavLink = ({ name, path, onClose }) => (
  <Link
    as={RouterLink}
    to={path}
    px={2}
    py={1}
    fontSize="16px" 
    color="#54565A"
    fontWeight="500"
    rounded="md"
    _hover={{ textDecoration: 'none', bg: 'gray.200' }}
    onClick={onClose} // call onClose to close the dropdown on click
  >
    {name}
  </Link>
);

export default function Header() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();


  return (
    <Box px={4}  w ="100%">
      <Flex h={16} alignItems="center" justifyContent="space-between">
        <Image px="18.5px" py='20px' src={logo} width="150px"   onClick={()=>navigate("/")}/>
        <Box>
        <HStack spacing={8} alignItems="center" fontWeight="600" display={{ base: 'none', md: 'flex' }}>
          {Links.map((link) => (
            <NavLink key={link.name} name={link.name} path={link.path} />
          ))}
        </HStack>
        </Box>
        <Box gap={4} display={{ base: 'none', md: 'flex' }} alignItems="center">
        <Button w="113.5px" border="1px" bg="transparent" color="#39996B" onClick={() => {
              navigate("/sign-in")}} >Login</Button>
        <Button w="113.5px" border="1px" bg="#39996B" color="#ffff" onClick={() => {
              navigate("/sign-up")}} >Sign in</Button>
        </Box>
        <IconButton
          size="md"
          icon={isOpen ? <CgMenuLeft /> : <CgMenuLeft />}
          aria-label="Open Menu"
          display={{ md: 'none' }}
          onClick={isOpen ? onClose : onOpen}
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
          zIndex="10"
          left="0"
          w="100%"
        >
          <Stack as="nav" spacing={4} fontWeight="600">
            {Links.map((link) => (
              <NavLink key={link.name} name={link.name} path={link.path} onClose={onClose} />
            ))}
          </Stack>
          <Box gap="10px"  alignItems="center">
        <Button w="100%" mb="10px" border="1px" bg="transparent" color="#39996B">Login</Button>
        <Button w="100%" border="1px" bg="#39996B" color="#ffff">Sign in</Button>
        </Box>
        </Box>
      )}
    </Box>
  );
}
