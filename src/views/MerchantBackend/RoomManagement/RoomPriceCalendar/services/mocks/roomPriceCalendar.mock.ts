import type { RoomTypePricing, DailyPrice } from '../../types/roomPriceCalendar.types'

// 生成日期范围的辅助函数
function generateDateRange(startDate: string, days: number): DailyPrice[] {
  const prices: DailyPrice[] = []
  const start = new Date(startDate)
  const weekdays = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']

  for (let i = 0; i < days; i++) {
    const currentDate = new Date(start)
    currentDate.setDate(start.getDate() + i)

    const dayOfWeek = currentDate.getDay()
    const isWeekend = dayOfWeek === 5 || dayOfWeek === 6 // 周五、周六

    prices.push({
      date: currentDate.toISOString().split('T')[0],
      dayOfWeek: weekdays[dayOfWeek],
      price: 0, // 将在下面设置
      isWeekend,
      hasDiscount: false
    })
  }

  return prices
}

// 生成房型价格数据
function generateRoomTypePricing(
  id: string,
  roomTypeName: string,
  buildingNumber: string,
  basePrice: number,
  weekendPrice: number
): RoomTypePricing {
  const dailyPrices = generateDateRange('2025-11-17', 13)

  return {
    id,
    roomTypeName,
    buildingNumber,
    dailyPrices: dailyPrices.map(dp => ({
      ...dp,
      price: dp.isWeekend ? weekendPrice : basePrice,
      hasDiscount: false
    }))
  }
}

// 模拟房价日历数据
export const mockRoomPriceCalendarData: RoomTypePricing[] = [
  generateRoomTypePricing('1', '竹林大床房【1号院】', '1号院', 580, 780),
  generateRoomTypePricing('2', '景观双床房【1号院】', '1号院', 680, 880),
  generateRoomTypePricing('3', '景观大套房【1号院】', '1号院', 780, 980),
  generateRoomTypePricing('4', '童趣滑滑梯房【1号院】', '1号院', 880, 1080),
  generateRoomTypePricing('5', '顶层景观大套房【1号院】', '1号院', 980, 1180),
  generateRoomTypePricing('6', '江景大床房A【2号院】', '2号院', 980, 1180),
  generateRoomTypePricing('7', '江景大床房B【2号院】', '2号院', 880, 1080),
  generateRoomTypePricing('8', '青梅小院【2号院】', '2号院', 580, 780),
  generateRoomTypePricing('9', '露台大床房【3号院】', '3号院', 780, 980),
  generateRoomTypePricing('10', '山景大床房【3号院】', '3号院', 680, 880)
]
