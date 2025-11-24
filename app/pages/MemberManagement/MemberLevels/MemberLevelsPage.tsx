import { useState } from 'react'
import type { MemberLevel } from './types/memberLevels.types'
import { Card, CardContent } from '~/components/ui/card'
import { Input } from '~/components/ui/input'
import { Button } from '~/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '~/components/ui/table'
import { Badge } from '~/components/ui/badge'
import { Switch } from '~/components/ui/switch'
import { useViewMode } from '~/contexts/ViewModeContext'
import Sidebar, { menuConfig } from '~/pages/PointsSystem/components/Sidebar'
import LogicPanel, { LogicTable, LogicList, LogicHighlight } from '~/pages/PointsSystem/components/LogicPanel'
import { Upload } from 'lucide-react'

interface MemberLevelsPageProps {
  levels: MemberLevel[]
  error: string | null
}

export default function MemberLevelsPage({ levels, error }: MemberLevelsPageProps) {
  const { isLearningMode } = useViewMode()
  const [editedLevels, setEditedLevels] = useState<MemberLevel[]>(levels)
  const [confirmStatusChange, setConfirmStatusChange] = useState<{
    levelId: string
    levelName: string
    newStatus: 'active' | 'inactive'
  } | null>(null)
  const [editingLevel, setEditingLevel] = useState<MemberLevel | null>(null)
  const [editFormData, setEditFormData] = useState<MemberLevel | null>(null)

  const updateLevel = (id: string, field: keyof MemberLevel, value: string | number) => {
    setEditedLevels(prev =>
      prev.map(level =>
        level.id === id ? { ...level, [field]: value } : level
      )
    )
  }

  // 打开编辑弹窗
  const handleEditLevel = (level: MemberLevel) => {
    setEditingLevel(level)
    setEditFormData({ ...level })
  }

  // 保存编辑
  const handleSaveEdit = () => {
    if (editFormData && editingLevel) {
      setEditedLevels(prev =>
        prev.map(level =>
          level.id === editingLevel.id ? editFormData : level
        )
      )
      console.log('保存会员等级配置:', {
        level: editFormData.displayName,
        changes: editFormData,
        operator: '兔子',
        time: new Date().toLocaleString('zh-CN')
      })
      setEditingLevel(null)
      setEditFormData(null)
    }
  }

  // 更新表单数据
  const updateFormData = (field: keyof MemberLevel, value: string | number) => {
    if (editFormData) {
      setEditFormData({ ...editFormData, [field]: value })
    }
  }

  // 状态开关独立处理（不受修改设置限制）
  const handleStatusToggle = (levelId: string, levelName: string, currentStatus: 'active' | 'inactive') => {
    const newStatus = currentStatus === 'active' ? 'inactive' : 'active'
    setConfirmStatusChange({ levelId, levelName, newStatus })
  }

  const confirmStatusToggle = () => {
    if (confirmStatusChange) {
      updateLevel(confirmStatusChange.levelId, 'status', confirmStatusChange.newStatus)
      console.log('状态修改记录:', {
        level: confirmStatusChange.levelName,
        from: confirmStatusChange.newStatus === 'active' ? 'inactive' : 'active',
        to: confirmStatusChange.newStatus,
        operator: '兔子',
        time: new Date().toLocaleString('zh-CN')
      })
      setConfirmStatusChange(null)
    }
  }

  // LogicPanel 配置
  const logicSections = [
    {
      title: '业务场景',
      content: (
        <div className="space-y-4">
          <p>会员等级体系通过阶梯式权益设计，激励用户持续消费并保持活跃：</p>
          <LogicList items={[
            <><strong>升级机制：</strong>完成指定次数订单即可升级到下一等级</>,
            <><strong>保级机制：</strong>有效期内保持最低消费频次，否则降级</>,
            <><strong>权益递增：</strong>等级越高，折扣力度越大，积分汇率越高</>,
            <><strong>长期激励：</strong>通过有效期设计，鼓励用户持续活跃</>
          ]} />
        </div>
      )
    },
    {
      title: '升级与保级规则',
      content: (
        <div className="space-y-4">
          <LogicTable
            headers={['规则', '说明', '示例']}
            rows={[
              ['升级间夜', '在当前等级完成X次订单后自动升级', 'VIP1升级间夜3次，完成3次订单升级到VIP2'],
              ['保级间夜', '有效期内至少完成X次订单才能保持等级', 'VIP2保级间夜2次，有效期内少于2次则降为VIP1'],
              ['有效期', '达到等级后+X天有效，到期当天23:59:59失效', 'VIP3有效期365天，达到当天不计入，之后365天有效'],
              ['降级机制', '有效期到期且未达到保级要求则降1级', '未达到保级要求的VIP3会降为VIP2']
            ]}
          />
          <LogicHighlight type="info">
            <strong>重要：</strong>达到等级的当天不计入有效期，从第二天开始计算。例如1月1日达到VIP1（有效期365天），则在次年1月1日23:59:59过期。
          </LogicHighlight>
        </div>
      )
    },
    {
      title: '折扣与积分规则',
      content: (
        <div className="space-y-4">
          <p>每个等级配置独立的折扣范围和积分倍数：</p>
          <LogicList items={[
            <><strong>折扣范围：</strong>平台设定的折扣区间，门店可在此范围内调整</>,
            <><strong>积分倍数：</strong>消费1元可获得的积分数量，等级越高倍数越高</>,
            <><strong>差异化激励：</strong>通过折扣和积分的差异化，激励用户升级</>
          ]} />
          <LogicTable
            headers={['等级', '折扣范围', '积分倍数']}
            rows={[
              ['VIP0（注册会员）', '无折扣', '1.0'],
              ['VIP1', '85% ~ 95%', '1.2'],
              ['VIP3', '75% ~ 88%', '2.0'],
              ['VIP5', '65% ~ 82%', '3.0'],
              ['VIP9', '45% ~ 70%', '5.0']
            ]}
          />
        </div>
      )
    },
    {
      title: '字段说明',
      content: (
        <LogicTable
          headers={['字段', '说明', '验证规则']}
          rows={[
            ['等级', 'VIP等级编号，固定0-9', '不可修改'],
            ['展示名称', '等级显示名称', '文本，可自定义'],
            ['升级间夜', '达到下一等级需要的订单次数', '正整数，无上限'],
            ['保级间夜', '有效期内保持等级的最低订单次数', '正整数，无上限'],
            ['有效期（天）', '等级有效天数，0表示永久', '正整数或0'],
            ['折扣范围', '可设置的折扣百分比区间', '非负整数，最小值≤最大值'],
            ['积分倍数', '消费1元获得的积分倍数', '正数，支持2位小数'],
            ['状态', '等级是否启用', '启用/禁用']
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
      {/* 页面标题 */}
      <h1 className="text-2xl font-bold text-slate-900">会员等级设置</h1>

      {/* 会员等级列表 */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[80px]">等级</TableHead>
                  <TableHead className="min-w-[150px]">展示名称</TableHead>
                  <TableHead className="min-w-[120px]">升级间夜</TableHead>
                  <TableHead className="min-w-[120px]">保级间夜</TableHead>
                  <TableHead className="min-w-[120px]">有效期（天）</TableHead>
                  <TableHead className="min-w-[150px]">折扣范围</TableHead>
                  <TableHead className="min-w-[120px]">积分倍数</TableHead>
                  <TableHead className="min-w-[140px]">赠送体验次数</TableHead>
                  <TableHead className="min-w-[140px]">赠送有效期（天）</TableHead>
                  <TableHead className="w-[120px]">会员卡图片</TableHead>
                  <TableHead className="min-w-[100px]">启用</TableHead>
                  <TableHead className="w-[80px]">操作</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {editedLevels.map((level) => (
                  <TableRow key={level.id}>
                    {/* 等级 */}
                    <TableCell>
                      <div className="font-bold text-primary">VIP{level.level}</div>
                    </TableCell>

                    {/* 展示名称 */}
                    <TableCell>
                      <div className="text-sm text-slate-900">{level.displayName}</div>
                    </TableCell>

                    {/* 升级间夜 */}
                    <TableCell>
                      <div className="text-sm text-slate-900">{level.upgradeNights} 次</div>
                    </TableCell>

                    {/* 保级间夜 */}
                    <TableCell>
                      <div className="text-sm text-slate-900">{level.maintainNights} 次</div>
                    </TableCell>

                    {/* 有效期（天） */}
                    <TableCell>
                      <div className="text-sm text-slate-900">
                        {level.validityDays === 0 ? '永久' : `${level.validityDays} 天`}
                      </div>
                    </TableCell>

                    {/* 折扣范围 */}
                    <TableCell>
                      <div className="text-sm text-slate-900">{level.discountMin}% - {level.discountMax}%</div>
                    </TableCell>

                    {/* 积分倍数 */}
                    <TableCell>
                      <div className="text-sm text-slate-900">{level.pointsRate}</div>
                    </TableCell>

                    {/* 赠送体验次数 */}
                    <TableCell>
                      <div className="text-sm text-slate-900">{level.giftTrialCount} 次</div>
                    </TableCell>

                    {/* 赠送有效期 */}
                    <TableCell>
                      <div className="text-sm text-slate-900">{level.giftValidityDays} 天</div>
                    </TableCell>

                    {/* 会员卡图片 */}
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {level.cardImage ? (
                          <img src={level.cardImage} alt={level.displayName} className="h-8 rounded" />
                        ) : (
                          <span className="text-sm text-slate-400">未设置</span>
                        )}
                      </div>
                    </TableCell>

                    {/* 状态 - 不受修改设置限制，可独立操作 */}
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Switch
                          checked={level.status === 'active'}
                          onCheckedChange={() => handleStatusToggle(level.id, level.displayName, level.status)}
                        />
                        <span className="text-sm text-muted-foreground">
                          {level.status === 'active' ? '启用' : '禁用'}
                        </span>
                      </div>
                    </TableCell>

                    {/* 操作 */}
                    <TableCell>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleEditLevel(level)}
                        className="h-8 text-sm"
                      >
                        编辑
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {levels.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
              暂无会员等级数据
            </div>
          )}
        </CardContent>
      </Card>

      {/* 配置说明 */}
      <Card>
        <CardContent className="p-4">
          <div className="text-sm text-muted-foreground space-y-3">
            <p className="font-medium text-foreground">配置说明：</p>

            <div className="space-y-2">
              <p className="font-medium text-foreground">升级规则：</p>
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li>用户在当前等级完成"升级间夜"次数的订单后，自动升级到下一等级</li>
                <li>升级间夜必须为正整数，VIP9为最高等级无需升级</li>
                <li>升级立即生效，用户马上享受新等级权益</li>
              </ul>
            </div>

            <div className="space-y-2">
              <p className="font-medium text-foreground">保级规则：</p>
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li>用户在有效期内必须完成至少"保级间夜"次数的订单才能保持当前等级</li>
                <li>如果到期时未达到保级要求，会降1级（VIP0除外）</li>
                <li>保级间夜建议设置为升级间夜的30%-50%</li>
              </ul>
            </div>

            <div className="space-y-2">
              <p className="font-medium text-foreground">有效期规则：</p>
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li>用户达到等级的当天不计入有效期，从次日0点开始计算</li>
                <li>有效期结束时间为：达到日期 + 有效期天数，当天的23:59:59</li>
                <li>例如：1/1达到VIP1（365天有效期），则次年1/1 23:59:59过期</li>
                <li>VIP0设置为0表示永久有效</li>
              </ul>
            </div>

            <div className="space-y-2">
              <p className="font-medium text-foreground">折扣范围规则：</p>
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li>设置最小值和最大值，门店可在此范围内设置具体折扣</li>
                <li>折扣范围最小值必须 ≤ 最大值</li>
                <li>折扣值为百分比整数（如85表示85%即8.5折）</li>
                <li>VIP0设置0-0表示无折扣权益</li>
              </ul>
            </div>

            <div className="space-y-2">
              <p className="font-medium text-foreground">积分倍数规则：</p>
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li>消费1元可获得的积分倍数，支持最多2位小数</li>
                <li>等级越高，积分倍数越高，激励用户升级</li>
                <li>例如：VIP3倍数2.0，消费¥1000可获得2000积分</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
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
          <LogicPanel title="会员等级设置" sections={logicSections} />
        </div>
      )}

      {/* 编辑弹窗 */}
      {editingLevel && editFormData && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-2xl w-full mx-4 shadow-xl max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-semibold text-slate-900 mb-4">
              编辑会员等级 - {editingLevel.displayName}
            </h3>

            <div className="space-y-4">
              {/* 展示名称 */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">展示名称</label>
                <Input
                  value={editFormData.displayName}
                  onChange={(e) => updateFormData('displayName', e.target.value)}
                  className="h-9"
                />
              </div>

              {/* 升级间夜 */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">升级间夜</label>
                <div className="flex items-center gap-2">
                  <Input
                    type="number"
                    min="0"
                    value={editFormData.upgradeNights}
                    onChange={(e) => updateFormData('upgradeNights', Number(e.target.value))}
                    className="h-9"
                  />
                  <span className="text-sm text-slate-600">次</span>
                </div>
              </div>

              {/* 保级间夜 */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">保级间夜</label>
                <div className="flex items-center gap-2">
                  <Input
                    type="number"
                    min="0"
                    value={editFormData.maintainNights}
                    onChange={(e) => updateFormData('maintainNights', Number(e.target.value))}
                    className="h-9"
                  />
                  <span className="text-sm text-slate-600">次</span>
                </div>
              </div>

              {/* 有效期（天） */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">有效期（天）</label>
                <div className="flex items-center gap-2">
                  <Input
                    type="number"
                    min="0"
                    value={editFormData.validityDays}
                    onChange={(e) => updateFormData('validityDays', Number(e.target.value))}
                    className="h-9"
                  />
                  <span className="text-sm text-slate-600">{editFormData.validityDays === 0 ? '永久' : '天'}</span>
                </div>
              </div>

              {/* 折扣范围 */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">折扣范围</label>
                <div className="flex items-center gap-2">
                  <Input
                    type="number"
                    min="0"
                    max="100"
                    value={editFormData.discountMin}
                    onChange={(e) => updateFormData('discountMin', Number(e.target.value))}
                    className="h-9"
                    placeholder="最小值"
                  />
                  <span className="text-sm text-slate-600">~</span>
                  <Input
                    type="number"
                    min="0"
                    max="100"
                    value={editFormData.discountMax}
                    onChange={(e) => updateFormData('discountMax', Number(e.target.value))}
                    className="h-9"
                    placeholder="最大值"
                  />
                  <span className="text-sm text-slate-600">%</span>
                </div>
              </div>

              {/* 积分倍数 */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">积分倍数</label>
                <Input
                  type="number"
                  min="0"
                  step="0.01"
                  value={editFormData.pointsRate}
                  onChange={(e) => updateFormData('pointsRate', Number(e.target.value))}
                  className="h-9"
                />
              </div>

              {/* 赠送体验次数 */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">赠送体验次数</label>
                <div className="flex items-center gap-2">
                  <Input
                    type="number"
                    min="0"
                    value={editFormData.giftTrialCount}
                    onChange={(e) => updateFormData('giftTrialCount', Number(e.target.value))}
                    className="h-9"
                  />
                  <span className="text-sm text-slate-600">次</span>
                </div>
              </div>

              {/* 赠送有效期 */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">赠送有效期</label>
                <div className="flex items-center gap-2">
                  <Input
                    type="number"
                    min="1"
                    value={editFormData.giftValidityDays}
                    onChange={(e) => updateFormData('giftValidityDays', Number(e.target.value))}
                    className="h-9"
                  />
                  <span className="text-sm text-slate-600">天</span>
                </div>
              </div>

              {/* 会员卡图片上传 */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">会员卡图片</label>
                <div className="flex items-center gap-4">
                  {editFormData.cardImage && (
                    <img
                      src={editFormData.cardImage}
                      alt="会员卡预览"
                      className="h-16 rounded border border-slate-300"
                    />
                  )}
                  <label className="cursor-pointer">
                    <div className="flex items-center gap-2 px-4 py-2 border border-slate-300 rounded-md hover:bg-slate-50 transition-colors">
                      <Upload className="w-4 h-4" />
                      <span className="text-sm">
                        {editFormData.cardImage ? '更换图片' : '上传图片'}
                      </span>
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0]
                        if (file) {
                          const url = URL.createObjectURL(file)
                          updateFormData('cardImage', url)
                        }
                      }}
                    />
                  </label>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <Button
                variant="outline"
                onClick={() => {
                  setEditingLevel(null)
                  setEditFormData(null)
                }}
              >
                取消
              </Button>
              <Button onClick={handleSaveEdit}>
                保存
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* 状态修改确认对话框 */}
      {confirmStatusChange && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 shadow-xl">
            <h3 className="text-lg font-semibold mb-2">确认修改状态</h3>
            <p className="text-sm text-slate-900 mb-6">
              确定要将 <strong className="text-primary">{confirmStatusChange.levelName}</strong> 的状态修改为
              <strong className="text-secondary ml-1">
                {confirmStatusChange.newStatus === 'active' ? '启用' : '禁用'}
              </strong> 吗？修改将立即生效。
            </p>
            <div className="flex justify-end gap-3">
              <Button
                variant="outline"
                onClick={() => setConfirmStatusChange(null)}
              >
                取消
              </Button>
              <Button onClick={confirmStatusToggle}>
                确认修改
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
