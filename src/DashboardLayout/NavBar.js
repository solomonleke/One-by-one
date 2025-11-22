import { Box, Flex, HStack, Avatar, Text, Menu, MenuButton, MenuList, MenuItem, useDisclosure } from '@chakra-ui/react'
import { Tabs, TabList, TabPanels, Tab, TabPanel, TabIndicator, Image } from '@chakra-ui/react'
import React, { useState, useEffect } from 'react'
import SearchInput from '../Components/SearchInput'
import Button from '../Components/Button'
import BackNotification from '../Components/BackNotification'
import { CiSearch } from 'react-icons/ci'
import { IoIosArrowDown, IoMdNotificationsOutline } from 'react-icons/io'
import { BsQuestionCircle } from "react-icons/bs";
import { MdLogout } from "react-icons/md";
import { CgMenuLeft } from "react-icons/cg";
import { IoArrowBackSharp } from "react-icons/io5";
import {

    GetUserProfile,
  } from "../Utils/ApiCall";
import { logout } from '../Authentication/Index'; // Import the logout function

import SideBar from './SideBar'

import {
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
} from '@chakra-ui/react'

import logo from "../Asset/whiteLogo.svg"
import { useNavigate } from 'react-router-dom';


export default function NavBar({ showSearch = true }) {


    const [userName, setUserName] = useState('');
    const [lastName, setLastName] = useState('');
    const [onlineUser, setOnlineUser] = useState({});
    const [loading, setLoading] = useState(true); // State to manage loading

    const fetchProfile = async () => {
        try {
          const data = await GetUserProfile(); // directly gets the data object
        //   console.log("Profile Data:", data);
          setOnlineUser(data)
            
    
        } catch (error) {
          console.error("Failed to fetch profile", error);
        } 
      };

  useEffect(() => {
  

    // const storedName = JSON.parse(localStorage.getItem('onlineUser'));
    // if (storedName) {
    //   setUserName(`${storedName.firstName}`);
    //   setLastName(`${storedName.lastName}`);
    // }
    fetchProfile(); // Fetch profile data when the component mounts
  }, []); // Add onlineUser to dependency array

    const { isOpen, onOpen, onClose } = useDisclosure()

    const [OpenModal, setOpenModal] = useState(false)
    const ReadNotification = (id) => {

    }

    const nav = useNavigate()
    return (
        <Flex borderLeft="1px solid #EDEFF2"  pos="sticky" top="0" bgColor={"white"} alignItems={"center"} justifyContent={"space-between"} zIndex={"100"} px="24px" py="15.6px" borderBottom={"1px solid #EDEFF2"}>

            {
                showSearch === false && (
                    <Box  w="40%" display={["none", "none", "block", "block"]} >
                <HStack spacing="30px">
                    <Image onClick={()=>nav("/")} pl="-20px" src={logo} width={"30%"} borderRight={"1px solid #EDEFF2"} pr="20px"/>
                    <HStack  cursor="pointer" w='80px' onClick={() => setOpenModal(true)}>
                        <IoArrowBackSharp />
                        <Text>Exit</Text>
                    </HStack>
                </HStack>

            </Box>
                )
            }
           

            <Box visibility={showSearch ? "visible" : "hidden"} w="40%" display={["none", "none", "block", "block"]} >
                <SearchInput leftIcon={<CiSearch />} label='search' />
            </Box>

            <Box w="20%" display={["block", "block", "none", "none"]} color="green" fontSize="30px" onClick={onOpen}>
                <CgMenuLeft />
            </Box>
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
                                <Avatar  name={`${onlineUser.first_name} ${onlineUser.last_name}`} size="sm" src={`${onlineUser.picture}`} />
                                <Text textTransform="capitalize" color={"#2E2E2E"} fontWeight={"500"} fontSize={"14px"} >{onlineUser.first_name} {onlineUser.last_name}</Text>
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
                                <MenuItem textTransform="capitalize" fontWeight={"400"} color='#586375' _hover={{ color: "green", fontWeight: "600", bg: "#E8FFF4" }} onClick={() => {
                                            logout(); // Call the logout function
                                            nav("/sign-in")
                                        }}>
                                    <HStack fontSize="14px">
                                        <MdLogout />
                                        <Text>log out</Text>
                                    </HStack>
                                </MenuItem>

                            </MenuList>
                        </Menu>
                    </Box>
                </HStack>
                <Drawer
                    isOpen={isOpen}
                    zIndex={"100px"}
                    placement='left'
                    onClose={onClose}

                >
                    <DrawerOverlay />
                    <DrawerContent>
                        <DrawerCloseButton />


                        <DrawerBody>
                            <SideBar borderRight="none" h="auto" />
                        </DrawerBody>
                        {/* 
          <DrawerFooter>
           
          </DrawerFooter> */}
                    </DrawerContent>
                </Drawer>
            </Flex>



            <BackNotification isOpen={OpenModal} onClose={()=>setOpenModal(false)} />
        </Flex>
    )
}
