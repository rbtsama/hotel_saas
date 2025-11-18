/**
 * 广告管理页面
 */

import { useState } from 'react'
import type { AdPosition, Advertisement, HomeBanner } from './types/ads.types'
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card'
import { Button } from '~/components/ui/button'
import { Select } from '~/components/ui/select'
import MainLayout from '../PointsSystem/components/MainLayout'
import AdPositionSettings from './components/AdPositionSettings'
import AdList from './components/AdList'
import AdFormDialog from './components/AdFormDialog'
import HomeBannerSection from './components/HomeBannerSection'

interface AdsManagementPageProps {
  positions: AdPosition[]
  currentPosition: AdPosition | null
  advertisements: Advertisement[]
  banners: HomeBanner[]
}

export default function AdsManagementPage({
  positions,
  currentPosition,
  advertisements,
  banners,
}: AdsManagementPageProps) {
  const [selectedPositionId, setSelectedPositionId] = useState<string>(
    currentPosition?.id || (positions[0]?.id ?? '')
  )
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingAd, setEditingAd] = useState<Advertisement | null>(null)

  const selectedPosition = positions.find((p) => p.id === selectedPositionId)

  const handlePositionChange = (positionId: string) => {
    setSelectedPositionId(positionId)
    // 页面会通过URL变化重新加载数据
    window.location.href = `/marketing/ads?position=${positionId}`
  }

  const handleCreateAd = () => {
    setEditingAd(null)
    setIsFormOpen(true)
  }

  const handleEditAd = (ad: Advertisement) => {
    setEditingAd(ad)
    setIsFormOpen(true)
  }

  return (
    <MainLayout>
      <div className="h-screen overflow-y-auto bg-slate-50">
        <div className="p-6 space-y-6">
        {/* 页面标题 */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">广告管理</h1>
            <p className="text-sm text-slate-500 mt-1">
              管理不同广告位的广告内容、轮播设置和展示规则
            </p>
          </div>
        </div>

        {/* 广告位选择器 */}
        <Card>
          <CardHeader>
            <CardTitle>选择广告位</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-3">
              {positions.map((position) => (
                <Button
                  key={position.id}
                  variant={position.id === selectedPositionId ? 'default' : 'outline'}
                  onClick={() => handlePositionChange(position.id)}
                >
                  {position.name}
                  {!position.enabled && (
                    <span className="ml-2 text-xs opacity-70">(已禁用)</span>
                  )}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* 广告位设置 */}
        {selectedPosition && (
          <AdPositionSettings
            position={selectedPosition}
            positionId={selectedPositionId}
          />
        )}

        {/* 广告列表 */}
        {selectedPosition && (
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>{selectedPosition.name} - 广告内容</CardTitle>
                  <p className="text-sm text-slate-500 mt-1">
                    共 {advertisements.length} 条广告
                  </p>
                </div>
                <Button onClick={handleCreateAd}>新增广告</Button>
              </div>
            </CardHeader>
            <CardContent>
              <AdList
                advertisements={advertisements}
                positionId={selectedPositionId}
                onEdit={handleEditAd}
              />
            </CardContent>
          </Card>
        )}

        {/* 首页Banner管理 */}
        <HomeBannerSection banners={banners} />

        {/* 广告表单弹窗 */}
        <AdFormDialog
          open={isFormOpen}
          onOpenChange={setIsFormOpen}
          positionId={selectedPositionId}
          editingAd={editingAd}
        />
        </div>
      </div>
    </MainLayout>
  )
}
