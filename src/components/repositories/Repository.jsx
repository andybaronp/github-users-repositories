'use client'
import { localfavorites } from '@/utils'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { FaHeart } from "react-icons/fa6";

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
      return await navigator.clipboard.writeText(text);
    } else {
      return document.execCommand('copy', true, text);
    }
  }
  return (
    <div style={{ border: '1px solid #ccc', padding: '10px', borderRadius: '10px', display: 'flex', flexDirection: 'column', gap: '10px', marginTop: 30 }} >
      <Link href={`/user/${repo.owner.login}`}> Regresar</Link>
      <Image src={repo.owner.avatar_url} alt="image Owner" width={50} height={50} priority />
      <div>ID: {repo.id}</div>
      <div>Name: {repo.name} </div>
      <div>description: {repo.description}</div>
      <div>created_at: {repo.created_at}</div>
      <div>language: {repo.language}</div>
      <div>updated_at: {repo.updated_at}</div>
      <div>html_url: {repo.html_url}</div>
      <div>homepage: {repo.homepage}</div>
      <div>forks: {repo.forks}  </div>
      <div>forks: {repo.forks}  </div>
      <div>watchers: {repo.watchers}  </div>
      <div onClick={() => copyTextToClipboard(`git clone ${repo.clone_url}`)}>Clonar: {repo.clone_url}  </div>
      <div>open_issues: {repo.open_issues}  </div>
      <button onClick={handleFavorite}>  {loading ? 'Cargando...' :
        isFavoriteLocal ? <>
          Quitar de favoritos
          <FaHeart color='red' />
        </>
          :
          "Guardar en favoritos"

      } </button>
    </div>
  )
}

export default Repository