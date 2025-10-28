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
} from "@chakra-ui/react";
import ShowToast from "./ToastNotification";


const PaymentModal = ({ isOpen, onClose, student, onSubmit, isLoading: parentLoading = false }) => { // Accept isLoading prop
  const [reason, setReason] = useState("");
  const [loading, setLoading] = useState(false); // Internal loading state
  const [showToast, setShowToast] = useState({
    show: false,
    message: "",
    status: "",
  });

  const currentLoading = parentLoading || loading; // Use parentLoading if provided, otherwise internal loading


  const handleSubmit = async () => {
    if (!reason.trim()) {
      setShowToast({
        message: "Reason for payment is required.",
        status: "error",
      });
      setTimeout(() => setShowToast({ show: false }), 3000);
      return;
    }

    setLoading(true);

    try {
      const paymentPayload = {
        student,
        reason,
      };

      await onSubmit(paymentPayload); // expected to be a promise
      setShowToast({
        message: "The payment process has started.",
        status: "success",
        show: true,
      });
      setTimeout(() => setShowToast({ show: false }), 3000);

      setReason(""); // Reset reason
      onClose();     // Close modal
    } catch (error) {
      setShowToast({
        message: error?.message || "Something went wrong during payment.",
        status: "error",
        show: true,
      });
    } finally {
      setLoading(false);
    }
  };


  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent mx={{ base: "4", md: "0" }}>
      <ShowToast
          message={showToast.message}
          status={showToast.status}
          show={showToast.show}
          duration={showToast.duration}
        />
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
          <Button variant="ghost" onClick={handleSubmit} isLoading={currentLoading}
>
            Submit Payment
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default PaymentModal;
