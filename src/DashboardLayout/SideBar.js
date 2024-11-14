import { Box, HStack, Image, Stack, Text } from '@chakra-ui/react'
import React from 'react'
import logo from "../Asset/whiteLogo.svg"
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { NavList } from './NavList';
export default function SideBar() {
    const location = useLocation();

    const List = NavList(location);
    const navigate = useNavigate();


    return (
        <Box  pb="10px" h={"100%"} overflowY={"auto"} bgColor={"white"} borderRight={"1px solid #EDEFF2"}  >

            <Image px="18.5px" py='20px' src={logo} width={"60%"} />

            <hr style={{borderBottom: "1px solid #EDEFF2"}}/>
            <Stack spacing={"15px"} mt="32px" px="18.5px">

                {
                    List?.filter(item => item.display === true)
                        .map((item, i) => (
                            <Link to={item.link}>
                                <HStack bgColor={item.active ? "greenn.greenn100" : "#fff"} padding={"8px"} rounded="7px" fontFamily="body" fontSize={"14px"} transition="2s ease in" fontWeight={item.active ? "600" : "400"} color={item.active ? "green" : "#586375"} _hover={{ bgColor: "greenn.greenn100", fontWeight: "600", color: "green" }} key={i} cursor="pointer">
                                    <Box fontSize={"20px"} pos="relative" top="-1px">{item.icon}</Box>
                                    <Text  textTransform={"capitalize"}>{item.name}</Text>
                                </HStack>
                            </Link>
                        ))
                }

             

            </Stack>

        </Box>
    )
}
