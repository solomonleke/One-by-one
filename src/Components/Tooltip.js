import { HStack, Icon, Text } from '@chakra-ui/react'
import React, { useState, useEffect } from 'react'
import { Tooltip as Tooltips } from '@chakra-ui/react';
import { IoInformationCircleOutline } from 'react-icons/io5';
import { FiTrendingUp } from 'react-icons/fi';

export default function Tooltip () {
    return(
        <HStack justify="space-between" flexWrap="wrap" mb="10px">
        <Tooltips
          bg="#fff"
          color="#667085"
          p="12px"
          lineHeight="20px"
          fontSize="13px"
          fontWeight="400"
          label="See how student statuses have changed month over month. Use filters to view trends by approval, pending, or rejection status."
          placement="top-end"
        >
          <HStack spacing="5px">
            <Text color={"#1F2937"} fontWeight="600" fontSize="17px">
              Fund Disbursements Overtime
            </Text>
            <IoInformationCircleOutline />
          </HStack>
        </Tooltips>

        <HStack>
          <Text fontWeight="700" fontSize="24px" color="#2F2F2F">
            ₦134,000
          </Text>
          <HStack spacing="4px">
            <HStack spacing="4px" bg="#C0FFE1" rounded="166.58px" p="3.33px" border="0.83px solid #95C7AF">
              <Icon as={FiTrendingUp} color="#00715D" />
              <Text fontSize="sm" color="#00715D" fontWeight="500">
                12%
              </Text>
            </HStack>
            <Text fontSize="sm" color="gray.500">
              vs last month
            </Text>
          </HStack>
        </HStack>
      </HStack>
    )
}
