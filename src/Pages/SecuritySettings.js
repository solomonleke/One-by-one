import React, { useState } from 'react'
import { HStack, Text, VStack, Flex, Switch, Box } from '@chakra-ui/react'
import Button from "../Components/Button"
import ShowToast from '../Components/ToastNotification';

export default function SecuritySettings() {
  const [loading, setLoading] = useState(false);
  const [showToast, setShowToast] = useState({ show: false, message: '', status: '' });
  
  // Security settings states
  const [twoFactorAuth, setTwoFactorAuth] = useState(false);
  const [loginNotifications, setLoginNotifications] = useState(false);

  const handleChangePassword = () => {
    // Logic for password change would go here
    setShowToast({ show: true, message: "Password change functionality to be implemented", status: "info" });
    setTimeout(() => setShowToast({ show: false }), 3000);
  };

  const handleUpdate = async () => {
    setLoading(true);
    try {
      // API call to update security settings would go here
      // await UpdateSecuritySettings({
      //   twoFactorAuth,
      //   loginNotifications
      // });

      setShowToast({ show: true, message: "Security settings updated!", status: "success" });
    } catch (error) {
      console.error(error.message);
      setShowToast({ show: true, message: "Update failed", status: "error" });
    } finally {
      setLoading(false);
      setTimeout(() => setShowToast({ show: false }), 3000);
    }
  };

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
                  onClick={handleChangePassword}
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
    </>
  )
}
