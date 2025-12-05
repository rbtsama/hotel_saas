<template>
  <sidebar>
    <div class="page-container">
      <div class="space-y-6">
        <!-- 门店身份 -->
        <editable-section
          title="门店身份"
          :is-editing="isEditing"
          :is-saving="isSaving"
          @edit="handleEdit"
          @save="handleSave"
          @cancel="handleCancel"
        >
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <form-field label="名称" :required="true" :locked="true">
              <div class="locked-field">{{ formData.name }}</div>
            </form-field>
            <form-field label="城市" :required="true" :locked="true">
              <div class="locked-field">{{ formData.city }}</div>
            </form-field>
            <form-field label="详细地址" :required="true" :locked="true" class="md:col-span-2">
              <div class="locked-field">{{ formData.address }}</div>
            </form-field>
            <form-field label="类型" :required="true" :locked="true">
              <div class="locked-field">{{ formData.hotelCategory }}</div>
            </form-field>
            <form-field label="房间数" :required="true" :locked="true">
              <div class="locked-field">{{ formData.roomCount }}</div>
            </form-field>
          </div>
        </editable-section>

        <!-- 联系方式 -->
        <editable-section title="联系方式" :is-editing="isEditing" :hide-actions="true">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <form-field label="联系电话" :required="true">
              <a-input v-if="isEditing" v-model:value="formData.contactPhone" placeholder="请输入联系电话" />
              <display-value v-else :value="formData.contactPhone" />
            </form-field>
            <form-field label="联系人名称" :required="true">
              <a-input v-if="isEditing" v-model:value="formData.contactName" placeholder="请输入联系人名称" />
              <display-value v-else :value="formData.contactName" />
            </form-field>
            <form-field label="邮箱地址" class="md:col-span-2">
              <a-input v-if="isEditing" v-model:value="formData.email" placeholder="请输入邮箱地址" type="email" />
              <display-value v-else :value="formData.email" />
            </form-field>
          </div>
        </editable-section>

        <!-- 门店展示 -->
        <editable-section title="门店展示" :is-editing="isEditing" :hide-actions="true">
          <div class="space-y-6">
            <form-field label="门店Logo">
              <div v-if="isEditing" class="flex items-center gap-4">
                <div v-if="formData.logo" class="logo-preview">
                  <img :src="formData.logo" alt="Logo" />
                </div>
                <div class="flex-1 upload-zone">
                  <upload-outlined class="upload-icon" />
                  <p>点击上传Logo</p>
                  <p class="upload-hint">建议尺寸：200x200</p>
                </div>
              </div>
              <div v-else>
                <div v-if="formData.logo" class="logo-preview">
                  <img :src="formData.logo" alt="Logo" />
                </div>
                <span v-else class="empty-value">—</span>
              </div>
            </form-field>

            <form-field label="Slogan/门店推荐语">
              <a-input v-if="isEditing" v-model:value="formData.slogan" placeholder="请输入门店推荐语" />
              <display-value v-else :value="formData.slogan" />
            </form-field>

            <form-field label="门店推荐标签" :required="true" hint="最多选择2项">
              <div v-if="isEditing" class="flex flex-wrap gap-2">
                <a-tag
                  v-for="tag in RECOMMEND_TAGS"
                  :key="tag.value"
                  :color="formData.recommendTags?.includes(tag.value) ? 'blue' : ''"
                  class="tag-selectable"
                  @click="toggleTag(tag.value)"
                >
                  {{ tag.label }}
                </a-tag>
              </div>
              <div v-else class="flex flex-wrap gap-2">
                <a-tag v-for="tagValue in formData.recommendTags" :key="tagValue" color="blue">
                  {{ getTagLabel(tagValue) }}
                </a-tag>
                <span v-if="!formData.recommendTags?.length" class="empty-value">—</span>
              </div>
            </form-field>

            <form-field label="门店介绍" :required="true">
              <a-textarea v-if="isEditing" v-model:value="formData.description" placeholder="请输入门店介绍，支持换行" :rows="8" />
              <div v-else class="text-content">{{ formData.description || '—' }}</div>
            </form-field>
          </div>
        </editable-section>

        <!-- 列表展示 -->
        <editable-section title="列表展示" :is-editing="isEditing" :hide-actions="true">
          <form-field label="列表封面" :required="true" hint="用于平台列表页展示">
            <div v-if="isEditing" class="flex items-center gap-4">
              <div v-if="formData.listCover" class="cover-preview">
                <img :src="formData.listCover" alt="列表封面" />
              </div>
              <div class="flex-1 upload-zone">
                <picture-outlined class="upload-icon" />
                <p>点击上传列表封面</p>
                <p class="upload-hint">建议尺寸：800x600</p>
              </div>
            </div>
            <div v-else>
              <div v-if="formData.listCover" class="cover-preview">
                <img :src="formData.listCover" alt="列表封面" />
              </div>
              <span v-else class="empty-value">—</span>
            </div>
          </form-field>
        </editable-section>

        <!-- 视频素材 -->
        <editable-section title="视频素材" :is-editing="isEditing" :hide-actions="true">
          <div class="space-y-6">
            <form-field label="门店视频">
              <div v-if="isEditing" class="space-y-4">
                <div v-if="formData.video" class="video-info">
                  <p class="video-label">当前视频：</p>
                  <p class="video-url">{{ formData.video }}</p>
                </div>
                <div class="upload-zone">
                  <video-camera-outlined class="upload-icon" />
                  <p>点击上传门店视频</p>
                  <p class="upload-hint">支持MP4格式，大小不超过100MB</p>
                </div>
              </div>
              <div v-else>
                <div v-if="formData.video" class="video-info">
                  <p class="video-url">{{ formData.video }}</p>
                </div>
                <span v-else class="empty-value">—</span>
              </div>
            </form-field>

            <form-field label="视频封面" hint="视频未播放时显示">
              <div v-if="isEditing" class="flex items-center gap-4">
                <div v-if="formData.videoCover" class="cover-preview">
                  <img :src="formData.videoCover" alt="视频封面" />
                </div>
                <div class="flex-1 upload-zone">
                  <picture-outlined class="upload-icon" />
                  <p>点击上传视频封面</p>
                  <p class="upload-hint">建议尺寸：800x600</p>
                </div>
              </div>
              <div v-else>
                <div v-if="formData.videoCover" class="cover-preview">
                  <img :src="formData.videoCover" alt="视频封面" />
                </div>
                <span v-else class="empty-value">—</span>
              </div>
            </form-field>
          </div>
        </editable-section>

        <!-- 动态信息 -->
        <editable-section title="动态信息" :is-editing="isEditing" :hide-actions="true">
          <form-field label="最新情报" hint="支持多张">
            <div v-if="isEditing" class="space-y-4">
              <div v-if="formData.latestNews?.length" class="news-grid">
                <div v-for="(img, idx) in formData.latestNews" :key="idx" class="news-item">
                  <img :src="img" :alt="`最新情报 ${idx + 1}`" />
                  <a-button type="text" danger size="small" class="delete-btn" @click="removeNewsImage(idx)">
                    <close-outlined />
                  </a-button>
                </div>
              </div>
              <div class="upload-zone" @click="addNewsImage">
                <picture-outlined class="upload-icon" />
                <p>点击添加最新情报图片</p>
                <p class="upload-hint">建议尺寸：400x300</p>
              </div>
            </div>
            <div v-else>
              <div v-if="formData.latestNews?.length" class="news-grid">
                <div v-for="(img, idx) in formData.latestNews" :key="idx" class="news-item">
                  <img :src="img" :alt="`最新情报 ${idx + 1}`" />
                </div>
              </div>
              <span v-else class="empty-value">—</span>
            </div>
          </form-field>
        </editable-section>
      </div>
    </div>
  </sidebar>
</template>

<script>
import { defineComponent, ref, reactive } from '@vue/composition-api'
import { Modal, message } from 'ant-design-vue'
import { UploadOutlined, PictureOutlined, VideoCameraOutlined, CloseOutlined } from '@ant-design/icons-vue'
import Sidebar from '@/components/Layout/Sidebar.vue'
import EditableSection from '@/components/MerchantBackend/StoreInfo/EditableSection.vue'
import FormField from '@/components/MerchantBackend/StoreInfo/FormField.vue'
import DisplayValue from '@/components/MerchantBackend/StoreInfo/DisplayValue.vue'
import { RECOMMEND_TAGS } from '@/types/MerchantBackend/storeInfo.types'
import StoreInfoService from '@/services/MerchantBackend/storeInfo.service'

export default defineComponent({
  name: 'BasicInfoPage',
  components: { Sidebar, EditableSection, FormField, DisplayValue, UploadOutlined, PictureOutlined, VideoCameraOutlined, CloseOutlined },
  setup() {
    const isEditing = ref(false)
    const isSaving = ref(false)
    const formData = reactive({
      name: '',
      city: '',
      address: '',
      hotelCategory: '',
      roomCount: 0,
      contactPhone: '',
      contactName: '',
      email: '',
      logo: '',
      slogan: '',
      recommendTags: [],
      description: '',
      listCover: '',
      video: '',
      videoCover: '',
      latestNews: []
    })
    let originalData = null

    const loadData = async () => {
      try {
        const data = await StoreInfoService.getBasicInfo()
        Object.assign(formData, data)
        originalData = JSON.parse(JSON.stringify(data))
      } catch (err) {
        message.error('加载失败')
      }
    }

    loadData()

    const handleEdit = () => {
      isEditing.value = true
    }

    const handleCancel = () => {
      if (JSON.stringify(formData) !== JSON.stringify(originalData)) {
        Modal.confirm({
          title: '确认取消',
          content: '您有未保存的修改，确定要取消吗？',
          onOk: () => {
            if (originalData) Object.assign(formData, originalData)
            isEditing.value = false
          }
        })
      } else {
        isEditing.value = false
      }
    }

    const handleSave = async () => {
      if (!formData.contactPhone?.trim()) return message.error('请填写联系电话')
      if (!formData.contactName?.trim()) return message.error('请填写联系人名称')
      if (!formData.recommendTags || formData.recommendTags.length === 0) return message.error('请至少选择1个门店推荐标签')
      if (formData.recommendTags.length > 2) return message.error('门店推荐标签最多选择2项')
      if (!formData.description?.trim()) return message.error('请填写门店介绍')
      if (!formData.listCover?.trim()) return message.error('请上传列表封面')

      const phoneRegex = /^[\d-]+$/
      if (!phoneRegex.test(formData.contactPhone)) return message.error('联系电话格式不正确')

      if (formData.email && formData.email.trim()) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(formData.email)) return message.error('邮箱格式不正确')
      }

      isSaving.value = true
      try {
        await StoreInfoService.updateBasicInfo(formData)
        originalData = JSON.parse(JSON.stringify(formData))
        message.success('保存成功')
        isEditing.value = false
      } catch (err) {
        message.error('保存失败')
      } finally {
        isSaving.value = false
      }
    }

    const toggleTag = (tagValue) => {
      const currentTags = formData.recommendTags || []
      if (currentTags.includes(tagValue)) {
        formData.recommendTags = currentTags.filter(t => t !== tagValue)
      } else {
        if (currentTags.length >= 2) return message.warning('最多选择2个标签')
        formData.recommendTags = [...currentTags, tagValue]
      }
    }

    const getTagLabel = (value) => {
      const tag = RECOMMEND_TAGS.find(t => t.value === value)
      return tag ? tag.label : value
    }

    const addNewsImage = () => {
      const currentImages = formData.latestNews || []
      formData.latestNews = [...currentImages, `https://placehold.co/400x300?text=News+${currentImages.length + 1}`]
    }

    const removeNewsImage = (index) => {
      formData.latestNews = formData.latestNews.filter((_, i) => i !== index)
    }

    return {
      isEditing,
      isSaving,
      formData,
      RECOMMEND_TAGS,
      handleEdit,
      handleCancel,
      handleSave,
      toggleTag,
      getTagLabel,
      addNewsImage,
      removeNewsImage
    }
  }
})
</script>

<style scoped lang="less">
.page-container {
  padding: 24px;
  background: #f8fafc;
  min-height: calc(100vh - 64px);
}
.space-y-6 > * + * { margin-top: 24px; }
.space-y-4 > * + * { margin-top: 16px; }
.grid { display: grid; }
.grid-cols-1 { grid-template-columns: repeat(1, minmax(0, 1fr)); }
.gap-2 { gap: 8px; }
.gap-4 { gap: 16px; }
.gap-6 { gap: 24px; }
.flex { display: flex; }
.flex-wrap { flex-wrap: wrap; }
.flex-1 { flex: 1; }
.items-center { align-items: center; }
@media (min-width: 768px) {
  .md\:grid-cols-2 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .md\:col-span-2 { grid-column: span 2 / span 2; }
}
.locked-field {
  min-height: 36px;
  display: flex;
  align-items: center;
  padding: 8px 12px;
  background: #f1f5f9;
  color: #475569;
  border-radius: 6px;
  border: 1px solid #e2e8f0;
}
.empty-value { color: #94a3b8; }
.text-content {
  color: #0f172a;
  white-space: pre-wrap;
  line-height: 1.75;
}
.tag-selectable {
  cursor: pointer;
  user-select: none;
}
.logo-preview, .cover-preview {
  width: 160px;
  height: 120px;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  overflow: hidden;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}
.upload-zone {
  border: 2px dashed #cbd5e1;
  border-radius: 8px;
  padding: 24px;
  text-align: center;
  cursor: pointer;
  transition: border-color 0.3s;
  &:hover { border-color: #3b82f6; }
  p { font-size: 14px; color: #64748b; margin: 4px 0; }
  .upload-hint { font-size: 12px; color: #94a3b8; }
}
.upload-icon { font-size: 32px; color: #cbd5e1; margin-bottom: 8px; }
.video-info {
  background: #f1f5f9;
  padding: 12px;
  border-radius: 6px;
  .video-label { font-weight: 500; margin-bottom: 4px; color: #475569; }
  .video-url { font-size: 12px; word-break: break-all; color: #64748b; }
}
.news-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  @media (min-width: 768px) { grid-template-columns: repeat(4, 1fr); }
}
.news-item {
  position: relative;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  overflow: hidden;
  aspect-ratio: 4/3;
  &:hover .delete-btn { opacity: 1; }
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .delete-btn {
    position: absolute;
    top: 4px;
    right: 4px;
    opacity: 0;
    transition: opacity 0.3s;
  }
}
</style>
