/**
 * 门店设施配置页面
 */

import { useState } from 'react'
import { Form, useNavigation } from '@remix-run/react'
import { FACILITY_CATEGORIES } from './constants/facilities'
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card'
import { Button } from '~/components/ui/button'
import MainLayout from '../PointsSystem/components/MainLayout'
import LogicPanel, { LogicTable, LogicList, LogicHighlight } from '~/pages/PointsSystem/components/LogicPanel'

interface StoreFacilitiesPageProps {
  selectedFacilities: string[]
}

export default function StoreFacilitiesPage({ selectedFacilities }: StoreFacilitiesPageProps) {
  const navigation = useNavigation()
  const isSubmitting = navigation.state === 'submitting'
  const [selected, setSelected] = useState<string[]>(selectedFacilities)

  const toggleFacility = (facility: string) => {
    setSelected((prev) =>
      prev.includes(facility)
        ? prev.filter((f) => f !== facility)
        : [...prev, facility]
    )
  }

  const selectAllInCategory = (categoryOptions: string[]) => {
    const allSelected = categoryOptions.every((opt) => selected.includes(opt))
    if (allSelected) {
      // 取消全选
      setSelected((prev) => prev.filter((f) => !categoryOptions.includes(f)))
    } else {
      // 全选
      const newSelected = [...new Set([...selected, ...categoryOptions])]
      setSelected(newSelected)
    }
  }

  return (
    <MainLayout>
      <div className="flex h-full">
        {/* 左侧：实际后台界面 (60%) */}
        <div className="w-[60%] h-full overflow-y-auto bg-slate-50 p-6">
        <div className="space-y-6 max-w-7xl">
        {/* 页面标题 */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">门店设施</h1>
            <p className="text-sm text-slate-500 mt-1">
              配置门店拥有的设施和服务,已选择 {selected.length} 项
            </p>
          </div>
        </div>

        <Form method="post">
          <div className="space-y-6">
            {FACILITY_CATEGORIES.map((category) => {
              const categorySelected = category.options.filter((opt) =>
                selected.includes(opt)
              ).length
              const isAllSelected = categorySelected === category.options.length

              return (
                <Card key={category.key}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle>
                          {category.name}
                          <span className="ml-3 text-sm font-normal text-slate-500">
                            已选 {categorySelected} / {category.options.length}
                          </span>
                        </CardTitle>
                        {category.note && (
                          <p className="text-sm text-red-500 mt-1">{category.note}</p>
                        )}
                      </div>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => selectAllInCategory(category.options)}
                      >
                        {isAllSelected ? '取消全选' : '全选'}
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-6 gap-3">
                      {category.options.map((option) => (
                        <label
                          key={option}
                          className={`flex items-center gap-2 px-3 py-2 border rounded cursor-pointer transition-colors ${
                            selected.includes(option)
                              ? 'bg-blue-50 border-blue-500 text-blue-700'
                              : 'bg-white border-slate-300 hover:bg-slate-50'
                          }`}
                          onClick={() => toggleFacility(option)}
                        >
                          <input
                            type="checkbox"
                            name="facilities"
                            value={option}
                            checked={selected.includes(option)}
                            onChange={() => {}} // 由onClick处理
                            className="w-4 h-4"
                          />
                          <span className="text-sm">{option}</span>
                        </label>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {/* 保存按钮 */}
          <div className="flex justify-end mt-6">
            <Button type="submit" size="lg" disabled={isSubmitting}>
              {isSubmitting ? '保存中...' : '保存设施配置'}
            </Button>
          </div>
        </Form>
        </div>
        </div>

        {/* 右侧：产品&业务逻辑说明 (40%) */}
        <div className="w-[40%] h-full border-l">
          <LogicPanel
            title="门店设施"
            sections={[
              {
                title: '业务场景',
                content: (
                  <>
                    <p className="font-semibold mb-2">门店设施信息的重要性：</p>
                    <LogicList
                      items={[
                        <>门店设施是用户选择酒店的<strong>关键决策因素</strong>（WiFi、停车、早餐等）</>,
                        <>OTA平台根据设施标签进行<strong>筛选和推荐</strong>（如"有停车场的酒店"）</>,
                        <>完善的设施信息可提升<strong>搜索排名和曝光率</strong></>,
                        <>真实准确的设施标注可减少<strong>客诉和差评</strong></>
                      ]}
                    />
                    <LogicHighlight type="warning">
                      <p className="text-sm">
                        <strong>法律风险</strong>：虚假标注设施（如明明没有停车场却勾选）属于虚假宣传，
                        客人可要求退款并投诉。某民宿因虚假标注"免费WiFi"被罚款的案例屡见不鲜。
                      </p>
                    </LogicHighlight>
                  </>
                )
              },
              {
                title: '功能说明',
                content: (
                  <>
                    <p className="font-semibold mb-2">设施分类逻辑：</p>
                    <LogicList items={[
                      '设施按类别分组（通用设施、客房设施、活动设施、服务设施等）',
                      '每个类别显示已选数量，方便查看配置完整度',
                      '支持分类全选/取消全选，提升配置效率',
                      '页面顶部显示总共已选设施数量'
                    ]} />

                    <p className="font-semibold mt-4 mb-2">常见设施分类：</p>
                    <LogicTable
                      headers={['分类', '典型设施', '重要度']}
                      rows={[
                        ['通用设施', 'WiFi、停车场、餐厅、电梯', '★★★（必选）'],
                        ['客房设施', '空调、暖气、热水、24小时热水', '★★★（必选）'],
                        ['媒体科技', '有线频道、卫星频道、电视', '★★（推荐）'],
                        ['餐饮服务', '餐厅、酒吧、咖啡厅', '★★（推荐）'],
                        ['活动设施', '游戏室、健身室、KTV', '★（加分项）'],
                        ['儿童设施', '儿童乐园、儿童餐椅', '★（特定客群）']
                      ]}
                    />

                    <LogicHighlight type="info">
                      <p className="text-sm">
                        <strong>行业参考</strong>：携程数据显示，标注"免费WiFi"的酒店点击率提升30%，
                        "停车场"提升20%，"早餐"提升15%。这三项是用户最关注的设施。
                      </p>
                    </LogicHighlight>
                  </>
                )
              },
              {
                title: '操作指南',
                content: (
                  <>
                    <p className="font-semibold mb-2">如何配置设施：</p>
                    <LogicList items={[
                      '浏览各个分类，勾选门店实际拥有的设施',
                      '使用"全选"按钮快速勾选整个分类的设施',
                      '页面顶部显示已选设施总数，确保配置充分',
                      '点击"保存设施配置"按钮保存更改'
                    ]} />

                    <p className="font-semibold mt-4 mb-2">必选设施清单（建议100%勾选）：</p>
                    <LogicList items={[
                      '免费WiFi（现代酒店必备，客人首要需求）',
                      '停车场（自驾游客群关注，即使是付费停车也要标注）',
                      '空调/暖气（根据地区气候选择）',
                      '24小时热水（基本卫生需求）',
                      '电梯（如为多层建筑）'
                    ]} />

                    <p className="font-semibold mt-4 mb-2">差异化设施（提升竞争力）：</p>
                    <LogicList items={[
                      '特色餐厅、咖啡厅（提升住宿体验）',
                      '健身房、瑜伽室（健康客群关注）',
                      '会议室（商务客群需求）',
                      '洗衣服务、行李寄存（便利服务）',
                      '接送机服务（高端客群需求）'
                    ]} />

                    <LogicHighlight type="success">
                      <p className="text-sm">
                        <strong>最佳实践</strong>：参考携程、美团上同类型酒店的设施配置，
                        确保自己的门店不落后。至少勾选20-30项设施，覆盖基本需求+差异化卖点。
                      </p>
                    </LogicHighlight>
                  </>
                )
              },
              {
                title: '设施诚信原则',
                content: (
                  <>
                    <p className="font-semibold mb-2">只勾选真实拥有的设施：</p>
                    <LogicList items={[
                      '虚假标注设施会导致客人到店后失望，产生差评',
                      '严重虚假标注可能被OTA平台处罚或下架',
                      '客人可要求退款并投诉，损失更大'
                    ]} />

                    <p className="font-semibold mt-4 mb-2">常见虚假标注案例：</p>
                    <LogicTable
                      headers={['虚假标注', '实际情况', '后果']}
                      rows={[
                        ['免费WiFi', 'WiFi信号差或经常断线', '客人差评："WiFi根本用不了"'],
                        ['停车场', '门口路边停车，不是专用停车场', '客人投诉："没有停车位"'],
                        ['健身房', '只有2台跑步机的小房间', '客人失望："这也算健身房？"'],
                        ['餐厅', '外包的小餐馆，不在酒店内', '客人抱怨："还要走出去吃饭"']
                      ]}
                    />

                    <LogicHighlight type="warning">
                      <p className="text-sm">
                        <strong>诚信建议</strong>：宁可少标注，也不要虚假标注。
                        如果设施不够完善（如WiFi信号一般），可在门店介绍中说明"部分区域WiFi信号较弱"，
                        提前告知客人，反而能获得谅解。
                      </p>
                    </LogicHighlight>
                  </>
                )
              },
              {
                title: '最佳实践',
                content: (
                  <>
                    <p className="font-semibold mb-2">OTA平台的设施要求：</p>
                    <LogicList items={[
                      <><strong>携程</strong>：至少勾选20项设施，必须包含WiFi、停车、空调</>,
                      <><strong>美团</strong>：设施完整度影响搜索排名，建议勾选30项以上</>,
                      <><strong>飞猪</strong>：支持设施筛选功能，未勾选的设施无法被搜索到</>,
                      <>所有平台：虚假标注会被客人投诉，多次投诉会被处罚或下架</>
                    ]} />

                    <p className="font-semibold mt-4 mb-2">设施配置检查清单：</p>
                    <LogicList items={[
                      '✓ 通用设施（WiFi、停车、餐厅等）已勾选',
                      '✓ 客房设施（空调、热水、电视等）已勾选',
                      '✓ 特色设施（健身房、会议室等）如有则勾选',
                      '✓ 所有勾选的设施真实存在，无虚假标注',
                      '✓ 已勾选设施数量≥20项，信息充分',
                      '✓ 与竞争对手的设施配置对比，不落后'
                    ]} />

                    <LogicHighlight type="success">
                      <p className="text-sm">
                        <strong>优化建议</strong>：定期review设施配置，根据门店升级情况及时更新。
                        新增设施（如健身房、儿童乐园）要及时勾选，提升竞争力。
                        参考携程商家学院的《门店设施优化指南》。
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
