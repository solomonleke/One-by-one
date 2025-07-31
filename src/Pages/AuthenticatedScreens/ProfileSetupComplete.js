import React from 'react'
import AuthenticatedWrapper from './Layout/Index'
import { ReactComponent as VerifyIcon } from "../../Asset/verify.svg";
import { Box, Text } from '@chakra-ui/react'
import Button from '../../Components/Button';
import { useNavigate } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';

export default function ProfileSetupComplete() {
    const router = useNavigate();
    return (
        <AuthenticatedWrapper>
            <Box px={["3%", "15%"]} mt={"40px"}>
                <Box display="flex" flexDirection="column" gap="25px">
                    <VerifyIcon />

                    <Text
                        textTransform="capitalize"
                        fontWeight="700"
                        fontSize="20px"
                        color="#101011"
                        fontFamily="heading"
                        mt="4"
                    >
                        Profile set up complete
                    </Text>

                    <Text fontSize="small" fontWeight="medium" style={{ color: "#6B7280", lineHeight: "24px" }}>Your profile is now set up! Your details will be reviewed for <br /> verification, which may take 3-5 days. We’ll notify you via email <br /> if any additional steps are required.</Text>

                    <Button disabled={true} onClick={() => {
                        router("/roleSelection")
                    }}>Continue <span className='right'><FaArrowRight className='arrow'/></span></Button>

                </Box>
            </Box>
        </AuthenticatedWrapper>
    )
}
