<template>
  <div class="tab4-container">
    <!-- 门店亮点 -->
    <a-card :bordered="false" class="form-section-card">
      <template slot="title">
        <div class="section-header">
          <span class="section-title">门店亮点</span>
          <span class="selected-count">已选 {{ localData.highlights.length }} 项（至少选择3项）</span>
        </div>
      </template>

      <p class="section-hint">请选择门店的特色亮点，这些标签将展示在门店首页</p>

      <!-- 建筑与景观类 -->
      <div class="highlight-category">
        <div class="category-title">建筑与景观类</div>
        <a-checkbox-group v-model="localData.highlights" @change="handleChange" class="checkbox-grid">
          <a-checkbox v-for="item in HIGHLIGHTS_ARCHITECTURE" :key="item" :value="item">
            {{ item }}
          </a-checkbox>
        </a-checkbox-group>
      </div>

      <a-divider />

      <!-- 服务与设施类 -->
      <div class="highlight-category">
        <div class="category-title">服务与设施类</div>
        <a-checkbox-group v-model="localData.highlights" @change="handleChange" class="checkbox-grid">
          <a-checkbox v-for="item in HIGHLIGHTS_SERVICES" :key="item" :value="item">
            {{ item }}
          </a-checkbox>
        </a-checkbox-group>
      </div>
    </a-card>

    <!-- 门店图片 -->
    <a-card :bordered="false" class="form-section-card">
      <template slot="title">
        <span class="section-title">门店图片</span>
      </template>

      <!-- 门店logo -->
      <div class="image-upload-section">
        <div class="upload-label">
          <span class="label-text">门店logo</span>
          <a-tag color="red" size="small">必填</a-tag>
        </div>
        <p class="upload-hint">门店标志，用于列表展示和分享，建议比例1:1，建议尺寸500×500px以上</p>
        <image-upload
          v-model="localData.images.logo"
          :multiple="false"
          :maxSize="5"
          ratio="1:1"
          @change="handleChange"
        />
      </div>

      <a-divider />

      <!-- 列表页封面 -->
      <div class="image-upload-section">
        <div class="upload-label">
          <span class="label-text">列表页封面</span>
          <a-tag color="red" size="small">必填</a-tag>
        </div>
        <p class="upload-hint">平台首页门店列表的封面图，建议比例4:3，宽度>1000px</p>
        <image-upload
          v-model="localData.images.listCover"
          :multiple="false"
          :maxSize="10"
          ratio="4:3"
          @change="handleChange"
        />
      </div>

      <a-divider />

      <!-- 小程序分享图（系统自动生成） -->
      <div class="image-upload-section">
        <div class="upload-label">
          <span class="label-text">小程序分享图</span>
          <a-tag color="blue" size="small">自动生成</a-tag>
        </div>
        <p class="upload-hint">系统将根据列表页封面自动居中裁剪为5:4比例，用于分享链接时的封面</p>
        <div v-if="localData.images.listCover" class="auto-generated-image">
          <img :src="localData.images.listCover" alt="小程序分享图预览" />
          <div class="image-label">自动生成预览（5:4比例）</div>
        </div>
        <div v-else class="empty-hint">请先上传列表页封面</div>
      </div>

      <a-divider />

      <!-- 旅游交通图 -->
      <div class="image-upload-section">
        <div class="upload-label">
          <span class="label-text">旅游交通图</span>
          <a-tag color="red" size="small">必填</a-tag>
        </div>
        <p class="upload-hint">标注门店位置及周边交通、景点的地图，不限比例，清晰可见即可</p>
        <image-upload
          v-model="localData.images.travelMap"
          :multiple="false"
          :maxSize="10"
          @change="handleChange"
        />
      </div>

      <a-divider />

      <!-- 门店主页首图 -->
      <div class="image-upload-section">
        <div class="upload-label">
          <span class="label-text">门店主页首图</span>
          <a-tag color="red" size="small">必填</a-tag>
        </div>
        <p class="upload-hint">门店详情页顶部轮播图，展示门店外观、公区等，建议比例2:3，最多5张，最少1张</p>
        <image-upload
          v-model="localData.images.homePageImages"
          :multiple="true"
          :maxCount="5"
          :maxSize="10"
          ratio="2:3"
          @change="handleChange"
        />
      </div>
    </a-card>

    <!-- 视频素材 -->
    <a-card :bordered="false" class="form-section-card">
      <template slot="title">
        <span class="section-title">视频素材（选填）</span>
      </template>

      <!-- 门店视频 -->
      <div class="image-upload-section">
        <div class="upload-label">
          <span class="label-text">门店视频</span>
          <a-tag color="blue" size="small">选填</a-tag>
        </div>
        <p class="upload-hint">门店介绍视频，展示门店环境和特色，建议比例16:9，大小<100MB，格式mp4/mov/avi</p>
        <div class="video-upload-area">
          <a-upload
            :file-list="videoFileList"
            :before-upload="handleVideoUpload"
            :remove="handleVideoRemove"
            accept="video/mp4,video/quicktime,video/x-msvideo"
          >
            <a-button v-if="!localData.videos.video">
              <a-icon type="upload" /> 上传视频
            </a-button>
          </a-upload>
        </div>
      </div>

      <a-divider />

      <!-- 视频封面 -->
      <div v-if="localData.videos.video" class="image-upload-section">
        <div class="upload-label">
          <span class="label-text">视频封面</span>
          <a-tag color="blue" size="small">选填</a-tag>
        </div>
        <p class="upload-hint">视频播放前的封面图，建议比例16:9</p>
        <image-upload
          v-model="localData.videos.videoCover"
          :multiple="false"
          :maxSize="5"
          ratio="16:9"
          @change="handleChange"
        />
      </div>

      <a-divider />

      <!-- 最新情报 -->
      <div class="image-upload-section">
        <div class="upload-label">
          <span class="label-text">最新情报</span>
          <a-tag color="blue" size="small">选填</a-tag>
        </div>
        <p class="upload-hint">排版好的活动海报或门店介绍长图，丰富门店首页内容，建议竖版长图，宽度750px左右</p>
        <image-upload
          v-model="localData.videos.latestNews"
          :multiple="false"
          :maxSize="10"
          @change="handleChange"
        />
      </div>
    </a-card>
  </div>
</template>

<script>
import { defineComponent, reactive, computed, watch } from '@vue/composition-api'
import ImageUpload from '@/components/StoreDeployment/ImageUpload.vue'
import { uploadVideo } from '@/api/storeDeployment'
import {
  HIGHLIGHTS_ARCHITECTURE,
  HIGHLIGHTS_SERVICES
} from '@/types/storeDeployment'

export default defineComponent({
  name: 'Tab4StoreDisplay',
  components: {
    ImageUpload
  },
  props: {
    formData: {
      type: Object,
      required: true
    }
  },
  setup(props, { emit, root }) {
    // 本地数据
    const localData = reactive({
      highlights: [...props.formData.storeDisplay.highlights],
      images: { ...props.formData.storeDisplay.images },
      videos: { ...props.formData.storeDisplay.videos }
    })

    // 视频文件列表
    const videoFileList = computed(() => {
      if (localData.videos.video) {
        return [{
          uid: '-1',
          name: '门店视频',
          status: 'done',
          url: localData.videos.video
        }]
      }
      return []
    })

    // 监听props变化
    watch(
      () => props.formData.storeDisplay,
      (newData) => {
        localData.highlights = [...newData.highlights]
        localData.images = { ...newData.images }
        localData.videos = { ...newData.videos }
      },
      { deep: true }
    )

    // 视频上传
    const handleVideoUpload = async (file) => {
      const isVideo = file.type.startsWith('video/')
      if (!isVideo) {
        root.$message.error('只能上传视频文件！')
        return false
      }

      const isLt100M = file.size / 1024 / 1024 < 100
      if (!isLt100M) {
        root.$message.error('视频大小不能超过100MB！')
        return false
      }

      try {
        const result = await uploadVideo(file)
        localData.videos.video = result.url
        handleChange()
        root.$message.success('视频上传成功')
      } catch (error) {
        root.$message.error('视频上传失败')
        console.error(error)
      }

      return false
    }

    // 视频删除
    const handleVideoRemove = () => {
      localData.videos.video = ''
      localData.videos.videoCover = ''
      handleChange()
    }

    // 处理数据变化
    const handleChange = () => {
      emit('update', {
        storeDisplay: {
          highlights: localData.highlights,
          images: localData.images,
          videos: localData.videos
        }
      })
    }

    return {
      localData,
      videoFileList,
      HIGHLIGHTS_ARCHITECTURE,
      HIGHLIGHTS_SERVICES,
      handleVideoUpload,
      handleVideoRemove,
      handleChange
    }
  }
})
</script>

<style scoped lang="less">
@import '@/styles/variables.less';

.tab4-container {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.form-section-card {
  border-radius: @border-radius-lg;
  border: 1px solid @border-primary;
  box-shadow: @shadow-sm;

  :deep(.ant-card-head) {
    border-bottom: 1px solid @border-primary;
    padding: 16px 24px;
  }

  :deep(.ant-card-body) {
    padding: 32px 24px;
  }
}

.section-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}

.section-title {
  font-size: @font-size-lg;
  font-weight: @font-weight-semibold;
  color: @text-primary;
}

.selected-count {
  font-size: @font-size-sm;
  color: @text-secondary;
}

.section-hint {
  font-size: @font-size-sm;
  color: @text-secondary;
  margin-bottom: 20px;
  line-height: 1.6;
}

.highlight-category {
  margin-bottom: 24px;

  &:last-child {
    margin-bottom: 0;
  }
}

.category-title {
  font-size: @font-size-base;
  font-weight: @font-weight-medium;
  color: @text-primary;
  margin-bottom: 16px;
}

.checkbox-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 12px;

  :deep(.ant-checkbox-wrapper) {
    margin: 0;
    padding: 10px 12px;
    border: 1px solid @border-primary;
    border-radius: @border-radius-base;
    background: @bg-primary;
    transition: all 0.2s;

    &:hover {
      border-color: @brand-primary;
      background: rgba(59, 130, 246, 0.05);
    }

    &.ant-checkbox-wrapper-checked {
      border-color: @brand-primary;
      background: rgba(59, 130, 246, 0.08);
    }
  }
}

.image-upload-section {
  margin-bottom: 32px;

  &:last-child {
    margin-bottom: 0;
  }
}

.upload-label {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
}

.label-text {
  font-size: @font-size-base;
  font-weight: @font-weight-medium;
  color: @text-primary;
}

.upload-hint {
  font-size: @font-size-sm;
  color: @text-secondary;
  margin-bottom: 16px;
  line-height: 1.6;
}

.auto-generated-image {
  width: 300px;
  border-radius: @border-radius-base;
  overflow: hidden;
  border: 1px solid @border-primary;

  img {
    width: 100%;
    height: auto;
    display: block;
    object-fit: cover;
    aspect-ratio: 5/4;
  }

  .image-label {
    padding: 8px 12px;
    background: @bg-secondary;
    text-align: center;
    font-size: @font-size-xs;
    color: @text-secondary;
  }
}

.empty-hint {
  padding: 24px;
  text-align: center;
  color: @text-secondary;
  background: @bg-secondary;
  border-radius: @border-radius-base;
  font-size: @font-size-sm;
}

.video-upload-area {
  :deep(.ant-upload-list-item) {
    border-radius: @border-radius-base;
  }
}

:deep(.ant-divider) {
  margin: 24px 0;
}
</style>
