/**
 * 左侧导航菜单组件
 */

import { Link, useLocation } from '@remix-run/react'
import { ChevronDown, ChevronRight, ChevronLeft, BookOpen, Presentation, Menu } from 'lucide-react'
import { useState, useRef, useEffect } from 'react'
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
  const menuScrollRef = useRef<HTMLDivElement>(null)
  const scrollPositionRef = useRef<number>(0)

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
    '积分管理 *': true,
    '会员管理 *': true,
    '优惠券': true,
    '系统管理': true,
    '商户端': true,
    '积分服务': true,
    'VIP折扣': true,
    '代客下单': true,
    'C端小程序': true,
    '用户中心': true,
    '酒店浏览': true,
    '酒店后台': true,
    '经营管理': true,
    '门店配置': true,
    '房型管理': true,
    '收益管理': true,
    '系统设置': true
  })

  // 保存滚动位置
  useEffect(() => {
    const menuElement = menuScrollRef.current
    if (menuElement) {
      // 保存当前滚动位置
      const handleScroll = () => {
        scrollPositionRef.current = menuElement.scrollTop
      }
      menuElement.addEventListener('scroll', handleScroll)
      return () => menuElement.removeEventListener('scroll', handleScroll)
    }
  }, [])

  // 路由变化时恢复滚动位置
  useEffect(() => {
    const menuElement = menuScrollRef.current
    if (menuElement && scrollPositionRef.current > 0) {
      // 使用 setTimeout 确保 DOM 已经更新
      setTimeout(() => {
        menuElement.scrollTop = scrollPositionRef.current
      }, 0)
    }
  }, [location.pathname])

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
    const titleHasModification = item.title.includes('*')
    const titleDisplay = item.title.replace(' *', '')

    if (hasChildren) {
      return (
        <div key={item.title}>
          <button
            onClick={(e) => {
              e.preventDefault()
              toggleMenu(item.title)
            }}
            className={`w-full flex items-center justify-between px-3 py-2 text-sm rounded-md transition-colors ${
              level === 1
                ? 'font-bold text-slate-900 hover:bg-slate-100'
                : 'font-medium text-slate-700 hover:bg-slate-100'
            }`}
          >
            <span>
              {titleDisplay}
              {titleHasModification && <span className="text-red-600 ml-1">*</span>}
            </span>
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
        reloadDocument={false}
        onClick={(e) => {
          // 阻止默认的滚动行为
          e.stopPropagation()
        }}
        className={`block px-3 py-2 text-sm rounded-md transition-colors ${
          isActive(item.path)
            ? 'bg-blue-50 text-blue-700 font-medium'
            : 'text-slate-600 hover:bg-slate-100'
        }`}
      >
        <span>
          {titleDisplay}
          {titleHasModification && <span className="text-red-600 ml-1">*</span>}
        </span>
      </Link>
    )
  }

  return (
    <>
      {/* 收起时的迷你按钮 */}
      {isSidebarCollapsed && (
        <div className="fixed left-0 top-20 z-50">
          <button
            onClick={toggleSidebar}
            className="p-2 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-r-md shadow-md transition-colors"
            title="展开菜单"
          >
            <ChevronRight className="w-4 h-4 text-slate-600" />
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
              <ChevronLeft className="w-4 h-4 text-slate-600" />
            </button>
          </div>

          {/* 菜单区域 */}
          <div ref={menuScrollRef} className="flex-1 overflow-y-auto p-4">
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
          { title: '核心场景 *', path: '/architecture/scenario' }
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
        title: '积分管理 *',
        children: [
          { title: '积分规则配置 *', path: '/platform-admin/points-management/base-rule' },
          { title: '积分调整 *', path: '/platform-admin/points-management/adjustment' },
          {
            title: '积分增值服务 *',
            children: [
              { title: '积分奖励 *', path: '/platform-admin/points-management/value-added/reward' },
              { title: '积分换购 *', path: '/platform-admin/points-management/value-added/exchange' }
            ]
          }
        ]
      },
      {
        title: '会员管理 *',
        children: [
          { title: '会员等级设置 *', path: '/member-management/levels' },
          { title: '会员邀请 *', path: '/platform-admin/member-management/invitations' }
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
    title: '商户端',
    children: [
      {
        title: '积分服务',
        children: [
          { title: '服务配置 *', path: '/merchant-backend/points-service/config' }
        ]
      },
      {
        title: 'VIP折扣',
        children: [
          { title: '折扣配置 *', path: '/merchant-backend/vip-discount/config' }
        ]
      },
      {
        title: '老客服务 *',
        children: [
          { title: '代客下单 *', path: '/merchant-backend/agent-order/create' },
          { title: '邀请会员 *', path: '/merchant-backend/old-customer/invite-member' }
        ]
      }
    ]
  },
  {
    title: 'C端小程序',
    children: [
      {
        title: '用户中心',
        children: [
          { title: '我的积分 *', path: '/c-client/user-center/my-points' },
          { title: '会员中心 *', path: '/c-client/user-center/member-center' },
          { title: '邀请好友 *', path: '/c-client/user-center/invite-friend' }
        ]
      },
      {
        title: '酒店浏览',
        children: [
          { title: '酒店列表 *', path: '/c-client/hotel/list' },
          { title: '酒店详情 *', path: '/c-client/hotel/detail' },
          { title: '订单确认 *', path: '/c-client/hotel/order-confirm' }
        ]
      },
      {
        title: '订单管理',
        children: [
          { title: '支付成功 *', path: '/c-client/order/payment-success' },
          { title: '订单列表 *', path: '/c-client/order/list' },
          { title: '订单详情 *', path: '/c-client/order/detail' }
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
