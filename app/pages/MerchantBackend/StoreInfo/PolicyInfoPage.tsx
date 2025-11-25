import { useState, useEffect } from 'react'
import { Input } from '~/components/ui/input'
import { Textarea } from '~/components/ui/textarea'
import { Label } from '~/components/ui/label'
import { RadioGroup, RadioGroupItem } from '~/components/ui/radio-group'
import { Checkbox } from '~/components/ui/checkbox'
import EditableSection from './components/EditableSection'
import FormField from './components/FormField'
import type { PolicyInfo } from './types/storeInfo.types'
import { CARD_TYPES, THIRD_PARTY_PAYMENTS } from './types/storeInfo.types'

interface PolicyInfoPageProps {
  data: PolicyInfo
  onSave: (data: Partial<PolicyInfo>) => Promise<void>
}

export default function PolicyInfoPage({ data, onSave }: PolicyInfoPageProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [formData, setFormData] = useState<PolicyInfo>(data)

  useEffect(() => {
    setFormData(data)
  }, [data])

  const handleEdit = () => {
    setIsEditing(true)
  }

  const handleCancel = () => {
    if (JSON.stringify(formData) !== JSON.stringify(data)) {
      if (!confirm('您有未保存的修改，确定要取消吗？')) {
        return
      }
    }
    setFormData(data)
    setIsEditing(false)
  }

  const handleSave = async () => {
    // 验证必填项
    if (!formData.checkinStartTime?.trim()) {
      alert('请填写开始办理入住时间')
      return
    }
    if (!formData.checkoutEndTime?.trim()) {
      alert('请填写最晚退房时间')
      return
    }

    // 如果选择限时免费取消，验证相关字段
    if (formData.cancellationRule === 'free_cancel') {
      if (!formData.freeCancelDays || formData.freeCancelDays < 0) {
        alert('请填写免费取消天数')
        return
      }
      if (!formData.freeCancelTime?.trim()) {
        alert('请填写免费取消时间')
        return
      }
      if (!formData.afterCancelRule) {
        alert('请选择超时处理方式')
        return
      }
    }

    // 如果选择年龄限制，验证最小年龄
    if (formData.ageRestriction === 'limited') {
      if (!formData.minAge || formData.minAge < 0) {
        alert('请填写最小年龄')
        return
      }
    }

    setIsSaving(true)
    try {
      await onSave(formData)
      setIsEditing(false)
    } catch (error) {
      alert('保存失败，请重试')
    } finally {
      setIsSaving(false)
    }
  }

  const updateField = <K extends keyof PolicyInfo>(field: K, value: PolicyInfo[K]) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const toggleCard = (cardValue: string, category: 'accepted' | 'guarantee') => {
    const field = category === 'accepted' ? 'acceptedCards' : 'guaranteeCards'
    const currentCards =
      category === 'accepted'
        ? formData.paymentMethods.acceptedCards
        : formData.guaranteeCards

    if (currentCards.includes(cardValue)) {
      if (category === 'accepted') {
        updateField('paymentMethods', {
          ...formData.paymentMethods,
          acceptedCards: currentCards.filter((c) => c !== cardValue),
        })
      } else {
        updateField(
          'guaranteeCards',
          currentCards.filter((c) => c !== cardValue)
        )
      }
    } else {
      if (category === 'accepted') {
        updateField('paymentMethods', {
          ...formData.paymentMethods,
          acceptedCards: [...currentCards, cardValue],
        })
      } else {
        updateField('guaranteeCards', [...currentCards, cardValue])
      }
    }
  }

  const toggleThirdParty = (value: string) => {
    const current = formData.paymentMethods.thirdPartyPayments
    if (current.includes(value)) {
      updateField('paymentMethods', {
        ...formData.paymentMethods,
        thirdPartyPayments: current.filter((p) => p !== value),
      })
    } else {
      updateField('paymentMethods', {
        ...formData.paymentMethods,
        thirdPartyPayments: [...current, value],
      })
    }
  }

  return (
    <div className="space-y-6">
      {/* 入住及退房时间 */}
      <EditableSection
        title="入住及退房时间"
        isEditing={isEditing}
        onEdit={handleEdit}
        onSave={handleSave}
        onCancel={handleCancel}
        isSaving={isSaving}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField label="开始办理入住时间" required hint="默认14:00">
            {isEditing ? (
              <Input
                type="time"
                value={formData.checkinStartTime}
                onChange={(e) => updateField('checkinStartTime', e.target.value)}
                className="h-9 border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
              />
            ) : (
              <div className="h-9 flex items-center text-slate-900">
                {formData.checkinStartTime || '—'}
              </div>
            )}
          </FormField>

          <FormField label="最晚退房时间" required hint="默认12:00">
            {isEditing ? (
              <Input
                type="time"
                value={formData.checkoutEndTime}
                onChange={(e) => updateField('checkoutEndTime', e.target.value)}
                className="h-9 border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
              />
            ) : (
              <div className="h-9 flex items-center text-slate-900">
                {formData.checkoutEndTime || '—'}
              </div>
            )}
          </FormField>

          <FormField label="入住备注" className="md:col-span-2">
            {isEditing ? (
              <Textarea
                value={formData.checkinNote || ''}
                onChange={(e) => updateField('checkinNote', e.target.value)}
                placeholder="请输入入住备注"
                rows={3}
                className="border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 resize-none"
              />
            ) : (
              <div className="text-slate-900 whitespace-pre-wrap">
                {formData.checkinNote || '—'}
              </div>
            )}
          </FormField>
        </div>
      </EditableSection>

      {/* 取消政策 */}
      <EditableSection title="取消政策" isEditing={isEditing} hideActions>
        <div className="space-y-6">
          <FormField label="取消规则" required>
            {isEditing ? (
              <RadioGroup
                value={formData.cancellationRule}
                onValueChange={(value: 'no_cancel' | 'free_cancel') =>
                  updateField('cancellationRule', value)
                }
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no_cancel" id="no_cancel" />
                  <Label htmlFor="no_cancel" className="font-normal cursor-pointer">
                    一经确认不可取消修改
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="free_cancel" id="free_cancel" />
                  <Label htmlFor="free_cancel" className="font-normal cursor-pointer">
                    限时免费取消
                  </Label>
                </div>
              </RadioGroup>
            ) : (
              <div className="h-9 flex items-center text-slate-900">
                {formData.cancellationRule === 'no_cancel'
                  ? '一经确认不可取消修改'
                  : '限时免费取消'}
              </div>
            )}
          </FormField>

          {formData.cancellationRule === 'free_cancel' && (
            <div className="pl-6 border-l-2 border-blue-200 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField label="免费取消截止" required>
                  {isEditing ? (
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-slate-600">入住日前</span>
                      <Input
                        type="number"
                        min="0"
                        value={formData.freeCancelDays || ''}
                        onChange={(e) =>
                          updateField('freeCancelDays', parseInt(e.target.value) || 0)
                        }
                        className="h-9 w-20 border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                      />
                      <span className="text-sm text-slate-600">天</span>
                      <Input
                        type="time"
                        value={formData.freeCancelTime || ''}
                        onChange={(e) => updateField('freeCancelTime', e.target.value)}
                        className="h-9 border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                      />
                      <span className="text-sm text-slate-600">前可免费取消</span>
                    </div>
                  ) : (
                    <div className="h-9 flex items-center text-slate-900">
                      入住日前 {formData.freeCancelDays} 天 {formData.freeCancelTime} 前可免费取消
                    </div>
                  )}
                </FormField>
              </div>

              <FormField label="超时处理" required>
                {isEditing ? (
                  <RadioGroup
                    value={formData.afterCancelRule || ''}
                    onValueChange={(value: 'not_allowed' | 'penalty') =>
                      updateField('afterCancelRule', value)
                    }
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="not_allowed" id="not_allowed" />
                      <Label htmlFor="not_allowed" className="font-normal cursor-pointer">
                        此后不允许取消
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="penalty" id="penalty" />
                      <Label htmlFor="penalty" className="font-normal cursor-pointer">
                        收取取消违约金
                      </Label>
                    </div>
                  </RadioGroup>
                ) : (
                  <div className="h-9 flex items-center text-slate-900">
                    {formData.afterCancelRule === 'not_allowed'
                      ? '此后不允许取消'
                      : '收取取消违约金'}
                  </div>
                )}
              </FormField>
            </div>
          )}
        </div>
      </EditableSection>

      {/* 办理入住年龄 */}
      <EditableSection title="办理入住年龄" isEditing={isEditing} hideActions>
        <div className="space-y-4">
          <FormField label="年龄限制" required>
            {isEditing ? (
              <RadioGroup
                value={formData.ageRestriction}
                onValueChange={(value: 'no_limit' | 'limited') =>
                  updateField('ageRestriction', value)
                }
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no_limit" id="no_limit" />
                  <Label htmlFor="no_limit" className="font-normal cursor-pointer">
                    不限制
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="limited" id="limited" />
                  <Label htmlFor="limited" className="font-normal cursor-pointer">
                    限制
                  </Label>
                </div>
              </RadioGroup>
            ) : (
              <div className="h-9 flex items-center text-slate-900">
                {formData.ageRestriction === 'no_limit' ? '不限制' : '限制'}
              </div>
            )}
          </FormField>

          {formData.ageRestriction === 'limited' && (
            <div className="pl-6 border-l-2 border-blue-200">
              <FormField label="最小年龄" required>
                {isEditing ? (
                  <div className="flex items-center gap-2">
                    <Input
                      type="number"
                      min="0"
                      max="100"
                      value={formData.minAge || ''}
                      onChange={(e) => updateField('minAge', parseInt(e.target.value) || 0)}
                      className="h-9 w-24 border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                    />
                    <span className="text-sm text-slate-600">岁</span>
                  </div>
                ) : (
                  <div className="h-9 flex items-center text-slate-900">
                    {formData.minAge} 岁
                  </div>
                )}
              </FormField>
            </div>
          )}
        </div>
      </EditableSection>

      {/* 宠物政策 */}
      <EditableSection title="宠物政策" isEditing={isEditing} hideActions>
        <div className="space-y-4">
          <FormField label="宠物政策" required>
            {isEditing ? (
              <RadioGroup
                value={formData.petPolicy}
                onValueChange={(value: 'not_allowed' | 'allowed' | 'on_request') =>
                  updateField('petPolicy', value)
                }
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="not_allowed" id="pet_not_allowed" />
                  <Label htmlFor="pet_not_allowed" className="font-normal cursor-pointer">
                    不可携带宠物
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="allowed" id="pet_allowed" />
                  <Label htmlFor="pet_allowed" className="font-normal cursor-pointer">
                    可携带宠物
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="on_request" id="pet_on_request" />
                  <Label htmlFor="pet_on_request" className="font-normal cursor-pointer">
                    应要求可携带宠物
                  </Label>
                </div>
              </RadioGroup>
            ) : (
              <div className="h-9 flex items-center text-slate-900">
                {formData.petPolicy === 'not_allowed'
                  ? '不可携带宠物'
                  : formData.petPolicy === 'allowed'
                    ? '可携带宠物'
                    : '应要求可携带宠物'}
              </div>
            )}
          </FormField>

          {formData.petPolicy !== 'not_allowed' && (
            <FormField label="宠物补充说明">
              {isEditing ? (
                <Textarea
                  value={formData.petNote || ''}
                  onChange={(e) => updateField('petNote', e.target.value)}
                  placeholder="请输入宠物政策补充说明"
                  rows={3}
                  className="border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 resize-none"
                />
              ) : (
                <div className="text-slate-900 whitespace-pre-wrap">
                  {formData.petNote || '—'}
                </div>
              )}
            </FormField>
          )}
        </div>
      </EditableSection>

      {/* 支付方式 */}
      <EditableSection title="支付方式" isEditing={isEditing} hideActions>
        <div className="space-y-6">
          <FormField label="可接受的银行卡">
            {isEditing ? (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {CARD_TYPES.map((card) => (
                  <div key={card.value} className="flex items-center space-x-2">
                    <Checkbox
                      id={`card-${card.value}`}
                      checked={formData.paymentMethods.acceptedCards.includes(card.value)}
                      onCheckedChange={() => toggleCard(card.value, 'accepted')}
                    />
                    <Label
                      htmlFor={`card-${card.value}`}
                      className="font-normal cursor-pointer"
                    >
                      {card.label}
                    </Label>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-slate-900">
                {formData.paymentMethods.acceptedCards.length > 0
                  ? CARD_TYPES.filter((c) =>
                      formData.paymentMethods.acceptedCards.includes(c.value)
                    )
                      .map((c) => c.label)
                      .join('、')
                  : '—'}
              </div>
            )}
          </FormField>

          <FormField label="常用第三方支付">
            {isEditing ? (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {THIRD_PARTY_PAYMENTS.map((payment) => (
                  <div key={payment.value} className="flex items-center space-x-2">
                    <Checkbox
                      id={`payment-${payment.value}`}
                      checked={formData.paymentMethods.thirdPartyPayments.includes(
                        payment.value
                      )}
                      onCheckedChange={() => toggleThirdParty(payment.value)}
                    />
                    <Label
                      htmlFor={`payment-${payment.value}`}
                      className="font-normal cursor-pointer"
                    >
                      {payment.label}
                    </Label>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-slate-900">
                {formData.paymentMethods.thirdPartyPayments.length > 0
                  ? THIRD_PARTY_PAYMENTS.filter((p) =>
                      formData.paymentMethods.thirdPartyPayments.includes(p.value)
                    )
                      .map((p) => p.label)
                      .join('、')
                  : '—'}
              </div>
            )}
          </FormField>

          <FormField label="现金支付">
            {isEditing ? (
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="cash-payment"
                  checked={formData.paymentMethods.cashPayment}
                  onCheckedChange={(checked) =>
                    updateField('paymentMethods', {
                      ...formData.paymentMethods,
                      cashPayment: checked === true,
                    })
                  }
                />
                <Label htmlFor="cash-payment" className="font-normal cursor-pointer">
                  现金支付
                </Label>
              </div>
            ) : (
              <div className="text-slate-900">
                {formData.paymentMethods.cashPayment ? '支持' : '不支持'}
              </div>
            )}
          </FormField>
        </div>
      </EditableSection>

      {/* 预订担保可用银行卡 */}
      <EditableSection title="预订担保可用银行卡" isEditing={isEditing} hideActions>
        <FormField label="可用卡种">
          {isEditing ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {CARD_TYPES.map((card) => (
                <div key={card.value} className="flex items-center space-x-2">
                  <Checkbox
                    id={`guarantee-${card.value}`}
                    checked={formData.guaranteeCards.includes(card.value)}
                    onCheckedChange={() => toggleCard(card.value, 'guarantee')}
                  />
                  <Label
                    htmlFor={`guarantee-${card.value}`}
                    className="font-normal cursor-pointer"
                  >
                    {card.label}
                  </Label>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-slate-900">
              {formData.guaranteeCards.length > 0
                ? CARD_TYPES.filter((c) => formData.guaranteeCards.includes(c.value))
                    .map((c) => c.label)
                    .join('、')
                : '—'}
            </div>
          )}
        </FormField>
      </EditableSection>

      {/* 政策补充 */}
      <EditableSection title="政策补充" isEditing={isEditing} hideActions>
        <FormField label="补充说明">
          {isEditing ? (
            <Textarea
              value={formData.policyNote || ''}
              onChange={(e) => updateField('policyNote', e.target.value)}
              placeholder="请输入其他未涵盖的政策说明"
              rows={6}
              className="border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 resize-none"
            />
          ) : (
            <div className="text-slate-900 whitespace-pre-wrap">
              {formData.policyNote || '—'}
            </div>
          )}
        </FormField>
      </EditableSection>
    </div>
  )
}
