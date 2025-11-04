import { Box, Flex } from "@chakra-ui/react";
import NavBar from "./NavBar";
import SideBar from "./SideBar";

export default function MainLayout({
  children,
  bgColor = "gray.gray500",
  color = "black",
  showSearch = true,
  showNav = true,
  borderRight = "1px solid #EDEFF2",
  active = false,
  userName,
  userImage,
}) {
  return (
    <Box
      bgColor={bgColor}
      minH="100vh"
      color={color}
      overflowX="hidden"
    >
      <Flex
        pos="relative"
        direction={["column", "column", "column", "column", "row"]}
        justifyContent="space-between"
        alignItems="flex-start"
        w="100%"
      >
        {/* Sidebar — hidden on mobile, visible on desktop */}
        <Box
          zIndex="10"
          display={["none", "none", "none", "none", "block"]}
          w="20%"
          pos="fixed"
          height="100vh"
          borderRight={borderRight}
          bg="white"
          boxShadow="md"
        >
          <SideBar active={active} showNav={showNav} />
        </Box>

        {/* Main Content */}
        <Box
          width={["100%", "100%", "100%", "100%", "80%"]}
          ml={["0", "0", "0", "0", "20%"]}
          minH="100vh"
          bg={bgColor}
          transition="all 0.3s ease-in-out"
        >
          {/* NavBar */}
          <Box
            position="sticky"
            top="0"
            zIndex="999"
            bg="white"
            boxShadow="sm"
          >
            <NavBar showSearch={showSearch} userName={userName} userImage={userImage} />
          </Box>

          {/* Page Content */}
          <Box
            py={["12px", "14px", "16px", "16.5px"]}
            px={["12px", "16px", "20px", "24px"]}
            overflowX="hidden"
          >
            {children}
          </Box>
        </Box>
      </Flex>

      
    </Box>
  );
}
