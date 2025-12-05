<template>
  <sidebar>
    <div class="h-screen overflow-y-auto bg-slate-50">
      <div class="max-w-7xl mx-auto p-6">
        <!-- 页面头部 -->
        <div class="mb-6">
          <h1 class="text-2xl font-bold text-slate-900">积分服务配置</h1>
        </div>

        <!-- 积分奖励服务 -->
        <a-card
          :bordered="false"
          class="mb-6 rounded-xl border-slate-200 shadow-md hover:shadow-lg transition-all duration-200"
        >
          <template #title>
            <div class="flex items-center gap-2 text-base font-semibold">
              <a-icon type="gift" class="text-blue-600" />
              积分奖励
            </div>
          </template>

          <a-table
            :columns="rewardColumns"
            :data-source="config.ecoRewards"
            :pagination="false"
            :row-key="(record) => record.id"
            :loading="loading"
          >
            <template #serviceName="text">
              <span class="font-medium">{{ text }}</span>
            </template>
            <template #description="text">
              <span class="text-sm text-slate-900">{{ text || '-' }}</span>
            </template>
            <template #pointsAmount="text">
              <span class="font-semibold text-slate-900">{{ Math.abs(text) }} 积分</span>
            </template>
            <template #enabled="enabled">
              <a-switch :checked="enabled" disabled />
            </template>
          </a-table>
        </a-card>

        <!-- 积分换购服务 -->
        <a-card
          :bordered="false"
          class="rounded-xl border-slate-200 shadow-md hover:shadow-lg transition-all duration-200"
        >
          <template #title>
            <div class="flex items-center gap-2 text-base font-semibold">
              <a-icon type="shopping" class="text-blue-600" />
              积分换购
            </div>
          </template>

          <a-table
            :columns="serviceColumns"
            :data-source="config.valueAddedServices"
            :pagination="false"
            :row-key="(record) => record.id"
            :loading="loading"
          >
            <template #serviceName="text">
              <span class="font-medium">{{ text }}</span>
            </template>
            <template #description="text">
              <span class="text-sm text-slate-900">{{ text || '-' }}</span>
            </template>
            <template #pointsAmount="text">
              <span class="font-semibold text-slate-900">{{ text }} 积分</span>
            </template>
            <template #enabled="enabled">
              <a-switch :checked="enabled" disabled />
            </template>
          </a-table>
        </a-card>
      </div>
    </div>
  </sidebar>
</template>

<script>
import { defineComponent } from '@vue/composition-api'
import Sidebar from '@/components/Layout/Sidebar.vue'
import { getPointsServiceConfig } from '@/api/memberService'

export default defineComponent({
  name: 'PointsServiceConfigPage',
  components: {
    Sidebar,
  },
  data() {
    return {
      loading: false,
      config: {
        storeId: '',
        storeName: '',
        ecoRewards: [],
        valueAddedServices: [],
      },
      rewardColumns: [
        {
          title: '服务名称',
          dataIndex: 'serviceName',
          key: 'serviceName',
          width: 150,
          scopedSlots: { customRender: 'serviceName' },
        },
        {
          title: '服务说明',
          dataIndex: 'description',
          key: 'description',
          width: 250,
          scopedSlots: { customRender: 'description' },
        },
        {
          title: '奖励积分',
          dataIndex: 'pointsAmount',
          key: 'pointsAmount',
          width: 120,
          scopedSlots: { customRender: 'pointsAmount' },
        },
        {
          title: '启用',
          dataIndex: 'enabled',
          key: 'enabled',
          width: 100,
          scopedSlots: { customRender: 'enabled' },
        },
      ],
      serviceColumns: [
        {
          title: '服务名称',
          dataIndex: 'serviceName',
          key: 'serviceName',
          width: 150,
          scopedSlots: { customRender: 'serviceName' },
        },
        {
          title: '服务说明',
          dataIndex: 'description',
          key: 'description',
          width: 250,
          scopedSlots: { customRender: 'description' },
        },
        {
          title: '消耗积分',
          dataIndex: 'pointsAmount',
          key: 'pointsAmount',
          width: 120,
          scopedSlots: { customRender: 'pointsAmount' },
        },
        {
          title: '启用',
          dataIndex: 'enabled',
          key: 'enabled',
          width: 100,
          scopedSlots: { customRender: 'enabled' },
        },
      ],
    }
  },
  mounted() {
    this.loadConfig()
  },
  methods: {
    async loadConfig() {
      this.loading = true
      try {
        this.config = await getPointsServiceConfig()
      } catch (error) {
        this.$message.error('加载配置失败')
        console.error(error)
      } finally {
        this.loading = false
      }
    },
  },
})
</script>

<style scoped lang="less">
::v-deep .ant-card {
  border: 1px solid #e2e8f0;
}

::v-deep .ant-card-head {
  border-bottom: 1px solid #f1f5f9;
}

::v-deep .ant-table {
  font-size: 14px;
}

::v-deep .ant-table-thead > tr > th {
  background-color: #fafafa;
  color: #475569;
  font-weight: 600;
  border-bottom: 1px solid #e2e8f0;
}

::v-deep .ant-table-tbody > tr:hover {
  background-color: #f8fafc;
}

::v-deep .ant-table-tbody > tr > td {
  border-bottom: 1px solid #f1f5f9;
}

::v-deep .ant-switch-disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
</style>
