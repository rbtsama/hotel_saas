<template>
  <sidebar>
    <div class="page-container">
      <!-- 搜索卡片 -->
      <a-card class="search-card" :bordered="false">
        <div class="flex items-center justify-between">
          <a-form layout="inline" @submit.prevent="handleSearch">
            <a-form-item>
              <a-input
                v-model="phoneNumber"
                placeholder="请输入用户手机号"
                class="search-input"
                style="width: 240px"
              />
            </a-form-item>
            <a-form-item>
              <a-button type="primary" html-type="submit" :loading="loading" class="btn-primary">
                <a-icon type="search" />
                搜索
              </a-button>
            </a-form-item>
          </a-form>

          <a-button @click="goToOperationLogs" class="btn-default">
            <a-icon type="file-text" />
            操作记录
          </a-button>
        </div>
      </a-card>

      <!-- 用户信息卡片 -->
      <a-card v-if="userAccount" class="user-info-card" :bordered="false">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-8">
            <div class="info-item">
              <div class="info-label">手机号</div>
              <div class="info-value">{{ userAccount.phoneNumber }}</div>
            </div>
            <div class="info-item">
              <div class="info-label">VIP等级</div>
              <div class="info-value vip-level">VIP{{ userAccount.vipLevel }}</div>
            </div>
            <div class="info-item">
              <div class="info-label">当前积分</div>
              <div class="info-value points-value">{{ userAccount.availablePoints }}</div>
            </div>
          </div>

          <a-button type="primary" @click="showAdjustDialog" class="btn-primary">
            手动调整积分
          </a-button>
        </div>
      </a-card>

      <!-- 积分变动历史 -->
      <a-card v-if="userAccount" title="积分变动历史" :bordered="false" class="history-card">
        <a-table
          :columns="columns"
          :data-source="changeLogs"
          :pagination="paginationConfig"
          :loading="loading"
          row-key="id"
          @change="handleTableChange"
        >
          <!-- 操作类型 -->
          <template slot="operationType" slot-scope="operationType">
            <a-tag :class="getOperationTypeClass(operationType)">
              {{ getOperationTypeLabel(operationType) }}
            </a-tag>
          </template>

          <!-- 积分数 -->
          <template slot="pointsAmount" slot-scope="pointsAmount, record">
            <span class="points-amount">
              {{ record.operationType === 'earn' || record.operationType === 'adjust' ? '+' : '-' }}{{ Math.abs(pointsAmount) }}
            </span>
          </template>

          <!-- 备注说明 -->
          <template slot="remark" slot-scope="remark">
            <span class="remark-text">{{ remark }}</span>
          </template>

          <!-- 变动前 -->
          <template slot="balanceBefore" slot-scope="balanceBefore">
            <span class="balance-text">{{ balanceBefore }}</span>
          </template>

          <!-- 变动后 -->
          <template slot="balanceAfter" slot-scope="balanceAfter">
            <span class="balance-after">{{ balanceAfter }}</span>
          </template>

          <!-- 操作时间 -->
          <template slot="operatedAt" slot-scope="operatedAt">
            <span class="time-text">{{ operatedAt }}</span>
          </template>
        </a-table>
      </a-card>

      <!-- 调整积分弹窗 -->
      <a-modal
        v-model="isAdjustDialogVisible"
        title="手动调整用户积分"
        width="550px"
        :confirm-loading="adjusting"
        @ok="handleAdjustSubmit"
        @cancel="handleAdjustCancel"
        :okButtonProps="{ props: { class: 'btn-primary' } }"
      >
        <div class="adjust-dialog-content">
          <!-- 用户信息卡片 -->
          <div class="user-info-summary">
            <div class="summary-item">
              <div class="summary-label">手机号</div>
              <div class="summary-value">{{ userAccount ? userAccount.phoneNumber : '' }}</div>
            </div>
            <div class="summary-item">
              <div class="summary-label">VIP等级</div>
              <div class="summary-value vip">VIP{{ userAccount ? userAccount.vipLevel : '' }}</div>
            </div>
            <div class="summary-item">
              <div class="summary-label">当前积分</div>
              <div class="summary-value points">{{ userAccount ? userAccount.availablePoints : '' }}</div>
            </div>
          </div>

          <a-form-model ref="adjustForm" :model="adjustForm" :rules="adjustRules">
            <!-- 调整类型 -->
            <a-form-model-item label="调整类型" prop="type">
              <a-radio-group v-model="adjustForm.type" class="radio-group">
                <a-radio value="add" class="radio-item">
                  <a-icon type="plus-circle" class="icon-success" />
                  增加积分
                </a-radio>
                <a-radio value="deduct" class="radio-item">
                  <a-icon type="minus-circle" class="icon-error" />
                  减少积分
                </a-radio>
              </a-radio-group>
            </a-form-model-item>

            <!-- 调整积分 -->
            <a-form-model-item label="调整积分" prop="pointsAmount">
              <a-input-number
                v-model="adjustForm.pointsAmount"
                placeholder="请输入正整数"
                :min="1"
                :precision="0"
                class="input-number"
                style="width: 100%"
              />
            </a-form-model-item>

            <!-- 调整原因 -->
            <a-form-model-item label="调整原因" prop="remark">
              <a-textarea
                v-model="adjustForm.remark"
                placeholder="请填写调整原因"
                :rows="4"
                :maxLength="200"
                show-count
                class="textarea-input"
              />
            </a-form-model-item>
          </a-form-model>
        </div>
      </a-modal>
    </div>
  </sidebar>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, computed } from '@vue/composition-api'
import Sidebar from '@/components/Layout/Sidebar.vue'
import ValueAddedServiceService from './services/valueAddedService.service'
import type { UserPointsAccount, PointsChangeLog } from './types/valueAddedService.types'

export default defineComponent({
  name: 'PointsAdjustPage',
  components: {
    Sidebar
  },

  setup(props, { root }) {
    // ========== 状态管理 ==========
    const loading = ref(false)
    const adjusting = ref(false)
    const phoneNumber = ref('')
    const userAccount = ref<UserPointsAccount | null>(null)
    const changeLogs = ref<PointsChangeLog[]>([])
    const total = ref(0)
    const currentPage = ref(1)
    const pageSize = ref(20)
    const isAdjustDialogVisible = ref(false)

    // 调整表单
    const adjustForm = reactive({
      type: 'add' as 'add' | 'deduct',
      pointsAmount: undefined as number | undefined,
      remark: ''
    })

    // 表单验证规则
    const adjustRules = {
      type: [{ required: true, message: '请选择调整类型' }],
      pointsAmount: [
        { required: true, message: '请输入调整积分' },
        { type: 'number', min: 1, message: '请输入大于0的整数' }
      ],
      remark: [
        { required: true, message: '请填写调整原因', trigger: 'blur' },
        { max: 200, message: '调整原因不能超过200字符', trigger: 'blur' }
      ]
    }

    // ========== 表格配置 ==========
    const columns = [
      { title: '操作类型', dataIndex: 'operationType', scopedSlots: { customRender: 'operationType' }, width: 120 },
      { title: '积分数', dataIndex: 'pointsAmount', scopedSlots: { customRender: 'pointsAmount' }, width: 100 },
      { title: '备注说明', dataIndex: 'remark', scopedSlots: { customRender: 'remark' } },
      { title: '变动前', dataIndex: 'balanceBefore', scopedSlots: { customRender: 'balanceBefore' }, width: 100 },
      { title: '变动后', dataIndex: 'balanceAfter', scopedSlots: { customRender: 'balanceAfter' }, width: 100 },
      { title: '操作时间', dataIndex: 'operatedAt', scopedSlots: { customRender: 'operatedAt' }, width: 160 }
    ]

    // 分页配置
    const paginationConfig = computed(() => ({
      current: currentPage.value,
      pageSize: pageSize.value,
      total: total.value,
      showSizeChanger: false,
      showQuickJumper: false,
      showTotal: (total: number) => `共 ${total} 条`
    }))

    // ========== 数据加载 ==========
    const fetchChangeLogs = async () => {
      if (!userAccount.value) return

      loading.value = true
      try {
        const result = await ValueAddedServiceService.getPointsChangeLogsByUserId(
          userAccount.value.userId,
          pageSize.value,
          currentPage.value
        )
        changeLogs.value = result.data
        total.value = result.total
      } catch (error) {
        console.error('获取积分变动记录失败:', error)
      } finally {
        loading.value = false
      }
    }

    // ========== 事件处理 ==========
    const handleSearch = async () => {
      if (!phoneNumber.value || phoneNumber.value.trim().length === 0) {
        return
      }

      // 验证手机号格式
      const phoneRegex = /^1[3-9]\d{9}$/
      if (!phoneRegex.test(phoneNumber.value)) {
        return
      }

      loading.value = true
      try {
        const account = await ValueAddedServiceService.getUserAccountByPhone(phoneNumber.value)

        if (!account) {
          userAccount.value = null
          changeLogs.value = []
          total.value = 0
          return
        }

        userAccount.value = account
        currentPage.value = 1
        await fetchChangeLogs()
      } catch (error) {
        console.error('搜索用户失败:', error)
      } finally {
        loading.value = false
      }
    }

    const handleTableChange = (pagination: any) => {
      currentPage.value = pagination.current
      fetchChangeLogs()
    }

    const showAdjustDialog = () => {
      isAdjustDialogVisible.value = true
    }

    const handleAdjustCancel = () => {
      isAdjustDialogVisible.value = false
      adjustForm.type = 'add'
      adjustForm.pointsAmount = undefined
      adjustForm.remark = ''
    }

    const handleAdjustSubmit = async () => {
      if (!userAccount.value) return

      // 验证表单
      if (!adjustForm.pointsAmount || !adjustForm.remark) {
        return
      }

      const amount = adjustForm.pointsAmount
      if (isNaN(amount) || amount <= 0) {
        return
      }

      const signedAmount = adjustForm.type === 'add' ? amount : -amount

      adjusting.value = true
      try {
        await ValueAddedServiceService.adjustUserPoints(
          userAccount.value.id,
          signedAmount,
          adjustForm.remark,
          '兔子' // 操作人
        )

        // 刷新数据
        const account = await ValueAddedServiceService.getUserAccountByPhone(userAccount.value.phoneNumber)
        if (account) {
          userAccount.value = account
        }

        currentPage.value = 1
        await fetchChangeLogs()

        // 关闭弹窗
        handleAdjustCancel()
      } catch (error) {
        console.error('调整积分失败:', error)
      } finally {
        adjusting.value = false
      }
    }

    const goToOperationLogs = () => {
      root.$message.info('操作记录功能待开发')
    }

    // ========== 样式辅助 ==========
    const getOperationTypeLabel = (type: string) => {
      const typeMap: Record<string, string> = {
        earn: '获得',
        deduct: '扣减',
        expire: '过期',
        adjust: '调整'
      }
      return typeMap[type] || type
    }

    const getOperationTypeClass = (type: string) => {
      const classMap: Record<string, string> = {
        earn: 'tag-earn',
        deduct: 'tag-deduct',
        expire: 'tag-expire',
        adjust: 'tag-adjust'
      }
      return classMap[type] || ''
    }

    return {
      // 状态
      loading,
      adjusting,
      phoneNumber,
      userAccount,
      changeLogs,
      isAdjustDialogVisible,
      adjustForm,
      adjustRules,

      // 表格
      columns,
      paginationConfig,

      // 方法
      handleSearch,
      handleTableChange,
      showAdjustDialog,
      handleAdjustCancel,
      handleAdjustSubmit,
      goToOperationLogs,
      getOperationTypeLabel,
      getOperationTypeClass
    }
  }
})
</script>

<style scoped lang="less">
@import '@/styles/variables.less';

// ========================================
// 页面容器
// ========================================
.page-container {
  padding: @spacing-xl;
  background: @bg-secondary;
  min-height: calc(100vh - 64px);
}

// ========================================
// 卡片样式
// ========================================
.search-card,
.user-info-card,
.history-card {
  margin-bottom: @spacing-xl;
  border-radius: @border-radius-lg;
  border: 1px solid @border-primary;
  box-shadow: @shadow-sm;
  transition: @transition-base;

  &:hover {
    box-shadow: @shadow-md;
  }
}

// ========================================
// 搜索输入框
// ========================================
.search-input {
  height: @input-height-lg;
  border-color: @border-secondary;
  border-radius: @border-radius-base;
  font-size: @font-size-base;
  transition: @transition-base;

  &:focus,
  &:hover {
    border-color: @border-focus;
  }

  &:focus {
    box-shadow: 0 0 0 2px fade(@brand-primary, 20%);
  }
}

// ========================================
// 按钮样式
// ========================================
.btn-primary {
  height: @button-height;
  border-radius: @border-radius-base;
  font-weight: @font-weight-medium;
  font-size: @font-size-base;
  background-color: @brand-primary;
  border-color: @brand-primary;
  box-shadow: @shadow-sm;
  transition: @transition-base;

  &:hover {
    background-color: @brand-primary-hover;
    border-color: @brand-primary-hover;
    box-shadow: @shadow-base;
  }
}

.btn-default {
  height: @button-height;
  border-radius: @border-radius-base;
  font-weight: @font-weight-medium;
  font-size: @font-size-base;
  border-color: @border-secondary;
  color: @text-primary;
  transition: @transition-base;

  &:hover {
    border-color: @brand-primary;
    color: @brand-primary;
  }
}

// ========================================
// 布局辅助类
// ========================================
.flex {
  display: flex;
}

.items-center {
  align-items: center;
}

.justify-between {
  justify-content: space-between;
}

.gap-8 > * + * {
  margin-left: @spacing-2xl;
}

// ========================================
// 用户信息展示
// ========================================
.info-item {
  .info-label {
    font-size: @font-size-sm;
    color: @text-secondary;
    margin-bottom: @spacing-xs;
    line-height: 1.5;
  }

  .info-value {
    font-size: @font-size-xl;
    font-weight: @font-weight-semibold;
    color: @text-primary;
    line-height: 1.4;

    &.vip-level {
      color: @warning-color;
    }

    &.points-value {
      color: @success-color;
    }
  }
}

// ========================================
// 操作类型标签
// ========================================
.tag-earn {
  background-color: fade(@success-color, 15%);
  color: @success-color;
  border-color: fade(@success-color, 30%);
  font-size: @font-size-xs;
  border-radius: @border-radius-sm;
}

.tag-deduct {
  background-color: fade(@warning-color, 15%);
  color: @warning-color;
  border-color: fade(@warning-color, 30%);
  font-size: @font-size-xs;
  border-radius: @border-radius-sm;
}

.tag-expire {
  background-color: @bg-tertiary;
  color: @text-secondary;
  border-color: @border-primary;
  font-size: @font-size-xs;
  border-radius: @border-radius-sm;
}

.tag-adjust {
  background-color: @brand-primary-light;
  color: @brand-primary;
  border-color: fade(@brand-primary, 30%);
  font-size: @font-size-xs;
  border-radius: @border-radius-sm;
}

// ========================================
// 表格内容样式
// ========================================
.points-amount {
  font-weight: @font-weight-semibold;
  color: @text-primary;
  font-size: @font-size-base;
}

.remark-text {
  color: @text-secondary;
  font-size: @font-size-base;
  line-height: 1.6;
}

.balance-text {
  color: @text-primary;
  font-size: @font-size-base;
}

.balance-after {
  font-weight: @font-weight-semibold;
  color: @text-primary;
  font-size: @font-size-base;
}

.time-text {
  color: @text-secondary;
  font-size: @font-size-sm;
}

// ========================================
// 调整弹窗样式
// ========================================
.adjust-dialog-content {
  padding-top: @spacing-md;
}

.user-info-summary {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: @spacing-md;
  padding: @spacing-md;
  background: @bg-secondary;
  border-radius: @border-radius-base;
  border: 1px solid @border-primary;
  margin-bottom: @spacing-xl;

  .summary-item {
    .summary-label {
      font-size: @font-size-xs;
      color: @text-secondary;
      margin-bottom: @spacing-xs;
      line-height: 1.5;
    }

    .summary-value {
      font-size: @font-size-base;
      font-weight: @font-weight-semibold;
      color: @text-primary;
      line-height: 1.5;

      &.vip {
        color: @warning-color;
      }

      &.points {
        color: @success-color;
      }
    }
  }
}

// ========================================
// 表单元素样式
// ========================================
.radio-group {
  .radio-item {
    font-size: @font-size-base;
    color: @text-primary;
    margin-right: @spacing-xl;

    .icon-success {
      color: @success-color;
      margin-right: @spacing-xs;
    }

    .icon-error {
      color: @error-color;
      margin-right: @spacing-xs;
    }
  }
}

.input-number {
  height: @input-height;
  border-radius: @border-radius-base;
  font-size: @font-size-base;

  :deep(.ant-input-number-input) {
    height: @input-height;
    font-size: @font-size-base;
  }
}

.textarea-input {
  border-radius: @border-radius-base;
  font-size: @font-size-base;
  transition: @transition-base;

  &:focus,
  &:hover {
    border-color: @border-focus;
  }

  &:focus {
    box-shadow: 0 0 0 2px fade(@brand-primary, 20%);
  }
}

// ========================================
// Ant Design 组件样式覆盖
// ========================================
:deep(.ant-card-head-title) {
  color: @text-primary;
  font-size: @font-size-lg;
  font-weight: @font-weight-semibold;
}

:deep(.ant-table) {
  font-size: @font-size-base;

  .ant-table-thead > tr > th {
    background: @bg-secondary;
    color: @text-primary;
    font-weight: @font-weight-semibold;
    border-bottom: 1px solid @border-primary;
  }

  .ant-table-tbody > tr {
    transition: @transition-fast;

    &:hover {
      background: @bg-hover;
    }

    > td {
      border-bottom: 1px solid @border-primary;
    }
  }
}

:deep(.ant-pagination) {
  .ant-pagination-total-text {
    color: @text-secondary;
    font-size: @font-size-sm;
  }

  .ant-pagination-item {
    border-radius: @border-radius-sm;
    border-color: @border-secondary;

    a {
      color: @text-primary;
    }

    &.ant-pagination-item-active {
      background-color: @brand-primary;
      border-color: @brand-primary;

      a {
        color: #ffffff;
      }
    }
  }
}

:deep(.ant-form-item-label) {
  label {
    color: @text-primary;
    font-size: @font-size-base;
    font-weight: @font-weight-medium;
  }
}

:deep(.ant-input),
:deep(.ant-input-number) {
  border-radius: @border-radius-base;
  border-color: @border-secondary;
  transition: @transition-base;

  &:hover {
    border-color: @border-focus;
  }

  &:focus {
    border-color: @border-focus;
    box-shadow: 0 0 0 2px fade(@brand-primary, 20%);
  }
}

:deep(.ant-modal) {
  .ant-modal-header {
    border-bottom: 1px solid @border-primary;
    border-radius: @border-radius-lg @border-radius-lg 0 0;

    .ant-modal-title {
      color: @text-primary;
      font-size: @font-size-lg;
      font-weight: @font-weight-semibold;
    }
  }

  .ant-modal-footer {
    border-top: 1px solid @border-primary;
    padding: @spacing-md @spacing-xl;

    .ant-btn {
      height: @button-height-lg;
      border-radius: @border-radius-base;
      font-size: @font-size-base;
      font-weight: @font-weight-medium;
    }

    .ant-btn-primary {
      background-color: @brand-primary;
      border-color: @brand-primary;
      box-shadow: @shadow-sm;

      &:hover {
        background-color: @brand-primary-hover;
        border-color: @brand-primary-hover;
      }
    }
  }
}
</style>
