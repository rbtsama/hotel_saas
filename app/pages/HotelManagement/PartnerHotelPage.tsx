/**
 * 合作酒店管理页面
 * 管理已签约上线的酒店
 */

import { useState } from 'react'
import type { PartnerHotel } from './types/hotel.types'
import { HotelStatus } from './types/hotel.types'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '~/components/ui/card'
import { Input } from '~/components/ui/input'
import { Label } from '~/components/ui/label'
import { Button } from '~/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '~/components/ui/table'
import MainLayout from '../PointsSystem/components/MainLayout'
import LogicPanel, { LogicTable, LogicList, LogicHighlight, LogicCode } from '../PointsSystem/components/LogicPanel'
import OperationLogButton from '../PointsSystem/components/OperationLogButton'
import { mockProvinces, mockCities, hotelStatusLabels, onboardingStatusLabels } from './services/mocks/hotel.mock'
import { OnboardingStatus } from './types/hotel.types'

interface PartnerHotelPageProps {
  hotels: PartnerHotel[]
}

export default function PartnerHotelPage({ hotels }: PartnerHotelPageProps) {
  const [filterProvince, setFilterProvince] = useState('全部')
  const [filterCity, setFilterCity] = useState('')
  const [searchKeyword, setSearchKeyword] = useState('')
  const [dateStart, setDateStart] = useState('')
  const [dateEnd, setDateEnd] = useState('')
  const [filterOnboardingStatus, setFilterOnboardingStatus] = useState('')
  const [showEditDialog, setShowEditDialog] = useState(false)
  const [currentHotel, setCurrentHotel] = useState<PartnerHotel | null>(null)

  // 从当前数据中提取实际存在的省份和城市
  const availableProvinces = ['全部', ...Array.from(new Set(hotels.map(h => h.province)))]
  const availableCities = filterProvince === '全部'
    ? []
    : Array.from(new Set(hotels.filter(h => h.province === filterProvince).map(h => h.city)))

  const filteredHotels = hotels.filter(hotel => {
    if (filterProvince !== '全部' && hotel.province !== filterProvince) return false
    if (filterCity && hotel.city !== filterCity) return false
    if (searchKeyword && !hotel.hotelName.includes(searchKeyword)) return false
    if (filterOnboardingStatus && hotel.onboardingStatus !== filterOnboardingStatus) return false
    return true
  })

  const openEditDialog = (hotel: PartnerHotel) => {
    setCurrentHotel(hotel)
    setShowEditDialog(true)
  }

  return (
    <MainLayout>
      <div className="flex h-full">
        {/* 左侧：实际后台界面 (60%) */}
        <div className="w-[60%] h-full overflow-y-auto p-6">
          <div className="max-w-6xl mx-auto space-y-6">
            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-3xl font-bold text-slate-900">合作酒店</h1>
                <p className="text-slate-600 mt-2">管理已签约的合作酒店</p>
              </div>
              <OperationLogButton moduleName="合作酒店" />
            </div>

            {/* 筛选栏 */}
            <Card>
              <CardContent className="pt-6 space-y-4">
                {/* 第一行：日期范围 */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>开通时间（开始）</Label>
                    <Input
                      type="date"
                      value={dateStart}
                      onChange={(e) => setDateStart(e.target.value)}
                    />
                  </div>
                  <div>
                    <Label>开通时间（结束）</Label>
                    <Input
                      type="date"
                      value={dateEnd}
                      onChange={(e) => setDateEnd(e.target.value)}
                    />
                  </div>
                </div>

                {/* 第二行：省市区筛选 */}
                <div className="grid grid-cols-4 gap-4">
                  <div>
                    <Label>省份</Label>
                    <select
                      value={filterProvince}
                      onChange={(e) => {
                        setFilterProvince(e.target.value)
                        setFilterCity('')
                      }}
                      className="w-full px-3 py-2 border rounded-md text-sm"
                    >
                      {availableProvinces.map(p => (
                        <option key={p} value={p}>{p}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <Label>城市</Label>
                    <select
                      value={filterCity}
                      onChange={(e) => setFilterCity(e.target.value)}
                      className="w-full px-3 py-2 border rounded-md text-sm"
                      disabled={filterProvince === '全部'}
                    >
                      <option value="">全部</option>
                      {availableCities.map(c => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <Label>配置状态</Label>
                    <select
                      value={filterOnboardingStatus}
                      onChange={(e) => setFilterOnboardingStatus(e.target.value)}
                      className="w-full px-3 py-2 border rounded-md text-sm"
                    >
                      <option value="">全部</option>
                      <option value={OnboardingStatus.NOT_STARTED}>未开始</option>
                      <option value={OnboardingStatus.CONFIGURING}>配置中</option>
                      <option value={OnboardingStatus.COMPLETED}>已完成</option>
                    </select>
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

            {/* 酒店列表 */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>酒店列表</CardTitle>
                    <CardDescription>共 {filteredHotels.length} 家酒店</CardDescription>
                  </div>
                  <Button>+ 新增酒店</Button>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>
                        <div>开通时间</div>
                        <div className="text-xs text-muted-foreground font-normal">酒店上线日期</div>
                      </TableHead>
                      <TableHead>
                        <div>酒店名称</div>
                        <div className="text-xs text-muted-foreground font-normal">合作酒店名称</div>
                      </TableHead>
                      <TableHead>
                        <div>省市区</div>
                        <div className="text-xs text-muted-foreground font-normal">酒店所在地</div>
                      </TableHead>
                      <TableHead>
                        <div>管理员账号</div>
                        <div className="text-xs text-muted-foreground font-normal">酒店后台登录账号</div>
                      </TableHead>
                      <TableHead>
                        <div>抽佣比例</div>
                        <div className="text-xs text-muted-foreground font-normal">平台佣金比例</div>
                      </TableHead>
                      <TableHead>
                        <div>盛付通号</div>
                        <div className="text-xs text-muted-foreground font-normal">收款账户</div>
                      </TableHead>
                      <TableHead>
                        <div>状态</div>
                        <div className="text-xs text-muted-foreground font-normal">运营中/已停用</div>
                      </TableHead>
                      <TableHead className="text-right">操作</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredHotels.map((hotel) => (
                      <TableRow key={hotel.hotelId}>
                        <TableCell className="text-sm text-slate-600">{hotel.activatedAt}</TableCell>
                        <TableCell className="font-medium">{hotel.hotelName}</TableCell>
                        <TableCell className="text-sm text-slate-600">
                          {hotel.province}/{hotel.city}/{hotel.district}
                        </TableCell>
                        <TableCell className="font-mono text-sm">{hotel.adminAccount}</TableCell>
                        <TableCell className="text-sm">{hotel.commissionRate}%</TableCell>
                        <TableCell className="font-mono text-sm text-blue-600">{hotel.shengfutongId}</TableCell>
                        <TableCell>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              checked={hotel.status === HotelStatus.ONLINE}
                              className="sr-only peer"
                              onChange={() => alert(`切换酒店状态：${hotel.hotelName}`)}
                            />
                            <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
                          </label>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="outline" size="sm" onClick={() => openEditDialog(hotel)}>
                              编辑
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="text-red-600"
                              onClick={() => {
                                if (confirm(`确定删除酒店 ${hotel.hotelName} 吗？`)) {
                                  alert('已删除')
                                }
                              }}
                            >
                              删除
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* 编辑酒店弹窗 */}
        {showEditDialog && currentHotel && (
          <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
            <Card className="w-full max-w-2xl">
              <CardHeader className="border-b">
                <div className="flex items-center justify-between">
                  <CardTitle>编辑酒店</CardTitle>
                  <Button variant="outline" size="sm" onClick={() => setShowEditDialog(false)}>✕</Button>
                </div>
              </CardHeader>
              <CardContent className="pt-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>酒店名称</Label>
                    <Input value={currentHotel.hotelName} disabled className="bg-slate-50" />
                  </div>
                  <div>
                    <Label>管理员账号</Label>
                    <Input defaultValue={currentHotel.adminAccount} />
                  </div>
                  <div>
                    <Label>抽佣比例（%）</Label>
                    <Input type="number" defaultValue={currentHotel.commissionRate} step="0.1" />
                  </div>
                  <div>
                    <Label>盛付通号</Label>
                    <Input defaultValue={currentHotel.shengfutongId} />
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-4 border-t">
                  <Button variant="outline" onClick={() => setShowEditDialog(false)}>取消</Button>
                  <Button onClick={() => { alert('保存成功'); setShowEditDialog(false); }}>保存</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* 右侧：业务逻辑说明 (40%) */}
        <div className="w-[40%] h-full border-l">
          <LogicPanel
            title="合作酒店"
            sections={[
              {
                title: '业务场景',
                content: (
                  <>
                    <p className="font-semibold mb-2">在酒店撮合平台的使用：</p>
                    <LogicList
                      items={[
                        '管理已签约的合作酒店（平台核心资产）',
                        '修改酒店管理员账号（酒店方人员变动）',
                        '调整抽佣比例（商务谈判结果）',
                        '上线/下线酒店（酒店临时关闭或违规下架）'
                      ]}
                    />
                  </>
                )
              },
              {
                title: '解决的问题',
                content: (
                  <>
                    <p className="font-semibold mb-2">运营管理：</p>
                    <LogicList
                      items={[
                        '快速筛选某个省市的酒店（地域运营）',
                        '按开通时间查看新增酒店（月度统计）',
                        '查看抽佣比例（财务核算）'
                      ]}
                    />

                    <p className="font-semibold mt-4 mb-2">酒店方需求：</p>
                    <LogicList
                      items={[
                        '酒店可以临时下线（装修、整改期间）',
                        '酒店更换负责人需要修改管理员账号',
                        '盛付通号绑定支付通道（财务结算）'
                      ]}
                    />
                  </>
                )
              },
              {
                title: '产品逻辑',
                content: (
                  <>
                    <p className="font-semibold mb-2">为什么要有"上线/下线"滑块？</p>
                    <LogicHighlight type="info">
                      <p className="text-sm">
                        场景：酒店临时装修1个月，期间不接客
                        <br />
                        • 如果删除酒店 → 历史订单数据丢失
                        <br />
                        • 如果保持上线 → 用户订了但无法入住（投诉）
                        <br />
                        • 下线处理 → 暂时隐藏，装修完再上线 ✓
                      </p>
                    </LogicHighlight>

                    <p className="font-semibold mt-4 mb-2">抽佣比例为什么可以修改？</p>
                    <LogicList
                      items={[
                        '初期合作：5%标准抽佣',
                        '大客户优惠：连锁酒店降到3.5%',
                        '流量扶持：新酒店前3个月4%',
                        '违规处罚：刷单酒店提高到8%'
                      ]}
                    />

                    <p className="font-semibold mt-4 mb-2">盛付通号是什么？</p>
                    <LogicCode>
{`盛付通：第三方支付通道
作用：用户支付的钱 → 平台账户 → 分账给酒店

示例：
订单金额：¥500
平台抽佣（5%）：¥25
酒店实收：¥475

通过盛付通号自动分账到酒店账户`}
                    </LogicCode>
                  </>
                )
              },
              {
                title: '字段说明',
                content: (
                  <LogicTable
                    headers={['字段', '含义', '示例']}
                    rows={[
                      ['activatedAt', '开通时间', '12/15/24 10:00:00'],
                      ['hotelName', '酒店名称', '亚朵酒店·上海新天地店'],
                      ['province/city/district', '省市区', '上海/上海市/黄浦区'],
                      ['adminAccount', '管理员账号（酒店登录用）', 'atour_shtd'],
                      ['commissionRate', '平台抽佣比例（%）', '5.0（平台收5%佣金）'],
                      ['shengfutongId', '盛付通号（支付分账）', '45632702'],
                      ['status', '上线/下线状态', 'online 上线 / offline 下线']
                    ]}
                  />
                )
              },
              {
                title: '筛选功能设计',
                content: (
                  <>
                    <p className="font-semibold mb-2">为什么需要这些筛选条件？</p>
                    <LogicTable
                      headers={['筛选项', '使用场景', '业务价值']}
                      rows={[
                        ['开通时间范围', '月度统计新增酒店数量', '运营数据分析'],
                        ['省市区筛选', '查看某个地区的酒店分布', '地域运营策略'],
                        ['酒店名称搜索', '快速定位某家酒店', '客服查询、问题处理'],
                        ['上线/下线状态', '查看当前可预订的酒店', '房源管理']
                      ]}
                    />
                  </>
                )
              },
              {
                title: '📱 用户端（C端）呈现',
                content: (
                  <>
                    <p className="font-semibold mb-2">后台酒店管理如何影响用户端：</p>

                    <div className="bg-slate-50 border rounded-lg p-4 mb-4">
                      <p className="font-semibold text-sm mb-2">📱 页面1：酒店列表</p>
                      <div className="text-xs space-y-2">
                        <div className="border rounded p-2 bg-white">
                          <img className="w-full h-20 bg-slate-200 rounded mb-1" alt="酒店" />
                          <div className="font-bold">亚朵酒店·上海新天地店</div>
                          <div className="text-slate-500">黄浦区 | 4.8分</div>
                          <div className="text-red-600 font-bold">¥458起</div>
                        </div>
                        <div className="text-slate-500 text-xs">→ 后台"上线"状态的酒店才会在列表显示</div>
                        <div className="text-slate-500 text-xs">→ 后台"下线"的酒店用户看不到</div>
                      </div>
                    </div>

                    <div className="bg-slate-50 border rounded-lg p-4 mb-4">
                      <p className="font-semibold text-sm mb-2">📱 页面2：酒店详情</p>
                      <div className="text-xs space-y-1 text-slate-700">
                        <div className="font-bold">亚朵酒店·上海新天地店</div>
                        <div>📍 黄浦区马当路388号</div>
                        <div>🏨 中端商务酒店</div>
                        <div className="border-t pt-1 mt-1">
                          <div>大床房 <span className="text-red-600 font-bold">¥458</span>/晚</div>
                          <div className="text-xs text-green-600">会员95折起</div>
                        </div>
                        <div className="text-slate-500 text-xs mt-2">→ 后台的酒店基本信息完整展示</div>
                      </div>
                    </div>

                    <div className="bg-slate-50 border rounded-lg p-4 mb-4">
                      <p className="font-semibold text-sm mb-2">📱 页面3：下单页</p>
                      <div className="text-xs space-y-1 text-slate-700">
                        <div className="font-bold">亚朵酒店·上海新天地店</div>
                        <div>房型：大床房</div>
                        <div>入住：01/18 - 01/19（1晚）</div>
                        <div>房费：¥458</div>
                        <div className="text-green-600">金卡会员95折：-¥23</div>
                        <div className="text-slate-500 text-xs">→ 后台配置的"会员最低折扣"自动计算优惠</div>
                      </div>
                    </div>

                    <LogicHighlight type="success">
                      <p className="text-sm">
                        <strong>后台→前端的映射关系：</strong>
                        <br />
                        • 后台"上线"酒店 → 前端列表可见、可预订
                        <br />
                        • 后台"下线"酒店 → 前端隐藏、不可预订
                        <br />
                        • 后台"抽佣比例" → 前端不显示（用户不关心）
                        <br />
                        • 后台"省市区" → 前端支持地域筛选
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
