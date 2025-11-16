import { json, type LoaderFunctionArgs, type ActionFunctionArgs } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"
import MembersPage from "~/pages/MemberManagement/Members/MembersPage"
import MembersService from "~/pages/MemberManagement/Members/services/members.service"
import type { MemberListResponse } from "~/pages/MemberManagement/Members/types/members.types"

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url)
  const phone = url.searchParams.get("phone") || undefined
  const level = url.searchParams.get("level") as any || undefined
  const isPointsMember = url.searchParams.get("isPointsMember") === 'true' ? true : undefined
  const startDate = url.searchParams.get("startDate") || undefined
  const endDate = url.searchParams.get("endDate") || undefined
  const page = Number(url.searchParams.get("page")) || 1
  const pageSize = Number(url.searchParams.get("pageSize")) || 10

  try {
    const result = await MembersService.getMemberList({
      phone,
      level,
      isPointsMember,
      startDate,
      endDate,
      page,
      pageSize
    })
    return json({ result, error: null })
  } catch (error) {
    return json(
      { result: null, error: "加载会员列表失败" },
      { status: 500 }
    )
  }
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData()
  const intent = formData.get("intent")

  try {
    if (intent === "delete") {
      const id = formData.get("id") as string
      const success = await MembersService.deleteMember(id)
      return json({ success })
    }

    return json({ success: false, error: "无效的操作" }, { status: 400 })
  } catch (error) {
    return json({ success: false, error: "操作失败" }, { status: 500 })
  }
}

export default function MembersRoute() {
  const { result, error } = useLoaderData<typeof loader>()
  return <MembersPage result={(result as MemberListResponse) || null} error={error} />
}
