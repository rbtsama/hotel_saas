/**
 * 统一的返回按钮组件
 *
 * 使用规范：
 * - 位于页面左上角
 * - 与标题在同一行
 * - 样式统一：Ghost风格，hover时高亮
 */

import { Link } from '@remix-run/react'
import { Button } from '~/components/ui/button'
import { ArrowLeft } from 'lucide-react'

interface BackButtonProps {
  to: string
  label?: string
}

export default function BackButton({ to, label = '返回列表' }: BackButtonProps) {
  return (
    <Link to={to}>
      <Button
        variant="ghost"
        size="sm"
        className="h-9 px-3 text-slate-600 hover:text-slate-900 hover:bg-slate-100"
      >
        <ArrowLeft className="w-4 h-4 mr-1" />
        {label}
      </Button>
    </Link>
  )
}
