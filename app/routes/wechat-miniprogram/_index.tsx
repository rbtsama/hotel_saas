import { json, type LoaderFunctionArgs } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import WechatMiniprogramPage from '~/pages/WechatMiniprogram/WechatMiniprogramPage'
import MiniprogramService from '~/pages/WechatMiniprogram/services/miniprogram.service'

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url)
  const search = url.searchParams.get('search') || undefined

  try {
    const modules = search
      ? await MiniprogramService.searchFeatures(search)
      : await MiniprogramService.getAllModules()

    const membershipLevels = await MiniprogramService.getMembershipLevels()
    const summary = MiniprogramService.getModuleSummary()

    return json({
      modules,
      membershipLevels,
      summary,
      error: null
    })
  } catch (error) {
    return json(
      {
        modules: [],
        membershipLevels: [],
        summary: { totalModules: 0, totalFeatures: 0, totalScreens: 0 },
        error: 'Failed to load miniprogram data'
      },
      { status: 500 }
    )
  }
}

export default function WechatMiniprogramRoute() {
  const { modules, membershipLevels, summary, error } = useLoaderData<typeof loader>()

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-destructive">Error: {error}</div>
      </div>
    )
  }

  return (
    <WechatMiniprogramPage
      modules={modules}
      membershipLevels={membershipLevels}
      summary={summary}
    />
  )
}
