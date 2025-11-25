/**
 * 员工账号管理页面
 */

import { useState } from 'react'
import { Form, useNavigation } from '@remix-run/react'
import type { StaffAccount } from './types/hotel-backend.types'
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '~/components/ui/table'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { Label } from '~/components/ui/label'
import { Badge } from '~/components/ui/badge'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '~/components/ui/dialog'
import { Edit, Trash2, Plus } from 'lucide-react'
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
    if (confirm('确认删除此员工账号吗？')) {
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
              <h1 className="text-2xl font-bold text-slate-900">员工账号</h1>
            </div>
            <Button
              onClick={handleCreate}
              className="h-9 bg-blue-600 hover:bg-blue-700 text-white"
            >
              <Plus className="h-4 w-4 mr-2" />
              添加员工
            </Button>
          </div>

          {/* 员工列表 */}
          <Card className="rounded-xl border-slate-200 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-slate-900">
                员工列表
                <Badge variant="outline" className="ml-3 border-slate-300 text-slate-700">
                  共 {staff.length} 人
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow className="border-slate-200">
                    <TableHead className="text-slate-600 font-semibold">手机号</TableHead>
                    <TableHead className="text-slate-600 font-semibold">姓名</TableHead>
                    <TableHead className="text-slate-600 font-semibold">岗位</TableHead>
                    <TableHead className="text-slate-600 font-semibold">创建时间</TableHead>
                    <TableHead className="text-slate-600 font-semibold">创建人</TableHead>
                    <TableHead className="text-slate-600 font-semibold w-[150px]">操作</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {staff.length > 0 ? (
                    staff.map((s) => (
                      <TableRow key={s.id} className="hover:bg-slate-50 transition-colors">
                        {/* 手机号 */}
                        <TableCell className="font-mono font-medium text-slate-900">
                          {s.phone}
                        </TableCell>

                        {/* 姓名 */}
                        <TableCell className="text-slate-900">
                          {s.name || (
                            <span className="text-slate-400 italic">未填写</span>
                          )}
                        </TableCell>

                        {/* 岗位 */}
                        <TableCell className="text-slate-900">
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
                              className="h-8 hover:bg-slate-100"
                            >
                              <Edit className="w-3.5 h-3.5 mr-1" />
                              编辑
                            </Button>

                            <Form method="post" style={{ display: 'inline' }}>
                              <input type="hidden" name="_action" value="deleteStaff" />
                              <input type="hidden" name="staffId" value={s.id} />
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 text-red-600 hover:text-red-700 hover:bg-red-50"
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
                                <Trash2 className="w-3.5 h-3.5 mr-1" />
                                {isDeleting(s.id) ? '删除中...' : '删除'}
                              </Button>
                            </Form>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center text-slate-500 py-8">
                        暂无员工账号，点击右上角"添加员工"按钮添加
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* 员工表单弹窗 - 使用 Dialog 组件 */}
          <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle className="text-xl font-bold text-slate-900">
                  {editingStaff ? '编辑员工' : '添加员工'}
                </DialogTitle>
              </DialogHeader>

              <Form method="post" className="space-y-4">
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
                  <Label htmlFor="phone" className="text-slate-700 font-medium">
                    手机号 <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="请输入11位手机号"
                    defaultValue={editingStaff?.phone}
                    required
                    pattern="[0-9]{11}"
                    title="请输入11位手机号"
                    className="h-9 border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                  />
                </div>

                {/* 姓名(选填) */}
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-slate-700 font-medium">
                    姓名 <span className="text-slate-400 text-sm">(选填)</span>
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="请输入姓名"
                    defaultValue={editingStaff?.name}
                    className="h-9 border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                  />
                </div>

                {/* 岗位(选填) */}
                <div className="space-y-2">
                  <Label htmlFor="position" className="text-slate-700 font-medium">
                    岗位 <span className="text-slate-400 text-sm">(选填)</span>
                  </Label>
                  <Input
                    id="position"
                    name="position"
                    placeholder="如：前台、保洁、维修等"
                    defaultValue={editingStaff?.position}
                    className="h-9 border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                  />
                </div>

                <DialogFooter className="gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsFormOpen(false)}
                    disabled={isSubmitting}
                    className="h-9 border-slate-300"
                  >
                    取消
                  </Button>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="h-9 bg-blue-600 hover:bg-blue-700"
                  >
                    {isSubmitting ? '提交中...' : editingStaff ? '更新' : '添加'}
                  </Button>
                </DialogFooter>
              </Form>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </MainLayout>
  )
}
