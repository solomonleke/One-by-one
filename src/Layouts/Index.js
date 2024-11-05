import React from 'react'
import Footer from './Footer'
import NavBar from './NavBar'

export default function MainLayout({children, bgColor = "white",}) {
  return (
    <div>
        <NavBar/>
       
            {children}
        <Footer/>
    </div>
  )
}
