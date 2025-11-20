/**
 * 配色系统页面 - 全局设计规范
 * 展示小而美 Home Stay 的完整配色系统
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
  Share2, Check, Bell, ShoppingCart
} from 'lucide-react'
import { useViewMode } from '~/contexts/ViewModeContext'

export default function ColorSystemPage() {
  const { isSidebarCollapsed } = useViewMode()

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar menuItems={menuConfig} />
      <div className="flex-1 overflow-y-auto bg-gray-50 transition-all duration-300">
        <div className="max-w-7xl mx-auto p-8 space-y-6">
          {/* 页面标题 */}
          <header className="text-center space-y-2">
            <h1 className="text-4xl font-bold text-gray-900 flex items-center justify-center gap-3">
              <Palette className="w-10 h-10 text-[#2C5F8D]" />
              小而美 Home Stay 配色系统
            </h1>
            <p className="text-base text-gray-500">Version 1.0 | 全局设计规范</p>
          </header>

          {/* 设计理念 */}


          <section>


            <h2 className="text-2xl font-bold text-[#2C5F8D] mb-3">设计理念</h2>


            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-50 via-purple-50 to-orange-50 border border-gray-200">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#2C5F8D]/5 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#C67A28]/5 rounded-full blur-3xl"></div>
            <div className="relative px-6 py-5">
              <div className="max-w-4xl">
                <p className="text-sm text-gray-700 leading-relaxed text-left mb-2.5">
                  小而美 Home Stay — 精选独特民宿，轻松愉悦出行，融入自然美景。
                </p>
                <p className="text-sm text-gray-700 leading-relaxed text-left">
                  "从春日晨雾到冬日星空，四季流转中沉淀的温柔配色。深蓝如夜空般沉静可靠，深橙如落日般温暖明快，湖蓝如晴空般清新舒展。" — 这是属于旅人的诗意，也是归家的安心。
                </p>
              </div>
            </div>
          </div>
          </section>

          {/* 色彩系统 */}
          <section>
            <h2 className="text-2xl font-bold text-[#2C5F8D] mb-3">色彩系统</h2>

            {/* 主色系统 */}
            <h3 className="text-lg font-semibold text-gray-700 mb-3">主色系统</h3>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
              <ColorCard name="晨雾" season="春" color="#F8F6F3" hex="#F8F6F3" contrast="-" usage="背景色、卡片底色" textColor="text-gray-900" />
              <ColorCard name="湖水" season="夏" color="#4A8FBF" hex="#4A8FBF" contrast="5.2:1" usage="链接、交互元素" />
              <ColorCard name="落日" season="秋" color="#C67A28" hex="#C67A28" contrast="6.8:1" usage="价格、促销标签" />
              <ColorCard name="星空" season="冬" color="#2C5F8D" hex="#2C5F8D" contrast="7.8:1" usage="主按钮、品牌色" />
            </div>

            {/* 功能色 + 中性色 */}
            <h3 className="text-lg font-semibold text-gray-700 mb-3 mt-6">功能色 & 中性色</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
              <ColorCard name="森林" color="#5A8A65" hex="#5A8A65" contrast="6.2:1" usage="成功状态" compact />
              <ColorCard name="枫叶" color="#B94D3D" hex="#B94D3D" contrast="7.1:1" usage="错误、警示" compact />
              <ColorCard name="主文字" color="#2A2A2A" hex="#2A2A2A" contrast="15.8:1" usage="标题、正文" compact />
              <ColorCard name="次文字" color="#6B6B6B" hex="#6B6B6B" contrast="5.7:1" usage="辅助说明" compact />
              <ColorCard name="占位符" color="#999999" hex="#999999" contrast="4.2:1" usage="占位符" compact />
            </div>
          </section>

          {/* 组件示例 - iPhone 高保真原型 */}
          <section>
            <h2 className="text-2xl font-bold text-[#2C5F8D] mb-4">组件示例</h2>

            <div className="grid lg:grid-cols-3 gap-6">
              {/* 按钮组件 - 主按钮 & 辅助按钮 */}
              <ComponentCard title="主按钮 & 辅助按钮" description="主要操作使用深蓝/深橙">
                  <ComponentDemo label="主按钮 36px">
                    <button className="h-9 px-3 text-sm font-medium text-white bg-[#2C5F8D] rounded-xl shadow-md">立即预订</button>
                    <button className="h-9 px-3 text-sm font-medium text-white bg-[#C67A28] rounded-xl shadow-md">立即支付</button>
                  </ComponentDemo>
                  <ComponentDemo label="辅助按钮">
                    <button className="h-9 px-3 text-sm font-medium text-white bg-[#B94D3D] rounded-xl shadow-md">删除订单</button>
                    <button className="h-9 px-3 text-sm font-medium text-white bg-[#2C5F8D]/60 rounded-xl cursor-not-allowed">
                      <Loader2 className="w-4 h-4 stroke-[1.5] inline mr-1 animate-spin" />提交中
                    </button>
                  </ComponentDemo>
                </ComponentCard>

              {/* 按钮组件 - 空心 & 小按钮 */}
              <ComponentCard title="空心 & 小按钮" description="次要操作和状态展示">
                  <ComponentDemo label="描边按钮">
                    <button className="h-9 px-3 text-sm font-medium text-[#2C5F8D] border-2 border-[#2C5F8D] rounded-xl">查看详情</button>
                    <button className="h-9 px-3 text-sm font-medium text-[#B94D3D] border-2 border-[#B94D3D] rounded-xl">取消预订</button>
                  </ComponentDemo>
                  <ComponentDemo label="小按钮 28px">
                    <button className="h-7 px-2.5 text-xs font-medium text-white bg-[#2C5F8D] rounded-xl shadow-sm">选择</button>
                    <button className="h-7 px-2.5 text-xs font-medium text-gray-400 bg-gray-100 rounded-xl cursor-not-allowed">已售罄</button>
                  </ComponentDemo>
                </ComponentCard>

              {/* 按钮组件 - 圆形 & 异形按钮 */}
              <ComponentCard title="圆形 & 异形按钮" description="图标操作和特殊交互">
                  <ComponentDemo label="圆形图标按钮">
                    <button className="w-10 h-10 rounded-full bg-[#2C5F8D] text-white flex items-center justify-center shadow-md">
                      <Search className="w-4 h-4 stroke-[1.5]" />
                    </button>
                    <button className="w-10 h-10 rounded-full border-2 border-gray-300 text-gray-600 flex items-center justify-center">
                      <Bell className="w-4 h-4 stroke-[1.5]" />
                    </button>
                    <button className="w-10 h-10 rounded-full bg-[#C67A28] text-white flex items-center justify-center shadow-md">
                      <ShoppingCart className="w-4 h-4 stroke-[1.5]" />
                    </button>
                  </ComponentDemo>
                  <ComponentDemo label="图标组合按钮">
                    <button className="h-9 px-3 text-sm font-medium text-white bg-[#2C5F8D] rounded-xl shadow-md flex items-center gap-1.5">
                      <Heart className="w-4 h-4 stroke-[1.5]" />收藏
                    </button>
                    <button className="h-9 px-3 text-sm font-medium text-[#2C5F8D] border-2 border-[#2C5F8D] rounded-xl flex items-center gap-1.5">
                      <Share2 className="w-4 h-4 stroke-[1.5]" />分享
                    </button>
                  </ComponentDemo>
                </ComponentCard>

              {/* 标签组件 - 促销 & 订单状态 */}
              <ComponentCard title="促销 & 订单状态" description="促销活动和订单进度">
                  <ComponentDemo label="促销标签">
                    <span className="inline-flex items-center h-6 px-2 text-xs font-bold text-white bg-[#B94D3D] rounded shadow-md leading-none">限时特惠</span>
                    <span className="inline-flex items-center h-6 px-2 text-xs font-bold text-white bg-[#C67A28] rounded shadow-md leading-none">首单立减</span>
                    <span className="inline-flex items-center h-5 px-1.5 text-xs font-bold text-white bg-[#B94D3D] rounded shadow-sm leading-none">省¥180</span>
                  </ComponentDemo>
                  <ComponentDemo label="订单状态">
                    <span className="inline-flex items-center h-6 px-2 text-xs font-medium text-[#5A8A65] bg-[#5A8A65]/10 rounded shadow-sm leading-none">
                      <CheckCircle2 className="w-3 h-3 stroke-[1.5] mr-1" />已入住
                    </span>
                    <span className="inline-flex items-center h-6 px-2 text-xs font-medium text-[#4A8FBF] bg-[#4A8FBF]/10 rounded shadow-sm leading-none">待确认</span>
                    <span className="inline-flex items-center h-6 px-2 text-xs font-medium text-[#B94D3D] bg-[#B94D3D]/10 rounded shadow-sm leading-none">已取消</span>
                  </ComponentDemo>
                </ComponentCard>

              {/* 标签组件 - 空心 & 小标签 */}
              <ComponentCard title="空心 & 小标签" description="房源特性和功能标记">
                  <ComponentDemo label="空心标签">
                    <span className="inline-flex items-center h-6 px-2 text-xs text-[#4A8FBF] border border-[#4A8FBF] rounded shadow-sm leading-none">山景</span>
                    <span className="inline-flex items-center h-6 px-2 text-xs text-gray-600 border border-gray-300 rounded shadow-sm leading-none">小院</span>
                  </ComponentDemo>
                  <ComponentDemo label="圆点标记">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-[#5A8A65] shadow-sm"></span>
                      <span className="text-xs text-gray-700">可预订</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-[#B94D3D] shadow-sm"></span>
                      <span className="text-xs text-gray-700">已满房</span>
                    </div>
                  </ComponentDemo>
                </ComponentCard>

              {/* 标签组件 - 徽章 & 特性标签 */}
              <ComponentCard title="徽章 & 特性标签" description="通知徽章和设施标签">
                  <ComponentDemo label="数字徽章">
                    <div className="relative inline-block">
                      <Bell className="w-5 h-5 stroke-[1.5] text-gray-600" />
                      <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#B94D3D] text-[10px] font-bold text-white shadow-md">3</span>
                    </div>
                    <div className="relative inline-block">
                      <ShoppingCart className="w-5 h-5 stroke-[1.5] text-gray-600" />
                      <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#C67A28] text-[10px] font-bold text-white shadow-md">5</span>
                    </div>
                  </ComponentDemo>
                  <ComponentDemo label="特性标签">
                    <span className="inline-flex items-center h-5 px-1.5 text-xs text-[#4A8FBF] bg-[#4A8FBF]/10 rounded shadow-sm leading-none">
                      <Wifi className="w-3 h-3 stroke-[1.5] mr-0.5" />WiFi
                    </span>
                    <span className="inline-flex items-center h-5 px-1.5 text-xs text-[#C67A28] bg-[#C67A28]/10 rounded shadow-sm leading-none">
                      <Utensils className="w-3 h-3 stroke-[1.5] mr-0.5" />早餐
                    </span>
                    <span className="inline-flex items-center h-5 px-1.5 text-xs text-gray-600 bg-[#F8F6F3] rounded shadow-sm leading-none">
                      <Bed className="w-3 h-3 stroke-[1.5] mr-0.5" />双床
                    </span>
                  </ComponentDemo>
                </ComponentCard>

              {/* 输入表单 */}
              <ComponentCard title="输入表单" description="用户输入和信息收集">
                  <ComponentDemo label="标准输入框 36px">
                    <input type="text" placeholder="请输入手机号" className="w-full h-9 px-3 text-sm bg-[#F8F6F3] border-2 border-gray-200 rounded-xl shadow-sm focus:outline-none focus:border-[#2C5F8D] focus:ring-2 focus:ring-[#2C5F8D]/20" />
                  </ComponentDemo>
                  <ComponentDemo label="搜索框">
                    <div className="relative">
                      <input type="text" placeholder="搜索房源" className="w-full h-9 pl-9 pr-3 text-sm bg-[#F8F6F3] border-2 border-gray-200 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-[#2C5F8D]/20 focus:border-[#2C5F8D]" />
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 stroke-[1.5] text-gray-400" />
                    </div>
                  </ComponentDemo>
                  <ComponentDemo label="带按钮组合">
                    <div className="flex gap-2">
                      <input type="text" placeholder="手机号" className="flex-1 h-9 px-3 text-sm bg-[#F8F6F3] border-2 border-gray-200 rounded-xl shadow-sm focus:outline-none focus:border-[#2C5F8D] focus:ring-2 focus:ring-[#2C5F8D]/20" />
                      <button className="h-9 px-3 text-sm font-medium text-white bg-[#2C5F8D] rounded-xl shadow-md whitespace-nowrap">获取验证码</button>
                    </div>
                  </ComponentDemo>
                </ComponentCard>

              {/* 选择器 - 下拉选择 */}
              <ComponentCard title="下拉选择" description="单选多选和日期选择">
                  <ComponentDemo label="下拉选择">
                    <div className="relative">
                      <select className="w-full h-9 pl-4 pr-10 text-sm bg-white border-2 border-gray-200 rounded-xl shadow-sm appearance-none focus:outline-none focus:ring-2 focus:ring-[#2C5F8D]/20 focus:border-[#2C5F8D] cursor-pointer">
                        <option>请选择房型</option>
                        <option>标准双床房</option>
                        <option>豪华大床房</option>
                        <option>家庭套房</option>
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 stroke-[1.5] text-gray-400 pointer-events-none" />
                    </div>
                  </ComponentDemo>
                  <ComponentDemo label="日期选择">
                    <div className="relative">
                      <input type="text" placeholder="选择日期" className="w-full h-9 pl-3 pr-9 text-sm bg-[#F8F6F3] border-2 border-gray-200 rounded-xl shadow-sm focus:outline-none focus:border-[#2C5F8D] focus:ring-2 focus:ring-[#2C5F8D]/20" />
                      <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 stroke-[1.5] text-gray-400" />
                    </div>
                  </ComponentDemo>
                </ComponentCard>

              {/* 选择器 - 复选框 */}
              <ComponentCard title="复选框" description="多项选择和开关状态">
                  <ComponentDemo label="复选框">
                    <label className="flex items-center gap-2.5 text-sm text-gray-700 cursor-pointer group">
                      <div className="relative">
                        <input type="checkbox" className="peer w-5 h-5 text-[#2C5F8D] border-2 border-gray-300 rounded focus:ring-2 focus:ring-[#2C5F8D]/20 cursor-pointer" defaultChecked />
                        <Check className="absolute inset-0 w-5 h-5 stroke-[1.5] text-white opacity-0 peer-checked:opacity-100 pointer-events-none" />
                      </div>
                      <span>含早餐</span>
                    </label>
                    <label className="flex items-center gap-2.5 text-sm text-gray-700 cursor-pointer group">
                      <div className="relative">
                        <input type="checkbox" className="peer w-5 h-5 text-[#2C5F8D] border-2 border-gray-300 rounded focus:ring-2 focus:ring-[#2C5F8D]/20 cursor-pointer" />
                        <Check className="absolute inset-0 w-5 h-5 stroke-[1.5] text-white opacity-0 peer-checked:opacity-100 pointer-events-none" />
                      </div>
                      <span>加床服务</span>
                    </label>
                  </ComponentDemo>
                </ComponentCard>

              {/* 选择器 - 单选框 */}
              <ComponentCard title="单选框" description="单项选择和开关控制">
                  <ComponentDemo label="单选框">
                    <label className="flex items-center gap-2.5 text-sm text-gray-700 cursor-pointer">
                      <input type="radio" name="bed" className="w-5 h-5 text-[#2C5F8D] border-2 border-gray-300 focus:ring-2 focus:ring-[#2C5F8D]/20 cursor-pointer" defaultChecked />
                      <span>大床</span>
                    </label>
                    <label className="flex items-center gap-2.5 text-sm text-gray-700 cursor-pointer">
                      <input type="radio" name="bed" className="w-5 h-5 text-[#2C5F8D] border-2 border-gray-300 focus:ring-2 focus:ring-[#2C5F8D]/20 cursor-pointer" />
                      <span>双床</span>
                    </label>
                  </ComponentDemo>
                  <ComponentDemo label="开关">
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-[#2C5F8D]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:border-gray-300 after:rounded-full after:h-5 after:w-5 after:transition-all after:shadow-md peer-checked:bg-[#2C5F8D] shadow-sm"></div>
                      <span className="ml-3 text-sm text-gray-700">接收通知</span>
                    </label>
                  </ComponentDemo>
                </ComponentCard>

              {/* 选择器 - Tab标签页 */}
              <ComponentCard title="Tab标签页" description="页面切换和分类过滤">
                  <ComponentDemo label="下划线Tab">
                    <div className="flex border-b-2 border-gray-200">
                      <button className="px-3 py-2 text-sm font-medium text-[#2C5F8D] border-b-2 border-[#2C5F8D] -mb-[2px]">全部</button>
                      <button className="px-3 py-2 text-sm text-gray-600">待支付</button>
                      <button className="px-3 py-2 text-sm text-gray-600">待入住</button>
                    </div>
                  </ComponentDemo>
                  <ComponentDemo label="胶囊Tab">
                    <div className="flex gap-2">
                      <button className="h-7 px-3 text-xs font-medium text-white bg-[#2C5F8D] rounded-full shadow-sm">全部</button>
                      <button className="h-7 px-3 text-xs text-gray-600 bg-gray-100 rounded-full">民宿</button>
                      <button className="h-7 px-3 text-xs text-gray-600 bg-gray-100 rounded-full">酒店</button>
                    </div>
                  </ComponentDemo>
                </ComponentCard>

              {/* 价格展示 */}
              <ComponentCard title="价格展示" description="价格和金额明细">
                  <ComponentDemo label="主价格">
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-bold text-[#C67A28]">¥388</span>
                      <span className="text-sm text-gray-400 line-through">¥568</span>
                      <span className="inline-flex items-center h-5 px-1.5 text-xs font-bold text-white bg-[#B94D3D] rounded shadow-sm leading-none">省¥180</span>
                    </div>
                  </ComponentDemo>
                  <ComponentDemo label="列表价格">
                    <div className="flex items-baseline gap-1">
                      <span className="text-lg font-semibold text-[#C67A28]">¥199</span>
                      <span className="text-xs text-gray-500">/晚</span>
                    </div>
                  </ComponentDemo>
                  <ComponentDemo label="金额明细">
                    <div className="space-y-1.5">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">房费 × 2晚</span>
                        <span className="text-gray-900 font-medium">¥776</span>
                      </div>
                      <div className="flex justify-between text-sm text-[#5A8A65]">
                        <span>优惠券折扣</span>
                        <span className="font-medium">-¥50</span>
                      </div>
                      <div className="h-px bg-gray-200"></div>
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">合计</span>
                        <span className="text-lg font-bold text-[#C67A28]">¥776</span>
                      </div>
                    </div>
                  </ComponentDemo>
                </ComponentCard>

              {/* 消息通知 */}
              <ComponentCard title="消息通知" description="系统反馈和状态提醒">
                  <div className="flex items-start gap-2 p-2.5 bg-[#5A8A65]/10 border-l-2 border-[#5A8A65] rounded text-sm shadow-sm">
                    <CheckCircle2 className="w-4 h-4 stroke-[1.5] text-[#5A8A65] mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-gray-900">预订成功</p>
                      <p className="text-xs text-gray-600 mt-0.5">订单已确认</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2 p-2.5 bg-[#B94D3D]/10 border-l-2 border-[#B94D3D] rounded text-sm mt-2.5 shadow-sm">
                    <AlertCircle className="w-4 h-4 stroke-[1.5] text-[#B94D3D] mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-gray-900">预订失败</p>
                      <p className="text-xs text-gray-600 mt-0.5">房源已被订</p>
                    </div>
                  </div>
                </ComponentCard>

              {/* 房源卡片 */}
              <ComponentCard title="房源卡片" description="列表展示和信息聚合">
                  <div className="p-3 bg-white border-2 border-gray-200 rounded-xl shadow-lg">
                    <div className="flex gap-2.5">
                      <div className="relative w-20 h-20 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
                        <div className="absolute inset-0 flex items-center justify-center text-xs text-gray-400">图</div>
                        <span className="inline-flex absolute top-1 left-1 h-4 px-1.5 text-xs font-bold text-white bg-[#B94D3D] rounded shadow-sm leading-none">特惠</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-medium text-gray-900 truncate">山间小筑·独立小院</h4>
                        <div className="flex gap-1 mt-1">
                          <span className="inline-flex h-5 px-1.5 text-xs text-[#4A8FBF] bg-[#4A8FBF]/10 rounded shadow-sm leading-none">山景</span>
                          <span className="inline-flex h-5 px-1.5 text-xs text-gray-600 bg-[#F8F6F3] rounded shadow-sm leading-none">小院</span>
                        </div>
                        <div className="flex items-center gap-1 mt-1">
                          <div className="flex text-[#C67A28]">
                            {[1,2,3,4,5].map(i => (
                              <svg key={i} className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                            ))}
                          </div>
                          <span className="text-xs text-gray-600">4.9</span>
                        </div>
                        <div className="flex items-baseline justify-between mt-1">
                          <div className="flex items-baseline gap-1">
                            <span className="text-lg font-bold text-[#C67A28]">¥388</span>
                            <span className="text-xs text-gray-400 line-through">¥568</span>
                          </div>
                          <button className="h-6 px-2.5 text-xs font-medium text-white bg-[#2C5F8D] rounded shadow-md">订</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </ComponentCard>

              {/* 订单卡片 */}
              <ComponentCard title="订单卡片" description="订单详情和操作入口">
                  <div className="p-3 bg-white border-2 border-gray-200 rounded-xl shadow-lg">
                    <div className="flex items-start justify-between mb-2.5">
                      <h4 className="text-sm font-medium text-gray-900">山间小筑</h4>
                      <span className="inline-flex h-5 px-1.5 text-xs font-medium text-[#4A8FBF] bg-[#4A8FBF]/10 rounded shadow-sm leading-none">待入住</span>
                    </div>
                    <div className="space-y-1 text-xs text-gray-600">
                      <div className="flex justify-between">
                        <span>订单号</span>
                        <span className="text-gray-900">...001234</span>
                      </div>
                      <div className="flex justify-between">
                        <span>入住</span>
                        <span className="text-gray-900">01/25-27 · 2晚</span>
                      </div>
                      <div className="flex justify-between">
                        <span>金额</span>
                        <span className="text-base font-semibold text-[#C67A28]">¥776</span>
                      </div>
                    </div>
                    <div className="flex gap-2 mt-2.5 pt-2.5 border-t border-gray-100">
                      <button className="flex-1 h-7 text-xs text-gray-600 border-2 border-gray-300 rounded-xl">联系</button>
                      <button className="flex-1 h-7 text-xs text-white bg-[#2C5F8D] rounded-xl shadow-md">详情</button>
                    </div>
                  </div>
                </ComponentCard>

              {/* 评价组件 */}
              <ComponentCard title="评价组件" description="用户反馈和评分展示">
                  <div className="p-2.5 bg-[#F8F6F3] rounded-xl shadow-sm">
                    <div className="flex items-start gap-2 mb-1.5">
                      <div className="w-7 h-7 bg-gray-300 rounded-full flex-shrink-0"></div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-medium text-gray-900">张**</span>
                          <span className="text-xs text-gray-500">01/15</span>
                        </div>
                        <div className="flex text-[#C67A28] mt-0.5">
                          {[1,2,3,4,5].map(i => (
                            <svg key={i} className="w-2.5 h-2.5" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>
                      </div>
                    </div>
                    <p className="text-xs text-gray-700 leading-relaxed">房间干净，环境好，房东热情。下次还来！</p>
                  </div>
                </ComponentCard>

              {/* 设施特性卡片 */}
              <ComponentCard title="设施特性" description="酒店服务和配套设施">
                  <div className="grid grid-cols-5 gap-2">
                    <div className="flex flex-col items-center p-2 bg-[#2C5F8D]/10 rounded-xl shadow-sm">
                      <Wifi className="w-5 h-5 stroke-[1.5] text-[#2C5F8D] mb-1" />
                      <span className="text-xs text-gray-700">WiFi</span>
                    </div>
                    <div className="flex flex-col items-center p-2 bg-[#2C5F8D]/10 rounded-xl shadow-sm">
                      <Utensils className="w-5 h-5 stroke-[1.5] text-[#2C5F8D] mb-1" />
                      <span className="text-xs text-gray-700">早餐</span>
                    </div>
                    <div className="flex flex-col items-center p-2 bg-[#2C5F8D]/10 rounded-xl shadow-sm">
                      <Wind className="w-5 h-5 stroke-[1.5] text-[#2C5F8D] mb-1" />
                      <span className="text-xs text-gray-700">空调</span>
                    </div>
                    <div className="flex flex-col items-center p-2 bg-[#2C5F8D]/10 rounded-xl shadow-sm">
                      <Tv className="w-5 h-5 stroke-[1.5] text-[#2C5F8D] mb-1" />
                      <span className="text-xs text-gray-700">电视</span>
                    </div>
                    <div className="flex flex-col items-center p-2 bg-[#2C5F8D]/10 rounded-xl shadow-sm">
                      <ParkingCircle className="w-5 h-5 stroke-[1.5] text-[#2C5F8D] mb-1" />
                      <span className="text-xs text-gray-700">停车</span>
                    </div>
                    <div className="flex flex-col items-center p-2 bg-[#2C5F8D]/10 rounded-xl shadow-sm">
                      <Bath className="w-5 h-5 stroke-[1.5] text-[#2C5F8D] mb-1" />
                      <span className="text-xs text-gray-700">浴缸</span>
                    </div>
                    <div className="flex flex-col items-center p-2 bg-[#2C5F8D]/10 rounded-xl shadow-sm">
                      <WashingMachine className="w-5 h-5 stroke-[1.5] text-[#2C5F8D] mb-1" />
                      <span className="text-xs text-gray-700">洗衣</span>
                    </div>
                    <div className="flex flex-col items-center p-2 bg-[#2C5F8D]/10 rounded-xl shadow-sm">
                      <Dumbbell className="w-5 h-5 stroke-[1.5] text-[#2C5F8D] mb-1" />
                      <span className="text-xs text-gray-700">健身</span>
                    </div>
                    <div className="flex flex-col items-center p-2 bg-[#2C5F8D]/10 rounded-xl shadow-sm">
                      <Lock className="w-5 h-5 stroke-[1.5] text-[#2C5F8D] mb-1" />
                      <span className="text-xs text-gray-700">保险柜</span>
                    </div>
                    <div className="flex flex-col items-center p-2 bg-[#2C5F8D]/10 rounded-xl shadow-sm">
                      <BedDouble className="w-5 h-5 stroke-[1.5] text-[#2C5F8D] mb-1" />
                      <span className="text-xs text-gray-700">加床</span>
                    </div>
                  </div>
                  <ComponentDemo label="其他服务">
                    <span className="inline-flex items-center h-5 px-1.5 text-xs text-gray-600 bg-[#F8F6F3] rounded shadow-sm leading-none">
                      <Baby className="w-3 h-3 stroke-[1.5] mr-0.5" />儿童看护
                    </span>
                    <span className="inline-flex items-center h-5 px-1.5 text-xs text-gray-600 bg-[#F8F6F3] rounded shadow-sm leading-none">
                      <Dog className="w-3 h-3 stroke-[1.5] mr-0.5" />宠物友好
                    </span>
                    <span className="inline-flex items-center h-5 px-1.5 text-xs text-gray-600 bg-[#F8F6F3] rounded shadow-sm leading-none">
                      <CarFront className="w-3 h-3 stroke-[1.5] mr-0.5" />接送服务
                    </span>
                    <span className="inline-flex items-center h-5 px-1.5 text-xs text-gray-600 bg-[#F8F6F3] rounded shadow-sm leading-none">
                      <Shirt className="w-3 h-3 stroke-[1.5] mr-0.5" />洗衣服务
                    </span>
                    <span className="inline-flex items-center h-5 px-1.5 text-xs text-gray-600 bg-[#F8F6F3] rounded shadow-sm leading-none">
                      <Shield className="w-3 h-3 stroke-[1.5] mr-0.5" />24h安保
                    </span>
                    <span className="inline-flex items-center h-5 px-1.5 text-xs text-gray-600 bg-[#F8F6F3] rounded shadow-sm leading-none">
                      <Sparkles className="w-3 h-3 stroke-[1.5] mr-0.5" />客房清洁
                    </span>
                  </ComponentDemo>
                </ComponentCard>
            </div>
          </section>

          {/* 页脚 */}
          <footer className="text-center py-6 border-t border-gray-200">
            <p className="text-sm text-gray-600">小而美 Home Stay 设计团队 © 2025</p>
            <p className="text-xs text-gray-400 mt-1">Version 1.0 | 2025-11-20</p>
          </footer>
        </div>
      </div>
    </div>
  )
}

// 颜色卡片组件
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
    <div className="bg-white rounded-lg overflow-hidden border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
      <div className={`${compact ? 'h-20' : 'h-24'} flex items-center justify-center ${textColor} font-semibold gap-2.5`} style={{ backgroundColor: color }}>
        {season && (
          <>
            <div className={compact ? 'text-xl' : 'text-2xl'}>{season}</div>
            <div className={`${compact ? 'text-xs' : 'text-sm'} opacity-50`}>|</div>
          </>
        )}
        <div className={compact ? 'text-base' : 'text-lg'}>{name}</div>
      </div>
      <div className={`${compact ? 'p-2' : 'p-3'} space-y-1`}>
        <div className="flex items-center justify-between text-xs">
          <code className="bg-gray-100 px-1.5 py-0.5 rounded font-mono text-gray-900 text-[10px]">{hex}</code>
          {wcag ? (
            <span className={`text-[10px] font-semibold ${wcag.color}`}>{contrast} {wcag.grade}</span>
          ) : (
            <span className="text-gray-400 text-[10px]">背景色</span>
          )}
        </div>
        <p className="text-[10px] text-gray-600 leading-tight">{usage}</p>
      </div>
    </div>
  )
}

// 组件卡片容器 - iPhone 屏幕比例 (约 19.5:9 ≈ 2:1)
function ComponentCard({ title, description, children }: { title: string; description: string; children: React.ReactNode }) {
  return (
    <Card className="h-[600px] flex flex-col shadow-lg border-gray-300">
      <CardHeader className="pb-2.5 flex-shrink-0 border-b border-gray-100">
        <CardTitle className="text-base font-semibold text-gray-900">{title}</CardTitle>
        <p className="text-xs text-gray-500 mt-1">{description}</p>
      </CardHeader>
      <CardContent className="space-y-2.5 flex-1 overflow-y-auto p-4">
        {children}
      </CardContent>
    </Card>
  )
}

// 组件演示区域
function ComponentDemo({ label, children }: { label?: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      {label && <p className="text-xs text-gray-500 font-medium">{label}</p>}
      <div className="flex gap-2 flex-wrap">{children}</div>
    </div>
  )
}
