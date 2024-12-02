import React from 'react'
import { Box, HStack, Text, Spacer, Avatar, VStack, Flex, Tabs, Switch, TabList, TabPanels, Tab, TabPanel, TabIndicator } from '@chakra-ui/react'


export default function ProfileCard({title,value}) {
    return (
        <HStack >
            <Text textTransform={"capitalize"} color="#626974" fonSize="13px" fontWeight={"400"}>{title}</Text>
            <Spacer/>
            <Text textTransform={"capitalize"} textAlign="right" color="#1F2937" fonSize="13px"  fontWeight={"500"}>{value}</Text>
        </HStack>

    )
}
