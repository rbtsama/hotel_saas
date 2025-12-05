<template>
  <sidebar>
    <div class="p-6 space-y-6">
      <!-- 订单详情弹窗 -->
      <order-detail-dialog
        :visible="isDetailDialogOpen"
        :order="selectedOrder"
        @close="isDetailDialogOpen = false"
      />

      <!-- 筛选表单 -->
      <a-card class="rounded-xl border-slate-200 bg-white shadow-sm">
        <div class="grid grid-cols-6 gap-4">
          <!-- 房型 -->
          <div class="space-y-2">
            <label class="text-sm text-slate-600">房型</label>
            <a-input
              v-model="filters.roomType"
              placeholder="请输入房型"
              class="h-9"
            />
          </div>

          <!-- 订房日期 -->
          <div class="space-y-2 col-span-2">
            <label class="text-sm text-slate-600">订房日期</label>
            <div class="flex gap-2 items-center">
              <a-date-picker
                v-model="filters.startDate"
                placeholder="开始日期"
                class="flex-1 h-9"
                format="YYYY-MM-DD"
              />
              <span>-</span>
              <a-date-picker
                v-model="filters.endDate"
                placeholder="结束日期"
                class="flex-1 h-9"
                format="YYYY-MM-DD"
              />
            </div>
          </div>

          <!-- 订单状态 -->
          <div class="space-y-2 col-span-3">
            <label class="text-sm text-slate-600">订单状态</label>
            <a-select
              v-model="filters.orderStatus"
              placeholder="全部状态"
              class="w-full"
            >
              <a-select-option value="all">全部</a-select-option>
              <a-select-option :value="OrderStatus.PENDING_PAYMENT">待支付</a-select-option>
              <a-select-option :value="OrderStatus.PENDING_CHECKIN">待入住</a-select-option>
              <a-select-option :value="OrderStatus.CHECKED_IN">入住中</a-select-option>
              <a-select-option :value="OrderStatus.CHECKED_OUT">已离店</a-select-option>
              <a-select-option :value="OrderStatus.COMPLETED">已完成</a-select-option>
              <a-select-option :value="OrderStatus.CANCELLED">已取消</a-select-option>
              <a-select-option :value="OrderStatus.REFUND_REQUESTED">退款申请</a-select-option>
            </a-select>
          </div>
        </div>

        <div class="flex gap-2 mt-4">
          <a-button type="primary" class="h-9 bg-blue-600" @click="handleSearch">
            <a-icon type="search" />
            搜索
          </a-button>
          <a-button class="h-9 border-slate-300" @click="handleReset">
            重置
          </a-button>
        </div>
      </a-card>

      <!-- 订单列表 -->
      <a-card class="rounded-xl border-slate-200 bg-white shadow-sm">
        <div slot="title" class="text-lg font-semibold text-slate-900">订单列表</div>

        <div class="border border-slate-200 rounded-lg overflow-hidden">
          <a-table
            :columns="columns"
            :data-source="orders"
            :pagination="paginationConfig"
            :loading="loading"
            row-key="id"
            @change="handleTableChange"
          >
            <!-- 订单号 -->
            <template slot="orderNumber" slot-scope="orderNumber">
              <span class="font-mono text-sm text-slate-900">{{ orderNumber }}</span>
            </template>

            <!-- 订房人 -->
            <template slot="guestInfo" slot-scope="text, record">
              <div class="space-y-1">
                <div class="font-medium text-slate-900">{{ record.guestName }}</div>
                <div class="text-sm text-slate-600">{{ record.guestPhone }}</div>
              </div>
            </template>

            <!-- 入住日期 -->
            <template slot="checkInDates" slot-scope="text, record">
              <span class="whitespace-nowrap text-slate-900">
                {{ record.checkInDate }} - {{ record.checkOutDate }}
              </span>
            </template>

            <!-- 支付金额 -->
            <template slot="actualAmount" slot-scope="actualAmount">
              <span class="text-slate-900">¥{{ actualAmount }}</span>
            </template>

            <!-- 订单状态 -->
            <template slot="status" slot-scope="status, record">
              <div class="flex items-center gap-2">
                <a-tag :class="getStatusTagClass(status)">
                  {{ ORDER_STATUS_LABELS[status] }}
                </a-tag>
                <a-badge
                  v-if="record.hasRefundRequest"
                  count="退"
                  :number-style="{ backgroundColor: '#ef4444', fontSize: '10px' }"
                />
              </div>
            </template>

            <!-- 下单时间 -->
            <template slot="createdAt" slot-scope="createdAt">
              <span class="text-sm text-slate-900">{{ createdAt }}</span>
            </template>

            <!-- 操作 -->
            <template slot="action" slot-scope="text, record">
              <div class="flex justify-end gap-2">
                <a-button
                  size="small"
                  class="h-7 px-3 text-blue-600 border-blue-300"
                  @click="handleViewDetail(record)"
                >
                  <a-icon type="file-text" />
                  查询
                </a-button>
                <a-button
                  size="small"
                  class="h-7 px-3 text-blue-600 border-blue-300"
                  @click="handleViewDetail(record)"
                >
                  <a-icon type="edit" />
                  详情
                </a-button>
              </div>
            </template>
          </a-table>
        </div>
      </a-card>
    </div>
  </sidebar>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, computed, onMounted } from '@vue/composition-api'
import Sidebar from '@/components/Layout/Sidebar.vue'
import OrderDetailDialog from './components/OrderDetailDialog.vue'
import OrderService from './services/order.service'
import type { Order, OrderFilterParams } from './types/order.types'
import { OrderStatus, ORDER_STATUS_LABELS, ORDER_STATUS_COLORS } from './types/order.types'
import dayjs, { Dayjs } from 'dayjs'

export default defineComponent({
  name: 'OrderListPage',
  components: {
    Sidebar,
    OrderDetailDialog
  },

  setup() {
    // ========== 状态管理 ==========
    const loading = ref(false)
    const orders = ref<Order[]>([])
    const total = ref(0)
    const currentPage = ref(1)
    const pageSize = ref(10)

    // 筛选条件
    const filters = reactive({
      roomType: '',
      startDate: undefined as Dayjs | undefined,
      endDate: undefined as Dayjs | undefined,
      orderStatus: 'all'
    })

    // 详情弹窗
    const isDetailDialogOpen = ref(false)
    const selectedOrder = ref<Order | null>(null)

    // ========== 表格配置 ==========
    const columns = [
      { title: '订单号', dataIndex: 'orderNumber', scopedSlots: { customRender: 'orderNumber' } },
      { title: '订房人', scopedSlots: { customRender: 'guestInfo' } },
      { title: '房型', dataIndex: 'roomType' },
      { title: '入住日期', scopedSlots: { customRender: 'checkInDates' } },
      { title: '支付金额', dataIndex: 'actualAmount', scopedSlots: { customRender: 'actualAmount' } },
      { title: '订单状态', dataIndex: 'status', scopedSlots: { customRender: 'status' } },
      { title: '下单时间', dataIndex: 'createdAt', scopedSlots: { customRender: 'createdAt' } },
      { title: '操作', align: 'right', scopedSlots: { customRender: 'action' }, width: 180 }
    ]

    // 分页配置
    const paginationConfig = computed(() => ({
      current: currentPage.value,
      pageSize: pageSize.value,
      total: total.value,
      showSizeChanger: true,
      showQuickJumper: true,
      showTotal: (total: number) => `共 ${total} 条`
    }))

    // ========== 数据加载 ==========
    const fetchOrders = async () => {
      loading.value = true
      try {
        const params: OrderFilterParams = {
          roomType: filters.roomType || undefined,
          startDate: filters.startDate ? dayjs(filters.startDate).format('YYYY-MM-DD') : undefined,
          endDate: filters.endDate ? dayjs(filters.endDate).format('YYYY-MM-DD') : undefined,
          orderStatus: filters.orderStatus === 'all' ? undefined : filters.orderStatus,
          page: currentPage.value,
          pageSize: pageSize.value
        }

        const response = await OrderService.getOrderList(params)
        orders.value = response.orders
        total.value = response.total
      } catch (error) {
        console.error('Failed to fetch orders:', error)
      } finally {
        loading.value = false
      }
    }

    // ========== 事件处理 ==========
    const handleSearch = () => {
      currentPage.value = 1
      fetchOrders()
    }

    const handleReset = () => {
      filters.roomType = ''
      filters.startDate = undefined
      filters.endDate = undefined
      filters.orderStatus = 'all'
      currentPage.value = 1
      fetchOrders()
    }

    const handleTableChange = (pagination: any) => {
      currentPage.value = pagination.current
      pageSize.value = pagination.pageSize
      fetchOrders()
    }

    const handleViewDetail = (order: Order) => {
      selectedOrder.value = order
      isDetailDialogOpen.value = true
    }

    // ========== 样式辅助 ==========
    const getStatusTagClass = (status: OrderStatus) => {
      const color = ORDER_STATUS_COLORS[status]
      const colorMap: Record<string, string> = {
        'orange': 'bg-orange-100 text-orange-700 border-orange-300',
        'blue': 'bg-blue-100 text-blue-700 border-blue-300',
        'black': 'bg-slate-100 text-slate-700 border-slate-300',
        'slate': 'bg-slate-100 text-slate-500 border-slate-300',
        'red': 'bg-red-100 text-red-700 border-red-300'
      }
      return colorMap[color] || 'bg-gray-100 text-gray-700 border-gray-300'
    }

    // ========== 生命周期 ==========
    onMounted(() => {
      fetchOrders()
    })

    return {
      // 状态
      loading,
      orders,
      filters,
      isDetailDialogOpen,
      selectedOrder,

      // 表格
      columns,
      paginationConfig,

      // 枚举
      OrderStatus,
      ORDER_STATUS_LABELS,

      // 方法
      handleSearch,
      handleReset,
      handleTableChange,
      handleViewDetail,
      getStatusTagClass
    }
  }
})
</script>

<style scoped lang="less">
.p-6 {
  padding: 24px;
}

.space-y-6 > * + * {
  margin-top: 24px;
}

.space-y-2 > * + * {
  margin-top: 8px;
}

.space-y-1 > * + * {
  margin-top: 4px;
}

.rounded-xl {
  border-radius: 12px;
}

.rounded-lg {
  border-radius: 8px;
}

.border-slate-200 {
  border-color: #e2e8f0;
}

.bg-white {
  background-color: #ffffff;
}

.shadow-sm {
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
}

.grid {
  display: grid;
}

.grid-cols-6 {
  grid-template-columns: repeat(6, minmax(0, 1fr));
}

.col-span-2 {
  grid-column: span 2 / span 2;
}

.col-span-3 {
  grid-column: span 3 / span 3;
}

.gap-2 {
  gap: 8px;
}

.gap-4 {
  gap: 16px;
}

.flex {
  display: flex;
}

.items-center {
  align-items: center;
}

.justify-end {
  justify-content: flex-end;
}

.h-7 {
  height: 28px;
}

.h-9 {
  height: 36px;
}

.px-3 {
  padding-left: 12px;
  padding-right: 12px;
}

.text-sm {
  font-size: 14px;
}

.text-lg {
  font-size: 18px;
}

.font-semibold {
  font-weight: 600;
}

.font-medium {
  font-weight: 500;
}

.font-mono {
  font-family: monospace;
}

.text-slate-600 {
  color: #475569;
}

.text-slate-900 {
  color: #0f172a;
}

.text-blue-600 {
  color: #2563eb;
}

.border-blue-300 {
  border-color: #93c5fd;
}

.border-slate-300 {
  border-color: #cbd5e1;
}

.bg-blue-600 {
  background-color: #2563eb;
}

.whitespace-nowrap {
  white-space: nowrap;
}

/* 状态标签样式 */
.bg-orange-100 {
  background-color: #ffedd5;
}
.text-orange-700 {
  color: #c2410c;
}
.border-orange-300 {
  border-color: #fdba74;
}

.bg-blue-100 {
  background-color: #dbeafe;
}
.text-blue-700 {
  color: #1d4ed8;
}

.bg-slate-100 {
  background-color: #f1f5f9;
}
.text-slate-700 {
  color: #334155;
}
.text-slate-500 {
  color: #64748b;
}

.bg-red-100 {
  background-color: #fee2e2;
}
.text-red-700 {
  color: #b91c1c;
}
.border-red-300 {
  border-color: #fca5a5;
}

.mt-4 {
  margin-top: 16px;
}

.w-full {
  width: 100%;
}

.flex-1 {
  flex: 1 1 0%;
}
</style>
