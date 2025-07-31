import React from 'react'
import { Box, HStack, Text } from '@chakra-ui/react'
import { HiOutlineUsers } from 'react-icons/hi'
import { useNavigate } from "react-router-dom";


export default function DashboardCard({ icon, title, value, w="24%", navigateTo }) {

  const navigate = useNavigate();

  return (
    <Box bg="#fff" border="1px solid #EDEFF2" rounded="10px" p="22px" w={["100%", "48%", w, w]} mt={["10px", "10px", "0px", "0px" ]} onClick={() => navigate(navigateTo)}
    cursor="pointer"
    transition="all 0.3s"
    _hover={{
      transform: "translateY(-5px)",
      boxShadow: "lg",
      bg: "#E8FFF4"
    }}
    >

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
