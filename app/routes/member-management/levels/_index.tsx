import { json, type LoaderFunctionArgs, type ActionFunctionArgs } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"
import MemberLevelsPage from "~/pages/MemberManagement/MemberLevels/MemberLevelsPage"
import MemberLevelsService from "~/pages/MemberManagement/MemberLevels/services/memberLevels.service"
import type { MemberLevel } from "~/pages/MemberManagement/MemberLevels/types/memberLevels.types"

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url)
  const levelName = url.searchParams.get("levelName") || undefined
  const status = url.searchParams.get("status") as any || undefined

  try {
    const levels = await MemberLevelsService.getLevelList({ levelName, status })
    return json({ levels, error: null })
  } catch (error) {
    return json({ levels: [], error: "加载会员等级失败" }, { status: 500 })
  }
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData()
  const intent = formData.get("intent")

  try {
    if (intent === "delete") {
      const id = formData.get("id") as string
      const success = await MemberLevelsService.deleteLevel(id)
      return json({ success })
    }

    return json({ success: false, error: "无效的操作" }, { status: 400 })
  } catch (error) {
    return json({ success: false, error: "操作失败" }, { status: 500 })
  }
}

export default function MemberLevelsRoute() {
  const { levels, error } = useLoaderData<typeof loader>()
  return <MemberLevelsPage levels={(levels as MemberLevel[]) || []} error={error} />
}
