import React from 'react'
import MainLayout from '../../DashboardLayout'
import Button from "../../Components/Button"
import Input from "../../Components/Input"
import { ReactComponent as EditIcon } from "../../Asset/editIcon.svg";
import { ReactComponent as Warning } from "../../Asset/warning.svg";
import { ReactComponent as Close } from "../../Asset/close.svg";
import { ReactComponent as ProfilePicture } from "../../Asset/profileImage.svg"
import { Box, HStack, Text, VStack, Flex, Tabs, Switch, Stack, TabList, Spacer, TabPanels, Tab, TabPanel, TabIndicator } from '@chakra-ui/react'
import { FaCloudUploadAlt } from 'react-icons/fa';

export default function Settings() {
  return (
    <MainLayout>
      <Text color={"#1F2937"} fontWeight={"700"} fontSize={"24px"} lineHeight={"25.41px"}>Settings</Text>
      <Text mt="9px" color={"#686C75"} fontWeight={"400"} fontSize={"15px"} lineHeight={"24px"}>
        Configure your login credentials, set up two-factor authentication for added security, and adjust account preferences.
      </Text>

      <Box bg="#fff" border="1px solid #EFEFEF" mt="12px" py='17px' px={["10px","10px","18px","18px"]} rounded='10px'>
        <Tabs>
          <TabList overflowX={"auto"} overflowY={"hidden"}>
            <Tab _selected={{ color: "green", borderColor: "green" }} fontSize={"14px"} fontWeight={"600"} lineHeight={"20px"}>Your Profile</Tab>
            <Tab _selected={{ color: "green", borderColor: "green" }} fontSize={"14px"} fontWeight={"600"} lineHeight={"20px"}>Notifications</Tab>
            <Tab _selected={{ color: "green", borderColor: "green" }} fontSize={"14px"} fontWeight={"600"} lineHeight={"20px"}>Securities</Tab>
            <Tab _selected={{ color: "green", borderColor: "green" }} fontSize={"14px"} fontWeight={"600"} lineHeight={"20px"}>My Documents</Tab>
          </TabList>

          <TabIndicator mt='-1.5px' height='2px' bg='green' borderRadius='1px' />

          <TabPanels>
            <TabPanel>
              <Box mt="12px" bg="#fff" border="2px solid #EFEFEF" py='30px' px={["8px","8px","18px","18px"]} rounded='10px'>
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
                    <HStack justifyContent="space-between" w="100%" flexWrap={["wrap","wrap","no-wrap","no-wrap"]}>
                      <Box w={["100%","100%","30%","30%"]}>
                        <Text fontSize={"14px"} textAlign={["center","center","left","left"]} fontWeight={"500"} lineHeight={"22px"} color={"#1F2937"}>Tell Us About You</Text>
                      </Box>
                      <Box w={["100%","100%","70%","70%"]}>
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
              <Box mt="12px" bg="#fff" border="2px solid #EFEFEF" py='20px' px={["8px","8px","18px","18px"]} rounded='10px'>
                <VStack alignItems={"start"}>

                  <VStack spacing={"15px"} w="100%">
                    <HStack justifyContent="space-between" w="100%">
                      <Box w={["90%","90%","95%","95%"]}>
                        <Text fontSize={"15px"} fontWeight={"500"} lineHeight={"18.15px"} color={"#1F2937"}>Receive All Notifications</Text>
                        <Text fontSize={"13px"} fontWeight={"400"} lineHeight={"27px"} color={"#626974"}>Stay updated with all our latest news and alerts.</Text>
                      </Box>
                      <Box w={["10%","10%","5%","5%"]}>
                        <Switch colorScheme="teal" size="md" />
                      </Box>
                    </HStack>
                    <hr className="remove" />
                    <HStack justifyContent="space-between" w="100%">
                      <Box w={["90%","90%","95%","95%"]}>
                        <Text fontSize={"15px"} fontWeight={"500"} lineHeight={"18.15px"} color={"#1F2937"}>Activity Alerts</Text>
                        <Text fontSize={"13px"} fontWeight={"400"} lineHeight={"27px"} color={"#626974"}>Get notified about account activity and important interactions.</Text>
                      </Box>
                      <Box w={["10%","10%","5%","5%"]}>
                        <Switch colorScheme="teal" size="md" />
                      </Box>
                    </HStack>
                    <hr className="remove" />
                    <HStack justifyContent="space-between" w="100%">
                      <Box w={["90%","90%","95%","95%"]}>
                        <Text fontSize={"15px"} fontWeight={"500"} lineHeight={"18.15px"} color={"#1F2937"}>Updates and Newsletters</Text>
                        <Text fontSize={"13px"} fontWeight={"400"} lineHeight={"27px"} color={"#626974"}>Regular updates on new features and our monthly newsletter.</Text>
                      </Box>
                      <Box w={["10%","10%","5%","5%"]}>
                        <Switch colorScheme="teal" size="md" />
                      </Box>
                    </HStack>
                    <hr className="remove" />
                    <HStack justifyContent="space-between" w="100%">
                      <Box w={["90%","90%","95%","95%"]}>
                        <Text fontSize={"15px"} fontWeight={"500"} lineHeight={"18.15px"} color={"#1F2937"}>Email Notifications</Text>
                        <Text fontSize={"13px"} fontWeight={"400"} lineHeight={"27px"} color={"#626974"}>Opt to receive notifications as emails instead of app alerts.</Text>
                      </Box>
                      <Box w={["10%","10%","5%","5%"]}>
                        <Switch colorScheme="teal" size="md" />
                      </Box>
                    </HStack>
                    <hr className="remove" />
                    <HStack justifyContent="space-between" w="100%">
                      <Box w={["90%","90%","95%","95%"]}>
                        <Text fontSize={"15px"} fontWeight={"500"} lineHeight={"18.15px"} color={"#1F2937"}>Push Notifications</Text>
                        <Text fontSize={"13px"} fontWeight={"400"} lineHeight={"27px"} color={"#626974"}>Immediate alerts directly to your device.</Text>
                      </Box>
                      <Box w={["10%","10%","5%","5%"]}>
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
              <Box mt="12px" bg="#fff" border="2px solid #EFEFEF" py="20px" px={["8px","8px","18px","18px"]} rounded="10px">
                <VStack alignItems="start">
                  <VStack spacing="15px" w="100%">
                    <HStack justifyContent="space-between" flexWrap={["wrap","wrap","nowrap","nowrap"]} w="100%">
                      <Box w={["100%","100%","80%","80%"]}>
                        <Text fontSize="15px" fontWeight="500" lineHeight="18.15px" color="#1F2937">
                          Password Management
                        </Text>
                        <Text fontSize="13px" fontWeight="400" lineHeight="27px" color="#626974">
                          Update your password regularly to keep your account secure. Create a strong password with a mix of letters,
                          numbers, and special characters.
                        </Text>
                      </Box>
                      <Box w={["40%","40%","20%","20%"]} alignItems={"start"}>
                        <Button background="#fff" color='#39996B'>Change Password</Button>
                      </Box>
                    </HStack>
                    <hr className="remove" />
                    <HStack justifyContent="space-between" w="100%">
                      <Box w={["90%","90%","95%","95%"]}>
                        <Text fontSize="15px" fontWeight="500" lineHeight="18.15px" color="#1F2937">
                          Two-Factor Authentication (2FA)
                        </Text>
                        <Text fontSize="13px" fontWeight="400" lineHeight="27px" color="#626974">
                          Add an extra layer of security to your account. Enable two-factor authentication to require a verification
                          code whenever you <br /> sign in from a new device.
                        </Text>
                      </Box>
                      <Box w={["10%","10%","5%","5%"]}>
                        <Switch colorScheme="teal" size="md" />
                      </Box>
                    </HStack>
                    <hr className="remove" />
                    <HStack justifyContent="space-between" w="100%">
                      <Box w={["90%","90%","95%","95%"]}>
                        <Text fontSize="15px" fontWeight="500" lineHeight="18.15px" color="#1F2937">
                          Login Notifications
                        </Text>
                        <Text fontSize="13px" fontWeight="400" lineHeight="27px" color="#626974">
                          Receive an alert each time your account is accessed from a new device or location. This helps to quickly
                          detect unauthorized <br /> access.
                        </Text>
                      </Box>
                      <Box w={["10%","10%","5%","5%"]}>
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
              <Stack spacing={"24px"}>
                <Stack mt={"10px"}>
            <Text fontSize={"17px"} fontWeight={"600"} color={"#1F2937"}>Verification Documents</Text>
            <Text fontSize={"13px"} fontWeight={"400"} color={"#626974"}>Manage and upload the required documents to complete your school’s verification process.</Text>
            </Stack>

            <Box backgroundColor={"#FFF7EB"} py={"14px"} px={"20px"} rounded={"6px"} border={"1px solid #FFA30C80"} id='close'>
              <HStack justifyContent={"space-between"}>
              <HStack>
               <Warning />
              <Text fontSize={"14px"} fontWeight={"400"} color={"#FFA30C"}>Your school cannot be verified until all required documents are uploaded. Ensure the following documents below are uploaded</Text>
              </HStack>
              <Close cursor={"pointer"} id='closer'/>
              </HStack>
            </Box>

            <hr className="remove"/>

<HStack justifyContent={"space-between"} flexWrap={["wrap","wrap","nowrap","nowrap"]}>
            <Stack alignItems="start">
      <Text
        textTransform="capitalize"
        fontWeight="500"
        fontSize="13px"
        color="#626974"
        fontFamily="heading"
      >
        Certificate of Incorporation
      </Text>
      <Box
        backgroundColor="#E9FFF5"
        py="20px"
        px={["10px","10px","100px","100px"]}
        cursor="pointer"
        borderRadius="8px"
        borderWidth="2px"
        borderStyle="dashed"
      >
        <label htmlFor="FrontSide" className="label">
          <VStack>
            <HStack>
              <FaCloudUploadAlt className="labelText" />
              <Text>
                <span className="labelText">Click to Upload or</span>
                <span className="drag"> drag and drop</span>
              </Text>
            </HStack>

            <Text
              fontSize="small"
              fontWeight="normal"
              color="#6B7280"
              lineHeight="24px"
            >
              PDF, JPG, JPEG, PNG less than 10MB
            </Text>
          </VStack>
        </label>
        <input
          type="file"
          id="FrontSide"
          className="uploadVerification"
          style={{ display: "none" }}
        />
      </Box>
    </Stack>

    <Stack alignItems="start">
      <Text
        textTransform="capitalize"
        fontWeight="500"
        fontSize="13px"
        color="#626974"
        fontFamily="heading"
      >
        Tax Identification Number (TIN)
      </Text>
      <Box
        backgroundColor="#E9FFF5"
        py="20px"
        px={["8px","8px","100px","100px"]}
        cursor="pointer"
        borderRadius="8px"
        borderWidth="2px"
        borderStyle="dashed"
      >
        <label htmlFor="FrontSide" className="label">
          <VStack>
            <HStack>
              <FaCloudUploadAlt className="labelText" />
              <Text>
                <span className="labelText">Click to Upload or</span>
                <span className="drag"> drag and drop</span>
              </Text>
            </HStack>

            <Text
              fontSize="small"
              fontWeight="normal"
              color="#6B7280"
              lineHeight="24px"
            >
              PDF, JPG, JPEG, PNG less than 10MB
            </Text>
          </VStack>
        </label>
        <input
          type="file"
          id="FrontSide"
          className="uploadVerification"
          style={{ display: "none" }}
        />
      </Box>
    </Stack>
    </HStack>

    <HStack justifyContent={"space-between"} flexWrap={["wrap","wrap","nowrap","nowrap"]}>
            <Stack alignItems="start">
      <Text
        textTransform="capitalize"
        fontWeight="500"
        fontSize="13px"
        color="#626974"
        fontFamily="heading"
      >
        Ministry of Education Approval Letter
      </Text>
      <Box
        backgroundColor="#E9FFF5"
        py="20px"
        px={["10px","10px","100px","100px"]}
        cursor="pointer"
        borderRadius="8px"
        borderWidth="2px"
        borderStyle="dashed"
      >
        <label htmlFor="FrontSide" className="label">
          <VStack>
            <HStack>
              <FaCloudUploadAlt className="labelText" />
              <Text>
                <span className="labelText">Click to Upload or</span>
                <span className="drag"> drag and drop</span>
              </Text>
            </HStack>

            <Text
              fontSize="small"
              fontWeight="normal"
              color="#6B7280"
              lineHeight="24px"
            >
              PDF, JPG, JPEG, PNG less than 10MB
            </Text>
          </VStack>
        </label>
        <input
          type="file"
          id="FrontSide"
          className="uploadVerification"
          style={{ display: "none" }}
        />
      </Box>
    </Stack>

    <Stack alignItems="start">
      <Text
        textTransform="capitalize"
        fontWeight="500"
        fontSize="13px"
        color="#626974"
        fontFamily="heading"
      >
        School Registration Certificate
      </Text>
      <Box
        backgroundColor="#E9FFF5"
        py="20px"
        px={["8px","8px","100px","100px"]}
        cursor="pointer"
        borderRadius="8px"
        borderWidth="2px"
        borderStyle="dashed"
      >
        <label htmlFor="FrontSide" className="label">
          <VStack>
            <HStack>
              <FaCloudUploadAlt className="labelText" />
              <Text>
                <span className="labelText">Click to Upload or</span>
                <span className="drag"> drag and drop</span>
              </Text>
            </HStack>

            <Text
              fontSize="small"
              fontWeight="normal"
              color="#6B7280"
              lineHeight="24px"
            >
              PDF, JPG, JPEG, PNG less than 10MB
            </Text>
          </VStack>
        </label>
        <input
          type="file"
          id="FrontSide"
          className="uploadVerification"
          style={{ display: "none" }}
        />
      </Box>
    </Stack>
    </HStack>

    <hr className="remove"/>

    <Stack>
            <Text fontSize={"15px"} fontWeight={"700"} color={"#1F2937"}>Principal’s Verification ID</Text>
            <Text fontSize={"13px"} fontWeight={"400"} color={"#6B7280"}>Upload a valid ID for legitimacy verification (e.g., national ID, passport).</Text>
            </Stack>

            <HStack justifyContent={"space-between"} flexWrap={["wrap","wrap","nowrap","nowrap"]}>
            <Stack alignItems="start">
      <Text
        textTransform="capitalize"
        fontWeight="500"
        fontSize="13px"
        color="#626974"
        fontFamily="heading"
      >
       Front Side
      </Text>
      <Box
        backgroundColor="#E9FFF5"
        py="20px"
        px={["10px","10px","100px","100px"]}
        cursor="pointer"
        borderRadius="8px"
        borderWidth="2px"
        borderStyle="dashed"
      >
        <label htmlFor="FrontSide" className="label">
          <VStack>
            <HStack>
              <FaCloudUploadAlt className="labelText" />
              <Text>
                <span className="labelText">Click to Upload or</span>
                <span className="drag"> drag and drop</span>
              </Text>
            </HStack>

            <Text
              fontSize="small"
              fontWeight="normal"
              color="#6B7280"
              lineHeight="24px"
            >
              PDF, JPG, JPEG, PNG less than 10MB
            </Text>
          </VStack>
        </label>
        <input
          type="file"
          id="FrontSide"
          className="uploadVerification"
          style={{ display: "none" }}
        />
      </Box>
    </Stack>

    <Spacer />

    <Stack alignItems="start">
      <Text
        textTransform="capitalize"
        fontWeight="500"
        fontSize="13px"
        color="#626974"
        fontFamily="heading"
      >
        Back Side
      </Text>
      <Box
        backgroundColor="#E9FFF5"
        py="20px"
        px={["8px","8px","100px","100px"]}
        cursor="pointer"
        borderRadius="8px"
        borderWidth="2px"
        borderStyle="dashed"
      >
        <label htmlFor="FrontSide" className="label">
          <VStack>
            <HStack>
              <FaCloudUploadAlt className="labelText" />
              <Text>
                <span className="labelText">Click to Upload or</span>
                <span className="drag"> drag and drop</span>
              </Text>
            </HStack>

            <Text
              fontSize="small"
              fontWeight="normal"
              color="#6B7280"
              lineHeight="24px"
            >
              PDF, JPG, JPEG, PNG less than 10MB
            </Text>
          </VStack>
        </label>
        <input
          type="file"
          id="FrontSide"
          className="uploadVerification"
          style={{ display: "none" }}
        />
      </Box>
    </Stack>
    </HStack>
            </Stack>
            <Flex justifyContent="flex-end" alignItems="center" mt="40px">
                <Button w="10%">Save Changes</Button>
              </Flex>
            </TabPanel>

          </TabPanels>
        </Tabs>
      </Box>
    </MainLayout>
  )
}
