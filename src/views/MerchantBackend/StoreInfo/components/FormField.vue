<template>
  <div :class="`space-y-2 ${className}`">
    <div class="flex items-center gap-2">
      <label class="text-sm font-medium text-slate-700">
        <span v-if="required" class="text-red-600 mr-1">*</span>
        {{ label }}
      </label>
      <span v-if="locked" class="text-xs text-slate-400 flex items-center gap-1">
        <a-icon type="info-circle" class="text-xs" />
        {{ lockMessage }}
      </span>
      <span v-if="hint" class="text-xs text-slate-500 flex items-center gap-1">
        <a-icon type="info-circle" class="text-xs" />
        {{ hint }}
      </span>
    </div>
    <slot />
  </div>
</template>

<script>
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  name: 'FormField',
  props: {
    label: {
      type: String,
      required: true
    },
    required: {
      type: Boolean,
      default: false
    },
    locked: {
      type: Boolean,
      default: false
    },
    lockMessage: {
      type: String,
      default: '修改需联系平台'
    },
    hint: {
      type: String,
      default: ''
    },
    className: {
      type: String,
      default: ''
    }
  }
})
</script>
