
export const GITHUB_API_BASE_URL = 'https://api.github.com'

/**
 * 
 * @param {URL a consultar} url 
 * @returns fecht con la url
 */
export const getAllDataGet = async (url) => {
  const config = {
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
    const pagination = response.headers.get('link')
    const nextPageLink = pagination.split(';')[1].slice(0, -1)
    const indexOfSince = nextPageLink.indexOf('15&page=')
    const nextPageSince = nextPageLink.substring(indexOfSince + 8)
    const { items } = await response.json()
    return {
      data: items,
      error: response.statusText,
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
 * @param {id} usuario dueño del repositorio
 
 * @param {repository} repositorio a consultar 
 * @returns 
 */
export const getRepository = async (id, repository) => {
  const response = await getAllDataGet(`${GITHUB_API_BASE_URL}/repos/${id}/${repository}`)
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
    const response = await getAllDataGet(`${GITHUB_API_BASE_URL}/users/${id}/repos?per_page=15&page=${page}`, {
      caches: 'no-cache'
    })
    const pagination = response.headers.get('link')
    const lastPageLink = pagination.split(',')
    const includeNext = lastPageLink.find(link => link.includes('next')).split(';')[0]
    const indexOfSince = includeNext.indexOf('15&page=')
    const nextPageSince = includeNext.substring(indexOfSince + 8)
    const nextPage = nextPageSince.slice(0, -1)

    const includeLast = lastPageLink.find(link => link.includes('last')).split(';')[0]
    const indexOfLastSince = includeLast.indexOf('15&page=')
    const lastPageSince = includeLast.substring(indexOfLastSince + 8)
    const lastPage = lastPageSince.slice(0, -1)
    // const includeLast = lastPageLink.find(link => link.includes('last')).slice(0, -1)
    // const indexOfLastSince = includeNext.split('=')
    // const lastPage = indexOfLastSince[indexOfLastSince.length - 1]
    const repositories = await response.json()

    return {
      repositories,
      nextPage: nextPage,
      lastPage: lastPage,
      error: false
    }

  } catch (error) {
    return {
      repositories: [],
      error: false,
    }
  }
}