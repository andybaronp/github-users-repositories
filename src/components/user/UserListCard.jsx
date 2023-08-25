'use client'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'
import { FaGithub } from 'react-icons/fa6'

const UserListCard = ({ user }) => {
  const router = useRouter()
  return (
    <div
      onClick={() => router.push(`/user/${user.login}`)}
      key={user.id}
      className='bg-[#1e2a47] hover:scale-[1.01]  cursor-pointer flex flex-col  justify-center items-center  gap-3 py-4  shadow-md hover:shadow-[#0079ff]/50 rounded-xl border-gray-500   w-full  max-w-screen-xl   mx-auto     '
    >
      <div className='flex items-center justify-between gap-2'>
        <Image
          className='object-cover rounded-full w-28 h-28 '
          priority
          src={user.avatar_url}
          width={230}
          height={230}
          alt={user.login}
        />

      </div>
      <h3 className='text-lg font-semibold sm:text-xl basis-3/5'>@{user.login}</h3>

      <div className='flex items-center justify-center gap-1 text-gray-400 cursor-pointer hover:underline'>
        <FaGithub />
        <Link
          className='pl-2 truncate'
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
