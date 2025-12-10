<template>
  <div class="tab3-container">
    <!-- 基本政策 -->
    <a-card :bordered="false" class="form-section-card">
      <template slot="title">
        <span class="section-title">基本政策</span>
      </template>

      <a-row :gutter="24">
        <a-col :span="8">
          <div class="form-item">
            <label class="form-label">当天最晚预订时间 <span class="required">*</span></label>
            <a-input v-model="formValues.latestBookingTime" placeholder="22:00" />
          </div>
        </a-col>
        <a-col :span="8">
          <div class="form-item">
            <label class="form-label">开始办理入住时间 <span class="required">*</span></label>
            <a-input v-model="formValues.checkInTime" placeholder="15:00" />
          </div>
        </a-col>
        <a-col :span="8">
          <div class="form-item">
            <label class="form-label">最晚退房时间 <span class="required">*</span></label>
            <a-input v-model="formValues.checkOutTime" placeholder="12:00" />
          </div>
        </a-col>
      </a-row>

      <div class="form-item">
        <label class="form-label">重要通知</label>
        <a-textarea
          v-model="formValues.importantNotice"
          placeholder="临时性重要通知，如设施维护等。示例：泳池维护中，12月30日前暂不可使用。"
          :rows="3"
          :maxLength="500"
        />
      </div>

      <div class="form-item">
        <label class="form-label">取消政策 <span class="required">*</span></label>
        <a-textarea
          v-model="formValues.cancellationPolicy"
          placeholder="示例：入住前10天可以免费取消，入住前3天取消将收取全额房费的30%作为损失补偿费用，之后不可取消。"
          :rows="5"
          :maxLength="500"
        />
      </div>
    </a-card>

    <!-- 入住政策 -->
    <a-card :bordered="false" class="form-section-card">
      <template slot="title">
        <span class="section-title">入住政策</span>
      </template>

      <div class="form-item">
        <label class="form-label">最小入住年龄 <span class="required">*</span></label>
        <a-select v-model="formValues.minCheckInAge" placeholder="请选择">
          <a-select-option value="unlimited">不限制</a-select-option>
          <a-select-option value="16+">16岁以上</a-select-option>
          <a-select-option value="18+">18岁以上</a-select-option>
          <a-select-option value="21+">21岁以上</a-select-option>
        </a-select>
      </div>

      <div class="form-item">
        <label class="form-label">是否接待儿童 <span class="required">*</span></label>
        <a-radio-group v-model="formValues.acceptChildren">
          <a-radio value="no">不接待儿童</a-radio>
          <a-radio value="yes">接待儿童</a-radio>
        </a-radio-group>
      </div>

      <div v-if="formValues.acceptChildren === 'yes'" class="form-item">
        <label class="form-label">最小年龄要求 <span class="required">*</span></label>
        <a-select v-model="formValues.childMinAge" placeholder="请选择">
          <a-select-option value="unlimited">不限制</a-select-option>
          <a-select-option value="1+">1岁以上</a-select-option>
          <a-select-option value="3+">3岁以上</a-select-option>
          <a-select-option value="6+">6岁以上</a-select-option>
          <a-select-option value="12+">12岁以上</a-select-option>
        </a-select>
      </div>

      <div class="form-item">
        <label class="form-label">押金政策 <span class="required">*</span></label>
        <a-textarea
          v-model="formValues.depositPolicy"
          placeholder="示例：固定收取1000元；可用支付方式：支持现金、信用卡和第三方支付平台；退还押金方式：退房当日原支付方式退还；或者填写：不收取押金"
          :rows="5"
          :maxLength="500"
        />
      </div>

      <div class="form-item">
        <label class="form-label">前台可用支付方式 <span class="required">*</span></label>
        <a-checkbox-group v-model="formValues.paymentMethods" class="payment-grid">
          <a-checkbox value="unionpay">银联</a-checkbox>
          <a-checkbox value="visa">VISA</a-checkbox>
          <a-checkbox value="mastercard">Mastercard</a-checkbox>
          <a-checkbox value="wechat">微信</a-checkbox>
          <a-checkbox value="alipay">支付宝</a-checkbox>
          <a-checkbox value="apple_pay">Apple Pay</a-checkbox>
          <a-checkbox value="cash">现金</a-checkbox>
        </a-checkbox-group>
      </div>
    </a-card>

    <!-- 早餐政策 -->
    <a-card :bordered="false" class="form-section-card">
      <template slot="title">
        <span class="section-title">早餐政策</span>
      </template>

      <div class="form-item">
        <label class="form-label">是否提供早餐 <span class="required">*</span></label>
        <a-radio-group v-model="formValues.providesBreakfast">
          <a-radio value="no">不提供早餐</a-radio>
          <a-radio value="yes">提供早餐</a-radio>
        </a-radio-group>
      </div>

      <template v-if="formValues.providesBreakfast === 'yes'">
        <a-row :gutter="24">
          <a-col :span="8">
            <div class="form-item">
              <label class="form-label">早餐类型 <span class="required">*</span></label>
              <a-select v-model="formValues.breakfastType" placeholder="请选择">
                <a-select-option value="chinese">中式</a-select-option>
                <a-select-option value="western">西式</a-select-option>
                <a-select-option value="mixed">中西式</a-select-option>
              </a-select>
            </div>
          </a-col>
          <a-col :span="8">
            <div class="form-item">
              <label class="form-label">供应形式 <span class="required">*</span></label>
              <a-select v-model="formValues.servingStyle" placeholder="请选择">
                <a-select-option value="set_meal">固定套餐</a-select-option>
                <a-select-option value="buffet">自助餐</a-select-option>
                <a-select-option value="a_la_carte">单点</a-select-option>
              </a-select>
            </div>
          </a-col>
          <a-col :span="8">
            <div class="form-item">
              <label class="form-label">加早费用（元/份） <span class="required">*</span></label>
              <a-input-number v-model="formValues.breakfastFee" :min="0" placeholder="58" style="width: 100%" />
            </div>
          </a-col>
        </a-row>

        <a-row :gutter="24">
          <a-col :span="12">
            <div class="form-item">
              <label class="form-label">开始时间 <span class="required">*</span></label>
              <a-input v-model="formValues.breakfastStartTime" placeholder="07:30" />
            </div>
          </a-col>
          <a-col :span="12">
            <div class="form-item">
              <label class="form-label">结束时间 <span class="required">*</span></label>
              <a-input v-model="formValues.breakfastEndTime" placeholder="10:00" />
            </div>
          </a-col>
        </a-row>
      </template>
    </a-card>

    <!-- 儿童早餐 -->
    <a-card :bordered="false" class="form-section-card">
      <template slot="title">
        <span class="section-title">儿童早餐</span>
      </template>

      <div class="form-item">
        <label class="form-label">判断标准 <span class="required">*</span></label>
        <a-radio-group v-model="formValues.childCriteria">
          <a-radio value="age">按年龄</a-radio>
          <a-radio value="height">按身高</a-radio>
        </a-radio-group>
      </div>

      <div v-if="formValues.childCriteria === 'age'" class="form-item">
        <label class="form-label">年龄标准 <span class="required">*</span></label>
        <a-select v-model="formValues.childAgeStandard" placeholder="请选择">
          <a-select-option value="under_6">6岁以下</a-select-option>
          <a-select-option value="under_12">12岁以下</a-select-option>
          <a-select-option value="under_16">16岁以下</a-select-option>
          <a-select-option value="under_18">18岁以下</a-select-option>
        </a-select>
      </div>

      <div v-if="formValues.childCriteria === 'height'" class="form-item">
        <label class="form-label">身高标准 <span class="required">*</span></label>
        <a-select v-model="formValues.childHeightStandard" placeholder="请选择">
          <a-select-option value="under_1.2">1.2米以下</a-select-option>
          <a-select-option value="under_1.4">1.4米以下</a-select-option>
          <a-select-option value="under_1.5">1.5米以下</a-select-option>
        </a-select>
      </div>

      <div class="form-item">
        <label class="form-label">收费方式 <span class="required">*</span></label>
        <a-radio-group v-model="formValues.childChargeType">
          <a-radio value="free">免费</a-radio>
          <a-radio value="charged">收费</a-radio>
        </a-radio-group>
      </div>

      <div v-if="formValues.childChargeType === 'charged'" class="form-item">
        <label class="form-label">收费金额（元/人） <span class="required">*</span></label>
        <a-input-number v-model="formValues.childBreakfastFee" :min="0" placeholder="30" style="width: 100%" />
      </div>
    </a-card>
  </div>
</template>

<script>
import { defineComponent, reactive, watch } from '@vue/composition-api'

export default defineComponent({
  name: 'Tab3OperationPolicy',
  props: {
    formData: {
      type: Object,
      required: true
    }
  },
  setup(props, { emit }) {
    // 扁平化的表单数据，避免复杂嵌套
    const formValues = reactive({
      latestBookingTime: '22:00',
      checkInTime: '15:00',
      checkOutTime: '12:00',
      importantNotice: '',
      cancellationPolicy: '',
      minCheckInAge: 'unlimited',
      acceptChildren: 'yes',
      childMinAge: 'unlimited',
      depositPolicy: '',
      paymentMethods: [],
      providesBreakfast: 'no',
      breakfastType: '',
      servingStyle: '',
      breakfastStartTime: '',
      breakfastEndTime: '',
      breakfastFee: 0,
      childCriteria: 'age',
      childAgeStandard: '',
      childHeightStandard: '',
      childChargeType: 'free',
      childBreakfastFee: 0
    })

    // 初始化数据
    const initFormValues = (data) => {
      if (!data) return

      formValues.latestBookingTime = data.latestBookingTime || '22:00'
      formValues.checkInTime = data.checkInTime || '15:00'
      formValues.checkOutTime = data.checkOutTime || '12:00'
      formValues.importantNotice = data.importantNotice || ''
      formValues.cancellationPolicy = data.cancellationPolicy || ''
      formValues.minCheckInAge = data.checkInAge?.minAge || 'unlimited'
      formValues.acceptChildren = data.childPolicy?.acceptChildren === 'not_accept' ? 'no' : 'yes'
      formValues.childMinAge = data.childPolicy?.minAge || 'unlimited'
      formValues.depositPolicy = data.depositPolicy || ''
      formValues.paymentMethods = data.paymentMethods || []
      formValues.providesBreakfast = data.breakfastPolicy?.provided === 'provided' ? 'yes' : 'no'
      formValues.breakfastType = data.breakfastPolicy?.breakfastType || ''
      formValues.servingStyle = data.breakfastPolicy?.servingStyle || ''
      formValues.breakfastStartTime = data.breakfastPolicy?.startTime || ''
      formValues.breakfastEndTime = data.breakfastPolicy?.endTime || ''
      formValues.breakfastFee = data.breakfastPolicy?.extraFee || 0
      formValues.childCriteria = data.childBreakfast?.criteria || 'age'
      formValues.childAgeStandard = data.childBreakfast?.ageStandard || ''
      formValues.childHeightStandard = data.childBreakfast?.heightStandard || ''
      formValues.childChargeType = data.childBreakfast?.chargeType || 'free'
      formValues.childBreakfastFee = data.childBreakfast?.fee || 0
    }

    // 初始化
    initFormValues(props.formData.operationPolicy)

    // 监听变化并触发更新
    watch(
      formValues,
      () => {
        emit('update', {
          operationPolicy: {
            latestBookingTime: formValues.latestBookingTime,
            checkInTime: formValues.checkInTime,
            checkOutTime: formValues.checkOutTime,
            importantNotice: formValues.importantNotice,
            cancellationPolicy: formValues.cancellationPolicy,
            checkInAge: {
              minAge: formValues.minCheckInAge,
              maxAge: '不限制'
            },
            childPolicy: {
              acceptChildren: formValues.acceptChildren === 'yes' ? 'accept' : 'not_accept',
              minAge: formValues.childMinAge
            },
            depositPolicy: formValues.depositPolicy,
            paymentMethods: formValues.paymentMethods,
            breakfastPolicy: {
              provided: formValues.providesBreakfast === 'yes' ? 'provided' : 'not_provided',
              breakfastType: formValues.breakfastType,
              servingStyle: formValues.servingStyle,
              startTime: formValues.breakfastStartTime,
              endTime: formValues.breakfastEndTime,
              extraFee: formValues.breakfastFee
            },
            childBreakfast: {
              criteria: formValues.childCriteria,
              ageStandard: formValues.childAgeStandard,
              heightStandard: formValues.childHeightStandard,
              chargeType: formValues.childChargeType,
              fee: formValues.childBreakfastFee
            }
          }
        })
      },
      { deep: true }
    )

    return {
      formValues
    }
  }
})
</script>

<style scoped lang="less">
@import '@/styles/variables.less';

.tab3-container {
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

.form-item {
  margin-bottom: 24px;

  &:last-child {
    margin-bottom: 0;
  }
}

.form-label {
  display: block;
  font-size: @font-size-sm;
  font-weight: @font-weight-medium;
  color: @text-primary;
  margin-bottom: 8px;

  .required {
    color: @error-color;
    margin-left: 2px;
  }
}

.payment-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
}

:deep(.ant-input),
:deep(.ant-input-number),
:deep(.ant-select),
:deep(.ant-textarea) {
  border-radius: @border-radius-base;
}
</style>
