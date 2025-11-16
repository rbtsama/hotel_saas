/**
 * 周边信息配置页面
 */

import { Form } from '@remix-run/react'
import type { SurroundingInfo } from './types/hotel-backend.types'
import { SurroundingCategory, DistanceType } from './types/hotel-backend.types'
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import MainLayout from '../PointsSystem/components/MainLayout'
import LogicPanel, { LogicTable, LogicList, LogicHighlight } from '~/pages/PointsSystem/components/LogicPanel'

interface StoreSurroundingPageProps {
  surrounding: SurroundingInfo
}

const categoryLabels = {
  [SurroundingCategory.TRANSPORTATION]: '交通',
  [SurroundingCategory.ATTRACTION]: '景点',
  [SurroundingCategory.FOOD]: '逛吃',
}

export default function StoreSurroundingPage({ surrounding }: StoreSurroundingPageProps) {
  const categories = Object.values(SurroundingCategory)

  return (
    <MainLayout>
      <div className="flex h-full">
        {/* 左侧：实际后台界面 (60%) */}
        <div className="w-[60%] h-full overflow-y-auto bg-slate-50 p-6">
        <div className="space-y-6 max-w-5xl">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">周边信息</h1>
            <p className="text-sm text-slate-500 mt-1">配置门店周边的交通、景点和美食信息</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">修改</Button>
            <Button variant="outline">刷新</Button>
          </div>
        </div>

        <Form method="post" className="space-y-6">
          {categories.map((category) => {
            const items = surrounding.items.filter((item) => item.category === category)

            return (
              <Card key={category}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>
                      {categoryLabels[category]} <span className="text-red-500">*</span>
                    </CardTitle>
                    <Button type="button" variant="outline" size="sm">
                      + 添加
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  {items.map((item) => (
                    <div key={item.id} className="flex items-center gap-3 p-3 bg-slate-50 rounded">
                      <span className="text-sm text-slate-600">离</span>
                      <Input defaultValue={item.placeName} className="w-40" placeholder="地点名称" />
                      <select className="px-3 py-2 border rounded text-sm" defaultValue={item.distanceType}>
                        <option value={DistanceType.DRIVING}>驾驶距离</option>
                        <option value={DistanceType.WALKING}>步行距离</option>
                      </select>
                      <span className="text-sm text-slate-600">约</span>
                      <Input type="number" defaultValue={item.distanceKm} className="w-20" />
                      <span className="text-sm text-slate-600">公里,用时约</span>
                      <Input type="number" defaultValue={item.timeMinutes} className="w-20" />
                      <span className="text-sm text-slate-600">分钟</span>
                      <Button type="button" variant="ghost" size="sm" className="text-red-600">
                        删除
                      </Button>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )
          })}

          {/* 旅游交通图 */}
          <Card>
            <CardHeader>
              <CardTitle>旅游交通图</CardTitle>
            </CardHeader>
            <CardContent>
              {surrounding.tourismMapImage && (
                <img
                  src={surrounding.tourismMapImage}
                  alt="旅游交通图"
                  className="w-64 border rounded mb-3"
                />
              )}
              <Input name="tourismMapImage" type="url" placeholder="上传交通图URL" />
            </CardContent>
          </Card>

          <div className="flex justify-end">
            <Button type="submit" size="lg">保存周边信息</Button>
          </div>
        </Form>
        </div>
        </div>

        {/* 右侧：产品&业务逻辑说明 (40%) */}
        <div className="w-[40%] h-full border-l">
          <LogicPanel
            title="周边信息"
            sections={[
              {
                title: '业务场景',
                content: (
                  <>
                    <p className="font-semibold mb-2">周边信息的价值：</p>
                    <LogicList
                      items={[
                        <>周边交通、景点、美食是用户<strong>选择住宿地点的重要参考</strong></>,
                        <>明确距离和用时，帮助用户<strong>规划行程和交通</strong></>,
                        <>OTA平台展示周边信息，<strong>提升酒店吸引力</strong></>,
                        <>完善的周边信息可减少客人咨询，<strong>降低客服成本</strong></>
                      ]}
                    />
                    <LogicHighlight type="info">
                      <p className="text-sm">
                        <strong>用户行为</strong>：携程数据显示，67%的用户会查看酒店周边信息，
                        尤其关注"到景点的距离"和"交通便利度"。周边信息完善的酒店，转化率提升18%。
                      </p>
                    </LogicHighlight>
                  </>
                )
              },
              {
                title: '功能说明',
                content: (
                  <>
                    <p className="font-semibold mb-2">三大信息分类：</p>
                    <LogicTable
                      headers={['分类', '典型内容', '用途']}
                      rows={[
                        ['交通', '机场、火车站、地铁站、汽车站', '帮助客人规划到店交通'],
                        ['景点', '著名景区、网红打卡点、自然风光', '展示门店位置优势，吸引游客'],
                        ['逛吃', '餐厅、商场、夜市、咖啡厅', '满足客人餐饮和购物需求']
                      ]}
                    />

                    <p className="font-semibold mt-4 mb-2">距离类型说明：</p>
                    <LogicList items={[
                      <><strong>驾驶距离</strong>：开车到达的距离，适用于机场、火车站、远处景点</>,
                      <><strong>步行距离</strong>：步行可达的距离，适用于附近餐厅、商场、地铁站</>
                    ]} />

                    <LogicHighlight type="success">
                      <p className="text-sm">
                        <strong>设计理念</strong>：提供距离（公里）+ 用时（分钟），
                        帮助客人准确评估交通成本，避免"看起来很近，实际很远"的误解。
                      </p>
                    </LogicHighlight>
                  </>
                )
              },
              {
                title: '操作指南',
                content: (
                  <>
                    <p className="font-semibold mb-2">如何添加周边信息：</p>
                    <LogicList items={[
                      '选择分类（交通/景点/逛吃），点击"添加"按钮',
                      '填写地点名称（如"杭州萧山国际机场"）',
                      '选择距离类型（驾驶距离/步行距离）',
                      '填写距离（公里）和用时（分钟）',
                      '点击"保存周边信息"保存配置'
                    ]} />

                    <p className="font-semibold mt-4 mb-2">如何获取准确距离和用时：</p>
                    <LogicList items={[
                      '打开高德地图或百度地图',
                      '输入起点（门店地址）和终点（目标地点）',
                      '选择交通方式（驾车/步行），查看距离和用时',
                      '将数据填入系统（建议四舍五入，如6.8km记为7km）'
                    ]} />

                    <p className="font-semibold mt-4 mb-2">旅游交通图上传：</p>
                    <LogicList items={[
                      '可上传包含周边景点、交通的手绘地图或标注地图',
                      '图片建议尺寸：1200px宽，清晰可读',
                      '标注门店位置、主要景点、交通枢纽',
                      '可使用美图秀秀、Canva等工具制作'
                    ]} />

                    <LogicHighlight type="warning">
                      <p className="text-sm">
                        <strong>准确性提示</strong>：距离和用时必须准确，误差过大会导致客人投诉。
                        建议实测或使用地图导航软件获取数据，不要凭印象填写。
                      </p>
                    </LogicHighlight>
                  </>
                )
              },
              {
                title: '内容填写建议',
                content: (
                  <>
                    <p className="font-semibold mb-2">交通信息（必填）：</p>
                    <LogicTable
                      headers={['交通枢纽', '距离类型', '示例']}
                      rows={[
                        ['机场', '驾驶距离', '离杭州萧山国际机场约45公里，驾车约60分钟'],
                        ['火车站', '驾驶距离', '离桐庐火车站约15公里，驾车约25分钟'],
                        ['地铁站', '步行距离', '离地铁1号线XX站约1.5公里，步行约20分钟'],
                        ['汽车站', '驾驶距离', '离桐庐汽车站约18公里，驾车约30分钟']
                      ]}
                    />

                    <p className="font-semibold mt-4 mb-2">景点信息（重点）：</p>
                    <LogicList items={[
                      '优先填写5A/4A级景区（如西湖、千岛湖）',
                      '添加网红打卡点（如Instagram热门景点）',
                      '注明景点特色（如"观日出最佳地点"）',
                      '距离门店20公里以内的景点最有价值'
                    ]} />

                    <p className="font-semibold mt-4 mb-2">逛吃信息（加分项）：</p>
                    <LogicList items={[
                      '附近的特色餐厅（如"XX农家乐，当地特色菜"）',
                      '购物场所（如"XX商场，步行10分钟"）',
                      '便利设施（如"24小时便利店，步行5分钟"）',
                      '夜市、小吃街（适合吃货客群）'
                    ]} />

                    <LogicHighlight type="success">
                      <p className="text-sm">
                        <strong>最佳实践</strong>：每个分类至少填写3-5个地点，
                        突出门店的位置优势。如门店靠近景区，重点填写景点信息；
                        如位于市中心，重点填写交通和购物信息。
                      </p>
                    </LogicHighlight>
                  </>
                )
              },
              {
                title: '最佳实践',
                content: (
                  <>
                    <p className="font-semibold mb-2">OTA平台的周边信息要求：</p>
                    <LogicList items={[
                      <><strong>携程</strong>：必须填写到机场/火车站的距离，否则影响搜索排名</>,
                      <><strong>美团</strong>：推荐填写周边美食信息，与"团购+住宿"联动</>,
                      <><strong>飞猪</strong>：支持周边景点筛选，未填写的无法被搜索到</>,
                      <>所有平台：距离信息必须准确，虚假标注会被投诉</>
                    ]} />

                    <p className="font-semibold mt-4 mb-2">周边信息完善度检查清单：</p>
                    <LogicList items={[
                      '✓ 交通信息：至少填写机场、火车站、地铁/汽车站',
                      '✓ 景点信息：填写3-5个知名景点或网红打卡点',
                      '✓ 逛吃信息：填写2-3个特色餐厅或购物场所',
                      '✓ 距离和用时准确，使用地图工具验证',
                      '✓ 旅游交通图已上传，标注清晰易读'
                    ]} />

                    <LogicHighlight type="success">
                      <p className="text-sm">
                        <strong>优化建议</strong>：定期更新周边信息，如新开通地铁线、新增景点等。
                        可参考携程、美团上同地区高分酒店的周边信息写法，学习经验。
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
