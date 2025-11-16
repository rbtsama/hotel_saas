/**
 * 右侧产品逻辑说明面板组件
 * 展示业务场景、产品逻辑、字段说明等
 */

import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card'
import { useViewMode } from '~/contexts/ViewModeContext'

interface LogicSection {
  title: string
  content: React.ReactNode
}

interface LogicPanelProps {
  title: string
  sections: LogicSection[]
}

export default function LogicPanel({ title, sections }: LogicPanelProps) {
  const { isPresentationMode } = useViewMode()

  // 展示模式下不显示
  if (isPresentationMode) {
    return null
  }

  return (
    <div className="h-full overflow-y-auto bg-muted/30 p-6">
      <div className="space-y-6">
        <div className="border-l-4 border-primary pl-4">
          <h2 className="text-2xl font-bold text-foreground">{title}</h2>
          <p className="text-sm text-muted-foreground mt-1">产品&业务逻辑文档</p>
        </div>

        {sections.map((section, index) => (
          <Card key={index} className="border-l-2 border-primary/50">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <span className="text-primary">▶</span>
                {section.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="prose prose-sm dark:prose-invert max-w-none">
              {section.content}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

/**
 * 辅助组件：表格
 */
export function LogicTable({ headers, rows }: { headers: string[]; rows: (string | React.ReactNode)[][] }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse border border-border">
        <thead className="bg-muted">
          <tr>
            {headers.map((header, i) => (
              <th key={i} className="border border-border px-4 py-2 text-left font-semibold">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="hover:bg-muted/50">
              {row.map((cell, j) => (
                <td key={j} className="border border-border px-4 py-2">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

/**
 * 辅助组件：列表
 */
export function LogicList({ items }: { items: (string | React.ReactNode)[] }) {
  return (
    <ul className="space-y-2">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-2">
          <span className="text-primary mt-1">•</span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  )
}

/**
 * 辅助组件：代码块
 */
export function LogicCode({ children }: { children: string }) {
  return (
    <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
      <code className="text-sm">{children}</code>
    </pre>
  )
}

/**
 * 辅助组件：高亮块
 */
export function LogicHighlight({ type = 'info', children }: { type?: 'info' | 'warning' | 'success'; children: React.ReactNode }) {
  const colors = {
    info: 'bg-blue-500/10 border-blue-500/50 text-blue-700 dark:text-blue-300',
    warning: 'bg-yellow-500/10 border-yellow-500/50 text-yellow-700 dark:text-yellow-300',
    success: 'bg-green-500/10 border-green-500/50 text-green-700 dark:text-green-300'
  }

  return (
    <div className={`border-l-4 pl-4 py-2 ${colors[type]}`}>
      {children}
    </div>
  )
}
