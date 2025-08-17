import { Box, Flex, Stack } from '@chakra-ui/react'
import NavBar from './NavBar'
import SideBar from './SideBar'

export default function MainLayout({ children, bgColor = "gray.gray500", color = "black",  showSearch=true, showNav=true, borderRight="1px solid #EDEFF2",  active = false, userName, userImage }) {
  return (

    <Box bgColor={bgColor} minH="100vh"  >
      

      <Flex pos={"relative"} direction={["column-reverse", "column-reverse", "column-reverse", "column-reverse", "row"]} justifyContent="space-between" alignItems={"flex-start"}>
        <Box zIndex="10" display={["none", "none", "none", "none", "block"]} w="20%" pos={"fixed"} height={"100vh"} >
          <SideBar active={active} showNav={showNav}  borderRight={borderRight} />
        </Box>

        <Box width={['100%', '100%', '100%', '100%', '80%']}  ml={["0%","0%","0%","0%","20%"]} >
        <NavBar showSearch={showSearch} userName={userName} userImage={userImage} />
          <Box  py="16.5px" px={["10px","10px","24px","24px"]}>
            {children}
          </Box>


        </Box>
      </Flex>



    </Box>
  )
}
