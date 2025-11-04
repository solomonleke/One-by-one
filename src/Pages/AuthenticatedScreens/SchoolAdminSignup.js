import React, { useState, useEffect } from "react";
import AuthenticatedWrapper from "./Layout/Index";
import { Box, VStack, HStack, Text, Stack, FormControl, FormLabel, FormHelperText, Select } from "@chakra-ui/react";
import { motion } from "framer-motion";
import Input from "../../Components/Input";
import SearchableInput from "../../Components/SearchableInput";
import TextArea from "../../Components/TextArea";
import Button from "../../Components/Button";
import { FaArrowLeft, FaCloudUploadAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { MdKeyboardBackspace } from "react-icons/md";
import { CreateAdminApi, GetAllBanksApi, VerifyBanksApi, fetchAllStates, fetchLgasByState } from "../../Utils/ApiCall";
import ShowToast from "../../Components/ToastNotification";



export default function SchoolAdminSignup() {
    const lastPath = localStorage.getItem("url")
    const nav = useNavigate()
    const [SchoolDetailsView, setSchoolDetailsView] = useState(true);
    const [Banks, setBanks] = useState([]);
    const [AcademicPerformanceView, setAcademicPerformanceView] = useState(false);
    const [PrincipalInformationView, setPrincipalInformationView] = useState(false);
    const [states, setStates] = useState([]);
    const [lgas, setLgas] = useState([]);


    const [Payload, setPayload] = useState({
        userType: "SCHOOL-ADMIN",
        schoolName: "",
        schoolBankName: "",
        schoolAccountNumber: "",
        schoolAccountName: "",
        schoolBankCode: "",
        schoolEmail: "",
        address: "",
        city: "",
        localGovernment: "",
        state: "",
        zipCode: "",
        classCapacity: "",
        aboutSchool: "",
        reason: "",
        averageJambScore: "",
        averageWaecScore: "",
        topWaecScore: "",
        topJambScore: "",
        topResult: "",
        principalName: "",
        principalTitle: "",
        principalEmail: "",
        principalPhone: ""
    });

    const [Loading, setLoading] = useState(false)
    const [isVerifying, setIsVerifying] = useState(false);

    // Email validation state and handlers
    const [schoolEmailError, setSchoolEmailError] = useState("");
    const [principalEmailError, setPrincipalEmailError] = useState("");
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const validateEmail = (email, setEmailError) => {
        if (!email) {
            setEmailError("Email is required");
            return false;
        } else if (!emailRegex.test(email)) {
            setEmailError("Please enter a valid email address");
            return false;
        } else {
            setEmailError("");
            return true;
        }
    };

    const handlePayload = (e) => {
        const { id, value } = e.target;
        setPayload({ ...Payload, [id]: value });
    };

    const handleBankSelection = (bank) => {
        setPayload({
            ...Payload,
            schoolBankName: bank.name,
            schoolBankCode: bank.code,
        });
    };








    const firstPage = () => {
        setSchoolDetailsView(true)
        setAcademicPerformanceView(false)
        setPrincipalInformationView(false)
    }
    const secondPage = () => {
        setSchoolDetailsView(false)
        setAcademicPerformanceView(true)
        setPrincipalInformationView(false)
    }
    const lastPage = () => {
        setPrincipalInformationView(true)
        setAcademicPerformanceView(false)
        setSchoolDetailsView(false)
    }

    const [showToast, setShowToast] = useState({
        show: false,
        message: "",
        status: ""
    })

    const tempToken = localStorage.getItem("tempToken")
    const Submit = async () => {

        setLoading(true)
        try {

            const result = await CreateAdminApi(Payload, tempToken)

            if (result.status === 201) {
                setLoading(false)
                setShowToast({ show: true, message: "School Admin created successfully. Kindly Sign in to Continue", status: "success" })
                setTimeout(() => {
                    setShowToast({
                        show: false,

                    })

                    nav("/sign-in")
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


    const GetAllBanks = async () => {
        try {
            const result = await GetAllBanksApi(); // Assuming this function fetches the list of banks

            console.log("All Banks:", result);

            setBanks(result.data.data)

        } catch (e) {
            console.log(e.message)
            setShowToast({
                show: true,
                message: e.message,
                status: "error"
            })
        }


    }


    const VerifyBankDetails = async () => {
        if (Payload.schoolAccountNumber.length === 10 && Payload.schoolBankCode) {
            setIsVerifying(true);
            try {
                const result = await VerifyBanksApi({
                    account_number: Payload.schoolAccountNumber,
                    bank_code: Payload.schoolBankCode,
                });

                console.log("Verify Bank Details Result:", result);

                if (result.data.status) {
                    setPayload(prev => ({ ...prev, schoolAccountName: result.data.data.account_name }));
                    setShowToast({ show: true, message: "Account verified successfully", status: "success" });

                    setTimeout(() => {
                        setShowToast({ show: false });
                    }, 3000);


                } else {
                    setShowToast({ show: true, message: result.data.message, status: "error" });
                    setTimeout(() => {
                        setShowToast({ show: false });
                    }, 3000);
                }
            } catch (e) {
                setShowToast({ show: true, message: e.message, status: "error" });
                setTimeout(() => {
                    setShowToast({ show: false });
                }, 3000);
            } finally {
                setIsVerifying(false);
            }
        }
    };


    // for loading all states
    const loadStates = async () => {
        try {
            const data = await fetchAllStates();
            console.log("States data:", data);
            setStates(Array.isArray(data) ? data : data.data || []);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };


    // Load LGAs when a state is chosen
    const loadLgas = async (state_code) => {
        try {
            if (!state_code) return;
            const data = await fetchLgasByState(state_code);
            console.log("Fetched LGAs data:", data);

            if (data.status === "success" && Array.isArray(data.data)) {
                setLgas(data.data); // ✅ store the array directly
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
        VerifyBankDetails();
    }, [Payload.schoolAccountNumber, Payload.schoolBankCode]);


    return (
        <AuthenticatedWrapper>

            {
                showToast.show && (
                    <ShowToast message={showToast.message} status={showToast.status} show={showToast.show} />

                )
            }
            <Box px={["3%", "15%"]} mt={"40px"}>
                {/* Step Content */}
                <Box mt="62px" position="relative" overflow="hidden">
                    <Box cursor={"pointer"} fontSize={"35px"}>


                        <MdKeyboardBackspace onClick={() => nav(`${lastPath}`)} />
                    </Box>
                    {
                        SchoolDetailsView && (
                            <Box>
                                <VStack justifyItems={"start"} alignItems={"start"} spacing={"22px"}>

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

                                <Stack mt="62px" spacing={"52px"}>
                                    <Input
                                        label="Name of school"
                                        value={Payload.schoolName}
                                        id="schoolName"
                                        type="text" onChange={handlePayload}
                                        placeholder="e.g Golden Inheritance College"
                                    />
                                    <FormControl isInvalid={!!schoolEmailError}>
                                        <Input label="School Email" type="email" onChange={handlePayload} value={Payload.schoolEmail} id="schoolEmail" onBlur={() => validateEmail(Payload.schoolEmail, setSchoolEmailError)} />
                                        {schoolEmailError && <FormHelperText color="red.500">{schoolEmailError}</FormHelperText>}
                                    </FormControl>
                                    <SearchableInput
                                        label="School Bank Name"
                                        value={Payload.schoolBankName}
                                        id="schoolBankName"
                                        onChange={(e) => handleBankSelection(e.target.value)}
                                        options={Banks}
                                        placeholder="Search for a bank"
                                    />
                                    <Input label="School Account Number" type="text" onChange={handlePayload} value={Payload.schoolAccountNumber} id="schoolAccountNumber" />
                                    <Input label="School Account Name" type="text" onChange={handlePayload} value={Payload.schoolAccountName} id="schoolAccountName" disabled={isVerifying || Payload.schoolAccountName} />
                                    <div>
                                        {/* State Dropdown */}
                                        {/* State Dropdown */}
                                        <FormControl mb="20px">
                                            <FormLabel htmlFor="state" fontSize="14px">
                                                State
                                            </FormLabel>
                                            <Select
                                                placeholder="Select State"
                                                id="state"
                                                value={Payload.state_code || ""}
                                                onChange={handleStateChange}
                                            >
                                                {states.map((state) => (
                                                    <option key={state.id} value={state.state_code}>
                                                        {state.state_name}
                                                    </option>
                                                ))}
                                            </Select>
                                        </FormControl>

                                        {/* LGA Dropdown */}
                                        <FormControl>
                                            <FormLabel htmlFor="localGovernment" fontSize="14px">
                                                Local Government
                                            </FormLabel>
                                            <Select
                                                placeholder="Select Local Government"
                                                id="localGovernment"
                                                value={Payload.localGovernment || ""}
                                                onChange={(e) =>
                                                    setPayload({ ...Payload, localGovernment: e.target.value })
                                                }
                                                isDisabled={!Payload.state_code}
                                            >
                                                {lgas.map((lga) => (
                                                    <option key={lga.id} value={lga.lga_name}>
                                                        {lga.lga_name}
                                                    </option>
                                                ))}
                                            </Select>
                                        </FormControl>


                                    </div>


                                    <Input label="City" type="text" onChange={handlePayload} value={Payload.city} id="city" />
                                    <Input label="School Address" type="text" onChange={handlePayload} value={Payload.address} id="address" />
                                    <Input label="Zip code" type="text" onChange={handlePayload} value={Payload.zipCode} id="zipCode" />
                                    <Input
                                        label="Class Capacity"
                                        type="text" onChange={handlePayload}
                                        placeholder="How many students are in the target class?" value={Payload.classCapacity} id="classCapacity"
                                    />
                                    <TextArea
                                        onChange={handlePayload}
                                        label="About School"
                                        placeholder="When was the school established?" value={Payload.aboutSchool} id="aboutSchool"
                                    />
                                    <TextArea label="Why your school should be considered?" value={Payload.reason} id="reason" onChange={handlePayload} />
                                </Stack>


                                <HStack mt="47px" align="center" spacing="auto">
                                    {/* renderPaginationLines */}
                                    <HStack spacing="4px" align="flex-start">

                                        <Box height="8px" width="40px" bg={"green"} cursor="pointer" borderRadius="md" onClick={firstPage} />
                                        <Box height="8px" width="40px" bg={"gray.300"} cursor="pointer" borderRadius="md" onClick={secondPage} />
                                        <Box height="8px" width="40px" bg={"gray.300"} cursor="pointer" borderRadius="md" onClick={lastPage} />

                                    </HStack>
                                    <HStack spacing="4">
                                        <Button px="30px" disabled="true">Back</Button>
                                        <Button px="30px" onClick={secondPage}
                                            disabled={Payload.schoolName !== "" && Payload.schoolBankName !== "" && Payload.schoolAccountNumber !== "" && Payload.schoolAccountName !== "" && Payload.schoolBankCode !== "" && Payload.state !== "" && Payload.address !== "" && Payload.city !== "" &&
                                                Payload.zipCode !== "" && Payload.classCapacity !== "" && Payload.aboutSchool !== "" && Payload.reason !== "" && Payload.schoolEmail !== "" ? false : true
                                            }>Next</Button>
                                    </HStack>
                                </HStack>

                            </Box>
                        )
                    }
                    {
                        AcademicPerformanceView && (
                            <Box>
                                <VStack justifyItems={"start"} alignItems={"start"} spacing={"22px"}>

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

                                <Stack mt="62px" spacing={"52px"}>
                                    <Input label="Average JAMB Score" type="text" onChange={handlePayload} placeholder="Enter the average JAMB score of your school." value={Payload.averageJambScore} id="averageJambScore" />
                                    <Input label="Average WAEC Score" type="text" onChange={handlePayload} placeholder="E.g 6A's 2B's ,9A's" value={Payload.averageWaecScore} id="averageWaecScore" />
                                    <Input
                                        label="Top WAEC Score (Last 3 Years)"
                                        placeholder="E.g 6A's 2B's ,9A's"
                                        type="text" onChange={handlePayload} value={Payload.topWaecScore} id="topWaecScore"
                                    />
                                    <Input label="Top JAMB Score (Last 3 Years)" placeholder="E.g 2022(390), 2023(400), 2024(390)" type="text" onChange={handlePayload} value={Payload.topJambScore} id="topJambScore" />
                                    {/* <Input label="Top Result (Target Class)" type="text" onChange={handlePayload} value={Payload.topResult} id="topResult" /> */}
                                </Stack>


                                <HStack mt="47px" align="center" spacing="auto">
                                    {/* renderPaginationLines */}
                                    <HStack spacing="4px" align="flex-start">

                                        <Box height="8px" width="40px" bg={"green"} cursor="pointer" borderRadius="md" onClick={firstPage} />
                                        <Box height="8px" width="40px" bg={"green"} cursor="pointer" borderRadius="md" onClick={secondPage} />
                                        <Box height="8px" width="40px" bg={"gray.300"} cursor="pointer" borderRadius="md" onClick={lastPage} />

                                    </HStack>
                                    <HStack spacing="4">
                                        <Button px="30px" onClick={firstPage}>Back</Button>
                                        <Button px="30px" onClick={lastPage} disabled={Payload.averageJambScore !== "" && Payload.averageWaecScore !== "" && Payload.topJambScore !== ""
                                            && Payload.topWaecScore !== "" ? false : true}>Next</Button>
                                    </HStack>
                                </HStack>

                            </Box>
                        )
                    }
                    {
                        PrincipalInformationView && (
                            <Box>
                                <VStack justifyItems={"start"} alignItems={"start"} spacing={"22px"}>
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

                                <Stack mt="62px" spacing={"52px"}>
                                    <Input label="Title" type="text" onChange={handlePayload} placeholder="e.g Mr." value={Payload.principalTitle} id="principalTitle" />
                                    <Input label="Full Name" type="text" onChange={handlePayload} placeholder="e.g John Doe" value={Payload.principalName} id="principalName" />
                                    <Input label="Email" type="email" onChange={handlePayload} value={Payload.principalEmail} id="principalEmail" onBlur={() => validateEmail(Payload.principalEmail, setPrincipalEmailError)} />
                                    <Input
                                        label="Phone Number"
                                        type="text" onChange={handlePayload}
                                        placeholder="+234" value={Payload.principalPhone} id="principalPhone"
                                    />
                                </Stack>


                                <HStack mt="47px" align="center" spacing="auto">
                                    {/* renderPaginationLines */}
                                    <HStack spacing="4px" align="flex-start">

                                        <Box height="8px" width="40px" bg={"green"} cursor="pointer" borderRadius="md" onClick={firstPage} />
                                        <Box height="8px" width="40px" bg={"green"} cursor="pointer" borderRadius="md" onClick={secondPage} />
                                        <Box height="8px" width="40px" bg={"green"} cursor="pointer" borderRadius="md" onClick={lastPage} />

                                    </HStack>
                                    <HStack spacing="4">
                                        <Button px="30px" onClick={secondPage}>Back</Button>
                                        <Button px="30px" isLoading={Loading} onClick={Submit} disabled={Payload.principlalTitle !== "" && Payload.principalName !== "" &&
                                            Payload.principalEmail !== "" && Payload.principalPhone !== "" ? false : true}>Finish</Button>
                                    </HStack>
                                </HStack>

                            </Box>
                        )
                    }
                </Box>


            </Box>
        </AuthenticatedWrapper>
    );
}
