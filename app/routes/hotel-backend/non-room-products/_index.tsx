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
      const applyUseSettings = formData.get("applyUseSettings") as string

      const errors: Record<string, string> = {}
      if (!productCategory) errors.productCategory = "请选择产品分类"
      if (!productName) errors.productName = "请输入产品名"
      if (!productDescription) errors.productDescription = "请输入产品描述"

      if (Object.keys(errors).length > 0) {
        return json({ success: false, errors }, { status: 400 })
      }

      await NonRoomProductsService.create({
        productCategory,
        productName,
        productDescription,
        applyUseSettings: applyUseSettings || ''
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
