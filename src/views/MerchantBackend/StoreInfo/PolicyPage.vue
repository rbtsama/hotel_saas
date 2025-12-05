<template>
  <sidebar>
    <div class="page-container">
      <PolicyInfoContent
        :data="policyData"
        @save="handleSave"
      />
    </div>
  </sidebar>
</template>

<script>
import { defineComponent, ref, onMounted } from '@vue/composition-api'
import Sidebar from '@/components/Layout/Sidebar.vue'
import PolicyInfoContent from './components/PolicyInfoContent.vue'
import StoreInfoService from './services/storeInfo.service'

export default defineComponent({
  name: 'PolicyPage',
  components: {
    Sidebar,
    PolicyInfoContent
  },
  setup() {
    const policyData = ref(null)
    const loading = ref(false)

    const loadData = async () => {
      loading.value = true
      try {
        const data = await StoreInfoService.getPolicyInfo()
        policyData.value = data
      } catch (error) {
        console.error('加载政策信息失败:', error)
      } finally {
        loading.value = false
      }
    }

    const handleSave = async (data) => {
      try {
        await StoreInfoService.updatePolicyInfo(data)
        await loadData()
      } catch (error) {
        console.error('保存失败:', error)
        throw error
      }
    }

    onMounted(() => {
      loadData()
    })

    return {
      policyData,
      loading,
      handleSave
    }
  }
})
</script>

<style scoped lang="less">
.page-container {
  padding: 24px;
  background: #f0f2f5;
  min-height: calc(100vh - 0px);
}
</style>
