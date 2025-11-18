/**
 * 首页Banner管理区块组件
 */

import { useState } from 'react'
import { Form } from '@remix-run/react'
import type { HomeBanner } from '../types/ads.types'
import { BannerType } from '../types/ads.types'
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { Label } from '~/components/ui/label'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '~/components/ui/table'

interface HomeBannerSectionProps {
  banners: HomeBanner[]
}

const bannerTypeLabels = {
  [BannerType.NEW_USER_DISCOUNT]: '新人优惠',
  [BannerType.ACTIVITY_PROMOTION]: '活动推广',
  [BannerType.MEMBER_RECRUITMENT]: '会员招募',
}

export default function HomeBannerSection({ banners }: HomeBannerSectionProps) {
  const [showDialog, setShowDialog] = useState(false)
  const [editingBanner, setEditingBanner] = useState<HomeBanner | null>(null)

  const handleCreate = () => {
    setEditingBanner(null)
    setShowDialog(true)
  }

  const handleEdit = (banner: HomeBanner) => {
    setEditingBanner(banner)
    setShowDialog(true)
  }

  const handleCloseDialog = () => {
    setShowDialog(false)
    setEditingBanner(null)
  }

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>首页Banner配置</CardTitle>
              <p className="text-sm text-slate-500 mt-1">配置首页顶部Banner，展示优惠活动和会员权益</p>
            </div>
            <Button onClick={handleCreate}>+ 新增Banner</Button>
          </div>
        </CardHeader>
        <CardContent>
          {banners.length === 0 ? (
            <div className="text-center py-12 text-slate-500">
              暂无Banner配置，点击"新增Banner"开始配置
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">排序</TableHead>
                  <TableHead>类型</TableHead>
                  <TableHead>显示文案</TableHead>
                  <TableHead>折扣力度</TableHead>
                  <TableHead>按钮文案</TableHead>
                  <TableHead>有效期</TableHead>
                  <TableHead>状态</TableHead>
                  <TableHead className="text-right">操作</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {banners.map((banner) => (
                  <TableRow key={banner.id}>
                    <TableCell className="text-center text-slate-500">{banner.order}</TableCell>
                    <TableCell>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        banner.type === BannerType.NEW_USER_DISCOUNT
                          ? 'bg-green-100 text-green-800'
                          : banner.type === BannerType.ACTIVITY_PROMOTION
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-purple-100 text-purple-800'
                      }`}>
                        {bannerTypeLabels[banner.type]}
                      </span>
                    </TableCell>
                    <TableCell className="font-medium">{banner.displayText}</TableCell>
                    <TableCell className="text-sm text-red-600 font-medium">{banner.discountRate}折</TableCell>
                    <TableCell className="text-sm text-slate-600">{banner.buttonText}</TableCell>
                    <TableCell className="text-sm text-slate-600 whitespace-nowrap">
                      {banner.validDateStart} 至 {banner.validDateEnd}
                    </TableCell>
                    <TableCell>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={banner.enabled}
                          className="sr-only peer"
                          onChange={() => alert(`切换Banner状态：${banner.displayText}`)}
                        />
                        <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
                      </label>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" size="sm" onClick={() => handleEdit(banner)}>
                          编辑
                        </Button>
                        <Form method="post" className="inline">
                          <input type="hidden" name="_action" value="deleteBanner" />
                          <input type="hidden" name="bannerId" value={banner.id} />
                          <Button
                            type="submit"
                            variant="outline"
                            size="sm"
                            className="text-red-600"
                            onClick={(e) => {
                              if (!confirm(`确定删除Banner"${banner.displayText}"吗？`)) {
                                e.preventDefault()
                              }
                            }}
                          >
                            删除
                          </Button>
                        </Form>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* 新增/编辑Banner弹窗 */}
      {showDialog && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
          <Card className="w-full max-w-2xl">
            <CardHeader className="border-b">
              <div className="flex items-center justify-between">
                <CardTitle>{editingBanner ? '编辑Banner' : '新增Banner'}</CardTitle>
                <Button variant="outline" size="sm" onClick={handleCloseDialog}>✕</Button>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <Form method="post" className="space-y-4" onSubmit={handleCloseDialog}>
                <input type="hidden" name="_action" value={editingBanner ? 'updateBanner' : 'createBanner'} />
                {editingBanner && <input type="hidden" name="bannerId" value={editingBanner.id} />}

                {/* Banner类型 */}
                <div className="space-y-2">
                  <Label htmlFor="type">
                    Banner类型 <span className="text-red-500">*</span>
                  </Label>
                  <select
                    id="type"
                    name="type"
                    defaultValue={editingBanner?.type || BannerType.NEW_USER_DISCOUNT}
                    className="w-full px-3 py-2 border rounded-md text-sm"
                    required
                  >
                    <option value={BannerType.NEW_USER_DISCOUNT}>新人优惠</option>
                    <option value={BannerType.ACTIVITY_PROMOTION}>活动推广</option>
                    <option value={BannerType.MEMBER_RECRUITMENT}>会员招募</option>
                  </select>
                </div>

                {/* 显示文案 */}
                <div className="space-y-2">
                  <Label htmlFor="displayText">
                    显示文案 <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="displayText"
                    name="displayText"
                    defaultValue={editingBanner?.displayText}
                    placeholder="如：新人优惠，首次预订享85折"
                    required
                  />
                </div>

                {/* 折扣力度 */}
                <div className="space-y-2">
                  <Label htmlFor="discountRate">
                    折扣力度 <span className="text-red-500">*</span>
                  </Label>
                  <div className="flex items-center gap-2">
                    <Input
                      id="discountRate"
                      name="discountRate"
                      type="number"
                      defaultValue={editingBanner?.discountRate || 85}
                      min="50"
                      max="100"
                      step="1"
                      className="w-24"
                      required
                    />
                    <span className="text-sm text-slate-600">折（如85表示85折）</span>
                  </div>
                </div>

                {/* 按钮文案 */}
                <div className="space-y-2">
                  <Label htmlFor="buttonText">
                    按钮文案 <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="buttonText"
                    name="buttonText"
                    defaultValue={editingBanner?.buttonText}
                    placeholder="如：立即领取"
                    required
                  />
                </div>

                {/* 有效期 */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="validDateStart">
                      有效期开始 <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="validDateStart"
                      name="validDateStart"
                      type="date"
                      defaultValue={editingBanner?.validDateStart}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="validDateEnd">
                      有效期结束 <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="validDateEnd"
                      name="validDateEnd"
                      type="date"
                      defaultValue={editingBanner?.validDateEnd}
                      required
                    />
                  </div>
                </div>

                {/* 启用状态 */}
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="enabled"
                    name="enabled"
                    value="true"
                    defaultChecked={editingBanner?.enabled ?? true}
                    className="w-4 h-4"
                  />
                  <Label htmlFor="enabled" className="cursor-pointer">启用该Banner</Label>
                </div>

                {/* 按钮 */}
                <div className="flex justify-end gap-2 pt-4 border-t">
                  <Button type="button" variant="outline" onClick={handleCloseDialog}>取消</Button>
                  <Button type="submit">保存</Button>
                </div>
              </Form>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  )
}
