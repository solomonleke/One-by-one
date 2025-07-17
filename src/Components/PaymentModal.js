import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Textarea,
  useToast,
} from "@chakra-ui/react";

const PaymentModal = ({ isOpen, onClose, student }) => {
  const [reason, setReason] = useState("");
  const toast = useToast();

  const handleSubmit = () => {
    if (!reason) {
      toast({
        title: "Reason for payment is required.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    console.log("Payment Details:", {
      student: student,
      reason: reason,
    });

    toast({
      title: "Payment submitted.",
      description: "Check the console for payment details.",
      status: "success",
      duration: 5000,
      isClosable: true,
    });

    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent mx={{ base: "4", md: "0" }}>
        <ModalHeader>Fund Student</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing={4}>
            <FormControl>
              <FormLabel>Student Name</FormLabel>
              <Input value={student?.student_name || ""} isReadOnly />
            </FormControl>
            <FormControl>
              <FormLabel>Amount</FormLabel>
              <Input
                type="number"
                placeholder="Enter amount"
                value={student?.fees_amount || ""}
                isReadOnly
              />
            </FormControl>
            <FormControl>
              <FormLabel>School Bank</FormLabel>
              <Input
                value={
                  student?.school_account_number
                    ? JSON.parse(student.school_account_number).bank
                    : ""
                }
                isReadOnly
              />
            </FormControl>
            <FormControl>
              <FormLabel>School Account Number</FormLabel>
              <Input
                value={
                  student?.school_account_number
                    ? JSON.parse(student.school_account_number).account_number
                    : ""
                }
                isReadOnly
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Reason for Payment</FormLabel>
              <Textarea
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="Enter reason for payment"
              />
            </FormControl>
          </VStack>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Close
          </Button>
          <Button variant="ghost" onClick={handleSubmit}>
            Submit Payment
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default PaymentModal;
