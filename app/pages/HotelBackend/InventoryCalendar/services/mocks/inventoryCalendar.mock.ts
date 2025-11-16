import type { RoomTypeInventory, DailyInventory, InventoryStatus } from '../../types/inventoryCalendar.types'

// 生成日期范围的辅助函数
function generateDateRange(startDate: string, days: number): DailyInventory[] {
  const inventories: DailyInventory[] = []
  const start = new Date(startDate)
  const weekdays = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']

  for (let i = 0; i < days; i++) {
    const currentDate = new Date(start)
    currentDate.setDate(start.getDate() + i)

    const dayOfWeek = currentDate.getDay()
    const isWeekend = dayOfWeek === 5 || dayOfWeek === 6 // 周五、周六

    inventories.push({
      date: currentDate.toISOString().split('T')[0],
      dayOfWeek: weekdays[dayOfWeek],
      totalRooms: 0,
      availableRooms: 0,
      bookedRooms: 0,
      status: 'available',
      isWeekend
    })
  }

  return inventories
}

// 生成随机库存状态
function getRandomInventoryStatus(totalRooms: number, available: number): InventoryStatus {
  if (available === 0) return 'sold-out'
  if (available <= totalRooms * 0.3) return 'limited'
  return 'available'
}

// 生成房型库存数据
function generateRoomTypeInventory(
  id: string,
  roomTypeName: string,
  buildingNumber: string,
  totalRooms: number
): RoomTypeInventory {
  const dailyInventories = generateDateRange('2025-11-17', 13)

  return {
    id,
    roomTypeName,
    buildingNumber,
    totalRooms,
    dailyInventories: dailyInventories.map((inv, index) => {
      // 模拟不同的库存情况
      let availableRooms = totalRooms
      let bookedRooms = 0
      let status: InventoryStatus = 'available'

      // 第一天已定（蓝色背景）
      if (index === 0) {
        availableRooms = 0
        bookedRooms = totalRooms
        status = 'sold-out'
      }
      // 第5天和第6天满房（黄色背景）
      else if (index === 4 || index === 5) {
        if (roomTypeName.includes('顶层景观大套房')) {
          availableRooms = 0
          bookedRooms = totalRooms
          status = 'sold-out'
        } else if (roomTypeName.includes('江景大床房B')) {
          availableRooms = Math.floor(totalRooms * 0.5)
          bookedRooms = totalRooms - availableRooms
          status = 'limited'
        }
      }
      // 其他日期全部可定
      else {
        availableRooms = totalRooms
        bookedRooms = 0
        status = 'available'
      }

      return {
        ...inv,
        totalRooms,
        availableRooms,
        bookedRooms,
        status
      }
    })
  }
}

// 模拟库存日历数据
export const mockInventoryCalendarData: RoomTypeInventory[] = [
  generateRoomTypeInventory('1', '竹林大床房【1号院】', '1号院', 1),
  generateRoomTypeInventory('2', '景观双床房【1号院】', '1号院', 2),
  generateRoomTypeInventory('3', '景观大套房【1号院】', '1号院', 2),
  generateRoomTypeInventory('4', '童趣滑滑梯房【1号院】', '1号院', 1),
  generateRoomTypeInventory('5', '顶层景观大套房【1号院】', '1号院', 1),
  generateRoomTypeInventory('6', '江景大床房A【2号院】', '2号院', 2),
  generateRoomTypeInventory('7', '江景大床房B【2号院】', '2号院', 2),
  generateRoomTypeInventory('8', '青梅小院【2号院】', '2号院', 1),
  generateRoomTypeInventory('9', '露台大床房【3号院】', '3号院', 1),
  generateRoomTypeInventory('10', '山景大床房【3号院】', '3号院', 1)
]
