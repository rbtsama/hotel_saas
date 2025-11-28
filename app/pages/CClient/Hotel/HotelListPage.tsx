/**
 * C端 - 酒店列表页面
 */

import MobileFrame from '../components/MobileFrame'
import { Badge } from '~/components/ui/badge'
import { Button } from '~/components/ui/button'
import { MapPin, Star } from 'lucide-react'

interface HotelListPageProps {
  hotels?: Array<{
    id: string
    name: string
    rating: number
    address: string
    minPrice: number
    originalPrice: number
    vipLevel: string
    period: string
    imageUrl?: string
  }>
}

export default function HotelListPage({
  hotels = [
    {
      id: '1',
      name: 'XX豪华酒店',
      rating: 4.5,
      address: '朝阳区XX路88号',
      minPrice: 396,
      originalPrice: 500,
      vipLevel: 'VIP3',
      period: '平日特惠',
      imageUrl: '',
    },
    {
      id: '2',
      name: 'YY精品酒店',
      rating: 4.0,
      address: '海淀区YY路66号',
      minPrice: 280,
      originalPrice: 350,
      vipLevel: 'VIP3',
      period: '周末特惠',
      imageUrl: '',
    },
    {
      id: '3',
      name: 'ZZ商务酒店',
      rating: 4.2,
      address: '朝阳区ZZ路55号',
      minPrice: 320,
      originalPrice: 400,
      vipLevel: 'VIP3',
      period: '平日特惠',
      imageUrl: '',
    },
  ],
}: HotelListPageProps) {
  return (
    <MobileFrame navTitle="酒店列表" showTabBar={true}>
      <div className="p-4 space-y-3">
        {/* 筛选栏 */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          <button className="px-4 py-2 bg-[#2C5F8D] text-white rounded-full text-xs whitespace-nowrap shadow-sm">
            全部区域
          </button>
          <button className="px-4 py-2 bg-white border border-gray-200 rounded-full text-xs whitespace-nowrap hover:bg-slate-50">
            价格排序
          </button>
          <button className="px-4 py-2 bg-white border border-gray-200 rounded-full text-xs whitespace-nowrap hover:bg-slate-50">
            筛选
          </button>
        </div>

        {/* 酒店列表 */}
        {hotels.map((hotel) => (
          <div
            key={hotel.id}
            className="bg-white rounded-xl overflow-hidden border border-gray-200 active:bg-slate-50 shadow-sm"
          >
            {/* 酒店图片 */}
            <div className="h-40 bg-slate-200 flex items-center justify-center">
              <span className="text-slate-400 text-sm">酒店图片</span>
            </div>

            {/* 酒店信息 */}
            <div className="p-3">
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <h3 className="font-semibold text-slate-900 text-base mb-1">
                    {hotel.name}
                  </h3>
                  <div className="flex items-center gap-1 mb-1">
                    {Array.from({ length: Math.floor(hotel.rating) }).map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
                    ))}
                    <span className="text-xs text-slate-500 ml-1">{hotel.rating}</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-slate-500">
                    <MapPin className="w-3 h-3" />
                    {hotel.address}
                  </div>
                </div>
              </div>

              <div className="flex items-end justify-between pt-2 border-t border-slate-100">
                <div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-bold text-[#C67A28]">¥{hotel.minPrice}</span>
                    <span className="text-xs text-slate-500">起/晚</span>
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="outline" className="text-xs text-[#4A8FBF] border-[#4A8FBF] rounded-sm">
                      {hotel.vipLevel}专享
                    </Badge>
                    <span className="text-xs text-slate-400 line-through">¥{hotel.originalPrice}</span>
                    <span className="text-xs text-[#5A8A65]">{hotel.period}</span>
                  </div>
                </div>
                <Button size="sm" className="h-8 rounded-full bg-[#2C5F8D] hover:bg-[#5A8A65]">
                  查看详情
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </MobileFrame>
  )
}
