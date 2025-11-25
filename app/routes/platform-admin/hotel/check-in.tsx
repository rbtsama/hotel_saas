/**
 * 平台后台 - 入住管理路由
 */

import { json, redirect, type LoaderFunctionArgs, type ActionFunctionArgs } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import CheckInPage from '~/pages/PlatformAdmin/Hotel/CheckInPage'
import HotelService from '~/pages/PlatformAdmin/Hotel/services/hotel.service'

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url)
  const keyword = url.searchParams.get('keyword') || undefined

  try {
    const [waitingCheckIns, checkedInGuests, availableRooms] = await Promise.all([
      HotelService.getWaitingCheckIns({ keyword }),
      HotelService.getCheckedInGuests({ keyword }),
      HotelService.getAvailableRooms(),
    ])

    return json({
      waitingCheckIns,
      checkedInGuests,
      availableRooms,
      error: null,
    })
  } catch (error) {
    console.error('Failed to load check-in data:', error)
    return json(
      {
        waitingCheckIns: [],
        checkedInGuests: [],
        availableRooms: [],
        error: 'Failed to load data',
      },
      { status: 500 }
    )
  }
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData()
  const actionType = formData.get('action')

  try {
    switch (actionType) {
      case 'check-in': {
        const recordId = formData.get('recordId') as string
        const guestName = formData.get('guestName') as string
        const guestPhone = formData.get('guestPhone') as string
        const guestIdCard = formData.get('guestIdCard') as string
        const roomNumber = formData.get('roomNumber') as string
        const depositAmount = Number(formData.get('depositAmount'))

        await HotelService.checkIn(recordId, {
          guestName,
          guestPhone,
          guestIdCard,
          roomNumber,
          depositAmount,
        })

        return redirect('/platform-admin/hotel/check-in')
      }

      case 'check-out': {
        const recordId = formData.get('recordId') as string
        await HotelService.checkOut(recordId)
        return redirect('/platform-admin/hotel/check-in')
      }

      case 'extend-stay': {
        const recordId = formData.get('recordId') as string
        const newCheckOutDate = formData.get('newCheckOutDate') as string
        await HotelService.extendStay(recordId, newCheckOutDate)
        return redirect('/platform-admin/hotel/check-in')
      }

      default:
        return json({ error: 'Invalid action' }, { status: 400 })
    }
  } catch (error) {
    console.error('Action failed:', error)
    return json({ error: error instanceof Error ? error.message : 'Action failed' }, { status: 500 })
  }
}

export default function CheckInRoute() {
  const { waitingCheckIns, checkedInGuests, availableRooms, error } = useLoaderData<typeof loader>()

  if (error) {
    return (
      <div className="p-6">
        <div className="text-red-600">Error: {error}</div>
      </div>
    )
  }

  return (
    <CheckInPage
      waitingCheckIns={waitingCheckIns}
      checkedInGuests={checkedInGuests}
      availableRooms={availableRooms}
    />
  )
}
