/**
 * 会员等级配置页面
 * 配置10个会员等级，参考万豪Bonvoy、华住会
 */

import { useState } from 'react'
import type { MemberLevel } from './types/member.types'
import { MemberLevelStatus } from './types/member.types'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '~/components/ui/card'
import { Input } from '~/components/ui/input'
import { Label } from '~/components/ui/label'
import { Button } from '~/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '~/components/ui/table'
import MainLayout from '../PointsSystem/components/MainLayout'

interface MemberLevelPageProps {
  levels: MemberLevel[]
  error?: string | null
}

const OperationLogButton = ({ moduleName }: { moduleName: string }) => (
  <Button variant="ghost" size="sm" className="text-slate-400 hover:text-slate-900">
    📋 {moduleName}操作记录
  </Button>
)

export default function MemberLevelPage({ levels, error }: MemberLevelPageProps) {
  const [showEditDialog, setShowEditDialog] = useState(false)
  const [currentLevel, setCurrentLevel] = useState<MemberLevel | null>(null)
  const [editingOriginalPrice, setEditingOriginalPrice] = useState(0)
  const [editingPromotionPrice, setEditingPromotionPrice] = useState(0)

  const openEdit = (level: MemberLevel) => {
    setCurrentLevel(level)
    setEditingOriginalPrice(level.originalPrice || 0)
    setEditingPromotionPrice(level.promotionPrice || 0)
    setShowEditDialog(true)
  }

  const calculateDiscount = (promotionPrice: number, originalPrice: number) => {
    if (!originalPrice || originalPrice === 0) return '0.0折'
    return `${((promotionPrice / originalPrice) * 10).toFixed(1)}折`
  }

  if (error) {
    return (
      <MainLayout>
        <div className="p-6">
          <div className="text-destructive">错误: {error}</div>
        </div>
      </MainLayout>
    )
  }

  return (
    <MainLayout>
      <div className="p-6 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-slate-900">会员等级配置</h1>
                <p className="text-sm text-slate-500 mt-1">
                  配置10个会员等级，参考万豪Bonvoy、华住会
                </p>
              </div>
              <OperationLogButton moduleName="会员等级配置" />
            </div>

            {/* 会员等级列表 */}
            <Card>
              <CardHeader>
                <CardTitle>会员等级列表</CardTitle>
                <CardDescription>共 {levels.length} 个等级（0-9）</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[50px]">等级</TableHead>
                      <TableHead>外部名称</TableHead>
                      <TableHead className="w-[80px]">有效期</TableHead>
                      <TableHead className="w-[80px]">升级间夜</TableHead>
                      <TableHead className="w-[80px]">保级间夜</TableHead>
                      <TableHead className="w-[80px]">积分倍率</TableHead>
                      <TableHead className="w-[90px]">最低折扣</TableHead>
                      <TableHead className="w-[60px]">状态</TableHead>
                      <TableHead className="text-right w-[120px]">操作</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {levels.map((level) => (
                      <TableRow key={level.level}>
                        <TableCell className="font-mono font-bold text-center">{level.level}</TableCell>
                        <TableCell className="font-medium">{level.externalName}</TableCell>
                        <TableCell className="text-sm">{level.validityYears}年</TableCell>
                        <TableCell className="text-sm text-center">{level.upgradeNights}</TableCell>
                        <TableCell className="text-sm text-center">{level.maintainNights}</TableCell>
                        <TableCell className="text-sm text-center">
                          <span className="font-medium text-blue-600">{level.pointsMultiplier}×</span>
                        </TableCell>
                        <TableCell className="text-sm text-center">
                          <span className="font-medium text-green-600">{level.minDiscount}%</span>
                        </TableCell>
                        <TableCell>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              checked={level.status === MemberLevelStatus.ONLINE}
                              className="sr-only peer"
                              onChange={() => alert(`切换等级${level.level}状态`)}
                            />
                            <div className="w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-green-500"></div>
                          </label>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="outline" size="sm" onClick={() => openEdit(level)}>
                            编辑
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            {/* 会员卡预览 */}
            <Card>
              <CardHeader>
                <CardTitle>会员卡预览</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-5 gap-4">
                  {levels.slice(0, 5).map((level) => (
                    <div
                      key={level.level}
                      className="rounded-lg p-4 text-white shadow-lg"
                      style={{ backgroundColor: level.cardBgColor }}
                    >
                      <div className="text-xs opacity-80">VIP {level.level}</div>
                      <div className="font-bold mt-1">{level.externalName}</div>
                      <div className="text-xs mt-2 opacity-80">{level.pointsMultiplier}× 积分</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

        {/* 编辑弹窗 */}
        {showEditDialog && currentLevel && (
          <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
            <Card className="w-full max-w-3xl max-h-[90vh] overflow-y-auto">
              <CardHeader className="border-b">
                <div className="flex items-center justify-between">
                  <CardTitle>编辑会员等级 - VIP{currentLevel.level}</CardTitle>
                  <Button variant="outline" size="sm" onClick={() => setShowEditDialog(false)}>✕</Button>
                </div>
              </CardHeader>
              <CardContent className="pt-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>内部名称</Label>
                    <Input defaultValue={currentLevel.internalName} placeholder="例如：LEVEL_1" />
                  </div>
                  <div>
                    <Label>外部名称</Label>
                    <Input defaultValue={currentLevel.externalName} placeholder="例如：银卡会员" />
                  </div>
                  <div>
                    <Label>有效期（年）</Label>
                    <Input type="number" defaultValue={currentLevel.validityYears} />
                  </div>
                  <div>
                    <Label>升级所需间夜数</Label>
                    <Input type="number" defaultValue={currentLevel.upgradeNights} />
                  </div>
                  <div>
                    <Label>保级所需间夜数</Label>
                    <Input type="number" defaultValue={currentLevel.maintainNights} />
                  </div>
                  <div>
                    <Label>积分倍率（1.0-2.0）</Label>
                    <Input type="number" step="0.1" defaultValue={currentLevel.pointsMultiplier} />
                  </div>
                  <div>
                    <Label>最低折扣（%）</Label>
                    <Input type="number" defaultValue={currentLevel.minDiscount} placeholder="例如：90表示最低9折" />
                    <p className="text-xs text-slate-500 mt-1">
                      商家可在此基础上给更低折扣
                    </p>
                  </div>
                </div>

                {/* 体验卡配置 */}
                <div className="border-t pt-4">
                  <h3 className="font-semibold mb-3">体验卡赠送</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>赠送数量</Label>
                      <Input type="number" defaultValue={currentLevel.trialCardCount} placeholder="可赠送几张体验卡" />
                    </div>
                    <div>
                      <Label>有效天数</Label>
                      <Input type="number" defaultValue={currentLevel.trialCardDays} placeholder="体验卡有效期（天）" />
                    </div>
                  </div>
                </div>

                {/* 售价配置 */}
                <div className="border-t pt-4">
                  <h3 className="font-semibold mb-3">会员卡售价</h3>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <Label>售价（元）</Label>
                      <Input type="number" defaultValue={currentLevel.price} />
                    </div>
                    <div>
                      <Label>划线价（元）</Label>
                      <Input
                        type="number"
                        value={editingOriginalPrice}
                        onChange={(e) => setEditingOriginalPrice(Number(e.target.value))}
                      />
                    </div>
                    <div>
                      <Label>促销价（元）</Label>
                      <Input
                        type="number"
                        value={editingPromotionPrice}
                        onChange={(e) => setEditingPromotionPrice(Number(e.target.value))}
                      />
                    </div>
                  </div>

                  {/* 折扣自动计算 */}
                  <div className="mt-3 bg-blue-50 border border-blue-200 p-3 rounded-lg">
                    <p className="text-sm">
                      <span className="text-slate-900">折扣：</span>
                      <span className="font-bold text-blue-600 text-lg ml-2">
                        {calculateDiscount(editingPromotionPrice, editingOriginalPrice)}
                      </span>
                    </p>
                    <p className="text-xs text-slate-500 mt-1">
                      计算公式：促销价 ÷ 划线价 × 10 = {editingPromotionPrice} ÷ {editingOriginalPrice} × 10 = {calculateDiscount(editingPromotionPrice, editingOriginalPrice)}
                    </p>
                  </div>
                </div>

                {/* 会员卡图片 */}
                <div className="border-t pt-4">
                  <Label>会员卡封面图片</Label>
                  <div className="mt-2 flex gap-4">
                    <div className="w-40 h-24 bg-slate-100 rounded border flex items-center justify-center">
                      <p className="text-xs text-slate-400">图片预览</p>
                    </div>
                    <div className="flex-1">
                      <Input defaultValue={currentLevel.cardCoverImage} placeholder="/cards/level1.jpg" />
                      <Button variant="outline" size="sm" className="mt-2">选择图片</Button>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-4 border-t">
                  <Button variant="outline" onClick={() => setShowEditDialog(false)}>取消</Button>
                  <Button onClick={() => { alert('保存成功'); setShowEditDialog(false); }}>保存</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
    </MainLayout>
  )
}
