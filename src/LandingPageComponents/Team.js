import {
    Box,
    Container,
    Heading,
    Text,
    SimpleGrid,
    Image,
    HStack,
    IconButton,
    Link,
    VStack,
} from "@chakra-ui/react";
import { SlSocialLinkedin } from "react-icons/sl";
import { FaXTwitter } from "react-icons/fa6";
import Ope from "../Asset/TeamMembers/ope.png";
import solomon from "../Asset/TeamMembers/solomon.png";
import ezeh from "../Asset/TeamMembers/ezeh.png";
import obinna from "../Asset/TeamMembers/obinna.png";
import oruaro from "../Asset/TeamMembers/oruaro.png";
import ikenna from "../Asset/TeamMembers/ikenna.png";
import segun from "../Asset/TeamMembers/segun.png";
import iyata from "../Asset/TeamMembers/iyata.png";

/* ===================== DATA ===================== */

const teamData = {
    cofounders: [
        {
            name: "Opeyemi Adeleke",
            image: Ope,
            // linkedin: "https://linkedin.com/in/opeyemi",
            // twitter: "https://twitter.com/opeyemi",
        },
        {
            name: "Segun Aremu",
            image: segun,
            // linkedin: "https://linkedin.com/in/segun",
        },
        {
            name: "Iyata Adikpe",
            image: iyata,
            // twitter: "https://twitter.com/iyata",
        },
    ],

    development: [
        {
            name: "Solomon Adeleke",
            image: solomon,
            // linkedin: "https://linkedin.com/in/muyinwa",
        },
        {
            name: "Ikenna Okafor",
            image: ikenna,
            // twitter: "https://twitter.com/ikenna",
        },
        {
            name: "Obinna Edmund",
            image: obinna,
            // linkedin: "https://linkedin.com/in/obinna",
            // twitter: "https://twitter.com/obinna",
        },
        {
            name: "Udogri Oruaro",
            image: oruaro,
            // linkedin: "https://linkedin.com/in/udogri",
            // twitter: "https://twitter.com/udogri",
        },
    ],

    communications: [
        {
            name: "Ezinne Ezeh",
            image: ezeh,
            // linkedin: "https://linkedin.com/in/ezinne",
            // twitter: "https://twitter.com/ezinne",
        },
    ],
};

/* ===================== CARD ===================== */

const TeamCard = ({ name, image, linkedin, twitter }) => (
    <Box
        w="280px"
        h="241px"
        bg="#B7EED4" 
        border=  "1px solid #A3C8B6"     
        borderRadius="2xl"  
        p="6px"                
        mx="auto"
        // border="2px solid black"
    >
        {/* Inner wrapper */}
        <Box position="relative" w="100%" h="100%">

            {/* Image */}
            <Box
                w="100%"
                h="160px"
                borderRadius="xl"
                overflow="hidden"
                bg="black"
            >
                <Image
                    src={image}
                    alt={name}
                    w="100%"
                    h="100%"
                    objectFit="cover"
                />
            </Box>

            {/* Footer */}
            <Box
                position="absolute"
                bottom="0"
                left="0"
                w="100%"
                bg="white"
                borderRadius="xl"
                px="13px"
                py="12px"
                boxShadow="sm"
            >
                <HStack justify="space-between" align="center">
                    <Text fontWeight="600" fontSize="sm">
                        {name}
                    </Text>

                    <HStack spacing={2}>
                        <IconButton
                            border="1px solid #CCCCCC"
                            bg="#fff"
                            borderRadius={"100%"}
                            color="#091C13"
                            aria-label="LinkedIn"
                            icon={<SlSocialLinkedin />}
                            size="xs"
                            variant="ghost"
                            cursor="default"
                        />

                        <IconButton
                            border="1px solid #CCCCCC"
                            bg="#fff"
                            borderRadius={"100%"}
                             color="#091C13"
                            aria-label="Twitter"
                            icon={<FaXTwitter />}
                            size="xs"
                            variant="ghost"
                            cursor="default"
                        />
                    </HStack>

                </HStack>
            </Box>

        </Box>
    </Box>
);


/* ===================== SECTION ===================== */

const Section = ({ title, members }) => (
    <Box mt={20}>
        <Text
            textAlign="center"
            fontWeight="700"
            fontSize="sm"
            color="orange.400"
            letterSpacing="widest"
            mb={12}
        >
            / {title.toUpperCase()} /
        </Text>

        <SimpleGrid
            spacing="40px" // ✅ exact spacing
            justifyContent="center"
            templateColumns="repeat(auto-fit, 280px)"
        >
            {members.map((member, index) => (
                <TeamCard key={index} {...member} />
            ))}
        </SimpleGrid>
    </Box>
);

/* ===================== PAGE ===================== */

export default function TeamMembers() {
    return (
        <Container maxW="7xl" py={20}>
            <VStack spacing={3} mb={16}>
                <Heading fontSize={{ base: "2xl", md: "3xl" }}>
                    Team <Box as="span" color="gray.400">Members</Box>
                </Heading>
                <Text color="gray.500" textAlign="center">
                    Meet the minds behind the magic .
                </Text>
            </VStack>

            <Section title="Co Founders" members={teamData.cofounders} />
            <Section title="Development Team" members={teamData.development} />
            <Section title="Communications Team" members={teamData.communications} />
        </Container>
    );
}
