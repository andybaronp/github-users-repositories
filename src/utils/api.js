
export const GITHUB_API_BASE_URL = 'https://api.github.com/'

/**
 * 
 * @param {URL a consultar} url 
 * @returns fecht con la url
 */
export const getAllDataGet = async (url) => {
  const config = {
    caches: 'no-cache',
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`
    }
  }
  return fetch(url, config)
}


/**
 * 
 * @param {since} pagina
 * @returns lista de usuarios con la pagina
 */
export const getUsers = async (since = 0) => {
  try {
    const response = await getAllDataGet(`https://api.github.com/users?per_page=15&since=${since}`)
    const pagination = response.headers.get('link')
    const nextPageLink = pagination.split(';')[0].slice(0, -1)
    const indexOfSince = nextPageLink.indexOf('since=')
    const nextPageSince = nextPageLink.substring(indexOfSince + 6)
    const data = await response.json()
    return {
      data,
      nextPageSince,
    }

  } catch (error) {
    return {
      data: [],
      error: true,
      nextPageSince: 0,
    }
  }
}


/**
 * 
 * @param {name} nombre del usuario a buscar
 * @returns  lista de usuarios con el nombre buscado
 */
export const getUsersByName = async (name) => {
  try {
    const response = await getAllDataGet(`https://api.github.com/search/users?q=${name}&per_page=25`)

    const { items, total_count } = await response.json()
    return {
      data: items,
      error: response.statusText,
      total_count
    }

  } catch (error) {
    return {
      data: [],
      error: true,
    }
  }
}

/**
 * 
 * @param {id} usuario dueño del repositorio
 
 * @param {repository} repositorio a consultar 
 * @returns 
 */
export const getRepository = async (id, repository) => {
  const response = await getAllDataGet(`${GITHUB_API_BASE_URL}repos/${id}/${repository}`)
  const repositoryData = await response.json()
  return repositoryData
}

/**
 * 
 * @param {username} username a consultar
 * @returns  lista de repositorios del usuario
 */
export const getUserRepositories = async (id, page = 1) => {
  try {
    const response = await getAllDataGet(`${GITHUB_API_BASE_URL}users/${id}/repos?per_page=15&page=${page}`, {
      caches: 'no-cache'
    })
    const pagination = response.headers.get('link')
    const repositories = await response.json()

    return {
      repositories,
      pagination,
      error: false
    }

  } catch (error) {
    return {
      repositories: [],
      error: false,
    }
  }
}