<template>
  <sidebar>
    <div class="page-container space-y-6">
      <!-- 小程序分享图 -->
      <EditableSection
        title="小程序分享图"
        :is-editing="isEditing"
        :is-saving="isSaving"
        @edit="handleEdit"
        @save="handleSave"
        @cancel="handleCancel"
      >
        <div class="space-y-6">
          <!-- 分享封面图 -->
          <FormField label="分享封面图" hint="建议比例1:1，宽度500px~800px，支持png、jpg格式">
            <div v-if="isEditing" class="space-y-3">
              <div
                v-if="formData.shareImage"
                class="relative w-48 h-48 border-2 border-slate-200 rounded overflow-hidden"
              >
                <img
                  :src="formData.shareImage"
                  alt="分享封面图"
                  class="w-full h-full object-cover"
                />
                <a-button
                  type="danger"
                  size="small"
                  class="absolute top-2 right-2"
                  icon="close"
                  @click="formData.shareImage = undefined"
                />
              </div>
              <a-button
                v-if="!formData.shareImage"
                class="h-48 w-48 border-2 border-dashed"
                @click="handleShareImageUpload"
              >
                <div class="flex flex-col items-center gap-2">
                  <a-icon type="upload" class="text-2xl text-slate-400" />
                  <span class="text-sm text-slate-600">点击上传图片</span>
                  <span class="text-xs text-slate-500">1:1 比例</span>
                </div>
              </a-button>
            </div>
            <div v-else>
              <img
                v-if="formData.shareImage"
                :src="formData.shareImage"
                alt="分享封面图"
                class="w-48 h-48 object-cover border border-slate-200 rounded"
              />
              <span v-else class="text-slate-500">未上传</span>
            </div>
          </FormField>

          <!-- 分享展示文案 -->
          <FormField label="分享展示文案" hint="分享链接时显示的标题">
            <div class="flex items-center gap-3">
              <a-input
                v-model="shareTextValue"
                placeholder="请输入分享展示文案"
                :disabled="!isEditing && !onSaveShareText"
              />
              <a-button
                v-if="onSaveShareText && !isEditing"
                type="primary"
                :loading="isSavingShareText"
                @click="handleSaveShareTextOnly"
              >
                {{ isSavingShareText ? '保存中...' : '保存' }}
              </a-button>
            </div>
          </FormField>
        </div>
      </EditableSection>

      <!-- 门店主页首图 -->
      <EditableSection title="门店主页首图" :is-editing="isEditing" hide-actions>
        <FormField
          label="图片列表"
          required
          hint="建议比例2:3，宽度1000px~2000px，最多5张，支持png、jpg格式，单张不大于5M"
        >
          <div v-if="isEditing" class="space-y-4">
            <!-- 图片列表 - 横向排列 -->
            <div class="flex flex-wrap gap-4">
              <div
                v-for="(image, index) in formData.mainImages"
                :key="image.id"
                class="relative border-2 border-slate-200 rounded overflow-hidden w-40 h-60 group flex-shrink-0"
              >
                <img
                  :src="image.url"
                  :alt="`主页图片 ${index + 1}`"
                  class="w-full h-full object-cover"
                />
                <div class="absolute top-2 left-2 bg-blue-600 text-white text-xs font-semibold px-2 py-1 rounded">
                  {{ index + 1 }}
                </div>
                <div class="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <a-button
                    size="small"
                    icon="arrow-up"
                    :disabled="index === 0"
                    @click="moveMainImage(image.id, 'up')"
                  />
                  <a-button
                    size="small"
                    icon="arrow-down"
                    :disabled="index === formData.mainImages.length - 1"
                    @click="moveMainImage(image.id, 'down')"
                  />
                  <a-button
                    size="small"
                    type="danger"
                    icon="close"
                    @click="removeMainImage(image.id)"
                  />
                </div>
              </div>

              <!-- 上传按钮 -->
              <a-button
                v-if="formData.mainImages.length < 5"
                class="w-40 h-60 border-2 border-dashed"
                @click="handleMainImageUpload"
              >
                <div class="flex flex-col items-center gap-2">
                  <a-icon type="upload" class="text-2xl text-slate-400" />
                  <span class="text-sm text-slate-600">上传图片</span>
                  <span class="text-xs text-slate-500">
                    {{ formData.mainImages.length }}/5
                  </span>
                  <span class="text-xs text-slate-500">2:3 比例</span>
                </div>
              </a-button>
            </div>

            <p class="text-sm text-slate-600">
              提示：点击图片上的按钮可调整顺序或删除，第一张图片将作为门店封面
            </p>
          </div>

          <div v-else>
            <div v-if="formData.mainImages.length > 0" class="flex flex-wrap gap-4">
              <div
                v-for="(image, index) in formData.mainImages"
                :key="image.id"
                class="relative w-40 h-60 rounded overflow-hidden flex-shrink-0"
              >
                <img
                  :src="image.url"
                  :alt="`主页图片 ${index + 1}`"
                  class="w-full h-full object-cover border border-slate-200"
                />
                <div class="absolute top-2 left-2 bg-blue-600 text-white text-xs font-semibold px-2 py-1 rounded">
                  {{ index + 1 }}
                </div>
              </div>
            </div>
            <span v-else class="text-slate-500">未上传</span>
          </div>
        </FormField>
      </EditableSection>
    </div>
  </sidebar>
</template>

<script>
import { defineComponent, ref, onMounted } from '@vue/composition-api'
import Sidebar from '@/components/Layout/Sidebar.vue'
import EditableSection from './components/EditableSection.vue'
import FormField from './components/FormField.vue'
import storeInfoService from './services/storeInfo.service'

export default defineComponent({
  name: 'ImagesPage',
  components: { Sidebar, EditableSection, FormField },
  setup() {
    const isEditing = ref(false)
    const isSaving = ref(false)
    const isSavingShareText = ref(false)
    const onSaveShareText = ref(true)
    const originalData = ref(null)
    const formData = ref({ mainImages: [] })
    const shareTextValue = ref('')

    const loadData = async () => {
      const data = await storeInfoService.getImageInfo()
      originalData.value = JSON.parse(JSON.stringify(data))
      formData.value = JSON.parse(JSON.stringify(data))
      shareTextValue.value = data.shareText || ''
    }

    const handleEdit = () => {
      isEditing.value = true
    }

    const handleCancel = () => {
      if (JSON.stringify(formData.value) !== JSON.stringify(originalData.value)) {
        if (!confirm('您有未保存的修改，确定要取消吗？')) {
          return
        }
      }
      formData.value = JSON.parse(JSON.stringify(originalData.value))
      shareTextValue.value = originalData.value.shareText || ''
      isEditing.value = false
    }

    const handleSave = async () => {
      if (!formData.value.mainImages || formData.value.mainImages.length === 0) {
        alert('门店主页首图至少需要上传一张图片')
        return
      }

      if (formData.value.mainImages.length > 5) {
        alert('门店主页首图最多上传5张图片')
        return
      }

      isSaving.value = true
      try {
        formData.value.shareText = shareTextValue.value
        await storeInfoService.updateImageInfo(formData.value)
        originalData.value = JSON.parse(JSON.stringify(formData.value))
        isEditing.value = false
      } catch (error) {
        alert('保存失败，请重试')
      } finally {
        isSaving.value = false
      }
    }

    const handleSaveShareTextOnly = async () => {
      if (!shareTextValue.value.trim()) {
        alert('请填写分享展示文案')
        return
      }

      isSavingShareText.value = true
      try {
        await storeInfoService.updateImageShareText(shareTextValue.value)
        if (originalData.value) {
          originalData.value.shareText = shareTextValue.value
        }
        alert('分享文案保存成功')
      } catch (error) {
        alert('保存失败，请重试')
      } finally {
        isSavingShareText.value = false
      }
    }

    const handleShareImageUpload = () => {
      const mockImageUrl = `https://placehold.co/600x600/2C5F8D/white?text=Share+Image`
      formData.value.shareImage = mockImageUrl
    }

    const handleMainImageUpload = () => {
      if (formData.value.mainImages.length >= 5) {
        alert('最多上传5张图片')
        return
      }

      const newImage = {
        id: `img-${Date.now()}`,
        url: `https://placehold.co/1000x1500/2C5F8D/white?text=Main+${formData.value.mainImages.length + 1}`,
        sortOrder: formData.value.mainImages.length + 1,
      }

      formData.value.mainImages.push(newImage)
    }

    const removeMainImage = (id) => {
      formData.value.mainImages = formData.value.mainImages
        .filter((img) => img.id !== id)
        .map((img, index) => ({ ...img, sortOrder: index + 1 }))
    }

    const moveMainImage = (id, direction) => {
      const currentIndex = formData.value.mainImages.findIndex((img) => img.id === id)
      if (currentIndex === -1) return

      if (direction === 'up' && currentIndex === 0) return
      if (direction === 'down' && currentIndex === formData.value.mainImages.length - 1) return

      const newImages = [...formData.value.mainImages]
      const targetIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1

      ;[newImages[currentIndex], newImages[targetIndex]] = [
        newImages[targetIndex],
        newImages[currentIndex],
      ]

      formData.value.mainImages = newImages.map((img, index) => ({ ...img, sortOrder: index + 1 }))
    }

    onMounted(() => {
      loadData()
    })

    return {
      isEditing,
      isSaving,
      isSavingShareText,
      onSaveShareText,
      formData,
      shareTextValue,
      handleEdit,
      handleCancel,
      handleSave,
      handleSaveShareTextOnly,
      handleShareImageUpload,
      handleMainImageUpload,
      removeMainImage,
      moveMainImage,
    }
  },
})
</script>

<style scoped lang="less">
.page-container {
  padding: 24px;
  background: #f0f2f5;
  min-height: calc(100vh - 0px);
}
</style>
