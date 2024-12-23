import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import MainLayout from '../../DashboardLayout'
import { Text, Flex, HStack, Box } from '@chakra-ui/react'
import { Tooltip as Tooltips } from '@chakra-ui/react';
import DashboardCard from "../../Components/DashboardCard"
import Button from "../../Components/Button"
import { HiOutlineUsers } from 'react-icons/hi'
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { RxTimer } from "react-icons/rx";
import { MdOutlineCancel } from 'react-icons/md'
import { IoInformationCircleOutline } from "react-icons/io5";
import { GoArrowDown } from "react-icons/go";
import { Bar, BarChart, CartesianGrid, Label, Legend, Pie, PieChart, Tooltip, XAxis, YAxis } from 'recharts'
import TableRow from "../../Components/TableRow"
import { CgSearch } from "react-icons/cg";
import { IoFilter } from "react-icons/io5";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from '@chakra-ui/react'


export default function Index() {

  const router = useNavigate();

  const [Approved, setApproved] = useState(true)
  const [Pending, setPending] = useState(false)
  const [Rejected, setRejected] = useState(false)

  const Data = [
    { name: "JAN", students: 140 },
    { name: "FEB", students: 80 },
    { name: "MAR", students: 20 },
    { name: "APR", students: 180 },
    { name: "MAY", students: 120 },
    { name: "JUN", students: 100 },
    { name: "JUL", students: 40 },
    { name: "AUG", students: 80 },
    { name: "SEP", students: 34 },
    { name: "OCT", students: 10 },
    { name: "NOV", students: 110 },
    { name: "DEC", students: 130 },

  ]
  const PendingData = [
    { name: "JAN", students: 40 },
    { name: "FEB", students: 180 },
    { name: "MAR", students: 120 },
    { name: "APR", students: 80 },
    { name: "MAY", students: 20 },
    { name: "JUN", students: 90 },
    { name: "JUL", students: 140 },
    { name: "AUG", students: 80 },
    { name: "SEP", students: 134 },
    { name: "OCT", students: 110 },
    { name: "NOV", students: 130 },
    { name: "DEC", students: 120 },

  ]
  const RejectedData = [
    { name: "JAN", students: 130 },
    { name: "FEB", students: 180 },
    { name: "MAR", students: 220 },
    { name: "APR", students: 10 },
    { name: "MAY", students: 20 },
    { name: "JUN", students: 30 },
    { name: "JUL", students: 120 },
    { name: "AUG", students: 30 },
    { name: "SEP", students: 134 },
    { name: "OCT", students: 110 },
    { name: "NOV", students: 150 },
    { name: "DEC", students: 180 },

  ]

  return (
    <MainLayout>

      <Text color={"#1F2937"} fontWeight={"700"} fontSize={"24px"} lineHeight={"25.41px"}>Welcome back, Solomon. </Text>
      <Text mt="9px" color={"#686C75"} fontWeight={"400"} fontSize={"15px"} lineHeight={"24px"}>Easily track and manage student information with real-time insights and updates. </Text>


      <Flex mt="27px" justifyContent="space-between" flexWrap="wrap">
        <DashboardCard
          icon={<HiOutlineUsers />}
          title='total student'
          value='256'
        />
        <DashboardCard
          icon={<IoMdCheckmarkCircleOutline />}
          title='approved'
          value='18'
        />
        <DashboardCard
          icon={<RxTimer />}
          title='pending'
          value='135'
        />
        <DashboardCard
          icon={<MdOutlineCancel />}
          title='rejected'
          value='32'
        />
      </Flex>

      <Box bg="#fff" border="1px solid #EFEFEF" mt="12px" py='17px' px="18px" rounded='10px'>
        <Flex justifyContent="space-between" flexWrap="wrap">
          <Tooltips bg="#fff" color="#667085" p="12px" lineHeight="20px" fontSize="13px" fontWeight="400" label="See how student statuses have changed month over month. Use filters to view trends by approval, pending, or rejection status." placement='top-end'>
            <HStack spacing="5px">
              <Text color={"#1F2937"} fontWeight={"600"} fontSize={"17px"}>Student Status Over Time</Text>

              <IoInformationCircleOutline />
            </HStack>
          </Tooltips>

          <HStack bg="#E8FFF4" rounded='7px' py="3.5px" px="5px" cursor="pointer" mt={["10px", "10px", "0px", "0px"]}>

            <Box borderRight="1px solid #EDEFF2" pr="5px" onClick={() => {
              setApproved(true) 
              setPending(false)
              setRejected(false)
            }}>
              <Text py='8.5px' px="12px" bg={Approved ? "#fff" : "transparent"} rounded="7px" color={"#1F2937"} fontWeight={"500"} fontSize={"13px"}>Approved</Text>
            </Box>
            <Box borderRight="1px solid #EDEFF2" pr="5px" onClick={() => {
              setApproved(false)
              setPending(true)
              setRejected(false)
            }}>
              <Text py='8.5px' px="12px" bg={Pending ? "#fff" : "transparent"} rounded="7px" color={"#1F2937"} fontWeight={"500"} fontSize={"13px"}>Pending</Text>
            </Box>
            <Box pr="5px" onClick={() => {
              setApproved(false)
              setPending(false)
              setRejected(true)
            }}>
              <Text py='8.5px' px="12px" bg={Rejected ? "#fff" : "transparent"} rounded="7px" color={"#1F2937"} fontWeight={"500"} fontSize={"13px"}>Rejected</Text>
            </Box>

          </HStack>

        </Flex>

        <HStack mt="4px">
          <Text fontSize="26px" fontWeight="700" >134</Text>
          <HStack bg="#FF9F9D" px="3px" alignItems="center" py="1px" fontWeight="500" fontSize="11.66px" rounded="100px" color="#FB3B52" spacing="1px">
            <GoArrowDown />
            <Text top="1px" pos="relative">12%</Text>
          </HStack>
          <Text color="#686C75" fontWeight="400" fontSize="14px">vs last month</Text>
        </HStack>


        <Box mt="27px" overflowX="auto" w="100%">
          <BarChart width={950} height={300} data={Approved ? Data : Pending ? PendingData : RejectedData} margin={{ top: 0, right: 0, left: 0, bottom: 5 }} barSize={20} label>
            <XAxis dataKey="name" scale={"point"} padding={{ left: 10, right: 10 }} fontSize="12px" fontWeight="500" color="#667085" />
            <YAxis />
            <Tooltip />
            <Legend />
            <CartesianGrid strokeDasharray="3 3" />
            <Bar dataKey={"students"} fill="#39996B" background={{ fill: "#E8FFF4" }} />

          </BarChart>
        </Box>

      </Box>


      <Box bg="#fff" border="1px solid #EFEFEF" mt="12px" py='17px' px="18px" rounded='10px'>
        <Flex justifyContent="space-between" flexWrap="wrap">
          <HStack>
            <Text color="#1F2937" fontWeight="600" fontSize="19x">Students</Text>
            <Text color="#667085" fontWeight="400" fontSize="18px">(526)</Text>
          </HStack>

          <Flex w={["100%", "30%"]} flexWrap="wrap" mt={["10px", "10px", "0px", "0px"]} alignItems="center" justifyContent={"space-between"} >
            <HStack flexWrap="wrap">
              <Box border="1px solid #E3E5E8" rounded="7px" p='10px' fontSize="14px">
                <CgSearch />
              </Box>
              <HStack border="1px solid #E3E5E8" rounded="7px" p='6px' color='#2F2F2F' fontWeight="500" fontSize="14px">
                <IoFilter />
                <Text>Filter</Text>
              </HStack>
            </HStack>
            <Button w="159px" size="sm" onClick={() => {
              router("/school-admin/student-management")
            }}>See All students</Button>
          </Flex>
        </Flex>

        <Box bg="#fff" border="1px solid #EFEFEF" mt="12px" py='15px' px="15px" rounded='10px' overflowX="auto">

          <TableContainer>
            <Table variant='simple'>

              <Thead bg="#F9FAFB">
                <Tr >
                  <Th fontSize="13px" textTransform="capitalize" color='#2F2F2F' fontWeight="600">name</Th>
                  <Th fontSize="13px" textTransform="capitalize" color='#2F2F2F' fontWeight="600">department</Th>
                  <Th fontSize="13px" textTransform="capitalize" color='#2F2F2F' fontWeight="600">class level</Th>
                  <Th fontSize="13px" textTransform="capitalize" color='#2F2F2F' fontWeight="600">field of study</Th>
                  <Th fontSize="13px" textTransform="capitalize" color='#2F2F2F' fontWeight="600">eligibility status</Th>
                  <Th fontSize="13px" textTransform="capitalize" color='#2F2F2F' fontWeight="600">actions</Th>

                </Tr>
              </Thead>
              <Tbody>

                <TableRow
                  type="school-admin"
                  name="Moyinoluwa King"
                  email="moyinadeleke@yahoo.com"
                  department="commercial"
                  classLevel="SS3"
                  fieldOfStudy="Computer Science"
                  status="approved"
                />
                <TableRow
                  type="school-admin"
                  name="Paul Smith"
                  email="paulsmith@yahoo.com"
                  department="arts"
                  classLevel="SS3"
                  fieldOfStudy="Computer Science"
                  status="pending"
                />
                <TableRow
                  type="school-admin"
                  name="Daniel Price"
                  email="danielprice@yahoo.com"
                  department="science"
                  classLevel="SS2"
                  fieldOfStudy="Computer Science"
                  status="rejected"
                />
              </Tbody>

            </Table>
          </TableContainer>

        </Box>
      </Box>




    </MainLayout>


  )
}
