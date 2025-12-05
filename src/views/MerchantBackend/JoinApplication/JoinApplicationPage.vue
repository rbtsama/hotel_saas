<template>
  <sidebar>
    <div class="p-6 space-y-6">
      <!-- 页面标题 -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-slate-900">入驻申请</h1>
      </div>

      <form @submit.prevent="handleSubmit" class="space-y-6">
        <!-- 账号设置 - 主账号 -->
        <a-card class="rounded-xl border-slate-200 bg-white shadow-sm" :bordered="false">
          <template slot="title">
            <span class="text-lg font-semibold text-slate-900">主账号</span>
          </template>
          <div class="space-y-4">
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="text-sm font-medium text-slate-700 mb-2 block">
                  手机号 <span class="text-red-500">*</span>
                </label>
                <a-input
                  v-model="formData.adminPhone"
                  type="tel"
                  placeholder="13800138000"
                  class="h-10 border-slate-300"
                  :style="{ height: '36px' }"
                />
              </div>
              <div>
                <label class="text-sm font-medium text-slate-700 mb-2 block">
                  姓名 <span class="text-red-500">*</span>
                </label>
                <a-input
                  v-model="formData.adminName"
                  placeholder="李明"
                  class="h-10 border-slate-300"
                  :style="{ height: '36px' }"
                />
              </div>
            </div>
          </div>
        </a-card>

        <!-- 账号设置 - 运营人员 -->
        <a-card class="rounded-xl border-slate-200 bg-white shadow-sm" :bordered="false">
          <template slot="title">
            <span class="text-lg font-semibold text-slate-900">运营人员</span>
          </template>
          <div class="space-y-4">
            <div>
              <label class="text-sm font-medium text-slate-700 mb-3 block">
                是否有专业OTA运营人员
              </label>
              <div class="flex gap-3">
                <button
                  type="button"
                  @click="formData.hasOTASpecialist = false"
                  :class="{
                    'flex-1 px-6 py-3 text-sm font-medium rounded-md transition-all':
                      true,
                    'bg-blue-600 text-white shadow-sm':
                      formData.hasOTASpecialist === false,
                    'bg-white border border-slate-300 text-slate-700 hover:border-blue-400':
                      formData.hasOTASpecialist !== false
                  }"
                >
                  无
                </button>
                <button
                  type="button"
                  @click="formData.hasOTASpecialist = true"
                  :class="{
                    'flex-1 px-6 py-3 text-sm font-medium rounded-md transition-all':
                      true,
                    'bg-blue-600 text-white shadow-sm':
                      formData.hasOTASpecialist === true,
                    'bg-white border border-slate-300 text-slate-700 hover:border-blue-400':
                      formData.hasOTASpecialist !== true
                  }"
                >
                  有专业运营人员
                </button>
              </div>
            </div>

            <transition name="fade">
              <div v-if="formData.hasOTASpecialist" class="grid grid-cols-2 gap-4 pt-2">
                <div>
                  <label class="text-sm font-medium text-slate-700 mb-2 block">
                    运营人员姓名 <span class="text-red-500">*</span>
                  </label>
                  <a-input
                    v-model="formData.otaContactName"
                    placeholder="王芳"
                    class="h-10 border-slate-300"
                    :style="{ height: '36px' }"
                  />
                </div>
                <div>
                  <label class="text-sm font-medium text-slate-700 mb-2 block">
                    运营人员手机号 <span class="text-red-500">*</span>
                  </label>
                  <a-input
                    v-model="formData.otaContactPhone"
                    type="tel"
                    placeholder="13900139000"
                    class="h-10 border-slate-300"
                    :style="{ height: '36px' }"
                  />
                </div>
              </div>
            </transition>
          </div>
        </a-card>

        <!-- 门店基本信息 -->
        <a-card class="rounded-xl border-slate-200 bg-white shadow-sm" :bordered="false">
          <template slot="title">
            <span class="text-lg font-semibold text-slate-900">门店基本信息</span>
          </template>
          <div class="space-y-5">
            <div class="grid grid-cols-5 gap-4">
              <div class="col-span-3">
                <label class="text-sm font-medium text-slate-700 mb-2 block">
                  门店名称 <span class="text-red-500">*</span>
                </label>
                <a-input
                  v-model="formData.storeName"
                  placeholder="西湖畔度假民宿"
                  class="h-10 border-slate-300"
                  :style="{ height: '36px' }"
                />
              </div>
              <div class="col-span-2">
                <label class="text-sm font-medium text-slate-700 mb-2 block">
                  店铺类型 <span class="text-red-500">*</span>
                </label>
                <div class="flex flex-wrap gap-2">
                  <button
                    v-for="(label, value) in storeTypeLabels"
                    :key="value"
                    type="button"
                    @click="formData.storeType = value"
                    :class="{
                      'px-3 py-2 text-sm font-medium rounded-md transition-all': true,
                      'bg-blue-600 text-white shadow-sm': formData.storeType === value,
                      'bg-white border border-slate-300 text-slate-700 hover:border-blue-400':
                        formData.storeType !== value
                    }"
                  >
                    {{ label }}
                  </button>
                </div>
              </div>
            </div>

            <div>
              <label class="text-sm font-medium text-slate-700 mb-2 block">
                详细地址 <span class="text-red-500">*</span>
              </label>
              <a-input
                v-model="formData.storeAddress"
                placeholder="浙江省杭州市西湖区西湖路123号"
                class="h-10 border-slate-300"
                :style="{ height: '36px' }"
              />
            </div>

            <div>
              <label class="text-sm font-medium text-slate-700 mb-2 block">
                门店介绍 <span class="text-red-500">*</span>
              </label>
              <a-textarea
                v-model="formData.storeDescription"
                placeholder="介绍您的门店特色、位置优势、周边环境等..."
                :rows="4"
                :maxLength="1000"
                class="border-slate-300"
              />
              <div class="text-xs text-slate-400 mt-1 text-right">
                {{ (formData.storeDescription || '').length }}/1000
              </div>
            </div>
          </div>
        </a-card>

        <!-- 平台运营情况 -->
        <a-card class="rounded-xl border-slate-200 bg-white shadow-sm" :bordered="false">
          <template slot="title">
            <span class="text-lg font-semibold text-slate-900">平台运营情况</span>
          </template>
          <div class="space-y-6">
            <!-- 已上线的平台 -->
            <div>
              <label class="text-sm font-medium text-slate-700 mb-3 block">已上线的平台</label>
              <div class="grid grid-cols-2 gap-3">
                <label
                  v-for="(label, value) in otaPlatformLabels"
                  :key="value"
                  class="flex items-center gap-3 p-3 border border-slate-200 rounded-md cursor-pointer hover:border-blue-400 hover:bg-blue-50/50 transition-all"
                >
                  <a-checkbox
                    :checked="formData.onlinePlatforms.includes(value)"
                    @change="togglePlatform('onlinePlatforms', value)"
                    class="w-5 h-5"
                  />
                  <span class="text-sm text-slate-700">{{ label }}</span>
                </label>
              </div>
            </div>

            <!-- 携程星否特惠 -->
            <label class="flex items-center gap-3 p-3 border border-slate-200 rounded-md cursor-pointer hover:border-blue-400 hover:bg-blue-50/50 transition-all">
              <a-checkbox
                v-model="formData.hasCtripSpecialOffer"
                class="w-5 h-5"
              />
              <span class="text-sm text-slate-700">携程星否特惠</span>
            </label>

            <!-- 兴趣的代运营平台 -->
            <div>
              <label class="text-sm font-medium text-slate-700 mb-3 block">
                希望代运营的平台
              </label>
              <div class="grid grid-cols-2 gap-3">
                <label
                  v-for="(label, value) in otaPlatformLabels"
                  :key="value"
                  class="flex items-center gap-3 p-3 border border-slate-200 rounded-md cursor-pointer hover:border-blue-400 hover:bg-blue-50/50 transition-all"
                >
                  <a-checkbox
                    :checked="formData.interestedPlatforms.includes(value)"
                    @change="togglePlatform('interestedPlatforms', value)"
                    class="w-5 h-5"
                  />
                  <span class="text-sm text-slate-700">{{ label }}</span>
                </label>
              </div>
            </div>

            <!-- OTA困境 -->
            <div>
              <label class="text-sm font-medium text-slate-700 mb-3 block">
                目前遇到的困境
              </label>
              <div class="grid grid-cols-2 gap-3">
                <label
                  v-for="(label, value) in otaChallengeLabels"
                  :key="value"
                  class="flex items-center gap-3 p-3 border border-slate-200 rounded-md cursor-pointer hover:border-blue-400 hover:bg-blue-50/50 transition-all"
                >
                  <a-checkbox
                    :checked="formData.otaChallenges.includes(value)"
                    @change="toggleChallenge(value)"
                    class="w-5 h-5"
                  />
                  <span class="text-sm text-slate-700">{{ label }}</span>
                </label>
              </div>
            </div>
          </div>
        </a-card>

        <!-- 房型图片上传 -->
        <a-card class="rounded-xl border-slate-200 bg-white shadow-sm" :bordered="false">
          <template slot="title">
            <div class="flex items-center justify-between w-full">
              <span class="text-lg font-semibold text-slate-900">房型图片</span>
              <a-button
                type="dashed"
                size="small"
                @click="addRoomType"
                class="h-9 text-blue-600 border-blue-300"
              >
                <a-icon type="plus" />
                添加房型
              </a-button>
            </div>
          </template>
          <div class="space-y-4">
            <div
              v-for="(roomType, index) in roomTypes"
              :key="index"
              class="p-4 border border-slate-200 rounded-lg hover:border-slate-300 transition-colors"
            >
              <div class="flex items-center gap-3 mb-3">
                <span class="text-sm font-medium text-slate-600">房型 {{ index + 1 }}</span>
                <a-input
                  v-model="roomType.roomTypeName"
                  placeholder="单人间 / 双人大床 / 家庭房"
                  class="h-9 flex-1 border-slate-300"
                  :style="{ height: '32px' }"
                />
                <a-button
                  v-if="roomTypes.length > 1"
                  type="link"
                  size="small"
                  @click="removeRoomType(index)"
                  class="h-9 px-2 text-red-600"
                >
                  <a-icon type="close" />
                </a-button>
              </div>

              <!-- 拖拽上传区域 -->
              <div
                @dragover.prevent="dragIndex = index"
                @dragleave="dragIndex = null"
                @drop.prevent="handleDrop($event, index)"
                :class="{
                  'border-2 border-dashed rounded-lg p-6 text-center transition-all': true,
                  'border-blue-500 bg-blue-50': dragIndex === index,
                  'border-slate-300 hover:border-blue-400 hover:bg-slate-50':
                    dragIndex !== index
                }"
              >
                <a-icon type="upload" class="w-10 h-10 mx-auto mb-2 text-slate-400" />
                <p class="text-sm text-slate-600 mb-1">拖拽图片到此处，或点击上传</p>
                <p class="text-xs text-slate-400">支持 JPG、PNG 格式</p>
                <a-button
                  type="dashed"
                  size="small"
                  class="mt-3 h-9 border-slate-300"
                >
                  选择图片
                </a-button>
              </div>

              <!-- 图片预览 -->
              <div v-if="roomType.images.length > 0" class="mt-3 grid grid-cols-4 gap-3">
                <div
                  v-for="(img, imgIndex) in roomType.images"
                  :key="imgIndex"
                  class="relative group"
                >
                  <div class="aspect-square bg-slate-100 rounded-md overflow-hidden">
                    <img
                      :src="img"
                      :alt="`房型${index + 1}-图片${imgIndex + 1}`"
                      class="w-full h-full object-cover"
                    />
                  </div>
                  <button
                    type="button"
                    @click="removeImage(index, imgIndex)"
                    class="absolute -top-2 -right-2 w-6 h-6 bg-red-600 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                  >
                    <a-icon type="close" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </a-card>

        <!-- 提交按钮 -->
        <div class="flex justify-end gap-3 pt-4">
          <a-button
            type="default"
            class="h-11 px-8 border-slate-300 text-slate-700"
          >
            保存草稿
          </a-button>
          <a-button
            type="primary"
            :loading="isSubmitting"
            html-type="submit"
            class="h-11 px-8 bg-blue-600 text-white"
          >
            {{ isSubmitting ? '提交中...' : '提交申请' }}
          </a-button>
        </div>
      </form>
    </div>
  </sidebar>
</template>

<script>
import { defineComponent, ref } from '@vue/composition-api'
import Sidebar from '@/components/Layout/Sidebar.vue'
import JoinApplicationService from './services/joinApplication.service'
import {
  StoreTypeLabels,
  OTAPlatformLabels,
  OTAChallengeLabels,
} from './types/joinApplication.types'

export default defineComponent({
  name: 'JoinApplicationPage',
  components: {
    Sidebar
  },
  setup(props, { root }) {
    // 表单数据
    const formData = ref({
      adminPhone: '',
      adminName: '',
      storeName: '',
      storeType: undefined,
      bookingPlatform: '',
      storeAddress: '',
      storeDescription: '',
      hasOTASpecialist: false,
      otaContactName: '',
      otaContactPhone: '',
      onlinePlatforms: [],
      hasCtripSpecialOffer: false,
      interestedPlatforms: [],
      otaChallenges: [],
      roomTypeImages: [],
    })

    // 房型图片管理
    const roomTypes = ref([
      { roomTypeName: '', images: [] }
    ])

    // 图片拖拽状态
    const dragIndex = ref(null)

    // 提交状态
    const isSubmitting = ref(false)

    // 添加房型
    const addRoomType = () => {
      roomTypes.value.push({ roomTypeName: '', images: [] })
    }

    // 移除房型
    const removeRoomType = (index) => {
      if (roomTypes.value.length > 1) {
        roomTypes.value = roomTypes.value.filter((_, i) => i !== index)
      }
    }

    // 处理图片拖拽上传
    const handleDrop = (event, index) => {
      const files = Array.from(event.dataTransfer.files).filter(file =>
        file.type.startsWith('image/')
      )

      if (files.length > 0) {
        const newImages = files.map(file => URL.createObjectURL(file))
        roomTypes.value[index].images = [...roomTypes.value[index].images, ...newImages]
      }
    }

    // 移除图片
    const removeImage = (roomIndex, imageIndex) => {
      roomTypes.value[roomIndex].images = roomTypes.value[roomIndex].images.filter(
        (_, i) => i !== imageIndex
      )
    }

    // 切换平台选择
    const togglePlatform = (field, platform) => {
      const current = formData.value[field] || []
      if (current.includes(platform)) {
        formData.value[field] = current.filter(p => p !== platform)
      } else {
        formData.value[field] = [...current, platform]
      }
    }

    // 切换困境选择
    const toggleChallenge = (challenge) => {
      const current = formData.value.otaChallenges || []
      if (current.includes(challenge)) {
        formData.value.otaChallenges = current.filter(c => c !== challenge)
      } else {
        formData.value.otaChallenges = [...current, challenge]
      }
    }

    // 提交表单
    const handleSubmit = async () => {
      try {
        isSubmitting.value = true
        const submitData = {
          ...formData.value,
          roomTypeImages: roomTypes.value,
        }
        await JoinApplicationService.submitApplication(submitData)
        root.$message.success('入驻申请已提交！')
        // 可以添加重定向逻辑
      } catch (error) {
        root.$message.error('提交失败，请重试')
      } finally {
        isSubmitting.value = false
      }
    }

    return {
      formData,
      roomTypes,
      dragIndex,
      isSubmitting,
      storeTypeLabels: StoreTypeLabels,
      otaPlatformLabels: OTAPlatformLabels,
      otaChallengeLabels: OTAChallengeLabels,
      addRoomType,
      removeRoomType,
      handleDrop,
      removeImage,
      togglePlatform,
      toggleChallenge,
      handleSubmit,
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

.text-3xl {
  font-size: 30px;
}

.font-bold {
  font-weight: 700;
}

.text-slate-900 {
  color: #0f172a;
}

.mb-8 {
  margin-bottom: 32px;
}

.text-lg {
  font-size: 18px;
}

.font-semibold {
  font-weight: 600;
}

.mb-4 {
  margin-bottom: 16px;
}

.space-y-4 > * + * {
  margin-top: 16px;
}

.space-y-5 > * + * {
  margin-top: 20px;
}

.grid {
  display: grid;
}

.grid-cols-2 {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.grid-cols-5 {
  grid-template-columns: repeat(5, minmax(0, 1fr));
}

.gap-4 {
  gap: 16px;
}

.col-span-3 {
  grid-column: span 3 / span 3;
}

.col-span-2 {
  grid-column: span 2 / span 2;
}

.text-sm {
  font-size: 14px;
}

.font-medium {
  font-weight: 500;
}

.text-slate-700 {
  color: #334155;
}

.mb-2 {
  margin-bottom: 8px;
}

.block {
  display: block;
}

.text-red-500 {
  color: #ef4444;
}

.px-6 {
  padding-left: 24px;
  padding-right: 24px;
}

.py-3 {
  padding-top: 12px;
  padding-bottom: 12px;
}

.rounded-md {
  border-radius: 6px;
}

.transition-all {
  transition: all 150ms cubic-bezier(0.4, 0, 0.2, 1);
}

.flex {
  display: flex;
}

.items-center {
  align-items: center;
}

.gap-3 {
  gap: 12px;
}

.flex-1 {
  flex: 1 1 0%;
}

.gap-2 {
  gap: 8px;
}

.flex-wrap {
  flex-wrap: wrap;
}

.border {
  border-width: 1px;
}

.border-slate-300 {
  border-color: #cbd5e1;
}

.hover\:border-blue-400:hover {
  border-color: #60a5fa;
}

.mb-3 {
  margin-bottom: 12px;
}

.hover\:bg-blue-50\/50:hover {
  background-color: rgba(239, 246, 255, 0.5);
}

.pt-2 {
  padding-top: 8px;
}

.mt-1 {
  margin-top: 4px;
}

.text-right {
  text-align: right;
}

.text-xs {
  font-size: 12px;
}

.text-slate-400 {
  color: #cbd5e1;
}

.space-y-6 > * + * {
  margin-top: 24px;
}

.p-4 {
  padding: 16px;
}

.rounded-lg {
  border-radius: 8px;
}

.hover\:border-slate-300:hover {
  border-color: #cbd5e1;
}

.p-3 {
  padding: 12px;
}

.text-slate-600 {
  color: #475569;
}

.h-9 {
  height: 36px;
}

.mt-3 {
  margin-top: 12px;
}

.grid-cols-4 {
  grid-template-columns: repeat(4, minmax(0, 1fr));
}

.aspect-square {
  aspect-ratio: 1 / 1;
}

.bg-slate-100 {
  background-color: #f1f5f9;
}

.overflow-hidden {
  overflow: hidden;
}

.w-full {
  width: 100%;
}

.object-cover {
  object-fit: cover;
}

.relative {
  position: relative;
}

.group:hover .group-hover\:opacity-100 {
  opacity: 1;
}

.absolute {
  position: absolute;
}

.-top-2 {
  top: -8px;
}

.-right-2 {
  right: -8px;
}

.w-6 {
  width: 24px;
}

.h-6 {
  height: 24px;
}

.bg-red-600 {
  background-color: #dc2626;
}

.text-white {
  color: #ffffff;
}

.rounded-full {
  border-radius: 9999px;
}

.opacity-0 {
  opacity: 0;
}

.transition-opacity {
  transition: opacity 150ms cubic-bezier(0.4, 0, 0.2, 1);
}

.flex-col {
  flex-direction: column;
}

.justify-center {
  justify-content: center;
}

.justify-end {
  justify-end: flex-end;
}

.pt-4 {
  padding-top: 16px;
}

.px-8 {
  padding-left: 32px;
  padding-right: 32px;
}

.h-11 {
  height: 44px;
}

.bg-blue-600 {
  background-color: #2563eb;
}

.border-dashed {
  border-style: dashed;
}

.border-2 {
  border-width: 2px;
}

.p-6 {
  padding: 24px;
}

.mx-auto {
  margin-left: auto;
  margin-right: auto;
}

.mb-1 {
  margin-bottom: 4px;
}

:deep(.ant-input),
:deep(.ant-textarea),
:deep(.ant-checkbox) {
  font-family: inherit;
}

:deep(.ant-input) {
  border-color: #cbd5e1;
}

:deep(.ant-input:focus) {
  border-color: #3b82f6;
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.1);
}

:deep(.ant-textarea) {
  border-color: #cbd5e1;
}

:deep(.ant-textarea:focus) {
  border-color: #3b82f6;
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.1);
}
</style>
