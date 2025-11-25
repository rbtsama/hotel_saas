/**
 * 视图模式Context - 管理侧边栏收起状态
 */

import { createContext, useContext, useState, ReactNode, useEffect } from 'react'

interface ViewModeContextType {
  isSidebarCollapsed: boolean
  toggleSidebar: () => void
  setSidebarCollapsed: (collapsed: boolean) => void
}

const ViewModeContext = createContext<ViewModeContextType | undefined>(undefined)

export function ViewModeProvider({ children }: { children: ReactNode }) {
  // 从localStorage读取侧边栏状态
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('sidebarCollapsed')
      return saved === 'true'
    }
    return false
  })

  // 保存侧边栏状态到localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('sidebarCollapsed', String(isSidebarCollapsed))
    }
  }, [isSidebarCollapsed])

  const toggleSidebar = () => {
    setIsSidebarCollapsed((prev) => !prev)
  }

  const setSidebarCollapsed = (collapsed: boolean) => {
    setIsSidebarCollapsed(collapsed)
  }

  const value: ViewModeContextType = {
    isSidebarCollapsed,
    toggleSidebar,
    setSidebarCollapsed,
  }

  return <ViewModeContext.Provider value={value}>{children}</ViewModeContext.Provider>
}

export function useViewMode() {
  const context = useContext(ViewModeContext)
  if (context === undefined) {
    throw new Error('useViewMode must be used within a ViewModeProvider')
  }
  return context
}
