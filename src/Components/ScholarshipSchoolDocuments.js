import React, { useState } from "react";
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
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  IconButton,
  Flex,
  Badge,
} from "@chakra-ui/react";
import {
  MdOutlineFileDownload,
  MdZoomIn,
  MdZoomOut,
  MdNavigateNext,
  MdNavigateBefore,
} from "react-icons/md";
import { Document as PdfDocument, Page, pdfjs } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

const DOCUMENT_NAME_MAP = {
  certificate: "Certificate of Incorporation",
  schoolCert: "School Registration Certificate",
  educationApproval: "Ministry of Education Approval Letter",
  tin: "Tax Identification Number (TIN)",
  idFront: "Principal ID (Front)",
  idBack: "Principal ID (Back)",
};

export default function ScholarshipSchoolDocuments({ documents = [] }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [selectedDoc, setSelectedDoc] = useState(null);
  const [numPages, setNumPages] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [scale, setScale] = useState(1);
  const [loadingPdf, setLoadingPdf] = useState(false);
  const [pdfError, setPdfError] = useState(null);
  const [downloading, setDownloading] = useState(false);

  const handlePreview = (doc) => {
    setSelectedDoc(doc);
    setNumPages(null);
    setCurrentPage(1);
    setScale(1);
    setPdfError(null);
    onOpen();
  };

  const handleDownload = async (url) => {
    try {
      setDownloading(true);
      const res = await fetch(url);
      const blob = await res.blob();
      const blobUrl = URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = blobUrl;
      a.download = url.split("/").pop();
      a.click();

      URL.revokeObjectURL(blobUrl);
    } finally {
      setDownloading(false);
    }
  };

  if (!documents.length) {
    return (
      <Center py={10}>
        <Text fontSize="13px" color="gray.500">
          No documents uploaded
        </Text>
      </Center>
    );
  }

  return (
    <Box borderWidth="1px" borderRadius="10px" p="20px" bg="#fff">
      <Text fontSize="lg" fontWeight="600" mb={4}>
        Legal Documents
      </Text>

      <Stack spacing="14px">
        {documents.map((doc) => {
          const key = String(doc.document_type || "").trim();
          return (
            <HStack key={doc.id} p={2} borderRadius="md" _hover={{ bg: "#F9FAFB" }}>
              <Text fontSize="13px" color="#626974">
                {DOCUMENT_NAME_MAP[key] || key}
              </Text>

              <Spacer />

              <Button
                size="sm"
                variant="outline"
                colorScheme="green"
                onClick={() => handlePreview(doc)}
              >
                Preview
              </Button>

              <Badge
                colorScheme={doc.status === "verified" ? "green" : "red"}
                textTransform="capitalize"
              >
                {doc.status}
              </Badge>
            </HStack>
          );
        })}
      </Stack>

      {/* PREVIEW MODAL */}
      <Modal isOpen={isOpen} onClose={onClose} size="4xl">
        <ModalOverlay />
        <ModalContent maxW="90vw">
          <ModalHeader>
            {selectedDoc &&
              (DOCUMENT_NAME_MAP[selectedDoc.document_type] ||
                selectedDoc.document_type)}
          </ModalHeader>
          <ModalCloseButton />

          <ModalBody>
            {selectedDoc && (() => {
              const url = selectedDoc.document_front_url;
              const lower = url.toLowerCase();

              if (lower.endsWith(".pdf")) {
                return (
                  <>
                    <Flex justify="space-between" mb={3}>
                      <Flex gap={2}>
                        <IconButton
                          icon={<MdNavigateBefore />}
                          size="sm"
                          onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                          isDisabled={currentPage <= 1}
                        />
                        <Text fontSize="sm">
                          {currentPage}/{numPages || "?"}
                        </Text>
                        <IconButton
                          icon={<MdNavigateNext />}
                          size="sm"
                          onClick={() =>
                            setCurrentPage((p) =>
                              Math.min(numPages || 1, p + 1)
                            )
                          }
                        />
                      </Flex>

                      <Flex gap={2}>
                        <IconButton
                          icon={<MdZoomOut />}
                          size="sm"
                          onClick={() => setScale((s) => Math.max(0.5, s - 0.2))}
                        />
                        <Text fontSize="sm">{Math.round(scale * 100)}%</Text>
                        <IconButton
                          icon={<MdZoomIn />}
                          size="sm"
                          onClick={() => setScale((s) => Math.min(2, s + 0.2))}
                        />
                      </Flex>
                    </Flex>

                    <Center>
                      <PdfDocument
                        file={url}
                        onLoadSuccess={({ numPages }) => setNumPages(numPages)}
                        onLoadError={() =>
                          setPdfError("Unable to load PDF document")
                        }
                      >
                        <Page pageNumber={currentPage} scale={scale} />
                      </PdfDocument>
                    </Center>
                  </>
                );
              }

              if (lower.endsWith(".doc") || lower.endsWith(".docx")) {
                return (
                  <iframe
                    title="doc-preview"
                    src={`https://docs.google.com/gview?url=${encodeURIComponent(
                      url
                    )}&embedded=true`}
                    width="100%"
                    height="600px"
                  />
                );
              }

              return (
                <Center>
                  <Image
                    src={url}
                    maxH="600px"
                    objectFit="contain"
                    fallback={<Spinner />}
                  />
                </Center>
              );
            })()}
          </ModalBody>

          <ModalFooter>
            {selectedDoc && (
              <Button
                leftIcon={<MdOutlineFileDownload />}
                colorScheme="green"
                isLoading={downloading}
                onClick={() =>
                  handleDownload(selectedDoc.document_front_url)
                }
              >
                Download
              </Button>
            )}
            <Button ml={3} variant="outline" onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}
