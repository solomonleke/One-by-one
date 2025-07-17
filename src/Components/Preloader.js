import { Box, Center, Spinner, Text, VStack } from "@chakra-ui/react";

const Preloader = ({ message = "Loading..." }) => {
  return (
    <Box
      position="fixed"
      top="0"
      left="0"
      width="100vw"
      height="100vh"
      bg="rgba(0, 0, 0, 0.5)"
      zIndex="9999"
    >
      <Center h="100vh" w="100vw">
        <VStack spacing={4}>
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
          />
          <Text fontSize="md" color="white">{message}</Text>
        </VStack>
      </Center>
    </Box>
  );
};

export default Preloader;
