import { Form } from '@remix-run/react'
import type { ExtraBedPolicy } from './types/hotel-backend.types'
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import MainLayout from '../PointsSystem/components/MainLayout'
import LogicPanel, { LogicTable, LogicList, LogicHighlight } from '~/pages/PointsSystem/components/LogicPanel'

interface StoreExtraBedPageProps {
  policy: ExtraBedPolicy
  roomTypes: Array<{ id: string; name: string;院: string }>
}

export default function StoreExtraBedPage({ policy, roomTypes }: StoreExtraBedPageProps) {
  return (
    <MainLayout>
      <div className="flex h-full">
        {/* 左侧：实际后台界面 (60%) */}
        <div className="w-[60%] h-full overflow-y-auto bg-slate-50 p-6">
        <div className="space-y-6">
        <h1 className="text-2xl font-bold">加床政策</h1>

        <div className="grid grid-cols-[400px,1fr] gap-6">
          {/* 左侧:规则配置 */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex justify-between">
                  <CardTitle>加床收费规则</CardTitle>
                  <Button size="sm" variant="outline">+ 增加</Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex gap-2 items-center pb-2 border-b font-medium text-slate-600">
                    <div className="w-16">按年龄定价</div>
                    <div className="w-20">收费标准</div>
                    <div className="w-16">固定金额</div>
                    <div className="w-20">每次入住</div>
                    <div className="flex-1">200元</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex justify-between">
                  <CardTitle>加婴儿床收费规则</CardTitle>
                  <Button size="sm" variant="outline">+ 增加</Button>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-slate-500">暂无规则</p>
              </CardContent>
            </Card>
          </div>

          {/* 右侧:房型配置 */}
          <Card>
            <CardHeader>
              <CardTitle>房型加床配置</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-1">
                <div className="grid grid-cols-[2fr,2fr,2fr] gap-3 pb-2 border-b text-sm font-medium text-slate-600">
                  <div>房型</div>
                  <div>加床</div>
                  <div>婴儿床</div>
                </div>

                {roomTypes.map((rt) => (
                  <div key={rt.id} className="grid grid-cols-[2fr,2fr,2fr] gap-3 py-3 border-b items-center">
                    <div className="text-sm">
                      {rt.name} 【{rt.院}】
                    </div>
                    <select className="px-2 py-1 border rounded text-sm text-slate-400">
                      <option>不提供出加床</option>
                      <option>提供1张</option>
                      <option>提供2张</option>
                    </select>
                    <select className="px-2 py-1 border rounded text-sm text-slate-400">
                      <option>不提供加婴儿床</option>
                      <option>提供1张</option>
                    </select>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
        </div>
        </div>

        {/* 右侧：产品&业务逻辑说明 (40%) */}
        <div className="w-[40%] h-full border-l">
          <LogicPanel
            title="加床政策"
            sections={[
              {
                title: '业务场景',
                content: (
                  <>
                    <p className="font-semibold mb-2">加床服务的必要性：</p>
                    <LogicList
                      items={[
                        <>家庭出游、朋友结伴常需要<strong>加床/婴儿床服务</strong></>,
                        <>加床政策影响房间可容纳人数，直接影响<strong>订单转化</strong></>,
                        <>明确加床收费规则，避免客人到店后的<strong>价格争议</strong></>,
                        <>OTA平台要求标注加床政策，影响<strong>搜索和推荐</strong></>
                      ]}
                    />
                    <LogicHighlight type="info">
                      <p className="text-sm">
                        <strong>用户需求</strong>：携程数据显示，38%的家庭订单会询问加床服务，
                        明确标注加床政策的酒店，家庭客群预订量提升22%。
                      </p>
                    </LogicHighlight>
                  </>
                )
              },
              {
                title: '功能说明',
                content: (
                  <>
                    <p className="font-semibold mb-2">加床政策配置逻辑：</p>
                    <LogicList items={[
                      '左侧：配置加床/婴儿床的收费规则（按年龄、固定金额等）',
                      '右侧：为每个房型配置可提供的加床/婴儿床数量',
                      '前端展示：客人预订时根据房型和人数自动计算加床费用',
                      '到店确认：前台根据配置收取加床费用'
                    ]} />

                    <p className="font-semibold mt-4 mb-2">两类加床服务：</p>
                    <LogicTable
                      headers={['类型', '适用对象', '收费建议']}
                      rows={[
                        ['加床', '成人或大龄儿童', '按年龄定价，或固定金额（如200元/次）'],
                        ['婴儿床', '婴幼儿（0-3岁）', '通常免费提供，体现酒店人文关怀']
                      ]}
                    />

                    <LogicHighlight type="success">
                      <p className="text-sm">
                        <strong>设计理念</strong>：加床政策要灵活可配，
                        支持按年龄、按人数、固定金额等多种收费方式，适配不同酒店的运营策略。
                      </p>
                    </LogicHighlight>
                  </>
                )
              },
              {
                title: '操作指南',
                content: (
                  <>
                    <p className="font-semibold mb-2">配置加床收费规则：</p>
                    <LogicList items={[
                      '点击"加床收费规则"区域的"增加"按钮',
                      '选择定价方式：按年龄定价（如6-12岁）',
                      '选择收费标准：固定金额（如200元/次入住）',
                      '保存后，该规则会应用到所有配置了加床的房型'
                    ]} />

                    <p className="font-semibold mt-4 mb-2">为房型配置加床数量：</p>
                    <LogicList items={[
                      '在右侧"房型加床配置"区域，查看所有房型列表',
                      '为每个房型选择"提供X张加床"（0-2张）',
                      '为每个房型选择"提供X张婴儿床"（0-1张）',
                      '不同房型可配置不同数量，根据房间大小灵活设置'
                    ]} />

                    <LogicHighlight type="warning">
                      <p className="text-sm">
                        <strong>安全提示</strong>：加床数量要符合消防规范，
                        不能为了多收费而过度加床，影响客人安全和舒适度。建议最多加1-2张床。
                      </p>
                    </LogicHighlight>
                  </>
                )
              },
              {
                title: '最佳实践',
                content: (
                  <>
                    <p className="font-semibold mb-2">加床收费建议：</p>
                    <LogicTable
                      headers={['收费方式', '适用场景', '示例']}
                      rows={[
                        ['固定金额', '所有加床统一收费', '每次入住加床费200元'],
                        ['按年龄定价', '儿童加床优惠', '0-6岁免费，7-12岁半价100元，13岁以上全价200元'],
                        ['按天数收费', '长住客人优惠', '每天加床费50元×入住天数']
                      ]}
                    />

                    <p className="font-semibold mt-4 mb-2">婴儿床服务建议：</p>
                    <LogicList items={[
                      '婴儿床建议免费提供（0-3岁），体现酒店人文关怀',
                      '确保婴儿床符合安全标准（稳固、无尖角、围栏高度足够）',
                      '配备婴儿床专用床品（小被子、小枕头）',
                      '提前告知客人婴儿床数量有限，需提前预约'
                    ]} />

                    <LogicHighlight type="success">
                      <p className="text-sm">
                        <strong>优化建议</strong>：加床服务是家庭客群的刚需，
                        建议配置充足的加床和婴儿床，提升家庭客群满意度。
                        参考携程、美团上家庭友好型酒店的加床政策。
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
