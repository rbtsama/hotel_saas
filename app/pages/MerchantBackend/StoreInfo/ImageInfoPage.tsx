import { useState, useEffect } from 'react'
import { Input } from '~/components/ui/input'
import { Button } from '~/components/ui/button'
import { Upload, X, MoveUp, MoveDown } from 'lucide-react'
import EditableSection from './components/EditableSection'
import FormField from './components/FormField'
import type { ImageInfo, StoreImage } from './types/storeInfo.types'

interface ImageInfoPageProps {
  data: ImageInfo
  onSave: (data: Partial<ImageInfo>) => Promise<void>
  onSaveShareText?: (text: string) => Promise<void>
}

export default function ImageInfoPage({ data, onSave, onSaveShareText }: ImageInfoPageProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [isSavingShareText, setIsSavingShareText] = useState(false)
  const [formData, setFormData] = useState<ImageInfo>(data)
  const [shareTextValue, setShareTextValue] = useState(data.shareText || '')

  useEffect(() => {
    setFormData(data)
    setShareTextValue(data.shareText || '')
  }, [data])

  const handleEdit = () => {
    setIsEditing(true)
  }

  const handleCancel = () => {
    if (JSON.stringify(formData) !== JSON.stringify(data)) {
      if (!confirm('您有未保存的修改，确定要取消吗？')) {
        return
      }
    }
    setFormData(data)
    setIsEditing(false)
  }

  const handleSave = async () => {
    // 验证主页首图必须至少有一张
    if (!formData.mainImages || formData.mainImages.length === 0) {
      alert('门店主页首图至少需要上传一张图片')
      return
    }

    // 验证不超过5张
    if (formData.mainImages.length > 5) {
      alert('门店主页首图最多上传5张图片')
      return
    }

    setIsSaving(true)
    try {
      await onSave(formData)
      setIsEditing(false)
    } catch (error) {
      alert('保存失败，请重试')
    } finally {
      setIsSaving(false)
    }
  }

  const handleSaveShareTextOnly = async () => {
    if (!shareTextValue.trim()) {
      alert('请填写分享展示文案')
      return
    }

    setIsSavingShareText(true)
    try {
      if (onSaveShareText) {
        await onSaveShareText(shareTextValue)
        alert('分享文案保存成功')
      }
    } catch (error) {
      alert('保存失败，请重试')
    } finally {
      setIsSavingShareText(false)
    }
  }

  const updateField = <K extends keyof ImageInfo>(field: K, value: ImageInfo[K]) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  // 模拟图片上传（实际项目中需要调用真实的上传API）
  const handleShareImageUpload = () => {
    const mockImageUrl = `https://placehold.co/500x400/2C5F8D/white?text=Share+Image+${Date.now()}`
    updateField('shareImage', mockImageUrl)
  }

  const handleMainImageUpload = () => {
    if (formData.mainImages.length >= 5) {
      alert('最多上传5张图片')
      return
    }

    const newImage: StoreImage = {
      id: `img-${Date.now()}`,
      url: `https://placehold.co/1000x1500/2C5F8D/white?text=Main+Image+${Date.now()}`,
      sortOrder: formData.mainImages.length + 1,
    }

    updateField('mainImages', [...formData.mainImages, newImage])
  }

  const removeMainImage = (id: string) => {
    const updatedImages = formData.mainImages
      .filter((img) => img.id !== id)
      .map((img, index) => ({ ...img, sortOrder: index + 1 }))
    updateField('mainImages', updatedImages)
  }

  const moveMainImage = (id: string, direction: 'up' | 'down') => {
    const currentIndex = formData.mainImages.findIndex((img) => img.id === id)
    if (currentIndex === -1) return

    if (direction === 'up' && currentIndex === 0) return
    if (direction === 'down' && currentIndex === formData.mainImages.length - 1) return

    const newImages = [...formData.mainImages]
    const targetIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1

    ;[newImages[currentIndex], newImages[targetIndex]] = [
      newImages[targetIndex],
      newImages[currentIndex],
    ]

    const reorderedImages = newImages.map((img, index) => ({ ...img, sortOrder: index + 1 }))
    updateField('mainImages', reorderedImages)
  }

  return (
    <div className="space-y-6">
      {/* 小程序分享图 */}
      <EditableSection
        title="小程序分享图"
        isEditing={isEditing}
        onEdit={handleEdit}
        onSave={handleSave}
        onCancel={handleCancel}
        isSaving={isSaving}
      >
        <div className="space-y-6">
          <FormField label="分享封面图" hint="建议尺寸5:4，支持png、jpg格式">
            {isEditing ? (
              <div className="space-y-3">
                {formData.shareImage && (
                  <div className="relative w-64 h-52 border-2 border-slate-200 rounded overflow-hidden">
                    <img
                      src={formData.shareImage}
                      alt="分享封面图"
                      className="w-full h-full object-cover"
                    />
                    <Button
                      variant="destructive"
                      size="sm"
                      className="absolute top-2 right-2 h-6 w-6 p-0"
                      onClick={() => updateField('shareImage', undefined)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                )}
                {!formData.shareImage && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleShareImageUpload}
                    className="h-32 w-64 border-2 border-dashed border-slate-300 hover:border-blue-500"
                  >
                    <div className="flex flex-col items-center gap-2">
                      <Upload className="h-8 w-8 text-slate-400" />
                      <span className="text-sm text-slate-600">点击上传图片</span>
                    </div>
                  </Button>
                )}
              </div>
            ) : (
              <div>
                {formData.shareImage ? (
                  <img
                    src={formData.shareImage}
                    alt="分享封面图"
                    className="w-64 h-52 object-cover border border-slate-200 rounded"
                  />
                ) : (
                  <span className="text-slate-500">未上传</span>
                )}
              </div>
            )}
          </FormField>

          <FormField label="分享展示文案">
            <div className="flex items-center gap-3">
              <Input
                value={shareTextValue}
                onChange={(e) => setShareTextValue(e.target.value)}
                placeholder="请输入分享展示文案"
                disabled={!isEditing && !onSaveShareText}
                className={
                  isEditing || onSaveShareText
                    ? 'h-9 border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20'
                    : 'h-9 bg-slate-50 text-slate-700 cursor-not-allowed border-0'
                }
              />
              {onSaveShareText && !isEditing && (
                <Button
                  onClick={handleSaveShareTextOnly}
                  disabled={isSavingShareText}
                  className="h-9 bg-green-600 hover:bg-green-700 text-white font-medium shadow-sm flex-shrink-0"
                >
                  {isSavingShareText ? '保存中...' : '保存'}
                </Button>
              )}
            </div>
          </FormField>
        </div>
      </EditableSection>

      {/* 门店主页首图 */}
      <EditableSection title="门店主页首图" isEditing={isEditing} hideActions>
        <FormField
          label="图片列表"
          required
          hint="建议比例2:3，宽度1000px~2000px，最多5张，支持png、jpg格式，单张不超过5MB"
        >
          {isEditing ? (
            <div className="space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {formData.mainImages.map((image, index) => (
                  <div
                    key={image.id}
                    className="relative border-2 border-slate-200 rounded overflow-hidden aspect-[2/3] group"
                  >
                    <img
                      src={image.url}
                      alt={`主页图片 ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                      <Button
                        variant="secondary"
                        size="sm"
                        className="h-8 w-8 p-0"
                        onClick={() => moveMainImage(image.id, 'up')}
                        disabled={index === 0}
                      >
                        <MoveUp className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="secondary"
                        size="sm"
                        className="h-8 w-8 p-0"
                        onClick={() => moveMainImage(image.id, 'down')}
                        disabled={index === formData.mainImages.length - 1}
                      >
                        <MoveDown className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        className="h-8 w-8 p-0"
                        onClick={() => removeMainImage(image.id)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="absolute top-2 left-2 bg-blue-600 text-white text-xs font-semibold px-2 py-1 rounded">
                      {index + 1}
                    </div>
                  </div>
                ))}

                {formData.mainImages.length < 5 && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleMainImageUpload}
                    className="aspect-[2/3] border-2 border-dashed border-slate-300 hover:border-blue-500"
                  >
                    <div className="flex flex-col items-center gap-2">
                      <Upload className="h-8 w-8 text-slate-400" />
                      <span className="text-sm text-slate-600">上传图片</span>
                      <span className="text-xs text-slate-500">
                        {formData.mainImages.length}/5
                      </span>
                    </div>
                  </Button>
                )}
              </div>

              <p className="text-sm text-slate-600">
                提示：拖动图片可调整顺序，第一张图片将作为门店封面
              </p>
            </div>
          ) : (
            <div>
              {formData.mainImages.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                  {formData.mainImages.map((image, index) => (
                    <div key={image.id} className="relative aspect-[2/3] rounded overflow-hidden">
                      <img
                        src={image.url}
                        alt={`主页图片 ${index + 1}`}
                        className="w-full h-full object-cover border border-slate-200"
                      />
                      <div className="absolute top-2 left-2 bg-blue-600 text-white text-xs font-semibold px-2 py-1 rounded">
                        {index + 1}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <span className="text-slate-500">未上传</span>
              )}
            </div>
          )}
        </FormField>
      </EditableSection>
    </div>
  )
}
