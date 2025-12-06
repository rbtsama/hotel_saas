<template>
  <sidebar>
    <div class="p-6 space-y-6">
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
      <a-card class="rounded-xl border-slate-200 bg-white shadow-sm">
        <div slot="title" class="flex items-center justify-between">
          <span class="text-lg font-semibold text-slate-900">优惠券列表</span>
          <div class="flex items-center gap-2">
            <a-button class="h-9 border-slate-300" @click="goToOperationLogs">
              <a-icon type="history" />
              操作记录
            </a-button>
            <a-button type="primary" class="h-9 bg-blue-600" @click="isCreateDialogOpen = true">
              <a-icon type="plus" />
              创建优惠券
            </a-button>
          </div>
        </div>

        <div class="border border-slate-200 rounded-lg overflow-hidden">
          <a-table
            :columns="columns"
            :data-source="coupons"
            :pagination="paginationConfig"
            :loading="loading"
            row-key="id"
            @change="handleTableChange"
          >
            <!-- 优惠券类型 -->
            <template slot="type" slot-scope="type">
              <a-tag :class="getCouponTypeBadgeClass(type)" class="border">
                {{ getCouponTypeText(type) }}
              </a-tag>
            </template>

            <!-- 备注说明 -->
            <template slot="remark" slot-scope="remark">
              <span class="text-slate-900 text-sm max-w-150 truncate" :title="remark || '-'">
                {{ remark || '-' }}
              </span>
            </template>

            <!-- 有效期 -->
            <template slot="validDays" slot-scope="validDays">
              <span class="text-slate-900 text-sm">
                {{ getValidDaysText(validDays) }}
              </span>
            </template>

            <!-- 费用承担 -->
            <template slot="ratio" slot-scope="text, record">
              <span class="text-slate-900 text-sm">
                平台{{ record.platformRatio }}% / 商户{{ record.merchantRatio }}%
              </span>
            </template>

            <!-- 短信通知 -->
            <template slot="smsNotify" slot-scope="smsNotify">
              <span :class="smsNotify ? 'text-green-600' : 'text-slate-600'">
                {{ smsNotify ? '是' : '否' }}
              </span>
            </template>

            <!-- 操作 -->
            <template slot="action" slot-scope="text, record">
              <div class="flex items-center justify-center gap-2">
                <!-- 编辑按钮 -->
                <a-button
                  size="small"
                  class="h-7 px-3 border-slate-300"
                  @click="handleEdit(record)"
                >
                  <a-icon type="edit" />
                  编辑
                </a-button>

                <!-- 启用/停用按钮 -->
                <a-button
                  size="small"
                  :type="record.status === 'enabled' ? 'danger' : 'primary'"
                  class="h-7 px-3"
                  @click="handleToggleStatus(record)"
                >
                  {{ record.status === 'enabled' ? '停用' : '启用' }}
                </a-button>
              </div>
            </template>
          </a-table>
        </div>
      </a-card>
    </div>
  </sidebar>
</template>

<script>
import { defineComponent, ref, reactive, onMounted } from '@vue/composition-api'
import Sidebar from '@/components/Layout/Sidebar.vue'
import CouponService from './services/coupon.service'

export default defineComponent({
  name: 'CouponListPage',
  components: {
    Sidebar
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
        width: 120,
        customRender: (text) => ({
          children: text,
          attrs: {
            class: 'text-slate-900 font-medium'
          }
        })
      },
      {
        title: '优惠券类型',
        dataIndex: 'type',
        key: 'type',
        width: 120,
        scopedSlots: { customRender: 'type' }
      },
      {
        title: '优惠券名称',
        dataIndex: 'name',
        key: 'name',
        width: 200,
        customRender: (text) => ({
          children: text,
          attrs: {
            class: 'text-slate-900'
          }
        })
      },
      {
        title: '备注说明',
        dataIndex: 'remark',
        key: 'remark',
        width: 150,
        scopedSlots: { customRender: 'remark' }
      },
      {
        title: '有效期',
        dataIndex: 'validDays',
        key: 'validDays',
        width: 120,
        scopedSlots: { customRender: 'validDays' }
      },
      {
        title: '费用承担',
        key: 'ratio',
        width: 180,
        scopedSlots: { customRender: 'ratio' }
      },
      {
        title: '短信通知',
        dataIndex: 'smsNotify',
        key: 'smsNotify',
        width: 100,
        align: 'center',
        scopedSlots: { customRender: 'smsNotify' }
      },
      {
        title: '创建时间',
        dataIndex: 'createdAt',
        key: 'createdAt',
        width: 160,
        customRender: (text) => ({
          children: text,
          attrs: {
            class: 'text-slate-900 text-sm'
          }
        })
      },
      {
        title: '创建人',
        dataIndex: 'createdBy',
        key: 'createdBy',
        width: 100,
        customRender: (text) => ({
          children: text,
          attrs: {
            class: 'text-slate-900 text-sm'
          }
        })
      },
      {
        title: '操作',
        key: 'action',
        width: 180,
        align: 'center',
        scopedSlots: { customRender: 'action' }
      }
    ]

    // 分页配置
    const paginationConfig = reactive({
      current: 1,
      pageSize: 10,
      total: 0,
      showSizeChanger: false,
      showTotal: (total) => `共 ${total} 条`
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

    // 获取优惠券类型样式
    const getCouponTypeBadgeClass = (type) => {
      const classMap = {
        full_reduction: 'bg-orange-50 text-orange-700 border-orange-300',
        discount: 'bg-green-50 text-green-700 border-green-300',
        instant_reduction: 'bg-blue-50 text-blue-700 border-blue-300'
      }
      return classMap[type] || 'border-slate-300 text-slate-700'
    }

    // 获取有效期文本
    const getValidDaysText = (days) => {
      if (days === 0) return '永久'
      return `发放后${days}天`
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
      getCouponTypeBadgeClass,
      getValidDaysText
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

.rounded-xl {
  border-radius: 12px;
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

.flex {
  display: flex;
}

.items-center {
  align-items: center;
}

.justify-between {
  justify-content: space-between;
}

.gap-2 {
  gap: 8px;
}

.text-lg {
  font-size: 18px;
}

.font-semibold {
  font-weight: 600;
}

.text-slate-900 {
  color: #0f172a;
}

.h-9 {
  height: 36px;
}

.bg-blue-600 {
  background-color: #2563eb;
}

.border {
  border-width: 1px;
}

.rounded-lg {
  border-radius: 8px;
}

.overflow-hidden {
  overflow: hidden;
}

.text-sm {
  font-size: 14px;
}

.max-w-150 {
  max-width: 150px;
}

.truncate {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.text-green-600 {
  color: #16a34a;
}

.text-slate-600 {
  color: #475569;
}

.h-7 {
  height: 28px;
}

.px-3 {
  padding-left: 12px;
  padding-right: 12px;
}

.border-slate-300 {
  border-color: #cbd5e1;
}

.justify-center {
  justify-content: center;
}

:deep(.ant-tag) {
  margin: 0;
  padding: 2px 8px;
  font-size: 12px;
  line-height: 20px;
  border-radius: 4px;
}

.bg-orange-50 {
  background-color: #fff7ed;
}

.text-orange-700 {
  color: #c2410c;
}

.border-orange-300 {
  border-color: #fdba74;
}

.bg-green-50 {
  background-color: #f0fdf4;
}

.text-green-700 {
  color: #15803d;
}

.border-green-300 {
  border-color: #86efac;
}

.bg-blue-50 {
  background-color: #eff6ff;
}

.text-blue-700 {
  color: #1d4ed8;
}

.border-blue-300 {
  border-color: #93c5fd;
}

.text-slate-700 {
  color: #334155;
}

:deep(.ant-table-tbody > tr:hover > td) {
  background-color: #f8fafc !important;
}
</style>
