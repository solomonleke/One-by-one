import React from 'react'
import AuthenticatedWrapper from './Layout/Index'
import { Box, Stack, Text } from '@chakra-ui/react'
import Input from '../../Components/Input'
import Button from '../../Components/Button'
import { FcGoogle } from 'react-icons/fc'
import { useNavigate } from 'react-router-dom'

export default function SignIn() {
  const router = useNavigate();
  return (
    <AuthenticatedWrapper>


      <Box px={["3%", "15%"]} mt={"74px"}>
        <Text textTransform={"capitalize"} fontWeight={"700"} fontSize={"24px"} color="#101011" fontFamily={"heading"}>welcome back!</Text>
        <Text textTransform={"capitalize"} fontWeight={"400"} fontSize={"14px"} mt="8px" fontFamily={"heading"} color={"#6B7280"}>Enter your username and password to continue</Text>

        <Stack mt="62px" spacing={"52px"}>
          <Input label='email' type='email' />
          <Input label='password' type='password' />

        </Stack>
        <Text textTransform={"capitalize"} fontWeight={"400"} fontSize={"13px"} mt="13px" textAlign={"right"} color="#6B7280" fontFamily={"heading"}>Forgot Password?</Text>

        <Button mt={"20px"}>Log in</Button>

        <Box mt="32px" textAlign={"center"} borderTop={"1px solid"} borderColor={"gray.gray400"}>
          <Box as="span" fontSize={"13px"} fontWeight={"400"} px={"10px"} color="#6B7280" pos="relative" top="-16px" bg="#FFFFFF">or Log in with</Box>
        </Box>

        <Button border={"2px solid #DDE5EC"} color='black' hColor='#fff' hoverBg='transparent' hoverColor="blue.blue500" background='#fff' leftIcon={<FcGoogle />} > Google</Button>
        <Text textTransform={"capitalize"} fontWeight={"400"} fontSize={"14px"} mt="23px" textAlign={"center"} color="#1F2937" fontFamily={"heading"}>Don’t have an account? <Box as='span' color={"greenn.greenn400"} cursor="pointer" onClick={() => {
          router("/sign-up")
        }}>Register</Box></Text>

      </Box>
    </AuthenticatedWrapper>


  )
}
