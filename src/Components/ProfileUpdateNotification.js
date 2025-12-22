import React, { useState, useEffect } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  Text,
  Stack,
  FormControl,
  FormLabel,
  Input as ChakraInput,
} from '@chakra-ui/react';
import Button from './Button';

export default function ProfileUpdateNotification({ isOpen, onClose, initialData, onUpdate }) {
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    onUpdate(formData);
    onClose();
  };

  if (!initialData) return null; // Or render a loading state

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit Student Profile</ModalHeader>
        <ModalCloseButton />
        <ModalBody> 
          <Stack spacing={4}>
            {Object.keys(initialData).map((key) => {
              // Exclude complex objects/arrays that are not directly editable via simple input
              if (
                typeof initialData[key] === 'object' &&
                initialData[key] !== null &&
                !Array.isArray(initialData[key])
              ) {
                return null; // Skip nested objects for simple editing
              }
              // Skip ID fields or other non-editable fields
              if (key === '_id' || key === '__v' || key === 'picture' || key === 'status' || key === 'essay' ) {
                return null;
              }

              return (
                <FormControl key={key}>
                  <FormLabel textTransform="capitalize">{key.replace(/_/g, ' ')}</FormLabel>
                  <ChakraInput
                    name={key}
                    value={formData[key] || ''}
                    onChange={handleChange}
                    placeholder={`Enter ${key.replace(/_/g, ' ')}`}
                  />
                </FormControl>
              );
            })}
          </Stack>
        </ModalBody>

        <ModalFooter>
          <Button variant="outline" onClick={onClose} mr={3}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>
            Save Changes
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
