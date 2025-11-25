import { useState, useEffect } from 'react'
import { Input } from '~/components/ui/input'
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
import EditableSection from './components/EditableSection'
import FormField from './components/FormField'
import type { ExtraBedPolicy, RoomExtraBedPolicy } from './types/storeInfo.types'

interface ExtraBedPolicyPageProps {
  data: ExtraBedPolicy
  onSave: (data: Partial<ExtraBedPolicy>) => Promise<void>
}

export default function ExtraBedPolicyPage({ data, onSave }: ExtraBedPolicyPageProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [formData, setFormData] = useState<ExtraBedPolicy>(data)

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
    for (const policy of formData.roomPolicies) {
      if (policy.extraBedProvided) {
        if (!policy.extraBedType) {
          alert(`${policy.roomTypeName}：请选择加床床型`)
          return
        }
        if (!policy.extraBedCount || policy.extraBedCount < 0) {
          alert(`${policy.roomTypeName}：请填写加床数量`)
          return
        }
        if (policy.extraBedPrice === undefined || policy.extraBedPrice < 0) {
          alert(`${policy.roomTypeName}：请填写加床价格`)
          return
        }
      }

      if (policy.cribProvided) {
        if (!policy.cribCount || policy.cribCount < 0) {
          alert(`${policy.roomTypeName}：请填写婴儿床数量`)
          return
        }
        if (policy.cribPrice === undefined || policy.cribPrice < 0) {
          alert(`${policy.roomTypeName}：请填写婴儿床价格`)
          return
        }
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

  const updateRoomPolicy = (
    roomTypeId: string,
    field: keyof RoomExtraBedPolicy,
    value: any
  ) => {
    setFormData((prev) => ({
      ...prev,
      roomPolicies: prev.roomPolicies.map((policy) =>
        policy.roomTypeId === roomTypeId ? { ...policy, [field]: value } : policy
      ),
    }))
  }

  // 按院落分组
  const groupedPolicies = formData.roomPolicies.reduce(
    (acc, policy) => {
      if (!acc[policy.courtyard]) {
        acc[policy.courtyard] = []
      }
      acc[policy.courtyard].push(policy)
      return acc
    },
    {} as Record<string, RoomExtraBedPolicy[]>
  )

  const courtyards = Object.keys(groupedPolicies).sort()

  return (
    <div className="space-y-6">
      <EditableSection
        title="房型加床/婴儿床政策"
        isEditing={isEditing}
        onEdit={handleEdit}
        onSave={handleSave}
        onCancel={handleCancel}
        isSaving={isSaving}
      >
        <div className="space-y-8">
          {courtyards.map((courtyard) => (
            <div key={courtyard}>
              <h4 className="text-sm font-semibold text-slate-700 mb-3">{courtyard}</h4>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="border-slate-200">
                      <TableHead className="text-slate-600 font-semibold">房型</TableHead>
                      <TableHead className="text-slate-600 font-semibold">
                        提供加床
                      </TableHead>
                      <TableHead className="text-slate-600 font-semibold">加床床型</TableHead>
                      <TableHead className="text-slate-600 font-semibold">加床数量</TableHead>
                      <TableHead className="text-slate-600 font-semibold">
                        加床价格(元)
                      </TableHead>
                      <TableHead className="text-slate-600 font-semibold">
                        提供婴儿床
                      </TableHead>
                      <TableHead className="text-slate-600 font-semibold">
                        婴儿床数量
                      </TableHead>
                      <TableHead className="text-slate-600 font-semibold">
                        婴儿床价格(元)
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {groupedPolicies[courtyard].map((policy) => (
                      <TableRow
                        key={policy.roomTypeId}
                        className="hover:bg-slate-50 transition-colors"
                      >
                        <TableCell className="font-medium text-slate-900">
                          {policy.roomTypeName}
                        </TableCell>

                        {/* 提供加床 */}
                        <TableCell>
                          {isEditing ? (
                            <Select
                              value={policy.extraBedProvided ? 'yes' : 'no'}
                              onValueChange={(value) =>
                                updateRoomPolicy(
                                  policy.roomTypeId,
                                  'extraBedProvided',
                                  value === 'yes'
                                )
                              }
                            >
                              <SelectTrigger className="h-9 border-slate-300 w-24">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="yes">提供</SelectItem>
                                <SelectItem value="no">不提供</SelectItem>
                              </SelectContent>
                            </Select>
                          ) : (
                            <span className="text-slate-900">
                              {policy.extraBedProvided ? '提供' : '不提供'}
                            </span>
                          )}
                        </TableCell>

                        {/* 加床床型 */}
                        <TableCell>
                          {policy.extraBedProvided &&
                            (isEditing ? (
                              <Select
                                value={policy.extraBedType || ''}
                                onValueChange={(value: 'single' | 'double') =>
                                  updateRoomPolicy(policy.roomTypeId, 'extraBedType', value)
                                }
                              >
                                <SelectTrigger className="h-9 border-slate-300 w-24">
                                  <SelectValue placeholder="选择" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="single">单人床</SelectItem>
                                  <SelectItem value="double">双人床</SelectItem>
                                </SelectContent>
                              </Select>
                            ) : (
                              <span className="text-slate-900">
                                {policy.extraBedType === 'single'
                                  ? '单人床'
                                  : policy.extraBedType === 'double'
                                    ? '双人床'
                                    : '—'}
                              </span>
                            ))}
                        </TableCell>

                        {/* 加床数量 */}
                        <TableCell>
                          {policy.extraBedProvided &&
                            (isEditing ? (
                              <Input
                                type="number"
                                min="0"
                                value={policy.extraBedCount || ''}
                                onChange={(e) =>
                                  updateRoomPolicy(
                                    policy.roomTypeId,
                                    'extraBedCount',
                                    parseInt(e.target.value) || 0
                                  )
                                }
                                className="h-9 border-slate-300 w-20"
                              />
                            ) : (
                              <span className="text-slate-900">{policy.extraBedCount || '—'}</span>
                            ))}
                        </TableCell>

                        {/* 加床价格 */}
                        <TableCell>
                          {policy.extraBedProvided &&
                            (isEditing ? (
                              <Input
                                type="number"
                                min="0"
                                value={policy.extraBedPrice ?? ''}
                                onChange={(e) =>
                                  updateRoomPolicy(
                                    policy.roomTypeId,
                                    'extraBedPrice',
                                    parseFloat(e.target.value) || 0
                                  )
                                }
                                className="h-9 border-slate-300 w-24"
                              />
                            ) : (
                              <span className="text-slate-900">
                                {policy.extraBedPrice !== undefined
                                  ? `¥${policy.extraBedPrice}`
                                  : '—'}
                              </span>
                            ))}
                        </TableCell>

                        {/* 提供婴儿床 */}
                        <TableCell>
                          {isEditing ? (
                            <Select
                              value={policy.cribProvided ? 'yes' : 'no'}
                              onValueChange={(value) =>
                                updateRoomPolicy(
                                  policy.roomTypeId,
                                  'cribProvided',
                                  value === 'yes'
                                )
                              }
                            >
                              <SelectTrigger className="h-9 border-slate-300 w-24">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="yes">提供</SelectItem>
                                <SelectItem value="no">不提供</SelectItem>
                              </SelectContent>
                            </Select>
                          ) : (
                            <span className="text-slate-900">
                              {policy.cribProvided ? '提供' : '不提供'}
                            </span>
                          )}
                        </TableCell>

                        {/* 婴儿床数量 */}
                        <TableCell>
                          {policy.cribProvided &&
                            (isEditing ? (
                              <Input
                                type="number"
                                min="0"
                                value={policy.cribCount || ''}
                                onChange={(e) =>
                                  updateRoomPolicy(
                                    policy.roomTypeId,
                                    'cribCount',
                                    parseInt(e.target.value) || 0
                                  )
                                }
                                className="h-9 border-slate-300 w-20"
                              />
                            ) : (
                              <span className="text-slate-900">{policy.cribCount || '—'}</span>
                            ))}
                        </TableCell>

                        {/* 婴儿床价格 */}
                        <TableCell>
                          {policy.cribProvided &&
                            (isEditing ? (
                              <Input
                                type="number"
                                min="0"
                                value={policy.cribPrice ?? ''}
                                onChange={(e) =>
                                  updateRoomPolicy(
                                    policy.roomTypeId,
                                    'cribPrice',
                                    parseFloat(e.target.value) || 0
                                  )
                                }
                                className="h-9 border-slate-300 w-24"
                              />
                            ) : (
                              <span className="text-slate-900">
                                {policy.cribPrice !== undefined ? `¥${policy.cribPrice}` : '—'}
                              </span>
                            ))}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          ))}
        </div>
      </EditableSection>
    </div>
  )
}
