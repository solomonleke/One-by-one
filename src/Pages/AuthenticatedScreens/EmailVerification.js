import React, {useState} from 'react'
import AuthenticatedWrapper from './Layout/Index'
import { Box, Text } from '@chakra-ui/react'
import { ReactComponent as EnvelopeIcon } from "../../Asset/envelope.svg";
import Button from '../../Components/Button';
import { useNavigate } from 'react-router-dom';
import { ResendVerificationApi } from '../../Utils/ApiCall';
import ShowToast from '../../Components/ToastNotification';

export default function EmailVerification() {
    const [Loading, setLoading] = useState(false)


    // below is the customized toast i did to handle notifications 
    const [showToast, setShowToast] = useState({
        show: false,
        message: "",
        status: ""
      })

        // ends here 

    const email = localStorage.getItem("emailUsed")
    const router = useNavigate();


    const ResendVerification = async ()=>{
        setLoading(true)

        try{
            setLoading(true)
            const result = await ResendVerificationApi({email: email, reason: "verify-email"})
            console.log(result)
            if(result.status ===201){
                setLoading(false)
                setShowToast({
                    show: true,
                    message: result.data,
                    status: "success"
                  })
          
                  setTimeout(() => {
                    setShowToast({
                      show: false,
          
                    })
                  
                  }, 3000)

                
            }

        }catch(e){
            setLoading(false)
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
            console.log("error",e.message)
        }

    }


    return (
        <AuthenticatedWrapper>
          {/* below is the customized toast i did to handle notifications  */}
      {
        showToast.show && (
          <ShowToast message={showToast.message} status={showToast.status} show={showToast.show} />

        )
      }
       {/* end here  */}

            <Box px={["3%", "15%"]} mt={"74px"}>
                <Box display="flex" flexDirection="column" gap="25px">
                    <EnvelopeIcon />

                    <Text
                        textTransform="capitalize"
                        fontWeight="700"
                        fontSize="20px"
                        color="#101011"
                        fontFamily="heading"
                        mt="4"
                    >
                        Verify Your Email Address
                    </Text>

                    <Text fontSize="small" fontWeight="medium" style={{ color: "#6B7280", lineHeight: "24px" }}>We’ve sent a verification link to {email}. <br /> Please check your inbox and click the link to verify your email <br /> before continuing.</Text>

                    <Button onClick={ResendVerification} isLoading={Loading}>Resend</Button>

                    <Text
                        textTransform={"capitalize"}
                        fontWeight={"400"}
                        fontSize={"14px"}
                        textAlign={"center"}
                        color="#1F2937"
                        fontFamily={"heading"}
                    >
                        Didn’t receive email?{" "}
                        <Box as="span" color={"greenn.greenn400"} cursor="pointer" onClick={ResendVerification}>
                            Resend
                        </Box>
                    </Text>
                </Box>
            </Box>
        </AuthenticatedWrapper>
    )
}
