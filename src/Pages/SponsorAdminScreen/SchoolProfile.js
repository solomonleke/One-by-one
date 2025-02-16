import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom'
import { ReactComponent as LogoSVG } from "../../Asset/schoolLogo.svg";
import { ReactComponent as ProfileUpdateIcon } from "../../Asset/profileUpdateIcon.svg";
import { ReactComponent as VerifySchool } from "../../Asset/verifySchool.svg";
import MainLayout from "../../DashboardLayout";
import Button from "../../Components/Button";
import RemoveNotification from "../../Components/RemoveNotification"
import ProfileUpdateNotification from "../../Components/ProfileUpdateNotification"
import { IoChevronBackOutline, IoCloseOutline } from 'react-icons/io5';
import { FaCopy } from 'react-icons/fa';
import {
  Box,
  HStack,
  Text,
  Flex,
  VStack,
  Spacer,
  Stack,
  Image,
} from "@chakra-ui/react";
import ProfileCard from "../../Components/ProfileCard";
import ProfileHeading from "../../Components/ProfileHeading";
import Pagination from "../../Components/Pagination";
import TableRow from "../../Components/TableRow";
import { configuration } from "../../Utils/Helpers";
import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    TableContainer,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    useDisclosure,
} from '@chakra-ui/react'

export default function SchoolProfile() {
  const router = useNavigate();

  const [OpenModal, setOpenModal] = useState(false)
    const { isOpen, onOpen, onClose } = useDisclosure()

  const Data = [
    {
        type: "sponsor-admin-students",
        name: "Philip Amakari",
        schoolName: "Legendary Scholars Academy",
        department: "commercial",
        classLevel: "SS2",
        fieldOfStudy: "Mass Communication",
    },
    {
        type: "sponsor-admin-students",
        name: "David Folarin",
        schoolName: "Queens's College",
        department: "science",
        classLevel: "SS3",
        fieldOfStudy: "Bussiness Administration",
    },
    {
        type: "sponsor-admin-students",
        name: "Timothy Salisu",
        schoolName: "Federal Government College",
        department: "arts",
        classLevel: "SS2",
        fieldOfStudy: "Industrial Chemistry",
    },
    {
        type: "sponsor-admin-students",
        name: "Peter Usman",
        schoolName: "Mayflower School",
        department: "science",
        classLevel: "SS3",
        fieldOfStudy: "Computer Science",
    },
    {
        type: "sponsor-admin-students",
        name: "Esther Wakili",
        schoolName: "Chrisland College",
        department: "commercial",
        classLevel: "JS3",
        fieldOfStudy: "Mass Communication",
    },
    {
        type: "sponsor-admin-students",
        name: "Simon Ogan",
        schoolName: "Christ The King College",
        department: "arts",
        classLevel: "SS1",
        fieldOfStudy: "Industrial Chemistry",
    },
    {
        type: "sponsor-admin-students",
        name: "Esther Abubakar",
        schoolName: "Corona Secondary School",
        department: "science",
        classLevel: "JS3",
        fieldOfStudy: "Bussiness Administration",
    },
    {
        type: "sponsor-admin-students",
        name: "Philip Ezeoke",
        schoolName: "Adesoye College",
        department: "commercial",
        classLevel: "SS2",
        fieldOfStudy: "Mass Communication",
    },
    {
        type: "sponsor-admin-students",
        name: "Saviour Promise",
        schoolName: "Divine Grace School",
        department: "science",
        classLevel: "SS3",
        fieldOfStudy: "Industrial Chemistry",
    },
    {
        type: "sponsor-admin-students",
        name: "Micheal Villian",
        schoolName: "Techstars Scholars Academy",
        department: "arts",
        classLevel: "SS3",
        fieldOfStudy: "Mass Communication",
    },
    {
        type: "sponsor-admin-students",
        name: "Bright Gabriel",
        schoolName: "BlueIce Scholars Academy",
        department: "science",
        classLevel: "SS3",
        fieldOfStudy: "Bussiness Administration",
    },
    {
        type: "sponsor-admin-students",
        name: "Saviour Onyedikachi",
        schoolName: "DivineWill Model Academy",
        department: "commercial",
        classLevel: "SS1",
        fieldOfStudy: "Industrial Chemistry",
    },
    {
        type: "sponsor-admin-students",
        name: "Saviour Benjamin",
        schoolName: "Divine Model Academy",
        department: "arts",
        classLevel: "JS1",
        fieldOfStudy: "Computer Science",
    },
]

const [MainData, setMainData] = useState(Data)
const [FilterData, setFilterData] = useState(Data)


// Pagination settings to follow
const [CurrentPage, setCurrentPage] = useState(1);
console.log("currentpage", CurrentPage);
const [PostPerPage, setPostPerPage] = useState(configuration.sizePerPage);

//get current post
const indexOfLastSra = CurrentPage * PostPerPage;
const indexOfFirstSra = indexOfLastSra - PostPerPage;
const PaginatedData = FilterData.slice(indexOfFirstSra, indexOfLastSra);
//change page
const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
};

// Pagination settings to follow end here

  const [logoSrc, setLogoSrc] = useState(null);

  // Load the profile picture from localStorage on component mount
  useEffect(() => {
    const savedLogo = localStorage.getItem("schoolLogo");
    if (savedLogo) {
      setLogoSrc(savedLogo);
    }
  }, []);

  // Handle file selection and saving to localStorage
  const handleLogoChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const base64Image = reader.result;
        setLogoSrc(base64Image);
        localStorage.setItem("schoolLogo", base64Image); // Save to localStorage
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <MainLayout>
      <Flex justifyContent="space-between" flexWrap="wrap">

        <HStack fontSize="14px" fontWeight="600" spacing="10px" cursor="pointer" onClick={() => router('/sponsor-admin/discoverstudents')}>
          <IoChevronBackOutline />
          <Text>Back</Text>
        </HStack>
      </Flex>

      <Box
        backgroundColor={"#fff"}
        p={"20px"}
        mt="10px"
        borderWidth={"1px"}
        borderRadius={"10px"}
        borderColor={"#EDEFF2"}
      >
        <Box >
          <Box
            background={"linear-gradient(90.61deg, #39996B 49.47%, #FFBC4F 99.47%)"}
            justifyContent={"space-between"}
            borderTopLeftRadius={"10px"}
            borderTopRightRadius={"10px"}
            px={"20px"}
            borderBottomWidth={"1px"}
            borderBottomColor={"#EDEFF2"}
            height={"100px"}
          >

          </Box>

          <Flex justifyContent={"space-between"} flexWrap="wrap" mt="22px" borderBottom="1px solid #EDEFF2" >

            <Box position="relative" cursor="pointer" top={["-72px", "-90px"]} left="20px">
              {/* Display uploaded logo or default SVG */}

              <Image
                src={logoSrc}
                rounded={"full"} boxShadow={"0px 4px 4px 0px #00000040"}
                w={["100px", "100px", "129px", "129px"]} h={["100px", "100px", "129px", "129px"]}
                objectFit="cover"
                alt="School Logo"
                onClick={() => document.getElementById("logoInput").click()} // Trigger hidden input
              />

              <input
                type="file"
                id="logoInput"
                accept="image/*"
                style={{ display: "none" }} // Hidden input
                onChange={handleLogoChange}
              />
              <Box pos="absolute" bottom="0" right="0">
                <ProfileUpdateIcon cursor={"pointer"} onClick={() => document.getElementById("logoInput").click()} />
              </Box>
            </Box>

            <Text fontSize={["16px", "24px"]} fontWeight="700" w={["60%", "60%", "60%", "60%"]} pos="relative" left={["20px", "0px", "30px", "0px",]}>
              Legacy Scholars Academy
            </Text>

            <Box w={["", "", "", "20%"]} pos="relative" top={["-50px", "-50px", "0", "0"]}>
              <Button background="#fff" color={"#027A48"}>
                <span className='right'><VerifySchool className='very' /></span>
                Verified
              </Button>
            </Box>
          </Flex>


        </Box>

        {/* Rest of the Page */}
        <Flex justifyContent={"space-between"} flexWrap="wrap" mt="16px">
          <Box w={["100%", "100%", "40%", "40%"]}>
            <Stack spacing="16px">
              <Box
                borderColor={"#EDEFF2"}
                py={"20.5px"}
                px={["8px", "8px", "17px", "17px"]}
                borderRadius={"10px"}
                borderWidth={"1px"}
              >
                <ProfileHeading title="School Details" />

                <Stack spacing={"14px"} mt="14px">
                  <ProfileCard title="email" value="LegacyScholars@gmail.com" />
                  <ProfileCard title="founding year" value="2016" />
                  <ProfileCard
                    title="address"
                    value="84 Balogun Road, Ago palace way"
                  />
                  <ProfileCard title="city" value="okota" />
                  <ProfileCard title="state" value="lagos" />
                  <ProfileCard title="zip code" value="100001" />
                </Stack>
              </Box>

              <Box
                borderColor={"#EDEFF2"}
                py={"20.5px"}
                px={["8px", "8px", "17px", "17px"]}
                borderRadius={"10px"}
                borderWidth={"1px"}
              >
                <ProfileHeading title="principal information" />

                <Stack spacing={"14px"} mt="14px">
                  <ProfileCard title="title" value="mr." />
                  <ProfileCard title="first name" value="john" />
                  <ProfileCard title="last name" value="doe" />
                  <ProfileCard title="email" value="johndoe@gmail.com" />
                  <ProfileCard title="phone number" value="+234000000001" />
                  <ProfileCard title="NIN" value="verified" />
                </Stack>
              </Box>
            </Stack>
          </Box>

          <Box w={["100%", "100%", "58%", "58%"]}>
            <Box
              bg={"#9BF5CA4A"}
              borderWidth={"1px"}
              display={"flex"}
              flexDir={"column"}
              gap={"23px"}
              borderRadius={"16px"}
              p={"16px"}
            >
              <Box
                borderColor={"#EDEFF2"}
                p={"20px"}
                borderRadius={"10px"}
                borderWidth={"1px"}
                backgroundColor={"#fff"}
              >
                <ProfileHeading title="about school" />

                <Text
                  fontWeight={"400"}
                  mt="18px"
                  fontSize={"13px"}
                  lineHeight={"27px"}
                  color={"#626974"}
                >
                  Legacy Scholars Academy, founded in 2005, is a nurturing
                  educational institution dedicated to empowering students from
                  underserved communities. Our mission is to foster academic
                  excellence, leadership skills, and social responsibility. With
                  a 90% university acceptance rate and top-tier performance in
                  national exams, we prepare students for success and positive
                  community impact.
                </Text>
              </Box>

              <Box
                borderColor={"#EDEFF2"}
                p={"20px"}
                borderRadius={"10px"}
                borderWidth={"1px"}
                backgroundColor={"#fff"}
              >
                <ProfileHeading title="class capacity" />

                <Text
                  fontWeight={"400"}
                  mt="18px"
                  fontSize={"13px"}
                  lineHeight={"27px"}
                  color={"#626974"}
                >
                  100
                </Text>
              </Box>

              <Box
                borderColor={"#EDEFF2"}
                p={"20px"}
                borderRadius={"10px"}
                borderWidth={"1px"}
                backgroundColor={"#fff"}
              >
                <ProfileHeading title="legal documents" />

                <Stack mt="18px" spacing={"17px"}>
                  <HStack>
                    <Text
                      fontSize={"13px"}
                      fontWeight={"400"}
                      color={"#626974"}
                    >
                      Certificate of Incorporation
                    </Text>
                    <Spacer />
                    <Text
                      fontWeight={"500"}
                      color={"#027A48"}
                      bg={"#ECFDF3"}
                      borderRadius={"20px"}
                      py={"5px"}
                      px={"12px"}
                      fontSize={"12px"}
                    >
                      Verified
                    </Text>
                  </HStack>

                  <HStack>
                    <Text
                      fontSize={"13px"}
                      fontWeight={"400"}
                      color={"#626974"}
                    >
                      Tax Identification Number (TIN)
                    </Text>
                    <Spacer />
                    <Text
                      fontWeight={"500"}
                      color={"#027A48"}
                      bg={"#ECFDF3"}
                      borderRadius={"20px"}
                      py={"5px"}
                      px={"12px"}
                      fontSize={"12px"}
                    >
                      Verified
                    </Text>
                  </HStack>

                  <HStack>
                    <Text
                      fontSize={"13px"}
                      fontWeight={"400"}
                      color={"#626974"}
                    >
                      Ministry of Education Approval Letter
                    </Text>
                    <Spacer />
                    <Text
                      fontWeight={"500"}
                      color={"#027A48"}
                      bg={"#ECFDF3"}
                      borderRadius={"20px"}
                      py={"5px"}
                      px={"12px"}
                      fontSize={"12px"}
                    >
                      Verified
                    </Text>
                  </HStack>

                  <HStack>
                    <Text
                      fontSize={"13px"}
                      fontWeight={"400"}
                      color={"#626974"}
                    >
                      School Registration Certificate
                    </Text>
                    <Spacer />
                    <Text
                      fontWeight={"500"}
                      color={"#027A48"}
                      bg={"#ECFDF3"}
                      borderRadius={"20px"}
                      py={"5px"}
                      px={"12px"}
                      fontSize={"12px"}
                    >
                      Verified
                    </Text>
                  </HStack>
                </Stack>
              </Box>
            </Box>
          </Box>
        </Flex>
      </Box>

      <Box
        backgroundColor={"#fff"}
        p={"20px"}
        mt="10px"
        borderWidth={"1px"}
        borderRadius={"10px"}
        borderColor={"#EDEFF2"}
      >

        <Box
          borderColor={"#EDEFF2"}
          py={"20.5px"}
          px={["8px", "8px", "17px", "17px"]}
          borderRadius={"10px"}
          borderWidth={"1px"}
        >
          <ProfileHeading title="payment information" />

          <Stack spacing={"14px"} mt="14px">
            <HStack justifyContent="space-between">
              <ProfileCard title="account name" />
              <HStack
                w="80%"
                justifyContent="space-between"
                borderColor={"#EDEFF2"}
                py={"20.5px"}
                px={["8px", "8px", "17px", "17px"]}
                borderRadius={"10px"}
                borderWidth={"1px"}
              >
                <Text color="#626974" fontSize="14px" fontWeight="400">Legendary Scholars Academy</Text>
                <Spacer />
                <FaCopy cursor="pointer" color="#709483" />
              </HStack>
            </HStack>

            <HStack justifyContent="space-between">
              <ProfileCard title="account number" />
              <HStack
                w="80%"
                justifyContent="space-between"
                borderColor={"#EDEFF2"}
                py={"20.5px"}
                px={["8px", "8px", "17px", "17px"]}
                borderRadius={"10px"}
                borderWidth={"1px"}
              >
                <Text color="#626974" fontSize="14px" fontWeight="400">100456789e</Text>
                <Spacer />
                <FaCopy cursor="pointer" color="#709483" />
              </HStack>
            </HStack>

            <HStack justifyContent="space-between">
              <ProfileCard title="bank name" />
              <HStack
                w="80%"
                justifyContent="space-between"
                borderColor={"#EDEFF2"}
                py={"20.5px"}
                px={["8px", "8px", "17px", "17px"]}
                borderRadius={"10px"}
                borderWidth={"1px"}
              >
                <Text color="#626974" fontSize="14px" fontWeight="400">Zenith Bank</Text>
                <Spacer />
                <FaCopy cursor="pointer" color="#709483" />
              </HStack>
            </HStack>
          </Stack>
        </Box>

      </Box>

      <Box
        backgroundColor={"#fff"}
        p={"20px"}
        mt="10px"
        borderWidth={"1px"}
        borderRadius={"10px"}
        borderColor={"#EDEFF2"}
      >

        <Box
          borderColor={"#EDEFF2"}
          py={"20.5px"}
          px={["8px", "8px", "17px", "17px"]}
          borderRadius={"10px"}
          borderWidth={"1px"}
        >
          <ProfileHeading title="students" />

          <TableContainer>
                        <Table variant='simple'>

                            <Thead bg="#F9FAFB">
                                <Tr >
                                    <Th fontSize="13px" textTransform="capitalize" color='#2F2F2F' fontWeight="600">name</Th>
                                    <Th fontSize="13px" textTransform="capitalize" color='#2F2F2F' fontWeight="600">department</Th>
                                    <Th fontSize="13px" textTransform="capitalize" color='#2F2F2F' fontWeight="600">class level</Th>
                                    <Th fontSize="13px" textTransform="capitalize" color='#2F2F2F' fontWeight="600">field of study</Th>
                                    <Th fontSize="13px" textTransform="capitalize" color='#2F2F2F' fontWeight="600">actions</Th>

                                </Tr>
                            </Thead>
                            <Tbody>

                                {
                                    PaginatedData?.map((item, i) => (

                                        <TableRow
                                            type={item.type}
                                            name={item.name}
                                            schoolName={item.schoolName}
                                            department={item.department}
                                            classLevel={item.classLevel}
                                            fieldOfStudy={item.fieldOfStudy}
                                            onRemove={onOpen}
                                            onEdit={() => setOpenModal(true)}
                                        />
                                    ))
                                }

                            </Tbody>

                        </Table>
                    </TableContainer>

                    <Pagination
                        postPerPage={PostPerPage}
                        currentPage={CurrentPage}
                        totalPosts={Data.length}
                        paginate={paginate}
                    />
        </Box>

      </Box>

      <Box
        backgroundColor={"#fff"}
        p={"14px"}
        mt="10px"
        borderWidth={"1px"}
        borderRadius={"10px"}
        borderColor={"#EDEFF2"}
      >
        <Text fontSize="13px" fontWeight="500" fontStyle="italic">Verifed by: Solomon Adeleke</Text>
      </Box>
      <RemoveNotification isOpen={isOpen} onClose={onClose} />
            <ProfileUpdateNotification isOpen={OpenModal} onClose={() => setOpenModal(false)} />
    </MainLayout>
  );
}
