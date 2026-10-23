import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Text,
  Stack,
  useDisclosure,
  useBreakpointValue,
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
  personalId: "Personal ID",
};

// bare = true -> no card border/padding/heading (use when the parent already provides them)
export default function DocumentSection({ bare = false }) {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDoc, setSelectedDoc] = useState(null);
  const [downloading, setDownloading] = useState(false);
  const [numPages, setNumPages] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pdfLoading, setPdfLoading] = useState(false);
  const [pdfError, setPdfError] = useState(null);
  const [scale, setScale] = useState(1.0);
  const [containerWidth, setContainerWidth] = useState(600);

  const pdfContainerRef = useRef(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const modalSize = useBreakpointValue({ base: "full", md: "4xl" });

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

  // fit the PDF page to the modal width (so it never overflows on mobile)
  useEffect(() => {
    if (!isOpen) return;

    const measure = () => {
      if (pdfContainerRef.current) {
        setContainerWidth(pdfContainerRef.current.clientWidth);
      }
    };

    const t = setTimeout(measure, 100); // wait for modal animation/mount
    window.addEventListener("resize", measure);
    return () => {
      clearTimeout(t);
      window.removeEventListener("resize", measure);
    };
  }, [isOpen, selectedDoc]);

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
    console.error("PDF load error:", error);
    setPdfLoading(false);
    setPdfError("Failed to load PDF. The document might be corrupted or inaccessible.");
  };

  const onDocumentLoadStart = () => {
    setPdfLoading(true);
    setPdfError(null);
  };

  const goToPreviousPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const goToNextPage = () => setCurrentPage((prev) => Math.min(prev + 1, numPages || 1));
  const zoomIn = () => setScale((prev) => Math.min(prev + 0.2, 2.0));
  const zoomOut = () => setScale((prev) => Math.max(prev - 0.2, 0.5));

  const handleDownload = async (url) => {
    try {
      setDownloading(true);
      const response = await fetch(url, { mode: "cors" });
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = url.split("/").pop() || "document";

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

  const renderPreview = () => {
    const url = selectedDoc?.document_front_url;

    if (!url) {
      return (
        <Center py={10}>
          <Text color="gray.500" fontSize="sm">
            No file available for this document.
          </Text>
        </Center>
      );
    }

    const lowerUrl = url.toLowerCase();

    if (lowerUrl.endsWith(".pdf")) {
      return (
        <Box>
          {/* PDF Controls */}
          {(numPages > 1 || pdfError) && (
            <Flex
              justify="space-between"
              align="center"
              mb={4}
              p={2}
              bg="gray.50"
              borderRadius="md"
              flexWrap="wrap"
              gap={2}
            >
              <Flex align="center" gap={2}>
                <IconButton
                  icon={<MdNavigateBefore />}
                  onClick={goToPreviousPage}
                  isDisabled={currentPage <= 1 || pdfLoading}
                  size="sm"
                  aria-label="Previous page"
                />
                <Text fontSize="sm">
                  Page {currentPage} of {numPages || "?"}
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

          {/* PDF Content - scrolls only if zoomed in past the screen width */}
          <Box ref={pdfContainerRef} w="100%" overflowX="auto">
            <Center flexDirection="column" minH="300px">
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
                    cMapUrl: "https://unpkg.com/pdfjs-dist@5.4.54/cmaps/",
                    cMapPacked: true,
                  }}
                >
                  <Page
                    pageNumber={currentPage}
                    width={Math.max(containerWidth - 8, 200) * scale}
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
        </Box>
      );
    }

    if (lowerUrl.endsWith(".doc") || lowerUrl.endsWith(".docx")) {
      return (
        <Box>
          <iframe
            src={`https://docs.google.com/gview?url=${encodeURIComponent(url)}&embedded=true`}
            width="100%"
            height="500px"
            style={{ maxWidth: "100%" }}
            title="Word Document Preview"
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
    }

    return (
      <Center flexDirection="column">
        <Image
          src={url}
          alt={selectedDoc.document_type}
          maxW="100%"
          maxH={["70vh", "600px"]}
          objectFit="contain"
          loading="lazy"
          onError={(e) => {
            e.target.style.display = "none";
            if (e.target.nextSibling) e.target.nextSibling.style.display = "block";
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
  };

  return (
    <Box
      borderColor="#EDEFF2"
      p={bare ? 0 : ["14px", "16px", "20px"]}
      borderRadius="10px"
      borderWidth={bare ? 0 : "1px"}
      backgroundColor="#fff"
      w="100%"
      maxW="100%"
      overflow="hidden"
    >
      {!bare && (
        <Text fontSize="lg" fontWeight="bold" mb={4}>
          Legal Documents
        </Text>
      )}

      {documents.length === 0 ? (
        <Center py={10}>
          <Text color="gray.500" fontSize="sm">
            No Documents Found
          </Text>
        </Center>
      ) : (
        <Stack mt={bare ? 0 : "18px"} spacing={["10px", "17px"]}>
          {documents.map((doc) => (
            <Flex
              key={doc.id}
              direction={{ base: "column", md: "row" }}
              align={{ base: "flex-start", md: "center" }}
              justify="space-between"
              gap={{ base: "8px", sm: "12px" }}
              p={2}
              borderRadius="md"
              _hover={{ bg: "#F9FAFB" }}
              w="100%"
            >
              <Text
                flex="1"
                minW="0"
                fontSize="13px"
                fontWeight="400"
                color="#626974"
                wordBreak="break-word"
              >
                {DOCUMENT_NAME_MAP[doc.document_type] || doc.document_type}
              </Text>

              <Flex align="center" gap="10px" flexShrink={0}>
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
                  whiteSpace="nowrap"
                >
                  {doc.status}
                </Text>
              </Flex>
            </Flex>
          ))}
        </Stack>
      )}

      {/* Preview modal: full-screen on mobile */}
      <Modal isOpen={isOpen} onClose={onClose} size={modalSize} scrollBehavior="inside">
        <ModalOverlay />
        <ModalContent maxW={{ base: "100%", md: "90vw" }} maxH={{ base: "100%", md: "90vh" }} m={{ base: 0, md: "auto" }}>
          <ModalHeader pr="48px">
            <Text fontSize="lg">Document Preview</Text>
            {selectedDoc && (
              <Text fontSize="sm" color="gray.600" mt={1} noOfLines={2}>
                {DOCUMENT_NAME_MAP[selectedDoc.document_type] || selectedDoc.document_type}
              </Text>
            )}
          </ModalHeader>
          <ModalCloseButton />

          <ModalBody display="flex" flexDirection="column" p={[3, 4]} overflowY="auto">
            {selectedDoc && renderPreview()}
          </ModalBody>

          {selectedDoc && (
            <ModalFooter
              borderTop="1px solid"
              borderColor="gray.200"
              flexDirection={{ base: "column", sm: "row" }}
              gap={3}
            >
              <Button
                color="#fff"
                leftIcon={<MdOutlineFileDownload />}
                background="green.500"
                _hover={{
                  background: "green.600",
                  boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
                }}
                transition="all 0.2s ease-in-out"
                isLoading={downloading}
                loadingText="Downloading..."
                onClick={() => handleDownload(selectedDoc.document_front_url)}
                isDisabled={!selectedDoc.document_front_url}
                w={{ base: "100%", sm: "auto" }}
              >
                Download
              </Button>
              <Button variant="outline" onClick={onClose} w={{ base: "100%", sm: "auto" }}>
                Close
              </Button>
            </ModalFooter>
          )}
        </ModalContent>
      </Modal>
    </Box>
  );
}