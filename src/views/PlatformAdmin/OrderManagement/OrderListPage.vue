<template>
  <sidebar>
    <div class="p-6 space-y-6">
      <!-- 订单详情弹窗 -->
      <order-detail-dialog
        :visible="isDetailDialogOpen"
        :order="selectedOrder"
        @close="isDetailDialogOpen = false"
      />

      <!-- 筛选表单 - 按PRD优化 -->
      <a-card class="rounded-xl border-slate-200 bg-white shadow-sm">
        <!-- 第一行：订单状态、下单时间、入住时间 -->
        <div class="flex gap-4 items-end">
          <!-- 订单状态 -->
          <div class="space-y-2" style="width: 160px">
            <label class="text-sm text-slate-600">订单状态</label>
            <a-select
              v-model="filters.orderStatus"
              placeholder="全部"
              class="w-full h-9"
            >
              <a-select-option value="all">全部</a-select-option>
              <a-select-option :value="OrderStatus.PENDING_PAYMENT">待付款</a-select-option>
              <a-select-option :value="OrderStatus.PENDING_CHECKIN">待入住</a-select-option>
              <a-select-option :value="OrderStatus.CHECKED_IN">已入住</a-select-option>
              <a-select-option :value="OrderStatus.COMPLETED">已完成</a-select-option>
              <a-select-option :value="OrderStatus.CANCELLED">已取消</a-select-option>
            </a-select>
          </div>

          <!-- 下单时间 -->
          <div class="space-y-2 flex-1">
            <label class="text-sm text-slate-600">下单时间</label>
            <a-range-picker
              v-model="filters.orderCreatedRange"
              format="YYYY-MM-DD"
              value-format="YYYY-MM-DD"
              class="w-full"
              style="height: 36px"
              :placeholder="['开始日期', '结束日期']"
            />
          </div>

          <!-- 入住时间 -->
          <div class="space-y-2 flex-1">
            <label class="text-sm text-slate-600">入住时间</label>
            <a-range-picker
              v-model="filters.checkInRange"
              format="YYYY-MM-DD"
              value-format="YYYY-MM-DD"
              class="w-full"
              style="height: 36px"
              :placeholder="['开始日期', '结束日期']"
            />
          </div>
        </div>

        <!-- 第二行：酒店名称、订单号、手机号、按钮 -->
        <div class="grid grid-cols-12 gap-4 mt-4">
          <!-- 酒店名称 -->
          <div class="space-y-2 col-span-3">
            <label class="text-sm text-slate-600">酒店名称</label>
            <a-input
              v-model="filters.hotelName"
              placeholder="搜索酒店"
              class="h-9"
            />
          </div>

          <!-- 订单号 -->
          <div class="space-y-2 col-span-3">
            <label class="text-sm text-slate-600">订单号</label>
            <a-input
              v-model="filters.orderNumber"
              placeholder="输入订单号"
              class="h-9"
            />
          </div>

          <!-- 手机号 -->
          <div class="space-y-2 col-span-3">
            <label class="text-sm text-slate-600">手机号</label>
            <a-input
              v-model="filters.guestPhone"
              placeholder="输入手机号"
              class="h-9"
            />
          </div>

          <!-- 按钮区域 -->
          <div class="space-y-2 col-span-3">
            <label class="text-sm text-slate-600" style="visibility: hidden;">占位</label>
            <div class="flex gap-2">
              <a-button type="primary" class="h-9 bg-blue-600" @click="handleSearch">
                <a-icon type="search" />
                搜索
              </a-button>
              <a-button class="h-9 border-slate-300" @click="handleReset">
                重置
              </a-button>
            </div>
          </div>
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

            <!-- 入离日期（带icon标签） -->
            <template slot="checkInDates" slot-scope="text, record">
              <div class="text-sm space-y-1">
                <div class="flex items-center gap-1">
                  <span class="date-icon-in">入</span>
                  <span class="text-slate-900">{{ record.checkInDate }}</span>
                </div>
                <div class="flex items-center gap-1">
                  <span class="date-icon-out">离</span>
                  <span class="text-slate-900">{{ record.checkOutDate }}</span>
                </div>
              </div>
            </template>

            <!-- 支付金额 -->
            <template slot="actualAmount" slot-scope="actualAmount">
              <span class="text-slate-900">¥{{ actualAmount }}</span>
            </template>

            <!-- 订单状态 -->
            <template slot="status" slot-scope="status">
              <a-tag :class="getStatusTagClass(status)">
                {{ ORDER_STATUS_LABELS[status] }}
              </a-tag>
            </template>

            <!-- 退款记录（状态标签+红色金额） -->
            <template slot="refundRecord" slot-scope="text, record">
              <div v-if="record.refundRecords && record.refundRecords.length > 0">
                <div class="flex flex-col gap-1">
                  <a-tag :class="getRefundStatusClass(getLatestRefundStatus(record.refundRecords))">
                    {{ getLatestRefundStatus(record.refundRecords) }}
                  </a-tag>
                  <span
                    v-if="shouldShowRefundAmount(record.refundRecords)"
                    class="refund-amount-list"
                  >
                    ¥{{ getLatestRefundAmount(record.refundRecords) }}
                  </span>
                </div>
              </div>
              <span v-else class="text-slate-400 text-sm">-</span>
            </template>

            <!-- 下单时间（日期和时间分两行） -->
            <template slot="createdAt" slot-scope="createdAt">
              <div class="text-sm text-slate-900">
                <div>{{ createdAt.split(' ')[0] }}</div>
                <div class="text-xs text-slate-500">{{ createdAt.split(' ')[1] }}</div>
              </div>
            </template>

            <!-- 操作（按PRD简化） -->
            <template slot="action" slot-scope="text, record">
              <a-button
                size="small"
                class="h-7 px-3"
                @click="handleViewDetail(record)"
              >
                查询
              </a-button>
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

    // 筛选条件（按PRD优化 - 3个独立搜索）
    const filters = reactive({
      orderStatus: 'all',
      orderCreatedRange: [] as any,
      checkInRange: [] as any,
      hotelName: '',
      orderNumber: '',
      guestPhone: ''
    })

    // 详情弹窗
    const isDetailDialogOpen = ref(false)
    const selectedOrder = ref<Order | null>(null)

    // ========== 表格配置（按用户建议优化） ==========
    const columns = [
      { title: '订单号', dataIndex: 'orderNumber', width: 140, scopedSlots: { customRender: 'orderNumber' } },
      { title: '状态', dataIndex: 'status', width: 100, scopedSlots: { customRender: 'status' } },
      { title: '下单时间', dataIndex: 'createdAt', width: 160, scopedSlots: { customRender: 'createdAt' } },
      { title: '入住日期', width: 160, scopedSlots: { customRender: 'checkInDates' } },
      { title: '酒店', dataIndex: 'hotelName', width: 140 },
      { title: '房型', dataIndex: 'roomType', width: 160 },
      { title: '支付金额', dataIndex: 'actualAmount', width: 100, scopedSlots: { customRender: 'actualAmount' } },
      { title: '退款记录', width: 120, scopedSlots: { customRender: 'refundRecord' } },
      { title: '操作', align: 'right', width: 90, scopedSlots: { customRender: 'action' } }
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
          orderStatus: filters.orderStatus === 'all' ? undefined : filters.orderStatus,
          orderCreatedStart: filters.orderCreatedRange && filters.orderCreatedRange.length > 0 ? filters.orderCreatedRange[0] : undefined,
          orderCreatedEnd: filters.orderCreatedRange && filters.orderCreatedRange.length > 1 ? filters.orderCreatedRange[1] : undefined,
          checkInStart: filters.checkInRange && filters.checkInRange.length > 0 ? filters.checkInRange[0] : undefined,
          checkInEnd: filters.checkInRange && filters.checkInRange.length > 1 ? filters.checkInRange[1] : undefined,
          hotelName: filters.hotelName || undefined,
          // 订单号和手机号合并为searchKeyword传给service
          searchKeyword: filters.orderNumber || filters.guestPhone || undefined,
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
      filters.orderStatus = 'all'
      filters.orderCreatedRange = []
      filters.checkInRange = []
      filters.hotelName = ''
      filters.orderNumber = ''
      filters.guestPhone = ''
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

    // 退款记录状态颜色
    const getRefundStatusClass = (status: string) => {
      const statusMap: Record<string, string> = {
        '客人发起申诉': 'bg-orange-100 text-orange-700 border-orange-300',  // 橙色
        '客人撤诉': 'bg-slate-100 text-slate-600 border-slate-300',          // 灰色
        '退款申请': 'bg-orange-100 text-orange-700 border-orange-300',       // 橙色
        '平台支持退款': 'bg-green-100 text-green-700 border-green-300',     // 绿色
        '门店退款': 'bg-green-100 text-green-700 border-green-300',         // 绿色
        '平台拒绝退款': 'bg-red-100 text-red-700 border-red-300'            // 红色
      }
      return statusMap[status] || 'bg-gray-100 text-gray-700 border-gray-300'
    }

    // 获取最新退款状态（取最后一条）
    const getLatestRefundStatus = (refundRecords: any[]) => {
      if (!refundRecords || refundRecords.length === 0) return ''
      return refundRecords[refundRecords.length - 1].status
    }

    // 获取最新退款金额
    const getLatestRefundAmount = (refundRecords: any[]) => {
      if (!refundRecords || refundRecords.length === 0) return 0
      const latestRecord = refundRecords[refundRecords.length - 1]
      return latestRecord.amount || 0
    }

    // 判断是否显示退款金额（平台支持退款和门店退款才显示）
    const shouldShowRefundAmount = (refundRecords: any[]) => {
      if (!refundRecords || refundRecords.length === 0) return false
      const latestStatus = refundRecords[refundRecords.length - 1].status
      return latestStatus === '平台支持退款' || latestStatus === '门店退款'
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
      getStatusTagClass,
      getRefundStatusClass,
      getLatestRefundStatus,
      getLatestRefundAmount,
      shouldShowRefundAmount
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

// 入离日期icon标签样式（圆形浅灰底深灰字）
.date-icon-in,
.date-icon-out {
  display: inline-block;
  width: 20px;
  height: 20px;
  line-height: 20px;
  text-align: center;
  font-size: 12px;
  font-weight: 600;
  color: #475569;           // 深灰色文字
  background-color: #f1f5f9; // 浅灰色底
  border-radius: 50%;        // 圆形
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

.grid-cols-12 {
  grid-template-columns: repeat(12, minmax(0, 1fr));
}

.col-span-2 {
  grid-column: span 2 / span 2;
}

.col-span-3 {
  grid-column: span 3 / span 3;
}

.col-span-4 {
  grid-column: span 4 / span 4;
}

.col-span-9 {
  grid-column: span 9 / span 9;
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

// 退款记录颜色
.bg-green-100 {
  background-color: #dcfce7;
}
.text-green-700 {
  color: #15803d;
}
.border-green-300 {
  border-color: #86efac;
}

.bg-slate-100 {
  background-color: #f1f5f9;
}
.text-slate-600 {
  color: #475569;
}

.text-slate-500 {
  color: #64748b;
}

.text-slate-400 {
  color: #94a3b8;
}

// 列表页退款金额（红色显示）
.refund-amount-list {
  font-size: 13px;
  color: #dc2626;
  font-weight: 600;
}

.flex-col {
  flex-direction: column;
}

.gap-1 {
  gap: 4px;
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
