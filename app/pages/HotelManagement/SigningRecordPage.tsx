/**
 * 签约记录页面
 * 查询所有历史签约记录
 */

import { useState } from 'react'
import type { SigningRecord } from './types/contract.types'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '~/components/ui/card'
import { Input } from '~/components/ui/input'
import { Label } from '~/components/ui/label'
import { Button } from '~/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '~/components/ui/table'
import MainLayout from '../PointsSystem/components/MainLayout'
import OperationLogButton from '../PointsSystem/components/OperationLogButton'

interface SigningRecordPageProps {
  records: SigningRecord[]
  error?: string | null
}

export default function SigningRecordPage({ records, error }: SigningRecordPageProps) {
  const [dateStart, setDateStart] = useState('')
  const [dateEnd, setDateEnd] = useState('')
  const [searchKeyword, setSearchKeyword] = useState('')
  const [showDetailDialog, setShowDetailDialog] = useState(false)
  const [currentRecord, setCurrentRecord] = useState<SigningRecord | null>(null)

  const filteredRecords = records.filter(record => {
    if (dateStart && record.signedAt < dateStart) return false
    if (dateEnd && record.signedAt > dateEnd) return false
    if (searchKeyword && !record.hotelName.includes(searchKeyword)) return false
    return true
  })

  const openDetail = (record: SigningRecord) => {
    setCurrentRecord(record)
    setShowDetailDialog(true)
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
      <div className="p-6 space-y-6">
            {/* 页面标题 */}
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold">签约记录</h1>
                <p className="text-sm text-slate-500 mt-1">查看所有历史签约记录</p>
              </div>
              <OperationLogButton moduleName="签约记录" />
            </div>

            {/* 筛选栏 */}
            <Card>
              <CardContent className="pt-6">
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label>签约时间（开始）</Label>
                    <Input
                      type="date"
                      value={dateStart}
                      onChange={(e) => setDateStart(e.target.value)}
                    />
                  </div>
                  <div>
                    <Label>签约时间（结束）</Label>
                    <Input
                      type="date"
                      value={dateEnd}
                      onChange={(e) => setDateEnd(e.target.value)}
                    />
                  </div>
                  <div>
                    <Label>酒店名称</Label>
                    <Input
                      placeholder="搜索酒店名称..."
                      value={searchKeyword}
                      onChange={(e) => setSearchKeyword(e.target.value)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 签约记录列表 */}
            <Card>
              <CardHeader>
                <CardTitle>签约记录</CardTitle>
                <CardDescription>共 {filteredRecords.length} 条签约记录</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>签约时间</TableHead>
                      <TableHead>酒店名称</TableHead>
                      <TableHead>签约人</TableHead>
                      <TableHead>签约账号</TableHead>
                      <TableHead>协议版本</TableHead>
                      <TableHead>操作人</TableHead>
                      <TableHead className="text-right">操作</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredRecords.map((record) => (
                      <TableRow key={record.recordId}>
                        <TableCell className="text-sm text-slate-900">{record.signedAt}</TableCell>
                        <TableCell className="font-medium">{record.hotelName}</TableCell>
                        <TableCell className="text-sm">{record.signerName}</TableCell>
                        <TableCell className="font-mono text-sm">{record.signerPhone}</TableCell>
                        <TableCell className="font-mono text-sm">{record.version}</TableCell>
                        <TableCell className="text-sm text-slate-900">{record.operatorName}</TableCell>
                        <TableCell className="text-right">
                          <Button variant="outline" size="sm" onClick={() => openDetail(record)}>
                            查看详情
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>

        {/* 签约详情弹窗 */}
        {showDetailDialog && currentRecord && (
          <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
            <Card className="w-full max-w-4xl max-h-[90vh] flex flex-col">
              <CardHeader className="border-b">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>签约详情 - {currentRecord.hotelName}</CardTitle>
                    <CardDescription>{currentRecord.contractType} {currentRecord.version}</CardDescription>
                  </div>
                  <Button variant="outline" size="sm" onClick={() => setShowDetailDialog(false)}>✕</Button>
                </div>
              </CardHeader>
              <CardContent className="pt-6 space-y-4">
                <div className="grid grid-cols-3 gap-4 bg-slate-50 p-4 rounded-lg text-sm">
                  <div>
                    <Label className="text-xs text-slate-500">签约人</Label>
                    <p className="font-medium">{currentRecord.signerName}</p>
                  </div>
                  <div>
                    <Label className="text-xs text-slate-500">签约账号</Label>
                    <p className="font-mono">{currentRecord.signerPhone}</p>
                  </div>
                  <div>
                    <Label className="text-xs text-slate-500">签约时间</Label>
                    <p>{currentRecord.signedAt}</p>
                  </div>
                  <div>
                    <Label className="text-xs text-slate-500">协议版本</Label>
                    <p className="font-mono">{currentRecord.version}</p>
                  </div>
                  <div>
                    <Label className="text-xs text-slate-500">操作人（平台）</Label>
                    <p>{currentRecord.operatorName}</p>
                  </div>
                  <div>
                    <Label className="text-xs text-slate-500">签约IP</Label>
                    <p className="font-mono text-xs">{currentRecord.signerIp || '-'}</p>
                  </div>
                </div>

                <div>
                  <Label className="font-semibold">协议内容快照</Label>
                  <div className="mt-2 bg-white border rounded-lg p-6 max-h-96 overflow-y-auto">
                    <pre className="whitespace-pre-wrap text-sm text-slate-700 leading-relaxed">
                      {currentRecord.contractSnapshot}
                    </pre>
                  </div>
                  <p className="text-xs text-slate-500 mt-2">
                    💡 协议内容快照：记录签约时的协议内容，即使模板后续修改，签约记录也不变
                  </p>
                </div>
              </CardContent>
              <div className="border-t p-4 flex justify-end">
                <Button variant="outline" onClick={() => setShowDetailDialog(false)}>关闭</Button>
              </div>
            </Card>
          </div>
        )}
    </MainLayout>
  )
}
