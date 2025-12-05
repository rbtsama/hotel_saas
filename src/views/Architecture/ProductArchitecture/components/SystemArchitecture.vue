<!--
  系统架构脑图组件 - 紧凑版
  功能颗粒度：2-6个工作日，适合打印输出
-->
<template>
  <div class="space-y-6">
    <!-- 精简统计卡片 - 使用配色系统 -->
    <Card class="border-2 border-brand-secondary">
      <CardHeader class="bg-gradient-to-r from-brand-secondary to-brand-error text-white py-4">
        <div class="flex items-center justify-between">
          <CardTitle class="text-2xl">双端系统功能架构</CardTitle>
          <div class="flex gap-4 text-sm">
            <Badge class="bg-white/20 text-white text-base px-3 py-1">2个产品端</Badge>
            <Badge class="bg-white/20 text-white text-base px-3 py-1">{{ totalFunctions }}个功能模块</Badge>
            <Badge class="bg-white/20 text-white text-base px-3 py-1">
              {{ (totalFunctions * 4).toFixed(0) }}工作日
            </Badge>
          </div>
        </div>
      </CardHeader>
    </Card>

    <!-- 双端架构图 - 紧凑布局 -->
    <div class="grid grid-cols-2 gap-4">
      <!-- 平台后台 - 使用主色 brand-primary -->
      <Card class="border-2 border-brand-primary">
        <CardHeader class="bg-brand-primary text-white py-3">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
              <Building2 class="w-5 h-5" />
              <CardTitle class="text-lg">{{ platformArchitecture.name }}</CardTitle>
            </div>
            <Badge class="bg-brand-primary/80 text-white">
              {{ stats.platform.functions }}个功能
            </Badge>
          </div>
        </CardHeader>
        <CardContent class="p-4">
          <div class="space-y-3">
            <div
              v-for="(module, i) in platformArchitecture.modules"
              :key="i"
              class="bg-brand-primary/5 rounded p-3 border border-brand-primary/20"
            >
              <div class="flex items-center justify-between mb-2">
                <h4 class="font-bold text-sm text-brand-primary">
                  {{ module.name }}
                </h4>
                <Badge variant="outline" class="text-xs">
                  {{ module.functions.length }}
                </Badge>
              </div>
              <div class="space-y-1">
                <div
                  v-for="(func, j) in module.functions"
                  :key="j"
                  class="text-xs text-text-secondary flex items-start gap-1"
                >
                  <span class="text-brand-primary flex-shrink-0">•</span>
                  <span>{{ func }}</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <!-- 商户端 - 使用成功色 brand-success -->
      <Card class="border-2 border-brand-success">
        <CardHeader class="bg-brand-success text-white py-3">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
              <Building2 class="w-5 h-5" />
              <CardTitle class="text-lg">{{ hotelArchitecture.name }}</CardTitle>
            </div>
            <Badge class="bg-brand-success/80 text-white">
              {{ stats.hotel.functions }}个功能
            </Badge>
          </div>
        </CardHeader>
        <CardContent class="p-4">
          <div class="space-y-3">
            <div
              v-for="(module, i) in hotelArchitecture.modules"
              :key="i"
              class="bg-brand-success/5 rounded p-3 border border-brand-success/20"
            >
              <div class="flex items-center justify-between mb-2">
                <h4 class="font-bold text-sm text-brand-success">
                  {{ module.name }}
                </h4>
                <Badge variant="outline" class="text-xs">
                  {{ module.functions.length }}
                </Badge>
              </div>
              <div class="space-y-1">
                <div
                  v-for="(func, j) in module.functions"
                  :key="j"
                  class="text-xs text-text-secondary flex items-start gap-1"
                >
                  <span class="text-brand-success flex-shrink-0">•</span>
                  <span>{{ func }}</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>

    <!-- 数据流向图 - 使用配色系统 -->
    <Card class="border-2 border-border-normal">
      <CardHeader class="bg-text-primary text-white py-3">
        <CardTitle class="text-lg">核心业务数据流</CardTitle>
      </CardHeader>
      <CardContent class="p-4">
        <div class="grid grid-cols-2 gap-4">
          <!-- 订单流程 -->
          <div class="space-y-2">
            <h4 class="font-bold text-sm text-brand-primary">订单管理流程</h4>
            <div class="flex items-center gap-2 text-xs">
              <Badge class="bg-brand-success text-white">商户端</Badge>
              <ArrowRight class="w-3 h-3" />
              <span class="text-text-secondary">接收订单</span>
              <ArrowRight class="w-3 h-3" />
              <Badge class="bg-brand-secondary text-white">处理订单</Badge>
              <ArrowRight class="w-3 h-3" />
              <Badge class="bg-brand-primary text-white">平台监控</Badge>
            </div>
          </div>

          <!-- 管理流程 -->
          <div class="space-y-2">
            <h4 class="font-bold text-sm text-brand-success">房务管理流程</h4>
            <div class="flex items-center gap-2 text-xs">
              <Badge class="bg-brand-success text-white">商户端</Badge>
              <ArrowRight class="w-3 h-3" />
              <span class="text-text-secondary">更新价格库存</span>
              <ArrowRight class="w-3 h-3" />
              <Badge class="bg-brand-secondary text-white">实时同步</Badge>
              <ArrowRight class="w-3 h-3" />
              <Badge class="bg-brand-primary text-white">平台可见</Badge>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Building2, ArrowRight } from 'lucide-vue-next'

// 平台后台架构
const platformArchitecture = {
  name: '平台后台',
  modules: [
    {
      name: '订单管理',
      functions: ['订单列表', '退款管理'],
    },
    {
      name: '积分管理',
      functions: ['积分规则配置', '积分调整', '积分增值服务'],
    },
    {
      name: '会员管理',
      functions: ['会员等级设置', '会员邀请记录', '会员查询'],
    },
  ],
}

// 商户端架构（原酒店后台）
const hotelArchitecture = {
  name: '商户端',
  modules: [
    {
      name: '入驻平台',
      functions: ['入驻申请'],
    },
    {
      name: '门店信息',
      functions: [
        '基本信息',
        '政策相关',
        '门店设施',
        '周边信息',
        '早餐政策',
        '加床政策',
        '门店图片',
      ],
    },
    {
      name: '订单管理',
      functions: ['订单列表', '订单日历', '客诉退款', '用户评价'],
    },
    {
      name: '房务管理',
      functions: [
        '房价日历',
        '库存日历',
        '房型列表',
        '房型图片',
        '房间管理',
        'PMS对接',
      ],
    },
    {
      name: '会员服务',
      functions: ['积分服务配置', 'VIP折扣配置', '代客下单', '邀请会员'],
    },
  ],
}

// 统计
const stats = computed(() => ({
  platform: {
    modules: platformArchitecture.modules.length,
    functions: platformArchitecture.modules.reduce((s, m) => s + m.functions.length, 0),
  },
  hotel: {
    modules: hotelArchitecture.modules.length,
    functions: hotelArchitecture.modules.reduce((s, m) => s + m.functions.length, 0),
  },
}))

const totalFunctions = computed(() => stats.value.platform.functions + stats.value.hotel.functions)
</script>
