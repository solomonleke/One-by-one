import { Box, Flex } from '@chakra-ui/react'
import React from 'react'
import BackgroundImage from  "../../../Asset/bgimage.svg"

export default function AuthenticatedWrapper({children}) {
  return (
   <Flex justifyContent={"space-between"} flexWrap={"wrap"}>
    <Box w={["100%", "50%"]}>
            {children}


    </Box>
    <Box w={["100%", "50%"]} h={"100vh"} bgImage={BackgroundImage} bgPos={'center'} bgSize={"cover"} bgRepeat={"no-repeat"}>

    </Box>
   </Flex>
  )
}
