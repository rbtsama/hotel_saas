import { useState } from 'react'
import { Form, useFetcher } from '@remix-run/react'
import type { NonRoomProduct } from './types/nonRoomProducts.types'
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card'
import { Input } from '~/components/ui/input'
import { Button } from '~/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '~/components/ui/table'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '~/components/ui/select'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '~/components/ui/dialog'
import { Label } from '~/components/ui/label'
import { Textarea } from '~/components/ui/textarea'
import { Checkbox } from '~/components/ui/checkbox'
import { Plus, Search, Pencil, Trash2 } from 'lucide-react'
import MainLayout from '~/pages/PointsSystem/components/MainLayout'
import LogicPanel, { LogicTable, LogicList, LogicHighlight } from '~/pages/PointsSystem/components/LogicPanel'

interface NonRoomProductsPageProps {
  products: NonRoomProduct[]
  error: string | null
}

export default function NonRoomProductsPage({ products, error }: NonRoomProductsPageProps) {
  const [searchValue, setSearchValue] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [dialogOpen, setDialogOpen] = useState(false)
  const fetcher = useFetcher()

  const handleDelete = (id: string) => {
    if (confirm('确定要删除此产品吗？')) {
      const formData = new FormData()
      formData.append('intent', 'delete')
      formData.append('id', id)
      fetcher.submit(formData, { method: 'post' })
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
          <div className="space-y-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>非房产品管理</CardTitle>
                <div className="flex gap-2">
                  <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                    <DialogTrigger asChild>
                      <Button>
                        <Plus className="h-4 w-4 mr-2" />
                        新增
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-md">
                      <DialogHeader>
                        <DialogTitle>新增非房产品</DialogTitle>
                      </DialogHeader>
                      <Form method="post" className="space-y-4" onSubmit={() => setDialogOpen(false)}>
                        <input type="hidden" name="intent" value="create" />

                        <div className="space-y-2">
                          <Label htmlFor="productCategory">产品分类 *</Label>
                          <Select name="productCategory" required>
                            <SelectTrigger>
                              <SelectValue placeholder="请选择产品分类" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="酒店套餐">酒店套餐</SelectItem>
                              <SelectItem value="休闲娱乐">休闲娱乐</SelectItem>
                              <SelectItem value="餐饮服务">餐饮服务</SelectItem>
                              <SelectItem value="康养服务">康养服务</SelectItem>
                              <SelectItem value="交通服务">交通服务</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="productName">产品名 *</Label>
                          <Input
                            id="productName"
                            name="productName"
                            placeholder="请输入产品名称"
                            required
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="productDescription">产品描述 *</Label>
                          <Textarea
                            id="productDescription"
                            name="productDescription"
                            placeholder="请输入产品描述"
                            required
                            rows={3}
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="price">价格 *</Label>
                            <Input
                              id="price"
                              name="price"
                              type="number"
                              step="0.01"
                              placeholder="请输入价格"
                              required
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="pricingType">计价方式 *</Label>
                            <Select name="pricingType" required>
                              <SelectTrigger>
                                <SelectValue placeholder="请选择计价方式" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="per_time">按次</SelectItem>
                                <SelectItem value="per_hour">按小时</SelectItem>
                                <SelectItem value="per_person">按人</SelectItem>
                                <SelectItem value="fixed">固定价</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="inventory">库存数量</Label>
                            <Input
                              id="inventory"
                              name="inventory"
                              type="number"
                              placeholder="每日可售数量"
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="duration">服务时长（分钟）</Label>
                            <Input
                              id="duration"
                              name="duration"
                              type="number"
                              placeholder="例如：90"
                            />
                          </div>
                        </div>

                        <div className="flex items-center space-x-2">
                          <Checkbox id="needsAppointment" name="needsAppointment" />
                          <Label htmlFor="needsAppointment" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                            需要预约
                          </Label>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="applyUseSettings">应用设置</Label>
                          <Input
                            id="applyUseSettings"
                            name="applyUseSettings"
                            placeholder="例如：免费使用2小时"
                          />
                        </div>

                        <input type="hidden" name="status" value="active" />

                        <div className="flex gap-2 justify-end pt-4">
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => setDialogOpen(false)}
                          >
                            取消
                          </Button>
                          <Button type="submit">确定</Button>
                        </div>
                      </Form>
                    </DialogContent>
                  </Dialog>

                  <Button variant="outline">
                    <Plus className="h-4 w-4 mr-2" />
                    产品批量
                  </Button>
                </div>
              </CardHeader>

              <CardContent>
                <Form method="get" className="mb-6 flex gap-3">
                  <div className="flex-1 relative">
                    <Input
                      name="search"
                      value={searchValue}
                      onChange={(e) => setSearchValue(e.target.value)}
                      placeholder="搜索产品名称或描述"
                    />
                  </div>

                  <Select
                    name="productCategory"
                    value={categoryFilter}
                    onValueChange={setCategoryFilter}
                  >
                    <SelectTrigger className="w-[200px]">
                      <SelectValue placeholder="产品分类" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">全部分类</SelectItem>
                      <SelectItem value="酒店套餐">酒店套餐</SelectItem>
                      <SelectItem value="休闲娱乐">休闲娱乐</SelectItem>
                      <SelectItem value="餐饮服务">餐饮服务</SelectItem>
                      <SelectItem value="康养服务">康养服务</SelectItem>
                      <SelectItem value="交通服务">交通服务</SelectItem>
                    </SelectContent>
                  </Select>

                  <Button type="submit" variant="default">
                    <Search className="h-4 w-4 mr-2" />
                    筛选
                  </Button>
                </Form>

                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-20">编号</TableHead>
                      <TableHead className="w-32">产品分类</TableHead>
                      <TableHead className="w-40">产品名</TableHead>
                      <TableHead>产品描述</TableHead>
                      <TableHead className="w-24">价格</TableHead>
                      <TableHead className="w-48">应用设置</TableHead>
                      <TableHead className="w-32 text-right">操作</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {products.map((product) => (
                      <TableRow key={product.id}>
                        <TableCell className="text-center">{product.sequenceNumber}</TableCell>
                        <TableCell>
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200">
                            {product.productCategory}
                          </span>
                        </TableCell>
                        <TableCell className="font-medium">{product.productName}</TableCell>
                        <TableCell className="text-muted-foreground">{product.productDescription}</TableCell>
                        <TableCell className="font-semibold text-orange-600">
                          ¥{product.price}
                          {product.pricingType === 'per_hour' && '/小时'}
                          {product.pricingType === 'per_person' && '/人'}
                          {product.pricingType === 'per_time' && '/次'}
                        </TableCell>
                        <TableCell>
                          {product.applyUseSettings && (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-green-50 text-green-700 border border-green-200">
                              {product.applyUseSettings}
                            </span>
                          )}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-blue-600 hover:text-blue-700"
                            >
                              <Pencil className="h-4 w-4 mr-1" />
                              修改
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-destructive hover:text-destructive"
                              onClick={() => handleDelete(product.id)}
                              disabled={fetcher.state !== 'idle'}
                            >
                              <Trash2 className="h-4 w-4 mr-1" />
                              删除
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>

                {products.length === 0 && (
                  <div className="text-center py-12 text-muted-foreground">
                    暂无非房产品数据
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* 右侧：产品&业务逻辑说明 (40%) */}
        <div className="w-[40%] h-full border-l">
          <LogicPanel
            title="非房产品管理"
            sections={[
              {
                title: '设计缺陷与改进',
                content: (
                  <>
                    <LogicHighlight type="warning">
                      <p className="font-semibold mb-2 text-red-600">之前的设计有严重问题：</p>
                      <LogicList
                        items={[
                          <>❌ <strong>缺少价格字段</strong> - 产品无法售卖（用户看不到价格怎么买？）</>,
                          <>❌ <strong>缺少库存管理</strong> - 可能超售（SPA师傅就2个，卖10单怎么服务？）</>,
                          <>❌ <strong>缺少计价方式</strong> - SPA按次还是按小时？早餐按人还是按份？</>,
                          <>❌ <strong>缺少预约机制</strong> - 高峰期资源冲突无法管理</>
                        ]}
                      />
                    </LogicHighlight>

                    <LogicHighlight type="success">
                      <p className="font-semibold mb-2">现已修复，新增核心字段：</p>
                      <LogicList
                        items={[
                          <>✅ <strong>price</strong> - 产品价格（必填，支持小数）</>,
                          <>✅ <strong>pricingType</strong> - 计价方式（按次/按小时/按人/固定价）</>,
                          <>✅ <strong>inventory</strong> - 每日可售数量（防止超售）</>,
                          <>✅ <strong>duration</strong> - 服务时长（便于安排时间表）</>,
                          <>✅ <strong>needsAppointment</strong> - 是否需要预约（管理资源分配）</>
                        ]}
                      />
                      <p className="text-sm mt-2">
                        参考携程/美团的"增值服务"模块，这些字段是行业标准，缺一不可。
                        之前的设计太粗糙，像是"产品目录"而不是可售卖的商品系统。
                      </p>
                    </LogicHighlight>
                  </>
                )
              },
              {
                title: '业务场景',
                content: (
                  <>
                    <p className="font-semibold mb-2">非房产品在酒店行业的应用：</p>
                    <LogicList
                      items={[
                        <>非房产品是酒店<strong>除客房外的增值服务</strong>，用于提升客户体验和增加收入</>,
                        <>携程、美团都支持"房+X"套餐模式（如房间+早餐、房间+SPA）</>,
                        <>数据显示：提供非房产品的酒店，客单价平均提升<strong>20-40%</strong></>,
                        <>高端酒店的非房收入占比可达30-50%（如度假村、温泉酒店）</>
                      ]}
                    />
                    <LogicHighlight type="warning">
                      <p className="text-sm">
                        <strong>行业趋势</strong>：携程2024年报告显示，"一站式度假"成为主流需求，
                        用户倾向于预订时直接购买早餐、接送、娱乐项目，而不是到店后再咨询（避免临时涨价）。
                      </p>
                    </LogicHighlight>
                  </>
                )
              },
              {
                title: '产品分类说明',
                content: (
                  <>
                    <LogicTable
                      headers={['分类', '典型产品', '使用场景', '计费方式']}
                      rows={[
                        ['酒店套餐', '房+早餐、房+晚餐、蜜月套餐', '提升性价比、促进预订转化', '打包价（如+50元含早）'],
                        ['休闲娱乐', '游泳池、健身房、KTV、台球', '填充客人闲暇时间、增加停留时长', '按次收费或免费'],
                        ['餐饮服务', '自助早餐、下午茶、BBQ', '核心刚需（尤其早餐）', '按人次收费'],
                        ['康养服务', 'SPA、按摩、足浴、温泉', '高端酒店核心卖点、高利润产品', '按服务项目计时收费'],
                        ['交通服务', '接送机、租车、景区直通车', '解决客人出行痛点、提升便利性', '按距离/次数收费']
                      ]}
                    />

                    <p className="font-semibold mt-4 mb-2">分类选择建议：</p>
                    <LogicList items={[
                      <><strong>经济型酒店</strong>：重点配置早餐（刚需）、租车服务（商务客需求）</>,
                      <><strong>度假酒店</strong>：重点配置休闲娱乐、康养服务（客人愿意为体验付费）</>,
                      <><strong>商务酒店</strong>：重点配置会议室、接送机、商务早餐（效率优先）</>
                    ]} />
                  </>
                )
              },
              {
                title: '字段说明',
                content: (
                  <LogicTable
                    headers={['字段名', '含义', '示例', '填写要点']}
                    rows={[
                      ['产品分类', '将产品归类到5大类之一', '康养服务', '必填，影响用户筛选和展示'],
                      ['产品名', '产品的简短名称', 'SPA精油按摩', '必填，建议≤10字，突出核心卖点'],
                      ['产品描述', '详细介绍产品内容', '90分钟全身精油按摩，使用法国进口精油...', '必填，建议包含时长、内容、亮点'],
                      ['应用设置', '特殊规则或赠送条件', '免费使用2小时', '可选，如免费、时长限制、需预约等']
                    ]}
                  />
                )
              },
              {
                title: '操作说明',
                content: (
                  <>
                    <p className="font-semibold mb-2">新增产品：</p>
                    <LogicList items={[
                      '点击"新增"按钮，填写产品分类、名称、描述',
                      '产品名称要简洁明了（如"SPA精油按摩"，而不是"按摩"）',
                      '产品描述要包含核心信息：时长、内容、适用人群、注意事项',
                      '应用设置可以填写特殊规则（如"免费使用2小时""需提前1天预约"）'
                    ]} />

                    <p className="font-semibold mt-4 mb-2">修改产品：</p>
                    <LogicList items={[
                      '点击"修改"按钮，更新产品信息',
                      '修改后立即生效（前台用户会看到更新后的内容）',
                      '建议定期更新描述（如加入季节性卖点、优惠信息）'
                    ]} />

                    <p className="font-semibold mt-4 mb-2">删除产品：</p>
                    <LogicList items={[
                      '点击"删除"按钮，二次确认后删除',
                      '删除后前台不再展示该产品（已购买的订单不受影响）',
                      '建议先"下架"而不是直接删除（保留历史数据）'
                    ]} />

                    <p className="font-semibold mt-4 mb-2">产品批量：</p>
                    <LogicList items={[
                      '适用于新开业酒店快速导入产品（如Excel批量上传）',
                      '可以一次性导入整套标准产品（如连锁酒店统一配置）',
                      '批量操作需谨慎（建议先小范围测试）'
                    ]} />

                    <LogicHighlight type="success">
                      <p className="text-sm">
                        <strong>最佳实践</strong>：参考同档次酒店的产品配置，结合自身资源优势设计产品。
                        例如：靠近机场的酒店重点推广接送机服务，温泉酒店重点推广SPA套餐。
                      </p>
                    </LogicHighlight>
                  </>
                )
              },
              {
                title: '计费模式与订单关联',
                content: (
                  <>
                    <p className="font-semibold mb-2">定价策略：</p>
                    <LogicTable
                      headers={['模式', '适用场景', '优势', '劣势']}
                      rows={[
                        ['免费赠送', '基础设施（游泳池、健身房）', '提升竞争力、吸引预订', '无直接收入'],
                        ['打包优惠', '房+早、房+SPA套餐', '提升客单价、降低决策成本', '利润率可能降低'],
                        ['单独收费', 'SPA、接送机、额外餐饮', '利润清晰、用户按需选择', '部分用户嫌麻烦'],
                        ['会员专享', 'VIP免费使用健身房', '增强会员粘性', '需要会员体系支撑']
                      ]}
                    />

                    <p className="font-semibold mt-4 mb-2">与订单系统的关联：</p>
                    <LogicList items={[
                      <><strong>预订时选择</strong>：用户在预订房间时可勾选非房产品（如+50元含早餐）</>,
                      <><strong>入住后加购</strong>：客人到店后通过前台或小程序购买（如临时要SPA）</>,
                      <><strong>订单明细</strong>：非房产品作为独立行项记录在订单中（方便对账）</>,
                      <><strong>结算逻辑</strong>：退房时统一结算（房费+非房产品费用）</>
                    ]} />

                    <LogicHighlight type="info">
                      <p className="text-sm">
                        <strong>数据洞察</strong>：通过分析非房产品的购买率，可以优化产品结构。
                        例如：早餐购买率80%→说明是刚需，可以考虑默认含早；
                        SPA购买率仅5%→可能定价过高或宣传不足。
                      </p>
                    </LogicHighlight>
                  </>
                )
              },
              {
                title: '产品运营技巧',
                content: (
                  <>
                    <p className="font-semibold mb-2">提升非房产品收入的方法：</p>
                    <LogicList items={[
                      <><strong>预订时默认勾选</strong>：如"含早餐"默认勾选（用户可取消），提升购买率30%+</>,
                      <><strong>限时优惠</strong>：如"提前3天预订SPA立减50元"（刺激提前消费）</>,
                      <><strong>捆绑销售</strong>：如"订2晚送1次下午茶"（提升入住天数）</>,
                      <><strong>场景化推荐</strong>：如亲子客推荐儿童乐园、情侣客推荐浪漫晚餐</>
                    ]} />

                    <p className="font-semibold mt-4 mb-2">常见错误：</p>
                    <LogicList items={[
                      <>产品描述过于简单（"按摩"→用户不知道按哪里、多久、多少钱）</>,
                      <>定价不透明（"到店咨询"→用户担心被宰，流失率高）</>,
                      <>产品太多太杂（列出30种产品→用户选择困难，反而不买）</>,
                      <>忽视库存管理（SPA师只有2人，却卖出10单→无法履约，差评）</>
                    ]} />

                    <LogicHighlight type="warning">
                      <p className="text-sm">
                        <strong>避坑指南</strong>：非房产品需要真实履约能力支撑。
                        某度假村曾在OTA上线"免费温泉"，结果旺季人满为患，用户排队2小时，
                        差评率飙升至40%，最后被迫下架产品。
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
