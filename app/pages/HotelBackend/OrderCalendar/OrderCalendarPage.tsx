import { useState } from 'react'
import { Form } from '@remix-run/react'
import type { RoomTypeOrders, OrderBooking } from './types/orderCalendar.types'
import { ORDER_STATUS_COLORS } from './types/orderCalendar.types'
import { Card, CardContent } from '~/components/ui/card'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { ChevronLeft, ChevronRight, Calendar } from 'lucide-react'
import { cn } from '~/lib/utils'
import MainLayout from '~/pages/PointsSystem/components/MainLayout'
import LogicPanel, { LogicTable, LogicList, LogicHighlight, LogicCode } from '~/pages/PointsSystem/components/LogicPanel'

interface OrderCalendarPageProps {
  orderCalendar: RoomTypeOrders[]
  error: string | null
}

export default function OrderCalendarPage({ orderCalendar, error }: OrderCalendarPageProps) {
  const [startDate, setStartDate] = useState('2025-11-17')

  // 生成日期范围（14天）
  const generateDateRange = (start: string, days: number) => {
    const dates: { date: string; dayOfWeek: string }[] = []
    const startDate = new Date(start)
    const weekdays = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']

    for (let i = 0; i < days; i++) {
      const currentDate = new Date(startDate)
      currentDate.setDate(startDate.getDate() + i)
      dates.push({
        date: currentDate.toISOString().split('T')[0],
        dayOfWeek: weekdays[currentDate.getDay()]
      })
    }
    return dates
  }

  const dates = generateDateRange(startDate, 14)

  const handlePrevWeek = () => {
    const current = new Date(startDate)
    current.setDate(current.getDate() - 7)
    setStartDate(current.toISOString().split('T')[0])
  }

  const handleNextWeek = () => {
    const current = new Date(startDate)
    current.setDate(current.getDate() + 7)
    setStartDate(current.toISOString().split('T')[0])
  }

  const handleToday = () => {
    setStartDate(new Date().toISOString().split('T')[0])
  }

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    return `${date.getMonth() + 1}-${date.getDate()}`
  }

  // 计算订单在日历中的位置和宽度
  const getBookingStyle = (booking: OrderBooking, dateIndex: number) => {
    const bookingStart = new Date(booking.startDate)
    const bookingEnd = new Date(booking.endDate)
    const cellDate = new Date(dates[dateIndex].date)

    // 检查订单是否在当前单元格范围内
    if (cellDate < bookingStart || cellDate >= bookingEnd) {
      return null
    }

    // 计算订单开始位置
    const startIndex = dates.findIndex(d => d.date === booking.startDate)
    if (startIndex === -1 || startIndex > dateIndex) return null

    // 只在订单开始的单元格显示
    if (startIndex !== dateIndex) return null

    // 计算跨越的天数
    const spanDays = Math.min(
      booking.nights,
      dates.length - startIndex
    )

    return {
      gridColumnStart: 1,
      gridColumnEnd: spanDays + 1,
      width: `${spanDays * 100}%`
    }
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="text-destructive">错误: {error}</div>
      </div>
    )
  }

  return (
    <MainLayout>
      <div className="flex h-full">
        {/* 左侧：实际后台界面 (60%) */}
        <div className="w-[60%] h-full overflow-y-auto p-6 bg-background">
          <div className="space-y-4">
            {/* 顶部工具栏 */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">开始日期</span>
                <Input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-40"
                />
              </div>
              <Form method="get">
                <input type="hidden" name="startDate" value={startDate} />
                <Button type="submit">
                  <Calendar className="h-4 w-4 mr-2" />
                  搜索
                </Button>
              </Form>
              <Button variant="outline" onClick={handleToday}>
                今日
              </Button>
              <div className="flex items-center gap-1">
                <Button variant="outline" size="icon" onClick={handlePrevWeek}>
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" onClick={handleNextWeek}>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* 订单日历表格 */}
            <Card>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-muted/50">
                        <th className="sticky left-0 z-20 bg-muted/50 border-r border-b p-3 text-left min-w-[200px]">
                          <div className="flex items-center gap-2">
                            <ChevronLeft className="h-4 w-4" />
                            <span>房型</span>
                          </div>
                        </th>
                        {dates.map((dateInfo, index) => (
                          <th
                            key={index}
                            className="border-b p-2 text-center min-w-[80px]"
                          >
                            <div className="text-xs space-y-1">
                              <div className="font-medium">{formatDate(dateInfo.date)}</div>
                              <div className="text-muted-foreground">{dateInfo.dayOfWeek}</div>
                            </div>
                          </th>
                        ))}
                        <th className="border-b p-3 text-center min-w-[90px]">
                          <ChevronRight className="h-4 w-4 mx-auto" />
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {orderCalendar.map((roomType) => (
                        <tr key={roomType.id} className="hover:bg-muted/30">
                          <td className="sticky left-0 z-10 bg-background border-r border-b p-3">
                            <div className="text-sm font-medium">{roomType.roomTypeName}</div>
                          </td>
                          {dates.map((dateInfo, dateIndex) => (
                            <td
                              key={dateIndex}
                              className="border-b p-1 relative"
                              style={{ minHeight: '50px' }}
                            >
                              <div className="relative h-full min-h-[40px]">
                                {roomType.bookings.map((booking) => {
                                  const style = getBookingStyle(booking, dateIndex)
                                  if (!style) return null

                                  return (
                                    <div
                                      key={booking.id}
                                      className={cn(
                                        "absolute inset-0 rounded px-2 py-1 text-white text-xs flex items-center justify-between",
                                        booking.orderStatus === 'checked-in' ? 'bg-green-500' : 'bg-gray-400'
                                      )}
                                      style={{
                                        width: style.width,
                                        left: 0
                                      }}
                                    >
                                      <span className="truncate">{booking.guestName}</span>
                                      {booking.hasSpecialMark && (
                                        <span className="flex-shrink-0 w-4 h-4 bg-red-500 rounded-full text-[10px] flex items-center justify-center ml-1">
                                          退
                                        </span>
                                      )}
                                    </div>
                                  )
                                })}
                              </div>
                            </td>
                          ))}
                          <td className="border-b p-2"></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            {orderCalendar.length === 0 && (
              <div className="text-center py-12 text-muted-foreground">
                暂无订单数据
              </div>
            )}
          </div>
        </div>

        {/* 右侧：产品&业务逻辑说明 (40%) */}
        <div className="w-[40%] h-full border-l">
          <LogicPanel
            title="订单日历"
            sections={[
              {
                title: '业务场景',
                content: (
                  <>
                    <p className="font-semibold mb-2">订单可视化管理：</p>
                    <LogicList
                      items={[
                        <>一眼看出<strong>哪个房间被谁订了、住几天</strong>（前台接待核心工具）</>,
                        <>快速查找客人订单：输入名字立即定位（避免翻找半天）</>,
                        <>房间排期清晰：避免同一房间同一天被重复分配</>,
                        <>异常订单预警：红点标记退款申请，提醒及时处理</>
                      ]}
                    />
                    <LogicHighlight type="info">
                      <p className="text-sm">
                        <strong>应用场景</strong>：前台小王接到电话："我是张三，今天能提前入住吗？"
                        打开订单日历，输入"张三"立即找到订单（11/20-11/22，豪华大床房），
                        查看当日房间状态，1分钟内回复客人。传统方式需翻查Excel表格至少5分钟。
                      </p>
                    </LogicHighlight>
                  </>
                )
              },
              {
                title: '订单状态',
                content: (
                  <>
                    <p className="font-semibold mb-2">颜色含义（状态可视化）：</p>
                    <LogicTable
                      headers={['颜色', '状态', '含义', '操作建议']}
                      rows={[
                        ['灰色', '待入住', '已支付但未到店', '提前准备房间（打扫、布草）'],
                        ['绿色', '已入住', '客人已Check-in', '关注退房时间，提醒续住'],
                        ['蓝色', '已退房', '客人已Check-out', '检查房间状态，清洁后上架'],
                        ['红色', '已取消/退款', '订单取消或退款中', '释放库存，重新售卖']
                      ]}
                    />

                    <p className="font-semibold mt-4 mb-2">红点标记（特殊提醒）：</p>
                    <LogicList items={[
                      <><strong>红点"退"</strong>：客人申请退款，需在24小时内处理</>,
                      '点击订单查看退款原因（行程变更/价格问题/房间问题）',
                      '根据原因决策：同意退款 / 协商改期 / 拒绝（需提供证据）',
                      '超时未处理 → OTA平台自动退款 + 商家扣分'
                    ]} />

                    <LogicHighlight type="warning">
                      <p className="text-sm">
                        <strong>退款处理时效</strong>：携程要求24小时内响应退款申请，超时自动同意退款。
                        某酒店因周末无人值班，错过3单退款处理，被携程降低搜索排名30天，损失订单超100单。
                      </p>
                    </LogicHighlight>
                  </>
                )
              },
              {
                title: '特殊标记',
                content: (
                  <>
                    <p className="font-semibold mb-2">红点的含义（退款申请）：</p>
                    <LogicList items={[
                      '客人在OTA平台发起退款申请（行程取消、价格问题等）',
                      '系统自动在订单日历上标记红点"退"',
                      '前台/客服需在24小时内处理（同意/拒绝/协商）',
                      '处理后红点消失，订单状态更新'
                    ]} />

                    <p className="font-semibold mt-4 mb-2">退款处理流程：</p>
                    <LogicCode>
{`1. 客人发起退款申请
   ↓
2. 系统标记红点"退"（订单日历+订单列表）
   ↓
3. 前台/客服点击查看退款原因
   - 行程变更：查看退款政策（是否免费取消）
   - 价格问题：对比竞品价格，协商补差价
   - 房间问题：核实房间状态，必要时同意退款
   ↓
4. 商家处理
   - 同意退款 → 24小时内到账，释放库存
   - 拒绝退款 → 提供证据（如入住记录、照片）
   - 协商改期 → 推荐其他日期，避免退款
   ↓
5. OTA平台审核（3个工作日）
   ↓
6. 红点消失，订单状态更新`}
                    </LogicCode>

                    <LogicHighlight type="success">
                      <p className="text-sm">
                        <strong>最佳实践</strong>：设置退款政策（如"入住前3天免费取消，3天内不可退"），
                        减少临时退款。对于合理退款快速处理，保持好评率。
                      </p>
                    </LogicHighlight>
                  </>
                )
              },
              {
                title: '操作说明',
                content: (
                  <>
                    <p className="font-semibold mb-2">查看订单详情：</p>
                    <LogicList items={[
                      '点击订单条（客人名称），弹出详情弹窗',
                      '查看：订单号、入住日期、离店日期、房型、价格、支付状态',
                      '操作：办理入住、修改订单、取消订单、查看客人信息',
                      '备注：可添加特殊需求（如加床、禁烟房、高楼层）'
                    ]} />

                    <p className="font-semibold mt-4 mb-2">处理订单：</p>
                    <LogicList items={[
                      '办理入住：点击"Check-in"，订单变绿色，库存锁定',
                      '办理退房：点击"Check-out"，订单变蓝色，释放房间',
                      '取消订单：点击"取消"，订单变红色，退还款项（根据政策）',
                      '修改订单：修改房型、日期、价格（需客人同意）'
                    ]} />

                    <p className="font-semibold mt-4 mb-2">日期导航：</p>
                    <LogicList items={[
                      '横跨多天的订单：显示为长条（如张三订3天，占3个格子）',
                      '同一天多个订单：纵向堆叠显示（最多显示3个，超过显示"+N"）',
                      '前进/后退按钮：按周快速翻页',
                      '"今日"按钮：快速回到当前日期'
                    ]} />

                    <LogicHighlight type="info">
                      <p className="text-sm">
                        <strong>快捷操作</strong>：鼠标悬停订单条，显示快捷菜单（入住/退房/详情/取消）。
                        支持键盘快捷键：← → 翻页，Enter查看详情，Esc关闭弹窗。
                      </p>
                    </LogicHighlight>
                  </>
                )
              },
              {
                title: '字段说明',
                content: (
                  <LogicTable
                    headers={['字段名', '类型', '含义', '示例']}
                    rows={[
                      ['id', 'string', '房型唯一标识', 'rt_001'],
                      ['roomTypeName', 'string', '房型名称', '豪华大床房'],
                      ['bookings', 'array', '该房型的订单列表', '[{id, guestName, ...}]'],
                      ['bookings[].id', 'string', '订单唯一标识', 'order_001'],
                      ['bookings[].guestName', 'string', '客人姓名', '张三'],
                      ['bookings[].startDate', 'string', '入住日期', '2025-11-17'],
                      ['bookings[].endDate', 'string', '离店日期', '2025-11-20'],
                      ['bookings[].nights', 'number', '入住天数', '3'],
                      ['bookings[].orderStatus', 'string', '订单状态', 'pending / checked-in / checked-out'],
                      ['bookings[].hasSpecialMark', 'boolean', '是否有特殊标记（退款申请）', 'true']
                    ]}
                  />
                )
              },
              {
                title: '技术实现要点',
                content: (
                  <>
                    <p className="font-semibold mb-2">订单横跨多天的渲染：</p>
                    <LogicCode>
{`订单数据：
{
  id: "order_001",
  guestName: "张三",
  startDate: "2025-11-17",
  endDate: "2025-11-20",  // 离店日期
  nights: 3  // 入住3晚（11/17、11/18、11/19）
}

前端渲染逻辑：
1. 计算订单跨越的天数：3天
2. 只在startDate对应的单元格渲染订单条
3. 使用CSS设置width: 300%（占3个格子）
4. position: absolute 实现跨单元格效果

CSS示例：
.booking-bar {
  position: absolute;
  width: calc(100% * 3);  // 跨3天
  left: 0;
  background: green;
  z-index: 1;
}`}
                    </LogicCode>

                    <p className="font-semibold mt-4 mb-2">性能优化：</p>
                    <LogicList items={[
                      '虚拟滚动：只渲染可视区域的14天数据（Virtualized List）',
                      '懒加载：滚动时按需加载更多日期',
                      '缓存：已加载的订单数据存入Redux/Zustand（避免重复请求）',
                      '防抖：日期选择器300ms防抖，避免频繁查询'
                    ]} />

                    <LogicHighlight type="warning">
                      <p className="text-sm">
                        <strong>数据同步</strong>：订单日历需实时同步OTA平台订单。使用WebSocket推送
                        新订单（携程/美团下单后5秒内显示）。离线时使用轮询（每30秒刷新一次）。
                      </p>
                    </LogicHighlight>
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
