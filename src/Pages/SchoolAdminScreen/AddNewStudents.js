import React, { useState } from 'react'
import SubLayout from '../../DashboardLayout/SubLayout'
import { Text, Flex, HStack, VStack, Stack, Select, Box, Spacer } from '@chakra-ui/react'
import Input from '../../Components/Input'
import TextArea from '../../Components/TextArea'
import Button from '../../Components/Button'
import BackNotification from '../../Components/BackNotification'
import ReviewCard from '../../Components/ReviewCard'
import { useNavigate } from 'react-router-dom';
import { GiCheckMark } from "react-icons/gi";
import { FaArrowLeft, FaCloudUploadAlt } from 'react-icons/fa'
import { FiEdit2 } from "react-icons/fi";
import { CreateStudentApi } from "../../Utils/ApiCall";
import ShowToast from "../../Components/ToastNotification";


export default function AddNewStudents() {

    const [payload, setPayload] = useState({
        fullName: "",
        dob: "",
        gender: "",
        studentPhone: "",
        email: "",
        guardianPhone: "",
        state: "",
        city: "",
        zipCode: "",
        address: "",
        department: "",
        classLevel: "",
        performance: "",
        subjects: "",
        intendedFieldOfStudy: "",
        studentInterests: "",
        higherEducationGoals: "",
        careerGoals: "",
        scholarshipNeed: "",
      });

      const [showToast, setShowToast] = useState({
        show: false,
        message: "",
        status: ""
      })
    
      const [Loading, setLoading] = useState(false);

      const handlePayload = (e) => {

        setPayload({ ...payload, [e.target.id]: e.target.value })
    
      }

      const Submit = async () => {

        setLoading(true)
        try {
    
          const result = await CreateStudentApi(payload)
    
          if (result.status === 201) {
            setLoading(false)
            setShowToast({ show: true, message: "Student Created Successfully", status: "success" })
            setTimeout(() => {
              setShowToast({
                show: false,
    
              })
    
              nav("/school-admin/student-management")
            }, 4000)
          }
        } catch (e) {
          setLoading(false)
          console.log(e.message)
          setShowToast({
            show: true,
            message: e.message,
            status: "error"
          })
    
          setTimeout(() => {
            setShowToast({
              show: false,
    
            })
          }, 7000)
        }
      }

    const [OpenModal, setOpenModal] = useState(false)

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

            {
                showToast.show && (
                    <ShowToast message={showToast.message} status={showToast.status} show={showToast.show} />

                )
            }

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
                                <Input label="Student Full Name" placeholder="Enter student’s full name as it appears on official documents." onChange={handlePayload} value={payload.fullName} id='fullName' />
                                <Input label='Date of Birth (DOB)' placeholder="DD/MM/YYYY" onChange={handlePayload} value={payload.dob} id='dob' />
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
                                        onChange={handlePayload} 
                                        value={payload.gender}
                                        id='gender'
                                        border="2px"
                                        placeholder="Select option"
                                        fontSize="small"
                                        fontWeight="normal"
                                        size="lg"
                                        w="100%"
                                    >
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                    </Select>
                                </Stack>
                                <Input label='Phone Number' placeholder='+234' onChange={handlePayload} value={payload.studentPhone} id='studentPhone' />
                                <Input label='Guardian’s Phone Number (Optional)' placeholder='+234' onChange={handlePayload} value={payload.guardianPhone} id='guardianPhone' />
                                <Input label='Email Address' placeholder='Provide the student’s email address' onChange={handlePayload} value={payload.email} id='email' />

                                <Input label='State' placeholder="Enter the student's current address (street, city, state)." onChange={handlePayload} value={payload.state} id='state' />
                                <Input label='City' placeholder="Enter the student's current address (street, city, state)." onChange={handlePayload} value={payload.city} id='city' />
                                <Input label='Residential Address' placeholder="Enter the student's current address (street, city, state)." onChange={handlePayload} value={payload.address} id='address' />


                                <Flex justifyContent="space-between" w="100%" >

                                    <Flex justifyContent="flex-start" >

                                        <Button background="transparent" color="green" px="43px" onClick={() => setOpenModal(true)}>Cancel</Button>
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
                                <Input label="Department" placeholder="e.g science, arts, commercial" onChange={handlePayload} value={payload.department} id='department' />
                                <Input label='class level' placeholder="e.g SS2" onChange={handlePayload} value={payload.classLevel} id='classLevel' />

                                <TextArea label='class performance' placeholder="Briefly describe how this student is performing in your current classes (e.g., overall grades, key subjects)." onChange={handlePayload} value={payload.performance} id='performance'></TextArea>
                                <TextArea label='subject' placeholder="List the main subjects this student is studying this session" onChange={handlePayload} value={payload.subjects} id='subjects'></TextArea>


                                <Flex justifyContent="space-between" w="100%" flexWrap='wrap'>

                                    <Flex justifyContent="flex-start" >

                                        <Button background="transparent" color="green" px="43px" onClick={() => setOpenModal(true)}>Cancel</Button>
                                    </Flex>


                                    <Flex justifyContent="flex-end" >




                                        <HStack spacing={["100px", "12px", "12px","12px"]}>

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
                                        Provide details about the student's career goals, interests, leadership roles, and the level of financial support they require.</Text>
                                </Stack>
                                <Input label="intended Field of study " placeholder="e.g Nursing Science" onChange={handlePayload} value={payload.intendedFieldOfStudy} id='intendedFieldOfStudy'/>
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
                                        onChange={handlePayload} 
                                        value={payload.studentInterests}
                                        id='studentInterests'

                                        placeholder="Select tags associated with the student’s main area of interest"
                                    >
                                        <option value="health and medicine">Health and Medicine </option>
                                        <option value="science">Science</option>
                                        <option value="nurse process">Nurse Process</option>
                                    </Select>
                                </Stack>
                                <Input label='Higher Education Goals ' placeholder="Enter the student’s higher education aspirations" onChange={handlePayload} value={payload.higherEducationGoals} id='higherEducationGoals'/>
                                <Input label='career goals' placeholder="Enter the career path the student is aspiring toward" onChange={handlePayload} value={payload.careerGoals} id='careerGoals'/>
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
                                        onChange={handlePayload} 
                                        value={payload.scholarshipNeed}
                                        id='scholarshipNeed'
                                        placeholder="Select the level of financial support the student requires"
                                    >
                                        <option value="Full Scholarship">Full Scholarship </option>
                                        <option value="Part Scholarship">Part Scholarship </option>

                                    </Select>
                                </Stack>


                                <Flex justifyContent="space-between" w="100%" flexWrap={"wrap"}>

                                    <Flex justifyContent="flex-start" >

                                        <Button background="transparent" color="green" px="43px" onClick={() => setOpenModal(true)}>Cancel</Button>
                                    </Flex>


                                    <Flex justifyContent="flex-end" >




                                        <HStack spacing={["100px","12px","12px","12px"]}>

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


                                <Flex justifyContent="space-between" w="100%" flexWrap="wrap" >

                                    <Flex justifyContent="flex-start" >

                                        <Button background="transparent" color="green" px="43px" onClick={() => setOpenModal(true)}>Cancel</Button>
                                    </Flex>


                                    <Flex justifyContent="flex-end" >




                                        <HStack spacing={["100px","12px", "12px","12px"]}>

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
                                        Please review the student's details carefully before clicking submit to ensure accuracy. </Text>
                                </Stack>
                         
                         <Stack border="1px solid #E3EBF2" rounded={"7px"} py="14px" px="17px" spacing="13px" w="100%">

                            <ReviewCard
                            title="full name"
                            value={payload.fullName}

                             />

                            <ReviewCard
                            title="date of birth"
                            value={payload.dob}

                             />

                            <ReviewCard
                            title="gender"
                            value={payload.gender}

                             />

                            <ReviewCard
                            title="state"
                            value={payload.state}

                             />

                            <ReviewCard
                            title="city"
                            value={payload.city}

                             />


                         </Stack>
                         <Stack border="1px solid #E3EBF2" rounded={"7px"} py="14px" px="17px" spacing="13px" w="100%">

                            <ReviewCard
                            title="phone number"
                            value={payload.studentPhone}

                             />

                            <ReviewCard
                            title="email address"
                            value={payload.email}

                             />

                            <ReviewCard
                            title="residential address"
                            value={payload.address}

                             />

                        
                         </Stack>
                         <Stack border="1px solid #E3EBF2" rounded={"7px"} py="14px" px="17px" spacing="13px" w="100%">

                            <ReviewCard
                            title="department"
                            value={payload.department}

                             />

                            <ReviewCard
                            title="class level"
                            value={payload.classLevel}

                             />

                            <ReviewCard
                            title="subjects"
                            value={payload.subjects}

                             />

                        
                         </Stack>
                         <Stack border="1px solid #E3EBF2" rounded={"7px"} py="14px" px="17px" spacing="13px" w="100%">

                            <ReviewCard
                            title="field of interest"
                            value={payload.studentInterests}

                             />

                            <ReviewCard
                            title="scholarship neeed"
                            value={payload.scholarshipNeed}

                             />

                        
                         </Stack>


                                <Flex justifyContent="space-between" w="100%" >

                                    <Flex justifyContent="flex-start" >

                                        <Button background="transparent" color="green" px="43px" onClick={() => setOpenModal(true)}>Cancel</Button>
                                    </Flex>


                                    <Flex justifyContent="flex-end" >




                                        <HStack spacing={["100px","12px", "12px","12px"]}>

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

                                            <Button px="43px" isLoading={Loading} onClick={() => {

                                                    Submit()

                                            }}>Add Student</Button>
                                        </HStack>
                                    </Flex>
                                </Flex>

                            </Stack>
                        )
                    }




                </Box>

            </Flex>
            <BackNotification isOpen={OpenModal} onClose={()=>setOpenModal(false)} />
        </SubLayout>

    )
}
