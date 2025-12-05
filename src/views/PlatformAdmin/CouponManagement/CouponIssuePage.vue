<template>
  <sidebar>
    <div class="p-6 space-y-6">
      <!-- 1. 手动发放 -->
      <a-card class="rounded-xl border-slate-200 bg-white shadow-sm">
        <div slot="title" class="flex items-center justify-between">
          <span class="text-lg font-semibold text-slate-900">手动发放</span>
          <a-button class="h-9 border-slate-300" @click="goToIssueRecords">
            发放记录
          </a-button>
        </div>

        <a-form-model
          ref="manualFormRef"
          :model="manualForm"
          :label-col="{ span: 3 }"
          :wrapper-col="{ span: 20 }"
        >
          <!-- 发放方式 -->
          <a-form-model-item label="发放方式">
            <a-radio-group v-model="manualForm.distributionType" @change="handleDistributionTypeChange">
              <a-radio value="phone">按手机号</a-radio>
              <a-radio value="vip">按VIP等级</a-radio>
            </a-radio-group>
          </a-form-model-item>

          <!-- 按手机号输入 -->
          <a-form-model-item v-if="manualForm.distributionType === 'phone'" label="手机号">
            <a-textarea
              v-model="manualForm.phoneText"
              placeholder="请输入要派发优惠券的手机号，一行一个手机号&#10;例如：&#10;13800138000&#10;13900139000&#10;13700137000"
              :rows="10"
              class="font-mono"
            />
          </a-form-model-item>

          <!-- 按VIP等级选择 -->
          <a-form-model-item v-if="manualForm.distributionType === 'vip'" label="VIP等级">
            <div class="vip-checkbox-grid">
              <a-checkbox
                v-for="level in vipLevels"
                :key="level.id"
                :value="level.id"
                :checked="manualForm.selectedVipLevels.includes(level.id)"
                @change="handleVipLevelToggle(level.id)"
                class="vip-checkbox-item"
              >
                {{ level.name }}
              </a-checkbox>
            </div>
          </a-form-model-item>

          <!-- 选择优惠券 -->
          <a-form-model-item label="选择优惠券">
            <a-select
              v-model="manualForm.couponId"
              placeholder="请选择要派发的优惠券"
              class="w-full"
            >
              <a-select-option
                v-for="coupon in enabledCoupons"
                :key="coupon.id"
                :value="coupon.id"
              >
                {{ coupon.id }}（{{ coupon.remark || coupon.name }}）
              </a-select-option>
            </a-select>
          </a-form-model-item>

          <!-- 短信通知 -->
          <a-form-model-item label="短信通知">
            <a-checkbox v-model="manualForm.smsNotify">短信通知</a-checkbox>
          </a-form-model-item>

          <!-- 提交按钮 -->
          <a-form-model-item :wrapper-col="{ span: 20, offset: 3 }">
            <a-button
              type="primary"
              :disabled="!isManualFormValid"
              @click="handleManualSubmit"
              class="h-9 bg-blue-600"
            >
              <a-icon type="send" />
              开始派发
            </a-button>
          </a-form-model-item>
        </a-form-model>
      </a-card>

      <!-- 2. 自动发放 -->
      <a-card class="rounded-xl border-slate-200 bg-white shadow-sm">
        <div slot="title" class="text-lg font-semibold text-slate-900">自动发放</div>

        <a-table
          :columns="sceneColumns"
          :data-source="scenes"
          :pagination="false"
          row-key="id"
        >
          <!-- 场景名称 -->
          <template slot="sceneName" slot-scope="text, record">
            <span class="font-medium text-slate-900">{{ getSceneName(record.scene) }}</span>
          </template>

          <!-- 触发时机 -->
          <template slot="trigger" slot-scope="text, record">
            <span class="text-sm text-slate-600">
              {{ getTriggerDescription(record.scene) }}
            </span>
          </template>

          <!-- 选择派发优惠券 -->
          <template slot="coupon" slot-scope="text, record">
            <span v-if="record.couponId" class="text-slate-900">
              {{ getCouponDisplayText(record.couponId) }}
            </span>
            <span v-else class="text-slate-400">未配置</span>
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
              <a-button size="small" class="h-7 px-2" @click="handleEditScene(record)">
                <a-icon type="edit" />
                配置
              </a-button>
              <a-button
                size="small"
                :type="record.status === 'enabled' ? 'danger' : 'primary'"
                :disabled="!record.couponId"
                class="h-7 px-2"
                @click="handleToggleScene(record)"
              >
                {{ record.status === 'enabled' ? '停用' : '启用' }}
              </a-button>
            </div>
          </template>
        </a-table>
      </a-card>

      <!-- 手动发放确认弹窗 -->
      <a-modal
        :visible="confirmVisible"
        title="确认发放优惠券"
        @ok="handleConfirmDistribute"
        @cancel="confirmVisible = false"
        ok-text="确认发放"
        cancel-text="取消"
      >
        <p class="mb-2">请确认以下发放信息</p>
        <div class="space-y-2">
          <div class="flex justify-between">
            <span class="text-slate-600">发放方式：</span>
            <span class="font-medium">
              {{ confirmData.type === 'phone' ? '按手机号' : '按VIP等级' }}
            </span>
          </div>
          <div class="flex justify-between">
            <span class="text-slate-600">目标用户：</span>
            <span class="font-medium">
              {{ getTargetUsersText() }}
            </span>
          </div>
          <div class="flex justify-between">
            <span class="text-slate-600">发放优惠券：</span>
            <span class="font-medium">
              {{ confirmData.couponId ? getCouponDisplayText(confirmData.couponId) : '-' }}
            </span>
          </div>
          <div class="flex justify-between">
            <span class="text-slate-600">短信通知：</span>
            <span class="font-medium">{{ confirmData.smsNotify ? '是' : '否' }}</span>
          </div>
        </div>
      </a-modal>

      <!-- 场景配置编辑弹窗 -->
      <a-modal
        :visible="sceneDialogVisible"
        :title="`配置${editingScene ? getSceneName(editingScene.scene) : ''}`"
        @ok="handleSaveScene"
        @cancel="sceneDialogVisible = false"
        ok-text="保存"
        cancel-text="取消"
      >
        <a-form-model :label-col="{ span: 6 }" :wrapper-col="{ span: 16 }">
          <a-form-model-item label="选择优惠券">
            <a-select v-model="sceneForm.couponId" placeholder="选择优惠券" class="w-full">
              <a-select-option
                v-for="coupon in enabledCoupons"
                :key="coupon.id"
                :value="coupon.id"
              >
                {{ coupon.id }}（{{ coupon.remark || coupon.name }}）
              </a-select-option>
            </a-select>
          </a-form-model-item>
          <a-form-model-item label="短信通知">
            <a-switch v-model="sceneForm.smsNotify" />
          </a-form-model-item>
        </a-form-model>
      </a-modal>
    </div>
  </sidebar>
</template>

<script>
import { defineComponent, ref, reactive, computed, onMounted } from '@vue/composition-api'
import Sidebar from '@/components/Layout/Sidebar.vue'
import CouponService from './services/coupon.service'

export default defineComponent({
  name: 'CouponIssuePage',
  components: {
    Sidebar
  },
  setup(props, { root }) {
    const manualFormRef = ref(null)
    const enabledCoupons = ref([])
    const vipLevels = ref([])
    const scenes = ref([])

    // 手动发放表单
    const manualForm = reactive({
      distributionType: 'phone',
      phoneText: '',
      selectedVipLevels: [],
      couponId: undefined,
      smsNotify: true
    })

    // 确认弹窗
    const confirmVisible = ref(false)
    const confirmData = reactive({
      type: 'phone',
      phones: [],
      vipLevels: [],
      couponId: '',
      smsNotify: true
    })

    // 场景编辑弹窗
    const sceneDialogVisible = ref(false)
    const editingScene = ref(null)
    const sceneForm = reactive({
      couponId: '',
      smsNotify: true
    })

    // 场景表格列定义
    const sceneColumns = [
      {
        title: '场景名称',
        key: 'sceneName',
        width: 150,
        scopedSlots: { customRender: 'sceneName' }
      },
      {
        title: '触发时机',
        key: 'trigger',
        scopedSlots: { customRender: 'trigger' }
      },
      {
        title: '选择派发优惠券',
        key: 'coupon',
        width: 280,
        scopedSlots: { customRender: 'coupon' }
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
        title: '操作',
        key: 'action',
        width: 180,
        align: 'center',
        scopedSlots: { customRender: 'action' }
      }
    ]

    // 表单验证
    const isManualFormValid = computed(() => {
      if (!manualForm.couponId) return false
      if (manualForm.distributionType === 'phone') {
        const phones = manualForm.phoneText.split('\n').map(p => p.trim()).filter(Boolean)
        return phones.length > 0
      } else {
        return manualForm.selectedVipLevels.length > 0
      }
    })

    // 获取数据
    const fetchData = async () => {
      try {
        const [coupons, levels, sceneList] = await Promise.all([
          CouponService.getEnabledCoupons(),
          CouponService.getVipLevels(),
          CouponService.getSceneDistributions()
        ])
        enabledCoupons.value = coupons
        vipLevels.value = levels
        scenes.value = sceneList
      } catch (error) {
        root.$message.error('获取数据失败')
      }
    }

    // 切换发放方式
    const handleDistributionTypeChange = () => {
      manualForm.phoneText = ''
      manualForm.selectedVipLevels = []
    }

    // VIP等级切换
    const handleVipLevelToggle = (levelId) => {
      const index = manualForm.selectedVipLevels.indexOf(levelId)
      if (index > -1) {
        manualForm.selectedVipLevels.splice(index, 1)
      } else {
        manualForm.selectedVipLevels.push(levelId)
      }
    }

    // 手动发放提交
    const handleManualSubmit = () => {
      if (manualForm.distributionType === 'phone') {
        const phones = manualForm.phoneText.split('\n').map(p => p.trim()).filter(Boolean)
        confirmData.type = 'phone'
        confirmData.phones = phones
        confirmData.vipLevels = []
      } else {
        confirmData.type = 'vip'
        confirmData.phones = []
        confirmData.vipLevels = manualForm.selectedVipLevels
      }
      confirmData.couponId = manualForm.couponId
      confirmData.smsNotify = manualForm.smsNotify
      confirmVisible.value = true
    }

    // 确认发放
    const handleConfirmDistribute = async () => {
      try {
        if (confirmData.type === 'phone') {
          await CouponService.distributeByPhones({
            phones: confirmData.phones,
            couponId: confirmData.couponId,
            smsNotify: confirmData.smsNotify
          })
        } else {
          await CouponService.distributeByVipLevels({
            vipLevelIds: confirmData.vipLevels,
            couponId: confirmData.couponId,
            smsNotify: confirmData.smsNotify
          })
        }
        root.$message.success('发放成功')
        confirmVisible.value = false
        // 重置表单
        manualForm.phoneText = ''
        manualForm.selectedVipLevels = []
        manualForm.couponId = undefined
        manualForm.smsNotify = true
      } catch (error) {
        root.$message.error(error.message || '发放失败')
      }
    }

    // 编辑场景
    const handleEditScene = (scene) => {
      editingScene.value = scene
      sceneForm.couponId = scene.couponId || ''
      sceneForm.smsNotify = scene.smsNotify
      sceneDialogVisible.value = true
    }

    // 保存场景配置
    const handleSaveScene = async () => {
      try {
        await CouponService.updateSceneDistribution(editingScene.value.id, {
          couponId: sceneForm.couponId,
          smsNotify: sceneForm.smsNotify
        })
        root.$message.success('保存成功')
        sceneDialogVisible.value = false
        fetchData()
      } catch (error) {
        root.$message.error(error.message || '保存失败')
      }
    }

    // 切换场景状态
    const handleToggleScene = async (scene) => {
      try {
        await CouponService.toggleSceneDistributionStatus(scene.id)
        root.$message.success(`已${scene.status === 'enabled' ? '停用' : '启用'}`)
        fetchData()
      } catch (error) {
        root.$message.error(error.message || '操作失败')
      }
    }

    // 跳转到发放记录
    const goToIssueRecords = () => {
      root.$router.push('/platform-admin/coupon-management/issue-records')
    }

    // 辅助函数
    const getSceneName = (scene) => {
      const map = {
        registration: '注册发放',
        first_order: '首单发放',
        checkout: '离店发放',
        birthday: '生日发放'
      }
      return map[scene] || scene
    }

    const getTriggerDescription = (scene) => {
      const map = {
        registration: '用户注册成功时',
        first_order: '用户首单完成时',
        checkout: '订单离店时',
        birthday: '用户生日当天'
      }
      return map[scene] || ''
    }

    const getCouponDisplayText = (couponId) => {
      const coupon = enabledCoupons.value.find(c => c.id === couponId)
      return coupon ? `${coupon.id}（${coupon.remark || coupon.name}）` : couponId
    }

    const getTargetUsersText = () => {
      if (confirmData.type === 'phone') {
        if (confirmData.phones.length > 3) {
          return `${confirmData.phones.slice(0, 3).join(', ')}...`
        }
        return confirmData.phones.join(', ')
      } else {
        return confirmData.vipLevels.map(id => vipLevels.value.find(v => v.id === id)?.name).join(', ')
      }
    }

    onMounted(() => {
      fetchData()
    })

    return {
      manualFormRef,
      enabledCoupons,
      vipLevels,
      scenes,
      manualForm,
      confirmVisible,
      confirmData,
      sceneDialogVisible,
      editingScene,
      sceneForm,
      sceneColumns,
      isManualFormValid,
      handleDistributionTypeChange,
      handleVipLevelToggle,
      handleManualSubmit,
      handleConfirmDistribute,
      handleEditScene,
      handleSaveScene,
      handleToggleScene,
      goToIssueRecords,
      getSceneName,
      getTriggerDescription,
      getCouponDisplayText,
      getTargetUsersText
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

.border-slate-300 {
  border-color: #cbd5e1;
}

.bg-blue-600 {
  background-color: #2563eb;
}

.w-full {
  width: 100%;
}

.font-mono {
  font-family: 'Courier New', Courier, monospace;
}

.vip-checkbox-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 8px;
}

.vip-checkbox-item {
  padding: 10px;
  background: #ffffff;
  border-radius: 4px;
  border: 1px solid #e2e8f0;
  transition: all 0.2s;

  &:hover {
    border-color: #93c5fd;
    background-color: #eff6ff;
  }
}

.font-medium {
  font-weight: 500;
}

.text-slate-600 {
  color: #475569;
}

.text-sm {
  font-size: 14px;
}

.text-green-600 {
  color: #16a34a;
}

.text-slate-400 {
  color: #94a3b8;
}

.h-7 {
  height: 28px;
}

.px-2 {
  padding-left: 8px;
  padding-right: 8px;
}

.justify-center {
  justify-content: center;
}

.mb-2 {
  margin-bottom: 8px;
}

.space-y-2 > * + * {
  margin-top: 8px;
}

:deep(.ant-table-tbody > tr:hover > td) {
  background-color: #f8fafc !important;
}

:deep(.ant-checkbox-wrapper) {
  width: 100%;
  margin: 0;
}

:deep(.ant-checkbox-checked .ant-checkbox-inner) {
  background-color: #2563eb;
  border-color: #2563eb;
}
</style>
