import React from 'react'
import MainLayout from '../../DashboardLayout'
import Button from "../../Components/Button"
import Input from "../../Components/Input"
import { ReactComponent as EditIcon } from "../../Asset/editIcon.svg";
import { ReactComponent as ProfilePicture } from "../../Asset/profileImage.svg"
import { Box, HStack, Text, VStack, Flex, Tabs, Switch, TabList, TabPanels, Tab, TabPanel, TabIndicator } from '@chakra-ui/react'

export default function Settings() {
  return (
    <MainLayout>
      <Text color={"#1F2937"} fontWeight={"700"} fontSize={"24px"} lineHeight={"25.41px"}>Settings</Text>
      <Text mt="9px" color={"#686C75"} fontWeight={"400"} fontSize={"15px"} lineHeight={"24px"}>
        Configure your login credentials, set up two-factor authentication for added security, and adjust account preferences.
      </Text>

      <Box bg="#fff" border="1px solid #EFEFEF" mt="12px" py='17px' px="18px" rounded='10px'>
        <Tabs>
          <TabList>
            <Tab _selected={{ color: "green", borderColor: "green" }} fontSize={"14px"} fontWeight={"600"} lineHeight={"20px"}>Your Profile</Tab>
            <Tab _selected={{ color: "green", borderColor: "green" }} fontSize={"14px"} fontWeight={"600"} lineHeight={"20px"}>Notifications</Tab>
            <Tab _selected={{ color: "green", borderColor: "green" }} fontSize={"14px"} fontWeight={"600"} lineHeight={"20px"}>Securities</Tab>
          </TabList>

          <TabIndicator mt='-1.5px' height='2px' bg='green' borderRadius='1px' />

          <TabPanels>
            <TabPanel>
              <Box mt="12px" bg="#fff" border="2px solid #EFEFEF" py='30px' px="18px" rounded='10px'>
                <Text fontSize={"17px"} fontWeight={"600"} lineHeight={"20.57px"} color={"#1F2937"}>Personal Information</Text>
                <Text fontSize={"13px"} fontWeight={"400"} lineHeight={"27px"} color={"#626974"}>Manage and update your profile information, including contact details and profile photo.</Text>

                <VStack alignItems={"start"}>

                  <VStack mt={"20px"} spacing={"15px"} w="100%">
                    <hr className="remove" />
                    <HStack justifyContent="space-between" w="100%">
                      <Box w="30%">
                        <Text fontSize={"14px"} fontWeight={"500"} lineHeight={"22px"} color={"#1F2937"}>First Name</Text>
                      </Box>
                      <Box w="70%">
                        <Input placeholder='Kena' />
                      </Box>
                    </HStack>
                    <hr className="remove" />
                    <HStack justifyContent="space-between" w="100%">
                      <Box w="30%">
                        <Text fontSize={"14px"} fontWeight={"500"} lineHeight={"22px"} color={"#1F2937"}>Last Name</Text>
                      </Box>
                      <Box w="70%">
                        <Input placeholder='Wilson' />
                      </Box>
                    </HStack>
                    <hr className="remove" />
                    <HStack justifyContent="space-between" w="100%">
                      <Box w="30%">
                        <Text fontSize={"14px"} fontWeight={"500"} lineHeight={"22px"} color={"#1F2937"}>Email</Text>
                      </Box>
                      <Box w="70%">
                        <Input placeholder='kenawilson991@gmail.com' />
                      </Box>
                    </HStack>
                    <hr className="remove" />
                    <HStack justifyContent="space-between" w="100%">
                      <Box w="30%">
                        <Text fontSize={"14px"} fontWeight={"500"} lineHeight={"22px"} color={"#1F2937"}>Profile Picture</Text>
                      </Box>
                      <Box w="70%">
                        <HStack spacing={"30px"}>
                          <ProfilePicture />
                          <HStack borderWidth={"1px"} cursor={"pointer"} borderColor={"#39996B"} fontWeight={"500"} color={"#39996B"} borderRadius={"8px"} px={"20px"} py={"8px"}>
                            <Text>Edit</Text>
                            <Box as='span'><EditIcon display={"inline-block"} /></Box>
                          </HStack>
                        </HStack>
                      </Box>
                    </HStack>
                    <hr className="remove" />
                    <HStack justifyContent="space-between" w="100%">
                      <Box w="30%">
                        <Text fontSize={"14px"} fontWeight={"500"} lineHeight={"22px"} color={"#1F2937"}>Tell Us About You</Text>
                      </Box>
                      <Box w="70%">
                        <Box mt="12px" bg="#fff" border="2px solid #EFEFEF" py='17px' px="18px" rounded='10px'>
                          <Text fontSize={"14px"} fontWeight={"400"} lineHeight={"31px"} color={"#626974"}>I’m the Vice Principal at <Box as="span" fontWeight={"700"}>Legacy Scholars Academy,</Box> where I’ve been working for over five years. I oversee student performance and coordinate extracurricular programs. My passion for education comes from a deep belief in the potential of every child, and I strive to create an environment where students feel empowered to achieve their dreams. Outside of work, I love playing the guitar and exploring new cuisines!</Text>
                        </Box>
                      </Box>
                    </HStack>
                  </VStack>
                </VStack>
              </Box>
              <Flex justifyContent="flex-end" alignItems="center" mt="20px">
    <Button w="10%">Update</Button>
  </Flex>
            </TabPanel>


            <TabPanel>
              <Box mt="12px" bg="#fff" border="2px solid #EFEFEF" py='20px' px="18px" rounded='10px'>
                <VStack alignItems={"start"}>

                  <VStack spacing={"15px"} w="100%">
                  <HStack justifyContent="space-between" w="100%">
                      <Box w="95%">
                        <Text fontSize={"15px"} fontWeight={"500"} lineHeight={"18.15px"} color={"#1F2937"}>Receive All Notifications</Text>
                        <Text fontSize={"13px"} fontWeight={"400"} lineHeight={"27px"} color={"#626974"}>Stay updated with all our latest news and alerts.</Text>
                      </Box>
                      <Box w="5%">
                         <Switch colorScheme="teal" size="md" />
                      </Box>
                    </HStack>
                    <hr className="remove" />
                    <HStack justifyContent="space-between" w="100%">
                      <Box w="95%">
                        <Text fontSize={"15px"} fontWeight={"500"} lineHeight={"18.15px"} color={"#1F2937"}>Activity Alerts</Text>
                        <Text fontSize={"13px"} fontWeight={"400"} lineHeight={"27px"} color={"#626974"}>Get notified about account activity and important interactions.</Text>
                      </Box>
                      <Box w="5%">
                      <Switch colorScheme="teal" size="md" />
                      </Box>
                    </HStack>
                    <hr className="remove" />
                    <HStack justifyContent="space-between" w="100%">
                      <Box w="95%">
                        <Text fontSize={"15px"} fontWeight={"500"} lineHeight={"18.15px"} color={"#1F2937"}>Updates and Newsletters</Text>
                        <Text fontSize={"13px"} fontWeight={"400"} lineHeight={"27px"} color={"#626974"}>Regular updates on new features and our monthly newsletter.</Text>
                      </Box>
                      <Box w="5%">
                      <Switch colorScheme="teal" size="md" />
                      </Box>
                    </HStack>
                    <hr className="remove" />
                    <HStack justifyContent="space-between" w="100%">
                      <Box w="95%">
                        <Text fontSize={"15px"} fontWeight={"500"} lineHeight={"18.15px"} color={"#1F2937"}>Email Notifications</Text>
                        <Text fontSize={"13px"} fontWeight={"400"} lineHeight={"27px"} color={"#626974"}>Opt to receive notifications as emails instead of app alerts.</Text>
                      </Box>
                      <Box w="5%">
                      <Switch colorScheme="teal" size="md" />
                      </Box>
                    </HStack>
                    <hr className="remove" />
                    <HStack justifyContent="space-between" w="100%">
                      <Box w="95%">
                        <Text fontSize={"15px"} fontWeight={"500"} lineHeight={"18.15px"} color={"#1F2937"}>Push Notifications</Text>
                        <Text fontSize={"13px"} fontWeight={"400"} lineHeight={"27px"} color={"#626974"}>Immediate alerts directly to your device.</Text>
                      </Box>
                      <Box w="5%">
                      <Switch colorScheme="teal" size="md" />
                      </Box>
                    </HStack>
                  </VStack>
                </VStack>
              </Box>
              <Flex justifyContent="flex-end" alignItems="center" mt="20px">
    <Button w="10%">Update</Button>
  </Flex>
            </TabPanel>

            <TabPanel>
  <Box mt="12px" bg="#fff" border="2px solid #EFEFEF" py="20px" px="18px" rounded="10px">
    <VStack alignItems="start">
      <VStack spacing="15px" w="100%">
        <HStack justifyContent="space-between" w="100%">
          <Box w="85%">
            <Text fontSize="15px" fontWeight="500" lineHeight="18.15px" color="#1F2937">
              Password Management
            </Text>
            <Text fontSize="13px" fontWeight="400" lineHeight="27px" color="#626974">
              Update your password regularly to keep your account secure. Create a strong password with a mix of letters,
              numbers, and special characters.
            </Text>
          </Box>
          <Box w="15%">
            <HStack
              borderWidth="1px"
              cursor="pointer"
              borderColor="#39996B"
              fontWeight="500"
              color="#39996B"
              borderRadius="8px"
              px="8px"
              py="8px"
            >
              <Text fontSize="14px" fontWeight="500" lineHeight="22px">
                Change Password
              </Text>
            </HStack>
          </Box>
        </HStack>
        <hr className="remove" />
        <HStack justifyContent="space-between" w="100%">
          <Box w="95%">
            <Text fontSize="15px" fontWeight="500" lineHeight="18.15px" color="#1F2937">
              Two-Factor Authentication (2FA)
            </Text>
            <Text fontSize="13px" fontWeight="400" lineHeight="27px" color="#626974">
              Add an extra layer of security to your account. Enable two-factor authentication to require a verification
              code whenever you <br /> sign in from a new device.
            </Text>
          </Box>
          <Box w="5%">
            <Switch colorScheme="teal" size="md" />
          </Box>
        </HStack>
        <hr className="remove" />
        <HStack justifyContent="space-between" w="100%">
          <Box w="95%">
            <Text fontSize="15px" fontWeight="500" lineHeight="18.15px" color="#1F2937">
              Login Notifications
            </Text>
            <Text fontSize="13px" fontWeight="400" lineHeight="27px" color="#626974">
              Receive an alert each time your account is accessed from a new device or location. This helps to quickly
              detect unauthorized <br /> access.
            </Text>
          </Box>
          <Box w="5%">
            <Switch colorScheme="teal" size="md" />
          </Box>
        </HStack>
      </VStack>
    </VStack>
  </Box>
  <Flex justifyContent="flex-end" alignItems="center" mt="20px">
    <Button w="10%">Update</Button>
  </Flex>
</TabPanel>

          </TabPanels>
        </Tabs>
      </Box>
    </MainLayout>
  )
}
