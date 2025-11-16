/**
 * 协议配置页面 - 在线Markdown编辑器
 */

import { useState } from 'react'
import type { Agreement } from './types/settings.types'
import { AgreementType } from './types/settings.types'
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { Label } from '~/components/ui/label'
import MainLayout from '../PointsSystem/components/MainLayout'

interface AgreementConfigPageProps {
  agreements: Agreement[]
}

const agreementLabels: Record<AgreementType, string> = {
  [AgreementType.USER_AGREEMENT]: '用户服务协议',
  [AgreementType.PRIVACY_POLICY]: '隐私政策',
  [AgreementType.SERVICE_TERMS]: '服务条款',
  [AgreementType.REFUND_POLICY]: '退款政策',
  [AgreementType.MERCHANT_AGREEMENT]: '商家入驻协议',
}

export default function AgreementConfigPage({ agreements }: AgreementConfigPageProps) {
  const [selectedAgreement, setSelectedAgreement] = useState<Agreement | null>(
    agreements[0] || null
  )
  const [isEditing, setIsEditing] = useState(false)
  const [editContent, setEditContent] = useState('')
  const [editTitle, setEditTitle] = useState('')
  const [editVersion, setEditVersion] = useState('')

  const handleEdit = (agreement: Agreement) => {
    setSelectedAgreement(agreement)
    setEditContent(agreement.content)
    setEditTitle(agreement.title)
    setEditVersion(agreement.version)
    setIsEditing(true)
  }

  const handleCancel = () => {
    setIsEditing(false)
    if (selectedAgreement) {
      setEditContent(selectedAgreement.content)
      setEditTitle(selectedAgreement.title)
      setEditVersion(selectedAgreement.version)
    }
  }

  // 简单的Markdown渲染(仅支持基本格式)
  const renderMarkdown = (content: string) => {
    return content
      .split('\n')
      .map((line, index) => {
        // 标题
        if (line.startsWith('# ')) {
          return <h1 key={index} className="text-2xl font-bold mt-6 mb-4">{line.slice(2)}</h1>
        }
        if (line.startsWith('## ')) {
          return <h2 key={index} className="text-xl font-bold mt-5 mb-3">{line.slice(3)}</h2>
        }
        if (line.startsWith('### ')) {
          return <h3 key={index} className="text-lg font-semibold mt-4 mb-2">{line.slice(4)}</h3>
        }

        // 分隔线
        if (line.trim() === '---') {
          return <hr key={index} className="my-4 border-slate-300" />
        }

        // 列表
        if (line.trim().startsWith('- ')) {
          return (
            <li key={index} className="ml-6 list-disc">
              {parseInlineMarkdown(line.slice(2).trim())}
            </li>
          )
        }
        if (line.match(/^\d+\.\s/)) {
          return (
            <li key={index} className="ml-6 list-decimal">
              {parseInlineMarkdown(line.replace(/^\d+\.\s/, ''))}
            </li>
          )
        }

        // 空行
        if (line.trim() === '') {
          return <br key={index} />
        }

        // 普通段落
        return (
          <p key={index} className="mb-2 leading-relaxed">
            {parseInlineMarkdown(line)}
          </p>
        )
      })
  }

  // 解析行内格式(加粗)
  const parseInlineMarkdown = (text: string) => {
    const parts = text.split(/(\*\*.*?\*\*)/)
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={i}>{part.slice(2, -2)}</strong>
      }
      return part
    })
  }

  return (
    <MainLayout>
      <div className="h-screen overflow-y-auto bg-slate-50">
        <div className="p-6 space-y-6">
        {/* 页面标题 */}
        <div>
          <h1 className="text-2xl font-bold text-slate-900">协议配置</h1>
          <p className="text-sm text-slate-500 mt-1">
            使用Markdown格式编辑协议内容,支持标题、列表、加粗等基本排版
          </p>
        </div>

        {/* 协议选择 */}
        <Card>
          <CardHeader>
            <CardTitle>选择协议类型</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-3 flex-wrap">
              {agreements.map((agreement) => (
                <Button
                  key={agreement.id}
                  variant={selectedAgreement?.id === agreement.id ? 'default' : 'outline'}
                  onClick={() => {
                    setSelectedAgreement(agreement)
                    setEditContent(agreement.content)
                    setEditTitle(agreement.title)
                    setEditVersion(agreement.version)
                    setIsEditing(false)
                  }}
                >
                  {agreementLabels[agreement.type]}
                  <span className="ml-2 text-xs opacity-70">({agreement.version})</span>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* 编辑区域 */}
        {selectedAgreement && (
          <div className="grid grid-cols-2 gap-6">
            {/* 左侧: 编辑器 */}
            <Card className="h-[calc(100vh-280px)]">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Markdown编辑器</CardTitle>
                  {!isEditing ? (
                    <Button onClick={() => handleEdit(selectedAgreement)}>编辑</Button>
                  ) : (
                    <div className="flex gap-2">
                      <Button variant="outline" onClick={handleCancel}>
                        取消
                      </Button>
                      <Button>保存</Button>
                    </div>
                  )}
                </div>
              </CardHeader>
              <CardContent className="h-[calc(100%-80px)]">
                {isEditing ? (
                  <div className="space-y-4 h-full flex flex-col">
                    <div>
                      <Label>协议标题</Label>
                      <Input
                        value={editTitle}
                        onChange={(e) => setEditTitle(e.target.value)}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label>版本号</Label>
                      <Input
                        value={editVersion}
                        onChange={(e) => setEditVersion(e.target.value)}
                        className="mt-1"
                        placeholder="例如: v2.0"
                      />
                    </div>
                    <div className="flex-1 flex flex-col">
                      <Label>协议内容</Label>
                      <textarea
                        value={editContent}
                        onChange={(e) => setEditContent(e.target.value)}
                        className="flex-1 mt-1 p-3 border border-slate-300 rounded-md font-mono text-sm resize-none"
                        placeholder="使用Markdown格式编辑...&#10;&#10;# 一级标题&#10;## 二级标题&#10;### 三级标题&#10;&#10;**加粗文本**&#10;&#10;- 列表项1&#10;- 列表项2"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="text-sm text-slate-600 space-y-4">
                    <div className="flex items-center justify-between pb-3 border-b">
                      <div>
                        <div className="font-semibold text-slate-900">{selectedAgreement.title}</div>
                        <div className="text-xs text-slate-500 mt-1">
                          版本: {selectedAgreement.version} | 更新: {selectedAgreement.updatedAt} |
                          更新人: {selectedAgreement.updatedBy}
                        </div>
                      </div>
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${
                          selectedAgreement.isActive
                            ? 'bg-green-100 text-green-700'
                            : 'bg-slate-100 text-slate-600'
                        }`}
                      >
                        {selectedAgreement.isActive ? '已启用' : '已停用'}
                      </span>
                    </div>
                    <div className="bg-slate-100 p-3 rounded font-mono text-xs whitespace-pre-wrap max-h-[calc(100vh-450px)] overflow-y-auto">
                      {selectedAgreement.content}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* 右侧: 实时预览 */}
            <Card className="h-[calc(100vh-280px)]">
              <CardHeader>
                <CardTitle>预览效果</CardTitle>
              </CardHeader>
              <CardContent className="h-[calc(100%-80px)] overflow-y-auto">
                <div className="prose prose-sm max-w-none">
                  {renderMarkdown(isEditing ? editContent : selectedAgreement.content)}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Markdown语法提示 */}
        <Card>
          <CardHeader>
            <CardTitle>Markdown语法提示</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div>
                <div className="font-semibold text-slate-700 mb-2">标题</div>
                <code className="bg-slate-100 px-2 py-1 rounded text-xs block mb-1"># 一级标题</code>
                <code className="bg-slate-100 px-2 py-1 rounded text-xs block mb-1">## 二级标题</code>
                <code className="bg-slate-100 px-2 py-1 rounded text-xs block">### 三级标题</code>
              </div>
              <div>
                <div className="font-semibold text-slate-700 mb-2">格式</div>
                <code className="bg-slate-100 px-2 py-1 rounded text-xs block mb-1">**加粗文本**</code>
                <code className="bg-slate-100 px-2 py-1 rounded text-xs block">---  (分隔线)</code>
              </div>
              <div>
                <div className="font-semibold text-slate-700 mb-2">列表</div>
                <code className="bg-slate-100 px-2 py-1 rounded text-xs block mb-1">- 无序列表</code>
                <code className="bg-slate-100 px-2 py-1 rounded text-xs block">1. 有序列表</code>
              </div>
            </div>
          </CardContent>
        </Card>
        </div>
      </div>
    </MainLayout>
  )
}
