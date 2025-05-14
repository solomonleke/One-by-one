import { Box, HStack, Image, Stack, Text } from '@chakra-ui/react'
import React from 'react'
import logo from "../Asset/whiteLogo.svg"
import { Link, useLocation, useNavigate } from 'react-router-dom';
export default function SideBar({borderRight="1px solid #EDEFF2", h="100%", showNav = true,  active = false}) {
    const location = useLocation();

    console.log("location", location)

    const navigate = useNavigate();


    return (
        <Box  pb="10px" h={h} overflowY={"auto"} bgColor={"white"} borderRight={borderRight} cursor="pointer">

            <Image px="18.5px" py='15.8px' src={logo} width={"80%"}   onClick={()=>navigate("/")}/>

        </Box>
    )
}
