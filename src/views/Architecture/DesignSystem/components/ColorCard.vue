<!--
  颜色卡片组件
  用于展示配色系统中的每个颜色
-->
<template>
  <div class="bg-white rounded-xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
    <div
      :class="[
        compact ? 'h-20' : 'h-28',
        'flex items-center justify-center font-semibold gap-2.5 relative',
        textColor
      ]"
      :style="{ backgroundColor: color }"
    >
      <!-- 品牌色标记 -->
      <div
        v-if="isBrand"
        class="absolute top-2 right-2 bg-white/95 backdrop-blur-sm px-2 py-0.5 rounded-full text-[10px] font-bold text-[#2C5F8D] shadow-sm"
      >
        品牌色
      </div>

      <!-- 季节标识 -->
      <template v-if="season">
        <div :class="compact ? 'text-xl' : 'text-2xl'">{{ season }}</div>
        <div :class="[compact ? 'text-xs' : 'text-sm', 'opacity-50']">|</div>
      </template>

      <!-- 颜色名称 -->
      <div :class="compact ? 'text-base' : 'text-xl'">{{ name }}</div>
    </div>

    <div :class="[compact ? 'p-2.5' : 'p-4', 'space-y-1.5']">
      <div class="flex items-center justify-between text-xs">
        <code class="bg-gray-100 px-2 py-0.5 rounded font-mono text-gray-900 text-[10px]">{{ hex }}</code>
        <span v-if="wcag" :class="['text-[10px] font-semibold', wcag.color]">
          {{ contrast }} {{ wcag.grade }}
        </span>
        <span v-else class="text-gray-400 text-[10px]">背景色</span>
      </div>
      <p class="text-[11px] text-gray-600 leading-snug">{{ usage }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  name: string
  season?: string
  color: string
  hex: string
  contrast: string
  usage: string
  textColor?: string
  compact?: boolean
  isBrand?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  textColor: 'text-white',
  compact: false,
  isBrand: false,
})

const wcag = computed(() => {
  if (props.contrast === '-') return null
  const value = parseFloat(props.contrast)
  if (value >= 7.0) return { grade: 'AAA', color: 'text-[#5A8A65]' }
  if (value >= 4.5) return { grade: 'AA+', color: 'text-[#4A8FBF]' }
  return null
})
</script>
