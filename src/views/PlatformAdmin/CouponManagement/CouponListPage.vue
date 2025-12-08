<template>
  <sidebar>
    <div class="coupon-list-page">
      <!-- 创建优惠券Dialog -->
      <coupon-dialog
        :visible="isCreateDialogOpen"
        mode="create"
        @close="isCreateDialogOpen = false"
        @success="handleDialogSuccess"
      />

      <!-- 编辑优惠券Dialog -->
      <coupon-dialog
        :visible="isEditDialogOpen"
        mode="edit"
        :coupon="editingCoupon"
        @close="isEditDialogOpen = false"
        @success="handleDialogSuccess"
      />

      <!-- 优惠券列表 -->
      <a-card :bordered="false" class="list-card">
        <div slot="title" class="card-header">
          <span class="card-title">优惠券列表</span>
          <div class="header-actions">
            <a-button @click="goToOperationLogs">
              <a-icon type="history" />
              操作记录
            </a-button>
            <a-button type="primary" @click="isCreateDialogOpen = true">
              <a-icon type="plus" />
              创建优惠券
            </a-button>
          </div>
        </div>

        <a-table
          :columns="columns"
          :data-source="coupons"
          :pagination="paginationConfig"
          :loading="loading"
          row-key="id"
          class="custom-table"
          @change="handleTableChange"
        >
          <!-- 优惠券ID -->
          <template slot="id" slot-scope="id">
            <span class="id-text">{{ id }}</span>
          </template>

          <!-- 优惠券类型 -->
          <template slot="type" slot-scope="type">
            <a-tag :class="getCouponTypeBadgeClass(type)">
              {{ getCouponTypeText(type) }}
            </a-tag>
          </template>

          <!-- 优惠券名称 -->
          <template slot="name" slot-scope="name">
            <span class="name-text">{{ name }}</span>
          </template>

          <!-- 优惠内容 -->
          <template slot="content" slot-scope="text, record">
            <div class="content-text">{{ getCouponContent(record) }}</div>
          </template>

          <!-- 备注说明 -->
          <template slot="remark" slot-scope="remark">
            <span class="remark-text" :title="remark || '—'">
              {{ remark || '—' }}
            </span>
          </template>

          <!-- 有效期 -->
          <template slot="validDays" slot-scope="validDays">
            <span class="valid-text">{{ getValidDaysText(validDays) }}</span>
          </template>

          <!-- 费用承担 -->
          <template slot="ratio" slot-scope="text, record">
            <div class="ratio-text">
              <div>平台 {{ record.platformRatio }}%</div>
              <div class="ratio-merchant">商户 {{ record.merchantRatio }}%</div>
            </div>
          </template>

          <!-- 创建时间 -->
          <template slot="createdAt" slot-scope="createdAt">
            <div class="datetime-cell">
              <div class="date">{{ formatDate(createdAt) }}</div>
              <div class="time">{{ formatTime(createdAt) }}</div>
            </div>
          </template>

          <!-- 操作 -->
          <template slot="action" slot-scope="text, record">
            <div class="action-btns">
              <a-button size="small" @click="handleEdit(record)">
                <a-icon type="edit" />
                编辑
              </a-button>
              <a-button
                size="small"
                :type="record.status === 'enabled' ? 'danger' : 'primary'"
                @click="handleToggleStatus(record)"
              >
                {{ record.status === 'enabled' ? '停用' : '启用' }}
              </a-button>
            </div>
          </template>
        </a-table>
      </a-card>
    </div>
  </sidebar>
</template>

<script>
import { defineComponent, ref, reactive, onMounted } from '@vue/composition-api'
import Sidebar from '@/components/Layout/Sidebar.vue'
import CouponDialog from './components/CouponDialog.vue'
import CouponService from './services/coupon.service'
import dayjs from 'dayjs'

export default defineComponent({
  name: 'CouponListPage',
  components: {
    Sidebar,
    CouponDialog
  },
  setup(props, { root }) {
    const loading = ref(false)
    const coupons = ref([])
    const total = ref(0)
    const currentPage = ref(1)
    const pageSize = ref(10)

    // Dialog状态
    const isCreateDialogOpen = ref(false)
    const isEditDialogOpen = ref(false)
    const editingCoupon = ref(null)

    // 表格列定义
    const columns = [
      {
        title: '优惠券ID',
        dataIndex: 'id',
        key: 'id',
        width: 100,
        scopedSlots: { customRender: 'id' }
      },
      {
        title: '优惠券类型',
        dataIndex: 'type',
        key: 'type',
        width: 100,
        scopedSlots: { customRender: 'type' }
      },
      {
        title: '优惠券名称',
        dataIndex: 'name',
        key: 'name',
        width: 180,
        scopedSlots: { customRender: 'name' }
      },
      {
        title: '优惠内容',
        key: 'content',
        width: 140,
        scopedSlots: { customRender: 'content' }
      },
      {
        title: '备注',
        dataIndex: 'remark',
        key: 'remark',
        width: 120,
        scopedSlots: { customRender: 'remark' }
      },
      {
        title: '有效期',
        dataIndex: 'validDays',
        key: 'validDays',
        width: 100,
        scopedSlots: { customRender: 'validDays' }
      },
      {
        title: '费用承担',
        key: 'ratio',
        width: 100,
        scopedSlots: { customRender: 'ratio' }
      },
      {
        title: '创建时间',
        dataIndex: 'createdAt',
        key: 'createdAt',
        width: 120,
        scopedSlots: { customRender: 'createdAt' }
      },
      {
        title: '创建人',
        dataIndex: 'createdBy',
        key: 'createdBy',
        width: 100
      },
      {
        title: '操作',
        key: 'action',
        width: 140,
        fixed: 'right',
        scopedSlots: { customRender: 'action' }
      }
    ]

    // 分页配置
    const paginationConfig = reactive({
      current: 1,
      pageSize: 10,
      total: 0,
      showSizeChanger: true,
      showQuickJumper: true,
      showTotal: (total) => `共 ${total} 条`,
      pageSizeOptions: ['10', '20', '50', '100']
    })

    // 获取优惠券列表
    const fetchCoupons = async () => {
      loading.value = true
      try {
        const result = await CouponService.getCoupons({
          page: currentPage.value,
          pageSize: pageSize.value
        })
        coupons.value = result.data
        total.value = result.total
        paginationConfig.total = result.total
        paginationConfig.current = result.page
      } catch (error) {
        root.$message.error('获取优惠券列表失败')
      } finally {
        loading.value = false
      }
    }

    // 表格变化处理
    const handleTableChange = (pagination) => {
      currentPage.value = pagination.current
      pageSize.value = pagination.pageSize
      fetchCoupons()
    }

    // 打开编辑Dialog
    const handleEdit = (coupon) => {
      editingCoupon.value = coupon
      isEditDialogOpen.value = true
    }

    // 切换状态
    const handleToggleStatus = async (coupon) => {
      try {
        await CouponService.toggleCouponStatus(coupon.id)
        root.$message.success(`已${coupon.status === 'enabled' ? '停用' : '启用'}优惠券`)
        fetchCoupons()
      } catch (error) {
        root.$message.error('操作失败')
      }
    }

    // Dialog成功回调
    const handleDialogSuccess = () => {
      isCreateDialogOpen.value = false
      isEditDialogOpen.value = false
      fetchCoupons()
    }

    // 跳转到操作记录
    const goToOperationLogs = () => {
      root.$router.push('/platform-admin/coupon-management/operation-logs')
    }

    // 获取优惠券类型文本
    const getCouponTypeText = (type) => {
      const map = {
        full_reduction: '满减券',
        discount: '折扣券',
        instant_reduction: '立减券'
      }
      return map[type] || type
    }

    // 获取优惠券内容
    const getCouponContent = (coupon) => {
      if (coupon.type === 'full_reduction') {
        return `满${coupon.threshold}元减${coupon.amount}元`
      } else if (coupon.type === 'discount') {
        return `${coupon.discount}折，最高${coupon.maxDiscount}元`
      } else if (coupon.type === 'instant_reduction') {
        return `立减${coupon.amount}元`
      }
      return '-'
    }

    // 获取优惠券类型样式
    const getCouponTypeBadgeClass = (type) => {
      const classMap = {
        full_reduction: 'tag-orange',
        discount: 'tag-green',
        instant_reduction: 'tag-blue'
      }
      return classMap[type] || ''
    }

    // 获取有效期文本
    const getValidDaysText = (days) => {
      if (days === 0) return '永久有效'
      return `${days}天`
    }

    // 格式化日期
    const formatDate = (datetime) => {
      if (!datetime) return '-'
      return dayjs(datetime).format('YYYY-MM-DD')
    }

    // 格式化时间
    const formatTime = (datetime) => {
      if (!datetime) return '-'
      return dayjs(datetime).format('HH:mm:ss')
    }

    onMounted(() => {
      fetchCoupons()
    })

    return {
      loading,
      coupons,
      columns,
      paginationConfig,
      isCreateDialogOpen,
      isEditDialogOpen,
      editingCoupon,
      handleTableChange,
      handleEdit,
      handleToggleStatus,
      handleDialogSuccess,
      goToOperationLogs,
      getCouponTypeText,
      getCouponContent,
      getCouponTypeBadgeClass,
      getValidDaysText,
      formatDate,
      formatTime
    }
  }
})
</script>

<style scoped lang="less">
@import '@/styles/variables.less';

.coupon-list-page {
  padding: 24px;
  max-width: 1800px;
  margin: 0 auto;
}

// 卡片样式
.list-card {
  border-radius: @border-radius-lg;
  border: 1px solid @border-primary;
  box-shadow: @shadow-sm;

  :deep(.ant-card-head) {
    border-bottom: 1px solid @bg-tertiary;
    padding: 16px 24px;
  }

  :deep(.ant-card-body) {
    padding: 0;
  }
}

.card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}

.card-title {
  font-size: @font-size-lg;
  font-weight: @font-weight-semibold;
  color: @text-primary;
}

.header-actions {
  display: flex;
  gap: 8px;
}

// 自定义表格样式
.custom-table {
  :deep(.ant-table) {
    font-size: @font-size-base;
  }

  :deep(.ant-table-thead > tr > th) {
    background: @bg-secondary;
    border-bottom: 1px solid @border-primary;
    color: @text-primary;
    font-weight: @font-weight-semibold;
    font-size: @font-size-base;
    padding: 12px 16px;
  }

  :deep(.ant-table-tbody > tr) {
    &:hover > td {
      background: @bg-hover;
    }

    > td {
      border-bottom: 1px solid @border-primary;
      padding: 12px 16px;
      color: @text-primary;
    }
  }

  :deep(.ant-table-pagination) {
    padding: 16px 24px;
  }
}

// ID 文本
.id-text {
  font-family: @font-family;
  font-weight: @font-weight-medium;
  color: @text-primary;
  font-size: @font-size-sm;
}

// 名称文本
.name-text {
  color: @text-primary;
  font-size: @font-size-base;
}

// 内容文本
.content-text {
  color: @text-primary;
  font-size: @font-size-sm;
  font-weight: @font-weight-medium;
}

// 备注文本
.remark-text {
  color: @text-primary;
  font-size: @font-size-sm;
  max-width: 120px;
  display: inline-block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

// 有效期文本
.valid-text {
  color: @text-primary;
  font-size: @font-size-sm;
}

// 费用承担文本
.ratio-text {
  font-size: @font-size-sm;

  div {
    color: @text-primary;
    line-height: 1.5;
  }

  .ratio-merchant {
    color: @text-secondary;
    margin-top: 2px;
  }
}

// 日期时间单元格
.datetime-cell {
  .date {
    display: block;
    color: @text-primary;
    font-size: @font-size-base;
    line-height: 1.5;
  }

  .time {
    display: block;
    color: @text-secondary;
    font-size: @font-size-sm;
    line-height: 1.5;
    margin-top: 2px;
  }
}

// 标签样式
.tag-orange {
  color: #c2410c;
  background: #fff7ed;
  border-color: #fed7aa;
}

.tag-green {
  color: #15803d;
  background: #f0fdf4;
  border-color: #bbf7d0;
}

.tag-blue {
  color: #1d4ed8;
  background: #eff6ff;
  border-color: #bfdbfe;
}

.tag-gray {
  color: #64748b;
  background: #f8fafc;
  border-color: #cbd5e1;
}

:deep(.ant-tag) {
  margin: 0;
  padding: 2px 8px;
  font-size: @font-size-xs;
  font-weight: @font-weight-medium;
  line-height: 20px;
  border-radius: @border-radius-sm;
  border-width: 1px;
}

// 操作按钮
.action-btns {
  display: flex;
  gap: 8px;
  justify-content: center;

  .ant-btn-sm {
    height: 28px;
    padding: 0 12px;
    font-size: @font-size-sm;
  }
}
</style>
