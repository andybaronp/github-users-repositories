import Repository from "@/components/repositories/Repository"
import { getRepository } from "@/utils/api"


const page = async ({ params }) => {
  const { id, repository } = params;
  const repo = await getRepository(id, repository)
  return (
    <Repository repo={repo} />
  )
}

export default page