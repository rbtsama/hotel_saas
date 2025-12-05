<template>
  <div v-if="data" class="space-y-6">
    <!-- 预订时间 -->
    <EditableSection
      title="预订时间"
      :is-editing="isEditing"
      :is-saving="isSaving"
      @edit="handleEdit"
      @save="handleSave"
      @cancel="handleCancel"
    >
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField label="开始办理入住时间" required hint="格式：HH:mm">
          <a-time-picker
            v-if="isEditing"
            v-model:value="formData.checkinStartTime"
            format="HH:mm"
            :allowClear="false"
            class="w-full h-9"
          />
          <div v-else class="h-9 flex items-center text-slate-900">
            {{ formData.checkinStartTime || '—' }}
          </div>
        </FormField>

        <FormField label="最晚退房时间" required hint="格式：HH:mm">
          <a-time-picker
            v-if="isEditing"
            v-model:value="formData.checkoutEndTime"
            format="HH:mm"
            :allowClear="false"
            class="w-full h-9"
          />
          <div v-else class="h-9 flex items-center text-slate-900">
            {{ formData.checkoutEndTime || '—' }}
          </div>
        </FormField>

        <FormField label="入住备注" class="md:col-span-2">
          <a-textarea
            v-if="isEditing"
            v-model:value="formData.checkinNote"
            placeholder="请输入入住备注"
            :rows="3"
          />
          <div v-else class="text-slate-900 whitespace-pre-wrap">
            {{ formData.checkinNote || '—' }}
          </div>
        </FormField>
      </div>
    </EditableSection>

    <!-- 取消规则 -->
    <EditableSection title="取消规则" :is-editing="isEditing" hide-actions>
      <div class="space-y-6">
        <FormField label="取消规则" required>
          <a-radio-group v-if="isEditing" v-model:value="formData.cancellationRule">
            <a-radio value="no_cancel">一经确认不可取消修改</a-radio>
            <a-radio value="free_cancel">限时免费取消</a-radio>
          </a-radio-group>
          <div v-else class="h-9 flex items-center text-slate-900">
            {{ formData.cancellationRule === 'no_cancel' ? '一经确认不可取消修改' : '限时免费取消' }}
          </div>
        </FormField>

        <div v-if="formData.cancellationRule === 'free_cancel'" class="pl-6 border-l-2 border-blue-200 space-y-4">
          <FormField label="免费取消截止" required>
            <div v-if="isEditing" class="flex flex-wrap items-center gap-2">
              <span class="text-sm text-slate-600">入住日前</span>
              <a-input-number
                v-model:value="formData.freeCancelDays"
                :min="0"
                class="w-20"
              />
              <span class="text-sm text-slate-600">天</span>
              <a-time-picker
                v-model:value="formData.freeCancelTime"
                format="HH:mm"
                :allowClear="false"
              />
              <span class="text-sm text-slate-600">前可免费取消</span>
            </div>
            <div v-else class="h-9 flex items-center text-slate-900">
              入住日前 {{ formData.freeCancelDays }} 天 {{ formData.freeCancelTime }} 前可免费取消
            </div>
          </FormField>

          <FormField label="此后取消处理" required>
            <a-radio-group v-if="isEditing" v-model:value="formData.afterCancelRule">
              <a-radio value="not_allowed">此后不允许取消</a-radio>
              <a-radio value="penalty">收取取消违约金</a-radio>
            </a-radio-group>
            <div v-else class="h-9 flex items-center text-slate-900">
              {{ formData.afterCancelRule === 'not_allowed' ? '此后不允许取消' : '收取取消违约金' }}
            </div>
          </FormField>
        </div>
      </div>
    </EditableSection>

    <!-- 办理入住年龄 -->
    <EditableSection title="办理入住年龄" :is-editing="isEditing" hide-actions>
      <div class="space-y-4">
        <FormField label="年龄限制" required>
          <a-radio-group v-if="isEditing" v-model:value="formData.ageRestriction">
            <a-radio value="no_limit">不限制</a-radio>
            <a-radio value="limited">限制</a-radio>
          </a-radio-group>
          <div v-else class="h-9 flex items-center text-slate-900">
            {{ formData.ageRestriction === 'no_limit' ? '不限制' : '限制' }}
          </div>
        </FormField>

        <div v-if="formData.ageRestriction === 'limited'" class="pl-6 border-l-2 border-blue-200 space-y-4">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField label="最小年龄" required>
              <a-select
                v-if="isEditing"
                v-model:value="formData.minAge"
                placeholder="请选择最小年龄"
                class="w-full"
              >
                <a-select-option v-for="age in ageOptions" :key="age" :value="age">
                  {{ age }} 岁
                </a-select-option>
              </a-select>
              <div v-else class="h-9 flex items-center text-slate-900">
                {{ formData.minAge ? `${formData.minAge} 岁` : '—' }}
              </div>
            </FormField>

            <FormField label="最大年龄">
              <a-select
                v-if="isEditing"
                v-model:value="formData.maxAge"
                placeholder="请选择最大年龄"
                class="w-full"
              >
                <a-select-option value="unlimited">不限</a-select-option>
                <a-select-option v-for="age in ageOptions" :key="age" :value="age">
                  {{ age }} 岁
                </a-select-option>
              </a-select>
              <div v-else class="h-9 flex items-center text-slate-900">
                {{ maxAgeLabel }}
              </div>
            </FormField>
          </div>
        </div>
      </div>
    </EditableSection>

    <!-- 儿童政策 -->
    <EditableSection title="儿童政策" :is-editing="isEditing" hide-actions>
      <div class="space-y-4">
        <FormField label="儿童政策" required>
          <a-radio-group v-if="isEditing" v-model:value="formData.childPolicy">
            <a-radio value="allowed">允许携带儿童</a-radio>
            <a-radio value="on_request">需提前确认</a-radio>
            <a-radio value="not_allowed">不接待儿童</a-radio>
          </a-radio-group>
          <div v-else class="h-9 flex items-center text-slate-900">
            {{ childPolicyLabel }}
          </div>
        </FormField>

        <FormField label="儿童政策说明">
          <a-textarea
            v-if="isEditing"
            v-model:value="formData.childNote"
            placeholder="请输入儿童政策补充说明"
            :rows="3"
          />
          <div v-else class="text-slate-900 whitespace-pre-wrap">
            {{ formData.childNote || '—' }}
          </div>
        </FormField>
      </div>
    </EditableSection>

    <!-- 宠物政策 -->
    <EditableSection title="宠物政策" :is-editing="isEditing" hide-actions>
      <div class="space-y-4">
        <FormField label="宠物政策" required>
          <a-radio-group v-if="isEditing" v-model:value="formData.petPolicy">
            <a-radio value="allowed">允许携带宠物</a-radio>
            <a-radio value="on_request">需提前确认</a-radio>
            <a-radio value="not_allowed">不允许携带宠物</a-radio>
          </a-radio-group>
          <div v-else class="h-9 flex items-center text-slate-900">
            {{ petPolicyLabel }}
          </div>
        </FormField>

        <FormField label="宠物政策说明">
          <a-textarea
            v-if="isEditing"
            v-model:value="formData.petNote"
            placeholder="请输入宠物政策补充说明"
            :rows="3"
          />
          <div v-else class="text-slate-900 whitespace-pre-wrap">
            {{ formData.petNote || '—' }}
          </div>
        </FormField>
      </div>
    </EditableSection>

    <!-- 押金政策 -->
    <EditableSection title="押金政策" :is-editing="isEditing" hide-actions>
      <div class="space-y-4">
        <FormField label="是否需要押金" required>
          <a-radio-group v-if="isEditing" v-model:value="formData.depositType">
            <a-radio value="none">否</a-radio>
            <a-radio value="fixed">固定金额</a-radio>
            <a-radio value="per_room">按预订房间数量</a-radio>
            <a-radio value="per_day">按预订天数</a-radio>
          </a-radio-group>
          <div v-else class="h-9 flex items-center text-slate-900">
            {{ depositTypeLabel }}
          </div>
        </FormField>

        <div v-if="formData.depositType !== 'none'" class="pl-6 border-l-2 border-blue-200">
          <FormField label="押金金额" required>
            <div v-if="isEditing" class="flex items-center gap-2">
              <a-input-number
                v-model:value="formData.depositAmount"
                :min="0"
                :step="0.01"
                class="w-32"
              />
              <span class="text-sm text-slate-600">元</span>
            </div>
            <div v-else class="h-9 flex items-center text-slate-900">
              ¥{{ (formData.depositAmount || 0).toFixed(2) }}
            </div>
          </FormField>
        </div>
      </div>
    </EditableSection>

    <!-- 前台可用支付方式 -->
    <EditableSection title="前台可用支付方式" :is-editing="isEditing" hide-actions>
      <div class="space-y-6">
        <FormField label="可接受的银行卡">
          <div v-if="isEditing" class="grid grid-cols-2 md:grid-cols-4 gap-3">
            <a-checkbox
              v-for="card in CARD_TYPES"
              :key="card.value"
              :checked="formData.acceptedCards.includes(card.value)"
              @change="() => toggleArrayItem('acceptedCards', card.value)"
            >
              {{ card.label }}
            </a-checkbox>
          </div>
          <div v-else class="text-slate-900">
            {{ acceptedCardsLabel }}
          </div>
        </FormField>

        <FormField label="常用第三方支付">
          <div v-if="isEditing" class="grid grid-cols-2 md:grid-cols-3 gap-3">
            <a-checkbox
              v-for="payment in THIRD_PARTY_PAYMENTS"
              :key="payment.value"
              :checked="formData.thirdPartyPayments.includes(payment.value)"
              @change="() => toggleArrayItem('thirdPartyPayments', payment.value)"
            >
              {{ payment.label }}
            </a-checkbox>
          </div>
          <div v-else class="text-slate-900">
            {{ thirdPartyPaymentsLabel }}
          </div>
        </FormField>

        <FormField label="现金支付">
          <a-checkbox v-if="isEditing" v-model:checked="formData.cashPayment">
            支持现金支付
          </a-checkbox>
          <div v-else class="h-9 flex items-center text-slate-900">
            {{ formData.cashPayment ? '支持' : '不支持' }}
          </div>
        </FormField>
      </div>
    </EditableSection>

    <!-- 预订担保可用银行卡 -->
    <EditableSection title="预订担保可用银行卡" :is-editing="isEditing" hide-actions>
      <FormField label="可用卡种">
        <div v-if="isEditing" class="grid grid-cols-2 md:grid-cols-4 gap-3">
          <a-checkbox
            v-for="card in CARD_TYPES"
            :key="card.value"
            :checked="formData.guaranteeCards.includes(card.value)"
            @change="() => toggleArrayItem('guaranteeCards', card.value)"
          >
            {{ card.label }}
          </a-checkbox>
        </div>
        <div v-else class="text-slate-900">
          {{ guaranteeCardsLabel }}
        </div>
      </FormField>
    </EditableSection>

    <!-- 政策补充 -->
    <EditableSection title="政策补充" :is-editing="isEditing" hide-actions>
      <FormField label="补充说明">
        <a-textarea
          v-if="isEditing"
          v-model:value="formData.policyNote"
          placeholder="请输入其他未涵盖的政策说明"
          :rows="6"
        />
        <div v-else class="text-slate-900 whitespace-pre-wrap">
          {{ formData.policyNote || '—' }}
        </div>
      </FormField>
    </EditableSection>
  </div>
</template>

<script>
import { defineComponent, ref, watch, computed } from '@vue/composition-api'
import { Modal } from 'ant-design-vue'
import EditableSection from './EditableSection.vue'
import FormField from './FormField.vue'
import { CARD_TYPES, THIRD_PARTY_PAYMENTS } from '../types/storeInfo.types'

export default defineComponent({
  name: 'PolicyInfoContent',
  components: {
    EditableSection,
    FormField
  },
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  emits: ['save'],
  setup(props, { emit }) {
    const isEditing = ref(false)
    const isSaving = ref(false)
    const formData = ref({ ...props.data })

    const ageOptions = Array.from({ length: 83 }, (_, i) => i + 18)

    watch(() => props.data, (newData) => {
      formData.value = { ...newData }
    }, { deep: true })

    const handleEdit = () => {
      isEditing.value = true
    }

    const handleCancel = () => {
      if (JSON.stringify(formData.value) !== JSON.stringify(props.data)) {
        Modal.confirm({
          title: '确认取消',
          content: '您有未保存的修改，确定要取消吗？',
          onOk: () => {
            formData.value = { ...props.data }
            isEditing.value = false
          }
        })
      } else {
        formData.value = { ...props.data }
        isEditing.value = false
      }
    }

    const handleSave = async () => {
      // 验证必填项
      if (!formData.value.checkinStartTime?.trim()) {
        Modal.error({ content: '请填写开始办理入住时间' })
        return
      }
      if (!formData.value.checkoutEndTime?.trim()) {
        Modal.error({ content: '请填写最晚退房时间' })
        return
      }

      if (formData.value.cancellationRule === 'free_cancel') {
        if (!formData.value.freeCancelDays || formData.value.freeCancelDays < 0) {
          Modal.error({ content: '请填写免费取消天数' })
          return
        }
        if (!formData.value.freeCancelTime?.trim()) {
          Modal.error({ content: '请填写免费取消时间' })
          return
        }
        if (!formData.value.afterCancelRule) {
          Modal.error({ content: '请选择超时处理方式' })
          return
        }
      }

      if (formData.value.ageRestriction === 'limited') {
        if (!formData.value.minAge || formData.value.minAge < 18) {
          Modal.error({ content: '请填写最小年龄（最小18岁）' })
          return
        }
      }

      if (formData.value.depositType !== 'none') {
        if (!formData.value.depositAmount || formData.value.depositAmount <= 0) {
          Modal.error({ content: '请填写押金金额' })
          return
        }
      }

      isSaving.value = true
      try {
        await emit('save', formData.value)
        isEditing.value = false
      } catch (error) {
        Modal.error({ content: '保存失败，请重试' })
      } finally {
        isSaving.value = false
      }
    }

    const toggleArrayItem = (field, value) => {
      const currentArray = formData.value[field]
      if (currentArray.includes(value)) {
        formData.value[field] = currentArray.filter((item) => item !== value)
      } else {
        formData.value[field] = [...currentArray, value]
      }
    }

    const maxAgeLabel = computed(() => {
      return formData.value.maxAge === 'unlimited' ? '不限' : (formData.value.maxAge ? `${formData.value.maxAge} 岁` : '—')
    })

    const childPolicyLabel = computed(() => {
      const map = {
        allowed: '允许携带儿童',
        on_request: '需提前确认',
        not_allowed: '不接待儿童'
      }
      return map[formData.value.childPolicy] || '—'
    })

    const petPolicyLabel = computed(() => {
      const map = {
        allowed: '允许携带宠物',
        on_request: '需提前确认',
        not_allowed: '不允许携带宠物'
      }
      return map[formData.value.petPolicy] || '—'
    })

    const depositTypeLabel = computed(() => {
      const map = {
        none: '否',
        fixed: '固定金额',
        per_room: '按预订房间数量',
        per_day: '按预订天数'
      }
      return map[formData.value.depositType] || '—'
    })

    const acceptedCardsLabel = computed(() => {
      if (formData.value.acceptedCards.length === 0) return '—'
      return CARD_TYPES.filter(c => formData.value.acceptedCards.includes(c.value))
        .map(c => c.label)
        .join('、')
    })

    const thirdPartyPaymentsLabel = computed(() => {
      if (formData.value.thirdPartyPayments.length === 0) return '—'
      return THIRD_PARTY_PAYMENTS.filter(p => formData.value.thirdPartyPayments.includes(p.value))
        .map(p => p.label)
        .join('、')
    })

    const guaranteeCardsLabel = computed(() => {
      if (formData.value.guaranteeCards.length === 0) return '—'
      return CARD_TYPES.filter(c => formData.value.guaranteeCards.includes(c.value))
        .map(c => c.label)
        .join('、')
    })

    return {
      isEditing,
      isSaving,
      formData,
      ageOptions,
      CARD_TYPES,
      THIRD_PARTY_PAYMENTS,
      handleEdit,
      handleCancel,
      handleSave,
      toggleArrayItem,
      maxAgeLabel,
      childPolicyLabel,
      petPolicyLabel,
      depositTypeLabel,
      acceptedCardsLabel,
      thirdPartyPaymentsLabel,
      guaranteeCardsLabel
    }
  }
})
</script>
