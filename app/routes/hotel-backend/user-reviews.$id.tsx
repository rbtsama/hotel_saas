import { json, type LoaderFunctionArgs } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"
import UserReviewDetailPage from "~/pages/HotelBackend/UserReviews/UserReviewDetailPage"
import UserReviewsService from "~/pages/HotelBackend/UserReviews/services/userReviews.service"

export async function loader({ params }: LoaderFunctionArgs) {
  const { id } = params

  if (!id) {
    return json({ review: null, error: "缺少评价ID" }, { status: 400 })
  }

  try {
    const review = await UserReviewsService.getReviewDetailById(id)
    if (!review) {
      return json({ review: null, error: "未找到该评价" }, { status: 404 })
    }
    return json({ review, error: null })
  } catch (error) {
    return json({ review: null, error: "加载评价详情失败" }, { status: 500 })
  }
}

export default function UserReviewDetailRoute() {
  const { review, error } = useLoaderData<typeof loader>()
  return <UserReviewDetailPage review={review} error={error} />
}
