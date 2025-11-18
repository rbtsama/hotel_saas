/**
 * 门店礼赠配置页面
 */

import { useState } from 'react'
import { Form, useNavigation } from '@remix-run/react'
import type { StoreBenefitsConfig, StoreBenefit } from './types/store-benefits.types'
import { BenefitApplicability } from './types/store-benefits.types'
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { Label } from '~/components/ui/label'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '~/components/ui/table'
import MainLayout from '../PointsSystem/components/MainLayout'
import LogicPanel, { LogicTable, LogicList, LogicHighlight } from '~/pages/PointsSystem/components/LogicPanel'

interface StoreBenefitsPageProps {
  config: StoreBenefitsConfig
}

const applicabilityLabels = {
  [BenefitApplicability.ALL_MEMBERS]: '全部会员',
  [BenefitApplicability.VIP2_AND_ABOVE]: 'VIP2及以上',
}

export default function StoreBenefitsPage({ config }: StoreBenefitsPageProps) {
  const navigation = useNavigation()
  const isSubmitting = navigation.state === 'submitting'

  const [showDialog, setShowDialog] = useState(false)
  const [editingBenefit, setEditingBenefit] = useState<StoreBenefit | null>(null)

  const handleEdit = (benefit: StoreBenefit) => {
    setEditingBenefit(benefit)
    setShowDialog(true)
  }

  const handleCreate = () => {
    setEditingBenefit(null)
    setShowDialog(true)
  }

  const handleCloseDialog = () => {
    setShowDialog(false)
    setEditingBenefit(null)
  }

  const sortedBenefits = [...config.benefits].sort((a, b) => a.sortOrder - b.sortOrder)

  return (
    <MainLayout>
      <div className="flex h-full">
        {/* 左侧：实际后台界面 (60%) */}
        <div className="w-[60%] h-full overflow-y-auto bg-slate-50 p-6">
          <div className="space-y-6 max-w-5xl">
            {/* 页面标题 */}
            <div>
              <h1 className="text-2xl font-bold text-slate-900">门店礼赠配置</h1>
              <p className="text-sm text-slate-500 mt-1">
                配置会员专享礼赠，提升会员体验和忠诚度
              </p>
            </div>

            {/* 礼赠列表 */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>礼赠列表</CardTitle>
                    <p className="text-sm text-slate-500 mt-1">共 {config.benefits.length} 项礼赠</p>
                  </div>
                  <Button onClick={handleCreate}>+ 添加礼赠</Button>
                </div>
              </CardHeader>
              <CardContent>
                {sortedBenefits.length === 0 ? (
                  <div className="text-center py-12 text-slate-500">
                    暂无礼赠配置，点击"添加礼赠"开始配置
                  </div>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-12">排序</TableHead>
                        <TableHead>礼赠名称</TableHead>
                        <TableHead>适用条件</TableHead>
                        <TableHead>接待时间</TableHead>
                        <TableHead>状态</TableHead>
                        <TableHead className="text-right">操作</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {sortedBenefits.map((benefit) => (
                        <TableRow key={benefit.id}>
                          <TableCell className="text-center text-slate-500">{benefit.sortOrder}</TableCell>
                          <TableCell>
                            <div>
                              <div className="font-medium">{benefit.name}</div>
                              <div className="text-sm text-slate-500 mt-1">{benefit.description}</div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              benefit.applicability === BenefitApplicability.VIP2_AND_ABOVE
                                ? 'bg-purple-100 text-purple-800'
                                : 'bg-blue-100 text-blue-800'
                            }`}>
                              {applicabilityLabels[benefit.applicability]}
                            </span>
                          </TableCell>
                          <TableCell className="text-sm text-slate-600">{benefit.receptionTime}</TableCell>
                          <TableCell>
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input
                                type="checkbox"
                                checked={benefit.enabled}
                                className="sr-only peer"
                                onChange={() => alert(`切换礼赠状态：${benefit.name}`)}
                              />
                              <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
                            </label>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button variant="outline" size="sm" onClick={() => handleEdit(benefit)}>
                                编辑
                              </Button>
                              <Form method="post" className="inline">
                                <input type="hidden" name="_action" value="delete" />
                                <input type="hidden" name="benefitId" value={benefit.id} />
                                <Button
                                  type="submit"
                                  variant="outline"
                                  size="sm"
                                  className="text-red-600"
                                  onClick={(e) => {
                                    if (!confirm(`确定删除礼赠"${benefit.name}"吗？`)) {
                                      e.preventDefault()
                                    }
                                  }}
                                >
                                  删除
                                </Button>
                              </Form>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* 编辑/新增礼赠弹窗 */}
        {showDialog && (
          <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
            <Card className="w-full max-w-3xl max-h-[90vh] overflow-y-auto">
              <CardHeader className="border-b">
                <div className="flex items-center justify-between">
                  <CardTitle>{editingBenefit ? '编辑礼赠' : '添加礼赠'}</CardTitle>
                  <Button variant="outline" size="sm" onClick={handleCloseDialog}>✕</Button>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                <Form method="post" className="space-y-4" onSubmit={handleCloseDialog}>
                  <input type="hidden" name="_action" value={editingBenefit ? 'update' : 'create'} />
                  {editingBenefit && <input type="hidden" name="benefitId" value={editingBenefit.id} />}

                  {/* 礼赠名称 */}
                  <div className="space-y-2">
                    <Label htmlFor="name">
                      礼赠名称 <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      defaultValue={editingBenefit?.name}
                      placeholder="如：免费自行车租借"
                      required
                    />
                  </div>

                  {/* 礼赠描述 */}
                  <div className="space-y-2">
                    <Label htmlFor="description">
                      礼赠描述 <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="description"
                      name="description"
                      defaultValue={editingBenefit?.description}
                      placeholder="如：提供免费自行车，方便客人骑行游览周边景点"
                      required
                    />
                  </div>

                  {/* 适用条件 */}
                  <div className="space-y-2">
                    <Label htmlFor="applicability">
                      适用条件 <span className="text-red-500">*</span>
                    </Label>
                    <select
                      id="applicability"
                      name="applicability"
                      defaultValue={editingBenefit?.applicability || BenefitApplicability.ALL_MEMBERS}
                      className="w-full px-3 py-2 border rounded-md text-sm"
                      required
                    >
                      <option value={BenefitApplicability.ALL_MEMBERS}>全部会员</option>
                      <option value={BenefitApplicability.VIP2_AND_ABOVE}>VIP2及以上</option>
                    </select>
                  </div>

                  {/* 使用说明 */}
                  <div className="space-y-2">
                    <Label htmlFor="usageNotes">
                      使用说明 <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="usageNotes"
                      name="usageNotes"
                      defaultValue={editingBenefit?.usageNotes}
                      placeholder="如：每份包含：自行车适用2小时"
                      required
                    />
                  </div>

                  {/* 预订规则 */}
                  <div className="space-y-2">
                    <Label htmlFor="bookingRules">
                      预订规则 <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="bookingRules"
                      name="bookingRules"
                      defaultValue={editingBenefit?.bookingRules}
                      placeholder="如：无需提前预订"
                      required
                    />
                  </div>

                  {/* 规则说明 */}
                  <div className="space-y-2">
                    <Label htmlFor="policyNotes">
                      规则说明 <span className="text-red-500">*</span>
                    </Label>
                    <textarea
                      id="policyNotes"
                      name="policyNotes"
                      defaultValue={editingBenefit?.policyNotes}
                      placeholder="如：入住期间每房每日享一次，使用地点为酒店内"
                      className="w-full min-h-[80px] p-3 border border-slate-300 rounded-md resize-y"
                      required
                    />
                  </div>

                  {/* 接待时间 */}
                  <div className="space-y-2">
                    <Label htmlFor="receptionTime">
                      接待时间 <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="receptionTime"
                      name="receptionTime"
                      defaultValue={editingBenefit?.receptionTime}
                      placeholder="如：00:00-23:59"
                      required
                    />
                  </div>

                  {/* 启用状态 */}
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="enabled"
                      name="enabled"
                      value="true"
                      defaultChecked={editingBenefit?.enabled ?? true}
                      className="w-4 h-4"
                    />
                    <Label htmlFor="enabled" className="cursor-pointer">启用该礼赠</Label>
                  </div>

                  {/* 按钮 */}
                  <div className="flex justify-end gap-2 pt-4 border-t">
                    <Button type="button" variant="outline" onClick={handleCloseDialog}>取消</Button>
                    <Button type="submit" disabled={isSubmitting}>
                      {isSubmitting ? '保存中...' : '保存'}
                    </Button>
                  </div>
                </Form>
              </CardContent>
            </Card>
          </div>
        )}

        {/* 右侧：产品&业务逻辑说明 (40%) */}
        <div className="w-[40%] h-full border-l">
          <LogicPanel
            title="门店礼赠配置"
            sections={[
              {
                title: '业务场景',
                content: (
                  <>
                    <p className="font-semibold mb-2">门店礼赠的核心作用：</p>
                    <LogicList
                      items={[
                        <>提升<strong>会员权益感知</strong>，增强会员忠诚度和复购率</>,
                        <>差异化<strong>会员等级权益</strong>，激励用户升级（VIP2享更多礼赠）</>,
                        <>增加<strong>酒店特色服务</strong>的曝光度（如自行车、Mini Bar、延迟退房）</>,
                        <>在预订流程中展示礼赠，<strong>提升转化率</strong>（"VIP会员享3项免费礼赠"）</>
                      ]}
                    />
                    <LogicHighlight type="info">
                      <p className="text-sm">
                        <strong>行业对标</strong>：携程黑钻会员享"免费早餐、延迟退房"，
                        亚朵会员享"Mini Bar畅饮"，这些礼赠成为会员权益的核心卖点。
                      </p>
                    </LogicHighlight>
                  </>
                )
              },
              {
                title: '解决的问题',
                content: (
                  <>
                    <p className="font-semibold mb-2">用户痛点：</p>
                    <LogicList items={[
                      '成为会员后不知道有什么权益（权益不透明）',
                      '会员等级升级后，感受不到明显差异（缺乏激励）',
                      '想使用酒店特色服务（如自行车），但不知道如何申请'
                    ]} />

                    <p className="font-semibold mt-4 mb-2">酒店运营痛点：</p>
                    <LogicList
                      items={[
                        '会员权益固定（如统一9折），缺乏差异化竞争力',
                        '酒店特色服务（自行车、Mini Bar）利用率低，未形成卖点',
                        '会员升级激励不足，高等级会员占比低'
                      ]}
                    />

                    <p className="font-semibold mt-4 mb-2">平台价值：</p>
                    <LogicList items={[
                      '标准化会员礼赠配置，提升会员体验',
                      '灵活设置适用条件（全部会员/VIP2及以上），实现分级权益',
                      '在预订页面自动展示可享礼赠，提升转化率',
                      '通过礼赠数据分析，优化会员运营策略'
                    ]} />
                  </>
                )
              },
              {
                title: '功能说明',
                content: (
                  <>
                    <p className="font-semibold mb-2">字段说明：</p>
                    <LogicTable
                      headers={['字段', '说明', '示例']}
                      rows={[
                        ['礼赠名称', '礼赠的简短标题', '免费自行车租借、Mini Bar畅饮'],
                        ['礼赠描述', '礼赠的详细说明', '提供免费自行车，方便客人骑行游览周边景点'],
                        ['适用条件', '哪些会员可享受', '全部会员 / VIP2及以上'],
                        ['使用说明', '礼赠包含的内容', '每份包含：自行车适用2小时'],
                        ['预订规则', '是否需要提前预约', '无需提前预订 / 需提前1天联系前台预约'],
                        ['规则说明', '使用限制和注意事项', '入住期间每房每日享一次，使用地点为酒店内'],
                        ['接待时间', '礼赠的可用时间段', '08:00-20:00 / 00:00-23:59']
                      ]}
                    />

                    <p className="font-semibold mt-4 mb-2">配置示例：</p>
                    <div className="bg-slate-50 border rounded p-3 text-sm space-y-2">
                      <div><strong>礼赠1：免费自行车租借</strong></div>
                      <div className="text-slate-600">
                        • 适用：全部会员<br/>
                        • 使用说明：每份包含：自行车适用2小时<br/>
                        • 预订规则：无需提前预订<br/>
                        • 规则说明：入住期间每房每日享一次，使用地点为酒店内<br/>
                        • 接待时间：08:00-20:00
                      </div>
                    </div>

                    <div className="bg-slate-50 border rounded p-3 text-sm space-y-2 mt-2">
                      <div><strong>礼赠2：Mini Bar畅饮</strong></div>
                      <div className="text-slate-600">
                        • 适用：VIP2及以上<br/>
                        • 使用说明：每份包含：Mini Bar全部饮品（酒水除外）<br/>
                        • 预订规则：无需提前预订<br/>
                        • 规则说明：入住期间每房每日享一次，使用地点为客房内<br/>
                        • 接待时间：00:00-23:59
                      </div>
                    </div>
                  </>
                )
              },
              {
                title: '适用条件设计',
                content: (
                  <>
                    <p className="font-semibold mb-2">为什么需要"适用条件"？</p>
                    <LogicHighlight type="info">
                      <p className="text-sm">
                        场景：酒店想让VIP2会员享受更多权益，激励用户升级<br/>
                        • 全部会员：免费自行车、免费茶水<br/>
                        • VIP2及以上：上述礼赠 + Mini Bar畅饮 + 延迟退房<br/>
                        → 用户看到VIP2权益更丰富，更愿意消费升级
                      </p>
                    </LogicHighlight>

                    <p className="font-semibold mt-4 mb-2">适用条件分配建议：</p>
                    <LogicTable
                      headers={['会员等级', '推荐礼赠类型', '运营目的']}
                      rows={[
                        ['全部会员', '低成本礼赠（茶水、自行车、WIFI）', '提升基础会员体验'],
                        ['VIP2及以上', '中成本礼赠（Mini Bar、延迟退房、免费早餐）', '激励会员升级'],
                        ['VIP3（未来扩展）', '高成本礼赠（免费接机、客房升级）', '维护高价值客户']
                      ]}
                    />
                  </>
                )
              },
              {
                title: '用户端呈现',
                content: (
                  <>
                    <p className="font-semibold mb-2">后台配置如何影响用户端：</p>

                    <div className="bg-slate-50 border rounded-lg p-4 mb-4">
                      <p className="font-semibold text-sm mb-2">页面1：酒店详情页</p>
                      <div className="text-xs space-y-2">
                        <div className="border rounded p-2 bg-white">
                          <div className="font-bold">亚朵酒店·上海新天地店</div>
                          <div className="text-slate-500">黄浦区 | 4.8分</div>
                          <div className="text-green-600 font-bold mt-2">会员专享礼赠：</div>
                          <div className="text-slate-700">
                            ✓ 免费自行车租借<br/>
                            ✓ Mini Bar畅饮（VIP2及以上）<br/>
                            ✓ 免费延迟退房至14:00（VIP2及以上）
                          </div>
                        </div>
                        <div className="text-slate-500 text-xs">→ 后台启用的礼赠自动显示</div>
                      </div>
                    </div>

                    <div className="bg-slate-50 border rounded-lg p-4 mb-4">
                      <p className="font-semibold text-sm mb-2">页面2：订单确认页</p>
                      <div className="text-xs space-y-1 text-slate-700">
                        <div className="font-bold">您可享受以下礼赠：</div>
                        <div className="text-green-600">✓ 免费自行车租借（08:00-20:00）</div>
                        <div className="text-slate-400">✗ Mini Bar畅饮（需VIP2等级）</div>
                        <div className="border-t pt-1 mt-1 text-xs text-blue-600">
                          升级至VIP2，解锁2项额外礼赠 →
                        </div>
                        <div className="text-slate-500 text-xs mt-2">→ 根据用户会员等级自动匹配可享礼赠</div>
                      </div>
                    </div>

                    <LogicHighlight type="success">
                      <p className="text-sm">
                        <strong>后台→前端的映射关系：</strong>
                        <br />
                        • 后台"启用"的礼赠 → 前端展示在酒店详情、订单页
                        <br />
                        • 后台"适用条件" → 前端根据用户等级自动判断是否可享
                        <br />
                        • 后台"使用说明/规则说明" → 前端在礼赠详情中展示
                        <br />
                        • 后台"接待时间" → 前端提示可用时间段
                      </p>
                    </LogicHighlight>
                  </>
                )
              },
              {
                title: '最佳实践',
                content: (
                  <>
                    <p className="font-semibold mb-2">礼赠配置建议：</p>
                    <LogicList items={[
                      <><strong>数量适中</strong>：3-5项礼赠即可，太多会降低感知价值</>,
                      <><strong>成本分级</strong>：低成本礼赠给全部会员，中高成本礼赠给VIP2+</>,
                      <><strong>突出特色</strong>：优先配置酒店独有服务（如自行车、Mini Bar）</>,
                      <><strong>明确规则</strong>：使用说明、预订规则、规则说明要清晰，避免客诉</>,
                      <><strong>合理时间</strong>：接待时间要符合实际运营（如自行车不要设置00:00-08:00）</>
                    ]} />

                    <p className="font-semibold mt-4 mb-2">运营策略：</p>
                    <LogicList items={[
                      '定期review礼赠使用率，淘汰低使用率礼赠',
                      '根据季节调整（如夏季增加"免费游泳池"，冬季增加"免费暖茶"）',
                      '通过礼赠数据分析用户偏好，优化会员运营',
                      '在营销活动中强调礼赠（如"升级VIP2，享3项免费礼赠"）'
                    ]} />

                    <LogicHighlight type="warning">
                      <p className="text-sm">
                        <strong>注意事项</strong>：礼赠规则说明必须清晰，避免过度承诺。
                        如"延迟退房"要标注"视房态而定"，否则房态紧张时无法兑现会引发客诉。
                      </p>
                    </LogicHighlight>
                  </>
                )
              }
            ]}
          />
        </div>
      </div>
    </MainLayout>
  )
}
