<template>
  <sidebar>
    <div class="page-container space-y-6">
      <!-- 亮点标签 -->
      <EditableSection
        title="亮点标签"
        :is-editing="isEditing"
        :is-saving="isSaving"
        @edit="handleEdit"
        @save="handleSave"
        @cancel="handleCancel"
      >
        <div v-if="isEditing" class="grid grid-cols-4 gap-4">
          <a-checkbox
            v-for="tag in HIGHLIGHT_TAGS"
            :key="tag.value"
            :checked="formData.highlights.includes(tag.value)"
            @change="() => toggleFacility('highlights', tag.value)"
          >
            <span class="text-sm text-slate-700">{{ tag.label }}</span>
          </a-checkbox>
        </div>
        <div v-else class="flex flex-wrap gap-2">
          <template v-if="formData.highlights.length > 0">
            <a-tag
              v-for="value in formData.highlights"
              :key="value"
              class="border-slate-300 text-slate-700 bg-slate-50"
            >
              {{ getHighlightLabel(value) }}
            </a-tag>
          </template>
          <span v-else class="text-slate-500">—</span>
        </div>
      </EditableSection>

      <!-- 交通服务 -->
      <EditableSection title="交通服务" :is-editing="isEditing" hide-actions>
        <FacilityCheckboxGroup
          :is-editing="isEditing"
          :selected="formData.transportServices"
          :options="TRANSPORT_SERVICES"
          grid-cols="grid-cols-3"
          @toggle="(val) => toggleFacility('transportServices', val)"
        />
      </EditableSection>

      <!-- 清洁服务 -->
      <EditableSection title="清洁服务" :is-editing="isEditing" hide-actions>
        <FacilityCheckboxGroup
          :is-editing="isEditing"
          :selected="formData.cleaningServices"
          :options="CLEANING_SERVICES"
          grid-cols="grid-cols-3"
          @toggle="(val) => toggleFacility('cleaningServices', val)"
        />
      </EditableSection>

      <!-- 安全安保 -->
      <EditableSection title="安全安保" :is-editing="isEditing" hide-actions>
        <FacilityCheckboxGroup
          :is-editing="isEditing"
          :selected="formData.safetyServices"
          :options="SAFETY_SERVICES"
          grid-cols="grid-cols-3"
          @toggle="(val) => toggleFacility('safetyServices', val)"
        />
      </EditableSection>

      <!-- 运动设施 -->
      <EditableSection title="运动设施" :is-editing="isEditing" hide-actions>
        <FacilityCheckboxGroup
          :is-editing="isEditing"
          :selected="formData.sportsServices"
          :options="SPORTS_SERVICES"
          grid-cols="grid-cols-4"
          @toggle="(val) => toggleFacility('sportsServices', val)"
        />
      </EditableSection>

      <!-- 康体设施 -->
      <EditableSection title="康体设施" :is-editing="isEditing" hide-actions>
        <FacilityCheckboxGroup
          :is-editing="isEditing"
          :selected="formData.spaServices"
          :options="SPA_SERVICES"
          grid-cols="grid-cols-3"
          @toggle="(val) => toggleFacility('spaServices', val)"
        />
      </EditableSection>

      <!-- 无障碍设施 -->
      <EditableSection title="无障碍设施" :is-editing="isEditing" hide-actions>
        <FacilityCheckboxGroup
          :is-editing="isEditing"
          :selected="formData.accessibilityServices"
          :options="ACCESSIBILITY_SERVICES"
          grid-cols="grid-cols-3"
          @toggle="(val) => toggleFacility('accessibilityServices', val)"
        />
      </EditableSection>
    </div>
  </sidebar>
</template>

<script>
import { defineComponent, ref, onMounted } from '@vue/composition-api'
import Sidebar from '@/components/Layout/Sidebar.vue'
import EditableSection from './components/EditableSection.vue'
import FacilityCheckboxGroup from './components/FacilityCheckboxGroup.vue'
import {
  HIGHLIGHT_TAGS,
  TRANSPORT_SERVICES,
  CLEANING_SERVICES,
  SAFETY_SERVICES,
  SPORTS_SERVICES,
  SPA_SERVICES,
  ACCESSIBILITY_SERVICES,
} from './types/storeInfo.types'
import storeInfoService from './services/storeInfo.service'

export default defineComponent({
  name: 'FacilitiesPage',
  components: {
    Sidebar,
    EditableSection,
    FacilityCheckboxGroup,
  },
  setup() {
    const isEditing = ref(false)
    const isSaving = ref(false)
    const originalData = ref(null)
    const formData = ref({
      highlights: [],
      transportServices: [],
      cleaningServices: [],
      safetyServices: [],
      sportsServices: [],
      spaServices: [],
      accessibilityServices: [],
    })

    const getHighlightLabel = (value) => {
      return HIGHLIGHT_TAGS.find((t) => t.value === value)?.label || value
    }

    const loadData = async () => {
      const data = await storeInfoService.getFacilityInfo()
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
      isSaving.value = true
      try {
        await storeInfoService.updateFacilityInfo(formData.value)
        originalData.value = JSON.parse(JSON.stringify(formData.value))
        isEditing.value = false
      } catch (error) {
        alert('保存失败，请重试')
      } finally {
        isSaving.value = false
      }
    }

    const toggleFacility = (field, value) => {
      const currentList = formData.value[field]
      if (currentList.includes(value)) {
        formData.value[field] = currentList.filter((item) => item !== value)
      } else {
        formData.value[field] = [...currentList, value]
      }
    }

    onMounted(() => {
      loadData()
    })

    return {
      isEditing,
      isSaving,
      formData,
      HIGHLIGHT_TAGS,
      TRANSPORT_SERVICES,
      CLEANING_SERVICES,
      SAFETY_SERVICES,
      SPORTS_SERVICES,
      SPA_SERVICES,
      ACCESSIBILITY_SERVICES,
      getHighlightLabel,
      handleEdit,
      handleCancel,
      handleSave,
      toggleFacility,
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
