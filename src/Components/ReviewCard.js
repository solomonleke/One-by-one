import React from 'react'
import { FiEdit2 } from "react-icons/fi";
import { Text, Flex, HStack, VStack, Stack, Select, Box, Spacer } from '@chakra-ui/react'



export default function ReviewCard({title, value, onClick}) {
    return (
        <Flex justifyContent="space-between">
            <Box w="40%">
                <Text color="#1F2937" textTransform="capitalize" fontSize="13px" fontWeight={"500"}>{title}</Text>
            </Box>
            <Box w="40%">
                <Text color="#46455F" textTransform="capitalize" fontSize="13px" fontWeight={"400"}>{value}</Text>

            </Box>

            <Flex w="10%" justifyContent="flex-end" cursor="pointer" fontSize="16px" _hover={{color: "green"}} color="#46455F" onClick={onClick}>
                <FiEdit2 />
            </Flex>

        </Flex>
    )
}
