import React, { useState } from "react";
import AuthenticatedWrapper from "./Layout/Index";
import Input from "../../Components/Input";
import { Box, Checkbox, HStack, Stack, Text } from "@chakra-ui/react";
import Button from "../../Components/Button";
import ShowToast from "../../Components/ToastNotification";
import { CreateAccountApi } from "../../Utils/ApiCall";

import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";


export default function Signup() {
  const router = useNavigate();

  const [showToast, setShowToast] = useState({
    show: false,
    message: "",
    status: ""
  })



  const [Payload, setPayload] = useState({

    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  })

  const [Loading, setLoading] = useState(false)

  const handlePayload = (e) => {

    setPayload({ ...Payload, [e.target.id]: e.target.value })

  }



  const register = async () => {

    localStorage.setItem("emailUsed", Payload.email)


    if (Payload.password !== Payload.confirmPassword) {
      setShowToast({
        show: true,
        message: "Please Make sure your password is the same with the confirm password",
        status: "error"
      })

      setTimeout(() => {
        setShowToast({
          show: false,

        })
      }, 3000)


      return
    }

    setLoading(true)

    try {
      const result = await CreateAccountApi(Payload)

      console.log(result)

      if (result.status === 201) {
        setLoading(false)
        setShowToast({
          show: true,
          message: "Account Created Successfully. Email Verification Sent",
          status: "success"
        })

        setTimeout(() => {
          setShowToast({
            show: false,

          })
          router("/emailVerification")
        }, 3000)

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
      }, 3000)


    }

  }

  return (
    <AuthenticatedWrapper>

      {
        showToast.show && (
          <ShowToast message={showToast.message} status={showToast.status} show={showToast.show} />

        )
      }


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
          <Input label="First Name" type="text" value={Payload.firstName} id="firstName" onChange={handlePayload} />
          <Input label="Last Name" type="text" value={Payload.lastName} id="lastName" onChange={handlePayload} />
          <Input label="Email" type="email" value={Payload.email} id="email" onChange={handlePayload} />
          <Input label="password" type="password" value={Payload.password} id="password" onChange={handlePayload} />
          <Input label="confirm Password" type="password" value={Payload.confirmPassword} id="confirmPassword" onChange={handlePayload} />

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

          <Button onClick={register} disabled={Payload.firstName !== "" && Payload.lastName !== "" && Payload.email !== "" && Payload.password !== ""
            && Payload.confirmPassword !== "" ? false: true} isLoading={Loading}>Continue</Button>

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
