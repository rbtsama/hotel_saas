<template>
  <sidebar>
    <div class="p-6 space-y-6">
      <!-- 筛选表单 -->
      <a-card class="rounded-xl border-slate-200 bg-white shadow-sm">
        <div class="grid grid-cols-4 gap-4">
          <!-- 订单号 -->
          <div class="space-y-2">
            <label class="text-sm text-slate-600">订单号</label>
            <a-input
              v-model="filters.orderNumber"
              placeholder="请输入订单号"
              class="h-9"
            />
          </div>

          <!-- 订房手机号 -->
          <div class="space-y-2">
            <label class="text-sm text-slate-600">订房手机号</label>
            <a-input
              v-model="filters.guestPhone"
              placeholder="请输入订房手机号"
              class="h-9"
            />
          </div>

          <!-- 申诉日期 -->
          <div class="space-y-2 col-span-2">
            <label class="text-sm text-slate-600">申诉日期</label>
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

      <!-- 退款列表 -->
      <a-card class="rounded-xl border-slate-200 bg-white shadow-sm">
        <div slot="title" class="text-lg font-semibold text-slate-900">退款申请列表</div>

        <div class="border border-slate-200 rounded-lg overflow-hidden">
          <a-table
            :columns="columns"
            :data-source="refunds"
            :pagination="paginationConfig"
            :loading="loading"
            row-key="id"
            @change="handleTableChange"
          >
            <!-- 客诉时间 -->
            <template slot="requestTime" slot-scope="requestTime">
              <span class="text-sm text-slate-900">{{ requestTime }}</span>
            </template>

            <!-- 订单号 -->
            <template slot="orderNumber" slot-scope="orderNumber">
              <span class="font-mono text-sm text-slate-900">{{ orderNumber }}</span>
            </template>

            <!-- 订房手机号 -->
            <template slot="guestPhone" slot-scope="guestPhone">
              <span class="text-slate-900">{{ guestPhone }}</span>
            </template>

            <!-- 客人支付金额 -->
            <template slot="paidAmount" slot-scope="paidAmount">
              <span class="text-slate-900">¥{{ paidAmount }}</span>
            </template>

            <!-- 申请退款金额 -->
            <template slot="refundAmount" slot-scope="refundAmount">
              <span class="text-red-600 font-medium">¥{{ refundAmount }}</span>
            </template>

            <!-- 处理进度 -->
            <template slot="processStatus" slot-scope="processStatus">
              <a-tag :class="getStatusTagClass(processStatus)">
                {{ REFUND_STATUS_LABELS[processStatus] }}
              </a-tag>
            </template>

            <!-- 操作 -->
            <template slot="action" slot-scope="text, record">
              <div class="flex justify-end">
                <a-button
                  size="small"
                  class="h-7 px-3 text-blue-600 border-blue-300"
                  @click="handleViewDetail(record)"
                >
                  <a-icon type="file-text" />
                  详情
                </a-button>
              </div>
            </template>
          </a-table>
        </div>
      </a-card>

      <!-- 详情弹窗 -->
      <a-modal
        :visible="isDetailModalVisible"
        title="退款详情"
        width="800px"
        :footer="null"
        @cancel="isDetailModalVisible = false"
      >
        <div v-if="selectedRefund" class="space-y-6">
          <!-- 基本信息 -->
          <div>
            <h3 class="text-base font-semibold text-slate-900 mb-4">基本信息</h3>
            <div class="grid grid-cols-2 gap-4">
              <div>
                <span class="text-sm text-slate-600">订单号：</span>
                <span class="text-sm text-slate-900">{{ selectedRefund.orderNumber }}</span>
              </div>
              <div>
                <span class="text-sm text-slate-600">客人姓名：</span>
                <span class="text-sm text-slate-900">{{ selectedRefund.guestName }}</span>
              </div>
              <div>
                <span class="text-sm text-slate-600">联系电话：</span>
                <span class="text-sm text-slate-900">{{ selectedRefund.guestPhone }}</span>
              </div>
              <div>
                <span class="text-sm text-slate-600">申诉时间：</span>
                <span class="text-sm text-slate-900">{{ selectedRefund.requestTime }}</span>
              </div>
            </div>
          </div>

          <!-- 退款信息 -->
          <div>
            <h3 class="text-base font-semibold text-slate-900 mb-4">退款信息</h3>
            <div class="grid grid-cols-2 gap-4">
              <div>
                <span class="text-sm text-slate-600">支付金额：</span>
                <span class="text-sm text-slate-900">¥{{ selectedRefund.paidAmount }}</span>
              </div>
              <div>
                <span class="text-sm text-slate-600">退款金额：</span>
                <span class="text-sm text-red-600 font-medium">¥{{ selectedRefund.refundAmount }}</span>
              </div>
              <div class="col-span-2">
                <span class="text-sm text-slate-600">退款原因：</span>
                <p class="text-sm text-slate-900 mt-1">{{ selectedRefund.refundReason || '-' }}</p>
              </div>
            </div>
          </div>

          <!-- 处理时间线 -->
          <div v-if="selectedRefund.timeline && selectedRefund.timeline.length > 0">
            <h3 class="text-base font-semibold text-slate-900 mb-4">处理时间线</h3>
            <a-timeline>
              <a-timeline-item
                v-for="(item, index) in selectedRefund.timeline"
                :key="index"
                :color="index === 0 ? 'blue' : 'gray'"
              >
                <div class="text-sm">
                  <div class="text-slate-900 font-medium">{{ item.status }}</div>
                  <div class="text-slate-600 mt-1">{{ item.time }}</div>
                  <div v-if="item.operator" class="text-slate-600 mt-1">操作人：{{ item.operator }}</div>
                  <div v-if="item.note" class="text-slate-600 mt-1">备注：{{ item.note }}</div>
                </div>
              </a-timeline-item>
            </a-timeline>
          </div>
        </div>
      </a-modal>
    </div>
  </sidebar>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, computed, onMounted } from '@vue/composition-api'
import Sidebar from '@/components/Layout/Sidebar.vue'
import RefundService from './services/refund.service'
import type { RefundRequest, RefundFilterParams, RefundProcessStatus } from './types/refund.types'
import { REFUND_STATUS_LABELS } from './types/refund.types'
import dayjs, { Dayjs } from 'dayjs'

export default defineComponent({
  name: 'RefundRequestsPage',
  components: {
    Sidebar
  },

  setup() {
    // ========== 状态管理 ==========
    const loading = ref(false)
    const refunds = ref<RefundRequest[]>([])
    const total = ref(0)
    const currentPage = ref(1)
    const pageSize = ref(10)

    // 筛选条件
    const filters = reactive({
      orderNumber: '',
      guestPhone: '',
      startDate: undefined as Dayjs | undefined,
      endDate: undefined as Dayjs | undefined
    })

    // 详情弹窗
    const isDetailModalVisible = ref(false)
    const selectedRefund = ref<RefundRequest | null>(null)

    // ========== 表格配置 ==========
    const columns = [
      { title: '客诉时间', dataIndex: 'requestTime', scopedSlots: { customRender: 'requestTime' } },
      { title: '订单号', dataIndex: 'orderNumber', scopedSlots: { customRender: 'orderNumber' } },
      { title: '订房手机号', dataIndex: 'guestPhone', scopedSlots: { customRender: 'guestPhone' } },
      { title: '客人支付金额', dataIndex: 'paidAmount', scopedSlots: { customRender: 'paidAmount' } },
      { title: '申请退款金额', dataIndex: 'refundAmount', scopedSlots: { customRender: 'refundAmount' } },
      { title: '处理进度', dataIndex: 'processStatus', scopedSlots: { customRender: 'processStatus' } },
      { title: '操作', align: 'right', scopedSlots: { customRender: 'action' }, width: 120 }
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
    const fetchRefunds = async () => {
      loading.value = true
      try {
        const params: RefundFilterParams = {
          orderNumber: filters.orderNumber || undefined,
          guestPhone: filters.guestPhone || undefined,
          startDate: filters.startDate ? dayjs(filters.startDate).format('YYYY-MM-DD') : undefined,
          endDate: filters.endDate ? dayjs(filters.endDate).format('YYYY-MM-DD') : undefined,
          page: currentPage.value,
          pageSize: pageSize.value
        }

        const response = await RefundService.getRefundList(params)
        refunds.value = response.refunds
        total.value = response.total
      } catch (error) {
        console.error('Failed to fetch refunds:', error)
      } finally {
        loading.value = false
      }
    }

    // ========== 事件处理 ==========
    const handleSearch = () => {
      currentPage.value = 1
      fetchRefunds()
    }

    const handleReset = () => {
      filters.orderNumber = ''
      filters.guestPhone = ''
      filters.startDate = undefined
      filters.endDate = undefined
      currentPage.value = 1
      fetchRefunds()
    }

    const handleTableChange = (pagination: any) => {
      currentPage.value = pagination.current
      pageSize.value = pagination.pageSize
      fetchRefunds()
    }

    const handleViewDetail = (refund: RefundRequest) => {
      selectedRefund.value = refund
      isDetailModalVisible.value = true
    }

    // ========== 样式辅助 ==========
    const getStatusTagClass = (status: RefundProcessStatus) => {
      const statusMap: Record<RefundProcessStatus, string> = {
        'pending': 'bg-orange-100 text-orange-700 border-orange-300',
        'approved': 'bg-green-100 text-green-700 border-green-300',
        'rejected': 'bg-red-100 text-red-700 border-red-300',
        'refunded': 'bg-blue-100 text-blue-700 border-blue-300',
        'platform-approved': 'bg-purple-100 text-purple-700 border-purple-300',
        'platform-refund': 'bg-blue-100 text-blue-700 border-blue-300',
        'merchant-refund': 'bg-slate-100 text-slate-700 border-slate-300'
      }
      return statusMap[status] || 'bg-gray-100 text-gray-700 border-gray-300'
    }

    // ========== 生命周期 ==========
    onMounted(() => {
      fetchRefunds()
    })

    return {
      // 状态
      loading,
      refunds,
      filters,
      isDetailModalVisible,
      selectedRefund,

      // 表格
      columns,
      paginationConfig,

      // 枚举
      REFUND_STATUS_LABELS,

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
@import './OrderListPage.vue';

/* 额外的退款页面样式 */
.text-red-600 {
  color: #dc2626;
}

.bg-green-100 {
  background-color: #dcfce7;
}
.text-green-700 {
  color: #15803d;
}
.border-green-300 {
  border-color: #86efac;
}

.bg-purple-100 {
  background-color: #f3e8ff;
}
.text-purple-700 {
  color: #7e22ce;
}
.border-purple-300 {
  border-color: #d8b4fe;
}

.text-base {
  font-size: 16px;
}

.mb-4 {
  margin-bottom: 16px;
}

.mt-1 {
  margin-top: 4px;
}

.overflow-hidden {
  overflow: hidden;
}
</style>
