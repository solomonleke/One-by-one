import { Box, Flex, HStack, Text } from '@chakra-ui/react'
import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function NavBar() {

  const nav = useNavigate()
  return (
    <Flex justifyContent={"space-between"} bg="navy" py="20px" px={["3%", "6%"]} color={"#fff"} cursor={"pointer"} fontFamily={"body"}>
    <Box>LOGO</Box>
    <Box>
      <HStack>
        <Text onClick={()=>nav("/sign-in")}>Sign In</Text>
        <Text onClick={()=>nav("/sign-up")}>Sign Up</Text>
       
      </HStack>
    </Box>

    </Flex>
  )
}
