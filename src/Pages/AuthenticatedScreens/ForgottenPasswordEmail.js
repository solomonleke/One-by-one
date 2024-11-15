import React from 'react'
import AuthenticatedWrapper from './Layout/Index'
import { ReactComponent as EnvelopeIcon } from "../../Asset/envelope.svg";
import { Box, Text, VStack } from '@chakra-ui/react'
import Button from '../../Components/Button';
import { FaArrowRight } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

export default function ForgottenPasswordEmail() {
    const router = useNavigate();
    return (
        <AuthenticatedWrapper>
            <Box px={["3%", "15%"]} mt="74px">
                <VStack align="start" spacing="22px">
                    <EnvelopeIcon />
                    <VStack alignItems={"start"}>
                        <Text fontWeight="700" fontSize="22px" color="#101011" fontFamily="heading">
                            Check Your Inbox
                        </Text>
                        <Text fontSize="small" fontWeight="medium" color="#6B7280" lineHeight="24px">
                            We've sent a reset link to your email. Please click it within the <br /> next 15 minutes to reset your password.
                        </Text>
                    </VStack>
                    <Button disabled={false} onClick={() => {
                        router("/ResetPassword")
                    }}>Continue <span className='right'><FaArrowRight className='arrow' /></span></Button>

                    <Text fontSize="small" fontWeight="semibold" color="#6B7280" lineHeight="24px">Didn’t receive email? <Box as='span' color="#39996B" cursor={"pointer"}>Resend</Box></Text>
                </VStack>
            </Box>
        </AuthenticatedWrapper>
    )
}
