import { useState } from 'react'
import { Form, Link, useNavigate } from '@remix-run/react'
import type { UserReviewListResponse } from './types/userReviews.types'
import { Card, CardContent } from '~/components/ui/card'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '~/components/ui/table'
import { Search, FileText, ChevronLeft, ChevronRight } from 'lucide-react'
import Sidebar, { menuConfig } from '~/pages/PointsSystem/components/Sidebar'

interface UserReviewsPageProps {
  result: UserReviewListResponse | null
  error: string | null
}

export default function UserReviewsPage({ result, error }: UserReviewsPageProps) {
  const navigate = useNavigate()
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')

  const reviews = result?.reviews || []
  const currentPage = result?.page || 1
  const totalPages = result?.totalPages || 1
  const total = result?.total || 0

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(window.location.search)
    params.set('page', String(page))
    navigate(`?${params.toString()}`)
  }

  if (error) {
    return (
      <div className="flex h-screen">
        <Sidebar menuItems={menuConfig} />
        <div className="flex-1 p-6">
          <div className="text-destructive">错误: {error}</div>
        </div>
      </div>
    )
  }

  const mainContent = (
    <div className="p-6 space-y-6">
      {/* 筛选表单 */}
      <Card>
        <CardContent className="pt-6">
          <Form method="get" className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              {/* 留言日期 */}
              <div className="space-y-2 col-span-2">
                <label className="text-sm text-muted-foreground">留言日期</label>
                <div className="flex gap-2 items-center">
                  <Input
                    type="date"
                    name="startDate"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    placeholder="开始日期"
                  />
                  <span>-</span>
                  <Input
                    type="date"
                    name="endDate"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    placeholder="结束日期"
                  />
                </div>
              </div>
            </div>

            <div className="flex gap-2">
              <Button type="submit">
                <Search className="h-4 w-4 mr-2" />
                搜索
              </Button>
              <Button type="button" variant="outline" onClick={() => window.location.href = '/hotel-backend/user-reviews'}>
                重置
              </Button>
            </div>
          </Form>
        </CardContent>
      </Card>

      {/* 点赞列表 */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>留言时间</TableHead>
                <TableHead>入住人</TableHead>
                <TableHead>入住人电话</TableHead>
                <TableHead>预定房型</TableHead>
                <TableHead className="text-right">操作</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {reviews.map((review) => (
                <TableRow key={review.id}>
                  <TableCell className="text-sm">{review.reviewTime}</TableCell>
                  <TableCell>{review.guestName}</TableCell>
                  <TableCell>{review.guestPhone}</TableCell>
                  <TableCell>{review.roomType}</TableCell>
                  <TableCell className="text-right">
                    <Link to={`/hotel-backend/user-reviews/${review.id}`}>
                      <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700">
                        <FileText className="h-4 w-4 mr-1" />
                        详情
                      </Button>
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {reviews.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
              暂无用户点赞数据
            </div>
          )}

          {/* 分页 */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between px-6 py-4 border-t">
              <div className="text-sm text-muted-foreground">
                共 {total} 条，10条/页
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  const page = i + 1
                  return (
                    <Button
                      key={page}
                      variant={page === currentPage ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => handlePageChange(page)}
                    >
                      {page}
                    </Button>
                  )
                })}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
                <div className="flex items-center gap-2 ml-4">
                  <span className="text-sm text-muted-foreground">前往</span>
                  <Input
                    type="number"
                    min={1}
                    max={totalPages}
                    defaultValue={currentPage}
                    className="w-16 h-8 text-center"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        const value = parseInt(e.currentTarget.value)
                        if (value >= 1 && value <= totalPages) {
                          handlePageChange(value)
                        }
                      }
                    }}
                  />
                  <span className="text-sm text-muted-foreground">页</span>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar menuItems={menuConfig} />
      <div className="flex-1 overflow-y-auto">
        {mainContent}
      </div>
    </div>
  )
}
