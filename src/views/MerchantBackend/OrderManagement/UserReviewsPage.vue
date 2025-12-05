<template>
  <sidebar>
    <div class="page-container">
      <!-- 筛选表单 -->
      <a-card title="筛选条件" :bordered="false">
        <a-form layout="inline" :model="filters" @submit="handleSearch">
          <a-form-item label="留言日期">
            <a-range-picker
              v-model="dateRange"
              format="YYYY-MM-DD"
              style="width: 280px"
            />
          </a-form-item>
          <a-form-item>
            <a-space>
              <a-button type="primary" html-type="submit" icon="search">搜索</a-button>
              <a-button @click="handleReset">重置</a-button>
            </a-space>
          </a-form-item>
        </a-form>
      </a-card>

      <!-- 评价列表 -->
      <a-card title="用户评价列表" :bordered="false" style="margin-top: 24px">
        <a-table
          :columns="columns"
          :data-source="reviews"
          :loading="loading"
          :pagination="pagination"
          row-key="id"
          @change="handleTableChange"
        >
          <span slot="reviewTime" slot-scope="text">
            <div style="font-size: 12px">{{ text }}</div>
          </span>

          <span slot="action" slot-scope="text, record">
            <a-button type="link" size="small" @click="handleViewDetail(record.id)">详情</a-button>
          </span>
        </a-table>
      </a-card>

      <!-- 评价详情弹窗 -->
      <a-modal
        v-model="detailVisible"
        title="评价详情"
        width="800px"
        :footer="null"
      >
        <div v-if="reviewDetail">
          <!-- 评价概览 -->
          <a-descriptions title="评价信息" :column="2" bordered>
            <a-descriptions-item label="订单号">
              <code>{{ reviewDetail.orderNumber }}</code>
            </a-descriptions-item>
            <a-descriptions-item label="留言时间">
              {{ reviewDetail.reviewTime }}
            </a-descriptions-item>
            <a-descriptions-item label="入住人">
              {{ reviewDetail.guestName }}
            </a-descriptions-item>
            <a-descriptions-item label="联系电话">
              {{ reviewDetail.guestPhone }}
            </a-descriptions-item>
            <a-descriptions-item label="房型">
              {{ reviewDetail.roomType }}
            </a-descriptions-item>
            <a-descriptions-item label="入住日期">
              {{ reviewDetail.checkInDate }} 至 {{ reviewDetail.checkOutDate }} ({{ reviewDetail.nightCount }}晚)
            </a-descriptions-item>
            <a-descriptions-item label="订单金额">
              ¥{{ reviewDetail.totalAmount }}
            </a-descriptions-item>
            <a-descriptions-item label="综合评分">
              <span style="font-size: 20px; font-weight: 600; color: #ff7875">
                {{ averageRating }}
              </span>
              <span style="color: #8c8c8c"> / 5.0</span>
            </a-descriptions-item>
          </a-descriptions>

          <!-- 评分详情 -->
          <div style="margin-top: 24px">
            <div style="font-weight: 600; margin-bottom: 12px">评分详情</div>
            <div class="ratings-grid">
              <div class="rating-item">
                <span class="rating-label">卫生整洁度</span>
                <a-rate :value="reviewDetail.ratings.cleanliness" disabled allow-half />
                <span class="rating-value">{{ reviewDetail.ratings.cleanliness }}.0</span>
              </div>
              <div class="rating-item">
                <span class="rating-label">服务态度</span>
                <a-rate :value="reviewDetail.ratings.service" disabled allow-half />
                <span class="rating-value">{{ reviewDetail.ratings.service }}.0</span>
              </div>
              <div class="rating-item">
                <span class="rating-label">设施设备</span>
                <a-rate :value="reviewDetail.ratings.facilities" disabled allow-half />
                <span class="rating-value">{{ reviewDetail.ratings.facilities }}.0</span>
              </div>
              <div class="rating-item">
                <span class="rating-label">性价比</span>
                <a-rate :value="reviewDetail.ratings.valueForMoney" disabled allow-half />
                <span class="rating-value">{{ reviewDetail.ratings.valueForMoney }}.0</span>
              </div>
              <div class="rating-item">
                <span class="rating-label">位置交通</span>
                <a-rate :value="reviewDetail.ratings.location" disabled allow-half />
                <span class="rating-value">{{ reviewDetail.ratings.location }}.0</span>
              </div>
            </div>
          </div>

          <!-- 评价内容 -->
          <div style="margin-top: 24px">
            <div style="font-weight: 600; margin-bottom: 8px">评价内容</div>
            <div style="padding: 12px; background: #fafafa; border-radius: 4px; line-height: 1.6">
              {{ reviewDetail.reviewContent }}
            </div>
          </div>

          <!-- 酒店回复 -->
          <div style="margin-top: 24px">
            <div style="font-weight: 600; margin-bottom: 8px">酒店回复</div>
            <div v-if="reviewDetail.hotelReply">
              <div style="padding: 12px; background: #e6f7ff; border-radius: 4px; line-height: 1.6">
                {{ reviewDetail.hotelReply }}
              </div>
              <div v-if="reviewDetail.replyTime" style="color: #8c8c8c; font-size: 12px; margin-top: 8px; text-align: right">
                回复时间: {{ reviewDetail.replyTime }}
              </div>
            </div>
            <div v-else>
              <a-textarea
                v-model="replyContent"
                placeholder="请输入您的回复内容..."
                :rows="4"
                style="margin-bottom: 12px"
              />
              <div style="text-align: right">
                <a-button type="primary" @click="handleSubmitReply">提交回复</a-button>
              </div>
            </div>
          </div>
        </div>
      </a-modal>
    </div>
  </sidebar>
</template>

<script>
import { defineComponent } from '@vue/composition-api'
import Sidebar from '@/components/Layout/Sidebar.vue'
import UserReviewsService from './services/userReviews.service'

export default defineComponent({
  name: 'MerchantUserReviewsPage',
  components: { Sidebar },
  data() {
    return {
      loading: false,
      reviews: [],
      filters: {
        startDate: '',
        endDate: ''
      },
      dateRange: [],
      pagination: {
        current: 1,
        pageSize: 10,
        total: 0,
        showTotal: total => `共 ${total} 条`
      },
      detailVisible: false,
      reviewDetail: null,
      replyContent: '',
      columns: [
        {
          title: '留言时间',
          dataIndex: 'reviewTime',
          key: 'reviewTime',
          scopedSlots: { customRender: 'reviewTime' }
        },
        {
          title: '入住人',
          dataIndex: 'guestName',
          key: 'guestName'
        },
        {
          title: '入住人电话',
          dataIndex: 'guestPhone',
          key: 'guestPhone'
        },
        {
          title: '预定房型',
          dataIndex: 'roomType',
          key: 'roomType'
        },
        {
          title: '操作',
          key: 'action',
          scopedSlots: { customRender: 'action' }
        }
      ]
    }
  },
  computed: {
    averageRating() {
      if (!this.reviewDetail) return '0.0'
      const ratings = this.reviewDetail.ratings
      const avg = (
        ratings.cleanliness +
        ratings.service +
        ratings.facilities +
        ratings.valueForMoney +
        ratings.location
      ) / 5
      return avg.toFixed(1)
    }
  },
  mounted() {
    this.loadReviews()
  },
  methods: {
    async loadReviews() {
      this.loading = true
      try {
        const result = await UserReviewsService.getReviewList({
          ...this.filters,
          page: this.pagination.current,
          pageSize: this.pagination.pageSize
        })
        this.reviews = result.reviews
        this.pagination.total = result.total
      } catch (error) {
        this.$message.error('加载评价列表失败')
        console.error(error)
      } finally {
        this.loading = false
      }
    },
    handleSearch(e) {
      e.preventDefault()
      if (this.dateRange && this.dateRange.length === 2) {
        this.filters.startDate = this.dateRange[0].format('YYYY-MM-DD')
        this.filters.endDate = this.dateRange[1].format('YYYY-MM-DD')
      }
      this.pagination.current = 1
      this.loadReviews()
    },
    handleReset() {
      this.filters = {
        startDate: '',
        endDate: ''
      }
      this.dateRange = []
      this.pagination.current = 1
      this.loadReviews()
    },
    handleTableChange(pagination) {
      this.pagination.current = pagination.current
      this.loadReviews()
    },
    async handleViewDetail(reviewId) {
      try {
        this.reviewDetail = await UserReviewsService.getReviewDetailById(reviewId)
        this.replyContent = ''
        this.detailVisible = true
      } catch (error) {
        this.$message.error('加载评价详情失败')
        console.error(error)
      }
    },
    handleSubmitReply() {
      if (!this.replyContent.trim()) {
        this.$message.warning('请输入回复内容')
        return
      }
      this.$message.success('回复提交成功')
      this.detailVisible = false
    }
  }
})
</script>

<style scoped lang="less">
.page-container {
  padding: 24px;
  background: #f0f2f5;
  min-height: calc(100vh - 0px);
}

.ratings-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 12px;
}

.rating-item {
  display: flex;
  align-items: center;
  gap: 16px;
}

.rating-label {
  width: 100px;
  color: #8c8c8c;
  font-size: 14px;
}

.rating-value {
  width: 40px;
  text-align: right;
  font-weight: 500;
  font-size: 14px;
}
</style>
