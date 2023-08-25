'use client'
import React, { useEffect, useState } from 'react'
import UserListCard from '../user/UserListCard';
import { GITHUB_API_BASE_URL, getAllDataGet } from '@/utils/api';
import Spinner from '../ui/Spinner';
import { Toaster, toast } from 'sonner';

const InfiniteScrollUser = () => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1)
  const fetchData = async () => {

    setIsLoading(true);
    setError(null);
    try {
      const response = await getAllDataGet(`${GITHUB_API_BASE_URL}users?per_page=15&since=${page}`);
      const pagination = response.headers.get('link')
      const pageLink = pagination.split(',')[0]
      const match = pageLink.match(/since=(\d+)/);
      let pageSince = 0
      if (match) {
        pageSince = match[1]
      }
      const data = await response.json();
      setItems(prevItems => [...prevItems, ...data]);
      setPage(pageSince);


    } catch (error) {
      setError(error);
      toast.error('Error al consultar')
    } finally {
      setIsLoading(false);
    }
  }
  const handleScroll = () => {
    if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight || isLoading) {
      return;
    }
    fetchData();
  };

  // Scroll
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);
  //Primera carga
  useEffect(() => {
    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const [searched, setSearched] = useState()

  return (
    <div>
      <Toaster position='top-right' duration={1200} />
      <div className='fixed z-40 flex items-center justify-center w-full max-w-screen-xl py-4 backdrop-blur top-16'>
        <input
          className='  w-[300px] sm:w-[450px] px-3 py-1 pl-3 mx-auto  text-black outline-none rounded-xl'
          onChange={(e) => setSearched(e.target.value)}
          type='text'
          placeholder='Buscar por usuario'
          value={searched}
        />
      </div>
      <div
        className='grid grid-cols-1 gap-3 px-3 py-3 pt-14 sm:px-0 md:grid-cols-3 lg:grid-cols-4 justify-items-center' >
        {items.map((user, i) => (
          <UserListCard user={user} key={i} />
        ))}
      </div>
      {error && <p>Error: {error.message}</p>}
      {isLoading && <Spinner items={items} />}
    </div>
  )
}

export default InfiniteScrollUser 