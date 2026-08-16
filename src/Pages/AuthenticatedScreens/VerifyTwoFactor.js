import React, { useState } from 'react';
import AuthenticatedWrapper from './Layout/Index';
import { Box, Text, VStack, FormControl, FormHelperText, HStack, PinInput, PinInputField } from '@chakra-ui/react';
import { FaArrowLeft } from 'react-icons/fa';
import Button from '../../Components/Button';
import ShowToast from '../../Components/ToastNotification';
import { useNavigate, useLocation } from 'react-router-dom';
import { VerifyTwoFactorApi } from '../../Utils/ApiCall';

export default function VerifyTwoFactor() {
  const router = useNavigate();
  const location = useLocation();

  // Retrieve details passed from SignIn.js
  const { email, role, user, accessToken } = location.state || {};

  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [showToast, setShowToast] = useState({
    show: false,
    message: "",
    status: ""
  });

  const [codeError, setCodeError] = useState("");

  const validateCode = (val) => {
    if (!val) {
      setCodeError("Verification code is required");
      return false;
    } else if (val.length !== 6 || !/^\d+$/.test(val)) {
      setCodeError("Please enter a valid 6-digit code");
      return false;
    } else {
      setCodeError("");
      return true;
    }
  };

  const handleVerify = async () => {
    if (!validateCode(code)) {
      return;
    }

    setLoading(true);

    try {
      // Call verify-2fa
      const result = await VerifyTwoFactorApi({ email, code });

      // If backend returns the final token / user profile, we use those, otherwise we fallback
      const finalToken = result.accessToken || result.token || accessToken;
      const finalUser = result.user || user;

      if (finalToken && finalUser) {
        localStorage.setItem("authToken", finalToken);
        localStorage.setItem("onlineUser", JSON.stringify(finalUser));

        setShowToast({
          show: true,
          message: "Verification successful! Redirecting...",
          status: "success"
        });

        setTimeout(() => {
          setShowToast({ show: false });
          const userRole = finalUser.role || role;
          if (userRole === "SCHOOL-ADMIN") {
            router("/school-admin");
          } else if (userRole === "SCHOLARSHIP-ADMIN") {
            router("/scholarship-admin");
          } else if (userRole === "SPONSOR") {
            router("/sponsor-admin");
          } else if (userRole === "FUND-ADMIN") {
            router("/fund-admin");
          } else if (userRole === "SUPER-ADMIN") {
            router("/super-admin");
          } else {
            router("/");
          }
        }, 2000);
      } else {
        throw new Error("Invalid response format. Missing authentication token.");
      }
    } catch (error) {
      setShowToast({
        show: true,
        message: error.message || "Failed to verify 2FA code.",
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

      <Box px={["3%", "15%"]} mt={"40px"}>
        <VStack spacing={"70px"} alignItems={"start"}>
          <VStack align="start" spacing="22px">
            <FaArrowLeft
              onClick={() => router("/sign-in")}
              style={{ cursor: "pointer" }}
            />
            <Text fontWeight="700" fontSize="22px" color="#101011" fontFamily="heading">
              Two-Factor Verification
            </Text>
            <Text fontSize="small" fontWeight="medium" color="#6B7280" lineHeight="24px">
              Please enter the 6-digit verification code sent to <br />
              <Box as='span' fontWeight="bold" color="#222">{email || "your email"}</Box> to complete login.
            </Text>
          </VStack>

          <FormControl isInvalid={!!codeError} w="100%">
            <Text fontSize="14px" fontWeight="500" mb="3" color="#101011">
              6-Digit OTP Code
            </Text>
            <HStack spacing="3" justify="start">
              <PinInput
                type="number"
                value={code}
                onChange={(val) => {
                  setCode(val);
                  if (val.length === 6) {
                    setCodeError("");
                  }
                }}
                focusBorderColor="#39996B"
                size="lg"
                otp
              >
                <PinInputField border="2px solid #DDE5EC" />
                <PinInputField border="2px solid #DDE5EC" />
                <PinInputField border="2px solid #DDE5EC" />
                <PinInputField border="2px solid #DDE5EC" />
                <PinInputField border="2px solid #DDE5EC" />
                <PinInputField border="2px solid #DDE5EC" />
              </PinInput>
            </HStack>
            {codeError && <FormHelperText color="red.500">{codeError}</FormHelperText>}
          </FormControl>

          <Button
            isLoading={loading}
            onClick={handleVerify}
            disabled={loading}
          >
            Verify & Login
          </Button>
        </VStack>
      </Box>
    </AuthenticatedWrapper>
  );
}
