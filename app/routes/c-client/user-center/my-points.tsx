import { json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import MyPointsPage from '~/pages/CClient/UserCenter/MyPointsPage'

export async function loader() {
  return json({
    currentPoints: 150,
    pointsRate: 1.2,
    memberLevel: 'VIP3',
    pointsRecords: [
      { id: '1', date: '11-22 14:30', type: '环保奖励', amount: 5, balance: 150, description: '自带拖鞋' },
      { id: '2', date: '11-22 14:00', type: '抵扣房费', amount: -50, balance: 145, description: 'XX酒店订单' },
      { id: '3', date: '11-22 14:00', type: '兑换早餐', amount: -20, balance: 195, description: 'XX酒店订单' },
      { id: '4', date: '11-15 16:00', type: '邀请奖励', amount: 30, balance: 215, description: '好友张三首次入住' },
    ]
  })
}

export default function MyPointsRoute() {
  const data = useLoaderData<typeof loader>()
  return <MyPointsPage {...data} />
}
