<template>
  <sidebar>
    <div class="page-container">
      <!-- 发放记录卡片 -->
      <a-card :bordered="false" class="records-card">
        <template #title>
          <div class="header-container">
            <a-button @click="goBack" class="back-button">
              <a-icon type="arrow-left" />
              返回
            </a-button>
            <span class="title">优惠券发放记录</span>
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
          <!-- 发放方式 -->
          <template slot="distributionType" slot-scope="text">
            <a-tag class="distribution-tag">
              {{ getDistributionTypeName(text) }}
            </a-tag>
          </template>

          <!-- 目标用户 -->
          <template slot="targetUsers" slot-scope="text">
            <div class="target-users">{{ text }}</div>
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
  name: 'CouponIssueRecordsPage',
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
          title: '优惠券',
          dataIndex: 'couponId',
          key: 'couponId',
          width: 180
        },
        {
          title: '发放方式',
          dataIndex: 'distributionType',
          key: 'distributionType',
          width: 120,
          scopedSlots: { customRender: 'distributionType' }
        },
        {
          title: '目标用户',
          dataIndex: 'targetUsers',
          key: 'targetUsers',
          scopedSlots: { customRender: 'targetUsers' }
        },
        {
          title: '发放数量',
          dataIndex: 'count',
          key: 'count',
          width: 100
        },
        {
          title: '发放时间',
          dataIndex: 'createdAt',
          key: 'createdAt',
          width: 180
        },
        {
          title: '操作人',
          dataIndex: 'createdBy',
          key: 'createdBy',
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
        const result = await CouponService.getIssueRecords({
          page: this.pagination.current,
          pageSize: this.pagination.pageSize
        })
        this.tableData = result.data
        this.pagination.total = result.total
      } catch (error) {
        console.error('Failed to load issue records:', error)
        this.$message.error('加载发放记录失败')
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
      this.$router.push('/platform-admin/coupon-management/issue')
    },

    getDistributionTypeName(type: string): string {
      const map: Record<string, string> = {
        manual_phone: '手机号',
        manual_vip: 'VIP等级',
        auto: '自动发放'
      }
      return map[type] || type
    }
  }
})
</script>

<style scoped lang="less">
.page-container {
  padding: 24px;
  background: #f0f2f5;
  min-height: calc(100vh - 0px);

  .records-card {
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

  .distribution-tag {
    border-color: #cbd5e1;
  }

  .target-users {
    max-width: 200px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 14px;
    color: #0f172a;
  }
}

:deep(.ant-table-tbody > tr:hover > td) {
  background-color: #f8fafc !important;
}
</style>
