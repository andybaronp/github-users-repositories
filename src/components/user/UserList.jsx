'use client'
import React, { useEffect, useState } from 'react'
import { getUsers, getUsersByName } from '@/utils/api'
import { useDebounce } from '@/hooks/useDebounce'
import { Toaster, toast } from 'sonner'
import InfiniteScroll from 'react-infinite-scroll-component'
import Spinner from '../ui/Spinner'
import UserListCard from './UserListCard'
import { FaHeartCrack } from 'react-icons/fa6'

const UserList = () => {
  const [loading, setLoading] = useState(true)
  const [userList, setUserList] = useState([])
  const [nextPage, setNextPage] = useState(0)
  const [isSearch, setIsSearch] = useState(false)
  // Carga la siguiente pagina de usuarios
  const getMoreUsers = async (since) => {
    const { data, nextPageSince } = await getUsers(since)
    setUserList((prev) => prev.concat(data))
    setNextPage(nextPageSince)
  }

  // primera carga de datos
  useEffect(() => {
    async function fetchData() {
      setLoading(true)
      const { data, nextPageSince, error } = await getUsers(0)
      if (data.length === 0) {
        toast('No se encontraron resultados')
        return
      }
      if (error) {
        toast.error('Error al consultar')
        return
      }
      setUserList(data)
      setNextPage(nextPageSince)
      setLoading(false)

    }
    fetchData()
  }, [])

  const userByName = async (name) => {
    setLoading(true)
    const { data, error } = await getUsersByName(name)
    if (data.length === 0) {
      toast('No se encontraron resultados')
      setIsSearch(false)
      setLoading(false)

      return
    }
    if (error) {
      toast.error('Error al consultar')
      setLoading(false)

      return
    }
    if (data.length > 0) {
      setUserList(data)
      setIsSearch(true)
      setLoading(false)
    }
  }
  const [searched, setSearched] = useState('')
  // Debounce
  const debouncedSearch = useDebounce(searched, 1000)
  useEffect(() => {
    if (debouncedSearch === '') {
      async function fetchData() {
        const { data, nextPageSince } = await getUsers(0)
        setUserList(data)
        setIsSearch(false)
        setNextPage(nextPageSince)
      }
      fetchData()
      return
    }

    userByName(debouncedSearch)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearch])

  if (loading) {
    return <Spinner />
  }
  if (userList.length === 0 && !loading) {
    return (
      <div className='flex flex-col items-center justify-center gap-10'>
        <h1 className='text-lg font-semibold text-center'>No data para mostrar</h1>
        <FaHeartCrack color='red' size={'4rem'} />
      </div>
    )
  }
  return (
    <div className='flex flex-col '>
      <Toaster position='top-right' duration={1200} />
      <input
        className='w-7/12 px-3 py-1 pl-3 mx-auto mb-3 text-black outline-none rounded-xl sm:ml-7'
        onChange={(e) => setSearched(e.target.value)}
        type='text'
        placeholder='Filtrar por nombre'
        value={searched}
      />
      <InfiniteScroll
        dataLength={userList.length}
        hasMore={!isSearch}
        next={() => getMoreUsers(nextPage)}
        loader={<Spinner />}
        className='flex flex-col justify-between gap-4 mt-3 '
      >
        {userList.map((user, i) => (
          <UserListCard user={user} key={i} />
        ))}
      </InfiniteScroll>
    </div>
  )
}

export default UserList
