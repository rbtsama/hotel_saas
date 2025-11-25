import { useState, useEffect } from 'react'
import { Input } from '~/components/ui/input'
import { Textarea } from '~/components/ui/textarea'
import EditableSection from './components/EditableSection'
import FormField from './components/FormField'
import DisplayValue from './components/DisplayValue'
import type { BasicInfo } from './types/storeInfo.types'

interface BasicInfoPageProps {
  data: BasicInfo
  onSave: (data: Partial<BasicInfo>) => Promise<void>
}

export default function BasicInfoPage({ data, onSave }: BasicInfoPageProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [formData, setFormData] = useState<BasicInfo>(data)

  useEffect(() => {
    setFormData(data)
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
    // 验证必填项
    if (!formData.contactPhone?.trim()) {
      alert('请填写联系电话')
      return
    }
    if (!formData.contactName?.trim()) {
      alert('请填写联系人名称')
      return
    }
    if (!formData.description?.trim()) {
      alert('请填写门店描述')
      return
    }
    if (!formData.latestBookingTime?.trim()) {
      alert('请填写当天最晚预订时间')
      return
    }

    // 验证电话格式
    const phoneRegex = /^[\d-]+$/
    if (!phoneRegex.test(formData.contactPhone)) {
      alert('联系电话格式不正确')
      return
    }

    // 验证邮箱格式
    if (formData.email && formData.email.trim()) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(formData.email)) {
        alert('邮箱格式不正确')
        return
      }
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

  const updateField = <K extends keyof BasicInfo>(field: K, value: BasicInfo[K]) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <div className="space-y-6">
      {/* 门店身份 */}
      <EditableSection
        title="门店身份"
        isEditing={isEditing}
        onEdit={handleEdit}
        onSave={handleSave}
        onCancel={handleCancel}
        isSaving={isSaving}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField label="名称" required locked>
            <div className="min-h-[36px] flex items-center px-3 py-2 bg-slate-50 text-slate-700 rounded-md border border-slate-200">
              {formData.name}
            </div>
          </FormField>

          <FormField label="城市" required locked>
            <div className="min-h-[36px] flex items-center px-3 py-2 bg-slate-50 text-slate-700 rounded-md border border-slate-200">
              {formData.city}
            </div>
          </FormField>

          <FormField label="地址" required locked className="md:col-span-2">
            <div className="min-h-[36px] flex items-center px-3 py-2 bg-slate-50 text-slate-700 rounded-md border border-slate-200">
              {formData.address}
            </div>
          </FormField>

          <FormField label="类型" required locked>
            <div className="min-h-[36px] flex items-center px-3 py-2 bg-slate-50 text-slate-700 rounded-md border border-slate-200">
              {formData.hotelCategory}
            </div>
          </FormField>

          <FormField label="房间数" required locked>
            <div className="min-h-[36px] flex items-center px-3 py-2 bg-slate-50 text-slate-700 rounded-md border border-slate-200">
              {formData.roomCount}
            </div>
          </FormField>
        </div>
      </EditableSection>

      {/* 联系方式 */}
      <EditableSection title="联系方式" isEditing={isEditing} hideActions>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField label="联系电话" required>
            {isEditing ? (
              <Input
                value={formData.contactPhone}
                onChange={(e) => updateField('contactPhone', e.target.value)}
                placeholder="请输入联系电话"
                className="h-9 border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
              />
            ) : (
              <DisplayValue value={formData.contactPhone} />
            )}
          </FormField>

          <FormField label="联系人名称" required>
            {isEditing ? (
              <Input
                value={formData.contactName}
                onChange={(e) => updateField('contactName', e.target.value)}
                placeholder="请输入联系人名称"
                className="h-9 border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
              />
            ) : (
              <DisplayValue value={formData.contactName} />
            )}
          </FormField>

          <FormField label="邮箱地址" className="md:col-span-2">
            {isEditing ? (
              <Input
                value={formData.email || ''}
                onChange={(e) => updateField('email', e.target.value)}
                placeholder="请输入邮箱地址"
                type="email"
                className="h-9 border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
              />
            ) : (
              <DisplayValue value={formData.email} />
            )}
          </FormField>
        </div>
      </EditableSection>

      {/* 门店描述 */}
      <EditableSection title="门店描述" isEditing={isEditing} hideActions>
        <FormField label="门店描述" required>
          {isEditing ? (
            <Textarea
              value={formData.description}
              onChange={(e) => updateField('description', e.target.value)}
              placeholder="请输入门店描述"
              rows={8}
              className="border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 resize-none"
            />
          ) : (
            <div className="text-slate-900 whitespace-pre-wrap leading-relaxed">
              {formData.description || '—'}
            </div>
          )}
        </FormField>
      </EditableSection>

      {/* 预订限制 */}
      <EditableSection title="预订限制" isEditing={isEditing} hideActions>
        <FormField label="当天最晚预订时间" required hint="默认22:00">
          {isEditing ? (
            <Input
              type="time"
              value={formData.latestBookingTime}
              onChange={(e) => updateField('latestBookingTime', e.target.value)}
              className="h-9 border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
            />
          ) : (
            <DisplayValue value={formData.latestBookingTime} />
          )}
        </FormField>
      </EditableSection>
    </div>
  )
}
