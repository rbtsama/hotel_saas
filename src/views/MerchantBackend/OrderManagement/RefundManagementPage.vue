<template>
  <sidebar>
    <div class="page-container">
      <!-- 筛选表单 -->
      <a-card title="筛选条件" :bordered="false">
        <a-form layout="inline" :model="filters" @submit="handleSearch">
          <a-form-item label="订单号">
            <a-input v-model="filters.orderNumber" placeholder="请输入订单号" style="width: 200px" />
          </a-form-item>
          <a-form-item label="订房手机号">
            <a-input v-model="filters.guestPhone" placeholder="请输入订房手机号" style="width: 200px" />
          </a-form-item>
          <a-form-item label="申诉日期">
            <a-range-picker
              v-model="dateRange"
              format="YYYY-MM-DD"
              style="width: 280px"
            />
          </a-form-item>
          <a-form-item>
            <a-space>
              <a-button type="primary" html-type="submit" icon="search">搜索</a-button>
              <a-button @click="handleReset">重置</a-button>
            </a-space>
          </a-form-item>
        </a-form>
      </a-card>

      <!-- 退款列表 -->
      <a-card title="退款列表" :bordered="false" style="margin-top: 24px">
        <a-table
          :columns="columns"
          :data-source="refunds"
          :loading="loading"
          :pagination="pagination"
          row-key="id"
          @change="handleTableChange"
        >
          <span slot="requestTime" slot-scope="text">
            <div style="font-size: 12px">{{ text }}</div>
          </span>

          <span slot="orderNumber" slot-scope="text">
            <code>{{ text }}</code>
          </span>

          <span slot="processStatus" slot-scope="text">
            <a-tag>{{ getStatusLabel(text) }}</a-tag>
          </span>

          <span slot="action" slot-scope="text, record">
            <a-button type="link" size="small" @click="handleViewDetail(record)">详情</a-button>
          </span>
        </a-table>
      </a-card>

      <!-- 退款详情弹窗 -->
      <a-modal
        v-model="detailVisible"
        title="退款申请详情"
        width="900px"
        :footer="null"
      >
        <div v-if="selectedRefund">
          <!-- 退款申请信息 -->
          <a-descriptions title="退款申请信息" :column="2" bordered>
            <a-descriptions-item label="订单号">
              <code>{{ selectedRefund.orderNumber }}</code>
            </a-descriptions-item>
            <a-descriptions-item label="申请时间">
              {{ selectedRefund.requestTime }}
            </a-descriptions-item>
            <a-descriptions-item label="客人姓名">
              {{ selectedRefund.guestName }}
            </a-descriptions-item>
            <a-descriptions-item label="客人手机号">
              {{ selectedRefund.guestPhone }}
            </a-descriptions-item>
            <a-descriptions-item label="当前状态">
              <a-tag>{{ getStatusLabel(selectedRefund.processStatus) }}</a-tag>
            </a-descriptions-item>
          </a-descriptions>

          <!-- 订单信息 -->
          <a-descriptions title="订单信息" :column="2" bordered style="margin-top: 24px">
            <a-descriptions-item label="房型">
              {{ selectedRefund.roomType || '-' }}
            </a-descriptions-item>
            <a-descriptions-item label="入住日期">
              {{ selectedRefund.checkInDate || '-' }}
            </a-descriptions-item>
            <a-descriptions-item label="离店日期">
              {{ selectedRefund.checkOutDate || '-' }}
            </a-descriptions-item>
          </a-descriptions>

          <!-- 退款金额 -->
          <a-descriptions title="退款金额" :column="3" bordered style="margin-top: 24px">
            <a-descriptions-item label="客人支付金额">
              <span style="font-size: 18px; font-weight: 600">¥{{ selectedRefund.paidAmount }}</span>
            </a-descriptions-item>
            <a-descriptions-item label="申请退款金额">
              <span style="font-size: 18px; font-weight: 600; color: #ff7875">¥{{ selectedRefund.refundAmount }}</span>
            </a-descriptions-item>
            <a-descriptions-item label="退款比例">
              <span style="font-size: 18px; font-weight: 600; color: #1890ff">
                {{ ((selectedRefund.refundAmount / selectedRefund.paidAmount) * 100).toFixed(1) }}%
              </span>
            </a-descriptions-item>
          </a-descriptions>

          <!-- 退款原因 -->
          <div style="margin-top: 24px">
            <div style="font-weight: 600; margin-bottom: 8px">退款原因</div>
            <div style="padding: 12px; background: #fafafa; border-radius: 4px">
              {{ selectedRefund.refundReason || '客人未填写退款原因' }}
            </div>
          </div>

          <!-- 处理时间线 -->
          <div v-if="selectedRefund.timeline && selectedRefund.timeline.length > 0" style="margin-top: 24px">
            <div style="font-weight: 600; margin-bottom: 12px">处理时间线</div>
            <a-timeline>
              <a-timeline-item
                v-for="(item, index) in selectedRefund.timeline"
                :key="index"
                :color="index === selectedRefund.timeline.length - 1 ? 'green' : 'blue'"
              >
                <div style="font-weight: 500">{{ item.status }}</div>
                <div style="color: #8c8c8c; font-size: 12px; margin-top: 4px">{{ item.time }}</div>
                <div v-if="item.operator" style="color: #8c8c8c; font-size: 12px">操作人: {{ item.operator }}</div>
                <div v-if="item.note" style="margin-top: 8px; padding: 8px; background: #f0f0f0; border-radius: 4px; font-size: 12px">
                  {{ item.note }}
                </div>
              </a-timeline-item>
            </a-timeline>
          </div>
        </div>
      </a-modal>
    </div>
  </sidebar>
</template>

<script>
import { defineComponent } from '@vue/composition-api'
import Sidebar from '@/components/Layout/Sidebar.vue'
import RefundManagementService from './services/refundManagement.service'
import { REFUND_STATUS_LABELS } from './types/refundManagement.types'

export default defineComponent({
  name: 'MerchantRefundManagementPage',
  components: { Sidebar },
  data() {
    return {
      loading: false,
      refunds: [],
      filters: {
        orderNumber: '',
        guestPhone: '',
        startDate: '',
        endDate: ''
      },
      dateRange: [],
      pagination: {
        current: 1,
        pageSize: 10,
        total: 0,
        showTotal: total => `共 ${total} 条`
      },
      detailVisible: false,
      selectedRefund: null,
      columns: [
        {
          title: '客诉时间',
          dataIndex: 'requestTime',
          key: 'requestTime',
          scopedSlots: { customRender: 'requestTime' }
        },
        {
          title: '订单号',
          dataIndex: 'orderNumber',
          key: 'orderNumber',
          scopedSlots: { customRender: 'orderNumber' }
        },
        {
          title: '订房手机号',
          dataIndex: 'guestPhone',
          key: 'guestPhone'
        },
        {
          title: '客人支付金额',
          dataIndex: 'paidAmount',
          key: 'paidAmount'
        },
        {
          title: '申请退款金额',
          dataIndex: 'refundAmount',
          key: 'refundAmount'
        },
        {
          title: '处理进度',
          dataIndex: 'processStatus',
          key: 'processStatus',
          scopedSlots: { customRender: 'processStatus' }
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
    this.loadRefunds()
  },
  methods: {
    async loadRefunds() {
      this.loading = true
      try {
        const result = await RefundManagementService.getRefundList({
          ...this.filters,
          page: this.pagination.current,
          pageSize: this.pagination.pageSize
        })
        this.refunds = result.refunds
        this.pagination.total = result.total
      } catch (error) {
        this.$message.error('加载退款列表失败')
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
      this.loadRefunds()
    },
    handleReset() {
      this.filters = {
        orderNumber: '',
        guestPhone: '',
        startDate: '',
        endDate: ''
      }
      this.dateRange = []
      this.pagination.current = 1
      this.loadRefunds()
    },
    handleTableChange(pagination) {
      this.pagination.current = pagination.current
      this.loadRefunds()
    },
    handleViewDetail(record) {
      this.selectedRefund = record
      this.detailVisible = true
    },
    getStatusLabel(status) {
      return REFUND_STATUS_LABELS[status] || status
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
</style>
