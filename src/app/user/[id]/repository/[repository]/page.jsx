import Repository from "@/components/repositories/Repository"
import { getRepository } from "@/utils/api"

export const metadata = {
  title: `Repositorios`,
  description: 'Search repositories on Github ',
}

const page = async ({ params }) => {
  const { id, repository } = params;
  const repo = await getRepository(id, repository)
  return (
    <Repository repo={repo} />
  )
}

export default page