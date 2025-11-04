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

const PaymentModal = ({
  isOpen,
  onClose,
  student,
  onSubmit,
  isLoading: parentLoading = false,
}) => {
  const [reason, setReason] = useState("");
  const [loading, setLoading] = useState(false);
  const [showToast, setShowToast] = useState({
    show: false,
    message: "",
    status: "",
  });

  const currentLoading = parentLoading || loading;

  const triggerToast = (message, status) => {
    setShowToast({ show: true, message, status });
    setTimeout(
      () => setShowToast({ show: false, message: "", status: "" }),
      3000
    );
  };

  const handleSubmit = async () => {
    if (!reason.trim()) {
      triggerToast("Reason for payment is required.", "error");
      return;
    }

    setLoading(true);
    try {
      const paymentPayload = {
        student,
        reason,
      };

      await onSubmit(paymentPayload);

      triggerToast("The payment process has started.", "success");

      setReason("");
      onClose();
    } catch (error) {
      triggerToast(
        error?.message || "Something went wrong during payment.",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent mx={{ base: "4", md: "0" }}>
        {showToast.show && (
          <ShowToast
            message={showToast.message}
            status={showToast.status}
            show={showToast.show}
            duration={3000}
          />
        )}

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
          <Button
            bg="transparent"
            border="1px solid green"
            color="greenn.greenn500"
            mr={3}
            _hover={{
              bg: "greenn.greenn500",
              color: "white",
              borderColor: "green.600",
            }}
            onClick={onClose}
          >
            Close
          </Button>

          <Button
            bg="greenn.greenn500"
            color="white"
            _hover={{
              bg: "transparent",
              color: "greenn.greenn500",
              border: "1px solid green",
            }}
            onClick={handleSubmit}
            isLoading={currentLoading}
            loadingText="Processing..."
          >
            Submit Payment
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default PaymentModal;
