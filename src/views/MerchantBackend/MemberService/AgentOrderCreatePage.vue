<template>
  <sidebar>
    <div class="h-screen overflow-y-auto bg-slate-50">
      <div class="max-w-3xl mx-auto p-8 space-y-8">
        <!-- 页面标题 -->
        <div>
          <h1 class="text-2xl font-bold text-slate-900">创建专属订单</h1>
        </div>

        <!-- 订单信息卡片 -->
        <a-card :bordered="false" class="rounded-xl border-slate-200 shadow-md hover:shadow-lg transition-all duration-200">
          <a-form :model="formData" layout="vertical">
            <!-- 日期选择 -->
            <a-row :gutter="16">
              <a-col :span="12">
                <a-form-item label="入住日期" required>
                  <a-date-picker
                    v-model:value="formData.checkInDate"
                    :disabled-date="disabledCheckInDate"
                    format="YYYY-MM-DD"
                    value-format="YYYY-MM-DD"
                    placeholder="选择入住日期"
                    style="width: 100%"
                    @change="handleCheckInChange"
                  />
                </a-form-item>
              </a-col>
              <a-col :span="12">
                <a-form-item label="离店日期" required>
                  <a-date-picker
                    v-model:value="formData.checkOutDate"
                    :disabled-date="disabledCheckOutDate"
                    format="YYYY-MM-DD"
                    value-format="YYYY-MM-DD"
                    placeholder="选择离店日期"
                    style="width: 100%"
                    :disabled="!formData.checkInDate"
                    @change="handleCheckOutChange"
                  />
                </a-form-item>
              </a-col>
            </a-row>

            <!-- 房型选择 -->
            <a-form-item label="房型" required>
              <a-select
                v-model:value="formData.roomType"
                placeholder="请先选择日期"
                :disabled="!formData.checkInDate || !formData.checkOutDate"
                @change="handleRoomTypeChange"
              >
                <a-select-option
                  v-for="room in roomTypes"
                  :key="room.id"
                  :value="room.id"
                  :disabled="!room.available"
                >
                  {{ room.name }} - ¥{{ room.price }}/晚
                  <span v-if="!room.available" class="text-slate-400">(已满房)</span>
                </a-select-option>
              </a-select>
            </a-form-item>

            <!-- 价格设置 -->
            <div class="space-y-4">
              <a-form-item label="售卖总价">
                <div class="text-2xl font-semibold text-slate-900">
                  {{ formData.salePrice ? `¥${formData.salePrice}` : '-' }}
                </div>
                <div v-if="formData.salePrice && calculateNights() > 0" class="text-xs text-slate-500 mt-1">
                  {{ selectedRoom?.name }} × {{ calculateNights() }} 晚
                </div>
              </a-form-item>

              <a-form-item label="专属优惠总价" required>
                <a-input-number
                  v-model:value="formData.specialPrice"
                  :min="0"
                  :precision="2"
                  placeholder="0.00"
                  style="width: 200px"
                  addon-before="¥"
                />
              </a-form-item>
            </div>

            <!-- 限制购买人手机号 -->
            <a-form-item label="限制购买人手机号">
              <a-input
                v-model:value="formData.limitPhone"
                placeholder="仅限该手机号购买"
                :maxlength="11"
                @input="handlePhoneInput"
              />
            </a-form-item>

            <!-- 备注 -->
            <a-form-item label="备注">
              <a-textarea
                v-model:value="formData.notes"
                placeholder="填写备注信息"
                :rows="3"
                :maxlength="500"
                show-count
              />
            </a-form-item>
          </a-form>
        </a-card>

        <!-- 生成付款码按钮 -->
        <div class="flex justify-center">
          <a-button
            type="primary"
            size="large"
            :disabled="!isFormValid"
            @click="handleGenerate"
            class="w-full max-w-md h-11 bg-blue-600 hover:bg-blue-700 text-white font-medium shadow-sm transition-all"
          >
            生成付款码
          </a-button>
        </div>

        <!-- 付款码弹窗 -->
        <a-modal
          v-model:visible="qrDialogOpen"
          title="付款二维码"
          :footer="null"
          width="400px"
          centered
          :body-style="{ padding: '24px' }"
        >
          <div class="space-y-4">
            <!-- 二维码 -->
            <div class="flex items-center justify-center">
              <div class="w-64 h-64 bg-slate-100 rounded-lg flex items-center justify-center">
                <qrcode-outlined class="text-slate-400" style="font-size: 192px" />
              </div>
            </div>

            <!-- 保存二维码按钮 -->
            <a-button
              block
              @click="handleDownloadQR"
              class="h-9 border-slate-300 hover:border-slate-400 hover:bg-slate-50 transition-all"
            >
              <template #icon>
                <download-outlined />
              </template>
              保存二维码
            </a-button>
          </div>
        </a-modal>
      </div>
    </div>
  </sidebar>
</template>

<script>
import { defineComponent, ref, reactive, computed, watch } from '@vue/composition-api'
import Sidebar from '@/components/Layout/Sidebar.vue'
import { QrcodeOutlined, DownloadOutlined } from '@ant-design/icons-vue'
import { message } from 'ant-design-vue'
import { generateAgentOrderQRCode } from '@/api/memberService'
import dayjs from 'dayjs'

export default defineComponent({
  name: 'AgentOrderCreatePage',
  components: { Sidebar, QrcodeOutlined, DownloadOutlined },
  setup() {
    const formData = reactive({
      checkInDate: null,
      checkOutDate: null,
      roomType: undefined,
      salePrice: null,
      specialPrice: null,
      limitPhone: '',
      notes: ''
    })

    const qrDialogOpen = ref(false)
    const roomTypes = ref([])

    // 禁用入住日期（今天之前的日期）
    const disabledCheckInDate = (current) => {
      return current && current < dayjs().startOf('day')
    }

    // 禁用离店日期（入住日期及之前的日期）
    const disabledCheckOutDate = (current) => {
      if (!formData.checkInDate) return true
      return current && current <= dayjs(formData.checkInDate)
    }

    // 计算间夜数
    const calculateNights = () => {
      if (!formData.checkInDate || !formData.checkOutDate) return 0
      const checkIn = dayjs(formData.checkInDate)
      const checkOut = dayjs(formData.checkOutDate)
      return checkOut.diff(checkIn, 'day')
    }

    // 选中的房型
    const selectedRoom = computed(() => {
      return roomTypes.value.find(r => r.id === formData.roomType)
    })

    // 表单是否有效
    const isFormValid = computed(() => {
      return formData.checkInDate &&
             formData.checkOutDate &&
             formData.roomType &&
             formData.specialPrice != null &&
             formData.specialPrice > 0
    })

    // 入住日期变化
    const handleCheckInChange = () => {
      formData.checkOutDate = null
      formData.roomType = undefined
      formData.salePrice = null
      fetchRoomTypes()
    }

    // 离店日期变化
    const handleCheckOutChange = () => {
      formData.roomType = undefined
      formData.salePrice = null
      fetchRoomTypes()
    }

    // 房型变化
    const handleRoomTypeChange = () => {
      if (formData.roomType && formData.checkInDate && formData.checkOutDate) {
        const room = selectedRoom.value
        const nights = calculateNights()
        if (room && nights > 0) {
          formData.salePrice = room.price * nights
        }
      }
    }

    // 手机号输入处理（只允许数字）
    const handlePhoneInput = () => {
      formData.limitPhone = formData.limitPhone.replace(/\D/g, '')
    }

    // 获取可售房型
    const fetchRoomTypes = () => {
      if (formData.checkInDate && formData.checkOutDate) {
        // 模拟获取房型数据
        roomTypes.value = [
          { id: 'deluxe-king', name: '豪华大床房', price: 588, available: true },
          { id: 'deluxe-twin', name: '豪华双床房', price: 588, available: true },
          { id: 'executive-suite', name: '行政套房', price: 988, available: false },
          { id: 'presidential-suite', name: '总统套房', price: 1888, available: true }
        ]
      }
    }

    // 生成付款码
    const handleGenerate = async () => {
      if (!isFormValid.value) {
        message.error('请填写必填项')
        return
      }

      try {
        await generateAgentOrderQRCode(formData)
        qrDialogOpen.value = true
      } catch (error) {
        message.error('生成付款码失败')
        console.error(error)
      }
    }

    // 下载二维码
    const handleDownloadQR = () => {
      message.success('二维码已保存')
      console.log('下载二维码')
    }

    return {
      formData,
      qrDialogOpen,
      roomTypes,
      selectedRoom,
      isFormValid,
      disabledCheckInDate,
      disabledCheckOutDate,
      calculateNights,
      handleCheckInChange,
      handleCheckOutChange,
      handleRoomTypeChange,
      handlePhoneInput,
      handleGenerate,
      handleDownloadQR
    }
  }
})
</script>

<style scoped lang="less">
:deep(.ant-form-item-label > label) {
  font-weight: 500;
  color: rgb(15, 23, 42);
}

:deep(.ant-input-number) {
  width: 100%;
}
</style>
