import React from 'react'
import AuthenticatedWrapper from './Layout/Index'
import { Box, Text, VStack } from '@chakra-ui/react'
import Button from '../../Components/Button';
import Input from '../../Components/Input';
import { useNavigate } from 'react-router-dom';

export default function ResetPassword() {

    
    const router = useNavigate();
  return (
    <AuthenticatedWrapper>
            <Box px={["3%", "15%"]} mt="74px">
                <VStack alignItems={"start"} spacing={"70px"}>
            <VStack align="start" spacing="22px">
                    <VStack alignItems={"start"}>
                        <Text fontWeight="700" fontSize="22px" color="#101011" fontFamily="heading">
                        Reset Password
                        </Text>
                        <Text fontSize="small" fontWeight="medium" color="#6B7280" lineHeight="24px">
                        Almost there! Let’s set a new password for your account.
                        </Text>
                    </VStack>

                </VStack>

                <Input type='password' label='New Password' placeholder=''/>

                <Input type='password' label='Repeat New Password' placeholder=''/>

                    <Button disabled={false} onClick={() => {
                        router("/roleSelection")
                    }}>Save New Password</Button>
                </VStack>
            </Box>
    </AuthenticatedWrapper>
  )
}
