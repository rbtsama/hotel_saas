import { useState, useEffect } from 'react'
import { Form, useFetcher } from '@remix-run/react'
import type { PMSIntegrationConfig } from './types/pmsIntegration.types'
import { PMS_PROVIDERS } from './types/pmsIntegration.types'
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card'
import { Input } from '~/components/ui/input'
import { Button } from '~/components/ui/button'
import { Label } from '~/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '~/components/ui/select'
import { RadioGroup, RadioGroupItem } from '~/components/ui/radio-group'
import MainLayout from '~/pages/PointsSystem/components/MainLayout'
import LogicPanel, { LogicTable, LogicList, LogicHighlight, LogicCode } from '~/pages/PointsSystem/components/LogicPanel'

interface PMSIntegrationPageProps {
  config: PMSIntegrationConfig | null
  error: string | null
}

export default function PMSIntegrationPage({ config: initialConfig, error }: PMSIntegrationPageProps) {
  const [isPMSEnabled, setIsPMSEnabled] = useState(initialConfig?.isPMSEnabled ?? false)
  const [pmsProvider, setPmsProvider] = useState(initialConfig?.pmsProvider ?? 'order-coming')
  const [pmsStoreId, setPmsStoreId] = useState(initialConfig?.pmsStoreId ?? '')
  const [mappings, setMappings] = useState(initialConfig?.roomTypeMappings ?? [])
  const fetcher = useFetcher()

  useEffect(() => {
    if (initialConfig) {
      setIsPMSEnabled(initialConfig.isPMSEnabled)
      setPmsProvider(initialConfig.pmsProvider ?? 'order-coming')
      setPmsStoreId(initialConfig.pmsStoreId ?? '')
      setMappings(initialConfig.roomTypeMappings)
    }
  }, [initialConfig])

  const handleSaveConfig = () => {
    const formData = new FormData()
    formData.append('intent', 'updateConfig')
    formData.append('isPMSEnabled', String(isPMSEnabled))
    if (isPMSEnabled) {
      formData.append('pmsProvider', pmsProvider)
      formData.append('pmsStoreId', pmsStoreId)
    }
    fetcher.submit(formData, { method: 'post' })
  }

  const handleSyncPMS = () => {
    const formData = new FormData()
    formData.append('intent', 'syncPMS')
    formData.append('pmsStoreId', pmsStoreId)
    fetcher.submit(formData, { method: 'post' })
  }

  const handleMappingChange = (mappingId: string, newPmsName: string) => {
    setMappings(prev =>
      prev.map(m => (m.id === mappingId ? { ...m, pmsRoomTypeName: newPmsName } : m))
    )
  }

  if (error) {
    return (
      <MainLayout>
        <div className="p-6">
          <div className="text-destructive">错误: {error}</div>
        </div>
      </MainLayout>
    )
  }

  return (
    <MainLayout>
      <div className="flex h-full">
        {/* 左侧：实际后台界面 (60%) */}
        <div className="w-[60%] h-full overflow-y-auto p-6 bg-background">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>PMS对接配置</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* 是否对接PMS */}
                <div className="space-y-3">
                  <Label className="text-base font-medium">是否对接PMS?</Label>
                  <RadioGroup
                    value={isPMSEnabled ? 'yes' : 'no'}
                    onValueChange={(value) => setIsPMSEnabled(value === 'yes')}
                    className="flex gap-6"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no" id="pms-no" />
                      <Label htmlFor="pms-no" className="font-normal cursor-pointer">否</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="yes" id="pms-yes" />
                      <Label htmlFor="pms-yes" className="font-normal cursor-pointer">是</Label>
                    </div>
                  </RadioGroup>
                </div>

                {/* PMS配置（仅在启用时显示） */}
                {isPMSEnabled && (
                  <>
                    {/* 选择对接的PMS */}
                    <div className="space-y-2">
                      <Label className="text-base font-medium">选择对接的PMS:</Label>
                      <Select value={pmsProvider} onValueChange={setPmsProvider}>
                        <SelectTrigger className="max-w-md">
                          <SelectValue placeholder="请选择PMS系统" />
                        </SelectTrigger>
                        <SelectContent>
                          {PMS_PROVIDERS.map((provider) => (
                            <SelectItem key={provider.value} value={provider.value}>
                              {provider.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* 输入PMS门店ID */}
                    <div className="space-y-2">
                      <Label className="text-base font-medium">
                        <span className="text-destructive mr-1">*</span>
                        输入在PMS里的门店ID:
                      </Label>
                      <div className="flex gap-3 max-w-2xl">
                        <Input
                          value={pmsStoreId}
                          onChange={(e) => setPmsStoreId(e.target.value)}
                          placeholder="请输入门店ID"
                          className="flex-1"
                        />
                        <Button onClick={handleSyncPMS} disabled={!pmsStoreId || fetcher.state !== 'idle'}>
                          {fetcher.state === 'submitting' ? '同步中...' : '保存并刷新房型信息'}
                        </Button>
                      </div>
                    </div>

                    {/* 房型映射列表 */}
                    {mappings.length > 0 && (
                      <div className="space-y-4 pt-6 border-t">
                        <div className="grid grid-cols-2 gap-8">
                          <div>
                            <h3 className="text-sm font-medium text-muted-foreground mb-3">小而美房型名称</h3>
                          </div>
                          <div>
                            <h3 className="text-sm font-medium text-muted-foreground mb-3">PMS房型名称</h3>
                          </div>
                        </div>

                        <div className="space-y-4">
                          {mappings.map((mapping) => (
                            <div key={mapping.id} className="grid grid-cols-2 gap-8 items-center">
                              <div className="py-2.5 px-3 bg-muted/50 rounded-md">
                                <span className="text-sm">{mapping.localRoomTypeName}</span>
                              </div>
                              <div>
                                <Select
                                  value={mapping.pmsRoomTypeName}
                                  onValueChange={(value) => handleMappingChange(mapping.id, value)}
                                >
                                  <SelectTrigger>
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value={mapping.localRoomTypeName}>
                                      {mapping.localRoomTypeName}
                                    </SelectItem>
                                    {/* 可以添加其他PMS房型选项 */}
                                    {mapping.pmsRoomTypeName !== mapping.localRoomTypeName && (
                                      <SelectItem value={mapping.pmsRoomTypeName}>
                                        {mapping.pmsRoomTypeName}
                                      </SelectItem>
                                    )}
                                  </SelectContent>
                                </Select>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </>
                )}

                {/* 保存设置按钮 */}
                <div className="pt-4">
                  <Button
                    onClick={handleSaveConfig}
                    disabled={fetcher.state !== 'idle'}
                    size="lg"
                  >
                    {fetcher.state === 'submitting' ? '保存中...' : '保存设置'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* 右侧：产品&业务逻辑说明 (40%) */}
        <div className="w-[40%] h-full border-l">
          <LogicPanel
            title="PMS对接"
            sections={[
              {
                title: '业务场景',
                content: (
                  <>
                    <p className="font-semibold mb-2">什么是PMS系统？</p>
                    <p className="mb-3">
                      PMS (Property Management System) 是<strong>酒店管理系统</strong>，
                      酒店用它来管理日常运营：房态、订单、入住/退房、财务报表等。
                    </p>
                    <p className="mb-3">
                      市面上常见的PMS：<strong>订单来了</strong>、<strong>云PMS</strong>、
                      <strong>酒店大师</strong>、<strong>西软</strong>、<strong>别样红</strong>等。
                    </p>

                    <p className="font-semibold mt-4 mb-2">为什么需要PMS对接？</p>
                    <LogicList
                      items={[
                        <>酒店同时在<strong>多个渠道</strong>销售房间（小而美、美团、携程、飞猪等）</>,
                        <>如果不对接PMS，就要在<strong>每个渠道手动维护库存</strong>，容易出错</>,
                        <>对接后可实现<strong>库存实时同步</strong>，避免超售或少卖</>,
                        <>订单也能自动同步到PMS，前台可以直接办理入住</>
                      ]}
                    />

                    <LogicHighlight type="warning">
                      <p className="text-sm">
                        <strong>真实案例</strong>：某民宿在美团卖了10间房，在携程也卖了10间房，
                        但实际只有12间房。因为没有对接PMS导致超售，最后赔偿客人损失+平台罚款共2万元。
                      </p>
                    </LogicHighlight>
                  </>
                )
              },
              {
                title: 'PMS对接价值',
                content: (
                  <>
                    <p className="font-semibold mb-2">对接后能解决什么问题？</p>

                    <p className="font-semibold mt-3 mb-2">1. 库存同步（最核心）</p>
                    <LogicList
                      items={[
                        '小而美平台卖出1间房 → 自动扣减PMS库存 → 其他渠道（美团/携程）的库存也同步减少',
                        '避免超售：同一间房不会在多个平台重复销售',
                        '避免少卖：房间空闲时，所有渠道都能正常预订'
                      ]}
                    />

                    <p className="font-semibold mt-3 mb-2">2. 订单同步</p>
                    <LogicList
                      items={[
                        '小而美的订单自动同步到PMS，前台可以直接看到',
                        '入住时不需要客人出示订单截图，前台系统里已经有记录',
                        '退房后的账单也能自动回传到小而美'
                      ]}
                    />

                    <p className="font-semibold mt-3 mb-2">3. 房价同步（部分PMS支持）</p>
                    <LogicList
                      items={[
                        'PMS里修改房价 → 自动同步到小而美平台',
                        '节假日涨价、淡季降价都能自动更新',
                        '不需要在每个渠道单独改价'
                      ]}
                    />

                    <LogicHighlight type="success">
                      <p className="text-sm">
                        <strong>价值量化</strong>：对接PMS后，运营人员每天节省<strong>1-2小时</strong>的手动库存维护时间，
                        超售率从5%降低到<strong>0.5%以下</strong>，客诉率下降<strong>80%</strong>。
                      </p>
                    </LogicHighlight>
                  </>
                )
              },
              {
                title: '对接流程',
                content: (
                  <>
                    <p className="font-semibold mb-2">如何配置PMS对接？</p>

                    <p className="font-semibold mt-3 mb-2">第一步：选择是否对接</p>
                    <LogicList
                      items={[
                        '如果酒店已经使用PMS系统 → 选择"是"',
                        '如果是小规模酒店、没有PMS → 选择"否"（手动管理库存）'
                      ]}
                    />

                    <p className="font-semibold mt-3 mb-2">第二步：选择PMS系统</p>
                    <LogicList
                      items={[
                        '从下拉菜单选择酒店正在使用的PMS（订单来了、云PMS、酒店大师等）',
                        '如果没有酒店的PMS，可以联系客服添加'
                      ]}
                    />

                    <p className="font-semibold mt-3 mb-2">第三步：输入门店ID</p>
                    <LogicList
                      items={[
                        '在PMS系统里找到门店ID（通常在"门店管理"或"基本信息"里）',
                        '输入到小而美平台，点击"保存并刷新房型信息"',
                        '系统会自动从PMS拉取房型列表'
                      ]}
                    />

                    <p className="font-semibold mt-3 mb-2">第四步：房型映射</p>
                    <LogicList
                      items={[
                        '小而美的房型名称可能和PMS里的不完全一致',
                        '需要手动选择对应关系（例如："豪华大床房" 对应 PMS 里的 "deluxe-king"）',
                        '映射完成后，库存和订单就能正确同步了'
                      ]}
                    />

                    <LogicHighlight type="info">
                      <p className="text-sm">
                        <strong>技术提示</strong>：点击"保存并刷新房型信息"时，系统会调用PMS的API接口
                        （例如：GET /api/v1/hotels/&#123;storeId&#125;/room-types），获取房型列表并自动创建映射关系。
                      </p>
                    </LogicHighlight>
                  </>
                )
              },
              {
                title: '房型映射逻辑',
                content: (
                  <>
                    <p className="font-semibold mb-2">为什么需要房型映射？</p>
                    <p className="mb-3">
                      小而美平台的房型名称是<strong>面向用户</strong>的（例如："豪华海景大床房"），
                      而PMS里的房型名称通常是<strong>内部代码</strong>（例如："deluxe-ocean-king"）。
                      需要建立映射关系，系统才知道这两个名称指的是同一个房型。
                    </p>

                    <p className="font-semibold mt-4 mb-2">映射规则：</p>
                    <LogicTable
                      headers={['小而美房型名称', 'PMS房型名称', '说明']}
                      rows={[
                        ['豪华大床房', 'deluxe-king', '通过下拉菜单手动选择'],
                        ['豪华双床房', 'deluxe-twin', '支持模糊匹配（自动推荐）'],
                        ['标准大床房', 'standard-king', '映射后不可修改房型名称']
                      ]}
                    />

                    <p className="font-semibold mt-4 mb-2">映射完成后会发生什么？</p>
                    <LogicList
                      items={[
                        '库存同步：小而美平台的"豪华大床房"库存 = PMS里"deluxe-king"的库存',
                        '订单同步：用户预订"豪华大床房" → PMS里显示"deluxe-king"订单',
                        '房价同步：PMS修改"deluxe-king"价格 → 小而美"豪华大床房"价格自动更新'
                      ]}
                    />

                    <LogicHighlight type="warning">
                      <p className="text-sm">
                        <strong>注意</strong>：映射关系一旦保存，不建议频繁修改。如果修改，需要重新同步历史订单，
                        可能导致数据混乱。如果房型名称确实需要调整，建议先完成所有在住订单后再操作。
                      </p>
                    </LogicHighlight>
                  </>
                )
              },
              {
                title: '常见PMS系统',
                content: (
                  <>
                    <p className="font-semibold mb-2">市面上主流的PMS系统：</p>

                    <p className="font-semibold mt-3 mb-2">1. 订单来了</p>
                    <LogicList
                      items={[
                        '市场占有率最高的云PMS，适合中小型酒店和民宿',
                        '功能全面：房态、订单、财务、会员、营销',
                        'API接口完善，对接难度低',
                        '门店ID格式：8位数字（例如：12345678）'
                      ]}
                    />

                    <p className="font-semibold mt-3 mb-2">2. 云PMS</p>
                    <LogicList
                      items={[
                        '携程旗下的PMS，适合与携程深度合作的酒店',
                        '特点：与携程订单无缝对接',
                        '门店ID格式：hotel-开头（例如：hotel-sh-001）'
                      ]}
                    />

                    <p className="font-semibold mt-3 mb-2">3. 酒店大师</p>
                    <LogicList
                      items={[
                        '老牌PMS厂商，适合连锁酒店集团',
                        '功能强大但操作复杂，学习成本高',
                        '门店ID格式：UUID（例如：a1b2c3d4-e5f6-7890）'
                      ]}
                    />

                    <p className="font-semibold mt-3 mb-2">4. 西软、别样红等</p>
                    <LogicList
                      items={[
                        '区域性PMS，在特定省份市场份额较高',
                        '功能基础，价格便宜，适合单体酒店',
                        'API接口不统一，对接需要定制开发'
                      ]}
                    />

                    <LogicHighlight type="info">
                      <p className="text-sm">
                        <strong>选择建议</strong>：如果酒店还没有PMS系统，推荐使用<strong>订单来了</strong>。
                        理由：功能完善、价格适中（年费3000-8000元）、对接渠道多（支持美团/携程/飞猪等）。
                      </p>
                    </LogicHighlight>
                  </>
                )
              },
              {
                title: '风险提示',
                content: (
                  <>
                    <p className="font-semibold mb-2">对接PMS可能遇到的问题：</p>

                    <p className="font-semibold mt-3 mb-2">1. 对接失败</p>
                    <LogicTable
                      headers={['失败原因', '解决方案']}
                      rows={[
                        ['门店ID错误', '检查PMS系统里的门店ID是否正确复制'],
                        ['PMS接口异常', '联系PMS厂商确认接口是否正常'],
                        ['网络连接失败', '检查服务器网络，确保能访问PMS的API地址'],
                        ['权限不足', '确保PMS账号有"API对接"权限']
                      ]}
                    />

                    <p className="font-semibold mt-4 mb-2">2. 库存不同步</p>
                    <LogicTable
                      headers={['场景', '处理方案']}
                      rows={[
                        ['小而美卖了房，PMS库存没减少', '检查房型映射是否正确，重新保存映射关系'],
                        ['PMS库存变化，小而美没更新', '检查PMS的"库存推送"功能是否开启'],
                        ['多个渠道库存不一致', '在PMS里手动校准库存，然后点击"全量同步"']
                      ]}
                    />

                    <p className="font-semibold mt-4 mb-2">3. 订单同步延迟</p>
                    <LogicList
                      items={[
                        '正常情况：订单同步延迟<strong>不超过1分钟</strong>',
                        '如果超过5分钟还没同步，检查PMS的"订单推送"配置',
                        '可以在小而美后台手动触发"重新同步订单"'
                      ]}
                    />

                    <LogicHighlight type="warning">
                      <p className="text-sm">
                        <strong>应急预案</strong>：如果PMS系统故障无法对接，<strong>立即关闭所有渠道的销售</strong>，
                        避免超售。等PMS恢复后，手动核对库存和订单，确保数据一致后再开放销售。
                      </p>
                    </LogicHighlight>

                    <p className="font-semibold mt-4 mb-2">4. 数据安全</p>
                    <LogicList
                      items={[
                        'PMS对接需要提供门店ID和API密钥，务必<strong>妥善保管</strong>',
                        '不要将API密钥分享给第三方，避免数据泄露',
                        '定期检查PMS的"API访问日志"，发现异常及时处理'
                      ]}
                    />
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
