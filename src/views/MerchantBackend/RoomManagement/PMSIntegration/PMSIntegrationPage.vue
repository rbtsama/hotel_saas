<template>
  <sidebar>
    <div class="page-container">
      <a-card title="PMS对接配置" :bordered="false">
        <a-spin :spinning="loading">
          <div class="config-content">
            <!-- 是否对接PMS -->
            <div class="config-section">
              <div class="section-label">是否对接PMS?</div>
              <a-radio-group v-model="isPMSEnabled">
                <a-radio :value="false">否</a-radio>
                <a-radio :value="true">是</a-radio>
              </a-radio-group>
            </div>

            <!-- PMS配置（仅在启用时显示） -->
            <template v-if="isPMSEnabled">
              <!-- 选择对接的PMS -->
              <div class="config-section">
                <div class="section-label">选择对接的PMS:</div>
                <a-select v-model="pmsProvider" placeholder="请选择PMS系统" style="max-width: 400px">
                  <a-select-option
                    v-for="provider in pmsProviders"
                    :key="provider.value"
                    :value="provider.value"
                  >
                    {{ provider.label }}
                  </a-select-option>
                </a-select>
              </div>

              <!-- 输入PMS门店ID -->
              <div class="config-section">
                <div class="section-label">
                  <span class="required-mark">*</span>
                  输入在PMS里的门店ID:
                </div>
                <div class="store-id-row">
                  <a-input
                    v-model="pmsStoreId"
                    placeholder="请输入门店ID"
                    style="flex: 1; max-width: 400px"
                  />
                  <a-button
                    type="primary"
                    :loading="syncing"
                    :disabled="!pmsStoreId"
                    @click="handleSyncPMS"
                  >
                    {{ syncing ? '同步中...' : '保存并刷新房型信息' }}
                  </a-button>
                </div>
              </div>

              <!-- 房型映射列表 -->
              <div v-if="mappings.length > 0" class="config-section mapping-section">
                <div class="mapping-header">
                  <div class="mapping-col-header">小而美房型名称</div>
                  <div class="mapping-col-header">PMS房型名称</div>
                </div>

                <div class="mapping-list">
                  <div
                    v-for="mapping in mappings"
                    :key="mapping.id"
                    class="mapping-row"
                  >
                    <div class="local-room-type">
                      {{ mapping.localRoomTypeName }}
                    </div>
                    <div class="pms-room-type">
                      <a-select
                        v-model="mapping.pmsRoomTypeName"
                        style="width: 100%"
                        @change="handleMappingChange(mapping.id, $event)"
                      >
                        <a-select-option :value="mapping.localRoomTypeName">
                          {{ mapping.localRoomTypeName }}
                        </a-select-option>
                        <a-select-option
                          v-if="mapping.pmsRoomTypeName !== mapping.localRoomTypeName"
                          :value="mapping.pmsRoomTypeName"
                        >
                          {{ mapping.pmsRoomTypeName }}
                        </a-select-option>
                      </a-select>
                    </div>
                  </div>
                </div>
              </div>
            </template>

            <!-- 保存设置按钮 -->
            <div class="config-section">
              <a-button
                type="primary"
                size="large"
                :loading="saving"
                @click="handleSaveConfig"
              >
                {{ saving ? '保存中...' : '保存设置' }}
              </a-button>
            </div>
          </div>
        </a-spin>
      </a-card>
    </div>
  </sidebar>
</template>

<script>
import { defineComponent, ref, onMounted } from '@vue/composition-api'
import Sidebar from '@/components/Layout/Sidebar.vue'
import PMSIntegrationService from './services/pmsIntegration.service'
import { PMS_PROVIDERS } from './types/pmsIntegration.types'

export default defineComponent({
  name: 'PMSIntegrationPage',
  components: { Sidebar },
  setup(props, { root }) {
    const loading = ref(false)
    const saving = ref(false)
    const syncing = ref(false)
    const isPMSEnabled = ref(false)
    const pmsProvider = ref('order-coming')
    const pmsStoreId = ref('')
    const mappings = ref([])
    const pmsProviders = PMS_PROVIDERS

    // 加载配置
    const loadConfig = async () => {
      loading.value = true
      try {
        const config = await PMSIntegrationService.getConfig()
        isPMSEnabled.value = config.isPMSEnabled
        pmsProvider.value = config.pmsProvider || 'order-coming'
        pmsStoreId.value = config.pmsStoreId || ''
        mappings.value = config.roomTypeMappings
      } catch (error) {
        console.error('Failed to load PMS config:', error)
        root.$message.error('加载配置失败')
      } finally {
        loading.value = false
      }
    }

    // 保存配置
    const handleSaveConfig = async () => {
      saving.value = true
      try {
        await PMSIntegrationService.updateConfig({
          isPMSEnabled: isPMSEnabled.value,
          pmsProvider: isPMSEnabled.value ? pmsProvider.value : undefined,
          pmsStoreId: isPMSEnabled.value ? pmsStoreId.value : undefined
        })
        root.$message.success('保存成功')
      } catch (error) {
        console.error('Failed to save config:', error)
        root.$message.error('保存失败')
      } finally {
        saving.value = false
      }
    }

    // 同步PMS房型信息
    const handleSyncPMS = async () => {
      if (!pmsStoreId.value) {
        root.$message.warning('请输入门店ID')
        return
      }

      syncing.value = true
      try {
        const result = await PMSIntegrationService.syncWithPMS(pmsStoreId.value)
        if (result.success) {
          root.$message.success(result.message)
          await loadConfig()
        } else {
          root.$message.error(result.message)
        }
      } catch (error) {
        console.error('Failed to sync PMS:', error)
        root.$message.error('同步失败')
      } finally {
        syncing.value = false
      }
    }

    // 房型映射变更
    const handleMappingChange = (mappingId, newValue) => {
      // 映射变更处理
      console.log('Mapping changed:', mappingId, newValue)
    }

    onMounted(() => {
      loadConfig()
    })

    return {
      loading,
      saving,
      syncing,
      isPMSEnabled,
      pmsProvider,
      pmsStoreId,
      mappings,
      pmsProviders,
      handleSaveConfig,
      handleSyncPMS,
      handleMappingChange
    }
  }
})
</script>

<style scoped lang="less">
.page-container {
  padding: 24px;
  background: #f0f2f5;
  min-height: calc(100vh);
}

.config-content {
  .config-section {
    margin-bottom: 32px;

    &:last-child {
      margin-bottom: 0;
    }

    .section-label {
      font-size: 16px;
      font-weight: 500;
      margin-bottom: 12px;
      color: rgba(0, 0, 0, 0.85);

      .required-mark {
        color: #ff4d4f;
        margin-right: 4px;
      }
    }

    .store-id-row {
      display: flex;
      gap: 12px;
    }

    &.mapping-section {
      padding-top: 24px;
      border-top: 1px solid #f0f0f0;

      .mapping-header {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 32px;
        margin-bottom: 12px;

        .mapping-col-header {
          font-size: 14px;
          font-weight: 500;
          color: rgba(0, 0, 0, 0.45);
        }
      }

      .mapping-list {
        display: flex;
        flex-direction: column;
        gap: 16px;

        .mapping-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 32px;
          align-items: center;

          .local-room-type {
            padding: 10px 12px;
            background: rgba(0, 0, 0, 0.04);
            border-radius: 6px;
            font-size: 14px;
          }

          .pms-room-type {
            // Select 样式由 Ant Design 控制
          }
        }
      }
    }
  }
}
</style>
