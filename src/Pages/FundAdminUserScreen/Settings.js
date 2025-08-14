import React, { useState, useEffect } from 'react'
import MainLayout from '../../DashboardLayout'
import { Box, Text, Tabs, TabList, TabPanels, Tab, TabPanel, TabIndicator } from '@chakra-ui/react'
import ShowToast from '../../Components/ToastNotification';
import Preloader from "../../Components/Preloader"
import YourProfileSettings from '../YourProfileSettings'
import NotificationSettings from '../NotificationSettings'
import SecuritySettings from '../SecuritySettings'
import DocumentSettings from '../DocumentSettings'

import {
  GetAdminStats,
} from "../../Utils/ApiCall";

export default function Settings() {
  const [isLoading, setIsLoading] = useState(true);
  const [showToast, setShowToast] = useState({ show: false, message: '', status: '' });

  const fetchProfile = async () => {
    try {
      const data = await GetAdminStats(); // directly gets the data object
      console.log("Profile Data:", data);
    } catch (error) {
      console.error("Failed to fetch profile", error);
    } finally {
      setIsLoading(false); // Set isLoading to false after fetching profile
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);


  return (
    <MainLayout>
          {
            isLoading && <Preloader  />
          }
      {showToast.show && (
        <ShowToast message={showToast.message} status={showToast.status} show={showToast.show} />
      )}
      <Text color={"#1F2937"} fontWeight={"700"} fontSize={"24px"} lineHeight={"25.41px"}>Settings</Text>
      <Text mt="9px" color={"#686C75"} fontWeight={"400"} fontSize={"15px"} lineHeight={"24px"}>
        Configure your login credentials, set up two-factor authentication for added security, and adjust account preferences.
      </Text>

      <Box bg="#fff" border="1px solid #EFEFEF" mt="12px" py='17px' px={["10px", "10px", "18px", "18px"]} rounded='10px'>
        <Tabs>
          <TabList overflowX={"auto"} overflowY={"hidden"}>
            <Tab _focus={{ outline: "none" }} _selected={{ color: "green", borderColor: "green" }} fontSize={"14px"} fontWeight={"600"} lineHeight={"20px"}>Your Profile</Tab>
            <Tab _focus={{ outline: "none" }} _selected={{ color: "green", borderColor: "green" }} fontSize={"14px"} fontWeight={"600"} lineHeight={"20px"}>Notifications</Tab>
            <Tab _focus={{ outline: "none" }} _selected={{ color: "green", borderColor: "green" }} fontSize={"14px"} fontWeight={"600"} lineHeight={"20px"}>Securities</Tab>
            <Tab _focus={{ outline: "none" }} _selected={{ color: "green", borderColor: "green" }} fontSize={"14px"} fontWeight={"600"} lineHeight={"20px"}>My Documents</Tab>
          </TabList>

          <TabIndicator mt='-1.5px' height='2px' bg='green' borderRadius='1px' />

          <TabPanels>
            <TabPanel>
              <YourProfileSettings />
            </TabPanel>

            <TabPanel>
              <NotificationSettings />
            </TabPanel>

            <TabPanel>
              <SecuritySettings />
            </TabPanel>

            <TabPanel>
              <DocumentSettings />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </MainLayout>
  )
}
