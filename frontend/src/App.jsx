import React from 'react'
import './App.css'
import { Button } from './components/ui/button'
import Login from './pages/login'
import Navbar from './components/navbar/Navbar'
import HeroSection from './pages/student/HeroSection'
import { createBrowserRouter } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import { RouterProvider } from 'react-router'

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <HeroSection />,
        // courses page
      },
      {
        path: "/login",
        element: <Login />,
      }
    ]
  }
])

function Home() {
  return(
    <main>

    <RouterProvider router={appRouter} />
    </main>
  
  )
}

export default Home

