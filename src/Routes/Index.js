import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
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


export default function IndexRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* school admin routes */}
        <Route path='/school-admin' element={<Index/>} />
        <Route path='/school-admin/student-management' element={<StudentManagement/>} />
        <Route path='/school-admin/school-profile' element={<SchoolProfile/>} />
        <Route path='/school-admin/settings' element={<Settings/>} />
        <Route path='/AddStudents' element={<AddNewStudents/>} />
        <Route path='/school-admin/student-management/student-profile' element={<StudentProfile/>} />




        <Route path='/' element={<Home />} />
        <Route path='/sign-in' element={<SignIn />} />
        <Route path='/sign-up' element={<Signup />} />
        <Route path='/email-verification' element={<EmailVerification />} />
        <Route path='/role-selection/:id' element={<RoleSelection />} />
        <Route path='/SchoolAdminSignup' element={<SchoolAdminSignup />} />
        <Route path='/ScholarshipAdminSignup' element={<ScholarshipAdminSignup />} />
        <Route path='/Sponsor' element={<Sponsor />} />
        <Route path='/FundAdminSignup' element={<FundAdminSignup />} />
        <Route path='/ProfileSetupComplete' element={<ProfileSetupComplete />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route path='/ForgottenPasswordEmail' element={<ForgottenPasswordEmail />} />
        <Route path='/reset-password/:id' element={<ResetPassword />} />

      </Routes>
    </BrowserRouter>
  )
}
