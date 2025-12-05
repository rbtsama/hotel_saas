<template>
  <sidebar>
    <div class="page-container">
      <!-- 筛选表单 -->
      <a-card title="筛选条件" :bordered="false" class="search-card">
        <a-form layout="inline" :model="filters" @submit="handleSearch">
          <a-form-item label="房型">
            <a-input v-model="filters.roomType" placeholder="请输入房型" style="width: 200px" />
          </a-form-item>
          <a-form-item label="订房日期">
            <a-range-picker
              v-model="dateRange"
              format="YYYY-MM-DD"
              style="width: 280px"
            />
          </a-form-item>
          <a-form-item label="订单状态">
            <a-select v-model="filters.status" placeholder="全部状态" style="width: 200px">
              <a-select-option value="">全部状态</a-select-option>
              <a-select-option value="pending_payment">待支付</a-select-option>
              <a-select-option value="pending_checkin">待入住</a-select-option>
              <a-select-option value="checked_in">入住中</a-select-option>
              <a-select-option value="checked_out">已离店</a-select-option>
              <a-select-option value="completed">已完成</a-select-option>
              <a-select-option value="cancelled">已取消</a-select-option>
              <a-select-option value="refund_requested">退款申请</a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item>
            <a-space>
              <a-button type="primary" html-type="submit" icon="search">搜索</a-button>
              <a-button @click="handleReset">重置</a-button>
            </a-space>
          </a-form-item>
        </a-form>
      </a-card>

      <!-- 订单列表 -->
      <a-card title="订单列表" :bordered="false" style="margin-top: 24px">
        <a-table
          :columns="columns"
          :data-source="orders"
          :loading="loading"
          :pagination="pagination"
          row-key="id"
          @change="handleTableChange"
        >
          <span slot="orderNumber" slot-scope="text">
            <code>{{ text }}</code>
          </span>

          <span slot="guestInfo" slot-scope="text, record">
            <div>
              <div style="font-weight: 500">{{ record.guestName }}</div>
              <div style="color: #8c8c8c; font-size: 12px">{{ record.guestPhone }}</div>
            </div>
          </span>

          <span slot="checkInDate" slot-scope="text, record">
            <div style="white-space: nowrap">
              {{ record.checkInDate }} - {{ record.checkOutDate }}
            </div>
          </span>

          <span slot="actualAmount" slot-scope="text">
            ¥{{ text }}
          </span>

          <span slot="status" slot-scope="text, record">
            <a-tag :color="getStatusColor(text)">
              {{ getStatusLabel(text) }}
            </a-tag>
            <a-badge v-if="record.hasRefundRequest" status="error" text="退" />
          </span>

          <span slot="action" slot-scope="text, record">
            <a-button type="link" size="small" @click="handleViewDetail(record)">详情</a-button>
          </span>
        </a-table>
      </a-card>

      <!-- 订单详情弹窗 -->
      <a-modal
        v-model="detailVisible"
        title="订单详情"
        width="800px"
        :footer="null"
      >
        <div v-if="selectedOrder">
          <!-- 订单基本信息 -->
          <a-descriptions title="订单基本信息" :column="2" bordered>
            <a-descriptions-item label="订单号">
              <code>{{ selectedOrder.orderNumber }}</code>
            </a-descriptions-item>
            <a-descriptions-item label="下单时间">
              {{ selectedOrder.createdAt }}
            </a-descriptions-item>
            <a-descriptions-item label="订单状态">
              <a-tag :color="getStatusColor(selectedOrder.status)">
                {{ getStatusLabel(selectedOrder.status) }}
              </a-tag>
            </a-descriptions-item>
            <a-descriptions-item label="支付状态">
              <a-tag :color="selectedOrder.paymentStatus === 'paid' ? 'green' : 'orange'">
                {{ getPaymentStatusLabel(selectedOrder.paymentStatus) }}
              </a-tag>
            </a-descriptions-item>
          </a-descriptions>

          <!-- 客人信息 -->
          <a-descriptions title="客人信息" :column="2" bordered style="margin-top: 24px">
            <a-descriptions-item label="订房人姓名">
              {{ selectedOrder.guestName }}
            </a-descriptions-item>
            <a-descriptions-item label="联系电话">
              {{ selectedOrder.guestPhone }}
            </a-descriptions-item>
          </a-descriptions>

          <!-- 房间信息 -->
          <a-descriptions title="房间信息" :column="2" bordered style="margin-top: 24px">
            <a-descriptions-item label="房型">
              {{ selectedOrder.roomType }}
            </a-descriptions-item>
            <a-descriptions-item label="间夜数">
              {{ selectedOrder.nights }} 晚
            </a-descriptions-item>
            <a-descriptions-item label="入住日期">
              {{ selectedOrder.checkInDate }}
            </a-descriptions-item>
            <a-descriptions-item label="离店日期">
              {{ selectedOrder.checkOutDate }}
            </a-descriptions-item>
          </a-descriptions>

          <!-- 费用明细 -->
          <a-descriptions title="费用明细" :column="1" bordered style="margin-top: 24px">
            <a-descriptions-item label="房费">
              ¥{{ selectedOrder.totalAmount }}
            </a-descriptions-item>
            <a-descriptions-item label="实付金额">
              <span style="font-size: 20px; font-weight: 600; color: #1890ff">
                ¥{{ selectedOrder.actualAmount }}
              </span>
            </a-descriptions-item>
          </a-descriptions>
        </div>
      </a-modal>
    </div>
  </sidebar>
</template>

<script>
import { defineComponent } from '@vue/composition-api'
import Sidebar from '@/components/Layout/Sidebar.vue'
import OrderListService from './services/orderList.service'
import { ORDER_STATUS_LABELS, ORDER_STATUS_COLORS, PAYMENT_STATUS_LABELS } from './types/orderList.types'

export default defineComponent({
  name: 'MerchantOrderListPage',
  components: { Sidebar },
  data() {
    return {
      loading: false,
      orders: [],
      filters: {
        roomType: '',
        startDate: '',
        endDate: '',
        status: ''
      },
      dateRange: [],
      pagination: {
        current: 1,
        pageSize: 10,
        total: 0,
        showTotal: total => `共 ${total} 条`
      },
      detailVisible: false,
      selectedOrder: null,
      columns: [
        {
          title: '订单号',
          dataIndex: 'orderNumber',
          key: 'orderNumber',
          scopedSlots: { customRender: 'orderNumber' }
        },
        {
          title: '订房人',
          key: 'guestInfo',
          scopedSlots: { customRender: 'guestInfo' }
        },
        {
          title: '房型',
          dataIndex: 'roomType',
          key: 'roomType'
        },
        {
          title: '入住日期',
          key: 'checkInDate',
          scopedSlots: { customRender: 'checkInDate' }
        },
        {
          title: '支付金额',
          dataIndex: 'actualAmount',
          key: 'actualAmount',
          scopedSlots: { customRender: 'actualAmount' }
        },
        {
          title: '订单状态',
          dataIndex: 'status',
          key: 'status',
          scopedSlots: { customRender: 'status' }
        },
        {
          title: '下单时间',
          dataIndex: 'createdAt',
          key: 'createdAt'
        },
        {
          title: '操作',
          key: 'action',
          scopedSlots: { customRender: 'action' }
        }
      ]
    }
  },
  mounted() {
    this.loadOrders()
  },
  methods: {
    async loadOrders() {
      this.loading = true
      try {
        const result = await OrderListService.getOrderList({
          ...this.filters,
          page: this.pagination.current,
          pageSize: this.pagination.pageSize
        })
        this.orders = result.orders
        this.pagination.total = result.total
      } catch (error) {
        this.$message.error('加载订单列表失败')
        console.error(error)
      } finally {
        this.loading = false
      }
    },
    handleSearch(e) {
      e.preventDefault()
      if (this.dateRange && this.dateRange.length === 2) {
        this.filters.startDate = this.dateRange[0].format('YYYY-MM-DD')
        this.filters.endDate = this.dateRange[1].format('YYYY-MM-DD')
      }
      this.pagination.current = 1
      this.loadOrders()
    },
    handleReset() {
      this.filters = {
        roomType: '',
        startDate: '',
        endDate: '',
        status: ''
      }
      this.dateRange = []
      this.pagination.current = 1
      this.loadOrders()
    },
    handleTableChange(pagination) {
      this.pagination.current = pagination.current
      this.loadOrders()
    },
    handleViewDetail(record) {
      this.selectedOrder = record
      this.detailVisible = true
    },
    getStatusLabel(status) {
      return ORDER_STATUS_LABELS[status] || status
    },
    getStatusColor(status) {
      const colorMap = {
        orange: 'orange',
        blue: 'blue',
        black: 'default',
        slate: 'default',
        red: 'red',
        green: 'green'
      }
      const color = ORDER_STATUS_COLORS[status] || 'default'
      return colorMap[color] || 'default'
    },
    getPaymentStatusLabel(status) {
      return PAYMENT_STATUS_LABELS[status] || status
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

.search-card {
  :deep(.ant-form-item) {
    margin-bottom: 16px;
  }
}
</style>
