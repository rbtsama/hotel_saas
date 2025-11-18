import { json, redirect, type LoaderFunctionArgs, type ActionFunctionArgs } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import InvitationConfigPage from '~/pages/MemberInvitation/InvitationConfigPage'
import InvitationService from '~/pages/MemberInvitation/services/invitation.service'

export async function loader({ request }: LoaderFunctionArgs) {
  try {
    const configs = await InvitationService.getInvitationConfigs()
    return json({ configs, error: null })
  } catch (error) {
    return json({ configs: [], error: '加载邀请配置失败' }, { status: 500 })
  }
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData()
  const action = formData.get('_action')

  try {
    if (action === 'create') {
      const name = formData.get('name')
      const description = formData.get('description')
      const invitationType = formData.get('invitationType')
      const targetMemberLevel = formData.get('targetMemberLevel')
      const validityHours = formData.get('validityHours')
      const maxInvitations = formData.get('maxInvitations')
      const isActive = formData.get('isActive')

      const errors: Record<string, string> = {}
      if (!name || typeof name !== 'string' || name.trim().length === 0) {
        errors.name = '配置名称不能为空'
      }
      if (!description || typeof description !== 'string' || description.trim().length === 0) {
        errors.description = '配置描述不能为空'
      }

      if (Object.keys(errors).length > 0) {
        return json({ errors }, { status: 400 })
      }

      await InvitationService.createInvitationConfig({
        name: name as string,
        description: description as string,
        invitationType: (invitationType as 'targeted' | 'unlimited') || 'targeted',
        targetMemberLevel: (targetMemberLevel as 'VIP1' | 'VIP2' | 'VIP3') || 'VIP1',
        validityHours: validityHours ? parseInt(validityHours as string) : 72,
        maxInvitations: maxInvitations ? parseInt(maxInvitations as string) : undefined,
        isActive: isActive === 'on',
      })

      return redirect('/member/invitation-config')
    }

    if (action === 'update') {
      const id = formData.get('id')
      const name = formData.get('name')
      const description = formData.get('description')
      const invitationType = formData.get('invitationType')
      const targetMemberLevel = formData.get('targetMemberLevel')
      const validityHours = formData.get('validityHours')
      const maxInvitations = formData.get('maxInvitations')
      const isActive = formData.get('isActive')

      if (!id || typeof id !== 'string') {
        return json({ errors: { general: 'ID无效' } }, { status: 400 })
      }

      await InvitationService.updateInvitationConfig(id, {
        name: name as string,
        description: description as string,
        invitationType: invitationType as 'targeted' | 'unlimited',
        targetMemberLevel: targetMemberLevel as 'VIP1' | 'VIP2' | 'VIP3',
        validityHours: validityHours ? parseInt(validityHours as string) : 72,
        maxInvitations: maxInvitations ? parseInt(maxInvitations as string) : undefined,
        isActive: isActive === 'on',
      })

      return redirect('/member/invitation-config')
    }

    if (action === 'delete') {
      const id = formData.get('id')
      if (!id || typeof id !== 'string') {
        return json({ errors: { general: 'ID无效' } }, { status: 400 })
      }

      await InvitationService.deleteInvitationConfig(id)
      return redirect('/member/invitation-config')
    }

    return json({ errors: { general: '未知操作' } }, { status: 400 })
  } catch (error) {
    return json({ errors: { general: error instanceof Error ? error.message : '操作失败' } }, { status: 500 })
  }
}

export default function InvitationConfigRoute() {
  const data = useLoaderData<typeof loader>()
  return <InvitationConfigPage configs={data.configs as any} error={data.error} />
}
