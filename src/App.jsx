import React, { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/all'
import Hero from './Components/Hero'
import About from './Components/About'
import NavBar from './Components/NavBar'
import Features from './Components/Features'
import Story from './Components/Story'
import Contact from './Components/Contact'
import Footer from './Components/Footer'

gsap.registerPlugin(ScrollTrigger)

const App = () => {
  useEffect(() => {
    // Refresh ScrollTrigger when window is fully loaded
    const handleLoad = () => {
      ScrollTrigger.refresh()
    }
    
    window.addEventListener('load', handleLoad)

    // Also refresh on resize (debounced)
    let resizeTimer
    const handleResize = () => {
      clearTimeout(resizeTimer)
      resizeTimer = setTimeout(() => {
        ScrollTrigger.refresh()
      }, 250)
    }
    
    window.addEventListener('resize', handleResize)

    // Cleanup
    return () => {
      window.removeEventListener('load', handleLoad)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <main className='relative min-h-screen w-screen overflow-x-hidden'>
      <NavBar />
      <Hero />
      <About />
      <Features />
      <Story />
      <Contact />
      <Footer />
    </main>
  )
}

export default App