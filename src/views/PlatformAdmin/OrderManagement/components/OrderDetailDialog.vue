<template>
  <a-modal
    :visible="visible"
    title="订单详情"
    width="900px"
    :footer="null"
    @cancel="handleClose"
  >
    <div v-if="order" class="space-y-6">
      <!-- 订单基本信息 -->
      <div>
        <h3 class="text-base font-semibold text-slate-900 mb-4">订单基本信息</h3>
        <div class="grid grid-cols-2 gap-4">
          <div>
            <span class="text-sm text-slate-600">订单号：</span>
            <span class="text-sm text-slate-900 font-mono">{{ order.orderNumber }}</span>
          </div>
          <div>
            <span class="text-sm text-slate-600">下单时间：</span>
            <span class="text-sm text-slate-900">{{ order.createdAt }}</span>
          </div>
          <div>
            <span class="text-sm text-slate-600">订单状态：</span>
            <a-tag :class="getStatusTagClass(order.status)">
              {{ ORDER_STATUS_LABELS[order.status] }}
            </a-tag>
          </div>
          <div>
            <span class="text-sm text-slate-600">支付状态：</span>
            <a-tag :class="getPaymentStatusTagClass(order.paymentStatus)">
              {{ PAYMENT_STATUS_LABELS[order.paymentStatus] }}
            </a-tag>
          </div>
        </div>
      </div>

      <!-- 客人信息 -->
      <div>
        <h3 class="text-base font-semibold text-slate-900 mb-4">客人信息</h3>
        <div class="grid grid-cols-2 gap-4">
          <div>
            <span class="text-sm text-slate-600">订房人姓名：</span>
            <span class="text-sm text-slate-900 font-medium">{{ order.guestName }}</span>
          </div>
          <div>
            <span class="text-sm text-slate-600">联系电话：</span>
            <span class="text-sm text-slate-900">{{ order.guestPhone }}</span>
          </div>
          <div>
            <span class="text-sm text-slate-600">用户名：</span>
            <span class="text-sm text-slate-900">{{ order.userName }}</span>
          </div>
          <div>
            <span class="text-sm text-slate-600">用户手机：</span>
            <span class="text-sm text-slate-900">{{ order.userPhone }}</span>
          </div>
        </div>
      </div>

      <!-- 房间信息 -->
      <div>
        <h3 class="text-base font-semibold text-slate-900 mb-4">房间信息</h3>
        <div class="grid grid-cols-2 gap-4">
          <div>
            <span class="text-sm text-slate-600">房型：</span>
            <span class="text-sm text-slate-900 font-medium">{{ order.roomType }}</span>
          </div>
          <div>
            <span class="text-sm text-slate-600">间夜数：</span>
            <span class="text-sm text-slate-900">{{ order.nights }} 晚</span>
          </div>
          <div>
            <span class="text-sm text-slate-600">入住日期：</span>
            <span class="text-sm text-slate-900">{{ order.checkInDate }}</span>
          </div>
          <div>
            <span class="text-sm text-slate-600">离店日期：</span>
            <span class="text-sm text-slate-900">{{ order.checkOutDate }}</span>
          </div>
          <div v-if="order.roomNumber">
            <span class="text-sm text-slate-600">房间号：</span>
            <span class="text-sm text-slate-900">{{ order.roomNumber }}</span>
          </div>
        </div>
      </div>

      <!-- 费用明细 -->
      <div>
        <h3 class="text-base font-semibold text-slate-900 mb-4">费用明细</h3>
        <div class="border border-slate-200 rounded-lg p-4 space-y-3">
          <div class="flex justify-between items-center pb-2 border-b border-slate-200">
            <span class="text-sm text-slate-600">房费小计（{{ order.nights }} 晚 × ¥{{ roomPricePerNight }}）</span>
            <span class="text-sm text-slate-900">¥{{ order.roomPrice }}</span>
          </div>
          <div v-if="order.couponDiscount > 0" class="flex justify-between items-center pb-2 border-b border-slate-200">
            <span class="text-sm text-slate-600">优惠券优惠</span>
            <span class="text-sm text-green-600">-¥{{ order.couponDiscount }}</span>
          </div>
          <div v-if="order.pointsDiscount > 0" class="flex justify-between items-center pb-2 border-b border-slate-200">
            <span class="text-sm text-slate-600">积分抵扣</span>
            <span class="text-sm text-green-600">-¥{{ order.pointsDiscount }}</span>
          </div>
          <div v-if="order.memberDiscount > 0" class="flex justify-between items-center pb-2 border-b border-slate-200">
            <span class="text-sm text-slate-600">会员折扣</span>
            <span class="text-sm text-green-600">-¥{{ order.memberDiscount }}</span>
          </div>
          <div class="flex justify-between items-center pt-2">
            <span class="text-base font-semibold text-slate-900">实付金额</span>
            <span class="text-xl font-bold text-blue-600">¥{{ order.actualAmount }}</span>
          </div>
        </div>

        <!-- 佣金信息 -->
        <div class="grid grid-cols-2 gap-4 mt-3">
          <div>
            <span class="text-sm text-slate-600">平台佣金（5%）：</span>
            <span class="text-sm text-slate-900">¥{{ order.commission }}</span>
          </div>
          <div>
            <span class="text-sm text-slate-600">商家实收：</span>
            <span class="text-sm text-slate-900 font-medium">¥{{ order.merchantAmount }}</span>
          </div>
        </div>
      </div>

      <!-- 退款信息（如果有） -->
      <div v-if="order.hasRefundRequest">
        <h3 class="text-base font-semibold text-slate-900 mb-4">退款信息</h3>
        <div class="border border-red-200 rounded-lg p-4 bg-red-50 space-y-2">
          <div>
            <span class="text-sm text-slate-600">退款金额：</span>
            <span class="text-sm text-red-600 font-medium">¥{{ order.refundAmount }}</span>
          </div>
          <div v-if="order.refundRequestedAt">
            <span class="text-sm text-slate-600">申请时间：</span>
            <span class="text-sm text-slate-900">{{ order.refundRequestedAt }}</span>
          </div>
        </div>
      </div>
    </div>

    <template #footer>
      <a-button @click="handleClose">关闭</a-button>
    </template>
  </a-modal>
</template>

<script lang="ts">
import { defineComponent, computed } from '@vue/composition-api'
import type { Order } from '../types/order.types'
import { ORDER_STATUS_LABELS, ORDER_STATUS_COLORS, PAYMENT_STATUS_LABELS, PaymentStatus } from '../types/order.types'

export default defineComponent({
  name: 'OrderDetailDialog',

  props: {
    visible: {
      type: Boolean,
      default: false
    },
    order: {
      type: Object as () => Order | null,
      default: null
    }
  },

  setup(props, { emit }) {
    // 计算每晚房价
    const roomPricePerNight = computed(() => {
      if (!props.order || props.order.nights === 0) return 0
      return (props.order.roomPrice / props.order.nights).toFixed(2)
    })

    // 样式辅助函数
    const getStatusTagClass = (status: string) => {
      const color = ORDER_STATUS_COLORS[status as keyof typeof ORDER_STATUS_COLORS]
      const colorMap: Record<string, string> = {
        'orange': 'bg-orange-100 text-orange-700 border-orange-300',
        'blue': 'bg-blue-100 text-blue-700 border-blue-300',
        'black': 'bg-slate-100 text-slate-700 border-slate-300',
        'slate': 'bg-slate-100 text-slate-500 border-slate-300',
        'red': 'bg-red-100 text-red-700 border-red-300'
      }
      return colorMap[color] || 'bg-gray-100 text-gray-700 border-gray-300'
    }

    const getPaymentStatusTagClass = (status: PaymentStatus) => {
      const statusMap: Record<PaymentStatus, string> = {
        [PaymentStatus.UNPAID]: 'bg-yellow-100 text-yellow-700 border-yellow-300',
        [PaymentStatus.PAID]: 'bg-green-100 text-green-700 border-green-300',
        [PaymentStatus.REFUNDED]: 'bg-red-100 text-red-700 border-red-300'
      }
      return statusMap[status] || 'bg-gray-100 text-gray-700 border-gray-300'
    }

    const handleClose = () => {
      emit('close')
    }

    return {
      roomPricePerNight,
      ORDER_STATUS_LABELS,
      PAYMENT_STATUS_LABELS,
      getStatusTagClass,
      getPaymentStatusTagClass,
      handleClose
    }
  }
})
</script>

<style scoped lang="less">
.space-y-6 > * + * {
  margin-top: 24px;
}

.space-y-3 > * + * {
  margin-top: 12px;
}

.space-y-2 > * + * {
  margin-top: 8px;
}

.grid {
  display: grid;
}

.grid-cols-2 {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.gap-4 {
  gap: 16px;
}

.text-sm {
  font-size: 14px;
}

.text-base {
  font-size: 16px;
}

.text-xl {
  font-size: 20px;
}

.font-semibold {
  font-weight: 600;
}

.font-medium {
  font-weight: 500;
}

.font-bold {
  font-weight: 700;
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

.text-green-600 {
  color: #16a34a;
}

.text-red-600 {
  color: #dc2626;
}

.mb-4 {
  margin-bottom: 16px;
}

.mt-3 {
  margin-top: 12px;
}

.pb-2 {
  padding-bottom: 8px;
}

.pt-2 {
  padding-top: 8px;
}

.p-4 {
  padding: 16px;
}

.border {
  border-width: 1px;
}

.border-b {
  border-bottom-width: 1px;
}

.border-slate-200 {
  border-color: #e2e8f0;
}

.border-red-200 {
  border-color: #fecaca;
}

.rounded-lg {
  border-radius: 8px;
}

.bg-red-50 {
  background-color: #fef2f2;
}

.flex {
  display: flex;
}

.justify-between {
  justify-content: space-between;
}

.items-center {
  align-items: center;
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
.border-blue-300 {
  border-color: #93c5fd;
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
.border-slate-300 {
  border-color: #cbd5e1;
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

.bg-yellow-100 {
  background-color: #fef3c7;
}
.text-yellow-700 {
  color: #a16207;
}
.border-yellow-300 {
  border-color: #fde047;
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
</style>
