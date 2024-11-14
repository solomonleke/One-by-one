import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from '../Pages/Home'

import SignIn from '../Pages/AuthenticatedScreens/SignIn'
import Signup from '../Pages/AuthenticatedScreens/Signup'
import EmailVerification from '../Pages/AuthenticatedScreens/EmailVerification'
import RoleSelection from '../Pages/AuthenticatedScreens/RoleSelection'
import Index from '../Pages/SchoolAdminScreen/Index'

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

      </Routes>
    </BrowserRouter>
  )
}
