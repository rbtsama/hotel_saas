<template>
  <sidebar>
    <div class="page-container space-y-6">
      <!-- 早餐基本设置 -->
      <EditableSection
        title="早餐基本设置"
        :is-editing="isEditing"
        :is-saving="isSaving"
        @edit="handleEdit"
        @save="handleSave"
        @cancel="handleCancel"
      >
        <div class="space-y-6">
          <!-- 是否提供早餐 -->
          <FormField label="是否提供早餐" required>
            <a-radio-group v-if="isEditing" v-model="formData.provided">
              <a-radio :value="true">提供</a-radio>
              <a-radio :value="false">不提供</a-radio>
            </a-radio-group>
            <div v-else class="h-9 flex items-center text-slate-900">
              {{ formData.provided ? '提供' : '不提供' }}
            </div>
          </FormField>

          <div v-if="formData.provided" class="space-y-6 pl-6 border-l-2 border-blue-200">
            <!-- 早餐类型 -->
            <FormField label="早餐类型" required>
              <a-radio-group v-if="isEditing" v-model="formData.breakfastType">
                <a-radio
                  v-for="type in BREAKFAST_TYPES"
                  :key="type.value"
                  :value="type.value"
                >
                  {{ type.label }}
                </a-radio>
              </a-radio-group>
              <div v-else class="h-9 flex items-center text-slate-900">
                {{ getBreakfastTypeLabel(formData.breakfastType) }}
              </div>
            </FormField>

            <!-- 菜系 -->
            <FormField label="菜系" required>
              <div v-if="isEditing" class="grid grid-cols-2 md:grid-cols-4 gap-3">
                <a-checkbox
                  v-for="cuisine in CUISINE_TYPES"
                  :key="cuisine.value"
                  :checked="(formData.cuisineTypes || []).includes(cuisine.value)"
                  @change="() => toggleCuisine(cuisine.value)"
                >
                  {{ cuisine.label }}
                </a-checkbox>
              </div>
              <div v-else class="text-slate-900">
                {{ getCuisineTypesLabel() }}
              </div>
            </FormField>

            <!-- 早餐时间 -->
            <FormField label="早餐时间" required>
              <div v-if="isEditing" class="space-y-3">
                <a-radio-group v-model="formData.timeType">
                  <a-radio
                    v-for="type in BREAKFAST_TIME_TYPES"
                    :key="type.value"
                    :value="type.value"
                  >
                    {{ type.label }}
                  </a-radio>
                </a-radio-group>

                <div v-if="formData.timeType === 'specified'" class="flex items-center gap-4 pl-6">
                  <div class="flex items-center gap-2">
                    <label class="text-sm text-slate-600">开始时间</label>
                    <a-time-picker v-model="startTime" format="HH:mm" />
                  </div>
                  <div class="flex items-center gap-2">
                    <label class="text-sm text-slate-600">结束时间</label>
                    <a-time-picker v-model="endTime" format="HH:mm" />
                  </div>
                </div>
              </div>
              <div v-else class="h-9 flex items-center text-slate-900">
                {{ getTimeTypeLabel() }}
              </div>
            </FormField>

            <!-- 加1份早餐价格 -->
            <FormField label="加1份早餐价格" required>
              <div v-if="isEditing" class="flex items-center gap-2">
                <a-input-number
                  v-model="formData.additionalPrice"
                  :min="0"
                  :step="0.01"
                  class="w-32"
                />
                <span class="text-sm text-slate-600">元</span>
              </div>
              <div v-else class="h-9 flex items-center text-slate-900">
                ¥{{ formData.additionalPrice || 0 }}
              </div>
            </FormField>
          </div>
        </div>
      </EditableSection>

      <!-- 儿童早餐收费 -->
      <EditableSection
        v-if="formData.provided"
        title="儿童早餐收费"
        :is-editing="isEditing"
        hide-actions
      >
        <div class="space-y-4">
          <!-- 计价方式 -->
          <FormField label="计价方式" required>
            <a-radio-group v-if="isEditing" v-model="formData.childPricingType">
              <a-radio
                v-for="type in CHILD_PRICING_TYPES"
                :key="type.value"
                :value="type.value"
              >
                {{ type.label }}定价
              </a-radio>
            </a-radio-group>
            <div v-else class="h-9 flex items-center text-slate-900">
              {{ formData.childPricingType === 'age' ? '按年龄定价' : '按身高定价' }}
            </div>
          </FormField>

          <!-- 收费规则表格 -->
          <div v-if="isEditing" class="space-y-4">
            <a-table
              :columns="childPriceColumns"
              :data-source="formData.childPriceRules || []"
              :pagination="false"
              bordered
              row-key="id"
            >
              <template slot="minValue" slot-scope="text, record">
                <a-input-number v-model="record.minValue" :min="0" class="w-full" />
              </template>
              <template slot="maxValue" slot-scope="text, record">
                <a-select v-model="record.maxValue" class="w-full">
                  <a-select-option value="unlimited">不限</a-select-option>
                  <a-select-option
                    v-for="i in 20"
                    :key="i"
                    :value="formData.childPricingType === 'age' ? i : i * 10"
                  >
                    {{ formData.childPricingType === 'age' ? i : i * 10 }}
                  </a-select-option>
                </a-select>
              </template>
              <template slot="isFree" slot-scope="text, record">
                <a-select v-model="record.isFree" class="w-full">
                  <a-select-option :value="true">免费</a-select-option>
                  <a-select-option :value="false">收费</a-select-option>
                </a-select>
              </template>
              <template slot="price" slot-scope="text, record">
                <a-input-number
                  v-if="!record.isFree"
                  v-model="record.price"
                  :min="0"
                  :step="0.01"
                  class="w-full"
                />
              </template>
              <template slot="action" slot-scope="text, record">
                <a-button size="small" type="danger" @click="removePriceRule(record.id)">
                  <a-icon type="delete" />
                </a-button>
              </template>
            </a-table>

            <a-button @click="addPriceRule">
              <a-icon type="plus" />
              增加
            </a-button>
          </div>

          <!-- 查看状态 -->
          <div v-else class="space-y-2">
            <template v-if="(formData.childPriceRules || []).length > 0">
              <div
                v-for="rule in formData.childPriceRules"
                :key="rule.id"
                class="flex items-center justify-between py-2 px-3 bg-slate-50 rounded"
              >
                <span class="text-slate-900">{{ formatRuleRange(rule) }}</span>
                <span class="text-sm text-slate-600">
                  {{ rule.isFree ? '免费' : `¥${rule.price}` }}
                </span>
              </div>
            </template>
            <div v-else class="text-center text-slate-500 py-4">暂无收费规则</div>
          </div>
        </div>
      </EditableSection>
    </div>
  </sidebar>
</template>

<script>
import { defineComponent, ref, computed, onMounted, watch } from '@vue/composition-api'
import moment from 'moment'
import Sidebar from '@/components/Layout/Sidebar.vue'
import EditableSection from './components/EditableSection.vue'
import FormField from './components/FormField.vue'
import {
  BREAKFAST_TYPES,
  CUISINE_TYPES,
  BREAKFAST_TIME_TYPES,
  CHILD_PRICING_TYPES,
} from './types/storeInfo.types'
import storeInfoService from './services/storeInfo.service'

export default defineComponent({
  name: 'BreakfastPage',
  components: { Sidebar, EditableSection, FormField },
  setup() {
    const isEditing = ref(false)
    const isSaving = ref(false)
    const originalData = ref(null)
    const formData = ref({ provided: false })
    const startTime = ref(undefined)
    const endTime = ref(undefined)

    const childPriceColumns = computed(() => [
      {
        title: formData.value.childPricingType === 'age' ? '最小年龄(岁)' : '最小身高(cm)',
        dataIndex: 'minValue',
        scopedSlots: { customRender: 'minValue' },
      },
      {
        title: formData.value.childPricingType === 'age' ? '最大年龄(岁)' : '最大身高(cm)',
        dataIndex: 'maxValue',
        scopedSlots: { customRender: 'maxValue' },
      },
      { title: '费用', dataIndex: 'isFree', scopedSlots: { customRender: 'isFree' } },
      { title: '金额(元)', dataIndex: 'price', scopedSlots: { customRender: 'price' } },
      { title: '操作', dataIndex: 'action', scopedSlots: { customRender: 'action' } },
    ])

    const loadData = async () => {
      const data = await storeInfoService.getBreakfastPolicy()
      originalData.value = JSON.parse(JSON.stringify(data))
      formData.value = JSON.parse(JSON.stringify(data))

      if (data.startTime) {
        startTime.value = moment(data.startTime, 'HH:mm')
      }
      if (data.endTime) {
        endTime.value = moment(data.endTime, 'HH:mm')
      }
    }

    watch([startTime, endTime], () => {
      if (startTime.value) {
        formData.value.startTime = startTime.value.format('HH:mm')
      }
      if (endTime.value) {
        formData.value.endTime = endTime.value.format('HH:mm')
      }
    })

    const handleEdit = () => {
      isEditing.value = true
    }

    const handleCancel = () => {
      if (JSON.stringify(formData.value) !== JSON.stringify(originalData.value)) {
        if (!confirm('您有未保存的修改，确定要取消吗？')) {
          return
        }
      }
      formData.value = JSON.parse(JSON.stringify(originalData.value))
      isEditing.value = false
    }

    const handleSave = async () => {
      if (formData.value.provided) {
        if (!formData.value.breakfastType) {
          alert('请选择早餐类型')
          return
        }
        if (!formData.value.cuisineTypes || formData.value.cuisineTypes.length === 0) {
          alert('请选择至少一种菜系')
          return
        }
        if (!formData.value.timeType) {
          alert('请选择早餐时间')
          return
        }
        if (formData.value.timeType === 'specified') {
          if (!formData.value.startTime || !formData.value.endTime) {
            alert('请设置早餐开始和结束时间')
            return
          }
        }
        if (!formData.value.additionalPrice || formData.value.additionalPrice < 0) {
          alert('请设置加1份早餐价格')
          return
        }
      }

      isSaving.value = true
      try {
        await storeInfoService.updateBreakfastPolicy(formData.value)
        originalData.value = JSON.parse(JSON.stringify(formData.value))
        isEditing.value = false
      } catch (error) {
        alert('保存失败，请重试')
      } finally {
        isSaving.value = false
      }
    }

    const toggleCuisine = (value) => {
      const current = formData.value.cuisineTypes || []
      if (current.includes(value)) {
        formData.value.cuisineTypes = current.filter((c) => c !== value)
      } else {
        formData.value.cuisineTypes = [...current, value]
      }
    }

    const addPriceRule = () => {
      const newRule = {
        id: `temp-${Date.now()}`,
        minValue: 0,
        maxValue: 'unlimited',
        isFree: true,
      }
      if (!formData.value.childPriceRules) {
        formData.value.childPriceRules = []
      }
      formData.value.childPriceRules.push(newRule)
    }

    const removePriceRule = (id) => {
      if (formData.value.childPriceRules) {
        formData.value.childPriceRules = formData.value.childPriceRules.filter(
          (rule) => rule.id !== id
        )
      }
    }

    const getBreakfastTypeLabel = (value) => {
      return BREAKFAST_TYPES.find((t) => t.value === value)?.label || '—'
    }

    const getCuisineTypesLabel = () => {
      if (!formData.value.cuisineTypes || formData.value.cuisineTypes.length === 0) {
        return '—'
      }
      return CUISINE_TYPES.filter((c) => formData.value.cuisineTypes.includes(c.value))
        .map((c) => c.label)
        .join('、')
    }

    const getTimeTypeLabel = () => {
      if (formData.value.timeType === 'daily') return '每天相同'
      if (formData.value.timeType === 'specified') {
        return `${formData.value.startTime} - ${formData.value.endTime}`
      }
      return '—'
    }

    const formatRuleRange = (rule) => {
      const unit = formData.value.childPricingType === 'age' ? '岁' : 'cm'
      const maxValue = rule.maxValue === 'unlimited' ? '不限' : String(rule.maxValue)
      return `${rule.minValue}${unit} - ${maxValue}${unit}`
    }

    onMounted(() => {
      loadData()
    })

    return {
      isEditing,
      isSaving,
      formData,
      startTime,
      endTime,
      childPriceColumns,
      BREAKFAST_TYPES,
      CUISINE_TYPES,
      BREAKFAST_TIME_TYPES,
      CHILD_PRICING_TYPES,
      handleEdit,
      handleCancel,
      handleSave,
      toggleCuisine,
      addPriceRule,
      removePriceRule,
      getBreakfastTypeLabel,
      getCuisineTypesLabel,
      getTimeTypeLabel,
      formatRuleRange,
    }
  },
})
</script>

<style scoped lang="less">
.page-container {
  padding: 24px;
  background: #f0f2f5;
  min-height: calc(100vh - 0px);
}
</style>
