import React from 'react'
import './App.css'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ScrollProgress from './components/ScrollProgress'
import ScrollToTop from './components/ScrollToTop'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Staff from './pages/Staff';

const App = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar/>
      <ScrollProgress />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={
          <main className="flex-grow pt-24">
            <Home />
          </main>}/>
          <Route path="/staff/a-to-z" element={<Staff />} />
          {/* <Route path="/ec-campus/computer-science" element={<CSCampus />} />
          <Route path="/ec-campus/electronics-communications" element={<ECECampus />} />
          <Route path="/rr-campus/electrical" element={<Electrical />} />
          <Route path="/rr-campus/mechanical" element={<Mechanical />} /> */}
      </Routes>
      <Footer/>
    </div>
  )
}

export default App