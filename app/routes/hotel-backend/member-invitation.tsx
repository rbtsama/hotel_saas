import { json, type LoaderFunctionArgs, type ActionFunctionArgs } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import MemberInvitationPage from '~/pages/HotelBackend/MemberInvitationPage'
import InvitationService from '~/pages/MemberInvitation/services/invitation.service'

export async function loader({ request }: LoaderFunctionArgs) {
  try {
    // 模拟从session获取酒店ID
    const hotelId = 'H001'

    const records = await InvitationService.getHotelInvitationRecords(hotelId)

    return json({ records, newInvitation: null, error: null })
  } catch (error) {
    return json({ records: [], newInvitation: null, error: '加载邀请记录失败' }, { status: 500 })
  }
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData()
  const action = formData.get('_action')

  try {
    if (action === 'generate') {
      const hotelId = formData.get('hotelId')
      const hotelName = formData.get('hotelName')
      const invitationType = formData.get('invitationType')
      const targetMemberLevel = formData.get('targetMemberLevel')
      const validityHours = formData.get('validityHours')
      const targetCustomerName = formData.get('targetCustomerName')
      const targetCustomerPhone = formData.get('targetCustomerPhone')

      const errors: Record<string, string> = {}

      if (!hotelId || typeof hotelId !== 'string') {
        errors.general = '酒店信息无效'
      }

      if (invitationType === 'targeted') {
        if (!targetCustomerName || typeof targetCustomerName !== 'string' || targetCustomerName.trim().length === 0) {
          errors.targetCustomerName = '客户姓名不能为空'
        }
        if (!targetCustomerPhone || typeof targetCustomerPhone !== 'string' || targetCustomerPhone.trim().length === 0) {
          errors.targetCustomerPhone = '客户手机号不能为空'
        }
      }

      if (Object.keys(errors).length > 0) {
        const records = await InvitationService.getHotelInvitationRecords(hotelId as string)
        return json({ records, newInvitation: null, errors }, { status: 400 })
      }

      const newInvitation = await InvitationService.generateInvitationLink({
        hotelId: hotelId as string,
        hotelName: hotelName as string,
        invitationType: invitationType as 'targeted' | 'unlimited',
        targetMemberLevel: targetMemberLevel as 'VIP1' | 'VIP2' | 'VIP3',
        validityHours: validityHours ? parseInt(validityHours as string) : 72,
        targetCustomerName: targetCustomerName ? (targetCustomerName as string) : undefined,
        targetCustomerPhone: targetCustomerPhone ? (targetCustomerPhone as string) : undefined,
      })

      const records = await InvitationService.getHotelInvitationRecords(hotelId as string)

      return json({ records, newInvitation, error: null })
    }

    if (action === 'cancel') {
      const invitationId = formData.get('invitationId')
      const hotelId = 'H001' // 从session获取

      if (!invitationId || typeof invitationId !== 'string') {
        return json({ records: [], newInvitation: null, error: 'ID无效' }, { status: 400 })
      }

      await InvitationService.cancelInvitation(invitationId)

      const records = await InvitationService.getHotelInvitationRecords(hotelId)
      return json({ records, newInvitation: null, error: null })
    }

    return json({ records: [], newInvitation: null, error: '未知操作' }, { status: 400 })
  } catch (error) {
    const hotelId = 'H001'
    const records = await InvitationService.getHotelInvitationRecords(hotelId)
    return json(
      {
        records,
        newInvitation: null,
        error: error instanceof Error ? error.message : '操作失败',
      },
      { status: 500 }
    )
  }
}

export default function HotelMemberInvitationRoute() {
  const data = useLoaderData<typeof loader>()
  return <MemberInvitationPage records={data.records as any} newInvitation={(data.newInvitation || undefined) as any} error={data.error} />
}
