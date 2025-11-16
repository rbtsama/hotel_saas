/**
 * 左侧导航菜单组件
 */

import { Link, useLocation } from '@remix-run/react'
import { ChevronDown, ChevronRight, BookOpen, Presentation } from 'lucide-react'
import { useState } from 'react'
import { useViewMode } from '~/contexts/ViewModeContext'

interface MenuItem {
  title: string
  path?: string
  children?: MenuItem[]
}

interface SidebarProps {
  menuItems: MenuItem[]
}

export default function Sidebar({ menuItems }: SidebarProps) {
  const location = useLocation()
  const { mode, toggleMode, isLearningMode } = useViewMode()
  const [expandedMenus, setExpandedMenus] = useState<Record<string, boolean>>({
    '设计架构': true, // 默认展开设计架构
    '产品架构': true, // 默认展开产品架构
    '平台后台': true, // 默认展开平台后台
    '积分系统': true  // 默认展开积分系统
  })

  const toggleMenu = (title: string) => {
    setExpandedMenus(prev => ({ ...prev, [title]: !prev[title] }))
  }

  const isActive = (path?: string) => {
    if (!path) return false
    return location.pathname === path
  }

  // 递归渲染菜单项 - 支持多级嵌套
  const renderMenuItem = (item: MenuItem, level: number = 1): React.ReactNode => {
    const hasChildren = item.children && item.children.length > 0

    if (hasChildren) {
      return (
        <div key={item.title}>
          <button
            onClick={() => toggleMenu(item.title)}
            className={`w-full flex items-center justify-between px-3 py-2 text-sm rounded-md transition-colors ${
              level === 1
                ? 'font-bold text-slate-900 hover:bg-slate-100'
                : 'font-medium text-slate-700 hover:bg-slate-100'
            }`}
          >
            <span>{item.title}</span>
            {expandedMenus[item.title] ? (
              <ChevronDown className="w-4 h-4" />
            ) : (
              <ChevronRight className="w-4 h-4" />
            )}
          </button>

          {/* 子菜单 */}
          {expandedMenus[item.title] && (
            <div className={`${level === 1 ? 'ml-2' : 'ml-4'} mt-1 space-y-1`}>
              {item.children!.map((child) => renderMenuItem(child, level + 1))}
            </div>
          )}
        </div>
      )
    }

    // 叶子节点（实际路径）
    return (
      <Link
        key={item.path}
        to={item.path || '#'}
        className={`block px-3 py-2 text-sm rounded-md transition-colors ${
          isActive(item.path)
            ? 'bg-blue-50 text-blue-700 font-medium'
            : 'text-slate-600 hover:bg-slate-100'
        }`}
      >
        {item.title}
      </Link>
    )
  }

  return (
    <div className="w-64 h-screen bg-slate-50 border-r border-slate-200 flex flex-col">
      {/* Logo区域 */}
      <div className="p-4 border-b border-slate-200">
        <Link to="/" className="block">
          <h1 className="text-xl font-bold text-slate-900">酒店SAAS学习平台</h1>
          <p className="text-xs text-slate-500 mt-1">模块化设计参考</p>
        </Link>
      </div>

      {/* 菜单区域 */}
      <div className="flex-1 overflow-y-auto p-4">
        <nav className="space-y-2">
          {menuItems.map((item) => renderMenuItem(item, 1))}
        </nav>
      </div>

      {/* 底部信息 */}
      <div className="p-4 border-t border-slate-200 space-y-3">
        {/* 模式切换按钮 */}
        <button
          onClick={toggleMode}
          className="w-full flex items-center justify-center gap-2 px-3 py-2 text-xs text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-md transition-colors"
        >
          {isLearningMode ? (
            <>
              <BookOpen className="w-4 h-4" />
              <span>学习模式</span>
            </>
          ) : (
            <>
              <Presentation className="w-4 h-4" />
              <span>展示模式</span>
            </>
          )}
        </button>

        <p className="text-xs text-slate-500 text-center">
          参考：美团、携程、华住会
        </p>
      </div>
    </div>
  )
}

/**
 * 菜单配置 - 三级菜单结构
 */
export const menuConfig: MenuItem[] = [
  {
    title: '设计架构',
    children: [
      {
        title: '产品架构',
        children: [
          { title: '总图', path: '/architecture/product/overview' }
        ]
      }
    ]
  },
  {
    title: '平台后台',
    children: [
      {
        title: '积分系统',
        children: [
          { title: '积分规则配置', path: '/points-system/rule-config' },
          { title: '用户积分管理', path: '/points-system/user-account' }
        ]
      },
      {
        title: '会员体系',
        children: [
          { title: '会员等级配置', path: '/member/level-config' },
          { title: '会员权益管理', path: '/member/benefits' }
        ]
      },
      {
        title: '优惠券',
        children: [
          { title: '优惠券配置', path: '/coupon/config' },
          { title: '优惠券发放', path: '/coupon/grant' },
          { title: '核销记录', path: '/coupon/verify' }
        ]
      },
      {
        title: '酒店管理',
        children: [
          { title: '加盟申请', path: '/hotel/join-application' },
          { title: '合作酒店', path: '/hotel/partner-list' },
          { title: '协议模板管理', path: '/hotel/contract-template' },
          { title: '签约记录', path: '/hotel/signing-record' }
        ]
      },
      {
        title: '订单管理',
        children: [
          { title: '订单列表', path: '/order/list' },
          { title: '订单详情', path: '/order/detail' },
          { title: '退款管理', path: '/order/refund' }
        ]
      },
      {
        title: '账号管理',
        children: [
          { title: '账号列表', path: '/account/list' }
        ]
      },
      {
        title: '营销管理',
        children: [
          { title: '广告管理', path: '/marketing/ads' }
        ]
      },
      {
        title: '争议处理',
        children: [
          { title: '退款申请管理', path: '/dispute/refund-requests' },
          { title: '仲裁案件管理', path: '/dispute/arbitration-cases' },
          { title: '仲裁委员管理', path: '/dispute/arbitrators' }
        ]
      },
      {
        title: '系统参数',
        children: [
          { title: '协议配置', path: '/system/agreements' },
          { title: '标签配置', path: '/system/tags' }
        ]
      },
      {
        title: '用户管理',
        children: [
          { title: '用户列表', path: '/user/list' }
        ]
      },
      {
        title: '会员管理',
        children: [
          { title: '会员等级', path: '/member-management/levels' },
          { title: '会员管理', path: '/member-management/members' }
        ]
      }
    ]
  },
  {
    title: '酒店后台',
    children: [
      {
        title: '账号管理',
        path: '/hotel-backend/staff'
      },
      {
        title: '门店管理',
        children: [
          { title: '基本信息', path: '/hotel-backend/store/basic-info' },
          { title: '酒店政策', path: '/hotel-backend/store/policy' },
          { title: '门店设施', path: '/hotel-backend/store/facilities' },
          { title: '周边信息', path: '/hotel-backend/store/surrounding' },
          { title: '早餐政策', path: '/hotel-backend/store/breakfast' },
          { title: '加床政策', path: '/hotel-backend/store/extra-bed' },
          { title: '门店图片', path: '/hotel-backend/store/images' }
        ]
      },
      {
        title: '房型管理',
        children: [
          { title: '房型列表', path: '/hotel-backend/room-type-list' },
          { title: '房型图片', path: '/hotel-backend/room-type-images' },
          { title: '非房产品', path: '/hotel-backend/non-room-products' },
          { title: 'PMS对接', path: '/hotel-backend/pms-integration' }
        ]
      },
      {
        title: '房务管理',
        children: [
          { title: '房价日历', path: '/hotel-backend/room-price-calendar' },
          { title: '库存日历', path: '/hotel-backend/inventory-calendar' },
          { title: '订单日历', path: '/hotel-backend/order-calendar' },
          { title: '订单列表', path: '/hotel-backend/order-list' },
          { title: '客诉退款', path: '/hotel-backend/refund-management' },
          { title: '用户点赞', path: '/hotel-backend/user-reviews' }
        ]
      },
      {
        title: '房屋管理',
        path: '/hotel-backend/rooms'
      },
      {
        title: '会员管理',
        path: '/hotel-backend/members'
      }
    ]
  }
]
