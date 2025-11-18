import { useState } from 'react'
import { Form, useActionData, useNavigation } from '@remix-run/react'
import type { InvitationRecord } from '../MemberInvitation/types/invitation.types'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '~/components/ui/card'
import { Button } from '~/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '~/components/ui/table'
import { Input } from '~/components/ui/input'
import { Label } from '~/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '~/components/ui/select'
import { Badge } from '~/components/ui/badge'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '~/components/ui/dialog'
import { QrCode, Copy, Link as LinkIcon, Ban } from 'lucide-react'

interface MemberInvitationPageProps {
  records: InvitationRecord[]
  newInvitation?: InvitationRecord
  error: string | null
}

export default function MemberInvitationPage({ records, newInvitation, error }: MemberInvitationPageProps) {
  const [invitationType, setInvitationType] = useState<'targeted' | 'unlimited'>('targeted')
  const [showQRDialog, setShowQRDialog] = useState(false)
  const [qrInvitation, setQrInvitation] = useState<InvitationRecord | null>(null)
  const navigation = useNavigation()
  const actionData = useActionData<{ errors?: Record<string, string> }>()
  const isSubmitting = navigation.state === 'submitting'

  // 模拟酒店信息（实际应从用户session获取）
  const hotelInfo = {
    id: 'H001',
    name: '原乡芦茨',
  }

  const handleCopyLink = (link: string) => {
    navigator.clipboard.writeText(link)
    alert('链接已复制到剪贴板')
  }

  const handleShowQR = (invitation: InvitationRecord) => {
    setQrInvitation(invitation)
    setShowQRDialog(true)
  }

  const getStatusBadge = (status: InvitationRecord['status']) => {
    const variants: Record<InvitationRecord['status'], { variant: 'default' | 'secondary' | 'destructive' | 'outline'; label: string }> = {
      pending: { variant: 'outline', label: '待接受' },
      accepted: { variant: 'default', label: '已接受' },
      expired: { variant: 'secondary', label: '已过期' },
      cancelled: { variant: 'destructive', label: '已取消' },
    }
    const config = variants[status]
    return <Badge variant={config.variant}>{config.label}</Badge>
  }

  return (
    <div className="p-6 space-y-6">
      {error && (
        <div className="bg-destructive/10 border border-destructive text-destructive px-4 py-3 rounded">
          {error}
        </div>
      )}

      {/* 生成邀请链接区域 */}
      <Card>
        <CardHeader>
          <CardTitle>生成会员邀请链接</CardTitle>
          <CardDescription>为客户生成专属或通用的会员邀请链接</CardDescription>
        </CardHeader>
        <CardContent>
          <Form method="post" className="space-y-4">
            <input type="hidden" name="_action" value="generate" />
            <input type="hidden" name="hotelId" value={hotelInfo.id} />
            <input type="hidden" name="hotelName" value={hotelInfo.name} />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="invitationType">邀请类型</Label>
                <Select
                  name="invitationType"
                  value={invitationType}
                  onValueChange={(value) => setInvitationType(value as 'targeted' | 'unlimited')}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="targeted">定向邀请（指定客户）</SelectItem>
                    <SelectItem value="unlimited">无限制邀请（任何人可用）</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">
                  {invitationType === 'targeted'
                    ? '为特定客户生成专属邀请链接，需要输入客户信息'
                    : '生成可多次使用的通用邀请链接，任何人均可使用'}
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="targetMemberLevel">会员等级</Label>
                <Select name="targetMemberLevel" defaultValue="VIP1">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="VIP1">VIP1（基础会员）</SelectItem>
                    <SelectItem value="VIP2">VIP2（银卡会员）</SelectItem>
                    <SelectItem value="VIP3">VIP3（金卡会员）</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {invitationType === 'targeted' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-muted rounded-lg">
                <div className="space-y-2">
                  <Label htmlFor="targetCustomerName">客户姓名 *</Label>
                  <Input
                    id="targetCustomerName"
                    name="targetCustomerName"
                    placeholder="请输入客户姓名"
                    required={invitationType === 'targeted'}
                    className={actionData?.errors?.targetCustomerName ? 'border-destructive' : ''}
                  />
                  {actionData?.errors?.targetCustomerName && (
                    <p className="text-sm text-destructive">{actionData.errors.targetCustomerName}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="targetCustomerPhone">客户手机号 *</Label>
                  <Input
                    id="targetCustomerPhone"
                    name="targetCustomerPhone"
                    placeholder="请输入客户手机号"
                    required={invitationType === 'targeted'}
                    className={actionData?.errors?.targetCustomerPhone ? 'border-destructive' : ''}
                  />
                  {actionData?.errors?.targetCustomerPhone && (
                    <p className="text-sm text-destructive">{actionData.errors.targetCustomerPhone}</p>
                  )}
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="validityHours">有效时长（小时）</Label>
                <Select name="validityHours" defaultValue="72">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="24">24小时（1天）</SelectItem>
                    <SelectItem value="48">48小时（2天）</SelectItem>
                    <SelectItem value="72">72小时（3天）</SelectItem>
                    <SelectItem value="168">168小时（7天）</SelectItem>
                    <SelectItem value="720">720小时（30天）</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Button type="submit" disabled={isSubmitting} className="w-full md:w-auto">
              {isSubmitting ? '生成中...' : '生成邀请链接'}
            </Button>
          </Form>

          {/* 显示新生成的邀请链接 */}
          {newInvitation && (
            <div className="mt-6 p-4 border rounded-lg bg-green-50 dark:bg-green-950/20 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-green-700 dark:text-green-400">邀请链接生成成功！</h3>
                <Badge variant="outline">{newInvitation.invitationCode}</Badge>
              </div>

              <div className="space-y-2">
                <Label>邀请链接</Label>
                <div className="flex gap-2">
                  <Input value={newInvitation.invitationLink} readOnly className="font-mono text-sm" />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => handleCopyLink(newInvitation.invitationLink)}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => handleShowQR(newInvitation)}
                  >
                    <QrCode className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">邀请类型：</span>
                  <span className="font-medium">
                    {newInvitation.invitationType === 'targeted' ? '定向邀请' : '无限制邀请'}
                  </span>
                </div>
                <div>
                  <span className="text-muted-foreground">会员等级：</span>
                  <span className="font-medium">{newInvitation.targetMemberLevel}</span>
                </div>
                {newInvitation.targetCustomerName && (
                  <>
                    <div>
                      <span className="text-muted-foreground">客户姓名：</span>
                      <span className="font-medium">{newInvitation.targetCustomerName}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">客户手机：</span>
                      <span className="font-medium">{newInvitation.targetCustomerPhone}</span>
                    </div>
                  </>
                )}
                <div>
                  <span className="text-muted-foreground">有效期至：</span>
                  <span className="font-medium">{newInvitation.validUntil}</span>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* 我的邀请记录 */}
      <Card>
        <CardHeader>
          <CardTitle>我的邀请记录</CardTitle>
          <CardDescription>查看本酒店发出的所有会员邀请</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>邀请ID</TableHead>
                <TableHead>邀请类型</TableHead>
                <TableHead>会员等级</TableHead>
                <TableHead>客户信息</TableHead>
                <TableHead>邀请码</TableHead>
                <TableHead>状态</TableHead>
                <TableHead>创建时间</TableHead>
                <TableHead>有效期至</TableHead>
                <TableHead>操作</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {records.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={9} className="text-center text-muted-foreground">
                    暂无邀请记录
                  </TableCell>
                </TableRow>
              ) : (
                records.map((record) => (
                  <TableRow key={record.id}>
                    <TableCell className="font-mono text-xs">{record.id}</TableCell>
                    <TableCell>
                      <Badge variant={record.invitationType === 'targeted' ? 'default' : 'secondary'}>
                        {record.invitationType === 'targeted' ? '定向' : '无限制'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{record.targetMemberLevel}</Badge>
                    </TableCell>
                    <TableCell>
                      {record.targetCustomerName ? (
                        <div className="text-sm">
                          <div>{record.targetCustomerName}</div>
                          <div className="text-muted-foreground">{record.targetCustomerPhone}</div>
                        </div>
                      ) : (
                        <span className="text-muted-foreground">-</span>
                      )}
                    </TableCell>
                    <TableCell className="font-mono text-xs">{record.invitationCode}</TableCell>
                    <TableCell>{getStatusBadge(record.status)}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">{record.createdAt}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">{record.validUntil}</TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleCopyLink(record.invitationLink)}
                          title="复制链接"
                        >
                          <LinkIcon className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleShowQR(record)}
                          title="显示二维码"
                        >
                          <QrCode className="h-4 w-4" />
                        </Button>
                        {record.status === 'pending' && (
                          <Form method="post" className="inline">
                            <input type="hidden" name="_action" value="cancel" />
                            <input type="hidden" name="invitationId" value={record.id} />
                            <Button
                              variant="ghost"
                              size="icon"
                              type="submit"
                              disabled={isSubmitting}
                              title="取消邀请"
                            >
                              <Ban className="h-4 w-4" />
                            </Button>
                          </Form>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* 二维码对话框 */}
      <Dialog open={showQRDialog} onOpenChange={setShowQRDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>邀请二维码</DialogTitle>
          </DialogHeader>
          {qrInvitation && (
            <div className="space-y-4">
              <div className="flex justify-center p-6 bg-white rounded-lg">
                <div className="text-center space-y-2">
                  <div className="w-64 h-64 border-2 border-dashed border-gray-300 flex items-center justify-center">
                    <div className="text-muted-foreground">
                      <QrCode className="h-16 w-16 mx-auto mb-2" />
                      <p className="text-sm">二维码预览</p>
                      <p className="text-xs">{qrInvitation.invitationCode}</p>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    扫描二维码或访问链接接受邀请
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <Label>邀请链接</Label>
                <div className="flex gap-2">
                  <Input value={qrInvitation.invitationLink} readOnly className="font-mono text-xs" />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => handleCopyLink(qrInvitation.invitationLink)}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <Label className="text-muted-foreground">邀请类型</Label>
                  <div>{qrInvitation.invitationType === 'targeted' ? '定向邀请' : '无限制邀请'}</div>
                </div>
                <div>
                  <Label className="text-muted-foreground">会员等级</Label>
                  <div>{qrInvitation.targetMemberLevel}</div>
                </div>
                {qrInvitation.targetCustomerName && (
                  <>
                    <div>
                      <Label className="text-muted-foreground">客户姓名</Label>
                      <div>{qrInvitation.targetCustomerName}</div>
                    </div>
                    <div>
                      <Label className="text-muted-foreground">客户手机</Label>
                      <div>{qrInvitation.targetCustomerPhone}</div>
                    </div>
                  </>
                )}
                <div>
                  <Label className="text-muted-foreground">有效期至</Label>
                  <div>{qrInvitation.validUntil}</div>
                </div>
                <div>
                  <Label className="text-muted-foreground">状态</Label>
                  <div>{getStatusBadge(qrInvitation.status)}</div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
