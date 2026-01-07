import React, { useState, useContext, useEffect } from 'react'
import SubLayout from '../../DashboardLayout/SubLayout'
import { Text, Flex, HStack, SimpleGrid, VStack, Stack, Select, FormControl, FormLabel, FormHelperText, Box, Spacer } from '@chakra-ui/react'
import Input from '../../Components/Input'
import TextArea from '../../Components/TextArea'
import Button from '../../Components/Button'
import BackNotification from '../../Components/BackNotification'
import ReviewCard from '../../Components/ReviewCard'
import { useNavigate } from 'react-router-dom';
import { GiCheckMark } from "react-icons/gi";
import { FaArrowLeft, FaCloudUploadAlt } from 'react-icons/fa'
import { FiEdit2 } from "react-icons/fi";
import { CreateStudentApi, GetAllBanksApi, VerifyBanksApi, fetchAllStates, fetchLgasByState } from "../../Utils/ApiCall";
import ShowToast from "../../Components/ToastNotification";
import UpdateReviewModal from '../../Components/UpdateReview'
import SearchableInput from '../../Components/SearchableInput'
import { IoIosCloseCircle } from 'react-icons/io';
import Preloader from '../../Components/Preloader'

export default function AddNewStudents() {

    const [oldValue, setOldValue] = useState({
        name: "",
        value: "",
        id: ""
    })

    const updateReview = (name, value, id) => {
        console.log(name, value);

        setOpenReviewModal(true);

        setOldValue({
            name,
            value: Array.isArray(value) ? value.join(", ") : (value || ""),
            id
        });
    };



    const [StudentInterest, setStudentInterest] = useState([])
    const [interestInput, setInterestInput] = useState("");
    const [Banks, setBanks] = useState([]);
    const [isVerifying, setIsVerifying] = useState(false);
    const [states, setStates] = useState([]);
    const [lgas, setLgas] = useState([]);

    const [payload, setPayload] = useState({
        fullName: "",
        dob: "",
        gender: "",
        studentPhone: "",
        email: "",
        guardianPhone: "",
        guardianName: "",
        guardianAccountName: "",
        guardianAccountNumber: "",
        guardianBankName: "",
        guardianBankCode: "",
        state: "",
        localGovernment: "",
        city: "",
        zipCode: "",
        address: "",
        department: "",
        classLevel: "",
        performance: "",
        subjects: "",
        essay: "",
        intendedFieldOfStudy: "",
        studentInterest: "",
        higherEducationGoals: "",
        careerGoals: "",
        scholarshipNeed: "",
    });

    const handleAddInterest = (newInterest) => {
        setPayload((prev) => ({
            ...prev,
            studentInterest: [...(prev.studentInterest || []), newInterest] // always array
        }));
    };

    // function to remove interest
    const handleRemoveInterest = (interest) => {
        setStudentInterest(StudentInterest.filter((item) => item !== interest));
    };

    const options = [
        { value: "health and medicine", label: "Health and Medicine" },
        { value: "science", label: "Science" },
        { value: "nurse process", label: "Nurse Process" }
    ];

    const genderOptions = [
        { value: "male", label: "Male" },
        { value: "female", label: "Female" }
    ];

    const [showToast, setShowToast] = useState({
        show: false,
        message: "",
        status: ""
    })

    const [Loading, setLoading] = useState(false);
    const [emailError, setEmailError] = useState("");

    const handlePayload = (e) => {
        const value = String(e.target.value); // 👈 force value to string
        const id = e.target.id;

        setPayload({ ...payload, [id]: value });

        if (id === "studentInterest") {
            setStudentInterest((prev) => [...prev, value]);
        }
    };

    const validateEmail = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (payload.email && !emailRegex.test(payload.email)) {
            setEmailError("Please enter a valid email address");
        } else {
            setEmailError("");
        }
    };


    const removeItem = (item) => {
        const updatedProcedureArr = StudentInterest.filter(id => id !== item);
        setStudentInterest(updatedProcedureArr);

    }

    const Submit = async () => {

        setLoading(true)

        try {
            const result = await CreateStudentApi({
                ...payload,
                studentInterest: StudentInterest.join(', '), // ✅ convert array to string
            });

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
    const [OpenReviewModal, setOpenReviewModal] = useState(false)

    const handleBankSelection = (bank) => {
        setPayload({
            ...payload,
            guardianBankName: bank.name,
            guardianBankCode: bank.code,
        });
    };

    const GetAllBanks = async () => {
        try {
            const result = await GetAllBanksApi();
            setBanks(result.data.data);
        } catch (e) {
            setShowToast({
                show: true,
                message: e.message,
                status: "error",
            });
        }
    };

    // const VerifyBankDetails = async () => {
    //     if (payload.guardianAccountNumber.length === 10 && payload.guardianBankCode) {
    //         setIsVerifying(true);
    //         try {
    //             const result = await VerifyBanksApi({
    //                 account_number: payload.guardianAccountNumber,
    //                 bank_code: payload.guardianBankCode,
    //             });
    //             if (result.data.status) {
    //                 setPayload(prev => ({ ...prev, guardianAccountName: result.data.data.account_name }));
    //                 setShowToast({
    //                     show: true,
    //                     message: "Account verified successfully",
    //                     status: "success",
    //                 });

    //                 setTimeout(() => {
    //                     setShowToast({ show: false });
    //                 }, 3000);
    //             } else {
    //                 setShowToast({
    //                     show: true,
    //                     message: result.data.message,
    //                     status: "error",
    //                 });

    //                 setTimeout(() => {
    //                     setShowToast({ show: false });
    //                 }, 3000);
    //             }
    //         } catch (e) {
    //             setShowToast({ show: true, message: e.message, status: "error" });
    //             setTimeout(() => {
    //                 setShowToast({ show: false });
    //             }, 3000);
    //         } finally {
    //             setIsVerifying(false);
    //         }
    //     }
    // };

    // for loading all states
    const loadStates = async () => {
        try {
            const data = await fetchAllStates();
            console.log("States data:", data);
            setStates(data);
        } catch (error) {
            console.error("Error loading states:", error);
        }
    };

    const loadLgas = async (state_code) => {
        try {
            if (!state_code) return;
            console.log("Fetching LGAs for:", state_code);
            const data = await fetchLgasByState(state_code);
            console.log("Fetched LGAs data:", data);
            if (data.status === "success" && Array.isArray(data.data)) {
                setLgas(data.data);
            } else {
                setLgas([]);
            }
        } catch (error) {
            console.error("Error loading LGAs:", error);
            setLgas([]);
        }
    };



    const handleStateChange = async (e) => {
        const selectedStateCode = e.target.value;
        const selectedState = states.find((s) => s.state_code === selectedStateCode);

        setPayload((prev) => ({
            ...prev,
            state_code: selectedStateCode,
            state: selectedState?.state_name || "",
            localGovernment: "",
        }));

        await loadLgas(selectedStateCode);
    };

    useEffect(() => {
        GetAllBanks();
        loadStates();
        loadLgas();
    }, []);

    useEffect(() => {
        // VerifyBankDetails();
    }, [payload.guardianAccountNumber, payload.guardianBankCode]);

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
                Loading && <Preloader />
            }
            {
                showToast.show && (
                    <ShowToast message={showToast.message} status={showToast.status} show={showToast.show} />

                )
            }

            <Flex
                justifyContent="space-between"
                flexWrap="wrap"
                px={{ base:"0" }}
                pl={{ base: "0", md: "128px" }}
                overflowX="hidden"
            >

                <Box w="100%"
                    maxW={{ md: "65%" }}
                    zIndex="0" pos="relative" left="0">
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
                <Box w="100%" maxW={{ md: "75%" }}>
                    {
                        StudentDetails.view && (
                            <Stack spacing="52px" alignItems="start" w="100%" maxW={{ md: "65%" }}>

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
                                <Input label='Date of Birth (DOB)' type='date' placeholder="DD/MM/YYYY" onChange={handlePayload} value={payload.dob} id='dob' />
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
                                        <option value="male">male</option>
                                        <option value="female">female</option>
                                    </Select>
                                </Stack>
                                <Input label='Phone Number' placeholder='+234' onChange={handlePayload} value={payload.studentPhone} id='studentPhone' />
                                <Input label='Guardian’s / Parent’s Phone Number' placeholder='+234' onChange={handlePayload} value={payload.guardianPhone} id='guardianPhone' />
                                <Input label='Guardian’s / Parent’s Name' placeholder='Enter Guardians Name' onChange={handlePayload} value={payload.guardianName} id='guardianName' />
                                <SearchableInput
                                    label="Guardian’s / Parent’s Bank Name"
                                    value={payload.guardianBankName}
                                    onChange={(e) => handleBankSelection(e.target.value)}
                                    options={Banks}
                                    placeholder="Search for a bank"
                                />
                                <Input label='Guardian’s / Parent’s Account Number' placeholder='Enter Guardians Account Number' onChange={handlePayload} value={payload.guardianAccountNumber} id='guardianAccountNumber' />
                                <Input label='Guardian’s / Parent’s Account Name' placeholder='Enter Guardians Account Name' onChange={handlePayload} value={payload.guardianAccountName} id='guardianAccountName' />

                                <Box w="full">
                                    <Input
                                        label="Email Address"
                                        placeholder="Provide the student’s email address"
                                        onChange={handlePayload}
                                        value={payload.email}
                                        id="email"
                                        type="email"
                                        onBlur={validateEmail} // 🔑 triggers when leaving the field
                                    />
                                    {emailError && (
                                        <p style={{ color: "red", fontSize: "0.85rem", marginTop: "4px" }}>
                                            {emailError}
                                        </p>
                                    )}
                                </Box>

                                <div>
                                    {/* State Dropdown */}
                                    <FormControl mb="20px">
                                        <FormLabel htmlFor="state" fontSize="14px">
                                            State
                                        </FormLabel>
                                        <Select
                                            placeholder="Select State"
                                            id="state"
                                            value={payload.state_code || ""}
                                            onChange={handleStateChange}
                                        >
                                            {states.map((state) => (
                                                <option
                                                    key={state.id}
                                                    value={state.state_code}
                                                >
                                                    {state.state_name}
                                                </option>
                                            ))}
                                        </Select>
                                    </FormControl>

                                    {/* LGA Dropdown */}
                                    <FormControl>
                                        <FormLabel
                                            htmlFor="localGovernment"
                                            fontSize="14px"
                                        >
                                            Local Government
                                        </FormLabel>
                                        <Select
                                            placeholder="Select Local Government"
                                            id="localGovernment"
                                            value={payload.localGovernment || ""}
                                            onChange={(e) =>
                                                setPayload({
                                                    ...payload,
                                                    localGovernment: e.target.value,
                                                })
                                            }
                                            isDisabled={!payload.state_code}
                                        >
                                            {lgas.map((lga) => (
                                                <option key={lga.id} value={lga.lga_name}>
                                                    {lga.lga_name}
                                                </option>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </div>
                                <Input label='City' placeholder="Enter the student's current address (street, city, state)." onChange={handlePayload} value={payload.city} id='city' />
                                <Input label='Residential Address' placeholder="Enter the student's current address (street, city, state)." onChange={handlePayload} value={payload.address} id='address' />


                                <Flex
                                    w="100%"
                                    gap={4}
                                    flexDir={{ base: "column", md: "row" }}
                                    justify="space-between"
                                >
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
                                <Stack w="100%" pos="relative" top="-15px">
                                    <Text
                                        fontWeight="500"
                                        fontSize="14px"
                                        color="#101011"
                                        fontFamily="heading"
                                    >
                                        Class Level
                                    </Text>

                                    <Select
                                        border="2px"
                                        fontSize="small"
                                        fontWeight="normal"
                                        size="lg"
                                        w="100%"
                                        onChange={handlePayload}
                                        value={payload.classLevel}
                                        id="classLevel"
                                        placeholder="Select the student's class level"
                                    >
                                        {/* JSS */}
                                        <option value="JSS1">JSS1</option>
                                        <option value="JSS2">JSS2</option>
                                        <option value="JSS3">JSS3</option>

                                        {/* SS */}
                                        <option value="SS1">SS1</option>
                                        <option value="SS2">SS2</option>
                                        <option value="SS3">SS3</option>
                                    </Select>
                                </Stack>

                                <TextArea label='class performance' placeholder="Briefly describe how this student is performing in your current classes (e.g., overall grades, key subjects)." onChange={handlePayload} value={payload.performance} id='performance'></TextArea>
                                <TextArea label='subject' placeholder="List the main subjects this student is studying this session" onChange={handlePayload} value={payload.subjects} id='subjects'></TextArea>

                                <Flex
                                    w="100%"
                                    gap={4}
                                    flexDir={{ base: "column", md: "row" }}
                                    justify="space-between"
                                >
                                    <Flex justifyContent="flex-start" >

                                        <Button background="transparent" color="green" px="43px" onClick={() => setOpenModal(true)}>Cancel</Button>
                                    </Flex>


                                    <Flex justifyContent="flex-end" >

                                        <HStack
                                            spacing={3}
                                            w={{ base: "100%", md: "auto" }}
                                            justifyContent={{ base: "space-between", md: "flex-end" }}
                                        >

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
                                <Input label="intended Field of study " placeholder="e.g Nursing Science" onChange={handlePayload} value={payload.intendedFieldOfStudy} id='intendedFieldOfStudy' />
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

                                    {/* Input field for typing and adding interests */}
                                    <Flex gap={2} align="center">
                                        <Input
                                            borderWidth="2px"
                                            fontSize="13px"
                                            borderColor="#34996B"
                                            fontWeight="400"
                                            size="lg"
                                            w="100%"
                                            color="#101011"
                                            placeholder="Type and press Enter to add interests"
                                            value={interestInput}
                                            onChange={(e) => setInterestInput(e.target.value)}
                                            onKeyDown={(e) => {
                                                if (e.key === "Enter" && interestInput.trim() !== "") {
                                                    setStudentInterest([...StudentInterest, interestInput.trim()]);
                                                    setInterestInput(""); // clear input
                                                }
                                            }}
                                        />

                                        <Box>
                                            <Button
                                                colorScheme="green"
                                                onClick={() => {
                                                    if (interestInput.trim() !== "") {
                                                        setStudentInterest([...StudentInterest, interestInput.trim()]);
                                                        setInterestInput("");
                                                    }
                                                }}
                                            >
                                                Add
                                            </Button>
                                        </Box>
                                    </Flex>

                                    {/* Display added interests */}
                                    <SimpleGrid mt="12px" columns={{ base: 2, md: 3 }} spacing={2}>
                                        {StudentInterest?.map((item, i) => (
                                            <Flex
                                                key={i}
                                                cursor="pointer"
                                                px="10px"
                                                py="10px"
                                                rounded={"25px"}
                                                fontSize="13px"
                                                _hover={{ bg: "blue.blue500" }}
                                                bg="greenn.greenn500"
                                                w="100%"
                                                justifyContent="space-between"
                                                alignItems="center"
                                            >
                                                <Text color="#fff" fontWeight="500" textTransform="capitalize">
                                                    {item}
                                                </Text>
                                                <Box
                                                    fontSize="20px"
                                                    color="#fff"
                                                    onClick={() => removeItem(item)}
                                                >
                                                    <IoIosCloseCircle />
                                                </Box>
                                            </Flex>
                                        ))}
                                    </SimpleGrid>
                                </Stack>

                                <Input label='Higher Education Goals ' placeholder="Enter the student’s higher education aspirations" onChange={handlePayload} value={payload.higherEducationGoals} id='higherEducationGoals' />
                                <Input label='career goals' placeholder="Enter the career path the student is aspiring toward" onChange={handlePayload} value={payload.careerGoals} id='careerGoals' />
                                <Input label='leadership roles' placeholder="Mention any leadership roles the student has taken on" />
                                <Input label='Extracurricular Activities' placeholder="e.g Debate club" />

                                <Stack w="100%" pos="relative" top="-15px">
                                    <Text

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

                                        <option value="FULL SCHOLARSHIP">FULL SCHOLARSHIP</option>
                                        <option value="PARTIAL SCHOLARSHIP">PARTIAL SCHOLARSHIP</option>

                                    </Select>
                                </Stack>

                                <Flex
                                    w="100%"
                                    gap={4}
                                    flexDir={{ base: "column", md: "row" }}
                                    justify="space-between"
                                >
                                    <Flex justifyContent="flex-start" >

                                        <Button background="transparent" color="green" px="43px" onClick={() => setOpenModal(true)}>Cancel</Button>
                                    </Flex>

                                    <Flex justifyContent="flex-end" >

                                        <HStack
                                            spacing={3}
                                            w={{ base: "100%", md: "auto" }}
                                            justifyContent={{ base: "space-between", md: "flex-end" }}
                                        >
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
                            <Stack spacing="32px" alignItems="start" w={["100%", "100%", "65%", "65%",]}>

                                <Stack mb="15px">
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
                                        mb="15px"
                                    >
                                        Please upload the student’s essay detailing their career goals, interests, leadership roles, and required financial support.                    </Text>
                                </Stack>

                                <TextArea label='Student Essay ' placeholder="Enter the student’s essay" onChange={handlePayload} value={payload.essay} id='essay' />

                                <Flex
                                    w="100%"
                                    gap={3}
                                    flexDirection={{ base: "column", md: "row" }}
                                    justifyContent="space-between"
                                    alignItems="stretch"
                                >


                                    <Flex justifyContent="flex-start" >

                                        <Button background="transparent" color="green" px="43px" onClick={() => setOpenModal(true)}>Cancel</Button>
                                    </Flex>

                                    <Flex justifyContent="flex-end" >

                                        <HStack
                                            spacing={3}
                                            w={{ base: "100%", md: "auto" }}
                                            justifyContent={{ base: "space-between", md: "flex-end" }}
                                        >

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
                                        onClick={() => updateReview("Full Name", payload.fullName, "fullName")}

                                    />

                                    <ReviewCard
                                        title="date of birth"
                                        value={payload.dob}
                                        onClick={() => updateReview("Date of Birth", payload.dob, "dob")}

                                    />

                                    <ReviewCard
                                        title="gender"
                                        value={payload.gender}
                                        onClick={() => updateReview("Gender", payload.gender, "gender")}

                                    />
                                    <ReviewCard
                                        title="guardianName"
                                        value={payload.guardianName}
                                        onClick={() => updateReview("guardianName", payload.guardianName, "guardianName")}

                                    />
                                    <ReviewCard
                                        title="guardianAccountName"
                                        value={payload.guardianAccountName}
                                        onClick={() => updateReview("guardianAccountName", payload.guardianAccountName, "guardianName")}

                                    />
                                    <ReviewCard
                                        title="guardianBankCode"
                                        value={payload.guardianBankCode}
                                        onClick={() => updateReview("guardianBankCode", payload.guardianBankCode, "guardianName")}

                                    />

                                    <ReviewCard
                                        title="state"
                                        value={payload.state}
                                        onClick={() => updateReview("State", payload.state, "state")}

                                    />

                                    <ReviewCard
                                        title="LGA"
                                        value={payload.localGovernment}
                                        onClick={() => updateReview("LGA", payload.localGovernment, "localGovernment")}

                                    />

                                    <ReviewCard
                                        title="city"
                                        value={payload.city}
                                        onClick={() => updateReview("City", payload.city, "city")}

                                    />

                                </Stack>
                                <Stack border="1px solid #E3EBF2" rounded={"7px"} py="14px" px="17px" spacing="13px" w="100%">

                                    <ReviewCard
                                        title="phone number"
                                        value={payload.studentPhone}
                                        onClick={() => updateReview("Student Phone", payload.studentPhone, "studentPhone")}

                                    />

                                    <ReviewCard
                                        title="email address"
                                        value={payload.email}
                                        onClick={() => updateReview("Email Address", payload.email, "email")}

                                    />

                                    <ReviewCard
                                        title="residential address"
                                        value={payload.address}
                                        onClick={() => updateReview("Residental Address", payload.address, "address")}

                                    />


                                </Stack>
                                <Stack border="1px solid #E3EBF2" rounded={"7px"} py="14px" px="17px" spacing="13px" w="100%">

                                    <ReviewCard
                                        title="department"
                                        value={payload.department}
                                        onClick={() => updateReview("Department", payload.department, "department")}

                                    />

                                    <ReviewCard
                                        title="class level"
                                        value={payload.classLevel}
                                        onClick={() => updateReview("Class Level", payload.classLevel, "classLevel")}

                                    />

                                    <ReviewCard
                                        title="subjects"
                                        value={payload.subjects}
                                        onClick={() => updateReview("Subjects", payload.subjects, "subjects")}

                                    />

                                </Stack>
                                <Stack border="1px solid #E3EBF2" rounded={"7px"} py="14px" px="17px" spacing="13px" w="100%">

                                    <ReviewCard
                                        title="Field of Interest"
                                        value={
                                            Array.isArray(payload.studentInterest)
                                                ? payload.studentInterest.join(", ")
                                                : (payload.studentInterest || "")
                                        }
                                        onClick={() =>
                                            updateReview(
                                                "Field Of Interest",
                                                payload.studentInterest,
                                                "studentInterest"
                                            )
                                        }
                                    />



                                    <ReviewCard
                                        title="scholarship neeed"
                                        value={payload.scholarshipNeed}
                                        onClick={() => updateReview("Scholarship Need", payload.scholarshipNeed, "fullName")}

                                    />

                                    <ReviewCard
                                        title="performance"
                                        value={payload.performance}
                                        onClick={() => updateReview("Performance", payload.performance, "performance")}

                                    />

                                    <ReviewCard
                                        title="career goals"
                                        value={payload.careerGoals}
                                        onClick={() => updateReview("Career Goals", payload.careerGoals, "careerGoals")}

                                    />

                                    <ReviewCard
                                        title="higher education goals"
                                        value={payload.higherEducationGoals}
                                        onClick={() => updateReview("Higher Educational Goals", payload.higherEducationGoals, "higherEducationGoals")}

                                    />

                                </Stack>

                                <Flex justifyContent="space-between" w="100%" >

                                    <Flex justifyContent="flex-start" >

                                        <Button background="transparent" color="green" px="43px" onClick={() => setOpenModal(true)}>Cancel</Button>
                                    </Flex>

                                    <Flex justifyContent="flex-end" >

                                        <HStack
                                            spacing={3}
                                            w={{ base: "100%", md: "auto" }}
                                            justifyContent={{ base: "space-between", md: "flex-end" }}
                                        >

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
            <BackNotification isOpen={OpenModal} onClose={() => setOpenModal(false)} />
            <UpdateReviewModal isOpen={OpenReviewModal} onClose={() => setOpenReviewModal(false)} oldValue={oldValue} payload={payload} setPayload={setPayload} />
        </SubLayout>
    )
}
