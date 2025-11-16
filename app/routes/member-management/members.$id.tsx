import { json, type LoaderFunctionArgs } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"
import MemberDetailPage from "~/pages/MemberManagement/Members/MemberDetailPage"
import MembersService from "~/pages/MemberManagement/Members/services/members.service"

export async function loader({ params }: LoaderFunctionArgs) {
  const { id } = params

  if (!id) {
    return json({ member: null, error: "缺少会员ID" }, { status: 400 })
  }

  try {
    const member = await MembersService.getMemberDetailById(id)
    if (!member) {
      return json({ member: null, error: "未找到该会员" }, { status: 404 })
    }
    return json({ member, error: null })
  } catch (error) {
    return json({ member: null, error: "加载会员详情失败" }, { status: 500 })
  }
}

export default function MemberDetailRoute() {
  const { member, error } = useLoaderData<typeof loader>()
  return <MemberDetailPage member={member} error={error} />
}
