/**
 * 统一的启用/停用按钮组件
 * 启用：绿色文字+边框，hover绿色背景
 * 停用：橙色文字+边框，hover橙色背景
 */

import { Button } from '~/components/ui/button'
import { cn } from '~/lib/utils'

interface ToggleButtonProps {
  isEnabled: boolean
  onToggle?: () => void
  enabledText?: string
  disabledText?: string
  disabled?: boolean
  size?: 'sm' | 'default'
  className?: string
}

export function ToggleButton({
  isEnabled,
  onToggle,
  enabledText = '停用',
  disabledText = '启用',
  disabled = false,
  size = 'sm',
  className,
}: ToggleButtonProps) {
  const buttonText = isEnabled ? enabledText : disabledText

  return (
    <Button
      type="submit"
      variant="outline"
      size={size}
      onClick={onToggle}
      disabled={disabled}
      className={cn(
        'transition-all font-medium',
        // 已启用 - 显示"停用" - 橙色(警告色)
        isEnabled && [
          'border-orange-600 text-orange-600',
          'hover:bg-orange-50 hover:border-orange-600 hover:text-orange-600',
        ],
        // 已停用 - 显示"启用" - 绿色(成功色)
        !isEnabled && [
          'border-green-600 text-green-600',
          'hover:bg-green-50 hover:border-green-600 hover:text-green-600',
        ],
        className
      )}
    >
      {buttonText}
    </Button>
  )
}

/**
 * 用于Form提交的启用/停用按钮
 */
interface ToggleFormButtonProps {
  isEnabled: boolean
  itemId: string
  enabledText?: string
  disabledText?: string
  disabled?: boolean
  size?: 'sm' | 'default'
  className?: string
}

export function ToggleFormButton({
  isEnabled,
  itemId,
  enabledText = '停用',
  disabledText = '启用',
  disabled = false,
  size = 'sm',
  className,
}: ToggleFormButtonProps) {
  return (
    <form method="post" style={{ display: 'inline' }}>
      <input type="hidden" name="id" value={itemId} />
      <input type="hidden" name="action" value={isEnabled ? 'disable' : 'enable'} />
      <ToggleButton
        isEnabled={isEnabled}
        enabledText={enabledText}
        disabledText={disabledText}
        disabled={disabled}
        size={size}
        className={className}
      />
    </form>
  )
}
