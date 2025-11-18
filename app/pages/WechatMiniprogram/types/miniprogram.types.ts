export interface FeatureModule {
  id: string
  name: string
  description: string
  features: Feature[]
}

export interface Feature {
  id: string
  name: string
  description: string
  screens: string[]
  subFeatures?: SubFeature[]
  interactions?: string[]
  businessRules?: string[]
}

export interface SubFeature {
  name: string
  description: string
  screens?: string[]
}

export interface NavigationFlow {
  from: string
  to: string
  action: string
  condition?: string
}

export interface UserRole {
  id: string
  name: string
  permissions: string[]
}

export interface MembershipLevel {
  level: string
  name: string
  requirements: string
  validity: string
  benefits: string[]
  conditions?: string[]
}
