import { formatDate } from '@/utils/formatDate'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { FaLink, FaLocationDot, FaRegBuilding, FaSquareTwitter } from 'react-icons/fa6'

const UserCard = ({ user }) => {
  return (
    <article className='flex  justify-center rounded-xl  bg-[#1e2a47] p-0 sm:py-7 sm:px-4 w-11/12 sm:w-full sm:max-w-[430px] mx-auto  '>
      <div className='flex flex-col gap-3 p-3'>
        <div className='flex items-center gap-6 '>
          <Image
            className='object-cover w-32 h-32 rounded-full '
            src={user.avatar_url}
            width={200}
            height={200}
            alt='avatar'
            priority
          />
          <div className='leading-7'>
            <h1 className='text-2xl font-semibold'>{user.name}</h1>
            <h3 className='text-[#0079ff]  '>@{user.login}</h3>
            <time className='text-xs text-gray-300 sm:text-base'>
              {' '}
              {formatDate(user.created_at)}{' '}
            </time>
          </div>
        </div>
        <p className='w-full my-3 text-sm text-gray-300 '> {user.bio}</p>
        <ul className='bg-[#141d2f] py-2 px-6 flex justify-between rounded-xl '>
          <li>
            <h4 className='text-sm text-gray-300'>Repositorios</h4>
            <h2 className='text-xl font-semibold'>{user.public_repos}</h2>
          </li>
          <li>
            <h4 className='text-sm text-gray-300'>Seguidores</h4>
            <h2 className='text-xl font-semibold'>{user.followers}</h2>
          </li>
          <li>
            <h4 className='text-sm text-gray-300'>Siguiendo</h4>
            <h2 className='text-xl font-semibold'>{user.following}</h2>
          </li>
        </ul>
        <section className='flex justify-between gap-3 mt-3 '>
          <div className='flex flex-col gap-2'>
            <div className='flex items-center gap-3'>
              <FaLocationDot />
              <span className='text-xs text-gray-300 sm:text-base'>
                {user.location ? user.location : 'No disponible'}
              </span>
            </div>
            <div className='flex items-center gap-3'>
              <FaSquareTwitter />
              {user.twitter_usernam ? (
                <Link
                  className='text-xs text-gray-300 sm:text-base'
                  href={` https://twitter.com/${user.twitter_username}`}
                  target='_blank'
                >
                  {`@${user.twitter_username}`}{' '}
                </Link>
              ) : (
                <span className='text-xs text-gray-300 sm:text-base'>
                  No disponible
                </span>
              )}
            </div>
          </div>
          <div className='flex flex-col justify-between gap-2'>
            <div className='flex items-center gap-3'>
              <FaLink />
              {user.blog ? (
                <Link
                  className='text-xs text-gray-300 sm:text-base hover:underline'
                  href={user.blog}
                  target='_blank'
                >
                  Ir a Web
                </Link>
              ) : (
                <span className='text-xs text-gray-300 sm:text-base'>
                  No disponible
                </span>
              )}
            </div>
            <div className='flex items-center gap-3'>
              <FaRegBuilding />
              {user.company ? (
                <Link
                  className='text-xs text-gray-300 sm:text-base'
                  href={` ${user.company}`}
                  target='_blank'
                >
                  {user.company}
                </Link>
              ) : (
                <span className='text-xs text-gray-300 sm:text-base'>
                  No disponible
                </span>
              )}
            </div>
          </div>
        </section>
      </div>
    </article>
  )
}

export default UserCard