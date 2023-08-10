'use client'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import { FaAngleRight, FaArrowRightLong, FaGithub } from 'react-icons/fa6'

const UserListCard = ({ user }) => {
  const [hovering, setHovering] = useState(false)

  return (
    <div
      key={user.id}
      className='bg-[#1e2a47]  flex  gap-2  py-2 px-3 border border-gray-500 rounded-[100px] items-center  sm:w-[430px] w-11/12 mx-auto sm:mx-0  justify-between '
    >
      <div className='flex items-center justify-between gap-2 '>
        <Image
          className='object-cover w-12 h-12 rounded-full sm:w-20 sm:h-20 '
          priority
          src={user.avatar_url}
          width={230}
          height={230}
          alt={user.login}
        />
        <div>

          <h3 className='text-[10] sm:text-lg'>@{user.login}</h3>
          <div className='flex items-center gap-2 overflow-hidden text-gray-400 cursor-pointer hover:underline'>
            <FaGithub />
            <Link
              className='overflow-hidden text-xs'
              href={user.html_url}
              target='_blank'
            >
              {user.html_url}
            </Link>
          </div>
        </div>
      </div>
      <div className='border-l-[1px] px-2'>
        <Link
          href={`/user/${user.login}`}
          className='p-2 '
          onMouseEnter={() => setHovering(true)}
          onMouseLeave={() => setHovering(false)}
        >
          {hovering ? <FaArrowRightLong /> : <FaAngleRight />}
        </Link>
      </div>
    </div>
  )
}

export default UserListCard
