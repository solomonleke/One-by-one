import React from 'react' 
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    Text,
    HStack,
    Box,
    Flex,
    ModalBody,
    ModalCloseButton,
} from '@chakra-ui/react'

export default function ShowToast({status, message, show}) {
  return (
     <Box  transition = "2s ease" w={["80%","80%", "30%", "30%" ]} pos="fixed" rounded="8px" px="15px" py="20px" textAlign="center" color="#fff" top="5" right="5" background={status ==="success" ? "greenn.greenn500": "red"} zIndex="100">
        <Text>{message}</Text>
    </Box>
  )
}
