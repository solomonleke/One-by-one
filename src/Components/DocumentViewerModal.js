import React from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  AspectRatio,
} from '@chakra-ui/react';

export default function DocumentViewerModal({ isOpen, onClose, documentUrl, documentName }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="4xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{documentName}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {documentUrl && (
            <AspectRatio ratio={1 / Math.SQRT2} w="100%" h="70vh">
              <iframe title={documentName} src={documentUrl} width="100%" height="100%" />
            </AspectRatio>
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
