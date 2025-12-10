<template>
  <sidebar>
    <div class="store-deployment-page">
      <!-- 准备清单页面 -->
      <div v-if="showChecklist" class="checklist-container">
        <!-- 温馨提示 -->
        <a-alert
          message="表单会自动保存，您可以随时退出，稍后继续填写。建议您先准备好所有材料，以便一次性完成填写。"
          type="info"
          show-icon
          class="tip-alert"
        />

        <a-card :bordered="false" class="checklist-card">
          <template slot="title">
            <span class="card-title">📷 请提前准备好图片</span>
          </template>

          <a-table
            :columns="imageColumns"
            :data-source="imageRequirements"
            :pagination="false"
            rowKey="name"
            class="checklist-table"
          >
            <template slot="required" slot-scope="required">
              <a-tag :color="required ? 'red' : 'blue'">
                {{ required ? '必填' : '选填' }}
              </a-tag>
            </template>
            <template slot="description" slot-scope="text, record">
              <div class="description-cell">
                <span>{{ text }}</span>
                <a-button
                  v-if="record.exampleImage"
                  type="link"
                  size="small"
                  @click="handlePreviewExample(record.exampleImage)"
                  class="example-btn"
                >
                  <a-icon type="picture" />
                  查看示例
                </a-button>
              </div>
            </template>
          </a-table>
        </a-card>

        <a-card :bordered="false" class="checklist-card">
          <template slot="title">
            <span class="card-title">📝 请提前准备好信息</span>
          </template>

          <a-table
            :columns="infoColumns"
            :data-source="infoRequirements"
            :pagination="false"
            rowKey="name"
            class="checklist-table"
          >
            <template slot="required" slot-scope="required">
              <a-tag :color="required ? 'red' : 'blue'">
                {{ required ? '必填' : '选填' }}
              </a-tag>
            </template>
          </a-table>
        </a-card>

        <!-- 底部吸底按钮栏 -->
        <div class="checklist-footer">
          <div class="footer-content">
            <div style="flex: 1"></div>
            <a-button type="primary" size="large" @click="handleStart">
              开始录入门店信息
              <a-icon type="right" />
            </a-button>
          </div>
        </div>
      </div>

      <!-- 主表单页面 -->
      <store-deployment-form v-else />

      <!-- 示例图片预览弹窗 -->
      <a-modal
        :visible="previewVisible"
        :footer="null"
        @cancel="previewVisible = false"
        width="800px"
        centered
      >
        <img :src="previewImage" style="width: 100%" alt="示例图片" />
      </a-modal>
    </div>
  </sidebar>
</template>

<script>
import { defineComponent, ref } from '@vue/composition-api'
import Sidebar from '@/components/Layout/Sidebar.vue'
import StoreDeploymentForm from './StoreDeploymentForm.vue'

export default defineComponent({
  name: 'StoreDeploymentPage',
  components: {
    Sidebar,
    StoreDeploymentForm
  },
  setup(props, { root }) {
    const showChecklist = ref(true)

    // 图片预览状态
    const previewVisible = ref(false)
    const previewImage = ref('')

    // 查看示例图
    const handlePreviewExample = (imagePath) => {
      previewImage.value = imagePath
      previewVisible.value = true
    }

    // 图片/视频清单列
    const imageColumns = [
      {
        title: '素材名称',
        dataIndex: 'name',
        width: 150
      },
      {
        title: '是否必填',
        dataIndex: 'required',
        width: 100,
        scopedSlots: { customRender: 'required' }
      },
      {
        title: '规格要求',
        dataIndex: 'spec',
        width: 250
      },
      {
        title: '说明',
        dataIndex: 'description',
        scopedSlots: { customRender: 'description' }
      }
    ]

    // 图片/视频清单数据（必填在前，选填在后）
    const imageRequirements = [
      // 必填项
      {
        name: '门店logo',
        required: true,
        spec: '比例1:1，建议尺寸500×500px以上',
        description: '展示一个典型的民宿logo，方形构图',
        exampleImage: '/examples/门店logo.jpg'
      },
      {
        name: '列表页封面',
        required: true,
        spec: '比例4:3，宽度大于1000px',
        description: '展示一张横构图的民宿外观照片',
        exampleImage: '/examples/列表封面.jpg'
      },
      {
        name: '门店主页首图',
        required: true,
        spec: '比例2:3，竖构图，最多5张',
        description: '展示竖构图的民宿照片（如门口、公区、特色角落）',
        exampleImage: '/examples/门店主页首图.png'
      },
      {
        name: '旅游交通图',
        required: true,
        spec: '不限比例，清晰可见',
        description: '标注门店位置、周边景点、交通站点的地图',
        exampleImage: '/examples/旅游交通图.jpg'
      },
      {
        name: '房型图片',
        required: true,
        spec: '比例3:2，每个房型最多10张',
        description: '展示房间内景照片（床、卫浴、窗景等角度）'
      },
      // 选填项
      {
        name: '门店视频',
        required: false,
        spec: '比例16:9，大小<100MB',
        description: '门店介绍视频'
      },
      {
        name: '视频封面',
        required: false,
        spec: '比例16:9',
        description: '视频播放前的封面图',
        exampleImage: '/examples/视频封面.jpg'
      },
      {
        name: '最新情报图',
        required: false,
        spec: '竖版长图，宽度建议750px',
        description: '展示一张排版好的活动海报或介绍长图',
        exampleImage: '/examples/最新情报.jpg'
      }
    ]

    // 信息清单列
    const infoColumns = [
      {
        title: '信息类别',
        dataIndex: 'name',
        width: 200
      },
      {
        title: '是否必填',
        dataIndex: 'required',
        width: 100,
        scopedSlots: { customRender: 'required' }
      },
      {
        title: '说明',
        dataIndex: 'description'
      }
    ]

    // 信息清单数据（必填在前，选填在后）
    const infoRequirements = [
      // 必填项
      {
        name: '主账号手机号',
        required: true,
        description: '用于登录系统的手机号'
      },
      {
        name: '门店介绍文案',
        required: true,
        description: '200-1000字，可从公众号、美团等平台复制'
      },
      {
        name: '门店设施清单',
        required: true,
        description: '勾选门店提供的所有设施和服务'
      },
      {
        name: '周边交通、景点、餐饮信息',
        required: true,
        description: '需要填写具体地点名称、距离、驾车时间'
      },
      {
        name: '运营政策',
        required: true,
        description: '入住时间、退房时间、取消政策等'
      },
      {
        name: '所有房型详细参数',
        required: true,
        description: '每个房型的面积、床型、设施等信息'
      },
      // 选填项
      {
        name: 'PMS系统信息',
        required: false,
        description: '如使用"订单来了"等系统，需准备门店编号'
      }
    ]

    // 开始填写
    const handleStart = () => {
      showChecklist.value = false
    }

    return {
      showChecklist,
      previewVisible,
      previewImage,
      imageColumns,
      imageRequirements,
      infoColumns,
      infoRequirements,
      handlePreviewExample,
      handleStart
    }
  }
})
</script>

<style scoped lang="less">
@import '@/styles/variables.less';

.store-deployment-page {
  min-height: 100vh;
  background: @bg-tertiary;
}

.checklist-container {
  padding: 20px 20px 100px;
  max-width: 1400px;
  margin: 0 auto;
}

.checklist-card {
  margin-bottom: 16px;
  border-radius: @border-radius-lg;
  border: 1px solid @border-primary;
  box-shadow: @shadow-sm;

  :deep(.ant-card-head) {
    border-bottom: 1px solid @border-primary;
    padding: 6px 20px;
    min-height: auto;
  }

  :deep(.ant-card-head-title) {
    padding: 0;
  }

  :deep(.ant-card-body) {
    padding: 16px 20px;
  }
}

.card-title {
  font-size: @font-size-base;
  font-weight: @font-weight-semibold;
  color: @text-primary;
}

.checklist-table {
  :deep(.ant-table) {
    border: 1px solid @border-primary;
    border-radius: @border-radius-base;
  }

  :deep(.ant-table-thead > tr > th) {
    background: @bg-secondary;
    border-bottom: 1px solid @border-primary;
    color: @text-primary;
    font-weight: @font-weight-semibold;
    font-size: @font-size-base;
    padding: 12px 16px;
  }

  :deep(.ant-table-tbody > tr > td) {
    border-bottom: 1px solid @border-primary;
    padding: 12px 16px;
    color: @text-primary;
    font-size: @font-size-sm;
  }

  :deep(.ant-table-tbody > tr:last-child > td) {
    border-bottom: none;
  }
}

.description-cell {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.example-btn {
  flex-shrink: 0;
  padding: 0 8px;
  font-size: @font-size-sm;
  color: @brand-primary;

  &:hover {
    color: @brand-primary-hover;
  }

  :deep(.anticon) {
    font-size: @font-size-sm;
  }
}

.tip-alert {
  margin-bottom: 16px;
  border-radius: @border-radius-base;
  padding: 16px 20px;

  :deep(.ant-alert-message) {
    font-size: @font-size-base;
    color: @text-primary;
    line-height: 1.8;
    font-weight: @font-weight-medium;
  }

  :deep(.ant-alert-icon) {
    font-size: 18px;
  }
}

.checklist-footer {
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

  .footer-content {
    max-width: 1400px;
    width: 100%;
    padding: 0 20px;
    display: flex;
    align-items: center;
    gap: 12px;
  }
}

.form-container {
  padding: 24px;
  max-width: 1400px;
  margin: 0 auto;
}
</style>
