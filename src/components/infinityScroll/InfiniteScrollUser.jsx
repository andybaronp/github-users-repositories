'use client'
import React, { useEffect, useState } from 'react'
import UserListCard from '../user/UserListCard';
import { getUsersByName } from '@/utils/api';
import Spinner from '../ui/Spinner';
import { Toaster, toast } from 'sonner';
import { useDebounce } from '@/hooks/useDebounce'
import { useFetchUser } from '@/hooks/userFetch';

const InfiniteScrollUser = () => {
  const [isSearch, setIsSearch] = useState(false)
  const { fetchData, userList, isLoading, error, setIsLoading, setUserList, setPage } = useFetchUser()

  const handleScroll = () => {
    const marginOfError = 1;
    const isScrollAtBottom =
      Math.abs(
        window.innerHeight + document.documentElement.scrollTop - document.documentElement.offsetHeight
      ) <= marginOfError;
    if (!isScrollAtBottom || isLoading) {
      return;
    }
    fetchData();
  };

  // Scroll
  useEffect(() => {
    if (!isSearch) {
      window.addEventListener('scroll', handleScroll);
    }
    return () => window.removeEventListener('scroll', handleScroll);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading, isSearch]);

  //Primera carga
  useEffect(() => {
    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])



  const userByName = async (name) => {
    setIsLoading(true)
    setIsSearch(true)
    setPage(0)
    const { data, error, total_count } = await getUsersByName(name)
    if (total_count === 0) {
      toast('No se encontraron resultados')

      setIsLoading(false)
      return
    }
    if (error) {
      toast.error('Error al consultar')
      setIsLoading(false)
      return
    }
    setUserList(data)
    setIsLoading(false)
  }
  const [searched, setSearched] = useState(undefined)
  // Debounce
  const debouncedSearch = useDebounce(searched, 1200)
  useEffect(() => {
    if (debouncedSearch === '') {
      setUserList([])
      setIsSearch(false)
      async function reloadData() {
        await fetchData()
      }
      reloadData()
      return
    }
    if (debouncedSearch !== undefined && debouncedSearch !== '') {
      userByName(debouncedSearch)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearch])
  return (
    <div className='w-full max-w-screen-xl '>
      <Toaster position='top-right' duration={1200} />
      <div className='fixed z-40 flex items-center justify-center w-full max-w-screen-xl py-4 backdrop-blur top-16 '>
        <input
          className='  w-[300px] sm:w-[450px] px-3 py-1 pl-3 mx-auto  text-black outline-none rounded-xl'
          onChange={(e) => setSearched(e.target.value)}
          type='text'
          placeholder='Buscar por usuario'
          value={searched || ''}
        />
      </div>
      <div
        className='grid grid-cols-1 gap-3 p-4 pt-24 sm:px-3 md:grid-cols-3 lg:grid-cols-4 justify-items-center' >
        {userList.map((user, i) => (
          <UserListCard user={user} key={i} />
        ))}
      </div>
      {error && <p className='py-10 text-2xl text-center text-red-700 '> ¡Ups.  Algo paso! {error.message}</p>}
      {isLoading && <Spinner items={userList} />}
    </div>
  )
}

export default InfiniteScrollUser