import { ReactNode } from 'react'
import { Button } from '~/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card'

interface EditableSectionProps {
  title: string
  isEditing: boolean
  onEdit?: () => void
  onSave?: () => void
  onCancel?: () => void
  isSaving?: boolean
  children: ReactNode
  hideActions?: boolean
}

export default function EditableSection({
  title,
  isEditing,
  onEdit,
  onSave,
  onCancel,
  isSaving = false,
  children,
  hideActions = false,
}: EditableSectionProps) {
  return (
    <Card className="rounded-xl border-slate-200 bg-white shadow-md hover:shadow-lg transition-all duration-200">
      <CardHeader className="flex flex-row items-center justify-between border-b border-slate-100 pb-4">
        <CardTitle className="text-base font-semibold text-slate-900">{title}</CardTitle>
        {!hideActions && (
          <div className="flex gap-2">
            {!isEditing ? (
              <Button
                onClick={onEdit}
                className="h-9 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium shadow-sm transition-all"
              >
                编辑
              </Button>
            ) : (
              <>
                <Button
                  onClick={onCancel}
                  variant="outline"
                  className="h-9 px-4 border-slate-300 hover:border-slate-400 hover:bg-slate-50 font-medium transition-all"
                  disabled={isSaving}
                >
                  取消
                </Button>
                <Button
                  onClick={onSave}
                  className="h-9 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium shadow-sm transition-all"
                  disabled={isSaving}
                >
                  {isSaving ? '保存中...' : '保存'}
                </Button>
              </>
            )}
          </div>
        )}
      </CardHeader>
      <CardContent className="pt-6">{children}</CardContent>
    </Card>
  )
}
