/**
 * 订单详情页面
 * 展示订单完整信息，包含基本信息、客人信息、房间信息、费用明细
 */

import { Link } from '@remix-run/react'
import type { Order } from './types/orderList.types'
import { ORDER_STATUS_LABELS, PAYMENT_STATUS_LABELS, CHECK_IN_STATUS_LABELS } from './types/orderList.types'
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card'
import { Button } from '~/components/ui/button'
import { ArrowLeft, Printer, Edit, XCircle } from 'lucide-react'
import { cn } from '~/lib/utils'
import MainLayout from '~/pages/PointsSystem/components/MainLayout'
import LogicPanel, { LogicTable, LogicList, LogicHighlight } from '~/pages/PointsSystem/components/LogicPanel'

interface OrderDetailPageProps {
  order: Order
  error: string | null
}

export default function OrderDetailPage({ order, error }: OrderDetailPageProps) {
  if (error) {
    return (
      <MainLayout>
        <div className="p-6">
          <div className="text-destructive">错误: {error}</div>
        </div>
      </MainLayout>
    )
  }

  // 计算间夜数
  const checkInDate = new Date(order.checkInDate)
  const checkOutDate = new Date(order.checkOutDate)
  const nights = Math.ceil((checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24))

  // 计算费用明细（示例）
  const roomPrice = order.totalAmount / nights
  const discount = 0 // 示例：无优惠
  const totalPrice = order.totalAmount

  return (
    <MainLayout>
      <div className="flex h-full">
        {/* 左侧：订单详情界面 (60%) */}
        <div className="w-[60%] h-full overflow-y-auto">
          <div className="p-6 space-y-6">
            {/* 页面头部 */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Link to="/hotel-backend/order-list">
                  <Button variant="ghost" size="sm">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    返回订单列表
                  </Button>
                </Link>
                <div>
                  <h1 className="text-3xl font-bold">订单详情</h1>
                  <p className="text-muted-foreground mt-1">查看订单完整信息</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Printer className="h-4 w-4 mr-2" />
                  打印订单
                </Button>
              </div>
            </div>

            {/* 订单基本信息 */}
            <Card>
              <CardHeader>
                <CardTitle>订单基本信息</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm text-muted-foreground">订单号</label>
                    <div className="font-mono text-lg font-medium">{order.orderNumber}</div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-muted-foreground">下单时间</label>
                    <div className="text-lg">{order.createdAt}</div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-muted-foreground">订单状态</label>
                    <div>
                      <span
                        className={cn(
                          "px-3 py-1 rounded text-sm font-medium",
                          order.checkInStatus === 'not-checked-in'
                            ? "bg-blue-100 text-blue-700"
                            : order.checkInStatus === 'checked-in'
                            ? "bg-green-100 text-green-700"
                            : "bg-gray-100 text-gray-700"
                        )}
                      >
                        {CHECK_IN_STATUS_LABELS[order.checkInStatus]}
                      </span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-muted-foreground">支付状态</label>
                    <div>
                      <span
                        className={cn(
                          "px-3 py-1 rounded text-sm font-medium",
                          order.paymentStatus === 'paid'
                            ? "bg-green-100 text-green-700"
                            : order.paymentStatus === 'unpaid'
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-red-100 text-red-700"
                        )}
                      >
                        {PAYMENT_STATUS_LABELS[order.paymentStatus]}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 客人信息 */}
            <Card>
              <CardHeader>
                <CardTitle>客人信息</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm text-muted-foreground">订房人姓名</label>
                    <div className="text-lg font-medium">{order.guestName}</div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-muted-foreground">联系电话</label>
                    <div className="text-lg">{order.guestPhone}</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 房间信息 */}
            <Card>
              <CardHeader>
                <CardTitle>房间信息</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm text-muted-foreground">房型</label>
                    <div className="text-lg font-medium">{order.roomType}</div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-muted-foreground">间夜数</label>
                    <div className="text-lg">{nights} 晚</div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-muted-foreground">入住日期</label>
                    <div className="text-lg">{order.checkInDate}</div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-muted-foreground">离店日期</label>
                    <div className="text-lg">{order.checkOutDate}</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 费用明细 */}
            <Card>
              <CardHeader>
                <CardTitle>费用明细</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center pb-2 border-b">
                    <span className="text-muted-foreground">房费（{nights} 晚 × ¥{roomPrice.toFixed(2)}）</span>
                    <span className="text-lg">¥{order.totalAmount.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b">
                    <span className="text-muted-foreground">优惠</span>
                    <span className="text-lg text-green-600">-¥{discount.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center pt-2">
                    <span className="text-xl font-bold">实付金额</span>
                    <span className="text-2xl font-bold text-primary">¥{totalPrice.toFixed(2)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 操作按钮 */}
            <div className="flex gap-4">
              {order.checkInStatus === 'not-checked-in' && (
                <>
                  <Button variant="outline" className="flex-1">
                    <Edit className="h-4 w-4 mr-2" />
                    修改订单
                  </Button>
                  <Button variant="destructive" className="flex-1">
                    <XCircle className="h-4 w-4 mr-2" />
                    取消订单
                  </Button>
                </>
              )}
              {order.checkInStatus === 'checked-in' && (
                <Button variant="default" className="flex-1">
                  办理退房
                </Button>
              )}
              {(order.checkInStatus === 'checked-out' || order.orderStatus === 'completed') && (
                <Button variant="outline" className="flex-1">
                  <Printer className="h-4 w-4 mr-2" />
                  打印凭证
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* 右侧：产品&业务逻辑说明 (40%) */}
        <div className="w-[40%] h-full border-l">
          <LogicPanel
            title="订单详情页"
            sections={[
              {
                title: '页面功能',
                content: (
                  <>
                    <p className="font-semibold mb-2">订单详情页的作用：</p>
                    <LogicList
                      items={[
                        <><strong>信息查看</strong>：一站式查看订单完整信息，无需多次跳转</>,
                        <><strong>快速操作</strong>：直接在详情页执行修改、取消等操作</>,
                        <><strong>打印凭证</strong>：为客人打印订单确认单或发票</>,
                        <><strong>问题处理</strong>：客人来电咨询时，快速定位订单信息</>
                      ]}
                    />
                  </>
                )
              },
              {
                title: '信息模块说明',
                content: (
                  <>
                    <LogicTable
                      headers={['模块', '包含信息', '用途']}
                      rows={[
                        ['订单基本信息', '订单号、下单时间、订单状态、支付状态', '快速了解订单整体状态'],
                        ['客人信息', '姓名、联系电话', '联系客人或核实身份'],
                        ['房间信息', '房型、入住/离店日期、间夜数', '安排房间和入住准备'],
                        ['费用明细', '房费、优惠、实付金额', '核对账单或处理退款']
                      ]}
                    />
                  </>
                )
              },
              {
                title: '操作按钮说明',
                content: (
                  <>
                    <p className="font-semibold mb-2">根据订单状态显示不同操作：</p>
                    <div className="space-y-4">
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <p className="font-semibold text-sm mb-2">待入住状态：</p>
                        <LogicList
                          items={[
                            <><strong>修改订单</strong>：修改入住日期、房型等信息（可能需加收差价）</>,
                            <><strong>取消订单</strong>：取消预订并退款（需符合退款政策）</>
                          ]}
                        />
                      </div>
                      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                        <p className="font-semibold text-sm mb-2">已入住状态：</p>
                        <LogicList
                          items={[
                            <><strong>办理退房</strong>：客人离店时点击，完成退房流程</>
                          ]}
                        />
                      </div>
                      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                        <p className="font-semibold text-sm mb-2">已完成状态：</p>
                        <LogicList
                          items={[
                            <><strong>打印凭证</strong>：为客人打印订单确认单或发票</>
                          ]}
                        />
                      </div>
                    </div>
                  </>
                )
              },
              {
                title: '费用计算逻辑',
                content: (
                  <>
                    <p className="font-semibold mb-2">费用明细计算方式：</p>
                    <div className="bg-slate-50 border rounded-lg p-4 space-y-2 text-sm">
                      <div>
                        <strong>1. 房费计算</strong>
                        <div className="text-muted-foreground mt-1">
                          房费 = 间夜数 × 每晚价格
                        </div>
                        <div className="text-xs text-muted-foreground mt-1">
                          示例：3晚 × ¥358/晚 = ¥1,074
                        </div>
                      </div>
                      <div className="border-t pt-2">
                        <strong>2. 优惠计算</strong>
                        <div className="text-muted-foreground mt-1">
                          优惠 = 优惠券抵扣 + 积分抵扣 + 会员折扣
                        </div>
                        <div className="text-xs text-muted-foreground mt-1">
                          示例：优惠券¥50 + 积分¥20 + 会员折扣¥30 = ¥100
                        </div>
                      </div>
                      <div className="border-t pt-2">
                        <strong>3. 实付金额</strong>
                        <div className="text-muted-foreground mt-1">
                          实付金额 = 房费 - 优惠
                        </div>
                        <div className="text-xs text-muted-foreground mt-1">
                          示例：¥1,074 - ¥100 = ¥974
                        </div>
                      </div>
                    </div>
                    <LogicHighlight type="info">
                      <p className="text-sm">
                        <strong>注意</strong>：费用明细需与支付平台的订单金额保持一致，避免账目不符。
                      </p>
                    </LogicHighlight>
                  </>
                )
              },
              {
                title: '修改订单规则',
                content: (
                  <>
                    <p className="font-semibold mb-2">允许修改的场景：</p>
                    <LogicTable
                      headers={['修改项', '规则', '是否补差价']}
                      rows={[
                        ['入住日期', '入住前24小时可修改', '否'],
                        ['离店日期', '随时可延长，缩短需退款', '延长需补差价'],
                        ['房型升级', '随时可升级到更高房型', '是，补房型差价'],
                        ['房型降级', '入住前24小时可降级', '是，退房型差价'],
                        ['增加房间数', '有空房即可增加', '是，补新房间费用']
                      ]}
                    />
                    <LogicHighlight type="warning">
                      <p className="text-sm">
                        <strong>重要</strong>：修改订单可能涉及补差价或退款，系统需自动计算差价并生成新的支付/退款单。
                      </p>
                    </LogicHighlight>
                  </>
                )
              },
              {
                title: '取消订单规则',
                content: (
                  <>
                    <p className="font-semibold mb-2">退款政策（可在"酒店政策"中配置）：</p>
                    <LogicTable
                      headers={['取消时间', '退款比例', '说明']}
                      rows={[
                        ['入住前72小时', '100%', '全额退款'],
                        ['入住前24-72小时', '50%', '扣除50%房费作为违约金'],
                        ['入住前24小时内', '0%', '不予退款'],
                        ['已入住后取消', '不可取消', '需走退房流程']
                      ]}
                    />
                    <p className="font-semibold mt-4 mb-2">取消流程：</p>
                    <LogicList
                      items={[
                        '1. 客人/酒店发起取消申请',
                        '2. 系统根据政策计算退款金额',
                        '3. 展示退款金额供确认',
                        '4. 确认后发起退款流程',
                        '5. 退款成功后订单状态变更为"已取消"'
                      ]}
                    />
                  </>
                )
              },
              {
                title: '打印功能说明',
                content: (
                  <>
                    <p className="font-semibold mb-2">打印凭证包含信息：</p>
                    <LogicList
                      items={[
                        <><strong>订单确认单</strong>：订单号、客人信息、房间信息、入住时间</>,
                        <><strong>费用明细</strong>：房费、优惠、实付金额</>,
                        <><strong>酒店信息</strong>：酒店名称、地址、联系电话</>,
                        <><strong>二维码</strong>：可扫码查看订单详情（可选）</>
                      ]}
                    />
                    <LogicHighlight type="success">
                      <p className="text-sm">
                        <strong>使用场景</strong>：客人到店时出示订单确认单，前台核对信息后办理入住；或作为报销凭证使用。
                      </p>
                    </LogicHighlight>
                  </>
                )
              },
              {
                title: '数据关联',
                content: (
                  <>
                    <p className="font-semibold mb-2">订单详情页关联的其他数据：</p>
                    <LogicTable
                      headers={['关联数据', '用途', '来源']}
                      rows={[
                        ['房型信息', '展示房型详细配置', '房型管理模块'],
                        ['客人历史订单', '查看客人订房记录', '订单列表'],
                        ['优惠券使用记录', '展示使用了哪些优惠', '优惠券系统'],
                        ['积分使用记录', '展示积分抵扣明细', '积分系统'],
                        ['退款记录', '查看退款处理进度', '退款管理模块']
                      ]}
                    />
                    <p className="text-sm text-muted-foreground mt-4">
                      通过数据关联，订单详情页可以成为信息枢纽，快速跳转到相关模块查看更多信息。
                    </p>
                  </>
                )
              }
            ]}
          />
        </div>
      </div>
    </MainLayout>
  )
}
