import { json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import MemberCenterPage from '~/pages/CClient/UserCenter/MemberCenterPage'

export async function loader() {
  return json({
    currentLevel: 3,
    levelName: 'VIP3',
    validityDate: '2026-10-15',
    totalNights: 32,
    upgradeTarget: { level: 4, needs: 28 },
    maintainProgress: { current: 12, target: 15 },
  })
}

export default function MemberCenterRoute() {
  const data = useLoaderData<typeof loader>()
  return <MemberCenterPage {...data} />
}
