/**
 * 平台后台 - 房价管理路由
 */

import { json, type LoaderFunctionArgs } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import PricingPage from '~/pages/PlatformAdmin/Hotel/PricingPage'
import HotelService from '~/pages/PlatformAdmin/Hotel/services/hotel.service'
import dayjs from 'dayjs'

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url)
  const yearParam = url.searchParams.get('year')
  const monthParam = url.searchParams.get('month')

  const today = dayjs()
  const year = yearParam ? parseInt(yearParam) : today.year()
  const month = monthParam ? parseInt(monthParam) : today.month() + 1

  try {
    const [roomTypes, prices] = await Promise.all([
      HotelService.getRoomTypes(),
      HotelService.getDailyPrices(year, month),
    ])

    return json({
      roomTypes,
      prices,
      year,
      month,
      error: null,
    })
  } catch (error) {
    console.error('加载房价数据失败:', error)
    return json(
      {
        roomTypes: [],
        prices: [],
        year,
        month,
        error: '加载数据失败',
      },
      { status: 500 }
    )
  }
}

export default function PricingRoute() {
  const { roomTypes, prices, year, month, error } = useLoaderData<typeof loader>()

  if (error) {
    return (
      <div className="h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <p className="text-lg text-red-600 mb-4">错误: {error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            重新加载
          </button>
        </div>
      </div>
    )
  }

  return (
    <PricingPage
      roomTypes={roomTypes as any}
      initialPrices={prices as any}
      initialYear={year}
      initialMonth={month}
    />
  )
}
