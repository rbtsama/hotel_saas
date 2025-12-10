<template>
  <sidebar>
    <div class="coupon-issue-page">
      <!-- 1. 手动发放 -->
      <a-card :bordered="false" class="form-card">
        <div slot="title" class="card-header">
          <span class="card-title">手动发放</span>
          <a-button @click="goToIssueRecords">
            <a-icon type="history" />
            发放记录
          </a-button>
        </div>

        <a-form-model
          ref="manualFormRef"
          :model="manualForm"
          :label-col="{ span: 3 }"
          :wrapper-col="{ span: 21 }"
          class="issue-form"
        >
          <!-- 发放方式 -->
          <a-form-model-item label="发放方式">
            <a-radio-group v-model="manualForm.distributionType" button-style="solid" @change="handleDistributionTypeChange">
              <a-radio-button value="phone">按手机号</a-radio-button>
              <a-radio-button value="vip">按VIP等级</a-radio-button>
            </a-radio-group>
          </a-form-model-item>

          <!-- 按手机号输入 -->
          <a-form-model-item v-if="manualForm.distributionType === 'phone'" label="手机号">
            <a-textarea
              v-model="manualForm.phoneText"
              :placeholder="phonePlaceholder"
              :rows="6"
              class="phone-textarea"
            />
            <div class="field-hint">每行输入一个手机号</div>
          </a-form-model-item>

          <!-- 按VIP等级选择 -->
          <a-form-model-item v-if="manualForm.distributionType === 'vip'" label="VIP等级">
            <div class="vip-checkbox-grid">
              <label
                v-for="level in vipLevels"
                :key="level.id"
                class="vip-checkbox-item"
              >
                <a-checkbox
                  :value="level.id"
                  :checked="manualForm.selectedVipLevels.includes(level.id)"
                  @change="handleVipLevelToggle(level.id)"
                />
                <span>{{ level.name }}</span>
              </label>
            </div>
          </a-form-model-item>

          <!-- 选择优惠券 -->
          <a-form-model-item label="选择优惠券">
            <a-select
              v-model="manualForm.couponId"
              placeholder="请选择要派发的优惠券"
              style="width: 100%"
            >
              <a-select-option
                v-for="coupon in enabledCoupons"
                :key="coupon.id"
                :value="coupon.id"
              >
                {{ coupon.name }} ({{ getCouponContent(coupon) }})
              </a-select-option>
            </a-select>
          </a-form-model-item>

          <!-- 短信通知 -->
          <a-form-model-item label="短信通知">
            <a-checkbox v-model="manualForm.smsNotify">
              发送短信通知
            </a-checkbox>
          </a-form-model-item>

          <!-- 提交按钮 -->
          <a-form-model-item :wrapper-col="{ span: 21, offset: 3 }">
            <a-button
              type="primary"
              :disabled="!isManualFormValid"
              @click="handleManualSubmit"
              size="large"
              class="issue-button"
            >
              <a-icon type="rocket" theme="filled" />
              开始派发
            </a-button>
          </a-form-model-item>
        </a-form-model>
      </a-card>

      <!-- 2. 自动发放 -->
      <a-card :bordered="false" class="list-card">
        <div slot="title" class="card-title">自动发放</div>

        <a-table
          :columns="sceneColumns"
          :data-source="scenes"
          :pagination="false"
          row-key="id"
          class="custom-table"
        >
          <!-- 场景名称 -->
          <template slot="sceneName" slot-scope="text, record">
            <span class="scene-name">{{ getSceneName(record.scene) }}</span>
          </template>

          <!-- 触发时机 -->
          <template slot="trigger" slot-scope="text, record">
            <span class="trigger-text">{{ getTriggerDescription(record.scene) }}</span>
          </template>

          <!-- 选择派发优惠券 -->
          <template slot="coupon" slot-scope="text, record">
            <span v-if="record.couponId" class="coupon-text">
              {{ getCouponDisplayText(record.couponId) }}
            </span>
            <span v-else class="empty-text">未配置</span>
          </template>

          <!-- 短信通知 -->
          <template slot="smsNotify" slot-scope="smsNotify">
            <span :class="smsNotify ? 'text-yes' : 'text-no'">
              {{ smsNotify ? '是' : '否' }}
            </span>
          </template>

          <!-- 状态 -->
          <template slot="status" slot-scope="status">
            <a-tag :class="status === 'enabled' ? 'tag-green' : 'tag-gray'">
              {{ status === 'enabled' ? '已启用' : '已停用' }}
            </a-tag>
          </template>

          <!-- 操作 -->
          <template slot="action" slot-scope="text, record">
            <div class="action-btns">
              <a-button size="small" @click="handleEditScene(record)">
                <a-icon type="edit" />
                配置
              </a-button>
              <a-button
                size="small"
                :type="record.status === 'enabled' ? 'danger' : 'primary'"
                :disabled="!record.couponId"
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
        width="520px"
        @ok="handleConfirmDistribute"
        @cancel="confirmVisible = false"
        ok-text="确认发放"
        cancel-text="取消"
      >
        <div class="confirm-content">
          <div class="confirm-item">
            <span class="confirm-label">发放方式</span>
            <span class="confirm-value">
              {{ confirmData.type === 'phone' ? '按手机号' : '按VIP等级' }}
            </span>
          </div>
          <div class="confirm-item">
            <span class="confirm-label">目标用户</span>
            <span class="confirm-value">{{ getTargetUsersText() }}</span>
          </div>
          <div class="confirm-item">
            <span class="confirm-label">发放优惠券</span>
            <span class="confirm-value">
              {{ confirmData.couponId ? getCouponDisplayText(confirmData.couponId) : '-' }}
            </span>
          </div>
          <div class="confirm-item">
            <span class="confirm-label">短信通知</span>
            <span class="confirm-value">{{ confirmData.smsNotify ? '是' : '否' }}</span>
          </div>
        </div>
      </a-modal>

      <!-- 场景配置编辑弹窗 -->
      <a-modal
        :visible="sceneDialogVisible"
        :title="`配置${editingScene ? getSceneName(editingScene.scene) : ''}`"
        width="520px"
        @ok="handleSaveScene"
        @cancel="sceneDialogVisible = false"
        ok-text="保存"
        cancel-text="取消"
      >
        <a-form-model :label-col="{ span: 6 }" :wrapper-col="{ span: 18 }">
          <a-form-model-item label="选择优惠券">
            <a-select v-model="sceneForm.couponId" placeholder="选择优惠券">
              <a-select-option
                v-for="coupon in enabledCoupons"
                :key="coupon.id"
                :value="coupon.id"
              >
                {{ coupon.name }} ({{ getCouponContent(coupon) }})
              </a-select-option>
            </a-select>
          </a-form-model-item>
          <a-form-model-item label="短信通知">
            <a-checkbox v-model="sceneForm.smsNotify">
              发送短信通知
            </a-checkbox>
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

    // 手机号输入框提示文本（支持换行）
    const phonePlaceholder = `请输入手机号，一行一个
例如：
13800138000
18800139000`

    // 手动发放表单
    const manualForm = reactive({
      distributionType: 'phone',
      phoneText: '',
      selectedVipLevels: [],
      couponId: undefined,
      smsNotify: false
    })

    // 确认弹窗
    const confirmVisible = ref(false)
    const confirmData = reactive({
      type: 'phone',
      phones: [],
      vipLevels: [],
      couponId: '',
      smsNotify: false
    })

    // 场景编辑弹窗
    const sceneDialogVisible = ref(false)
    const editingScene = ref(null)
    const sceneForm = reactive({
      couponId: '',
      smsNotify: false
    })

    // 场景表格列定义
    const sceneColumns = [
      {
        title: '场景名称',
        key: 'sceneName',
        width: 120,
        scopedSlots: { customRender: 'sceneName' }
      },
      {
        title: '触发时机',
        key: 'trigger',
        width: 180,
        scopedSlots: { customRender: 'trigger' }
      },
      {
        title: '派发优惠券',
        key: 'coupon',
        scopedSlots: { customRender: 'coupon' }
      },
      {
        title: '短信通知',
        dataIndex: 'smsNotify',
        key: 'smsNotify',
        width: 90,
        align: 'center',
        scopedSlots: { customRender: 'smsNotify' }
      },
      {
        title: '状态',
        dataIndex: 'status',
        key: 'status',
        width: 90,
        align: 'center',
        scopedSlots: { customRender: 'status' }
      },
      {
        title: '操作',
        key: 'action',
        width: 140,
        fixed: 'right',
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
        manualForm.smsNotify = false
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

    const getCouponContent = (coupon) => {
      if (coupon.type === 'full_reduction') {
        return `满${coupon.threshold}减${coupon.amount}`
      } else if (coupon.type === 'discount') {
        return `${coupon.discount}折`
      } else if (coupon.type === 'instant_reduction') {
        return `立减${coupon.amount}`
      }
      return ''
    }

    const getCouponDisplayText = (couponId) => {
      const coupon = enabledCoupons.value.find(c => c.id === couponId)
      if (!coupon) return couponId
      return `${coupon.name} (${getCouponContent(coupon)})`
    }

    const getTargetUsersText = () => {
      if (confirmData.type === 'phone') {
        const count = confirmData.phones.length
        if (count > 3) {
          return `${confirmData.phones.slice(0, 3).join(', ')} 等${count}个用户`
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
      phonePlaceholder,
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
      getCouponContent,
      getCouponDisplayText,
      getTargetUsersText
    }
  }
})
</script>

<style scoped lang="less">
@import '@/styles/variables.less';

.coupon-issue-page {
  padding: 24px;
  max-width: 1400px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

// 卡片样式
.form-card,
.list-card {
  border-radius: @border-radius-lg;
  border: 1px solid @border-primary;
  box-shadow: @shadow-sm;

  :deep(.ant-card-head) {
    border-bottom: 1px solid @bg-tertiary;
    padding: 16px 24px;
  }

  :deep(.ant-card-body) {
    padding: 20px 24px;
  }
}

.list-card {
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

// 表单样式
.issue-form {
  :deep(.ant-form-item) {
    margin-bottom: 16px;
  }

  :deep(.ant-form-item-label > label) {
    font-size: @font-size-base;
    color: @text-primary;
    font-weight: @font-weight-medium;
  }
}

// 字段提示
.field-hint {
  font-size: @font-size-xs;
  color: @text-tertiary;
  margin-top: 4px;
  display: block;
}

// 手机号输入框
.phone-textarea {
  :deep(.ant-input) {
    font-size: 14px;
    line-height: 1.6;
    color: @text-primary;
    font-family: @font-family;

    &::placeholder {
      font-size: 13px;
      color: @text-tertiary;
      line-height: 1.6;
    }
  }
}

// VIP 复选框网格
.vip-checkbox-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 10px;
}

.vip-checkbox-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  background: @bg-secondary;
  border-radius: @border-radius-base;
  border: 1px solid @border-primary;
  transition: @transition-base;
  cursor: pointer;

  &:hover {
    border-color: @brand-primary;
    background: @brand-primary-light;
  }

  span {
    font-size: @font-size-sm;
    color: @text-primary;
    user-select: none;
  }
}

// 开始派发按钮
.issue-button {
  height: 40px;
  padding: 0 32px;
  font-size: @font-size-base;
  font-weight: @font-weight-semibold;
  border-radius: @border-radius-base;
  background: @brand-primary;
  border-color: @brand-primary;

  &:hover:not(:disabled) {
    background: @brand-primary-hover;
    border-color: @brand-primary-hover;
  }

  &:disabled {
    background: #cbd5e1;
    border-color: #cbd5e1;
    color: #94a3b8;
  }

  :deep(.anticon) {
    margin-right: 6px;
    font-size: 16px;
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
}

// 场景名称
.scene-name {
  font-weight: @font-weight-medium;
  color: @text-primary;
  font-size: @font-size-base;
}

// 触发时机
.trigger-text {
  color: @text-secondary;
  font-size: @font-size-sm;
}

// 优惠券文本
.coupon-text {
  color: @text-primary;
  font-size: @font-size-sm;
}

// 空文本
.empty-text {
  color: @text-tertiary;
  font-size: @font-size-sm;
}

// 短信通知文本
.text-yes {
  color: @success-color;
  font-size: @font-size-sm;
  font-weight: @font-weight-medium;
}

.text-no {
  color: @text-primary;
  font-size: @font-size-sm;
}

// 标签样式
.tag-green {
  color: #15803d;
  background: #f0fdf4;
  border-color: #bbf7d0;
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

// 确认弹窗内容
.confirm-content {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.confirm-item {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 16px;
  padding: 8px 0;
  border-bottom: 1px solid @bg-tertiary;

  &:last-child {
    border-bottom: none;
  }
}

.confirm-label {
  flex-shrink: 0;
  color: @text-secondary;
  font-size: @font-size-base;
  width: 90px;
}

.confirm-value {
  flex: 1;
  text-align: right;
  color: @text-primary;
  font-size: @font-size-base;
  font-weight: @font-weight-medium;
  word-break: break-all;
}
</style>
