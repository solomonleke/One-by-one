import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthenticatedWrapper from './Layout/Index';
import { Box, Text, Radio, Stack, RadioGroup } from '@chakra-ui/react';
import Button from '../../Components/Button';

export default function RoleSelection() {
    const [selectedRole, setSelectedRole] = useState(null);
    const navigate = useNavigate();

    const roles = [
        { name: 'School Admin', path: '/SchoolAdminSignup', description: 'I’m managing a school and looking to connect with sponsors and resources.' },
        { name: 'Scholarship Admin', path: '/ScholarshipAdminSignup', description: 'I want to help manage scholarships and ensure they reach deserving students.' },
        { name: 'Sponsor', path: '/Sponsor', description: 'I want to fund students or schools to help them reach their potential.' },
        { name: 'Fund Admin', path: '/FundAdminSignup', description: 'I’d like to volunteer to verify schools and supervise fund disbursement.' },
    ];

    const handleContinue = () => {
        const selected = roles.find(role => role.name === selectedRole);
        if (selected) {
            navigate(selected.path);
        }
    };

    return (
        <AuthenticatedWrapper>
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
                                    <Text fontWeight="bold" fontSize="lg" color={selectedRole === role.name ? 'black' : 'gray.700'}>
                                        {role.name}
                                    </Text>
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
