import React from 'react'
import AuthenticatedWrapper from './Layout/Index'
import { Box, Text } from '@chakra-ui/react'
import { ReactComponent as EnvelopeIcon } from "../../Asset/envelope.svg";
import Button from '../../Components/Button';
import { useNavigate } from 'react-router-dom';

export default function EmailVerification() {
    const router = useNavigate();
    return (
        <AuthenticatedWrapper>
            <Box px={["3%", "15%"]} mt={"74px"}>
                <Box display="flex" flexDirection="column" gap="25px">
                    <EnvelopeIcon />

                    <Text
                        textTransform="capitalize"
                        fontWeight="700"
                        fontSize="20px"
                        color="#101011"
                        fontFamily="heading"
                        mt="4"
                    >
                        Verify Your Email Address
                    </Text>

                    <Text fontSize="small" fontWeight="medium" style={{ color: "#6B7280", lineHeight: "24px" }}>We’ve sent a verification link to kenawilson9@gmail.com. <br /> Please check your inbox and click the link to verify your email <br /> before continuing.</Text>

                    <Button onClick={() => {
                        router("/roleSelection")
                    }}>Continue</Button>

                    <Text
                        textTransform={"capitalize"}
                        fontWeight={"400"}
                        fontSize={"14px"}
                        textAlign={"center"}
                        color="#1F2937"
                        fontFamily={"heading"}
                    >
                        Didn’t receive email?{" "}
                        <Box as="span" color={"greenn.greenn400"} cursor="pointer">
                            Resend
                        </Box>
                    </Text>
                </Box>
            </Box>
        </AuthenticatedWrapper>
    )
}
