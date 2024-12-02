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
import Button from './Button'


export default function RemoveNotification({ isOpen, onClose }) {
    return (
        <Modal isOpen={isOpen} onClose={onClose} isCentered size="lg">
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>
                    <Box>
                        <Text lineSpacing="-2%" fontSize="18px" fontWeight="600" color="#1F2937">Remove Student? </Text>
                        <Text color="#6B7280" lineSpacing="-2%" fontSize="14px" fontWeight="400">Are you sure you want to remove this student? This action cannot be undone.</Text>
                    </Box>
                </ModalHeader>

                <ModalBody>
                    <Flex justifyContent="flex-end" mb="18px">
                        <HStack spacing={["100px", "12px", "12px", "12px"]} w={["100%","100%","50%","50%"]}>

                            <Button background="transparent" color="green" border="1px solid green" px="43px" onClick={()=>onClose()}>Cancel</Button>

                            <Button px="43px" onClick={() => {



                            }}>Remove</Button>

                        </HStack>
                    </Flex>

                </ModalBody>

              
            </ModalContent>
        </Modal >
    )
}
