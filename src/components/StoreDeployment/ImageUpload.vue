<template>
  <div class="image-upload-container">
    <!-- 上传区域 -->
    <div
      v-if="!multiple || images.length < maxCount"
      @click="handleClickUpload"
      @dragover.prevent="isDragging = true"
      @dragleave="isDragging = false"
      @drop.prevent="handleDrop"
      :class="['upload-area', { dragging: isDragging, compact: compact }]"
    >
      <input
        ref="fileInput"
        type="file"
        accept="image/jpeg,image/png,image/webp"
        :multiple="multiple"
        @change="handleFileChange"
        style="display: none"
      />
      <a-icon type="cloud-upload" class="upload-icon" />
      <p class="upload-text">{{ uploadText }}</p>
      <p class="upload-hint">{{ hintText }}</p>
      <a-button type="primary" size="small" class="upload-btn" ghost>
        选择图片
      </a-button>
    </div>

    <!-- 图片预览列表 -->
    <div v-if="images.length > 0" :class="['image-preview-list', { 'single-mode': !multiple }]">
      <draggable
        v-model="images"
        :disabled="!multiple"
        @end="handleSortEnd"
        class="draggable-list"
      >
        <div
          v-for="(img, index) in images"
          :key="img.url || index"
          :class="['image-preview-item', { uploading: img.uploading }]"
        >
          <!-- 上传中状态 -->
          <div v-if="img.uploading" class="uploading-mask">
            <a-spin />
            <p class="uploading-text">上传中...</p>
          </div>

          <!-- 图片预览 -->
          <img
            v-else
            :src="img.url"
            :alt="`图片${index + 1}`"
            class="preview-image"
          />

          <!-- 操作按钮 -->
          <div v-if="!img.uploading" class="image-actions">
            <a-button
              type="link"
              size="small"
              icon="eye"
              @click="handlePreview(img.url)"
              class="action-btn"
            />
            <a-button
              type="link"
              size="small"
              icon="delete"
              @click="handleDelete(index)"
              class="action-btn delete-btn"
            />
          </div>

          <!-- 主图标记（批量上传时第一张为主图） -->
          <div v-if="multiple && index === 0" class="main-tag">主图</div>
        </div>
      </draggable>

      <!-- 已上传数量提示 -->
      <div v-if="multiple && maxCount > 0" class="upload-count">
        已上传 {{ images.length }}/{{ maxCount }} 张
      </div>
    </div>

    <!-- 图片预览弹窗 -->
    <a-modal
      :visible="previewVisible"
      :footer="null"
      @cancel="previewVisible = false"
      width="800px"
      centered
    >
      <img :src="previewImage" style="width: 100%" alt="预览图" />
    </a-modal>
  </div>
</template>

<script>
import { defineComponent, ref, computed, watch } from '@vue/composition-api'
import draggable from 'vuedraggable'
import { uploadImage, uploadImages } from '@/api/storeDeployment'

export default defineComponent({
  name: 'ImageUpload',
  components: {
    draggable
  },
  props: {
    // 单图或多图模式
    multiple: {
      type: Boolean,
      default: false
    },
    // 最多上传数量（仅多图模式有效）
    maxCount: {
      type: Number,
      default: 10
    },
    // 最大文件大小（MB）
    maxSize: {
      type: Number,
      default: 10
    },
    // 建议比例文字
    ratio: {
      type: String,
      default: ''
    },
    // 上传提示文字
    uploadText: {
      type: String,
      default: '拖拽图片到此处，或点击上传'
    },
    // 紧凑模式（更小的上传区域）
    compact: {
      type: Boolean,
      default: false
    },
    // 已有图片列表（v-model）
    value: {
      type: [String, Array],
      default: () => []
    }
  },
  setup(props, { emit, root }) {
    const fileInput = ref(null)
    const isDragging = ref(false)
    const previewVisible = ref(false)
    const previewImage = ref('')

    // 内部图片列表（用于显示和拖拽排序）
    const images = ref([])

    // 提示文字
    const hintText = computed(() => {
      let hint = `支持 JPG、PNG、WEBP 格式，大小 <${props.maxSize}MB`
      if (props.ratio) {
        hint += `，建议比例 ${props.ratio}`
      }
      return hint
    })

    // 初始化图片列表
    watch(
      () => props.value,
      (newValue) => {
        if (props.multiple) {
          images.value = (Array.isArray(newValue) ? newValue : [])
            .map(item => {
              // 如果已经是对象格式，直接使用；否则转换为对象
              if (typeof item === 'string') {
                return { url: item, uploading: false }
              }
              return item
            })
        } else {
          images.value = newValue ? [{ url: newValue, uploading: false }] : []
        }
      },
      { immediate: true }
    )

    // 点击上传
    const handleClickUpload = () => {
      fileInput.value?.click()
    }

    // 文件选择
    const handleFileChange = (event) => {
      const files = Array.from(event.target.files)
      if (files.length > 0) {
        handleFiles(files)
      }
      // 清空 input，允许重复选择同一文件
      event.target.value = ''
    }

    // 拖拽上传
    const handleDrop = (event) => {
      isDragging.value = false
      const files = Array.from(event.dataTransfer.files).filter(file =>
        file.type.startsWith('image/')
      )
      if (files.length > 0) {
        handleFiles(files)
      }
    }

    // 处理文件上传
    const handleFiles = async (files) => {
      // 检查文件大小
      const oversizedFiles = files.filter(
        file => file.size > props.maxSize * 1024 * 1024
      )
      if (oversizedFiles.length > 0) {
        root.$message.error(`图片大小不能超过 ${props.maxSize}MB`)
        return
      }

      // 检查数量限制
      if (props.multiple) {
        const remaining = props.maxCount - images.value.length
        if (files.length > remaining) {
          root.$message.warning(`最多只能上传 ${props.maxCount} 张图片，还可以上传 ${remaining} 张`)
          files = files.slice(0, remaining)
        }
      } else {
        files = files.slice(0, 1)
      }

      // 添加上传中的占位
      const placeholders = files.map(() => ({ url: '', uploading: true }))
      if (props.multiple) {
        images.value.push(...placeholders)
      } else {
        images.value = placeholders
      }

      try {
        // 上传图片
        const urls = await Promise.all(
          files.map(file => uploadImage(file))
        )

        // 更新图片列表
        let startIndex = images.value.length - placeholders.length
        urls.forEach((url, index) => {
          images.value[startIndex + index] = { url, uploading: false }
        })

        // 触发更新
        emitUpdate()

        root.$message.success('图片上传成功')
      } catch (error) {
        // 移除上传失败的占位
        images.value = images.value.filter(img => !img.uploading)
        root.$message.error('图片上传失败，请重试')
        console.error('Upload error:', error)
      }
    }

    // 删除图片
    const handleDelete = (index) => {
      root.$confirm({
        title: '确认删除',
        content: '确定要删除这张图片吗？',
        onOk: () => {
          images.value.splice(index, 1)
          emitUpdate()
          root.$message.success('图片已删除')
        }
      })
    }

    // 预览图片
    const handlePreview = (url) => {
      previewImage.value = url
      previewVisible.value = true
    }

    // 拖拽排序结束
    const handleSortEnd = () => {
      emitUpdate()
    }

    // 触发更新事件
    const emitUpdate = () => {
      const urls = images.value.filter(img => !img.uploading).map(img => img.url)
      if (props.multiple) {
        emit('input', urls)
        emit('change', urls)
      } else {
        emit('input', urls[0] || '')
        emit('change', urls[0] || '')
      }
    }

    return {
      fileInput,
      isDragging,
      images,
      hintText,
      previewVisible,
      previewImage,
      handleClickUpload,
      handleFileChange,
      handleDrop,
      handleDelete,
      handlePreview,
      handleSortEnd
    }
  }
})
</script>

<style scoped lang="less">
@import '@/styles/variables.less';

.image-upload-container {
  width: 100%;
}

.upload-area {
  padding: 40px 20px;
  border: 2px dashed @border-primary;
  border-radius: @border-radius-lg;
  text-align: center;
  background: @bg-primary;
  cursor: pointer;
  transition: all 0.2s;

  &.compact {
    padding: 24px 20px;

    .upload-icon {
      font-size: 32px;
      margin-bottom: 8px;
    }

    .upload-text {
      font-size: @font-size-sm;
    }

    .upload-hint {
      font-size: @font-size-xs;
      margin-bottom: 12px;
    }

    .upload-btn {
      height: 28px;
      padding: 0 16px;
      font-size: @font-size-xs;
    }
  }

  &:hover {
    border-color: @brand-primary;
    background: rgba(59, 130, 246, 0.05);
  }

  &.dragging {
    border-color: @brand-primary;
    background: @brand-primary-light;
  }
}

.upload-icon {
  font-size: 48px;
  color: @border-primary;
  margin-bottom: 12px;
}

.upload-text {
  font-size: @font-size-base;
  color: @text-primary;
  margin: 0 0 4px 0;
}

.upload-hint {
  font-size: @font-size-xs;
  color: @text-secondary;
  margin: 0 0 16px 0;
}

.upload-btn {
  height: 32px;
  padding: 0 24px;
  font-size: @font-size-sm;
  border-radius: @border-radius-base;
}

.image-preview-list {
  margin-top: 20px;

  &.single-mode {
    .draggable-list {
      display: block;
    }

    .image-preview-item {
      width: 200px;
      height: 200px;
    }
  }
}

.draggable-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 12px;
}

.image-preview-item {
  position: relative;
  aspect-ratio: 1;
  border-radius: @border-radius-base;
  overflow: hidden;
  background: @bg-secondary;
  border: 1px solid @border-primary;
  cursor: move;

  &.uploading {
    cursor: default;
  }

  &:hover .image-actions {
    opacity: 1;
  }
}

.preview-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.uploading-mask {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.9);
}

.uploading-text {
  margin-top: 8px;
  font-size: @font-size-sm;
  color: @text-secondary;
}

.image-actions {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  background: rgba(0, 0, 0, 0.5);
  opacity: 0;
  transition: opacity 0.2s;
}

.action-btn {
  color: @bg-primary !important;
  font-size: 16px;

  &:hover {
    color: @brand-primary !important;
  }

  &.delete-btn:hover {
    color: @error-color !important;
  }
}

.main-tag {
  position: absolute;
  top: 8px;
  left: 8px;
  padding: 2px 8px;
  background: @brand-primary;
  color: @bg-primary;
  font-size: @font-size-xs;
  font-weight: @font-weight-medium;
  border-radius: @border-radius-sm;
}

.upload-count {
  margin-top: 8px;
  text-align: right;
  font-size: @font-size-sm;
  color: @text-secondary;
}
</style>
