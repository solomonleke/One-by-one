import {
  Button,
  Modal,
  Text,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Image,
  useDisclosure,
} from "@chakra-ui/react";

export default function ReceiptModal({ receiptUrl }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  console.log("Receipt URL:", receiptUrl);


  return (
    <>
      <Button
        size="sm"
        color="greenn.greenn500"
        variant="outline"
        borderColor="greenn.greenn500"
        onClick={onOpen}
      >
        View Receipt
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} size="xl" isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader fontSize="lg" fontWeight="600">
            Receipt Preview
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            {receiptUrl ? (
              receiptUrl.match(/\.(jpeg|jpg|gif|png)$/i) ? (
                <Image
                  src={receiptUrl}
                  alt="Receipt"
                  borderRadius="md"
                  width="100%"
                  objectFit="contain"
                />
              ) : (
                <iframe
                  src={receiptUrl}
                  width="100%"
                  height="600px"
                  title="Receipt Document"
                  style={{ borderRadius: "8px", border: "none" }}
                />
              )
            ) : (
              <Text>No receipt available</Text>
            )}
          </ModalBody>

        </ModalContent>
      </Modal>
    </>
  );
};
