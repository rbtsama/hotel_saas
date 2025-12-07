export const menuConfig = [
  {
    title: '设计架构',
    key: 'architecture',
    children: [
      {
        title: '产品架构',
        key: 'product-architecture',
        children: [
          { title: '总图', path: '/architecture/product/overview', key: 'overview' }
        ]
      },
      {
        title: '设计规范',
        key: 'design-system',
        children: [
          { title: '配色系统', path: '/architecture/design/color-system', key: 'color-system' },
          { title: '配色系统2', path: '/architecture/design/color-system-2', key: 'color-system-2' }
        ]
      }
    ]
  },
  {
    title: '平台后台',
    key: 'platform-admin',
    children: [
      {
        title: '订单管理',
        key: 'order-management',
        children: [
          { title: '订单列表', path: '/order/list', key: 'order-list' }
        ]
      },
      {
        title: '会员管理',
        key: 'member-management',
        children: [
          { title: '会员查询', path: '/platform-admin/member-management/members', key: 'members' }
        ]
      },
      {
        title: '优惠券管理',
        key: 'coupon-management',
        children: [
          { title: '优惠券列表', path: '/platform-admin/coupon-management/list', key: 'coupon-list' },
          { title: '优惠券发放', path: '/platform-admin/coupon-management/issue', key: 'coupon-issue' }
        ]
      },
      {
        title: '积分管理',
        key: 'points-management',
        children: [
          { title: '积分配置', path: '/platform-admin/points-management/config', key: 'points-config' },
          { title: '积分调整', path: '/platform-admin/points-management/adjust', key: 'points-adjust' }
        ]
      }
    ]
  },
  {
    title: '商户端',
    key: 'merchant-backend',
    children: [
      {
        title: '入驻平台',
        key: 'join-application',
        children: [
          { title: '入驻申请', path: '/merchant-backend/join-application/apply', key: 'apply' }
        ]
      },
      {
        title: '门店信息',
        key: 'store-info',
        children: [
          { title: '基本信息', path: '/merchant-backend/store-info/basic', key: 'basic' },
          { title: '政策相关', path: '/merchant-backend/store-info/policy', key: 'policy' },
          { title: '门店设施', path: '/merchant-backend/store-info/facilities', key: 'facilities' },
          { title: '周边信息', path: '/merchant-backend/store-info/surrounding', key: 'surrounding' },
          { title: '早餐政策', path: '/merchant-backend/store-info/breakfast', key: 'breakfast' },
          { title: '加床政策', path: '/merchant-backend/store-info/extra-bed', key: 'extra-bed' },
          { title: '门店图片', path: '/merchant-backend/store-info/images', key: 'images' }
        ]
      },
      {
        title: '订单管理',
        key: 'hotel-order-management',
        children: [
          { title: '订单列表', path: '/hotel-backend/order-list', key: 'hotel-order-list' }
        ]
      },
      {
        title: '会员服务',
        key: 'member-service',
        children: [
          { title: '积分服务配置', path: '/merchant-backend/points-service/config', key: 'points-service' },
          { title: 'VIP折扣配置', path: '/merchant-backend/vip-discount/config', key: 'vip-discount' },
          { title: '代客下单', path: '/merchant-backend/agent-order/create', key: 'agent-order' },
          { title: '邀请会员', path: '/merchant-backend/old-customer/invite-member', key: 'invite-member' }
        ]
      }
    ]
  }
]
