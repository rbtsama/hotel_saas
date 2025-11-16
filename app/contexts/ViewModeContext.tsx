/**
 * 视图模式Context - 管理学习模式/展示模式切换
 */

import { createContext, useContext, useState, ReactNode, useEffect } from 'react'

export type ViewMode = 'learning' | 'presentation'

interface ViewModeContextType {
  mode: ViewMode
  toggleMode: () => void
  isLearningMode: boolean
  isPresentationMode: boolean
}

const ViewModeContext = createContext<ViewModeContextType | undefined>(undefined)

export function ViewModeProvider({ children }: { children: ReactNode }) {
  // 从localStorage读取初始模式
  const [mode, setMode] = useState<ViewMode>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('viewMode')
      return (saved as ViewMode) || 'learning'
    }
    return 'learning'
  })

  // 保存到localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('viewMode', mode)
    }
  }, [mode])

  const toggleMode = () => {
    setMode((prev) => (prev === 'learning' ? 'presentation' : 'learning'))
  }

  const value: ViewModeContextType = {
    mode,
    toggleMode,
    isLearningMode: mode === 'learning',
    isPresentationMode: mode === 'presentation',
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
