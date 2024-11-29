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
import { useNavigate } from 'react-router-dom';
import { CiWarning } from "react-icons/ci";



export default function BackNotification({ isOpen, onClose }) {

    const nav = useNavigate()
    return (
        <Modal isOpen={isOpen} onClose={onClose} isCentered size="lg">
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>
                    <Box>
                        <HStack>
                        <CiWarning color="green" size="24px" />
                            <Text lineSpacing="-2%" fontSize="18px" fontWeight="600" color="#1F2937">Student information hasn't been saved! </Text>
                        </HStack>
                        <Text color="#6B7280" lineSpacing="-2%" fontSize="14px" fontWeight="400">If you exit now, the student's details will not be saved.</Text>
                    </Box>
                </ModalHeader>

                <ModalBody>
                    <Flex justifyContent="flex-end" mb="18px">
                        <HStack spacing={["100px", "12px", "12px", "12px"]} w="50%">

                            <Button background="transparent" color="green" border="1px solid green" px="43px" onClick={onClose}>Stay</Button>

                            <Button px="43px" onClick={() => nav("/school-admin/student-management")}>Exit</Button>

                        </HStack>
                    </Flex>

                </ModalBody>


            </ModalContent>
        </Modal>
    )
}
