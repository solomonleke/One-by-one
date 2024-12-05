import React from 'react'
import AuthenticatedWrapper from './Layout/Index'
import { Box, HStack, Text, VStack } from '@chakra-ui/react'
import { FaArrowLeft, FaCloudUploadAlt } from 'react-icons/fa'
import Input from '../../Components/Input'
import TextArea from '../../Components/TextArea'
import Button from '../../Components/Button'
import { useNavigate } from 'react-router-dom'

export default function ScholarshipAdminSignup() {
    const router = useNavigate();
    return (
        <AuthenticatedWrapper>
            <Box px={["3%", "15%"]} mt="74px">
                <VStack spacing="70px" alignItems={"start"}>
                    <VStack justifyItems={"start"} alignItems={"start"} spacing={"22px"}>
                        <FaArrowLeft />
                        <Text
                            textTransform="capitalize"
                            fontWeight="700"
                            fontSize="24px"
                            color="#101011"
                            fontFamily="heading"
                            mt="4"
                        >
                            Complete Your Scholarship <Text></Text>Admin Profile
                        </Text>
                        <Text
                            fontSize="small"
                            fontWeight="normal"
                            color="#6B7280"
                            lineHeight="24px"
                        >
                            Let’s get to know you and verify your role as a Scholarship Admin. <span className='hide'>AdminAdmin</span>
                        </Text>
                    </VStack>
                    <Input
                        label="State"
                        type="text"
                        placeholder="Enter your state"
                    />
                    <Input label="Local Government" type="text" placeholder='e.g Oshodi isolo' />
                    <Input label="City" type="text" placeholder='e.g Okota' />
                    <Input label="Home Address" type="text" placeholder='e.g 86 Jemtok street' />
                    <Input label="Occupation" type="text" placeholder='e.g Banker' />
                    <Input label="Phone Number" type="text" placeholder='+234' />

        <VStack justifyItems={"start"} alignItems={"start"} flexDirection="column" gap="0px">
            <Text
                textTransform="capitalize"
                fontWeight="700"
                fontSize="16px"
                color="#101011"
                fontFamily="heading"
                textAlign="left"
            >
                Verification ID
            </Text>

            <Text
                fontSize="small"
                fontWeight="normal"
                color="#6B7280"
                lineHeight="24px"
            >
                Upload a valid ID for legitimacy verification (e.g., national ID, passport).
            </Text>
        </VStack>

        <VStack justifyItems={"start"} alignItems={"start"}>
            <Text
                textTransform="capitalize"
                fontWeight="500"
                fontSize="14px"
                color="#101011"
                fontFamily="heading"
                textAlign="left"
            >
                Front Side
            </Text>
            <Box backgroundColor="#E9FFF5" py="30px" px="100px" cursor="pointer" borderRadius="8px" borderWidth="2px" borderStyle="dashed">
                <label htmlFor="FrontSide" className="label">
                    <VStack>
                        <HStack>
                            <FaCloudUploadAlt className="labelText" />
                            <Text><span className="labelText">Click to Upload or</span><span className="drag"> drag and drop</span></Text>
                        </HStack>

                        <Text fontSize="small"
                            fontWeight="normal"
                            color="#6B7280"
                            lineHeight="24px">PDF, JPG, JPEG, PNG less than 10MB</Text>
                    </VStack>
                </label>
                <input type="file" id="FrontSide" className="uploadVerification" style={{ display: 'none' }} />
            </Box>
        </VStack>

        <VStack justifyItems={"start"} alignItems={"start"}>
            <Text
                textTransform="capitalize"
                fontWeight="500"
                fontSize="14px"
                color="#101011"
                fontFamily="heading"
                textAlign="left"
            >
                Back Side
            </Text>
            <Box backgroundColor="#E9FFF5" py="30px" px="100px" cursor="pointer" borderRadius="8px" borderWidth="2px" borderStyle="dashed">
                <label htmlFor="BackSide" className="label">
                    <VStack>
                        <HStack>
                            <FaCloudUploadAlt className="labelText" />
                            <Text><span className="labelText">Click to Upload or</span><span className="drag"> drag and drop</span></Text>
                        </HStack>

                        <Text fontSize="small"
                            fontWeight="normal"
                            color="#6B7280"
                            lineHeight="24px">PDF, JPG, JPEG, PNG less than 10MB</Text>
                    </VStack>
                </label>
                <input type="file" id="BackSide" className="uploadVerification" style={{ display: 'none' }} />
            </Box>
        </VStack>

        <Button onClick={() => {
            router("/profile-setup-complete")
        }}>Complete Profile Setup</Button>
                </VStack>
            </Box>
        </AuthenticatedWrapper>
    )
}
