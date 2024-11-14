import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from '../Pages/Home'

import SignIn from '../Pages/AuthenticatedScreens/SignIn'
import Signup from '../Pages/AuthenticatedScreens/Signup'
import EmailVerification from '../Pages/AuthenticatedScreens/EmailVerification'
import RoleSelection from '../Pages/AuthenticatedScreens/RoleSelection'
import Index from '../Pages/SchoolAdminScreen/Index'
import SchoolAdminSignup from '../Pages/AuthenticatedScreens/SchoolAdminSignup'
import ScholarshipAdminSignup from '../Pages/AuthenticatedScreens/ScholarshipAdminSignup'
import Sponsor from '../Pages/AuthenticatedScreens/Sponsor'
import FundAdminSignup from '../Pages/AuthenticatedScreens/FundAdminSignup'
import ProfileSetupComplete from '../Pages/AuthenticatedScreens/ProfileSetupComplete'


export default function IndexRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* school admin routes */}
        <Route path='/school-admin' element={<Index/>} />

        <Route path='/' element={<Home />} />
        <Route path='/sign-in' element={<SignIn />} />
        <Route path='/sign-up' element={<Signup />} />
        <Route path='/emailVerification' element={<EmailVerification />} />
        <Route path='/roleSelection' element={<RoleSelection />} />
        <Route path='/SchoolAdminSignup' element={<SchoolAdminSignup />} />
        <Route path='/ScholarshipAdminSignup' element={<ScholarshipAdminSignup />} />
        <Route path='/Sponsor' element={<Sponsor />} />
        <Route path='/FundAdminSignup' element={<FundAdminSignup />} />
        <Route path='/ProfileSetupComplete' element={<ProfileSetupComplete />} />

      </Routes>
    </BrowserRouter>
  )
}
