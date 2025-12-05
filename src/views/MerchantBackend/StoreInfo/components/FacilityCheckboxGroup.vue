<template>
  <div v-if="isEditing" :class="`grid ${gridCols} gap-4`">
    <div
      v-for="facility in options"
      :key="facility"
      class="flex items-center space-x-2"
    >
      <a-checkbox
        :checked="selected.includes(facility)"
        @change="() => $emit('toggle', facility)"
      >
        <span class="text-sm text-slate-700">{{ facility }}</span>
      </a-checkbox>
    </div>
  </div>
  <div v-else class="flex flex-wrap gap-2">
    <template v-if="selected.length > 0">
      <a-tag
        v-for="facility in selected"
        :key="facility"
        class="border-slate-300 text-slate-700 bg-slate-50"
      >
        {{ facility }}
      </a-tag>
    </template>
    <span v-else class="text-slate-500">—</span>
  </div>
</template>

<script setup lang="ts">
interface Props {
  isEditing: boolean
  selected: string[]
  options: string[]
  gridCols?: string
}

withDefaults(defineProps<Props>(), {
  gridCols: 'grid-cols-3',
})

defineEmits<{
  toggle: [value: string]
}>()
</script>
