import { useState } from 'react'
import { Form } from '@remix-run/react'
import type { BreakfastPolicy } from './types/hotel-backend.types'
import { BreakfastType, BreakfastTimeType, ChildPricingType } from './types/hotel-backend.types'
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { Label } from '~/components/ui/label'
import MainLayout from '../PointsSystem/components/MainLayout'
import LogicPanel, { LogicTable, LogicList, LogicHighlight } from '~/pages/PointsSystem/components/LogicPanel'

interface StoreBreakfastPageProps {
  policy: BreakfastPolicy
}

export default function StoreBreakfastPage({ policy }: StoreBreakfastPageProps) {
  const [provided, setProvided] = useState(policy.provided)
  const [timeType, setTimeType] = useState(policy.timeType)

  return (
    <MainLayout>
      <div className="flex h-full">
        {/* 左侧：实际后台界面 (60%) */}
        <div className="w-[60%] h-full overflow-y-auto bg-slate-50 p-6">
        <div className="space-y-6 max-w-4xl">
        <h1 className="text-2xl font-bold">早餐政策</h1>

        <Form method="post" className="space-y-6">
          <Card>
            <CardHeader><CardTitle>是否提供早餐</CardTitle></CardHeader>
            <CardContent>
              <div className="flex gap-4">
                <label className="flex items-center gap-2">
                  <input type="radio" name="provided" value="true" checked={provided} onChange={() => setProvided(true)} className="w-4 h-4" />
                  <span>提供</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="radio" name="provided" value="false" checked={!provided} onChange={() => setProvided(false)} className="w-4 h-4" />
                  <span>不提供</span>
                </label>
              </div>
            </CardContent>
          </Card>

          {provided && (
            <>
              <Card>
                <CardHeader><CardTitle>形式</CardTitle></CardHeader>
                <CardContent className="flex gap-4">
                  {[
                    { value: BreakfastType.A_LA_CARTE, label: '单点' },
                    { value: BreakfastType.BUFFET, label: '自助餐' },
                    { value: BreakfastType.SET_MEAL, label: '固定套餐' },
                  ].map((opt) => (
                    <label key={opt.value} className="flex items-center gap-2">
                      <input type="radio" name="type" value={opt.value} defaultChecked={policy.type === opt.value} className="w-4 h-4" />
                      <span>{opt.label}</span>
                    </label>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader><CardTitle>类型</CardTitle></CardHeader>
                <CardContent className="flex gap-3">
                  {['西式', '中式', '亚洲风味', '清真', '素食'].map((c) => (
                    <label key={c} className="flex items-center gap-2 px-3 py-2 border rounded">
                      <input type="checkbox" name="cuisines" value={c} defaultChecked={policy.cuisines.includes(c)} className="w-4 h-4" />
                      <span className="text-sm">{c}</span>
                    </label>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader><CardTitle>早餐时间</CardTitle></CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex gap-4">
                    <label className="flex items-center gap-2">
                      <input type="radio" name="timeType" value={BreakfastTimeType.ALL_DAY} checked={timeType === BreakfastTimeType.ALL_DAY} onChange={() => setTimeType(BreakfastTimeType.ALL_DAY)} className="w-4 h-4" />
                      <span>每日开放</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="radio" name="timeType" value={BreakfastTimeType.SPECIFIC} checked={timeType === BreakfastTimeType.SPECIFIC} onChange={() => setTimeType(BreakfastTimeType.SPECIFIC)} className="w-4 h-4" />
                      <span>指定时间</span>
                    </label>
                  </div>
                  {timeType === BreakfastTimeType.SPECIFIC && (
                    <div className="flex items-center gap-2">
                      <Input type="time" name="startTime" defaultValue={policy.startTime} className="w-32" />
                      <span>-</span>
                      <Input type="time" name="endTime" defaultValue={policy.endTime} className="w-32" />
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader><CardTitle>加1份早餐</CardTitle></CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2">
                    <Input type="number" name="extraPrice" defaultValue={policy.extraPrice} className="w-24" />
                    <span>元</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle>儿童早餐收费详情</CardTitle>
                    <Button type="button" variant="outline" size="sm">+ 增加</Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex gap-4">
                    <label className="flex items-center gap-2">
                      <input type="radio" name="childPricingType" value={ChildPricingType.BY_AGE} defaultChecked={policy.childPricingType === ChildPricingType.BY_AGE} className="w-4 h-4" />
                      <span>按年龄定价</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="radio" name="childPricingType" value={ChildPricingType.BY_HEIGHT} defaultChecked={policy.childPricingType === ChildPricingType.BY_HEIGHT} className="w-4 h-4" />
                      <span>按身高定价</span>
                    </label>
                  </div>

                  <div className="grid grid-cols-[1fr_1fr_1fr_auto] gap-3 items-center text-sm font-medium text-slate-600 pb-2 border-b">
                    <div>最小年龄(岁)</div>
                    <div>最大年龄(岁)</div>
                    <div>费用</div>
                    <div>操作</div>
                  </div>

                  {policy.childRules.map((rule) => (
                    <div key={rule.id} className="grid grid-cols-[1fr_1fr_1fr_auto] gap-3 items-center">
                      <Input type="number" defaultValue={rule.minAge} className="w-full" />
                      <Input type="number" defaultValue={rule.maxAge} className="w-full" />
                      <div className="flex items-center gap-2">
                        <label className="flex items-center gap-2">
                          <input type="radio" name={`fee-${rule.id}`} value="free" defaultChecked={rule.isFree} className="w-4 h-4" />
                          <span className="text-sm">免费</span>
                        </label>
                        <label className="flex items-center gap-2">
                          <input type="radio" name={`fee-${rule.id}`} value="charge" defaultChecked={!rule.isFree} className="w-4 h-4" />
                          <span className="text-sm">收费</span>
                          {!rule.isFree && <Input type="number" defaultValue={rule.price} className="w-20" />}
                        </label>
                      </div>
                      <Button type="button" variant="ghost" size="sm">删除</Button>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </>
          )}

          <div className="flex justify-end">
            <Button type="submit" size="lg">保存早餐政策</Button>
          </div>
        </Form>
        </div>
        </div>

        {/* 右侧：产品&业务逻辑说明 (40%) */}
        <div className="w-[40%] h-full border-l">
          <LogicPanel
            title="早餐政策"
            sections={[
              {
                title: '业务场景',
                content: (
                  <>
                    <p className="font-semibold mb-2">早餐服务的重要性：</p>
                    <LogicList
                      items={[
                        <>早餐是酒店服务的<strong>重要加分项</strong>，影响客人满意度和复购率</>,
                        <>OTA平台支持按"含早餐"筛选，<strong>影响搜索曝光</strong></>,
                        <>明确早餐政策可减少客诉，避免"以为免费实际收费"的纠纷</>,
                        <>儿童早餐收费规则需提前告知，避免到店后的<strong>价格争议</strong></>
                      ]}
                    />
                    <LogicHighlight type="info">
                      <p className="text-sm">
                        <strong>用户偏好</strong>：携程数据显示，72%的用户倾向于选择含早餐的酒店，
                        愿意为优质早餐多支付15-30元/人。早餐质量是影响评分的关键因素之一。
                      </p>
                    </LogicHighlight>
                  </>
                )
              },
              {
                title: '功能说明',
                content: (
                  <>
                    <p className="font-semibold mb-2">早餐政策配置项：</p>
                    <LogicTable
                      headers={['配置项', '选项', '说明']}
                      rows={[
                        ['是否提供', '提供 / 不提供', '门店是否提供早餐服务'],
                        ['形式', '单点 / 自助餐 / 固定套餐', '早餐供应方式'],
                        ['类型', '西式/中式/亚洲风味/清真/素食', '早餐菜品风格（可多选）'],
                        ['时间', '每日开放 / 指定时间', '早餐供应时间段'],
                        ['加1份早餐', '金额', '额外购买1份早餐的价格'],
                        ['儿童早餐', '按年龄/按身高定价', '儿童早餐收费规则']
                      ]}
                    />

                    <LogicHighlight type="success">
                      <p className="text-sm">
                        <strong>设计理念</strong>：早餐政策要清晰透明，
                        包含时间、形式、价格、儿童规则，避免客人到店后产生误解。
                      </p>
                    </LogicHighlight>
                  </>
                )
              },
              {
                title: '操作指南',
                content: (
                  <>
                    <p className="font-semibold mb-2">早餐形式选择建议：</p>
                    <LogicTable
                      headers={['形式', '优点', '缺点', '适用场景']}
                      rows={[
                        ['自助餐', '品种丰富，客人自由选择', '成本高，食材浪费', '中高端酒店、客流稳定'],
                        ['固定套餐', '成本可控，制作标准化', '选择少，部分客人不满意', '中小型酒店、预算有限'],
                        ['单点', '按需制作，灵活性高', '效率低，等待时间长', '精品民宿、高端酒店']
                      ]}
                    />

                    <p className="font-semibold mt-4 mb-2">儿童早餐收费规则设置：</p>
                    <LogicList items={[
                      '按年龄定价：0-6岁免费，7-12岁半价，13岁以上全价',
                      '按身高定价：1.2米以下免费，1.2-1.5米半价，1.5米以上全价',
                        '点击"增加"可添加多个年龄段/身高段规则',
                      '每个规则设置最小值、最大值、费用（免费/收费+金额）'
                    ]} />

                    <LogicHighlight type="warning">
                      <p className="text-sm">
                        <strong>法律提示</strong>：儿童早餐收费规则必须在预订前明确告知，
                        否则无法单方面收费。建议在早餐政策中清楚说明，避免纠纷。
                      </p>
                    </LogicHighlight>
                  </>
                )
              },
              {
                title: '最佳实践',
                content: (
                  <>
                    <p className="font-semibold mb-2">OTA平台的早餐要求：</p>
                    <LogicList items={[
                      <><strong>携程</strong>：必须标注早餐供应时间，建议上传早餐图片展示</>,
                      <><strong>美团</strong>：支持"含早餐"筛选，建议勾选早餐类型（中式/西式）</>,
                      <><strong>飞猪</strong>：儿童早餐政策必须填写，影响家庭客群预订</>,
                      <>所有平台：早餐质量是评分重要因素，建议提升早餐品质</>
                    ]} />

                    <p className="font-semibold mt-4 mb-2">早餐服务优化建议：</p>
                    <LogicList items={[
                      '早餐时间建议：7:00-9:30（工作日），7:30-10:00（周末）',
                      '中西结合：提供粥、包子、鸡蛋+牛奶、面包、水果',
                      '特色菜品：增加当地特色小吃，提升差异化',
                      '儿童友好：提供儿童餐椅、儿童餐具、儿童喜爱的食物',
                      '素食选项：照顾特殊饮食需求客人'
                    ]} />

                    <LogicHighlight type="success">
                      <p className="text-sm">
                        <strong>优化建议</strong>：早餐是客人对酒店的第一印象之一，
                        建议投入资源提升早餐质量。参考同类型酒店的早餐标准，
                        定期收集客人反馈优化菜单。
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
