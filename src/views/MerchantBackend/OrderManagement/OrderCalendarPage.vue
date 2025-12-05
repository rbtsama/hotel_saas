<template>
  <sidebar>
    <div class="page-container">
      <!-- 工具栏 -->
      <a-card title="订单日历" :bordered="false" class="toolbar-card">
        <div class="toolbar">
          <a-space>
            <a-date-picker v-model="startDate" placeholder="开始日期" />
            <a-button type="primary" icon="search" @click="loadCalendar">搜索</a-button>
            <a-button @click="handleToday">今日</a-button>
            <a-button-group>
              <a-button icon="left" @click="handlePrevWeek" />
              <a-button icon="right" @click="handleNextWeek" />
            </a-button-group>
          </a-space>
        </div>
      </a-card>

      <!-- 日历表格 -->
      <a-card :bordered="false" style="margin-top: 24px">
        <div class="calendar-container">
          <table class="calendar-table">
            <thead>
              <tr>
                <th class="room-type-cell">
                  <div class="cell-header">房型</div>
                </th>
                <th v-for="(date, index) in dates" :key="index" class="date-cell">
                  <div class="date-header">
                    <div class="date-value">{{ formatDate(date.date) }}</div>
                    <div class="date-weekday">{{ date.dayOfWeek }}</div>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="roomType in roomTypeOrders" :key="roomType.id" class="room-row">
                <td class="room-type-cell">
                  <div class="room-type-name">{{ roomType.roomTypeName }}</div>
                </td>
                <td
                  v-for="(date, dateIndex) in dates"
                  :key="dateIndex"
                  class="booking-cell"
                >
                  <div class="booking-wrapper">
                    <template v-for="booking in roomType.bookings">
                      <div
                        v-if="shouldShowBooking(booking, dateIndex)"
                        :key="booking.id"
                        :class="['booking-block', getBookingClass(booking)]"
                        :style="getBookingStyle(booking, dateIndex)"
                      >
                        <span class="booking-guest">{{ booking.guestName }}</span>
                        <span v-if="booking.hasSpecialMark" class="booking-mark">退</span>
                      </div>
                    </template>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>

          <a-empty v-if="roomTypeOrders.length === 0" description="暂无订单数据" />
        </div>
      </a-card>
    </div>
  </sidebar>
</template>

<script>
import { defineComponent } from '@vue/composition-api'
import moment from 'moment'
import Sidebar from '@/components/Layout/Sidebar.vue'
import OrderCalendarService from './services/orderCalendar.service'

export default defineComponent({
  name: 'MerchantOrderCalendarPage',
  components: { Sidebar },
  data() {
    return {
      startDate: moment(),
      roomTypeOrders: [],
      dates: []
    }
  },
  mounted() {
    this.generateDates()
    this.loadCalendar()
  },
  methods: {
    generateDates() {
      const dates = []
      const weekdays = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
      for (let i = 0; i < 14; i++) {
        const date = moment(this.startDate).add(i, 'days')
        dates.push({
          date: date.format('YYYY-MM-DD'),
          dayOfWeek: weekdays[date.day()]
        })
      }
      this.dates = dates
    },
    async loadCalendar() {
      try {
        this.roomTypeOrders = await OrderCalendarService.getOrderCalendar({
          startDate: this.startDate.format('YYYY-MM-DD')
        })
      } catch (error) {
        this.$message.error('加载订单日历失败')
        console.error(error)
      }
    },
    formatDate(dateStr) {
      const date = moment(dateStr)
      return `${date.month() + 1}-${date.date()}`
    },
    handleToday() {
      this.startDate = moment()
      this.generateDates()
      this.loadCalendar()
    },
    handlePrevWeek() {
      this.startDate = moment(this.startDate).subtract(7, 'days')
      this.generateDates()
      this.loadCalendar()
    },
    handleNextWeek() {
      this.startDate = moment(this.startDate).add(7, 'days')
      this.generateDates()
      this.loadCalendar()
    },
    shouldShowBooking(booking, dateIndex) {
      const date = this.dates[dateIndex].date
      return date === booking.startDate
    },
    getBookingClass(booking) {
      return booking.orderStatus === 'checked-in' ? 'booking-checked-in' : 'booking-confirmed'
    },
    getBookingStyle(booking, dateIndex) {
      const startIndex = this.dates.findIndex(d => d.date === booking.startDate)
      if (startIndex === -1 || startIndex !== dateIndex) return {}

      const spanDays = Math.min(booking.nights, this.dates.length - startIndex)
      return {
        gridColumn: `1 / span 1`,
        width: `${spanDays * 100}%`
      }
    }
  }
})
</script>

<style scoped lang="less">
.page-container {
  padding: 24px;
  background: #f0f2f5;
  min-height: calc(100vh - 0px);
}

.toolbar {
  display: flex;
  align-items: center;
  gap: 16px;
}

.calendar-container {
  overflow-x: auto;
}

.calendar-table {
  width: 100%;
  border-collapse: collapse;
  min-width: 1200px;

  th, td {
    border: 1px solid #f0f0f0;
    padding: 8px;
  }

  thead th {
    background: #fafafa;
    font-weight: 600;
    text-align: center;
  }

  .room-type-cell {
    min-width: 200px;
    position: sticky;
    left: 0;
    background: #fff;
    z-index: 1;
  }

  .date-cell {
    min-width: 80px;
  }

  .date-header {
    text-align: center;
  }

  .date-value {
    font-weight: 600;
  }

  .date-weekday {
    font-size: 12px;
    color: #8c8c8c;
  }

  .room-type-name {
    font-weight: 500;
  }

  .booking-cell {
    min-height: 50px;
    padding: 4px;
    position: relative;
  }

  .booking-wrapper {
    position: relative;
    height: 100%;
    min-height: 40px;
  }

  .booking-block {
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    padding: 4px 8px;
    border-radius: 4px;
    color: white;
    font-size: 12px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    white-space: nowrap;
  }

  .booking-confirmed {
    background: #d9d9d9;
  }

  .booking-checked-in {
    background: #52c41a;
  }

  .booking-guest {
    flex: 1;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .booking-mark {
    flex-shrink: 0;
    width: 16px;
    height: 16px;
    background: #ff4d4f;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 10px;
    margin-left: 4px;
  }
}
</style>
