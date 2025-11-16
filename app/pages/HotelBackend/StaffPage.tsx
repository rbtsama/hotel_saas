/**
 * 员工账号管理页面 - 增删改查
 */

import { useState } from 'react'
import { Form, useNavigation } from '@remix-run/react'
import type { StaffAccount } from './types/hotel-backend.types'
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '~/components/ui/table'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { Label } from '~/components/ui/label'
import { Edit, Trash2 } from 'lucide-react'
import MainLayout from '../PointsSystem/components/MainLayout'

interface StaffPageProps {
  staff: StaffAccount[]
}

export default function StaffPage({ staff }: StaffPageProps) {
  const navigation = useNavigation()
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingStaff, setEditingStaff] = useState<StaffAccount | null>(null)
  const [deletingId, setDeletingId] = useState<string | null>(null)

  const isSubmitting =
    navigation.state === 'submitting' &&
    (navigation.formData?.get('_action') === 'createStaff' ||
      navigation.formData?.get('_action') === 'updateStaff')

  const isDeleting = (id: string) =>
    deletingId === id &&
    navigation.state === 'submitting' &&
    navigation.formData?.get('_action') === 'deleteStaff'

  const handleCreate = () => {
    setEditingStaff(null)
    setIsFormOpen(true)
  }

  const handleEdit = (staff: StaffAccount) => {
    setEditingStaff(staff)
    setIsFormOpen(true)
  }

  const handleDelete = (id: string) => {
    if (confirm('确认删除此员工账号吗?')) {
      setDeletingId(id)
    }
  }

  return (
    <MainLayout>
      <div className="h-screen overflow-y-auto bg-slate-50">
        <div className="p-6 space-y-6">
        {/* 页面标题 */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">账号管理</h1>
            <p className="text-sm text-slate-500 mt-1">
              管理酒店员工账号 (手机号必填,姓名和岗位选填)
            </p>
          </div>
          <Button onClick={handleCreate}>添加员工</Button>
        </div>

        {/* 员工列表 */}
        <Card>
          <CardHeader>
            <CardTitle>员工列表 (共 {staff.length} 人)</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>手机号</TableHead>
                  <TableHead>姓名</TableHead>
                  <TableHead>岗位</TableHead>
                  <TableHead>创建时间</TableHead>
                  <TableHead>创建人</TableHead>
                  <TableHead className="w-[180px]">操作</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {staff.map((s) => (
                  <TableRow key={s.id}>
                    {/* 手机号 */}
                    <TableCell className="font-mono font-medium">
                      {s.phone}
                    </TableCell>

                    {/* 姓名 */}
                    <TableCell>
                      {s.name || (
                        <span className="text-slate-400 italic">未填写</span>
                      )}
                    </TableCell>

                    {/* 岗位 */}
                    <TableCell>
                      {s.position || (
                        <span className="text-slate-400 italic">未填写</span>
                      )}
                    </TableCell>

                    {/* 创建时间 */}
                    <TableCell className="text-sm text-slate-600">
                      {s.createdAt}
                    </TableCell>

                    {/* 创建人 */}
                    <TableCell className="text-sm text-slate-600">
                      {s.createdBy}
                    </TableCell>

                    {/* 操作 */}
                    <TableCell>
                      <div className="flex gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEdit(s)}
                        >
                          <Edit className="w-4 h-4 mr-1" />
                          编辑
                        </Button>

                        <Form method="post" style={{ display: 'inline' }}>
                          <input type="hidden" name="_action" value="deleteStaff" />
                          <input type="hidden" name="staffId" value={s.id} />
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-red-600 hover:text-red-700 hover:bg-red-50"
                            type="submit"
                            disabled={isDeleting(s.id)}
                            onClick={(e) => {
                              e.preventDefault()
                              handleDelete(s.id)
                              if (deletingId === s.id) {
                                e.currentTarget.form?.submit()
                              }
                            }}
                          >
                            <Trash2 className="w-4 h-4 mr-1" />
                            {isDeleting(s.id) ? '删除中...' : '删除'}
                          </Button>
                        </Form>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* 员工表单弹窗 */}
        {isFormOpen && (
          <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
              <div className="p-6 border-b border-slate-200">
                <h2 className="text-xl font-bold text-slate-900">
                  {editingStaff ? '编辑员工' : '添加员工'}
                </h2>
              </div>

              <Form method="post" className="p-6 space-y-4">
                <input
                  type="hidden"
                  name="_action"
                  value={editingStaff ? 'updateStaff' : 'createStaff'}
                />
                {editingStaff && (
                  <input type="hidden" name="staffId" value={editingStaff.id} />
                )}

                {/* 手机号(必填) */}
                <div className="space-y-2">
                  <Label htmlFor="phone">
                    手机号 <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="请输入手机号"
                    defaultValue={editingStaff?.phone}
                    required
                    pattern="[0-9]{11}"
                    title="请输入11位手机号"
                  />
                </div>

                {/* 姓名(选填) */}
                <div className="space-y-2">
                  <Label htmlFor="name">姓名 (选填)</Label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="请输入姓名"
                    defaultValue={editingStaff?.name}
                  />
                </div>

                {/* 岗位(选填) */}
                <div className="space-y-2">
                  <Label htmlFor="position">岗位 (选填)</Label>
                  <Input
                    id="position"
                    name="position"
                    placeholder="如: 前台、保洁、维修等"
                    defaultValue={editingStaff?.position}
                  />
                </div>

                {/* 表单按钮 */}
                <div className="flex justify-end gap-3 pt-4 border-t border-slate-200">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsFormOpen(false)}
                    disabled={isSubmitting}
                  >
                    取消
                  </Button>
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? '提交中...' : editingStaff ? '更新' : '添加'}
                  </Button>
                </div>
              </Form>
            </div>
          </div>
        )}
        </div>
      </div>
    </MainLayout>
  )
}
