import React, { useState, useEffect } from 'react'
import { HStack, Text, VStack, Flex, Box, Select, Switch } from '@chakra-ui/react'
import Button from "../../Components/Button"
import Input from "../../Components/Input"
import ShowToast from '../../Components/ToastNotification'
import Preloader from "../../Components/Preloader"
import { GetSuperAdminConfigApi, UpdateSuperAdminConfigApi } from '../../Utils/ApiCall'

export default function ConfigSettings() {
  const [loading, setLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [stationeryValue, setStationeryValue] = useState("");
  const [valueType, setValueType] = useState("percentage");
  const [transferCap, setTransferCap] = useState("");
  const [platformFee, setPlatformFee] = useState("");
  const [requireAdminReview, setRequireAdminReview] = useState(false);
  const [accountNumber, setAccountNumber] = useState("");
  const [configId, setConfigId] = useState("");
  const [showToast, setShowToast] = useState({ show: false, message: '', status: '' });

  const fetchConfig = async () => {
    try {
      setIsLoading(true);
      const res = await GetSuperAdminConfigApi();
      console.log("Config retrieved:", res);
      if (res && res.data) {
        setStationeryValue(res.data.stationery_value !== null ? String(res.data.stationery_value) : "");
        setValueType(res.data.value_type || "percentage");
        setTransferCap(res.data.transfer_cap !== null && res.data.transfer_cap !== undefined ? String(res.data.transfer_cap) : "");
        setPlatformFee(res.data.platform_fee !== null && res.data.platform_fee !== undefined ? String(res.data.platform_fee) : "");
        setRequireAdminReview(res.data.require_admin_review ?? false);
        setAccountNumber(res.data.account_number || "");
        setConfigId(res.data.id || "");
      }
    } catch (error) {
      console.error("Failed to fetch system config", error);
      setShowToast({
        show: true,
        message: error.message || "Failed to fetch system configuration.",
        status: "error"
      });
      setTimeout(() => setShowToast({ show: false }), 4000);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchConfig();
  }, []);

  const handleSave = async () => {
    if (!stationeryValue || isNaN(Number(stationeryValue))) {
      setShowToast({
        show: true,
        message: "Please enter a valid number for Stationery Value.",
        status: "error"
      });
      setTimeout(() => setShowToast({ show: false }), 3000);
      return;
    }

    if (!transferCap || isNaN(Number(transferCap))) {
      setShowToast({
        show: true,
        message: "Please enter a valid number for Transfer Cap.",
        status: "error"
      });
      setTimeout(() => setShowToast({ show: false }), 3000);
      return;
    }

    if (!platformFee || isNaN(Number(platformFee))) {
      setShowToast({
        show: true,
        message: "Please enter a valid number for Platform Fee.",
        status: "error"
      });
      setTimeout(() => setShowToast({ show: false }), 3000);
      return;
    }

    setLoading(true);
    try {
      const payload = {
        stationery_value: Number(stationeryValue),
        value_type: valueType,
        transfer_cap: Number(transferCap),
        platform_fee: Number(platformFee),
        require_admin_review: requireAdminReview
      };
      
      const response = await UpdateSuperAdminConfigApi(payload);
      
      setShowToast({
        show: true,
        message: response.message || "Configuration updated successfully!",
        status: "success"
      });
      
      // Refresh configurations
      await fetchConfig();
    } catch (error) {
      console.error("Failed to update config:", error);
      setShowToast({
        show: true,
        message: error.message || "Update failed",
        status: "error"
      });
    } finally {
      setLoading(false);
      setTimeout(() => setShowToast({ show: false }), 3000);
    }
  };

  return (
    <>
      {isLoading && <Preloader />}
      {showToast.show && (
        <ShowToast message={showToast.message} status={showToast.status} show={showToast.show} />
      )}

      <Box
        mt="12px"
        bg="#fff"
        border="2px solid #EFEFEF"
        py="30px"
        px={["8px", "8px", "18px", "18px"]}
        rounded="10px"
      >
        <Flex justifyContent="space-between" alignItems="center" flexWrap={{ base: "wrap", md: "nowrap" }}>
          <Box mb={{ base: "10px", md: "0" }}>
            <Text fontSize="17px" fontWeight="600" lineHeight="20.57px" color="#1F2937">
              System Configuration
            </Text>
            <Text fontSize="13px" fontWeight="400" lineHeight="27px" color="#626974">
              Manage system configuration parameters including stationery values and value calculation types.
            </Text>
          </Box>
        </Flex>

        <VStack alignItems="start" mt="20px" spacing="15px" w="100%">
          <hr className="remove" style={{ width: '100%', borderColor: '#EFEFEF' }} />
          
          {/* Stationery Value */}
          <HStack justifyContent="space-between" w="100%" flexWrap={{ base: "wrap", sm: "nowrap" }}>
            <Box w={{ base: "100%", sm: "30%" }}>
              <Text fontSize="14px" fontWeight="500" lineHeight="22px" color="#1F2937">
                Stationery Value
              </Text>
            </Box>
            <Box w={{ base: "100%", sm: "70%" }}>
              <Input
                type="number"
                value={stationeryValue}
                onChange={(e) => setStationeryValue(e.target.value)}
                placeholder="Enter stationery value"
              />
            </Box>
          </HStack>

          <hr className="remove" style={{ width: '100%', borderColor: '#EFEFEF' }} />
          
          {/* Value Type */}
          <HStack justifyContent="space-between" w="100%" flexWrap={{ base: "wrap", sm: "nowrap" }}>
            <Box w={{ base: "100%", sm: "30%" }}>
              <Text fontSize="14px" fontWeight="500" lineHeight="22px" color="#1F2937">
                Value Type
              </Text>
            </Box>
            <Box w={{ base: "100%", sm: "70%" }}>
              <Select
                value={valueType}
                onChange={(e) => setValueType(e.target.value)}
                height="48px"
                borderRadius="8px"
                borderWidth="2px"
                borderColor="#E3EBF2"
                _focus={{ borderColor: "blue.blue400" }}
                fontSize="16px"
                fontWeight="400"
                color="#000000"
              >
                <option value="percentage">Percentage</option>
                <option value="fixed">Fixed</option>
              </Select>
            </Box>
          </HStack>

          <hr className="remove" style={{ width: '100%', borderColor: '#EFEFEF' }} />

          {/* Transfer Cap */}
          <HStack justifyContent="space-between" w="100%" flexWrap={{ base: "wrap", sm: "nowrap" }}>
            <Box w={{ base: "100%", sm: "30%" }}>
              <Text fontSize="14px" fontWeight="500" lineHeight="22px" color="#1F2937">
                Transfer Cap (₦)
              </Text>
            </Box>
            <Box w={{ base: "100%", sm: "70%" }}>
              <Input
                type="number"
                value={transferCap}
                onChange={(e) => setTransferCap(e.target.value)}
                placeholder="Enter transfer cap"
              />
            </Box>
          </HStack>

          <hr className="remove" style={{ width: '100%', borderColor: '#EFEFEF' }} />

          {/* Platform Fee */}
          <HStack justifyContent="space-between" w="100%" flexWrap={{ base: "wrap", sm: "nowrap" }}>
            <Box w={{ base: "100%", sm: "30%" }}>
              <Text fontSize="14px" fontWeight="500" lineHeight="22px" color="#1F2937">
                Platform Fee (₦)
              </Text>
            </Box>
            <Box w={{ base: "100%", sm: "70%" }}>
              <Input
                type="number"
                value={platformFee}
                onChange={(e) => setPlatformFee(e.target.value)}
                placeholder="Enter platform fee"
              />
            </Box>
          </HStack>

          <hr className="remove" style={{ width: '100%', borderColor: '#EFEFEF' }} />

          {/* Require Admin Review */}
          <HStack justifyContent="space-between" w="100%" flexWrap={{ base: "wrap", sm: "nowrap" }}>
            <Box w={{ base: "100%", sm: "30%" }}>
              <Text fontSize="14px" fontWeight="500" lineHeight="22px" color="#1F2937">
                Require Admin Review
              </Text>
            </Box>
            <Box w={{ base: "100%", sm: "70%" }}>
              <Switch
                isChecked={requireAdminReview}
                onChange={(e) => setRequireAdminReview(e.target.checked)}
                size="md"
                sx={{
                  ".chakra-switch__track": {
                    backgroundColor: requireAdminReview ? "#027A48" : "#FD4739",
                  },
                  ".chakra-switch__track[data-checked]": {
                    backgroundColor: "#027A48",
                  }
                }}
              />
            </Box>
          </HStack>

          <hr className="remove" style={{ width: '100%', borderColor: '#EFEFEF' }} />

          {/* Account Number */}
          {/* <HStack justifyContent="space-between" w="100%" flexWrap={{ base: "wrap", sm: "nowrap" }}>
            <Box w={{ base: "100%", sm: "30%" }}>
              <Text fontSize="14px" fontWeight="500" lineHeight="22px" color="#1F2937">
                Account Number
              </Text>
            </Box>
            <Box w={{ base: "100%", sm: "70%" }}>
              <Input
                type="text"
                value={accountNumber || "N/A"}
                readOnly
                isDisabled
              />
            </Box>
          </HStack> */}
        </VStack>
      </Box>

      <Flex justifyContent="flex-end" alignItems="center" mt="20px">
        <Button
          w={{ base: "100%", md: "200px" }}
          colorScheme="green"
          onClick={handleSave}
          isLoading={loading}
          loadingText="Saving..."
        >
          Update
        </Button>
      </Flex>
    </>
  )
}
