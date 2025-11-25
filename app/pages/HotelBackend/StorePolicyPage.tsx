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
      <div className="p-6 bg-slate-50">
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

          {/* 会员折扣配置 */}
          <Card>
            <CardHeader>
              <CardTitle>会员折扣配置</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-amber-50 border border-amber-200 rounded-md p-3 mb-4">
                <p className="text-sm text-amber-800">
                  <strong>平台规定：</strong>VIP2最低折扣不得低于80折，以保证平台会员权益的统一性和吸引力
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {/* VIP0折扣 */}
                <div className="space-y-2">
                  <Label htmlFor="vip0Discount">
                    VIP0折扣 <span className="text-red-500">*</span>
                  </Label>
                  <div className="flex items-center gap-2">
                    <Input
                      id="vip0Discount"
                      name="vip0Discount"
                      type="number"
                      defaultValue={policy.memberDiscounts.vip0Discount}
                      min="80"
                      max="100"
                      step="1"
                      required
                      className="w-24"
                    />
                    <span className="text-sm text-slate-900">折（100 = 不打折）</span>
                  </div>
                  <p className="text-xs text-slate-500">建议设置：95-100折</p>
                </div>

                {/* VIP1折扣 */}
                <div className="space-y-2">
                  <Label htmlFor="vip1Discount">
                    VIP1折扣 <span className="text-red-500">*</span>
                  </Label>
                  <div className="flex items-center gap-2">
                    <Input
                      id="vip1Discount"
                      name="vip1Discount"
                      type="number"
                      defaultValue={policy.memberDiscounts.vip1Discount}
                      min="80"
                      max="100"
                      step="1"
                      required
                      className="w-24"
                    />
                    <span className="text-sm text-slate-900">折</span>
                  </div>
                  <p className="text-xs text-slate-500">建议设置：90-95折</p>
                </div>

                {/* VIP2折扣 */}
                <div className="space-y-2">
                  <Label htmlFor="vip2Discount">
                    VIP2折扣 <span className="text-red-500">*</span>
                  </Label>
                  <div className="flex items-center gap-2">
                    <Input
                      id="vip2Discount"
                      name="vip2Discount"
                      type="number"
                      defaultValue={policy.memberDiscounts.vip2Discount}
                      min="80"
                      max="100"
                      step="1"
                      required
                      className="w-24"
                    />
                    <span className="text-sm text-slate-900">折</span>
                  </div>
                  <p className="text-xs text-slate-500">
                    <span className="text-amber-600 font-medium">平台最低：80折</span>，建议：85-90折
                  </p>
                </div>

                {/* VIP3折扣 */}
                <div className="space-y-2">
                  <Label htmlFor="vip3Discount">
                    VIP3折扣 <span className="text-red-500">*</span>
                  </Label>
                  <div className="flex items-center gap-2">
                    <Input
                      id="vip3Discount"
                      name="vip3Discount"
                      type="number"
                      defaultValue={policy.memberDiscounts.vip3Discount}
                      min="80"
                      max="100"
                      step="1"
                      required
                      className="w-24"
                    />
                    <span className="text-sm text-slate-900">折</span>
                  </div>
                  <p className="text-xs text-slate-500">建议设置：80-88折</p>
                </div>
              </div>

              <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-md">
                <p className="text-sm text-blue-800">
                  <strong>折扣设置提示：</strong>
                  <br />
                  • 100折 = 不打折（原价）
                  <br />
                  • 95折 = 原价的95%（如房费¥1000，会员支付¥950）
                  <br />
                  • 建议按等级递减设置，激励用户升级（如VIP0:95折 → VIP1:92折 → VIP2:88折 → VIP3:85折）
                </p>
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
    </MainLayout>
  )
}
