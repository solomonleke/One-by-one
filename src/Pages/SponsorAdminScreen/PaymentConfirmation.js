import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import MainLayout from '../../DashboardLayout'
import {
  Box,
  Text,
  VStack,
  HStack,
  Icon,
  Divider,
  Heading,
} from '@chakra-ui/react'
import Button from '../../Components/Button'
import { IoCheckmarkCircle } from 'react-icons/io5'

export default function PaymentConfirmation() {
  const location = useLocation()
  const navigate = useNavigate()

  // Parse query parameters from URL
  const queryParams = new URLSearchParams(location.search)
  const reference = queryParams.get('reference') || queryParams.get('trxref') || 'N/A'
  
  // Format current date
  const formattedDate = new Date().toLocaleString()

  return (
    <MainLayout>
      <Box
        maxW="md"
        mx="auto"
        mt={{ base: 6, md: 10 }}
        bg="#fff"
        border="1px solid"
        borderColor="gray.100"
        borderRadius="2xl"
        boxShadow="xl"
        p={{ base: 6, md: 8 }}
        textAlign="center"
      >
        <VStack spacing={6}>
          {/* Success Icon */}
          <Icon as={IoCheckmarkCircle} w={20} h={20} color="greenn.greenn500" />

          {/* Heading */}
          <VStack spacing={2}>
            <Heading size="lg" fontWeight="bold" color="greenn.greenn500">
              Payment Successful!
            </Heading>
            <Text color="gray.500" fontSize="sm">
              Your scholarship funding has been processed successfully.
            </Text>
          </VStack>

          <Divider />

          {/* Details Table */}
          <VStack w="full" spacing={3} align="stretch" fontSize="sm">
            <HStack justify="space-between" align="start" w="full">
              <Text color="gray.500" flexShrink={0}>Transaction Reference</Text>
              <Text
                fontWeight="semibold"
                color="gray.850"
                fontFamily="mono"
                fontSize="sm"
                wordBreak="break-all"
                textAlign="right"
                flex="1"
                pl={4}
              >
                {reference}
              </Text>
            </HStack>
            <HStack justify="space-between">
              <Text color="gray.500">Status</Text>
              <Text fontWeight="semibold" color="green.600">
                Successful
              </Text>
            </HStack>
            <HStack justify="space-between">
              <Text color="gray.500">Payment Method</Text>
              <Text fontWeight="semibold" color="gray.850">
                Paystack Gateway
              </Text>
            </HStack>
            <HStack justify="space-between">
              <Text color="gray.500">Date & Time</Text>
              <Text fontWeight="semibold" color="gray.850">
                {formattedDate}
              </Text>
            </HStack>
          </VStack>

          <Divider />

          {/* Back Button */}
          <Button
            onClick={() => navigate('/sponsor-admin/myscholarships')}
            background="greenn.greenn500"
            border="1px solid #39996B"
            hColor="white"
            px="20px"
          >
            Go to My Scholarships
          </Button>
        </VStack>
      </Box>
    </MainLayout>
  )
}
