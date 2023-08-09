import Favorites from '@/components/ui/Favorites'
export const metadata = {
  title: `Favoritos`,
  description: 'Search repositories on Github ',
}
const page = () => {
  return (
    <div>
      <Favorites />
    </div>
  )
}

export default page
