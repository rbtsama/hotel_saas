/**
 * 商户端 - 积分服务配置页面
 */

import { Form } from '@remix-run/react'
import type { PointsServiceConfig } from './types/pointsService.types'
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card'
import { Switch } from '~/components/ui/switch'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '~/components/ui/table'
import MainLayout from '~/pages/PointsSystem/components/MainLayout'
import { Gift, ShoppingBag } from 'lucide-react'

interface PointsServiceConfigPageProps {
  config: PointsServiceConfig
}

export default function PointsServiceConfigPage({ config }: PointsServiceConfigPageProps) {
  return (
    <MainLayout>
      <div className="h-screen overflow-y-auto bg-slate-50">
        <div className="max-w-7xl mx-auto p-6">
          {/* 页面头部 */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-slate-900">积分服务配置</h1>
          </div>

          {/* 积分奖励服务 */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Gift className="w-5 h-5 text-green-600" />
                积分奖励
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="min-w-[150px]">服务名称</TableHead>
                    <TableHead className="min-w-[250px]">服务说明</TableHead>
                    <TableHead className="min-w-[120px]">奖励积分</TableHead>
                    <TableHead className="min-w-[100px]">状态</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {config.ecoRewards.map((service) => (
                    <TableRow key={service.id}>
                      <TableCell className="font-medium">{service.serviceName}</TableCell>
                      <TableCell className="text-sm text-slate-600">
                        {service.description || '-'}
                      </TableCell>
                      <TableCell>
                        <span className="font-semibold text-green-600">
                          {Math.abs(service.pointsAmount)} 积分
                        </span>
                      </TableCell>
                      <TableCell>
                        <Form method="post">
                          <input type="hidden" name="_action" value="toggle" />
                          <input type="hidden" name="serviceId" value={service.id} />
                          <Switch
                            checked={service.enabled}
                            onCheckedChange={(checked) => {
                              // 提交表单
                              const form = document.getElementById(`toggle-${service.id}`) as HTMLFormElement
                              if (form) form.requestSubmit()
                            }}
                          />
                        </Form>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* 积分换购服务 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-secondary" />
                积分换购
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="min-w-[150px]">服务名称</TableHead>
                    <TableHead className="min-w-[250px]">服务说明</TableHead>
                    <TableHead className="min-w-[120px]">消耗积分</TableHead>
                    <TableHead className="min-w-[100px]">状态</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {config.valueAddedServices.map((service) => (
                    <TableRow key={service.id}>
                      <TableCell className="font-medium">{service.serviceName}</TableCell>
                      <TableCell className="text-sm text-slate-600">
                        {service.description || '-'}
                      </TableCell>
                      <TableCell>
                        <span className="font-semibold text-secondary">
                          {service.pointsAmount} 积分
                        </span>
                      </TableCell>
                      <TableCell>
                        <Form method="post" id={`toggle-${service.id}`}>
                          <input type="hidden" name="_action" value="toggle" />
                          <input type="hidden" name="serviceId" value={service.id} />
                          <Switch
                            checked={service.enabled}
                            onCheckedChange={(checked) => {
                              // 提交表单
                              const form = document.getElementById(`toggle-${service.id}`) as HTMLFormElement
                              if (form) form.requestSubmit()
                            }}
                          />
                        </Form>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  )
}
