import React from 'react'
import AuthenticatedWrapper from './Layout/Index'
import { Box, Text, VStack } from '@chakra-ui/react'
import { FaArrowLeft } from 'react-icons/fa'
import Input from '../../Components/Input'
import Button from '../../Components/Button'
import { useNavigate } from 'react-router-dom'

export default function ForgotPassword() {
    const router = useNavigate();
    return (
        <AuthenticatedWrapper>
            <Box px={["3%", "15%"]} mt="74px">
                <VStack spacing={"70px"} alignItems={"start"}>
                <VStack align="start" spacing="22px">
                    <FaArrowLeft />
                    <Text fontWeight="700" fontSize="22px" color="#101011" fontFamily="heading">
                        Forgot Password?
                    </Text>
                    <Text fontSize="small" fontWeight="medium" color="#6B7280" lineHeight="24px">
                        No worries, let’s help you get back in. Enter the email address <br /> associated with your account, and we’ll send you a secure link <br /> to reset your password.
                    </Text>
                </VStack>
                    <Input type='email' label='Email' placeholder='kenawilson9@gmail.com'/>

                    <Button onClick={() => {
                        router("/forgotten-password-email")
                    }}>Send Reset Link</Button>
                </VStack>
            </Box>
        </AuthenticatedWrapper>
    )
}
