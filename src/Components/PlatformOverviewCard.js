import { HStack, Icon, Text } from '@chakra-ui/react'
import React, { useState, useEffect } from 'react'

export default function PlatformOverviewCard ({name, amount}) {
    return(
        <HStack bg="#FFFFFF" justifyContent="space-between" py="12px" px="22px" boxShadow="0px 1px 2px 0px #1018280F;" border="1px solid #EDEFF2" rounded="10px" h="84px" w="254.6px">
        <Text color="#4C515C" fontSize="13px" fontWeight="400" textTransform="capitalize">{name}:</Text>
        <Text color="#2F2F2F" fontSize="19px" fontWeight="500">{amount}</Text>
      </HStack>
    )
}