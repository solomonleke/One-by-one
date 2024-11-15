import React from "react";
import { Box, HStack, Text } from "@chakra-ui/react";

export default function Footer() {
  return (
    <HStack
      flex={1}
      justifyContent="center"
      gap="40px"
      alignItems="center"
      mt="10rem"
      flexWrap="wrap"
    >
      <Text color="gray.400" fontSize="sm" fontWeight="medium">
        © 2024 OnebyOne Inc.
      </Text>

      <HStack flex="" flexDir="row">
        <Text fontSize="sm">Privacy policy</Text>
        <Text color="gray.300">|</Text>
        <Text fontSize="sm">Terms & Conditions</Text>
      </HStack>
    </HStack>
  );
}
