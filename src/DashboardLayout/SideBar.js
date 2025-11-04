import { Box, HStack, Image, Stack, Text } from '@chakra-ui/react'
import React from 'react'
import logo from "../Asset/whiteLogo.svg"
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { NavList } from './NavList';
export default function SideBar({borderRight="1px solid #EDEFF2", h="100%", showNav = true,  active = false}) {
    const location = useLocation();

    // console.log("location", location)

    const navigate = useNavigate();


    return (
        <Box  pb="10px" h={h} overflowY={"auto"} bgColor={"white"} borderRight={borderRight} cursor="pointer">

            <Image px="18.5px" py='20px' src={logo} width={"60%"}   onClick={()=>navigate("/")}/>

            <hr style={{borderBottom: "1px solid #EDEFF2"}}/>
            <Stack spacing={"15px"} mt="32px" px="18.5px"  visibility={showNav? "visible": "hidden"}>

                {
                    NavList(location)?.filter(item => item.display === true)
                        .map((item, i) => (
                            <Link to={item.link} key={i}>
                                <HStack bgColor={item.active || active ? "greenn.greenn100" : "#fff"} padding={"8px"} rounded="7px" fontFamily="body" fontSize={"14px"} transition="2s ease in" fontWeight={item.active || active ? "600" : "400"} color={item.active || active ? "greenn.greenn500" : "#586375"} _hover={{ bgColor: "greenn.greenn100", fontWeight: "600", color: "greenn.greenn500" }} cursor="pointer">
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
