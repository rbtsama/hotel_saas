<template>
  <a-modal
    :visible="visible"
    title="订单详情"
    width="880px"
    :footer="null"
    @cancel="handleClose"
  >
    <div v-if="order" class="detail-container">
      <!-- 模块1: 基础信息 -->
      <a-card class="detail-card" :bordered="false">
        <div class="category-title">基础信息</div>
        <div class="info-grid">
          <div class="info-item">
            <div class="field-label">下单时间</div>
            <div class="field-value-multi">
              <div class="value-primary">{{ formatDate(order.createdAt) }}</div>
              <div class="value-secondary">{{ formatTime(order.createdAt) }}</div>
            </div>
          </div>
          <div class="info-item">
            <div class="field-label">订单号</div>
            <div class="field-value">{{ order.orderNumber }}</div>
          </div>
          <div class="info-item">
            <div class="field-label">订单状态</div>
            <div class="field-value">{{ ORDER_STATUS_LABELS[order.status] }}</div>
          </div>
          <div v-if="order.paymentId" class="info-item">
            <div class="field-label">支付单号</div>
            <div class="field-value">{{ order.paymentId }}</div>
          </div>
          <div v-if="order.paidAt" class="info-item">
            <div class="field-label">支付时间</div>
            <div class="field-value-multi">
              <div class="value-primary">{{ formatDate(order.paidAt) }}</div>
              <div class="value-secondary">{{ formatTime(order.paidAt) }}</div>
            </div>
          </div>
        </div>
      </a-card>

      <!-- 模块2: 入住信息 -->
      <a-card class="detail-card" :bordered="false">
        <div class="category-title">入住信息</div>
        <div class="info-grid">
          <div class="info-item">
            <div class="field-label">酒店名称</div>
            <div class="field-value">{{ order.hotelName }}</div>
          </div>
          <div class="info-item">
            <div class="field-label">房型名称</div>
            <div class="field-value">{{ order.roomType }}</div>
          </div>
          <div class="info-item full-width">
            <div class="field-label">入住日期</div>
            <div class="field-value">{{ order.checkInDate }} - {{ order.checkOutDate }}（共 {{ order.nights }} 晚）</div>
          </div>
          <div class="info-item">
            <div class="field-label">预订间数</div>
            <div class="field-value">{{ order.roomCount }} 间</div>
          </div>
          <div class="info-item">
            <div class="field-label">入住人数</div>
            <div class="field-value">{{ order.guestCount }} 人</div>
          </div>
          <div class="info-item">
            <div class="field-label">联系人</div>
            <div class="field-value">{{ order.guestName }}</div>
          </div>
          <div class="info-item">
            <div class="field-label">联系电话</div>
            <div class="field-value">{{ order.guestPhone }}</div>
          </div>
          <div v-if="order.roomNumber" class="info-item">
            <div class="field-label">房间号</div>
            <div class="field-value">{{ order.roomNumber }}</div>
          </div>
        </div>
      </a-card>

      <!-- 模块3: 支付明细 -->
      <a-card class="detail-card" :bordered="false">
        <div class="category-title">支付明细</div>
        <div class="payment-detail">
          <div class="payment-row">
            <div class="field-label">房费小计（{{ order.nights }} 晚 × ¥{{ roomPricePerNight }}）</div>
            <div class="field-value">¥{{ order.roomPrice }}</div>
          </div>
          <div v-if="order.couponDiscount > 0" class="payment-row">
            <div class="field-label">优惠券优惠</div>
            <div class="field-value value-discount">-¥{{ order.couponDiscount }}</div>
          </div>
          <div v-if="order.pointsDiscount > 0" class="payment-row">
            <div class="field-label">积分抵扣</div>
            <div class="field-value value-discount">-¥{{ order.pointsDiscount }}</div>
          </div>
          <div v-if="order.memberDiscount > 0" class="payment-row">
            <div class="field-label">会员折扣</div>
            <div class="field-value value-discount">-¥{{ order.memberDiscount }}</div>
          </div>
          <div class="payment-row total-row">
            <div class="field-label">实付金额</div>
            <div class="field-value value-total">¥{{ order.actualAmount }}</div>
          </div>
        </div>
      </a-card>

      <!-- 模块4: 积分服务（条件显示） -->
      <a-card
        v-if="order.pointsServices && (order.pointsServices.rewards.length > 0 || order.pointsServices.exchanges.length > 0)"
        class="detail-card"
        :bordered="false"
      >
        <div class="category-title">积分服务</div>

        <!-- 积分奖励 -->
        <div v-if="order.pointsServices.rewards.length > 0" class="points-section">
          <div class="field-label">积分奖励</div>
          <div class="points-list">
            <div v-for="(item, idx) in order.pointsServices.rewards" :key="`reward-${idx}`" class="points-item">
              <div class="field-value">{{ item.name }}</div>
              <div class="field-value value-reward">+{{ item.points }}积分</div>
            </div>
          </div>
        </div>

        <!-- 积分换购 -->
        <div v-if="order.pointsServices.exchanges.length > 0" class="points-section">
          <div class="field-label">积分换购</div>
          <div class="points-list">
            <div v-for="(item, idx) in order.pointsServices.exchanges" :key="`exchange-${idx}`" class="points-item">
              <div class="field-value">{{ item.name }}</div>
              <div class="field-value value-exchange">-{{ item.points }}积分</div>
            </div>
          </div>
        </div>
      </a-card>

      <!-- 模块5: 退款记录（条件显示） -->
      <a-card
        v-if="order.refundRecords && order.refundRecords.length > 0"
        class="detail-card"
        :bordered="false"
      >
        <div class="category-title">退款记录</div>
        <div class="refund-records">
          <div v-for="(record, index) in order.refundRecords" :key="index" class="refund-record-item">
            <div class="info-grid">
              <div class="info-item">
                <div class="field-label">退款状态</div>
                <div class="field-value">{{ record.status }}</div>
              </div>
              <div class="info-item">
                <div class="field-label">退款金额</div>
                <div v-if="record.status === '客人撤诉' || record.status === '客人发起申诉'" class="field-value value-muted">-</div>
                <div v-else class="field-value value-refund">¥{{ record.amount }}</div>
              </div>
              <div class="info-item">
                <div class="field-label">处理时间</div>
                <div class="field-value-multi">
                  <div class="value-primary">{{ formatDate(record.time) }}</div>
                  <div class="value-secondary">{{ formatTime(record.time) }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </a-card>

      <!-- 模块6: 商家备注（条件显示） -->
      <a-card
        v-if="order.merchantNote"
        class="detail-card"
        :bordered="false"
      >
        <div class="category-title">商家备注</div>
        <div class="field-value">
          {{ order.merchantNote }}
        </div>
      </a-card>
    </div>

    <template slot="footer">
      <a-button @click="handleClose" size="large">关闭</a-button>
    </template>
  </a-modal>
</template>

<script lang="ts">
import { defineComponent, computed } from '@vue/composition-api'
import type { Order } from '../types/order.types'
import type { RefundStatus } from '../types/order.types'
import { ORDER_STATUS_LABELS } from '../types/order.types'
import dayjs from 'dayjs'

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

    // 退款记录表格列
    const refundColumns = [
      { title: '退款状态', width: 140, scopedSlots: { customRender: 'status' } },
      { title: '退款金额', width: 120, scopedSlots: { customRender: 'amount' } },
      { title: '处理时间', scopedSlots: { customRender: 'time' } }
    ]

    // 状态颜色映射
    const getStatusColor = (status: string) => {
      const colorMap: Record<string, string> = {
        'pending_payment': 'orange',
        'paid': 'blue',
        'confirmed': 'cyan',
        'checked_in': 'green',
        'checked_out': 'default',
        'cancelled': 'red',
        'refunded': 'purple'
      }
      return colorMap[status] || 'default'
    }

    // 退款状态颜色
    const getRefundStatusColor = (status: RefundStatus) => {
      const statusMap: Record<string, string> = {
        '客人发起申诉': 'orange',
        '客人撤诉': 'default',
        '门店退款': 'success',
        '平台支持退款': 'success',
        '平台拒绝退款': 'error',
        '退款申请': 'orange'
      }
      return statusMap[status] || 'default'
    }

    const formatDate = (datetime: string) => {
      if (!datetime) return '-'
      return dayjs(datetime).format('YYYY-MM-DD')
    }

    const formatTime = (datetime: string) => {
      if (!datetime) return '-'
      return dayjs(datetime).format('HH:mm:ss')
    }

    const handleClose = () => {
      emit('close')
    }

    return {
      roomPricePerNight,
      refundColumns,
      ORDER_STATUS_LABELS,
      getStatusColor,
      getRefundStatusColor,
      formatDate,
      formatTime,
      handleClose
    }
  }
})
</script>

<style scoped lang="less">
@import '@/styles/variables.less';

// 弹窗容器
.detail-container {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

// 卡片样式
.detail-card {
  border-radius: @border-radius-lg;
  border: 1px solid @border-primary;
  background: #ffffff;
  box-shadow: @shadow-sm;

  :deep(.ant-card-body) {
    padding: 20px;
  }
}

// ========== 层级1: 分类标题 ==========
.category-title {
  font-size: 16px;
  font-weight: 600;
  color: rgba(0,0,0,0.9);
  margin-bottom: 16px;
  padding-bottom: 12px;
  border-bottom: 1px solid @border-primary;
}

// 信息网格布局
.info-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px 24px;
}

.info-item {
  display: flex;
  flex-direction: column;
  gap: 6px;

  &.full-width {
    grid-column: span 2;
  }
}

// ========== 层级2: 字段标签 ==========
.field-label {
  font-size: 13px;
  font-weight: 400;
  color: #666666;
}

// ========== 层级3: 数据值 ==========
.field-value {
  font-size: 14px;
  font-weight: 500;
  color: rgba(0,0,0,0.9);
  line-height: 1.5;
}

// 多行数据值（日期时间）
.field-value-multi {
  .value-primary {
    font-size: 14px;
    font-weight: 500;
    color: rgba(0,0,0,0.9);
    line-height: 1.5;
  }

  .value-secondary {
    font-size: 13px;
    font-weight: 400;
    color: #666666;
    line-height: 1.5;
    margin-top: 2px;
  }
}

// 支付明细样式
.payment-detail {
  display: flex;
  flex-direction: column;
  gap: 0;
}

.payment-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid @bg-tertiary;

  &:last-child {
    border-bottom: none;
  }
}

// 总计行
.total-row {
  margin-top: 8px;
  padding-top: 16px;
  border-top: 2px solid @border-primary !important;
  border-bottom: none !important;
}

// 数据值颜色变体
.value-discount {
  color: #10b981 !important; // 绿色 - 优惠
}

.value-total {
  color: #3b82f6 !important; // 蓝色 - 总金额
}

.value-reward {
  color: #10b981 !important; // 绿色 - 积分奖励
}

.value-exchange {
  color: #ef4444 !important; // 红色 - 积分换购
}

.value-refund {
  color: #ef4444 !important; // 红色 - 退款
}

.value-muted {
  color: #b1b1b1 !important; // 灰色 - 无数据
}

// 积分服务样式
.points-section {
  display: flex;
  flex-direction: column;
  gap: 6px;

  &:not(:last-child) {
    margin-bottom: 16px;
  }
}

.points-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.points-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

// 退款记录样式
.refund-records {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.refund-record-item {
  padding: 12px;
  background: @bg-secondary;
  border-radius: @border-radius-base;

  &:not(:last-child) {
    margin-bottom: 8px;
  }
}
</style>
