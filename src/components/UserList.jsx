'use client'
import { styled } from 'styled-components'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { getUsers, getUsersByName } from '@/utils/api'
import { ImageContainer } from './ui/StyledComponents'
import { useDebounce } from '@/hooks/useDebounce'
import { Toaster, toast } from 'sonner'
import { FaGithub } from "react-icons/fa6";


const Container = styled.div`
  background: linear-gradient(45deg, #0d416f 0%, #000428 100%);
  color: white;
  padding: 20px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 6px;
`
const Datauser = styled.div`
  display: flex;
  flex-direction: column;

  & > h3 {
    font-size: 1.25rem;
    font-weight: bold;
  }
  & > a {
    font-size: 1rem;
  }
`


const ButtonView = styled(Link)`
  cursor: pointer;
  margin-left: 16px;
  border: 0;
  border-radius: 999px;
  padding: 10px 16px;
  font-weight: bold;
  font-size: 15px;
  transition: 0.3s ease background-color;
`
const UserList = () => {
  const [userList, setUserList] = useState([])
  const [nextPage, setNextPage] = useState(0)
  const [isSearch, setIsSearch] = useState(false)
  const [loading, setLoading] = useState(true)

  // Carga la siguiente pagina de usuarios
  const getMoreUsers = async (since) => {
    const { data, nextPageSince } = await getUsers(since)
    setUserList((prev) => (prev.concat(data)))
    setNextPage(nextPageSince)
    setLoading(false)
  }

  // primera carga de datos
  useEffect(() => {
    async function fetchData() {
      const { data, nextPageSince, error } = await getUsers(0)
      if (data.length === 0) {
        toast('No se encontraron resultados')
        setIsSearch(false)
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
      return
    }
    if (error) {
      toast.error('Error al consultar')
      return
    }
    setIsSearch(true)
    if (data.length > 0) {
      setUserList(data)
      setLoading(false)
    }
  }
  const [searched, setSearched] = useState('')
  // Debounce
  const debouncedSearch = useDebounce(searched, 1000);
  useEffect(() => {
    if (debouncedSearch === '') {
      setUserList(true)
      async function fetchData() {
        const { data, nextPageSince } = await getUsers(0)
        setUserList(data)
        setNextPage(nextPageSince)
        setLoading(false)
      }
      fetchData()
      return
    }

    userByName(debouncedSearch)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearch])
  // Filtrado de favoritos

  return (<>
    <Toaster position="top-right" />
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        padding: '20px',
        marginTop: '20px',
      }}
    >
      <input onChange={(e) => setSearched(e.target.value)} type="text" placeholder='Filtrar por nombre' value={searched} />

      {
        loading ? <p>Cargando...</p> :
          userList.length > 0 &&
          userList.map((user, index) => (
            <Container key={user.id}>
              <ImageContainer
                priority
                src={user.avatar_url}
                width={200}
                height={200}
                alt={user.login}
              />
              <Datauser>
                <h3>@{user.login}</h3>
                <div>

                  <FaGithub />
                  <Link href={user.html_url} target='_blank'>
                    {user.html_url}
                  </Link>
                </div>
              </Datauser>
              <ButtonView href={`/user/${user.login}`}> Ir a perfil</ButtonView>
            </Container>
          ))}
      <button onClick={() => getMoreUsers(nextPage)}>
        Cargar mas
      </button>
    </div>
  </>

  )
}

export default UserList


