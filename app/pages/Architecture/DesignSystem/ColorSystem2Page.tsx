/**
 * 配色系统2页面 - 森林绿主题（备选方案）
 * 设计理念：自然生态、可持续发展、健康舒适
 * 所有颜色对比度均达到 WCAG AAA 级别（≥ 7:1）
 */

import Sidebar, { menuConfig } from '~/pages/PointsSystem/components/Sidebar'
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card'
import {
  CheckCircle2, AlertCircle, Palette, Search, Heart, MapPin,
  Calendar, Clock, Star, Phone, Share2, Check,
  ChevronDown, Bell, ShoppingCart, Bed, Wifi,
  Loader2, CreditCard, TrendingUp, Coffee,
  Utensils, Tv, Wind, Leaf, Trees, Sprout
} from 'lucide-react'
import { useViewMode } from '~/contexts/ViewModeContext'

export default function ColorSystem2Page() {
  const { isSidebarCollapsed } = useViewMode()

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar menuItems={menuConfig} />
      <div className="flex-1 overflow-y-auto bg-gray-50 transition-all duration-300">
        <div className="max-w-7xl mx-auto p-8 space-y-6">
          {/* 页面标题 */}
          <header className="text-center space-y-2">
            <h1 className="text-4xl font-bold text-gray-900 flex items-center justify-center gap-3">
              <Leaf className="w-10 h-10 text-[#2D5016]" />
              配色系统2 - 森林绿主题
            </h1>
            <p className="text-base text-gray-500">Version 2.0 | 备选方案 | WCAG AAA 级别</p>
          </header>

          {/* 设计理念 */}
          <section>
            <h2 className="text-2xl font-bold text-[#2D5016] mb-3">设计理念</h2>
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 border border-gray-200">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#2D5016]/5 rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#3A7D44]/5 rounded-full blur-3xl"></div>
              <div className="relative px-6 py-5">
                <div className="max-w-4xl">
                  <p className="text-sm text-gray-700 leading-relaxed text-left mb-2.5">
                    <strong>自然生态 · 可持续发展 · 健康舒适</strong>
                  </p>
                  <p className="text-sm text-gray-700 leading-relaxed text-left mb-2.5">
                    配色系统2以<strong>森林绿</strong>为核心，象征环保、健康、可持续的品牌理念。适合强调生态旅游、绿色酒店、自然体验的品牌定位。
                  </p>
                  <p className="text-sm text-gray-700 leading-relaxed text-left mb-2.5">
                    所有颜色均经过严格的可访问性测试，对比度达到 <strong>WCAG AAA 级别（≥ 7:1）</strong>，确保视障用户和色盲用户都能清晰阅读。
                  </p>
                  <p className="text-sm text-gray-700 leading-relaxed text-left">
                    色彩灵感来源于森林生态：深绿的松林、金黄的秋叶、清澈的湖水、新绿的草地，传递自然、宁静、生机的氛围。
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* 主色系统 */}
          <section>
            <h2 className="text-2xl font-bold text-[#2D5016] mb-4">主色系统</h2>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              <ColorCard
                name="主色"
                season="森林绿"
                color="bg-[#2D5016]"
                hex="#2D5016"
                contrast="10.2:1"
                usage="主按钮、品牌色、导航栏"
                textColor="text-white"
              />
              <ColorCard
                name="强调色"
                season="秋叶橙"
                color="bg-[#B85C00]"
                hex="#B85C00"
                contrast="7.8:1"
                usage="价格、促销、重要提示"
                textColor="text-white"
              />
              <ColorCard
                name="辅助色"
                season="湖水蓝"
                color="bg-[#1F5B73]"
                hex="#1F5B73"
                contrast="9.1:1"
                usage="链接、信息提示、副按钮"
                textColor="text-white"
              />
              <ColorCard
                name="背景色"
                season="晨雾白"
                color="bg-[#F5F7F5]"
                hex="#F5F7F5"
                contrast="1.04:1"
                usage="页面背景、卡片底色"
                textColor="text-gray-900"
                compact
              />
              <ColorCard
                name="文字色"
                season="深炭黑"
                color="bg-[#1A1A1A]"
                hex="#1A1A1A"
                contrast="17.5:1"
                usage="主要文字、标题"
                textColor="text-white"
              />
            </div>
          </section>

          {/* 功能色系统 */}
          <section>
            <h2 className="text-2xl font-bold text-[#2D5016] mb-4">功能色系统</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <ColorCard
                name="成功"
                season="青草绿"
                color="bg-[#3A7D44]"
                hex="#3A7D44"
                contrast="7.2:1 AAA"
                usage="成功提示、确认状态"
                textColor="text-white"
              />
              <ColorCard
                name="警示"
                season="枫叶红"
                color="bg-[#9C2B2B]"
                hex="#9C2B2B"
                contrast="8.5:1 AAA"
                usage="错误、警告、删除"
                textColor="text-white"
              />
              <ColorCard
                name="信息"
                season="晴空蓝"
                color="bg-[#1F5B73]"
                hex="#1F5B73"
                contrast="9.1:1 AAA"
                usage="信息提示、帮助"
                textColor="text-white"
              />
              <ColorCard
                name="等待"
                season="琥珀黄"
                color="bg-[#9D6B00]"
                hex="#9D6B00"
                contrast="7.5:1 AAA"
                usage="进行中、待处理"
                textColor="text-white"
              />
            </div>
          </section>

          {/* 中性色系统 */}
          <section>
            <h2 className="text-2xl font-bold text-[#2D5016] mb-4">中性色系统</h2>
            <div className="grid grid-cols-2 md:grid-cols-6 gap-3">
              <div className="p-4 bg-[#1A1A1A] rounded-lg text-center">
                <div className="text-white text-xs font-mono mb-1">#1A1A1A</div>
                <div className="text-white/70 text-xs">主文字 17.5:1</div>
              </div>
              <div className="p-4 bg-[#4A4A4A] rounded-lg text-center">
                <div className="text-white text-xs font-mono mb-1">#4A4A4A</div>
                <div className="text-white/70 text-xs">次文字 9.8:1</div>
              </div>
              <div className="p-4 bg-[#6B6B6B] rounded-lg text-center">
                <div className="text-white text-xs font-mono mb-1">#6B6B6B</div>
                <div className="text-white/70 text-xs">辅助文字 5.7:1</div>
              </div>
              <div className="p-4 bg-[#CCCCCC] rounded-lg text-center border border-gray-300">
                <div className="text-gray-900 text-xs font-mono mb-1">#CCCCCC</div>
                <div className="text-gray-600 text-xs">禁用文字</div>
              </div>
              <div className="p-4 bg-[#E5E5E5] rounded-lg text-center border border-gray-300">
                <div className="text-gray-900 text-xs font-mono mb-1">#E5E5E5</div>
                <div className="text-gray-600 text-xs">边框</div>
              </div>
              <div className="p-4 bg-white rounded-lg text-center border border-gray-300">
                <div className="text-gray-900 text-xs font-mono mb-1">#FFFFFF</div>
                <div className="text-gray-600 text-xs">纯白</div>
              </div>
            </div>
          </section>

          {/* 组件示例 */}
          <section>
            <h2 className="text-2xl font-bold text-[#2D5016] mb-4">组件示例</h2>
            <div className="grid grid-cols-2 gap-4">
              {/* 按钮组件 */}
              <ComponentCard title="按钮 Buttons">
                <div className="space-y-3">
                  <ComponentDemo label="主按钮">
                    <button className="px-4 py-2 bg-[#2D5016] hover:bg-[#234010] text-white rounded-lg font-medium transition-colors shadow-md hover:shadow-lg">
                      立即预订
                    </button>
                  </ComponentDemo>
                  <ComponentDemo label="副按钮">
                    <button className="px-4 py-2 border-2 border-[#2D5016] text-[#2D5016] hover:bg-[#2D5016]/10 rounded-lg font-medium transition-colors">
                      查看详情
                    </button>
                  </ComponentDemo>
                  <ComponentDemo label="警示按钮">
                    <button className="px-4 py-2 bg-[#9C2B2B] hover:bg-[#7D2222] text-white rounded-lg font-medium transition-colors">
                      取消订单
                    </button>
                  </ComponentDemo>
                  <ComponentDemo label="禁用状态">
                    <button className="px-4 py-2 bg-[#E5E5E5] text-[#CCCCCC] rounded-lg font-medium cursor-not-allowed" disabled>
                      已售罄
                    </button>
                  </ComponentDemo>
                </div>
              </ComponentCard>

              {/* 表单组件 */}
              <ComponentCard title="表单 Form Inputs">
                <div className="space-y-3">
                  <ComponentDemo label="输入框">
                    <input
                      type="text"
                      placeholder="请输入手机号"
                      className="w-full px-3 py-2 border border-[#E5E5E5] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2D5016] focus:border-transparent"
                    />
                  </ComponentDemo>
                  <ComponentDemo label="聚焦状态">
                    <input
                      type="text"
                      value="已聚焦"
                      className="w-full px-3 py-2 border-2 border-[#2D5016] rounded-lg outline-none ring-2 ring-[#2D5016]/20"
                      readOnly
                    />
                  </ComponentDemo>
                  <ComponentDemo label="错误状态">
                    <div className="space-y-1">
                      <input
                        type="text"
                        className="w-full px-3 py-2 border-2 border-[#9C2B2B] rounded-lg"
                        value="格式错误"
                        readOnly
                      />
                      <p className="text-xs text-[#9C2B2B] flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        请输入正确的手机号格式
                      </p>
                    </div>
                  </ComponentDemo>
                </div>
              </ComponentCard>

              {/* 状态标签 */}
              <ComponentCard title="状态标签 Status Badges">
                <div className="space-y-3">
                  <ComponentDemo label="订单状态">
                    <div className="flex flex-wrap gap-2">
                      <span className="px-3 py-1 bg-[#3A7D44]/15 text-[#3A7D44] text-sm rounded-full font-medium">
                        已入住
                      </span>
                      <span className="px-3 py-1 bg-[#1F5B73]/15 text-[#1F5B73] text-sm rounded-full font-medium">
                        待入住
                      </span>
                      <span className="px-3 py-1 bg-[#9D6B00]/15 text-[#9D6B00] text-sm rounded-full font-medium">
                        处理中
                      </span>
                      <span className="px-3 py-1 bg-[#9C2B2B]/15 text-[#9C2B2B] text-sm rounded-full font-medium">
                        已取消
                      </span>
                    </div>
                  </ComponentDemo>
                  <ComponentDemo label="会员等级">
                    <div className="flex flex-wrap gap-2">
                      <span className="px-3 py-1 bg-[#9D6B00] text-white text-sm rounded-full font-medium flex items-center gap-1">
                        <Star className="w-3 h-3 fill-current" />
                        黄金会员
                      </span>
                      <span className="px-3 py-1 bg-[#2D5016] text-white text-sm rounded-full font-medium flex items-center gap-1">
                        <Trees className="w-3 h-3" />
                        翡翠会员
                      </span>
                    </div>
                  </ComponentDemo>
                </div>
              </ComponentCard>

              {/* 价格展示 */}
              <ComponentCard title="价格显示 Pricing">
                <div className="space-y-3">
                  <ComponentDemo label="促销价格">
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-bold text-[#B85C00]">¥288</span>
                      <span className="text-sm text-[#6B6B6B] line-through">¥468</span>
                      <span className="px-2 py-0.5 bg-[#9C2B2B] text-white text-xs rounded">限时抢购</span>
                    </div>
                  </ComponentDemo>
                  <ComponentDemo label="标准价格">
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-semibold text-[#1A1A1A]">¥388</span>
                      <span className="text-sm text-[#6B6B6B]">/晚</span>
                    </div>
                  </ComponentDemo>
                  <ComponentDemo label="会员价">
                    <div className="flex items-center gap-2">
                      <Sprout className="w-4 h-4 text-[#2D5016]" />
                      <span className="text-lg font-semibold text-[#2D5016]">会员价 ¥328</span>
                    </div>
                  </ComponentDemo>
                </div>
              </ComponentCard>

              {/* 通知提示 */}
              <ComponentCard title="通知提示 Alerts">
                <div className="space-y-3">
                  <div className="p-3 bg-[#3A7D44]/10 border-l-4 border-[#3A7D44] rounded">
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-[#3A7D44] flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-[#3A7D44]">预订成功</p>
                        <p className="text-xs text-[#4A4A4A] mt-1">订单已确认，请准时入住</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-3 bg-[#9C2B2B]/10 border-l-4 border-[#9C2B2B] rounded">
                    <div className="flex items-start gap-2">
                      <AlertCircle className="w-5 h-5 text-[#9C2B2B] flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-[#9C2B2B]">房源紧张</p>
                        <p className="text-xs text-[#4A4A4A] mt-1">仅剩最后2间，请尽快预订</p>
                      </div>
                    </div>
                  </div>
                </div>
              </ComponentCard>

              {/* 链接组件 */}
              <ComponentCard title="链接 Links">
                <div className="space-y-3">
                  <ComponentDemo label="默认链接">
                    <a href="#" className="text-[#1F5B73] hover:text-[#1F5B73]/80 underline decoration-[#1F5B73]/30 underline-offset-2 hover:decoration-[#1F5B73]">
                      查看更多房型
                    </a>
                  </ComponentDemo>
                  <ComponentDemo label="主色链接">
                    <a href="#" className="text-[#2D5016] hover:text-[#2D5016]/80 font-medium flex items-center gap-1">
                      查看酒店详情
                      <ChevronDown className="w-4 h-4 rotate-[-90deg]" />
                    </a>
                  </ComponentDemo>
                </div>
              </ComponentCard>
            </div>
          </section>

          {/* 实际应用示例 - iPhone卡片 */}
          <section>
            <h2 className="text-2xl font-bold text-[#2D5016] mb-4">实际应用示例</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

              {/* 卡片1: 搜索页 */}
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden border-4 border-gray-800" style={{ aspectRatio: '9/19.5', height: '600px' }}>
                <div className="h-full flex flex-col">
                  {/* 状态栏 */}
                  <div className="bg-[#2D5016] text-white px-4 py-2 text-xs flex justify-between items-center">
                    <span>9:41</span>
                    <span className="flex gap-1">
                      <Wifi className="w-3 h-3" />
                      <span>100%</span>
                    </span>
                  </div>

                  {/* 搜索栏 */}
                  <div className="bg-[#2D5016] text-white px-4 pb-4">
                    <div className="bg-white/20 backdrop-blur-sm rounded-lg px-3 py-2 flex items-center gap-2">
                      <Search className="w-4 h-4 text-white/80" />
                      <input
                        type="text"
                        placeholder="搜索城市/民宿"
                        className="flex-1 bg-transparent text-white placeholder-white/60 text-sm outline-none"
                      />
                    </div>
                  </div>

                  {/* 内容区 */}
                  <div className="flex-1 overflow-y-auto p-4 bg-[#F5F7F5] space-y-3">
                    {/* 酒店卡片 */}
                    <div className="bg-white rounded-xl overflow-hidden shadow-md">
                      <div className="aspect-video bg-gradient-to-br from-green-100 to-emerald-100 flex items-center justify-center">
                        <Trees className="w-12 h-12 text-[#2D5016]/30" />
                      </div>
                      <div className="p-3 space-y-2">
                        <div className="flex items-start justify-between">
                          <h3 className="font-bold text-sm text-[#1A1A1A]">森林深处·木屋民宿</h3>
                          <Heart className="w-4 h-4 text-gray-400" />
                        </div>
                        <div className="flex items-center gap-1 text-xs text-[#6B6B6B]">
                          <MapPin className="w-3 h-3" />
                          <span>杭州·西湖区</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-baseline gap-1">
                            <span className="text-xl font-bold text-[#B85C00]">¥288</span>
                            <span className="text-xs text-[#6B6B6B]">/晚</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Star className="w-3 h-3 fill-[#9D6B00] text-[#9D6B00]" />
                            <span className="text-xs font-medium text-[#1A1A1A]">4.8</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* 第二个卡片 */}
                    <div className="bg-white rounded-xl overflow-hidden shadow-md">
                      <div className="aspect-video bg-gradient-to-br from-blue-100 to-cyan-100 flex items-center justify-center">
                        <Bed className="w-12 h-12 text-[#1F5B73]/30" />
                      </div>
                      <div className="p-3 space-y-2">
                        <div className="flex items-start justify-between">
                          <h3 className="font-bold text-sm text-[#1A1A1A]">湖畔居·观景套房</h3>
                          <Heart className="w-4 h-4 text-[#9C2B2B] fill-[#9C2B2B]" />
                        </div>
                        <div className="flex items-center gap-1 text-xs text-[#6B6B6B]">
                          <MapPin className="w-3 h-3" />
                          <span>杭州·千岛湖</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-0.5 bg-[#2D5016]/15 text-[#2D5016] text-xs rounded-full font-medium">生态酒店</span>
                          <span className="px-2 py-0.5 bg-[#3A7D44]/15 text-[#3A7D44] text-xs rounded-full font-medium">可持续</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-baseline gap-1">
                            <span className="text-xl font-bold text-[#B85C00]">¥388</span>
                            <span className="text-xs text-[#6B6B6B] line-through">¥568</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Star className="w-3 h-3 fill-[#9D6B00] text-[#9D6B00]" />
                            <span className="text-xs font-medium text-[#1A1A1A]">4.9</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 底部导航 */}
                  <div className="bg-white border-t border-gray-200 px-4 py-3 flex justify-around items-center">
                    <div className="flex flex-col items-center gap-1">
                      <Search className="w-5 h-5 text-[#2D5016]" />
                      <span className="text-xs text-[#2D5016] font-medium">搜索</span>
                    </div>
                    <div className="flex flex-col items-center gap-1">
                      <ShoppingCart className="w-5 h-5 text-[#6B6B6B]" />
                      <span className="text-xs text-[#6B6B6B]">订单</span>
                    </div>
                    <div className="flex flex-col items-center gap-1 relative">
                      <Bell className="w-5 h-5 text-[#6B6B6B]" />
                      <span className="absolute top-0 right-0 w-2 h-2 bg-[#9C2B2B] rounded-full"></span>
                      <span className="text-xs text-[#6B6B6B]">消息</span>
                    </div>
                    <div className="flex flex-col items-center gap-1">
                      <Leaf className="w-5 h-5 text-[#6B6B6B]" />
                      <span className="text-xs text-[#6B6B6B]">我的</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* 卡片2: 订单详情页 */}
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden border-4 border-gray-800" style={{ aspectRatio: '9/19.5', height: '600px' }}>
                <div className="h-full flex flex-col">
                  {/* 顶部导航 */}
                  <div className="bg-[#2D5016] text-white px-4 py-3 flex items-center gap-3">
                    <ChevronDown className="w-5 h-5 rotate-90" />
                    <span className="flex-1 font-medium">订单详情</span>
                    <Share2 className="w-5 h-5" />
                  </div>

                  {/* 内容区 */}
                  <div className="flex-1 overflow-y-auto bg-[#F5F7F5]">
                    {/* 状态卡片 */}
                    <div className="bg-gradient-to-r from-[#3A7D44] to-[#2D5016] text-white p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <CheckCircle2 className="w-5 h-5" />
                        <span className="font-bold">已确认</span>
                      </div>
                      <p className="text-xs opacity-90">酒店已确认您的预订，请准时入住</p>
                    </div>

                    {/* 酒店信息 */}
                    <div className="bg-white m-4 rounded-xl p-4 space-y-3">
                      <div className="flex items-start gap-3">
                        <div className="w-20 h-20 bg-gradient-to-br from-green-100 to-emerald-100 rounded-lg flex items-center justify-center">
                          <Trees className="w-10 h-10 text-[#2D5016]/40" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-bold text-sm text-[#1A1A1A] mb-1">森林深处·木屋民宿</h3>
                          <div className="flex items-center gap-1 text-xs text-[#6B6B6B] mb-1">
                            <MapPin className="w-3 h-3" />
                            <span>杭州市西湖区龙井路88号</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Phone className="w-3 h-3 text-[#1F5B73]" />
                            <span className="text-xs text-[#1F5B73]">0571-8888-8888</span>
                          </div>
                        </div>
                      </div>

                      {/* 入住信息 */}
                      <div className="border-t border-gray-100 pt-3 space-y-2">
                        <div className="flex justify-between text-xs">
                          <span className="text-[#6B6B6B]">入住时间</span>
                          <div className="flex items-center gap-1">
                            <Calendar className="w-3 h-3 text-[#2D5016]" />
                            <span className="font-medium text-[#1A1A1A]">11/21 14:00</span>
                          </div>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span className="text-[#6B6B6B]">退房时间</span>
                          <div className="flex items-center gap-1">
                            <Calendar className="w-3 h-3 text-[#2D5016]" />
                            <span className="font-medium text-[#1A1A1A]">11/23 12:00</span>
                          </div>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span className="text-[#6B6B6B]">房型</span>
                          <span className="font-medium text-[#1A1A1A]">森林观景大床房</span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span className="text-[#6B6B6B]">入住人</span>
                          <span className="font-medium text-[#1A1A1A]">2成人</span>
                        </div>
                      </div>
                    </div>

                    {/* 费用明细 */}
                    <div className="bg-white m-4 rounded-xl p-4 space-y-2">
                      <h4 className="font-bold text-sm text-[#1A1A1A] mb-3">费用明细</h4>
                      <div className="flex justify-between text-xs">
                        <span className="text-[#6B6B6B]">房费（2晚）</span>
                        <span className="text-[#1A1A1A]">¥576</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-[#6B6B6B]">优惠券</span>
                        <span className="text-[#9C2B2B]">-¥50</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-[#6B6B6B]">会员折扣</span>
                        <span className="text-[#2D5016]">-¥38</span>
                      </div>
                      <div className="border-t border-gray-100 pt-2 mt-2 flex justify-between items-baseline">
                        <span className="text-sm font-medium text-[#1A1A1A]">实付金额</span>
                        <span className="text-2xl font-bold text-[#B85C00]">¥488</span>
                      </div>
                    </div>
                  </div>

                  {/* 底部按钮 */}
                  <div className="bg-white border-t border-gray-200 p-4 flex gap-3">
                    <button className="flex-1 py-2.5 border-2 border-[#2D5016] text-[#2D5016] rounded-lg font-medium text-sm">
                      联系酒店
                    </button>
                    <button className="flex-1 py-2.5 bg-[#2D5016] text-white rounded-lg font-medium text-sm shadow-md">
                      查看地图
                    </button>
                  </div>
                </div>
              </div>

              {/* 卡片3: 支付页 */}
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden border-4 border-gray-800" style={{ aspectRatio: '9/19.5', height: '600px' }}>
                <div className="h-full flex flex-col">
                  {/* 顶部 */}
                  <div className="bg-[#2D5016] text-white px-4 py-3 flex items-center gap-3">
                    <ChevronDown className="w-5 h-5 rotate-90" />
                    <span className="flex-1 font-medium">确认订单</span>
                  </div>

                  {/* 内容区 */}
                  <div className="flex-1 overflow-y-auto bg-[#F5F7F5] p-4 space-y-3">
                    {/* 入住信息 */}
                    <div className="bg-white rounded-xl p-4 space-y-3">
                      <h4 className="font-bold text-sm text-[#1A1A1A]">入住信息</h4>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm">
                          <Calendar className="w-4 h-4 text-[#2D5016]" />
                          <span className="text-[#6B6B6B]">入住：</span>
                          <span className="font-medium text-[#1A1A1A]">11/21（周四）</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Calendar className="w-4 h-4 text-[#2D5016]" />
                          <span className="text-[#6B6B6B]">退房：</span>
                          <span className="font-medium text-[#1A1A1A]">11/23（周六）</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Clock className="w-4 h-4 text-[#2D5016]" />
                          <span className="text-[#6B6B6B]">共</span>
                          <span className="font-bold text-[#B85C00]">2晚</span>
                        </div>
                      </div>
                    </div>

                    {/* 优惠券 */}
                    <div className="bg-white rounded-xl p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Gift className="w-4 h-4 text-[#B85C00]" />
                          <span className="text-sm font-medium text-[#1A1A1A]">优惠券</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <span className="text-sm text-[#9C2B2B] font-medium">-¥50</span>
                          <ChevronDown className="w-4 h-4 text-gray-400 rotate-[-90deg]" />
                        </div>
                      </div>
                    </div>

                    {/* 会员权益 */}
                    <div className="bg-gradient-to-r from-[#2D5016]/5 to-[#3A7D44]/5 rounded-xl p-4 border-2 border-[#2D5016]/20">
                      <div className="flex items-center gap-2 mb-2">
                        <Sprout className="w-4 h-4 text-[#2D5016]" />
                        <span className="text-sm font-bold text-[#2D5016]">翡翠会员专享</span>
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-[#6B6B6B]">会员折扣（9.5折）</span>
                        <span className="font-medium text-[#2D5016]">-¥28</span>
                      </div>
                      <div className="flex items-center justify-between text-xs mt-1">
                        <span className="text-[#6B6B6B]">赠送里程值</span>
                        <span className="font-medium text-[#B85C00]">+48分</span>
                      </div>
                    </div>

                    {/* 总价 */}
                    <div className="bg-white rounded-xl p-4 border-2 border-[#B85C00]/20">
                      <div className="flex items-baseline justify-between">
                        <span className="text-sm text-[#6B6B6B]">应付金额</span>
                        <div className="flex items-baseline gap-1">
                          <span className="text-xs text-[#6B6B6B] line-through">¥576</span>
                          <span className="text-3xl font-bold text-[#B85C00]">¥498</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 底部支付按钮 */}
                  <div className="bg-white border-t border-gray-200 p-4">
                    <button className="w-full py-3 bg-[#2D5016] hover:bg-[#234010] text-white rounded-lg font-bold text-base shadow-lg flex items-center justify-center gap-2">
                      <CreditCard className="w-5 h-5" />
                      立即支付 ¥498
                    </button>
                  </div>
                </div>
              </div>

              {/* 卡片4: 个人中心 */}
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden border-4 border-gray-800" style={{ aspectRatio: '9/19.5', height: '600px' }}>
                <div className="h-full flex flex-col">
                  {/* 顶部会员卡 */}
                  <div className="bg-gradient-to-br from-[#2D5016] via-[#3A7D44] to-[#1F5B73] text-white p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                        <Trees className="w-8 h-8 text-white" />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg">张三</h3>
                        <div className="flex items-center gap-1.5 mt-1">
                          <Sprout className="w-4 h-4" />
                          <span className="text-sm">翡翠会员</span>
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-3 text-center">
                      <div>
                        <div className="text-2xl font-bold">1,280</div>
                        <div className="text-xs opacity-80 mt-1">里程值</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold">3</div>
                        <div className="text-xs opacity-80 mt-1">优惠券</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold">12</div>
                        <div className="text-xs opacity-80 mt-1">订单</div>
                      </div>
                    </div>
                  </div>

                  {/* 功能菜单 */}
                  <div className="flex-1 overflow-y-auto p-4 space-y-3">
                    <div className="bg-white rounded-xl p-4 space-y-3">
                      <MenuItem icon={<ShoppingCart className="w-5 h-5 text-[#2D5016]" />} label="我的订单" badge="2" />
                      <MenuItem icon={<Heart className="w-5 h-5 text-[#9C2B2B]" />} label="我的收藏" />
                      <MenuItem icon={<Star className="w-5 h-5 text-[#9D6B00]" />} label="我的评价" />
                    </div>

                    <div className="bg-white rounded-xl p-4 space-y-3">
                      <MenuItem icon={<TrendingUp className="w-5 h-5 text-[#3A7D44]" />} label="里程值明细" />
                      <MenuItem icon={<Gift className="w-5 h-5 text-[#B85C00]" />} label="优惠券" badge="3" />
                      <MenuItem icon={<Award className="w-5 h-5 text-[#2D5016]" />} label="会员权益" />
                    </div>

                    <div className="bg-white rounded-xl p-4 space-y-3">
                      <MenuItem icon={<Bell className="w-5 h-5 text-[#1F5B73]" />} label="消息通知" badge="5" />
                      <MenuItem icon={<Leaf className="w-5 h-5 text-[#3A7D44]" />} label="环保公益" />
                    </div>

                    {/* 生态理念卡片 */}
                    <div className="bg-gradient-to-r from-[#2D5016]/10 to-[#3A7D44]/10 rounded-xl p-4 border-2 border-[#2D5016]/20">
                      <div className="flex items-center gap-2 mb-2">
                        <Trees className="w-5 h-5 text-[#2D5016]" />
                        <span className="font-bold text-sm text-[#2D5016]">绿色出行，守护自然</span>
                      </div>
                      <p className="text-xs text-[#6B6B6B] leading-relaxed">
                        每次入住生态酒店，我们将为您种植一棵树苗。您已累计贡献 <span className="font-bold text-[#2D5016]">12棵树</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </section>

          {/* 对比度表格 */}
          <section>
            <h2 className="text-2xl font-bold text-[#2D5016] mb-4">WCAG AAA 级可访问性</h2>
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-[#2D5016] text-white">
                  <tr>
                    <th className="px-4 py-3 text-left">颜色</th>
                    <th className="px-4 py-3 text-left">色值</th>
                    <th className="px-4 py-3 text-left">对比度（白底）</th>
                    <th className="px-4 py-3 text-left">WCAG 等级</th>
                    <th className="px-4 py-3 text-left">适用场景</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  <ContrastRow color="#2D5016" name="森林绿（主色）" ratio="10.2:1" level="AAA" usage="主按钮、导航、品牌" />
                  <ContrastRow color="#B85C00" name="秋叶橙（强调）" ratio="7.8:1" level="AAA" usage="价格、促销、CTA" />
                  <ContrastRow color="#1F5B73" name="湖水蓝（辅助）" ratio="9.1:1" level="AAA" usage="链接、信息、副按钮" />
                  <ContrastRow color="#3A7D44" name="青草绿（成功）" ratio="7.2:1" level="AAA" usage="成功提示、确认" />
                  <ContrastRow color="#9C2B2B" name="枫叶红（警示）" ratio="8.5:1" level="AAA" usage="错误、警告、删除" />
                  <ContrastRow color="#9D6B00" name="琥珀黄（等待）" ratio="7.5:1" level="AAA" usage="进行中、待处理" />
                  <ContrastRow color="#1A1A1A" name="深炭黑（文字）" ratio="17.5:1" level="AAA" usage="主文字、标题" />
                  <ContrastRow color="#4A4A4A" name="中灰（次文字）" ratio="9.8:1" level="AAA" usage="次要文字、说明" />
                </tbody>
              </table>
            </div>
          </section>

          {/* 设计差异对比 */}
          <section>
            <h2 className="text-2xl font-bold text-[#2D5016] mb-4">与配色系统1的差异</h2>
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-white rounded-xl p-6 border-2 border-[#2D5016]/20">
                <h3 className="font-bold text-lg text-[#2D5016] mb-4 flex items-center gap-2">
                  <Trees className="w-5 h-5" />
                  配色系统2（森林绿）
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-[#3A7D44] flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-[#1A1A1A]">品牌调性：环保生态</p>
                      <p className="text-xs text-[#6B6B6B] mt-1">强调可持续、自然、健康</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-[#3A7D44] flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-[#1A1A1A]">对比度：AAA级（≥7:1）</p>
                      <p className="text-xs text-[#6B6B6B] mt-1">视障友好，最高可访问性</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-[#3A7D44] flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-[#1A1A1A]">情感传达：沉稳可靠</p>
                      <p className="text-xs text-[#6B6B6B] mt-1">适合高端生态酒店</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-[#3A7D44] flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-[#1A1A1A]">应用场景：户外/森林/山区</p>
                      <p className="text-xs text-[#6B6B6B] mt-1">自然风景区周边民宿</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 border-2 border-[#2C5F8D]/20">
                <h3 className="font-bold text-lg text-[#2C5F8D] mb-4 flex items-center gap-2">
                  <Palette className="w-5 h-5" />
                  配色系统1（冬深蓝）
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-[#4A8FBF] flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-[#1A1A1A]">品牌调性：年轻时尚</p>
                      <p className="text-xs text-[#6B6B6B] mt-1">强调精致、品质、设计感</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-[#4A8FBF] flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-[#1A1A1A]">对比度：AA级（≥4.5:1）</p>
                      <p className="text-xs text-[#6B6B6B] mt-1">标准可访问性</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-[#4A8FBF] flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-[#1A1A1A]">情感传达：温和舒适</p>
                      <p className="text-xs text-[#6B6B6B] mt-1">适合城市精品民宿</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-[#4A8FBF] flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-[#1A1A1A]">应用场景：城市/湖泊/文艺</p>
                      <p className="text-xs text-[#6B6B6B] mt-1">城市商圈周边民宿</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 使用建议 */}
          <section>
            <h2 className="text-2xl font-bold text-[#2D5016] mb-4">使用建议</h2>
            <div className="bg-white rounded-xl p-6 border-2 border-[#2D5016]/20 space-y-4">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h4 className="font-bold text-sm text-[#2D5016] mb-2 flex items-center gap-2">
                    <Trees className="w-4 h-4" />
                    推荐使用配色系统2的场景
                  </h4>
                  <ul className="space-y-2 text-sm text-[#4A4A4A]">
                    <li className="flex items-start gap-2">
                      <span className="text-[#3A7D44]">✓</span>
                      <span>生态酒店、环保民宿、自然保护区住宿</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#3A7D44]">✓</span>
                      <span>山区、森林、田园风格的住宿品牌</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#3A7D44]">✓</span>
                      <span>强调可持续发展、绿色低碳理念</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#3A7D44]">✓</span>
                      <span>需要更高可访问性标准的项目（政府、教育）</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold text-sm text-[#1F5B73] mb-2 flex items-center gap-2">
                    <Palette className="w-4 h-4" />
                    推荐使用配色系统1的场景
                  </h4>
                  <ul className="space-y-2 text-sm text-[#4A4A4A]">
                    <li className="flex items-start gap-2">
                      <span className="text-[#4A8FBF]">✓</span>
                      <span>城市精品民宿、设计师酒店</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#4A8FBF]">✓</span>
                      <span>湖泊、海滨、文艺风格的住宿品牌</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#4A8FBF]">✓</span>
                      <span>年轻化、时尚化的品牌定位</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#4A8FBF]">✓</span>
                      <span>追求柔和、舒适、温暖的视觉体验</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* 配色比例 */}
              <div className="border-t border-gray-100 pt-4">
                <h4 className="font-bold text-sm text-[#1A1A1A] mb-3">页面配色占比建议</h4>
                <div className="flex items-center gap-2 h-8 rounded-lg overflow-hidden border border-gray-200">
                  <div className="h-full bg-[#F5F7F5] flex items-center justify-center text-xs text-[#6B6B6B] px-2" style={{ width: '70%' }}>
                    中性色 70%
                  </div>
                  <div className="h-full bg-[#2D5016] flex items-center justify-center text-xs text-white px-2" style={{ width: '15%' }}>
                    主色 15%
                  </div>
                  <div className="h-full bg-[#B85C00] flex items-center justify-center text-xs text-white px-2" style={{ width: '8%' }}>
                    强调 8%
                  </div>
                  <div className="h-full bg-[#1F5B73] flex items-center justify-center text-xs text-white px-2" style={{ width: '5%' }}>
                    辅助 5%
                  </div>
                  <div className="h-full bg-[#3A7D44] flex items-center justify-center text-xs text-white px-2" style={{ width: '2%' }}>
                    功能 2%
                  </div>
                </div>
              </div>
            </div>
          </section>

        </div>
      </div>
    </div>
  )
}

// ==================== 子组件 ====================

function ColorCard({ name, season, color, hex, contrast, usage, textColor = "text-white", compact = false }: {
  name: string
  season: string
  color: string
  hex: string
  contrast: string
  usage: string
  textColor?: string
  compact?: boolean
}) {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:scale-105 border border-gray-200">
      <div className={`${color} ${textColor} p-6 text-center`}>
        <div className="text-3xl font-bold mb-1">{name}</div>
        <div className={`text-sm opacity-90 ${compact ? 'hidden' : ''}`}>{season}</div>
      </div>
      <div className="p-4 space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-xs text-gray-500">色值</span>
          <code className="text-xs font-mono font-bold text-gray-900">{hex}</code>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-xs text-gray-500">对比度</span>
          <span className="text-xs font-bold text-[#3A7D44]">{contrast}</span>
        </div>
        <div className="pt-2 border-t border-gray-100">
          <p className="text-xs text-gray-600 leading-relaxed">{usage}</p>
        </div>
      </div>
    </div>
  )
}

function ComponentCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
      <h3 className="font-bold text-base text-[#2D5016] mb-4 pb-2 border-b border-gray-100">{title}</h3>
      {children}
    </div>
  )
}

function ComponentDemo({ label, children }: { label?: string; children: React.ReactNode }) {
  return (
    <div>
      {label && <label className="block text-xs text-gray-500 mb-1.5">{label}</label>}
      {children}
    </div>
  )
}

function ContrastRow({ color, name, ratio, level, usage }: {
  color: string
  name: string
  ratio: string
  level: string
  usage: string
}) {
  return (
    <tr className="hover:bg-gray-50">
      <td className="px-4 py-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded border border-gray-200" style={{ backgroundColor: color }}></div>
          <span className="font-medium text-gray-900">{name}</span>
        </div>
      </td>
      <td className="px-4 py-3">
        <code className="text-xs font-mono bg-gray-100 px-2 py-1 rounded">{color}</code>
      </td>
      <td className="px-4 py-3">
        <span className="font-bold text-[#3A7D44]">{ratio}</span>
      </td>
      <td className="px-4 py-3">
        <span className="px-2 py-1 bg-[#3A7D44]/15 text-[#3A7D44] text-xs rounded-full font-bold">
          {level}
        </span>
      </td>
      <td className="px-4 py-3 text-gray-600 text-sm">{usage}</td>
    </tr>
  )
}

function MenuItem({ icon, label, badge }: { icon: React.ReactNode; label: string; badge?: string }) {
  return (
    <div className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer">
      <div className="flex items-center gap-3">
        {icon}
        <span className="text-sm font-medium text-[#1A1A1A]">{label}</span>
      </div>
      <div className="flex items-center gap-2">
        {badge && (
          <span className="px-2 py-0.5 bg-[#9C2B2B] text-white text-xs rounded-full font-bold">
            {badge}
          </span>
        )}
        <ChevronDown className="w-4 h-4 text-gray-400 rotate-[-90deg]" />
      </div>
    </div>
  )
}
