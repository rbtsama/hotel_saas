import { json } from "@remix-run/node"
import OverviewPage from "~/pages/Architecture/ProductArchitecture/OverviewPage"

export async function loader() {
  return json({})
}

export default function ArchitectureOverviewRoute() {
  return <OverviewPage />
}
