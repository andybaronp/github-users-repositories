import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { FaGithub } from 'react-icons/fa6'

const Navbar = () => {
  return (
    <div className='fixed flex items-center justify-between w-full p-4 bg-[#1e2a47] '>
      <Link href='/'  >
        <FaGithub size='2rem' />
      </Link>
      <h1 className='text-2xl font-semibold '>GITHUB USERS</h1>
      <Link href={'/favorites'}>
        <p color='white'>Favoritos</p>
      </Link>
    </div>
  )
}

export default Navbar