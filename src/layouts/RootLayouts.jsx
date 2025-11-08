import React from 'react'
import Navbar from '../components/Navbar'
import { Outlet } from 'react-router'
import Footer from '../components/Footer'

const RootLayouts = () => {
  return (
    <div>
        <Navbar/>
        <Outlet></Outlet>
        <Footer></Footer>
    </div>
  )
}

export default RootLayouts