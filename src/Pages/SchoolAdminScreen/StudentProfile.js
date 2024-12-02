import React from 'react'
import MainLayout from '../../DashboardLayout'
import Button from "../../Components/Button"
import Input from "../../Components/Input"
import { ReactComponent as NextArrow } from "../../Asset/nextArrow.svg"
import { ReactComponent as Pdf } from "../../Asset/pdf.svg"
import { FaArrowCircleRight, FaArrowRight, FaRegArrowAltCircleRight } from 'react-icons/fa'
import { Box, HStack, Text, Avatar, VStack, Flex, Tabs, Switch, TabList, TabPanels, Tab, TabPanel, TabIndicator } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'

export default function StudentProfile() {
  const router = useNavigate();
  return (
    <MainLayout>
      <HStack spacing={"10px"}>
        <Text cursor={"pointer"} _hover={{ fontWeight: "600" }} color={"#626974"} fontSize={"13px"} fontWeight={"400"} lineHeight={"24px"} onClick={() => {
          router("/school-admin/student-management")
        }}>Student Management</Text>
        <NextArrow />
        <Text cursor={"pointer"} color={"#1F2937"} fontSize={"13px"} fontWeight={"500"} lineHeight={"22px"} onClick={() => {
          router("/StudentProfile")
        }}>Student Profile</Text>
      </HStack>

      <Box bg="#fff" border="1px solid #EFEFEF" mt="12px" py='17px' px="18px" rounded='10px'>
        <Box bg="#fff" border="1px solid #EFEFEF" py='17px' px="18px" rounded='10px'>
          <HStack justifyContent={"space-between"}>
            <HStack>
              <Avatar name={"Philip Amakiri"} size='lg' src='https://bit.ly/tioluwani-kolawole' />
              <VStack>
                <Text color={"#1F2937"} fontSize={"25px"} fontWeight={"700"} lineHeight={"30.26px"}>Philip Amakiri</Text>
                <Text color={"#667085"} fontSize={"13px"} fontWeight={"400"} lineHeight={"15."}>PhilipAmakiri@gmail.com</Text>
              </VStack>
              <Text fontSize={"30px"} fontWeight={"700"} letterSpacing={"3px"}>...</Text>
            </HStack>

            <Box>
              <HStack backgroundColor={"#FFF5E5"} borderRadius={"16.86px"} py={"5px"} px={"7px"}>
                <Box rounded="100%" w="8px" h="8px" bg={"#FFA30C"}></Box>
                <Text fontWeight="500" fontSize={"13px"} lineHeight={"18.97px"} color={"#FFA30C"}>Pending Approval</Text>
              </HStack>
            </Box>
          </HStack>
        </Box>

        <HStack justifyContent={"space-between"}>
          <VStack spacing={"20px"}>
            <VStack alignItems={"start"} spacing={"20px"} borderColor={"#EDEFF2"} mt={"30px"} p={"20px"} borderRadius={"10px"} borderWidth={"1px"}>
              <Text fontSize={"18px"} fontWeight={"500"}>Student Details</Text>

              <hr className='remove' />

              <HStack spacing={"190px"}>
                <Text fontWeight={"200"}>Full Name</Text>
                <Text fontWeight={"600"}>Philip Amakiri</Text>
              </HStack>

              <HStack spacing={"195px"}>
                <Text fontWeight={"200"}>Date Of Birth</Text>
                <Text fontWeight={"600"}>22/04/2007</Text>
              </HStack>

              <HStack spacing={"282px"}>
                <Text fontWeight={"200"}>Gender</Text>
                <Text fontWeight={"600"}>Male</Text>
              </HStack>

              <HStack spacing={"145px"}>
                <Text fontWeight={"200"}>Phone Number</Text>
                <Text fontWeight={"600"}>+234000000001</Text>
              </HStack>

              <HStack spacing={"155px"}>
                <Text fontWeight={"200"}>Guardian’s Phone number</Text>
                <Text fontWeight={"600"}>N/A</Text>
              </HStack>

              <HStack spacing={"52px"}>
                <Text fontWeight={"200"}>Address</Text>
                <Text fontWeight={"600"}>84 Balogun Road, Ago palace way</Text>
              </HStack>

              <HStack spacing={"296px"}>
                <Text fontWeight={"200"}>City</Text>
                <Text fontWeight={"600"}>Okota</Text>
              </HStack>

              <HStack spacing={"290px"}>
                <Text fontWeight={"200"}>State</Text>
                <Text fontWeight={"600"}>Lagos</Text>
              </HStack>

              <HStack spacing={"250px"}>
                <Text fontWeight={"200"}>Zip Code</Text>
                <Text fontWeight={"600"}>100001</Text>
              </HStack>
            </VStack>

            <VStack alignItems={"start"} spacing={"20px"} borderColor={"#EDEFF2"} mt={"30px"} p={"20px"} borderRadius={"10px"} borderWidth={"1px"}>
              <Text fontSize={"18px"} fontWeight={"500"}>Academic background</Text>

              <hr className='remove' />

              <HStack spacing={"230px"}>
                <Text fontWeight={"200"}>Department</Text>
                <Text fontWeight={"600"}>Science</Text>
              </HStack>

              <HStack spacing={"262px"}>
                <Text fontWeight={"200"}>Class Level</Text>
                <Text fontWeight={"600"}>SS2</Text>
              </HStack>

              <HStack spacing={"87px"}>
                <Text fontWeight={"200"}>Class Performance</Text>
                <Text fontWeight={"600"}>98% average score</Text>
              </HStack>

              <HStack spacing={"50px"}>
                <Text fontWeight={"200"}>Subjects</Text>
                <Text fontWeight={"600"}>Maths, eng, phy, geo, che, biology</Text>
              </HStack>
            </VStack>

            <VStack alignItems={"start"} spacing={"20px"} borderColor={"#EDEFF2"} mt={"30px"} p={"20px"} borderRadius={"10px"} borderWidth={"1px"}>
              <Text fontSize={"18px"} fontWeight={"500"}>Leadership</Text>

              <hr className='remove' />

              <HStack spacing={"20px"}>
                <Text fontWeight={"200"}>Leadership Roles</Text>
                <Text fontWeight={"600"}>Class Captain, health prefect</Text>
              </HStack>

              <HStack spacing={"105px"}>
                <Text fontWeight={"200"}>Extracurricular Activities</Text>
                <Text fontWeight={"600"}>Health Club</Text>
              </HStack>
            </VStack>
          </VStack>


          <Box display={"flex"} flexDir={"column"} gap={"20px"}>
            <HStack backgroundColor={"#39996B"} py={"12px"} px={"16px"} borderRadius={"8px"} justifyContent={"space-between"}>
              <Text fontWeight={"600"} fontSize={"16px"} lineHeight={"16.94px"} color={"#FFFFFF"}>Scholarship Need</Text>

              <Button background='#FFFFFF' w='10%' color='#39996B'>Full Scholarship</Button>
            </HStack>

            <HStack bg="#fff" border="1px solid #EFEFEF" rounded={"8px"} py={"12px"} px={"16px"} justifyContent={"space-between"}>
              <Text textTransform={"capitalize"} fontWeight={"500"} fontSize={"16px"} lineHeight={"16.94px"} color={"#2F2F2F"}>intended field of study</Text>
              <Text textTransform={"capitalize"} fontWeight={"600"} fontSize={"16px"} lineHeight={"16.94px"} color={"#2F2F2F"}>nursing science</Text>
            </HStack>

            <VStack alignItems={"start"} spacing={"20px"} borderColor={"#EDEFF2"} p={"20px"} borderRadius={"10px"} borderWidth={"1px"}>
              <Text fontSize={"18px"} textTransform={"capitalize"} fontWeight={"500"}>student’s field of interest</Text>

              <hr className='remove' />

              <HStack spacing="20px">
                <Text textTransform={"capitalize"} backgroundColor={"#D9FFED"} rounded={"8px"} py={"10px"} px={"16px"} cursor={"pointer"} textColor={"#39996B"} fontWeight={"500"} fontSize={"14px"} letterSpacing={"0.5px"} border={"1px solid #39996B7A"} lineHeight={"22px"}>health and medicine</Text>
                <Text textTransform={"capitalize"} backgroundColor={"#D9FFED"} rounded={"8px"} py={"10px"} px={"16px"} cursor={"pointer"} textColor={"#39996B"} fontWeight={"500"} fontSize={"14px"} letterSpacing={"0.5px"} border={"1px solid #39996B7A"} lineHeight={"22px"}>science</Text>
                <Text textTransform={"capitalize"} backgroundColor={"#D9FFED"} rounded={"8px"} py={"10px"} px={"16px"} cursor={"pointer"} textColor={"#39996B"} fontWeight={"500"} fontSize={"14px"} letterSpacing={"0.5px"} border={"1px solid #39996B7A"} lineHeight={"22px"}>nursing process</Text>
              </HStack>
            </VStack>

            <VStack alignItems={"start"} spacing={"20px"} borderColor={"#EDEFF2"} p={"20px"} borderRadius={"10px"} borderWidth={"1px"}>
              <Text fontSize={"18px"} textTransform={"capitalize"} fontWeight={"500"}>Higher education goals</Text>

              <hr className='remove' />

              <Text fontWeight={"400"} fontSize={"13px"} lineHeight={"27px"} color={"#626974"}>Legacy Scholars Academy, founded in 2005, is a nurturing educational institution dedicated to empowering students from underserved communities. Our mission is to foster academic excellence, leadership skills, and social responsibility.</Text>
            </VStack>

            <VStack alignItems={"start"} spacing={"20px"} borderColor={"#EDEFF2"} p={"20px"} borderRadius={"10px"} borderWidth={"1px"}>
              <Text fontSize={"18px"} textTransform={"capitalize"} fontWeight={"500"}>career goals</Text>

              <hr className='remove' />

              <Text fontWeight={"400"} fontSize={"13px"} lineHeight={"27px"} color={"#626974"}>Legacy Scholars Academy, founded in 2005, is a nurturing educational institution dedicated to empowering students from underserved communities. Our mission is to foster academic excellence, leadership skills, and social responsibility.</Text>
            </VStack>

            <VStack alignItems={"start"} spacing={"20px"} borderColor={"#EDEFF2"} p={"20px"} borderRadius={"10px"} borderWidth={"1px"}>
              <Text fontSize={"18px"} textTransform={"capitalize"} fontWeight={"500"}>student essay</Text>
                <HStack spacing={"50px"} borderColor={"#EDEFF2"} p={"20px"} borderRadius={"10px"} borderWidth={"1px"}>
                  <HStack>
                    <Pdf />
                    <vStack>
                      <Text color={"#353535"} fontWeight={"500"} fontSize={"13px"} lineHeight={"20px"}>davidafolarin_studentessay.pdf</Text>
                      <Text color={"#989692"} fontSize={"11px"} fontWeight={"400"} lineHeight={"20px"}>200KB</Text>
                    </vStack>
                  </HStack>

                  <Text color={"#39996B"} fontSize={"13px"} fontWeight={"600"} lineHeight={"20px"} cursor={"pointer"}>View</Text>
                </HStack>
            </VStack>
          </Box>
        </HStack>
      </Box>
    </MainLayout>
  )
}
