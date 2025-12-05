<template>
  <sidebar>
    <div class="page-container">
      <a-card title="房型图片管理" :bordered="false">
        <!-- 筛选器 -->
        <div class="filter-row">
          <a-input
            v-model="searchValue"
            placeholder="请选择类型"
            style="width: 200px"
            allow-clear
          >
            <a-icon slot="prefix" type="search" />
          </a-input>
          <a-select v-model="buildingNumber" placeholder="房型" style="width: 200px">
            <a-select-option value="all">全部</a-select-option>
            <a-select-option value="1号院">1号院</a-select-option>
            <a-select-option value="2号院">2号院</a-select-option>
            <a-select-option value="3号院">3号院</a-select-option>
          </a-select>
          <a-button type="primary" icon="search" @click="handleFilter">
            筛选
          </a-button>
        </div>

        <a-divider />

        <!-- 房型图片列表 -->
        <a-spin :spinning="loading">
          <div class="room-types-list">
            <div
              v-for="roomType in roomTypes"
              :key="roomType.id"
              class="room-type-section"
            >
              <div class="room-type-header">
                <h3 class="room-type-title">
                  {{ roomType.roomTypeName }}【{{ roomType.buildingNumber }}】
                </h3>
                <p class="room-type-tip">
                  请上传图片，至少1张，建议尺寸3:2，支持PNG、JPG、JPEG格式，
                  大小不超过5M，最多可上传{{ roomType.maxImages }}张。
                </p>
              </div>

              <div class="images-grid">
                <!-- 已上传的图片 -->
                <div
                  v-for="image in roomType.images"
                  :key="image.id"
                  class="image-item"
                >
                  <div class="image-wrapper">
                    <img
                      :src="image.thumbnail || image.url"
                      :alt="roomType.roomTypeName"
                      class="image-preview"
                    />
                    <div class="image-overlay">
                      <a-button
                        type="danger"
                        size="small"
                        icon="delete"
                        @click="handleImageDelete(roomType.id, image.id)"
                      >
                        删除
                      </a-button>
                    </div>
                  </div>
                </div>

                <!-- 上传按钮 -->
                <div
                  v-if="roomType.images.length < roomType.maxImages"
                  class="upload-item"
                >
                  <a-upload
                    :show-upload-list="false"
                    :before-upload="(file) => handleBeforeUpload(file, roomType.id)"
                    accept="image/png,image/jpeg,image/jpg"
                  >
                    <div class="upload-button">
                      <a-icon type="plus" style="font-size: 32px" />
                    </div>
                  </a-upload>
                </div>
              </div>
            </div>

            <div v-if="roomTypes.length === 0" class="empty-state">
              暂无房型数据
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
import RoomTypeImagesService from './services/roomTypeImages.service'

export default defineComponent({
  name: 'RoomTypeImagesPage',
  components: { Sidebar },
  setup(props, { root }) {
    const loading = ref(false)
    const roomTypes = ref([])
    const searchValue = ref('')
    const buildingNumber = ref('all')

    // 加载房型图片列表
    const loadRoomTypes = async () => {
      loading.value = true
      try {
        const data = await RoomTypeImagesService.getList({
          search: searchValue.value,
          buildingNumber: buildingNumber.value
        })
        roomTypes.value = data
      } catch (error) {
        console.error('Failed to load room type images:', error)
        root.$message.error('加载失败')
      } finally {
        loading.value = false
      }
    }

    // 筛选
    const handleFilter = () => {
      loadRoomTypes()
    }

    // 上传前验证
    const handleBeforeUpload = async (file, roomTypeId) => {
      // 验证文件大小
      if (file.size > 5 * 1024 * 1024) {
        root.$message.error('图片大小不能超过5M')
        return false
      }

      // 验证文件类型
      const isImage = file.type === 'image/png' || file.type === 'image/jpeg' || file.type === 'image/jpg'
      if (!isImage) {
        root.$message.error('只支持PNG、JPG、JPEG格式')
        return false
      }

      // 执行上传
      try {
        loading.value = true
        await RoomTypeImagesService.uploadImage(roomTypeId, file)
        root.$message.success('上传成功')
        await loadRoomTypes()
      } catch (error) {
        console.error('Failed to upload image:', error)
        root.$message.error('上传失败')
      } finally {
        loading.value = false
      }

      return false // 阻止默认上传行为
    }

    // 删除图片
    const handleImageDelete = (roomTypeId, imageId) => {
      root.$confirm({
        title: '确认删除',
        content: '确定要删除这张图片吗？',
        onOk: async () => {
          try {
            loading.value = true
            await RoomTypeImagesService.deleteImage(roomTypeId, imageId)
            root.$message.success('删除成功')
            await loadRoomTypes()
          } catch (error) {
            console.error('Failed to delete image:', error)
            root.$message.error('删除失败')
          } finally {
            loading.value = false
          }
        }
      })
    }

    onMounted(() => {
      loadRoomTypes()
    })

    return {
      loading,
      roomTypes,
      searchValue,
      buildingNumber,
      handleFilter,
      handleBeforeUpload,
      handleImageDelete
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

.filter-row {
  display: flex;
  align-items: center;
  gap: 12px;
}

.room-types-list {
  .room-type-section {
    margin-bottom: 48px;

    &:last-child {
      margin-bottom: 0;
    }

    .room-type-header {
      margin-bottom: 16px;

      .room-type-title {
        font-size: 18px;
        font-weight: 500;
        margin-bottom: 8px;
        color: rgba(0, 0, 0, 0.85);
      }

      .room-type-tip {
        font-size: 14px;
        color: rgba(0, 0, 0, 0.45);
        margin: 0;
      }
    }

    .images-grid {
      display: grid;
      grid-template-columns: repeat(6, 1fr);
      gap: 16px;

      @media (max-width: 1200px) {
        grid-template-columns: repeat(4, 1fr);
      }

      @media (max-width: 768px) {
        grid-template-columns: repeat(3, 1fr);
      }

      .image-item {
        aspect-ratio: 3/2;
        border-radius: 8px;
        overflow: hidden;

        .image-wrapper {
          position: relative;
          width: 100%;
          height: 100%;

          .image-preview {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }

          .image-overlay {
            position: absolute;
            inset: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            background: rgba(0, 0, 0, 0.5);
            opacity: 0;
            transition: opacity 0.2s;

            &:hover {
              opacity: 1;
            }
          }
        }
      }

      .upload-item {
        aspect-ratio: 3/2;

        .upload-button {
          width: 100%;
          height: 100%;
          border: 2px dashed #d9d9d9;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s;
          color: rgba(0, 0, 0, 0.25);

          &:hover {
            border-color: #1890ff;
            color: #1890ff;
          }
        }
      }
    }
  }

  .empty-state {
    text-align: center;
    padding: 48px;
    color: rgba(0, 0, 0, 0.45);
  }
}
</style>
