/**
 *
 * @param {repo} repositorio a guardar o eliminar
 */
const tooggleFavorites = (repo) => {
  const repository = {
    id: repo.id,
    name: repo.name,
    description: repo.description,
    url: repo.html_url,
    created_at: repo.created_at,
    language: repo.language,
    homepage: repo.homepage,
    watchers: repo.watchers,
    open_issues: repo.open_issues,
    forks: repo.forks,
    clone_url: repo.clone_url,
    html_url: repo.html_url,
    created_at: repo.created_at,
    updated_at: repo.updated_at,
    owner: {
      login: repo.owner.login,
      avatar_url: repo.owner.avatar_url,
    },
  }

  let favorites = JSON.parse(localStorage.getItem('reposfavorites') || '[]')

  if (favorites.some((someRepo) => someRepo.id === repo.id)) {
    favorites = favorites.filter((repository) => repository.id !== repo.id)
  } else {
    favorites.push(repository)
  }

  localStorage.setItem('reposfavorites', JSON.stringify(favorites))
}

/**
 *
 * @param {ID} a consultar en varotio
 */
const existInFavorites = (id) => {
  const favorites = JSON.parse(localStorage.getItem('reposfavorites') || '[]')
  return favorites.some((someRepo) => someRepo.id === id)
}

/**
 *
 * @returns lista de repositorios guardados
 */
const favoriteRepositories = () => {
  return JSON.parse(localStorage.getItem('reposfavorites') || '[]')
}

/**
 *Funcion para guardar o eliminar un repositorio
 */
const handleSaveFavoriteRepository = (repository) => {
  tooggleFavorites(repository)
}
// eslint-disable-next-line import/no-anonymous-default-export
export default {
  tooggleFavorites,
  favoriteRepositories,
  existInFavorites,
  handleSaveFavoriteRepository,
}
