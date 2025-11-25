import { useState, useEffect } from 'react'
import { Input } from '~/components/ui/input'
import { Button } from '~/components/ui/button'
import { Label } from '~/components/ui/label'
import { RadioGroup, RadioGroupItem } from '~/components/ui/radio-group'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '~/components/ui/select'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '~/components/ui/table'
import { Trash2, Plus } from 'lucide-react'
import EditableSection from './components/EditableSection'
import FormField from './components/FormField'
import type { SurroundingInfo, NearbyLocation } from './types/storeInfo.types'
import { LOCATION_CATEGORIES } from './types/storeInfo.types'

interface SurroundingInfoPageProps {
  data: SurroundingInfo
  onSave: (data: Partial<SurroundingInfo>) => Promise<void>
}

export default function SurroundingInfoPage({ data, onSave }: SurroundingInfoPageProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [formData, setFormData] = useState<SurroundingInfo>(data)

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
    // 验证数据
    for (const location of formData.locations) {
      if (!location.name.trim()) {
        alert('请填写位置名称')
        return
      }
      if (!location.distance || location.distance < 0) {
        alert('请填写正确的距离')
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

  const addLocation = () => {
    const newLocation: NearbyLocation = {
      id: `temp-${Date.now()}`,
      category: 'attraction',
      name: '',
      distance: 0,
      distanceType: 'straight',
    }
    setFormData((prev) => ({
      ...prev,
      locations: [...prev.locations, newLocation],
    }))
  }

  const removeLocation = (id: string) => {
    setFormData((prev) => ({
      ...prev,
      locations: prev.locations.filter((loc) => loc.id !== id),
    }))
  }

  const updateLocation = (id: string, field: keyof NearbyLocation, value: any) => {
    setFormData((prev) => ({
      ...prev,
      locations: prev.locations.map((loc) =>
        loc.id === id ? { ...loc, [field]: value } : loc
      ),
    }))
  }

  const getCategoryLabel = (value: string) => {
    return LOCATION_CATEGORIES.find((c) => c.value === value)?.label || value
  }

  // 按类别分组
  const groupedLocations = formData.locations.reduce(
    (acc, loc) => {
      if (!acc[loc.category]) {
        acc[loc.category] = []
      }
      acc[loc.category].push(loc)
      return acc
    },
    {} as Record<string, NearbyLocation[]>
  )

  return (
    <div className="space-y-6">
      <EditableSection
        title="周边位置信息"
        isEditing={isEditing}
        onEdit={handleEdit}
        onSave={handleSave}
        onCancel={handleCancel}
        isSaving={isSaving}
      >
        {isEditing ? (
          <div className="space-y-4">
            <Table>
              <TableHeader>
                <TableRow className="border-slate-200">
                  <TableHead className="text-slate-600 font-semibold">类别</TableHead>
                  <TableHead className="text-slate-600 font-semibold">名称</TableHead>
                  <TableHead className="text-slate-600 font-semibold">距离(米)</TableHead>
                  <TableHead className="text-slate-600 font-semibold">距离类型</TableHead>
                  <TableHead className="text-slate-600 font-semibold w-20">操作</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {formData.locations.map((location) => (
                  <TableRow key={location.id} className="hover:bg-slate-50 transition-colors">
                    <TableCell>
                      <Select
                        value={location.category}
                        onValueChange={(value: any) =>
                          updateLocation(location.id, 'category', value)
                        }
                      >
                        <SelectTrigger className="h-9 border-slate-300">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {LOCATION_CATEGORIES.map((cat) => (
                            <SelectItem key={cat.value} value={cat.value}>
                              {cat.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell>
                      <Input
                        value={location.name}
                        onChange={(e) => updateLocation(location.id, 'name', e.target.value)}
                        placeholder="请输入名称"
                        className="h-9 border-slate-300"
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        type="number"
                        min="0"
                        value={location.distance}
                        onChange={(e) =>
                          updateLocation(location.id, 'distance', parseInt(e.target.value) || 0)
                        }
                        placeholder="距离"
                        className="h-9 border-slate-300"
                      />
                    </TableCell>
                    <TableCell>
                      <Select
                        value={location.distanceType}
                        onValueChange={(value: 'straight' | 'driving') =>
                          updateLocation(location.id, 'distanceType', value)
                        }
                      >
                        <SelectTrigger className="h-9 border-slate-300">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="straight">直线距离</SelectItem>
                          <SelectItem value="driving">驾车距离</SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeLocation(location.id)}
                        className="h-8 w-8 p-0 hover:bg-red-50 hover:text-red-600"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            <Button
              type="button"
              variant="outline"
              onClick={addLocation}
              className="h-9 border-blue-300 text-blue-600 hover:bg-blue-50"
            >
              <Plus className="h-4 w-4 mr-2" />
              增加周边位置
            </Button>
          </div>
        ) : (
          <div className="space-y-6">
            {LOCATION_CATEGORIES.map((category) => {
              const locations = groupedLocations[category.value] || []
              if (locations.length === 0) return null

              return (
                <div key={category.value}>
                  <h4 className="text-sm font-semibold text-slate-700 mb-3">
                    {category.label}
                  </h4>
                  <div className="space-y-2">
                    {locations.map((location) => (
                      <div
                        key={location.id}
                        className="flex items-center justify-between py-2 px-3 bg-slate-50 rounded"
                      >
                        <span className="text-slate-900">{location.name}</span>
                        <span className="text-sm text-slate-600">
                          {location.distance >= 1000
                            ? `${(location.distance / 1000).toFixed(1)}km`
                            : `${location.distance}m`}{' '}
                          ({location.distanceType === 'straight' ? '直线' : '驾车'})
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )
            })}

            {formData.locations.length === 0 && (
              <div className="text-center text-slate-500 py-8">暂无周边信息</div>
            )}
          </div>
        )}
      </EditableSection>
    </div>
  )
}
