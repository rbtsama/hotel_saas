import { json, redirect, type LoaderFunctionArgs, type ActionFunctionArgs } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import SettlementsPage from '~/pages/HotelBackend/BusinessManagement/SettlementsPage'
import businessService from '~/pages/HotelBackend/BusinessManagement/services/business.service'

export async function loader({ request }: LoaderFunctionArgs) {
  try {
    const settlements = await businessService.getSettlements()
    return json({ settlements, error: null })
  } catch (error) {
    return json({ settlements: [], error: '获取结算记录失败' }, { status: 500 })
  }
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData()
  const action = formData.get('action')

  if (action === 'request') {
    const month = formData.get('month')
    const amount = formData.get('amount')

    if (typeof month !== 'string' || typeof amount !== 'string') {
      return json({ error: '参数错误' }, { status: 400 })
    }

    try {
      await businessService.requestSettlement(month, parseFloat(amount))
      return redirect('/hotel-backend/business/settlements')
    } catch (error) {
      return json({ error: '申请结算失败' }, { status: 500 })
    }
  }

  return json({ error: '无效操作' }, { status: 400 })
}

export default function SettlementsRoute() {
  const { settlements, error } = useLoaderData<typeof loader>()

  if (error) {
    return (
      <div className="p-6">
        <div className="text-destructive">错误: {error}</div>
      </div>
    )
  }

  return <SettlementsPage settlements={settlements} />
}
