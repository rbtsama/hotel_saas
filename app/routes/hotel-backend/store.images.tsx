import { json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import StoreImagesPage from '~/pages/HotelBackend/StoreImagesPage'

export async function loader() {
  return json({
    shareImage: 'https://picsum.photos/500/400?random=share1',
    shareTitle: '桐庐原乡芦荻',
    homeImages: [
      'https://picsum.photos/600/900?random=home1',
      'https://picsum.photos/600/900?random=home2',
      'https://picsum.photos/600/900?random=home3',
      'https://picsum.photos/600/900?random=home4',
      'https://picsum.photos/600/900?random=home5',
    ],
  })
}

export default function StoreImagesRoute() {
  const data = useLoaderData<typeof loader>()
  return <StoreImagesPage {...data} />
}
