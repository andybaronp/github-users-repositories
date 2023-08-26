'use client'
import { getUserRepositories } from '@/utils/api'
import Link from 'next/link'
import InfiniteScroll from 'react-infinite-scroll-component'
import Spinner from '../ui/Spinner'
import { useEffect, useState } from 'react'
import { Toaster, toast } from 'sonner'
import { formatDate } from '@/utils/formatDate'

const Repositories = ({ userRepositories }) => {
  const [ListRepositories, setListRepositories] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [localPage, setLocalPage] = useState(0)
  const [lastPage, setLastPage] = useState(0)
  const [tonextPage, settonextPage] = useState(0)
  const [hasMore, setHasMore] = useState(true)

  //Get the data from the API
  useEffect(() => {
    const getRepositories = async () => {
      setIsLoading(true)
      const { repositories, pagination, error } = await getUserRepositories(
        userRepositories,
        tonextPage,
      )
      // await getPagination(pagination)
      setListRepositories((prev) => prev.concat(repositories))
      if (repositories.length === 0) {
        toast('No se encontraron resultados')
        return
      }
      setHasMore(tonextPage < lastPage)
      setIsLoading(false)
    }
    getRepositories()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tonextPage])

  const getPagination = async (pagination) => {
    if (pagination === null) {
      return
    }
    const pageLink = pagination.split(',')
    if (pageLink.find((link) => link.includes('last'))) {
      const includeLast = pageLink
        .find((link) => link.includes('last'))
        .split(';')[0]
      const indexOfLastSince = includeLast.indexOf('&page=')
      const pageNumber = includeLast.slice(indexOfLastSince + 6)
      const lastpage = pageNumber.slice(0, -1)

      setLastPage(Number(lastpage))
    }
    if (pageLink.find((link) => link.includes('next'))) {
      const includeNext = pageLink
        .find((link) => link.includes('next'))
        .split(';')[0]
      const indexOfNextSince = includeNext.indexOf('&page=')
      const pageNumber = includeNext.slice(indexOfNextSince + 6)
      const nextpage = pageNumber.slice(0, -1)
      settonextPage(Number(nextpage))
    }
  }

  if (ListRepositories.length === 0 && !isLoading) {
    return (
      <div className='my-4 text-2xl font-semibold text-center'>
        No hay repositorios
      </div>
    )
  }
  return (
    <div className='flex flex-col justify-center '>
      <Toaster position='top-right' duration={1200} />
      <h3 className='my-4 text-2xl font-semibold text-center'>
        Repositorios Públicos
      </h3>
      <div
        className='grid grid-cols-1 gap-4 p-4 pt-20 sm:px-3 sm:grid-cols-3 md:grid-cols-4 justify-items-center'
      >
        {ListRepositories.map((repo, i) => {
          return (
            <div
              className='bg-[#1e2a47]   border border-gray-500 rounded-xl  w-full  hover:scale-[1.01]  hover:shadow-[#0079ff]/50 '
              key={i}
            >
              <Link
                href={`/user/${repo.owner.login}/repository/${repo.name}`}
                className='flex flex-col w-full p-4 mx-auto text-sm'
              >
                <div className='flex items-center justify-between mb-1'>
                  {i + 1}
                  <div className='text-[10]'>ID: <span className='text-blue-400 '>{repo.id}</span></div>
                </div>
                <div className='flex flex-col gap-1'>
                  <div>

                    Nombre: <span className='text-blue-400 '>{repo.name}</span>
                  </div>
                  <div className='text-gray-300 truncate '>
                    Descripción
                    {repo.description ? repo.description : 'Sin descripcion'}
                  </div>
                  <div className=''>Lenguaje: {repo.language ? repo.language : 'No especificado'}</div>
                </div>
                <time className='text-xs text-right text-gray-300'>
                  Creado:  {formatDate(repo.created_at)}{' '}
                </time>
              </Link>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Repositories
