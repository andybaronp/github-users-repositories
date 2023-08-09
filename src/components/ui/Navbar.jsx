import Link from 'next/link'
import React from 'react'
import { FaGithub } from 'react-icons/fa6'

const Navbar = () => {
  return (
    <div className='fixed flex items-center justify-between w-full p-4 bg-[#1e2a47] '>
      <Link href='/'>
        <FaGithub size='2rem' />
      </Link>
      <Link href='/'>
        <h1 className='hidden text-2xl font-semibold sm:block'>GITHUB USERS</h1>
      </Link>
      <Link href={'/favorites'}>
        <p color='white'>Repositorios Favoritos</p>
      </Link>
    </div>
  )
}

export default Navbar
