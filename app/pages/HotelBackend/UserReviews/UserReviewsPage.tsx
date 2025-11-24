import { useState } from 'react'
import { Form, Link, useNavigate } from '@remix-run/react'
import type { UserReviewListResponse } from './types/userReviews.types'
import { Card, CardContent } from '~/components/ui/card'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '~/components/ui/table'
import { Search, FileText, ChevronLeft, ChevronRight } from 'lucide-react'
import { useViewMode } from '~/contexts/ViewModeContext'
import Sidebar, { menuConfig } from '~/pages/PointsSystem/components/Sidebar'
import LogicPanel, { LogicTable, LogicList, LogicHighlight } from '~/pages/PointsSystem/components/LogicPanel'

interface UserReviewsPageProps {
  result: UserReviewListResponse | null
  error: string | null
}

export default function UserReviewsPage({ result, error }: UserReviewsPageProps) {
  const navigate = useNavigate()
  const { isLearningMode } = useViewMode()
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

  // LogicPanel 配置
  const logicSections = [
    {
      title: '业务场景',
      content: (
        <div className="space-y-4">
          <p>用户点赞（用户评价）是酒店获取客户反馈的重要渠道，对酒店经营具有重要价值：</p>
          <LogicList items={[
            <><strong>口碑营销：</strong>积极的用户评价可以吸引更多新客户预订</>,
            <><strong>服务改进：</strong>通过评价发现服务中的问题，及时调整和优化</>,
            <><strong>信任建立：</strong>真实的用户反馈增强潜在客户的预订信心</>,
            <><strong>竞争优势：</strong>高质量的评价和评分提升酒店在平台上的排名</>
          ]} />
        </div>
      )
    },
    {
      title: '点赞/评价系统',
      content: (
        <div className="space-y-4">
          <h4 className="font-semibold">如何收集用户反馈</h4>
          <LogicList items={[
            <><strong>评价触发时机：</strong>用户入住后自动发送评价邀请（通常在退房后1-3天）</>,
            <><strong>评价内容：</strong>包含评分（星级）和文字评价，可以上传图片</>,
            <><strong>评价维度：</strong>
              <ul className="ml-6 mt-2 space-y-1">
                <li>• 卫生整洁度</li>
                <li>• 服务态度</li>
                <li>• 设施设备</li>
                <li>• 性价比</li>
                <li>• 位置交通</li>
              </ul>
            </>,
            <><strong>激励机制：</strong>完成评价可获得积分奖励，鼓励用户留下真实反馈</>
          ]} />
          <LogicHighlight type="info">
            <strong>提示：</strong>及时回复用户评价（尤其是负面评价）非常重要，体现酒店对客户意见的重视。
          </LogicHighlight>
        </div>
      )
    },
    {
      title: '操作说明',
      content: (
        <div className="space-y-4">
          <LogicList items={[
            <><strong>查看详情：</strong>点击"详情"按钮查看完整的评价内容和客户信息</>,
            <><strong>回复评价：</strong>在详情页面可以对用户评价进行回复</>,
            <><strong>筛选评价：</strong>可以按留言日期筛选评价记录</>,
            <><strong>处理差评：</strong>对于差评要及时沟通处理，必要时可以申请隐藏不当评价</>
          ]} />
        </div>
      )
    },
    {
      title: '字段说明',
      content: (
        <LogicTable
          headers={['字段', '说明', '示例']}
          rows={[
            ['留言时间', '用户提交评价的时间', '01/15/25 14:30:00'],
            ['入住人', '预订并入住的客人姓名', '张三'],
            ['入住人电话', '客人的联系电话', '13812345678'],
            ['预定房型', '客人预订的房型名称', '豪华大床房'],
            ['评价内容', '用户的文字评价（在详情页查看）', '酒店位置很好...'],
            ['评分', '各维度的星级评分（在详情页查看）', '卫生 5星，服务 4星']
          ]}
        />
      )
    }
  ]

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
      <div className={`flex-1 overflow-y-auto ${isLearningMode ? '' : ''}`}>
        {mainContent}
      </div>
      {isLearningMode && (
        <div className="w-[480px] border-l border-border overflow-hidden">
          <LogicPanel title="用户点赞" sections={logicSections} />
        </div>
      )}
    </div>
  )
}
