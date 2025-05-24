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
            <GetInvolvedHero />
            <WaysToContribute />


            <Box bg="white" py={{ base: "30px", md: "120px" }} px={{ base: "20px", lg: "30px" }} >
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

              <Flex direction={['column', null, 'row']} gap={4} bg="#E5FFF3" borderRadius={{ base: "20px", md: "40px" }} pt={{ base: "20px", md: "60px" }} pl={{ base: "0px", md: "60px" }} >
                {/* FAQ Accordion */}
                <Box flex="1" bg="green.50" borderRadius="lg">
                  <Accordion allowToggle>
                    {faqItems.map((item, index) => (
                      <AccordionItem key={index} mb={4}>
                        <h2>
                          <AccordionButton _focus={{ boxShadow: 'none' }} _expanded={{ bg: 'green.100' }} fontSize={{ base: "12px", md: "13px", lg: "18px" }}>
                            <Box flex="1" textAlign="left" fontWeight="bold">
                              {item.question}
                            </Box>
                            <AccordionIcon />
                          </AccordionButton>
                        </h2>
                        <AccordionPanel pb={4} color="gray.600" fontSize={{ base: "12px", md: "12px", lg: "18px" }}>
                          {item.answer}
                        </AccordionPanel>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </Box>

                {/* Image */}
                <Box flex="1 0" display="flex"  alignItems={{base: "center", smd: "flex-end"}} justifyContent={{base: "center", smd: "flex-end"}}>
                  <Box overflow="hidden">
                    <Image
                      src={studentImg}
                      alt="Happy student"
                      objectFit="cover"
                      width="100%"
                      maxW="100%"
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


