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
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  IconButton,
  Flex,
} from "@chakra-ui/react";
import { MdOutlineFileDownload, MdZoomIn, MdZoomOut, MdNavigateNext, MdNavigateBefore } from "react-icons/md";
import { Document as PdfDocument, Page, pdfjs } from "react-pdf";
import { GetAdminProfile } from "../Utils/ApiCall";

// Worker configuration for pdfjs-dist v5.4.54 - using unpkg CDN
pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

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
  const [currentPage, setCurrentPage] = useState(1);
  const [pdfLoading, setPdfLoading] = useState(false);
  const [pdfError, setPdfError] = useState(null);
  const [scale, setScale] = useState(1.0);

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
    setCurrentPage(1);
    setPdfError(null);
    setPdfLoading(false);
    setScale(1.0);
    onOpen();
  };

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
    setPdfLoading(false);
    setPdfError(null);
  };

  const onDocumentLoadError = (error) => {
    console.error('PDF load error:', error);
    setPdfLoading(false);
    setPdfError('Failed to load PDF. The document might be corrupted or inaccessible.');
  };

  const onDocumentLoadStart = () => {
    setPdfLoading(true);
    setPdfError(null);
  };

  const goToPreviousPage = () => {
    setCurrentPage(prev => Math.max(prev - 1, 1));
  };

  const goToNextPage = () => {
    setCurrentPage(prev => Math.min(prev + 1, numPages || 1));
  };

  const zoomIn = () => {
    setScale(prev => Math.min(prev + 0.2, 2.0));
  };

  const zoomOut = () => {
    setScale(prev => Math.max(prev - 0.2, 0.5));
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
  borderRadius="md"
  _hover={{ bg: "#F9FAFB" }}
>
  <Text fontSize="13px" fontWeight="400" color="#626974">
    {DOCUMENT_NAME_MAP[doc.document_type] || doc.document_type}
  </Text>
  <Spacer />
  <Button
    size="sm"
    background="transparent"
    color="greenn.greenn500"
    border="1px solid green"
    _hover={{
                    background: "greenn.greenn500",
                    color: "white",
                  }}
    onClick={() => handlePreview(doc)}
  >
    Preview
  </Button>
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

      {/* Enhanced Modal for preview */}
      <Modal isOpen={isOpen} onClose={onClose} size="4xl">
        <ModalOverlay />
        <ModalContent maxW="90vw" maxH="90vh">
          <ModalHeader>
            <Text fontSize="lg">Document Preview</Text>
            {selectedDoc && (
              <Text fontSize="sm" color="gray.600" mt={1}>
                {DOCUMENT_NAME_MAP[selectedDoc.document_type] || selectedDoc.document_type}
              </Text>
            )}
          </ModalHeader>
          <ModalCloseButton />
          
          <ModalBody 
            display="flex" 
            flexDirection="column"
            p={4}
            overflowY="auto"
          >
            {selectedDoc &&
              (() => {
                const url = selectedDoc.document_front_url;
                const lowerUrl = url.toLowerCase();

                if (lowerUrl.endsWith(".pdf")) {
                  return (
                    <Box overflowX="auto">
                      {/* PDF Controls */}
                      {(numPages > 1 || pdfError) && (
                        <Flex justify="space-between" align="center" mb={4} p={2} bg="gray.50" borderRadius="md">
                          <Flex align="center" gap={2}>
                            <IconButton
                              icon={<MdNavigateBefore />}
                              onClick={goToPreviousPage}
                              isDisabled={currentPage <= 1 || pdfLoading}
                              size="sm"
                              aria-label="Previous page"
                            />
                            <Text fontSize="sm">
                              Page {currentPage} of {numPages || '?'}
                            </Text>
                            <IconButton
                              icon={<MdNavigateNext />}
                              onClick={goToNextPage}
                              isDisabled={currentPage >= (numPages || 1) || pdfLoading}
                              size="sm"
                              aria-label="Next page"
                            />
                          </Flex>
                          
                          <Flex align="center" gap={2}>
                            <IconButton
                              icon={<MdZoomOut />}
                              onClick={zoomOut}
                              isDisabled={scale <= 0.5 || pdfLoading}
                              size="sm"
                              aria-label="Zoom out"
                            />
                            <Text fontSize="sm">{Math.round(scale * 100)}%</Text>
                            <IconButton
                              icon={<MdZoomIn />}
                              onClick={zoomIn}
                              isDisabled={scale >= 2.0 || pdfLoading}
                              size="sm"
                              aria-label="Zoom in"
                            />
                          </Flex>
                        </Flex>
                      )}

                      {/* PDF Content */}
                      <Center flexDirection="column" minH="400px">
                        {pdfLoading && (
                          <Box textAlign="center">
                            <Spinner size="lg" color="green.500" />
                            <Text mt={2} fontSize="sm" color="gray.600">
                              Loading PDF document...
                            </Text>
                          </Box>
                        )}

                        {pdfError && (
                          <Alert status="error" borderRadius="md" maxW="500px">
                            <AlertIcon />
                            <Box>
                              <AlertTitle>PDF Load Failed!</AlertTitle>
                              <AlertDescription fontSize="sm">
                                {pdfError}
                                <br />
                                <Button 
                                  as="a" 
                                  href={url} 
                                  target="_blank" 
                                  rel="noopener noreferrer"
                                  size="sm" 
                                  mt={2} 
                                  colorScheme="blue"
                                  variant="outline"
                                >
                                  Open in New Tab
                                </Button>
                              </AlertDescription>
                            </Box>
                          </Alert>
                        )}

                        {!pdfError && (
                          <PdfDocument
                            file={url}
                            key={url}
                            onLoadStart={onDocumentLoadStart}
                            onLoadSuccess={onDocumentLoadSuccess}
                            onLoadError={onDocumentLoadError}
                            loading={
                              <Box textAlign="center">
                                <Spinner size="lg" color="green.500" />
                                <Text mt={2} fontSize="sm" color="gray.600">
                                  Loading PDF document...
                                </Text>
                              </Box>
                            }
                            options={{
                              cMapUrl: 'https://unpkg.com/pdfjs-dist@5.4.54/cmaps/',
                              cMapPacked: true,
                            }}
                          >
                            <Page 
                              pageNumber={currentPage} 
                              scale={scale}
                              loading={
                                <Box textAlign="center" p={8}>
                                  <Spinner size="md" color="green.500" />
                                  <Text mt={2} fontSize="sm" color="gray.600">
                                    Rendering page...
                                  </Text>
                                </Box>
                              }
                            />
                          </PdfDocument>
                        )}
                      </Center>
                    </Box>
                  );
                } else if (lowerUrl.endsWith(".doc") || lowerUrl.endsWith(".docx")) {
                  return (
                    <Box>
                      <iframe
                        src={`https://docs.google.com/gview?url=${encodeURIComponent(
                          url
                        )}&embedded=true`}
                        width="100%"
                        height="600px"
                        title="Word Document Preview"
                        onError={() => {
                          // Fallback for iframe errors
                        }}
                      />
                      <Text fontSize="xs" color="gray.500" mt={2} textAlign="center">
                        If the document doesn't load, try{" "}
                        <Button
                          as="a"
                          href={url}
                          target="_blank"
                          rel="noopener noreferrer"
                          size="xs"
                          variant="link"
                          colorScheme="blue"
                        >
                          opening it in a new tab
                        </Button>
                      </Text>
                    </Box>
                  );
                } else {
                  return (
                    <Center>
                      <Image
                        src={url}
                        alt={selectedDoc.document_type}
                        maxW="100%"
                        maxH="600px"
                        objectFit="contain"
                        loading="lazy"
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.nextSibling.style.display = 'block';
                        }}
                      />
                      <Box display="none" textAlign="center">
                        <Alert status="warning" borderRadius="md" maxW="400px">
                          <AlertIcon />
                          <Box>
                            <AlertTitle>Image Load Failed!</AlertTitle>
                            <AlertDescription fontSize="sm">
                              Unable to preview this image.{" "}
                              <Button
                                as="a"
                                href={url}
                                target="_blank"
                                rel="noopener noreferrer"
                                size="sm"
                                colorScheme="blue"
                                variant="link"
                              >
                                View Original
                              </Button>
                            </AlertDescription>
                          </Box>
                        </Alert>
                      </Box>
                    </Center>
                  );
                }
              })()}
          </ModalBody>

          {selectedDoc && (
            <ModalFooter borderTop="1px solid" borderColor="gray.200">
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
                mr={3}
              >
                Download
              </Button>
              <Button variant="outline" onClick={onClose}>
                Close
              </Button>
            </ModalFooter>
          )}
        </ModalContent>
      </Modal>
    </Box>
  );
}
