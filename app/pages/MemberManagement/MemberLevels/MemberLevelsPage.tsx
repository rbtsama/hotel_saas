import { useState } from 'react'
import { Link } from '@remix-run/react'
import type { MemberLevel } from './types/memberLevels.types'
import { Card, CardContent } from '~/components/ui/card'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '~/components/ui/table'
import { Plus, Edit } from 'lucide-react'
import { useViewMode } from '~/contexts/ViewModeContext'
import Sidebar, { menuConfig } from '~/pages/PointsSystem/components/Sidebar'
import LogicPanel, { LogicTable, LogicList, LogicHighlight } from '~/pages/PointsSystem/components/LogicPanel'

interface MemberLevelsPageProps {
  levels: MemberLevel[]
  error: string | null
}

export default function MemberLevelsPage({ levels, error }: MemberLevelsPageProps) {
  const { isLearningMode } = useViewMode()

  // LogicPanel 配置
  const logicSections = [
    {
      title: '业务场景',
      content: (
        <div className="space-y-4">
          <p>会员等级体系是酒店会员管理的核心，通过差异化的等级权益提升客户粘性：</p>
          <LogicList items={[
            <><strong>提升复购率：</strong>等级权益激励客户持续消费，追求更高等级</>,
            <><strong>增强粘性：</strong>获得的会员等级和权益让客户不愿流失到竞品</>,
            <><strong>精准营销：</strong>针对不同等级会员提供差异化的营销活动</>,
            <><strong>收入增长：</strong>高等级会员通常有更高的消费频次和客单价</>
          ]} />
        </div>
      )
    },
    {
      title: '等级设计',
      content: (
        <div className="space-y-4">
          <h4 className="font-semibold">如何设计会员等级体系</h4>
          <LogicList items={[
            <><strong>注册会员：</strong>新用户注册即成为注册会员，享受基础权益</>,
            <><strong>VIP1：</strong>预订订单达到3次及以上，或消费金额达到一定标准</>,
            <><strong>VIP2：</strong>预订订单达到10次及以上，享受更多优惠和特权</>,
            <><strong>VIP3：</strong>预订订单达到30次及以上，享受最高等级的专属服务</>
          ]} />
          <LogicHighlight type="success">
            <strong>最佳实践：</strong>等级设置不宜过多（3-4级最佳），升级条件要合理，既有吸引力又不能太容易达到。
          </LogicHighlight>
        </div>
      )
    },
    {
      title: '升级条件',
      content: (
        <div className="space-y-4">
          <p>会员等级升级通常基于以下条件：</p>
          <LogicList items={[
            <><strong>预订次数：</strong>累计预订订单的次数（最常用）</>,
            <><strong>消费金额：</strong>累计消费金额达到一定标准</>,
            <><strong>间夜数：</strong>累计入住的间夜数量</>,
            <><strong>时间周期：</strong>可设置为自然年度或滚动周期</>
          ]} />
          <LogicTable
            headers={['等级', '升级条件（示例）', '有效期']}
            rows={[
              ['注册会员', '注册即可获得', '永久'],
              ['VIP1', '预订订单 ≥ 3次', '1年'],
              ['VIP2', '预订订单 ≥ 10次', '1年'],
              ['VIP3', '预订订单 ≥ 30次', '1年']
            ]}
          />
        </div>
      )
    },
    {
      title: '会员权益',
      content: (
        <div className="space-y-4">
          <p>不同等级会员可享受的权益包括：</p>
          <LogicList items={[
            <><strong>订房折扣：</strong>VIP会员享受专属折扣（如VIP1享9折，VIP2享8.5折，VIP3享8折）</>,
            <><strong>积分奖励：</strong>高等级会员享受更高的积分倍率</>,
            <><strong>优先权益：</strong>
              <ul className="ml-6 mt-2 space-y-1">
                <li>• 优先预订热门房型</li>
                <li>• 免费升级房型</li>
                <li>• 延迟退房</li>
                <li>• 专属客服通道</li>
              </ul>
            </>,
            <><strong>专属服务：</strong>生日礼遇、节日问候、专属活动邀请等</>
          ]} />
          <LogicHighlight type="info">
            <strong>提示：</strong>权益设计要考虑成本控制，同时确保对客户有足够吸引力。
          </LogicHighlight>
        </div>
      )
    },
    {
      title: '字段说明',
      content: (
        <LogicTable
          headers={['字段', '说明', '示例']}
          rows={[
            ['默认等级', '等级名称和升级条件', '注册会员（注册即可）'],
            ['获得等级条件', '完整的升级条件描述', '消费金额达到5000元'],
            ['会员权益', '该等级享受的权益说明', '享受8折优惠、积分2倍'],
            ['等级有效期', '等级的有效期限', '1年'],
            ['预订订单要求', '达到等级所需的订单次数', '预订订单及以上3次'],
            ['使用限制', '折扣使用的限制条件', '节假日不可用'],
            ['折扣范围', '可设置的折扣范围', '80% ~ 95%'],
            ['应用范围', '当前设置的具体折扣', '85%（8.5折）']
          ]}
        />
      )
    }
  ]

  if (error) {
    return (
      <div className="flex h-screen">
        <Sidebar menuItems={menuConfig} />
        <div className="flex-1 p-6">
          <div className="text-destructive">错误: {error}</div>
        </div>
      </div>
    )
  }

  const mainContent = (
    <div className="p-6 space-y-6">
      {/* 顶部操作栏 */}
      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            修改
          </Button>
          <Button variant="outline">
            <Plus className="h-4 w-4 mr-2" />
            删除
          </Button>
        </div>
      </div>

      {/* 会员等级列表 */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12"></TableHead>
                <TableHead>默认等级</TableHead>
                <TableHead>获得等级条件</TableHead>
                <TableHead>会员权益</TableHead>
                <TableHead>等级有效期</TableHead>
                <TableHead>预订订单要求</TableHead>
                <TableHead>使用限制</TableHead>
                <TableHead>折扣范围</TableHead>
                <TableHead>应用范围</TableHead>
                <TableHead className="text-right">操作</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {levels.map((level) => (
                <TableRow key={level.id}>
                  <TableCell>
                    <input type="checkbox" className="w-4 h-4" />
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="font-medium">{level.levelName}</div>
                      <div className="text-sm text-muted-foreground">{level.upgradeCondition}</div>
                    </div>
                  </TableCell>
                  <TableCell>{level.levelBenefits}</TableCell>
                  <TableCell className="text-center">{level.validityPeriod}</TableCell>
                  <TableCell className="text-center">
                    {level.requiredNights > 0 ? `预订订单及以上${level.requiredNights}次` : '-'}
                  </TableCell>
                  <TableCell className="text-center">-</TableCell>
                  <TableCell className="text-center">
                    {level.discountRangeMin > 0 ? (
                      <>{level.discountRangeMin} % ~ × ≤ {level.discountRangeMax}%</>
                    ) : (
                      '-'
                    )}
                  </TableCell>
                  <TableCell className="text-center">
                    {level.discountPercentage > 0 ? (
                      <div className="flex items-center justify-center gap-2">
                        <Input
                          type="number"
                          defaultValue={level.discountPercentage}
                          className="w-16 h-8 text-center"
                        />
                        <span>%</span>
                      </div>
                    ) : (
                      '无折扣'
                    )}
                  </TableCell>
                  <TableCell className="text-center">
                    {level.isDefault ? '无折扣' : '-'}
                  </TableCell>
                  <TableCell className="text-right">
                    <Link to={`/member-management/levels/${level.id}/edit`}>
                      <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700">
                        <Edit className="h-4 w-4 mr-1" />
                        设置
                      </Button>
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {levels.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
              暂无会员等级数据
            </div>
          )}
        </CardContent>
      </Card>

      {/* 说明文字 */}
      <div className="text-sm text-muted-foreground">
        小而美商家入驻详雅宝会员共同原资金门店显言有会入烧话，并共同商欣联合会员体系的会员等级、会员权益和订房折扣，
        门店可以联合会员体系的范围内自行设置到不同等级会员的订房折扣。这订房折扣将适用于平台所有门店赋听注册的对应等级的会员。
      </div>
    </div>
  )

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar menuItems={menuConfig} />
      <div className={`flex-1 overflow-y-auto ${isLearningMode ? '' : ''}`}>
        {mainContent}
      </div>
      {isLearningMode && (
        <div className="w-[480px] border-l border-border overflow-hidden">
          <LogicPanel title="会员等级" sections={logicSections} />
        </div>
      )}
    </div>
  )
}
