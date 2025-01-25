import Navbar from '@/components/navbar/Navbar'
import React from 'react'
import { Outlet } from 'react-router-dom'

const MainLayout = () => {
  return (
    <div>
        <Navbar />
        <div>
            {/* outlet renders the child routes */}
            <Outlet />      
        </div>
    </div>
  )
}

export default MainLayout