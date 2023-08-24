'use client'
import React, { useEffect, useState } from 'react'
import UserListCard from '../user/UserListCard';
import { GITHUB_API_BASE_URL, getAllDataGet } from '@/utils/api';
import Spinner from '../ui/Spinner';

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

  return (
    <div>
      <div
        className='grid grid-cols-1 gap-4 p-3 md:grid-cols-2 lg:grid-cols-3 justify-items-center ' >
        {items.map((user, i) => (
          <UserListCard user={user} key={i} />
        ))}
      </div>
      {isLoading && <Spinner />}
      {error && <p>Error: {error.message}</p>}
    </div>
  )
}

export default InfiniteScrollUser 