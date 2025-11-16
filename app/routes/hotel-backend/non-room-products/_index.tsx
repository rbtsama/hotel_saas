import { json, redirect, type LoaderFunctionArgs, type ActionFunctionArgs } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"
import NonRoomProductsPage from "~/pages/HotelBackend/NonRoomProducts/NonRoomProductsPage"
import NonRoomProductsService from "~/pages/HotelBackend/NonRoomProducts/services/nonRoomProducts.service"
import type { NonRoomProduct } from "~/pages/HotelBackend/NonRoomProducts/types/nonRoomProducts.types"

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url)
  const search = url.searchParams.get("search") || undefined
  const productCategory = url.searchParams.get("productCategory") || undefined

  try {
    const products = await NonRoomProductsService.getList({ search, productCategory })
    return json({ products, error: null })
  } catch (error) {
    return json({ products: [], error: "加载非房产品失败" }, { status: 500 })
  }
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData()
  const intent = formData.get("intent")

  try {
    if (intent === "delete") {
      const id = formData.get("id") as string
      await NonRoomProductsService.delete(id)
      return json({ success: true })
    }

    if (intent === "create") {
      const productCategory = formData.get("productCategory") as string
      const productName = formData.get("productName") as string
      const productDescription = formData.get("productDescription") as string
      const price = parseFloat(formData.get("price") as string)
      const pricingType = formData.get("pricingType") as 'per_time' | 'per_hour' | 'per_person' | 'fixed'
      const inventory = formData.get("inventory") ? parseInt(formData.get("inventory") as string) : undefined
      const duration = formData.get("duration") ? parseInt(formData.get("duration") as string) : undefined
      const needsAppointment = formData.get("needsAppointment") === 'on'
      const applyUseSettings = formData.get("applyUseSettings") as string
      const status = (formData.get("status") as 'active' | 'inactive') || 'active'

      const errors: Record<string, string> = {}
      if (!productCategory) errors.productCategory = "请选择产品分类"
      if (!productName) errors.productName = "请输入产品名"
      if (!productDescription) errors.productDescription = "请输入产品描述"
      if (!price || price <= 0) errors.price = "请输入有效的价格"
      if (!pricingType) errors.pricingType = "请选择计价方式"

      if (Object.keys(errors).length > 0) {
        return json({ success: false, errors }, { status: 400 })
      }

      await NonRoomProductsService.create({
        productCategory,
        productName,
        productDescription,
        price,
        pricingType,
        inventory,
        duration,
        needsAppointment,
        applyUseSettings: applyUseSettings || '',
        status
      })

      return redirect("/hotel-backend/non-room-products")
    }

    return json({ success: false, error: "无效的操作" }, { status: 400 })
  } catch (error) {
    return json({ success: false, error: "操作失败" }, { status: 500 })
  }
}

export default function NonRoomProductsRoute() {
  const { products, error } = useLoaderData<typeof loader>()
  return <NonRoomProductsPage products={(products as NonRoomProduct[]) || []} error={error} />
}
