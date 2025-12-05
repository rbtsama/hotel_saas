<!--
  配色系统页面2 - 全局设计规范
  展示小而美 Home Stay 的完整配色系统和组件示例
  配色系统2: 自然大地配色 - 森林绿、田野色、冰川蓝
-->
<template>
  <div class="flex h-screen overflow-hidden">
    <Sidebar :menu-items="menuConfig" />
    <div class="flex-1 overflow-y-auto bg-gray-50 transition-all duration-300">
      <div class="max-w-7xl mx-auto p-8 space-y-16">
        <!-- 页面标题 -->
        <header class="text-center space-y-3 pt-4">
          <h1 class="text-4xl font-bold text-gray-900 flex items-center justify-center gap-3">
            <Palette class="w-10 h-10 text-[#458559]" :stroke-width="1.5" />
            小而美 Home Stay 配色系统
          </h1>
          <p class="text-sm text-gray-500">Design System · 自然大地配色</p>
        </header>

        <!-- 设计理念 -->
        <section class="mt-12">
          <div class="relative overflow-hidden rounded-3xl bg-gradient-to-br from-green-50 via-emerald-50 to-orange-50 border border-gray-200 shadow-sm">
            <div class="absolute top-0 right-0 w-96 h-96 bg-[#458559]/5 rounded-full blur-3xl"></div>
            <div class="absolute bottom-0 left-0 w-96 h-96 bg-[#A67B5B]/5 rounded-full blur-3xl"></div>
            <div class="relative px-8 py-10">
              <div class="max-w-3xl mx-auto text-center space-y-4">
                <p class="text-[18px] text-gray-800 leading-relaxed font-medium">
                  小而美 Home Stay — 精选独特民宿，轻松愉悦出行，融入自然美景
                </p>
                <p class="text-[16px] text-gray-700 leading-relaxed">
                  山林间的呼吸，田野上的漫步，冰川下的宁静。<br>
                  森林绿如夏日树荫般清爽宜人，田野色如秋日麦浪般质朴温暖，冰川蓝如冬日湖面般澄澈纯净。
                </p>
              </div>
            </div>
          </div>
        </section>

        <!-- 色彩系统 -->
        <section class="mt-16">
          <h2 class="text-3xl font-bold text-[#458559] mb-8 text-center">色彩系统</h2>

          <!-- 主色系统 -->
          <div class="mb-10">
            <h3 class="text-lg font-semibold text-gray-700 mb-4 flex items-center gap-2">
              <div class="w-1 h-5 bg-[#458559] rounded-full"></div>
              主色系统
            </h3>
            <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <ColorCard name="沙滩" season="春" color="#F8F6F3" hex="#F8F6F3" contrast="-" usage="背景色、卡片底色" text-color="text-gray-900" />
              <ColorCard name="森林" season="夏" color="#458559" hex="#458559" contrast="7.0:1" usage="主按钮、品牌色" :is-brand="true" />
              <ColorCard name="田野" season="秋" color="#A67B5B" hex="#A67B5B" contrast="5.2:1" usage="价格、促销标签" />
              <ColorCard name="冰川" season="冬" color="#4A85B8" hex="#4A85B8" contrast="5.5:1" usage="链接、交互元素" />
            </div>
          </div>

          <!-- 功能色 + 中性色 -->
          <div>
            <h3 class="text-lg font-semibold text-gray-700 mb-4 flex items-center gap-2">
              <div class="w-1 h-5 bg-[#458559] rounded-full"></div>
              功能色 & 中性色
            </h3>
            <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              <ColorCard name="青松" color="#3D7350" hex="#3D7350" contrast="8.2:1" usage="成功状态" :compact="true" />
              <ColorCard name="枫叶" color="#B94D3D" hex="#B94D3D" contrast="7.1:1" usage="错误、警示" :compact="true" />
              <ColorCard name="主文字" color="#2A2A2A" hex="#2A2A2A" contrast="15.8:1" usage="标题、正文" :compact="true" />
              <ColorCard name="次文字" color="#6B6B6B" hex="#6B6B6B" contrast="5.7:1" usage="辅助说明" :compact="true" />
              <ColorCard name="占位符" color="#999999" hex="#999999" contrast="4.2:1" usage="占位符" :compact="true" />
            </div>
          </div>
        </section>

        <!-- 组件示例 -->
        <section class="mt-16">
          <h2 class="text-3xl font-bold text-[#458559] mb-8 text-center">组件示例</h2>

          <div class="grid lg:grid-cols-3 gap-6">
            <!-- 1. 按钮模块 -->
            <ComponentSection2 title="按钮">
              <template #icon>
                <ShoppingCart class="w-5 h-5" :stroke-width="1.5" />
              </template>
              <div class="space-y-4">
                <!-- 主按钮 -->
                <div>
                  <h4 class="text-sm font-semibold text-gray-700 mb-2">主按钮 (高32px，圆角4px)</h4>
                  <div class="flex flex-wrap gap-2">
                    <button class="px-4 py-1.5 bg-[#458559] text-white rounded font-medium text-sm">立即预订</button>
                    <button class="px-4 py-1.5 bg-[#458559] text-white rounded font-medium text-sm">确认支付</button>
                    <button class="px-4 py-1.5 bg-[#458559] text-white rounded font-medium text-sm flex items-center gap-1">
                      <CreditCard class="w-3.5 h-3.5" :stroke-width="1.5" />
                      去支付
                    </button>
                  </div>
                </div>

                <!-- 辅助按钮 -->
                <div>
                  <h4 class="text-sm font-semibold text-gray-700 mb-2">辅助按钮</h4>
                  <div class="flex flex-wrap gap-2">
                    <button class="px-4 py-1.5 bg-[#4A85B8] text-white rounded font-medium text-sm">查看详情</button>
                    <button class="px-4 py-1.5 bg-[#A67B5B] text-white rounded font-medium text-sm">联系房东</button>
                    <button class="px-4 py-1.5 bg-[#3D7350] text-white rounded font-medium text-sm flex items-center gap-1">
                      <CheckCircle class="w-3.5 h-3.5" :stroke-width="1.5" />
                      确认入住
                    </button>
                  </div>
                </div>

                <!-- 描边按钮 -->
                <div>
                  <h4 class="text-sm font-semibold text-gray-700 mb-2">描边按钮</h4>
                  <div class="flex flex-wrap gap-2">
                    <button class="px-4 py-1.5 border border-[#458559] text-[#458559] rounded font-medium text-sm">取消订单</button>
                    <button class="px-4 py-1.5 border border-[#4A85B8] text-[#4A85B8] rounded font-medium text-sm">查看全部</button>
                    <button class="px-4 py-1.5 border border-gray-300 text-gray-700 rounded font-medium text-sm">稍后再说</button>
                    <button class="px-4 py-1.5 border border-[#B94D3D] text-[#B94D3D] rounded font-medium text-sm flex items-center gap-1">
                      <XCircle class="w-3.5 h-3.5" :stroke-width="1.5" />
                      申请退款
                    </button>
                  </div>
                </div>

                <!-- 小按钮 -->
                <div>
                  <h4 class="text-sm font-semibold text-gray-700 mb-2">小按钮 (高24px，全圆角)</h4>
                  <div class="flex flex-wrap gap-1.5">
                    <button class="px-2.5 py-0.5 bg-[#458559] text-white rounded-full font-medium text-xs">筛选</button>
                    <button class="px-2.5 py-0.5 bg-[#4A85B8] text-white rounded-full font-medium text-xs">排序</button>
                    <button class="px-2.5 py-0.5 border border-gray-300 text-gray-700 rounded-full text-xs">重置</button>
                    <button class="px-2.5 py-0.5 bg-gray-100 text-gray-700 rounded-full text-xs">应用</button>
                  </div>
                </div>

                <!-- 圆形标签按钮 -->
                <div>
                  <h4 class="text-sm font-semibold text-gray-700 mb-2">圆形标签 (高22px，全圆角)</h4>
                  <div class="flex flex-wrap gap-1.5">
                    <button class="px-2 py-0.5 bg-[#4A85B8]/10 text-[#4A85B8] rounded-full text-xs">近地铁</button>
                    <button class="px-2 py-0.5 bg-[#4A85B8]/10 text-[#4A85B8] rounded-full text-xs">含早餐</button>
                    <button class="px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full text-xs">免费WiFi</button>
                    <button class="px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full text-xs">可做饭</button>
                    <button class="px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full text-xs">景观房</button>
                  </div>
                </div>

                <!-- 特殊按钮 -->
                <div>
                  <h4 class="text-sm font-semibold text-gray-700 mb-2">特殊按钮</h4>
                  <div class="flex flex-wrap gap-2 items-center">
                    <button class="px-3 py-1 bg-[#458559] text-white rounded text-sm font-medium">立即预订</button>
                    <button class="px-3 py-1 bg-gradient-to-r from-[#A67B5B] to-[#B8865F] text-white rounded text-sm font-medium">限时抢购</button>
                    <button class="w-8 h-8 bg-white border border-gray-200 rounded-full flex items-center justify-center">
                      <Heart class="w-4 h-4 text-gray-600" :stroke-width="1.5" />
                    </button>
                    <button class="w-8 h-8 bg-white border border-gray-200 rounded-full flex items-center justify-center">
                      <Share2 class="w-4 h-4 text-gray-600" :stroke-width="1.5" />
                    </button>
                  </div>
                </div>
              </div>
            </ComponentSection2>

            <!-- 2. 标签模块 -->
            <ComponentSection2 title="标签">
              <template #icon>
                <Tag class="w-5 h-5" :stroke-width="1.5" />
              </template>
              <div class="space-y-4">
                <!-- 促销标签 -->
                <div>
                  <h4 class="text-sm font-semibold text-gray-700 mb-2">促销标签 (高20px，圆角2px)</h4>
                  <div class="flex flex-wrap gap-1.5">
                    <span class="px-1.5 py-0.5 bg-[#B94D3D] text-white rounded-sm text-xs font-bold leading-tight">限时特惠</span>
                    <span class="px-1.5 py-0.5 bg-[#B94D3D] text-white rounded-sm text-xs font-bold leading-tight">今日特价</span>
                    <span class="px-1.5 py-0.5 bg-[#A67B5B] text-white rounded-sm text-xs font-bold leading-tight">新客立减</span>
                    <span class="px-1.5 py-0.5 bg-gradient-to-r from-[#A67B5B] to-[#B8865F] text-white rounded-sm text-xs font-bold leading-tight">双11特惠</span>
                    <span class="px-1.5 py-0.5 bg-[#B94D3D] text-white rounded-sm text-xs font-bold leading-tight inline-flex items-center gap-0.5">
                      <Sparkles class="w-2.5 h-2.5" :stroke-width="1.5" />
                      限量抢购
                    </span>
                  </div>
                </div>

                <!-- 订单状态徽章 -->
                <div>
                  <h4 class="text-sm font-semibold text-gray-700 mb-2">订单状态徽章 (高24px，圆角2px)</h4>
                  <div class="flex flex-wrap gap-1.5">
                    <span class="px-2 py-0.5 bg-[#3D7350]/10 text-[#3D7350] rounded-sm text-xs font-medium border border-[#3D7350]/20">已入住</span>
                    <span class="px-2 py-0.5 bg-[#4A85B8]/10 text-[#4A85B8] rounded-sm text-xs font-medium border border-[#4A85B8]/20">待入住</span>
                    <span class="px-2 py-0.5 bg-[#A67B5B]/10 text-[#A67B5B] rounded-sm text-xs font-medium border border-[#A67B5B]/20">待确认</span>
                    <span class="px-2 py-0.5 bg-[#B94D3D]/10 text-[#B94D3D] rounded-sm text-xs font-medium border border-[#B94D3D]/20">已取消</span>
                    <span class="px-2 py-0.5 bg-gray-100 text-gray-600 rounded-sm text-xs font-medium border border-gray-200">已完成</span>
                  </div>
                </div>

                <!-- 空心标签 -->
                <div>
                  <h4 class="text-sm font-semibold text-gray-700 mb-2">空心标签 (圆角2px)</h4>
                  <div class="flex flex-wrap gap-1.5">
                    <span class="px-2 py-0.5 border border-[#458559] text-[#458559] rounded-sm text-xs">超赞房东</span>
                    <span class="px-2 py-0.5 border border-[#4A85B8] text-[#4A85B8] rounded-sm text-xs">即时确认</span>
                    <span class="px-2 py-0.5 border border-[#A67B5B] text-[#A67B5B] rounded-sm text-xs">热门房源</span>
                    <span class="px-2 py-0.5 border border-[#3D7350] text-[#3D7350] rounded-sm text-xs">高评分</span>
                  </div>
                </div>

                <!-- 小标签 -->
                <div>
                  <h4 class="text-sm font-semibold text-gray-700 mb-2">小标签 (高18px，圆角2px)</h4>
                  <div class="flex flex-wrap gap-1">
                    <span class="px-1.5 py-0 bg-gray-100 text-gray-600 rounded-sm text-[11px] leading-[18px]">双床</span>
                    <span class="px-1.5 py-0 bg-gray-100 text-gray-600 rounded-sm text-[11px] leading-[18px]">大床</span>
                    <span class="px-1.5 py-0 bg-gray-100 text-gray-600 rounded-sm text-[11px] leading-[18px]">可住2人</span>
                    <span class="px-1.5 py-0 bg-gray-100 text-gray-600 rounded-sm text-[11px] leading-[18px]">20m²</span>
                    <span class="px-1.5 py-0 bg-gray-100 text-gray-600 rounded-sm text-[11px] leading-[18px]">高层</span>
                  </div>
                </div>

                <!-- 特性标签 -->
                <div>
                  <h4 class="text-sm font-semibold text-gray-700 mb-2">特性标签 (迷你空心，高22px，圆角2px)</h4>
                  <div class="flex flex-wrap gap-1.5">
                    <span class="px-1.5 py-0 border border-[#4A85B8] text-[#4A85B8] rounded-sm text-xs inline-flex items-center gap-0.5 leading-[20px]">
                      <Wifi class="w-3 h-3" :stroke-width="1.5" />
                      免费WiFi
                    </span>
                    <span class="px-1.5 py-0 border border-[#A67B5B] text-[#A67B5B] rounded-sm text-xs inline-flex items-center gap-0.5 leading-[20px]">
                      <Coffee class="w-3 h-3" :stroke-width="1.5" />
                      含早餐
                    </span>
                    <span class="px-1.5 py-0 border border-gray-400 text-gray-600 rounded-sm text-xs inline-flex items-center gap-0.5 leading-[20px]">
                      <BedDouble class="w-3 h-3" :stroke-width="1.5" />
                      双床
                    </span>
                    <span class="px-1.5 py-0 border border-gray-400 text-gray-600 rounded-sm text-xs inline-flex items-center gap-0.5 leading-[20px]">
                      <ParkingCircle class="w-3 h-3" :stroke-width="1.5" />
                      免费停车
                    </span>
                    <span class="px-1.5 py-0 border border-[#3D7350] text-[#3D7350] rounded-sm text-xs inline-flex items-center gap-0.5 leading-[20px]">
                      <Trees class="w-3 h-3" :stroke-width="1.5" />
                      景观房
                    </span>
                  </div>
                </div>
              </div>
            </ComponentSection2>

            <!-- 3. 输入表单模块 -->
            <ComponentSection2 title="输入表单">
              <template #icon>
                <Search class="w-5 h-5" :stroke-width="1.5" />
              </template>
              <div class="space-y-4">
                <!-- 方形输入框 -->
                <div>
                  <h4 class="text-sm font-semibold text-gray-700 mb-2">方形输入框 (高36px，圆角4px)</h4>
                  <div class="space-y-2 max-w-md">
                    <div>
                      <label class="block text-xs text-gray-600 mb-1">入住人姓名</label>
                      <input
                        type="text"
                        placeholder="请输入入住人姓名"
                        class="w-full px-3 py-2 bg-white border border-gray-300 rounded text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-[#458559]"
                      />
                    </div>
                    <div>
                      <label class="block text-xs text-gray-600 mb-1">身份证号</label>
                      <input
                        type="text"
                        placeholder="请输入18位身份证号"
                        class="w-full px-3 py-2 bg-white border border-gray-300 rounded text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-[#458559]"
                      />
                    </div>
                  </div>
                </div>

                <!-- 搜索框 -->
                <div>
                  <h4 class="text-sm font-semibold text-gray-700 mb-2">搜索框 (全圆角)</h4>
                  <div class="max-w-md">
                    <div class="relative">
                      <Search class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" :stroke-width="1.5" />
                      <input
                        type="search"
                        placeholder="搜索城市、民宿名称"
                        class="w-full pl-9 pr-3 py-2 bg-white border border-gray-300 rounded-full text-sm text-gray-900 placeholder:text-gray-400"
                      />
                    </div>
                  </div>
                </div>

                <!-- 错误状态 -->
                <div>
                  <h4 class="text-sm font-semibold text-gray-700 mb-2">错误状态</h4>
                  <div class="max-w-md space-y-1">
                    <input
                      type="text"
                      placeholder="请输入手机号"
                      class="w-full px-3 py-2 bg-white border-2 border-[#B94D3D] rounded text-sm"
                      value="123456"
                      readonly
                    />
                    <p class="text-xs text-[#B94D3D] flex items-center gap-0.5">
                      <AlertCircle class="w-3 h-3" :stroke-width="1.5" />
                      请输入正确的手机号码
                    </p>
                  </div>
                </div>
              </div>
            </ComponentSection2>
          </div>
        </section>

        <!-- 页脚 -->
        <footer class="text-center py-8 mt-16"></footer>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Sidebar from '@/components/Sidebar.vue'
import { menuConfig } from '@/config/menuConfig'
import ColorCard from './components/ColorCard.vue'
import ComponentSection2 from './components/ComponentSection2.vue'
import {
  Palette, ShoppingCart, Tag, Search, CreditCard, CheckCircle, XCircle, Sparkles,
  Wifi, Coffee, BedDouble, ParkingCircle, AlertCircle, Heart, Share2, Trees
} from 'lucide-vue-next'
</script>
