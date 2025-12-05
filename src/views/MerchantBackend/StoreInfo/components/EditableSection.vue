<template>
  <a-card
    :bordered="false"
    class="rounded-xl border-slate-200 bg-white shadow-md hover:shadow-lg transition-all duration-200"
  >
    <template #title>
      <div class="flex items-center justify-between">
        <span class="text-base font-semibold text-slate-900">{{ title }}</span>
        <div v-if="!hideActions" class="flex gap-2">
          <a-button
            v-if="!isEditing"
            type="primary"
            class="h-9 px-4 bg-blue-600 hover:bg-blue-700"
            @click="$emit('edit')"
          >
            编辑
          </a-button>
          <template v-else>
            <a-button
              class="h-9 px-4"
              :disabled="isSaving"
              @click="$emit('cancel')"
            >
              取消
            </a-button>
            <a-button
              type="primary"
              class="h-9 px-4 bg-blue-600 hover:bg-blue-700"
              :loading="isSaving"
              @click="$emit('save')"
            >
              {{ isSaving ? '保存中...' : '保存' }}
            </a-button>
          </template>
        </div>
      </div>
    </template>
    <slot />
  </a-card>
</template>

<script>
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  name: 'EditableSection',
  props: {
    title: {
      type: String,
      required: true
    },
    isEditing: {
      type: Boolean,
      default: false
    },
    isSaving: {
      type: Boolean,
      default: false
    },
    hideActions: {
      type: Boolean,
      default: false
    }
  }
})
</script>
