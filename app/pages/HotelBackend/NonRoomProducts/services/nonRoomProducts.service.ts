import type {
  NonRoomProduct,
  NonRoomProductFilterParams,
  NonRoomProductFormData
} from '../types/nonRoomProducts.types'
import { mockNonRoomProductsData } from './mocks'

class NonRoomProductsService {
  private mockData = [...mockNonRoomProductsData]

  async getList(params?: NonRoomProductFilterParams): Promise<NonRoomProduct[]> {
    await new Promise(resolve => setTimeout(resolve, 300))
    let filtered = [...this.mockData]

    if (params?.search) {
      filtered = filtered.filter(item =>
        item.productName.toLowerCase().includes(params.search!.toLowerCase()) ||
        item.productDescription.toLowerCase().includes(params.search!.toLowerCase())
      )
    }

    if (params?.productCategory) {
      filtered = filtered.filter(item => item.productCategory === params.productCategory)
    }

    // 按编号降序排序
    return filtered.sort((a, b) => b.sequenceNumber - a.sequenceNumber)
  }

  async getById(id: string): Promise<NonRoomProduct | null> {
    await new Promise(resolve => setTimeout(resolve, 200))
    return this.mockData.find(item => item.id === id) || null
  }

  async create(data: NonRoomProductFormData): Promise<NonRoomProduct> {
    await new Promise(resolve => setTimeout(resolve, 500))

    const newProduct: NonRoomProduct = {
      id: String(this.mockData.length + 1),
      sequenceNumber: this.mockData.length + 1,
      ...data,
      createdAt: new Date().toLocaleString('en-US', {
        month: '2-digit',
        day: '2-digit',
        year: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      }).replace(/(\d+)\/(\d+)\/(\d+),/, '$1/$2/$3')
    }

    this.mockData.push(newProduct)
    return newProduct
  }

  async update(id: string, data: Partial<NonRoomProductFormData>): Promise<NonRoomProduct | null> {
    await new Promise(resolve => setTimeout(resolve, 400))

    const index = this.mockData.findIndex(item => item.id === id)
    if (index === -1) return null

    this.mockData[index] = {
      ...this.mockData[index],
      ...data
    }

    return this.mockData[index]
  }

  async delete(id: string): Promise<boolean> {
    await new Promise(resolve => setTimeout(resolve, 300))

    const index = this.mockData.findIndex(item => item.id === id)
    if (index === -1) return false

    this.mockData.splice(index, 1)
    return true
  }
}

export default new NonRoomProductsService()
