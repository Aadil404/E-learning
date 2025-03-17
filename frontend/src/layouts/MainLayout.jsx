import Navbar from '@/components/navbar/Navbar'
import React from 'react'
import { Outlet, ScrollRestoration } from 'react-router-dom'

const MainLayout = () => {
  return (
    <div>
      <ScrollRestoration />
        <Navbar />
        <div>
            {/* outlet renders the child routes */}
            <Outlet />      
        </div>
    </div>
  )
}

export default MainLayout