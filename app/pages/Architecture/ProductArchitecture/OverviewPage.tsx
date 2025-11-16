/**
 * 产品架构总图页面
 * 展示整个酒店SAAS学习平台的完整功能架构脑图
 */

import { useViewMode } from '~/contexts/ViewModeContext'
import Sidebar, { menuConfig } from '~/pages/PointsSystem/components/Sidebar'
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card'
import { Badge } from '~/components/ui/badge'

export default function OverviewPage() {
  const { isLearningMode } = useViewMode()

  const architectureData = {
    title: '酒店SAAS学习平台',
    subtitle: '完整功能架构图',
    modules: [
      {
        id: '1',
        name: '平台后台',
        color: 'bg-blue-500',
        children: [
          {
            name: '积分系统',
            features: [
              { name: '积分规则配置', path: '/points-system/rule-config', desc: '配置积分获取、消耗、有效期规则' },
              { name: '用户积分管理', path: '/points-system/user-account', desc: '查看用户积分账户和明细' }
            ]
          },
          {
            name: '会员管理',
            features: [
              { name: '会员等级', path: '/member-management/levels', desc: '配置会员等级体系和权益' },
              { name: '会员管理', path: '/member-management/members', desc: '管理会员信息和数据分析' }
            ]
          },
          {
            name: '优惠券系统',
            features: [
              { name: '优惠券配置', path: '/coupon/config', desc: '配置优惠券规则和类型' },
              { name: '优惠券发放', path: '/coupon/grant', desc: '向用户发放优惠券' },
              { name: '核销记录', path: '/coupon/verify', desc: '查看优惠券使用记录' }
            ]
          },
          {
            name: '酒店管理',
            features: [
              { name: '加盟申请', path: '/hotel/join-application', desc: '处理酒店加盟申请' },
              { name: '合作酒店', path: '/hotel/partner-list', desc: '管理合作酒店列表' },
              { name: '协议模板管理', path: '/hotel/contract-template', desc: '管理合作协议模板' },
              { name: '签约记录', path: '/hotel/signing-record', desc: '查看签约记录' }
            ]
          },
          {
            name: '订单管理',
            features: [
              { name: '订单列表', path: '/order/list', desc: '查看平台所有订单' },
              { name: '订单详情', path: '/order/detail', desc: '查看订单详细信息' },
              { name: '退款管理', path: '/order/refund', desc: '处理订单退款' }
            ]
          },
          {
            name: '账号管理',
            features: [
              { name: '账号列表', path: '/account/list', desc: '管理平台管理员账号' }
            ]
          },
          {
            name: '营销管理',
            features: [
              { name: '广告管理', path: '/marketing/ads', desc: '管理平台广告投放' }
            ]
          },
          {
            name: '争议处理',
            features: [
              { name: '退款申请管理', path: '/dispute/refund-requests', desc: '处理用户退款申请' },
              { name: '仲裁案件管理', path: '/dispute/arbitration-cases', desc: '管理仲裁案件' },
              { name: '仲裁委员管理', path: '/dispute/arbitrators', desc: '管理仲裁委员' }
            ]
          },
          {
            name: '系统参数',
            features: [
              { name: '协议配置', path: '/system/agreements', desc: '配置用户协议和隐私政策' },
              { name: '标签配置', path: '/system/tags', desc: '配置系统标签' }
            ]
          },
          {
            name: '用户管理',
            features: [
              { name: '用户列表', path: '/user/list', desc: '管理C端用户' }
            ]
          }
        ]
      },
      {
        id: '2',
        name: '酒店后台',
        color: 'bg-purple-500',
        children: [
          {
            name: '账号管理',
            features: [
              { name: '员工账号', path: '/hotel-backend/staff', desc: '管理酒店员工账号' }
            ]
          },
          {
            name: '门店管理',
            features: [
              { name: '基本信息', path: '/hotel-backend/store/basic-info', desc: '配置门店基本信息' },
              { name: '酒店政策', path: '/hotel-backend/store/policy', desc: '配置入住/退房政策' },
              { name: '门店设施', path: '/hotel-backend/store/facilities', desc: '配置酒店设施和服务' },
              { name: '周边信息', path: '/hotel-backend/store/surrounding', desc: '配置周边景点和交通' },
              { name: '早餐政策', path: '/hotel-backend/store/breakfast', desc: '配置早餐服务政策' },
              { name: '加床政策', path: '/hotel-backend/store/extra-bed', desc: '配置加床服务政策' },
              { name: '门店图片', path: '/hotel-backend/store/images', desc: '上传门店展示图片' }
            ]
          },
          {
            name: '房型管理',
            features: [
              { name: '房型列表', path: '/hotel-backend/room-type-list', desc: '管理酒店房型基本信息', hasLogic: true },
              { name: '房型图片', path: '/hotel-backend/room-type-images', desc: '管理房型展示图片', hasLogic: true },
              { name: '非房产品', path: '/hotel-backend/non-room-products', desc: '管理增值服务和产品', hasLogic: true },
              { name: 'PMS对接', path: '/hotel-backend/pms-integration', desc: '对接第三方PMS系统', hasLogic: true }
            ]
          },
          {
            name: '房务管理',
            features: [
              { name: '房价日历', path: '/hotel-backend/room-price-calendar', desc: '可视化管理房价策略', hasLogic: true },
              { name: '库存日历', path: '/hotel-backend/inventory-calendar', desc: '可视化管理房间库存', hasLogic: true },
              { name: '订单日历', path: '/hotel-backend/order-calendar', desc: '可视化管理订单排期', hasLogic: true },
              { name: '订单列表', path: '/hotel-backend/order-list', desc: '管理所有订单', hasLogic: true, hasDetail: true },
              { name: '客诉退款', path: '/hotel-backend/refund-management', desc: '处理退款申请', hasLogic: true, hasDetail: true },
              { name: '用户点赞', path: '/hotel-backend/user-reviews', desc: '管理用户评价', hasLogic: true, hasDetail: true }
            ]
          },
          {
            name: '房屋管理',
            features: [
              { name: '房间列表', path: '/hotel-backend/rooms', desc: '管理具体房间信息' }
            ]
          },
          {
            name: '会员管理',
            features: [
              { name: '酒店会员', path: '/hotel-backend/members', desc: '管理酒店会员' }
            ]
          }
        ]
      }
    ],
    statistics: {
      totalModules: 2,
      totalSections: 16,
      totalFeatures: 42,
      completedWithLogic: 11,
      completedWithDetail: 4
    }
  }

  const mainContent = (
    <div className="p-8 space-y-8 max-w-[1400px] mx-auto">
      {/* 页面标题 */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-foreground">{architectureData.title}</h1>
        <p className="text-xl text-muted-foreground">{architectureData.subtitle}</p>

        {/* 统计信息 */}
        <div className="flex gap-4 justify-center mt-6">
          <Badge variant="outline" className="text-lg px-4 py-2">
            {architectureData.statistics.totalModules} 个一级模块
          </Badge>
          <Badge variant="outline" className="text-lg px-4 py-2">
            {architectureData.statistics.totalSections} 个二级分类
          </Badge>
          <Badge variant="outline" className="text-lg px-4 py-2">
            {architectureData.statistics.totalFeatures} 个功能页面
          </Badge>
          <Badge variant="outline" className="text-lg px-4 py-2 bg-green-50 text-green-700 border-green-300">
            ✓ {architectureData.statistics.completedWithLogic} 个已添加LogicPanel
          </Badge>
          <Badge variant="outline" className="text-lg px-4 py-2 bg-blue-50 text-blue-700 border-blue-300">
            ✓ {architectureData.statistics.completedWithDetail} 个已添加详情页
          </Badge>
        </div>
      </div>

      {/* 架构脑图 */}
      <div className="space-y-8">
        {architectureData.modules.map((module) => (
          <Card key={module.id} className="border-2">
            <CardHeader className={`${module.color} text-white`}>
              <CardTitle className="text-2xl flex items-center justify-between">
                <span>{module.name}</span>
                <Badge variant="secondary" className="bg-white/20 text-white text-sm">
                  {module.children.reduce((acc, child) => acc + child.features.length, 0)} 个功能
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 gap-6">
                {module.children.map((section, sectionIdx) => (
                  <div key={sectionIdx} className="space-y-3">
                    {/* 二级分类标题 */}
                    <div className="flex items-center gap-3 pb-2 border-b-2">
                      <div className={`w-1 h-6 ${module.color} rounded-full`}></div>
                      <h3 className="text-lg font-bold text-foreground">{section.name}</h3>
                      <Badge variant="outline" className="text-xs">
                        {section.features.length} 项
                      </Badge>
                    </div>

                    {/* 三级功能列表 */}
                    <div className="grid grid-cols-2 gap-3 ml-6">
                      {section.features.map((feature, featureIdx) => (
                        <div
                          key={featureIdx}
                          className="group relative p-4 border rounded-lg hover:border-primary hover:shadow-md transition-all cursor-pointer bg-card"
                          onClick={() => {
                            if (feature.path) {
                              window.location.href = feature.path
                            }
                          }}
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                                  {feature.name}
                                </h4>
                                {feature.hasLogic && (
                                  <Badge className="bg-green-500 text-white text-xs px-2 py-0">
                                    Logic✓
                                  </Badge>
                                )}
                                {feature.hasDetail && (
                                  <Badge className="bg-blue-500 text-white text-xs px-2 py-0">
                                    Detail✓
                                  </Badge>
                                )}
                              </div>
                              <p className="text-xs text-muted-foreground">{feature.desc}</p>
                            </div>
                            <div className="text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                              →
                            </div>
                          </div>

                          {/* 路径提示 */}
                          {feature.path && (
                            <div className="mt-2 pt-2 border-t border-dashed">
                              <code className="text-[10px] text-muted-foreground">
                                {feature.path}
                              </code>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* 图例说明 */}
      <Card>
        <CardHeader>
          <CardTitle>图例说明</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-4 gap-6">
            <div className="space-y-2">
              <h4 className="font-semibold text-sm">颜色标识</h4>
              <div className="space-y-1 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-blue-500 rounded"></div>
                  <span>平台后台（B端管理）</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-purple-500 rounded"></div>
                  <span>酒店后台（商家端）</span>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="font-semibold text-sm">功能标记</h4>
              <div className="space-y-1 text-sm">
                <div className="flex items-center gap-2">
                  <Badge className="bg-green-500 text-white">Logic✓</Badge>
                  <span>已添加LogicPanel教学面板</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className="bg-blue-500 text-white">Detail✓</Badge>
                  <span>已添加详情页功能</span>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="font-semibold text-sm">层级结构</h4>
              <div className="space-y-1 text-sm">
                <div>一级：平台后台 / 酒店后台</div>
                <div>二级：积分系统、会员管理等</div>
                <div>三级：具体功能页面</div>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="font-semibold text-sm">使用说明</h4>
              <div className="space-y-1 text-sm">
                <div>• 点击功能卡片可跳转到对应页面</div>
                <div>• 鼠标悬停查看详细信息</div>
                <div>• 路径显示在卡片底部</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 架构设计说明 */}
      <Card>
        <CardHeader>
          <CardTitle>架构设计原则</CardTitle>
        </CardHeader>
        <CardContent className="prose prose-sm dark:prose-invert max-w-none">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-3">1. 模块化设计</h4>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>每个功能模块独立开发、独立部署</li>
                <li>模块间通过标准API接口通信</li>
                <li>便于团队协作和功能迭代</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-3">2. 职责分离</h4>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li><strong>平台后台</strong>：面向平台运营人员，管理全局资源</li>
                <li><strong>酒店后台</strong>：面向酒店商家，管理自己的门店</li>
                <li>清晰的权限边界，避免越权操作</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-3">3. 数据闭环</h4>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>积分系统 ↔ 会员系统 ↔ 订单系统</li>
                <li>房价 ↔ 库存 ↔ 订单的实时联动</li>
                <li>PMS对接实现全渠道数据同步</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-3">4. 学习型设计</h4>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>60/40布局：实际功能 + 业务逻辑说明</li>
                <li>LogicPanel提供业务场景、字段说明、操作指南</li>
                <li>支持学习模式/展示模式切换</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-3">5. 可视化管理</h4>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>日历视图：房价、库存、订单一目了然</li>
                <li>颜色编码：状态区分清晰（蓝/黄/绿/红）</li>
                <li>图表展示：数据趋势可视化</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-3">6. 参考行业标准</h4>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>携程、美团、飞猪的功能作为参考</li>
                <li>OTA行业通用术语和流程</li>
                <li>真实业务场景驱动设计</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 核心数据流 */}
      <Card>
        <CardHeader>
          <CardTitle>核心业务数据流</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="p-6 bg-slate-50 dark:bg-slate-900 rounded-lg border-2 border-dashed">
              <h4 className="font-semibold mb-4 text-center">订单流转完整链路</h4>
              <div className="flex items-center justify-center gap-2 flex-wrap">
                <div className="px-4 py-2 bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-100 rounded font-medium">
                  用户下单
                </div>
                <span>→</span>
                <div className="px-4 py-2 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 rounded font-medium">
                  库存扣减
                </div>
                <span>→</span>
                <div className="px-4 py-2 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-100 rounded font-medium">
                  订单创建
                </div>
                <span>→</span>
                <div className="px-4 py-2 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-100 rounded font-medium">
                  PMS同步
                </div>
                <span>→</span>
                <div className="px-4 py-2 bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-100 rounded font-medium">
                  办理入住
                </div>
                <span>→</span>
                <div className="px-4 py-2 bg-pink-100 dark:bg-pink-900 text-pink-800 dark:text-pink-100 rounded font-medium">
                  办理退房
                </div>
                <span>→</span>
                <div className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-100 rounded font-medium">
                  积分发放
                </div>
              </div>
            </div>

            <div className="p-6 bg-slate-50 dark:bg-slate-900 rounded-lg border-2 border-dashed">
              <h4 className="font-semibold mb-4 text-center">会员成长体系</h4>
              <div className="flex items-center justify-center gap-2 flex-wrap">
                <div className="px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-100 rounded font-medium">
                  注册
                </div>
                <span>→</span>
                <div className="px-4 py-2 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 rounded font-medium">
                  预订订单
                </div>
                <span>→</span>
                <div className="px-4 py-2 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-100 rounded font-medium">
                  等级升级
                </div>
                <span>→</span>
                <div className="px-4 py-2 bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-100 rounded font-medium">
                  享受折扣
                </div>
                <span>→</span>
                <div className="px-4 py-2 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-100 rounded font-medium">
                  积分奖励
                </div>
                <span>→</span>
                <div className="px-4 py-2 bg-pink-100 dark:bg-pink-900 text-pink-800 dark:text-pink-100 rounded font-medium">
                  持续复购
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 设计讨论区 */}
      <Card className="border-orange-500 border-2">
        <CardHeader className="bg-orange-50 dark:bg-orange-950">
          <CardTitle className="text-orange-700 dark:text-orange-300">💡 架构设计讨论</CardTitle>
        </CardHeader>
        <CardContent className="pt-6 space-y-4">
          <div className="space-y-3">
            <h4 className="font-semibold">可能需要优化的设计点：</h4>

            <div className="space-y-4 text-sm">
              <div className="p-4 bg-yellow-50 dark:bg-yellow-950 border-l-4 border-yellow-500 rounded">
                <p className="font-semibold mb-2">🤔 问题1：平台后台和酒店后台的"订单管理"功能重复？</p>
                <p className="text-muted-foreground">
                  平台后台有"订单管理"，酒店后台也有"订单列表"，是否存在功能冗余？
                  应该如何区分这两个模块的定位和权限？
                </p>
              </div>

              <div className="p-4 bg-yellow-50 dark:bg-yellow-950 border-l-4 border-yellow-500 rounded">
                <p className="font-semibold mb-2">🤔 问题2：会员管理分散在两个地方？</p>
                <p className="text-muted-foreground">
                  平台后台有"会员管理"（/member-management/），酒店后台也有"会员管理"（/hotel-backend/members），
                  这两个是同一个会员体系还是分离的？数据如何关联？
                </p>
              </div>

              <div className="p-4 bg-yellow-50 dark:bg-yellow-950 border-l-4 border-yellow-500 rounded">
                <p className="font-semibold mb-2">🤔 问题3：三个日历页面的关联性？</p>
                <p className="text-muted-foreground">
                  房价日历、库存日历、订单日历是三个独立页面，用户需要切换页面查看。
                  是否可以设计成Tab切换的形式，提升使用效率？
                </p>
              </div>

              <div className="p-4 bg-yellow-50 dark:bg-yellow-950 border-l-4 border-yellow-500 rounded">
                <p className="font-semibold mb-2">🤔 问题4：非房产品是否应该有价格配置？</p>
                <p className="text-muted-foreground">
                  当前非房产品只有名称、描述、应用设置，缺少价格字段。
                  如果需要单独售卖（如SPA服务），应该如何定价和结算？
                </p>
              </div>

              <div className="p-4 bg-yellow-50 dark:bg-yellow-950 border-l-4 border-yellow-500 rounded">
                <p className="font-semibold mb-2">🤔 问题5：PMS对接后库存同步的时机？</p>
                <p className="text-muted-foreground">
                  用户在小而美下单后，是实时同步到PMS还是批量同步？
                  如果PMS接口延迟或失败，如何保证数据一致性？
                </p>
              </div>

              <div className="p-4 bg-yellow-50 dark:bg-yellow-950 border-l-4 border-yellow-500 rounded">
                <p className="font-semibold mb-2">🤔 问题6：退款申请的处理权限？</p>
                <p className="text-muted-foreground">
                  客诉退款模块中，商家可以拒绝退款吗？如果客人不满意提交平台仲裁，
                  平台如何裁决？需要什么证据材料？
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-950 rounded-lg">
            <p className="text-sm text-blue-700 dark:text-blue-300">
              <strong>💭 设计思考</strong>：以上问题都是真实业务中会遇到的挑战。
              通过架构总图可以发现模块间的关联和冲突，进而优化系统设计。
              建议定期回顾架构图，持续改进。
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar menuItems={menuConfig} />
      <div className="flex-1 overflow-y-auto bg-background">
        {mainContent}
      </div>
    </div>
  )
}
