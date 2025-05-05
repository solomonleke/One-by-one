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
  useColorModeValue,
  grid,
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
import AboutProp from "../../Asset/AboutProp.png"
import fingerPrint from "../../Asset/fingerPrint.png"
import greenBackground from "../../Asset/greenBackground.png"
import ChildrenImage from "../../Asset/ChildrenImage.png"
import studentImg from "../../Asset/studentImg.png"
import { FaArrowRightLong } from "react-icons/fa6";


const Feature = ({ title, text, icon }) => (
  <Stack align="center" textAlign="center" p={4}>
    <Icon as={icon} w={10} h={10} color="teal.400" />
    <Text fontWeight="bold">{title}</Text>
    <Text color="gray.500">{text}</Text>
  </Stack>
);



export default function LandingPage() {


  const router = useNavigate();

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
      <Box>
        {/* Hero Section */}
        <Flex
          direction={{ base: 'column', md: 'row' }}
          align="center"
          justify="center"
          px={8}
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
            <Text fontSize={{base:"12px", md:"15px"}} w="fit-content" borderRadius="22px" bg="#FFBC4F" px="14px">
              Building brighter paths for tomorrow's leaders
            </Text>
            <Text fontSize={{base:"30px", md:"71px"}} fontWeight="600" color="white" >
            Change One Life Today Make an{" "}
                <Text as="span" color="#8C9492">
                Impact Forever
                </Text>
            </Text>
            <Text  fontSize={{base:"12px", md:"18px"}}>
              Join us in making a lasting impact by supporting deserving students through personalized scholarships and mentorship.
            </Text>
            <Flex gap="10px" w="100%" maxW={{base: "100%", md: "358px"}}  alignItems="center" display={{ base: 'grid', md: 'flex' }}>
              <Button  w={{base: '100%', md: "171px"}} bg="white" fontSize="14px" px="28px" py="10px" color="#2E2B24" onClick={() => {
              router("/sign-in")}} >sponsor a student</Button>
              <Button w={{base: '100%', md: "171px"}} border="1px" bg="transparent" fontSize="14px" px="28px" py="10px" color="#ffff" onClick={() => {
                router("/sign-in")}} >Start Volunteering</Button>
            </Flex>
          </Stack>


        </Flex>

        {/* Features Section */}
        <Box >
          <Flex
            direction={{ base: 'column', md: 'row' }}
            align="left"
            justify="left"
            gap={10}
            px={8}
            py={20}
            bg="white"
            color="white"
          >
            <Stack maxW="661px" align="left" textAlign="left">
              <Text fontSize="15px" w="fit-content" color="#FAA51C" fontWeight="700">
                about one by one
              </Text>
              <Text  fontSize={{base:"25px", md:"50px"}} fontWeight="600" color="black" >
                Transforming Lives Through{" "}
                <Text as="span" color="#8C9492">
                  Education & Mentorship
                </Text>
              </Text>
              <Text  fontSize={{base:"10px", md:"17px"}} color="#71717A" w={{base: "300px", md: "500px"}}>
                At One by One, we believe in the power of individual impact. Our
                mission is simple: to connect promising students from
                underserved communities with sponsors and mentors who can change their lives.
              </Text>
              <Flex >
                <Button w={{base:"150px", md: "171px"}} bg="#39996B" fontWeight="400" fontSize={{base:"12px", md:"14px"}} px="28px" py="10px" color="#ffff" rightIcon={<FaArrowRightLong />}>learn more about us </Button>
              </Flex>
            </Stack>
            <Image
              src={AboutUsImg}
              alt="About Us"
              w={{base:"300px", md: "400px"}}
              h={{base:"300px", md: "400px"}}
            />
            {/* <Image
              src={AboutProp}
              position="absolute"
              top="45%"
              right="0"
              transform="translate(40%, -40%) rotate(45deg)"
              alt="About Us Decorative"
              maxW="300px"
              maxH="300px"
              zIndex="0"
              pointerEvents="none"
            /> */}

          </Flex>
          <Box align="center" bg="white" justifyContent="center" bgImage={greenBackground} bgPosition="center" bgRepeat="no-repeat" bgSize="cover" py={{base:"100px", md: "135px"}} px={{base:"50px", md: "120px", lg: "140px"}} >

            <Text  fontSize={{base:"23px", md:"50px"}} fontWeight="700" textAlign="center">
              onebyOne’s{" "}
              <Text as="span" color="#8C9492">
                Values
              </Text>
            </Text>

            <Grid display={{base: "grid", md: "flex"}} gap="18px" templateColumns={{ base: "1fr", md: "2fr", lg: "3fr"}} mt="40px">
              <Box maxW="357px" py="40px" px="18px" mt="34px" boxShadow="0px 4px 20px rgba(0, 0, 0, 0.1)" borderRadius="30px" bg="white" >
                <HStack maxW="303px" justifyContent="space-between" mb="40px">
                  <Image src={fingerPrint} alt="Fingerprint" w={{base: "20px", md: "40px"}} />
                  <FaArrowRight color="#71717A" w={{base: "20px", md: "40px"}} />
                </HStack>
                <VStack textAlign="left" align="left" >
                  <Text fontSize={{base: "15px", md: "21px"}} align="left" fontWeight="600" color="#2E2B24" mb="10px" >Value 1</Text>
                  <Text  fontSize={{base: "13px", md: "17px"}} fontWeight="400" color="#71717A" >
                    Every student we support is one step
                    closer to achieving their biggest
                    dreams. Your generosity helps provide
                    the essential resources they need to
                    excel in school and far beyond.
                  </Text>
                </VStack>
              </Box>
              <Box maxW="357px" py="40px" px="27px" mt="34px" boxShadow="0px 4px 20px rgba(0, 0, 0, 0.1)" borderRadius="30px" bg="white">
                <HStack maxW="303px" justifyContent="space-between" mb="40px">
                  <Image src={fingerPrint} alt="Fingerprint" w={{base: "20px", md: "40px"}}/>
                  <FaArrowRight color="#71717A" />
                </HStack>
                <VStack textAlign="left" align="left" >
                  <Text fontSize={{base: "15px", md: "21px"}} align="left" fontWeight="600" color="#2E2B24" mb="10px" >Value 2</Text>
                  <Text fontSize={{base: "13px", md: "17px"}} fontWeight="400" color="#71717A" >
                    Every student we support is one step
                    closer to achieving their biggest
                    dreams. Your generosity helps provide
                    the essential resources they need to
                    excel in school and far beyond.
                  </Text>
                </VStack>
              </Box>
              <Box maxW="357px" py="40px" px="27px" mt="34px" boxShadow="0px 4px 20px rgba(0, 0, 0, 0.1)" borderRadius="30px" bg="white">
                <HStack maxW="303px" justifyContent="space-between" mb="40px">
                  <Image src={fingerPrint} alt="Fingerprint" w={{base: "20px", md: "40px"}}/>
                  <FaArrowRight color="#71717A" />
                </HStack>
                <VStack textAlign="left" align="left" >
                  <Text fontSize={{base: "15px", md: "21px"}} align="left" fontWeight="600" color="#2E2B24" mb="10px" >Value 3</Text>
                  <Text fontSize={{base: "13px", md: "17px"}} fontWeight="400" color="#71717A" >
                    By sponsoring a scholarship or
                    becoming a mentor, you’re offering
                    more than financial support. You’re
                    giving hope, building confidence, and
                    shaping a brighter future.
                  </Text>
                </VStack>
              </Box>
            </Grid>

          </Box>
          <Box bg="#091C13" align="center" justifyContent="center" py="80px" px="60px">
            <Box align="center" justifyContent="center" display={{base: "grid", md: "flex"}}>
              <Text fontSize={{base: "20px", md: "50px"}} fontWeight="700" textAlign="center" mr={{base: "none", md: "150px"}} mb={{base: "20px", md: "none"}}>
                Our{" "}
                <Text as="span" color="#8C9492">
                  Impact
                </Text>
              </Text>
              <Box >
                <Box display={{base: "grid", md: "flex"}} gap="10px">
                  <VStack borderRadius="15px" mb={{base: "20px", md: "none"}} borderLeftWidth="3px" borderLeftStyle="solid" borderLeftColor="#39996B29" p={{base: "20px", md: "30px"}}  >
                    <Text fontSize={{base: "30px", md: "48px"}} fontWeight="600" color="#98ACA3">100+</Text>
                    <Text fontSize={{base: "14px", md: "17px"}} fontWeight="400" color="white" >students mentored</Text>
                  </VStack>
                  <VStack borderRadius="15px" mb={{base: "20px", md: "none"}} borderLeftWidth="3px" borderLeftStyle="solid" borderLeftColor="#39996B29" p="30px"  >
                    <Text fontSize={{base: "30px", md: "48px"}} fontWeight="600" color="#98ACA3">50+</Text>
                    <Text fontSize={{base: "14px", md: "17px"}} fontWeight="400" color="white" >partnered schools</Text>
                  </VStack>
                  <VStack borderRadius="15px" mb={{base: "20px", md: "none"}} borderLeftWidth="3px" borderLeftStyle="solid" borderLeftColor="#39996B29" p="30px"  >
                    <Text fontSize={{base: "30px", md: "48px"}} fontWeight="600" color="#98ACA3">160+</Text>
                    <Text fontSize={{base: "14px", md: "17px"}} fontWeight="400" color="white" >sponsored students</Text>
                  </VStack>
                </Box>
              </Box>
            </Box>
          </Box>
          <Box bg="#17422D" p="10px" h="762px" alignContent="center" align="center" justifyContent="center">
            <Box display={{base:"grid", md:"flex"}} justifyContent="center">
              <Box mr={{base:"none", md:"41px", lg:"61px"}}>
                <Image src={ChildrenImage} zIndex="1001"  w={{base:"350px", md:"463px"}} h="auto" borderRadius="10.41px" />
              </Box>
              <VStack maxW={{base:"500px", md:"350px", lg:"500px"}} align={{base:"center", md:"left"}} textAlign="left" >
                <Text fontSize={{base: "30px", md: "40px", lg:"50px"}} fontWeight="700"  >
                  Your Help{" "}
                  <Text as="span" color="#8C9492">
                    Matters
                  </Text>
                </Text>
                <Text fontSize={{base: "13px", md: "15px", lg:"17px"}} textAlign={{base:"center", md:"left"}} fontWeight="400" color="white">
                  Every student we support is one step closer to achieving their
                  biggest dreams. Your generosity helps provide the essential
                  resources they need to excel.
                </Text>

                <Flex p="20px" w={{base:"350px", md: "350px", lg:"480px"}} border="1px solid rgba(255, 255, 255, 0.23)" color="white" borderRadius="10px" fontWeight="600" align="center">
                  <PiHandHeartBold fontSize={{base:"30px", md:"35px"}} />
                  <Text fontSize={{base:"13px", md:"13px", lg: "17px"}} ml="5px" >Be the Hope disadvantaged students Deserve</Text>
                </Flex>
                <Flex p="20px" w={{base:"350px", md: "350px", lg:"480px"}} border="1px solid rgba(255, 255, 255, 0.23)" color="white" borderRadius="10px" fontWeight="600" align="center">
                  <LuHeartHandshake fontSize={{base:"30px", md:"35px"}} />
                  <Text fontSize={{base:"13px", md:"13px", lg: "17px"}} ml="5px" >Support Dreams</Text>
                </Flex>
                <Flex p="20px" w={{base:"350px", md: "350px", lg:"480px"}} border="1px solid rgba(255, 255, 255, 0.23)" color="white" borderRadius="10px" fontWeight="600" align="center">
                  <PiPlant fontSize={{base:"30px", md:"35px"}} />
                  <Text fontSize={{base:"13px", md:"13px", lg: "17px"}} ml="5px" >Invest in a Brighter Future</Text>
                </Flex>
              </VStack>
            </Box>

          </Box>
          <Box>
            <Flex
              direction={{ base: 'column', md: 'row' }}
              align="left"
              justify="left"
              py="151px"
              px="30px"
              bg="#091C13"
              color="white"
            >
              <Stack maxW="661px" align="left" textAlign="left" justifyContent="center">
                <Text fontSize={{base:"12px", md:"15px"}} w="fit-content" color="#FAA51C" fontWeight="700">
                  join the movement
                </Text>
                <Text fontSize={{base:"25px", md:"50px"}} letterSpacing="-2px" fontWeight="600" color="white" >
                  Be part of the{" "}
                  <Text as="span" color="#8C9492">
                    Change
                  </Text>
                </Text>
                <Text fontSize={{base:"13px", md:"18px"}} letterSpacing="-1px" fontWeight="400" color="#71717A" w={{base:"350px", md:"500px"}}>
                  Our mission thrives because of people like you—dedicated
                  volunteers and sponsors who make education possible for
                  disadvantaged students.
                </Text>
                <Flex >
                  <Button maxW="275px" bg="#39996B" fontWeight="400" mb={{base:"20px", md:"none"}} fontSize={{base:"13px", md:"14px"}} px="28px" py="10px" color="#ffff" rightIcon={<FaArrowRightLong />}>learn more about our roles </Button>
                </Flex>
              </Stack>
              <Box display="grid" gap="20px">
                <Box display={{base:"grid", md:"flex"}} justifyContent="center" gap="20px" >
                  <Box w="327px" maxH="250px" alignContent="center" py="40px" px="25px" boxShadow="0px 4px 20px rgba(0, 0, 0, 0.1)" borderRadius="30px" bg="white">
                    <HStack maxW="303px" justifyContent="space-between" mb="15px" >
                      <PiHandCoins fontSize="35px" color="#39996B" />
                      <FaArrowRight fontSize="32px" color="#71717A" />
                    </HStack>
                    <VStack textAlign="left" align="left" >
                      <Box mb="15px">
                        <Text fontSize={{base:"15px", md:"18px"}} align="left" fontWeight="600" color="#2E2B24"  >Sponsor</Text>
                        <Text fontSize={{base:"13px", md:"15px"}} fontWeight="400" color="#71717A" >
                          Support a student’s future directly.
                        </Text>
                      </Box>
                      <Button maxW="133px" fontSize={{base:"13px", md:"15px"}} background="transparent" color="#39996B" border="1px solid #39996B">Get Started</Button>
                    </VStack>
                  </Box>
                  <Box w="327px" maxH="250px" alignContent="center" py="40px" px="25px" boxShadow="0px 4px 20px rgba(0, 0, 0, 0.1)" borderRadius="30px" bg="white">
                    <HStack maxW="303px" justifyContent="space-between" mb="15px" >
                      <RiUserSettingsLine fontSize="35px" color="#39996B" />
                      <FaArrowRight fontSize="32px" color="#71717A" />
                    </HStack>
                    <VStack textAlign="left" align="left" >
                      <Box mb="15px">
                        <Flex justifyContent="space-between" alignItems="center">
                          <Text fontSize={{base:"15px", md:"18px"}} align="left" fontWeight="600" color="#2E2B24"  >school admin </Text>
                          <Text fontSize="12px" border="0.6px solid #FFBC4F" w="fit-content" borderRadius="4px" color="#FFBC4F" bg="#FFF7EA" px="6px">Partner role</Text>
                        </Flex>
                        <Text fontSize={{base:"13px", md:"15px"}} fontWeight="400" color="#71717A" >
                          Work with us to identify students in need.
                        </Text>
                      </Box>
                      <Button maxW="133px" fontSize={{base:"13px", md:"15px"}} background="transparent" color="#39996B" border="1px solid #39996B">Get Started</Button>
                    </VStack>
                  </Box>
                </Box>

                <Box display={{base:"grid", md:"flex"}} justifyContent="center" gap="20px" >
                  <Box w="327px" maxH="250px" alignContent="center" py="40px" px="25px" boxShadow="0px 4px 20px rgba(0, 0, 0, 0.1)" borderRadius="30px" bg="white">
                    <HStack maxW="303px" justifyContent="space-between" mb="15px" >
                      <PiHandCoins fontSize="35px" color="#39996B" />
                      <FaArrowRight fontSize="32px" color="#71717A" />
                    </HStack>
                    <VStack textAlign="left" align="left" >
                      <Box mb="15px">
                        <Flex justifyContent="space-between" alignItems="center">
                          <Text fontSize={{base:"15px", md:"18px"}} align="left" fontWeight="600" color="#2E2B24"  >scholarship admin  </Text>
                          <Text fontSize="12px" border="0.6px solid #FFBC4F" w="fit-content" borderRadius="4px" color="#FFBC4F" bg="#FFF7EA" px="6px">volunteer role</Text>
                        </Flex>
                        <Text fontSize={{base:"13px", md:"15px"}} fontWeight="400" color="#71717A" >
                          Match students with opportunities.
                        </Text>
                      </Box>
                      <Button maxW="133px" fontSize={{base:"13px", md:"15px"}} background="transparent" color="#39996B" border="1px solid #39996B">Get Started</Button>
                    </VStack>
                  </Box>
                  <Box w="327px" maxH="250px" alignContent="center" py="40px" px="25px" boxShadow="0px 4px 20px rgba(0, 0, 0, 0.1)" borderRadius="30px" bg="white">
                    <HStack maxW="303px" justifyContent="space-between" mb="15px" >
                      <RiUserSettingsLine fontSize="35px" color="#39996B" />
                      <FaArrowRight fontSize="32px" color="#71717A" />
                    </HStack>
                    <VStack textAlign="left" align="left" >
                      <Box mb="15px">
                        <Flex justifyContent="space-between" alignItems="center">
                          <Text fontSize={{base:"15px", md:"18px"}} align="left" fontWeight="600" color="#2E2B24"  >fund admin </Text>
                          <Text fontSize="12px" border="0.6px solid #FFBC4F" w="fit-content" borderRadius="4px" color="#FFBC4F" bg="#FFF7EA" px="6px">volunteer role</Text>
                        </Flex>
                        <Text fontSize={{base:"13px", md:"15px"}} fontWeight="400" color="#71717A" >
                          Manage funds and ensure transparency.
                        </Text>
                      </Box>
                      <Button maxW="133px" fontSize={{base:"13px", md:"15px"}} background="transparent" color="#39996B" border="1px solid #39996B">Get Started</Button>
                    </VStack>
                  </Box>
                </Box>
              </Box>
            </Flex>
          </Box>

          <Box bg="white" p={{base:"30px", md:"120px"}}>
      <Box maxW="7xl" mx="auto" >
        <Text color="orange.400" fontWeight="bold" fontSize={{base:"13px", md:"15px"}} mb={2}>
          FREQUENTLY ASKED QUESTIONS
        </Text>
        <Heading as="h2" fontSize={{base:"25px", md:"50px"}} mb={8}>
          Here’s The Answers For{' '}
          <Box as="span" color="gray.500">
            Your Questions
          </Box>
        </Heading>

        <Flex direction={['column', null, 'row']} gap={8} bg="#E5FFF3"  borderRadius={{base:"20px", md:"40px"}} pt={{base:"20px", md:"60px"}} pl={{base:"0px", md:"60px"}} >
          {/* FAQ Accordion */}
          <Box flex="1" bg="green.50"  borderRadius="lg">
            <Accordion allowToggle>
              {faqItems.map((item, index) => (
                <AccordionItem key={index}  mb={4}>
                  <h2>
                    <AccordionButton _expanded={{ bg: 'green.100' }} fontSize={{base:"13px", md:"18px"}}>
                      <Box flex="1" textAlign="left" fontWeight="bold">
                        {item.question}
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                  </h2>
                  <AccordionPanel pb={4} color="gray.600" fontSize={{base:"12px", md:"18px"}}>
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
    <Flex
          direction={{ base: 'column', md: 'row' }}
          align="center"
          justify="center"
          px={8}
          py={20}
          bg="#17422D"
          color="white"
          
        >
          <Stack spacing={6} maxW="846px" align="center" textAlign="center">
            
            <Heading as="h2" fontSize={{base:"20px", md:"50px"}} fontWeight="bold" >
            Be the Change Students{' '}
          <Box as="span" color="gray.500">
          Are Hoping For!
          </Box>
        </Heading>
            <Text fontSize={{base:"12px", md:"18px"}}>
            It takes just one person to spark a lifetime of opportunities and hope for a student. Are you ready to be the one who makes that difference?
            </Text>
            <Box display={{base: "grid", md: "flex"}} gap="10px" w={{base: "100%", md: "358px"}} alignItems="center">
              <Button w={{base: "100%", md: "171px"}} bg="white" fontSize={{base:"12px", md:"14px"}} px="28px" py="10px" color="#2E2B24">sponsor a student</Button>
              <Button w={{base: "100%", md: "171px"}} border="1px" bg="transparent" fontSize={{base:"12px", md:"14px"}} px="28px" py="10px" color="#ffff">Start Volunteering</Button>
            </Box>
          </Stack>


        </Flex>
        </Box>
      </Box>
    </MainLayout>
  );
};


