<template>
  <sidebar>
    <div class="page-container">
      <div class="space-y-4">
        <!-- 顶部工具栏 -->
        <a-card :bordered="false" class="toolbar-card">
          <div class="toolbar-content">
            <div class="date-picker-group">
              <span class="label">开始日期</span>
              <a-date-picker
                v-model="startDate"
                :format="'YYYY-MM-DD'"
                :value-format="'YYYY-MM-DD'"
                style="width: 160px"
              />
            </div>
            <a-button type="primary" icon="calendar" @click="handleSearch">
              搜索
            </a-button>
            <a-button @click="handleToday">今日</a-button>
            <div class="nav-buttons">
              <a-button icon="left" @click="handlePrevWeek" />
              <a-button icon="right" @click="handleNextWeek" />
            </div>
            <a-button type="default" class="ml-auto modify-all-btn">
              修改全部
            </a-button>
          </div>
        </a-card>

        <!-- 日历表格 -->
        <a-card :bordered="false" :body-style="{ padding: 0 }">
          <div class="calendar-wrapper">
            <a-spin :spinning="loading">
              <table class="calendar-table">
                <thead>
                  <tr>
                    <th class="sticky-col header-cell">
                      <div class="header-content">
                        <a-icon type="left" />
                        <span>房型</span>
                      </div>
                    </th>
                    <th
                      v-for="(dateInfo, index) in dates"
                      :key="index"
                      :class="['date-header', { 'weekend-col': dateInfo.isWeekend }]"
                    >
                      <div class="date-content">
                        <div class="date-month-day">{{ formatDate(dateInfo.date) }}</div>
                        <div class="date-weekday">{{ dateInfo.dayOfWeek }}</div>
                      </div>
                    </th>
                    <th class="expand-col">
                      <a-icon type="right" />
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="roomType in priceCalendar"
                    :key="roomType.id"
                    class="data-row"
                  >
                    <td class="sticky-col room-type-cell">
                      <a href="#" class="batch-edit-link">
                        批量修改{{ roomType.roomTypeName }}
                      </a>
                    </td>
                    <td
                      v-for="(dailyPrice, index) in roomType.dailyPrices"
                      :key="index"
                      :class="['price-cell', { 'weekend-cell': dailyPrice.isWeekend }]"
                    >
                      <div class="price-content">
                        <div class="price-value">¥ {{ dailyPrice.price }}</div>
                        <a href="#" class="set-link">设置</a>
                      </div>
                    </td>
                    <td class="expand-col"></td>
                  </tr>
                </tbody>
              </table>

              <div v-if="priceCalendar.length === 0" class="empty-state">
                暂无房价数据
              </div>
            </a-spin>
          </div>
        </a-card>
      </div>
    </div>
  </sidebar>
</template>

<script>
import { defineComponent, ref, onMounted, computed } from '@vue/composition-api'
import Sidebar from '@/components/Layout/Sidebar.vue'
import RoomPriceCalendarService from './services/roomPriceCalendar.service'

export default defineComponent({
  name: 'RoomPriceCalendarPage',
  components: { Sidebar },
  setup() {
    const loading = ref(false)
    const startDate = ref('2025-11-17')
    const priceCalendar = ref([])

    // 获取日期范围
    const dates = computed(() => {
      return priceCalendar.value[0]?.dailyPrices || []
    })

    // 格式化日期显示
    const formatDate = (dateStr) => {
      const date = new Date(dateStr)
      return `${date.getMonth() + 1}-${date.getDate()}`
    }

    // 加载价格日历
    const loadPriceCalendar = async () => {
      loading.value = true
      try {
        const data = await RoomPriceCalendarService.getPriceCalendar({
          startDate: startDate.value
        })
        priceCalendar.value = data
      } catch (error) {
        console.error('Failed to load price calendar:', error)
      } finally {
        loading.value = false
      }
    }

    // 搜索
    const handleSearch = () => {
      loadPriceCalendar()
    }

    // 今日
    const handleToday = () => {
      startDate.value = new Date().toISOString().split('T')[0]
      loadPriceCalendar()
    }

    // 上一周
    const handlePrevWeek = () => {
      const current = new Date(startDate.value)
      current.setDate(current.getDate() - 7)
      startDate.value = current.toISOString().split('T')[0]
      loadPriceCalendar()
    }

    // 下一周
    const handleNextWeek = () => {
      const current = new Date(startDate.value)
      current.setDate(current.getDate() + 7)
      startDate.value = current.toISOString().split('T')[0]
      loadPriceCalendar()
    }

    onMounted(() => {
      loadPriceCalendar()
    })

    return {
      loading,
      startDate,
      priceCalendar,
      dates,
      formatDate,
      handleSearch,
      handleToday,
      handlePrevWeek,
      handleNextWeek
    }
  }
})
</script>

<style scoped lang="less">
.page-container {
  padding: 24px;
  background: #f0f2f5;
  min-height: calc(100vh);
}

.space-y-4 > * + * {
  margin-top: 16px;
}

.toolbar-card {
  :deep(.ant-card-body) {
    padding: 16px 24px;
  }
}

.toolbar-content {
  display: flex;
  align-items: center;
  gap: 12px;

  .date-picker-group {
    display: flex;
    align-items: center;
    gap: 8px;

    .label {
      font-size: 14px;
      color: rgba(0, 0, 0, 0.45);
    }
  }

  .nav-buttons {
    display: flex;
    gap: 4px;
  }

  .ml-auto {
    margin-left: auto;
  }

  .modify-all-btn {
    color: #52c41a;
    border-color: #52c41a;

    &:hover {
      color: #73d13d;
      border-color: #73d13d;
      background: #f6ffed;
    }
  }
}

.calendar-wrapper {
  overflow-x: auto;
}

.calendar-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 13px;

  thead {
    background: rgba(0, 0, 0, 0.02);
  }

  th,
  td {
    border: 1px solid #f0f0f0;
    padding: 12px;
    text-align: center;
  }

  .sticky-col {
    position: sticky;
    left: 0;
    z-index: 10;
    background: #fff;
    min-width: 200px;
    text-align: left;
  }

  .header-cell {
    z-index: 20;
    background: rgba(0, 0, 0, 0.02);

    .header-content {
      display: flex;
      align-items: center;
      gap: 8px;
    }
  }

  .date-header {
    min-width: 90px;
    padding: 8px;

    &.weekend-col {
      background: #e6f7ff;
    }

    .date-content {
      display: flex;
      flex-direction: column;
      gap: 4px;

      .date-month-day {
        font-weight: 500;
      }

      .date-weekday {
        font-size: 12px;
        color: rgba(0, 0, 0, 0.45);
      }
    }
  }

  .expand-col {
    min-width: 90px;
  }

  .data-row {
    &:hover {
      background: rgba(0, 0, 0, 0.02);
    }
  }

  .room-type-cell {
    .batch-edit-link {
      font-size: 13px;
      color: #1890ff;

      &:hover {
        text-decoration: underline;
      }
    }
  }

  .price-cell {
    &.weekend-cell {
      background: rgba(230, 247, 255, 0.5);
    }

    .price-content {
      display: flex;
      flex-direction: column;
      gap: 4px;

      .price-value {
        font-size: 13px;
        font-weight: 500;
      }

      .set-link {
        font-size: 12px;
        color: #1890ff;

        &:hover {
          text-decoration: underline;
        }
      }
    }
  }
}

.empty-state {
  text-align: center;
  padding: 48px;
  color: rgba(0, 0, 0, 0.45);
}
</style>
