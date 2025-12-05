import Vue from 'vue'
import VueRouter from 'vue-router'
import Sidebar from '@/components/Layout/Sidebar.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/architecture/product/overview'
  },

  // 设计架构模块
  {
    path: '/architecture/product/overview',
    name: 'ProductOverview',
    component: () => import('@/views/Architecture/ProductArchitecture/OverviewPage.vue'),
    meta: { title: '产品架构总图' }
  },
  {
    path: '/architecture/design/color-system',
    name: 'ColorSystem',
    component: () => import('@/views/Architecture/DesignSystem/ColorSystemPage.vue'),
    meta: { title: '配色系统' }
  },
  {
    path: '/architecture/design/color-system-2',
    name: 'ColorSystem2',
    component: () => import('@/views/Architecture/DesignSystem/ColorSystem2Page.vue'),
    meta: { title: '配色系统2' }
  },

  // 平台后台 - 订单管理
  {
    path: '/order/list',
    name: 'OrderList',
    component: () => import('@/views/PlatformAdmin/OrderManagement/OrderListPage.vue'),
    meta: { title: '订单列表' }
  },
  {
    path: '/dispute/refund-requests',
    name: 'RefundRequests',
    component: () => import('@/views/PlatformAdmin/OrderManagement/RefundRequestsPage.vue'),
    meta: { title: '退款管理' }
  },

  // 平台后台 - 会员管理
  {
    path: '/platform-admin/member-management/members',
    name: 'MemberManagement',
    component: () => import('@/views/PlatformAdmin/MemberManagement/MembersPage.vue'),
    meta: { title: '会员查询' }
  },

  // 平台后台 - 优惠券管理
  {
    path: '/platform-admin/coupon-management/list',
    name: 'CouponList',
    component: () => import('@/views/PlatformAdmin/CouponManagement/CouponListPage.vue'),
    meta: { title: '优惠券列表' }
  },
  {
    path: '/platform-admin/coupon-management/issue',
    name: 'CouponIssue',
    component: () => import('@/views/PlatformAdmin/CouponManagement/CouponIssuePage.vue'),
    meta: { title: '优惠券发放' }
  },

  // 平台后台 - 积分管理
  {
    path: '/platform-admin/points-management/config',
    name: 'PointsConfig',
    component: () => import('@/views/PlatformAdmin/PointsManagement/PointsConfigPage.vue'),
    meta: { title: '积分配置' }
  },
  {
    path: '/platform-admin/points-management/adjust',
    name: 'PointsAdjust',
    component: () => import('@/views/PlatformAdmin/PointsManagement/PointsAdjustPage.vue'),
    meta: { title: '积分调整' }
  },

  // 商户端 - 入驻申请
  {
    path: '/merchant-backend/join-application/apply',
    name: 'JoinApplication',
    component: () => import('@/views/MerchantBackend/JoinApplication/JoinApplicationPage.vue'),
    meta: { title: '入驻申请' }
  },

  // 商户端 - 门店信息
  {
    path: '/merchant-backend/store-info/basic',
    name: 'StoreBasicInfo',
    component: () => import('@/views/MerchantBackend/StoreInfo/BasicInfoPage.vue'),
    meta: { title: '基本信息' }
  },
  {
    path: '/merchant-backend/store-info/policy',
    name: 'StorePolicy',
    component: () => import('@/views/MerchantBackend/StoreInfo/PolicyPage.vue'),
    meta: { title: '政策相关' }
  },
  {
    path: '/merchant-backend/store-info/facilities',
    name: 'StoreFacilities',
    component: () => import('@/views/MerchantBackend/StoreInfo/FacilitiesPage.vue'),
    meta: { title: '门店设施' }
  },
  {
    path: '/merchant-backend/store-info/surrounding',
    name: 'StoreSurrounding',
    component: () => import('@/views/MerchantBackend/StoreInfo/SurroundingPage.vue'),
    meta: { title: '周边信息' }
  },
  {
    path: '/merchant-backend/store-info/breakfast',
    name: 'StoreBreakfast',
    component: () => import('@/views/MerchantBackend/StoreInfo/BreakfastPage.vue'),
    meta: { title: '早餐政策' }
  },
  {
    path: '/merchant-backend/store-info/extra-bed',
    name: 'StoreExtraBed',
    component: () => import('@/views/MerchantBackend/StoreInfo/ExtraBedPage.vue'),
    meta: { title: '加床政策' }
  },
  {
    path: '/merchant-backend/store-info/images',
    name: 'StoreImages',
    component: () => import('@/views/MerchantBackend/StoreInfo/ImagesPage.vue'),
    meta: { title: '门店图片' }
  },

  // 商户端 - 订单管理
  {
    path: '/hotel-backend/order-list',
    name: 'HotelOrderList',
    component: () => import('@/views/MerchantBackend/OrderManagement/OrderListPage.vue'),
    meta: { title: '订单列表' }
  },
  {
    path: '/hotel-backend/order-calendar',
    name: 'OrderCalendar',
    component: () => import('@/views/MerchantBackend/OrderManagement/OrderCalendarPage.vue'),
    meta: { title: '订单日历' }
  },
  {
    path: '/hotel-backend/refund-management',
    name: 'HotelRefund',
    component: () => import('@/views/MerchantBackend/OrderManagement/RefundManagementPage.vue'),
    meta: { title: '客诉退款' }
  },
  {
    path: '/hotel-backend/user-reviews',
    name: 'UserReviews',
    component: () => import('@/views/MerchantBackend/OrderManagement/UserReviewsPage.vue'),
    meta: { title: '用户评价' }
  },

  // 商户端 - 房务管理
  {
    path: '/hotel-backend/room-price-calendar',
    name: 'RoomPriceCalendar',
    component: () => import('@/views/MerchantBackend/RoomManagement/RoomPriceCalendarPage.vue'),
    meta: { title: '房价日历' }
  },
  {
    path: '/hotel-backend/inventory-calendar',
    name: 'InventoryCalendar',
    component: () => import('@/views/MerchantBackend/RoomManagement/InventoryCalendarPage.vue'),
    meta: { title: '库存日历' }
  },
  {
    path: '/hotel-backend/room-type-list',
    name: 'RoomTypeList',
    component: () => import('@/views/MerchantBackend/RoomManagement/RoomTypeListPage.vue'),
    meta: { title: '房型列表' }
  },
  {
    path: '/hotel-backend/room-type-images',
    name: 'RoomTypeImages',
    component: () => import('@/views/MerchantBackend/RoomManagement/RoomTypeImagesPage.vue'),
    meta: { title: '房型图片' }
  },
  {
    path: '/hotel-backend/rooms',
    name: 'Rooms',
    component: () => import('@/views/MerchantBackend/RoomManagement/RoomsPage.vue'),
    meta: { title: '房间管理' }
  },
  {
    path: '/hotel-backend/pms-integration',
    name: 'PMSIntegration',
    component: () => import('@/views/MerchantBackend/RoomManagement/PMSIntegrationPage.vue'),
    meta: { title: 'PMS对接' }
  },

  // 商户端 - 会员服务
  {
    path: '/merchant-backend/points-service/config',
    name: 'PointsServiceConfig',
    component: () => import('@/views/MerchantBackend/MemberService/PointsServiceConfigPage.vue'),
    meta: { title: '积分服务配置' }
  },
  {
    path: '/merchant-backend/vip-discount/config',
    name: 'VIPDiscountConfig',
    component: () => import('@/views/MerchantBackend/MemberService/VIPDiscountConfigPage.vue'),
    meta: { title: 'VIP折扣配置' }
  },
  {
    path: '/merchant-backend/agent-order/create',
    name: 'AgentOrderCreate',
    component: () => import('@/views/MerchantBackend/MemberService/AgentOrderCreatePage.vue'),
    meta: { title: '代客下单' }
  },
  {
    path: '/merchant-backend/old-customer/invite-member',
    name: 'InviteMember',
    component: () => import('@/views/MerchantBackend/MemberService/InviteMemberPage.vue'),
    meta: { title: '邀请会员' }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: '/',
  routes,
  scrollBehavior() {
    return { x: 0, y: 0 }
  }
})

export default router
