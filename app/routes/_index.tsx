import { redirect } from "@remix-run/node"

export async function loader() {
  // 首页直接跳转到产品架构总图
  return redirect("/architecture/product/overview")
}
