// components/Preloader.jsx
import { Center, Spinner, Text, VStack } from "@chakra-ui/react";

const Preloader = ({ message = "Loading..." }) => {
  return (
    <Center h="100vh" w="100vw">
      <VStack spacing={4}>
        <Spinner
          thickness="4px"
          speed="0.65s"
          color="green"
          size="xl"
        />
        <Text fontSize="md" color="gray.600">{message}</Text>
      </VStack>
    </Center>
  );
};

export default Preloader;
