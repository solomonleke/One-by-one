import React, { useState } from 'react';
import MainLayout from '../../DashboardLayout';
import Button from '../../Components/Button';
import ProfileCard from '../../Components/ProfileCard';
import ProfileHeading from '../../Components/ProfileHeading';
import RemoveNotification from '../../Components/RemoveNotification';
import ProfileUpdateNotification from '../../Components/ProfileUpdateNotification';
import { ReactComponent as NextArrow } from '../../Asset/nextArrow.svg';
import { ReactComponent as Pdf } from '../../Asset/pdf.svg';
import { Box, HStack, Text, useDisclosure, Stack, Menu, MenuButton, MenuList, MenuItem, Avatar, Spacer, Flex } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { IoChevronBackOutline, IoCloseOutline } from 'react-icons/io5';
import { BsThreeDots } from 'react-icons/bs';
import { FaSchoolFlag, FaCheck } from "react-icons/fa6";

export default function AdminProfile() {
  const router = useNavigate();

  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const { isOpen: isRemoveModalOpen, onOpen: onOpenRemove, onClose: onCloseRemove } = useDisclosure();

  return (
    <MainLayout>
      <Flex justifyContent="space-between" flexWrap="wrap">

        <HStack fontSize="14px" fontWeight="600" spacing="10px" cursor="pointer" onClick={() => router('/super-admin-user-management')}>
          <IoChevronBackOutline />
          <Text>Back</Text>
        </HStack>
      </Flex>

      <Box bg="#fff" border="1px solid #EFEFEF" mt="12px" py="17px" px={["8px", "8px", "18px", "18px"]} rounded="10px">
        <Flex justifyContent="space-between" flexWrap="wrap" gap="10px">
          <HStack spacing="14px" w={["100%", "100%", "70%", "70%"]}>
            <Avatar name="Philip Amakiri" size="lg" src="https://bit.ly/sage-adebayo" />
            <Stack spacing="10px">
              <HStack>
                <Text color="#1F2937" fontSize="25px" fontWeight="700">
                  Philip Amakiri
                </Text>
                <Menu isLazy>
                  <MenuButton as={Box}>
                    <Flex justifyContent="center" color="#000000" fontSize="16px">
                      <BsThreeDots />
                    </Flex>
                  </MenuButton>
                  <MenuList>
                    <MenuItem
                      onClick={() => setEditModalOpen(true)}
                      textTransform="capitalize"
                      fontWeight="500"
                      color="#2F2F2F"
                      _hover={{ color: '#2F2F2F', fontWeight: '400', bg: '#E8FFF4' }}
                    >
                      <HStack fontSize="14px">
                        <Text>Edit</Text>
                      </HStack>
                    </MenuItem>
                    <MenuItem
                      onClick={onOpenRemove}
                      textTransform="capitalize"
                      fontWeight="500"
                      color="#FF4040"
                      _hover={{ color: '#FF4040', fontWeight: '400', bg: '#E8FFF4' }}
                    >
                      <HStack fontSize="14px">
                        <Text>Remove Student</Text>
                      </HStack>
                    </MenuItem>
                  </MenuList>
                </Menu>
              </HStack>
              <Text color="#667085" fontSize="13px" fontWeight="400">
                Principal's Email: PhilipAmakiri@gmail.com
              </Text>
            </Stack>
          </HStack>

          <HStack>
                  <Button border='1px solid #222' fontSize="13px" fontWeight="500" fontStyle="italic" background="white" color="#6B7280" px={2} boxShadow="0px, 0px, 0px, 1px #9CA7AD2B">Verified by: Solomon Adeleke</Button>
                </HStack>
        </Flex>
      </Box>

      <Flex justifyContent={"space-between"} flexWrap="wrap" mt="16px">
          <Box w={["100%", "100%", "40%", "40%"]} >

            <Stack spacing="16px">

              <Box borderColor={"#EDEFF2"} py={"20.5px"} px={["8px","8px","17px","17px"]} borderRadius={"10px"} borderWidth={"1px"}>
                <ProfileHeading title="Student Details" />



                <Stack spacing={"14px"} mt="14px">

                  <ProfileCard
                    title="full name"
                    value="Adeleke Solomon"
                  />

                  <ProfileCard
                    title="date of birth"
                    value="22/04/2007"
                  />

                  <ProfileCard
                    title="Gender"
                    value="male"
                  />


                  <ProfileCard
                    title="phone number"
                    value="+234000000001"
                  />

                  <ProfileCard
                    title="Guardian’s Phone number"
                    value="N/A"
                  />

                  <ProfileCard
                    title="address"
                    value="84 Balogun Road, Ago palace way"
                  />

                  <ProfileCard
                    title="city"
                    value="okota"
                  />

                  <ProfileCard
                    title="state"
                    value="lagos"
                  />

                  <ProfileCard
                    title="zip code"
                    value="100001"
                  />

                </Stack>
              </Box>


              <Box borderColor={"#EDEFF2"} py={"20.5px"} px={["8px","8px","17px","17px"]} borderRadius={"10px"} borderWidth={"1px"}>
                <ProfileHeading title="Academic background" />



                <Stack spacing={"14px"} mt="14px">
                  <ProfileCard
                    title="department"
                    value="science"
                  />
                  <ProfileCard
                    title="class level"
                    value="SS2"
                  />
                  <ProfileCard
                    title="department"
                    value="science"
                  />
                  <ProfileCard
                    title="class performance"
                    value="98% average score"
                  />
                  <ProfileCard
                    title="subject"
                    value="Maths, eng, phy, geo, che, biology"
                  />
                </Stack>
              </Box>
              <Box borderColor={"#EDEFF2"} p={"20px"} borderRadius={"10px"} borderWidth={"1px"}>

              <Text fontSize={"14px"} textTransform={"capitalize"} fontWeight={"500"}>historical term results/average</Text>

              <HStack  borderColor={"#EDEFF2"} p={"20px"} borderRadius={"10px"} mt="10px" borderWidth={"1px"}>
                <HStack>
                  <Pdf />
                  <Stack>
                    <Text color={"#353535"} fontWeight={"500"} fontSize={"13px"} lineHeight={"20px"}>davidafolarin_termresults.pdf</Text>
                  </Stack>
                </HStack>
              <Spacer/>
                <Text color={"#39996B"} fontSize={"13px"} fontWeight={"600"} lineHeight={"20px"} cursor={"pointer"}>View</Text>
              </HStack>
            </Box>
            </Stack>



          </Box>


          <Box w={["100%", "100%", "58%", "58%"]}>


            <Stack spacing="16px">
              <HStack background={"linear-gradient(90deg, #39996B 0%, rgba(57, 153, 107, 0) 100%)"} py={"12px"} px={"16px"} borderRadius={"8px"} justifyContent={"space-between"}>
                <Text fontWeight={"600"} fontSize={"16px"} lineHeight={"16.94px"} color={"#FFFFFF"}>Essay Score</Text>

                <Button background='#FFFFFF' w='10%' color='#39996B'>86%</Button>
              </HStack>

              <HStack bg="#fff" border="1px solid #EFEFEF" rounded={"8px"} py={"12px"} px={"16px"} justifyContent={"space-between"}>
                <Text textTransform={"capitalize"} fontWeight={"500"} fontSize={"14px"} color={"#2F2F2F"}>intended field of study</Text>
                <Text textTransform={"capitalize"} fontWeight={"600"} fontSize={"14px"} color={"#2F2F2F"}>nursing science</Text>
              </HStack>

              <Box borderColor={"#EDEFF2"} p={"20px"} borderRadius={"10px"} borderWidth={"1px"}>
                <ProfileHeading title="student’s field of interest" />

                <HStack spacing="13px" mt="18px">
                  <Text textTransform={"capitalize"} backgroundColor={"#D9FFED"} rounded={"8px"} py={"10px"} px={"16px"} cursor={"pointer"} textColor={"green"} fontWeight={"500"} fontSize={"14px"} letterSpacing={"-1%"} border={"1px solid #39996B7A"}>health and medicine</Text>
                  <Text textTransform={"capitalize"} backgroundColor={"#D9FFED"} rounded={"8px"} py={"10px"} px={"16px"} cursor={"pointer"} textColor={"green"} fontWeight={"500"} fontSize={"14px"} letterSpacing={"-1%"} border={"1px solid #39996B7A"}>science</Text>
                  <Text textTransform={"capitalize"} backgroundColor={"#D9FFED"} rounded={"8px"} py={"10px"} px={"16px"} cursor={"pointer"} textColor={"green"} fontWeight={"500"} fontSize={"14px"} letterSpacing={"-1%"} border={"1px solid #39996B7A"}>nursing process</Text>
                </HStack>

              </Box>


              <Box borderColor={"#EDEFF2"} p={"20px"} borderRadius={"10px"} borderWidth={"1px"}>
                <ProfileHeading title="Higher education goals" />

                <Text fontWeight={"400"} mt="18px" fontSize={"13px"} lineHeight={"27px"} color={"#626974"}>Legacy Scholars Academy, founded in 2005, is a nurturing educational institution dedicated to empowering students from underserved communities. Our mission is to foster academic excellence, leadership skills, and social responsibility.</Text>
              </Box>

              <Box borderColor={"#EDEFF2"} p={"20px"} borderRadius={"10px"} borderWidth={"1px"}>
                <ProfileHeading title="career goals" />



                <Text fontWeight={"400"} mt="18px" fontSize={"13px"} lineHeight={"27px"} color={"#626974"}>Legacy Scholars Academy, founded in 2005, is a nurturing educational institution dedicated to empowering students from underserved communities. Our mission is to foster academic excellence, leadership skills, and social responsibility.</Text>
              </Box>

              <Box borderColor={"#EDEFF2"} p={"20px"} borderRadius={"10px"} borderWidth={"1px"}>

              <Text fontSize={"14px"} textTransform={"capitalize"} fontWeight={"500"}>student essay</Text>

              <HStack  borderColor={"#EDEFF2"} p={"20px"} borderRadius={"10px"} mt="10px" borderWidth={"1px"}>
                <Text fontWeight={"400"} fontSize={"13px"} lineHeight={"27px"} color={"#626974"}>Education is the key to breaking barriers and unlocking opportunities and I have always held this belief close to my heart. My name is Phillip Amakiri, and I am a dedicated and hardworking student who is devoted to making the right decisions that will lead me forward in life.</Text>
              </HStack>
            </Box>



            </Stack>





          

           

          
          </Box>
        </Flex>


      <RemoveNotification isOpen={isRemoveModalOpen} onClose={onCloseRemove} />
      <ProfileUpdateNotification isOpen={isEditModalOpen} onClose={() => setEditModalOpen(false)} />
    </MainLayout>
  );
}
