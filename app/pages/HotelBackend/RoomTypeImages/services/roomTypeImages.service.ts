import type { RoomTypeImages, RoomTypeImagesFilterParams, RoomImage } from '../types/roomTypeImages.types'
import { mockRoomTypeImagesData } from './mocks'

class RoomTypeImagesService {
  private mockData = [...mockRoomTypeImagesData]

  async getList(params?: RoomTypeImagesFilterParams): Promise<RoomTypeImages[]> {
    await new Promise(resolve => setTimeout(resolve, 300))
    let filtered = [...this.mockData]

    if (params?.search) {
      filtered = filtered.filter(item =>
        item.roomTypeName.toLowerCase().includes(params.search!.toLowerCase())
      )
    }

    if (params?.buildingNumber) {
      filtered = filtered.filter(item => item.buildingNumber === params.buildingNumber)
    }

    return filtered
  }

  async getById(id: string): Promise<RoomTypeImages | null> {
    await new Promise(resolve => setTimeout(resolve, 200))
    return this.mockData.find(item => item.id === id) || null
  }

  async uploadImage(roomTypeId: string, imageFile: File): Promise<RoomImage> {
    await new Promise(resolve => setTimeout(resolve, 500))

    // 模拟图片上传，生成URL
    const newImage: RoomImage = {
      id: `img-${Date.now()}`,
      url: URL.createObjectURL(imageFile),
      thumbnail: URL.createObjectURL(imageFile)
    }

    const roomType = this.mockData.find(item => item.id === roomTypeId)
    if (roomType) {
      roomType.images.push(newImage)
    }

    return newImage
  }

  async deleteImage(roomTypeId: string, imageId: string): Promise<boolean> {
    await new Promise(resolve => setTimeout(resolve, 300))

    const roomType = this.mockData.find(item => item.id === roomTypeId)
    if (roomType) {
      roomType.images = roomType.images.filter(img => img.id !== imageId)
      return true
    }

    return false
  }

  async reorderImages(roomTypeId: string, imageIds: string[]): Promise<boolean> {
    await new Promise(resolve => setTimeout(resolve, 300))

    const roomType = this.mockData.find(item => item.id === roomTypeId)
    if (roomType) {
      const reorderedImages = imageIds
        .map(id => roomType.images.find(img => img.id === id))
        .filter((img): img is RoomImage => img !== undefined)

      roomType.images = reorderedImages
      return true
    }

    return false
  }
}

export default new RoomTypeImagesService()
