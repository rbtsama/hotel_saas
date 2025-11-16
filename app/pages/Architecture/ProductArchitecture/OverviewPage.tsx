/**
 * 产品架构总图页面 - Ultra增强版
 * 展示整个酒店SAAS学习平台的完整功能架构脑图、深度分析和订单主线
 */

import { useViewMode } from '~/contexts/ViewModeContext'
import Sidebar, { menuConfig } from '~/pages/PointsSystem/components/Sidebar'
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card'
import { Badge } from '~/components/ui/badge'
import { AlertTriangle, CheckCircle2, XCircle, Lightbulb, TrendingUp, Database, Users, Hotel, CreditCard, Gift, FileText, Settings, Shield, ShoppingCart, ArrowRight, Activity, Target, Zap, AlertCircle } from 'lucide-react'

export default function OverviewPage() {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar menuItems={menuConfig} />
      <div className="flex-1 overflow-y-auto bg-background">
        <div className="p-8 space-y-12 max-w-[1800px] mx-auto">
          {/* 页面标题 */}
          <div className="text-center space-y-4">
            <h1 className="text-5xl font-bold text-foreground">酒店SAAS学习平台 Ultra</h1>
            <p className="text-2xl text-muted-foreground">完整功能架构总图 & 深度分析 & 订单主线</p>

            {/* 统计概览 */}
            <div className="flex gap-6 justify-center mt-8 flex-wrap">
              <div className="px-6 py-4 bg-blue-50 dark:bg-blue-950 rounded-lg border-2 border-blue-200">
                <div className="text-3xl font-bold text-blue-600">2</div>
                <div className="text-sm text-blue-600">一级模块</div>
              </div>
              <div className="px-6 py-4 bg-purple-50 dark:bg-purple-950 rounded-lg border-2 border-purple-200">
                <div className="text-3xl font-bold text-purple-600">16</div>
                <div className="text-sm text-purple-600">二级分类</div>
              </div>
              <div className="px-6 py-4 bg-green-50 dark:bg-green-950 rounded-lg border-2 border-green-200">
                <div className="text-3xl font-bold text-green-600">42</div>
                <div className="text-sm text-green-600">功能页面</div>
              </div>
              <div className="px-6 py-4 bg-orange-50 dark:bg-orange-950 rounded-lg border-2 border-orange-200">
                <div className="text-3xl font-bold text-orange-600">200+</div>
                <div className="text-sm text-orange-600">核心操作</div>
              </div>
              <div className="px-6 py-4 bg-pink-50 dark:bg-pink-950 rounded-lg border-2 border-pink-200">
                <div className="text-3xl font-bold text-pink-600">152</div>
                <div className="text-sm text-pink-600">代码文件</div>
              </div>
            </div>
          </div>

          {/* 订单主线全流程分析 - 新增核心章节 */}
          <Card className="border-4 border-orange-500">
            <CardHeader className="bg-gradient-to-r from-orange-500 to-red-500 text-white">
              <CardTitle className="text-3xl flex items-center gap-3">
                <ShoppingCart className="w-8 h-8" />
                订单主线全流程分析
              </CardTitle>
              <p className="text-white/80 mt-2">从用户浏览到复购的完整生命周期</p>
            </CardHeader>
            <CardContent className="p-8">
              {/* 订单前 */}
              <div className="mb-8">
                <h3 className="text-2xl font-bold mb-4 text-orange-600">📅 订单前：流量获取与转化</h3>
                <div className="flex items-center gap-4 mb-6 bg-orange-50 dark:bg-orange-950 p-4 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Hotel className="w-6 h-6 text-orange-600" />
                    <span className="font-semibold">门店信息</span>
                  </div>
                  <ArrowRight className="text-orange-400" />
                  <div className="flex items-center gap-2">
                    <FileText className="w-6 h-6 text-orange-600" />
                    <span className="font-semibold">房型展示</span>
                  </div>
                  <ArrowRight className="text-orange-400" />
                  <div className="flex items-center gap-2">
                    <CreditCard className="w-6 h-6 text-orange-600" />
                    <span className="font-semibold">价格策略</span>
                  </div>
                  <ArrowRight className="text-orange-400" />
                  <div className="flex items-center gap-2">
                    <Database className="w-6 h-6 text-orange-600" />
                    <span className="font-semibold">库存管理</span>
                  </div>
                </div>

                <div className="grid grid-cols-4 gap-4 text-sm">
                  <div className="p-4 bg-white dark:bg-slate-800 rounded border">
                    <h4 className="font-bold mb-2">门店展示（4页）</h4>
                    <ul className="space-y-1 text-xs text-muted-foreground">
                      <li>• 基本信息维护</li>
                      <li>• 设施配置</li>
                      <li>• 图片管理</li>
                      <li>• 周边信息</li>
                    </ul>
                  </div>
                  <div className="p-4 bg-white dark:bg-slate-800 rounded border">
                    <h4 className="font-bold mb-2">房型管理（5页）</h4>
                    <ul className="space-y-1 text-xs text-muted-foreground">
                      <li>• 房型列表配置</li>
                      <li>• 房型图片上传</li>
                      <li>• 早餐政策设置</li>
                      <li>• 加床政策配置</li>
                      <li>• 非房产品关联</li>
                    </ul>
                  </div>
                  <div className="p-4 bg-white dark:bg-slate-800 rounded border">
                    <h4 className="font-bold mb-2">价格体系（2页）</h4>
                    <ul className="space-y-1 text-xs text-muted-foreground">
                      <li>• 房价日历设置</li>
                      <li>• 会员折扣配置</li>
                      <li>• 优惠券发放</li>
                      <li>• 节假日调价</li>
                    </ul>
                  </div>
                  <div className="p-4 bg-white dark:bg-slate-800 rounded border">
                    <h4 className="font-bold mb-2">库存控制（2页）</h4>
                    <ul className="space-y-1 text-xs text-muted-foreground">
                      <li>• 库存日历管理</li>
                      <li>• PMS实时同步</li>
                      <li>• 超售预警</li>
                      <li>• 保留房管理</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* 订单中 */}
              <div className="mb-8">
                <h3 className="text-2xl font-bold mb-4 text-blue-600">🛒 订单中：交易履约全链路</h3>
                <div className="bg-blue-50 dark:bg-blue-950 p-6 rounded-lg mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-lg font-bold">核心链路：</span>
                    <Badge className="bg-blue-500">8个关键节点</Badge>
                  </div>
                  <div className="flex items-center gap-3 flex-wrap">
                    <div className="px-4 py-2 bg-white dark:bg-slate-800 rounded">下单</div>
                    <ArrowRight className="text-blue-400" />
                    <div className="px-4 py-2 bg-white dark:bg-slate-800 rounded">支付</div>
                    <ArrowRight className="text-blue-400" />
                    <div className="px-4 py-2 bg-white dark:bg-slate-800 rounded">PMS同步</div>
                    <ArrowRight className="text-blue-400" />
                    <div className="px-4 py-2 bg-white dark:bg-slate-800 rounded">确认</div>
                    <ArrowRight className="text-blue-400" />
                    <div className="px-4 py-2 bg-white dark:bg-slate-800 rounded">入住</div>
                    <ArrowRight className="text-blue-400" />
                    <div className="px-4 py-2 bg-white dark:bg-slate-800 rounded">服务</div>
                    <ArrowRight className="text-blue-400" />
                    <div className="px-4 py-2 bg-white dark:bg-slate-800 rounded">退房</div>
                    <ArrowRight className="text-blue-400" />
                    <div className="px-4 py-2 bg-white dark:bg-slate-800 rounded">结算</div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div className="p-4 bg-white dark:bg-slate-800 rounded border">
                    <h4 className="font-bold mb-2">订单管理（3页）</h4>
                    <ul className="space-y-1 text-xs text-muted-foreground">
                      <li>• 订单列表查询</li>
                      <li>• 订单状态流转</li>
                      <li>• 订单日历视图</li>
                      <li>• 批量操作处理</li>
                      <li>• Excel导出</li>
                    </ul>
                  </div>
                  <div className="p-4 bg-white dark:bg-slate-800 rounded border">
                    <h4 className="font-bold mb-2">PMS对接（1页）</h4>
                    <ul className="space-y-1 text-xs text-muted-foreground">
                      <li>• 接口配置</li>
                      <li>• 实时同步</li>
                      <li>• 失败重试</li>
                      <li>• 日志监控</li>
                      <li>• 数据对账</li>
                    </ul>
                  </div>
                  <div className="p-4 bg-white dark:bg-slate-800 rounded border">
                    <h4 className="font-bold mb-2">服务交付</h4>
                    <ul className="space-y-1 text-xs text-muted-foreground">
                      <li>• 入住办理</li>
                      <li>• 房卡发放</li>
                      <li>• 服务请求</li>
                      <li>• 退房结算</li>
                      <li>• 发票开具</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* 订单后 */}
              <div className="mb-8">
                <h3 className="text-2xl font-bold mb-4 text-green-600">🎯 订单后：用户运营与复购</h3>
                <div className="flex items-center gap-4 mb-6 bg-green-50 dark:bg-green-950 p-4 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Gift className="w-6 h-6 text-green-600" />
                    <span className="font-semibold">积分奖励</span>
                  </div>
                  <ArrowRight className="text-green-400" />
                  <div className="flex items-center gap-2">
                    <Users className="w-6 h-6 text-green-600" />
                    <span className="font-semibold">评价管理</span>
                  </div>
                  <ArrowRight className="text-green-400" />
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-6 h-6 text-green-600" />
                    <span className="font-semibold">会员升级</span>
                  </div>
                  <ArrowRight className="text-green-400" />
                  <div className="flex items-center gap-2">
                    <Target className="w-6 h-6 text-green-600" />
                    <span className="font-semibold">精准营销</span>
                  </div>
                </div>

                <div className="grid grid-cols-4 gap-4 text-sm">
                  <div className="p-4 bg-white dark:bg-slate-800 rounded border">
                    <h4 className="font-bold mb-2">积分体系（2页）</h4>
                    <ul className="space-y-1 text-xs text-muted-foreground">
                      <li>• 积分规则配置</li>
                      <li>• 用户积分管理</li>
                      <li>• 积分商城</li>
                      <li>• 兑换记录</li>
                    </ul>
                  </div>
                  <div className="p-4 bg-white dark:bg-slate-800 rounded border">
                    <h4 className="font-bold mb-2">评价系统（1页）</h4>
                    <ul className="space-y-1 text-xs text-muted-foreground">
                      <li>• 评价收集</li>
                      <li>• 回复管理</li>
                      <li>• 点赞互动</li>
                      <li>• 差评处理</li>
                    </ul>
                  </div>
                  <div className="p-4 bg-white dark:bg-slate-800 rounded border">
                    <h4 className="font-bold mb-2">会员运营（2页）</h4>
                    <ul className="space-y-1 text-xs text-muted-foreground">
                      <li>• 等级升降</li>
                      <li>• 权益发放</li>
                      <li>• 生日关怀</li>
                      <li>• 流失召回</li>
                    </ul>
                  </div>
                  <div className="p-4 bg-white dark:bg-slate-800 rounded border">
                    <h4 className="font-bold mb-2">营销工具（3页）</h4>
                    <ul className="space-y-1 text-xs text-muted-foreground">
                      <li>• 优惠券发放</li>
                      <li>• 秒杀活动</li>
                      <li>• 满减促销</li>
                      <li>• 推送通知</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* 订单异常 */}
              <div>
                <h3 className="text-2xl font-bold mb-4 text-red-600">⚠️ 订单异常：售后保障体系</h3>
                <div className="bg-red-50 dark:bg-red-950 p-6 rounded-lg">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <h4 className="font-bold flex items-center gap-2">
                        <AlertCircle className="w-5 h-5" />
                        退款流程（1页）
                      </h4>
                      <ul className="space-y-2 text-sm ml-7">
                        <li>• 用户申请退款 → 商家审核</li>
                        <li>• 商家同意 → 自动退款</li>
                        <li>• 商家拒绝 → 用户申诉</li>
                        <li>• 平台介入 → 仲裁裁决</li>
                        <li>• 退款到账 → 订单关闭</li>
                      </ul>
                    </div>
                    <div className="space-y-3">
                      <h4 className="font-bold flex items-center gap-2">
                        <Shield className="w-5 h-5" />
                        争议处理（1页）
                      </h4>
                      <ul className="space-y-2 text-sm ml-7">
                        <li>• 证据收集（照片、聊天记录）</li>
                        <li>• 责任判定（商家/用户/平台）</li>
                        <li>• 赔付方案（全额/部分/拒绝）</li>
                        <li>• 信用记录（影响后续权益）</li>
                        <li>• 案例学习（优化规则）</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 功能架构脑图 - 细化到操作级别 */}
          <Card className="border-4 border-primary/20">
            <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
              <CardTitle className="text-3xl">🧠 功能架构脑图（操作级细粒度）</CardTitle>
              <p className="text-white/80 mt-2">42个页面 × 5个核心操作 = 210+功能点全景图</p>
            </CardHeader>
            <CardContent className="p-8">
              <div className="grid grid-cols-2 gap-8">
                {/* 左侧：平台后台 */}
                <div className="space-y-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-4 h-20 bg-blue-500 rounded-full"></div>
                    <div>
                      <h2 className="text-3xl font-bold text-blue-600">平台后台</h2>
                      <p className="text-sm text-muted-foreground">Platform Backend - B端运营管理</p>
                    </div>
                  </div>

                  {/* 积分系统 */}
                  <div className="p-6 bg-blue-50 dark:bg-blue-950 rounded-xl border-2 border-blue-200">
                    <div className="flex items-center gap-2 mb-4">
                      <CreditCard className="w-6 h-6 text-blue-600" />
                      <h3 className="text-xl font-bold">积分系统</h3>
                      <Badge className="bg-green-500">2页</Badge>
                    </div>
                    <div className="space-y-3 text-sm ml-4">
                      <div className="p-3 bg-white dark:bg-slate-800 rounded">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          <span className="font-semibold">积分规则配置</span>
                          <Badge className="ml-auto bg-green-500 text-white text-xs">Logic✓</Badge>
                        </div>
                        <div className="ml-4 space-y-1 text-xs text-muted-foreground">
                          <div>├─ 新增规则（行为类型、积分值、有效期）</div>
                          <div>├─ 修改规则（调整积分倍率）</div>
                          <div>├─ 启用/禁用规则</div>
                          <div>├─ 批量导入规则模板</div>
                          <div>└─ 查看规则生效统计</div>
                        </div>
                      </div>
                      <div className="p-3 bg-white dark:bg-slate-800 rounded">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          <span className="font-semibold">用户积分管理</span>
                          <Badge className="ml-auto bg-green-500 text-white text-xs">Logic✓</Badge>
                        </div>
                        <div className="ml-4 space-y-1 text-xs text-muted-foreground">
                          <div>├─ 查询用户积分余额</div>
                          <div>├─ 查看积分流水明细</div>
                          <div>├─ 手动调整积分（增加/扣减）</div>
                          <div>├─ 积分过期处理</div>
                          <div>├─ 导出积分报表</div>
                          <div>└─ 批量赠送积分</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 会员系统 - 展开更多细节 */}
                  <div className="p-6 bg-purple-50 dark:bg-purple-950 rounded-xl border-2 border-purple-200">
                    <div className="flex items-center gap-2 mb-4">
                      <Users className="w-6 h-6 text-purple-600" />
                      <h3 className="text-xl font-bold">会员系统</h3>
                      <Badge className="bg-green-500">2页</Badge>
                    </div>
                    <div className="space-y-3 text-sm ml-4">
                      <div className="p-3 bg-white dark:bg-slate-800 rounded">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                          <span className="font-semibold">会员等级管理</span>
                          <Badge className="ml-auto bg-green-500 text-white text-xs">Logic✓</Badge>
                        </div>
                        <div className="ml-4 space-y-1 text-xs text-muted-foreground">
                          <div>├─ 新增会员等级（名称、门槛、权益）</div>
                          <div>├─ 修改等级权益（折扣、积分倍率）</div>
                          <div>├─ 设置升级条件（消费金额/次数）</div>
                          <div>├─ 配置降级规则（活跃度不足）</div>
                          <div>├─ 等级图标上传</div>
                          <div>└─ 批量调整用户等级</div>
                        </div>
                      </div>
                      <div className="p-3 bg-white dark:bg-slate-800 rounded">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                          <span className="font-semibold">会员列表管理</span>
                          <Badge className="ml-auto bg-green-500 text-white text-xs">Logic✓</Badge>
                        </div>
                        <div className="ml-4 space-y-1 text-xs text-muted-foreground">
                          <div>├─ 会员信息查询（手机/姓名/等级）</div>
                          <div>├─ 会员画像分析（消费偏好）</div>
                          <div>├─ 黑名单管理（限制预订）</div>
                          <div>├─ 会员标签管理（VIP/活跃/流失）</div>
                          <div>├─ 批量发送营销消息</div>
                          <div>└─ 导出会员数据</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 其他模块简化展示 */}
                  <div className="space-y-4">
                    <div className="p-4 bg-orange-50 dark:bg-orange-950 rounded-lg border border-orange-200">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <Gift className="w-5 h-5 text-orange-600" />
                          <span className="font-semibold">优惠券管理</span>
                        </div>
                        <Badge className="bg-green-500">3页</Badge>
                      </div>
                      <div className="grid grid-cols-3 gap-2 text-xs">
                        <div className="text-muted-foreground">• 创建优惠券</div>
                        <div className="text-muted-foreground">• 发放记录</div>
                        <div className="text-muted-foreground">• 使用统计</div>
                        <div className="text-muted-foreground">• 批量发放</div>
                        <div className="text-muted-foreground">• 核销管理</div>
                        <div className="text-muted-foreground">• 过期处理</div>
                      </div>
                    </div>

                    <div className="p-4 bg-green-50 dark:bg-green-950 rounded-lg border border-green-200">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <FileText className="w-5 h-5 text-green-600" />
                          <span className="font-semibold">订单管理</span>
                        </div>
                        <Badge className="bg-green-500">7页</Badge>
                      </div>
                      <div className="grid grid-cols-3 gap-2 text-xs">
                        <div className="text-muted-foreground">• 订单查询</div>
                        <div className="text-muted-foreground">• 状态流转</div>
                        <div className="text-muted-foreground">• 退款审批</div>
                        <div className="text-muted-foreground">• 发票管理</div>
                        <div className="text-muted-foreground">• 数据导出</div>
                        <div className="text-muted-foreground">• 异常处理</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 右侧：酒店后台 */}
                <div className="space-y-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-4 h-20 bg-green-500 rounded-full"></div>
                    <div>
                      <h2 className="text-3xl font-bold text-green-600">酒店后台</h2>
                      <p className="text-sm text-muted-foreground">Hotel Backend - 商家自主运营</p>
                    </div>
                  </div>

                  {/* 门店管理 - 详细展开 */}
                  <div className="p-6 bg-green-50 dark:bg-green-950 rounded-xl border-2 border-green-200">
                    <div className="flex items-center gap-2 mb-4">
                      <Hotel className="w-6 h-6 text-green-600" />
                      <h3 className="text-xl font-bold">门店管理</h3>
                      <Badge className="bg-green-500">4页</Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-3 text-sm ml-4">
                      <div className="p-3 bg-white dark:bg-slate-800 rounded">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <span className="font-semibold text-xs">门店信息</span>
                        </div>
                        <div className="ml-4 space-y-1 text-xs text-muted-foreground">
                          <div>• 基本信息编辑</div>
                          <div>• 营业时间设置</div>
                          <div>• 联系方式更新</div>
                          <div>• 地址定位</div>
                        </div>
                      </div>
                      <div className="p-3 bg-white dark:bg-slate-800 rounded">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <span className="font-semibold text-xs">门店设施</span>
                        </div>
                        <div className="ml-4 space-y-1 text-xs text-muted-foreground">
                          <div>• 设施勾选</div>
                          <div>• 服务配置</div>
                          <div>• 特色标签</div>
                          <div>• 认证资质</div>
                        </div>
                      </div>
                      <div className="p-3 bg-white dark:bg-slate-800 rounded">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <span className="font-semibold text-xs">门店图片</span>
                        </div>
                        <div className="ml-4 space-y-1 text-xs text-muted-foreground">
                          <div>• 图片上传</div>
                          <div>• 顺序调整</div>
                          <div>• 标签分类</div>
                          <div>• 主图设置</div>
                        </div>
                      </div>
                      <div className="p-3 bg-white dark:bg-slate-800 rounded">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <span className="font-semibold text-xs">周边信息</span>
                        </div>
                        <div className="ml-4 space-y-1 text-xs text-muted-foreground">
                          <div>• 交通指引</div>
                          <div>• 景点标注</div>
                          <div>• 美食推荐</div>
                          <div>• 距离计算</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 房型管理 - 核心模块 */}
                  <div className="p-6 bg-blue-50 dark:bg-blue-950 rounded-xl border-2 border-blue-200">
                    <div className="flex items-center gap-2 mb-4">
                      <Database className="w-6 h-6 text-blue-600" />
                      <h3 className="text-xl font-bold">房型管理</h3>
                      <Badge className="bg-green-500">5页</Badge>
                      <Badge className="bg-orange-500">核心</Badge>
                    </div>
                    <div className="space-y-3 text-sm ml-4">
                      <div className="p-3 bg-white dark:bg-slate-800 rounded">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          <span className="font-semibold">房型列表</span>
                          <Badge className="ml-auto bg-green-500 text-white text-xs">Logic✓</Badge>
                        </div>
                        <div className="ml-4 space-y-1 text-xs text-muted-foreground">
                          <div>├─ 新增房型（名称、面积、床型、人数）</div>
                          <div>├─ 编辑房型信息</div>
                          <div>├─ 上架/下架房型</div>
                          <div>├─ 设置房型排序</div>
                          <div>├─ 关联房间号</div>
                          <div>└─ 批量导入房型</div>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div className="p-2 bg-white dark:bg-slate-800 rounded text-xs">
                          <span className="font-semibold">房型图片</span>
                          <div className="text-muted-foreground mt-1">批量上传、标注、排序</div>
                        </div>
                        <div className="p-2 bg-white dark:bg-slate-800 rounded text-xs">
                          <span className="font-semibold">早餐政策</span>
                          <div className="text-muted-foreground mt-1">含早、价格、时间</div>
                        </div>
                        <div className="p-2 bg-white dark:bg-slate-800 rounded text-xs">
                          <span className="font-semibold">加床政策</span>
                          <div className="text-muted-foreground mt-1">可否加床、收费标准</div>
                        </div>
                        <div className="p-2 bg-white dark:bg-slate-800 rounded text-xs">
                          <span className="font-semibold">非房产品</span>
                          <div className="text-muted-foreground mt-1">SPA、接送、餐饮</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 运营工具 */}
                  <div className="p-6 bg-orange-50 dark:bg-orange-950 rounded-xl border-2 border-orange-200">
                    <div className="flex items-center gap-2 mb-4">
                      <Activity className="w-6 h-6 text-orange-600" />
                      <h3 className="text-xl font-bold">运营工具</h3>
                      <Badge className="bg-green-500">6页</Badge>
                    </div>
                    <div className="grid grid-cols-3 gap-2 text-xs">
                      <div className="p-2 bg-white dark:bg-slate-800 rounded">
                        <div className="font-semibold mb-1">房价日历</div>
                        <div className="text-muted-foreground">• 批量调价</div>
                        <div className="text-muted-foreground">• 节假日设置</div>
                      </div>
                      <div className="p-2 bg-white dark:bg-slate-800 rounded">
                        <div className="font-semibold mb-1">库存日历</div>
                        <div className="text-muted-foreground">• 房量调整</div>
                        <div className="text-muted-foreground">• 保留房设置</div>
                      </div>
                      <div className="p-2 bg-white dark:bg-slate-800 rounded">
                        <div className="font-semibold mb-1">订单日历</div>
                        <div className="text-muted-foreground">• 入住安排</div>
                        <div className="text-muted-foreground">• 房态查看</div>
                      </div>
                      <div className="p-2 bg-white dark:bg-slate-800 rounded">
                        <div className="font-semibold mb-1">订单列表</div>
                        <div className="text-muted-foreground">• 订单处理</div>
                        <div className="text-muted-foreground">• 状态更新</div>
                      </div>
                      <div className="p-2 bg-white dark:bg-slate-800 rounded">
                        <div className="font-semibold mb-1">PMS对接</div>
                        <div className="text-muted-foreground">• 接口配置</div>
                        <div className="text-muted-foreground">• 同步监控</div>
                      </div>
                      <div className="p-2 bg-white dark:bg-slate-800 rounded">
                        <div className="font-semibold mb-1">客诉退款</div>
                        <div className="text-muted-foreground">• 退款审批</div>
                        <div className="text-muted-foreground">• 争议处理</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 三角色完整旅程 */}
          <Card className="border-4 border-purple-500">
            <CardHeader className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
              <CardTitle className="text-3xl flex items-center gap-3">
                <Users className="w-8 h-8" />
                三角色完整旅程图
              </CardTitle>
              <p className="text-white/80 mt-2">C端用户、酒店商家、平台运营的全链路交互</p>
            </CardHeader>
            <CardContent className="p-8">
              <div className="grid grid-cols-3 gap-8">
                {/* C端用户旅程 */}
                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-purple-600 flex items-center gap-2">
                    <Users className="w-6 h-6" />
                    C端用户旅程
                  </h3>
                  <div className="space-y-3">
                    <div className="p-3 bg-purple-50 dark:bg-purple-950 rounded-lg">
                      <div className="font-semibold mb-2">1. 发现阶段</div>
                      <ul className="space-y-1 text-sm text-muted-foreground ml-4">
                        <li>• 搜索酒店（位置/价格/评分）</li>
                        <li>• 浏览门店信息和图片</li>
                        <li>• 查看用户评价</li>
                        <li>• 对比房型和价格</li>
                      </ul>
                    </div>
                    <div className="p-3 bg-purple-50 dark:bg-purple-950 rounded-lg">
                      <div className="font-semibold mb-2">2. 预订阶段</div>
                      <ul className="space-y-1 text-sm text-muted-foreground ml-4">
                        <li>• 选择入住日期</li>
                        <li>• 选择房型和数量</li>
                        <li>• 添加非房产品</li>
                        <li>• 使用优惠券</li>
                        <li>• 在线支付</li>
                      </ul>
                    </div>
                    <div className="p-3 bg-purple-50 dark:bg-purple-950 rounded-lg">
                      <div className="font-semibold mb-2">3. 入住阶段</div>
                      <ul className="space-y-1 text-sm text-muted-foreground ml-4">
                        <li>• 办理入住</li>
                        <li>• 享受服务</li>
                        <li>• 追加消费</li>
                        <li>• 办理退房</li>
                      </ul>
                    </div>
                    <div className="p-3 bg-purple-50 dark:bg-purple-950 rounded-lg">
                      <div className="font-semibold mb-2">4. 售后阶段</div>
                      <ul className="space-y-1 text-sm text-muted-foreground ml-4">
                        <li>• 发表评价</li>
                        <li>• 获得积分</li>
                        <li>• 申请发票</li>
                        <li>• 投诉退款（如需）</li>
                        <li>• 再次预订</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* 酒店商家旅程 */}
                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-green-600 flex items-center gap-2">
                    <Hotel className="w-6 h-6" />
                    酒店商家旅程
                  </h3>
                  <div className="space-y-3">
                    <div className="p-3 bg-green-50 dark:bg-green-950 rounded-lg">
                      <div className="font-semibold mb-2">1. 入驻阶段</div>
                      <ul className="space-y-1 text-sm text-muted-foreground ml-4">
                        <li>• 申请入驻</li>
                        <li>• 提交资质</li>
                        <li>• 签约合作</li>
                        <li>• 开通账号</li>
                      </ul>
                    </div>
                    <div className="p-3 bg-green-50 dark:bg-green-950 rounded-lg">
                      <div className="font-semibold mb-2">2. 上架阶段</div>
                      <ul className="space-y-1 text-sm text-muted-foreground ml-4">
                        <li>• 完善门店信息</li>
                        <li>• 配置房型</li>
                        <li>• 设置价格库存</li>
                        <li>• 上传图片</li>
                        <li>• 配置PMS</li>
                      </ul>
                    </div>
                    <div className="p-3 bg-green-50 dark:bg-green-950 rounded-lg">
                      <div className="font-semibold mb-2">3. 运营阶段</div>
                      <ul className="space-y-1 text-sm text-muted-foreground ml-4">
                        <li>• 接收订单</li>
                        <li>• 确认订单</li>
                        <li>• 服务履约</li>
                        <li>• 调整价格库存</li>
                        <li>• 处理退款</li>
                      </ul>
                    </div>
                    <div className="p-3 bg-green-50 dark:bg-green-950 rounded-lg">
                      <div className="font-semibold mb-2">4. 复盘阶段</div>
                      <ul className="space-y-1 text-sm text-muted-foreground ml-4">
                        <li>• 查看经营数据</li>
                        <li>• 回复用户评价</li>
                        <li>• 优化产品服务</li>
                        <li>• 参与平台活动</li>
                        <li>• 财务对账结算</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* 平台运营旅程 */}
                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-blue-600 flex items-center gap-2">
                    <Settings className="w-6 h-6" />
                    平台运营旅程
                  </h3>
                  <div className="space-y-3">
                    <div className="p-3 bg-blue-50 dark:bg-blue-950 rounded-lg">
                      <div className="font-semibold mb-2">1. 招商阶段</div>
                      <ul className="space-y-1 text-sm text-muted-foreground ml-4">
                        <li>• 开拓酒店资源</li>
                        <li>• 审核商家资质</li>
                        <li>• 培训商家使用</li>
                        <li>• 签约管理</li>
                      </ul>
                    </div>
                    <div className="p-3 bg-blue-50 dark:bg-blue-950 rounded-lg">
                      <div className="font-semibold mb-2">2. 监管阶段</div>
                      <ul className="space-y-1 text-sm text-muted-foreground ml-4">
                        <li>• 内容审核</li>
                        <li>• 价格监控</li>
                        <li>• 服务质量把控</li>
                        <li>• 违规处罚</li>
                        <li>• 用户权益保护</li>
                      </ul>
                    </div>
                    <div className="p-3 bg-blue-50 dark:bg-blue-950 rounded-lg">
                      <div className="font-semibold mb-2">3. 运营阶段</div>
                      <ul className="space-y-1 text-sm text-muted-foreground ml-4">
                        <li>• 策划营销活动</li>
                        <li>• 配置积分规则</li>
                        <li>• 发放优惠券</li>
                        <li>• 会员体系运营</li>
                        <li>• 仲裁纠纷</li>
                      </ul>
                    </div>
                    <div className="p-3 bg-blue-50 dark:bg-blue-950 rounded-lg">
                      <div className="font-semibold mb-2">4. 分析阶段</div>
                      <ul className="space-y-1 text-sm text-muted-foreground ml-4">
                        <li>• 数据分析</li>
                        <li>• 用户画像</li>
                        <li>• 商家排名</li>
                        <li>• 策略优化</li>
                        <li>• 财务清算</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* 三角色交互矩阵 */}
              <div className="mt-8 p-6 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-950 dark:to-blue-950 rounded-xl">
                <h4 className="text-xl font-bold mb-4">关键交互节点</h4>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div className="p-3 bg-white dark:bg-slate-800 rounded">
                    <div className="font-semibold mb-2">用户 ↔ 商家</div>
                    <ul className="space-y-1 text-xs text-muted-foreground">
                      <li>• 预订确认</li>
                      <li>• 服务交付</li>
                      <li>• 评价回复</li>
                      <li>• 退款协商</li>
                    </ul>
                  </div>
                  <div className="p-3 bg-white dark:bg-slate-800 rounded">
                    <div className="font-semibold mb-2">商家 ↔ 平台</div>
                    <ul className="space-y-1 text-xs text-muted-foreground">
                      <li>• 佣金结算</li>
                      <li>• 活动报名</li>
                      <li>• 违规申诉</li>
                      <li>• 数据同步</li>
                    </ul>
                  </div>
                  <div className="p-3 bg-white dark:bg-slate-800 rounded">
                    <div className="font-semibold mb-2">平台 ↔ 用户</div>
                    <ul className="space-y-1 text-xs text-muted-foreground">
                      <li>• 会员权益</li>
                      <li>• 积分兑换</li>
                      <li>• 投诉仲裁</li>
                      <li>• 营销推送</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 严重问题分析 - 保留原有内容但更新非房产品部分 */}
          <Card className="border-4 border-red-500">
            <CardHeader className="bg-gradient-to-r from-red-500 to-orange-500 text-white">
              <CardTitle className="text-3xl flex items-center gap-3">
                <AlertTriangle className="w-8 h-8" />
                严重问题分析（P0级）
              </CardTitle>
              <p className="text-white/80 mt-2">必须立即修复的架构缺陷</p>
            </CardHeader>
            <CardContent className="p-8">
              <div className="space-y-8">
                {/* 问题1：重复功能 */}
                <div className="p-6 bg-red-50 dark:bg-red-950 border-l-4 border-red-500 rounded-lg">
                  <h4 className="font-bold text-lg mb-3 text-red-700">❌ 问题1：订单/会员功能重复，权限混乱</h4>
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <p className="font-semibold mb-2">订单管理重复：</p>
                      <ul className="space-y-1 text-sm ml-4">
                        <li>• 平台后台：/order/list</li>
                        <li>• 酒店后台：/hotel-backend/order-list</li>
                        <li className="text-red-600">数据隔离？权限边界？</li>
                      </ul>
                    </div>
                    <div>
                      <p className="font-semibold mb-2">会员管理重复：</p>
                      <ul className="space-y-1 text-sm ml-4">
                        <li>• 平台后台：/member-management/members</li>
                        <li>• 酒店后台：/hotel-backend/members</li>
                        <li className="text-red-600">平台会员还是酒店会员？</li>
                      </ul>
                    </div>
                  </div>
                  <div className="mt-4 p-3 bg-green-50 dark:bg-green-950 rounded border border-green-300">
                    <p className="font-semibold mb-2 text-green-700">✅ 建议方案：</p>
                    <ul className="space-y-1 text-sm ml-4">
                      <li>• 统一数据表，通过 hotel_id 和角色权限区分</li>
                      <li>• 平台看全量，酒店看自己的数据</li>
                      <li>• 删除重复页面，保留一套</li>
                    </ul>
                  </div>
                </div>

                {/* 问题2：非房产品已修复 */}
                <div className="p-6 bg-green-50 dark:bg-green-950 border-l-4 border-green-500 rounded-lg">
                  <h4 className="font-bold text-lg mb-3 text-green-700">✅ 已修复：非房产品缺少核心字段</h4>
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <p className="font-semibold mb-2 text-red-600">之前的问题：</p>
                      <ul className="space-y-1 text-sm ml-4 line-through text-muted-foreground">
                        <li>缺少价格字段 - 无法售卖</li>
                        <li>缺少库存管理 - 可能超售</li>
                        <li>缺少计价方式 - 用户困惑</li>
                        <li>缺少预约机制 - 资源冲突</li>
                      </ul>
                    </div>
                    <div>
                      <p className="font-semibold mb-2 text-green-600">现已补充：</p>
                      <ul className="space-y-1 text-sm ml-4">
                        <li>✓ price - 产品价格</li>
                        <li>✓ pricingType - 计价方式</li>
                        <li>✓ inventory - 库存数量</li>
                        <li>✓ needsAppointment - 预约标识</li>
                        <li>✓ duration - 服务时长</li>
                      </ul>
                    </div>
                  </div>
                  <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-950 rounded">
                    <p className="text-sm">
                      <strong>修复后评价：</strong>非房产品模块现在符合行业标准，可以正常售卖和管理。
                      参考了携程、美团的增值服务设计，补齐了商业闭环。
                    </p>
                  </div>
                </div>

                {/* 问题3：权限系统缺失 */}
                <div className="p-6 bg-red-50 dark:bg-red-950 border-l-4 border-red-500 rounded-lg">
                  <h4 className="font-bold text-lg mb-3 text-red-700">❌ 问题3：缺少统一权限系统</h4>
                  <p className="mb-3 text-sm">系统有42个页面，但没有权限控制，任何人都能访问所有功能。</p>
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div className="p-3 bg-white dark:bg-slate-800 rounded">
                      <p className="font-semibold mb-2">超级管理员</p>
                      <ul className="space-y-1 text-xs text-muted-foreground">
                        <li>• 所有功能</li>
                        <li>• 系统配置</li>
                        <li>• 数据删除</li>
                      </ul>
                    </div>
                    <div className="p-3 bg-white dark:bg-slate-800 rounded">
                      <p className="font-semibold mb-2">酒店管理员</p>
                      <ul className="space-y-1 text-xs text-muted-foreground">
                        <li>• 自己酒店的数据</li>
                        <li>• 不能删除</li>
                        <li>• 不能配置规则</li>
                      </ul>
                    </div>
                    <div className="p-3 bg-white dark:bg-slate-800 rounded">
                      <p className="font-semibold mb-2">运营人员</p>
                      <ul className="space-y-1 text-xs text-muted-foreground">
                        <li>• 查看报表</li>
                        <li>• 发放优惠券</li>
                        <li>• 不能改价格</li>
                      </ul>
                    </div>
                  </div>
                  <div className="mt-4 p-3 bg-green-50 dark:bg-green-950 rounded border border-green-300">
                    <p className="font-semibold mb-2 text-green-700">✅ 建议实现：</p>
                    <pre className="text-xs bg-white dark:bg-slate-900 p-2 rounded">
{`// 路由守卫示例
export async function loader({ request }) {
  const user = await requireUser(request) // 验证登录
  if (!canAccess(user, 'hotel-backend')) {
    throw new Response("无权访问", { status: 403 })
  }
  // 数据过滤
  const hotels = user.role === 'super_admin'
    ? await getAllHotels()
    : await getHotelsByUser(user.id)
  return json({ hotels })
}`}
                    </pre>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 系统评分卡 - 更新分数 */}
          <Card className="border-4 border-gradient-to-r from-blue-500 to-purple-500">
            <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
              <CardTitle className="text-3xl flex items-center gap-3">
                <Target className="w-8 h-8" />
                系统完整度评分（修复后）
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <h3 className="text-2xl font-bold mb-4">总体评分：75/100</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-32 font-semibold">功能完整度</div>
                      <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-4 overflow-hidden">
                        <div className="bg-green-500 h-full" style={{ width: '85%' }}></div>
                      </div>
                      <span className="text-sm font-bold">85%</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-32 font-semibold">架构合理性</div>
                      <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-4 overflow-hidden">
                        <div className="bg-yellow-500 h-full" style={{ width: '60%' }}></div>
                      </div>
                      <span className="text-sm font-bold">60%</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-32 font-semibold">业务闭环</div>
                      <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-4 overflow-hidden">
                        <div className="bg-green-500 h-full" style={{ width: '80%' }}></div>
                      </div>
                      <span className="text-sm font-bold">80%</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-32 font-semibold">用户体验</div>
                      <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-4 overflow-hidden">
                        <div className="bg-blue-500 h-full" style={{ width: '75%' }}></div>
                      </div>
                      <span className="text-sm font-bold">75%</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-2xl font-bold mb-4">与OTA平台对比</h3>
                  <div className="space-y-3 text-sm">
                    <div className="p-3 bg-blue-50 dark:bg-blue-950 rounded">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-semibold">vs 携程EBK</span>
                        <Badge>60%相似度</Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        缺少：收益管理、渠道管理、智能定价、数据分析看板
                      </p>
                    </div>
                    <div className="p-3 bg-green-50 dark:bg-green-950 rounded">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-semibold">vs 美团商家</span>
                        <Badge>70%相似度</Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        缺少：团购管理、直播带货、种草笔记、商圈分析
                      </p>
                    </div>
                    <div className="p-3 bg-orange-50 dark:bg-orange-950 rounded">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-semibold">vs 飞猪商家</span>
                        <Badge>65%相似度</Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        缺少：信用分体系、花呗分期、会员通兑、内容营销
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 p-6 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-950 dark:to-blue-950 rounded-xl">
                <h4 className="text-xl font-bold mb-4">改进建议优先级</h4>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div className="p-4 bg-red-50 dark:bg-red-950 rounded border-2 border-red-300">
                    <h5 className="font-bold text-red-600 mb-2">P0 - 立即修复</h5>
                    <ul className="space-y-1 text-xs">
                      <li>• 添加权限系统</li>
                      <li>• 合并重复功能</li>
                      <li>• 补充Dashboard</li>
                    </ul>
                  </div>
                  <div className="p-4 bg-yellow-50 dark:bg-yellow-950 rounded border-2 border-yellow-300">
                    <h5 className="font-bold text-yellow-600 mb-2">P1 - 尽快优化</h5>
                    <ul className="space-y-1 text-xs">
                      <li>• 合并三个日历</li>
                      <li>• 添加数据分析</li>
                      <li>• 完善PMS同步</li>
                    </ul>
                  </div>
                  <div className="p-4 bg-blue-50 dark:bg-blue-950 rounded border-2 border-blue-300">
                    <h5 className="font-bold text-blue-600 mb-2">P2 - 逐步完善</h5>
                    <ul className="space-y-1 text-xs">
                      <li>• 收益管理系统</li>
                      <li>• AI智能定价</li>
                      <li>• 内容营销工具</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}