
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