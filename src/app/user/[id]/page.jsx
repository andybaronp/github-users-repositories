import Repositories from '@/components/repositories/Repositories'
import UserCard from '@/components/user/UserCard'
import { GITHUB_API_BASE_URL, getAllDataGet } from '@/utils/api'
import Link from 'next/link'
import { FaArrowLeftLong, } from 'react-icons/fa6'

const getUserByID = async (id) => {
  const response = await getAllDataGet(`${GITHUB_API_BASE_URL}users/${id}`)
  const user = await response.json()
  return user
}
export const metadata = {
  title: `Perfil de usuario`,
  description: 'Search repositories on Github ',
}

const page = async ({ params }) => {
  const { id } = params
  const user = await getUserByID(id)
  return (
    <div className='flex flex-col items-center '>
      <Link href='/' className='self-start pb-3 ml-4 underline '>
        <FaArrowLeftLong />
      </Link>
      <UserCard user={user} />
      <div className='mb-1 '>
        <Repositories userRepositories={id} />
      </div>
    </div>
  )
}

export default page
