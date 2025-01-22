import React from 'react'
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


export default function IndexRoutes() {
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
          <Route path='/school-admin/student-management/student-profile' element={<StudentProfile />} />




          <Route path='/' element={<Home />} />
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



        </Routes>
      </BrowserRouter>
    </StudentProvider>
  )
}
