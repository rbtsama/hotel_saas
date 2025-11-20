/**
 * 配色系统2页面 - 森林绿主题（备选方案）
 * 展示小而美 Home Stay 的备选配色系统
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
              <Palette className="w-10 h-10 text-[#458559]" />
              小而美 Home Stay 配色系统
            </h1>
            <p className="text-base text-gray-500">Version 1.0 | 全局设计规范</p>
          </header>

          {/* 设计理念 */}


          <section>


            <h2 className="text-2xl font-bold text-[#458559] mb-3">设计理念</h2>


            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-green-50 via-emerald-50 to-orange-50 border border-gray-200">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#458559]/5 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#A67B5B]/5 rounded-full blur-3xl"></div>
            <div className="relative px-6 py-5">
              <div className="max-w-4xl">
                <p className="text-sm text-gray-700 leading-relaxed text-left mb-2.5">
                  小而美 Home Stay — 精选独特民宿，轻松愉悦出行，融入自然美景。
                </p>
                <p className="text-sm text-gray-700 leading-relaxed text-left">
                  "山林间的呼吸，田野上的漫步，冰川下的宁静。森林绿如夏日树荫般清爽宜人，田野色如秋日麦浪般质朴温暖，冰川蓝如冬日湖面般澄澈纯净。" — 这是自然的馈赠，也是心灵的栖息。
                </p>
              </div>
            </div>
          </div>
          </section>

          {/* 色彩系统 */}
          <section>
            <h2 className="text-2xl font-bold text-[#458559] mb-3">色彩系统</h2>

            {/* 主色系统 */}
            <h3 className="text-lg font-semibold text-gray-700 mb-3">主色系统</h3>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
              <ColorCard name="沙滩" season="春" color="#F8F6F3" hex="#F8F6F3" contrast="-" usage="背景色、卡片底色" textColor="text-gray-900" />
              <ColorCard name="青松" season="夏" color="#4A85B8" hex="#4A85B8" contrast="5.2:1" usage="链接、交互元素" />
              <ColorCard name="田野" season="秋" color="#A67B5B" hex="#A67B5B" contrast="6.8:1" usage="价格、促销标签" />
              <ColorCard name="冰川" season="冬" color="#458559" hex="#458559" contrast="7.8:1" usage="主按钮、品牌色" />
            </div>

            {/* 功能色 + 中性色 */}
            <h3 className="text-lg font-semibold text-gray-700 mb-3 mt-6">功能色 & 中性色</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
              <ColorCard name="青松" color="#3D7350" hex="#3D7350" contrast="6.2:1" usage="成功状态" compact />
              <ColorCard name="枫叶" color="#B94D3D" hex="#B94D3D" contrast="7.1:1" usage="错误、警示" compact />
              <ColorCard name="主文字" color="#2A2A2A" hex="#2A2A2A" contrast="15.8:1" usage="标题、正文" compact />
              <ColorCard name="次文字" color="#6B6B6B" hex="#6B6B6B" contrast="5.7:1" usage="辅助说明" compact />
              <ColorCard name="占位符" color="#999999" hex="#999999" contrast="4.2:1" usage="占位符" compact />
            </div>
          </section>

          {/* 组件示例 */}
          <section>
            <h2 className="text-2xl font-bold text-[#458559] mb-4">组件示例</h2>

            <div className="grid lg:grid-cols-3 gap-6">
              {/* 1. 主按钮 */}
              <ComponentCard title="主按钮" description="立即预订、立即支付、确认入住等">
                <ComponentDemo label="主按钮组">
                  <button className="h-9 px-3 text-sm font-medium text-white bg-[#458559] rounded-xl">立即预订</button>
                  <button className="h-9 px-3 text-sm font-medium text-white bg-[#A67B5B] rounded-xl">立即支付</button>
                  <button className="h-9 px-3 text-sm font-medium text-white bg-[#458559] rounded-xl">确认入住</button>
                </ComponentDemo>
              </ComponentCard>

              {/* 2. 辅助按钮 */}
              <ComponentCard title="辅助按钮" description="查看详情、联系房东等">
                <ComponentDemo label="辅助按钮组">
                  <button className="h-9 px-3 text-sm font-medium text-white bg-[#B94D3D] rounded-xl">删除订单</button>
                  <button className="h-9 px-3 text-sm font-medium text-white bg-[#4A85B8] rounded-xl">查看详情</button>
                  <button className="h-9 px-3 text-sm font-medium text-white bg-[#3D7350] rounded-xl">申请退款</button>
                </ComponentDemo>
              </ComponentCard>

              {/* 3. 空心按钮 */}
              <ComponentCard title="空心按钮" description="加入收藏、申请退款等">
                <ComponentDemo label="空心按钮组">
                  <button className="h-9 px-3 text-sm font-medium text-[#458559] border-2 border-[#458559] rounded-xl">查看详情</button>
                  <button className="h-9 px-3 text-sm font-medium text-[#A67B5B] border-2 border-[#A67B5B] rounded-xl">加入收藏</button>
                  <button className="h-9 px-3 text-sm font-medium text-[#B94D3D] border-2 border-[#B94D3D] rounded-xl">取消预订</button>
                </ComponentDemo>
              </ComponentCard>

              {/* 4. 小按钮 */}
              <ComponentCard title="小按钮" description="选择房型、立即预订、已满房等">
                <ComponentDemo label="小按钮组">
                  <button className="h-7 px-2.5 text-xs font-medium text-white bg-[#458559] rounded-xl">选择房型</button>
                  <button className="h-7 px-2.5 text-xs font-medium text-white bg-[#A67B5B] rounded-xl">立即预订</button>
                  <button className="h-7 px-2.5 text-xs font-medium text-gray-400 bg-gray-100 rounded-xl cursor-not-allowed">已满房</button>
                </ComponentDemo>
              </ComponentCard>

              {/* 5. 圆形标签 */}
              <ComponentCard title="圆形标签" description="全部/民宿/酒店筛选">
                <ComponentDemo label="筛选标签">
                  <button className="h-7 px-3 text-xs font-medium text-white bg-[#458559] rounded-full">全部</button>
                  <button className="h-7 px-3 text-xs text-gray-600 bg-gray-100 rounded-full">民宿</button>
                  <button className="h-7 px-3 text-xs text-gray-600 bg-gray-100 rounded-full">酒店</button>
                </ComponentDemo>
              </ComponentCard>

              {/* 6. 异形按钮 */}
              <ComponentCard title="异形按钮" description="带图标、加载状态、圆形图标按钮">
                <ComponentDemo label="图标按钮">
                  <button className="h-9 px-3 text-sm font-medium text-white bg-[#458559] rounded-xl flex items-center gap-1.5">
                    <Heart className="w-4 h-4 stroke-[1.5]" />收藏
                  </button>
                  <button className="h-9 px-3 text-sm font-medium text-[#458559] border-2 border-[#458559] rounded-xl flex items-center gap-1.5">
                    <Share2 className="w-4 h-4 stroke-[1.5]" />分享
                  </button>
                </ComponentDemo>
                <ComponentDemo label="圆形按钮">
                  <button className="w-10 h-10 rounded-full bg-[#458559] text-white flex items-center justify-center">
                    <Search className="w-4 h-4 stroke-[1.5]" />
                  </button>
                  <button className="w-10 h-10 rounded-full bg-[#A67B5B] text-white flex items-center justify-center">
                    <ShoppingCart className="w-4 h-4 stroke-[1.5]" />
                  </button>
                </ComponentDemo>
              </ComponentCard>

              {/* 7. 促销标签 */}
              <ComponentCard title="促销标签" description="限时特惠、首单立减、省¥180">
                <ComponentDemo label="促销标签">
                  <span className="inline-flex items-center h-6 px-2 text-xs font-bold text-white bg-[#B94D3D] rounded leading-none">限时特惠</span>
                  <span className="inline-flex items-center h-6 px-2 text-xs font-bold text-white bg-[#A67B5B] rounded leading-none">首单立减</span>
                  <span className="inline-flex items-center h-5 px-1.5 text-xs font-bold text-white bg-[#B94D3D] rounded leading-none">省¥180</span>
                </ComponentDemo>
              </ComponentCard>

              {/* 8. 订单状态徽章 */}
              <ComponentCard title="订单状态徽章" description="待支付、待确认、待入住、已完成、已取消">
                <ComponentDemo label="状态徽章">
                  <span className="inline-flex items-center h-6 px-2 text-xs font-medium text-[#B94D3D] bg-[#B94D3D]/10 rounded leading-none">待支付</span>
                  <span className="inline-flex items-center h-6 px-2 text-xs font-medium text-[#4A85B8] bg-[#4A85B8]/10 rounded leading-none">待确认</span>
                  <span className="inline-flex items-center h-6 px-2 text-xs font-medium text-[#458559] bg-[#458559]/10 rounded leading-none">待入住</span>
                  <span className="inline-flex items-center h-6 px-2 text-xs font-medium text-[#3D7350] bg-[#3D7350]/10 rounded leading-none">已完成</span>
                  <span className="inline-flex items-center h-6 px-2 text-xs font-medium text-gray-600 bg-gray-200 rounded leading-none">已取消</span>
                </ComponentDemo>
              </ComponentCard>

              {/* 9. 空心标签 */}
              <ComponentCard title="空心标签" description="可订、热门、山景房等">
                <ComponentDemo label="空心标签">
                  <span className="inline-flex items-center h-6 px-2 text-xs text-[#4A85B8] border border-[#4A85B8] rounded leading-none">可订</span>
                  <span className="inline-flex items-center h-6 px-2 text-xs text-[#A67B5B] border border-[#A67B5B] rounded leading-none">热门</span>
                  <span className="inline-flex items-center h-6 px-2 text-xs text-[#458559] border border-[#458559] rounded leading-none">山景房</span>
                </ComponentDemo>
              </ComponentCard>

              {/* 10. 小标签 */}
              <ComponentCard title="小标签" description="特价、新店、好评、HOT/NEW/VIP">
                <ComponentDemo label="小标签">
                  <span className="inline-flex items-center h-5 px-1.5 text-xs text-[#A67B5B] bg-[#A67B5B]/10 rounded leading-none">特价</span>
                  <span className="inline-flex items-center h-5 px-1.5 text-xs text-[#458559] bg-[#458559]/10 rounded leading-none">新店</span>
                  <span className="inline-flex items-center h-5 px-1.5 text-xs text-[#3D7350] bg-[#3D7350]/10 rounded leading-none">好评</span>
                  <span className="inline-flex items-center h-5 px-1.5 text-xs font-bold text-white bg-[#B94D3D] rounded leading-none">HOT</span>
                </ComponentDemo>
              </ComponentCard>

              {/* 11. 徽章 */}
              <ComponentCard title="徽章" description="购物车数量(3)、收藏(5)、消息(99+)、在线状态点">
                <ComponentDemo label="数字徽章">
                  <div className="relative inline-block">
                    <Bell className="w-5 h-5 stroke-[1.5] text-gray-600" />
                    <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#B94D3D] text-[10px] font-bold text-white">3</span>
                  </div>
                  <div className="relative inline-block">
                    <ShoppingCart className="w-5 h-5 stroke-[1.5] text-gray-600" />
                    <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#A67B5B] text-[10px] font-bold text-white">5</span>
                  </div>
                  <div className="relative inline-block">
                    <Heart className="w-5 h-5 stroke-[1.5] text-gray-600" />
                    <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#458559] text-[10px] font-bold text-white">99+</span>
                  </div>
                </ComponentDemo>
              </ComponentCard>

              {/* 12. 特性标签 */}
              <ComponentCard title="特性标签" description="icon+文字：免费WiFi、含早餐、双床房等">
                <ComponentDemo label="特性标签">
                  <span className="inline-flex items-center h-5 px-1.5 text-xs text-[#4A85B8] bg-[#4A85B8]/10 rounded leading-none">
                    <Wifi className="w-3 h-3 stroke-[1.5] mr-0.5" />WiFi
                  </span>
                  <span className="inline-flex items-center h-5 px-1.5 text-xs text-[#A67B5B] bg-[#A67B5B]/10 rounded leading-none">
                    <Utensils className="w-3 h-3 stroke-[1.5] mr-0.5" />早餐
                  </span>
                  <span className="inline-flex items-center h-5 px-1.5 text-xs text-[#458559] bg-[#458559]/10 rounded leading-none">
                    <Bed className="w-3 h-3 stroke-[1.5] mr-0.5" />双床
                  </span>
                </ComponentDemo>
              </ComponentCard>

              {/* 13. 方形输入框 */}
              <ComponentCard title="方形输入框" description="入住人姓名、备注信息（textarea）">
                <ComponentDemo label="输入框">
                  <input type="text" placeholder="入住人姓名" className="w-full h-9 px-3 text-sm bg-[#F8F6F3] border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#458559]" />
                </ComponentDemo>
                <ComponentDemo label="备注框">
                  <textarea placeholder="备注信息（可选）" className="w-full h-20 px-3 py-2 text-sm bg-[#F8F6F3] border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#458559]" />
                </ComponentDemo>
              </ComponentCard>

              {/* 14. 搜索框 */}
              <ComponentCard title="搜索框" description="带搜索icon的圆角输入">
                <ComponentDemo label="搜索框">
                  <div className="relative">
                    <input type="text" placeholder="搜索房源、地点..." className="w-full h-9 pl-9 pr-3 text-sm bg-[#F8F6F3] border-2 border-gray-200 rounded-full focus:outline-none focus:border-[#458559]" />
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 stroke-[1.5] text-gray-400" />
                  </div>
                </ComponentDemo>
              </ComponentCard>

              {/* 15. 手机号+验证码 */}
              <ComponentCard title="手机号+验证码" description="手机号输入+获取验证码按钮">
                <ComponentDemo label="号码输入">
                  <div className="flex gap-2">
                    <input type="text" placeholder="手机号" className="flex-1 h-9 px-3 text-sm bg-[#F8F6F3] border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#458559]" />
                    <button className="h-9 px-3 text-sm font-medium text-white bg-[#458559] rounded-xl whitespace-nowrap">获取验证码</button>
                  </div>
                </ComponentDemo>
              </ComponentCard>

              {/* 16. 备注填写框 */}
              <ComponentCard title="备注填写框" description="多行textarea，带字数统计0/200">
                <ComponentDemo label="备注框">
                  <textarea placeholder="备注信息..." maxLength={200} className="w-full h-20 px-3 py-2 text-sm bg-[#F8F6F3] border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#458559]" />
                  <div className="text-right text-xs text-gray-500">0/200</div>
                </ComponentDemo>
              </ComponentCard>

              {/* 17. 筛选器 */}
              <ComponentCard title="筛选器" description="价格区间、房型下拉选择">
                <ComponentDemo label="价格筛选">
                  <div className="relative">
                    <select className="w-full h-9 pl-4 pr-10 text-sm bg-white border-2 border-gray-200 rounded-xl appearance-none focus:outline-none focus:border-[#458559]">
                      <option>价格</option>
                      <option>100-200元</option>
                      <option>200-400元</option>
                      <option>400+元</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 stroke-[1.5] text-gray-400 pointer-events-none" />
                  </div>
                </ComponentDemo>
                <ComponentDemo label="房型选择">
                  <div className="relative">
                    <select className="w-full h-9 pl-4 pr-10 text-sm bg-white border-2 border-gray-200 rounded-xl appearance-none focus:outline-none focus:border-[#458559]">
                      <option>选择房型</option>
                      <option>标准双床房</option>
                      <option>豪华大床房</option>
                      <option>家庭套房</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 stroke-[1.5] text-gray-400 pointer-events-none" />
                  </div>
                </ComponentDemo>
              </ComponentCard>

              {/* 18. 排序 */}
              <ComponentCard title="排序" description="Tab切换（综合/价格/好评/距离）">
                <ComponentDemo label="排序Tab">
                  <div className="flex border-b-2 border-gray-200 w-full">
                    <button className="px-3 py-2 text-sm font-medium text-[#458559] border-b-2 border-[#458559] -mb-[2px]">综合</button>
                    <button className="px-3 py-2 text-sm text-gray-600">价格</button>
                    <button className="px-3 py-2 text-sm text-gray-600">好评</button>
                    <button className="px-3 py-2 text-sm text-gray-600">距离</button>
                  </div>
                </ComponentDemo>
              </ComponentCard>

              {/* 19. 单选框 */}
              <ComponentCard title="单选框" description="大床房/双床房/套房（含禁用）">
                <ComponentDemo label="房型选择">
                  <label className="flex items-center gap-2.5 text-sm text-gray-700 cursor-pointer">
                    <input type="radio" name="room" className="w-5 h-5 text-[#458559] border-2 border-gray-300 focus:ring-2 focus:ring-[#458559]/20" defaultChecked />
                    <span>大床房</span>
                  </label>
                  <label className="flex items-center gap-2.5 text-sm text-gray-700 cursor-pointer">
                    <input type="radio" name="room" className="w-5 h-5 text-[#458559] border-2 border-gray-300 focus:ring-2 focus:ring-[#458559]/20" />
                    <span>双床房</span>
                  </label>
                  <label className="flex items-center gap-2.5 text-sm text-gray-700 cursor-pointer">
                    <input type="radio" name="room" className="w-5 h-5 text-[#458559] border-2 border-gray-300 focus:ring-2 focus:ring-[#458559]/20" disabled />
                    <span className="text-gray-400">套房（已满）</span>
                  </label>
                </ComponentDemo>
              </ComponentCard>

              {/* 20. 多选框 */}
              <ComponentCard title="多选框" description="含早餐、免费WiFi、加床服务">
                <ComponentDemo label="服务选择">
                  <label className="flex items-center gap-2.5 text-sm text-gray-700 cursor-pointer">
                    <div className="relative">
                      <input type="checkbox" className="peer w-5 h-5 text-[#458559] border-2 border-gray-300 rounded focus:ring-2 focus:ring-[#458559]/20" defaultChecked />
                      <Check className="absolute inset-0 w-5 h-5 stroke-[1.5] text-white opacity-0 peer-checked:opacity-100 pointer-events-none" />
                    </div>
                    <span>含早餐</span>
                  </label>
                  <label className="flex items-center gap-2.5 text-sm text-gray-700 cursor-pointer">
                    <div className="relative">
                      <input type="checkbox" className="peer w-5 h-5 text-[#458559] border-2 border-gray-300 rounded focus:ring-2 focus:ring-[#458559]/20" />
                      <Check className="absolute inset-0 w-5 h-5 stroke-[1.5] text-white opacity-0 peer-checked:opacity-100 pointer-events-none" />
                    </div>
                    <span>免费WiFi</span>
                  </label>
                  <label className="flex items-center gap-2.5 text-sm text-gray-700 cursor-pointer">
                    <div className="relative">
                      <input type="checkbox" className="peer w-5 h-5 text-[#458559] border-2 border-gray-300 rounded focus:ring-2 focus:ring-[#458559]/20" />
                      <Check className="absolute inset-0 w-5 h-5 stroke-[1.5] text-white opacity-0 peer-checked:opacity-100 pointer-events-none" />
                    </div>
                    <span>加床服务</span>
                  </label>
                </ComponentDemo>
              </ComponentCard>

              {/* 21. 开关 */}
              <ComponentCard title="开关" description="Toggle开关（接收通知、自动确认、禁用状态）">
                <ComponentDemo label="开关控制">
                  <label className="relative inline-flex items-center cursor-pointer w-full mb-2">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-gray-200 peer-checked:bg-[#458559] rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                    <span className="ml-3 text-sm text-gray-700">接收通知</span>
                  </label>
                  <label className="relative inline-flex items-center cursor-pointer w-full">
                    <input type="checkbox" className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-200 peer-checked:bg-[#458559] rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                    <span className="ml-3 text-sm text-gray-700">自动确认</span>
                  </label>
                </ComponentDemo>
              </ComponentCard>

              {/* 22. 日期范围选择器 */}
              <ComponentCard title="日期范围选择器" description="入住日期、退房日期、共2晚">
                <ComponentDemo label="日期选择">
                  <div className="relative mb-2">
                    <input type="text" placeholder="入住日期" className="w-full h-9 px-3 text-sm bg-[#F8F6F3] border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#458559]" />
                    <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 stroke-[1.5] text-gray-400 pointer-events-none" />
                  </div>
                  <div className="relative mb-2">
                    <input type="text" placeholder="退房日期" className="w-full h-9 px-3 text-sm bg-[#F8F6F3] border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#458559]" />
                    <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 stroke-[1.5] text-gray-400 pointer-events-none" />
                  </div>
                  <div className="text-xs text-gray-600">共2晚</div>
                </ComponentDemo>
              </ComponentCard>

              {/* 23. 价格明细展示 */}
              <ComponentCard title="价格明细展示" description="房费×2晚、早餐、优惠券、实付金额¥826">
                <ComponentDemo label="费用明细">
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">房费 × 2晚</span>
                      <span className="text-gray-900 font-medium">¥776</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">早餐</span>
                      <span className="text-gray-900 font-medium">¥50</span>
                    </div>
                    <div className="flex justify-between text-sm text-[#3D7350]">
                      <span>优惠券折扣</span>
                      <span className="font-medium">-¥0</span>
                    </div>
                    <div className="h-px bg-gray-200"></div>
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">实付金额</span>
                      <span className="text-lg font-bold text-[#A67B5B]">¥826</span>
                    </div>
                  </div>
                </ComponentDemo>
              </ComponentCard>

              {/* 24. 信息卡片 */}
              <ComponentCard title="信息卡片" description="地址（MapPin icon）、联系方式（Phone icon）、营业时间（Clock icon）">
                <ComponentDemo label="地址信息">
                  <div className="flex items-start gap-2 text-sm">
                    <MapPin className="w-4 h-4 stroke-[1.5] text-[#458559] mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">杭州市上城区南山路100号</span>
                  </div>
                </ComponentDemo>
                <ComponentDemo label="联系方式">
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="w-4 h-4 stroke-[1.5] text-[#458559]" />
                    <span className="text-gray-700">0571-8888-8888</span>
                  </div>
                </ComponentDemo>
                <ComponentDemo label="营业时间">
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="w-4 h-4 stroke-[1.5] text-[#458559]" />
                    <span className="text-gray-700">08:00 - 22:00</span>
                  </div>
                </ComponentDemo>
              </ComponentCard>

              {/* 25. 设施特性卡片 */}
              <ComponentCard title="设施特性卡片" description="10个主要设施+6个其他服务">
                <div className="grid grid-cols-5 gap-2 mb-2">
                  <div className="flex flex-col items-center p-2 bg-[#458559]/10 rounded-xl">
                    <Wifi className="w-5 h-5 stroke-[1.5] text-[#458559] mb-1" />
                    <span className="text-xs text-gray-700">WiFi</span>
                  </div>
                  <div className="flex flex-col items-center p-2 bg-[#458559]/10 rounded-xl">
                    <Utensils className="w-5 h-5 stroke-[1.5] text-[#458559] mb-1" />
                    <span className="text-xs text-gray-700">早餐</span>
                  </div>
                  <div className="flex flex-col items-center p-2 bg-[#458559]/10 rounded-xl">
                    <Wind className="w-5 h-5 stroke-[1.5] text-[#458559] mb-1" />
                    <span className="text-xs text-gray-700">空调</span>
                  </div>
                  <div className="flex flex-col items-center p-2 bg-[#458559]/10 rounded-xl">
                    <Tv className="w-5 h-5 stroke-[1.5] text-[#458559] mb-1" />
                    <span className="text-xs text-gray-700">电视</span>
                  </div>
                  <div className="flex flex-col items-center p-2 bg-[#458559]/10 rounded-xl">
                    <ParkingCircle className="w-5 h-5 stroke-[1.5] text-[#458559] mb-1" />
                    <span className="text-xs text-gray-700">停车</span>
                  </div>
                  <div className="flex flex-col items-center p-2 bg-[#458559]/10 rounded-xl">
                    <Bath className="w-5 h-5 stroke-[1.5] text-[#458559] mb-1" />
                    <span className="text-xs text-gray-700">浴缸</span>
                  </div>
                  <div className="flex flex-col items-center p-2 bg-[#458559]/10 rounded-xl">
                    <WashingMachine className="w-5 h-5 stroke-[1.5] text-[#458559] mb-1" />
                    <span className="text-xs text-gray-700">洗衣</span>
                  </div>
                  <div className="flex flex-col items-center p-2 bg-[#458559]/10 rounded-xl">
                    <Dumbbell className="w-5 h-5 stroke-[1.5] text-[#458559] mb-1" />
                    <span className="text-xs text-gray-700">健身</span>
                  </div>
                  <div className="flex flex-col items-center p-2 bg-[#458559]/10 rounded-xl">
                    <Lock className="w-5 h-5 stroke-[1.5] text-[#458559] mb-1" />
                    <span className="text-xs text-gray-700">保险柜</span>
                  </div>
                  <div className="flex flex-col items-center p-2 bg-[#458559]/10 rounded-xl">
                    <BedDouble className="w-5 h-5 stroke-[1.5] text-[#458559] mb-1" />
                    <span className="text-xs text-gray-700">加床</span>
                  </div>
                </div>
                <ComponentDemo label="其他服务">
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
    if (value >= 7.0) return { grade: 'AAA', color: 'text-[#3D7350]' }
    if (value >= 4.5) return { grade: 'AA+', color: 'text-[#4A85B8]' }
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
