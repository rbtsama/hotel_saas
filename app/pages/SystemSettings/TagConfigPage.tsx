/**
 * 标签配置页面 - 分类管理 + 拖拽排序
 */

import { useState } from 'react'
import type { Tag } from './types/settings.types'
import { TagType } from './types/settings.types'
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { Label } from '~/components/ui/label'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '~/components/ui/table'
import { ChevronUp, ChevronDown, Edit, Trash2 } from 'lucide-react'
import MainLayout from '../PointsSystem/components/MainLayout'

interface TagConfigPageProps {
  tags: Tag[]
}

const tagTypeLabels: Record<TagType, string> = {
  [TagType.RECOMMENDATION]: '推荐标签',
  [TagType.HOTEL]: '酒店标签',
  [TagType.ROOM_FACILITY]: '房间设施标签',
}

const tagTypeDescriptions: Record<TagType, string> = {
  [TagType.RECOMMENDATION]: '用于首页推荐、专题推荐等场景',
  [TagType.HOTEL]: '用于标识酒店特色和位置优势',
  [TagType.ROOM_FACILITY]: '用于展示房间内的设施设备',
}

export default function TagConfigPage({ tags }: TagConfigPageProps) {
  const [selectedType, setSelectedType] = useState<TagType>(TagType.RECOMMENDATION)
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingTag, setEditingTag] = useState<Tag | null>(null)

  // 按类型分组
  const tagsByType = tags.filter((tag) => tag.type === selectedType)
    .sort((a, b) => a.order - b.order)

  const handleReorder = (currentIndex: number, direction: 'up' | 'down') => {
    // 实际项目中会调用service
    console.log('Reorder:', currentIndex, direction)
  }

  const handleEdit = (tag: Tag) => {
    setEditingTag(tag)
    setIsFormOpen(true)
  }

  const handleCreate = () => {
    setEditingTag(null)
    setIsFormOpen(true)
  }

  return (
    <MainLayout>
      <div className="h-screen overflow-y-auto bg-slate-50">
        <div className="p-6 space-y-6">
        {/* 页面标题 */}
        <div>
          <h1 className="text-2xl font-bold text-slate-900">标签配置</h1>
          <p className="text-sm text-slate-500 mt-1">
            管理系统中的各类标签,支持分类、排序和颜色设置
          </p>
        </div>

        {/* 标签类型选择 */}
        <Card>
          <CardHeader>
            <CardTitle>选择标签类型</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4">
              {(Object.keys(tagTypeLabels) as TagType[]).map((type) => (
                <button
                  key={type}
                  onClick={() => setSelectedType(type)}
                  className={`p-4 border-2 rounded-lg transition-all ${
                    selectedType === type
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="font-semibold text-slate-900 mb-1">
                    {tagTypeLabels[type]}
                  </div>
                  <div className="text-xs text-slate-600">
                    {tagTypeDescriptions[type]}
                  </div>
                  <div className="text-xs text-slate-500 mt-2">
                    共 {tags.filter((t) => t.type === type).length} 个标签
                  </div>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* 标签列表 */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>{tagTypeLabels[selectedType]}</CardTitle>
                <p className="text-sm text-slate-500 mt-1">
                  {tagTypeDescriptions[selectedType]}
                </p>
              </div>
              <Button onClick={handleCreate}>新增标签</Button>
            </div>
          </CardHeader>
          <CardContent>
            {tagsByType.length === 0 ? (
              <div className="text-center py-12 text-slate-500">
                暂无标签,点击"新增标签"按钮添加
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[80px]">排序</TableHead>
                    <TableHead>标签预览</TableHead>
                    <TableHead>标签名称</TableHead>
                    <TableHead>颜色</TableHead>
                    <TableHead>图标</TableHead>
                    <TableHead>使用次数</TableHead>
                    <TableHead>状态</TableHead>
                    <TableHead>更新时间</TableHead>
                    <TableHead className="w-[180px]">操作</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {tagsByType.map((tag, index) => (
                    <TableRow key={tag.id}>
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
                          <span className="text-xs text-center text-slate-500">{tag.order}</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-6 w-6 p-0"
                            onClick={() => handleReorder(index, 'down')}
                            disabled={index === tagsByType.length - 1}
                          >
                            <ChevronDown className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>

                      {/* 标签预览 */}
                      <TableCell>
                        <span
                          className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium"
                          style={{
                            backgroundColor: tag.color + '20',
                            color: tag.color,
                            border: `1px solid ${tag.color}`,
                          }}
                        >
                          {tag.icon && <span>{tag.icon}</span>}
                          {tag.name}
                        </span>
                      </TableCell>

                      {/* 标签名称 */}
                      <TableCell className="font-medium">{tag.name}</TableCell>

                      {/* 颜色 */}
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div
                            className="w-6 h-6 rounded border border-slate-300"
                            style={{ backgroundColor: tag.color }}
                          />
                          <code className="text-xs text-slate-600">{tag.color}</code>
                        </div>
                      </TableCell>

                      {/* 图标 */}
                      <TableCell>
                        {tag.icon ? (
                          <span className="text-2xl">{tag.icon}</span>
                        ) : (
                          <span className="text-xs text-slate-400">-</span>
                        )}
                      </TableCell>

                      {/* 使用次数 */}
                      <TableCell className="text-sm">{tag.usageCount}</TableCell>

                      {/* 状态 */}
                      <TableCell>
                        <span
                          className={`inline-flex px-2 py-1 text-xs rounded-full ${
                            tag.isEnabled
                              ? 'bg-green-100 text-green-700'
                              : 'bg-slate-100 text-slate-600'
                          }`}
                        >
                          {tag.isEnabled ? '启用' : '停用'}
                        </span>
                      </TableCell>

                      {/* 更新时间 */}
                      <TableCell className="text-xs text-slate-500">
                        {tag.updatedAt}
                      </TableCell>

                      {/* 操作 */}
                      <TableCell>
                        <div className="flex gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEdit(tag)}
                          >
                            <Edit className="w-4 h-4 mr-1" />
                            编辑
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="w-4 h-4 mr-1" />
                            删除
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>

        {/* 标签表单(简化版,实际应该是弹窗) */}
        {isFormOpen && (
          <Card>
            <CardHeader>
              <CardTitle>{editingTag ? '编辑标签' : '新增标签'}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>标签名称</Label>
                  <Input
                    defaultValue={editingTag?.name}
                    placeholder="例如: 亲子乐享"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label>标签颜色</Label>
                  <div className="flex gap-2 mt-1">
                    <Input
                      type="color"
                      defaultValue={editingTag?.color || '#FF6B9D'}
                      className="w-16"
                    />
                    <Input
                      defaultValue={editingTag?.color || '#FF6B9D'}
                      placeholder="#FF6B9D"
                      className="flex-1"
                    />
                  </div>
                </div>
                <div>
                  <Label>标签图标 (选填)</Label>
                  <Input
                    defaultValue={editingTag?.icon}
                    placeholder="例如: 👨‍👩‍👧‍👦"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label>启用状态</Label>
                  <select className="w-full mt-1 px-3 py-2 border border-slate-300 rounded-md">
                    <option value="true">启用</option>
                    <option value="false">停用</option>
                  </select>
                </div>
              </div>
              <div className="flex justify-end gap-2 mt-4">
                <Button variant="outline" onClick={() => setIsFormOpen(false)}>
                  取消
                </Button>
                <Button>保存</Button>
              </div>
            </CardContent>
          </Card>
        )}
        </div>
      </div>
    </MainLayout>
  )
}
