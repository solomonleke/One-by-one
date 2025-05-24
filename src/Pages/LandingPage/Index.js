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
  Spacer,
  Wrap,
  useColorModeValue,
  grid,
  Grid,
  GridItem,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom'
import { FaArrowRight } from 'react-icons/fa';
import { FaHandHoldingHeart } from "react-icons/fa6";
import { LuHeartHandshake } from "react-icons/lu";
import { PiHandHeartBold, PiPlant, PiHandCoins } from "react-icons/pi";
import { RiUserSettingsLine } from "react-icons/ri";
import MainLayout from '../../LandingPageLayout'
import LandingPageImg from "../../Asset/LandingPageImg.jpg"
import AboutUsImg from "../../Asset/AboutUsImg.png"
import fingerPrint from "../../Asset/fingerPrint.png"
import greenBackground from "../../Asset/greenBackground.png"
import ChildrenImage from "../../Asset/ChildrenImage.png"
import studentImg from "../../Asset/studentImg.png"
import { FaArrowRightLong } from "react-icons/fa6";
import AboutOneByOne from '../../LandingPageComponents/AboutOneByOne';
import Values from '../../LandingPageComponents/ValuesComponent';
import YourHelp from '../../LandingPageComponents/YourHelp';
import BeTheChange from '../../LandingPageComponents/BeTheChange';


const Feature = ({ title, text, icon }) => (
  <Stack align="center" textAlign="center" p={4}>
    <Icon as={icon} w={10} h={10} color="teal.400" />
    <Text fontWeight="bold">{title}</Text>
    <Text color="gray.500">{text}</Text>
  </Stack>
);



export default function LandingPage() {


  const navigate = useNavigate();

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

  const roles = [
    {
      title: 'Sponsor',
      description: 'Support a student’s future directly.',
      icon: <PiHandCoins fontSize="35px" color="#39996B" />,
      label: null,
    },
    {
      title: 'School Admin',
      description: 'Work with us to identify students in need.',
      icon: <RiUserSettingsLine fontSize="35px" color="#39996B" />,
      label: { text: 'Partner role', color: '#FFBC4F', bg: '#FFF7EA' },
    },
    {
      title: 'Scholarship Admin',
      description: 'Match students with opportunities.',
      icon: <PiHandCoins fontSize="35px" color="#39996B" />,
      label: { text: 'Volunteer role', color: '#FFBC4F', bg: '#FFF7EA' },
    },
    {
      title: 'Fund Admin',
      description: 'Manage funds and ensure transparency.',
      icon: <RiUserSettingsLine fontSize="35px" color="#39996B" />,
      label: { text: 'Volunteer role', color: '#FFBC4F', bg: '#FFF7EA' },
    },
  ];

  return (
    <MainLayout>
      <Box>
        {/* Hero Section */}
        <Flex
          direction={{ base: 'column', md: 'row' }}
          align="center"
          justify="center"
          px={{ base: "20px", lg: "30px" }}
          py={20}
          bg="#082A26"
          color="white"
          bgImage={`linear-gradient(to right, rgba(0, 0, 0, 0.8) 0%, rgba(57, 153, 107, 0.95) 80%), url(${LandingPageImg})`}
          bgPosition="center"
          bgRepeat="no-repeat"
          bgSize="cover"
          zIndex="1001"
        >
          <Stack spacing={6} maxW="846px" align="center" textAlign="center">
            <Text fontSize={{ base: "12px", md: "15px" }} w="fit-content" borderRadius="22px" bg="#FFBC4F" px="14px">
              Building brighter paths for tomorrow's leaders
            </Text>
            <Text fontSize={{ base: "30px", md: "71px" }} fontWeight="600" color="white" >
              Change One Life Today Make an{" "}
              <Text as="span" color="#8C9492">
                Impact Forever
              </Text>
            </Text>
            <Text fontSize={{ base: "12px", md: "18px" }}>
              Join us in making a lasting impact by supporting deserving students through personalized scholarships and mentorship.
            </Text>
            <Flex gap="10px" w="100%" maxW={{ base: "100%", md: "358px" }} alignItems="center" display={{ base: 'grid', md: 'flex' }}>
              <Button _focus={{ boxShadow: 'none' }} w={{ base: '100%', md: "171px" }} bg="white" fontSize="14px" px="28px" py="10px" color="#2E2B24" _hover={{ bg: "transparent", color: "white", border: "1px solid" }} onClick={() => {
                navigate("/sign-in")
              }} >sponsor a student</Button>
              <Button _focus={{ boxShadow: 'none' }} w={{ base: '100%', md: "171px" }} border="1px" bg="transparent" fontSize="14px" px="28px" py="10px" color="#ffff" _hover={{ bg: "white", color: "#2E2B24", border: "none" }} onClick={() => {
                navigate("/sign-in")
              }} >Start Volunteering</Button>
            </Flex>
          </Stack>


        </Flex>

        {/* Features Section */}
        <Box >
          <AboutOneByOne />
          <Values />
          <Box bg="#091C13" align="center" justifyContent="center" py="80px"   >
            <Box align="center"  justifyContent="center" px={{ base: "20px", lg: "30px" }} display={{ base: "block", md: "flex" }} alignItems="center">
              <Text fontSize={{ base: "20px", md: "30px", lg: "50px" }} fontWeight="700" textAlign="center" mr={{ base: "none", md: "50px", lg: "150px" }} mb={{ base: "20px", md: "none" }}>
                Our{" "}
                <Text as="span" color="#8C9492">
                  Impact
                </Text>
              </Text>
              <Box >
                <Box  display={["block", "block","flex","flex","flex"]} alignItems="center" justifyContent="center" gap="10px">
                  <Box  borderRadius="15px" mb={{ base: "20px", md: "none" }}  borderLeftWidth="3px" borderLeftStyle="solid" borderLeftColor="#39996B29" p={{ base: "20px", md: "30px" }}  >
                    <Text fontSize={{ base: "30px", md: "35px", lg: "48px" }} fontWeight="600" color="#98ACA3">100+</Text>
                    <Text fontSize={{ base: "13px", md: "15px", lg: "17px" }} fontWeight="400" color="white" >students mentored</Text>
                  </Box>
                  <Box borderRadius="15px" mb={{ base: "20px", md: "none" }} borderLeftWidth="3px" borderLeftStyle="solid" borderLeftColor="#39996B29" p="30px"  >
                    <Text fontSize={{ base: "30px", md: "35px", lg: "48px" }} fontWeight="600" color="#98ACA3">50+</Text>
                    <Text fontSize={{ base: "13px", md: "15px", lg: "17px" }} fontWeight="400" color="white" >partnered schools</Text>
                  </Box>
                  <Box borderRadius="15px" mb={{ base: "20px", md: "none" }} borderLeftWidth="3px" borderLeftStyle="solid" borderLeftColor="#39996B29" p="30px"  >
                    <Text fontSize={{ base: "30px", md: "35px", lg: "48px" }} fontWeight="600" color="#98ACA3">160+</Text>
                    <Text fontSize={{ base: "13px", md: "15px", lg: "17px" }} fontWeight="400" color="white" >sponsored students</Text>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
          <YourHelp />
          <Box bg="#091C13" color="white" py={{ base: '80px', md: '120px' }} px={{ base: '20px', md: '30px' }}>
      <Grid
        templateColumns={{ base: '1fr', lg: '1fr 1fr' }}
        gap="40px"
        alignItems="start"
      >
        {/* Left Content */}
        <Stack spacing={6} >
          <Text fontSize={{ base: '12px', md: '15px' }} color="#FAA51C" fontWeight="700">
            Join the movement
          </Text>
          <Text fontSize={{ base: '30px', md: '50px' }} fontWeight="600" lineHeight="1.2">
            Be part of the{' '}
            <Text as="span" color="#8C9492">
              Change
            </Text>
          </Text>
          <Text fontSize={{ base: '14px', md: '18px' }} color="#71717A" maxW="500px">
            Our mission thrives because of people like you—dedicated volunteers and sponsors who make education possible for disadvantaged students.
          </Text>
          <Button
            bg="#39996B"
            color="white"
            fontWeight="500"
            fontSize={{ base: '13px', md: '16px' }}
            px="28px"
            py="10px"
            maxW="fit-content"
            rightIcon={<FaArrowRightLong />}
            _focus={{ boxShadow: 'none' }}
            _hover={{ bg: 'transparent', color: 'white', border: '1px solid white' }}
            onClick={() => navigate('/get-involved')}
          >
            Learn more about our roles
          </Button>
        </Stack>

        {/* Right Grid Role Cards */}
        <Grid
          templateColumns={{ base: '1fr', sm: '1fr 1fr' }}
          gap="20px"
        >
          {roles.map((role, i) => (
            <GridItem
              key={i}
              bg="white"
              color="#2E2B24"
              borderRadius="30px"
              boxShadow="0px 4px 20px rgba(0, 0, 0, 0.1)"
              p="25px"
              display="flex"
              flexDirection="column"
              justifyContent="space-between"
              minH="230px"
            >
              <HStack justifyContent="space-between" mb="15px">
                {role.icon}
                <Box
                  fontSize="28px"
                  color="#71717A"
                  transition="transform 0.2s ease-in-out"
                  _hover={{ transform: 'scale(1.5)' }}
                  cursor="pointer"
                  onClick={() => navigate('/get-involved')}
                >
                  <FaArrowRight />
                </Box>
              </HStack>
              <VStack align="start" spacing={3}>
                <HStack justify="space-between" w="full">
                  <Text fontSize={{ base: '14px', md: '18px' }} fontWeight="600">
                    {role.title}
                  </Text>
                  {role.label && (
                    <Text
                      fontSize={{ base: '8px', md: '10px' }}
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
                </HStack>
                <Text fontSize={{ base: '12px', md: '15px' }} color="#71717A">
                  {role.description}
                </Text>
                <Spacer />
                <Button
                  size="sm"
                  variant="outline"
                  color="#39996B"
                  borderColor="#39996B"
                  _focus={{ boxShadow: 'none' }}
                  _hover={{ bg: '#39996B', color: 'white', border: '1px solid white' }}
                  fontSize={{ base: '10px', md: '14px' }}
                  mt="auto"
                  onClick={() => { navigate("/sign-up")}}
                >
                  Get Started
                </Button>
              </VStack>
            </GridItem>
          ))}
        </Grid>
      </Grid>
    </Box>


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
                          <AccordionButton _focus={{ boxShadow: 'none' }}  _expanded={{ bg: 'green.100' }} fontSize={{ base: "12px", md: "13px", lg: "18px" }}>
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
        </Box>
      </Box>
    </MainLayout>
  );
};


