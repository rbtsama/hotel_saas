interface DisplayValueProps {
  value: string | number | undefined | null
  emptyText?: string
  className?: string
}

export default function DisplayValue({ value, emptyText = '—', className = '' }: DisplayValueProps) {
  const displayValue = value !== undefined && value !== null && value !== '' ? String(value) : emptyText

  return (
    <div className={`min-h-[36px] flex items-center text-slate-900 ${className}`}>
      {displayValue}
    </div>
  )
}
