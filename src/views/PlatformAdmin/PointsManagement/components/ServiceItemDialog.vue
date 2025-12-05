<template>
  <a-modal
    :open="open"
    :title="title"
    width="500px"
    @cancel="handleCancel"
  >
    <a-form
      ref="formRef"
      :model="formState"
      :rules="rules"
      layout="vertical"
      class="mt-4"
    >
      <!-- 服务内容 -->
      <a-form-item label="服务内容" name="serviceName" required>
        <a-input
          v-model:value="formState.serviceName"
          placeholder="请输入服务内容（最多50字符）"
          :maxlength="50"
          class="h-9"
        />
      </a-form-item>

      <!-- 积分数量 -->
      <a-form-item :label="isReward ? '奖励积分' : '消耗积分'" name="pointsAmount" required>
        <a-input-number
          v-model:value="formState.pointsAmount"
          placeholder="请输入积分数量（正整数）"
          :min="1"
          :precision="0"
          class="w-full h-9"
        />
      </a-form-item>
    </a-form>

    <template #footer>
      <div class="flex justify-end gap-3">
        <a-button
          class="h-9 px-4 border-slate-300"
          @click="handleCancel"
        >
          取消
        </a-button>
        <a-button
          type="primary"
          class="h-9 px-4 bg-blue-600 hover:bg-blue-700"
          @click="handleSubmit"
        >
          {{ mode === 'create' ? '创建' : '保存' }}
        </a-button>
      </div>
    </template>
  </a-modal>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import type { FormInstance } from 'ant-design-vue'
import type { PointsRewardItem, PointsExchangeItem } from '../types/valueAddedService.types'

interface Props {
  open: boolean
  mode: 'create' | 'edit'
  type: 'reward' | 'exchange' // 奖励或换购
  item?: PointsRewardItem | PointsExchangeItem | null
}

interface Emits {
  (e: 'update:open', value: boolean): void
  (e: 'submit', data: { serviceName: string; pointsAmount: number }): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const formRef = ref<FormInstance>()
const isReward = computed(() => props.type === 'reward')

const title = computed(() => {
  const typeText = isReward.value ? '积分奖励' : '积分换购'
  return props.mode === 'create' ? `新增${typeText}服务` : `编辑${typeText}服务`
})

const formState = ref({
  serviceName: '',
  pointsAmount: undefined as number | undefined,
})

const rules = {
  serviceName: [
    { required: true, message: '请输入服务内容', trigger: 'blur' },
    { max: 50, message: '服务内容最多50字符', trigger: 'blur' },
  ],
  pointsAmount: [
    { required: true, message: '请输入积分数量', trigger: 'blur' },
    { type: 'number', min: 1, message: '积分数量必须为正整数', trigger: 'blur' },
  ],
}

// 监听item变化，更新表单
watch(
  () => props.item,
  (newItem) => {
    if (newItem) {
      formState.value = {
        serviceName: newItem.serviceName || '',
        pointsAmount: isReward.value
          ? (newItem as PointsRewardItem).pointsReward
          : (newItem as PointsExchangeItem).pointsCost,
      }
    }
  },
  { immediate: true }
)

// 监听弹窗打开/关闭，重置表单
watch(
  () => props.open,
  (newVal) => {
    if (!newVal) {
      formRef.value?.resetFields()
      formState.value = {
        serviceName: '',
        pointsAmount: undefined,
      }
    } else if (props.item) {
      formState.value = {
        serviceName: props.item.serviceName || '',
        pointsAmount: isReward.value
          ? (props.item as PointsRewardItem).pointsReward
          : (props.item as PointsExchangeItem).pointsCost,
      }
    }
  }
)

const handleCancel = () => {
  emit('update:open', false)
}

const handleSubmit = async () => {
  try {
    await formRef.value?.validate()
    emit('submit', {
      serviceName: formState.value.serviceName,
      pointsAmount: formState.value.pointsAmount!,
    })
    emit('update:open', false)
  } catch (error) {
    console.error('表单验证失败:', error)
  }
}
</script>

<style scoped>
:deep(.ant-input-number) {
  width: 100%;
}
</style>
