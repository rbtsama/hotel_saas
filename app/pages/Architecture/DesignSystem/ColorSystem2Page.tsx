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

export default function ColorSystem2Page() {
  const { isSidebarCollapsed } = useViewMode()

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar menuItems={menuConfig} />
      <div className="flex-1 overflow-y-auto bg-gray-50 transition-all duration-300">
        <div className="max-w-7xl mx-auto p-8 space-y-16">
          {/* 页面标题 */}
          <header className="text-center space-y-3 pt-4">
            <h1 className="text-4xl font-bold text-gray-900 flex items-center justify-center gap-3">
              <Palette className="w-10 h-10 text-[#458559]" strokeWidth={1.5} />
              小而美 Home Stay 配色系统
            </h1>
            <p className="text-sm text-gray-500">Design System · 自然大地配色 · Version 2.0</p>
          </header>

          {/* 设计理念 */}
          <section className="mt-12">
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-green-50 via-emerald-50 to-orange-50 border border-gray-200 shadow-sm">
              <div className="absolute top-0 right-0 w-96 h-96 bg-[#458559]/5 rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#A67B5B]/5 rounded-full blur-3xl"></div>
              <div className="relative px-8 py-10">
                <div className="max-w-3xl mx-auto text-center space-y-4">
                  <p className="text-[18px] text-gray-800 leading-relaxed font-medium">
                    小而美 Home Stay — 精选独特民宿，轻松愉悦出行，融入自然美景
                  </p>
                  <p className="text-[16px] text-gray-700 leading-relaxed">
                    "山林间的呼吸，田野上的漫步，冰川下的宁静。<br/>
                    森林绿如夏日树荫般清爽宜人，田野色如秋日麦浪般质朴温暖，冰川蓝如冬日湖面般澄澈纯净。"
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* 色彩系统 */}
          <section className="mt-16">
            <h2 className="text-3xl font-bold text-[#458559] mb-8 text-center">色彩系统</h2>

            {/* 主色系统 */}
            <div className="mb-10">
              <h3 className="text-lg font-semibold text-gray-700 mb-4 flex items-center gap-2">
                <div className="w-1 h-5 bg-[#458559] rounded-full"></div>
                主色系统
              </h3>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <ColorCard name="沙滩" season="春" color="#F8F6F3" hex="#F8F6F3" contrast="-" usage="背景色、卡片底色" textColor="text-gray-900" />
                <ColorCard name="森林" season="夏" color="#458559" hex="#458559" contrast="7.0:1" usage="主按钮、品牌色" />
                <ColorCard name="田野" season="秋" color="#A67B5B" hex="#A67B5B" contrast="5.2:1" usage="价格、促销标签" />
                <ColorCard name="冰川" season="冬" color="#4A85B8" hex="#4A85B8" contrast="5.5:1" usage="链接、交互元素" />
              </div>
            </div>

            {/* 功能色 + 中性色 */}
            <div>
              <h3 className="text-lg font-semibold text-gray-700 mb-4 flex items-center gap-2">
                <div className="w-1 h-5 bg-[#458559] rounded-full"></div>
                功能色 & 中性色
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                <ColorCard name="青松" color="#3D7350" hex="#3D7350" contrast="8.2:1" usage="成功状态" compact />
                <ColorCard name="枫叶" color="#B94D3D" hex="#B94D3D" contrast="7.1:1" usage="错误、警示" compact />
                <ColorCard name="主文字" color="#2A2A2A" hex="#2A2A2A" contrast="15.8:1" usage="标题、正文" compact />
                <ColorCard name="次文字" color="#6B6B6B" hex="#6B6B6B" contrast="5.7:1" usage="辅助说明" compact />
                <ColorCard name="占位符" color="#999999" hex="#999999" contrast="4.2:1" usage="占位符" compact />
              </div>
            </div>
          </section>

          {/* ========== 组件示例 ========== */}
          <section className="mt-16">
            <h2 className="text-3xl font-bold text-[#458559] mb-8 text-center">组件示例</h2>

            <div className="grid lg:grid-cols-3 gap-6">
              {/* 1. 按钮模块 */}
              <ComponentSection title="按钮" icon={<ShoppingCart className="w-5 h-5" strokeWidth={1.5} />}>
              <div className="space-y-4">
                {/* 主按钮 - 高度32px */}
                <div>
                  <h4 className="text-sm font-semibold text-gray-700 mb-2">主按钮 (高32px，圆角4px)</h4>
                  <div className="flex flex-wrap gap-2">
                    <button className="px-4 py-1.5 bg-[#458559] text-white rounded font-medium text-sm">
                      立即预订
                    </button>
                    <button className="px-4 py-1.5 bg-[#458559] text-white rounded font-medium text-sm">
                      确认支付
                    </button>
                    <button className="px-4 py-1.5 bg-[#458559] text-white rounded font-medium text-sm flex items-center gap-1">
                      <CreditCard className="w-3.5 h-3.5" strokeWidth={1.5} />
                      去支付
                    </button>
                  </div>
                </div>

                {/* 辅助按钮 */}
                <div>
                  <h4 className="text-sm font-semibold text-gray-700 mb-2">辅助按钮</h4>
                  <div className="flex flex-wrap gap-2">
                    <button className="px-4 py-1.5 bg-[#4A85B8] text-white rounded font-medium text-sm">
                      查看详情
                    </button>
                    <button className="px-4 py-1.5 bg-[#A67B5B] text-white rounded font-medium text-sm">
                      联系房东
                    </button>
                    <button className="px-4 py-1.5 bg-[#3D7350] text-white rounded font-medium text-sm flex items-center gap-1">
                      <CheckCircle className="w-3.5 h-3.5" strokeWidth={1.5} />
                      确认入住
                    </button>
                  </div>
                </div>

                {/* 描边按钮 */}
                <div>
                  <h4 className="text-sm font-semibold text-gray-700 mb-2">描边按钮</h4>
                  <div className="flex flex-wrap gap-2">
                    <button className="px-4 py-1.5 border border-[#458559] text-[#458559] rounded font-medium text-sm">
                      取消订单
                    </button>
                    <button className="px-4 py-1.5 border border-[#4A85B8] text-[#4A85B8] rounded font-medium text-sm">
                      查看全部
                    </button>
                    <button className="px-4 py-1.5 border border-gray-300 text-gray-700 rounded font-medium text-sm">
                      稍后再说
                    </button>
                    <button className="px-4 py-1.5 border border-[#B94D3D] text-[#B94D3D] rounded font-medium text-sm flex items-center gap-1">
                      <XCircle className="w-3.5 h-3.5" strokeWidth={1.5} />
                      申请退款
                    </button>
                  </div>
                </div>

                {/* 小按钮 - 高24px */}
                <div>
                  <h4 className="text-sm font-semibold text-gray-700 mb-2">小按钮 (高24px，全圆角)</h4>
                  <div className="flex flex-wrap gap-1.5">
                    <button className="px-2.5 py-0.5 bg-[#458559] text-white rounded-full font-medium text-xs">
                      筛选
                    </button>
                    <button className="px-2.5 py-0.5 bg-[#4A85B8] text-white rounded-full font-medium text-xs">
                      排序
                    </button>
                    <button className="px-2.5 py-0.5 border border-gray-300 text-gray-700 rounded-full text-xs">
                      重置
                    </button>
                    <button className="px-2.5 py-0.5 bg-gray-100 text-gray-700 rounded-full text-xs">
                      应用
                    </button>
                  </div>
                </div>

                {/* 圆形标签按钮 - 高22px */}
                <div>
                  <h4 className="text-sm font-semibold text-gray-700 mb-2">圆形标签 (高22px，全圆角)</h4>
                  <div className="flex flex-wrap gap-1.5">
                    <button className="px-2 py-0.5 bg-[#4A85B8]/10 text-[#4A85B8] rounded-full text-xs">
                      近地铁
                    </button>
                    <button className="px-2 py-0.5 bg-[#4A85B8]/10 text-[#4A85B8] rounded-full text-xs">
                      含早餐
                    </button>
                    <button className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full text-xs">
                      免费WiFi
                    </button>
                    <button className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full text-xs">
                      可做饭
                    </button>
                    <button className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full text-xs">
                      景观房
                    </button>
                  </div>
                </div>

                {/* 特殊按钮 */}
                <div>
                  <h4 className="text-sm font-semibold text-gray-700 mb-2">特殊按钮</h4>
                  <div className="flex flex-wrap gap-2 items-center">
                    <button className="px-3 py-1 bg-[#458559] text-white rounded text-sm font-medium">
                      立即预订
                    </button>
                    <button className="px-3 py-1 bg-gradient-to-r from-[#A67B5B] to-[#B8865F] text-white rounded text-sm font-medium">
                      限时抢购
                    </button>
                    <button className="w-8 h-8 bg-white border border-gray-200 rounded-full flex items-center justify-center">
                      <Heart className="w-4 h-4 text-gray-600" strokeWidth={1.5} />
                    </button>
                    <button className="w-8 h-8 bg-white border border-gray-200 rounded-full flex items-center justify-center">
                      <Share2 className="w-4 h-4 text-gray-600" strokeWidth={1.5} />
                    </button>
                  </div>
                </div>

                {/* 禁用状态 */}
                <div>
                  <h4 className="text-sm font-semibold text-gray-700 mb-2">禁用状态</h4>
                  <div className="flex flex-wrap gap-2">
                    <button className="px-4 py-1.5 bg-gray-200 text-gray-400 rounded font-medium text-sm cursor-not-allowed" disabled>
                      已满房
                    </button>
                    <button className="px-4 py-1.5 border border-gray-200 text-gray-400 rounded text-sm cursor-not-allowed" disabled>
                      不可预订
                    </button>
                  </div>
                </div>
              </div>
            </ComponentSection>

            {/* 2. 标签模块 */}
            <ComponentSection title="标签" icon={<Tag className="w-5 h-5" strokeWidth={1.5} />}>
              <div className="space-y-4">
                {/* 促销标签 - 高20px，圆角2px */}
                <div>
                  <h4 className="text-sm font-semibold text-gray-700 mb-2">促销标签 (高20px，圆角2px)</h4>
                  <div className="flex flex-wrap gap-1.5">
                    <span className="px-1.5 py-0.5 bg-[#B94D3D] text-white rounded-sm text-xs font-bold leading-tight">
                      限时特惠
                    </span>
                    <span className="px-1.5 py-0.5 bg-[#B94D3D] text-white rounded-sm text-xs font-bold leading-tight">
                      今日特价
                    </span>
                    <span className="px-1.5 py-0.5 bg-[#A67B5B] text-white rounded-sm text-xs font-bold leading-tight">
                      新客立减
                    </span>
                    <span className="px-1.5 py-0.5 bg-gradient-to-r from-[#A67B5B] to-[#B8865F] text-white rounded-sm text-xs font-bold leading-tight">
                      双11特惠
                    </span>
                    <span className="px-1.5 py-0.5 bg-[#B94D3D] text-white rounded-sm text-xs font-bold leading-tight inline-flex items-center gap-0.5">
                      <Sparkles className="w-2.5 h-2.5" strokeWidth={1.5} />
                      限量抢购
                    </span>
                  </div>
                </div>

                {/* 订单状态徽章 - 高24px，圆角2px */}
                <div>
                  <h4 className="text-sm font-semibold text-gray-700 mb-2">订单状态徽章 (高24px，圆角2px)</h4>
                  <div className="flex flex-wrap gap-1.5">
                    <span className="px-2 py-0.5 bg-[#3D7350]/10 text-[#3D7350] rounded-sm text-xs font-medium border border-[#3D7350]/20">
                      已入住
                    </span>
                    <span className="px-2 py-0.5 bg-[#4A85B8]/10 text-[#4A85B8] rounded-sm text-xs font-medium border border-[#4A85B8]/20">
                      待入住
                    </span>
                    <span className="px-2 py-0.5 bg-[#A67B5B]/10 text-[#A67B5B] rounded-sm text-xs font-medium border border-[#A67B5B]/20">
                      待确认
                    </span>
                    <span className="px-2 py-0.5 bg-[#B94D3D]/10 text-[#B94D3D] rounded-sm text-xs font-medium border border-[#B94D3D]/20">
                      已取消
                    </span>
                    <span className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded-sm text-xs font-medium border border-gray-200">
                      已完成
                    </span>
                    <span className="px-2 py-0.5 bg-[#3D7350]/10 text-[#3D7350] rounded-sm text-xs font-medium border border-[#3D7350]/20 inline-flex items-center gap-0.5">
                      <CheckCircle className="w-2.5 h-2.5" strokeWidth={1.5} />
                      支付成功
                    </span>
                  </div>
                </div>

                {/* 空心标签 */}
                <div>
                  <h4 className="text-sm font-semibold text-gray-700 mb-2">空心标签 (圆角2px)</h4>
                  <div className="flex flex-wrap gap-1.5">
                    <span className="px-2 py-0.5 border border-[#458559] text-[#458559] rounded-sm text-xs">
                      超赞房东
                    </span>
                    <span className="px-2 py-0.5 border border-[#4A85B8] text-[#4A85B8] rounded-sm text-xs">
                      即时确认
                    </span>
                    <span className="px-2 py-0.5 border border-[#A67B5B] text-[#A67B5B] rounded-sm text-xs">
                      热门房源
                    </span>
                    <span className="px-2 py-0.5 border border-[#3D7350] text-[#3D7350] rounded-sm text-xs">
                      高评分
                    </span>
                  </div>
                </div>

                {/* 小标签 - 高18px，圆角2px */}
                <div>
                  <h4 className="text-sm font-semibold text-gray-700 mb-2">小标签 (高18px，圆角2px)</h4>
                  <div className="flex flex-wrap gap-1">
                    <span className="px-1.5 py-0 bg-gray-100 text-gray-600 rounded-sm text-[11px] leading-[18px]">
                      双床
                    </span>
                    <span className="px-1.5 py-0 bg-gray-100 text-gray-600 rounded-sm text-[11px] leading-[18px]">
                      大床
                    </span>
                    <span className="px-1.5 py-0 bg-gray-100 text-gray-600 rounded-sm text-[11px] leading-[18px]">
                      可住2人
                    </span>
                    <span className="px-1.5 py-0 bg-gray-100 text-gray-600 rounded-sm text-[11px] leading-[18px]">
                      20m²
                    </span>
                    <span className="px-1.5 py-0 bg-gray-100 text-gray-600 rounded-sm text-[11px] leading-[18px]">
                      高层
                    </span>
                  </div>
                </div>

                {/* 徽章 */}
                <div>
                  <h4 className="text-sm font-semibold text-gray-700 mb-3">徽章</h4>
                  <div className="flex flex-wrap gap-3">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-[#3D7350] rounded-full flex items-center justify-center">
                        <Shield className="w-4 h-4 text-white" strokeWidth={1.5} />
                      </div>
                      <span className="text-xs text-gray-700">超赞房东</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-[#A67B5B] rounded-full flex items-center justify-center">
                        <Star className="w-4 h-4 text-white" strokeWidth={1.5} />
                      </div>
                      <span className="text-xs text-gray-700">5.0分好评</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-[#4A85B8] rounded-full flex items-center justify-center">
                        <CheckCircle className="w-4 h-4 text-white" strokeWidth={1.5} />
                      </div>
                      <span className="text-xs text-gray-700">已认证</span>
                    </div>
                  </div>
                </div>

                {/* 特性标签 - 迷你空心 */}
                <div>
                  <h4 className="text-sm font-semibold text-gray-700 mb-2">特性标签 (迷你空心，高22px，圆角2px)</h4>
                  <div className="flex flex-wrap gap-1.5">
                    <span className="px-1.5 py-0 border border-[#4A85B8] text-[#4A85B8] rounded-sm text-xs inline-flex items-center gap-0.5 leading-[20px]">
                      <Wifi className="w-3 h-3" strokeWidth={1.5} />
                      免费WiFi
                    </span>
                    <span className="px-1.5 py-0 border border-[#A67B5B] text-[#A67B5B] rounded-sm text-xs inline-flex items-center gap-0.5 leading-[20px]">
                      <Coffee className="w-3 h-3" strokeWidth={1.5} />
                      含早餐
                    </span>
                    <span className="px-1.5 py-0 border border-gray-400 text-gray-600 rounded-sm text-xs inline-flex items-center gap-0.5 leading-[20px]">
                      <BedDouble className="w-3 h-3" strokeWidth={1.5} />
                      双床
                    </span>
                    <span className="px-1.5 py-0 border border-gray-400 text-gray-600 rounded-sm text-xs inline-flex items-center gap-0.5 leading-[20px]">
                      <ParkingCircle className="w-3 h-3" strokeWidth={1.5} />
                      免费停车
                    </span>
                    <span className="px-1.5 py-0 border border-[#4A85B8] text-[#4A85B8] rounded-sm text-xs inline-flex items-center gap-0.5 leading-[20px]">
                      <Wind className="w-3 h-3" strokeWidth={1.5} />
                      空调
                    </span>
                    <span className="px-1.5 py-0 border border-gray-400 text-gray-600 rounded-sm text-xs inline-flex items-center gap-0.5 leading-[20px]">
                      <Tv className="w-3 h-3" strokeWidth={1.5} />
                      电视
                    </span>
                    <span className="px-1.5 py-0 border border-gray-400 text-gray-600 rounded-sm text-xs inline-flex items-center gap-0.5 leading-[20px]">
                      <Bath className="w-3 h-3" strokeWidth={1.5} />
                      独立卫浴
                    </span>
                    <span className="px-1.5 py-0 border border-gray-400 text-gray-600 rounded-sm text-xs inline-flex items-center gap-0.5 leading-[20px]">
                      <Utensils className="w-3 h-3" strokeWidth={1.5} />
                      可做饭
                    </span>
                    <span className="px-1.5 py-0 border border-[#3D7350] text-[#3D7350] rounded-sm text-xs inline-flex items-center gap-0.5 leading-[20px]">
                      <Trees className="w-3 h-3" strokeWidth={1.5} />
                      景观房
                    </span>
                  </div>
                </div>
              </div>
            </ComponentSection>

            {/* 3. 输入表单模块 */}
            <ComponentSection title="输入表单" icon={<Search className="w-5 h-5" strokeWidth={1.5} />}>
              <div className="space-y-4">
                {/* 方形输入框 - 高36px，圆角4px */}
                <div>
                  <h4 className="text-sm font-semibold text-gray-700 mb-2">方形输入框 (高36px，圆角4px)</h4>
                  <div className="space-y-2 max-w-md">
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">入住人姓名</label>
                      <input
                        type="text"
                        placeholder="请输入入住人姓名"
                        className="w-full px-3 py-2 bg-white border border-gray-300 rounded text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-[#458559]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">身份证号</label>
                      <input
                        type="text"
                        placeholder="请输入18位身份证号"
                        className="w-full px-3 py-2 bg-white border border-gray-300 rounded text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-[#458559]"
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
                        placeholder="搜索城市、民宿名称"
                        className="w-full pl-9 pr-3 py-2 bg-white border border-gray-300 rounded-full text-sm text-gray-900 placeholder:text-gray-400"
                      />
                    </div>
                  </div>
                </div>

                {/* 手机号+验证码 */}
                <div>
                  <h4 className="text-sm font-semibold text-gray-700 mb-2">手机号+验证码</h4>
                  <div className="space-y-2 max-w-md">
                    <div className="flex gap-2">
                      <div className="relative flex-1">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" strokeWidth={1.5} />
                        <input
                          type="tel"
                          placeholder="请输入手机号"
                          className="w-full pl-9 pr-3 py-2 bg-white border border-gray-300 rounded text-sm placeholder:text-gray-400 focus:outline-none focus:border-[#458559]"
                        />
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="请输入验证码"
                        className="flex-1 px-3 py-2 bg-white border border-gray-300 rounded text-sm placeholder:text-gray-400 focus:outline-none focus:border-[#458559]"
                      />
                      <button className="px-3 py-2 bg-[#4A85B8] text-white rounded text-sm font-medium whitespace-nowrap">
                        获取验证码
                      </button>
                    </div>
                  </div>
                </div>

                {/* 备注填写框 */}
                <div>
                  <h4 className="text-sm font-semibold text-gray-700 mb-2">备注填写框</h4>
                  <div className="max-w-md">
                    <label className="block text-xs text-gray-600 mb-1">特殊需求（选填）</label>
                    <textarea
                      placeholder="如有特殊要求请在此填写，例如：需要婴儿床、高楼层、安静房间等"
                      rows={3}
                      className="w-full px-3 py-2 bg-white border border-gray-300 rounded text-sm text-gray-900 placeholder:text-gray-400 resize-none focus:outline-none focus:border-[#458559]"
                    />
                    <p className="text-xs text-gray-400 mt-1">0/200</p>
                  </div>
                </div>

                {/* 错误状态 */}
                <div>
                  <h4 className="text-sm font-semibold text-gray-700 mb-2">错误状态</h4>
                  <div className="max-w-md space-y-1">
                    <input
                      type="text"
                      placeholder="请输入手机号"
                      className="w-full px-3 py-2 bg-white border-2 border-[#B94D3D] rounded text-sm"
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
                {/* 筛选 */}
                <div>
                  <h4 className="text-sm font-semibold text-gray-700 mb-3">筛选</h4>
                  <div className="space-y-3">
                    <div>
                      <p className="text-xs text-gray-600 mb-2">价格区间</p>
                      <div className="flex gap-2">
                        <button className="px-4 py-2 bg-[#458559] text-white rounded-full text-xs font-medium">
                          全部
                        </button>
                        <button className="px-4 py-2 bg-[#F8F6F3] text-gray-700 rounded-full text-xs">
                          ¥0-200
                        </button>
                        <button className="px-4 py-2 bg-[#F8F6F3] text-gray-700 rounded-full text-xs">
                          ¥200-500
                        </button>
                        <button className="px-4 py-2 bg-[#F8F6F3] text-gray-700 rounded-full text-xs">
                          ¥500+
                        </button>
                      </div>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600 mb-2">房型</p>
                      <div className="flex gap-2">
                        <button className="px-4 py-2 bg-[#F8F6F3] text-gray-700 rounded-full text-xs">
                          单人间
                        </button>
                        <button className="px-4 py-2 bg-[#458559] text-white rounded-full text-xs font-medium">
                          双人间
                        </button>
                        <button className="px-4 py-2 bg-[#F8F6F3] text-gray-700 rounded-full text-xs">
                          套房
                        </button>
                        <button className="px-4 py-2 bg-[#F8F6F3] text-gray-700 rounded-full text-xs">
                          整套公寓
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 排序 */}
                <div>
                  <h4 className="text-sm font-semibold text-gray-700 mb-3">排序</h4>
                  <div className="flex gap-2">
                    <button className="px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-xs text-gray-700 flex items-center gap-1.5">
                      <ArrowUpDown className="w-3.5 h-3.5" strokeWidth={1.5} />
                      综合排序
                    </button>
                    <button className="px-4 py-2.5 bg-white border border-[#458559] text-[#458559] rounded-lg text-xs font-medium flex items-center gap-1.5">
                      <ArrowUpDown className="w-3.5 h-3.5" strokeWidth={1.5} />
                      价格从低到高
                    </button>
                    <button className="px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-xs text-gray-700 flex items-center gap-1.5">
                      <Star className="w-3.5 h-3.5" strokeWidth={1.5} />
                      好评优先
                    </button>
                  </div>
                </div>

                {/* 单选 */}
                <div>
                  <h4 className="text-sm font-semibold text-gray-700 mb-3">单选</h4>
                  <div className="space-y-2 max-w-sm">
                    <label className="flex items-center gap-3 p-3 bg-white border border-[#458559] rounded-lg cursor-pointer">
                      <div className="w-4 h-4 rounded-full border-2 border-[#458559] flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-[#458559]"></div>
                      </div>
                      <span className="text-sm text-gray-900">微信支付</span>
                    </label>
                    <label className="flex items-center gap-3 p-3 bg-white border border-gray-200 rounded-lg cursor-pointer">
                      <div className="w-4 h-4 rounded-full border-2 border-gray-300"></div>
                      <span className="text-sm text-gray-700">支付宝</span>
                    </label>
                    <label className="flex items-center gap-3 p-3 bg-white border border-gray-200 rounded-lg cursor-pointer">
                      <div className="w-4 h-4 rounded-full border-2 border-gray-300"></div>
                      <span className="text-sm text-gray-700">银行卡</span>
                    </label>
                  </div>
                </div>

                {/* 多选 */}
                <div>
                  <h4 className="text-sm font-semibold text-gray-700 mb-3">多选</h4>
                  <div className="space-y-2 max-w-sm">
                    <label className="flex items-center gap-3 p-3 bg-white border border-[#458559] rounded-lg cursor-pointer">
                      <div className="w-4 h-4 rounded bg-[#458559] flex items-center justify-center">
                        <Check className="w-3 h-3 text-white" />
                      </div>
                      <span className="text-sm text-gray-900">免费WiFi</span>
                    </label>
                    <label className="flex items-center gap-3 p-3 bg-white border border-[#458559] rounded-lg cursor-pointer">
                      <div className="w-4 h-4 rounded bg-[#458559] flex items-center justify-center">
                        <Check className="w-3 h-3 text-white" />
                      </div>
                      <span className="text-sm text-gray-900">免费停车</span>
                    </label>
                    <label className="flex items-center gap-3 p-3 bg-white border border-gray-200 rounded-lg cursor-pointer">
                      <div className="w-4 h-4 rounded border-2 border-gray-300"></div>
                      <span className="text-sm text-gray-700">含早餐</span>
                    </label>
                  </div>
                </div>

                {/* 开关 */}
                <div>
                  <h4 className="text-sm font-semibold text-gray-700 mb-3">开关</h4>
                  <div className="space-y-3 max-w-sm">
                    <div className="flex items-center justify-between p-3 bg-white border border-gray-200 rounded-lg">
                      <span className="text-sm text-gray-700">接收订单通知</span>
                      <button className="w-12 h-6 bg-[#3D7350] rounded-full relative">
                        <div className="absolute right-0.5 top-0.5 w-5 h-5 bg-white rounded-full shadow-sm"></div>
                      </button>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-white border border-gray-200 rounded-lg">
                      <span className="text-sm text-gray-700">接收促销信息</span>
                      <button className="w-12 h-6 bg-gray-300 rounded-full relative">
                        <div className="absolute left-0.5 top-0.5 w-5 h-5 bg-white rounded-full shadow-sm"></div>
                      </button>
                    </div>
                  </div>
                </div>

                {/* 日期范围选择器 */}
                <div>
                  <h4 className="text-sm font-semibold text-gray-700 mb-3">日期范围选择器</h4>
                  <div className="max-w-md">
                    <div className="flex gap-3">
                      <div className="flex-1">
                        <label className="block text-xs text-gray-600 mb-1.5">入住日期</label>
                        <button className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-sm text-gray-900 flex items-center justify-between">
                          <span>11/21</span>
                          <Calendar className="w-4 h-4 text-gray-400" strokeWidth={1.5} />
                        </button>
                      </div>
                      <div className="flex-1">
                        <label className="block text-xs text-gray-600 mb-1.5">退房日期</label>
                        <button className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-sm text-gray-900 flex items-center justify-between">
                          <span>11/23</span>
                          <Calendar className="w-4 h-4 text-gray-400" strokeWidth={1.5} />
                        </button>
                      </div>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">共 2 晚</p>
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
                  <div className="max-w-sm bg-white border border-gray-200 rounded-xl p-4 space-y-3">
                    <h5 className="text-sm font-semibold text-gray-900">价格明细</h5>
                    <div className="space-y-2.5">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">¥388 × 2晚</span>
                        <span className="text-gray-900">¥776</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">清洁费</span>
                        <span className="text-gray-900">¥50</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-[#A67B5B] flex items-center gap-1">
                          <Tag className="w-3.5 h-3.5" strokeWidth={1.5} />
                          新客优惠
                        </span>
                        <span className="text-[#A67B5B]">-¥50</span>
                      </div>
                      <div className="border-t border-gray-200 pt-2.5 flex justify-between items-center">
                        <span className="text-sm font-semibold text-gray-900">总计</span>
                        <span className="text-xl font-bold text-[#A67B5B]">¥776</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 地址信息、联系方式、营业时间 */}
                <div>
                  <h4 className="text-sm font-semibold text-gray-700 mb-3">地址信息、联系方式、营业时间</h4>
                  <div className="max-w-sm bg-white border border-gray-200 rounded-xl p-4 space-y-4">
                    <div className="flex gap-3">
                      <MapPin className="w-5 h-5 text-[#4A85B8] flex-shrink-0 mt-0.5" strokeWidth={1.5} />
                      <div>
                        <p className="text-sm font-medium text-gray-900">民宿地址</p>
                        <p className="text-xs text-gray-600 mt-1">浙江省杭州市西湖区龙井路18号</p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <Phone className="w-5 h-5 text-[#3D7350] flex-shrink-0 mt-0.5" strokeWidth={1.5} />
                      <div>
                        <p className="text-sm font-medium text-gray-900">联系电话</p>
                        <p className="text-xs text-gray-600 mt-1">138-1234-5678</p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <Clock className="w-5 h-5 text-[#A67B5B] flex-shrink-0 mt-0.5" strokeWidth={1.5} />
                      <div>
                        <p className="text-sm font-medium text-gray-900">入住/退房时间</p>
                        <p className="text-xs text-gray-600 mt-1">14:00 入住 · 12:00 退房</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 设施特性 - 直接摆放icon */}
                <div>
                  <h4 className="text-sm font-semibold text-gray-700 mb-3">设施特性 (直接摆放icon + 文字)</h4>
                  <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
                    <div className="flex flex-col items-center gap-1.5 text-center">
                      <Wifi className="w-6 h-6 text-[#4A85B8]" strokeWidth={1.5} />
                      <span className="text-xs text-gray-700">免费WiFi</span>
                    </div>
                    <div className="flex flex-col items-center gap-1.5 text-center">
                      <Coffee className="w-6 h-6 text-[#A67B5B]" strokeWidth={1.5} />
                      <span className="text-xs text-gray-700">含早餐</span>
                    </div>
                    <div className="flex flex-col items-center gap-1.5 text-center">
                      <ParkingCircle className="w-6 h-6 text-gray-600" strokeWidth={1.5} />
                      <span className="text-xs text-gray-700">免费停车</span>
                    </div>
                    <div className="flex flex-col items-center gap-1.5 text-center">
                      <Wind className="w-6 h-6 text-gray-600" strokeWidth={1.5} />
                      <span className="text-xs text-gray-700">空调</span>
                    </div>
                    <div className="flex flex-col items-center gap-1.5 text-center">
                      <Tv className="w-6 h-6 text-gray-600" strokeWidth={1.5} />
                      <span className="text-xs text-gray-700">电视</span>
                    </div>
                    <div className="flex flex-col items-center gap-1.5 text-center">
                      <Bath className="w-6 h-6 text-gray-600" strokeWidth={1.5} />
                      <span className="text-xs text-gray-700">独立卫浴</span>
                    </div>
                    <div className="flex flex-col items-center gap-1.5 text-center">
                      <WashingMachine className="w-6 h-6 text-gray-600" strokeWidth={1.5} />
                      <span className="text-xs text-gray-700">洗衣机</span>
                    </div>
                    <div className="flex flex-col items-center gap-1.5 text-center">
                      <Utensils className="w-6 h-6 text-gray-600" strokeWidth={1.5} />
                      <span className="text-xs text-gray-700">可做饭</span>
                    </div>
                    <div className="flex flex-col items-center gap-1.5 text-center">
                      <Trees className="w-6 h-6 text-[#3D7350]" strokeWidth={1.5} />
                      <span className="text-xs text-gray-700">景观房</span>
                    </div>
                    <div className="flex flex-col items-center gap-1.5 text-center">
                      <Dumbbell className="w-6 h-6 text-gray-600" strokeWidth={1.5} />
                      <span className="text-xs text-gray-700">健身房</span>
                    </div>
                    <div className="flex flex-col items-center gap-1.5 text-center">
                      <Dog className="w-6 h-6 text-gray-600" strokeWidth={1.5} />
                      <span className="text-xs text-gray-700">可带宠物</span>
                    </div>
                    <div className="flex flex-col items-center gap-1.5 text-center">
                      <Baby className="w-6 h-6 text-gray-600" strokeWidth={1.5} />
                      <span className="text-xs text-gray-700">婴儿床</span>
                    </div>
                  </div>
                </div>
              </div>
            </ComponentSection>
            </div>
          </section>

          {/* 页脚 */}
          <footer className="text-center py-8 border-t border-gray-200 mt-16">
            <p className="text-xs text-gray-500">
              Version 2.0 | 更新：2025-11-21 | © 小而美 Home Stay 设计团队
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
    if (value >= 7.0) return { grade: 'AAA', color: 'text-[#3D7350]' }
    if (value >= 4.5) return { grade: 'AA+', color: 'text-[#4A85B8]' }
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
        <div className="w-9 h-9 bg-[#458559]/10 rounded-xl flex items-center justify-center text-[#458559]">
          {icon}
        </div>
        {title}
      </h3>
      {children}
    </div>
  )
}
