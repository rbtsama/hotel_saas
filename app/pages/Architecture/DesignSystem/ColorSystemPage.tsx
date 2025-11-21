/**
 * 配色系统页面 - 全局设计规范
 * 展示小而美 Home Stay 的完整配色系统和组件示例
 */

import Sidebar, { menuConfig } from '~/pages/PointsSystem/components/Sidebar'
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card'
import {
  CheckCircle2, AlertCircle, Palette, Search, Heart, MapPin,
  Calendar, Clock, Star, Phone, Wifi, Coffee, Utensils, Bed,
  ChevronDown, ShoppingBag, BedDouble, Trees,
  CheckCircle, XCircle, Loader2, CreditCard, TrendingUp,
  Tv, Wind, ParkingCircle, Dumbbell, Bath, AirVent,
  Shirt, Baby, Dog, CarFront, WashingMachine, Lock, Shield, Sparkles,
  Share2, Check, Bell, ShoppingCart, Tag, Home, Users, Filter, ArrowUpDown,
  X, Send
} from 'lucide-react'
import { useViewMode } from '~/contexts/ViewModeContext'

export default function ColorSystemPage() {
  const { isSidebarCollapsed } = useViewMode()

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar menuItems={menuConfig} />
      <div className="flex-1 overflow-y-auto bg-gray-50 transition-all duration-300">
        <div className="max-w-7xl mx-auto p-8 space-y-16">
          {/* 页面标题 */}
          <header className="text-center space-y-3 pt-4">
            <h1 className="text-4xl font-bold text-gray-900 flex items-center justify-center gap-3">
              <Palette className="w-10 h-10 text-[#2C5F8D]" strokeWidth={1.5} />
              小而美 Home Stay 配色系统
            </h1>
            <p className="text-sm text-gray-500">Design System · 四季自然配色 · Version 1.0</p>
          </header>

          {/* 设计理念 */}
          <section className="mt-12">
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-50 via-purple-50 to-orange-50 border border-gray-200 shadow-sm">
              <div className="absolute top-0 right-0 w-96 h-96 bg-[#2C5F8D]/5 rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#C67A28]/5 rounded-full blur-3xl"></div>
              <div className="relative px-8 py-10">
                <div className="max-w-3xl mx-auto text-center space-y-4">
                  <p className="text-[18px] text-gray-800 leading-relaxed font-serif font-medium">
                    小而美 Home Stay — 精选独特民宿，轻松愉悦出行，融入自然美景
                  </p>
                  <p className="text-[16px] text-gray-700 leading-relaxed font-serif italic">
                    "从春日晨雾到冬日星空，四季流转中沉淀的温柔配色。<br/>
                    深蓝如夜空般沉静可靠，深橙如落日般温暖明快，湖蓝如晴空般清新舒展。"
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* 色彩系统 */}
          <section className="mt-16">
            <h2 className="text-3xl font-bold text-[#2C5F8D] mb-8 text-center">色彩系统</h2>

            {/* 主色系统 */}
            <div className="mb-10">
              <h3 className="text-lg font-semibold text-gray-700 mb-4 flex items-center gap-2">
                <div className="w-1 h-5 bg-[#2C5F8D] rounded-full"></div>
                主色系统
              </h3>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <ColorCard name="晨雾" season="春" color="#F8F6F3" hex="#F8F6F3" contrast="-" usage="背景色、卡片底色" textColor="text-gray-900" />
                <ColorCard name="湖水" season="夏" color="#4A8FBF" hex="#4A8FBF" contrast="5.2:1" usage="链接、交互元素" />
                <ColorCard name="落日" season="秋" color="#C67A28" hex="#C67A28" contrast="6.8:1" usage="价格、促销标签" />
                <ColorCard name="星空" season="冬" color="#2C5F8D" hex="#2C5F8D" contrast="7.8:1" usage="主按钮、品牌色" />
              </div>
            </div>

            {/* 功能色 + 中性色 */}
            <div>
              <h3 className="text-lg font-semibold text-gray-700 mb-4 flex items-center gap-2">
                <div className="w-1 h-5 bg-[#2C5F8D] rounded-full"></div>
                功能色 & 中性色
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                <ColorCard name="森林" color="#5A8A65" hex="#5A8A65" contrast="6.2:1" usage="成功状态" compact />
                <ColorCard name="枫叶" color="#B94D3D" hex="#B94D3D" contrast="7.1:1" usage="错误、警示" compact />
                <ColorCard name="主文字" color="#2A2A2A" hex="#2A2A2A" contrast="15.8:1" usage="标题、正文" compact />
                <ColorCard name="次文字" color="#6B6B6B" hex="#6B6B6B" contrast="5.7:1" usage="辅助说明" compact />
                <ColorCard name="占位符" color="#999999" hex="#999999" contrast="4.2:1" usage="占位符" compact />
              </div>
            </div>
          </section>

          {/* ========== 组件示例 ========== */}
          <section className="mt-16">
            <h2 className="text-3xl font-bold text-[#2C5F8D] mb-8 text-center">组件示例</h2>

            <div className="grid lg:grid-cols-3 gap-6">
              {/* 1. 按钮模块 */}
              <ComponentSection title="按钮" icon={<ShoppingCart className="w-5 h-5" strokeWidth={1.5} />}>
              <div className="space-y-4">
                {/* 主按钮 - 高度32px */}
                <div>
                  <h4 className="text-sm font-semibold text-gray-700 mb-2">主按钮 (高32px，圆角12px)</h4>
                  <div className="flex flex-wrap gap-2">
                    <button className="px-4 py-1.5 bg-[#2C5F8D] text-white rounded-xl font-medium text-sm">
                      立即预订
                    </button>
                    <button className="px-4 py-1.5 bg-[#2C5F8D] text-white rounded-xl font-medium text-sm">
                      确认支付
                    </button>
                    <button className="px-4 py-1.5 bg-[#2C5F8D] text-white rounded-xl font-medium text-sm flex items-center gap-1">
                      <CreditCard className="w-3.5 h-3.5" strokeWidth={1.5} />
                      去支付
                    </button>
                  </div>
                </div>

                {/* 辅助按钮 */}
                <div>
                  <h4 className="text-sm font-semibold text-gray-700 mb-2">辅助按钮</h4>
                  <div className="flex flex-wrap gap-2">
                    <button className="px-4 py-1.5 bg-[#4A8FBF] text-white rounded-xl font-medium text-sm">
                      查看详情
                    </button>
                    <button className="px-4 py-1.5 bg-[#C67A28] text-white rounded-xl font-medium text-sm">
                      联系房东
                    </button>
                    <button className="px-4 py-1.5 bg-[#5A8A65] text-white rounded-xl font-medium text-sm flex items-center gap-1">
                      <CheckCircle className="w-3.5 h-3.5" strokeWidth={1.5} />
                      确认入住
                    </button>
                  </div>
                </div>

                {/* 描边按钮 */}
                <div>
                  <h4 className="text-sm font-semibold text-gray-700 mb-2">描边按钮</h4>
                  <div className="flex flex-wrap gap-2">
                    <button className="px-4 py-1.5 border-2 border-[#2C5F8D] text-[#2C5F8D] rounded-xl font-medium text-sm">
                      取消订单
                    </button>
                    <button className="px-4 py-1.5 border-2 border-[#4A8FBF] text-[#4A8FBF] rounded-xl font-medium text-sm">
                      查看全部
                    </button>
                    <button className="px-4 py-1.5 border-2 border-gray-300 text-gray-700 rounded-xl font-medium text-sm">
                      稍后再说
                    </button>
                    <button className="px-4 py-1.5 border-2 border-[#B94D3D] text-[#B94D3D] rounded-xl font-medium text-sm flex items-center gap-1">
                      <XCircle className="w-3.5 h-3.5" strokeWidth={1.5} />
                      申请退款
                    </button>
                  </div>
                </div>

                {/* 小按钮 - 高24px */}
                <div>
                  <h4 className="text-sm font-semibold text-gray-700 mb-2">小按钮 (高28px，全圆角)</h4>
                  <div className="flex flex-wrap gap-1.5">
                    <button className="px-3 py-1 bg-[#2C5F8D] text-white rounded-full font-medium text-xs">
                      筛选
                    </button>
                    <button className="px-3 py-1 bg-[#4A8FBF] text-white rounded-full font-medium text-xs">
                      排序
                    </button>
                    <button className="px-3 py-1 border border-gray-300 text-gray-700 rounded-full text-xs">
                      重置
                    </button>
                    <button className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">
                      应用
                    </button>
                  </div>
                </div>

                {/* 圆形标签按钮 - 高22px */}
                <div>
                  <h4 className="text-sm font-semibold text-gray-700 mb-2">圆形标签 (高28px，全圆角)</h4>
                  <div className="flex flex-wrap gap-1.5">
                    <button className="px-3 py-1 bg-[#2C5F8D] text-white rounded-full text-xs font-medium">
                      全部
                    </button>
                    <button className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs">
                      民宿
                    </button>
                    <button className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs">
                      酒店
                    </button>
                  </div>
                </div>

                {/* 特殊按钮 */}
                <div>
                  <h4 className="text-sm font-semibold text-gray-700 mb-2">特殊按钮</h4>
                  <div className="flex flex-wrap gap-2 items-center">
                    <button className="px-4 py-1.5 bg-[#2C5F8D] text-white rounded-xl text-sm font-medium flex items-center gap-1.5">
                      <Heart className="w-4 h-4" strokeWidth={1.5} />
                      收藏
                    </button>
                    <button className="px-4 py-1.5 border-2 border-[#2C5F8D] text-[#2C5F8D] rounded-xl text-sm font-medium flex items-center gap-1.5">
                      <Share2 className="w-4 h-4" strokeWidth={1.5} />
                      分享
                    </button>
                    <button className="w-10 h-10 bg-[#2C5F8D] text-white rounded-full flex items-center justify-center">
                      <Search className="w-4 h-4" strokeWidth={1.5} />
                    </button>
                    <button className="w-10 h-10 bg-[#C67A28] text-white rounded-full flex items-center justify-center">
                      <ShoppingCart className="w-4 h-4" strokeWidth={1.5} />
                    </button>
                  </div>
                </div>

                {/* 禁用状态 */}
                <div>
                  <h4 className="text-sm font-semibold text-gray-700 mb-2">禁用状态</h4>
                  <div className="flex flex-wrap gap-2">
                    <button className="px-4 py-1.5 bg-gray-200 text-gray-400 rounded-xl font-medium text-sm cursor-not-allowed" disabled>
                      已满房
                    </button>
                    <button className="px-4 py-1.5 border border-gray-200 text-gray-400 rounded-xl text-sm cursor-not-allowed" disabled>
                      不可预订
                    </button>
                  </div>
                </div>
              </div>
            </ComponentSection>

            {/* 2. 标签模块 */}
            <ComponentSection title="标签" icon={<Tag className="w-5 h-5" strokeWidth={1.5} />}>
              <div className="space-y-4">
                {/* 促销标签 - 高20px，圆角4px */}
                <div>
                  <h4 className="text-sm font-semibold text-gray-700 mb-2">促销标签 (高24px，圆角4px)</h4>
                  <div className="flex flex-wrap gap-1.5">
                    <span className="px-2 py-0.5 bg-[#B94D3D] text-white rounded text-xs font-bold leading-tight">
                      限时特惠
                    </span>
                    <span className="px-2 py-0.5 bg-[#B94D3D] text-white rounded text-xs font-bold leading-tight">
                      今日特价
                    </span>
                    <span className="px-2 py-0.5 bg-[#C67A28] text-white rounded text-xs font-bold leading-tight">
                      新客立减
                    </span>
                    <span className="px-2 py-0.5 bg-gradient-to-r from-[#C67A28] to-[#D68734] text-white rounded text-xs font-bold leading-tight">
                      省¥180
                    </span>
                    <span className="px-2 py-0.5 bg-[#B94D3D] text-white rounded text-xs font-bold leading-tight inline-flex items-center gap-0.5">
                      <Sparkles className="w-2.5 h-2.5" strokeWidth={1.5} />
                      限量抢购
                    </span>
                  </div>
                </div>

                {/* 订单状态徽章 - 高24px，圆角4px */}
                <div>
                  <h4 className="text-sm font-semibold text-gray-700 mb-2">订单状态徽章 (高24px，圆角4px)</h4>
                  <div className="flex flex-wrap gap-1.5">
                    <span className="px-2 py-0.5 bg-[#5A8A65]/10 text-[#5A8A65] rounded text-xs font-medium">
                      已入住
                    </span>
                    <span className="px-2 py-0.5 bg-[#4A8FBF]/10 text-[#4A8FBF] rounded text-xs font-medium">
                      待入住
                    </span>
                    <span className="px-2 py-0.5 bg-[#C67A28]/10 text-[#C67A28] rounded text-xs font-medium">
                      待确认
                    </span>
                    <span className="px-2 py-0.5 bg-[#B94D3D]/10 text-[#B94D3D] rounded text-xs font-medium">
                      已取消
                    </span>
                    <span className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-xs font-medium">
                      已完成
                    </span>
                    <span className="px-2 py-0.5 bg-[#5A8A65]/10 text-[#5A8A65] rounded text-xs font-medium inline-flex items-center gap-0.5">
                      <CheckCircle className="w-2.5 h-2.5" strokeWidth={1.5} />
                      支付成功
                    </span>
                  </div>
                </div>

                {/* 空心标签 */}
                <div>
                  <h4 className="text-sm font-semibold text-gray-700 mb-2">空心标签 (圆角4px)</h4>
                  <div className="flex flex-wrap gap-1.5">
                    <span className="px-2 py-0.5 border border-[#2C5F8D] text-[#2C5F8D] rounded text-xs">
                      超赞房东
                    </span>
                    <span className="px-2 py-0.5 border border-[#4A8FBF] text-[#4A8FBF] rounded text-xs">
                      即时确认
                    </span>
                    <span className="px-2 py-0.5 border border-[#C67A28] text-[#C67A28] rounded text-xs">
                      热门房源
                    </span>
                    <span className="px-2 py-0.5 border border-[#5A8A65] text-[#5A8A65] rounded text-xs">
                      高评分
                    </span>
                  </div>
                </div>

                {/* 小标签 - 高18px，圆角4px */}
                <div>
                  <h4 className="text-sm font-semibold text-gray-700 mb-2">小标签 (高20px，圆角4px)</h4>
                  <div className="flex flex-wrap gap-1">
                    <span className="px-1.5 py-0 bg-[#4A8FBF]/10 text-[#4A8FBF] rounded text-[11px] leading-[20px]">
                      特价
                    </span>
                    <span className="px-1.5 py-0 bg-[#2C5F8D]/10 text-[#2C5F8D] rounded text-[11px] leading-[20px]">
                      新店
                    </span>
                    <span className="px-1.5 py-0 bg-[#5A8A65]/10 text-[#5A8A65] rounded text-[11px] leading-[20px]">
                      好评
                    </span>
                    <span className="px-1.5 py-0 bg-[#B94D3D] text-white rounded text-[11px] leading-[20px] font-bold">
                      HOT
                    </span>
                    <span className="px-1.5 py-0 bg-[#C67A28] text-white rounded text-[11px] leading-[20px] font-bold">
                      NEW
                    </span>
                  </div>
                </div>

                {/* 徽章 */}
                <div>
                  <h4 className="text-sm font-semibold text-gray-700 mb-3">徽章</h4>
                  <div className="flex flex-wrap gap-3">
                    <div className="relative inline-block">
                      <Bell className="w-5 h-5 stroke-[1.5] text-gray-600" />
                      <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#B94D3D] text-[10px] font-bold text-white">3</span>
                    </div>
                    <div className="relative inline-block">
                      <ShoppingCart className="w-5 h-5 stroke-[1.5] text-gray-600" />
                      <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#C67A28] text-[10px] font-bold text-white">5</span>
                    </div>
                    <div className="relative inline-block">
                      <Heart className="w-5 h-5 stroke-[1.5] text-gray-600" />
                      <span className="absolute -top-1 -right-1 flex h-5 min-w-[20px] px-1 items-center justify-center rounded-full bg-[#2C5F8D] text-[10px] font-bold text-white">99+</span>
                    </div>
                  </div>
                </div>

                {/* 特性标签 - icon+文字 */}
                <div>
                  <h4 className="text-sm font-semibold text-gray-700 mb-2">特性标签 (icon+文字，高20px，圆角4px)</h4>
                  <div className="flex flex-wrap gap-1.5">
                    <span className="px-1.5 py-0 bg-[#4A8FBF]/10 text-[#4A8FBF] rounded text-xs inline-flex items-center gap-0.5 leading-[20px]">
                      <Wifi className="w-3 h-3" strokeWidth={1.5} />
                      WiFi
                    </span>
                    <span className="px-1.5 py-0 bg-[#C67A28]/10 text-[#C67A28] rounded text-xs inline-flex items-center gap-0.5 leading-[20px]">
                      <Utensils className="w-3 h-3" strokeWidth={1.5} />
                      早餐
                    </span>
                    <span className="px-1.5 py-0 bg-[#2C5F8D]/10 text-[#2C5F8D] rounded text-xs inline-flex items-center gap-0.5 leading-[20px]">
                      <Bed className="w-3 h-3" strokeWidth={1.5} />
                      双床
                    </span>
                    <span className="px-1.5 py-0 bg-gray-100 text-gray-600 rounded text-xs inline-flex items-center gap-0.5 leading-[20px]">
                      <ParkingCircle className="w-3 h-3" strokeWidth={1.5} />
                      停车
                    </span>
                  </div>
                </div>
              </div>
            </ComponentSection>

            {/* 3. 输入表单模块 */}
            <ComponentSection title="输入表单" icon={<Search className="w-5 h-5" strokeWidth={1.5} />}>
              <div className="space-y-4">
                {/* 方形输入框 - 高36px，圆角12px */}
                <div>
                  <h4 className="text-sm font-semibold text-gray-700 mb-2">方形输入框 (高36px，圆角12px)</h4>
                  <div className="space-y-2 max-w-md">
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">入住人姓名</label>
                      <input
                        type="text"
                        placeholder="请输入入住人姓名"
                        className="w-full px-3 py-2 bg-[#F8F6F3] border-2 border-gray-200 rounded-xl text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-[#2C5F8D]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">手机号</label>
                      <input
                        type="text"
                        placeholder="请输入手机号"
                        className="w-full px-3 py-2 bg-[#F8F6F3] border-2 border-gray-200 rounded-xl text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-[#2C5F8D]"
                      />
                    </div>
                  </div>
                </div>

                {/* 搜索框 - 全圆角 */}
                <div>
                  <h4 className="text-sm font-semibold text-gray-700 mb-2">搜索框 (全圆角)</h4>
                  <div className="max-w-md">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" strokeWidth={1.5} />
                      <input
                        type="search"
                        placeholder="搜索房源、地点..."
                        className="w-full pl-9 pr-3 py-2 bg-[#F8F6F3] border-2 border-gray-200 rounded-full text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-[#2C5F8D]"
                      />
                    </div>
                  </div>
                </div>

                {/* 手机号+验证码 */}
                <div>
                  <h4 className="text-sm font-semibold text-gray-700 mb-2">手机号+验证码</h4>
                  <div className="space-y-2 max-w-md">
                    <input
                      type="tel"
                      placeholder="请输入手机号"
                      className="w-full px-3 py-2 bg-[#F8F6F3] border-2 border-gray-200 rounded-xl text-sm placeholder:text-gray-400 focus:outline-none focus:border-[#2C5F8D]"
                    />
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="请输入验证码"
                        className="flex-1 px-3 py-2 bg-[#F8F6F3] border-2 border-gray-200 rounded-xl text-sm placeholder:text-gray-400 focus:outline-none focus:border-[#2C5F8D]"
                      />
                      <button className="px-4 py-2 bg-[#2C5F8D] text-white rounded-xl text-sm font-medium whitespace-nowrap">
                        获取验证码
                      </button>
                    </div>
                  </div>
                </div>

                {/* 备注填写框 */}
                <div>
                  <h4 className="text-sm font-semibold text-gray-700 mb-2">备注填写框</h4>
                  <div className="max-w-md">
                    <label className="block text-xs text-gray-600 mb-1">备注信息（选填）</label>
                    <textarea
                      placeholder="请填写特殊需求..."
                      rows={3}
                      className="w-full px-3 py-2 bg-[#F8F6F3] border-2 border-gray-200 rounded-xl text-sm text-gray-900 placeholder:text-gray-400 resize-none focus:outline-none focus:border-[#2C5F8D]"
                    />
                    <p className="text-xs text-gray-400 mt-1 text-right">0/200</p>
                  </div>
                </div>

                {/* 错误状态 */}
                <div>
                  <h4 className="text-sm font-semibold text-gray-700 mb-2">错误状态</h4>
                  <div className="max-w-md space-y-1">
                    <input
                      type="text"
                      placeholder="请输入手机号"
                      className="w-full px-3 py-2 bg-white border-2 border-[#B94D3D] rounded-xl text-sm"
                      value="123456"
                      readOnly
                    />
                    <p className="text-xs text-[#B94D3D] flex items-center gap-0.5">
                      <AlertCircle className="w-3 h-3" strokeWidth={1.5} />
                      请输入正确的手机号码
                    </p>
                  </div>
                </div>
              </div>
            </ComponentSection>

            {/* 4. 选择器模块 */}
            <ComponentSection title="选择器" icon={<Filter className="w-5 h-5" strokeWidth={1.5} />}>
              <div className="space-y-6">
                {/* 筛选器 */}
                <div>
                  <h4 className="text-sm font-semibold text-gray-700 mb-3">筛选器</h4>
                  <div className="space-y-2">
                    <div className="relative">
                      <select className="w-full px-4 pr-10 py-2 bg-white border-2 border-gray-200 rounded-xl appearance-none text-sm focus:outline-none focus:border-[#2C5F8D]">
                        <option>价格区间</option>
                        <option>¥0-200</option>
                        <option>¥200-500</option>
                        <option>¥500+</option>
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 stroke-[1.5] text-gray-400 pointer-events-none" />
                    </div>
                    <div className="relative">
                      <select className="w-full px-4 pr-10 py-2 bg-white border-2 border-gray-200 rounded-xl appearance-none text-sm focus:outline-none focus:border-[#2C5F8D]">
                        <option>选择房型</option>
                        <option>标准双床房</option>
                        <option>豪华大床房</option>
                        <option>家庭套房</option>
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 stroke-[1.5] text-gray-400 pointer-events-none" />
                    </div>
                  </div>
                </div>

                {/* 排序Tab */}
                <div>
                  <h4 className="text-sm font-semibold text-gray-700 mb-3">排序Tab</h4>
                  <div className="flex border-b-2 border-gray-200">
                    <button className="px-3 py-2 text-sm font-medium text-[#2C5F8D] border-b-2 border-[#2C5F8D] -mb-[2px]">综合</button>
                    <button className="px-3 py-2 text-sm text-gray-600">价格</button>
                    <button className="px-3 py-2 text-sm text-gray-600">好评</button>
                    <button className="px-3 py-2 text-sm text-gray-600">距离</button>
                  </div>
                </div>

                {/* 单选框 */}
                <div>
                  <h4 className="text-sm font-semibold text-gray-700 mb-3">单选框</h4>
                  <div className="space-y-2">
                    <label className="flex items-center gap-2.5 text-sm text-gray-700 cursor-pointer">
                      <input type="radio" name="room1" className="w-5 h-5 text-[#2C5F8D] border-2 border-gray-300 focus:ring-2 focus:ring-[#2C5F8D]/20" defaultChecked />
                      <span>大床房</span>
                    </label>
                    <label className="flex items-center gap-2.5 text-sm text-gray-700 cursor-pointer">
                      <input type="radio" name="room1" className="w-5 h-5 text-[#2C5F8D] border-2 border-gray-300 focus:ring-2 focus:ring-[#2C5F8D]/20" />
                      <span>双床房</span>
                    </label>
                    <label className="flex items-center gap-2.5 text-sm text-gray-400 cursor-not-allowed">
                      <input type="radio" name="room1" className="w-5 h-5 text-[#2C5F8D] border-2 border-gray-300" disabled />
                      <span>套房（已满）</span>
                    </label>
                  </div>
                </div>

                {/* 多选框 */}
                <div>
                  <h4 className="text-sm font-semibold text-gray-700 mb-3">多选框</h4>
                  <div className="space-y-2">
                    <label className="flex items-center gap-2.5 text-sm text-gray-700 cursor-pointer">
                      <div className="relative">
                        <input type="checkbox" className="peer w-5 h-5 text-[#2C5F8D] border-2 border-gray-300 rounded focus:ring-2 focus:ring-[#2C5F8D]/20" defaultChecked />
                        <Check className="absolute inset-0 w-5 h-5 stroke-[2] text-white opacity-0 peer-checked:opacity-100 pointer-events-none" />
                      </div>
                      <span>含早餐</span>
                    </label>
                    <label className="flex items-center gap-2.5 text-sm text-gray-700 cursor-pointer">
                      <div className="relative">
                        <input type="checkbox" className="peer w-5 h-5 text-[#2C5F8D] border-2 border-gray-300 rounded focus:ring-2 focus:ring-[#2C5F8D]/20" />
                        <Check className="absolute inset-0 w-5 h-5 stroke-[2] text-white opacity-0 peer-checked:opacity-100 pointer-events-none" />
                      </div>
                      <span>免费WiFi</span>
                    </label>
                    <label className="flex items-center gap-2.5 text-sm text-gray-700 cursor-pointer">
                      <div className="relative">
                        <input type="checkbox" className="peer w-5 h-5 text-[#2C5F8D] border-2 border-gray-300 rounded focus:ring-2 focus:ring-[#2C5F8D]/20" />
                        <Check className="absolute inset-0 w-5 h-5 stroke-[2] text-white opacity-0 peer-checked:opacity-100 pointer-events-none" />
                      </div>
                      <span>加床服务</span>
                    </label>
                  </div>
                </div>

                {/* 开关 */}
                <div>
                  <h4 className="text-sm font-semibold text-gray-700 mb-3">开关</h4>
                  <div className="space-y-3">
                    <label className="relative inline-flex items-center cursor-pointer w-full">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-gray-200 peer-checked:bg-[#2C5F8D] rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                      <span className="ml-3 text-sm text-gray-700">接收通知</span>
                    </label>
                    <label className="relative inline-flex items-center cursor-pointer w-full">
                      <input type="checkbox" className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-200 peer-checked:bg-[#2C5F8D] rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                      <span className="ml-3 text-sm text-gray-700">自动确认</span>
                    </label>
                  </div>
                </div>

                {/* 日期选择器 */}
                <div>
                  <h4 className="text-sm font-semibold text-gray-700 mb-3">日期选择器</h4>
                  <div className="space-y-2">
                    <div className="relative">
                      <input type="text" placeholder="入住日期" className="w-full px-3 py-2 bg-[#F8F6F3] border-2 border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#2C5F8D]" />
                      <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 stroke-[1.5] text-gray-400 pointer-events-none" />
                    </div>
                    <div className="relative">
                      <input type="text" placeholder="退房日期" className="w-full px-3 py-2 bg-[#F8F6F3] border-2 border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#2C5F8D]" />
                      <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 stroke-[1.5] text-gray-400 pointer-events-none" />
                    </div>
                    <p className="text-xs text-gray-500">共 2 晚</p>
                  </div>
                </div>
              </div>
            </ComponentSection>

            {/* 5. 卡片模块 */}
            <ComponentSection title="卡片" icon={<Home className="w-5 h-5" strokeWidth={1.5} />}>
              <div className="space-y-6">
                {/* 价格明细展示 */}
                <div>
                  <h4 className="text-sm font-semibold text-gray-700 mb-3">价格明细展示</h4>
                  <div className="bg-white border border-gray-200 rounded-xl p-4 space-y-3">
                    <h5 className="text-sm font-semibold text-gray-900">费用明细</h5>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">房费 × 2晚</span>
                        <span className="text-gray-900 font-medium">¥776</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">早餐</span>
                        <span className="text-gray-900 font-medium">¥50</span>
                      </div>
                      <div className="flex justify-between text-sm text-[#5A8A65]">
                        <span>优惠券折扣</span>
                        <span className="font-medium">-¥0</span>
                      </div>
                      <div className="h-px bg-gray-200"></div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-semibold">实付金额</span>
                        <span className="text-xl font-bold text-[#C67A28]">¥826</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 信息卡片 */}
                <div>
                  <h4 className="text-sm font-semibold text-gray-700 mb-3">信息卡片</h4>
                  <div className="bg-white border border-gray-200 rounded-xl p-4 space-y-3">
                    <div className="flex items-start gap-2 text-sm">
                      <MapPin className="w-4 h-4 stroke-[1.5] text-[#2C5F8D] mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">杭州市上城区南山路100号</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Phone className="w-4 h-4 stroke-[1.5] text-[#2C5F8D]" />
                      <span className="text-gray-700">0571-8888-8888</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="w-4 h-4 stroke-[1.5] text-[#2C5F8D]" />
                      <span className="text-gray-700">08:00 - 22:00</span>
                    </div>
                  </div>
                </div>

                {/* 设施特性卡片 */}
                <div>
                  <h4 className="text-sm font-semibold text-gray-700 mb-3">设施特性</h4>
                  <div className="grid grid-cols-5 gap-2">
                    <div className="flex flex-col items-center p-2 bg-[#2C5F8D]/10 rounded-xl">
                      <Wifi className="w-5 h-5 stroke-[1.5] text-[#2C5F8D] mb-1" />
                      <span className="text-xs text-gray-700">WiFi</span>
                    </div>
                    <div className="flex flex-col items-center p-2 bg-[#2C5F8D]/10 rounded-xl">
                      <Utensils className="w-5 h-5 stroke-[1.5] text-[#2C5F8D] mb-1" />
                      <span className="text-xs text-gray-700">早餐</span>
                    </div>
                    <div className="flex flex-col items-center p-2 bg-[#2C5F8D]/10 rounded-xl">
                      <Wind className="w-5 h-5 stroke-[1.5] text-[#2C5F8D] mb-1" />
                      <span className="text-xs text-gray-700">空调</span>
                    </div>
                    <div className="flex flex-col items-center p-2 bg-[#2C5F8D]/10 rounded-xl">
                      <Tv className="w-5 h-5 stroke-[1.5] text-[#2C5F8D] mb-1" />
                      <span className="text-xs text-gray-700">电视</span>
                    </div>
                    <div className="flex flex-col items-center p-2 bg-[#2C5F8D]/10 rounded-xl">
                      <ParkingCircle className="w-5 h-5 stroke-[1.5] text-[#2C5F8D] mb-1" />
                      <span className="text-xs text-gray-700">停车</span>
                    </div>
                    <div className="flex flex-col items-center p-2 bg-[#2C5F8D]/10 rounded-xl">
                      <Bath className="w-5 h-5 stroke-[1.5] text-[#2C5F8D] mb-1" />
                      <span className="text-xs text-gray-700">浴缸</span>
                    </div>
                    <div className="flex flex-col items-center p-2 bg-[#2C5F8D]/10 rounded-xl">
                      <WashingMachine className="w-5 h-5 stroke-[1.5] text-[#2C5F8D] mb-1" />
                      <span className="text-xs text-gray-700">洗衣</span>
                    </div>
                    <div className="flex flex-col items-center p-2 bg-[#2C5F8D]/10 rounded-xl">
                      <Dumbbell className="w-5 h-5 stroke-[1.5] text-[#2C5F8D] mb-1" />
                      <span className="text-xs text-gray-700">健身</span>
                    </div>
                    <div className="flex flex-col items-center p-2 bg-[#2C5F8D]/10 rounded-xl">
                      <Lock className="w-5 h-5 stroke-[1.5] text-[#2C5F8D] mb-1" />
                      <span className="text-xs text-gray-700">保险柜</span>
                    </div>
                    <div className="flex flex-col items-center p-2 bg-[#2C5F8D]/10 rounded-xl">
                      <BedDouble className="w-5 h-5 stroke-[1.5] text-[#2C5F8D] mb-1" />
                      <span className="text-xs text-gray-700">加床</span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    <span className="inline-flex items-center h-5 px-1.5 text-xs text-gray-600 bg-[#F8F6F3] rounded leading-none">
                      <Baby className="w-3 h-3 stroke-[1.5] mr-0.5" />儿童看护
                    </span>
                    <span className="inline-flex items-center h-5 px-1.5 text-xs text-gray-600 bg-[#F8F6F3] rounded leading-none">
                      <Dog className="w-3 h-3 stroke-[1.5] mr-0.5" />宠物友好
                    </span>
                    <span className="inline-flex items-center h-5 px-1.5 text-xs text-gray-600 bg-[#F8F6F3] rounded leading-none">
                      <CarFront className="w-3 h-3 stroke-[1.5] mr-0.5" />接送服务
                    </span>
                    <span className="inline-flex items-center h-5 px-1.5 text-xs text-gray-600 bg-[#F8F6F3] rounded leading-none">
                      <Shirt className="w-3 h-3 stroke-[1.5] mr-0.5" />洗衣服务
                    </span>
                    <span className="inline-flex items-center h-5 px-1.5 text-xs text-gray-600 bg-[#F8F6F3] rounded leading-none">
                      <Shield className="w-3 h-3 stroke-[1.5] mr-0.5" />24h安保
                    </span>
                    <span className="inline-flex items-center h-5 px-1.5 text-xs text-gray-600 bg-[#F8F6F3] rounded leading-none">
                      <Sparkles className="w-3 h-3 stroke-[1.5] mr-0.5" />客房清洁
                    </span>
                  </div>
                </div>
              </div>
            </ComponentSection>
            </div>
          </section>

          {/* 页脚 */}
          <footer className="text-center py-8 border-t border-gray-200 mt-16">
            <p className="text-xs text-gray-500">
              Version 1.0 | 更新：2025-11-20 | © 小而美 Home Stay 设计团队
            </p>
          </footer>
        </div>
      </div>
    </div>
  )
}

// ========== 辅助组件 ==========

// 颜色卡片
function ColorCard({ name, season, color, hex, contrast, usage, textColor = "text-white", compact = false }: {
  name: string
  season?: string
  color: string
  hex: string
  contrast: string
  usage: string
  textColor?: string
  compact?: boolean
}) {
  const getWCAGGrade = (contrastValue: string) => {
    if (contrastValue === '-') return null
    const value = parseFloat(contrastValue)
    if (value >= 7.0) return { grade: 'AAA', color: 'text-[#5A8A65]' }
    if (value >= 4.5) return { grade: 'AA+', color: 'text-[#4A8FBF]' }
    return null
  }
  const wcag = getWCAGGrade(contrast)

  return (
    <div className="bg-white rounded-xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
      <div className={`${compact ? 'h-20' : 'h-28'} flex items-center justify-center ${textColor} font-semibold gap-2.5`} style={{ backgroundColor: color }}>
        {season && (
          <>
            <div className={compact ? 'text-xl' : 'text-2xl'}>{season}</div>
            <div className={`${compact ? 'text-xs' : 'text-sm'} opacity-50`}>|</div>
          </>
        )}
        <div className={compact ? 'text-base' : 'text-xl'}>{name}</div>
      </div>
      <div className={`${compact ? 'p-2.5' : 'p-4'} space-y-1.5`}>
        <div className="flex items-center justify-between text-xs">
          <code className="bg-gray-100 px-2 py-0.5 rounded font-mono text-gray-900 text-[10px]">{hex}</code>
          {wcag ? (
            <span className={`text-[10px] font-semibold ${wcag.color}`}>{contrast} {wcag.grade}</span>
          ) : (
            <span className="text-gray-400 text-[10px]">背景色</span>
          )}
        </div>
        <p className="text-[11px] text-gray-600 leading-snug">{usage}</p>
      </div>
    </div>
  )
}

// 组件章节容器
function ComponentSection({ title, icon, children }: { title: string, icon: React.ReactNode, children: React.ReactNode }) {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
      <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2.5">
        <div className="w-9 h-9 bg-[#2C5F8D]/10 rounded-xl flex items-center justify-center text-[#2C5F8D]">
          {icon}
        </div>
        {title}
      </h3>
      {children}
    </div>
  )
}
