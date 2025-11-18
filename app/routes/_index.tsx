import { redirect } from "@remix-run/node"

export async function loader() {
  // 首页直接跳转到积分系统配置页面（之前的默认页面）
  return redirect("/points-system/rule-config")
}
