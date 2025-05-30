import React, { useState } from 'react';
import AuthenticatedWrapper from './Layout/Index';
import { Box, Stack, Text } from '@chakra-ui/react';
import Input from '../../Components/Input';
import Button from '../../Components/Button';
import { FcGoogle } from 'react-icons/fc';
import { useNavigate } from 'react-router-dom';
import { SignInApi } from '../../Utils/ApiCall';
import { fetchDataWithToken } from '../../Utils/ApiCall';
import ShowToast from '../../Components/ToastNotification';

export default function SignIn() {
  const router = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showToast, setShowToast] = useState({ show: false, message: '', status: '' });

  const handleSignIn = async () => {
    if (!email || !password) {
      setShowToast({ show: true, message: "Please fill in all fields.", status: "error" });
      setTimeout(() => setShowToast({ show: false }), 3000);
      return;
    }
  
    setLoading(true);
  
    try {
      const payload = { email, password };
      const result = await SignInApi(payload);

      console.log("login result". result)
  
      if (result.accessToken) {
       
        if(result.user.role !== null){
          localStorage.setItem("authToken", result.accessToken);
        localStorage.setItem("onlineUser", JSON.stringify(result.user));
       
        setShowToast({
          show: true,
          message: "Login successful! Redirecting...",
          status: "success",
        });
  
        setTimeout(() => {
          setShowToast({ show: false });
          if(result.user.role === "SCHOOL-ADMIN"){

            router("/school-admin");
          }else if(result.user.role === "SCHOLARSHIP-ADMIN"){
            
            router("/scholarship-admin");
          }else if(result.user.role === "SPONSOR"){
            
            router("/sponsor-admin");
          }else if(result.user.role === "FUND-ADMIN"){
            
            router("/fund-admin");
          }else if(result.user.role === "SUPER-ADMIN"){
            
            router("/super-admin");
          }
        }, 2000);
        } else {
          setShowToast({
            show: true,
            message: "You are yet to complete registration. Kindly select the role you want to register as.",
            status: "success",
          });

          router(`/role-selection/${result.accessToken}`);
        }
      } else {
        throw new Error("Invalid response format");
      }
    } catch (error) {
      setShowToast({ show: true, message: error.message || "Failed to sign in.", status: "error" });
      setTimeout(() => setShowToast({ show: false }), 3000);
    } finally {
      setLoading(false);
    }
  };
  
  
  
  

  return (
    <AuthenticatedWrapper>
      {showToast.show && (
        <ShowToast message={showToast.message} status={showToast.status} show={showToast.show} />
      )}
      <Box px={["3%", "15%"]} mt={"74px"}>
        <Text
          textTransform={"capitalize"}
          fontWeight={"700"}
          fontSize={"24px"}
          color="#101011"
          fontFamily={"heading"}
        >
          Welcome back!
        </Text>
        <Text
          textTransform={"capitalize"}
          fontWeight={"400"}
          fontSize={"14px"}
          mt="8px"
          fontFamily={"heading"}
          color={"#6B7280"}
        >
          Enter your username and password to continue
        </Text>

        <Stack mt="62px" spacing={"52px"}>
          <Input label="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <Input
            label="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Stack>
        <Text
          textTransform={"capitalize"}
          fontWeight={"400"}
          fontSize={"13px"}
          mt="13px"
          textAlign={"right"}
          cursor={"pointer"}
          color="#6B7280"
          fontFamily={"heading"}
          onClick={() => {
            router('/forgot-password');
          }}
        >
          Forgot Password?
        </Text>

        <Button mt={"20px"} isLoading={loading} onClick={handleSignIn}>
          Log in
        </Button>

        <Box mt="32px" textAlign={"center"} borderTop={"1px solid"} borderColor={"gray.gray400"}>
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
            or Log in with
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
          Google
        </Button>
        <Text
          textTransform={"capitalize"}
          fontWeight={"400"}
          fontSize={"14px"}
          mt="23px"
          textAlign={"center"}
          color="#1F2937"
          fontFamily={"heading"}
        >
          Don’t have an account?{' '}
          <Box
            as="span"
            color={"greenn.greenn400"}
            cursor="pointer"
            onClick={() => {
              router('/sign-up');
            }}
          >
            Register
          </Box>
        </Text>
      </Box>
    </AuthenticatedWrapper>
  );
}
