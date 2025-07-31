import React, { useState, useEffect } from "react";
import {
  Box,
  HStack,
  Text,
  Spacer,
  Stack,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Image,
  Spinner,
  Center,
} from "@chakra-ui/react";
import { MdOutlineFileDownload } from "react-icons/md";
import { Document as PdfDocument, Page, pdfjs } from "react-pdf";
import { GetAdminProfile } from "../Utils/ApiCall";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const DOCUMENT_NAME_MAP = {
  certificate: "Certificate of Incorporation",
  educationApproval: "Ministry of Education Approval Letter",
  tin: "Tax Identification Number (TIN)",
  schoolCert: "School Registration Certificate",
  idFront: "Principal's Verification ID Front",
  idBack: "Principal's Verification ID Back",
};

export default function DocumentSection() {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDoc, setSelectedDoc] = useState(null);
  const [downloading, setDownloading] = useState(false);
  const [numPages, setNumPages] = useState(null);

  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const response = await GetAdminProfile();
        const docs = (response?.data?.documents || []).filter(
          (doc) => doc.document_type
        );

        // Get latest document per type
        const latestDocs = {};
        docs.forEach((doc) => {
          if (
            !latestDocs[doc.document_type] ||
            new Date(doc.created_at) >
              new Date(latestDocs[doc.document_type].created_at)
          ) {
            latestDocs[doc.document_type] = doc;
          }
        });

        setDocuments(Object.values(latestDocs));
      } catch (error) {
        console.error("Failed to fetch documents:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDocuments();
  }, []);

  const handlePreview = (doc) => {
    setSelectedDoc(doc);
    setNumPages(null);
    onOpen();
  };

  const handleDownload = async (url) => {
    try {
      setDownloading(true);
      const response = await fetch(url, { mode: "cors" });
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = blobUrl;
      const fileName = url.split("/").pop() || "document";
      link.download = fileName;

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error("Error downloading file", error);
    } finally {
      setDownloading(false);
    }
  };

  if (loading) return <Spinner size="lg" />;

  return (
    <Box
      borderColor="#EDEFF2"
      p="20px"
      borderRadius="10px"
      borderWidth="1px"
      backgroundColor="#fff"
    >
      <Text fontSize="lg" fontWeight="bold" mb={4}>
        Legal Documents
      </Text>

      {documents.length === 0 ? (
        <Center py={10}>
          <Text color="gray.500" fontSize="sm">
            No Documents Found
          </Text>
        </Center>
      ) : (
        <Stack mt="18px" spacing="17px">
          {documents.map((doc) => (
            <HStack
              key={doc.id}
              p={2}
              _hover={{ bg: "#E8FFF4", cursor: "pointer", fontWeight: "600" }}
              onClick={() => handlePreview(doc)}
            >
              <Text fontSize="13px" fontWeight="400" color="#626974">
                {DOCUMENT_NAME_MAP[doc.document_type] || doc.document_type}
              </Text>
              <Spacer />
              <Text
                fontWeight="500"
                color={doc.status === "verified" ? "#027A48" : "#FF0000"}
                bg={doc.status === "verified" ? "#ECFDF3" : "#FFE5E5"}
                borderRadius="20px"
                py="5px"
                px="12px"
                fontSize="12px"
              >
                {doc.status}
              </Text>
            </HStack>
          ))}
        </Stack>
      )}

      {/* Modal for preview */}
      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Document Preview</ModalHeader>
          <ModalCloseButton />
          <ModalBody display="flex" justifyContent="center" flexDirection="column">
            {selectedDoc &&
              (() => {
                const url = selectedDoc.document_front_url;
                const lowerUrl = url.toLowerCase();

                if (lowerUrl.endsWith(".pdf")) {
                  return (
                    <PdfDocument
                      file={url}
                      key={url}
                      onLoadSuccess={({ numPages }) => setNumPages(numPages)}
                    >
                      <Page pageNumber={1} width={600} />
                    </PdfDocument>
                  );
                } else if (lowerUrl.endsWith(".doc") || lowerUrl.endsWith(".docx")) {
                  return (
                    <iframe
                      src={`https://docs.google.com/gview?url=${encodeURIComponent(
                        url
                      )}&embedded=true`}
                      width="100%"
                      height="500px"
                      title="Word Document Preview"
                    />
                  );
                } else {
                  return (
                    <Image
                      src={url}
                      alt={selectedDoc.document_type}
                      width="100%"
                      height="auto"
                    />
                  );
                }
              })()}
          </ModalBody>

          {selectedDoc && (
            <ModalFooter>
              <Button
                color="#fff"
                leftIcon={<MdOutlineFileDownload />}
                background="green.500"
                _hover={{
                  background: "green.600",
                  transform: "scale(1.05)",
                  boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
                }}
                transition="all 0.2s ease-in-out"
                isLoading={downloading}
                loadingText="Downloading..."
                onClick={() => handleDownload(selectedDoc.document_front_url)}
              >
                Download
              </Button>
            </ModalFooter>
          )}
        </ModalContent>
      </Modal>
    </Box>
  );
}
