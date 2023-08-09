import Link from "next/link";
const Repositories = ({ repositories }) => {

  return (
    <div>
      <h3>Repositorios</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {
          repositories.map((repo) => {

            return (
              <div key={repo.id} style={{ border: '1px solid #ccc', padding: '10px', borderRadius: '10px', display: 'flex', flexDirection: 'column', gap: '10px' }} >
                <Link href={`/user/${repo.owner.login}/repository/${repo.name}`}>
                  <div>ID: {repo.id}</div>
                  <div>Name: {repo.name} </div>
                  <div>description: {repo.description}</div>
                  <div>created_at: {repo.created_at}</div>
                  <div>language: {repo.language}</div>
                </Link>

              </div>
            )
          }
          )
        }
      </div>
    </div>
  )
}

export default Repositories;