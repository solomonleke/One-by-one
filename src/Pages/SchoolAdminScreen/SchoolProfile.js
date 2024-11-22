import { Avatar, Box, Flex, HStack, VStack, Select, Menu, MenuButton, MenuItem, MenuList, Tab, TabIndicator, TabList, TabPanel, TabPanels, Tabs, Text, Image } from '@chakra-ui/react'
import React from 'react'
import { BsQuestionCircle } from "react-icons/bs"
import { CgMenuLeft } from "react-icons/cg"
import { CiSearch } from 'react-icons/ci'
import { IoIosArrowDown, IoMdNotificationsOutline } from 'react-icons/io'
import { MdLogout } from "react-icons/md"
import SearchInput from '../../Components/SearchInput'
import Input from '../../Components/Input'
import Button from '../../Components/Button'
import logo from "../../Asset/whiteLogo.svg"
import { FaArrowLeft, FaCloudUploadAlt } from "react-icons/fa";

export default function SchoolProfile() {

  const ReadNotification = (id) => {
    // alert(id)

    // alert("we dey here ")


  }
  return (
    <VStack alignItems="start" justifyContent="start">
      <Flex pos="sticky" top="0" bgColor={"white"} alignItems={"center"} justifyContent={"space-between"} zIndex={"10"} px="24px" py="15.6px" borderBottom={"2px solid #EDEFF2"}>

        <Flex justifyContent="flex-start">
          <HStack>
            <Flex alignItems="center" gap="30px">
              <Image px="0px" py='4px' src={logo} paddingRight="30px" width={"12%"} borderRight={"1px solid #D0D0D0"} />
              <Flex alignItems="center" gap="10px">
                <FaArrowLeft />
                <Text fontWeight="medium" fontSize="16px">Exit</Text>
              </Flex>
            </Flex>
          </HStack>
        </Flex>

        <Flex justifyContent="flex-end" w={["65%", "45%", "45%", "25%"]} cursor={"pointer"}>


          <HStack>
            <Menu isLazy aria-expanded={true}>
              <MenuButton as={Box}>
                <Box color="#46455F" fontSize={"24px"} pos={"relative"} pr={"9px"} borderRight={"1px solid #D0D0D0"}>
                  <Box h="2.4px" w="2.4px" rounded={"100%"} pos={"absolute"} top={"3px"} left={"20px"} bg="#FC0202"></Box>
                  <IoMdNotificationsOutline />
                </Box>
              </MenuButton>
              <MenuList minWidth='391px'>
                {/* MenuItems are not rendered unless Menu is open */}
                <Box pos='relative'>
                  <Tabs>
                    <TabList color="#101828" pb="10px">
                      <Tab _selected={{ color: "green" }}>All</Tab>
                      <Tab _selected={{ color: "green" }}>Unread</Tab>

                    </TabList>
                    <TabIndicator mt='-1.5px' height='2px' bg='green' borderRadius='1px' />
                    <TabPanels>
                      <TabPanel>
                        <HStack borderBottom="1px solid #EDEFF2" pb="17px" pt="10px">
                          <Box h="6px" w="6px" bg="#ADB4BF" rounded={"100%"}></Box>
                          <Box>
                            <Text fontSize={"13px"} fontWeight={"400"} color={"#6B7280"}>Phillip Amakari’s student's profile has been updated.</Text>
                            <Text fontSize={"12px"} fontWeight="400" color={"#ADB4BF"}>3s ago </Text>
                          </Box>
                        </HStack>
                        {
                          [1, 2, 3].map((item) => (
                            <HStack borderBottom="1px solid #EDEFF2" pb="17px" pt="10px">
                              <Box h="6px" w="6px" bg="green" rounded={"100%"}></Box>
                              <Box>
                                <Text fontSize={"13px"} fontWeight={"400"} color={"#6B7280"}>Phillip Amakari’s student's profile has been updated.</Text>
                                <Text fontSize={"12px"} fontWeight="400" color={"#ADB4BF"}>3s ago </Text>
                              </Box>
                            </HStack>
                          ))
                        }
                      </TabPanel>
                      <TabPanel>
                        {
                          [1, 2, 3, 4, 5].map((item, index) => (
                            <HStack borderBottom="1px solid #EDEFF2" pb="17px" pt="10px" onClick={() => ReadNotification(index)}>
                              <Box h="6px" w="6px" bg="green" rounded={"100%"}></Box>
                              <Box>
                                <Text fontSize={"13px"} fontWeight={"400"} color={"#6B7280"}>Phillip Amakari’s student's profile has been updated.</Text>
                                <Text fontSize={"12px"} fontWeight="400" color={"#ADB4BF"}>3s ago </Text>
                              </Box>
                            </HStack>
                          ))
                        }
                      </TabPanel>

                    </TabPanels>
                  </Tabs>
                  <Box pos="absolute" top="0" right="4">

                    <Button background="transparent" border="1px solid #39996B" hColor="#fff" color="green" w='136px'>Mark All As Read</Button>
                  </Box>
                </Box>


              </MenuList>
            </Menu>


            <Box>
              <Menu isLazy>
                <MenuButton as={Box}>

                  <HStack cursor={"pointer"}>
                    <Avatar name='Adeleke Solomon' size='sm' src='https://bit.ly/tioluwani-kolawole' />
                    <Text color={"#2E2E2E"} fontWeight={"500"} fontSize={"14px"} >Adeleke Solomon</Text>
                    <IoIosArrowDown size={"18px"} color='#000000' />

                  </HStack>
                </MenuButton>
                <MenuList minWidth='232px'>
                  {/* MenuItems are not rendered unless Menu is open */}
                  <MenuItem textTransform="capitalize" fontWeight={"400"} color='#586375' _hover={{ color: "green", fontWeight: "600", bg: "#E8FFF4" }}>
                    <HStack fontSize="14px"  >
                      <BsQuestionCircle fontWeight={"900"} />
                      <Text>help center</Text>
                    </HStack>
                  </MenuItem>
                  <MenuItem textTransform="capitalize" fontWeight={"400"} color='#586375' _hover={{ color: "green", fontWeight: "600", bg: "#E8FFF4" }}>
                    <HStack fontSize="14px"  >
                      <MdLogout />
                      <Text >log out</Text>
                    </HStack>
                  </MenuItem>

                </MenuList>
              </Menu>
            </Box>
          </HStack>
        </Flex>
      </Flex>


      <Box paddingLeft="80px" py="40px" pb="100px">
        <HStack spacing="200px">
          <VStack spacing="50px" alignItems="start">
            <HStack spacing={"20px"}>
              <Box h="5px" borderRadius="10px" w="60px" bg="#39996B"></Box>
              <Text>Student Details</Text>
            </HStack>

            <HStack spacing={"20px"}>
              <Box h="5px" borderRadius="10px" w="60px" bg="#8A92A6"></Box>
              <Text>Academic Background</Text>
            </HStack>

            <HStack spacing={"20px"}>
              <Box h="5px" borderRadius="10px" w="60px" bg="#8A92A6"></Box>
              <Text>Aspirations & Support</Text>
            </HStack>

            <HStack spacing={"20px"}>
              <Box h="5px" borderRadius="10px" w="60px" bg="#8A92A6"></Box>
              <Text>Student Essay</Text>
            </HStack>

            <HStack spacing={"20px"}>
              <Box h="5px" borderRadius="10px" w="60px" bg="#8A92A6"></Box>
              <Text>Review</Text>
            </HStack>
          </VStack>

          <VStack spacing="60px" alignItems="start">
            <VStack alignItems="start">
              <Text
                textTransform="capitalize"
                fontWeight="700"
                fontSize="24px"
                color="#101011"
                fontFamily="heading"
                mt="4"
              >
                Student Details
              </Text>
              <Text
                fontSize="small"
                fontWeight="normal"
                color="#6B7280"
                lineHeight="24px"
              >
                Please provide the student's details to help sponsors and mentors understand their <br /> academic background and potential.
              </Text>
            </VStack>
            <Input zIndex={"-1"} label="Student Full Name" placeholder="Enter student’s full name as it appears on official documents." />
            <Input label='Date of Birth (DOB)' placeholder="DD/MM/YYYY" />
            <VStack w="100%" alignItems="start">
              <Text
                textTransform="capitalize"
                fontWeight="500"
                fontSize="14px"
                color="#101011"
                fontFamily="heading"
              >
                Gender
              </Text>

              <Select
                border="2px"
                placeholder="Select option"
                fontSize="small"
                fontWeight="normal"
                w="100%"
              >
                <option value="option1">Male</option>
                <option value="option2">Female</option>
              </Select>
            </VStack>
            <Input label='Phone Number' placeholder='+234' />
            <Input label='Guardian’s Phone Number (Optional)' placeholder='+234' />
            <Input label='Email Address' placeholder='Provide the student’s email address' />

            <Input label='State' placeholder="Enter the student's current address (street, city, state)." />
            <Input label='City' placeholder="Enter the student's current address (street, city, state)." />
            <Input label='Residential Address' placeholder="Enter the student's current address (street, city, state)." />

            <HStack spacing="350px">
              <Button px="25px">Cancel</Button>
              <Button px="25px">Next</Button>
            </HStack>
          </VStack>
        </HStack>
      </Box>

    </VStack>
  )
}