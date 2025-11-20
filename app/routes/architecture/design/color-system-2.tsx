import { json, type LoaderFunctionArgs } from "@remix-run/node";
import ColorSystem2Page from "~/pages/Architecture/DesignSystem/ColorSystem2Page";

export async function loader({ request }: LoaderFunctionArgs) {
  // 配色系统页面无需加载数据，纯展示
  return json({ success: true });
}

export default function ColorSystem2Route() {
  return <ColorSystem2Page />;
}
