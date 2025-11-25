import { useState, useRef } from 'react'
import { Form, useFetcher } from '@remix-run/react'
import type { RoomTypeImages } from './types/roomTypeImages.types'
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card'
import { Input } from '~/components/ui/input'
import { Button } from '~/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '~/components/ui/select'
import { Plus, Trash2, Search } from 'lucide-react'
import MainLayout from '~/pages/PointsSystem/components/MainLayout'

interface RoomTypeImagesPageProps {
  roomTypes: RoomTypeImages[]
  error: string | null
}

export default function RoomTypeImagesPage({ roomTypes, error }: RoomTypeImagesPageProps) {
  const [searchValue, setSearchValue] = useState('')
  const [buildingNumber, setBuildingNumber] = useState('')
  const fileInputRefs = useRef<{ [key: string]: HTMLInputElement | null }>({})
  const fetcher = useFetcher()

  const handleImageUpload = (roomTypeId: string, file: File) => {
    const formData = new FormData()
    formData.append('intent', 'upload')
    formData.append('roomTypeId', roomTypeId)
    formData.append('image', file)
    fetcher.submit(formData, { method: 'post', encType: 'multipart/form-data' })
  }

  const handleImageDelete = (roomTypeId: string, imageId: string) => {
    const formData = new FormData()
    formData.append('intent', 'delete')
    formData.append('roomTypeId', roomTypeId)
    formData.append('imageId', imageId)
    fetcher.submit(formData, { method: 'post' })
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="text-destructive">错误: {error}</div>
      </div>
    )
  }

  return (
    <MainLayout>
      <div className="p-6 bg-background">
        <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>房型图片管理</CardTitle>
              </CardHeader>
              <CardContent>
                <Form method="get" className="mb-6 flex gap-3">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      name="search"
                      value={searchValue}
                      onChange={(e) => setSearchValue(e.target.value)}
                      placeholder="请选择类型"
                      className="pl-9"
                    />
                  </div>
                  <Select
                    name="buildingNumber"
                    value={buildingNumber}
                    onValueChange={setBuildingNumber}
                  >
                    <SelectTrigger className="w-[200px]">
                      <SelectValue placeholder="房型" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">全部</SelectItem>
                      <SelectItem value="1号院">1号院</SelectItem>
                      <SelectItem value="2号院">2号院</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button type="submit" variant="default">
                    <Search className="h-4 w-4 mr-2" />
                    筛选
                  </Button>
                </Form>

                <div className="space-y-6">
                  {roomTypes.map((roomType) => (
                    <div key={roomType.id} className="border-b pb-6 last:border-b-0">
                      <div className="mb-4">
                        <h3 className="text-lg font-medium">
                          {roomType.roomTypeName}【{roomType.buildingNumber}】
                        </h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          请上传图片，至少1张，建议尺寸3:2，支持PNG、JPG、JPEG格式，
                          大小幅小于5M，最多可上传{roomType.maxImages}张。
                        </p>
                      </div>

                      <div className="grid grid-cols-6 gap-4">
                        {roomType.images.map((image) => (
                          <div
                            key={image.id}
                            className="relative aspect-[3/2] rounded-lg overflow-hidden group bg-muted"
                          >
                            <img
                              src={image.thumbnail || image.url}
                              alt={roomType.roomTypeName}
                              className="w-full h-full object-cover"
                            />
                            <button
                              type="button"
                              onClick={() => handleImageDelete(roomType.id, image.id)}
                              className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity"
                              disabled={fetcher.state !== 'idle'}
                            >
                              <div className="bg-background text-foreground px-3 py-1 rounded text-sm">
                                删除
                              </div>
                            </button>
                          </div>
                        ))}

                        {roomType.images.length < roomType.maxImages && (
                          <div
                            className="relative aspect-[3/2] rounded-lg border-2 border-dashed border-muted-foreground/25 hover:border-muted-foreground/50 transition-colors cursor-pointer flex items-center justify-center"
                            onClick={() => fileInputRefs.current[roomType.id]?.click()}
                          >
                            <Plus className="h-8 w-8 text-muted-foreground" />
                            <input
                              ref={(el) => {
                                fileInputRefs.current[roomType.id] = el
                              }}
                              type="file"
                              accept="image/png,image/jpeg,image/jpg"
                              className="hidden"
                              onChange={(e) => {
                                const file = e.target.files?.[0]
                                if (file) {
                                  if (file.size > 5 * 1024 * 1024) {
                                    alert('图片大小不能超过5M')
                                    return
                                  }
                                  handleImageUpload(roomType.id, file)
                                  e.target.value = ''
                                }
                              }}
                              disabled={fetcher.state !== 'idle'}
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  ))}

                  {roomTypes.length === 0 && (
                    <div className="text-center py-12 text-muted-foreground">
                      暂无房型数据
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
        </div>
      </div>
    </MainLayout>
  )
}
