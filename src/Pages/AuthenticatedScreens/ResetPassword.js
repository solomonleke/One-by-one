import React, { useState } from 'react';
import AuthenticatedWrapper from './Layout/Index';
import { Box, Text, VStack } from '@chakra-ui/react';
import Button from '../../Components/Button';
import Input from '../../Components/Input';
import { useNavigate } from 'react-router-dom';
import ShowToast from '../../Components/ToastNotification';
import { ResetPasswordApi } from '../../Utils/ApiCall';

export default function ResetPassword() {
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [showToast, setShowToast] = useState({ show: false, message: '', status: '' });
    const router = useNavigate();

    const handleResetPassword = async () => {
        if (!newPassword || !confirmPassword) {
            setShowToast({ show: true, message: 'Please fill in all fields.', status: 'error' });
            setTimeout(() => setShowToast({ show: false }), 3000);
            return;
        }

        if (newPassword !== confirmPassword) {
            setShowToast({ show: true, message: 'Passwords do not match.', status: 'error' });
            setTimeout(() => setShowToast({ show: false }), 3000);
            return;
        }

        setLoading(true);

        try {
            const token = localStorage.getItem('resetToken'); // Retrieve the reset token from localStorage or URL params
            const payload = { password: newPassword };
            const response = await ResetPasswordApi(payload, token);

            if (response.status === 200) {
                setShowToast({
                    show: true,
                    message: 'Password reset successfully. Redirecting to sign-in...',
                    status: 'success',
                });
                setTimeout(() => {
                    setShowToast({ show: false });
                    router('/sign-in');
                }, 3000);
            }
        } catch (error) {
            setShowToast({ show: true, message: error.message || 'Failed to reset password.', status: 'error' });
            setTimeout(() => setShowToast({ show: false }), 3000);
        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthenticatedWrapper>
            {showToast.show && (
                <ShowToast message={showToast.message} status={showToast.status} show={showToast.show} />
            )}
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

                    <Input
                        type="password"
                        label="New Password"
                        placeholder="Enter new password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                    />

                    <Input
                        type="password"
                        label="Repeat New Password"
                        placeholder="Repeat new password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />

                    <Button isLoading={loading} disabled={loading} onClick={handleResetPassword}>
                        Save New Password
                    </Button>
                </VStack>
            </Box>
        </AuthenticatedWrapper>
    );
}
