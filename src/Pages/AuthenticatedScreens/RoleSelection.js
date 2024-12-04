import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AuthenticatedWrapper from './Layout/Index';
import { Box, Text, Radio, Stack, HStack, RadioGroup } from '@chakra-ui/react';
import Button from '../../Components/Button';
import ShowToast from '../../Components/ToastNotification';

export default function RoleSelection() {
    const [selectedRole, setSelectedRole] = useState(null);

    const [showToast, setShowToast] = useState({
        show: false,
        message: "",
        status: ""
      })


    const navigate = useNavigate();

    const {id} = useParams()

    console.log(id)



    const roles = [
        { name: 'School Admin', path: '/school-admin-signup', description: 'I’m managing a school and looking to connect with sponsors and resources.' },
        { name: 'Scholarship Admin', path: '/scholarship-admin-signup', description: 'I want to help manage scholarships and ensure they reach deserving students.' },
        { name: 'Sponsor', tag: 'Volunteer Role', path: '/sponsor', description: 'I want to fund students or schools to help them reach their potential.' },
        { name: 'Fund Admin', tag: 'Volunteer Role', path: '/fund-admin-signup', description: 'I’d like to volunteer to verify schools and supervise fund disbursement.' },
    ];

    const handleContinue = () => {

        localStorage.setItem("tempToken", id)
        const selected = roles.find(role => role.name === selectedRole);

        if (selected) {
            navigate(selected.path);
        }else{
           
            setShowToast({
                show: true,
                message: "Please Select a Role to Proceed",
                status: "error"
              })
      
              setTimeout(() => {
                setShowToast({
                  show: false,
      
                })
              
              }, 5000)

           
        }
    };

    return (
        <AuthenticatedWrapper>
            {
        showToast.show && (
          <ShowToast message={showToast.message} status={showToast.status} show={showToast.show} />

        )
      }
            <Box px={["3%", "15%"]} mt={"74px"} display="flex" flexDirection="column" gap="10px">
                <Text
                    textTransform="capitalize"
                    fontWeight="700"
                    fontSize="20px"
                    color="#101011"
                    fontFamily="heading"
                    mt="4"
                >
                    Let’s Get You Started
                </Text>
                <Text
                    fontSize="small"
                    fontWeight="normal"
                    style={{ color: "#6B7280", lineHeight: "24px" }}
                >
                    Select the role that best describes you. Your dashboard will be
                    <br /> tailored to your needs
                </Text>

                <RadioGroup onChange={setSelectedRole} value={selectedRole} mt={6}>
                    <Stack direction={["column"]} spacing={4}>
                        {roles.map((role) => (
                            <Box
                                key={role.name}
                                border="1px solid"
                                borderColor={selectedRole === role.name ? 'teal.500' : 'gray.300'}
                                p={4}
                                borderRadius="lg"
                                cursor="pointer"
                                _hover={{ borderColor: 'teal.500' }}
                                backgroundColor={selectedRole === role.name ? 'teal.50' : 'white'}
                                onClick={() => setSelectedRole(role.name)}
                            >
                                <Stack direction="row" align="center" justify="space-between">
                                    <HStack>
                                        <Text fontWeight="bold" fontSize="lg" color={selectedRole === role.name ? 'black' : 'gray.700'}>
                                            {role.name}
                                        </Text>
                                        {
                                            role.tag && (

                                                <Box as="span" fontWeight={"semibold"} fontSize={"11px"} lineHeight={"14.48px"} color={"#FFBC4F"} backgroundColor={"#FFF7EA"} borderWidth={"1px"} borderColor={"#FFBC4F"} borderRadius={"4px"} padding={"4px"} marginLeft={"10px"}>{role.tag}</Box>
                                            )
                                        }
                                    </HStack>

                                    <Radio
                                        value={role.name}
                                        colorScheme="teal"
                                        borderRadius="full"
                                    />
                                </Stack>
                                <Text fontSize="sm" color="gray.600" mt={2}>
                                    {role.description}
                                </Text>
                            </Box>
                        ))}
                    </Stack>
                </RadioGroup>

                <Button mt="50px" isDisabled={!selectedRole} onClick={handleContinue}>
                    Continue
                </Button>
            </Box>
        </AuthenticatedWrapper>
    );
}
