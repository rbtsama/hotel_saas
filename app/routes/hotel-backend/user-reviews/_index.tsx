import { json, type LoaderFunctionArgs, type ActionFunctionArgs } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"
import UserReviewsPage from "~/pages/HotelBackend/UserReviews/UserReviewsPage"
import UserReviewsService from "~/pages/HotelBackend/UserReviews/services/userReviews.service"
import type { UserReviewListResponse } from "~/pages/HotelBackend/UserReviews/types/userReviews.types"

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url)
  const startDate = url.searchParams.get("startDate") || undefined
  const endDate = url.searchParams.get("endDate") || undefined
  const guestName = url.searchParams.get("guestName") || undefined
  const guestPhone = url.searchParams.get("guestPhone") || undefined
  const roomType = url.searchParams.get("roomType") || undefined
  const page = Number(url.searchParams.get("page")) || 1
  const pageSize = Number(url.searchParams.get("pageSize")) || 10

  try {
    const result = await UserReviewsService.getReviewList({
      startDate,
      endDate,
      guestName,
      guestPhone,
      roomType,
      page,
      pageSize
    })
    return json({ result, error: null })
  } catch (error) {
    return json(
      { result: null, error: "加载用户点赞列表失败" },
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
      const success = await UserReviewsService.deleteReview(id)
      return json({ success })
    }

    return json({ success: false, error: "无效的操作" }, { status: 400 })
  } catch (error) {
    return json({ success: false, error: "操作失败" }, { status: 500 })
  }
}

export default function UserReviewsRoute() {
  const { result, error } = useLoaderData<typeof loader>()
  return <UserReviewsPage result={(result as UserReviewListResponse) || null} error={error} />
}
