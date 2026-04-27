import './App.css'
import { HeroSection } from './Components/HeroSection'
import { Navbar } from './Components/Navbar'
import HeroSnippet from './Components/AboutSection'
import KeynoteSection from './Components/KeynoteSection'
import ServicesSection from './Components/ServicesSection'
import TestimonialsSection from './Components/TestimonialsSection'
import CTASection from './Components/CTASection'
import Footer from './Components/Footer'
import { Routes, Route } from 'react-router-dom'
import AboutPage from './Pages/StoryPage'
import MediaPage from './Pages/MediaPage'
import { useEffect } from 'react'
import BlogsPage from './Components/BlogsPage'
import ContactPage from './Components/Contact'

function HomePage() {
  useEffect(() => {
    if (window.AOS) {
      window.AOS.init({
        duration: 800,
        easing: 'ease-out-quart',
        once: true,
        offset: 80,
      });
    }
  }, []);

  return (
    <>
      <HeroSection />
      <div id="about-section">
        <HeroSnippet />
      </div>
      <KeynoteSection />
      <ServicesSection />
      <TestimonialsSection />
      <CTASection />
   
    </>
  );
}

function App() {
  return (
    <>
      <main>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/story" element={<AboutPage />} />
          <Route path="/media" element={<MediaPage />} />
          <Route path="/blogs" element={<BlogsPage/>} />
           <Route path="/contact" element={<ContactPage/>} />
        </Routes>
      </main>
      <Footer />
    </>
  )
}

export default App
