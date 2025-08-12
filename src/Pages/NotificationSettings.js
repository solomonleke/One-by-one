import React, { useState } from 'react'
import { HStack, Text, VStack, Flex, Switch, Box } from '@chakra-ui/react'
import Button from "../Components/Button"
import ShowToast from '../Components/ToastNotification';

export default function NotificationSettings() {
  const [loading, setLoading] = useState(false);
  const [showToast, setShowToast] = useState({ show: false, message: '', status: '' });
  
  // Notification settings states
  const [receiveAllNotifications, setReceiveAllNotifications] = useState(false);
  const [activityAlerts, setActivityAlerts] = useState(false);
  const [updatesNewsletters, setUpdatesNewsletters] = useState(false);
  const [emailNotifications, setEmailNotifications] = useState(false);
  const [pushNotifications, setPushNotifications] = useState(false);

  const handleUpdate = async () => {
    setLoading(true);
    try {
      // API call to update notification settings would go here
      // await UpdateNotificationSettings({
      //   receiveAllNotifications,
      //   activityAlerts,
      //   updatesNewsletters,
      //   emailNotifications,
      //   pushNotifications
      // });

      setShowToast({ show: true, message: "Notification settings updated!", status: "success" });
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
      
      <Box mt="12px" bg="#fff" border="2px solid #EFEFEF" py='20px' px={["8px", "8px", "18px", "18px"]} rounded='10px'>
        <VStack alignItems={"start"}>
          <VStack spacing={"15px"} w="100%">
            <HStack justifyContent="space-between" w="100%">
              <Box w={["90%", "90%", "95%", "95%"]}>
                <Text fontSize={"15px"} fontWeight={"500"} lineHeight={"18.15px"} color={"#1F2937"}>Receive All Notifications</Text>
                <Text fontSize={"13px"} fontWeight={"400"} lineHeight={"27px"} color={"#626974"}>Stay updated with all our latest news and alerts.</Text>
              </Box>
              <Box w={["10%", "10%", "5%", "5%"]}>
                <Switch 
                  colorScheme="teal" 
                  size="md" 
                  isChecked={receiveAllNotifications}
                  onChange={(e) => setReceiveAllNotifications(e.target.checked)}
                />
              </Box>
            </HStack>
            <hr className="remove" />
            
            <HStack justifyContent="space-between" w="100%">
              <Box w={["90%", "90%", "95%", "95%"]}>
                <Text fontSize={"15px"} fontWeight={"500"} lineHeight={"18.15px"} color={"#1F2937"}>Activity Alerts</Text>
                <Text fontSize={"13px"} fontWeight={"400"} lineHeight={"27px"} color={"#626974"}>Get notified about account activity and important interactions.</Text>
              </Box>
              <Box w={["10%", "10%", "5%", "5%"]}>
                <Switch 
                  colorScheme="teal" 
                  size="md" 
                  isChecked={activityAlerts}
                  onChange={(e) => setActivityAlerts(e.target.checked)}
                />
              </Box>
            </HStack>
            <hr className="remove" />
            
            <HStack justifyContent="space-between" w="100%">
              <Box w={["90%", "90%", "95%", "95%"]}>
                <Text fontSize={"15px"} fontWeight={"500"} lineHeight={"18.15px"} color={"#1F2937"}>Updates and Newsletters</Text>
                <Text fontSize={"13px"} fontWeight={"400"} lineHeight={"27px"} color={"#626974"}>Regular updates on new features and our monthly newsletter.</Text>
              </Box>
              <Box w={["10%", "10%", "5%", "5%"]}>
                <Switch 
                  colorScheme="teal" 
                  size="md" 
                  isChecked={updatesNewsletters}
                  onChange={(e) => setUpdatesNewsletters(e.target.checked)}
                />
              </Box>
            </HStack>
            <hr className="remove" />
            
            <HStack justifyContent="space-between" w="100%">
              <Box w={["90%", "90%", "95%", "95%"]}>
                <Text fontSize={"15px"} fontWeight={"500"} lineHeight={"18.15px"} color={"#1F2937"}>Email Notifications</Text>
                <Text fontSize={"13px"} fontWeight={"400"} lineHeight={"27px"} color={"#626974"}>Opt to receive notifications as emails instead of app alerts.</Text>
              </Box>
              <Box w={["10%", "10%", "5%", "5%"]}>
                <Switch 
                  colorScheme="teal" 
                  size="md" 
                  isChecked={emailNotifications}
                  onChange={(e) => setEmailNotifications(e.target.checked)}
                />
              </Box>
            </HStack>
            <hr className="remove" />
            
            <HStack justifyContent="space-between" w="100%">
              <Box w={["90%", "90%", "95%", "95%"]}>
                <Text fontSize={"15px"} fontWeight={"500"} lineHeight={"18.15px"} color={"#1F2937"}>Push Notifications</Text>
                <Text fontSize={"13px"} fontWeight={"400"} lineHeight={"27px"} color={"#626974"}>Immediate alerts directly to your device.</Text>
              </Box>
              <Box w={["10%", "10%", "5%", "5%"]}>
                <Switch 
                  colorScheme="teal" 
                  size="md" 
                  isChecked={pushNotifications}
                  onChange={(e) => setPushNotifications(e.target.checked)}
                />
              </Box>
            </HStack>
          </VStack>
        </VStack>
      </Box>
      
      <Flex justifyContent="flex-end" alignItems="center" mt="20px">
        <Button 
          w="10%" 
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
