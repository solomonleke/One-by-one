import React, { useState } from 'react'
import { ReactComponent as Logo } from "../../Asset/schoolLogo.svg";
import { ReactComponent as VerifySchool } from "../../Asset/verifySchool.svg";
import MainLayout from '../../DashboardLayout'
import Button from "../../Components/Button"
import { Box, HStack, Text, Flex, VStack } from '@chakra-ui/react'
import { CgSearch } from "react-icons/cg";
import { IoFilter } from "react-icons/io5";
import TableRow from "../../Components/TableRow"
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from '@chakra-ui/react'

export default function SchoolProfile() {
  return (
    <MainLayout>
      <Box backgroundColor={"#fff"} p={"20px"} borderWidth={"1px"} borderRadius={"10px"} borderColor={"#EDEFF2"}>
        <HStack justifyContent={"space-between"} pb={"20px"} borderBottomWidth={"1px"} borderBottomColor={"#EDEFF2"}>
          <HStack>
            <Logo cursor={"pointer"} />
            <Text fontSize="24px" mt="auto" fontWeight="700">Legacy Scholars Academy</Text>
          </HStack>

          <HStack borderWidth={"1px"} cursor={"pointer"} borderColor={"#39996B"} fontWeight={"500"} color={"#39996B"} borderRadius={"8px"} px={"20px"} py={"8px"}>
            <Box as='span'><VerifySchool display={"inline-block"} /></Box>
            <Text>Verified</Text>
          </HStack>
        </HStack>


        <HStack>
          <VStack spacing={"20px"}>
            <VStack alignItems={"start"} spacing={"20px"} borderColor={"#EDEFF2"} mt={"30px"} p={"20px"} borderRadius={"10px"} borderWidth={"1px"}>
              <Text fontSize={"18px"} fontWeight={"500"}>School Details</Text>

              <hr className='remove' />

              <HStack spacing={"40px"}>
                <Text fontWeight={"200"}>Email</Text>
                <Text fontWeight={"600"}>LegacyScholarsAcademy@gmail.com</Text>
              </HStack>

              <HStack spacing={"228px"}>
                <Text fontWeight={"200"}>Founding Year</Text>
                <Text fontWeight={"600"}>2016</Text>
              </HStack>

              <HStack spacing={"50px"}>
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
              <Text fontSize={"18px"} fontWeight={"500"}>Principal Information</Text>

              <hr className='remove' />

              <HStack spacing={"317px"}>
                <Text fontWeight={"200"}>Title</Text>
                <Text fontWeight={"600"}>Mr</Text>
              </HStack>

              <HStack spacing={"255px"}>
                <Text fontWeight={"200"}>First Name</Text>
                <Text fontWeight={"600"}>John</Text>
              </HStack>

              <HStack spacing={"265px"}>
                <Text fontWeight={"200"}>Last Name</Text>
                <Text fontWeight={"600"}>Doe</Text>
              </HStack>

              <HStack spacing={"150px"}>
                <Text fontWeight={"200"}>Email</Text>
                <Text fontWeight={"600"}>johndoe419@gmail.com</Text>
              </HStack>

              <HStack spacing={"145px"}>
                <Text fontWeight={"200"}>Phone Number</Text>
                <Text fontWeight={"600"}>+234000000001</Text>
              </HStack>

              <HStack spacing={"265px"}>
                <Text fontWeight={"200"}>NIN</Text>
                <Text fontWeight={"500"} color={"#027A48"} bg={"#ECFDF3"} borderRadius={"20px"} py={"5px"} px={"12px"}>Verified</Text>
              </HStack>
            </VStack>
          </VStack>

          <Box bg={"#9BF5CA4A"} borderWidth={"1px"} display={"flex"} flexDir={"column"} gap={"23px"} borderRadius={"16px"} p={"16px"}>
            <VStack bg={"white"} borderRadius={"10px"} alignItems={"start"} py={"25px"} px={"12px"} spacing={"16px"}>
              <Text fontSize={"16px"} fontWeight={"500"}>About School</Text>
              <hr className='remove' />
              <Text fontSize={"13px"} fontWeight={"medium"} lineHeight={"25px"} color={"#626974"}>Legacy Scholars Academy, founded in 2005, is a nurturing educational institution dedicated to empowering students from underserved communities. Our mission is to foster academic excellence, leadership skills, and social responsibility. With a 90% university acceptance rate and top-tier performance in national exams, we prepare students for success and positive community impact.</Text>
            </VStack>

            <VStack bg={"white"} borderRadius={"10px"} alignItems={"start"} py={"20px"} px={"12px"} spacing={"10px"}>
              <Text fontSize={"16px"} fontWeight={"500"}>Class Capacity</Text>
              <hr className='remove' />
              <Text fontSize={"13px"} fontWeight={"medium"} lineHeight={"25px"} color={"#626974"}>100</Text>
            </VStack>

            <VStack bg={"white"} borderRadius={"10px"} alignItems={"start"} py={"25px"} px={"12px"} spacing={"16px"}>
              <Text fontSize={"16px"} fontWeight={"500"}>Legal Documents</Text>
              <hr className='remove' />

              <HStack spacing={"285px"}>
                <Text fontSize={"13px"} fontWeight={"medium"} lineHeight={"25px"} color={"#626974"}>Certificate of Incorporation</Text>
                <Text fontWeight={"500"} color={"#027A48"} bg={"#ECFDF3"} borderRadius={"20px"} py={"5px"} px={"12px"}>Verified</Text>
              </HStack>

              <HStack spacing={"260px"}>
                <Text fontSize={"13px"} fontWeight={"medium"} lineHeight={"25px"} color={"#626974"}>Tax Identification Number (TIN)</Text>
                <Text fontWeight={"500"} color={"#027A48"} bg={"#ECFDF3"} borderRadius={"20px"} py={"5px"} px={"12px"}>Verified</Text>
              </HStack>

              <HStack spacing={"230px"}>
                <Text fontSize={"13px"} fontWeight={"medium"} lineHeight={"25px"} color={"#626974"}>Ministry of Education Approval Letter</Text>
                <Text fontWeight={"500"} color={"#027A48"} bg={"#ECFDF3"} borderRadius={"20px"} py={"5px"} px={"12px"}>Verified</Text>
              </HStack>

              <HStack spacing={"265px"}>
                <Text fontSize={"13px"} fontWeight={"medium"} lineHeight={"25px"} color={"#626974"}>School Registration Certificate</Text>
                <Text fontWeight={"500"} color={"#027A48"} bg={"#ECFDF3"} borderRadius={"20px"} py={"5px"} px={"12px"}>Verified</Text>
              </HStack>
            </VStack>

          </Box>
        </HStack>

      </Box>
    </MainLayout>
  )
}
