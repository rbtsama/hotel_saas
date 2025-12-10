<template>
  <div class="tab2-container">
    <!-- 门店设施 -->
    <a-card :bordered="false" class="form-section-card">
      <template slot="title">
        <span class="section-title">门店设施</span>
      </template>

      <!-- 交通服务 -->
      <div class="facility-category">
        <div class="category-header">
          <span class="category-title">交通服务</span>
          <a-tag color="red" size="small">必填，至少选1项</a-tag>
        </div>
        <a-checkbox-group v-model="localData.storeFacilities.transportation" @change="handleChange" class="checkbox-grid">
          <a-checkbox v-for="item in TRANSPORTATION_FACILITIES" :key="item" :value="item">
            {{ item }}
          </a-checkbox>
        </a-checkbox-group>
      </div>

      <a-divider />

      <!-- 清洁服务 -->
      <div class="facility-category">
        <div class="category-header">
          <span class="category-title">清洁服务</span>
          <a-tag color="red" size="small">必填，至少选1项</a-tag>
        </div>
        <a-checkbox-group v-model="localData.storeFacilities.cleaning" @change="handleChange" class="checkbox-grid">
          <a-checkbox v-for="item in CLEANING_FACILITIES" :key="item" :value="item">
            {{ item }}
          </a-checkbox>
        </a-checkbox-group>
      </div>

      <a-divider />

      <!-- 安全安保 -->
      <div class="facility-category">
        <div class="category-header">
          <span class="category-title">安全安保</span>
          <a-tag color="red" size="small">必填，至少选1项</a-tag>
        </div>
        <a-checkbox-group v-model="localData.storeFacilities.security" @change="handleChange" class="checkbox-grid">
          <a-checkbox v-for="item in SECURITY_FACILITIES" :key="item" :value="item">
            {{ item }}
          </a-checkbox>
        </a-checkbox-group>
      </div>

      <a-divider />

      <!-- 公共区域 -->
      <div class="facility-category">
        <div class="category-header">
          <span class="category-title">公共区域</span>
          <a-tag color="red" size="small">必填，至少选1项</a-tag>
        </div>
        <a-checkbox-group v-model="localData.storeFacilities.publicArea" @change="handleChange" class="checkbox-grid">
          <a-checkbox v-for="item in PUBLIC_AREA_FACILITIES" :key="item" :value="item">
            {{ item }}
          </a-checkbox>
        </a-checkbox-group>
      </div>

      <a-divider />

      <!-- 前台服务 -->
      <div class="facility-category">
        <div class="category-header">
          <span class="category-title">前台服务</span>
          <a-tag color="red" size="small">必填，至少选1项</a-tag>
        </div>
        <a-checkbox-group v-model="localData.storeFacilities.frontDesk" @change="handleChange" class="checkbox-grid">
          <a-checkbox v-for="item in FRONT_DESK_FACILITIES" :key="item" :value="item">
            {{ item }}
          </a-checkbox>
        </a-checkbox-group>
      </div>

      <a-divider />

      <!-- 娱乐设施 -->
      <div class="facility-category">
        <div class="category-header">
          <span class="category-title">娱乐设施</span>
          <a-tag color="blue" size="small">选填</a-tag>
        </div>
        <a-checkbox-group v-model="localData.storeFacilities.entertainment" @change="handleChange" class="checkbox-grid">
          <a-checkbox v-for="item in ENTERTAINMENT_FACILITIES" :key="item" :value="item">
            {{ item }}
          </a-checkbox>
        </a-checkbox-group>
      </div>

      <a-divider />

      <!-- 餐饮服务 -->
      <div class="facility-category">
        <div class="category-header">
          <span class="category-title">餐饮服务</span>
          <a-tag color="blue" size="small">选填</a-tag>
        </div>
        <a-checkbox-group v-model="localData.storeFacilities.catering" @change="handleChange" class="checkbox-grid">
          <a-checkbox v-for="item in CATERING_FACILITIES" :key="item" :value="item">
            {{ item }}
          </a-checkbox>
        </a-checkbox-group>
      </div>

      <a-divider />

      <!-- 商务服务 -->
      <div class="facility-category">
        <div class="category-header">
          <span class="category-title">商务服务</span>
          <a-tag color="blue" size="small">选填</a-tag>
        </div>
        <a-checkbox-group v-model="localData.storeFacilities.business" @change="handleChange" class="checkbox-grid">
          <a-checkbox v-for="item in BUSINESS_FACILITIES" :key="item" :value="item">
            {{ item }}
          </a-checkbox>
        </a-checkbox-group>
      </div>

      <a-divider />

      <!-- 儿童设施 -->
      <div class="facility-category">
        <div class="category-header">
          <span class="category-title">儿童设施</span>
          <a-tag color="blue" size="small">选填</a-tag>
        </div>
        <a-checkbox-group v-model="localData.storeFacilities.children" @change="handleChange" class="checkbox-grid">
          <a-checkbox v-for="item in CHILDREN_FACILITIES" :key="item" :value="item">
            {{ item }}
          </a-checkbox>
        </a-checkbox-group>
      </div>

      <a-divider />

      <!-- 运动设施 -->
      <div class="facility-category">
        <div class="category-header">
          <span class="category-title">运动设施</span>
          <a-tag color="blue" size="small">选填</a-tag>
        </div>
        <a-checkbox-group v-model="localData.storeFacilities.sports" @change="handleChange" class="checkbox-grid">
          <a-checkbox v-for="item in SPORTS_FACILITIES" :key="item" :value="item">
            {{ item }}
          </a-checkbox>
        </a-checkbox-group>
      </div>

      <a-divider />

      <!-- 康体设施 -->
      <div class="facility-category">
        <div class="category-header">
          <span class="category-title">康体设施</span>
          <a-tag color="blue" size="small">选填</a-tag>
        </div>
        <a-checkbox-group v-model="localData.storeFacilities.wellness" @change="handleChange" class="checkbox-grid">
          <a-checkbox v-for="item in WELLNESS_FACILITIES" :key="item" :value="item">
            {{ item }}
          </a-checkbox>
        </a-checkbox-group>
      </div>

      <a-divider />

      <!-- 无障碍设施 -->
      <div class="facility-category">
        <div class="category-header">
          <span class="category-title">无障碍设施</span>
          <a-tag color="blue" size="small">选填</a-tag>
        </div>
        <a-checkbox-group v-model="localData.storeFacilities.accessibility" @change="handleChange" class="checkbox-grid">
          <a-checkbox v-for="item in ACCESSIBILITY_FACILITIES" :key="item" :value="item">
            {{ item }}
          </a-checkbox>
        </a-checkbox-group>
      </div>
    </a-card>

    <!-- 周边信息 -->
    <a-card :bordered="false" class="form-section-card">
      <template slot="title">
        <span class="section-title">周边信息</span>
      </template>

      <!-- 交通分类 -->
      <div class="surrounding-category">
        <div class="category-header">
          <span class="category-title">交通</span>
          <a-tag color="red" size="small">必填，至少添加1条</a-tag>
          <a-button type="dashed" size="small" @click="addSurroundingItem('transportation')" class="add-btn">
            <a-icon type="plus" />添加交通信息
          </a-button>
        </div>

        <div v-if="localData.surroundingInfo.transportation.length === 0" class="empty-hint">
          暂无交通信息，请点击上方按钮添加
        </div>

        <div v-else class="surrounding-list">
          <div
            v-for="(item, index) in localData.surroundingInfo.transportation"
            :key="item.id"
            class="surrounding-item"
          >
            <a-row :gutter="12">
              <a-col :span="6">
                <a-input v-model="item.locationName" placeholder="桐庐站" @change="handleChange" />
              </a-col>
              <a-col :span="5">
                <a-input-number
                  v-model="item.distance"
                  placeholder="24"
                  :min="0"
                  :precision="1"
                  style="width: 100%"
                  @change="handleChange"
                >
                  <template slot="addonAfter">公里</template>
                </a-input-number>
              </a-col>
              <a-col :span="5">
                <a-input-number
                  v-model="item.drivingTime"
                  placeholder="25"
                  :min="0"
                  :precision="0"
                  style="width: 100%"
                  @change="handleChange"
                >
                  <template slot="addonAfter">分钟</template>
                </a-input-number>
              </a-col>
              <a-col :span="5">
                <a-checkbox
                  v-model="item.featured"
                  :disabled="!item.featured && featuredCount >= 2"
                  @change="handleChange"
                >
                  重点展示
                </a-checkbox>
              </a-col>
              <a-col :span="3">
                <a-button type="link" danger @click="removeSurroundingItem('transportation', index)">
                  <a-icon type="delete" />删除
                </a-button>
              </a-col>
            </a-row>
          </div>
        </div>
      </div>

      <a-divider />

      <!-- 景点分类 -->
      <div class="surrounding-category">
        <div class="category-header">
          <span class="category-title">景点</span>
          <a-tag color="red" size="small">必填，至少添加1条</a-tag>
          <a-button type="dashed" size="small" @click="addSurroundingItem('attractions')" class="add-btn">
            <a-icon type="plus" />添加景点信息
          </a-button>
        </div>

        <div v-if="localData.surroundingInfo.attractions.length === 0" class="empty-hint">
          暂无景点信息，请点击上方按钮添加
        </div>

        <div v-else class="surrounding-list">
          <div
            v-for="(item, index) in localData.surroundingInfo.attractions"
            :key="item.id"
            class="surrounding-item"
          >
            <a-row :gutter="12">
              <a-col :span="6">
                <a-input v-model="item.locationName" placeholder="富春江镇" @change="handleChange" />
              </a-col>
              <a-col :span="5">
                <a-input-number
                  v-model="item.distance"
                  placeholder="12"
                  :min="0"
                  :precision="1"
                  style="width: 100%"
                  @change="handleChange"
                >
                  <template slot="addonAfter">公里</template>
                </a-input-number>
              </a-col>
              <a-col :span="5">
                <a-input-number
                  v-model="item.drivingTime"
                  placeholder="15"
                  :min="0"
                  :precision="0"
                  style="width: 100%"
                  @change="handleChange"
                >
                  <template slot="addonAfter">分钟</template>
                </a-input-number>
              </a-col>
              <a-col :span="5">
                <a-checkbox
                  v-model="item.featured"
                  :disabled="!item.featured && featuredCount >= 2"
                  @change="handleChange"
                >
                  重点展示
                </a-checkbox>
              </a-col>
              <a-col :span="3">
                <a-button type="link" danger @click="removeSurroundingItem('attractions', index)">
                  <a-icon type="delete" />删除
                </a-button>
              </a-col>
            </a-row>
          </div>
        </div>
      </div>

      <a-divider />

      <!-- 逛吃分类 -->
      <div class="surrounding-category">
        <div class="category-header">
          <span class="category-title">逛吃</span>
          <a-tag color="red" size="small">必填，至少添加1条</a-tag>
          <a-button type="dashed" size="small" @click="addSurroundingItem('food')" class="add-btn">
            <a-icon type="plus" />添加逛吃信息
          </a-button>
        </div>

        <div v-if="localData.surroundingInfo.food.length === 0" class="empty-hint">
          暂无逛吃信息，请点击上方按钮添加
        </div>

        <div v-else class="surrounding-list">
          <div
            v-for="(item, index) in localData.surroundingInfo.food"
            :key="item.id"
            class="surrounding-item"
          >
            <a-row :gutter="12">
              <a-col :span="6">
                <a-input v-model="item.locationName" placeholder="芦茨村" @change="handleChange" />
              </a-col>
              <a-col :span="5">
                <a-input-number
                  v-model="item.distance"
                  placeholder="2"
                  :min="0"
                  :precision="1"
                  style="width: 100%"
                  @change="handleChange"
                >
                  <template slot="addonAfter">公里</template>
                </a-input-number>
              </a-col>
              <a-col :span="5">
                <a-input-number
                  v-model="item.drivingTime"
                  placeholder="10"
                  :min="0"
                  :precision="0"
                  style="width: 100%"
                  @change="handleChange"
                >
                  <template slot="addonAfter">分钟</template>
                </a-input-number>
              </a-col>
              <a-col :span="5">
                <a-checkbox
                  v-model="item.featured"
                  :disabled="!item.featured && featuredCount >= 2"
                  @change="handleChange"
                >
                  重点展示
                </a-checkbox>
              </a-col>
              <a-col :span="3">
                <a-button type="link" danger @click="removeSurroundingItem('food', index)">
                  <a-icon type="delete" />删除
                </a-button>
              </a-col>
            </a-row>
          </div>
        </div>
      </div>
    </a-card>
  </div>
</template>

<script>
import { defineComponent, reactive, computed, watch } from '@vue/composition-api'
import {
  TRANSPORTATION_FACILITIES,
  CLEANING_FACILITIES,
  SECURITY_FACILITIES,
  ENTERTAINMENT_FACILITIES,
  PUBLIC_AREA_FACILITIES,
  FRONT_DESK_FACILITIES,
  CATERING_FACILITIES,
  BUSINESS_FACILITIES,
  CHILDREN_FACILITIES,
  SPORTS_FACILITIES,
  WELLNESS_FACILITIES,
  ACCESSIBILITY_FACILITIES
} from '@/types/storeDeployment'

export default defineComponent({
  name: 'Tab2FacilitiesSurrounding',
  props: {
    formData: {
      type: Object,
      required: true
    }
  },
  setup(props, { emit }) {
    // 本地数据
    const localData = reactive({
      storeFacilities: { ...props.formData.storeFacilities },
      surroundingInfo: {
        transportation: [...props.formData.surroundingInfo.transportation],
        attractions: [...props.formData.surroundingInfo.attractions],
        food: [...props.formData.surroundingInfo.food]
      }
    })

    // 已选设施总数
    const totalSelectedCount = computed(() => {
      return Object.values(localData.storeFacilities).reduce(
        (sum, arr) => sum + arr.length,
        0
      )
    })

    // 重点展示数量
    const featuredCount = computed(() => {
      let count = 0
      count += localData.surroundingInfo.transportation.filter(item => item.featured).length
      count += localData.surroundingInfo.attractions.filter(item => item.featured).length
      count += localData.surroundingInfo.food.filter(item => item.featured).length
      return count
    })

    // 监听props变化
    watch(
      () => props.formData,
      (newData) => {
        localData.storeFacilities = { ...newData.storeFacilities }
        localData.surroundingInfo = {
          transportation: [...newData.surroundingInfo.transportation],
          attractions: [...newData.surroundingInfo.attractions],
          food: [...newData.surroundingInfo.food]
        }
      },
      { deep: true }
    )

    // 添加周边信息
    const addSurroundingItem = (category) => {
      const newItem = {
        id: `${category}_${Date.now()}`,
        locationName: '',
        distance: 0,
        drivingTime: 0,
        featured: false
      }
      localData.surroundingInfo[category].push(newItem)
      handleChange()
    }

    // 删除周边信息
    const removeSurroundingItem = (category, index) => {
      localData.surroundingInfo[category].splice(index, 1)
      handleChange()
    }

    // 处理数据变化
    const handleChange = () => {
      emit('update', {
        storeFacilities: localData.storeFacilities,
        surroundingInfo: localData.surroundingInfo
      })
    }

    return {
      localData,
      totalSelectedCount,
      featuredCount,
      TRANSPORTATION_FACILITIES,
      CLEANING_FACILITIES,
      SECURITY_FACILITIES,
      ENTERTAINMENT_FACILITIES,
      PUBLIC_AREA_FACILITIES,
      FRONT_DESK_FACILITIES,
      CATERING_FACILITIES,
      BUSINESS_FACILITIES,
      CHILDREN_FACILITIES,
      SPORTS_FACILITIES,
      WELLNESS_FACILITIES,
      ACCESSIBILITY_FACILITIES,
      addSurroundingItem,
      removeSurroundingItem,
      handleChange
    }
  }
})
</script>

<style scoped lang="less">
@import '@/styles/variables.less';

.tab2-container {
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

.selected-count,
.featured-count {
  font-size: @font-size-sm;
  color: @text-secondary;
}

.facility-category,
.surrounding-category {
  margin-bottom: 24px;

  &:last-child {
    margin-bottom: 0;
  }
}

.category-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
}

.category-title {
  font-size: @font-size-base;
  font-weight: @font-weight-medium;
  color: @text-primary;
}

.checkbox-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
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

.add-btn {
  margin-left: auto;
  color: @brand-primary;
  border-color: @brand-primary;

  &:hover {
    color: @brand-primary-hover;
    border-color: @brand-primary-hover;
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

.surrounding-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.surrounding-item {
  padding: 16px;
  background: @bg-secondary;
  border-radius: @border-radius-base;
  border: 1px solid @border-primary;

  :deep(.ant-input),
  :deep(.ant-input-number) {
    border-radius: @border-radius-base;
  }
}

:deep(.ant-divider) {
  margin: 24px 0;
}
</style>
