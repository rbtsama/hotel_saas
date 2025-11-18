import type { FeatureModule, MembershipLevel } from '../types/miniprogram.types'
import { miniprogramModules, membershipLevels } from './mocks'

class MiniprogramService {
  private modules = [...miniprogramModules]
  private memberLevels = [...membershipLevels]

  async getAllModules(): Promise<FeatureModule[]> {
    await new Promise(resolve => setTimeout(resolve, 300))
    return this.modules
  }

  async getModuleById(id: string): Promise<FeatureModule | null> {
    await new Promise(resolve => setTimeout(resolve, 200))
    return this.modules.find(module => module.id === id) || null
  }

  async getMembershipLevels(): Promise<MembershipLevel[]> {
    await new Promise(resolve => setTimeout(resolve, 200))
    return this.memberLevels
  }

  async searchFeatures(keyword: string): Promise<FeatureModule[]> {
    await new Promise(resolve => setTimeout(resolve, 300))

    if (!keyword.trim()) {
      return this.modules
    }

    const lowerKeyword = keyword.toLowerCase()

    return this.modules
      .map(module => ({
        ...module,
        features: module.features.filter(feature =>
          feature.name.toLowerCase().includes(lowerKeyword) ||
          feature.description.toLowerCase().includes(lowerKeyword) ||
          (feature.subFeatures && feature.subFeatures.some(sub =>
            sub.name.toLowerCase().includes(lowerKeyword) ||
            sub.description.toLowerCase().includes(lowerKeyword)
          ))
        )
      }))
      .filter(module => module.features.length > 0)
  }

  getModuleSummary(): {
    totalModules: number
    totalFeatures: number
    totalScreens: number
  } {
    const totalModules = this.modules.length
    const totalFeatures = this.modules.reduce((sum, module) => sum + module.features.length, 0)
    const totalScreens = this.modules.reduce((sum, module) =>
      sum + module.features.reduce((fSum, feature) => fSum + feature.screens.length, 0), 0
    )

    return { totalModules, totalFeatures, totalScreens }
  }
}

export default new MiniprogramService()
