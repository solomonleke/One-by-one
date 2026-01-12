import { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  Button,
  VStack,
  HStack,
  Flex,
} from '@chakra-ui/react';

export default function LaunchCountdown({ onClick }) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  // Your updated launch date: January 19, 2026
  const launchDate = new Date(2026, 0, 19, 0, 0, 0).getTime();

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const difference = launchDate - now;
      
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000)
        });
      }
    };
    
    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, [launchDate]);

  const units = [
    { label: 'DAYS', value: timeLeft.days, color: 'orange.400' },
    { label: 'HOURS', value: timeLeft.hours, color: 'yellow.400' },
    { label: 'MINUTES', value: timeLeft.minutes, color: 'green.400' },
    { label: 'SECONDS', value: timeLeft.seconds, color: 'teal.400' }
  ];

  return (
    <Box 
      minH="100vh" 
      bgGradient="linear(to-br, #1a4d2e, #2d5f4a, #1e5a3f)" 
      color="white" 
      display="flex" 
      alignItems="center"
    >
      <Container maxW="4xl" py={10}>
        <VStack spacing={12} textAlign="center">
          
          {/* Status Header */}
          <HStack w="full" justify="space-between" borderBottom="1px solid" borderColor="whiteAlpha.300" pb={4}>
            <Text fontWeight="black" fontSize="md" color="yellow.400" letterSpacing="widest">
              ONEBYONE
            </Text>
            <HStack spacing={2}>
              <Box w={2} h={2} bg="orange.400" borderRadius="full" />
              <Text fontSize="md" fontWeight="bold">
                {timeLeft.days} Day(s) Remaining
              </Text>
            </HStack>
          </HStack>

          {/* Core Content - Large and Impactful */}
          <VStack spacing={6}>
            <Heading fontSize={{ base: '3xl', md: '5xl' }} lineHeight="1.2" fontWeight="bold">
              "Talent is everywhere. <br />
              <Text as="span" color="teal.200" >
                Opportunity is not."
              </Text>
            </Heading>
           
            <Text fontSize={{ base: 'lg', md: 'xl' }} color="green.50" maxW="2xl" lineHeight="tall">
              Brilliant students carry big dreams—but lack support. 
              OneByOne connects them to those willing to stand with them.
            </Text>
          </VStack>

          {/* SINGLE ROW TIMER - Responsive & Bold */}
          <HStack spacing={{ base: 2, md: 4 }} w="full">
            {units.map((unit) => (
              <VStack
                key={unit.label}
                flex="1"
                bg="whiteAlpha.100"
                backdropFilter="blur(10px)"
                borderRadius="xl"
                py={{ base: 6, md: 8 }}
                border="2px solid"
                borderColor={unit.color}
                shadow="xl"
              >
                <Text fontSize={{ base: '3xl', md: '5xl' }} fontWeight="black" color={unit.color} lineHeight="1">
                  {String(unit.value).padStart(2, '0')}
                </Text>
                <Text fontSize={{ base: 'xs', md: 'sm' }} fontWeight="bold" opacity="0.8" letterSpacing="tighter">
                  {unit.label}
                </Text>
              </VStack>
            ))}
          </HStack>

          {/* Footer Actions */}
          <Flex 
            w="full" 
            direction={{ base: 'column', md: 'row' }} 
            align="center" 
            justify="space-between" 
            gap={6}
          >
            <Button
              size="lg"
              h="60px"
              px={12}
              bgGradient="linear(to-r, orange.400, yellow.400)"
              color="white"
              fontSize="md"
              borderRadius="full"
              shadow="lg"
              _hover={{ transform: 'scale(1.05)', shadow: '2xl' }}
              onClick={onClick}
            >
              Explore
            </Button>
            
            <VStack align={{ base: 'center', md: 'end' }} spacing={1}>
              <Text fontSize="xl" fontWeight="black" color="yellow.400" letterSpacing="tight">
                onebyone.ng
              </Text>
              <HStack spacing={4} fontSize="sm" color="green.200">
                <Text>✓ Follow our page</Text>
                <Text>✓ Join the countdown</Text>
              </HStack>
            </VStack>
          </Flex>

        </VStack>
      </Container>
    </Box>
  );
}