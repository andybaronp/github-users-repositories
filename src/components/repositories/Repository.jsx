'use client'

import Link from 'next/link'

import { FaArrowLeftLong } from 'react-icons/fa6'
import { Toaster, toast } from 'sonner'
import RepositoryCard from './RepositoryCard'
import { localfavorites } from '@/utils'
import { useEffect, useState } from 'react'

const Repository = ({ repo }) => {
  const [isFavoriteLocal, setisFavoriteLocal] = useState()
  const [loading, setLoading] = useState(true)

  const handleFavorite = (repo) => {
    localfavorites.tooggleFavorites(repo)
    const isfavorite = localfavorites.existInFavorites(repo.id)
    setisFavoriteLocal(isfavorite)
  }
  // carga de favoritos de localStorage
  useEffect(() => {
    const isfavorite = localfavorites.existInFavorites(repo.id)
    setisFavoriteLocal(isfavorite)
    setLoading(false)
  }, [repo.id])
  return (
    <div className='flex flex-col items-center '>
      <Toaster position='top-right' duration={1500} />
      <Link
        href={`/user/${repo.owner.login}`}
        className='self-start pb-3 ml-4 underline '
      >
        <FaArrowLeftLong />
      </Link>
      <RepositoryCard
        repo={repo}
        handleFavorite={handleFavorite}
        isFavoriteLocal={isFavoriteLocal}
        loading={loading}
      />
    </div>
  )
}

export default Repository
