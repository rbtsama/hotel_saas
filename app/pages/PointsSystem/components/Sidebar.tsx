/**
 * 左侧导航菜单组件
 */

import { Link, useLocation } from '@remix-run/react'
import { ChevronDown, ChevronRight, BookOpen, Presentation, Menu, X } from 'lucide-react'
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
  const { mode, toggleMode, isLearningMode, isSidebarCollapsed, toggleSidebar } = useViewMode()
  const [expandedMenus, setExpandedMenus] = useState<Record<string, boolean>>({
    // 默认展开所有菜单，提升用户体验
    '设计架构': true,
    '产品架构': true,
    '技术架构': true,
    '设计规范': true,
    '场景设计': true,
    '平台后台': true,
    '酒店入驻': true,
    '酒店管理': true,
    '订单管理': true,
    '争议处理': true,
    '积分管理': true,
    '会员管理': true,
    '优惠券': true,
    '系统管理': true,
    '酒店后台': true,
    '经营管理': true,
    '门店配置': true,
    '房型管理': true,
    '收益管理': true,
    '系统设置': true
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
        preventScrollReset={true}
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
    <>
      {/* 收起时的迷你侧边栏 */}
      {isSidebarCollapsed && (
        <div className="w-16 h-screen bg-slate-50 border-r border-slate-200 flex flex-col items-center py-4 transition-all duration-300">
          <button
            onClick={toggleSidebar}
            className="p-2 hover:bg-slate-100 rounded-md transition-colors"
            title="展开菜单"
          >
            <Menu className="w-5 h-5 text-slate-600" />
          </button>
        </div>
      )}

      {/* 完整侧边栏 */}
      {!isSidebarCollapsed && (
        <div className="w-64 h-screen bg-slate-50 border-r border-slate-200 flex flex-col transition-all duration-300">
          {/* Logo区域 */}
          <div className="p-4 border-b border-slate-200 flex items-center justify-between">
            <Link to="/" className="block flex-1">
              <h1 className="text-xl font-bold text-slate-900">酒店SAAS学习平台</h1>
              <p className="text-xs text-slate-500 mt-1">模块化设计参考</p>
            </Link>
            <button
              onClick={toggleSidebar}
              className="p-2 hover:bg-slate-100 rounded-md transition-colors"
              title="收起菜单"
            >
              <X className="w-4 h-4 text-slate-600" />
            </button>
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
      )}
    </>
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
      },
      {
        title: '技术架构',
        children: [
          { title: '技术设计', path: '/architecture/technical' }
        ]
      },
      {
        title: '设计规范',
        children: [
          { title: '配色系统', path: '/architecture/design/color-system' },
          { title: '配色系统2', path: '/architecture/design/color-system-2' }
        ]
      },
      {
        title: '场景设计',
        children: [
          { title: '核心场景', path: '/architecture/scenario' }
        ]
      }
    ]
  },
  {
    title: '平台后台',
    children: [
      // 基石功能：业务核心（按重要性排序）
      {
        title: '酒店入驻',
        children: [
          { title: '加盟申请', path: '/hotel/join-application' },
          { title: '合作酒店', path: '/hotel/partner-list' },
          { title: '协议模板', path: '/hotel/contract-template' },
          { title: '签约记录', path: '/hotel/signing-record' }
        ]
      },
      {
        title: '酒店管理',
        children: [
          { title: '经营数据', path: '/platform-admin/hotel-monitor' },
          { title: '房价管理', path: '/platform-admin/hotel-monitor?tab=price' },
          { title: '库存管理', path: '/platform-admin/hotel-monitor?tab=inventory' },
          { title: '评价管理', path: '/platform-admin/hotel-monitor?tab=reviews' }
        ]
      },
      {
        title: '订单管理',
        children: [
          { title: '订单列表', path: '/order/list' },
          { title: '退款管理', path: '/order/refund' }
        ]
      },
      {
        title: '争议处理',
        children: [
          { title: '退款申请', path: '/dispute/refund-requests' },
          { title: '仲裁案件', path: '/dispute/arbitration-cases' },
          { title: '仲裁委员', path: '/dispute/arbitrators' }
        ]
      },
      // 用户运营：锦上添花
      {
        title: '积分管理',
        children: [
          { title: '基础规则配置', path: '/platform-admin/points-management/base-rule' },
          { title: '等级积分汇率', path: '/platform-admin/points-management/level-rates' },
          { title: '积分统计', path: '/platform-admin/points-management/statistics' }
        ]
      },
      {
        title: '会员管理',
        children: [
          { title: '升级规则配置', path: '/platform-admin/member-management/upgrade-rules' },
          { title: '折扣规则配置', path: '/platform-admin/member-management/discount-rules' },
          { title: '用户会员管理', path: '/platform-admin/member-management/users' }
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
      // 系统配置
      {
        title: '系统管理',
        children: [
          { title: '账号列表', path: '/account/list' },
          { title: '用户列表', path: '/user/list' },
          { title: '协议配置', path: '/system/agreements' },
          { title: '标签配置', path: '/system/tags' }
        ]
      }
    ]
  },
  {
    title: '酒店后台',
    children: [
      // 经营数据：最重要（新增）
      {
        title: '经营管理',
        children: [
          { title: '经营概览', path: '/hotel-backend/business/overview' },
          { title: '经营统计', path: '/hotel-backend/business/statistics' },
          { title: '财务对账', path: '/hotel-backend/business/financial-statements' },
          { title: '结算管理', path: '/hotel-backend/business/settlements' }
        ]
      },
      // 日常运营：订单和收益
      {
        title: '订单管理',
        children: [
          { title: '订单列表', path: '/hotel-backend/order-list' },
          { title: '订单日历', path: '/hotel-backend/order-calendar' },
          { title: '客诉退款', path: '/hotel-backend/refund-management' },
          { title: '用户评价', path: '/hotel-backend/user-reviews' }
        ]
      },
      {
        title: '收益管理',
        children: [
          { title: '房价日历', path: '/hotel-backend/room-price-calendar' },
          { title: '库存日历', path: '/hotel-backend/inventory-calendar' }
        ]
      },
      // 产品配置：初始化
      {
        title: '门店配置',
        children: [
          { title: '基本信息', path: '/hotel-backend/store/basic-info' },
          { title: '门店设施', path: '/hotel-backend/store/facilities' },
          { title: '门店图片', path: '/hotel-backend/store/images' },
          { title: '周边信息', path: '/hotel-backend/store/surrounding' },
          { title: '酒店政策', path: '/hotel-backend/store/policy' }
        ]
      },
      {
        title: '房型管理',
        children: [
          { title: '房型列表', path: '/hotel-backend/room-type-list' },
          { title: '房型图片', path: '/hotel-backend/room-type-images' },
          { title: '早餐政策', path: '/hotel-backend/store/breakfast' },
          { title: '加床政策', path: '/hotel-backend/store/extra-bed' },
          { title: '非房产品', path: '/hotel-backend/non-room-products' }
        ]
      },
      // 系统配置
      {
        title: '系统设置',
        children: [
          { title: 'PMS对接', path: '/hotel-backend/pms-integration' },
          { title: '房间管理', path: '/hotel-backend/rooms' },
          { title: '员工账号', path: '/hotel-backend/staff' }
        ]
      }
    ]
  }
]
