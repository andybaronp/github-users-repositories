'use client'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { FaAngleRight, FaArrowRightLong, FaGithub } from 'react-icons/fa6'

const UserListCard = ({ user }) => {
  const [hovering, setHovering] = useState(false)
  const router = useRouter()
  return (
    <div
      onClick={() => router.push(`/user/${user.login}`)}
      key={user.id}
      className='bg-[#1e2a47] hover:scale-105  cursor-pointer h-[160px]  flex flex-col  justify-center  gap-2   py-2 px-3 shadow-md hover:shadow-[#0079ff]/50 rounded-xl border-gray-500    sm:w-[320px] w-11/12 mx-auto sm:mx-0   '
    >
      <div className='flex items-center justify-between gap-2'>
        <Image
          className='object-cover w-24 h-24 rounded-full '
          priority
          src={user.avatar_url}
          width={230}
          height={230}
          alt={user.login}
        />

        <h3 className='text-lg sm:text-xl basis-3/5'>@{user.login}</h3>
      </div>

      <div className='flex items-center justify-center gap-1 overflow-hidden text-gray-400 cursor-pointer hover:underline'>
        <FaGithub />
        <Link
          className='overflow-hiddenmax-w-[150px] pl-2'
          href={user.html_url}
          target='_blank'
        >
          {user.html_url}
        </Link>
      </div>
      {/* <div className='border-l-[1px] px-2'>
        <Link
          href={`/user/${user.login}`}
          className='p-2 '
          onMouseEnter={() => setHovering(true)}
          onMouseLeave={() => setHovering(false)}
        >
          {hovering ? <FaArrowRightLong /> : <FaAngleRight />}
        </Link>
      </div> */}
    </div>
  )
}

export default UserListCard
