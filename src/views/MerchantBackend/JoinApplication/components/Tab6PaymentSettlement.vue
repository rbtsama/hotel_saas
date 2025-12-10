<template>
  <div class="tab6-container">
    <!-- 主体类型选择 -->
    <a-card :bordered="false" class="form-section-card">
      <template slot="title">
        <span class="section-title">主体类型</span>
      </template>

      <a-radio-group v-model="localData.entityType" @change="handleEntityTypeChange" class="entity-type-group">
        <a-radio :value="EntityType.COMPANY">
          <span class="radio-label">有限责任公司</span>
        </a-radio>
        <a-radio :value="EntityType.INDIVIDUAL">
          <span class="radio-label">个体工商户</span>
        </a-radio>
      </a-radio-group>
    </a-card>

    <!-- 有限责任公司表单 -->
    <template v-if="localData.entityType === EntityType.COMPANY">
      <!-- 基本信息 -->
      <a-card :bordered="false" class="form-section-card">
        <template slot="title">
          <span class="section-title">营业主体信息</span>
        </template>

        <a-form-model
          :model="companyData"
          :label-col="{ span: 6 }"
          :wrapper-col="{ span: 14 }"
        >
          <a-form-model-item label="注册账号" required>
            <a-input
              v-model="companyData.registerAccount"
              placeholder="商户手机号或邮箱（请留意接收后续信息，包括签约地址和账户初始密码。）"
              @change="handleChange"
            />
          </a-form-model-item>

          <a-form-model-item label="营业主体" required>
            <a-input
              v-model="companyData.companyName"
              placeholder="营业执照上的公司名称"
              @change="handleChange"
            />
          </a-form-model-item>

          <a-form-model-item label="统一社会信用代码" required>
            <a-input
              v-model="companyData.creditCode"
              placeholder="示例：91330108MAEN56Q88T"
              :maxLength="18"
              @change="handleChange"
            />
          </a-form-model-item>

          <a-form-model-item label="营业执照有效期" required>
            <a-radio-group v-model="companyData.licenseValidityType" @change="handleChange">
              <a-radio :value="LicenseValidityType.DATE">日期选择</a-radio>
              <a-radio :value="LicenseValidityType.PERMANENT">永久有效</a-radio>
            </a-radio-group>
            <a-date-picker
              v-if="companyData.licenseValidityType === LicenseValidityType.DATE"
              v-model="licenseDateValue"
              placeholder="选择有效期"
              style="width: 100%; margin-top: 8px"
              @change="handleLicenseDateChange"
            />
          </a-form-model-item>
        </a-form-model>
      </a-card>

      <!-- 法人身份证 -->
      <a-card :bordered="false" class="form-section-card">
        <template slot="title">
          <span class="section-title">法人身份证</span>
        </template>

        <a-form-model
          :model="companyData"
          :label-col="{ span: 6 }"
          :wrapper-col="{ span: 14 }"
        >
          <a-form-model-item label="姓名" required>
            <a-input
              v-model="companyData.legalPersonName"
              @change="handleChange"
            />
          </a-form-model-item>

          <a-form-model-item label="身份证号" required>
            <a-input
              v-model="companyData.legalPersonIdCard"
              placeholder="请输入18位身份证号"
              :maxLength="18"
              @change="handleChange"
            />
          </a-form-model-item>

          <a-form-model-item label="居住地址" required>
            <a-input
              v-model="companyData.legalPersonAddress"
              @change="handleChange"
            />
          </a-form-model-item>

          <a-form-model-item label="身份证有效期" required>
            <a-radio-group v-model="companyData.legalPersonIdValidityType" @change="handleChange">
              <a-radio :value="LicenseValidityType.DATE">日期选择</a-radio>
              <a-radio :value="LicenseValidityType.PERMANENT">永久有效</a-radio>
            </a-radio-group>
            <a-date-picker
              v-if="companyData.legalPersonIdValidityType === LicenseValidityType.DATE"
              v-model="idCardDateValue"
              placeholder="选择有效期"
              style="width: 100%; margin-top: 8px"
              @change="handleIdCardDateChange"
            />
          </a-form-model-item>
        </a-form-model>
      </a-card>

      <!-- 门店地址 -->
      <a-card :bordered="false" class="form-section-card">
        <template slot="title">
          <span class="section-title">门店地址</span>
        </template>

        <a-form-model
          :model="companyData"
          :label-col="{ span: 6 }"
          :wrapper-col="{ span: 14 }"
        >
          <a-form-model-item label="门店所在地区" required>
            <a-input
              v-model="companyData.storeRegion"
              placeholder="示例：浙江省杭州市西湖区"
              @change="handleChange"
            />
          </a-form-model-item>

          <a-form-model-item label="门店详细地址" required>
            <a-input
              v-model="companyData.storeDetailAddress"
              placeholder="示例：富春江镇芦茨村芦茨乡芦茨"
              @change="handleChange"
            />
          </a-form-model-item>
        </a-form-model>
      </a-card>

      <!-- 结算信息 -->
      <a-card :bordered="false" class="form-section-card">
        <template slot="title">
          <span class="section-title">结算信息</span>
        </template>

        <a-form-model
          :model="companyData"
          :label-col="{ span: 6 }"
          :wrapper-col="{ span: 14 }"
        >
          <a-form-model-item label="账户名称" required>
            <a-input
              v-model="companyData.accountName"
              @change="handleChange"
            />
          </a-form-model-item>

          <a-form-model-item label="对公账户银行账号" required>
            <a-input
              v-model="companyData.bankAccountNumber"
              @change="handleChange"
            />
          </a-form-model-item>

          <a-form-model-item label="开户银行" required>
            <a-input
              v-model="companyData.openingBank"
              @change="handleChange"
            />
          </a-form-model-item>

          <a-form-model-item label="开户地" required>
            <a-input
              v-model="companyData.openingLocation"
              @change="handleChange"
            />
          </a-form-model-item>

          <a-form-model-item label="开户银行全称" required>
            <a-input
              v-model="companyData.openingBankFullName"
              placeholder="需要精确到支行（例：杭州银行股份有限公司西溪支行）"
              @change="handleChange"
            />
            <div class="field-hint">需要精确到支行</div>
          </a-form-model-item>

          <a-form-model-item label="开户证明" required>
            <div class="upload-hint-text">
              有效凭证包括（任选其中一种即可）：
              1.开户许可证；2.银行回执；3.银行打印纸质结算账户（盖章）；4.基本存款账户信息单；5.汇款凭证
            </div>
            <image-upload
              v-model="companyData.openingProof"
              :multiple="false"
              :maxSize="10"
              compact
              @change="handleChange"
            />
          </a-form-model-item>

          <a-form-model-item label="商户名称" required>
            <a-input
              v-model="companyData.merchantName"
              placeholder="该名称将用于支付完成页面向用户展示，建议和品牌名称一致。"
              @change="handleChange"
            />
          </a-form-model-item>

          <a-form-model-item label="账户简称" required>
            <a-input
              v-model="companyData.merchantShortName"
              placeholder="用于后台查看和管理账户"
              @change="handleChange"
            />
          </a-form-model-item>
        </a-form-model>
      </a-card>

      <!-- 联系人信息 -->
      <a-card :bordered="false" class="form-section-card">
        <template slot="title">
          <span class="section-title">联系人信息（不需要法人，门店意愿一人都可以）</span>
        </template>

        <a-form-model
          :model="companyData"
          :label-col="{ span: 6 }"
          :wrapper-col="{ span: 14 }"
        >
          <a-form-model-item label="联系人姓名" required>
            <a-input
              v-model="companyData.contactName"
              @change="handleChange"
            />
          </a-form-model-item>

          <a-form-model-item label="联系人身份证号码" required>
            <a-input
              v-model="companyData.contactIdCard"
              placeholder="请输入18位身份证号"
              :maxLength="18"
              @change="handleChange"
            />
          </a-form-model-item>

          <a-form-model-item label="联系人手机号码" required>
            <a-input
              v-model="companyData.contactPhone"
              placeholder="请输入11位手机号"
              :maxLength="11"
              @change="handleChange"
            />
          </a-form-model-item>

          <a-form-model-item label="联系人常用邮箱" required>
            <a-input
              v-model="companyData.contactEmail"
              type="email"
              @change="handleChange"
            />
          </a-form-model-item>
        </a-form-model>
      </a-card>

      <!-- 照片上传 -->
      <a-card :bordered="false" class="form-section-card">
        <template slot="title">
          <span class="section-title">相关照片</span>
        </template>

        <div class="photos-grid">
          <!-- 营业执照照片 -->
          <div class="photo-upload-item">
            <div class="upload-label">
              <span class="label-text">营业执照照片</span>
              <a-tag color="red" size="small">必填</a-tag>
            </div>
            <p class="upload-hint">请保持营业照片的主体和门店主体一致。照片需要面清晰，文字可辨认。</p>
            <image-upload
              v-model="companyData.businessLicensePhoto"
              :multiple="false"
              :maxSize="10"
              compact
              @change="handleChange"
            />
          </div>

          <!-- 法人身份证照片 -->
          <div class="photo-upload-item">
            <div class="upload-label">
              <span class="label-text">法人身份证照片</span>
              <a-tag color="red" size="small">必填</a-tag>
            </div>
            <p class="upload-hint">请上传最新有效身份证件，身份证请勿遮挡，保持帧数90度拍摄，照片需要面清晰，文字可辨认。实体经营场所正面（含门店招牌和周围环境）近期实景</p>
            <image-upload
              v-model="companyData.legalPersonIdPhoto"
              :multiple="false"
              :maxSize="10"
              compact
              @change="handleChange"
            />
          </div>

          <!-- 门店门头 -->
          <div class="photo-upload-item">
            <div class="upload-label">
              <span class="label-text">门店门头</span>
              <a-tag color="red" size="small">必填</a-tag>
            </div>
            <p class="upload-hint">门店门头照片</p>
            <image-upload
              v-model="companyData.storeDoorPhoto"
              :multiple="false"
              :maxSize="10"
              compact
              @change="handleChange"
            />
          </div>

          <!-- 前台照片 -->
          <div class="photo-upload-item">
            <div class="upload-label">
              <span class="label-text">前台照片</span>
              <a-tag color="red" size="small">必填</a-tag>
            </div>
            <p class="upload-hint">前台照片</p>
            <image-upload
              v-model="companyData.storeFrontDeskPhoto"
              :multiple="false"
              :maxSize="10"
              compact
              @change="handleChange"
            />
          </div>

          <!-- 店铺内景 -->
          <div class="photo-upload-item">
            <div class="upload-label">
              <span class="label-text">店铺内景</span>
              <a-tag color="red" size="small">必填</a-tag>
            </div>
            <p class="upload-hint">店铺内景照片</p>
            <image-upload
              v-model="companyData.storeInteriorPhoto"
              :multiple="false"
              :maxSize="10"
              compact
              @change="handleChange"
            />
          </div>
        </div>
      </a-card>
    </template>

    <!-- 个体工商户表单（结构类似，字段略有不同） -->
    <template v-else>
      <a-card :bordered="false" class="form-section-card">
        <template slot="title">
          <span class="section-title">营业主体信息</span>
        </template>

        <a-form-model
          :model="individualData"
          :label-col="{ span: 6 }"
          :wrapper-col="{ span: 14 }"
        >
          <a-form-model-item label="注册账号" required>
            <a-input
              v-model="individualData.registerAccount"
              placeholder="商户手机号或邮箱"
              @change="handleChange"
            />
          </a-form-model-item>

          <a-form-model-item label="营业主体" required>
            <a-input
              v-model="individualData.ownerName"
              placeholder="营业执照上的经营者姓名"
              @change="handleChange"
            />
          </a-form-model-item>

          <a-form-model-item label="统一社会信用代码" required>
            <a-input
              v-model="individualData.creditCode"
              placeholder="示例：91330108MAEN56Q88T"
              :maxLength="18"
              @change="handleChange"
            />
          </a-form-model-item>

          <a-form-model-item label="营业执照有效期" required>
            <a-radio-group v-model="individualData.licenseValidityType" @change="handleChange">
              <a-radio :value="LicenseValidityType.DATE">日期选择</a-radio>
              <a-radio :value="LicenseValidityType.PERMANENT">永久有效</a-radio>
            </a-radio-group>
          </a-form-model-item>
        </a-form-model>
      </a-card>

      <!-- 更多字段... -->
      <a-card :bordered="false" class="form-section-card">
        <p style="text-align: center; padding: 40px; color: #999;">
          个体工商户表单（待完善...）
        </p>
      </a-card>
    </template>
  </div>
</template>

<script>
import { defineComponent, reactive, ref, watch } from '@vue/composition-api'
import moment from 'moment'
import ImageUpload from '@/components/StoreDeployment/ImageUpload.vue'
import {
  EntityType,
  LicenseValidityType
} from '@/types/storeDeployment'

export default defineComponent({
  name: 'Tab6PaymentSettlement',
  components: {
    ImageUpload
  },
  props: {
    formData: {
      type: Object,
      required: true
    }
  },
  setup(props, { emit }) {
    // 本地数据
    const localData = reactive({
      entityType: props.formData.paymentSettlement?.entityType || EntityType.COMPANY
    })

    // 有限责任公司数据
    const companyData = reactive({
      registerAccount: '',
      companyName: '',
      creditCode: '',
      licenseValidityType: LicenseValidityType.DATE,
      licenseValidityDate: '',
      legalPersonName: '',
      legalPersonIdCard: '',
      legalPersonAddress: '',
      legalPersonIdValidityType: LicenseValidityType.DATE,
      legalPersonIdValidityDate: '',
      storeRegion: '',
      storeDetailAddress: '',
      accountName: '',
      bankAccountNumber: '',
      openingBank: '',
      openingLocation: '',
      openingBankFullName: '',
      openingProof: '',
      merchantName: '',
      merchantShortName: '',
      contactName: '',
      contactIdCard: '',
      contactPhone: '',
      contactEmail: '',
      businessLicensePhoto: '',
      legalPersonIdPhoto: '',
      storeDoorPhoto: '',
      storeFrontDeskPhoto: '',
      storeInteriorPhoto: ''
    })

    // 个体工商户数据
    const individualData = reactive({
      registerAccount: '',
      ownerName: '',
      creditCode: '',
      licenseValidityType: LicenseValidityType.DATE
    })

    // 日期选择器的值
    const licenseDateValue = ref(null)
    const idCardDateValue = ref(null)

    // 主体类型切换
    const handleEntityTypeChange = () => {
      handleChange()
    }

    // 日期变更
    const handleLicenseDateChange = (date) => {
      companyData.licenseValidityDate = date ? date.format('YYYY-MM-DD') : ''
      handleChange()
    }

    const handleIdCardDateChange = (date) => {
      companyData.legalPersonIdValidityDate = date ? date.format('YYYY-MM-DD') : ''
      handleChange()
    }

    // 处理数据变化
    const handleChange = () => {
      emit('update', {
        paymentSettlement: {
          entityType: localData.entityType,
          companyInfo: localData.entityType === EntityType.COMPANY ? companyData : undefined,
          individualInfo: localData.entityType === EntityType.INDIVIDUAL ? individualData : undefined
        }
      })
    }

    return {
      localData,
      companyData,
      individualData,
      licenseDateValue,
      idCardDateValue,
      EntityType,
      LicenseValidityType,
      handleEntityTypeChange,
      handleLicenseDateChange,
      handleIdCardDateChange,
      handleChange
    }
  }
})
</script>

<style scoped lang="less">
@import '@/styles/variables.less';

.tab6-container {
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

.entity-type-group {
  display: flex;
  gap: 32px;

  .radio-label {
    font-size: @font-size-base;
    font-weight: @font-weight-medium;
  }
}

.field-hint {
  font-size: @font-size-xs;
  color: @text-secondary;
  margin-top: 4px;
}

.upload-hint-text {
  font-size: @font-size-sm;
  color: @text-secondary;
  line-height: 1.8;
  margin-bottom: 12px;
  padding: 12px;
  background: @bg-secondary;
  border-radius: @border-radius-base;
  border-left: 3px solid @brand-primary;
}

.photos-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
}

.photo-upload-item {
  // 照片上传项容器
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
  margin-bottom: 12px;
  line-height: 1.6;
}

:deep(.ant-form-item) {
  margin-bottom: 24px;
}
</style>
