import React, { useState } from "react";
import AuthenticatedWrapper from "./Layout/Index";
import { Box, VStack, HStack, Text } from "@chakra-ui/react";
import { motion } from "framer-motion";
import Input from "../../Components/Input";
import TextArea from "../../Components/TextArea";
import Button from "../../Components/Button";
import { FaArrowLeft, FaCloudUploadAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

    // const router = useNavigate();

const SchoolDetails = () => (
    <VStack spacing="70px">
        <VStack justifyItems={"start"} alignItems={"start"} spacing={"22px"}>
            <FaArrowLeft onClick={() => {
                {/* router("/roleSelection") */}
            }}/>
            <Text
                textTransform="capitalize"
                fontWeight="700"
                fontSize="24px"
                color="#101011"
                fontFamily="heading"
                mt="4"
            >
                Enter School Details
            </Text>
            <Text
                fontSize="small"
                fontWeight="normal"
                color="#6B7280"
                lineHeight="24px"
            >
                Please provide information about your school to help sponsors and mentors understand its needs.
            </Text>
        </VStack>
        <Input
            label="Name of school"
            type="text"
            placeholder="e.g Golden Inheritance College"
        />
        <Input label="School Address" type="text" />
        <Input label="State" type="text" />
        <Input label="City" type="text" />
        <Input label="Zipcode" type="text" />
        <Input
            label="Class Capacity"
            type="text"
            placeholder="How many students are in the target class?"
        />
        <TextArea
            label="About School"
            placeholder="When was the school established?"
        />
        <TextArea label="Why your school should be considered?" />
    </VStack>
);

const AcademicPerformance = () => (
    <VStack spacing="70px">
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
                Academic Performance
            </Text>
            <Text
                fontSize="small"
                fontWeight="normal"
                color="#6B7280"
                lineHeight="24px"
            >
                Please share your school's academic achievements to help sponsors and mentors evaluate student potential.
            </Text>
        </VStack>
        <Input label="Average JAMB Score" type="text" placeholder="Enter the average JAMB score of your school." />
        <Input label="Average WAEC Score" type="text" placeholder="Enter the average WAEC score of your school." />
        <Input
            label="Top WAEC Score (Last 3 Years)"
            type="text"
        />
        <Input label="Top JAMB Score (Last 3 Years)" type="text" />
        <Input label="Top Result (Target Class)" type="text" />
    </VStack>
);

const PrincipalInformation = () => (
    <VStack spacing="60px">
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
                Principal’s Information
            </Text>
            <Text
                fontSize="sm"
                fontWeight="normal"
                color="#6B7280"
                lineHeight="24px"
            >
                Please provide the principal’s details to verify your school’s legitimacy. <span className="hide">legitimacy</span>
            </Text>
        </VStack>
        <Input label="Title" type="text" placeholder="e.g Mr." />
        <Input label="Full Name" type="text" placeholder="e.g John Doe" />
        <Input label="Email" type="text" />
        <Input
            label="Phone Number"
            type="text"
            placeholder="+234"
        />

        <Box display="flex" flexDirection="column" gap="10px">
            <Text
                textTransform="capitalize"
                fontWeight="700"
                fontSize="16px"
                color="#101011"
                fontFamily="heading"
                textAlign="left"
                mt="4px"
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
        </Box>

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
    </VStack>
);

export default function SchoolAdminSignup() {
    const [step, setStep] = useState(1);
    const steps = [SchoolDetails, AcademicPerformance, PrincipalInformation];

    const goToStep = (stepIndex) => setStep(stepIndex);

    const renderPaginationLines = () =>
        steps.map((_, index) => (
            <Box
                key={index}
                height="8px"
                width="40px"
                bg={step === index + 1 ? "teal.500" : "gray.300"}
                cursor="pointer"
                borderRadius="md"
                onClick={() => goToStep(index + 1)}
                transition="background-color 0.3s"
            />
        ));

    return (
        <AuthenticatedWrapper>
            <Box px={["3%", "15%"]} mt="74px">
                {/* Step Content */}
                <Box mt="62px" position="relative" overflow="hidden">
                    <motion.div
                        key={step}
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "-100%" }}
                        transition={{ type: "tween", ease: "easeOut", duration: 0.5 }}
                    >
                        {steps[step - 1]()}
                    </motion.div>
                </Box>

                {/* Pagination Lines, Back, and Next/Finish Buttons */}
                <HStack mt="20px" align="center" spacing="auto">
                    <HStack spacing="4px" align="flex-start">
                        {renderPaginationLines()}
                    </HStack>
                    <HStack spacing="4">
                        <Button
                            px="30px"
                            onClick={() => goToStep(Math.max(step - 1, 1))}
                            disabled={step === 1}
                        >
                            Back
                        </Button>
                        <Button
                            px="30px"
                            onClick={() =>
                                step === steps.length ? alert("Form submitted!. Oya carry your wahala dey go😂😂😂") : goToStep(step + 1)
                            }
                        >
                            {step === steps.length ? "Finish" : "Next"}
                        </Button>
                    </HStack>
                </HStack>
            </Box>
        </AuthenticatedWrapper>
    );
}