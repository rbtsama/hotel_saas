<template>
  <Sidebar>
    <div class="members-page">
      <!-- 搜索和筛选卡片 -->
      <a-card :bordered="false" class="filter-card">
        <div class="filter-container">
          <a-input
            v-model="filters.merchantName"
            placeholder="输入关联商户"
            style="width: 200px"
            @pressEnter="handleSearch"
          >
            <a-icon slot="prefix" type="shop" />
          </a-input>

          <a-select
            v-model="filters.accountStatus"
            style="width: 140px"
            placeholder="全部状态"
            @change="handleSearch"
          >
            <a-select-option value="all">全部状态</a-select-option>
            <a-select-option value="pre_register">预注册</a-select-option>
            <a-select-option value="registered">注册</a-select-option>
            <a-select-option value="disabled">禁用</a-select-option>
          </a-select>

          <a-select
            v-model="filters.memberLevel"
            style="width: 140px"
            placeholder="全部等级"
            @change="handleSearch"
          >
            <a-select-option value="all">全部等级</a-select-option>
            <a-select-option v-for="level in 10" :key="level - 1" :value="String(level - 1)">
              VIP{{ level - 1 }}
            </a-select-option>
          </a-select>

          <a-button type="primary" @click="handleSearch" :loading="isLoading">
            <a-icon type="search" />
            搜索
          </a-button>

          <a-button @click="handleReset">重置</a-button>

          <a-button
            type="primary"
            style="margin-left: auto"
            @click="handleExport"
            :loading="isExporting"
            class="export-btn"
          >
            <a-icon type="download" />
            导出数据
          </a-button>
        </div>
      </a-card>

      <!-- 会员列表卡片 -->
      <a-card :bordered="false" class="list-card">
        <template #title>
          <span class="card-title">会员列表</span>
        </template>

        <a-table
          :columns="columns"
          :data-source="tableData"
          :loading="isLoading"
          :pagination="pagination"
          @change="handleTableChange"
          rowKey="id"
          :scroll="{ x: 1400 }"
          class="custom-table"
        >
          <!-- 手机号 -->
          <template slot="phone" slot-scope="phone">
            <span class="phone-text">{{ phone }}</span>
          </template>

          <!-- 账号状态 -->
          <template slot="accountStatus" slot-scope="text">
            <a-tag :class="getStatusClass(text)">
              {{ getStatusLabel(text) }}
            </a-tag>
          </template>

          <!-- 会员等级 -->
          <template slot="currentLevel" slot-scope="text">
            <span class="vip-level">VIP{{ text }}</span>
          </template>

          <!-- 正式会员等级 -->
          <template slot="formalLevel" slot-scope="text">
            <span class="level-text">VIP{{ text }}</span>
          </template>

          <!-- 有效期至 -->
          <template slot="formalExpiryDate" slot-scope="date">
            <span class="date-text">{{ date || '—' }}</span>
          </template>

          <!-- 获得方式 -->
          <template slot="formalObtainMethod" slot-scope="text">
            <a-tag :class="getObtainMethodClass(text)">
              {{ getObtainMethodLabel(text) }}
            </a-tag>
          </template>

          <!-- 关联商户 -->
          <template slot="relatedMerchant" slot-scope="text">
            <span class="merchant-text">{{ text || '—' }}</span>
          </template>

          <!-- 赠送会员等级 -->
          <template slot="giftLevel" slot-scope="text">
            <span class="level-text">{{ text === 0 ? '—' : `VIP${text}` }}</span>
          </template>

          <!-- 赠送有效期 -->
          <template slot="giftExpiryDate" slot-scope="date">
            <span class="date-text">{{ date || '—' }}</span>
          </template>

          <!-- 赠送人 -->
          <template slot="giftFrom" slot-scope="text">
            <span class="gift-from-text">{{ text || '—' }}</span>
          </template>

          <!-- 更新时间 -->
          <template slot="updatedAt" slot-scope="datetime">
            <div class="datetime-cell">
              <div class="date">{{ formatDate(datetime) }}</div>
              <div class="time">{{ formatTime(datetime) }}</div>
            </div>
          </template>
        </a-table>

        <div v-if="tableData.length === 0 && !isLoading" class="empty-state">
          暂无会员数据
        </div>
      </a-card>
    </div>
  </Sidebar>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import { message } from 'ant-design-vue'
import Sidebar from '@/components/Layout/Sidebar.vue'
import type {
  MemberQueryRecord,
  MemberQueryFilterParams,
} from './types/member.types'
import { AccountStatusLabels, ObtainMethodLabels } from './types/member.types'
import memberService from './services/member.service'
import dayjs from 'dayjs'

interface FilterState {
  accountStatus: string | undefined
  memberLevel: string | undefined
  merchantName: string | undefined
}

export default defineComponent({
  name: 'MembersPage',
  components: {
    Sidebar,
  },
  data() {
    return {
      tableData: [] as MemberQueryRecord[],
      isLoading: false,
      isExporting: false,
      filters: {
        accountStatus: 'all',
        memberLevel: 'all',
        merchantName: '',
      } as FilterState,
      pagination: {
        current: 1,
        pageSize: 10,
        total: 0,
        showSizeChanger: true,
        showQuickJumper: true,
        pageSizeOptions: ['10', '20', '50', '100'],
        showTotal: (total: number) => `共 ${total} 条`,
      },
      columns: [
        {
          title: '手机号',
          dataIndex: 'phone',
          key: 'phone',
          width: 120,
          scopedSlots: { customRender: 'phone' }
        },
        {
          title: '账号状态',
          dataIndex: 'accountStatus',
          key: 'accountStatus',
          width: 90,
          scopedSlots: { customRender: 'accountStatus' }
        },
        {
          title: '会员等级',
          dataIndex: 'currentLevel',
          key: 'currentLevel',
          width: 90,
          scopedSlots: { customRender: 'currentLevel' }
        },
        {
          title: '正式等级',
          dataIndex: 'formalLevel',
          key: 'formalLevel',
          width: 90,
          scopedSlots: { customRender: 'formalLevel' }
        },
        {
          title: '有效期至',
          dataIndex: 'formalExpiryDate',
          key: 'formalExpiryDate',
          width: 110,
          scopedSlots: { customRender: 'formalExpiryDate' }
        },
        {
          title: '获得方式',
          dataIndex: 'formalObtainMethod',
          key: 'formalObtainMethod',
          width: 100,
          scopedSlots: { customRender: 'formalObtainMethod' }
        },
        {
          title: '关联商户',
          dataIndex: 'relatedMerchant',
          key: 'relatedMerchant',
          width: 150,
          scopedSlots: { customRender: 'relatedMerchant' }
        },
        {
          title: '赠送等级',
          dataIndex: 'giftLevel',
          key: 'giftLevel',
          width: 90,
          scopedSlots: { customRender: 'giftLevel' }
        },
        {
          title: '赠送有效期',
          dataIndex: 'giftExpiryDate',
          key: 'giftExpiryDate',
          width: 110,
          scopedSlots: { customRender: 'giftExpiryDate' }
        },
        {
          title: '赠送人',
          dataIndex: 'giftFrom',
          key: 'giftFrom',
          width: 120,
          scopedSlots: { customRender: 'giftFrom' }
        },
        {
          title: '更新时间',
          dataIndex: 'updatedAt',
          key: 'updatedAt',
          width: 120,
          scopedSlots: { customRender: 'updatedAt' }
        },
      ],
    }
  },
  async mounted() {
    await this.loadData()
  },
  methods: {
    async loadData() {
      this.isLoading = true
      try {
        const params: MemberQueryFilterParams & { page?: number; pageSize?: number } = {
          page: this.pagination.current,
          pageSize: this.pagination.pageSize,
        }

        if (this.filters.accountStatus && this.filters.accountStatus !== 'all') {
          params.accountStatus = this.filters.accountStatus as any
        }
        if (this.filters.memberLevel && this.filters.memberLevel !== 'all') {
          params.memberLevel = parseInt(this.filters.memberLevel, 10)
        }
        if (this.filters.merchantName) {
          params.merchantName = this.filters.merchantName
        }

        const result = await memberService.getMemberQueryList(params)
        this.tableData = result.list
        this.pagination.total = result.total
      } catch (error) {
        console.error('Failed to load member data:', error)
        message.error('加载会员数据失败')
      } finally {
        this.isLoading = false
      }
    },
    async handleSearch() {
      this.pagination.current = 1
      await this.loadData()
    },
    handleReset() {
      this.filters = {
        accountStatus: 'all',
        memberLevel: 'all',
        merchantName: '',
      }
      this.pagination.current = 1
      this.loadData()
    },
    async handleTableChange(pagination: any) {
      this.pagination.current = pagination.current
      this.pagination.pageSize = pagination.pageSize
      await this.loadData()
    },
    async handleExport() {
      this.isExporting = true
      try {
        const params: MemberQueryFilterParams = {}
        if (this.filters.accountStatus && this.filters.accountStatus !== 'all') {
          params.accountStatus = this.filters.accountStatus as any
        }
        if (this.filters.memberLevel && this.filters.memberLevel !== 'all') {
          params.memberLevel = parseInt(this.filters.memberLevel, 10)
        }
        if (this.filters.merchantName) {
          params.merchantName = this.filters.merchantName
        }

        const data = await memberService.exportMembers(params)
        this.downloadCSV(data)
        message.success('导出成功')
      } catch (error) {
        console.error('Failed to export members:', error)
        message.error('导出失败')
      } finally {
        this.isExporting = false
      }
    },
    downloadCSV(data: MemberQueryRecord[]) {
      const headers = ['手机号', '账号状态', '会员等级', '正式会员等级', '有效期至', '导入商户', '赠送会员等级', '赠送有效期', '赠送人', '更新时间']
      const rows = data.map(record => [
        record.phone,
        this.getStatusLabel(record.accountStatus),
        `VIP${record.currentLevel}`,
        `VIP${record.formalLevel}`,
        record.formalExpiryDate,
        record.relatedMerchant,
        record.giftLevel === 0 ? '-' : `VIP${record.giftLevel}`,
        record.giftExpiryDate,
        record.giftFrom,
        record.updatedAt,
      ])

      const csv = [headers, ...rows].map(row => row.map(cell => `"${cell}"`).join(',')).join('\n')
      const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8;' })
      const link = document.createElement('a')
      const url = URL.createObjectURL(blob)
      link.setAttribute('href', url)
      link.setAttribute('download', `会员数据-${dayjs().format('YYYYMMDD-HHmmss')}.csv`)
      link.style.visibility = 'hidden'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    },
    getStatusLabel(status: string): string {
      return AccountStatusLabels[status as keyof typeof AccountStatusLabels] || status
    },
    getStatusClass(status: string): string {
      const classMap: Record<string, string> = {
        'pre_register': 'tag-blue',
        'registered': 'tag-green',
        'disabled': 'tag-red'
      }
      return classMap[status] || 'tag-gray'
    },
    getObtainMethodLabel(method: string): string {
      return ObtainMethodLabels[method as keyof typeof ObtainMethodLabels] || method
    },
    getObtainMethodClass(method: string): string {
      const classMap: Record<string, string> = {
        'purchase': 'tag-blue',
        'gift': 'tag-purple',
        'upgrade': 'tag-green',
        'import': 'tag-orange'
      }
      return classMap[method] || ''
    },
    formatDate(datetime: string): string {
      if (!datetime) return '-'
      return dayjs(datetime).format('YYYY-MM-DD')
    },
    formatTime(datetime: string): string {
      if (!datetime) return '-'
      return dayjs(datetime).format('HH:mm:ss')
    },
  },
})
</script>

<style scoped lang="less">
@import '@/styles/variables.less';

.members-page {
  padding: 24px;
  max-width: 1800px;
  margin: 0 auto;

  .filter-card {
    margin-bottom: 20px;
    border-radius: @border-radius-lg;
    border: 1px solid @border-primary;
    box-shadow: @shadow-sm;

    :deep(.ant-card-body) {
      padding: 20px 24px;
    }
  }

  .filter-container {
    display: flex;
    gap: 12px;
    align-items: center;
    flex-wrap: wrap;
  }

  .export-btn {
    background: #10b981;
    border-color: #10b981;

    &:hover {
      background: #059669;
      border-color: #059669;
    }
  }

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

  .card-title {
    font-size: @font-size-lg;
    font-weight: @font-weight-semibold;
    color: @text-primary;
  }

  .empty-state {
    text-align: center;
    padding: 48px 0;
    color: @text-tertiary;
    font-size: @font-size-base;
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

// 手机号文本（不使用特殊字体）
.phone-text {
  font-family: @font-family;
  font-weight: @font-weight-medium;
  color: @text-primary;
  font-size: @font-size-base;
}

// VIP 等级高亮
.vip-level {
  color: #f97316;
  font-weight: @font-weight-semibold;
  font-size: @font-size-base;
}

// 等级文本
.level-text {
  color: @text-primary;
  font-size: @font-size-sm;
}

// 日期文本
.date-text {
  color: @text-primary;
  font-size: @font-size-sm;
}

// 方式文本
.method-text {
  color: @text-secondary;
  font-size: @font-size-sm;
}

// 商户文本
.merchant-text {
  color: @text-primary;
  font-size: @font-size-sm;
}

// 赠送人文本
.gift-from-text {
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
.tag-blue {
  color: #1d4ed8;
  background: #eff6ff;
  border-color: #bfdbfe;
}

.tag-purple {
  color: #7c3aed;
  background: #f5f3ff;
  border-color: #ddd6fe;
}

.tag-green {
  color: #15803d;
  background: #f0fdf4;
  border-color: #bbf7d0;
}

.tag-orange {
  color: #c2410c;
  background: #fff7ed;
  border-color: #fed7aa;
}

.tag-red {
  color: #b91c1c;
  background: #fee2e2;
  border-color: #fca5a5;
}

.tag-gray {
  color: #64748b;
  background: #f8fafc;
  border-color: #cbd5e1;
}
</style>
