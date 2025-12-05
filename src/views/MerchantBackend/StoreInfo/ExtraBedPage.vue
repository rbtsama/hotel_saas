<template>
  <sidebar>
    <div class="page-container space-y-6">
      <EditableSection
        title="加床政策配置"
        :is-editing="isEditing"
        :is-saving="isSaving"
        @edit="handleEdit"
        @save="handleSave"
        @cancel="handleCancel"
      >
        <div class="space-y-6">
          <a-card
            v-for="courtyard in courtyards"
            :key="courtyard"
            :title="courtyard"
            class="rounded-xl border-slate-200 bg-white shadow-sm"
          >
            <div class="overflow-x-auto">
              <a-table
                :columns="columns"
                :data-source="groupedPolicies[courtyard]"
                :pagination="false"
                bordered
                row-key="roomTypeId"
              >
                <template slot="roomTypeName" slot-scope="text">
                  <span class="font-medium text-slate-900">{{ text }}</span>
                </template>
                <template slot="extraBedProvided" slot-scope="text, record">
                  <div class="flex justify-center">
                    <a-checkbox v-if="isEditing" v-model="record.extraBedProvided" />
                    <span v-else class="text-slate-900">{{ record.extraBedProvided ? '✓' : '—' }}</span>
                  </div>
                </template>
                <template slot="extraBedType" slot-scope="text, record">
                  <template v-if="record.extraBedProvided">
                    <a-select v-if="isEditing" v-model="record.extraBedType" class="w-full">
                      <a-select-option
                        v-for="type in EXTRA_BED_TYPES"
                        :key="type.value"
                        :value="type.value"
                      >
                        {{ type.label }}
                      </a-select-option>
                    </a-select>
                    <span v-else class="text-slate-900">
                      {{ getExtraBedTypeLabel(record.extraBedType) }}
                    </span>
                  </template>
                  <span v-else class="text-slate-400">—</span>
                </template>
                <template slot="extraBedCount" slot-scope="text, record">
                  <template v-if="record.extraBedProvided">
                    <a-input-number
                      v-if="isEditing"
                      v-model="record.extraBedCount"
                      :min="0"
                      :max="10"
                      class="w-full"
                    />
                    <span v-else class="text-slate-900">{{ record.extraBedCount || '—' }}</span>
                  </template>
                  <span v-else class="text-slate-400">—</span>
                </template>
                <template slot="extraBedPrice" slot-scope="text, record">
                  <template v-if="record.extraBedProvided">
                    <a-input-number
                      v-if="isEditing"
                      v-model="record.extraBedPrice"
                      :min="0"
                      :step="0.01"
                      class="w-full"
                    />
                    <span v-else class="text-slate-900">
                      {{ record.extraBedPrice !== undefined ? `¥${record.extraBedPrice.toFixed(2)}` : '—' }}
                    </span>
                  </template>
                  <span v-else class="text-slate-400">—</span>
                </template>
                <template slot="cribProvided" slot-scope="text, record">
                  <div class="flex justify-center">
                    <a-checkbox v-if="isEditing" v-model="record.cribProvided" />
                    <span v-else class="text-slate-900">{{ record.cribProvided ? '✓' : '—' }}</span>
                  </div>
                </template>
                <template slot="cribCount" slot-scope="text, record">
                  <template v-if="record.cribProvided">
                    <a-input-number
                      v-if="isEditing"
                      v-model="record.cribCount"
                      :min="0"
                      :max="10"
                      class="w-full"
                    />
                    <span v-else class="text-slate-900">{{ record.cribCount || '—' }}</span>
                  </template>
                  <span v-else class="text-slate-400">—</span>
                </template>
                <template slot="cribPrice" slot-scope="text, record">
                  <template v-if="record.cribProvided">
                    <a-input-number
                      v-if="isEditing"
                      v-model="record.cribPrice"
                      :min="0"
                      :step="0.01"
                      class="w-full"
                    />
                    <span v-else class="text-slate-900">
                      {{ record.cribPrice !== undefined ? `¥${record.cribPrice.toFixed(2)}` : '—' }}
                    </span>
                  </template>
                  <span v-else class="text-slate-400">—</span>
                </template>
              </a-table>
            </div>
          </a-card>

          <div v-if="courtyards.length === 0" class="text-center py-12 text-slate-500">
            暂无房型数据，请先在房型管理模块添加房型
          </div>
        </div>
      </EditableSection>
    </div>
  </sidebar>
</template>

<script>
import { defineComponent, ref, computed, onMounted } from '@vue/composition-api'
import Sidebar from '@/components/Layout/Sidebar.vue'
import EditableSection from './components/EditableSection.vue'
import { EXTRA_BED_TYPES } from './types/storeInfo.types'
import storeInfoService from './services/storeInfo.service'

export default defineComponent({
  name: 'ExtraBedPage',
  components: { Sidebar, EditableSection },
  setup() {
    const isEditing = ref(false)
    const isSaving = ref(false)
    const originalData = ref(null)
    const formData = ref({ roomPolicies: [] })

    const columns = [
      { title: '房型名称', dataIndex: 'roomTypeName', scopedSlots: { customRender: 'roomTypeName' } },
      { title: '提供加床', dataIndex: 'extraBedProvided', scopedSlots: { customRender: 'extraBedProvided' }, align: 'center' },
      { title: '床型', dataIndex: 'extraBedType', scopedSlots: { customRender: 'extraBedType' } },
      { title: '数量', dataIndex: 'extraBedCount', scopedSlots: { customRender: 'extraBedCount' } },
      { title: '价格(元)', dataIndex: 'extraBedPrice', scopedSlots: { customRender: 'extraBedPrice' } },
      { title: '提供婴儿床', dataIndex: 'cribProvided', scopedSlots: { customRender: 'cribProvided' }, align: 'center' },
      { title: '数量', dataIndex: 'cribCount', scopedSlots: { customRender: 'cribCount' } },
      { title: '价格(元)', dataIndex: 'cribPrice', scopedSlots: { customRender: 'cribPrice' } },
    ]

    const groupedPolicies = computed(() => {
      return formData.value.roomPolicies.reduce((acc, policy) => {
        if (!acc[policy.courtyard]) {
          acc[policy.courtyard] = []
        }
        acc[policy.courtyard].push(policy)
        return acc
      }, {})
    })

    const courtyards = computed(() => Object.keys(groupedPolicies.value).sort())

    const loadData = async () => {
      const data = await storeInfoService.getExtraBedPolicy()
      originalData.value = JSON.parse(JSON.stringify(data))
      formData.value = JSON.parse(JSON.stringify(data))
    }

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
      for (const policy of formData.value.roomPolicies) {
        if (policy.extraBedProvided) {
          if (!policy.extraBedType) {
            alert(`${policy.roomTypeName}：请选择加床床型`)
            return
          }
          if (!policy.extraBedCount || policy.extraBedCount < 0) {
            alert(`${policy.roomTypeName}：请填写加床数量`)
            return
          }
          if (policy.extraBedPrice === undefined || policy.extraBedPrice < 0) {
            alert(`${policy.roomTypeName}：请填写加床价格`)
            return
          }
        }

        if (policy.cribProvided) {
          if (!policy.cribCount || policy.cribCount < 0) {
            alert(`${policy.roomTypeName}：请填写婴儿床数量`)
            return
          }
          if (policy.cribPrice === undefined || policy.cribPrice < 0) {
            alert(`${policy.roomTypeName}：请填写婴儿床价格`)
            return
          }
        }
      }

      isSaving.value = true
      try {
        await storeInfoService.updateExtraBedPolicy(formData.value)
        originalData.value = JSON.parse(JSON.stringify(formData.value))
        isEditing.value = false
      } catch (error) {
        alert('保存失败，请重试')
      } finally {
        isSaving.value = false
      }
    }

    const getExtraBedTypeLabel = (value) => {
      return EXTRA_BED_TYPES.find((t) => t.value === value)?.label || '—'
    }

    onMounted(() => {
      loadData()
    })

    return {
      isEditing,
      isSaving,
      formData,
      columns,
      groupedPolicies,
      courtyards,
      EXTRA_BED_TYPES,
      handleEdit,
      handleCancel,
      handleSave,
      getExtraBedTypeLabel,
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
