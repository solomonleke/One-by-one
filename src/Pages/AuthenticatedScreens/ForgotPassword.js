import React, { useState } from 'react';
import AuthenticatedWrapper from './Layout/Index';
import { Box, Text, VStack } from '@chakra-ui/react';
import { FaArrowLeft } from 'react-icons/fa';
import Input from '../../Components/Input';
import Button from '../../Components/Button';
import ShowToast from '../../Components/ToastNotification';
import { useNavigate } from 'react-router-dom';
import { ResendVerificationApi } from '../../Utils/ApiCall';

export default function ForgotPassword() {
    const router = useNavigate();

    const [email, setEmail] = useState(""); 
    const [loading, setLoading] = useState(false);
    const [showToast, setShowToast] = useState({
        show: false,
        message: "",
        status: ""
    });

    // Handle email input changes
    const handleInputChange = (e) => {
        setEmail(e.target.value);
    };

    // Function to send the password reset link
    const sendResetLink = async () => {
        if (!email) {
            setShowToast({
                show: true,
                message: "Please enter your email address.",
                status: "error"
            });
            setTimeout(() => {
                setShowToast({ show: false });
            }, 3000);
            return;
        }

        setLoading(true);

        try {
            const payload = { email, reason: "forgot-password" };
            const response = await ResendVerificationApi(payload);

            console.log("response", response )

            if (response.status === 201) {
                setShowToast({
                    show: true,
                    message: "Password reset link sent to your email.",
                    status: "success"
                });

                setTimeout(() => {
                    setShowToast({ show: false });
                    router("/forgotten-password-email"); // Navigate to confirmation page
                }, 2000);
            }
        } catch (error) {
            setShowToast({
                show: true,
                message: error.message || "Failed to send reset link.",
                status: "error"
            });

            setTimeout(() => {
                setShowToast({ show: false });
            }, 3000);
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
                <VStack spacing={"70px"} alignItems={"start"}>
                    <VStack align="start" spacing="22px">
                        <FaArrowLeft
                            onClick={() => router(-1)}
                            style={{ cursor: "pointer" }}
                        />
                        <Text fontWeight="700" fontSize="22px" color="#101011" fontFamily="heading">
                            Forgot Password?
                        </Text>
                        <Text fontSize="small" fontWeight="medium" color="#6B7280" lineHeight="24px">
                            No worries, let’s help you get back in. Enter the email address <br /> 
                            associated with your account, and we’ll send you a secure link <br /> 
                            to reset your password.
                        </Text>
                    </VStack>

                    <Input
                        type="email"
                        label="Email"
                        placeholder="kenawilson9@gmail.com"
                        value={email}
                        onChange={handleInputChange}
                    />

                    <Button
                        isLoading={loading}
                        onClick={sendResetLink}
                        disabled={loading} // Disable button while loading
                    >
                        Send Reset Link
                    </Button>
                </VStack>
            </Box>
        </AuthenticatedWrapper>
    );
}
