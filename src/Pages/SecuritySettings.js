import React, { useState, useEffect } from 'react'
import {
  HStack,
  Text,
  VStack,
  Flex,
  Switch,
  Box,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  InputGroup,
  InputRightElement,
  useDisclosure,
  useBreakpointValue,
} from '@chakra-ui/react'
import Button from "../Components/Button"
import ShowToast from '../Components/ToastNotification';
import { UpdateTwoFactorApi, ChangePasswordApi } from '../Utils/ApiCall';

const INITIAL_PASSWORD_FORM = {
  currentPassword: '',
  newPassword: '',
  confirmPassword: '',
};

export default function SecuritySettings() {
  const [loading, setLoading] = useState(false);
  const [showToast, setShowToast] = useState({ show: false, message: '', status: '' });

  // Security settings states
  const [twoFactorAuth, setTwoFactorAuth] = useState(false);
  const [loginNotifications, setLoginNotifications] = useState(false);

  // Change password modal states
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [passwordForm, setPasswordForm] = useState(INITIAL_PASSWORD_FORM);
  const [passwordErrors, setPasswordErrors] = useState({});
  const [passwordApiError, setPasswordApiError] = useState('');
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [showPasswords, setShowPasswords] = useState({
    currentPassword: false,
    newPassword: false,
    confirmPassword: false,
  });

  // Full screen (no overlay) on mobile + tablet, centered dialog from lg up
  const isFullScreen = useBreakpointValue({ base: true, lg: false }, { ssr: false });

  // Live mismatch check for Confirm New Password
  const confirmMismatch =
    passwordForm.confirmPassword.length > 0 &&
    passwordForm.newPassword !== passwordForm.confirmPassword;

  useEffect(() => {
    const userStr = localStorage.getItem("onlineUser");
    if (userStr) {
      try {
        const user = JSON.parse(userStr);
        if (user && user.twoFaActive !== undefined) {
          setTwoFactorAuth(user.twoFaActive);
        }
      } catch (error) {
        console.error("Error reading onlineUser from localStorage", error);
      }
    }
  }, []);

  const resetPasswordModal = () => {
    setPasswordForm(INITIAL_PASSWORD_FORM);
    setPasswordErrors({});
    setPasswordApiError('');
    setShowPasswords({ currentPassword: false, newPassword: false, confirmPassword: false });
  };

  const handleOpenPasswordModal = () => {
    resetPasswordModal();
    onOpen();
  };

  const handleClosePasswordModal = () => {
    if (passwordLoading) return;
    onClose();
    resetPasswordModal();
  };

  const handlePasswordInputChange = (field) => (e) => {
    const value = e.target.value;
    setPasswordForm((prev) => ({ ...prev, [field]: value }));
    setPasswordErrors((prev) => ({
      ...prev,
      [field]: '',
      // editing New Password also clears a stale confirm error
      ...(field === 'newPassword' ? { confirmPassword: '' } : {}),
    }));
    if (passwordApiError) setPasswordApiError('');
  };

  const toggleShowPassword = (field) => {
    setShowPasswords((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const validatePasswordForm = () => {
    const errors = {};
    const { currentPassword, newPassword, confirmPassword } = passwordForm;

    if (!currentPassword) errors.currentPassword = "Current password is required";

    if (!newPassword) {
      errors.newPassword = "New password is required";
    } else if (newPassword.length < 8) {
      errors.newPassword = "Password must be at least 8 characters";
    } else if (!/[A-Za-z]/.test(newPassword) || !/\d/.test(newPassword)) {
      errors.newPassword = "Password must contain letters and numbers";
    } else if (newPassword === currentPassword) {
      errors.newPassword = "New password must be different from current password";
    }

    if (!confirmPassword) {
      errors.confirmPassword = "Please confirm your new password";
    } else if (newPassword !== confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }

    setPasswordErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChangePasswordSubmit = async () => {
    if (!validatePasswordForm()) return;

    setPasswordLoading(true);
    setPasswordApiError('');
    try {
      const response = await ChangePasswordApi({
        oldPassword: passwordForm.currentPassword, // backend expects "oldPassword"
        newPassword: passwordForm.newPassword,
      });

      onClose();
      resetPasswordModal();
      setShowToast({
        show: true,
        message: response?.message || "Password changed successfully!",
        status: "success",
      });
      setTimeout(() => setShowToast({ show: false }), 3000);
    } catch (error) {
      setPasswordApiError(error.message || "Failed to change password");
    } finally {
      setPasswordLoading(false);
    }
  };

  const handlePasswordKeyDown = (e) => {
    if (e.key === 'Enter') handleChangePasswordSubmit();
  };

  const handleUpdate = async () => {
    setLoading(true);
    try {
      const response = await UpdateTwoFactorApi({ enabled: twoFactorAuth });

      const userStr = localStorage.getItem("onlineUser");
      if (userStr) {
        try {
          const user = JSON.parse(userStr);
          user.twoFaActive = twoFactorAuth;
          localStorage.setItem("onlineUser", JSON.stringify(user));
        } catch (e) {
          console.error("Error updating onlineUser in localStorage", e);
        }
      }

      setShowToast({ show: true, message: response.message || "Security settings updated!", status: "success" });
    } catch (error) {
      console.error(error.message);
      setShowToast({ show: true, message: error.message || "Update failed", status: "error" });
    } finally {
      setLoading(false);
      setTimeout(() => setShowToast({ show: false }), 3000);
    }
  };

  const passwordFields = [
    { key: 'currentPassword', label: 'Current Password', placeholder: 'Enter current password' },
    { key: 'newPassword', label: 'New Password', placeholder: 'Enter new password' },
    { key: 'confirmPassword', label: 'Confirm New Password', placeholder: 'Re-enter new password' },
  ];

  return (
    <>
      {showToast.show && (
        <ShowToast message={showToast.message} status={showToast.status} show={showToast.show} />
      )}

      <Box mt="12px" bg="#fff" border="2px solid #EFEFEF" py="20px" px={["8px", "8px", "18px", "18px"]} rounded="10px">
        <VStack alignItems="start">
          <VStack spacing="15px" w="100%">
            <HStack justifyContent="space-between" flexWrap={{ base: "wrap", md: "nowrap" }} w="100%">
              <Box w={{ base: "100%", md: "80%" }} mb={{ base: "10px", md: "0" }}>
                <Text fontSize="15px" fontWeight="500" lineHeight="18.15px" color="#1F2937">
                  Password Management
                </Text>
                <Text fontSize="13px" fontWeight="400" lineHeight="27px" color="#626974">
                  Update your password regularly to keep your account secure. Create a strong password with a mix of letters,
                  numbers, and special characters.
                </Text>
              </Box>
              <Box w={{ base: "100%", md: "20%" }} display="flex" justifyContent={{ base: "flex-start", md: "flex-end" }}>
                <Button
                  background="#fff"
                  color='#39996B'
                  onClick={handleOpenPasswordModal}
                  w={{ base: "100%", md: "auto" }}
                >
                  Change Password
                </Button>
              </Box>
            </HStack>
            <hr className="remove" />

            <HStack justifyContent="space-between" w="100%" flexWrap={{ base: "wrap", md: "nowrap" }}>
              <Box w={{ base: "100%", md: "95%" }} mb={{ base: "10px", md: "0" }}>
                <Text fontSize="15px" fontWeight="500" lineHeight="18.15px" color="#1F2937">
                  Two-Factor Authentication (2FA)
                </Text>
                <Text fontSize="13px" fontWeight="400" lineHeight="27px" color="#626974">
                  Add an extra layer of security to your account. Enable two-factor authentication to require a verification
                  code whenever you <br /> sign in from a new device.
                </Text>
              </Box>
              <Box w={{ base: "100%", md: "5%" }} display="flex" justifyContent={{ base: "flex-start", md: "flex-end" }}>
                <Switch
                  colorScheme="teal"
                  size="md"
                  isChecked={twoFactorAuth}
                  onChange={(e) => setTwoFactorAuth(e.target.checked)}
                />
              </Box>
            </HStack>
            <hr className="remove" />

            <HStack justifyContent="space-between" w="100%" flexWrap={{ base: "wrap", md: "nowrap" }}>
              <Box w={{ base: "100%", md: "95%" }} mb={{ base: "10px", md: "0" }}>
                <Text fontSize="15px" fontWeight="500" lineHeight="18.15px" color="#1F2937">
                  Login Notifications
                </Text>
                <Text fontSize="13px" fontWeight="400" lineHeight="27px" color="#626974">
                  Receive an alert each time your account is accessed from a new device or location. This helps to quickly
                  detect unauthorized <br /> access.
                </Text>
              </Box>
              <Box w={{ base: "100%", md: "5%" }} display="flex" justifyContent={{ base: "flex-start", md: "flex-end" }}>
                <Switch
                  colorScheme="teal"
                  size="md"
                  isChecked={loginNotifications}
                  onChange={(e) => setLoginNotifications(e.target.checked)}
                />
              </Box>
            </HStack>
          </VStack>
        </VStack>
      </Box>

      <Flex justifyContent="flex-end" alignItems="center" mt="20px">
        <Button
          w={{ base: "100%", md: "10%" }}
          onClick={handleUpdate}
          isLoading={loading}
          loadingText="Updating..."
        >
          Update
        </Button>
      </Flex>

      {/* Change Password Modal */}
      <Modal
        isOpen={isOpen}
        onClose={handleClosePasswordModal}
        isCentered={!isFullScreen}
        closeOnOverlayClick={!passwordLoading}
        size={isFullScreen ? "full" : "md"}
        motionPreset={isFullScreen ? "slideInBottom" : "scale"}
      >
        {/* Overlay only on desktop */}
        {!isFullScreen && <ModalOverlay />}
        <ModalContent
          m={isFullScreen ? "0" : undefined}
          rounded={isFullScreen ? "none" : "10px"}
          maxW={isFullScreen ? "100%" : "450px"}
          minH={isFullScreen ? "100dvh" : "450px"}
        >
          <ModalHeader fontSize="17px" fontWeight="600" color="#1F2937">
            Change Password
          </ModalHeader>
          <ModalCloseButton isDisabled={passwordLoading} />

          <ModalBody>
            <VStack spacing="16px" align="stretch">
              <Text fontSize="13px" color="#626974">
                Enter your current password, then choose a new one (at least 8 characters with letters and numbers).
              </Text>

              {passwordFields.map(({ key, label, placeholder }) => (
                <FormControl
                  key={key}
                  isInvalid={!!passwordErrors[key] || (key === 'confirmPassword' && confirmMismatch)}
                >
                  <FormLabel fontSize="13px" fontWeight="500" color="#1F2937">
                    {label}
                  </FormLabel>
                  <InputGroup>
                    <Input
                      name={`tapp-${key}`}
                      type={showPasswords[key] ? "text" : "password"}
                      placeholder={placeholder}
                      value={passwordForm[key]}
                      onChange={handlePasswordInputChange(key)}
                      onKeyDown={handlePasswordKeyDown}
                      fontSize="14px"
                      focusBorderColor="#39996B"
                      // "new-password" stops browsers from autofilling saved credentials
                      autoComplete="new-password"
                      // Fallback: browsers skip autofill on read-only inputs
                      readOnly={key === 'currentPassword' ? true : undefined}
                      onFocus={
                        key === 'currentPassword'
                          ? (e) => e.target.removeAttribute('readonly')
                          : undefined
                      }
                    />
                    <InputRightElement width="4.5rem">
                      <Text
                        as="button"
                        type="button"
                        fontSize="12px"
                        color="#39996B"
                        fontWeight="500"
                        onClick={() => toggleShowPassword(key)}
                      >
                        {showPasswords[key] ? "Hide" : "Show"}
                      </Text>
                    </InputRightElement>
                  </InputGroup>
                  <FormErrorMessage fontSize="12px">
                    {key === 'confirmPassword' && confirmMismatch
                      ? "Passwords do not match"
                      : passwordErrors[key]}
                  </FormErrorMessage>
                </FormControl>
              ))}

              {passwordApiError && (
                <Text fontSize="13px" color="red.500">
                  {passwordApiError}
                </Text>
              )}
            </VStack>
          </ModalBody>

          <ModalFooter gap="10px">
            <Button
              background="#fff"
              color="#39996B"
              onClick={handleClosePasswordModal}
              isDisabled={passwordLoading}
            >
              Cancel
            </Button>
            <Button
              onClick={handleChangePasswordSubmit}
              isLoading={passwordLoading}
              isDisabled={confirmMismatch}
              loadingText="Updating..."
            >
              Update Password
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}