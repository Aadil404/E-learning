import React from 'react'
import './App.css'
import { Button } from './components/ui/button'
import Login from './pages/login'
import Navbar from './components/navbar/Navbar'

function Home() {
  return(
    <main>
      <Navbar />
      <Login />
    </main>
  
  )
}

export default Home

