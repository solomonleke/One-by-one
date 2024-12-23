import React from 'react'
import { Box, HStack, Text } from '@chakra-ui/react'
import { HiOutlineUsers } from 'react-icons/hi'


export default function DashboardCard({ icon, title, value, w="24%"}) {
  return (
    <Box bg="#fff" border="1px solid #EDEFF2" rounded="10px" p="22px" w={["100%", "48%", w, w]} mt={["10px", "10px", "0px", "0px" ]}>

      <HStack>
        <Box color={"green"} fontSize={"25px"}>

        {icon}
        </Box>
        <Text fontWeight={"400"} fontSize={"13px"} lineHeight={"24px"} textTransform={"capitalize"}>{title}</Text>
      </HStack>
      <Text fontWeight={"600"} fontSize={"20px"} mt="14px" lineHeight={"24px"}>{value}</Text>

    </Box>
  )
}
