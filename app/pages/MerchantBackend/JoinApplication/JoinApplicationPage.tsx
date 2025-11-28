/**
 * 商户端 - 入驻申请页面
 *
 * 设计理念：极致的表单体验
 * - 简洁明了，一目了然
 * - 必填/选填通过视觉区分
 * - 智能显隐，减少干扰
 * - 拖拽上传，实时预览
 */

import { useState } from 'react'
import { useNavigation } from '@remix-run/react'
import type { JoinApplicationForm, RoomTypeImages } from './types/joinApplication.types'
import {
  StoreType,
  StoreTypeLabels,
  OTAPlatform,
  OTAPlatformLabels,
  OTAChallenge,
  OTAChallengeLabels,
} from './types/joinApplication.types'
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card'
import { Input } from '~/components/ui/input'
import { Label } from '~/components/ui/label'
import { Button } from '~/components/ui/button'
import { Textarea } from '~/components/ui/textarea'
import { Checkbox } from '~/components/ui/checkbox'
import { Plus, X, Upload, Image as ImageIcon } from 'lucide-react'
import MainLayout from '~/pages/PointsSystem/components/MainLayout'

export default function JoinApplicationPage() {
  const navigation = useNavigation()
  const isSubmitting = navigation.state === 'submitting'

  // 表单数据
  const [formData, setFormData] = useState<Partial<JoinApplicationForm>>({
    adminPhone: '',
    adminName: '',
    storeName: '',
    storeType: undefined,
    bookingPlatform: '',
    storeAddress: '',
    storeDescription: '',
    hasOTASpecialist: false,
    otaContactName: '',
    otaContactPhone: '',
    onlinePlatforms: [],
    hasCtripSpecialOffer: false,
    interestedPlatforms: [],
    otaChallenges: [],
    roomTypeImages: [],
  })

  // 房型图片管理（默认有一个空房型）
  const [roomTypes, setRoomTypes] = useState<RoomTypeImages[]>([
    { roomTypeName: '', images: [] }
  ])

  // 图片拖拽状态
  const [dragIndex, setDragIndex] = useState<number | null>(null)

  const addRoomType = () => {
    setRoomTypes([...roomTypes, { roomTypeName: '', images: [] }])
  }

  const removeRoomType = (index: number) => {
    if (roomTypes.length > 1) {
      setRoomTypes(roomTypes.filter((_, i) => i !== index))
    }
  }

  const updateRoomTypeName = (index: number, name: string) => {
    const updated = [...roomTypes]
    updated[index].roomTypeName = name
    setRoomTypes(updated)
  }

  // 处理图片拖拽上传
  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault()
    setDragIndex(index)
  }

  const handleDragLeave = () => {
    setDragIndex(null)
  }

  const handleDrop = (e: React.DragEvent, index: number) => {
    e.preventDefault()
    setDragIndex(null)

    const files = Array.from(e.dataTransfer.files).filter(file =>
      file.type.startsWith('image/')
    )

    if (files.length > 0) {
      // 模拟图片URL（实际应上传到服务器）
      const newImages = files.map(file => URL.createObjectURL(file))
      const updated = [...roomTypes]
      updated[index].images = [...updated[index].images, ...newImages]
      setRoomTypes(updated)
    }
  }

  const removeImage = (roomIndex: number, imageIndex: number) => {
    const updated = [...roomTypes]
    updated[roomIndex].images = updated[roomIndex].images.filter((_, i) => i !== imageIndex)
    setRoomTypes(updated)
  }

  // 多选切换
  const togglePlatform = (field: 'onlinePlatforms' | 'interestedPlatforms', platform: OTAPlatform) => {
    const current = formData[field] || []
    const updated = current.includes(platform)
      ? current.filter((p) => p !== platform)
      : [...current, platform]
    setFormData({ ...formData, [field]: updated })
  }

  const toggleChallenge = (challenge: OTAChallenge) => {
    const current = formData.otaChallenges || []
    const updated = current.includes(challenge)
      ? current.filter((c) => c !== challenge)
      : [...current, challenge]
    setFormData({ ...formData, otaChallenges: updated })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('提交入驻申请:', { ...formData, roomTypeImages: roomTypes })
    alert('入驻申请已提交！')
  }

  return (
    <MainLayout>
      <div className="h-screen overflow-y-auto bg-slate-50">
        <div className="max-w-4xl mx-auto p-8">
          {/* 页面标题 */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-slate-900">入驻申请</h1>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* 账号设置 - 主账号 */}
            <Card className="rounded-lg border-slate-200 bg-white shadow-sm">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg font-semibold text-slate-900">主账号</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium text-slate-700 mb-2 block">
                      手机号 <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      type="tel"
                      placeholder="13800138000"
                      value={formData.adminPhone}
                      onChange={(e) => setFormData({ ...formData, adminPhone: e.target.value })}
                      className="h-10 border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                      required
                    />
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-slate-700 mb-2 block">
                      姓名 <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      placeholder="李明"
                      value={formData.adminName}
                      onChange={(e) => setFormData({ ...formData, adminName: e.target.value })}
                      className="h-10 border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                      required
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 账号设置 - 运营人员 */}
            <Card className="rounded-lg border-slate-200 bg-white shadow-sm">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg font-semibold text-slate-900">运营人员</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label className="text-sm font-medium text-slate-700 mb-3 block">
                    是否有专业OTA运营人员
                  </Label>
                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, hasOTASpecialist: false })}
                      className={`flex-1 px-6 py-3 text-sm font-medium rounded-md transition-all ${
                        formData.hasOTASpecialist === false
                          ? 'bg-blue-600 text-white shadow-sm'
                          : 'bg-white border border-slate-300 text-slate-700 hover:border-blue-400'
                      }`}
                    >
                      无
                    </button>
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, hasOTASpecialist: true })}
                      className={`flex-1 px-6 py-3 text-sm font-medium rounded-md transition-all ${
                        formData.hasOTASpecialist === true
                          ? 'bg-blue-600 text-white shadow-sm'
                          : 'bg-white border border-slate-300 text-slate-700 hover:border-blue-400'
                      }`}
                    >
                      有专业运营人员
                    </button>
                  </div>
                </div>

                {formData.hasOTASpecialist && (
                  <div className="grid grid-cols-2 gap-4 pt-2 animate-in fade-in duration-200">
                    <div>
                      <Label className="text-sm font-medium text-slate-700 mb-2 block">
                        运营人员姓名 <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        placeholder="王芳"
                        value={formData.otaContactName}
                        onChange={(e) => setFormData({ ...formData, otaContactName: e.target.value })}
                        className="h-10 border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        required={formData.hasOTASpecialist}
                      />
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-slate-700 mb-2 block">
                        运营人员手机号 <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        type="tel"
                        placeholder="13900139000"
                        value={formData.otaContactPhone}
                        onChange={(e) => setFormData({ ...formData, otaContactPhone: e.target.value })}
                        className="h-10 border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        required={formData.hasOTASpecialist}
                      />
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* 门店基本信息 */}
            <Card className="rounded-lg border-slate-200 bg-white shadow-sm">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg font-semibold text-slate-900">门店基本信息</CardTitle>
              </CardHeader>
              <CardContent className="space-y-5">
                <div className="grid grid-cols-5 gap-4">
                  <div className="col-span-3">
                    <Label className="text-sm font-medium text-slate-700 mb-2 block">
                      门店名称 <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      placeholder="西湖畔度假民宿"
                      value={formData.storeName}
                      onChange={(e) => setFormData({ ...formData, storeName: e.target.value })}
                      className="h-10 border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                      required
                    />
                  </div>
                  <div className="col-span-2">
                    <Label className="text-sm font-medium text-slate-700 mb-2 block">
                      店铺类型 <span className="text-red-500">*</span>
                    </Label>
                    <div className="flex flex-wrap gap-2">
                      {Object.entries(StoreTypeLabels).map(([value, label]) => (
                        <button
                          key={value}
                          type="button"
                          onClick={() => setFormData({ ...formData, storeType: value as StoreType })}
                          className={`px-3 py-2 text-sm font-medium rounded-md transition-all ${
                            formData.storeType === value
                              ? 'bg-blue-600 text-white shadow-sm'
                              : 'bg-white border border-slate-300 text-slate-700 hover:border-blue-400'
                          }`}
                        >
                          {label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div>
                  <Label className="text-sm font-medium text-slate-700 mb-2 block">
                    详细地址 <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    placeholder="浙江省杭州市西湖区西湖路123号"
                    value={formData.storeAddress}
                    onChange={(e) => setFormData({ ...formData, storeAddress: e.target.value })}
                    className="h-10 border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    required
                  />
                </div>

                <div>
                  <Label className="text-sm font-medium text-slate-700 mb-2 block">
                    门店介绍 <span className="text-red-500">*</span>
                  </Label>
                  <Textarea
                    placeholder="介绍您的门店特色、位置优势、周边环境等..."
                    value={formData.storeDescription}
                    onChange={(e) => setFormData({ ...formData, storeDescription: e.target.value })}
                    className="border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 resize-none"
                    rows={4}
                    maxLength={1000}
                    required
                  />
                  <div className="text-xs text-slate-400 mt-1 text-right">
                    {formData.storeDescription?.length || 0}/1000
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 平台运营情况 */}
            <Card className="rounded-lg border-slate-200 bg-white shadow-sm">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg font-semibold text-slate-900">平台运营情况</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* 已上线的平台 */}
                <div>
                  <Label className="text-sm font-medium text-slate-700 mb-3 block">已上线的平台</Label>
                  <div className="grid grid-cols-2 gap-3">
                    {Object.entries(OTAPlatformLabels).map(([value, label]) => (
                      <label
                        key={value}
                        className="flex items-center gap-3 p-3 border border-slate-200 rounded-md cursor-pointer hover:border-blue-400 hover:bg-blue-50/50 transition-all"
                      >
                        <Checkbox
                          checked={formData.onlinePlatforms?.includes(value as OTAPlatform)}
                          onCheckedChange={() => togglePlatform('onlinePlatforms', value as OTAPlatform)}
                          className="w-5 h-5"
                        />
                        <span className="text-sm text-slate-700">{label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* 携程星否特惠 */}
                <label className="flex items-center gap-3 p-3 border border-slate-200 rounded-md cursor-pointer hover:border-blue-400 hover:bg-blue-50/50 transition-all">
                  <Checkbox
                    checked={formData.hasCtripSpecialOffer}
                    onCheckedChange={(checked) =>
                      setFormData({ ...formData, hasCtripSpecialOffer: checked as boolean })
                    }
                    className="w-5 h-5"
                  />
                  <span className="text-sm text-slate-700">携程星否特惠</span>
                </label>

                {/* 兴趣的代运营平台 */}
                <div>
                  <Label className="text-sm font-medium text-slate-700 mb-3 block">
                    希望代运营的平台
                  </Label>
                  <div className="grid grid-cols-2 gap-3">
                    {Object.entries(OTAPlatformLabels).map(([value, label]) => (
                      <label
                        key={value}
                        className="flex items-center gap-3 p-3 border border-slate-200 rounded-md cursor-pointer hover:border-blue-400 hover:bg-blue-50/50 transition-all"
                      >
                        <Checkbox
                          checked={formData.interestedPlatforms?.includes(value as OTAPlatform)}
                          onCheckedChange={() => togglePlatform('interestedPlatforms', value as OTAPlatform)}
                          className="w-5 h-5"
                        />
                        <span className="text-sm text-slate-700">{label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* OTA困境 */}
                <div>
                  <Label className="text-sm font-medium text-slate-700 mb-3 block">
                    目前遇到的困境
                  </Label>
                  <div className="grid grid-cols-2 gap-3">
                    {Object.entries(OTAChallengeLabels).map(([value, label]) => (
                      <label
                        key={value}
                        className="flex items-center gap-3 p-3 border border-slate-200 rounded-md cursor-pointer hover:border-blue-400 hover:bg-blue-50/50 transition-all"
                      >
                        <Checkbox
                          checked={formData.otaChallenges?.includes(value as OTAChallenge)}
                          onCheckedChange={() => toggleChallenge(value as OTAChallenge)}
                          className="w-5 h-5"
                        />
                        <span className="text-sm text-slate-700">{label}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 房型图片上传 */}
            <Card className="rounded-lg border-slate-200 bg-white shadow-sm">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-semibold text-slate-900">房型图片</CardTitle>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={addRoomType}
                    className="h-9 text-blue-600 border-blue-300 hover:bg-blue-50"
                  >
                    <Plus className="w-4 h-4 mr-1" />
                    添加房型
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {roomTypes.map((roomType, index) => (
                  <div
                    key={index}
                    className="p-4 border border-slate-200 rounded-lg hover:border-slate-300 transition-colors"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-sm font-medium text-slate-600">房型 {index + 1}</span>
                      <Input
                        placeholder="单人间 / 双人大床 / 家庭房"
                        value={roomType.roomTypeName}
                        onChange={(e) => updateRoomTypeName(index, e.target.value)}
                        className="h-9 flex-1 border-slate-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-100"
                      />
                      {roomTypes.length > 1 && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeRoomType(index)}
                          className="h-9 px-2 text-red-600 hover:bg-red-50"
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      )}
                    </div>

                    {/* 拖拽上传区域 */}
                    <div
                      onDragOver={(e) => handleDragOver(e, index)}
                      onDragLeave={handleDragLeave}
                      onDrop={(e) => handleDrop(e, index)}
                      className={`border-2 border-dashed rounded-lg p-6 text-center transition-all ${
                        dragIndex === index
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-slate-300 hover:border-blue-400 hover:bg-slate-50'
                      }`}
                    >
                      <Upload className="w-10 h-10 mx-auto mb-2 text-slate-400" />
                      <p className="text-sm text-slate-600 mb-1">
                        拖拽图片到此处，或点击上传
                      </p>
                      <p className="text-xs text-slate-400">支持 JPG、PNG 格式</p>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="mt-3 h-9 border-slate-300"
                      >
                        选择图片
                      </Button>
                    </div>

                    {/* 图片预览 */}
                    {roomType.images.length > 0 && (
                      <div className="mt-3 grid grid-cols-4 gap-3">
                        {roomType.images.map((img, imgIndex) => (
                          <div key={imgIndex} className="relative group">
                            <div className="aspect-square bg-slate-100 rounded-md overflow-hidden">
                              <img
                                src={img}
                                alt={`房型${index + 1}-图片${imgIndex + 1}`}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <button
                              type="button"
                              onClick={() => removeImage(index, imgIndex)}
                              className="absolute -top-2 -right-2 w-6 h-6 bg-red-600 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* 提交按钮 */}
            <div className="flex justify-end gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                className="h-11 px-8 border-slate-300 text-slate-700"
              >
                保存草稿
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="h-11 px-8 bg-blue-600 hover:bg-blue-700 text-white shadow-md"
              >
                {isSubmitting ? '提交中...' : '提交申请'}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </MainLayout>
  )
}
