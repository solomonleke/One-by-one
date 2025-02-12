import { Box, Flex, Text } from '@chakra-ui/react'
import React from 'react'

export default function Pagination({ postPerPage, totalPosts, paginate,currentPage }) {
    const pageNumbers = []

    for (let i = 1; i <= Math.ceil(totalPosts / postPerPage); i++) {
        pageNumbers.push(i)
    }

    console.log("currenddddtpage", currentPage)


    return (
        <Box my="10px" mx="15px">
            {
                pageNumbers.length > 1 && (
                    <Flex justifyContent={"center"} flexWrap="wrap" maxW="100%"   cursor="pointer" >
                {pageNumbers.map(number => (
                    <Text onClick={()=>paginate(number)} color={currentPage === number ? "#fff": "greenn.greenn500"}   _hover={{bg: "greenn.greenn500", color: "#fff"}} bg={currentPage === number ? "greenn.greenn500": "#fff"} border="1px solid #34996B" textAlign="center" my="2px" mx="2px" rounded={"8px"} px={"10px"} py="5px" key={number} >
                            {number}      
                    </Text>
                ))}
            </Flex>
                )
            }
           
        </Box>
    )
}
