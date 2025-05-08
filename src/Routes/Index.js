import React, { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { StudentProvider } from '../Components/StudentContext'
import Home from '../Pages/Home'

import SignIn from '../Pages/AuthenticatedScreens/SignIn'
import Signup from '../Pages/AuthenticatedScreens/Signup'
import EmailVerification from '../Pages/AuthenticatedScreens/EmailVerification'
import RoleSelection from '../Pages/AuthenticatedScreens/RoleSelection'
import Index from '../Pages/SchoolAdminScreen/Index'
import SchoolProfile from '../Pages/SchoolAdminScreen/SchoolProfile'
import StudentManagement from '../Pages/SchoolAdminScreen/StudentManagement'
import Settings from '../Pages/SchoolAdminScreen/Settings'
import AddNewStudents from '../Pages/SchoolAdminScreen/AddNewStudents'
import StudentProfile from '../Pages/SchoolAdminScreen/StudentProfile'
import SchoolAdminSignup from '../Pages/AuthenticatedScreens/SchoolAdminSignup'
import ScholarshipAdminSignup from '../Pages/AuthenticatedScreens/ScholarshipAdminSignup'
import Sponsor from '../Pages/AuthenticatedScreens/Sponsor'
import FundAdminSignup from '../Pages/AuthenticatedScreens/FundAdminSignup'
import ProfileSetupComplete from '../Pages/AuthenticatedScreens/ProfileSetupComplete'
import ForgotPassword from '../Pages/AuthenticatedScreens/ForgotPassword'
import ForgottenPasswordEmail from '../Pages/AuthenticatedScreens/ForgottenPasswordEmail'
import ResetPassword from '../Pages/AuthenticatedScreens/ResetPassword'
import ScholarshipAdmin from '../Pages/ScholarshipAdminScreen/Index'
import Schools from '../Pages/ScholarshipAdminScreen/Schools'
import Settings2 from '../Pages/ScholarshipAdminScreen/Settings'
import Students from '../Pages/ScholarshipAdminScreen/Students'
import StudentProfile2 from '../Pages/ScholarshipAdminScreen/StudentProfile'
import SchoolProfile2 from '../Pages/ScholarshipAdminScreen/SchoolProfile'
import ScholarshipAdminLeaderboard from '../Pages/ScholarshipAdminScreen/ScholarshipAdminLeaderboard'
import SponsorAdmin from '../Pages/SponsorAdminScreen/Index'
import MyScholarships from '../Pages/SponsorAdminScreen/MyScholarships'
import DiscoverStudents from '../Pages/SponsorAdminScreen/DiscoverStudents'
import FundingHistory from '../Pages/SponsorAdminScreen/FundingHistory'
import Settings3 from '../Pages/SponsorAdminScreen/Settings'
import Dashboard from '../Pages/FundAdminUserScreen/Index'
import AwaitingFunding from '../Pages/FundAdminUserScreen/AwaitingFunding'
import FundedStudents from '../Pages/FundAdminUserScreen/FundedStudents'
import FundedHistory from '../Pages/FundAdminUserScreen/FundedHistory'
import FundingRecords from '../Pages/FundAdminUserScreen/FundingRecords'
import LandingPage from '../Pages/LandingPage/Index'
import AboutUs from '../Pages/LandingPage/AboutUs'
import GetInvolved from '../Pages/LandingPage/GetInvolved'


export default function IndexRoutes() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [studentIdToOpen, setStudentIdToOpen] = useState(null);

  const handleOpenModal = (studentId) => {
    setStudentIdToOpen(studentId);
    setIsModalOpen(true);
  };

  return (
    <StudentProvider>
      <BrowserRouter>
        <Routes>
          {/* school admin routes */}
          <Route path='/school-admin' element={<Index />} />
          <Route path='/school-admin/student-management' element={<StudentManagement />} />
          <Route path='/school-admin/school-profile' element={<SchoolProfile />} />
          <Route path='/school-admin/settings' element={<Settings />} />
          <Route path='/AddStudents' element={<AddNewStudents />} />
          <Route path='/school-admin/student-management/student-profile/:student_Id' element={<StudentProfile />} />




          {/* <Route path='/' element={<Home />} /> */}
          <Route path='/sign-in' element={<SignIn />} />
          <Route path='/sign-up' element={<Signup />} />
          <Route path='/email-verification' element={<EmailVerification />} />
          <Route path='/role-selection/:id' element={<RoleSelection />} />
          <Route path='/school-admin-signup' element={<SchoolAdminSignup />} />
          <Route path='/scholarship-admin-signup' element={<ScholarshipAdminSignup />} />
          <Route path='/sponsor' element={<Sponsor />} />
          <Route path='/fund-admin-signup' element={<FundAdminSignup />} />
          <Route path='/profile-setup-complete' element={<ProfileSetupComplete />} />
          <Route path='/forgot-password' element={<ForgotPassword />} />
          <Route path='/forgotten-password-email' element={<ForgottenPasswordEmail />} />
          <Route path='/reset-password/:token' element={<ResetPassword />} />



          {/* scholarship admin routes */}
          <Route path='/scholarship-admin' element={<ScholarshipAdmin />} />
          <Route path='/scholarship-admin/schools' element={<Schools />} />
          <Route path='/scholarship-admin/schools' element={<Schools />} />
          <Route path='/scholarship-admin/students' element={<Students />} />
          <Route path='/scholarship-admin/settings' element={<Settings2 />} />
          <Route path='/scholarship-admin/students/student-profile' element={<StudentProfile2 />} />
          <Route path='/scholarship-admin/schools/school-profile' element={<SchoolProfile2 />} />
          <Route path='/scholarship-admin/scholarship-admin-leaderboard' element={<ScholarshipAdminLeaderboard />} />

           {/* sponsor admin routes */}
           <Route path='/sponsor-admin' element={<SponsorAdmin />} />
          <Route path='/sponsor-admin/myscholarships' element={<MyScholarships />} />
          <Route path='/sponsor-admin/discoverstudents' element={<DiscoverStudents />} studentId={studentIdToOpen} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
          <Route path='/sponsor-admin/fundinghistory' element={<FundingHistory />} />
          <Route path='/sponsor-admin/settings' element={<Settings3 />} />



  {/* fund admin routes */}
          <Route path='/fund-admin' element={<Dashboard />} />
          <Route path='/fund-admin/awaiting-funding' element={<AwaitingFunding />} />
          <Route path='/fund-admin/funded-students' element={<FundedStudents />} />
          <Route path='/fund-admin/funding-history' element={<FundedHistory />} />
          <Route path='/fund-admin/funding-records' element={<FundingRecords />} />
          <Route path='/fund-admin/student-management/student-profile' element={<StudentProfile />} />
          <Route path='/fund-admin/settings' element={<Settings />} />

  {/* fund admin routes */}
          <Route path='/' element={<LandingPage />} />
          <Route path='/about-us' element={<AboutUs />} />
          <Route path='/get-involved' element={<GetInvolved />} />
         
        </Routes>
      </BrowserRouter> 
    </StudentProvider>
  )
}
