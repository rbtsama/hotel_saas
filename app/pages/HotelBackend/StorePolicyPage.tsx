/**
 * 酒店政策编辑页面
 */

import { useState } from 'react'
import { Form, useNavigation } from '@remix-run/react'
import type { HotelPolicy } from './types/hotel-backend.types'
import {
  CancellationPolicyType,
  AfterCancellationType,
  DepositPolicyType,
} from './types/hotel-backend.types'
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { Label } from '~/components/ui/label'
import MainLayout from '../PointsSystem/components/MainLayout'
import LogicPanel, { LogicTable, LogicList, LogicHighlight } from '~/pages/PointsSystem/components/LogicPanel'

interface StorePolicyPageProps {
  policy: HotelPolicy
}

// 支付方式选项
const creditCardOptions = ['Visa', 'Master', 'Amex', 'Jcb', 'Diners Club', '银联', '发现卡']
const thirdPartyOptions = ['微信', '支付宝', '云闪付', 'Apple Pay', 'PayPal']

export default function StorePolicyPage({ policy }: StorePolicyPageProps) {
  const navigation = useNavigation()
  const isSubmitting = navigation.state === 'submitting'

  const [cancellationPolicy, setCancellationPolicy] = useState(policy.cancellationPolicy)
  const [ageRestriction, setAgeRestriction] = useState(policy.ageRestriction)
  const [allowChildren, setAllowChildren] = useState(policy.allowChildren)
  const [depositPolicy, setDepositPolicy] = useState(policy.depositPolicy)

  return (
    <MainLayout>
      <div className="flex h-full">
        {/* 左侧：实际后台界面 (60%) */}
        <div className="w-[60%] h-full overflow-y-auto bg-slate-50 p-6">
        <div className="space-y-6 max-w-5xl">
        {/* 页面标题 */}
        <div>
          <h1 className="text-2xl font-bold text-slate-900">酒店政策</h1>
          <p className="text-sm text-slate-500 mt-1">
            配置入住退房、取消政策、儿童政策和支付方式
          </p>
        </div>

        <Form method="post" className="space-y-6">
          {/* 入住退房时间 */}
          <Card>
            <CardHeader>
              <CardTitle>入住退房时间</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* 当天最晚预定时间 */}
              <div className="space-y-2">
                <Label htmlFor="latestBookingTime">
                  当天最晚预定时间 <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="latestBookingTime"
                  name="latestBookingTime"
                  type="time"
                  defaultValue={policy.latestBookingTime}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                {/* 开始办理入住时间 */}
                <div className="space-y-2">
                  <Label htmlFor="checkInStartTime">
                    开始办理入住时间 <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="checkInStartTime"
                    name="checkInStartTime"
                    type="time"
                    defaultValue={policy.checkInStartTime}
                    required
                  />
                </div>

                {/* 最晚退房时间 */}
                <div className="space-y-2">
                  <Label htmlFor="checkOutLatestTime">
                    最晚退房时间 <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="checkOutLatestTime"
                    name="checkOutLatestTime"
                    type="time"
                    defaultValue={policy.checkOutLatestTime}
                    required
                  />
                </div>
              </div>

              {/* 入住备注 */}
              <div className="space-y-2">
                <Label htmlFor="checkInNotes">入住备注</Label>
                <textarea
                  id="checkInNotes"
                  name="checkInNotes"
                  defaultValue={policy.checkInNotes}
                  className="w-full min-h-[80px] p-3 border border-slate-300 rounded-md resize-y"
                />
              </div>
            </CardContent>
          </Card>

          {/* 取消政策 */}
          <Card>
            <CardHeader>
              <CardTitle>取消政策</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="cancellationPolicy"
                    value={CancellationPolicyType.NO_CANCELLATION}
                    checked={cancellationPolicy === CancellationPolicyType.NO_CANCELLATION}
                    onChange={(e) => setCancellationPolicy(e.target.value as CancellationPolicyType)}
                    className="w-4 h-4"
                  />
                  <span className="text-sm">一经确认,不可取消修改</span>
                </label>

                <div>
                  <label className="flex items-center gap-2 cursor-pointer mb-3">
                    <input
                      type="radio"
                      name="cancellationPolicy"
                      value={CancellationPolicyType.FREE_BEFORE_DEADLINE}
                      checked={cancellationPolicy === CancellationPolicyType.FREE_BEFORE_DEADLINE}
                      onChange={(e) => setCancellationPolicy(e.target.value as CancellationPolicyType)}
                      className="w-4 h-4"
                    />
                    <span className="text-sm">入住日前</span>
                  </label>

                  {cancellationPolicy === CancellationPolicyType.FREE_BEFORE_DEADLINE && (
                    <div className="ml-6 space-y-3">
                      <div className="flex items-center gap-2">
                        <Input
                          type="number"
                          name="freeCancelDays"
                          defaultValue={policy.freeCancelDays}
                          className="w-20"
                          min="1"
                        />
                        <span className="text-sm">天</span>
                        <Input
                          type="time"
                          name="freeCancelTime"
                          defaultValue={policy.freeCancelTime}
                          className="w-32"
                        />
                        <span className="text-sm">前可免费取消</span>
                      </div>

                      <div>
                        <div className="text-sm font-medium text-slate-700 mb-2">此后</div>
                        <div className="space-y-2">
                          <label className="flex items-center gap-2">
                            <input
                              type="radio"
                              name="afterCancellationType"
                              value={AfterCancellationType.NOT_ALLOWED}
                              defaultChecked={policy.afterCancellationType === AfterCancellationType.NOT_ALLOWED}
                              className="w-4 h-4"
                            />
                            <span className="text-sm">不允许取消</span>
                          </label>
                          <label className="flex items-center gap-2">
                            <input
                              type="radio"
                              name="afterCancellationType"
                              value={AfterCancellationType.CHARGE_FEE}
                              defaultChecked={policy.afterCancellationType === AfterCancellationType.CHARGE_FEE}
                              className="w-4 h-4"
                            />
                            <span className="text-sm">收取取消违约金</span>
                          </label>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 办理入住年龄 */}
          <Card>
            <CardHeader>
              <CardTitle>办理入住年龄</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-4">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="ageRestriction"
                    value="false"
                    checked={!ageRestriction}
                    onChange={() => setAgeRestriction(false)}
                    className="w-4 h-4"
                  />
                  <span className="text-sm">不限制</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="ageRestriction"
                    value="true"
                    checked={ageRestriction}
                    onChange={() => setAgeRestriction(true)}
                    className="w-4 h-4"
                  />
                  <span className="text-sm">限制</span>
                </label>
              </div>

              {ageRestriction && (
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="minAge">最小年龄</Label>
                    <Input
                      id="minAge"
                      name="minAge"
                      type="number"
                      defaultValue={policy.minAge || 18}
                      min="0"
                      max="100"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="maxAge">最大年龄</Label>
                    <Input
                      id="maxAge"
                      name="maxAge"
                      type="number"
                      defaultValue={policy.maxAge}
                      placeholder="不限"
                      min="0"
                      max="150"
                    />
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* 儿童政策 */}
          <Card>
            <CardHeader>
              <CardTitle>儿童政策</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-4">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="allowChildren"
                    value="false"
                    checked={!allowChildren}
                    onChange={() => setAllowChildren(false)}
                    className="w-4 h-4"
                  />
                  <span className="text-sm">不接待携带儿童入住</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="allowChildren"
                    value="true"
                    checked={allowChildren}
                    onChange={() => setAllowChildren(true)}
                    className="w-4 h-4"
                  />
                  <span className="text-sm">接待携带儿童入住</span>
                </label>
              </div>

              {allowChildren && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="childrenMinAge">允许几岁及以上儿童入住</Label>
                    <Input
                      id="childrenMinAge"
                      name="childrenMinAge"
                      type="number"
                      defaultValue={policy.childrenMinAge}
                      placeholder="不限"
                      min="0"
                      max="18"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="childrenNotes">备注</Label>
                    <textarea
                      id="childrenNotes"
                      name="childrenNotes"
                      defaultValue={policy.childrenNotes}
                      className="w-full min-h-[120px] p-3 border border-slate-300 rounded-md resize-y"
                      placeholder="如: 儿童加床费用、早餐政策等"
                    />
                    <p className="text-xs text-slate-500">
                      加床政策、儿童政策会根据客房类型而有所不同,房价仅适用于特定数量的客人,携带儿童与额外客人可能会产生额外费用,详情请咨询门店。
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* 押金政策 */}
          <Card>
            <CardHeader>
              <CardTitle>押金政策</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-4 flex-wrap">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="depositPolicy"
                    value={DepositPolicyType.NO_DEPOSIT}
                    checked={depositPolicy === DepositPolicyType.NO_DEPOSIT}
                    onChange={(e) => setDepositPolicy(e.target.value as DepositPolicyType)}
                    className="w-4 h-4"
                  />
                  <span className="text-sm">否</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="depositPolicy"
                    value={DepositPolicyType.FIXED_AMOUNT}
                    checked={depositPolicy === DepositPolicyType.FIXED_AMOUNT}
                    onChange={(e) => setDepositPolicy(e.target.value as DepositPolicyType)}
                    className="w-4 h-4"
                  />
                  <span className="text-sm">固定金额</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="depositPolicy"
                    value={DepositPolicyType.PER_ROOM}
                    checked={depositPolicy === DepositPolicyType.PER_ROOM}
                    onChange={(e) => setDepositPolicy(e.target.value as DepositPolicyType)}
                    className="w-4 h-4"
                  />
                  <span className="text-sm">按预订订房间数量支付</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="depositPolicy"
                    value={DepositPolicyType.PER_DAY}
                    checked={depositPolicy === DepositPolicyType.PER_DAY}
                    onChange={(e) => setDepositPolicy(e.target.value as DepositPolicyType)}
                    className="w-4 h-4"
                  />
                  <span className="text-sm">按预订天数</span>
                </label>
              </div>

              {depositPolicy !== DepositPolicyType.NO_DEPOSIT && (
                <div className="space-y-2">
                  <Label htmlFor="depositAmount">押金金额</Label>
                  <Input
                    id="depositAmount"
                    name="depositAmount"
                    type="number"
                    defaultValue={policy.depositAmount}
                    placeholder="请输入金额"
                    min="0"
                  />
                </div>
              )}
            </CardContent>
          </Card>

          {/* 前台可用支付方式 */}
          <Card>
            <CardHeader>
              <CardTitle>前台可用支付方式</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* 信用卡/借记卡 */}
              <div>
                <Label className="mb-3 block">常用信用卡/借用卡</Label>
                <div className="flex flex-wrap gap-3">
                  {creditCardOptions.map((card) => (
                    <label
                      key={card}
                      className="flex items-center gap-2 px-3 py-2 border rounded cursor-pointer hover:bg-slate-50"
                    >
                      <input
                        type="checkbox"
                        name="paymentCreditCards"
                        value={card}
                        defaultChecked={policy.paymentMethods.creditCards.includes(card)}
                        className="w-4 h-4"
                      />
                      <span className="text-sm">{card}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* 第三方支付 */}
              <div>
                <Label className="mb-3 block">常用第三方支付</Label>
                <div className="flex flex-wrap gap-3">
                  {thirdPartyOptions.map((method) => (
                    <label
                      key={method}
                      className="flex items-center gap-2 px-3 py-2 border rounded cursor-pointer hover:bg-slate-50"
                    >
                      <input
                        type="checkbox"
                        name="paymentThirdParty"
                        value={method}
                        defaultChecked={policy.paymentMethods.thirdParty.includes(method)}
                        className="w-4 h-4"
                      />
                      <span className="text-sm">{method}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* 现金支付 */}
              <div>
                <Label className="mb-3 block">现金支付</Label>
                <label className="flex items-center gap-2 px-3 py-2 border rounded cursor-pointer hover:bg-slate-50 w-fit">
                  <input
                    type="checkbox"
                    name="paymentCash"
                    value="true"
                    defaultChecked={policy.paymentMethods.cash}
                    className="w-4 h-4"
                  />
                  <span className="text-sm">现金支付</span>
                </label>
              </div>
            </CardContent>
          </Card>

          {/* 预定担保银行卡 */}
          <Card>
            <CardHeader>
              <CardTitle>预定担保到门店可用银行卡</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-3">
                {creditCardOptions.map((card) => (
                  <label
                    key={card}
                    className="flex items-center gap-2 px-3 py-2 border rounded cursor-pointer hover:bg-slate-50"
                  >
                    <input
                      type="checkbox"
                      name="guaranteeCards"
                      value={card}
                      defaultChecked={policy.guaranteeCards.includes(card)}
                      className="w-4 h-4"
                    />
                    <span className="text-sm">{card}</span>
                  </label>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* 政策补充 */}
          <Card>
            <CardHeader>
              <CardTitle>政策补充</CardTitle>
            </CardHeader>
            <CardContent>
              <textarea
                name="policyNotes"
                defaultValue={policy.policyNotes}
                className="w-full min-h-[120px] p-3 border border-slate-300 rounded-md resize-y"
                placeholder="补充说明其他政策..."
              />
            </CardContent>
          </Card>

          {/* 保存按钮 */}
          <div className="flex justify-end">
            <Button type="submit" size="lg" disabled={isSubmitting}>
              {isSubmitting ? '保存中...' : '保存政策'}
            </Button>
          </div>
        </Form>
        </div>
        </div>

        {/* 右侧：产品&业务逻辑说明 (40%) */}
        <div className="w-[40%] h-full border-l">
          <LogicPanel
            title="酒店政策"
            sections={[
              {
                title: '业务场景',
                content: (
                  <>
                    <p className="font-semibold mb-2">酒店政策的核心作用：</p>
                    <LogicList
                      items={[
                        <>明确<strong>入住退房时间、取消规则、押金要求</strong>，减少客诉纠纷</>,
                        <>规范<strong>儿童政策和年龄限制</strong>，避免到店后的尴尬和冲突</>,
                        <>展示<strong>支付方式</strong>，方便客人提前准备（现金、信用卡、微信等）</>,
                        <>OTA平台要求完善政策信息，否则<strong>影响搜索排名和转化率</strong></>
                      ]}
                    />
                    <LogicHighlight type="warning">
                      <p className="text-sm">
                        <strong>法律风险</strong>：根据《旅游法》和《消费者权益保护法》，
                        酒店政策必须在预订前明确告知客人，否则无法单方面执行（如收取取消费）。
                        某酒店因未明示取消政策被判退还全款的案例屡见不鲜。
                      </p>
                    </LogicHighlight>
                  </>
                )
              },
              {
                title: '解决的问题',
                content: (
                  <>
                    <p className="font-semibold mb-2">客人痛点：</p>
                    <LogicList items={[
                      '不知道几点可以入住、几点必须退房（时间不明确）',
                      '临时有事想取消订单，不知道能否免费取消',
                      '带了孩子到店，被告知不接待儿童（政策未提前告知）',
                      '到店后发现不支持自己携带的支付方式'
                    ]} />

                    <p className="font-semibold mt-4 mb-2">酒店运营痛点：</p>
                    <LogicList
                      items={[
                        '客人提前取消订单，造成房间空置损失',
                        '客人逾期不退房，影响下一位客人入住',
                        '儿童入住引发安全问题或设施损坏',
                        '支付方式不明确，前台收款混乱'
                      ]}
                    />

                    <p className="font-semibold mt-4 mb-2">平台价值：</p>
                    <LogicList items={[
                      '标准化配置酒店政策，确保信息准确传达',
                      '灵活设置取消规则（免费取消/收取违约金/不可取消）',
                      '细化儿童政策，避免到店后的纠纷',
                      '多样化支付方式选择，适配不同客群需求'
                    ]} />
                  </>
                )
              },
              {
                title: '功能说明',
                content: (
                  <>
                    <p className="font-semibold mb-2">六大政策模块：</p>
                    <LogicTable
                      headers={['模块', '配置项', '说明']}
                      rows={[
                        ['入住退房时间', '当天最晚预定时间', '超过此时间无法预订当天房间（如18:00）'],
                        ['', '开始办理入住时间', '客人最早几点可以办理入住（如14:00）'],
                        ['', '最晚退房时间', '客人最晚几点必须退房（如12:00）'],
                        ['取消政策', '不可取消', '一经确认不允许取消，适用于旺季/特价房'],
                        ['', '入住日前X天免费取消', '提前N天+指定时间前免费取消，之后收费或不可取消'],
                        ['办理入住年龄', '不限制 / 限制', '是否限制入住者年龄（如18岁以上）'],
                        ['儿童政策', '不接待 / 接待', '是否接待携带儿童的客人，可设置最小年龄'],
                        ['押金政策', '无押金 / 固定金额 / 按房间数 / 按天数', '入住时收取押金的规则'],
                        ['支付方式', '信用卡 / 第三方支付 / 现金', '前台可用的支付方式']
                      ]}
                    />

                    <LogicHighlight type="info">
                      <p className="text-sm">
                        <strong>行业参考</strong>：携程、美团要求酒店明确标注取消政策，
                        未标注的默认为"可免费取消"，会给酒店带来损失。建议根据淡旺季灵活调整政策。
                      </p>
                    </LogicHighlight>
                  </>
                )
              },
              {
                title: '取消政策详解',
                content: (
                  <>
                    <p className="font-semibold mb-2">三种取消规则对比：</p>
                    <LogicTable
                      headers={['政策类型', '适用场景', '优点', '缺点']}
                      rows={[
                        ['不可取消', '旺季、特价房、节假日', '降低退订率，保障收益', '可能降低预订量（客人担心风险）'],
                        ['免费取消', '淡季、常规房', '提升预订量，降低决策门槛', '退订率高，房间利用率不稳定'],
                        ['部分退款', '入住日前X天免费取消，之后收费', '平衡客人体验和酒店收益', '规则复杂，客人可能不理解']
                      ]}
                    />

                    <p className="font-semibold mt-4 mb-2">取消政策设置示例：</p>
                    <LogicList items={[
                      <><strong>春节/国庆旺季</strong>：不可取消，或入住日前7天18:00前免费取消，之后不可取消</>,
                      <><strong>周末</strong>：入住日前3天18:00前免费取消，之后收取首晚房费</>,
                      <><strong>工作日</strong>：入住日前1天18:00前免费取消，之后收取首晚房费</>,
                      <><strong>特价促销</strong>：一经确认不可取消，明确标注"不可退改"</>
                    ]} />

                    <LogicHighlight type="warning">
                      <p className="text-sm">
                        <strong>法律提示</strong>：根据《消费者权益保护法》，因不可抗力（疫情、自然灾害）
                        导致无法入住的，酒店应全额退款。建议在政策补充中说明不可抗力退款规则。
                      </p>
                    </LogicHighlight>
                  </>
                )
              },
              {
                title: '儿童政策详解',
                content: (
                  <>
                    <p className="font-semibold mb-2">儿童政策的必要性：</p>
                    <LogicList items={[
                      '部分民宿、高端酒店不接待儿童（安全考虑、安静环境）',
                      '儿童可能产生额外费用（加床、早餐、设施损坏）',
                      '提前明确政策，避免客人带孩子到店被拒的尴尬',
                      'OTA平台要求酒店明确标注儿童政策'
                    ]} />

                    <p className="font-semibold mt-4 mb-2">常见儿童政策配置：</p>
                    <LogicTable
                      headers={['政策类型', '配置示例', '适用场景']}
                      rows={[
                        ['不接待儿童', '不接待12岁以下儿童', '追求安静的民宿、情侣酒店'],
                        ['接待但有年龄限制', '仅接待6岁以上儿童', '有安全考虑的高端酒店'],
                        ['接待所有年龄儿童', '无年龄限制，婴儿也可入住', '亲子酒店、家庭旅馆'],
                        ['儿童免费', '1.2米以下儿童免费（不占床）', '家庭友好型酒店'],
                        ['儿童收费', '1.2-1.5米儿童收取加床费200元', '平衡成本的常规酒店']
                      ]}
                    />

                    <LogicHighlight type="success">
                      <p className="text-sm">
                        <strong>最佳实践</strong>：在儿童政策备注中说明清楚：
                        "儿童加床费用、早餐政策、儿童设施（如婴儿床、儿童餐椅）等，详情请咨询门店。"
                      </p>
                    </LogicHighlight>
                  </>
                )
              },
              {
                title: '操作指南',
                content: (
                  <>
                    <p className="font-semibold mb-2">设置入住退房时间：</p>
                    <LogicList items={[
                      '参考行业标准：入住时间14:00-15:00，退房时间11:00-12:00',
                      '可提供延迟退房服务（收费或免费），在备注中说明',
                      '当天最晚预定时间建议设为18:00，避免深夜到店',
                      '如提供24小时接待，可在备注中说明"支持深夜入住"'
                    ]} />

                    <p className="font-semibold mt-4 mb-2">配置取消政策：</p>
                    <LogicList items={[
                      '根据淡旺季灵活调整：旺季严格、淡季宽松',
                      '明确"入住日前X天Y时前"，避免客人误解',
                      '选择"收取违约金"时，建议收取首晚房费的50%-100%',
                      '在政策补充中说明特殊情况（不可抗力）的处理方式'
                    ]} />

                    <p className="font-semibold mt-4 mb-2">选择押金政策：</p>
                    <LogicTable
                      headers={['押金类型', '适用场景', '金额建议']}
                      rows={[
                        ['无押金', '信任度高的平台订单（携程、美团）', '-'],
                        ['固定金额', '所有客人统一收取', '500-1000元'],
                        ['按房间数', '房间数越多，押金越高', '每间房500元'],
                        ['按天数', '入住天数越长，押金越高', '每天200元']
                      ]}
                    />

                    <LogicHighlight type="warning">
                      <p className="text-sm">
                        <strong>法律提示</strong>：押金仅用于抵扣损坏赔偿、额外消费等，
                        退房时必须退还（扣除合理费用后）。不得无故扣留押金，否则属于违法行为。
                      </p>
                    </LogicHighlight>
                  </>
                )
              },
              {
                title: '支付方式配置',
                content: (
                  <>
                    <p className="font-semibold mb-2">常见支付方式：</p>
                    <LogicTable
                      headers={['支付方式', '说明', '手续费']}
                      rows={[
                        ['现金', '人民币现金支付', '无'],
                        ['微信/支付宝', '国内最常用的第三方支付', '0.6%'],
                        ['银联卡', '国内主流信用卡/借记卡', '0.6%'],
                        ['Visa/Master', '国际信用卡，适用于外宾', '2-3%'],
                        ['Apple Pay/云闪付', '手机支付，年轻客群喜欢', '0.6%']
                      ]}
                    />

                    <p className="font-semibold mt-4 mb-2">配置建议：</p>
                    <LogicList items={[
                      '至少支持：现金 + 微信/支付宝 + 银联卡（覆盖99%客人）',
                      '如接待外宾，建议支持Visa/Master国际卡',
                      '明确标注可用支付方式，避免客人到店后无法支付',
                      '预定担保银行卡：OTA平台预订时冻结押金的银行卡类型'
                    ]} />

                    <LogicHighlight type="info">
                      <p className="text-sm">
                        <strong>行业趋势</strong>：越来越多酒店支持"线上支付+到店零接触"，
                        建议配置完善的第三方支付方式（微信、支付宝、云闪付），提升客人体验。
                      </p>
                    </LogicHighlight>
                  </>
                )
              },
              {
                title: '最佳实践',
                content: (
                  <>
                    <p className="font-semibold mb-2">携程、美团的政策要求：</p>
                    <LogicList items={[
                      <><strong>携程</strong>：必须明确取消政策，未标注的默认为"免费取消"</>,
                      <><strong>美团</strong>：押金政策、儿童政策必须填写，否则影响搜索排名</>,
                      <><strong>飞猪</strong>：支付方式至少选择3种，包括第三方支付</>,
                      <>所有平台：政策描述必须真实，虚假标注会被投诉或下架</>
                    ]} />

                    <p className="font-semibold mt-4 mb-2">政策完善度检查清单：</p>
                    <LogicList items={[
                      '✓ 入住退房时间已设置，并在备注中说明特殊服务（如延迟退房）',
                      '✓ 取消政策已选择，规则清晰明确（入住日前X天Y时前）',
                      '✓ 儿童政策已配置，年龄限制、收费规则已说明',
                      '✓ 押金政策已设置，金额合理（不宜过高）',
                      '✓ 支付方式至少3种，覆盖主流支付习惯',
                      '✓ 政策补充已填写，说明特殊情况处理方式'
                    ]} />

                    <LogicHighlight type="success">
                      <p className="text-sm">
                        <strong>优化建议</strong>：定期review政策设置，根据季节、节假日、客源结构调整。
                        参考同行政策，保持竞争力。旺季可严格取消政策，淡季可放宽吸引客人。
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
