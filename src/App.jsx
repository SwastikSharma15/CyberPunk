import React, { useEffect, lazy, Suspense } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/all'
import { Analytics } from '@vercel/analytics/react'
import Hero from './Components/Hero'
import NavBar from './Components/NavBar'
import FeedbackBtn from './Components/FeedbackBtn'

// Lazy load below-fold components
const About = lazy(() => import('./Components/About'))
const Features = lazy(() => import('./Components/Features'))
const Story = lazy(() => import('./Components/Story'))
const Contact = lazy(() => import('./Components/Contact'))
const Footer = lazy(() => import('./Components/Footer'))

gsap.registerPlugin(ScrollTrigger)

const App = () => {
  useEffect(() => {
    const handleLoad = () => {
      ScrollTrigger.refresh()
    }
    
    window.addEventListener('load', handleLoad)

    let resizeTimer
    const handleResize = () => {
      clearTimeout(resizeTimer)
      resizeTimer = setTimeout(() => {
        ScrollTrigger.refresh()
      }, 250)
    }
    
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('load', handleLoad)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <main className='relative min-h-screen w-screen overflow-x-hidden'>
      <NavBar />
      <Hero />
      <Suspense fallback={null}>
        <About />
        <Features />
        <Story />
        <Contact />
        <Footer />
      </Suspense>
      <Analytics />
      <FeedbackBtn />
    </main>
  )
}

export default App