import React, { useState } from 'react'
import AuthenticatedWrapper from './Layout/Index'
import { Box, HStack, Text, VStack } from '@chakra-ui/react'
import { FaArrowLeft, FaCloudUploadAlt } from 'react-icons/fa'
import Input from '../../Components/Input'
import TextArea from '../../Components/TextArea'
import Button from '../../Components/Button'
import { useNavigate } from 'react-router-dom'
import { CreateAdminApi } from "../../Utils/ApiCall";
import ShowToast from "../../Components/ToastNotification";

export default function ScholarshipAdminSignup() {

    const [payload, setPayload] = useState({
        userType: "SCHOLARSHIP-ADMIN",
        state: "",
        lga: "",
        city: "",
        address: "",
        occupation: "",
        phone: "",
      });

      const [showToast, setShowToast] = useState({
        show: false,
        message: "",
        status: ""
      })
    
      const [Loading, setLoading] = useState(false)

    const nav = useNavigate();

      const handlePayload = (e) => {

        setPayload({ ...payload, [e.target.id]: e.target.value })
    
      }

      const tempToken = localStorage.getItem("tempToken")

      const Submit = async () => {

        setLoading(true)
        try {
    
          const result = await CreateAdminApi(payload,tempToken)
    
          if (result.status === 201) {
            setLoading(false)
            setShowToast({ show: true, message: "Scholarship Admin created successfully. Kindly Sign in to Continue", status: "success" })
            setTimeout(() => {
              setShowToast({
                show: false,
    
              })
    
              nav("/profile-setup-complete")
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




    return (
        <AuthenticatedWrapper>
             {
                showToast.show && (
                    <ShowToast message={showToast.message} status={showToast.status} show={showToast.show} />

                )
            }
            <Box px={["3%", "15%"]} mt={"40px"}>
                <VStack spacing="70px" alignItems={"start"}>
                    <VStack justifyItems={"start"} alignItems={"start"} spacing={"22px"}>
                        <FaArrowLeft />
                        <Text
                            textTransform="capitalize"
                            fontWeight="700"
                            fontSize="24px"
                            color="#101011"
                            fontFamily="heading"
                            mt="4"
                        >
                            Complete Your Scholarship <Text></Text>Admin Profile
                        </Text>
                        <Text
                            fontSize="small"
                            fontWeight="normal"
                            color="#6B7280"
                            lineHeight="24px"
                        >
                            Let’s get to know you and verify your role as a Scholarship Admin. <span className='hide'>AdminAdmin</span>
                        </Text>
                    </VStack>
                    <Input
                        label="State"
                        type="text"
                        placeholder="Enter your state"
                        onChange={handlePayload} 
                        value={payload.state}
                        id='state'
                    />
                    <Input label="Local Government" type="text" placeholder='e.g Oshodi isolo' onChange={handlePayload} 
                        value={payload.lga}
                        id='lga' />
                    <Input label="City" type="text" placeholder='e.g Okota' onChange={handlePayload} 
                        value={payload.city}
                        id='city' />
                    <Input label="Home Address" type="text" placeholder='e.g 86 Jemtok street' onChange={handlePayload} 
                        value={payload.address}
                        id='address' />
                    <Input label="Occupation" type="text" placeholder='e.g Banker' onChange={handlePayload} 
                        value={payload.occupation}
                        id='occupation' />
                    <Input label="Phone Number" type="text" placeholder='+234' onChange={handlePayload} 
                        value={payload.phone}
                        id='phone' />


        <Button isLoading={Loading} onClick={() => {
            Submit()
        }}>Complete Profile Setup</Button>
                </VStack>
            </Box>
        </AuthenticatedWrapper>
    )
}
