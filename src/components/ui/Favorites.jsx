"use client"
import { useDebounce } from '@/hooks/useDebounce'
import { localfavorites } from '@/utils'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

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


  // Filtrado de favoritos
  const requestSearch = (value) => {
    if (value !== '') {
      const filteredRows = favorites.filter((row) => {
        return String(row.name)
          ?.toLowerCase()
          .match(new RegExp(String(value.toLowerCase()), 'g'))
      })
      setFavorites(filteredRows)
      setSearched(value)
    } else {
      setFavorites(localfavorites.favoriteRepositories())
      setSearched('')
    }
  }
  // Debounce
  const debouncedSearch = useDebounce(searched, 500);
  useEffect(() => {
    requestSearch(debouncedSearch)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearch])


  return (
    <div>
      <Link href='/'>
        a
      </Link>
      {
        loading ? <p>Cargando...</p> :
          favorites.length === 0 ? (
            " <NoFavorites />"
          ) : (
            <div>
              <input onChange={(e) => setSearched(e.target.value)} type="text" placeholder='Filtrar por nombre' value={searched} />
              <ul>
                {favorites.map((repo) => (
                  <li key={repo.id} style={{ display: 'flex', gap: '1rem', alignItems: 'center', border: '1px solid #ccc', padding: '1rem', margin: '1rem 0' }}>
                    <div key={repo.id} style={{ border: '1px solid #ccc', padding: '10px', borderRadius: '10px', display: 'flex', flexDirection: 'column', gap: '10px' }} >
                      <Image src={repo.owner.avatar_url} alt={repo.owner.login} width={100} height={100} priority />
                      <div>ID: {repo.id}</div>
                      <div>Name: {repo.name} </div>
                      <div>description: {repo.description}</div>
                      <div>created_at: {repo.created_at}</div>
                      <div>language: {repo.language}</div>
                      <Link href={`/user/${repo.owner.login}/repository/${repo.name}`}>
                        Ir a detalles
                      </Link>

                    </div>
                    <button onClick={() => handleFavorite(repo)}>    Quitar de favoritos </button>

                  </li>
                ))}
              </ul>

            </div>
          )}
    </div>
  )
}

export default Favorites