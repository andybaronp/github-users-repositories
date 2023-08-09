'use client'
import { localfavorites } from '@/utils'
import { formatDate } from '@/utils/formatDate'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import {
  FaArrowLeftLong,
  FaArrowUpLong,
  FaBugSlash,
  FaCodeFork,
  FaEye,
  FaHeart,
  FaHouseChimney,
  FaLanguage,
  FaLink,
  FaRegClone,
  FaRegHeart,
} from 'react-icons/fa6'

const Repository = ({ repo }) => {
  const [loading, setLoading] = useState(true)
  const [isFavoriteLocal, setisFavoriteLocal] = useState()

  useEffect(() => {
    const isfavorite = localfavorites.existInFavorites(repo.id)
    setisFavoriteLocal(isfavorite)
    setLoading(false)
  }, [repo.id])

  const handleFavorite = () => {
    localfavorites.tooggleFavorites(repo)
    const isfavorite = localfavorites.existInFavorites(repo.id)

    setisFavoriteLocal(isfavorite)
  }
  async function copyTextToClipboard(text) {
    if ('clipboard' in navigator) {
      return await navigator.clipboard.writeText(text)
    } else {
      return document.execCommand('copy', true, text)
    }
  }
  return (
    <div className='flex flex-col items-center '>
      <Link
        href={`/user/${repo.owner.login}`}
        className='self-start pb-3 ml-4 underline '
      >
        <FaArrowLeftLong />
      </Link>
      <article className='flex  justify-between rounded-xl  bg-[#1e2a47] p-3 sm:py-6 sm:px-4 w-11/12 sm:w-full sm:max-w-[500px] mx-auto '>
        <div className='flex flex-col justify-between w-full gap-2 p-3'>
          <div className='flex justify-between w-full'>
            <Image
              src={repo.owner.avatar_url}
              alt='image Owner'
              width={200}
              height={200}
              className='object-cover w-16 h-16 rounded-full shadow-xl sm:w-32 sm:h-32 '
              priority
            />
            <div className='flex flex-col'>
              <div className='text-[10px] sm:text-base  text-blue-400'>
                {' '}
                {repo.id}
              </div>
              <time className='text-[10px] text-gray-300 sm:text-base'>
                {formatDate(repo.created_at)}
              </time>
            </div>
          </div>

          <div className='text-lg text-center text-blue-500 capitalize'>
            {repo.name}{' '}
          </div>

          <div className='text-xs text-gray-300 '>{repo.description}</div>
          <div className='flex items-center gap-1 text-xs sm:text-sm'><FaLanguage /> {repo.language ? repo.language : 'Sin lenguajes'}</div>
          <div className='flex items-center gap-1 text-xs sm:text-sm'>
            <FaArrowUpLong /> {formatDate(repo.updated_at)}
          </div>
          <div className='flex items-center gap-1 overflow-hidden text-xs sm:text-sm'>
            <FaLink /> {repo.html_url}
          </div>
          <div className='flex items-center gap-1 text-xs'>
            <FaHouseChimney /> {repo.homepage ? repo.homepage : 'Sin homepage'}
          </div>
          <div className='flex items-center gap-1 text-xs sm:text-sm'>
            {' '}
            <FaCodeFork />
            {repo.forks}{' '}
          </div>
          <div className='flex items-center gap-1 text-xs sm:text-sm'>
            <FaEye /> {repo.watchers}{' '}
          </div>
          <div
            className='flex items-center gap-1 overflow-hidden text-xs sm:text-sm'
            onClick={() => copyTextToClipboard(`git clone ${repo.clone_url}`)}
          >
            {' '}
            <FaRegClone /> {repo.clone_url}{' '}
          </div>
          <div className='flex items-center gap-1 text-xs sm:text-sm'>
            {' '}
            <FaBugSlash /> {repo.open_issues}{' '}
          </div>

          <button
            className='flex items-center justify-center gap-2 px-3 py-1 mx-auto text-xs text-gray-300 border border-blue-400 rounded-md hover:text-blue-400 hover:border-white rounde sm:text-base backdrop-blur-sm '
            onClick={handleFavorite}
          >
            {' '}
            {loading ? (
              'Cargando...'
            ) : isFavoriteLocal ? (
              <span className='flex items-center justify-center gap-2'>
                Quitar de favoritos
                <FaHeart color='red' />
              </span>
            ) : (
              <span className='flex items-center justify-center gap-2'>Guardar en favoritos <FaRegHeart color='white' /></span>
            )}{' '}
          </button>

        </div>
      </article>
    </div>
  )
}

export default Repository
