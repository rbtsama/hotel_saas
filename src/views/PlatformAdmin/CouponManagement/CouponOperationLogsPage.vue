<template>
  <sidebar>
    <div class="page-container">
      <!-- 操作记录卡片 -->
      <a-card :bordered="false" class="logs-card">
        <template #title>
          <div class="header-container">
            <a-button @click="goBack" class="back-button">
              <a-icon type="arrow-left" />
              返回
            </a-button>
            <span class="title">优惠券操作记录</span>
          </div>
        </template>

        <a-table
          :columns="columns"
          :data-source="tableData"
          :loading="isLoading"
          :pagination="pagination"
          @change="handleTableChange"
          rowKey="id"
          size="middle"
        >
          <!-- 操作类型 -->
          <template slot="operationType" slot-scope="text">
            <a-tag :class="getOperationTypeClass(text)">
              {{ getOperationTypeName(text) }}
            </a-tag>
          </template>
        </a-table>
      </a-card>
    </div>
  </sidebar>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import Sidebar from '@/components/Layout/Sidebar.vue'
import CouponService from './services/coupon.service'

export default defineComponent({
  name: 'CouponOperationLogsPage',
  components: { Sidebar },

  data() {
    return {
      tableData: [],
      isLoading: false,
      pagination: {
        current: 1,
        pageSize: 20,
        total: 0,
        showSizeChanger: true,
        showQuickJumper: true,
        pageSizeOptions: ['10', '20', '50', '100'],
        showTotal: (total: number) => `共 ${total} 条`
      },
      columns: [
        {
          title: '优惠券ID',
          dataIndex: 'couponId',
          key: 'couponId',
          width: 150
        },
        {
          title: '优惠券名称',
          dataIndex: 'couponName',
          key: 'couponName',
          width: 200
        },
        {
          title: '操作类型',
          dataIndex: 'operationType',
          key: 'operationType',
          width: 100,
          scopedSlots: { customRender: 'operationType' }
        },
        {
          title: '操作描述',
          dataIndex: 'description',
          key: 'description'
        },
        {
          title: '操作时间',
          dataIndex: 'operatedAt',
          key: 'operatedAt',
          width: 180
        },
        {
          title: '操作人',
          dataIndex: 'operatedBy',
          key: 'operatedBy',
          width: 120
        }
      ]
    }
  },

  async mounted() {
    await this.loadData()
  },

  methods: {
    async loadData() {
      this.isLoading = true
      try {
        const result = await CouponService.getOperationLogs({
          page: this.pagination.current,
          pageSize: this.pagination.pageSize
        })
        this.tableData = result.data
        this.pagination.total = result.total
      } catch (error) {
        console.error('Failed to load operation logs:', error)
        this.$message.error('加载操作记录失败')
      } finally {
        this.isLoading = false
      }
    },

    async handleTableChange(pagination: any) {
      this.pagination.current = pagination.current
      this.pagination.pageSize = pagination.pageSize
      await this.loadData()
    },

    goBack() {
      this.$router.push('/platform-admin/coupon-management/list')
    },

    getOperationTypeName(type: string): string {
      const map: Record<string, string> = {
        create: '创建',
        edit: '编辑',
        enable: '启用',
        disable: '停用',
        delete: '删除'
      }
      return map[type] || type
    },

    getOperationTypeClass(type: string): string {
      const map: Record<string, string> = {
        create: 'operation-tag-create',
        edit: 'operation-tag-edit',
        enable: 'operation-tag-enable',
        disable: 'operation-tag-disable',
        delete: 'operation-tag-delete'
      }
      return map[type] || ''
    }
  }
})
</script>

<style scoped lang="less">
.page-container {
  padding: 24px;
  background: #f0f2f5;
  min-height: calc(100vh - 0px);

  .logs-card {
    border-radius: 12px;
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  }

  .header-container {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .back-button {
    height: 32px;
    border-color: #cbd5e1;
  }

  .title {
    font-size: 18px;
    font-weight: 600;
    color: #0f172a;
  }

  .target-users {
    max-width: 200px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}

/* 操作类型标签样式 */
.operation-tag-create {
  background-color: #dcfce7;
  color: #15803d;
  border-color: #86efac;
}

.operation-tag-edit {
  background-color: #dbeafe;
  color: #1d4ed8;
  border-color: #93c5fd;
}

.operation-tag-enable {
  background-color: #dcfce7;
  color: #15803d;
  border-color: #86efac;
}

.operation-tag-disable {
  background-color: #ffedd5;
  color: #c2410c;
  border-color: #fdba74;
}

.operation-tag-delete {
  background-color: #fee2e2;
  color: #b91c1c;
  border-color: #fca5a5;
}

:deep(.ant-table-tbody > tr:hover > td) {
  background-color: #f8fafc !important;
}
</style>
