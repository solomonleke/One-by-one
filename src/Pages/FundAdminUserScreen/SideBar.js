import { useState } from "react";
import { Box, Flex, IconButton, VStack, Text } from "@chakra-ui/react";
import { FiHome, FiSettings, FiFileText, FiUsers } from "react-icons/fi";

const Sidebar = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  const menuItems = [
    { name: "Overview", icon: FiHome },
    { name: "Awaiting Funding", icon: FiFileText },
    { name: "Funded Students", icon: FiUsers },
    { name: "Settings", icon: FiSettings },
  ];

  return (
    <Flex
      direction="column"
      bg="gray.800"
      color="white"
      h="100vh"
      p={4}
      w={isExpanded ? "200px" : "60px"}
      transition="width 0.3s ease-in-out"
    >
      <IconButton
        icon={isExpanded ? "←" : "→"}
        aria-label="Toggle Sidebar"
        mb={4}
        onClick={toggleSidebar}
        bg="gray.700"
        color="white"
        _hover={{ bg: "gray.600" }}
      />
      <VStack align="start" spacing={4}>
        {menuItems.map((item, index) => (
          <Flex
            key={index}
            align="center"
            p={3}
            w="full"
            borderRadius="md"
            _hover={{ bg: "gray.700" }}
          >
            <item.icon size={20} />
            {isExpanded && <Text ml={3}>{item.name}</Text>}
          </Flex>
        ))}
      </VStack>
    </Flex>
  );
};

export default Sidebar;
