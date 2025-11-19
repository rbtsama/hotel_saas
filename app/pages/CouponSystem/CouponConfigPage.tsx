/**
 * 优惠券配置页面
 * 配置优惠券规则、使用条件
 */

import { useState } from 'react'
import type { CouponConfig } from './types/coupon.types'
import { CouponType, CouponStatus } from './types/coupon.types'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '~/components/ui/card'
import { Input } from '~/components/ui/input'
import { Label } from '~/components/ui/label'
import { Button } from '~/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '~/components/ui/table'
import MainLayout from '../PointsSystem/components/MainLayout'

interface CouponConfigPageProps {
  coupons: CouponConfig[]
  error?: string | null
}

const couponTypeLabels: Record<CouponType, string> = {
  [CouponType.FULL_REDUCTION]: '满减券',
  [CouponType.DISCOUNT]: '折扣券',
  [CouponType.DIRECT_REDUCTION]: '立减券'
}

const couponStatusLabels: Record<CouponStatus, string> = {
  [CouponStatus.ACTIVE]: '生效中',
  [CouponStatus.INACTIVE]: '已停用'
}

const OperationLogButton = ({ moduleName }: { moduleName: string }) => (
  <Button variant="ghost" size="sm" className="text-slate-400 hover:text-slate-600">
    📋 {moduleName}操作记录
  </Button>
)

const BusinessLogicPanel = ({ sections }: { sections: Array<{ title: string; content: React.ReactNode }> }) => (
  <div className="p-6 space-y-6 overflow-y-auto">
    <div>
      <h2 className="text-xl font-bold text-slate-900">业务逻辑说明</h2>
      <p className="text-sm text-slate-500 mt-1">
        后台配置如何影响前端用户体验
      </p>
    </div>
    {sections.map((section, index) => (
      <div key={index}>
        <h3 className="font-semibold mb-3">{section.title}</h3>
        {section.content}
      </div>
    ))}
  </div>
)

export default function CouponConfigPage({ coupons, error }: CouponConfigPageProps) {
  const [showCreateDialog, setShowCreateDialog] = useState(false)
  const [selectedType, setSelectedType] = useState<CouponType>(CouponType.FULL_REDUCTION)

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
      <div className="flex h-screen">
        {/* 左侧：功能区 (60%) */}
        <div className="w-[60%] overflow-y-auto">
          <div className="p-6 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-slate-900">优惠券配置</h1>
                <p className="text-sm text-slate-500 mt-1">
                  配置优惠券规则、使用条件
                </p>
              </div>
              <OperationLogButton moduleName="优惠券配置" />
            </div>

            {/* 优惠券列表 */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>优惠券列表</CardTitle>
                    <CardDescription>共 {coupons.length} 个优惠券</CardDescription>
                  </div>
                  <Button onClick={() => setShowCreateDialog(true)}>+ 创建优惠券</Button>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>
                        <div>券名称</div>
                        <div className="text-xs text-muted-foreground font-normal">优惠券名称</div>
                      </TableHead>
                      <TableHead>
                        <div>类型</div>
                        <div className="text-xs text-muted-foreground font-normal">满减/折扣/立减</div>
                      </TableHead>
                      <TableHead>
                        <div>优惠内容</div>
                        <div className="text-xs text-muted-foreground font-normal">具体优惠规则</div>
                      </TableHead>
                      <TableHead>
                        <div>有效期</div>
                        <div className="text-xs text-muted-foreground font-normal">领取后有效天数</div>
                      </TableHead>
                      <TableHead>
                        <div>发放/使用</div>
                        <div className="text-xs text-muted-foreground font-normal">已发/已用数量</div>
                      </TableHead>
                      <TableHead>
                        <div>叠加规则</div>
                        <div className="text-xs text-muted-foreground font-normal">能否与积分/会员折扣叠加</div>
                      </TableHead>
                      <TableHead>
                        <div>状态</div>
                        <div className="text-xs text-muted-foreground font-normal">生效中/已停用</div>
                      </TableHead>
                      <TableHead className="text-right">操作</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {coupons.map((coupon) => (
                      <TableRow key={coupon.couponId}>
                        <TableCell className="font-medium">{coupon.couponName}</TableCell>
                        <TableCell>
                          <span className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded">
                            {couponTypeLabels[coupon.couponType]}
                          </span>
                        </TableCell>
                        <TableCell className="text-sm">
                          {coupon.couponType === CouponType.FULL_REDUCTION && `满${coupon.threshold}减${coupon.reductionAmount}`}
                          {coupon.couponType === CouponType.DISCOUNT && `${coupon.discountRate! / 10}折`}
                          {coupon.couponType === CouponType.DIRECT_REDUCTION && `立减${coupon.directAmount}元`}
                        </TableCell>
                        <TableCell className="text-sm">{coupon.validDays}天</TableCell>
                        <TableCell className="text-sm">
                          <div>{coupon.issuedCount} / {coupon.totalCount}</div>
                          <div className="text-xs text-green-600">已用：{coupon.usedCount}</div>
                        </TableCell>
                        <TableCell className="text-xs">
                          <div>{coupon.stackWithPoints ? '✓' : '✗'} 积分</div>
                          <div>{coupon.stackWithMemberDiscount ? '✓' : '✗'} 会员</div>
                        </TableCell>
                        <TableCell>
                          <span className={`text-xs px-2 py-1 rounded ${
                            coupon.status === CouponStatus.ACTIVE ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-600'
                          }`}>
                            {couponStatusLabels[coupon.status]}
                          </span>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="outline" size="sm">编辑</Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* 创建优惠券弹窗 */}
        {showCreateDialog && (
          <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
            <Card className="w-full max-w-2xl">
              <CardHeader className="border-b">
                <CardTitle>创建优惠券</CardTitle>
              </CardHeader>
              <CardContent className="pt-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2">
                    <Label>优惠券名称</Label>
                    <p className="text-xs text-muted-foreground mb-2">
                      清晰描述优惠内容，如：新人专享券-满200减30（必填，最多30字）
                    </p>
                    <Input placeholder="例如：新人专享券-满200减30" />
                  </div>
                  <div>
                    <Label>优惠券类型</Label>
                    <p className="text-xs text-muted-foreground mb-2">
                      满减券提升客单价，折扣券简单直接，立减券吸引力强
                    </p>
                    <select
                      value={selectedType}
                      onChange={(e) => setSelectedType(e.target.value as CouponType)}
                      className="w-full px-3 py-2 border rounded-md"
                    >
                      <option value={CouponType.FULL_REDUCTION}>满减券</option>
                      <option value={CouponType.DISCOUNT}>折扣券</option>
                      <option value={CouponType.DIRECT_REDUCTION}>立减券</option>
                    </select>
                  </div>
                  <div>
                    <Label>有效天数</Label>
                    <p className="text-xs text-muted-foreground mb-2">
                      用户领取后多少天内有效，建议7-30天
                    </p>
                    <Input type="number" placeholder="领取后多久过期" />
                  </div>

                  {selectedType === CouponType.FULL_REDUCTION && (
                    <>
                      <div>
                        <Label>满X元</Label>
                        <p className="text-xs text-muted-foreground mb-2">
                          订单满多少元可用，如：200元
                        </p>
                        <Input type="number" placeholder="门槛金额" />
                      </div>
                      <div>
                        <Label>减Y元</Label>
                        <p className="text-xs text-muted-foreground mb-2">
                          优惠金额，如：减30元
                        </p>
                        <Input type="number" placeholder="优惠金额" />
                      </div>
                    </>
                  )}

                  {selectedType === CouponType.DISCOUNT && (
                    <div className="col-span-2">
                      <Label>折扣（例如：85表示8.5折）</Label>
                      <p className="text-xs text-muted-foreground mb-2">
                        填写折扣数值，85=8.5折，90=9折
                      </p>
                      <Input type="number" placeholder="85" />
                    </div>
                  )}

                  {selectedType === CouponType.DIRECT_REDUCTION && (
                    <div className="col-span-2">
                      <Label>立减金额</Label>
                      <p className="text-xs text-muted-foreground mb-2">
                        无门槛立减，如：立减50元
                      </p>
                      <Input type="number" placeholder="例如：50" />
                    </div>
                  )}
                </div>

                <div className="flex justify-end gap-2 pt-4 border-t">
                  <Button variant="outline" onClick={() => setShowCreateDialog(false)}>取消</Button>
                  <Button onClick={() => { alert('创建成功'); setShowCreateDialog(false); }}>创建</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* 右侧：业务逻辑说明 (40%) */}
        <div className="w-[40%] h-full border-l">
          <BusinessLogicPanel
            sections={[
              {
                title: '📱 用户端体验',
                content: (
                  <>
                    <div className="bg-slate-50 border rounded-lg p-4 mb-4">
                      <p className="font-semibold text-sm mb-2">📱 页面1：领券中心</p>
                      <div className="text-xs space-y-2">
                        <div className="border p-3 rounded bg-white">
                          <div className="flex items-center justify-between">
                            <div>
                              <div className="font-bold text-red-600 text-lg">满200减30</div>
                              <div className="text-slate-500 text-xs">新人专享券</div>
                            </div>
                            <button className="bg-red-500 text-white px-3 py-1 rounded text-xs">立即领取</button>
                          </div>
                          <div className="text-slate-500 text-xs mt-1">有效期30天 | 全场可用</div>
                        </div>
                        <div className="text-slate-500 text-xs">→ 后台配置的"满200减30"和"有效期30天"</div>
                      </div>
                    </div>

                    <div className="bg-slate-50 border rounded-lg p-4 mb-4">
                      <p className="font-semibold text-sm mb-2">📱 页面2：我的优惠券</p>
                      <div className="text-xs space-y-2">
                        <div className="border p-2 rounded">
                          <div className="font-bold">满200减30</div>
                          <div className="text-slate-500">2025.02.14过期</div>
                          <div className="mt-1">
                            <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded text-xs">未使用</span>
                          </div>
                        </div>
                        <div className="text-slate-500 text-xs">→ 后台配置的"有效期30天"自动计算过期时间</div>
                      </div>
                    </div>

                    <div className="bg-slate-50 border rounded-lg p-4 mb-4">
                      <p className="font-semibold text-sm mb-2">📱 页面3：下单页-选择优惠券</p>
                      <div className="text-xs space-y-1 text-slate-700">
                        <div>房费：¥358</div>
                        <div>优惠券：<span className="text-red-600">-¥0</span> <button className="text-blue-600 underline text-xs">选择优惠券</button></div>
                        <div className="text-orange-600 text-xs">⚠️ 不满足满200减30的使用条件</div>
                        <div className="text-slate-500">→ 后台配置的"满200"门槛，前端自动校验</div>
                      </div>
                    </div>

                    <div className="bg-slate-50 border rounded-lg p-4 mb-4">
                      <p className="font-semibold text-sm mb-2">📱 页面4：支付页-优惠叠加</p>
                      <div className="text-xs space-y-1 text-slate-700">
                        <div>房费：¥500</div>
                        <div>周末8.5折：-¥75</div>
                        <div>会员95折：<span className="text-slate-400">不可叠加（二选一）</span></div>
                        <div>积分抵扣：-¥10 ✓ 可叠加</div>
                        <div>实付：<span className="text-red-600 font-bold">¥415</span></div>
                        <div className="text-slate-500">→ 后台配置的"叠加规则"决定哪些优惠可以一起用</div>
                      </div>
                    </div>
                  </>
                )
              },
              {
                title: '🔗 配置关联',
                content: (
                  <p className="text-sm text-slate-700 leading-relaxed">
                    • 后台设置"满200减30" → 前端校验"房费需≥¥200"
                    <br />
                    • 后台设置"有效期30天" → 前端显示"2025.02.14过期"
                    <br />
                    • 后台设置"可叠加积分" → 前端允许同时使用积分
                    <br />
                    • 后台设置"限定上海/北京" → 前端提示"仅限上海、北京使用"
                  </p>
                )
              }
            ]}
          />
        </div>
      </div>
    </MainLayout>
  )
}
