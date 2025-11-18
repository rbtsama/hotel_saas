/**
 * 亲友礼遇卡配置页面
 */

import { useState } from 'react'
import { Form, useNavigation } from '@remix-run/react'
import type { FriendCardConfig, FriendCardConfigFormData, MemberLevel } from './types/friendCard.types'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '~/components/ui/card'
import { Button } from '~/components/ui/button'
import { Badge } from '~/components/ui/badge'
import { Switch } from '~/components/ui/switch'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '~/components/ui/table'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '~/components/ui/dialog'
import { Input } from '~/components/ui/input'
import { Label } from '~/components/ui/label'
import { Textarea } from '~/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '~/components/ui/select'
import { Gift, Edit, Plus } from 'lucide-react'

interface FriendCardConfigPageProps {
  configs: FriendCardConfig[]
  error: string | null
}

export default function FriendCardConfigPage({ configs, error }: FriendCardConfigPageProps) {
  const navigation = useNavigation()
  const isLoading = navigation.state === 'loading' || navigation.state === 'submitting'

  const [editDialogOpen, setEditDialogOpen] = useState(false)
  const [editingConfig, setEditingConfig] = useState<FriendCardConfig | null>(null)

  const [formData, setFormData] = useState<FriendCardConfigFormData>({
    name: '',
    description: '',
    memberLevel: 'VIP1',
    cardsCount: 1,
    experienceLevel: 'VIP1',
    experienceDuration: 7,
    experienceTimes: 1,
    isActive: true,
  })

  // 打开创建对话框
  const handleCreate = () => {
    setEditingConfig(null)
    setFormData({
      name: '',
      description: '',
      memberLevel: 'VIP1',
      cardsCount: 1,
      experienceLevel: 'VIP1',
      experienceDuration: 7,
      experienceTimes: 1,
      isActive: true,
    })
    setEditDialogOpen(true)
  }

  // 打开编辑对话框
  const handleEdit = (config: FriendCardConfig) => {
    setEditingConfig(config)
    setFormData({
      name: config.name,
      description: config.description,
      memberLevel: config.memberLevel,
      cardsCount: config.cardsCount,
      experienceLevel: config.experienceLevel,
      experienceDuration: config.experienceDuration,
      experienceTimes: config.experienceTimes,
      isActive: config.isActive,
    })
    setEditDialogOpen(true)
  }

  // 获取会员等级标签颜色
  const getLevelBadgeVariant = (level: MemberLevel) => {
    switch (level) {
      case 'VIP1':
        return 'default'
      case 'VIP2':
        return 'secondary'
      case 'VIP3':
        return 'destructive'
      default:
        return 'default'
    }
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-destructive">错误: {error}</div>
      </div>
    )
  }

  return (
    <div className="space-y-6 p-6">
      {/* 页面标题 */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">亲友礼遇卡配置</h1>
          <p className="text-muted-foreground mt-2">
            管理不同会员等级的亲友卡赠送规则和体验权益
          </p>
        </div>
        <Button onClick={handleCreate} disabled={isLoading}>
          <Plus className="h-4 w-4 mr-2" />
          新增配置
        </Button>
      </div>

      {/* 配置列表 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Gift className="h-5 w-5" />
            配置列表
          </CardTitle>
          <CardDescription>
            当前共有 {configs.length} 个配置，其中 {configs.filter(c => c.isActive).length} 个已启用
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>配置名称</TableHead>
                <TableHead>会员等级</TableHead>
                <TableHead>赠送张数</TableHead>
                <TableHead>体验等级</TableHead>
                <TableHead>体验时长</TableHead>
                <TableHead>体验次数</TableHead>
                <TableHead>状态</TableHead>
                <TableHead>更新时间</TableHead>
                <TableHead className="text-right">操作</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {configs.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={9} className="text-center text-muted-foreground py-8">
                    暂无配置数据
                  </TableCell>
                </TableRow>
              ) : (
                configs.map((config) => (
                  <TableRow key={config.id}>
                    <TableCell className="font-medium">{config.name}</TableCell>
                    <TableCell>
                      <Badge variant={getLevelBadgeVariant(config.memberLevel)}>
                        {config.memberLevel}
                      </Badge>
                    </TableCell>
                    <TableCell>{config.cardsCount} 张</TableCell>
                    <TableCell>
                      <Badge variant={getLevelBadgeVariant(config.experienceLevel)}>
                        {config.experienceLevel}
                      </Badge>
                    </TableCell>
                    <TableCell>{config.experienceDuration} 天</TableCell>
                    <TableCell>{config.experienceTimes} 次</TableCell>
                    <TableCell>
                      {config.isActive ? (
                        <Badge variant="default" className="bg-green-600">已启用</Badge>
                      ) : (
                        <Badge variant="secondary">已禁用</Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-muted-foreground text-sm">
                      {config.updatedAt}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEdit(config)}
                        disabled={isLoading}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* 编辑对话框 */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingConfig ? '编辑配置' : '新增配置'}
            </DialogTitle>
            <DialogDescription>
              {editingConfig ? '修改现有亲友卡配置规则' : '创建新的亲友卡配置规则'}
            </DialogDescription>
          </DialogHeader>

          <Form method="post" className="space-y-4">
            <input
              type="hidden"
              name="intent"
              value={editingConfig ? 'update' : 'create'}
            />
            {editingConfig && (
              <input type="hidden" name="id" value={editingConfig.id} />
            )}

            <div className="grid grid-cols-2 gap-4">
              {/* 配置名称 */}
              <div className="col-span-2 space-y-2">
                <Label htmlFor="name">配置名称 *</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="如：VIP2亲友礼遇卡"
                  required
                />
              </div>

              {/* 配置说明 */}
              <div className="col-span-2 space-y-2">
                <Label htmlFor="description">配置说明</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="描述该配置的详细规则..."
                  rows={3}
                />
              </div>

              {/* 会员等级 */}
              <div className="space-y-2">
                <Label htmlFor="memberLevel">会员等级 *</Label>
                <Select
                  name="memberLevel"
                  value={formData.memberLevel}
                  onValueChange={(value) => setFormData({ ...formData, memberLevel: value as MemberLevel })}
                >
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

              {/* 赠送张数 */}
              <div className="space-y-2">
                <Label htmlFor="cardsCount">赠送张数 *</Label>
                <Input
                  id="cardsCount"
                  name="cardsCount"
                  type="number"
                  min="1"
                  max="10"
                  value={formData.cardsCount}
                  onChange={(e) => setFormData({ ...formData, cardsCount: parseInt(e.target.value) || 1 })}
                  required
                />
              </div>

              {/* 体验等级 */}
              <div className="space-y-2">
                <Label htmlFor="experienceLevel">体验等级 *</Label>
                <Select
                  name="experienceLevel"
                  value={formData.experienceLevel}
                  onValueChange={(value) => setFormData({ ...formData, experienceLevel: value as MemberLevel })}
                >
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

              {/* 体验时长 */}
              <div className="space-y-2">
                <Label htmlFor="experienceDuration">体验时长（天）*</Label>
                <Input
                  id="experienceDuration"
                  name="experienceDuration"
                  type="number"
                  min="1"
                  max="365"
                  value={formData.experienceDuration}
                  onChange={(e) => setFormData({ ...formData, experienceDuration: parseInt(e.target.value) || 7 })}
                  required
                />
              </div>

              {/* 体验次数 */}
              <div className="space-y-2">
                <Label htmlFor="experienceTimes">体验次数 *</Label>
                <Input
                  id="experienceTimes"
                  name="experienceTimes"
                  type="number"
                  min="1"
                  max="10"
                  value={formData.experienceTimes}
                  onChange={(e) => setFormData({ ...formData, experienceTimes: parseInt(e.target.value) || 1 })}
                  required
                />
              </div>

              {/* 启用状态 */}
              <div className="col-span-2 flex items-center space-x-2">
                <Switch
                  id="isActive"
                  name="isActive"
                  checked={formData.isActive}
                  onCheckedChange={(checked: boolean) => setFormData({ ...formData, isActive: checked })}
                />
                <Label htmlFor="isActive">启用此配置</Label>
              </div>
            </div>

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setEditDialogOpen(false)}
                disabled={isLoading}
              >
                取消
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? '保存中...' : '保存'}
              </Button>
            </DialogFooter>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
