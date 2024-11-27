import { Box, Flex, Stack, Image } from '@chakra-ui/react'

import NavBar from './NavBar'


export default function SubLayout({ children, bgColor = "gray.gray500", color = "black", showSearch = true }) {
    return (

        <Box bgColor={bgColor} minH="100vh"  >


            <Flex pos={"relative"} direction={["column-reverse", "column-reverse", "column-reverse", "column-reverse", "row"]} justifyContent="space-between" alignItems={"flex-start"}>

                <Box width={['100%', '100%', '100%', '100%', '100%']} ml={["0%", "0%", "0%", "0%", "px"]} >
                    <NavBar showSearch={showSearch} />
                    <Box py="16.5px" px={["10px", "10px", "24px", "24px"]}>
                        {children}
                    </Box>


                </Box>
            </Flex>



        </Box>
    )
}
