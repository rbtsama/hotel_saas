<!--
  产品架构总图页面
  平台后台 + 商户端双端架构
  配色系统：#3b82f6(主色-蓝) #10b981(成功-绿) #f97316(警告-橙) #ef4444(错误-红)
-->
<template>
  <div class="flex h-screen overflow-hidden bg-[#F8F6F3]">
    <Sidebar :menu-items="menuConfig" />
    <div class="flex-1 overflow-y-auto transition-all duration-300">
      <div class="p-8 space-y-8 max-w-[1800px] mx-auto">
        <!-- 页面标题 -->
        <div class="text-center space-y-4 py-6">
          <h1 class="text-5xl font-bold text-slate-900 tracking-tight">
            小而美2.0 - 产品架构总图
          </h1>
          <p class="text-xl text-slate-600 font-medium">
            双端系统架构 & 订单主线流程
          </p>
        </div>

        <!-- 系统架构脑图 - 紧凑版 -->
        <SystemArchitecture />

        <!-- 订单主线流程 - 高保真版 -->
        <a-card class="border-2 border-[#C67A28] rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
          <template #title>
            <div class="bg-gradient-to-r from-[#C67A28] to-[#E89A3E] text-white py-5 rounded-t-xl -m-6 mb-6 px-6">
              <div class="text-2xl flex items-center gap-3">
                <div class="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                  <shopping-cart-outlined class="text-2xl" />
                </div>
                订单主线流程
              </div>
            </div>
          </template>
          <div class="p-6 bg-white">
            <!-- 三阶段流程 - 高保真卡片 -->
            <div class="grid grid-cols-3 gap-6 mb-6">
              <!-- 订单前 - 使用辅助色 #4A8FBF -->
              <div class="p-5 bg-[#4A8FBF]/5 rounded-xl border-2 border-[#4A8FBF]/30 shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300">
                <h4 class="font-bold text-base text-[#4A8FBF] mb-3 flex items-center gap-2">
                  <span class="w-2 h-2 rounded-full bg-[#4A8FBF]"></span>
                  订单前：获客转化
                </h4>
                <div class="space-y-2 text-sm text-[#2A2A2A]">
                  <div class="flex items-center gap-2">
                    <span class="w-1.5 h-1.5 rounded-full bg-[#4A8FBF]/60"></span>
                    门店信息展示
                  </div>
                  <div class="flex items-center gap-2">
                    <span class="w-1.5 h-1.5 rounded-full bg-[#4A8FBF]/60"></span>
                    房型价格管理
                  </div>
                  <div class="flex items-center gap-2">
                    <span class="w-1.5 h-1.5 rounded-full bg-[#4A8FBF]/60"></span>
                    库存控制
                  </div>
                </div>
              </div>

              <!-- 订单中 - 使用主色 #2C5F8D -->
              <div class="p-5 bg-[#2C5F8D]/5 rounded-xl border-2 border-[#2C5F8D]/30 shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300">
                <h4 class="font-bold text-base text-[#2C5F8D] mb-3 flex items-center gap-2">
                  <span class="w-2 h-2 rounded-full bg-[#2C5F8D]"></span>
                  订单中：履约交付
                </h4>
                <div class="space-y-2 text-sm text-[#2A2A2A]">
                  <div class="flex items-center gap-2">
                    <span class="w-1.5 h-1.5 rounded-full bg-[#2C5F8D]/60"></span>
                    下单支付
                  </div>
                  <div class="flex items-center gap-2">
                    <span class="w-1.5 h-1.5 rounded-full bg-[#2C5F8D]/60"></span>
                    PMS同步
                  </div>
                  <div class="flex items-center gap-2">
                    <span class="w-1.5 h-1.5 rounded-full bg-[#2C5F8D]/60"></span>
                    入住服务退房
                  </div>
                </div>
              </div>

              <!-- 订单后 - 使用成功色 #5A8A65 -->
              <div class="p-5 bg-[#5A8A65]/5 rounded-xl border-2 border-[#5A8A65]/30 shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300">
                <h4 class="font-bold text-base text-[#5A8A65] mb-3 flex items-center gap-2">
                  <span class="w-2 h-2 rounded-full bg-[#5A8A65]"></span>
                  订单后：复购运营
                </h4>
                <div class="space-y-2 text-sm text-[#2A2A2A]">
                  <div class="flex items-center gap-2">
                    <span class="w-1.5 h-1.5 rounded-full bg-[#5A8A65]/60"></span>
                    评价积分
                  </div>
                  <div class="flex items-center gap-2">
                    <span class="w-1.5 h-1.5 rounded-full bg-[#5A8A65]/60"></span>
                    会员权益
                  </div>
                  <div class="flex items-center gap-2">
                    <span class="w-1.5 h-1.5 rounded-full bg-[#5A8A65]/60"></span>
                    营销触达
                  </div>
                </div>
              </div>
            </div>

            <!-- 核心链路 - 高保真流程 -->
            <div class="bg-gradient-to-r from-[#2C5F8D]/10 via-[#4A8FBF]/10 to-[#5A8A65]/10 p-6 rounded-xl border-2 border-[#E5E5E5] shadow-inner">
              <div class="flex items-center gap-3 flex-wrap justify-center">
                <a-tag class="bg-[#4A8FBF] hover:bg-[#4A8FBF]/90 text-white px-4 py-2 rounded-xl shadow-md hover:scale-105 transition-all duration-300 border-0">
                  C端浏览
                </a-tag>
                <arrow-right-outlined class="text-xl text-[#6B6B6B]" />
                <a-tag class="bg-[#C67A28] hover:bg-[#C67A28]/90 text-white px-4 py-2 rounded-xl shadow-md hover:scale-105 transition-all duration-300 border-0">
                  选房下单
                </a-tag>
                <arrow-right-outlined class="text-xl text-[#6B6B6B]" />
                <a-tag class="bg-[#2C5F8D] hover:bg-[#2C5F8D]/90 text-white px-4 py-2 rounded-xl shadow-md hover:scale-105 transition-all duration-300 border-0">
                  支付锁库存
                </a-tag>
                <arrow-right-outlined class="text-xl text-[#6B6B6B]" />
                <a-tag class="bg-[#4A8FBF] hover:bg-[#4A8FBF]/90 text-white px-4 py-2 rounded-xl shadow-md hover:scale-105 transition-all duration-300 border-0">
                  酒店确认
                </a-tag>
                <arrow-right-outlined class="text-xl text-[#6B6B6B]" />
                <a-tag class="bg-[#5A8A65] hover:bg-[#5A8A65]/90 text-white px-4 py-2 rounded-xl shadow-md hover:scale-105 transition-all duration-300 border-0">
                  入住服务
                </a-tag>
                <arrow-right-outlined class="text-xl text-[#6B6B6B]" />
                <a-tag class="bg-[#2C5F8D] hover:bg-[#2C5F8D]/90 text-white px-4 py-2 rounded-xl shadow-md hover:scale-105 transition-all duration-300 border-0">
                  评价积分
                </a-tag>
                <arrow-right-outlined class="text-xl text-[#6B6B6B]" />
                <a-tag class="bg-[#C67A28] hover:bg-[#C67A28]/90 text-white px-4 py-2 rounded-xl shadow-md hover:scale-105 transition-all duration-300 border-0">
                  会员复购
                </a-tag>
              </div>
            </div>
          </div>
        </a-card>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from '@vue/composition-api'
import Sidebar from '@/components/Layout/Sidebar.vue'
import { menuConfig } from '@/components/Layout/menuConfig'
import SystemArchitecture from './components/SystemArchitecture.vue'

export default defineComponent({
  name: 'OverviewPage',
  components: {
    Sidebar,
    SystemArchitecture,
  },
  setup() {
    return {
      menuConfig,
    }
  },
})
</script>
