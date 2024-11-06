import { Box, Flex } from "@chakra-ui/react";
import React from "react";
import BackgroundImage from "../../../Asset/bgimage.svg";
import Footer from "./Footer";

export default function AuthenticatedWrapper({ children }) {
  return (
    <Flex justifyContent={"space-between"} alignItems="" flexWrap={"wrap"}>
      <Box w={["100%", "50%"]} pb="64px">
        {children}

        <Box>
          <Footer />
        </Box>
      </Box>
      <Box
        w={["100%", "50%"]}
        bgImage={BackgroundImage}
        bgPos={"center"}
        bgSize={"cover"}
        bgRepeat={"no-repeat"}
      ></Box>
    </Flex>
  );
}
