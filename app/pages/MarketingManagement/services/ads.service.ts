/**
 * 广告管理服务层
 */

import type {
  AdPosition,
  Advertisement,
  AdFormData,
  AdPositionUpdateData,
  HomeBanner,
  BannerFormData,
} from '../types/ads.types'
import { mockAdPositions, mockAdvertisements, mockHomeBanners } from './mocks'

class AdsService {
  private adPositions: AdPosition[] = [...mockAdPositions]
  private advertisements: Advertisement[] = [...mockAdvertisements]
  private banners: HomeBanner[] = [...mockHomeBanners]
  private nextAdId = 7 // 下一个广告ID序号
  private nextBannerId = 4 // 下一个Banner ID序号

  // ========== 广告位相关 ==========

  /**
   * 获取所有广告位
   */
  async getAllPositions(): Promise<AdPosition[]> {
    await new Promise((resolve) => setTimeout(resolve, 300))
    return [...this.adPositions]
  }

  /**
   * 根据ID获取广告位
   */
  async getPositionById(id: string): Promise<AdPosition | null> {
    await new Promise((resolve) => setTimeout(resolve, 200))
    return this.adPositions.find((pos) => pos.id === id) || null
  }

  /**
   * 更新广告位配置
   */
  async updatePosition(
    id: string,
    data: AdPositionUpdateData
  ): Promise<AdPosition> {
    await new Promise((resolve) => setTimeout(resolve, 300))

    const index = this.adPositions.findIndex((pos) => pos.id === id)
    if (index === -1) {
      throw new Error('广告位不存在')
    }

    this.adPositions[index] = {
      ...this.adPositions[index],
      ...data,
    }

    return this.adPositions[index]
  }

  // ========== 广告内容相关 ==========

  /**
   * 获取指定广告位的所有广告(按order排序)
   */
  async getAdsByPosition(positionId: string): Promise<Advertisement[]> {
    await new Promise((resolve) => setTimeout(resolve, 400))
    return this.advertisements
      .filter((ad) => ad.positionId === positionId)
      .sort((a, b) => a.order - b.order)
  }

  /**
   * 根据ID获取广告
   */
  async getAdById(id: string): Promise<Advertisement | null> {
    await new Promise((resolve) => setTimeout(resolve, 200))
    return this.advertisements.find((ad) => ad.id === id) || null
  }

  /**
   * 创建广告
   */
  async createAd(
    positionId: string,
    data: AdFormData
  ): Promise<Advertisement> {
    await new Promise((resolve) => setTimeout(resolve, 500))

    const position = this.adPositions.find((pos) => pos.id === positionId)
    if (!position) {
      throw new Error('广告位不存在')
    }

    // 计算新广告的order(当前广告位最大order + 1)
    const positionAds = this.advertisements.filter(
      (ad) => ad.positionId === positionId
    )
    const maxOrder = positionAds.length > 0
      ? Math.max(...positionAds.map((ad) => ad.order))
      : 0

    const now = new Date().toLocaleString('en-US', {
      timeZone: 'America/Los_Angeles',
      year: '2-digit',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    })

    const newAd: Advertisement = {
      id: `ad-${String(this.nextAdId).padStart(3, '0')}`,
      positionId,
      ...data,
      order: maxOrder + 1,
      createdAt: now,
      updatedAt: now,
    }

    this.nextAdId++
    this.advertisements.push(newAd)

    return newAd
  }

  /**
   * 更新广告
   */
  async updateAd(id: string, data: Partial<AdFormData>): Promise<Advertisement> {
    await new Promise((resolve) => setTimeout(resolve, 400))

    const index = this.advertisements.findIndex((ad) => ad.id === id)
    if (index === -1) {
      throw new Error('广告不存在')
    }

    const now = new Date().toLocaleString('en-US', {
      timeZone: 'America/Los_Angeles',
      year: '2-digit',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    })

    this.advertisements[index] = {
      ...this.advertisements[index],
      ...data,
      updatedAt: now,
    }

    return this.advertisements[index]
  }

  /**
   * 删除广告
   */
  async deleteAd(id: string): Promise<void> {
    await new Promise((resolve) => setTimeout(resolve, 300))

    const index = this.advertisements.findIndex((ad) => ad.id === id)
    if (index === -1) {
      throw new Error('广告不存在')
    }

    const deletedAd = this.advertisements[index]
    this.advertisements.splice(index, 1)

    // 重新排序同一广告位的其他广告
    const positionAds = this.advertisements
      .filter((ad) => ad.positionId === deletedAd.positionId)
      .sort((a, b) => a.order - b.order)

    positionAds.forEach((ad, idx) => {
      ad.order = idx + 1
    })
  }

  /**
   * 更新广告排序
   * @param positionId 广告位ID
   * @param adIds 广告ID数组(按新的顺序)
   */
  async reorderAds(positionId: string, adIds: string[]): Promise<void> {
    await new Promise((resolve) => setTimeout(resolve, 300))

    adIds.forEach((adId, index) => {
      const ad = this.advertisements.find((a) => a.id === adId)
      if (ad && ad.positionId === positionId) {
        ad.order = index + 1
      }
    })
  }

  // ========== 首页Banner相关 ==========

  /**
   * 获取所有Banner
   */
  async getAllBanners(): Promise<HomeBanner[]> {
    await new Promise((resolve) => setTimeout(resolve, 300))
    return [...this.banners].sort((a, b) => a.order - b.order)
  }

  /**
   * 根据ID获取Banner
   */
  async getBannerById(id: string): Promise<HomeBanner | null> {
    await new Promise((resolve) => setTimeout(resolve, 200))
    return this.banners.find((b) => b.id === id) || null
  }

  /**
   * 创建Banner
   */
  async createBanner(data: BannerFormData): Promise<HomeBanner> {
    await new Promise((resolve) => setTimeout(resolve, 300))

    const now = new Date().toLocaleString('en-US', {
      month: '2-digit',
      day: '2-digit',
      year: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    }).replace(/(\d+)\/(\d+)\/(\d+),/, '$1/$2/$3')

    const newBanner: HomeBanner = {
      id: `banner-${String(this.nextBannerId).padStart(3, '0')}`,
      ...data,
      order: this.banners.length + 1,
      createdAt: now,
      updatedAt: now,
    }

    this.nextBannerId++
    this.banners.push(newBanner)

    return newBanner
  }

  /**
   * 更新Banner
   */
  async updateBanner(id: string, data: BannerFormData): Promise<HomeBanner> {
    await new Promise((resolve) => setTimeout(resolve, 300))

    const index = this.banners.findIndex((b) => b.id === id)
    if (index === -1) {
      throw new Error('Banner不存在')
    }

    const now = new Date().toLocaleString('en-US', {
      month: '2-digit',
      day: '2-digit',
      year: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    }).replace(/(\d+)\/(\d+)\/(\d+),/, '$1/$2/$3')

    this.banners[index] = {
      ...this.banners[index],
      ...data,
      updatedAt: now,
    }

    return this.banners[index]
  }

  /**
   * 删除Banner
   */
  async deleteBanner(id: string): Promise<void> {
    await new Promise((resolve) => setTimeout(resolve, 300))

    const index = this.banners.findIndex((b) => b.id === id)
    if (index === -1) {
      throw new Error('Banner不存在')
    }

    this.banners.splice(index, 1)

    // 重新排序
    this.banners.sort((a, b) => a.order - b.order)
    this.banners.forEach((banner, idx) => {
      banner.order = idx + 1
    })
  }

  /**
   * 更新Banner排序
   */
  async reorderBanners(bannerIds: string[]): Promise<void> {
    await new Promise((resolve) => setTimeout(resolve, 300))

    bannerIds.forEach((bannerId, index) => {
      const banner = this.banners.find((b) => b.id === bannerId)
      if (banner) {
        banner.order = index + 1
      }
    })
  }
}

export default new AdsService()
