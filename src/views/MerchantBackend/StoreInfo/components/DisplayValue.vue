<template>
  <div :class="`min-h-[36px] flex items-center text-slate-900 ${className}`">
    {{ displayValue }}
  </div>
</template>

<script>
import { defineComponent, computed } from '@vue/composition-api'

export default defineComponent({
  name: 'DisplayValue',
  props: {
    value: {
      type: [String, Number],
      default: undefined
    },
    emptyText: {
      type: String,
      default: '—'
    },
    className: {
      type: String,
      default: ''
    }
  },
  setup(props) {
    const displayValue = computed(() => {
      return props.value !== undefined && props.value !== null && props.value !== ''
        ? String(props.value)
        : props.emptyText
    })

    return {
      displayValue
    }
  }
})
</script>
