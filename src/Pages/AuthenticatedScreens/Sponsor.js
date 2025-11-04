import React, { useState, useEffect } from "react";
import AuthenticatedWrapper from "./Layout/Index";
import { FaArrowLeft } from "react-icons/fa";
import {
  Box,
  Text,
  VStack,
  HStack,
  Tag,
  Wrap,
  WrapItem,
  FormControl,
  FormLabel,
  Select,
  Input,
} from "@chakra-ui/react";
import TextArea from "../../Components/TextArea";
import Button from "../../Components/Button";
import {
  CreateAdminApi,
  fetchAllStates,
  fetchLgasByState,
} from "../../Utils/ApiCall";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import ShowToast from "../../Components/ToastNotification";

const Sponsor = () => {
  const [currentView, setCurrentView] = useState("motivationView");
  const [states, setStates] = useState([]);
  const [lgas, setLgas] = useState([]);

  const [payload, setPayload] = useState({
    userType: "SPONSOR",
    motivation: "",
    interest: [],
    state: "",
    state_code: "",
    localGovernment: "",
    city: "",
  });

  const [showToast, setShowToast] = useState({
    show: false,
    message: "",
    status: "",
  });

  const [loading, setLoading] = useState(false);
  const nav = useNavigate();

  // ----------- HANDLERS --------------
  const handleInputChange = (key, value) => {
    setPayload((prev) => ({ ...prev, [key]: value }));
  };

  const toggleFieldSelection = (field) => {
    setPayload((prev) => ({
      ...prev,
      interest: prev.interest.includes(field)
        ? prev.interest.filter((item) => item !== field)
        : [...prev.interest, field],
    }));
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

  const handlePayload = (e) => {
    setPayload({ ...payload, [e.target.id]: e.target.value });
  };

  // ----------- API CALLS --------------
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

  useEffect(() => {
    loadStates();
  }, []);

  // ----------- SUBMIT HANDLER --------------
  const tempToken = localStorage.getItem("tempToken");

  const Submit = async () => {
    setLoading(true);
    try {
      const result = await CreateAdminApi(payload, tempToken);

      if (result.status === 201) {
        setShowToast({
          show: true,
          message: "Sponsor Admin created successfully. Kindly sign in to continue.",
          status: "success",
        });
        setTimeout(() => {
          setShowToast({ show: false });
          nav("/sign-in");
        }, 4000);
      }
    } catch (e) {
      console.error(e.message);
      setShowToast({
        show: true,
        message: e.message,
        status: "error",
      });
      setTimeout(() => setShowToast({ show: false }), 7000);
    } finally {
      setLoading(false);
    }
  };

  // ----------- PAGINATION VIEW --------------
  const renderPaginationLines = () => (
    <HStack spacing="4px" align="flex-start">
      {["motivationView", "fieldOfInterestView", "myLocationView"].map(
        (view) => (
          <Box
            key={view}
            height="8px"
            width="40px"
            bg={currentView === view ? "teal.500" : "gray.300"}
            cursor="pointer"
            borderRadius="md"
            onClick={() => setCurrentView(view)}
            transition="background-color 0.3s"
          />
        )
      )}
    </HStack>
  );

  // ----------- MAIN RENDER --------------
  return (
    <AuthenticatedWrapper>
      {showToast.show && (
        <ShowToast
          message={showToast.message}
          status={showToast.status}
          show={showToast.show}
        />
      )}

      <Box px={["3%", "15%"]} mt="40px">
        <Box mt="62px" position="relative" overflow="hidden">
          <motion.div
            key={currentView}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "tween", ease: "easeOut", duration: 0.5 }}
          >
            {/* Motivation View */}
            {currentView === "motivationView" && (
              <VStack spacing="70px" align="start">
                <VStack align="start" spacing="22px">
                  <FaArrowLeft />
                  <Text
                    fontWeight="700"
                    fontSize="22px"
                    color="#101011"
                    fontFamily="heading"
                  >
                    Personalize Your Sponsorship Journey
                  </Text>
                  <Text
                    fontSize="small"
                    fontWeight="medium"
                    color="#6B7280"
                    lineHeight="24px"
                  >
                    We’d love to learn more about what inspires you to support
                    students. Your story helps us connect you with students who
                    align with your values and goals.
                  </Text>
                </VStack>
                <TextArea
                  label="Motivation"
                  id="motivation"
                  placeholder="What motivates you to sponsor students?"
                  value={payload.motivation}
                  onChange={(e) =>
                    handleInputChange("motivation", e.target.value)
                  }
                />
              </VStack>
            )}

            {/* Field of Interest View */}
            {currentView === "fieldOfInterestView" && (
              <VStack spacing="70px" align="start">
                <VStack align="start" spacing="22px">
                  <FaArrowLeft />
                  <Text
                    fontWeight="700"
                    fontSize="22px"
                    color="#101011"
                    fontFamily="heading"
                  >
                    Field of Interest
                  </Text>
                  <Text
                    fontSize="small"
                    fontWeight="medium"
                    color="#6B7280"
                    lineHeight="24px"
                  >
                    Do you have specific fields or areas of interest you'd like
                    to support? <br /> You can select multiple options.
                  </Text>
                </VStack>

                <Wrap spacing="10px">
                  {[
                    "Arts & Humanities",
                    "Science",
                    "Technology",
                    "Business & Finance",
                    "Healthcare & Medicine",
                    "Law & Social Justice",
                    "Engineering",
                    "Math",
                    "General Support (No preference)",
                  ].map((field) => (
                    <WrapItem key={field}>
                      <Tag
                        size="lg"
                        variant="outline"
                        textColor={
                          payload.interest.includes(field) ? "#39996B" : ""
                        }
                        bg={
                          payload.interest.includes(field)
                            ? "#39996B7A"
                            : "white"
                        }
                        color={
                          payload.interest.includes(field)
                            ? "white"
                            : "gray.700"
                        }
                        cursor="pointer"
                        onClick={() => toggleFieldSelection(field)}
                        py="4"
                        px="6"
                        rounded="xl"
                      >
                        {field}
                      </Tag>
                    </WrapItem>
                  ))}
                </Wrap>
              </VStack>
            )}

            {/* My Location View */}
            {currentView === "myLocationView" && (
              <VStack spacing="70px" align="start">
                <VStack align="start" spacing="22px">
                  <FaArrowLeft />
                  <Text
                    fontWeight="700"
                    fontSize="22px"
                    color="#101011"
                    fontFamily="heading"
                  >
                    My Location
                  </Text>
                  <Text
                    fontSize="small"
                    fontWeight="medium"
                    color="#6B7280"
                    lineHeight="24px"
                  >
                    Please provide your location details.
                  </Text>
                </VStack>

                <Wrap spacing="10px">
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

                  {/* City Input */}
                  <FormControl>
                    <FormLabel htmlFor="city" fontSize="14px">
                      City
                    </FormLabel>
                    <Input
                      id="city"
                      type="text"
                      placeholder="Your city"
                      value={payload.city}
                      onChange={handlePayload}
                    />
                  </FormControl>
                </Wrap>
              </VStack>
            )}
          </motion.div>
        </Box>

        {/* Pagination Buttons */}
        <HStack mt="150px" align="center" spacing="auto">
          {renderPaginationLines()}
          <HStack>
            {currentView === "motivationView" && (
              <Button onClick={() => setCurrentView("fieldOfInterestView")} px="30px">
                Next
              </Button>
            )}
            {currentView === "fieldOfInterestView" && (
              <Button onClick={() => setCurrentView("myLocationView")} px="30px">
                Next
              </Button>
            )}
            {currentView === "myLocationView" && (
              <Button onClick={Submit} isLoading={loading} px="30px">
                Finish
              </Button>
            )}
          </HStack>
        </HStack>
      </Box>
    </AuthenticatedWrapper>
  );
};

export default Sponsor;
