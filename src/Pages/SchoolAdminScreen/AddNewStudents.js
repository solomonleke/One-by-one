import React, { useState } from 'react'
import SubLayout from '../../DashboardLayout/SubLayout'
import { Text, Flex, HStack, VStack, Stack, Select, Box, Spacer } from '@chakra-ui/react'
import Input from '../../Components/Input'
import TextArea from '../../Components/TextArea'
import Button from '../../Components/Button'
import ReviewCard from '../../Components/ReviewCard'
import { useNavigate } from 'react-router-dom';
import { GiCheckMark } from "react-icons/gi";
import { FaArrowLeft, FaCloudUploadAlt } from 'react-icons/fa'
import { FiEdit2 } from "react-icons/fi";
export default function AddNewStudents() {

    const [StudentDetails, setStudentDetails] = useState({
        view: true,
        completed: false
    });
    const [AcademicBackground, setAcademicBackground] = useState({
        view: false,
        completed: false
    });
    const [Aspiration, setAspiration] = useState({
        view: false,
        completed: false
    });
    const [StudentEssay, setStudentEssay] = useState({
        view: false,
        completed: false
    });
    const [Review, setReview] = useState({
        view: false,
        completed: false
    });

    const nav = useNavigate()
    return (
        <SubLayout showSearch={false} showNav={false} bgColor='#fff' borderRight={"none"}>



            <Flex justifyContent="space-between" flexWrap="wrap" pl={["0", "0", "0", "128px"]}>
                <Box w={["100%", "100%", "25%", "25%",]} zIndex="0" pos="relative" left="0">
                    <VStack spacing="15px" alignItems="start" mt="80px">
                        <HStack spacing={"20px"} >
                            <Box w="30px">
                                {
                                    StudentDetails.completed ? (
                                        <Flex justifyContent="center" color='#2ADE2C' fontSize="13">
                                            <GiCheckMark />
                                        </Flex>
                                    ) : (

                                        <Box h="2px" borderRadius="10px" w={StudentDetails.view ? "28px" : "21px"} bg={StudentDetails.view ? "green" : "#8A92A6"}></Box>
                                    )
                                }
                            </Box>
                            <Text fontSize={StudentDetails.view || StudentDetails.completed ? "14px" : "13px"} color={StudentDetails.view || StudentDetails.completed ? "#464E60" : "#8A92A6"} fontWeight="500">Student Details</Text>
                        </HStack>

                        <HStack spacing={"20px"}>

                            <Box w="30px">
                                {
                                    AcademicBackground.completed ? (
                                        <Flex justifyContent="center" color='#2ADE2C' fontSize="13">
                                            <GiCheckMark />
                                        </Flex>
                                    ) : (

                                        <Box h="2px" borderRadius="10px" w={AcademicBackground.view ? "28px" : "21px"} bg={AcademicBackground.view ? "green" : "#8A92A6"}></Box>
                                    )
                                }
                            </Box>
                            <Text fontSize={AcademicBackground.view || AcademicBackground.completed ? "14px" : "13px"} color={AcademicBackground.view || AcademicBackground.completed ? "#464E60" : "#8A92A6"} fontWeight="500">Academic Background</Text>
                        </HStack>

                        <HStack spacing={"20px"}>
                            <Box w="30px">
                                {
                                    Aspiration.completed ? (
                                        <Flex justifyContent="center" color='#2ADE2C' fontSize="13">
                                            <GiCheckMark />
                                        </Flex>
                                    ) : (

                                        <Box h="2px" borderRadius="10px" w={Aspiration.view ? "28px" : "21px"} bg={Aspiration.view ? "green" : "#8A92A6"}></Box>
                                    )
                                }
                            </Box>
                            <Text fontSize={Aspiration.view || Aspiration.completed ? "14px" : "13px"} color={Aspiration.view || Aspiration.completed ? "#464E60" : "#8A92A6"} fontWeight="500">Aspiration % Support</Text>
                        </HStack>

                        <HStack spacing={"20px"}>
                            <Box w="30px">
                                {
                                    StudentEssay.completed ? (
                                        <Flex justifyContent="center" color='#2ADE2C' fontSize="13">
                                            <GiCheckMark />
                                        </Flex>
                                    ) : (

                                        <Box h="2px" borderRadius="10px" w={StudentEssay.view ? "28px" : "21px"} bg={StudentEssay.view ? "green" : "#8A92A6"}></Box>
                                    )
                                }

                            </Box>
                            <Text fontSize={StudentEssay.view || StudentEssay.completed ? "14px" : "13px"} color={StudentEssay.view || StudentEssay.completed ? "#464E60" : "#8A92A6"} fontWeight="500">Student Essay</Text>
                        </HStack>

                        <HStack spacing={"20px"}>
                            <Box w="30px">
                                {
                                    Review.completed ? (
                                        <Flex justifyContent="center" color='#2ADE2C' fontSize="13">
                                            <GiCheckMark />
                                        </Flex>
                                    ) : (

                                        <Box h="2px" borderRadius="10px" w={Review.view ? "28px" : "21px"} bg={Review.view ? "green" : "#8A92A6"}></Box>
                                    )
                                }
                            </Box>
                            <Text fontSize={Review.view || Review.completed ? "14px" : "13px"} color={Review.view || Review.completed ? "#464E60" : "#8A92A6"} fontWeight="500">Review</Text>
                        </HStack>
                    </VStack>
                </Box>
                <Box w={["100%", "100%", "75%", "75%",]}>

                    {
                        StudentDetails.view && (

                            <Stack spacing="52px" alignItems="start" w={["100%", "100%", "65%", "65%",]}>

                                <Stack >
                                    <Text
                                        textTransform="capitalize"
                                        fontWeight="700"
                                        fontSize="27px"
                                        color="#101011"
                                        letterSpacing="-3%"
                                        fontFamily="heading"
                                        mt="4"

                                    >
                                        Student Details
                                    </Text>
                                    <Text
                                        fontSize="14px"
                                        fontWeight="400"
                                        color="#6B7280"
                                        mt="8px"
                                    >
                                        Please provide the student's details to help sponsors and mentors understand their <br /> academic background and potential.
                                    </Text>
                                </Stack>
                                <Input label="Student Full Name" placeholder="Enter student’s full name as it appears on official documents." />
                                <Input label='Date of Birth (DOB)' placeholder="DD/MM/YYYY" />
                                <Stack w="100%" pos="relative" top="-15px">
                                    <Text
                                        textTransform="capitalize"
                                        fontWeight="500"
                                        fontSize="14px"
                                        color="#101011"
                                        fontFamily="heading"
                                    >
                                        Gender
                                    </Text>

                                    <Select
                                        border="2px"
                                        placeholder="Select option"
                                        fontSize="small"
                                        fontWeight="normal"
                                        size="lg"
                                        w="100%"
                                    >
                                        <option value="option1">Male</option>
                                        <option value="option2">Female</option>
                                    </Select>
                                </Stack>
                                <Input label='Phone Number' placeholder='+234' />
                                <Input label='Guardian’s Phone Number (Optional)' placeholder='+234' />
                                <Input label='Email Address' placeholder='Provide the student’s email address' />

                                <Input label='State' placeholder="Enter the student's current address (street, city, state)." />
                                <Input label='City' placeholder="Enter the student's current address (street, city, state)." />
                                <Input label='Residential Address' placeholder="Enter the student's current address (street, city, state)." />


                                <Flex justifyContent="space-between" w="100%" >

                                    <Flex justifyContent="flex-start" >

                                        <Button background="transparent" color="green" px="43px" onClick={() => { nav("/school-admin/student-management") }}>Cancel</Button>
                                    </Flex>


                                    <Flex justifyContent="flex-end" >

                                        <Button px="43px" onClick={() => {
                                            setStudentDetails({
                                                view: false,
                                                completed: true
                                            })
                                            setAcademicBackground({
                                                view: true,
                                                completed: false
                                            })

                                        }}>Next</Button>
                                    </Flex>
                                </Flex>

                            </Stack>
                        )
                    }
                    {
                        AcademicBackground.view && (

                            <Stack spacing="52px" alignItems="start" w={["100%", "100%", "65%", "65%",]}>

                                <Stack >
                                    <Text
                                        textTransform="capitalize"
                                        fontWeight="700"
                                        fontSize="27px"
                                        color="#101011"
                                        letterSpacing="-3%"
                                        fontFamily="heading"
                                        mt="4"

                                    >
                                        Academic Background
                                    </Text>
                                    <Text
                                        fontSize="14px"
                                        fontWeight="400"
                                        color="#6B7280"
                                        mt="8px"
                                    >
                                        Please provide the student's details to help sponsors and mentors understand their academic background and potential.                                    </Text>
                                </Stack>
                                <Input label="Department" placeholder="e.g science, arts, commercial" />
                                <Input label='class level' placeholder="e.g SS2" />

                                <TextArea label='class performance' placeholder="Briefly describe how this student is performing in your current classes (e.g., overall grades, key subjects)."></TextArea>
                                <TextArea label='subject' placeholder="List the main subjects this student is studying this session"></TextArea>


                                <Flex justifyContent="space-between" w="100%" >

                                    <Flex justifyContent="flex-start" >

                                        <Button background="transparent" color="green" px="43px" onClick={() => { nav("/school-admin/student-management") }}>Cancel</Button>
                                    </Flex>


                                    <Flex justifyContent="flex-end" >




                                        <HStack>

                                            <Button background="transparent" color="green" border="1px solid green" px="43px" onClick={() => {
                                                setStudentDetails({
                                                    view: true,
                                                    completed: false
                                                })
                                                setAcademicBackground({
                                                    view: false,
                                                    completed: false
                                                })


                                            }}>Back</Button>

                                            <Button px="43px" onClick={() => {

                                                setAcademicBackground({
                                                    view: false,
                                                    completed: true
                                                })

                                                setAspiration({
                                                    view: true,
                                                    completed: false
                                                })

                                            }}>Next</Button>
                                        </HStack>
                                    </Flex>
                                </Flex>

                            </Stack>
                        )
                    }

                    {
                        Aspiration.view && (

                            <Stack spacing="52px" alignItems="start" w={["100%", "100%", "65%", "65%",]}>

                                <Stack>
                                    <Text
                                        textTransform="capitalize"
                                        fontWeight="700"
                                        fontSize="27px"
                                        color="#101011"
                                        letterSpacing="-3%"
                                        fontFamily="heading"
                                        mt="4"

                                    >
                                        Aspirations & Support
                                    </Text>
                                    <Text
                                        fontSize="14px"
                                        fontWeight="400"
                                        color="#6B7280"
                                        mt="8px"
                                    >
                                        Provide details about the student's career goals, interests, leadership roles, and the level of financial support they require.                        </Text>
                                </Stack>
                                <Input label="intended Field of study " placeholder="e.g Nursing Science" />
                                <Stack w="100%" pos="relative" top="-15px">
                                    <Text
                                        textTransform="capitalize"
                                        fontWeight="500"
                                        fontSize="14px"
                                        color="#101011"
                                        fontFamily="heading"
                                    >
                                        What are the student's interests?
                                    </Text>

                                    <Select
                                        border="2px"
                                        fontSize="13px"
                                        fontWeight="400"
                                        size="lg"
                                        w="100%"
                                        _placeholder={{ color: "red" }}
                                        color="#ADB4BF"

                                        placeholder="Select tags associated with the student’s main area of interest"
                                    >
                                        <option value="health and medicine">Health and Medicine </option>
                                        <option value="science">Science</option>
                                        <option value="nurse process">Nurse Process</option>
                                    </Select>
                                </Stack>
                                <Input label='Higher Education Goals ' placeholder="Enter the student’s higher education aspirations" />
                                <Input label='career goals' placeholder="Enter the career path the student is aspiring toward" />
                                <Input label='leadership roles' placeholder="Mention any leadership roles the student has taken on" />
                                <Input label='Extracurricular Activities' placeholder="e.g Debate club" />

                                <Stack w="100%" pos="relative" top="-15px">
                                    <Text
                                        textTransform="capitalize"
                                        fontWeight="500"
                                        fontSize="14px"
                                        color="#101011"
                                        fontFamily="heading"
                                    >
                                        Scholarship Need
                                    </Text>

                                    <Select
                                        border="2px"
                                        fontSize="13px"
                                        fontWeight="400"
                                        size="lg"
                                        w="100%"
                                        color="#ADB4BF"
                                        placeholder="Select the level of financial support the student requires"
                                    >
                                        <option value="Full Scholarship">Full Scholarship </option>
                                        <option value="Part Scholarship">Part Scholarship </option>

                                    </Select>
                                </Stack>


                                <Flex justifyContent="space-between" w="100%" >

                                    <Flex justifyContent="flex-start" >

                                        <Button background="transparent" color="green" px="43px" onClick={() => { nav("/school-admin/student-management") }}>Cancel</Button>
                                    </Flex>


                                    <Flex justifyContent="flex-end" >




                                        <HStack>

                                            <Button background="transparent" color="green" border="1px solid green" px="43px" onClick={() => {
                                                setAcademicBackground({
                                                    view: true,
                                                    completed: false
                                                })
                                                setAspiration({
                                                    view: false,
                                                    completed: false
                                                })


                                            }}>Back</Button>

                                            <Button px="43px" onClick={() => {

                                                setAspiration({
                                                    view: false,
                                                    completed: true
                                                })

                                                setStudentEssay({
                                                    view: true,
                                                    completed: false
                                                })

                                            }}>Next</Button>
                                        </HStack>
                                    </Flex>
                                </Flex>

                            </Stack>
                        )
                    }
                    {
                        StudentEssay.view && (

                            <Stack spacing="23px" alignItems="start" w={["100%", "100%", "65%", "65%",]}>

                                <Stack>
                                    <Text
                                        textTransform="capitalize"
                                        fontWeight="700"
                                        fontSize="27px"
                                        color="#101011"
                                        letterSpacing="-3%"
                                        fontFamily="heading"
                                        mt="4"

                                    >
                                        Student Essay
                                    </Text>
                                    <Text
                                        fontSize="14px"
                                        fontWeight="400"
                                        color="#6B7280"
                                        mt="8px"
                                    >
                                        Please upload the student’s essay detailing their career goals, interests, leadership roles, and required financial support.                    </Text>
                                </Stack>
                                <Stack>
                                    <Text
                                        textTransform="capitalize"
                                        fontWeight="500"
                                        fontSize="14px"
                                        color="#101011"
                                        fontFamily="heading"
                                        textAlign="left"
                                    >
                                        upload student’s essay
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
                                </Stack>


                                <Flex justifyContent="space-between" w="100%" >

                                    <Flex justifyContent="flex-start" >

                                        <Button background="transparent" color="green" px="43px" onClick={() => { nav("/school-admin/student-management") }}>Cancel</Button>
                                    </Flex>


                                    <Flex justifyContent="flex-end" >




                                        <HStack>

                                            <Button background="transparent" color="green" border="1px solid green" px="43px" onClick={() => {
                                                setAspiration({
                                                    view: true,
                                                    completed: false
                                                })
                                                setStudentEssay({
                                                    view: false,
                                                    completed: false
                                                })


                                            }}>Back</Button>

                                            <Button px="43px" onClick={() => {

                                                setReview({
                                                    view: true,
                                                    completed: false
                                                })

                                                setStudentEssay({
                                                    view: false,
                                                    completed: true
                                                })

                                            }}>Next</Button>
                                        </HStack>
                                    </Flex>
                                </Flex>

                            </Stack>
                        )
                    }
                    {
                        Review.view && (

                            <Stack spacing="23px" alignItems="start" w={["100%", "100%", "65%", "65%",]}>

                                <Stack>
                                    <Text
                                        textTransform="capitalize"
                                        fontWeight="700"
                                        fontSize="27px"
                                        color="#101011"
                                        letterSpacing="-3%"
                                        fontFamily="heading"
                                        mt="4"

                                    >
                                        Review
                                    </Text>
                                    <Text
                                        fontSize="14px"
                                        fontWeight="400"
                                        color="#6B7280"
                                        mt="8px"
                                    >
                                        Please review the student's details carefully before clicking submit to ensure accuracy.   </Text>
                                </Stack>
                         
                         <Stack border="1px solid #E3EBF2" rounded={"7px"} py="14px" px="17px" spacing="13px" w="100%">

                            <ReviewCard
                            title="full name"
                            value="Adeleke Solomon"

                             />

                            <ReviewCard
                            title="date of birth"
                            value="22/01/1990"

                             />

                            <ReviewCard
                            title="gender"
                            value="male"

                             />

                            <ReviewCard
                            title="state"
                            value="lagos"

                             />

                            <ReviewCard
                            title="city"
                            value="Okota"

                             />


                         </Stack>
                         <Stack border="1px solid #E3EBF2" rounded={"7px"} py="14px" px="17px" spacing="13px" w="100%">

                            <ReviewCard
                            title="phone number"
                            value="08165413816"

                             />

                            <ReviewCard
                            title="email address"
                            value="lordsoliz@gmail.com"

                             />

                            <ReviewCard
                            title="residential address"
                            value="64 jemtok street, ago palace.."

                             />

                        
                         </Stack>
                         <Stack border="1px solid #E3EBF2" rounded={"7px"} py="14px" px="17px" spacing="13px" w="100%">

                            <ReviewCard
                            title="department"
                            value="arts"

                             />

                            <ReviewCard
                            title="class level"
                            value="SS2"

                             />

                            <ReviewCard
                            title="subjects"
                            value="64 jemtok street, ago palace.."

                             />

                        
                         </Stack>
                         <Stack border="1px solid #E3EBF2" rounded={"7px"} py="14px" px="17px" spacing="13px" w="100%">

                            <ReviewCard
                            title="feild of interest"
                            value="nursing science"

                             />

                            <ReviewCard
                            title="scholarship neeed"
                            value="full scholarship"

                             />

                            <ReviewCard
                            title="subjects"
                            value="64 jemtok street, ago palace.."

                             />

                        
                         </Stack>


                                <Flex justifyContent="space-between" w="100%" >

                                    <Flex justifyContent="flex-start" >

                                        <Button background="transparent" color="green" px="43px" onClick={() => { nav("/school-admin/student-management") }}>Cancel</Button>
                                    </Flex>


                                    <Flex justifyContent="flex-end" >




                                        <HStack>

                                            <Button background="transparent" color="green" border="1px solid green" px="43px" onClick={() => {
                                                setReview({
                                                    view: false,
                                                    completed: false
                                                })
                                                setStudentEssay({
                                                    view: true,
                                                    completed: false
                                                })


                                            }}>Back</Button>

                                            <Button px="43px" onClick={() => {

                                               

                                            }}>Add Student</Button>
                                        </HStack>
                                    </Flex>
                                </Flex>

                            </Stack>
                        )
                    }




                </Box>

            </Flex>

        </SubLayout>

    )
}
