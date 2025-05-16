import {
    Box,
    Flex,
    Heading,
    Text,
    Button,
    Stack,
    Image,
    Icon,
    HStack,
    VStack,
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
    Grid,
    SimpleGrid,
    Spacer,
    useColorModeValue,
    grid,
} from '@chakra-ui/react';
import { FaArrowRight } from 'react-icons/fa';
import { FaHandHoldingHeart } from "react-icons/fa6";
import { LuPenTool } from "react-icons/lu";
import { PiHandHeartBold, PiPlant, PiHandCoins } from "react-icons/pi";
import { RiUserSettingsLine } from "react-icons/ri";
import MainLayout from '../../LandingPageLayout'
import LandingPageImg from "../../Asset/LandingPageImg.jpg"
import Image0 from "../../Asset/Image.png"
import Image1 from "../../Asset/Image-1.png"
import Image2 from "../../Asset/Image-2.png"
import Image3 from "../../Asset/Image-3.png"
import AboutUsImg from "../../Asset/AboutUsImg.png"
import AboutProp from "../../Asset/AboutProp.png"
import fingerPrint from "../../Asset/fingerPrint.png"
import Group from "../../Asset/Group.png"
import Group1 from "../../Asset/Group1.png"
import Group2 from "../../Asset/Group2.png"
import Vector from "../../Asset/Vector.png"
import { PiShootingStar } from "react-icons/pi";
import studentImg from "../../Asset/studentImg.png"
import { FaArrowRightLong } from "react-icons/fa6";
import GetInvolvedHero from '../../LandingPageComponents/GetInvolvedHero';
import WaysToContribute from '../../LandingPageComponents/WaysToContribute';
import BeTheChange from '../../LandingPageComponents/BeTheChange';



export default function GetInvolved() {

    const faqItems = [
        {
            question: 'What Is The One By One Platform?',
            answer:
                'The One by One platform connects teenage students in underserved communities with mentors and sponsors, providing scholarships and guidance to help them achieve academic and personal success.',
        },
        {
            question: 'How Do Scholarships Work?',
            answer:
                'Scholarships are provided through donations and sponsorships, covering academic expenses and ensuring students stay in school.',
        },
        {
            question: 'How Can I Sponsor A Student?',
            answer:
                'You can sponsor a student by signing up on the platform and selecting a student to support financially and/or through mentorship.',
        },
        {
            question: 'What Role Do Schools Play On The Platform?',
            answer:
                'Schools help identify eligible students and collaborate to track academic progress and mentorship outcomes.',
        },
        {
            question: 'Can I Volunteer Without Mentoring Or Sponsoring?',
            answer:
                'Yes, you can volunteer by offering skills, helping with platform logistics, or participating in community outreach events.',
        },
        {
            question: 'How Do Students Apply For Scholarships?',
            answer:
                'Students can apply through partnered schools or directly via the platform’s application form, with support from mentors.',
        },
    ];

    return (
        <MainLayout>
            <Box
  py={{ base: "60px", md: "105px" }}
  px={{ base: "20px", sm: "30px", md: "50px" }}
  align="center"
  bg="linear-gradient(to right, rgb(0, 25, 6) 0%, rgba(19, 100, 61, 0.95) 80%)"
>
  <Box w="100%" maxW={{ base: "100%", md: "933px" }} textAlign="center">
    <Text
      fontSize={{ base: "24px", sm: "30px", md: "50px" }}
      fontWeight="600"
      letterSpacing={{ base: "-1px", md: "-2px" }}
      color="white"
    >
      Your Role in Changing Lives Starts{" "}
      <Text as="span" color="#8C9492">
        Here
      </Text>
    </Text>

    <Text
      fontSize={{ base: "14px", sm: "16px", md: "18px" }}
      fontWeight="400"
      color="#FFFF"
      mt={{ base: "20px", md: "27px" }}
    >
      One by One offers multiple ways to get involved. Choose the role that aligns
      with your passion and expertise to help students unlock their potential.
    </Text>
  </Box>
</Box>


            <Flex
                direction="column"
                align={{ base: "center", md: "flex-start" }}
                justify="center"
                gap={10}
                px={{ base: 4, md: 8 }}
                py={{ base: 10, md: 20 }}
                bg="white"
                color="white"
            >
                {/* Header Text */}
                <Stack maxW="661px" align={{ base: "center", md: "flex-start" }} textAlign={{ base: "center", md: "left" }}>
                    <Text fontSize="15px" w="fit-content" color="#FAA51C" fontWeight="700">
                        ways to contribute
                    </Text>
                    <Text fontSize={{ base: "25px", md: "50px" }} fontWeight="600" color="black">
                        Explore our{" "}
                        <Text as="span" color="#8C9492">
                            Opportunities
                        </Text>
                    </Text>
                </Stack>

                {/* Role Cards */}
                <SimpleGrid
  columns={{ base: 1, md: 2 }}
  spacing="20px"
  px={{ base: "10px", md: "50px" }}
  maxW="100%"
>
  {[
    {
      title: "Sponsor",
      description: `Every student we support is one step closer to achieving their biggest dreams. Your generosity helps provide the essential resources they need to excel in school and far beyond.`,
      bgImage: `url(${Vector})`,
      bg: "#D8FFEC",
      action: "Start Sponsoring",
    },
    {
      title: "School Admin",
      description: `Every student we support is one step closer to achieving their biggest dreams. Your generosity helps provide the essential resources they need to excel in school and far beyond.`,
      bgImage: `url(${Group})`,
      bg: "#D8FFEC",
      action: "Start Partnering",
      label: { text: "Partner role", color: "#FFBC4F", bg: "#FFF7EA" },
    },
    {
      title: "Scholarship Admin",
      description: `Every student we support is one step closer to achieving their biggest dreams. Your generosity helps provide the essential resources they need to excel in school and far beyond.`,
      bgImage: `url(${Group1})`,
      bg: "#D8FFEC",
      action: "Start Volunteering",
      label: { text: "Volunteer role", color: "#FFBC4F", bg: "#FFF7EA" },
    },
    {
      title: "Fund Admin",
      description: `Every student we support is one step closer to achieving their biggest dreams. Your generosity helps provide the essential resources they need to excel in school and far beyond.`,
      bgImage: `url(${Group2})`,
      bg: "#D8FFEC",
      action: "Start Volunteering",
      label: { text: "Volunteer role", color: "#FFBC4F", bg: "#FFF7EA" },
    },
  ].map((role, i) => (
    <Box
      key={i}
      w="100%"
      bgImage={role.bgImage}
      bgSize="cover"
      bgPosition="center"
      bgRepeat="no-repeat"
      borderRadius="30px"
      boxShadow="0px 4px 20px rgba(0, 0, 0, 0.1)"
      p={{ base: "15px", md: "25px" }}
      minH="250px"
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
    >
      <HStack justifyContent="space-between" mb="15px">
        {role.icon}
      </HStack>

      <VStack align="start" spacing={3} h="100%">
        <Flex justify="space-between" w="full" align="center">
          <Text fontSize={{ base: "16px", md: "18px" }} fontWeight="600" color="#2E2B24">
            {role.title}
          </Text>
          {role.label && (
            <Text
              fontSize="12px"
              px="6px"
              border="0.6px solid"
              borderColor={role.label.color}
              color={role.label.color}
              borderRadius="4px"
              bg={role.label.bg}
              w="fit-content"
            >
              {role.label.text}
            </Text>
          )}
        </Flex>

        <Text fontSize={{ base: "13px", md: "15px" }} color="#71717A" >
          {role.description}
        </Text>

        <Spacer />
        <Button
          size="sm"
          variant="outline"
          color="#39996B"
          borderColor="#39996B"
          _hover={{ bg: "transparent" }}
          fontSize={{ base: "13px", md: "14px" }}
        >
          {role.action}
        </Button>
      </VStack>
    </Box>
  ))}
</SimpleGrid>


            </Flex>


            <Box bg="white" p={{ base: "30px", md: "120px" }}>
                <Box maxW="7xl" mx="auto" >
                    <Text color="orange.400" fontWeight="bold" fontSize={{ base: "13px", md: "15px" }} mb={2}>
                        FREQUENTLY ASKED QUESTIONS
                    </Text>
                    <Heading as="h2" fontSize={{ base: "25px", md: "50px" }} mb={8}>
                        Here’s The Answers For{' '}
                        <Box as="span" color="gray.500">
                            Your Questions
                        </Box>
                    </Heading>

                    <Flex direction={['column', null, 'row']} gap={8} bg="#E5FFF3" borderRadius={{ base: "20px", md: "40px" }} pt={{ base: "20px", md: "60px" }} pl={{ base: "0px", md: "60px" }} >
                        {/* FAQ Accordion */}
                        <Box flex="1" bg="green.50" borderRadius="lg">
                            <Accordion allowToggle>
                                {faqItems.map((item, index) => (
                                    <AccordionItem key={index} mb={4}>
                                        <h2>
                                            <AccordionButton _expanded={{ bg: 'green.100' }} fontSize={{ base: "13px", md: "18px" }}>
                                                <Box flex="1" textAlign="left" fontWeight="bold">
                                                    {item.question}
                                                </Box>
                                                <AccordionIcon />
                                            </AccordionButton>
                                        </h2>
                                        <AccordionPanel pb={4} color="gray.600" fontSize={{ base: "12px", md: "18px" }}>
                                            {item.answer}
                                        </AccordionPanel>
                                    </AccordionItem>
                                ))}
                            </Accordion>
                        </Box>

                        {/* Image */}
                        <Box flex="1" display="flex" alignItems="center" justifyContent="center">
                            <Box overflow="hidden">
                                <Image
                                    src={studentImg}
                                    alt="Happy student"
                                    objectFit="cover"
                                    width="100%"
                                    height="100%"
                                    maxH="500px"
                                />
                            </Box>
                        </Box>
                    </Flex>
                </Box>
            </Box>
            <BeTheChange />
        </MainLayout>
    );
};


