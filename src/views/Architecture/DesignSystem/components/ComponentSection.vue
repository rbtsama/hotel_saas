<!--
  组件章节容器
  用于组织配色系统中的组件示例
-->
<template>
  <div class="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
    <h3 class="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2.5">
      <div class="w-9 h-9 bg-[#2C5F8D]/10 rounded-xl flex items-center justify-center text-[#2C5F8D]">
        <slot name="icon" />
      </div>
      {{ title }}
    </h3>
    <slot />
  </div>
</template>

<script setup lang="ts">
interface Props {
  title: string
}

defineProps<Props>()
</script>
