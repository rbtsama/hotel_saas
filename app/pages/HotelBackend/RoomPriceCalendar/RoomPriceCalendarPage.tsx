import { useState } from 'react'
import { Form, Link } from '@remix-run/react'
import type { RoomTypePricing } from './types/roomPriceCalendar.types'
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { ChevronLeft, ChevronRight, Calendar } from 'lucide-react'
import { cn } from '~/lib/utils'
import MainLayout from '~/pages/PointsSystem/components/MainLayout'
import LogicPanel, { LogicTable, LogicList, LogicHighlight, LogicCode } from '~/pages/PointsSystem/components/LogicPanel'

interface RoomPriceCalendarPageProps {
  priceCalendar: RoomTypePricing[]
  error: string | null
}

export default function RoomPriceCalendarPage({ priceCalendar, error }: RoomPriceCalendarPageProps) {
  const [startDate, setStartDate] = useState('2025-11-17')

  // 获取日期范围（假设所有房型的日期范围一致）
  const dates = priceCalendar[0]?.dailyPrices || []

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
              <Button variant="outline" className="ml-auto text-green-600 border-green-600 hover:bg-green-50">
                修改全部
              </Button>
            </div>

            {/* 日历表格 */}
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
                            className={cn(
                              "border-b p-2 text-center min-w-[90px]",
                              dateInfo.isWeekend && "bg-blue-50"
                            )}
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
                      {priceCalendar.map((roomType) => (
                        <tr key={roomType.id} className="hover:bg-muted/30">
                          <td className="sticky left-0 z-10 bg-background border-r border-b p-3">
                            <Link
                              to="#"
                              className="text-sm text-blue-600 hover:underline"
                            >
                              批量修改{roomType.roomTypeName}
                            </Link>
                          </td>
                          {roomType.dailyPrices.map((dailyPrice, index) => (
                            <td
                              key={index}
                              className={cn(
                                "border-b p-2 text-center",
                                dailyPrice.isWeekend && "bg-blue-50/50"
                              )}
                            >
                              <div className="space-y-1">
                                <div className="text-sm font-medium">¥ {dailyPrice.price}</div>
                                <Link
                                  to="#"
                                  className="text-xs text-blue-600 hover:underline"
                                >
                                  设置
                                </Link>
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

            {priceCalendar.length === 0 && (
              <div className="text-center py-12 text-muted-foreground">
                暂无房价数据
              </div>
            )}
          </div>
        </div>

        {/* 右侧：产品&业务逻辑说明 (40%) */}
        <div className="w-[40%] h-full border-l">
          <LogicPanel
            title="房价日历"
            sections={[
              {
                title: '业务场景',
                content: (
                  <>
                    <p className="font-semibold mb-2">为什么需要房价日历？</p>
                    <LogicList
                      items={[
                        <>酒店行业的<strong>Revenue Management核心工具</strong>，通过动态定价实现收益最大化</>,
                        <>周五晚上588元、周一晚上288元是常态（差异化定价策略）</>,
                        <>春节、国庆涨价200%很正常（节假日溢价）</>,
                        <>可视化管理未来30-90天的价格，避免手动Excel维护错误</>
                      ]}
                    />
                    <LogicHighlight type="info">
                      <p className="text-sm">
                        <strong>真实案例</strong>：某度假酒店使用动态定价后，平均RevPAR（每间可售房收入）
                        提升35%。周末涨价50%，工作日降价20%吸引商务客，全年入住率从62%提升至79%。
                      </p>
                    </LogicHighlight>
                  </>
                )
              },
              {
                title: '定价策略',
                content: (
                  <>
                    <p className="font-semibold mb-2">差异化定价逻辑：</p>
                    <LogicTable
                      headers={['日期类型', '定价策略', '涨幅范围', '目标客群']}
                      rows={[
                        ['工作日（周一-周四）', '基准价或折扣价', '基准价±0', '商务客、散客'],
                        ['周末（周五-周日）', '周末溢价', '+20% ~ +50%', '休闲度假客'],
                        ['小长假（3天）', '节假日溢价', '+50% ~ +100%', '全家出游'],
                        ['黄金周（7天）', '高峰溢价', '+100% ~ +200%', '旅游旺季客'],
                        ['淡季（11-2月）', '促销价', '-20% ~ -40%', '价格敏感客']
                      ]}
                    />

                    <p className="font-semibold mt-4 mb-2">携程/美团的定价参考：</p>
                    <LogicList items={[
                      '携程提供"智能定价建议"（基于竞对价格+历史数据）',
                      '美团显示"附近酒店均价"（帮助商家对标市场）',
                      'OTA平台抽佣10-15%，定价时需考虑成本',
                      '建议设置"最低价格保护"（如成本价+30%），避免亏损'
                    ]} />

                    <LogicHighlight type="warning">
                      <p className="text-sm">
                        <strong>定价陷阱</strong>：过度涨价会导致用户流失到竞对。某酒店春节涨价300%，
                        结果OCC（入住率）暴跌至20%，总收入反而下降。建议参考历史数据和竞对价格，
                        涨幅控制在合理范围（50%-150%）。
                      </p>
                    </LogicHighlight>
                  </>
                )
              },
              {
                title: '操作说明',
                content: (
                  <>
                    <p className="font-semibold mb-2">单日设置：</p>
                    <LogicList items={[
                      '点击某日的"设置"链接，弹窗输入新价格',
                      '支持快捷操作："+10%"、"-20元"等相对调价',
                      '系统自动校验：价格不能低于成本价（如200元）',
                      '保存后立即生效，OTA平台同步更新（API对接）'
                    ]} />

                    <p className="font-semibold mt-4 mb-2">批量设置：</p>
                    <LogicList items={[
                      '点击"批量修改{房型}"，选择日期范围（如12/25-12/31）',
                      '支持批量涨价/降价（如"所有周末+50元"）',
                      '支持导入Excel（模板下载：日期、价格两列）',
                      '支持"复制上周价格"快捷操作（适用于规律性定价）'
                    ]} />

                    <p className="font-semibold mt-4 mb-2">日期导航：</p>
                    <LogicList items={[
                      '蓝色背景 = 周末/节假日（提示商家重点关注）',
                      '前进/后退按钮：按周快速翻页',
                      '"今日"按钮：快速回到当前日期',
                      '日期选择器：跳转到指定日期'
                    ]} />

                    <LogicHighlight type="success">
                      <p className="text-sm">
                        <strong>最佳实践</strong>：每周一检查未来30天价格，提前设置节假日涨价。
                        参考携程的"价格日历"功能，学习同行定价策略。
                      </p>
                    </LogicHighlight>
                  </>
                )
              },
              {
                title: '行业参考',
                content: (
                  <>
                    <p className="font-semibold mb-2">携程/美团的房价管理方式：</p>
                    <LogicTable
                      headers={['平台', '核心功能', '商家价值']}
                      rows={[
                        ['携程EBK系统', '日历定价、智能推荐、竞对监控', '提供AI定价建议（准确率75%）'],
                        ['美团商家后台', '批量调价、周期定价、价格保护', '防止商家恶意低价竞争'],
                        ['飞猪卖家中心', '促销活动、满减券、会员价', '通过活动刺激预订量'],
                        ['去哪儿PMS', '动态库存、超售预警、价格联动', '库存价格一体化管理']
                      ]}
                    />

                    <p className="font-semibold mt-4 mb-2">行业标准术语：</p>
                    <LogicList items={[
                      <><strong>BAR（Best Available Rate）</strong>：最优可订价格，OTA展示的最低价</>,
                      <><strong>ADR（Average Daily Rate）</strong>：平均房价，总房费/已售房间数</>,
                      <><strong>RevPAR（Revenue Per Available Room）</strong>：每间可售房收入 = ADR × OCC</>,
                      <><strong>Price Parity</strong>：价格一致性，酒店官网价 ≤ OTA价（防止低价倾销）</>
                    ]} />

                    <LogicHighlight type="info">
                      <p className="text-sm">
                        <strong>学习资源</strong>：参考《酒店收益管理实战手册》、携程大学的
                        《动态定价课程》、Cornell大学的Revenue Management课程。
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
                      ['dailyPrices', 'array', '每日价格列表', '[{date, price, isWeekend}]'],
                      ['dailyPrices[].date', 'string', '日期（ISO格式）', '2025-11-17'],
                      ['dailyPrices[].price', 'number', '当日价格（元）', '588'],
                      ['dailyPrices[].isWeekend', 'boolean', '是否周末/节假日', 'true'],
                      ['dailyPrices[].dayOfWeek', 'string', '星期几', '星期五']
                    ]}
                  />
                )
              },
              {
                title: '技术实现要点',
                content: (
                  <>
                    <p className="font-semibold mb-2">数据结构：</p>
                    <LogicCode>
{`数据库设计（room_daily_prices表）：
┌──────────────┬──────────┬─────────┬────────────┐
│ room_type_id │ date     │ price   │ is_weekend │
├──────────────┼──────────┼─────────┼────────────┤
│ rt_001       │ 2025-11-17│ 588    │ true       │
│ rt_001       │ 2025-11-18│ 288    │ false      │
└──────────────┴──────────┴─────────┴────────────┘

前端查询：
GET /api/room-price-calendar?startDate=2025-11-17&days=14

返回数据：
{
  roomType: "豪华大床房",
  dailyPrices: [
    { date: "2025-11-17", price: 588, isWeekend: true },
    { date: "2025-11-18", price: 288, isWeekend: false }
  ]
}`}
                    </LogicCode>

                    <p className="font-semibold mt-4 mb-2">批量更新优化：</p>
                    <LogicList items={[
                      '前端：防抖（Debounce）避免频繁请求',
                      '后端：批量写入（Batch Insert），单次更新100条记录',
                      '缓存：Redis缓存未来7天价格（减少DB查询）',
                      '同步：Webhook通知OTA平台价格变更（异步队列处理）'
                    ]} />

                    <LogicHighlight type="warning">
                      <p className="text-sm">
                        <strong>性能优化</strong>：前端只加载可视区域的14天数据，滚动时懒加载。
                        后端使用PostgreSQL的DateRange索引加速查询。大促期间流量激增时，
                        使用消息队列（RabbitMQ）削峰，防止数据库崩溃。
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
