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

const PaymentModal = ({ isOpen, onClose, student, onSubmit  }) => {
  const [reason, setReason] = useState("");
  const toast = useToast();
  const [loading, setLoading] = useState(false);


  const handleSubmit = async () => {
    if (!reason.trim()) {
      toast({
        title: "Reason for payment is required.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    setLoading(true);

    try {
      const paymentPayload = {
        student,
        reason,
      };

      await onSubmit(paymentPayload); // expected to be a promise
      toast({
        title: "Payment initiated.",
        description: "The payment process has started.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });

      setReason(""); // Reset reason
      onClose();     // Close modal
    } catch (error) {
      toast({
        title: "Payment failed.",
        description: error?.message || "Something went wrong during payment.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
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
          <Button variant="ghost" onClick={handleSubmit} isLoading={loading}
>
            Submit Payment
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default PaymentModal;
