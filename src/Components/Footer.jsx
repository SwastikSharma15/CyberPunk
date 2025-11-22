import React from 'react'
import { FaGithub, FaLinkedinIn, FaYoutube } from 'react-icons/fa'

const links = [
  {href: 'https://github.com/SwastikSharma15', icon: <FaGithub />},
  {href: 'https://www.linkedin.com/in/swastik15sharma', icon: <FaLinkedinIn />},
  {href: 'https://www.youtube.com/@SpeedX_', icon: <FaYoutube />},
]

const Footer = () => {
  return (
    <footer className='w-screen bg-violet-300 py-4 text-black'>
      <div className='container mx-auto flex flex-col items-center justify-between gap-4 px-4 md:flex-row'>
        <p className='text-center text-sm md:text-left md:flex-1'>
          &copy; Cyberpunk Edgerunners. All rights reserved
        </p>
        
        <div className='flex justify-center gap-4 md:flex-1 md:justify-center'>
          {links.map((link, index) => (
            <a 
              key={index} 
              href={link.href} 
              target='_blank' 
              rel='noopener noreferrer' 
              className='text-black transition-colors duration-500 ease-in-out hover:text-white'
            >
              {link.icon}
            </a>
          ))}
        </div>

        <a 
          href='#privacy-policy' 
          className='text-center text-sm hover:underline md:text-right md:flex-1'
        >
          Privacy Policy
        </a>
      </div>
    </footer>
  )
}

export default Footer