/**
 * 广告列表组件 - 支持拖拽排序
 */

import { useState } from 'react'
import { Form, useNavigation } from '@remix-run/react'
import type { Advertisement } from '../types/ads.types'
import { WeekDay } from '../types/ads.types'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '~/components/ui/table'
import { Button } from '~/components/ui/button'
import { ChevronUp, ChevronDown, Edit, Trash2, ExternalLink } from 'lucide-react'

interface AdListProps {
  advertisements: Advertisement[]
  positionId: string
  onEdit: (ad: Advertisement) => void
}

const weekDayNames: Record<WeekDay, string> = {
  [WeekDay.MONDAY]: '一',
  [WeekDay.TUESDAY]: '二',
  [WeekDay.WEDNESDAY]: '三',
  [WeekDay.THURSDAY]: '四',
  [WeekDay.FRIDAY]: '五',
  [WeekDay.SATURDAY]: '六',
  [WeekDay.SUNDAY]: '日',
}

export default function AdList({ advertisements, positionId, onEdit }: AdListProps) {
  const navigation = useNavigation()
  const [deletingId, setDeletingId] = useState<string | null>(null)

  const isDeleting = (id: string) =>
    deletingId === id &&
    navigation.state === 'submitting' &&
    navigation.formData?.get('_action') === 'deleteAd'

  const handleDelete = (id: string) => {
    if (confirm('确认删除此广告吗?')) {
      setDeletingId(id)
    }
  }

  const handleReorder = (currentIndex: number, direction: 'up' | 'down') => {
    const newIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1
    if (newIndex < 0 || newIndex >= advertisements.length) return

    const reorderedIds = [...advertisements]
    const [movedItem] = reorderedIds.splice(currentIndex, 1)
    reorderedIds.splice(newIndex, 0, movedItem)

    // 提交新的排序
    const form = document.createElement('form')
    form.method = 'post'
    form.style.display = 'none'

    const actionInput = document.createElement('input')
    actionInput.name = '_action'
    actionInput.value = 'reorderAds'
    form.appendChild(actionInput)

    const positionInput = document.createElement('input')
    positionInput.name = 'positionId'
    positionInput.value = positionId
    form.appendChild(positionInput)

    const idsInput = document.createElement('input')
    idsInput.name = 'adIds'
    idsInput.value = JSON.stringify(reorderedIds.map((ad) => ad.id))
    form.appendChild(idsInput)

    document.body.appendChild(form)
    form.submit()
  }

  const formatWeekDays = (weekDays: WeekDay[]) => {
    if (weekDays.length === 7) return '每天'
    return '周' + weekDays.map((day) => weekDayNames[day]).join(',')
  }

  if (advertisements.length === 0) {
    return (
      <div className="text-center py-12 text-slate-500">
        暂无广告,点击"新增广告"按钮添加
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px]">排序</TableHead>
            <TableHead className="w-[120px]">广告图片</TableHead>
            <TableHead>有效日期</TableHead>
            <TableHead>有效时间</TableHead>
            <TableHead>星期</TableHead>
            <TableHead>跳转链接</TableHead>
            <TableHead className="w-[80px]">状态</TableHead>
            <TableHead className="w-[200px]">操作</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {advertisements.map((ad, index) => (
            <TableRow key={ad.id}>
              {/* 排序控制 */}
              <TableCell>
                <div className="flex flex-col gap-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 w-6 p-0"
                    onClick={() => handleReorder(index, 'up')}
                    disabled={index === 0}
                  >
                    <ChevronUp className="w-4 h-4" />
                  </Button>
                  <span className="text-xs text-center text-slate-500">{ad.order}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 w-6 p-0"
                    onClick={() => handleReorder(index, 'down')}
                    disabled={index === advertisements.length - 1}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </Button>
                </div>
              </TableCell>

              {/* 广告图片 */}
              <TableCell>
                <img
                  src={ad.imageUrl}
                  alt="广告预览"
                  className="w-20 h-12 object-cover rounded border"
                />
              </TableCell>

              {/* 有效日期 */}
              <TableCell className="text-sm">
                <div>{ad.validDateStart}</div>
                <div className="text-slate-500">至 {ad.validDateEnd}</div>
              </TableCell>

              {/* 有效时间 */}
              <TableCell className="text-sm">
                {ad.validTimeStart} - {ad.validTimeEnd}
              </TableCell>

              {/* 星期 */}
              <TableCell className="text-sm">{formatWeekDays(ad.weekDays)}</TableCell>

              {/* 跳转链接 */}
              <TableCell className="text-sm">
                {ad.clickUrl ? (
                  <a
                    href={ad.clickUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline flex items-center gap-1"
                  >
                    <span className="max-w-[200px] truncate">{ad.clickUrl}</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                ) : (
                  <span className="text-slate-400">-</span>
                )}
              </TableCell>

              {/* 状态 */}
              <TableCell>
                <span
                  className={`inline-flex px-2 py-1 text-xs rounded-full ${
                    ad.enabled
                      ? 'bg-green-100 text-green-700'
                      : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  {ad.enabled ? '启用' : '禁用'}
                </span>
              </TableCell>

              {/* 操作 */}
              <TableCell>
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onEdit(ad)}
                  >
                    <Edit className="w-4 h-4 mr-1" />
                    编辑
                  </Button>

                  <Form method="post" style={{ display: 'inline' }}>
                    <input type="hidden" name="_action" value="deleteAd" />
                    <input type="hidden" name="adId" value={ad.id} />
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      type="submit"
                      disabled={isDeleting(ad.id)}
                      onClick={(e) => {
                        e.preventDefault()
                        handleDelete(ad.id)
                        if (deletingId === ad.id) {
                          e.currentTarget.form?.submit()
                        }
                      }}
                    >
                      <Trash2 className="w-4 h-4 mr-1" />
                      {isDeleting(ad.id) ? '删除中...' : '删除'}
                    </Button>
                  </Form>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
