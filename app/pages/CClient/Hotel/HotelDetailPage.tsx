/**
 * C端 - 酒店详情页面
 */

import MobileFrame from '../components/MobileFrame'
import { Badge } from '~/components/ui/badge'
import { Button } from '~/components/ui/button'
import { MapPin, Phone, Star, Wifi, Coffee } from 'lucide-react'

export default function HotelDetailPage() {
  const roomTypes = [
    {
      id: '1',
      name: '豪华大床房',
      area: 30,
      bedType: '大床',
      originalPrice: 500,
      vipPrice: 440,
      specialPrice: 396,
    },
    {
      id: '2',
      name: '豪华双床房',
      area: 35,
      bedType: '双床',
      originalPrice: 600,
      vipPrice: 528,
      specialPrice: 475,
    },
    {
      id: '3',
      name: '行政套房',
      area: 50,
      bedType: '大床',
      originalPrice: 800,
      vipPrice: 704,
      specialPrice: 634,
    },
  ]

  return (
    <MobileFrame navTitle="XX豪华酒店" showTabBar={false}>
      <div>
        {/* 酒店轮播图 */}
        <div className="h-52 bg-slate-200 flex items-center justify-center">
          <span className="text-slate-400">酒店轮播图</span>
        </div>

        {/* 酒店基本信息 */}
        <div className="p-4 bg-white">
          <div className="flex items-center gap-1 mb-2">
            {[1, 2, 3, 4].map((i) => (
              <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
            ))}
            <Star className="w-4 h-4 text-amber-400" />
          </div>
          <div className="flex items-center gap-2 text-sm text-slate-600 mb-1">
            <MapPin className="w-4 h-4" />
            <span>北京市朝阳区XX路88号</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-slate-600">
            <Phone className="w-4 h-4" />
            <span>010-12345678</span>
          </div>
        </div>

        {/* 房型列表 */}
        <div className="p-4 space-y-3">
          <h2 className="font-semibold text-slate-900">房型列表</h2>

          {roomTypes.map((room) => (
            <div key={room.id} className="bg-white rounded-xl overflow-hidden border border-gray-200 shadow-sm">
              <div className="h-32 bg-slate-200 flex items-center justify-center">
                <span className="text-slate-400 text-sm">房型图片</span>
              </div>
              <div className="p-3">
                <h3 className="font-semibold text-slate-900 mb-2">{room.name}</h3>
                <div className="flex items-center gap-3 text-xs text-slate-600 mb-3">
                  <span>{room.area}㎡</span>
                  <span>•</span>
                  <span>{room.bedType}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Wifi className="w-3 h-3" />
                    免费WiFi
                  </span>
                </div>

                <div className="space-y-1 mb-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-500">原价：</span>
                    <span className="line-through text-slate-400">¥{room.originalPrice}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-500">VIP3折扣：</span>
                    <span className="text-slate-700">¥{room.vipPrice}（88折）</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-500">平日特惠：</span>
                    <span className="text-xl font-bold text-[#A67B5B]">¥{room.specialPrice}</span>
                    <span className="text-xs text-[#3D7350]">（再85折）</span>
                  </div>
                </div>

                <Button className="w-full h-8 rounded-full bg-[#458559] hover:bg-[#3D7350]" size="sm">
                  选择
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </MobileFrame>
  )
}
