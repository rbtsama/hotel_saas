import { json, type LoaderFunctionArgs, type ActionFunctionArgs } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"
import PMSIntegrationPage from "~/pages/HotelBackend/PMSIntegration/PMSIntegrationPage"
import PMSIntegrationService from "~/pages/HotelBackend/PMSIntegration/services/pmsIntegration.service"
import type { PMSIntegrationConfig } from "~/pages/HotelBackend/PMSIntegration/types/pmsIntegration.types"

export async function loader({ request }: LoaderFunctionArgs) {
  try {
    const config = await PMSIntegrationService.getConfig()
    return json({ config, error: null })
  } catch (error) {
    return json(
      { config: null, error: "加载PMS配置失败" },
      { status: 500 }
    )
  }
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData()
  const intent = formData.get("intent")

  try {
    if (intent === "updateConfig") {
      const isPMSEnabled = formData.get("isPMSEnabled") === "true"
      const pmsProvider = formData.get("pmsProvider") as string
      const pmsStoreId = formData.get("pmsStoreId") as string

      const config = await PMSIntegrationService.updateConfig({
        isPMSEnabled,
        pmsProvider: isPMSEnabled ? pmsProvider : undefined,
        pmsStoreId: isPMSEnabled ? pmsStoreId : undefined
      })

      return json({ success: true, config })
    }

    if (intent === "updateMapping") {
      const mappingId = formData.get("mappingId") as string
      const pmsRoomTypeName = formData.get("pmsRoomTypeName") as string
      const pmsRoomTypeId = formData.get("pmsRoomTypeId") as string

      const mapping = await PMSIntegrationService.updateRoomTypeMapping(
        mappingId,
        pmsRoomTypeName,
        pmsRoomTypeId
      )

      if (!mapping) {
        return json({ success: false, error: "房型映射不存在" }, { status: 404 })
      }

      return json({ success: true, mapping })
    }

    if (intent === "syncPMS") {
      const pmsStoreId = formData.get("pmsStoreId") as string
      const result = await PMSIntegrationService.syncWithPMS(pmsStoreId)
      return json({ success: result.success, message: result.message })
    }

    return json({ success: false, error: "无效的操作" }, { status: 400 })
  } catch (error) {
    return json({ success: false, error: "操作失败" }, { status: 500 })
  }
}

export default function PMSIntegrationRoute() {
  const { config, error } = useLoaderData<typeof loader>()
  return <PMSIntegrationPage config={(config as PMSIntegrationConfig) || null} error={error} />
}
