import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card'
import type { MembershipLevel } from '../types/miniprogram.types'

interface MembershipLevelsProps {
  levels: MembershipLevel[]
}

export default function MembershipLevels({ levels }: MembershipLevelsProps) {
  return (
    <Card className="bg-muted/30">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-lg">
          <span>👑</span>
          会员等级详细规则
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {levels.map((level) => (
            <div
              key={level.level}
              className={`border-2 rounded-lg p-4 ${getLevelStyle(level.level)}`}
            >
              <div className="flex items-center justify-between mb-3">
                <div>
                  <div className="text-lg font-bold">{level.level}</div>
                  <div className="text-sm text-muted-foreground">{level.name}</div>
                </div>
                <div className="text-2xl">{getLevelIcon(level.level)}</div>
              </div>

              <div className="space-y-2 text-sm">
                <div>
                  <span className="font-semibold">获得条件：</span>
                  <span className="text-muted-foreground">{level.requirements}</span>
                </div>

                <div>
                  <span className="font-semibold">有效期：</span>
                  <span className="text-muted-foreground">{level.validity}</span>
                </div>

                <div>
                  <span className="font-semibold">会员权益：</span>
                  <ul className="mt-1 space-y-1">
                    {level.benefits.map((benefit, idx) => (
                      <li key={idx} className="text-muted-foreground flex items-start gap-1">
                        <span className="text-primary">•</span>
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {level.conditions && level.conditions.length > 0 && (
                  <div>
                    <span className="font-semibold">条件：</span>
                    <ul className="mt-1 space-y-1">
                      {level.conditions.map((condition, idx) => (
                        <li key={idx} className="text-muted-foreground text-xs flex items-start gap-1">
                          <span className="text-amber-600">✓</span>
                          <span>{condition}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 p-4 bg-muted/50 rounded-lg">
          <h4 className="font-semibold mb-2 text-sm">会员规则说明</h4>
          <ul className="space-y-1 text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <span className="text-primary">•</span>
              <span>每预订1次，订单完成后累计1次</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary">•</span>
              <span>消费1元，累计1里程值（100里程值=1元）</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary">•</span>
              <span>订单完成后天数内到达，若累计的里程值对应的订单发生退款时，退款成功后相应的累计里程值将被扣除</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary">•</span>
              <span>里程值用途包含：注册会员、完成身份验证、预订房间、推荐新用户、撰写优点评、以及购物商品购物、参加体验活动、参与旅行反馈调查等</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary">•</span>
              <span>达到等级后，若在有效期内未达到保级条件，则降至上一等级；里程值有效期：滚动有效期1年</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary">•</span>
              <span>以上会员折扣、里程值等会员权益仅限会员本人使用，不可转让不可兑现。除特殊规定外行同行人不可同享</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary">•</span>
              <span>里程值使用的途径：可兑换合作门店房券、现金抵扣券、活动体验券、风物特产、文创等</span>
            </li>
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}

function getLevelStyle(level: string): string {
  const styles: Record<string, string> = {
    VIP0: 'bg-slate-50 border-slate-300 dark:bg-slate-900 dark:border-slate-700',
    VIP1: 'bg-blue-50 border-blue-300 dark:bg-blue-950 dark:border-blue-700',
    VIP2: 'bg-amber-50 border-amber-300 dark:bg-amber-950 dark:border-amber-700',
    VIP3: 'bg-purple-50 border-purple-300 dark:bg-purple-950 dark:border-purple-700'
  }
  return styles[level] || 'bg-muted border-border'
}

function getLevelIcon(level: string): string {
  const icons: Record<string, string> = {
    VIP0: '🥉',
    VIP1: '🥈',
    VIP2: '🥇',
    VIP3: '💎'
  }
  return icons[level] || '⭐'
}
