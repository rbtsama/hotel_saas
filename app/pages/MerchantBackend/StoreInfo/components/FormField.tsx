import { ReactNode } from 'react'
import { Label } from '~/components/ui/label'
import { InfoIcon } from 'lucide-react'

interface FormFieldProps {
  label: string
  required?: boolean
  locked?: boolean
  lockMessage?: string
  hint?: string
  children: ReactNode
  className?: string
}

export default function FormField({
  label,
  required = false,
  locked = false,
  lockMessage = '修改需联系平台',
  hint,
  children,
  className = '',
}: FormFieldProps) {
  return (
    <div className={`space-y-2 ${className}`}>
      <div className="flex items-center gap-2">
        <Label className="text-sm font-medium text-slate-700">
          {required && <span className="text-red-600 mr-1">*</span>}
          {label}
        </Label>
        {locked && (
          <span className="text-xs text-slate-400 flex items-center gap-1">
            <InfoIcon className="w-3 h-3" />
            {lockMessage}
          </span>
        )}
        {hint && (
          <span className="text-xs text-slate-500 flex items-center gap-1">
            <InfoIcon className="w-3 h-3" />
            {hint}
          </span>
        )}
      </div>
      {children}
    </div>
  )
}
