<template>
  <sidebar>
    <div class="issue-records-page">
      <!-- 发放记录卡片 -->
      <a-card :bordered="false" class="records-card">
        <template slot="title">
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
          :scroll="{ x: 1200 }"
          @change="handleTableChange"
          rowKey="couponId"
          class="custom-table"
        >
          <!-- 优惠券名称 -->
          <template slot="couponName" slot-scope="text">
            <span class="coupon-text">{{ text }}</span>
          </template>

          <!-- 优惠券类型 -->
          <template slot="couponType" slot-scope="type">
            <a-tag :class="getCouponTypeClass(type)">
              {{ getCouponTypeName(type) }}
            </a-tag>
          </template>

          <!-- 发放方式 -->
          <template slot="distributionType" slot-scope="type">
            <a-tag class="tag-blue">{{ getDistributionTypeName(type) }}</a-tag>
          </template>

          <!-- 目标用户 -->
          <template slot="userPhone" slot-scope="text, record">
            <div class="target-users">
              <template v-if="text === '多手机号'">
                <a-tooltip placement="topLeft">
                  <template slot="title">
                    <div v-if="record.phones">
                      <div v-for="phone in record.phones" :key="phone">{{ phone }}</div>
                    </div>
                    <div v-else-if="record.vipLevels">
                      VIP等级: {{ record.vipLevels.join(', ') }}
                    </div>
                  </template>
                  <span style="cursor: help;">{{ text }} <a-icon type="info-circle" /></span>
                </a-tooltip>
              </template>
              <template v-else>
                {{ text }}
              </template>
            </div>
          </template>

          <!-- 发放时间 -->
          <template slot="operatedAt" slot-scope="datetime">
            <div class="datetime-cell">
              <div class="date">{{ formatDate(datetime) }}</div>
              <div class="time">{{ formatTime(datetime) }}</div>
            </div>
          </template>

          <!-- 操作人 -->
          <template slot="operatedBy" slot-scope="text">
            <span class="creator-text">{{ text }}</span>
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
import dayjs from 'dayjs'

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
          dataIndex: 'couponName',
          key: 'couponName',
          width: 200,
          scopedSlots: { customRender: 'couponName' }
        },
        {
          title: '优惠券类型',
          dataIndex: 'couponType',
          key: 'couponType',
          width: 100,
          scopedSlots: { customRender: 'couponType' }
        },
        {
          title: '发放方式',
          dataIndex: 'distributionType',
          key: 'distributionType',
          width: 100,
          scopedSlots: { customRender: 'distributionType' }
        },
        {
          title: '目标用户',
          dataIndex: 'userPhone',
          key: 'userPhone',
          width: 150,
          scopedSlots: { customRender: 'userPhone' }
        },
        {
          title: '发放时间',
          dataIndex: 'operatedAt',
          key: 'operatedAt',
          width: 120,
          scopedSlots: { customRender: 'operatedAt' }
        },
        {
          title: '操作人',
          dataIndex: 'operatedBy',
          key: 'operatedBy',
          width: 120,
          scopedSlots: { customRender: 'operatedBy' }
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
        const result = await CouponService.getCouponRecords({
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
        manual_phone: '手机号发放',
        manual_vip: 'VIP等级发放',
        registration: '注册发放',
        checkout: '离店发放'
      }
      return map[type] || type
    },

    getCouponTypeName(type: string): string {
      const map: Record<string, string> = {
        full_reduction: '满减券',
        discount: '折扣券',
        instant_reduction: '立减券'
      }
      return map[type] || type
    },

    getCouponTypeClass(type: string): string {
      const map: Record<string, string> = {
        full_reduction: 'tag-orange',
        discount: 'tag-green',
        instant_reduction: 'tag-blue'
      }
      return map[type] || ''
    },

    formatDate(datetime: string): string {
      if (!datetime) return '-'
      return dayjs(datetime).format('YYYY-MM-DD')
    },

    formatTime(datetime: string): string {
      if (!datetime) return '-'
      return dayjs(datetime).format('HH:mm:ss')
    }
  }
})
</script>

<style scoped lang="less">
@import '@/styles/variables.less';

.issue-records-page {
  padding: 24px;
  max-width: 1800px;
  margin: 0 auto;

  .records-card {
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

  .header-container {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .back-button {
    height: 32px;
    padding: 0 12px;
  }

  .title {
    font-size: @font-size-lg;
    font-weight: @font-weight-semibold;
    color: @text-primary;
  }
}

// 自定义表格样式
.custom-table {
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

// 优惠券文本
.coupon-text {
  font-family: @font-family;
  font-weight: @font-weight-medium;
  color: @text-primary;
  font-size: @font-size-base;
}

// 目标用户
.target-users {
  max-width: 300px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: @font-size-sm;
  color: @text-primary;
}

// 数量文本
.count-text {
  font-family: @font-family;
  font-weight: @font-weight-medium;
  color: @text-primary;
  font-size: @font-size-base;
}

// 操作人文本
.creator-text {
  color: @text-secondary;
  font-size: @font-size-sm;
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

:deep(.ant-tag) {
  margin: 0;
  padding: 2px 8px;
  font-size: @font-size-xs;
  font-weight: @font-weight-medium;
  line-height: 20px;
  border-radius: @border-radius-sm;
  border-width: 1px;
}
</style>
