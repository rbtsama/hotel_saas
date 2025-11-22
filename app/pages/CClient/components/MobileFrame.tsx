/**
 * C端 - 手机框架容器组件
 * 模拟小程序的手机显示效果
 */

import MainLayout from '~/pages/PointsSystem/components/MainLayout'

interface MobileFrameProps {
  children: React.ReactNode
  showNavBar?: boolean
  navTitle?: string
  showTabBar?: boolean
}

export default function MobileFrame({
  children,
  showNavBar = true,
  navTitle = '页面标题',
  showTabBar = false,
}: MobileFrameProps) {
  return (
    <MainLayout>
      <div className="h-screen overflow-y-auto bg-slate-100 flex items-center justify-center p-6">
        {/* 手机框架 */}
        <div className="w-[375px] h-[667px] bg-white rounded-[32px] shadow-2xl overflow-hidden border-8 border-slate-800 relative">
          {/* 手机顶部刘海 */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-slate-800 rounded-b-2xl z-50" />

          {/* 小程序导航栏 */}
          {showNavBar && (
            <div className="h-11 bg-white border-b border-slate-200 flex items-center justify-center relative pt-6">
              <span className="text-sm font-medium text-slate-900">{navTitle}</span>
            </div>
          )}

          {/* 页面内容区域 */}
          <div className={`${showNavBar ? 'h-[calc(100%-44px)]' : 'h-full'} ${showTabBar ? 'pb-12' : ''} overflow-y-auto bg-[#F8F6F3]`}>
            {children}
          </div>

          {/* 底部TabBar（如果需要） */}
          {showTabBar && (
            <div className="absolute bottom-0 left-0 right-0 h-12 bg-white border-t border-slate-200 flex items-center justify-around">
              <div className="flex flex-col items-center gap-0.5">
                <div className="w-5 h-5 bg-primary rounded-full" />
                <span className="text-xs text-primary">首页</span>
              </div>
              <div className="flex flex-col items-center gap-0.5">
                <div className="w-5 h-5 bg-slate-300 rounded-full" />
                <span className="text-xs text-slate-500">订单</span>
              </div>
              <div className="flex flex-col items-center gap-0.5">
                <div className="w-5 h-5 bg-slate-300 rounded-full" />
                <span className="text-xs text-slate-500">我的</span>
              </div>
            </div>
          )}
        </div>

        {/* 右侧说明 */}
        <div className="ml-8 max-w-md">
          <h3 className="text-lg font-semibold text-slate-900 mb-2">小程序模拟</h3>
          <p className="text-sm text-slate-600">
            左侧显示的是手机端（375x667px）的小程序界面模拟。
            所有C端页面都使用这个手机框架展示，模拟真实的微信小程序体验。
          </p>
        </div>
      </div>
    </MainLayout>
  )
}
