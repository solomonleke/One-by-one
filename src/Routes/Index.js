import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from '../Pages/Home'

import SignIn from '../Pages/AuthenticatedScreens/SignIn'

export default function IndexRoutes() {
  return (
    <BrowserRouter>
        <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/sign-in' element={<SignIn/>}/>
          
        </Routes>
    </BrowserRouter>
  )
}
