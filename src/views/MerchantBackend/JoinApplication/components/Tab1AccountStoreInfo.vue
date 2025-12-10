<template>
  <div class="tab1-container">
    <!-- 账号信息 -->
    <a-card :bordered="false" class="form-section-card">
      <template slot="title">
        <span class="section-title">账号信息</span>
      </template>

      <a-form-model
        :model="localData.accountInfo"
        :label-col="{ span: 6 }"
        :wrapper-col="{ span: 14 }"
      >
        <a-form-model-item label="主账号" required>
          <a-input
            v-model="localData.accountInfo.mainAccount"
            placeholder="13575481983"
            :maxLength="11"
            @change="handleChange"
          >
            <a-icon slot="prefix" type="phone" />
          </a-input>
          <div class="field-hint">系统最高权限者，用于登录</div>
        </a-form-model-item>

        <a-form-model-item label="预订电话" required>
          <a-input
            v-model="localData.accountInfo.bookingPhone"
            placeholder="13575481983"
            @change="handleChange"
          >
            <a-icon slot="prefix" type="phone" />
          </a-input>
          <div class="field-hint">客人预订时的联系电话</div>
        </a-form-model-item>

        <a-form-model-item label="预订微信">
          <a-input
            v-model="localData.accountInfo.bookingWechat"
            placeholder="13575481983"
            :maxLength="50"
            @change="handleChange"
          >
            <a-icon slot="prefix" type="wechat" />
          </a-input>
          <div class="field-hint">客人预订时的微信号</div>
        </a-form-model-item>

        <a-form-model-item label="PMS房态管理系统">
          <a-input
            v-model="localData.accountInfo.pmsSystem"
            placeholder="订单来了"
            :maxLength="50"
            @change="handleChange"
          />
          <div class="field-hint">如使用PMS系统，请填写系统名称</div>
        </a-form-model-item>

        <a-form-model-item
          v-if="localData.accountInfo.pmsSystem"
          label="PMS系统门店编号"
        >
          <a-input
            v-model="localData.accountInfo.pmsStoreCode"
            placeholder="69808093"
            :maxLength="50"
            @change="handleChange"
          />
          <div class="field-hint">PMS系统中的门店编号</div>
        </a-form-model-item>
      </a-form-model>
    </a-card>

    <!-- 门店基本信息 -->
    <a-card :bordered="false" class="form-section-card">
      <template slot="title">
        <span class="section-title">门店基本信息</span>
      </template>

      <a-form-model
        :model="localData.storeBasicInfo"
        :label-col="{ span: 6 }"
        :wrapper-col="{ span: 14 }"
      >
        <a-form-model-item label="门店名称" required>
          <a-input
            v-model="localData.storeBasicInfo.storeName"
            placeholder="原乡芦茨"
            :maxLength="50"
            @change="handleChange"
          />
          <div class="field-hint">门店对外展示的名称</div>
        </a-form-model-item>

        <a-form-model-item label="详细地址" required>
          <a-input
            v-model="localData.storeBasicInfo.storeAddress"
            placeholder="XX省XX市XX区XX街道XX号"
            :maxLength="200"
            @change="handleChange"
          />
          <div class="field-hint">门店完整地址</div>
        </a-form-model-item>

        <a-form-model-item label="房间数量" required>
          <a-input-number
            v-model="localData.storeBasicInfo.roomCount"
            :min="1"
            :max="500"
            placeholder="21"
            style="width: 100%"
            @change="handleChange"
          />
          <div class="field-hint">门店客房总数，此数字会影响后续房型配置提示</div>
        </a-form-model-item>

        <a-form-model-item label="开业时间" required>
          <a-input
            v-model="localData.storeBasicInfo.openingYear"
            placeholder="2016年 或 2016"
            :maxLength="20"
            @change="handleChange"
          />
          <div class="field-hint">门店开业年份</div>
        </a-form-model-item>

        <a-form-model-item label="slogan或门店推荐语">
          <a-input
            v-model="localData.storeBasicInfo.slogan"
            placeholder="闭门深山，无计好眠。"
            :maxLength="50"
            @change="handleChange"
          />
          <div class="field-hint">一句话介绍门店特色</div>
        </a-form-model-item>
      </a-form-model>
    </a-card>

    <!-- 门店介绍 -->
    <a-card :bordered="false" class="form-section-card">
      <template slot="title">
        <span class="section-title">门店介绍</span>
      </template>

      <div class="textarea-container">
        <a-textarea
          v-model="localData.storeBasicInfo.storeDescription"
          placeholder="详细介绍门店位置、建筑特色、房型分布、配套设施、周边环境等。请分段描述，让客人全面了解您的门店。

示例：
XXXX位于富春江畔毗邻芦茨湾，几幢青瓦白墙小楼依次坐落在芦茨湾边上，推门望江水，开窗见青山。

目前分为4栋，分别为1号院、2号院、3号院、5号院，共计21间客房。大大落地窗，独户一露台，足不出户坐看闲云。

设有餐厅、咖啡馆、茶空间和猫猫杂货铺，暖身暖胃，食住无忧。"
          :rows="12"
          :maxLength="1000"
          @change="handleChange"
          class="description-textarea"
        />
        <div class="char-count" :class="{ warning: descriptionLength > 1000 }">
          {{ descriptionLength }}/1000 字
          <span v-if="descriptionLength < 200" class="hint-text">（至少200字）</span>
        </div>
      </div>
    </a-card>
  </div>
</template>

<script>
import { defineComponent, reactive, computed, watch } from '@vue/composition-api'

export default defineComponent({
  name: 'Tab1AccountStoreInfo',
  props: {
    formData: {
      type: Object,
      required: true
    }
  },
  setup(props, { emit }) {
    // 本地数据（用于双向绑定）
    const localData = reactive({
      accountInfo: { ...props.formData.accountInfo },
      storeBasicInfo: { ...props.formData.storeBasicInfo }
    })

    // 门店介绍字数统计
    const descriptionLength = computed(() => {
      return localData.storeBasicInfo.storeDescription?.length || 0
    })

    // 监听props变化
    watch(
      () => props.formData,
      (newData) => {
        localData.accountInfo = { ...newData.accountInfo }
        localData.storeBasicInfo = { ...newData.storeBasicInfo }
      },
      { deep: true }
    )

    // 处理数据变化
    const handleChange = () => {
      emit('update', {
        accountInfo: localData.accountInfo,
        storeBasicInfo: localData.storeBasicInfo
      })
    }

    return {
      localData,
      descriptionLength,
      handleChange
    }
  }
})
</script>

<style scoped lang="less">
@import '@/styles/variables.less';

.tab1-container {
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

.section-title {
  font-size: @font-size-lg;
  font-weight: @font-weight-semibold;
  color: @text-primary;
}

.field-hint {
  font-size: @font-size-xs;
  color: @text-secondary;
  margin-top: 4px;
  line-height: 1.4;
}

.textarea-container {
  position: relative;
}

.description-textarea {
  :deep(textarea) {
    font-size: @font-size-sm;
    line-height: 1.8;
    resize: vertical;
    border-radius: @border-radius-base;

    &::placeholder {
      color: @text-tertiary;
      line-height: 1.8;
    }
  }
}

.char-count {
  text-align: right;
  font-size: @font-size-xs;
  color: @text-secondary;
  margin-top: 8px;

  &.warning {
    color: @error-color;
  }

  .hint-text {
    color: @warning-color;
    margin-left: 8px;
  }
}

:deep(.ant-form-item) {
  margin-bottom: 24px;
}

:deep(.ant-form-item-label) {
  font-weight: @font-weight-medium;
  color: @text-primary;

  &> label::after {
    content: '';
  }
}

:deep(.ant-input),
:deep(.ant-input-number) {
  border-radius: @border-radius-base;
  border-color: @border-primary;

  &:hover {
    border-color: @brand-primary-hover;
  }

  &:focus {
    border-color: @brand-primary;
    box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.1);
  }
}

:deep(.ant-input-number) {
  width: 100%;
}

:deep(.ant-input-affix-wrapper) {
  border-radius: @border-radius-base;

  &:hover {
    border-color: @brand-primary-hover;
  }

  &:focus,
  &-focused {
    border-color: @brand-primary;
    box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.1);
  }
}
</style>
