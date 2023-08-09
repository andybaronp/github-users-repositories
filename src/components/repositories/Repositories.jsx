'use client'
import { getUserRepositories } from "@/utils/api";
import Link from "next/link";
import InfiniteScroll from "react-infinite-scroll-component";
import Spinner from "../ui/Spinner";
import { useEffect, useState } from "react";
import { Toaster, toast } from 'sonner'
import { formatDate } from '@/utils/formatDate'

const Repositories = ({ userRepositories }) => {

  const [ListRepositories, setListRepositories] = useState([])
  const [isLoading, setIsLoading] = useState(false);
  const [localPage, setLocalPage] = useState(1);

  const [hasMore, setHasMore] = useState(true);


  //Get the data from the API
  useEffect(() => {
    const getRepositories = async () => {
      setIsLoading(true)
      const { repositories, nextPage, error, lastPage } = await getUserRepositories(userRepositories, localPage)
      // if (repositories.length === 0) {
      //   toast('No se encontraron resultados')
      //   return
      // }
      console.log(repositories);
      setHasMore(false)
      setListRepositories((prev) => prev.concat(repositories))
      setIsLoading(false)


    }
    getRepositories()

  }, [localPage]);

  if (ListRepositories.length === 0 && !isLoading) {
    return <div className="my-4 text-2xl font-semibold text-center">No hay repositorios</div>
  }
  return (
    <div className="">
      <Toaster position="top-right" duration={1200} />
      <h3 className="my-4 text-2xl font-semibold text-center">Repositorios</h3>
      <InfiniteScroll
        dataLength={ListRepositories.length}
        hasMore={hasMore}
        next={() => setLocalPage((prevePag) => prevePag + 1)}
        loader={<Spinner />}
        className='flex flex-col justify-between gap-4 mt-3 '

      >

        {
          ListRepositories.map((repo, i) => {

            return (
              <div key={repo.id}
                className='bg-[#1e2a47] px-2 py-1 border border-gray-500 rounded-xl  sm:w-[450px] w-11/12 mx-auto sm:mx-0    '
              >
                <Link href={`/user/${repo.owner.login}/repository/${repo.name}`}
                  className="flex flex-col w-full px-4 py-2 mx-auto text-sm "
                >
                  <div className="flex items-center justify-between mb-1">
                    <div className='text-[10] text-blue-400'>{repo.id}</div>
                    <div className=''>Lenguaje: {repo.language}</div>

                  </div>
                  <div className='text-[10] sm:text-base capitalize'> {repo.name} </div>
                  <div className="text-xs text-gray-300 ">{repo.description ? repo.description : 'Sin descripcion'}</div>
                  <time className='text-xs text-right text-gray-300'>
                    {formatDate(repo.created_at)}{' '}
                  </time>

                </Link>
              </div>
            )
          }
          )
        }
      </InfiniteScroll>
    </div >
  )
}

export default Repositories;