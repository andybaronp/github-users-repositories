"use client"
import { useDebounce } from '@/hooks/useDebounce'
import { localfavorites } from '@/utils'
import React, { useEffect, useState } from 'react'
import { Toaster, toast } from 'sonner'
import { FaHeartCrack } from 'react-icons/fa6'
import Spinner from './Spinner'
import RepositoryCard from '../repositories/RepositoryCard'

const Favorites = () => {
  const [favorites, setFavorites] = useState([])
  const [isFavoriteLocal, setisFavoriteLocal] = useState()
  const [loading, setLoading] = useState(true)
  const [searched, setSearched] = useState('')
  // carga de favoritos de localStorage
  useEffect(() => {
    setFavorites(localfavorites.favoriteRepositories())
    setLoading(false)
  }, [isFavoriteLocal])

  const handleFavorite = (repo) => {
    localfavorites.tooggleFavorites(repo)
    const isfavorite = localfavorites.existInFavorites(repo.id)
    setisFavoriteLocal(isfavorite)
  }
  // carga de favoritos de localStorage
  useEffect(() => {
    favorites.map(repo => {
      const isfavorite = localfavorites.existInFavorites(repo.id)
      setisFavoriteLocal(isfavorite)
      setLoading(false)
    }
    )
  }, [favorites])

  // Filtrado de favoritos
  const requestSearch = (value) => {
    if (value !== '') {
      const filteredRows = favorites.filter((row) => {
        return String(row.name)
          ?.toLowerCase()
          .match(new RegExp(String(value.toLowerCase()), 'g'))
      })
      if (filteredRows.length !== 0) {
        setFavorites(filteredRows)
      } else {
        toast.error('No se encontraron resultados')

      }
    } else {
      setFavorites(localfavorites.favoriteRepositories())
      setSearched('')
    }
  }
  // Debounce
  const debouncedSearch = useDebounce(searched, 1000);
  useEffect(() => {
    requestSearch(debouncedSearch)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearch])


  return (
    <div className='flex flex-col '>
      <Toaster position="top-right" duration={1200} />

      {
        loading ?
          <div className='flex flex-col items-center justify-center w-full'>
            <Spinner />
          </div>
          :
          favorites.length === 0 ? (
            <div className='flex flex-col items-center justify-center gap-10'>
              <h1 className='text-lg font-semibold text-center'>No hay favoritos</h1>
              <FaHeartCrack color='red' size={'4rem'} />
            </div>
          ) : (
            <div className='flex flex-col items-center justify-between gap-4 ' >
              <input
                className='w-7/12 px-3 py-1 pl-3 mx-auto mb-3 text-black outline-none sm:w-72 rounded-xl '
                onChange={(e) => setSearched(e.target.value)} type="text" placeholder='Filtrar por nombre' value={searched} />

              {favorites.map((repo) => (

                <RepositoryCard key={repo.id} repo={repo} handleFavorite={handleFavorite} loading={loading} isFavoriteLocal={isFavoriteLocal}
                />

              ))}


            </div>
          )}
    </div>
  )
}

export default Favorites