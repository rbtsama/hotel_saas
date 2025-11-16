import { useState } from 'react'
import { Form, Link } from '@remix-run/react'
import type { RoomTypeInventory } from './types/inventoryCalendar.types'
import { Card, CardContent } from '~/components/ui/card'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { ChevronLeft, ChevronRight, Calendar } from 'lucide-react'
import { cn } from '~/lib/utils'
import MainLayout from '~/pages/PointsSystem/components/MainLayout'
import LogicPanel, { LogicTable, LogicList, LogicHighlight, LogicCode } from '~/pages/PointsSystem/components/LogicPanel'

interface InventoryCalendarPageProps {
  inventoryCalendar: RoomTypeInventory[]
  error: string | null
}

export default function InventoryCalendarPage({ inventoryCalendar, error }: InventoryCalendarPageProps) {
  const [startDate, setStartDate] = useState('2025-11-17')

  // 获取日期范围
  const dates = inventoryCalendar[0]?.dailyInventories || []

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
                批量修改
              </Button>
            </div>

            {/* 库存日历表格 */}
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
                        <th className="border-b p-3 text-center min-w-[80px]">
                          总房间数
                        </th>
                        {dates.map((dateInfo, index) => (
                          <th
                            key={index}
                            className="border-b p-2 text-center min-w-[90px]"
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
                      {inventoryCalendar.map((roomType) => (
                        <tr key={roomType.id} className="hover:bg-muted/30">
                          <td className="sticky left-0 z-10 bg-background border-r border-b p-3">
                            <div className="text-sm font-medium">{roomType.roomTypeName}</div>
                          </td>
                          <td className="border-b p-3 text-center">
                            <div className="text-sm font-medium">{roomType.totalRooms}</div>
                          </td>
                          {roomType.dailyInventories.map((dailyInv, index) => (
                            <td
                              key={index}
                              className={cn(
                                "border-b p-2 text-center",
                                dailyInv.status === 'sold-out' && "bg-blue-500 text-white",
                                dailyInv.status === 'limited' && "bg-yellow-400 text-black"
                              )}
                            >
                              <div className="space-y-1">
                                {dailyInv.status === 'sold-out' ? (
                                  <div className="text-xs font-medium">已定 {dailyInv.totalRooms}</div>
                                ) : dailyInv.status === 'limited' ? (
                                  <div className="text-xs font-medium">已定 {dailyInv.bookedRooms}</div>
                                ) : (
                                  <div className="text-xs font-medium">可定 {dailyInv.availableRooms}间</div>
                                )}
                                <div className="text-xs">
                                  {dailyInv.status === 'sold-out' ? (
                                    <span className="font-medium">(¥ {index === 0 ? '1' : dailyInv.totalRooms})</span>
                                  ) : dailyInv.status === 'limited' ? (
                                    <span className="font-medium">(¥ {dailyInv.bookedRooms > 0 ? '748' : dailyInv.availableRooms})</span>
                                  ) : (
                                    <>
                                      总: {dailyInv.totalRooms}
                                    </>
                                  )}
                                </div>
                                <Link
                                  to="#"
                                  className={cn(
                                    "text-xs hover:underline",
                                    dailyInv.status === 'sold-out' ? "text-white" : "text-blue-600"
                                  )}
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

            {inventoryCalendar.length === 0 && (
              <div className="text-center py-12 text-muted-foreground">
                暂无库存数据
              </div>
            )}
          </div>
        </div>

        {/* 右侧：产品&业务逻辑说明 (40%) */}
        <div className="w-[40%] h-full border-l">
          <LogicPanel
            title="库存日历"
            sections={[
              {
                title: '业务场景',
                content: (
                  <>
                    <p className="font-semibold mb-2">为什么需要库存日历？</p>
                    <LogicList
                      items={[
                        <>防止<strong>超售</strong>：卖出100间房但实际只有80间，导致无房可住（严重投诉）</>,
                        <>库存可视化：一眼看出哪天满房、哪天空房多（指导运营决策）</>,
                        <>多渠道同步：携程卖了5间，美团库存自动减5（避免重复售卖）</>,
                        <>旺季控房：春节提前30天就满房，提醒商家加价或限购</>
                      ]}
                    />
                    <LogicHighlight type="warning">
                      <p className="text-sm">
                        <strong>血泪教训</strong>：某民宿老板手动管理库存，国庆期间在携程、美团同时卖出
                        10间房，但实际只有6间。结果4个客人到店无房，赔偿+差评+平台罚款，损失超2万元。
                        使用库存日历+PMS系统自动同步后，再未发生超售。
                      </p>
                    </LogicHighlight>
                  </>
                )
              },
              {
                title: '库存状态',
                content: (
                  <>
                    <p className="font-semibold mb-2">颜色状态判断逻辑：</p>
                    <LogicTable
                      headers={['状态', '颜色', '判断条件', '显示内容']}
                      rows={[
                        ['可定（充足）', '白色（默认）', '可定房数 > 总房数×30%', '可定X间 / 总:Y'],
                        ['紧张（余量少）', '黄色', '0 < 可定房数 ≤ 总房数×30%', '已定X / 总:Y'],
                        ['满房（售罄）', '蓝色', '可定房数 = 0', '已定Y / 总:Y'],
                        ['关房（暂停售卖）', '灰色', '人工设置不可售', '已关房']
                      ]}
                    />

                    <p className="font-semibold mt-4 mb-2">库存计算公式：</p>
                    <LogicCode>
{`可定房数 = 总房间数 - 已订房数 - 维修房数 - 预留房数

示例：
总房间数：10间
已订房数：6间（OTA平台已售）
维修房数：1间（空调坏了）
预留房数：1间（老板自留应急）
──────────────────────────
可定房数：10 - 6 - 1 - 1 = 2间 ← 显示"紧张"（黄色）`}
                    </LogicCode>

                    <LogicHighlight type="info">
                      <p className="text-sm">
                        <strong>预留房策略</strong>：建议预留10-20%的房间作为应急（如VIP客人、协议单位）。
                        携程、美团支持"保留房"功能，不对外售卖。
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
                      '点击某日的"设置"，弹窗修改可售房数',
                      '场景：临时关房（如装修）、增加售卖（如解除维修）',
                      '系统校验：可售房数 ≤ 总房间数 - 已订房数',
                      '保存后立即同步到OTA平台（API接口推送）'
                    ]} />

                    <p className="font-semibold mt-4 mb-2">批量设置：</p>
                    <LogicList items={[
                      '点击"批量修改"，选择日期范围和房型',
                      '场景：暑假全月增加库存、淡季关闭部分楼层',
                      '支持"复制上周"（规律性调整）',
                      '支持Excel导入（日期、房型、可售数）'
                    ]} />

                    <p className="font-semibold mt-4 mb-2">颜色提示：</p>
                    <LogicList items={[
                      '蓝色（满房）：考虑加价或等待退订',
                      '黄色（紧张）：重点推广，冲刺满房',
                      '白色（充足）：可能需要降价促销或限时优惠',
                      '总房间数列：快速对比各房型库存规模'
                    ]} />

                    <LogicHighlight type="success">
                      <p className="text-sm">
                        <strong>最佳实践</strong>：每天早上10点检查当日+未来3天库存，及时调整价格策略。
                        满房时上调价格10-20%，空房多时推送促销活动。
                      </p>
                    </LogicHighlight>
                  </>
                )
              },
              {
                title: '超售风险',
                content: (
                  <>
                    <p className="font-semibold mb-2">库存管理不当的后果：</p>
                    <LogicTable
                      headers={['风险场景', '后果', '解决方案']}
                      rows={[
                        ['超售（Over Booking）', '客人到店无房→投诉+赔偿+差评', '实时同步库存，设置安全阈值'],
                        ['少卖（Under Selling）', '明明有空房却显示满房→收入损失', '及时释放预留房，开放售卖'],
                        ['渠道冲突', '携程卖了5间，美团库存未同步减少', '使用PMS系统统一管理'],
                        ['人为错误', '手动Excel更新，数据滞后或错误', '使用系统自动化管理']
                      ]}
                    />

                    <p className="font-semibold mt-4 mb-2">OTA平台的处罚机制：</p>
                    <LogicList items={[
                      '携程：超售3次/月 → 限流7天（搜索排名降低50%）',
                      '美团：超售且未妥善处理 → 罚款500-2000元/单',
                      '飞猪：超售率>2% → 取消"金牌卖家"资质',
                      '去哪儿：频繁超售 → 强制下架商品'
                    ]} />

                    <LogicHighlight type="warning">
                      <p className="text-sm">
                        <strong>赔偿案例</strong>：某酒店超售后，客人凌晨1点到店无房。按携程规则，
                        酒店需赔偿3倍房费（588×3=1764元）+ 协助安排同级酒店（可能更贵）+ 承担
                        交通费。总损失超3000元，且收到差评影响后续销量。
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
                      ['totalRooms', 'number', '总房间数（物理房间数）', '10'],
                      ['dailyInventories', 'array', '每日库存列表', '[{date, status, ...}]'],
                      ['dailyInventories[].date', 'string', '日期（ISO格式）', '2025-11-17'],
                      ['dailyInventories[].totalRooms', 'number', '当日总房数', '10'],
                      ['dailyInventories[].bookedRooms', 'number', '已订房数', '6'],
                      ['dailyInventories[].availableRooms', 'number', '可定房数', '4'],
                      ['dailyInventories[].status', 'string', '库存状态', 'available / limited / sold-out'],
                      ['dailyInventories[].dayOfWeek', 'string', '星期几', '星期五']
                    ]}
                  />
                )
              },
              {
                title: '技术实现要点',
                content: (
                  <>
                    <p className="font-semibold mb-2">库存扣减流程：</p>
                    <LogicCode>
{`用户下单（携程/美团/官网）
  ↓
1. 锁定库存（Pessimistic Lock）
   UPDATE room_inventory
   SET available_rooms = available_rooms - 1
   WHERE room_type_id = 'rt_001'
     AND date = '2025-11-17'
     AND available_rooms > 0  ← 防止超售
  ↓
2. 创建订单（Transaction）
   INSERT INTO orders (room_type_id, date, ...)
  ↓
3. 同步OTA平台（异步）
   POST https://api.ctrip.com/inventory/update
   { roomTypeId: 'rt_001', date: '2025-11-17', qty: -1 }
  ↓
4. 释放锁 / 回滚（15分钟未支付）
   UPDATE room_inventory SET available_rooms = available_rooms + 1`}
                    </LogicCode>

                    <p className="font-semibold mt-4 mb-2">高并发优化：</p>
                    <LogicList items={[
                      'Redis分布式锁：防止同一房间同时被多人预订',
                      '数据库行锁：UPDATE ... WHERE available_rooms > 0',
                      '消息队列：库存变更异步通知OTA（解耦+削峰）',
                      '缓存预热：热门日期库存写入Redis（减少DB压力）'
                    ]} />

                    <LogicHighlight type="info">
                      <p className="text-sm">
                        <strong>学习资源</strong>：参考《高并发库存系统设计》、美团技术博客的
                        《酒店库存架构演进》、阿里云的《电商秒杀系统设计》。
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
