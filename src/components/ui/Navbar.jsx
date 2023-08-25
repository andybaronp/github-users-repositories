import Link from 'next/link'
import React from 'react'
import { FaGithub } from 'react-icons/fa6'

const Navbar = () => {
  return (
    <header className='w-full max-w-screen-xl mx-auto '>
      <nav className='fixed flex items-center justify-between w-full max-w-screen-xl p-4  bg-[#1e2a47] rounded-sm z-50	'>
        <Link href='/'>
          <FaGithub size='2rem' />
        </Link>
        <Link href='/'>
          <h1 className='hidden text-2xl font-semibold sm:block'>GITHUB USERS</h1>
        </Link>
        <Link href={'/favorites'}>
          <p className='text-base uppercase hover:scale-105'>Repositorios ❤️</p>
        </Link>
      </nav>
    </header>
  )
}

export default Navbar
