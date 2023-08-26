import { GITHUB_API_BASE_URL, getAllDataGet } from '@/utils/api';
import { useState } from 'react'
import { toast } from 'sonner';


export function useFetchUser() {
  const [userList, setUserList] = useState([]);
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
      setUserList(prevItems => [...prevItems, ...data]);
      setPage(pageSince);
    } catch (error) {
      setError(error);
      toast.error('Error al consultar')
    } finally {
      setIsLoading(false);
    }
  }
  return {
    fetchData, setIsLoading, setUserList, setPage, userList, isLoading, error,
  }
}