export const formatDate = (day) => {
  const newDay = new Date(day)
  const options = {
    year: 'numeric',
    month: 'long',
    day: '2-digit',
  }

  return newDay.toLocaleDateString('es-ES', options)
}
