import { Box, Flex, Stack } from '@chakra-ui/react'
import NavBar from './NavBar'
import SideBar from './SideBar'

export default function MainLayout({ children, bgColor = "gray.gray500", color = "black",  showSearch=true, showNav=true, borderRight="1px solid #EDEFF2",  active = false }) {
  return (

    <Box bgColor={bgColor} minH="100vh"  >
      

      <Flex pos={"relative"} direction={["column-reverse", "column-reverse", "column-reverse", "column-reverse", "row"]} justifyContent="space-between" alignItems={"flex-start"}>
        <Box zIndex="10" display={["none", "none", "none", "none", "block"]} w="15%" pos={"fixed"}>
          <SideBar active={active} showNav={showNav}  borderRight={borderRight} />
        </Box>

        <Box pos={"relative"} width={['100%', '100%', '100%', '100%', '85%']}  ml={["0%","0%","0%","0%","15%"]} >
        <NavBar showSearch={showSearch} />
          <Box  py="30px" pos={"fixed"} left={"20px"}>
            {children}
          </Box>


        </Box>
      </Flex>



    </Box>
  )
}
