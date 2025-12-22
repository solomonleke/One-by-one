import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Text,
  Center,
} from "@chakra-ui/react";
import Button from "./Button";

export default function EssayViewerModal({
  isOpen,
  onClose,
  essay,
  title = "Student Essay",
}) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="lg"
      scrollBehavior="inside"
      isCentered
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton />

        <ModalBody>
          {essay ? (
            <Text
              fontSize="14px"
              lineHeight="1.8"
              whiteSpace="pre-wrap"
              color="#2F2F2F"
            >
              {essay}
            </Text>
          ) : (
            <Center py="40px">
              <Text color="#626974">No essay submitted</Text>
            </Center>
          )}
        </ModalBody>

        <ModalFooter>
          <Button onClick={onClose}>Close</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
