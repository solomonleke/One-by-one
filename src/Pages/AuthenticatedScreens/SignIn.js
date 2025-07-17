import React, { useState } from 'react';
import AuthenticatedWrapper from './Layout/Index';
import { Box, Stack, Text } from '@chakra-ui/react';
import Input from '../../Components/Input';
import Button from '../../Components/Button';
import { FcGoogle } from 'react-icons/fc';
import { useGoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import { SignInApi, GoogleSignInApi } from '../../Utils/ApiCall';
import { auth, provider, signInWithPopup } from "../../Authentication/Firebase";
import { fetchDataWithToken } from '../../Utils/ApiCall';
import ShowToast from '../../Components/ToastNotification';

//  import { useGoogleLogin } from '@react-oauth/google'
//  import { jwtDecode } from 'jwt-decode'
//  import { GoogleAuth, LoginApi } from '../Utils/ApiCall'
//  import { showToast } from '../Utils/Toast'
//  import { useSelector } from "react-redux"
//  export default function SignIn() {
//      const { isOpen, onOpen, onClose } = useDisclosure()
//      const IsLoggedIn = useSelector((state) => state.UserToken).token;

//      const [Payload, setPayload] = useState({
//          firstName: "",
//          lastName: "",
//          email: "",
//          password: "",
//          confirmPassword: ""
//      });
//      const handlePayload = (e) => {
//          setPayload({ ...Payload, [e.target.id]: e.target.value })
//      }
//      const nav = useNavigate()

//      const GetGoogleAuth = async (token)=>{
//          try{
//              let result = await GoogleAuth({accessToken : token})
//              console.log("result",result)
//              if(result.data.status){
//                  showToast({
//                      type: "success",
//                      message: "Google Sign In Successful"
//                  })
//                  onOpen()
//              }
//          }
//          catch(e){
//                  console.log("error", e.message)
//          }

//      }
//      const handleSignIn = async ()=>{
//          if(Payload.email ==="" || Payload.password ===""){
//              showToast({
//                  type: "error",
//                  message: "Please make sure all input fields are filled"
//              })
//              return
//          }
//          showToast({
//              type: "info",
//              message: "Please wait..."
//          })
//          try{
//              let result = await LoginApi(Payload)
//              console.log("result",result)
//              if(result.data.status){
//                  showToast({
//                      type: "success",
//                      message: "Login Successful"
//                  })
//                  onOpen()
//              }
//          }
//          catch(e){
//                  console.log("error", e.message)
//                  showToast({
//                      type: "error",
//                      message: "Invalid email or password"
//                  })
//          }

//      }
//      const googleLogin = useGoogleLogin({
//          onFailure: errorResponse => console.error,
//          onSuccess: tokenResponse => {
//              console.log("googletoken", tokenResponse.access_token)

//              GetGoogleAuth(tokenResponse.access_token)
//          },
//          onError: error => console.log(error),
//      });
//      useEffect(() => {
//          if(IsLoggedIn.length > 1){
//              nav("/index")
//              showToast({
//                  type: "info",
//                  message: "You are already signed in !"
//              })
//          }

//      }, []);

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

      console.log("login result".result)

      if (result.accessToken) {

        if (result.user.role !== null) {
          localStorage.setItem("authToken", result.accessToken);
          localStorage.setItem("onlineUser", JSON.stringify(result.user));

          setShowToast({
            show: true,
            message: "Login successful! Redirecting...",
            status: "success",
          });

          setTimeout(() => {
            setShowToast({ show: false });
            if (result.user.role === "SCHOOL-ADMIN") {

              router("/school-admin");
            } else if (result.user.role === "SCHOLARSHIP-ADMIN") {

              router("/scholarship-admin");
            } else if (result.user.role === "SPONSOR") {

              router("/sponsor-admin");
            } else if (result.user.role === "FUND-ADMIN") {

              router("/fund-admin");
            } else if (result.user.role === "SUPER-ADMIN") {

              router("/super-admin");
            }
          }, 2000);
        } else {
          setShowToast({
            show: true,
            message: "You are yet to complete registration. Kindly select the role you want to register as.",
            status: "warning",
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

  const GetGoogleAuth = async (token) => {
    try {
      const result = await GoogleSignInApi({ accessToken: token });
      console.log("Google Sign-In response:", result);

      if (result?.token) {
        localStorage.setItem("authToken", result.token);
        localStorage.setItem("onlineUser", JSON.stringify(result.user));

        const role = result.user?.role;
        const roleRedirectMap = {
          "SCHOOL-ADMIN": "/school-admin",
          "SCHOLARSHIP-ADMIN": "/scholarship-admin",
          "SPONSOR": "/sponsor-admin",
          "FUND-ADMIN": "/fund-admin",
          "SUPER-ADMIN": "/super-admin",
        };
        
        const redirectPath = roleRedirectMap[role];

        console.log("User role:", role);
        console.log("Redirect path:", roleRedirectMap[role]);


        setShowToast({
          show: true,
          message: "Login successful! Redirecting...",
          status: "success",
        });

        setTimeout(() => {
          setShowToast({ show: false });
          if (role) {
            router(redirectPath || "/dashboard");
          } else {
            router(`/role-selection/${result.token}`);
          }
        }, 2000);
      }
    } catch (e) {
      console.error("Google Auth Error:", e);
      setShowToast({ show: true, message: "Google Sign-In failed", status: "error" });
      setTimeout(() => setShowToast({ show: false }), 3000);
    }
  };

  const googleLogin = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      console.log("Google OAuth token:", tokenResponse.access_token);
      GetGoogleAuth(tokenResponse.access_token);
    },
    onError: (error) => {
      console.error("Google Login Error:", error);
      setShowToast({ show: true, message: "Google Login failed", status: "error" });
      setTimeout(() => setShowToast({ show: false }), 3000);
    },
  });


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
          onClick={() => googleLogin()}
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
