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
            <a-button type="default" class="ml-auto batch-modify-btn">
              批量修改
            </a-button>
          </div>
        </a-card>

        <!-- 库存日历表格 -->
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
                    <th class="total-rooms-col">总房间数</th>
                    <th
                      v-for="(dateInfo, index) in dates"
                      :key="index"
                      class="date-header"
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
                    v-for="roomType in inventoryCalendar"
                    :key="roomType.id"
                    class="data-row"
                  >
                    <td class="sticky-col room-type-cell">
                      <div class="room-type-name">{{ roomType.roomTypeName }}</div>
                    </td>
                    <td class="total-rooms-cell">
                      <div class="total-rooms-value">{{ roomType.totalRooms }}</div>
                    </td>
                    <td
                      v-for="(dailyInv, index) in roomType.dailyInventories"
                      :key="index"
                      :class="getInventoryCellClass(dailyInv)"
                    >
                      <div class="inventory-content">
                        <div class="inventory-status">
                          <span v-if="dailyInv.status === 'sold-out'">
                            已定 {{ dailyInv.totalRooms }}
                          </span>
                          <span v-else-if="dailyInv.status === 'limited'">
                            已定 {{ dailyInv.bookedRooms }}
                          </span>
                          <span v-else>
                            可定 {{ dailyInv.availableRooms }}间
                          </span>
                        </div>
                        <div class="inventory-detail">
                          <span v-if="dailyInv.status === 'sold-out'">
                            (¥ {{ index === 0 ? '1' : dailyInv.totalRooms }})
                          </span>
                          <span v-else-if="dailyInv.status === 'limited'">
                            (¥ {{ dailyInv.bookedRooms > 0 ? '748' : dailyInv.availableRooms }})
                          </span>
                          <span v-else>
                            总: {{ dailyInv.totalRooms }}
                          </span>
                        </div>
                        <a
                          href="#"
                          :class="['set-link', { 'set-link-white': dailyInv.status === 'sold-out' }]"
                        >
                          设置
                        </a>
                      </div>
                    </td>
                    <td class="expand-col"></td>
                  </tr>
                </tbody>
              </table>

              <div v-if="inventoryCalendar.length === 0" class="empty-state">
                暂无库存数据
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
import InventoryCalendarService from './services/inventoryCalendar.service'

export default defineComponent({
  name: 'InventoryCalendarPage',
  components: { Sidebar },
  setup() {
    const loading = ref(false)
    const startDate = ref('2025-11-17')
    const inventoryCalendar = ref([])

    // 获取日期范围
    const dates = computed(() => {
      return inventoryCalendar.value[0]?.dailyInventories || []
    })

    // 格式化日期显示
    const formatDate = (dateStr) => {
      const date = new Date(dateStr)
      return `${date.getMonth() + 1}-${date.getDate()}`
    }

    // 获取库存单元格样式类
    const getInventoryCellClass = (dailyInv) => {
      const classes = ['inventory-cell']
      if (dailyInv.status === 'sold-out') {
        classes.push('sold-out-cell')
      } else if (dailyInv.status === 'limited') {
        classes.push('limited-cell')
      }
      return classes.join(' ')
    }

    // 加载库存日历
    const loadInventoryCalendar = async () => {
      loading.value = true
      try {
        const data = await InventoryCalendarService.getInventoryCalendar({
          startDate: startDate.value
        })
        inventoryCalendar.value = data
      } catch (error) {
        console.error('Failed to load inventory calendar:', error)
      } finally {
        loading.value = false
      }
    }

    // 搜索
    const handleSearch = () => {
      loadInventoryCalendar()
    }

    // 今日
    const handleToday = () => {
      startDate.value = new Date().toISOString().split('T')[0]
      loadInventoryCalendar()
    }

    // 上一周
    const handlePrevWeek = () => {
      const current = new Date(startDate.value)
      current.setDate(current.getDate() - 7)
      startDate.value = current.toISOString().split('T')[0]
      loadInventoryCalendar()
    }

    // 下一周
    const handleNextWeek = () => {
      const current = new Date(startDate.value)
      current.setDate(current.getDate() + 7)
      startDate.value = current.toISOString().split('T')[0]
      loadInventoryCalendar()
    }

    onMounted(() => {
      loadInventoryCalendar()
    })

    return {
      loading,
      startDate,
      inventoryCalendar,
      dates,
      formatDate,
      getInventoryCellClass,
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

  .batch-modify-btn {
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
  font-size: 12px;

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

  .total-rooms-col,
  .total-rooms-cell {
    min-width: 80px;
  }

  .total-rooms-value {
    font-weight: 500;
  }

  .date-header {
    min-width: 90px;
    padding: 8px;

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
    .room-type-name {
      font-size: 13px;
      font-weight: 500;
    }
  }

  .inventory-cell {
    .inventory-content {
      display: flex;
      flex-direction: column;
      gap: 2px;

      .inventory-status {
        font-size: 12px;
        font-weight: 500;
      }

      .inventory-detail {
        font-size: 11px;
      }

      .set-link {
        font-size: 11px;
        color: #1890ff;

        &:hover {
          text-decoration: underline;
        }

        &.set-link-white {
          color: #fff;
        }
      }
    }

    &.sold-out-cell {
      background: #1890ff;
      color: #fff;
    }

    &.limited-cell {
      background: #faad14;
      color: #000;
    }
  }
}

.empty-state {
  text-align: center;
  padding: 48px;
  color: rgba(0, 0, 0, 0.45);
}
</style>
