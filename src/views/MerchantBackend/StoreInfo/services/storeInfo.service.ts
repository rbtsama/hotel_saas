import type {
  StoreInfo,
  BasicInfo,
  PolicyInfo,
  FacilityInfo,
  SurroundingInfo,
  NearbyLocation,
  BreakfastPolicy,
  ExtraBedPolicy,
  ImageInfo,
} from '../types/storeInfo.types'
import { mockStoreInfo } from './mocks'

class StoreInfoService {
  private storeData: StoreInfo = { ...mockStoreInfo }

  // 模拟API延迟
  private delay(ms: number = 300): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms))
  }

  // ==================== 获取完整门店信息 ====================
  async getStoreInfo(): Promise<StoreInfo> {
    await this.delay()
    return { ...this.storeData }
  }

  // ==================== 基本信息 ====================
  async getBasicInfo(): Promise<BasicInfo> {
    await this.delay()
    return { ...this.storeData.basicInfo }
  }

  async updateBasicInfo(data: Partial<BasicInfo>): Promise<BasicInfo> {
    await this.delay(500)
    // 锁定字段不允许更新
    const { name, city, address, hotelCategory, roomCount, ...updatableFields } = data
    this.storeData.basicInfo = {
      ...this.storeData.basicInfo,
      ...updatableFields,
    }
    this.storeData.updatedAt = new Date().toLocaleString('en-US', {
      month: '2-digit',
      day: '2-digit',
      year: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    })
    return { ...this.storeData.basicInfo }
  }

  // ==================== 政策相关 ====================
  async getPolicyInfo(): Promise<PolicyInfo> {
    await this.delay()
    return { ...this.storeData.policyInfo }
  }

  async updatePolicyInfo(data: Partial<PolicyInfo>): Promise<PolicyInfo> {
    await this.delay(500)
    this.storeData.policyInfo = {
      ...this.storeData.policyInfo,
      ...data,
    }
    this.storeData.updatedAt = new Date().toLocaleString('en-US', {
      month: '2-digit',
      day: '2-digit',
      year: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    })
    return { ...this.storeData.policyInfo }
  }

  // ==================== 门店设施 ====================
  async getFacilityInfo(): Promise<FacilityInfo> {
    await this.delay()
    return { ...this.storeData.facilityInfo }
  }

  async updateFacilityInfo(data: Partial<FacilityInfo>): Promise<FacilityInfo> {
    await this.delay(500)
    this.storeData.facilityInfo = {
      ...this.storeData.facilityInfo,
      ...data,
    }
    this.storeData.updatedAt = new Date().toLocaleString('en-US', {
      month: '2-digit',
      day: '2-digit',
      year: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    })
    return { ...this.storeData.facilityInfo }
  }

  // ==================== 周边信息 ====================
  async getSurroundingInfo(): Promise<SurroundingInfo> {
    await this.delay()
    return { ...this.storeData.surroundingInfo }
  }

  async updateSurroundingInfo(data: Partial<SurroundingInfo>): Promise<SurroundingInfo> {
    await this.delay(500)
    this.storeData.surroundingInfo = {
      ...this.storeData.surroundingInfo,
      ...data,
    }
    this.storeData.updatedAt = new Date().toLocaleString('en-US', {
      month: '2-digit',
      day: '2-digit',
      year: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    })
    return { ...this.storeData.surroundingInfo }
  }

  async addNearbyLocation(location: Omit<NearbyLocation, 'id'>): Promise<NearbyLocation> {
    await this.delay(500)
    const newLocation: NearbyLocation = {
      ...location,
      id: `loc-${Date.now()}`,
    }
    this.storeData.surroundingInfo.locations.push(newLocation)
    this.storeData.updatedAt = new Date().toLocaleString('en-US', {
      month: '2-digit',
      day: '2-digit',
      year: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    })
    return newLocation
  }

  async updateNearbyLocation(
    id: string,
    data: Partial<Omit<NearbyLocation, 'id'>>
  ): Promise<NearbyLocation | null> {
    await this.delay(500)
    const index = this.storeData.surroundingInfo.locations.findIndex((loc) => loc.id === id)
    if (index === -1) return null

    this.storeData.surroundingInfo.locations[index] = {
      ...this.storeData.surroundingInfo.locations[index],
      ...data,
    }
    this.storeData.updatedAt = new Date().toLocaleString('en-US', {
      month: '2-digit',
      day: '2-digit',
      year: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    })
    return { ...this.storeData.surroundingInfo.locations[index] }
  }

  async deleteNearbyLocation(id: string): Promise<boolean> {
    await this.delay(500)
    const index = this.storeData.surroundingInfo.locations.findIndex((loc) => loc.id === id)
    if (index === -1) return false

    this.storeData.surroundingInfo.locations.splice(index, 1)
    this.storeData.updatedAt = new Date().toLocaleString('en-US', {
      month: '2-digit',
      day: '2-digit',
      year: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    })
    return true
  }

  // ==================== 早餐政策 ====================
  async getBreakfastPolicy(): Promise<BreakfastPolicy> {
    await this.delay()
    return { ...this.storeData.breakfastPolicy }
  }

  async updateBreakfastPolicy(data: Partial<BreakfastPolicy>): Promise<BreakfastPolicy> {
    await this.delay(500)
    this.storeData.breakfastPolicy = {
      ...this.storeData.breakfastPolicy,
      ...data,
    }
    this.storeData.updatedAt = new Date().toLocaleString('en-US', {
      month: '2-digit',
      day: '2-digit',
      year: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    })
    return { ...this.storeData.breakfastPolicy }
  }

  // ==================== 加床政策 ====================
  async getExtraBedPolicy(): Promise<ExtraBedPolicy> {
    await this.delay()
    return { ...this.storeData.extraBedPolicy }
  }

  async updateExtraBedPolicy(data: Partial<ExtraBedPolicy>): Promise<ExtraBedPolicy> {
    await this.delay(500)
    this.storeData.extraBedPolicy = {
      ...this.storeData.extraBedPolicy,
      ...data,
    }
    this.storeData.updatedAt = new Date().toLocaleString('en-US', {
      month: '2-digit',
      day: '2-digit',
      year: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    })
    return { ...this.storeData.extraBedPolicy }
  }

  // ==================== 门店图片 ====================
  async getImageInfo(): Promise<ImageInfo> {
    await this.delay()
    return { ...this.storeData.imageInfo }
  }

  async updateImageInfo(data: Partial<ImageInfo>): Promise<ImageInfo> {
    await this.delay(500)
    this.storeData.imageInfo = {
      ...this.storeData.imageInfo,
      ...data,
    }
    this.storeData.updatedAt = new Date().toLocaleString('en-US', {
      month: '2-digit',
      day: '2-digit',
      year: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    })
    return { ...this.storeData.imageInfo }
  }

  // 仅更新分享文案
  async updateShareText(shareText: string): Promise<string> {
    await this.delay(300)
    this.storeData.imageInfo.shareText = shareText
    return shareText
  }
}

export default new StoreInfoService()
