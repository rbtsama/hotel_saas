/**
 * 门店管理页面
 */

import type { Store } from './types/hotel-backend.types'
import { StoreStatus } from './types/hotel-backend.types'
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card'
import { Button } from '~/components/ui/button'
import MainLayout from '../PointsSystem/components/MainLayout'
import LogicPanel, { LogicTable, LogicList, LogicHighlight } from '~/pages/PointsSystem/components/LogicPanel'

interface StoresPageProps {
  stores: Store[]
}

const statusColors = {
  [StoreStatus.OPERATING]: 'bg-green-100 text-green-700',
  [StoreStatus.RENOVATING]: 'bg-orange-100 text-orange-700',
  [StoreStatus.CLOSED]: 'bg-slate-100 text-slate-600',
}

const statusLabels = {
  [StoreStatus.OPERATING]: '营业中',
  [StoreStatus.RENOVATING]: '装修中',
  [StoreStatus.CLOSED]: '已关闭',
}

export default function StoresPage({ stores }: StoresPageProps) {
  return (
    <MainLayout>
      <div className="flex h-full">
        {/* 左侧：实际后台界面 (60%) */}
        <div className="w-[60%] h-full overflow-y-auto bg-slate-50 p-6">
        <div className="space-y-6">
        {/* 页面标题 */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">门店管理</h1>
            <p className="text-sm text-slate-500 mt-1">
              管理连锁酒店的各个门店信息、设施和运营状态
            </p>
          </div>
          <Button>新增门店</Button>
        </div>

        {/* 门店统计 */}
        <div className="grid grid-cols-4 gap-4">
          <Card>
            <CardContent className="pt-6 text-center">
              <div className="text-3xl font-bold text-blue-600">{stores.length}</div>
              <div className="text-sm text-slate-600 mt-2">总门店数</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 text-center">
              <div className="text-3xl font-bold text-green-600">
                {stores.filter((s) => s.status === StoreStatus.OPERATING).length}
              </div>
              <div className="text-sm text-slate-600 mt-2">营业中</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 text-center">
              <div className="text-3xl font-bold text-purple-600">
                {stores.reduce((sum, s) => sum + s.totalRooms, 0)}
              </div>
              <div className="text-sm text-slate-600 mt-2">总房间数</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 text-center">
              <div className="text-3xl font-bold text-orange-600">
                {Math.round(
                  stores.reduce((sum, s) => sum + s.rating, 0) / stores.length * 10
                ) / 10}
              </div>
              <div className="text-sm text-slate-600 mt-2">平均评分</div>
            </CardContent>
          </Card>
        </div>

        {/* 门店列表 */}
        <div className="grid grid-cols-1 gap-6">
          {stores.map((store) => (
            <Card key={store.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-xl">{store.name}</CardTitle>
                    <p className="text-sm text-slate-500 mt-1">{store.address}</p>
                  </div>
                  <span
                    className={`px-3 py-1 text-xs rounded-full ${
                      statusColors[store.status]
                    }`}
                  >
                    {statusLabels[store.status]}
                  </span>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-6">
                  {/* 左侧:门店图片 */}
                  <div className="grid grid-cols-2 gap-2">
                    {store.images.map((img, index) => (
                      <img
                        key={index}
                        src={img}
                        alt={`${store.name}-${index + 1}`}
                        className="w-full h-32 object-cover rounded"
                      />
                    ))}
                  </div>

                  {/* 右侧:门店信息 */}
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-slate-600">店长:</span>{' '}
                        <span className="font-medium">{store.manager}</span>
                      </div>
                      <div>
                        <span className="text-slate-600">联系电话:</span>{' '}
                        <span className="font-medium">{store.phone}</span>
                      </div>
                      <div>
                        <span className="text-slate-600">总房间数:</span>{' '}
                        <span className="font-semibold text-blue-600">
                          {store.totalRooms}
                        </span>
                      </div>
                      <div>
                        <span className="text-slate-600">可用房间:</span>{' '}
                        <span className="font-semibold text-green-600">
                          {store.availableRooms}
                        </span>
                      </div>
                      <div>
                        <span className="text-slate-600">入住率:</span>{' '}
                        <span className="font-semibold">
                          {Math.round(
                            ((store.totalRooms - store.availableRooms) /
                              store.totalRooms) *
                              100
                          )}
                          %
                        </span>
                      </div>
                      <div>
                        <span className="text-slate-600">评分:</span>{' '}
                        <span className="font-semibold text-yellow-600">
                          ⭐ {store.rating}
                        </span>
                      </div>
                    </div>

                    {/* 设施标签 */}
                    <div>
                      <div className="text-xs text-slate-500 mb-2">门店设施</div>
                      <div className="flex flex-wrap gap-2">
                        {store.facilities.map((facility, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded"
                          >
                            {facility}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* 操作按钮 */}
                    <div className="flex gap-2 pt-2">
                      <Button variant="outline" size="sm">
                        编辑
                      </Button>
                      <Button variant="outline" size="sm">
                        查看房间
                      </Button>
                      <Button variant="outline" size="sm">
                        查看员工
                      </Button>
                    </div>
                  </div>
                </div>

                {/* 门店描述 */}
                <div className="mt-4 pt-4 border-t border-slate-200">
                  <p className="text-sm text-slate-600">{store.description}</p>
                  <p className="text-xs text-slate-500 mt-2">
                    开业时间: {store.openedAt}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        </div>
        </div>

        {/* 右侧：产品&业务逻辑说明 (40%) */}
        <div className="w-[40%] h-full border-l">
          <LogicPanel
            title="门店管理"
            sections={[
              {
                title: '业务场景',
                content: (
                  <>
                    <p className="font-semibold mb-2">连锁酒店的核心管理需求：</p>
                    <LogicList
                      items={[
                        <>多门店品牌需要<strong>集中管理</strong>各个分店的信息、运营状态</>,
                        <>总部需要实时掌握各门店的<strong>房间利用率、评分、运营状况</strong></>,
                        <>用户在选择酒店时，首先看的是<strong>门店位置、设施、评分</strong></>,
                        <>OTA平台（携程、美团）要求完善门店信息，否则<strong>无法上架销售</strong></>
                      ]}
                    />
                    <LogicHighlight type="info">
                      <p className="text-sm">
                        <strong>行业背景</strong>：根据酒店行业白皮书，门店信息的完整度直接影响订单转化率，
                        完善的门店信息可提升20-35%的预订量。门店图片、设施、评分是用户决策的三大要素。
                      </p>
                    </LogicHighlight>
                  </>
                )
              },
              {
                title: '解决的问题',
                content: (
                  <>
                    <p className="font-semibold mb-2">总部管理痛点：</p>
                    <LogicList items={[
                      '不知道各门店的实时运营状态（营业中/装修中/已关闭）',
                      '无法快速查看各门店的入住率、可用房间数',
                      '门店信息分散，难以统一管理和更新',
                      '无法对比各门店的运营数据（评分、房间数等）'
                    ]} />

                    <p className="font-semibold mt-4 mb-2">门店经理痛点：</p>
                    <LogicList
                      items={[
                        '需要在多个系统中维护门店信息，效率低下',
                        '门店设施、图片更新后，无法及时同步到OTA平台',
                        '不清楚自己门店在品牌中的排名（评分、入住率）'
                      ]}
                    />

                    <p className="font-semibold mt-4 mb-2">平台价值：</p>
                    <LogicList items={[
                      '一站式管理所有门店，统一查看运营数据',
                      '实时统计总门店数、营业中门店、总房间数、平均评分',
                      '卡片式展示，直观呈现门店核心信息（图片、评分、设施）',
                      '快速操作入口：编辑门店、查看房间、查看员工'
                    ]} />
                  </>
                )
              },
              {
                title: '功能说明',
                content: (
                  <>
                    <p className="font-semibold mb-2">核心功能模块：</p>
                    <LogicTable
                      headers={['功能', '说明', '使用场景']}
                      rows={[
                        ['门店统计', '显示总门店数、营业中门店、总房间数、平均评分', '总部快速了解整体运营情况'],
                        ['门店列表', '卡片式展示各门店详细信息', '浏览和管理各个门店'],
                        ['门店状态', '标识营业中/装修中/已关闭', '快速识别可售门店'],
                        ['运营数据', '展示总房间数、可用房间、入住率', '了解房间利用情况'],
                        ['门店图片', '展示4张代表性图片', '直观了解门店环境'],
                        ['设施标签', '展示门店拥有的设施', '了解门店配套服务'],
                        ['快捷操作', '编辑、查看房间、查看员工', '快速进入详细管理页面']
                      ]}
                    />

                    <LogicHighlight type="success">
                      <p className="text-sm">
                        <strong>设计理念</strong>：采用"总览+详情"的设计模式，顶部统计数据让管理者快速把握全局，
                        下方卡片列表便于逐个查看门店详情。参考了携程、美团后台的设计规范。
                      </p>
                    </LogicHighlight>
                  </>
                )
              },
              {
                title: '字段说明',
                content: (
                  <>
                    <p className="font-semibold mb-3">门店核心字段：</p>
                    <LogicTable
                      headers={['字段名', '类型', '说明', '示例']}
                      rows={[
                        ['id', 'string', '门店唯一标识', 'store_001'],
                        ['name', 'string', '门店名称', '原乡芦荻·桐庐店'],
                        ['address', 'string', '门店地址', '桐庐县芦茨村大母山'],
                        ['status', 'enum', '运营状态', 'operating（营业中）/ renovating（装修中）/ closed（已关闭）'],
                        ['manager', 'string', '店长姓名', '张三'],
                        ['phone', 'string', '联系电话', '13575481983'],
                        ['totalRooms', 'number', '总房间数', '50'],
                        ['availableRooms', 'number', '可用房间数', '12'],
                        ['rating', 'number', '门店评分', '4.8（0-5分）'],
                        ['images', 'array', '门店图片URL列表', '["url1", "url2", ...]'],
                        ['facilities', 'array', '设施标签列表', '["免费WiFi", "停车场", ...]'],
                        ['description', 'string', '门店描述', '位于富春江畔...'],
                        ['openedAt', 'string', '开业时间', '2016-08-01']
                      ]}
                    />

                    <p className="font-semibold mt-4 mb-2">入住率计算公式：</p>
                    <LogicHighlight type="info">
                      <p className="text-sm font-mono">
                        入住率 = (总房间数 - 可用房间数) / 总房间数 × 100%<br/>
                        示例：(50 - 12) / 50 × 100% = 76%
                      </p>
                    </LogicHighlight>
                  </>
                )
              },
              {
                title: '操作指南',
                content: (
                  <>
                    <p className="font-semibold mb-2">查看门店统计：</p>
                    <LogicList items={[
                      '页面顶部4个统计卡片，实时展示全局数据',
                      '总门店数：包含所有状态的门店',
                      '营业中：仅统计status=operating的门店',
                      '总房间数：所有门店的房间数总和',
                      '平均评分：所有门店评分的平均值，保留1位小数'
                    ]} />

                    <p className="font-semibold mt-4 mb-2">浏览门店列表：</p>
                    <LogicList items={[
                      '每个门店以卡片形式展示，包含核心信息',
                      '左侧显示4张门店图片（2×2网格布局）',
                      '右侧显示运营数据、设施标签、操作按钮',
                      '状态标签用颜色区分：绿色=营业中、橙色=装修中、灰色=已关闭'
                    ]} />

                    <p className="font-semibold mt-4 mb-2">快捷操作：</p>
                    <LogicList items={[
                      '"新增门店"：创建新的门店档案（总部权限）',
                      '"编辑"：修改门店基本信息、图片、描述',
                      '"查看房间"：进入房间管理页面，查看该门店的所有房型和房间',
                      '"查看员工"：进入员工管理页面，查看该门店的员工列表'
                    ]} />

                    <LogicHighlight type="warning">
                      <p className="text-sm">
                        <strong>权限说明</strong>："新增门店"按钮仅对总部管理员可见，
                        门店经理仅能编辑自己管理的门店。装修中/已关闭的门店不允许预订。
                      </p>
                    </LogicHighlight>
                  </>
                )
              },
              {
                title: '最佳实践',
                content: (
                  <>
                    <p className="font-semibold mb-2">门店信息完善建议：</p>
                    <LogicList items={[
                      <><strong>门店图片</strong>：至少4张，包括外观、大堂、公共区域、特色景观</>,
                      <><strong>门店描述</strong>：200-300字，突出地理位置、周边景点、特色服务</>,
                      <><strong>设施标签</strong>：选择真实拥有的设施，虚假标注会导致差评</>,
                      <><strong>联系方式</strong>：确保电话号码准确，客人可能直接拨打咨询</>,
                      <><strong>开业时间</strong>：新开业门店可突出"全新装修"卖点</>
                    ]} />

                    <p className="font-semibold mt-4 mb-2">运营状态管理：</p>
                    <LogicTable
                      headers={['状态', '何时使用', '影响']}
                      rows={[
                        ['营业中', '正常运营，可接受预订', '在OTA平台正常展示，可预订'],
                        ['装修中', '门店升级改造期间', '暂停接单，已有订单需协助改签'],
                        ['已关闭', '永久停业或长期关闭', '下架所有房间，不再展示']
                      ]}
                    />

                    <LogicHighlight type="success">
                      <p className="text-sm">
                        <strong>行业参考</strong>：携程要求门店信息完整度达到80%以上才能获得流量推荐，
                        包括：完整的门店介绍、至少5张图片、完善的设施标签、准确的位置信息。
                        参考携程商家学院的《门店信息优化指南》。
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
