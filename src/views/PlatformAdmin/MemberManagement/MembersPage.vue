<template>
  <Sidebar>
    <div class="page-container">
      <!-- 搜索和筛选卡片 -->
      <a-card :bordered="false" class="filter-card">
        <div class="filter-container">
          <a-input
            v-model:value="filters.merchantName"
            placeholder="输入关联商户"
            style="width: 280px"
            @change="handleSearch"
          />

          <a-select
            v-model:value="filters.accountStatus"
            style="width: 160px"
            placeholder="全部状态"
            @change="handleSearch"
          >
            <a-select-option value="all">全部状态</a-select-option>
            <a-select-option value="pre_register">预注册</a-select-option>
            <a-select-option value="registered">注册</a-select-option>
            <a-select-option value="disabled">禁用</a-select-option>
          </a-select>

          <a-select
            v-model:value="filters.memberLevel"
            style="width: 160px"
            placeholder="全部等级"
            @change="handleSearch"
          >
            <a-select-option value="all">全部等级</a-select-option>
            <a-select-option v-for="level in 10" :key="level - 1" :value="String(level - 1)">
              VIP{{ level - 1 }}
            </a-select-option>
          </a-select>

          <a-button type="primary" @click="handleSearch" :loading="isLoading">
            <SearchOutlined />
            搜索
          </a-button>

          <a-button @click="handleReset">重置</a-button>

          <a-button
            type="primary"
            style="margin-left: auto"
            @click="handleExport"
            :loading="isExporting"
          >
            <DownloadOutlined />
            导出
          </a-button>
        </div>
      </a-card>

      <!-- 会员列表卡片 -->
      <a-card :bordered="false" class="list-card">
        <template #title>
          <span>会员列表</span>
        </template>

        <a-table
          :columns="columns"
          :data-source="tableData"
          :loading="isLoading"
          :pagination="pagination"
          @change="handleTableChange"
          rowKey="id"
          size="small"
          :scroll="{ x: 1200 }"
        >
          <!-- 账号状态列 -->
          <template #bodyCell="_, record, index" v-if="index === 1">
            <a-tag :color="getStatusColor(record.accountStatus)">
              {{ getStatusLabel(record.accountStatus) }}
            </a-tag>
          </template>

          <!-- 会员等级列 -->
          <template #bodyCell="cell">
            <span v-if="cell.column.dataIndex === 'currentLevel'" style="color: #ff7a1f; font-weight: bold">
              VIP{{ cell.text }}
            </span>
            <span v-else-if="cell.column.dataIndex === 'accountStatus'">
              <a-tag :color="getStatusColor(cell.text)">
                {{ getStatusLabel(cell.text) }}
              </a-tag>
            </span>
            <span v-else>{{ cell.text }}</span>
          </template>
        </a-table>

        <div v-if="tableData.length === 0" class="empty-state">暂无会员数据</div>
      </a-card>
    </div>
  </Sidebar>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { message } from 'ant-design-vue'
import Sidebar from '@/components/Layout/Sidebar.vue'
import { SearchOutlined, DownloadOutlined } from '@ant-design/icons-vue'
import type {
  MemberQueryRecord,
  MemberQueryFilterParams,
} from './types/member.types'
import { AccountStatusLabels } from './types/member.types'
import memberService from './services/member.service'

interface FilterState {
  accountStatus: string | undefined
  memberLevel: string | undefined
  merchantName: string | undefined
}

export default defineComponent({
  name: 'MembersPage',
  components: {
    Sidebar,
    SearchOutlined,
    DownloadOutlined,
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
        },
        {
          title: '账号状态',
          dataIndex: 'accountStatus',
          key: 'accountStatus',
          width: 100,
        },
        {
          title: '会员等级',
          dataIndex: 'currentLevel',
          key: 'currentLevel',
          width: 100,
        },
        {
          title: '正式会员等级',
          dataIndex: 'formalLevel',
          key: 'formalLevel',
          width: 120,
        },
        {
          title: '有效期至',
          dataIndex: 'formalExpiryDate',
          key: 'formalExpiryDate',
          width: 120,
        },
        {
          title: '导入商户',
          dataIndex: 'relatedMerchant',
          key: 'relatedMerchant',
          width: 120,
        },
        {
          title: '赠送会员等级',
          dataIndex: 'giftLevel',
          key: 'giftLevel',
          width: 120,
          customRender: (record: any) => record.text === 0 ? '-' : `VIP${record.text}`,
        },
        {
          title: '赠送有效期',
          dataIndex: 'giftExpiryDate',
          key: 'giftExpiryDate',
          width: 120,
        },
        {
          title: '赠送人',
          dataIndex: 'giftFrom',
          key: 'giftFrom',
          width: 120,
        },
        {
          title: '更新时间',
          dataIndex: 'updatedAt',
          key: 'updatedAt',
          width: 160,
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
      link.setAttribute('download', `members-${Date.now()}.csv`)
      link.style.visibility = 'hidden'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    },
    getStatusLabel(status: string): string {
      return AccountStatusLabels[status as keyof typeof AccountStatusLabels] || status
    },
    getStatusColor(status: string): string {
      switch (status) {
        case 'pre_register':
          return 'blue'
        case 'registered':
          return 'green'
        case 'disabled':
          return 'red'
        default:
          return 'default'
      }
    },
  },
})
</script>

<style scoped lang="less">
.page-container {
  padding: 24px;
  background: #f0f2f5;
  min-height: calc(100vh - 0px);

  .filter-card {
    margin-bottom: 24px;
    border-radius: 4px;
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.03), 0 1px 6px -1px rgba(0, 0, 0, 0.02), 0 2px 4px 0 rgba(0, 0, 0, 0.02);
  }

  .filter-container {
    display: flex;
    gap: 12px;
    align-items: center;
    flex-wrap: wrap;
  }

  .list-card {
    border-radius: 4px;
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.03), 0 1px 6px -1px rgba(0, 0, 0, 0.02), 0 2px 4px 0 rgba(0, 0, 0, 0.02);
  }

  .empty-state {
    text-align: center;
    padding: 48px 0;
    color: #999;
  }
}
</style>
