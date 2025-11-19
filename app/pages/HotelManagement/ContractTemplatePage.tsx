/**
 * 协议模板管理页面
 * 法务管理协议模板，版本控制
 */

import { useState } from 'react'
import type { ContractTemplate } from './types/contract.types'
import { TemplateStatus } from './types/contract.types'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '~/components/ui/card'
import { Input } from '~/components/ui/input'
import { Label } from '~/components/ui/label'
import { Button } from '~/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '~/components/ui/table'
import MainLayout from '../PointsSystem/components/MainLayout'

interface ContractTemplatePageProps {
  templates: ContractTemplate[]
  error?: string | null
}

const templateStatusLabels: Record<TemplateStatus, string> = {
  [TemplateStatus.DRAFT]: '草稿',
  [TemplateStatus.ACTIVE]: '生效中',
  [TemplateStatus.INACTIVE]: '已停用'
}

const OperationLogButton = ({ moduleName }: { moduleName: string }) => (
  <Button variant="ghost" size="sm" className="text-slate-400 hover:text-slate-600">
    📋 {moduleName}操作记录
  </Button>
)

const BusinessLogicPanel = ({ sections }: { sections: Array<{ title: string; content: React.ReactNode }> }) => (
  <div className="p-6 space-y-6 overflow-y-auto">
    <div>
      <h2 className="text-xl font-bold text-slate-900">业务逻辑说明</h2>
      <p className="text-sm text-slate-500 mt-1">
        后台配置如何影响前端用户体验
      </p>
    </div>
    {sections.map((section, index) => (
      <div key={index}>
        <h3 className="font-semibold mb-3">{section.title}</h3>
        {section.content}
      </div>
    ))}
  </div>
)

export default function ContractTemplatePage({ templates, error }: ContractTemplatePageProps) {
  const [filterStatus, setFilterStatus] = useState<TemplateStatus | 'all'>('all')
  const [showPreviewDialog, setShowPreviewDialog] = useState(false)
  const [showEditDialog, setShowEditDialog] = useState(false)
  const [currentTemplate, setCurrentTemplate] = useState<ContractTemplate | null>(null)

  const filteredTemplates = templates.filter(t => filterStatus === 'all' || t.status === filterStatus)

  const openPreview = (template: ContractTemplate) => {
    setCurrentTemplate(template)
    setShowPreviewDialog(true)
  }

  const openEdit = (template: ContractTemplate) => {
    setCurrentTemplate(template)
    setShowEditDialog(true)
  }

  if (error) {
    return (
      <MainLayout>
        <div className="p-6">
          <div className="text-destructive">错误: {error}</div>
        </div>
      </MainLayout>
    )
  }

  return (
    <MainLayout>
      <div className="flex h-screen">
        <div className="w-[60%] overflow-y-auto">
          <div className="p-6 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-slate-900">协议模板管理</h1>
                <p className="text-sm text-slate-500 mt-1">
                  管理协议模板，版本控制
                </p>
              </div>
              <OperationLogButton moduleName="协议模板管理" />
            </div>

            {/* 筛选栏 */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex gap-4">
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value as TemplateStatus | 'all')}
                    className="px-3 py-2 border rounded-md text-sm"
                  >
                    <option value="all">全部状态</option>
                    <option value={TemplateStatus.DRAFT}>草稿</option>
                    <option value={TemplateStatus.ACTIVE}>生效中</option>
                    <option value={TemplateStatus.INACTIVE}>已停用</option>
                  </select>
                </div>
              </CardContent>
            </Card>

            {/* 模板列表 */}
            <Card>
              <CardHeader>
                <CardTitle>模板列表</CardTitle>
                <CardDescription>共 {filteredTemplates.length} 个模板</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>协议类型</TableHead>
                      <TableHead>状态</TableHead>
                      <TableHead>最后修改</TableHead>
                      <TableHead className="text-right">操作</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredTemplates.map((tpl) => (
                      <TableRow key={tpl.templateId}>
                        <TableCell className="font-medium">{tpl.contractType}</TableCell>
                        <TableCell>
                          <span
                            className={`text-xs px-2 py-1 rounded ${
                              tpl.status === TemplateStatus.ACTIVE
                                ? 'bg-green-100 text-green-700'
                                : tpl.status === TemplateStatus.DRAFT
                                ? 'bg-yellow-100 text-yellow-700'
                                : 'bg-slate-100 text-slate-600'
                            }`}
                          >
                            {templateStatusLabels[tpl.status]}
                          </span>
                        </TableCell>
                        <TableCell className="text-sm text-slate-600">
                          <div>{tpl.updatedAt || tpl.createdAt}</div>
                          <div className="text-xs text-slate-400">{tpl.updatedBy || tpl.createdBy}</div>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="outline" size="sm" onClick={() => openPreview(tpl)}>
                              预览
                            </Button>
                            <Button variant="outline" size="sm" onClick={() => openEdit(tpl)}>
                              编辑
                            </Button>
                            {tpl.status !== TemplateStatus.ACTIVE && (
                              <Button variant="outline" size="sm" className="text-green-600">
                                启用
                              </Button>
                            )}
                            {tpl.status === TemplateStatus.ACTIVE && (
                              <Button variant="outline" size="sm" className="text-orange-600">
                                停用
                              </Button>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* 预览弹窗 */}
        {showPreviewDialog && currentTemplate && (
          <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
            <Card className="w-full max-w-4xl max-h-[90vh] flex flex-col">
              <CardHeader className="border-b">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>{currentTemplate.title}</CardTitle>
                    <CardDescription>{currentTemplate.contractType} {currentTemplate.version}</CardDescription>
                  </div>
                  <Button variant="outline" size="sm" onClick={() => setShowPreviewDialog(false)}>✕</Button>
                </div>
              </CardHeader>
              <CardContent className="flex-1 overflow-y-auto pt-6">
                <pre className="whitespace-pre-wrap text-sm text-slate-700 leading-relaxed">
                  {currentTemplate.content}
                </pre>
              </CardContent>
              <div className="border-t p-4 flex justify-end">
                <Button variant="outline" onClick={() => setShowPreviewDialog(false)}>关闭</Button>
              </div>
            </Card>
          </div>
        )}

        {/* 编辑弹窗 */}
        {showEditDialog && currentTemplate && (
          <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
            <Card className="w-full max-w-5xl max-h-[90vh] flex flex-col">
              <CardHeader className="border-b">
                <div className="flex items-center justify-between">
                  <CardTitle>编辑协议模板</CardTitle>
                  <Button variant="outline" size="sm" onClick={() => setShowEditDialog(false)}>✕</Button>
                </div>
              </CardHeader>
              <CardContent className="flex-1 overflow-y-auto pt-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>协议类型</Label>
                    <Input defaultValue={currentTemplate.contractType} />
                  </div>
                  <div>
                    <Label>版本号</Label>
                    <Input defaultValue={currentTemplate.version} placeholder="例如：V2.1" />
                  </div>
                  <div className="col-span-2">
                    <Label>协议标题</Label>
                    <Input defaultValue={currentTemplate.title} />
                  </div>
                  <div className="col-span-2">
                    <Label>协议内容</Label>
                    <textarea
                      defaultValue={currentTemplate.content}
                      className="w-full mt-1 px-3 py-2 border rounded-md font-mono text-sm"
                      rows={15}
                    />
                  </div>
                </div>
              </CardContent>
              <div className="border-t p-4 flex justify-end gap-2">
                <Button variant="outline" onClick={() => setShowEditDialog(false)}>取消</Button>
                <Button onClick={() => { alert('保存成功'); setShowEditDialog(false); }}>保存</Button>
              </div>
            </Card>
          </div>
        )}

        {/* 右侧：业务逻辑说明 (40%) */}
        <div className="w-[40%] h-full border-l">
          <BusinessLogicPanel
            sections={[
              {
                title: '📱 用户端体验',
                content: (
                  <div className="text-sm text-slate-700">协议模板用于商家签约时使用</div>
                )
              }
            ]}
          />
        </div>
      </div>
    </MainLayout>
  )
}
