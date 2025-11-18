import { useState } from 'react'
import { Form, useActionData, useNavigation } from '@remix-run/react'
import type { InvitationConfig } from './types/invitation.types'
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card'
import { Button } from '~/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '~/components/ui/table'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '~/components/ui/dialog'
import { Input } from '~/components/ui/input'
import { Label } from '~/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '~/components/ui/select'
import { Switch } from '~/components/ui/switch'
import { Badge } from '~/components/ui/badge'
import { Pencil, Trash2, Plus } from 'lucide-react'

interface InvitationConfigPageProps {
  configs: InvitationConfig[]
  error: string | null
}

export default function InvitationConfigPage({ configs, error }: InvitationConfigPageProps) {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [editingConfig, setEditingConfig] = useState<InvitationConfig | null>(null)
  const navigation = useNavigation()
  const actionData = useActionData<{ errors?: Record<string, string> }>()
  const isSubmitting = navigation.state === 'submitting'

  if (error) {
    return (
      <div className="p-6">
        <div className="text-destructive">错误: {error}</div>
      </div>
    )
  }

  const handleEdit = (config: InvitationConfig) => {
    setEditingConfig(config)
  }

  const handleCloseDialog = () => {
    setIsCreateDialogOpen(false)
    setEditingConfig(null)
  }

  return (
    <div className="p-6 space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>会员邀请配置管理</CardTitle>
          <Dialog open={isCreateDialogOpen || !!editingConfig} onOpenChange={(open) => !open && handleCloseDialog()}>
            <DialogTrigger asChild>
              <Button onClick={() => setIsCreateDialogOpen(true)}>
                <Plus className="mr-2 h-4 w-4" />
                新增配置
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>{editingConfig ? '编辑邀请配置' : '新增邀请配置'}</DialogTitle>
              </DialogHeader>
              <Form method="post" className="space-y-4">
                <input type="hidden" name="_action" value={editingConfig ? 'update' : 'create'} />
                {editingConfig && <input type="hidden" name="id" value={editingConfig.id} />}

                <div className="space-y-2">
                  <Label htmlFor="name">配置名称</Label>
                  <Input
                    id="name"
                    name="name"
                    defaultValue={editingConfig?.name}
                    placeholder="例如：定向邀请VIP1会员"
                    required
                    className={actionData?.errors?.name ? 'border-destructive' : ''}
                  />
                  {actionData?.errors?.name && (
                    <p className="text-sm text-destructive">{actionData.errors.name}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">配置描述</Label>
                  <Input
                    id="description"
                    name="description"
                    defaultValue={editingConfig?.description}
                    placeholder="描述此配置的用途"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="invitationType">邀请类型</Label>
                    <Select name="invitationType" defaultValue={editingConfig?.invitationType || 'targeted'}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="targeted">定向邀请</SelectItem>
                        <SelectItem value="unlimited">无限制邀请</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="targetMemberLevel">目标会员等级</Label>
                    <Select name="targetMemberLevel" defaultValue={editingConfig?.targetMemberLevel || 'VIP1'}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="VIP1">VIP1</SelectItem>
                        <SelectItem value="VIP2">VIP2</SelectItem>
                        <SelectItem value="VIP3">VIP3</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="validityHours">有效时长（小时）</Label>
                    <Input
                      id="validityHours"
                      name="validityHours"
                      type="number"
                      defaultValue={editingConfig?.validityHours || 72}
                      min={1}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="maxInvitations">最大邀请人数（无限制邀请）</Label>
                    <Input
                      id="maxInvitations"
                      name="maxInvitations"
                      type="number"
                      defaultValue={editingConfig?.maxInvitations}
                      min={1}
                      placeholder="留空表示不限制"
                    />
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    id="isActive"
                    name="isActive"
                    defaultChecked={editingConfig?.isActive ?? true}
                  />
                  <Label htmlFor="isActive">启用此配置</Label>
                </div>

                <div className="flex justify-end gap-2">
                  <Button type="button" variant="outline" onClick={handleCloseDialog}>
                    取消
                  </Button>
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? '保存中...' : '保存'}
                  </Button>
                </div>
              </Form>
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>配置名称</TableHead>
                <TableHead>描述</TableHead>
                <TableHead>邀请类型</TableHead>
                <TableHead>目标等级</TableHead>
                <TableHead>有效时长</TableHead>
                <TableHead>最大邀请数</TableHead>
                <TableHead>状态</TableHead>
                <TableHead>创建时间</TableHead>
                <TableHead>操作</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {configs.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={9} className="text-center text-muted-foreground">
                    暂无邀请配置
                  </TableCell>
                </TableRow>
              ) : (
                configs.map((config) => (
                  <TableRow key={config.id}>
                    <TableCell className="font-medium">{config.name}</TableCell>
                    <TableCell className="max-w-xs truncate">{config.description}</TableCell>
                    <TableCell>
                      <Badge variant={config.invitationType === 'targeted' ? 'default' : 'secondary'}>
                        {config.invitationType === 'targeted' ? '定向邀请' : '无限制'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{config.targetMemberLevel}</Badge>
                    </TableCell>
                    <TableCell>{config.validityHours}小时</TableCell>
                    <TableCell>{config.maxInvitations || '不限制'}</TableCell>
                    <TableCell>
                      <Badge variant={config.isActive ? 'default' : 'secondary'}>
                        {config.isActive ? '启用' : '禁用'}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">{config.createdAt}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleEdit(config)}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Form method="post" className="inline">
                          <input type="hidden" name="_action" value="delete" />
                          <input type="hidden" name="id" value={config.id} />
                          <Button
                            variant="ghost"
                            size="icon"
                            type="submit"
                            disabled={isSubmitting}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </Form>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
