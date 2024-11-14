import React from 'react'
import MainLayout from '../../DashboardLayout'
import { Text,Flex } from '@chakra-ui/react'
import DashboardCard from "../../Components/DashboardCard"

export default function Index() {
  return (
    <MainLayout>

        <Text color={"#1F2937"} fontWeight={"700"} fontSize={"24px"} lineHeight={"25.41px"}>Welcome back, Solomon. </Text>
        <Text mt="9px" color={"#686C75"} fontWeight={"400"} fontSize={"15px"} lineHeight={"24px"}>Easily track and manage student information with real-time insights and updates. </Text>


        <Flex mt="27px" justifyContent="space-between" flexWrap="wrap">
          <DashboardCard/>
        </Flex>

    </MainLayout>
      

  )
}
