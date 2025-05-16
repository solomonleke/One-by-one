import { Box, Flex, Stack } from '@chakra-ui/react'
import Navigation from './Navigation'
import Footer from './Footer'

export default function MainLayout({ children, bgColor = "gray.gray500", color = "black",  showSearch=true, showNav=true, borderRight="1px solid #EDEFF2",  active = false }) {
  return (

    <Box bgColor={bgColor} minH="100vh"  >
      

      <Box pos={"relative"} direction={["column-reverse", "column-reverse", "column-reverse", "column-reverse", "row"]} justifyContent="space-between" alignItems={"flex-start"}>
        <Box >
          <Navigation active={active} showNav={showNav}  borderRight={borderRight} />
        </Box>

        <Box width={['100%']} zIndex="900" pt={{ base: "65px", md: "63px" }}  >
          <Box >
            {children}
          </Box>
          <Footer />


        </Box>
      </Box>



    </Box>
  )
}
