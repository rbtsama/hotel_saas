import { useState, useEffect } from 'react'
import { Checkbox } from '~/components/ui/checkbox'
import { Label } from '~/components/ui/label'
import { Badge } from '~/components/ui/badge'
import EditableSection from './components/EditableSection'
import type { FacilityInfo } from './types/storeInfo.types'
import {
  ROOM_FACILITIES,
  ENTERTAINMENT_FACILITIES,
  PUBLIC_AREAS,
  FRONT_DESK_SERVICES,
  DINING_SERVICES,
  BUSINESS_SERVICES,
  CLEANING_SERVICES,
  TRANSPORT_FACILITIES,
  SAFETY_FACILITIES,
} from './types/storeInfo.types'

interface FacilityInfoPageProps {
  data: FacilityInfo
  onSave: (data: Partial<FacilityInfo>) => Promise<void>
}

export default function FacilityInfoPage({ data, onSave }: FacilityInfoPageProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [formData, setFormData] = useState<FacilityInfo>(data)

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

  const toggleFacility = (field: keyof FacilityInfo, value: string) => {
    const currentList = formData[field] as string[]
    if (currentList.includes(value)) {
      setFormData((prev) => ({
        ...prev,
        [field]: currentList.filter((item) => item !== value),
      }))
    } else {
      setFormData((prev) => ({
        ...prev,
        [field]: [...currentList, value],
      }))
    }
  }

  const renderFacilityCheckboxes = (field: keyof FacilityInfo, facilities: string[]) => {
    const selectedFacilities = formData[field] as string[]

    if (isEditing) {
      return (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {facilities.map((facility) => (
            <div key={facility} className="flex items-center space-x-2">
              <Checkbox
                id={`${field}-${facility}`}
                checked={selectedFacilities.includes(facility)}
                onCheckedChange={() => toggleFacility(field, facility)}
              />
              <Label
                htmlFor={`${field}-${facility}`}
                className="font-normal cursor-pointer text-sm text-slate-700"
              >
                {facility}
              </Label>
            </div>
          ))}
        </div>
      )
    }

    // 查看状态：使用Badge显示，更美观
    return (
      <div className="flex flex-wrap gap-2">
        {selectedFacilities.length > 0 ? (
          selectedFacilities.map((facility) => (
            <Badge
              key={facility}
              variant="outline"
              className="border-slate-300 text-slate-700 bg-slate-50 font-normal"
            >
              {facility}
            </Badge>
          ))
        ) : (
          <span className="text-slate-500">—</span>
        )}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* 房间设施 */}
      <EditableSection
        title="房间设施"
        isEditing={isEditing}
        onEdit={handleEdit}
        onSave={handleSave}
        onCancel={handleCancel}
        isSaving={isSaving}
      >
        {renderFacilityCheckboxes('roomFacilities', ROOM_FACILITIES)}
      </EditableSection>

      {/* 娱乐设施 */}
      <EditableSection title="娱乐设施" isEditing={isEditing} hideActions>
        {renderFacilityCheckboxes('entertainmentFacilities', ENTERTAINMENT_FACILITIES)}
      </EditableSection>

      {/* 公共区域 */}
      <EditableSection title="公共区域" isEditing={isEditing} hideActions>
        {renderFacilityCheckboxes('publicAreas', PUBLIC_AREAS)}
      </EditableSection>

      {/* 前台服务 */}
      <EditableSection title="前台服务" isEditing={isEditing} hideActions>
        {renderFacilityCheckboxes('frontDeskServices', FRONT_DESK_SERVICES)}
      </EditableSection>

      {/* 餐饮服务 */}
      <EditableSection title="餐饮服务" isEditing={isEditing} hideActions>
        {renderFacilityCheckboxes('diningServices', DINING_SERVICES)}
      </EditableSection>

      {/* 商务服务 */}
      <EditableSection title="商务服务" isEditing={isEditing} hideActions>
        {renderFacilityCheckboxes('businessServices', BUSINESS_SERVICES)}
      </EditableSection>

      {/* 清洁服务 */}
      <EditableSection title="清洁服务" isEditing={isEditing} hideActions>
        {renderFacilityCheckboxes('cleaningServices', CLEANING_SERVICES)}
      </EditableSection>

      {/* 交通设施 */}
      <EditableSection title="交通设施" isEditing={isEditing} hideActions>
        {renderFacilityCheckboxes('transportFacilities', TRANSPORT_FACILITIES)}
      </EditableSection>

      {/* 安全设施 */}
      <EditableSection title="安全设施" isEditing={isEditing} hideActions>
        {renderFacilityCheckboxes('safetyFacilities', SAFETY_FACILITIES)}
      </EditableSection>
    </div>
  )
}
