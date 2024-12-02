import React from 'react'
import { Box, HStack, Text, Spacer, Avatar, VStack, Flex, Tabs, Switch, TabList, TabPanels, Tab, TabPanel, TabIndicator } from '@chakra-ui/react'


export default function ProfileHeading({title}) {
  return (
    <Text fontSize={"14px"} pb="18.5px" textTransform="capitalize" fontWeight={"500"} borderBottom="1px solid #EDEFF2">{title}</Text>
  )
}
