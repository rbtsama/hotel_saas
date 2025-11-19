import { json, redirect, type LoaderFunctionArgs, type ActionFunctionArgs } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import FinancialStatementsPage from '~/pages/HotelBackend/BusinessManagement/FinancialStatementsPage'
import businessService from '~/pages/HotelBackend/BusinessManagement/services/business.service'

export async function loader({ request }: LoaderFunctionArgs) {
  try {
    const statements = await businessService.getFinancialStatements()
    return json({ statements, error: null })
  } catch (error) {
    return json({ statements: [], error: '获取对账单失败' }, { status: 500 })
  }
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData()
  const action = formData.get('action')
  const statementId = formData.get('statementId')

  if (action === 'confirm' && typeof statementId === 'string') {
    try {
      await businessService.confirmStatement(statementId)
      return redirect('/hotel-backend/business/financial-statements')
    } catch (error) {
      return json({ error: '确认对账单失败' }, { status: 500 })
    }
  }

  return json({ error: '无效操作' }, { status: 400 })
}

export default function FinancialStatementsRoute() {
  const { statements, error } = useLoaderData<typeof loader>()

  if (error) {
    return (
      <div className="p-6">
        <div className="text-destructive">错误: {error}</div>
      </div>
    )
  }

  return <FinancialStatementsPage statements={statements} />
}
