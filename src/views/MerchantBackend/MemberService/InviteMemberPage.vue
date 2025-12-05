<template>
  <sidebar>
    <div class="h-screen overflow-y-auto bg-slate-50">
      <div class="max-w-5xl mx-auto p-8 space-y-8">
        <!-- 页面标题 -->
        <div class="flex items-center justify-between">
          <h1 class="text-2xl font-bold text-slate-900">邀请会员</h1>
          <a-button
            type="primary"
            size="large"
            @click="handleShowQR"
            class="h-11 bg-blue-600 hover:bg-blue-700 text-white font-medium shadow-sm transition-all"
          >
            邀请会员
          </a-button>
        </div>

        <!-- 邀请记录列表 -->
        <a-card :bordered="false" class="rounded-xl border-slate-200 shadow-md hover:shadow-lg transition-all duration-200">
          <a-table
            :columns="columns"
            :data-source="sortedRecords"
            :pagination="false"
            :loading="loading"
            row-key="id"
          >
            <!-- 受邀人 -->
            <template #inviteeId="{ text }">
              <span class="font-medium text-slate-900">{{ text }}</span>
            </template>

            <!-- 受邀时间 -->
            <template #invitedAt="{ text }">
              <span class="text-slate-900">{{ text }}</span>
            </template>
          </a-table>

          <!-- 空状态 -->
          <a-empty v-if="sortedRecords.length === 0" description="暂无邀请记录" />
        </a-card>

        <!-- 邀请二维码弹窗 -->
        <a-modal
          v-model:visible="qrDialogOpen"
          title="邀请会员二维码"
          :footer="null"
          width="400px"
          centered
          :body-style="{ padding: '24px' }"
        >
          <div class="space-y-4">
            <!-- 二维码 -->
            <div class="flex items-center justify-center">
              <div class="w-64 h-64 bg-slate-100 rounded-lg flex items-center justify-center">
                <qrcode-outlined class="text-slate-400" style="font-size: 192px" />
              </div>
            </div>

            <!-- 保存图片按钮 -->
            <a-button
              block
              @click="handleDownloadQR"
              class="h-9 border-slate-300 hover:border-slate-400 hover:bg-slate-50 transition-all"
            >
              <template #icon>
                <download-outlined />
              </template>
              保存图片
            </a-button>
          </div>
        </a-modal>
      </div>
    </div>
  </sidebar>
</template>

<script>
import { defineComponent, ref, computed, onMounted } from '@vue/composition-api'
import Sidebar from '@/components/Layout/Sidebar.vue'
import { QrcodeOutlined, DownloadOutlined } from '@ant-design/icons-vue'
import { message } from 'ant-design-vue'
import { getInviteRecords, generateInviteQRCode } from '@/api/memberService'

export default defineComponent({
  name: 'InviteMemberPage',
  components: { Sidebar, QrcodeOutlined, DownloadOutlined },
  setup() {
    const loading = ref(false)
    const qrDialogOpen = ref(false)
    const records = ref([])

    const columns = [
      {
        title: '受邀人',
        dataIndex: 'inviteeId',
        key: 'inviteeId',
        width: 150,
        slots: { customRender: 'inviteeId' }
      },
      {
        title: '受邀时间',
        dataIndex: 'invitedAt',
        key: 'invitedAt',
        width: 180,
        slots: { customRender: 'invitedAt' }
      }
    ]

    // 按受邀时间倒序排列
    const sortedRecords = computed(() => {
      return [...records.value].sort((a, b) => {
        const dateA = new Date(a.invitedAt.replace(/\//g, '-'))
        const dateB = new Date(b.invitedAt.replace(/\//g, '-'))
        return dateB - dateA
      })
    })

    // 获取邀请记录
    const fetchRecords = async () => {
      loading.value = true
      try {
        const data = await getInviteRecords()
        records.value = data
      } catch (error) {
        message.error('获取邀请记录失败')
        console.error(error)
      } finally {
        loading.value = false
      }
    }

    // 显示邀请二维码
    const handleShowQR = async () => {
      try {
        await generateInviteQRCode()
        qrDialogOpen.value = true
      } catch (error) {
        message.error('生成邀请二维码失败')
        console.error(error)
      }
    }

    // 下载二维码
    const handleDownloadQR = () => {
      message.success('二维码已保存')
      console.log('下载二维码')
    }

    onMounted(() => {
      fetchRecords()
    })

    return {
      loading,
      qrDialogOpen,
      records,
      columns,
      sortedRecords,
      handleShowQR,
      handleDownloadQR
    }
  }
})
</script>

<style scoped lang="less">
:deep(.ant-table) {
  .ant-table-thead > tr > th {
    background-color: #fafafa;
    color: rgb(71, 85, 105);
    font-weight: 600;
    border-bottom: 1px solid rgb(226, 232, 240);
  }

  .ant-table-tbody > tr {
    transition: all 0.2s;

    &:hover {
      background-color: rgb(248, 250, 252);
    }

    > td {
      border-bottom: 1px solid rgb(226, 232, 240);
    }
  }
}
</style>
