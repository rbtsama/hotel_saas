import { json, type LoaderFunctionArgs, type ActionFunctionArgs } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"
import RoomTypeImagesPage from "~/pages/HotelBackend/RoomTypeImages/RoomTypeImagesPage"
import RoomTypeImagesService from "~/pages/HotelBackend/RoomTypeImages/services/roomTypeImages.service"
import type { RoomTypeImages } from "~/pages/HotelBackend/RoomTypeImages/types/roomTypeImages.types"

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url)
  const search = url.searchParams.get("search") || undefined
  const buildingNumber = url.searchParams.get("buildingNumber") || undefined

  try {
    const roomTypes = await RoomTypeImagesService.getList({ search, buildingNumber })
    return json({ roomTypes, error: null })
  } catch (error) {
    return json({ roomTypes: [], error: "加载房型图片失败" }, { status: 500 })
  }
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData()
  const intent = formData.get("intent")
  const roomTypeId = formData.get("roomTypeId") as string
  const imageId = formData.get("imageId") as string

  try {
    if (intent === "delete") {
      await RoomTypeImagesService.deleteImage(roomTypeId, imageId)
      return json({ success: true, error: null })
    }

    if (intent === "upload") {
      const imageFile = formData.get("image") as File
      if (!imageFile || imageFile.size === 0) {
        return json({ success: false, error: "请选择图片文件" }, { status: 400 })
      }

      const newImage = await RoomTypeImagesService.uploadImage(roomTypeId, imageFile)
      return json({ success: true, image: newImage, error: null })
    }

    return json({ success: false, error: "无效的操作" }, { status: 400 })
  } catch (error) {
    return json({ success: false, error: "操作失败" }, { status: 500 })
  }
}

export default function RoomTypeImagesRoute() {
  const { roomTypes, error } = useLoaderData<typeof loader>()
  return <RoomTypeImagesPage roomTypes={(roomTypes as RoomTypeImages[]) || []} error={error} />
}
