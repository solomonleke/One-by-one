import React, { useEffect, useState } from 'react'
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
import Input from './Input'


export default function UpdateReviewModal({ isOpen, onClose, oldValue, payload, setPayload }) {


    const [newValue, setNewValue] = useState({
        name: "",
        value: ""
    })


    const handleNewValue = (e) => {

        setNewValue({ ...newValue, [e.target.id]: e.target.value })
    
      }

      const updateValue = () => {
        setPayload({
            ...payload, [oldValue.id]: newValue.value
        })
        onClose()
      }

      useEffect(()=>{
        setNewValue({
            value: oldValue?.value
        })
      }, [isOpen])



    return (
        <Modal isOpen={isOpen} onClose={onClose} isCentered size="lg">
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>
                    <Box>
                        <Text lineSpacing="-2%" fontSize="18px" fontWeight="600" color="#1F2937" mb='32px'>Update {oldValue?.name}</Text>
                        <Input id='value' type={oldValue.id === 'dob' ? "date" : "text"} value={newValue.value} onChange={handleNewValue} />
                    </Box>
                </ModalHeader>

                <ModalBody>
                    <Flex justifyContent="flex-end" mb="18px">
                        <HStack spacing={["100px", "12px", "12px", "12px"]} w={["100%","100%","50%","50%"]}>

                            <Button background="transparent" color="green" border="1px solid green" px="43px" onClick={()=>onClose()}>Cancel</Button>

                            <Button px="43px" onClick={updateValue}>Update</Button>

                        </HStack>
                    </Flex>

                </ModalBody>

              
            </ModalContent>
        </Modal >
    )
}
