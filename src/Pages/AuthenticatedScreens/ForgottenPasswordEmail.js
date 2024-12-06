import React, { useState, useEffect } from 'react';
import AuthenticatedWrapper from './Layout/Index';
import { ReactComponent as EnvelopeIcon } from "../../Asset/envelope.svg";
import { Box, Text, VStack } from '@chakra-ui/react';
import Button from '../../Components/Button';
import { FaArrowRight } from 'react-icons/fa';
import { ResendVerificationApi } from '../../Utils/ApiCall';
import ShowToast from '../../Components/ToastNotification';

export default function ForgottenPasswordEmail() {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [showToast, setShowToast] = useState({
        show: false,
        message: "",
        status: ""
    });

    useEffect(() => {
        // Retrieve the email from localStorage
        const storedEmail = localStorage.getItem('resetEmail');
        if (storedEmail) {
            setEmail(storedEmail);
        }
    }, []);

    const resendLink = async () => {
        setLoading(true);

        try {
            const payload = { email, reason: "forgot-password" };
            const response = await ResendVerificationApi(payload);

            if (response.status === 201) {
                setShowToast({
                    show: true,
                    message: "Password reset link sent to your email.",
                    status: "success"
                });
                setTimeout(() => setShowToast({ show: false }), 3000);
            }
        } catch (error) {
            setShowToast({
                show: true,
                message: error.message || "Failed to resend reset link.",
                status: "error"
            });
            setTimeout(() => setShowToast({ show: false }), 3000);
        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthenticatedWrapper>
            {showToast.show && (
                <ShowToast
                    message={showToast.message}
                    status={showToast.status}
                    show={showToast.show}
                />
            )}

            <Box px={["3%", "15%"]} mt="74px">
                <VStack align="start" spacing="22px">
                    <EnvelopeIcon />
                    <VStack alignItems={"start"}>
                        <Text fontWeight="700" fontSize="22px" color="#101011" fontFamily="heading">
                            Check Your Inbox
                        </Text>
                        <Text fontSize="small" fontWeight="medium" color="#6B7280" lineHeight="24px">
                            We've sent a reset link to <Box as="span" fontWeight="bold">{email || "your email"}</Box>. 
                            Please click it within the <br /> next 15 minutes to reset your password.
                        </Text>
                    </VStack>
                    <Button isLoading={loading} onClick={resendLink}>
                        Resend <span className='right'><FaArrowRight className='arrow' /></span>
                    </Button>

                    <Text fontSize="small" fontWeight="semibold" color="#6B7280" lineHeight="24px">
                        Didn’t receive email? <Box as='span' color="#39996B" cursor="pointer" onClick={resendLink}>Resend</Box>
                    </Text>
                </VStack>
            </Box>
        </AuthenticatedWrapper>
    );
}
