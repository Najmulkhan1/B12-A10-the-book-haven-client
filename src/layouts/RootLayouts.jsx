import React from 'react'
import Navbar from '../components/Navbar'
import { Outlet } from 'react-router'
import Footer from '../components/Footer'
import { Toaster } from 'react-hot-toast'

const RootLayouts = () => {
  return (
    <div>
        <Navbar/>
        <Outlet></Outlet>
        <Footer></Footer>

        <Toaster />
    </div>
  )
}

export default RootLayouts