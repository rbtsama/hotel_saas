import { Link } from '@remix-run/react'
import type { UserReviewDetail } from './types/userReviews.types'
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card'
import { Button } from '~/components/ui/button'
import { Textarea } from '~/components/ui/textarea'
import { Star, ArrowLeft } from 'lucide-react'
import { useViewMode } from '~/contexts/ViewModeContext'
import Sidebar, { menuConfig } from '~/pages/PointsSystem/components/Sidebar'

interface UserReviewDetailPageProps {
  review: UserReviewDetail | null
  error: string | null
}

export default function UserReviewDetailPage({ review, error }: UserReviewDetailPageProps) {
  const { isLearningMode } = useViewMode()

  if (error || !review) {
    return (
      <div className="flex h-screen">
        <Sidebar menuItems={menuConfig} />
        <div className="flex-1 p-6">
          <div className="text-destructive">错误: {error || '未找到评价'}</div>
        </div>
      </div>
    )
  }

  // 计算平均评分
  const averageRating = (
    (review.ratings.cleanliness +
      review.ratings.service +
      review.ratings.facilities +
      review.ratings.valueForMoney +
      review.ratings.location) / 5
  ).toFixed(1)

  // 渲染星级
  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-4 w-4 ${
              star <= rating
                ? 'fill-yellow-400 text-yellow-400'
                : 'text-gray-300'
            }`}
          />
        ))}
      </div>
    )
  }

  const mainContent = (
    <div className="p-6 space-y-6">
      {/* 返回按钮 */}
      <div>
        <Link to="/hotel-backend/user-reviews">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            返回列表
          </Button>
        </Link>
      </div>

      {/* 评价概览 */}
      <Card>
        <CardHeader>
          <CardTitle>评价详情</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* 基本信息 */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="text-sm text-muted-foreground">订单号</div>
              <div className="font-medium">{review.orderNumber}</div>
            </div>
            <div className="space-y-2">
              <div className="text-sm text-muted-foreground">留言时间</div>
              <div className="font-medium">{review.reviewTime}</div>
            </div>
            <div className="space-y-2">
              <div className="text-sm text-muted-foreground">入住人</div>
              <div className="font-medium">{review.guestName}</div>
            </div>
            <div className="space-y-2">
              <div className="text-sm text-muted-foreground">联系电话</div>
              <div className="font-medium">{review.guestPhone}</div>
            </div>
            <div className="space-y-2">
              <div className="text-sm text-muted-foreground">房型</div>
              <div className="font-medium">{review.roomType}</div>
            </div>
            <div className="space-y-2">
              <div className="text-sm text-muted-foreground">入住日期</div>
              <div className="font-medium">
                {review.checkInDate} 至 {review.checkOutDate} ({review.nightCount}晚)
              </div>
            </div>
            <div className="space-y-2">
              <div className="text-sm text-muted-foreground">订单金额</div>
              <div className="font-medium text-orange-600">¥{review.totalAmount}</div>
            </div>
            <div className="space-y-2">
              <div className="text-sm text-muted-foreground">综合评分</div>
              <div className="flex items-center gap-2">
                <div className="text-2xl font-bold text-orange-600">{averageRating}</div>
                <div className="text-sm text-muted-foreground">/ 5.0</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 评分详情 */}
      <Card>
        <CardHeader>
          <CardTitle>评分详情</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4 flex-1">
                <div className="w-24 text-sm text-muted-foreground">卫生整洁度</div>
                {renderStars(review.ratings.cleanliness)}
              </div>
              <div className="text-sm font-medium w-12 text-right">{review.ratings.cleanliness}.0</div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4 flex-1">
                <div className="w-24 text-sm text-muted-foreground">服务态度</div>
                {renderStars(review.ratings.service)}
              </div>
              <div className="text-sm font-medium w-12 text-right">{review.ratings.service}.0</div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4 flex-1">
                <div className="w-24 text-sm text-muted-foreground">设施设备</div>
                {renderStars(review.ratings.facilities)}
              </div>
              <div className="text-sm font-medium w-12 text-right">{review.ratings.facilities}.0</div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4 flex-1">
                <div className="w-24 text-sm text-muted-foreground">性价比</div>
                {renderStars(review.ratings.valueForMoney)}
              </div>
              <div className="text-sm font-medium w-12 text-right">{review.ratings.valueForMoney}.0</div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4 flex-1">
                <div className="w-24 text-sm text-muted-foreground">位置交通</div>
                {renderStars(review.ratings.location)}
              </div>
              <div className="text-sm font-medium w-12 text-right">{review.ratings.location}.0</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 评价内容 */}
      <Card>
        <CardHeader>
          <CardTitle>评价内容</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="p-4 bg-muted/30 rounded-lg">
            <p className="text-sm leading-relaxed whitespace-pre-wrap">{review.reviewContent}</p>
          </div>
        </CardContent>
      </Card>

      {/* 酒店回复 */}
      {review.hotelReply ? (
        <Card>
          <CardHeader>
            <CardTitle>酒店回复</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-blue-50 dark:bg-blue-950/30 rounded-lg">
              <p className="text-sm leading-relaxed whitespace-pre-wrap">{review.hotelReply}</p>
            </div>
            {review.replyTime && (
              <div className="text-xs text-muted-foreground text-right">
                回复时间: {review.replyTime}
              </div>
            )}
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>回复评价</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              placeholder="请输入您的回复内容..."
              className="min-h-[120px]"
            />
            <div className="flex justify-end">
              <Button>提交回复</Button>
            </div>
          </CardContent>
        </Card>
      )}
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
