import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card'
import { ChevronDown, ChevronRight } from 'lucide-react'
import type { FeatureModule } from '../types/miniprogram.types'

interface ModuleCardProps {
  module: FeatureModule
}

export default function ModuleCard({ module }: ModuleCardProps) {
  const [expandedFeatures, setExpandedFeatures] = useState<Set<string>>(new Set())

  const toggleFeature = (featureId: string) => {
    const newExpanded = new Set(expandedFeatures)
    if (newExpanded.has(featureId)) {
      newExpanded.delete(featureId)
    } else {
      newExpanded.add(featureId)
    }
    setExpandedFeatures(newExpanded)
  }

  return (
    <Card className="border-2">
      <CardHeader className="bg-muted/50">
        <CardTitle className="flex items-center gap-2 text-xl">
          <span className="text-2xl">{getModuleIcon(module.id)}</span>
          {module.name}
        </CardTitle>
        <p className="text-sm text-muted-foreground mt-2">{module.description}</p>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="space-y-4">
          {module.features.map((feature) => {
            const isExpanded = expandedFeatures.has(feature.id)

            return (
              <div key={feature.id} className="border rounded-lg p-4 hover:bg-muted/30 transition-colors">
                <button
                  onClick={() => toggleFeature(feature.id)}
                  className="w-full text-left flex items-start gap-2"
                >
                  <div className="mt-1 text-muted-foreground">
                    {isExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-base">{feature.name}</h4>
                    <p className="text-sm text-muted-foreground mt-1">{feature.description}</p>
                    <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                      <span>{feature.screens.length} 个设计页面</span>
                      {feature.subFeatures && <span>• {feature.subFeatures.length} 个子功能</span>}
                    </div>
                  </div>
                </button>

                {isExpanded && (
                  <div className="mt-4 ml-6 space-y-4 border-l-2 border-muted pl-4">
                    {feature.subFeatures && feature.subFeatures.length > 0 && (
                      <div>
                        <h5 className="text-sm font-semibold mb-2">子功能</h5>
                        <div className="space-y-2">
                          {feature.subFeatures.map((sub, idx) => (
                            <div key={idx} className="text-sm">
                              <div className="font-medium">{sub.name}</div>
                              <div className="text-muted-foreground text-xs mt-0.5">{sub.description}</div>
                              {sub.screens && sub.screens.length > 0 && (
                                <div className="text-xs text-muted-foreground mt-1">
                                  页面: {sub.screens.join(', ')}
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {feature.interactions && feature.interactions.length > 0 && (
                      <div>
                        <h5 className="text-sm font-semibold mb-2">交互说明</h5>
                        <ul className="space-y-1">
                          {feature.interactions.map((interaction, idx) => (
                            <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                              <span className="text-primary">•</span>
                              <span>{interaction}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {feature.businessRules && feature.businessRules.length > 0 && (
                      <div>
                        <h5 className="text-sm font-semibold mb-2">业务规则</h5>
                        <ul className="space-y-1">
                          {feature.businessRules.map((rule, idx) => (
                            <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                              <span className="text-amber-600">✓</span>
                              <span>{rule}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {feature.screens.length > 0 && (
                      <div>
                        <h5 className="text-sm font-semibold mb-2">设计页面</h5>
                        <div className="flex flex-wrap gap-2">
                          {feature.screens.map((screen, idx) => (
                            <span
                              key={idx}
                              className="text-xs bg-primary/10 text-primary px-2 py-1 rounded"
                            >
                              {screen}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}

function getModuleIcon(moduleId: string): string {
  const icons: Record<string, string> = {
    home: '🏠',
    'search-booking': '🔍',
    membership: '👑',
    favorites: '❤️',
    profile: '👤',
    order: '📋',
    auth: '🔐',
    merchant: '🏪',
    misc: '⚙️'
  }
  return icons[moduleId] || '📱'
}
