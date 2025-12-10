<template>
  <div class="deployment-form-page">
    <!-- Tab导航 -->
    <a-tabs
      v-model="activeTab"
      type="card"
      class="form-tabs"
      @change="handleTabChange"
    >
      <a-tab-pane key="tab1" class="tab-pane">
        <span slot="tab">
          账号与门店信息
          <a-icon v-if="tabStatus.tab1" type="check-circle" theme="filled" class="complete-icon" />
          <span v-else class="incomplete-tag">未完成</span>
        </span>
        <Tab1AccountStoreInfo
          v-if="activeTab === 'tab1'"
          :form-data="formData"
          @update="handleFormUpdate"
        />
      </a-tab-pane>

      <a-tab-pane key="tab2">
        <span slot="tab">
          设施与周边
          <a-icon v-if="tabStatus.tab2" type="check-circle" theme="filled" class="complete-icon" />
          <span v-else class="incomplete-tag">未完成</span>
        </span>
        <Tab2FacilitiesSurrounding
          v-if="activeTab === 'tab2'"
          :form-data="formData"
          @update="handleFormUpdate"
        />
      </a-tab-pane>

      <a-tab-pane key="tab3">
        <span slot="tab">
          运营政策
          <a-icon v-if="tabStatus.tab3" type="check-circle" theme="filled" class="complete-icon" />
          <span v-else class="incomplete-tag">未完成</span>
        </span>
        <Tab3OperationPolicy
          v-if="activeTab === 'tab3'"
          :form-data="formData"
          @update="handleFormUpdate"
        />
      </a-tab-pane>

      <a-tab-pane key="tab4">
        <span slot="tab">
          门店展示
          <a-icon v-if="tabStatus.tab4" type="check-circle" theme="filled" class="complete-icon" />
          <span v-else class="incomplete-tag">未完成</span>
        </span>
        <Tab4StoreDisplay
          v-if="activeTab === 'tab4'"
          :form-data="formData"
          @update="handleFormUpdate"
        />
      </a-tab-pane>

      <a-tab-pane key="tab5">
        <span slot="tab">
          房型配置
          <a-icon v-if="tabStatus.tab5" type="check-circle" theme="filled" class="complete-icon" />
          <span v-else class="incomplete-tag">未完成</span>
        </span>
        <Tab5RoomTypeList
          v-if="activeTab === 'tab5'"
          :form-data="formData"
          @update="handleFormUpdate"
        />
      </a-tab-pane>
    </a-tabs>

    <!-- Tab底部操作栏 -->
    <div class="tab-footer">
      <div class="footer-content">
        <a-button
          v-if="activeTab !== 'tab1'"
          size="large"
          @click="handlePrevTab"
        >
          <a-icon type="left" />
          上一步
        </a-button>
        <div style="flex: 1"></div>

        <!-- 自动保存状态提示 -->
        <div class="save-status">
          <a-icon v-if="autoSaveStatus === 'saving'" type="loading" />
          <a-icon v-else-if="autoSaveStatus === 'saved'" type="check-circle" theme="filled" class="success-icon" />
          <a-icon v-else-if="autoSaveStatus === 'error'" type="close-circle" theme="filled" class="error-icon" />
          <span class="status-text">
            <template v-if="autoSaveStatus === 'saving'">正在保存...</template>
            <template v-else-if="autoSaveStatus === 'saved'">已保存 {{ lastSaveTime }}</template>
            <template v-else-if="autoSaveStatus === 'error'">保存失败</template>
          </span>
        </div>

        <a-button size="large" @click="handleSaveDraft">
          保存草稿
        </a-button>
        <a-button
          v-if="activeTab !== 'tab5'"
          type="primary"
          size="large"
          @click="handleNextTab"
        >
          下一步
          <a-icon type="right" />
        </a-button>
        <a-button
          v-else
          type="primary"
          size="large"
          @click="handleSubmit"
        >
          提交审核
        </a-button>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, reactive, computed, watch, onMounted, onBeforeUnmount } from '@vue/composition-api'
import { saveDraft, getDraftData, submitForReview, validateForm } from '@/api/storeDeployment'
import { mockEmptyFormData } from '@/mocks/storeDeployment.mock'
import { AutoSaveStatus } from '@/types/storeDeployment'
import Tab1AccountStoreInfo from './components/Tab1AccountStoreInfo.vue'
import Tab2FacilitiesSurrounding from './components/Tab2FacilitiesSurrounding.vue'
import Tab3OperationPolicy from './components/Tab3OperationPolicy.vue'
import Tab4StoreDisplay from './components/Tab4StoreDisplay.vue'
import Tab5RoomTypeList from './components/Tab5RoomTypeList.vue'
import dayjs from 'dayjs'

export default defineComponent({
  name: 'StoreDeploymentForm',
  components: {
    Tab1AccountStoreInfo,
    Tab2FacilitiesSurrounding,
    Tab3OperationPolicy,
    Tab4StoreDisplay,
    Tab5RoomTypeList
  },
  setup(props, { root }) {
    const activeTab = ref('tab1')
    const formData = reactive({ ...mockEmptyFormData })
    const autoSaveStatus = ref(AutoSaveStatus.IDLE)
    const lastSaveTime = ref('')
    let autoSaveTimer = null
    let hasUnsavedChanges = ref(false)

    // Tab完成状态
    const tabStatus = reactive({
      tab1: false,
      tab2: false,
      tab3: false,
      tab4: false,
      tab5: false
    })

    // 加载草稿数据
    const loadDraft = async () => {
      try {
        const draft = await getDraftData()
        if (draft) {
          Object.assign(formData, draft)
          root.$message.info('已加载上次保存的草稿')
        }
      } catch (error) {
        console.error('Load draft error:', error)
      }
    }

    // 自动保存
    const triggerAutoSave = () => {
      if (autoSaveTimer) {
        clearTimeout(autoSaveTimer)
      }
      autoSaveTimer = setTimeout(async () => {
        await performSave()
      }, 30000) // 30秒后自动保存
    }

    // 执行保存
    const performSave = async () => {
      autoSaveStatus.value = AutoSaveStatus.SAVING
      try {
        await saveDraft(formData)
        autoSaveStatus.value = AutoSaveStatus.SAVED
        lastSaveTime.value = dayjs().format('HH:mm')
        hasUnsavedChanges.value = false
      } catch (error) {
        autoSaveStatus.value = AutoSaveStatus.ERROR
        console.error('Save error:', error)
      }
    }

    // 表单更新处理
    const handleFormUpdate = (updates) => {
      Object.assign(formData, updates)
      hasUnsavedChanges.value = true
      triggerAutoSave()
    }

    // 手动保存草稿
    const handleSaveDraft = async () => {
      await performSave()
      root.$message.success('草稿已保存')
    }

    // Tab切换
    const handleTabChange = async (key) => {
      if (hasUnsavedChanges.value) {
        await performSave()
      }
    }

    // 上一步
    const handlePrevTab = () => {
      const tabs = ['tab1', 'tab2', 'tab3', 'tab4', 'tab5']
      const currentIndex = tabs.indexOf(activeTab.value)
      if (currentIndex > 0) {
        activeTab.value = tabs[currentIndex - 1]
      }
    }

    // 下一步
    const handleNextTab = () => {
      const tabs = ['tab1', 'tab2', 'tab3', 'tab4', 'tab5']
      const currentIndex = tabs.indexOf(activeTab.value)
      if (currentIndex < tabs.length - 1) {
        activeTab.value = tabs[currentIndex + 1]
      }
    }

    // 提交审核
    const handleSubmit = async () => {
      // 先保存
      await performSave()

      // 校验表单
      const validation = await validateForm(formData)
      if (!validation.valid) {
        const errorMsg = validation.errors
          .map(e => `${e.tab} - ${e.message}`)
          .join('\n')
        root.$error({
          title: '表单填写有误',
          content: errorMsg
        })
        return
      }

      // 确认提交
      root.$confirm({
        title: '确认提交',
        content: '请确认信息无误后提交审核。提交后将无法修改，平台将在3个工作日内完成审核。',
        okText: '确认提交',
        cancelText: '再检查一下',
        onOk: async () => {
          try {
            const result = await submitForReview(formData)
            if (result.success) {
              root.$success({
                title: '提交成功！',
                content: `您的申请已提交，申请编号：${result.applicationId}。平台将在3个工作日内完成审核，审核结果将通过短信和站内消息通知您。`,
                onOk: () => {
                  root.$router.push('/')
                }
              })
            }
          } catch (error) {
            root.$message.error('提交失败，请重试')
            console.error('Submit error:', error)
          }
        }
      })
    }

    // 页面离开提示
    const beforeUnloadHandler = (e) => {
      if (hasUnsavedChanges.value) {
        const message = '您有未保存的修改，确认离开吗？草稿已自动保存，您可以随时回来继续填写。'
        e.preventDefault()
        e.returnValue = message
        return message
      }
    }

    onMounted(() => {
      loadDraft()
      window.addEventListener('beforeunload', beforeUnloadHandler)
    })

    onBeforeUnmount(() => {
      if (autoSaveTimer) {
        clearTimeout(autoSaveTimer)
      }
      window.removeEventListener('beforeunload', beforeUnloadHandler)
    })

    return {
      activeTab,
      formData,
      autoSaveStatus,
      lastSaveTime,
      tabStatus,
      handleFormUpdate,
      handleSaveDraft,
      handleTabChange,
      handlePrevTab,
      handleNextTab,
      handleSubmit
    }
  }
})
</script>

<style scoped lang="less">
@import '@/styles/variables.less';

.deployment-form-page {
  min-height: 100vh;
  background: @bg-tertiary;
  padding-bottom: 80px;
}

.form-tabs {
  max-width: 1400px;
  margin: 0 auto;
  padding: 20px 24px 0;

  :deep(.ant-tabs-nav) {
    background: @bg-primary;
    padding: 8px 16px;
    border-radius: @border-radius-lg @border-radius-lg 0 0;
    margin-bottom: 0;
  }

  :deep(.ant-tabs-tab) {
    border: none !important;
    background: transparent !important;
    color: @text-secondary !important;
    font-size: @font-size-base;
    padding: 8px 20px;
    margin: 0 4px;
    border-radius: @border-radius-base;

    &:hover {
      background: @bg-hover !important;
      color: @text-primary !important;
    }

    &.ant-tabs-tab-active {
      background: @brand-primary !important;
      color: #ffffff !important;
      font-weight: @font-weight-medium;
    }
  }

  :deep(.ant-tabs-content) {
    background: @bg-primary;
    border-radius: 0 0 @border-radius-lg @border-radius-lg;
    min-height: 500px;
  }

  :deep(.ant-tabs-tabpane) {
    padding: 32px;
  }
}

.incomplete-tag {
  margin-left: 4px;
  font-size: @font-size-xs;
  color: @text-tertiary;
}

.complete-icon {
  color: @success-color;
  margin-left: 4px;
}

.tab-footer {
  position: fixed;
  bottom: 0;
  left: 256px;
  right: 0;
  height: 72px;
  background: @bg-primary;
  border-top: 1px solid @border-primary;
  box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.05);
  z-index: 98;
  display: flex;
  align-items: center;
  justify-content: center;
}

.footer-content {
  max-width: 1400px;
  width: 100%;
  padding: 0 24px;
  display: flex;
  align-items: center;
  gap: 12px;
}

.save-status {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: @font-size-sm;
  color: @text-secondary;
  margin-right: 8px;

  .success-icon {
    color: @success-color;
  }

  .error-icon {
    color: @error-color;
  }

  .status-text {
    white-space: nowrap;
  }
}
</style>
