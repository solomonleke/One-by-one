import React from "react";
import AuthenticatedWrapper from "./Layout/Index";
import Input from "../../Components/Input";
import { Box, Checkbox, HStack, Stack, Text } from "@chakra-ui/react";
import Button from "../../Components/Button";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const router = useNavigate();
  return (
    <AuthenticatedWrapper>
      <Box px={["3%", "15%"]} mt={"74px"}>
        <Text
          textTransform={"capitalize"}
          fontWeight={"700"}
          fontSize={"24px"}
          color="#101011"
          fontFamily={"heading"}
        >
          Create Your Account
        </Text>
        <Text
          textTransform={"capitalize"}
          fontWeight={"400"}
          fontSize={"14px"}
          mt="8px"
          fontFamily={"heading"}
          color={"#6B7280"}
        >
          Enter your email and password to get started with One by One.
        </Text>

        <Stack mt="62px" spacing={"52px"}>
          <Input label="First Name" type="text" />
          <Input label="Last Name" type="text" />
          <Input label="Email" type="email" />
          <Input label="password" type="password" />
          <Input label="confirm Password" type="password" />

          <HStack
            flex="1"
            justifyContent="center"
            alignItems="center"
            gap="10px"
          >
            <Checkbox accent="#39996B"></Checkbox>
            <Text fontSize="sm" color="gray.500" textAlign="center">
              I agree to OnebyOne’s{" "}
              <span
                style={{
                  color: "#39996B",
                  textDecoration: "underline",
                  cursor: "pointer",
                }}
              >
                Terms & Condition
              </span>{" "}
              and{" "}
              <span
                style={{
                  color: "#39996B",
                  textDecoration: "underline",
                  cursor: "pointer",
                }}
              >
                Privacy Policy.
              </span>
            </Text>
          </HStack>

          <Button onClick={() => {
            router("/emailVerification")
          }}>Continue</Button>

          <Box
            textAlign={"center"}
            borderTop={"1px solid"}
            borderColor={"gray.gray400"}
          >
            <Box
              as="span"
              fontSize={"13px"}
              fontWeight={"400"}
              px={"10px"}
              color="#6B7280"
              pos="relative"
              top="-16px"
              bg="#FFFFFF"
            >
              or Sign Up with
            </Box>
          </Box>

          <Button
            border={"2px solid #DDE5EC"}
            color="black"
            hColor="#fff"
            hoverBg="transparent"
            hoverColor="blue.blue500"
            background="#fff"
            leftIcon={<FcGoogle />}
          >
            {" "}
            Google
          </Button>
          <Text
            textTransform={"capitalize"}
            fontWeight={"400"}
            fontSize={"14px"}
            textAlign={"center"}
            color="#1F2937"
            fontFamily={"heading"}
          >
            Already have an account?{" "}
            <Box as="span" color={"greenn.greenn400"} cursor="pointer" onClick={() => {
              router("/sign-in");
            }}>
              Log in
            </Box>
          </Text>
        </Stack>
      </Box>
    </AuthenticatedWrapper>
  );
}
