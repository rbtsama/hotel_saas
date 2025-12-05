<!--
  组件章节容器 - 配色系统2专用
  使用森林绿作为主色调
-->
<template>
  <div class="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
    <h3 class="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2.5">
      <div class="w-9 h-9 bg-[#458559]/10 rounded-xl flex items-center justify-center text-[#458559]">
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
