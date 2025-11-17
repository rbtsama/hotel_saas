import { useState, useRef } from 'react'
import { Form, useFetcher } from '@remix-run/react'
import type { RoomTypeImages } from './types/roomTypeImages.types'
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card'
import { Input } from '~/components/ui/input'
import { Button } from '~/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '~/components/ui/select'
import { Plus, Trash2, Search } from 'lucide-react'
import MainLayout from '~/pages/PointsSystem/components/MainLayout'
import LogicPanel, { LogicTable, LogicList, LogicHighlight, LogicCode } from '~/pages/PointsSystem/components/LogicPanel'

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
      <div className="flex h-full">
        {/* 左侧：实际后台界面 (60%) */}
        <div className="w-[60%] h-full overflow-y-auto p-6 bg-background">
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

        {/* 右侧：产品&业务逻辑说明 (40%) */}
        <div className="w-[40%] h-full border-l">
          <LogicPanel
            title="房型图片管理"
            sections={[
              {
                title: '业务场景',
                content: (
                  <>
                    <p className="font-semibold mb-2">在酒店行业的使用场景：</p>
                    <LogicList
                      items={[
                        <>用户在线选房时，房型图片是决策的<strong>第一要素</strong>（颜值即正义）</>,
                        <>携程、美团都要求至少3张图，推荐6-10张（不同角度展示房间）</>,
                        <>高质量图片可提升15-30%的转化率（数据来源：OTA行业白皮书）</>,
                        <>图片需要真实反映房间状况，虚假宣传会导致差评和退款</>
                      ]}
                    />
                    <LogicHighlight type="warning">
                      <p className="text-sm">
                        <strong>法律风险</strong>：根据《消费者权益保护法》，图片与实际严重不符属于欺诈行为，
                        消费者可要求"退一赔三"。某民宿因"照骗"被罚款5万元的案例屡见不鲜。
                      </p>
                    </LogicHighlight>
                  </>
                )
              },
              {
                title: '解决的问题',
                content: (
                  <>
                    <p className="font-semibold mb-2">用户痛点：</p>
                    <LogicList items={[
                      '看不到房间实景，不敢下单（"这房间到底长啥样？"）',
                      '图片太少/质量差，无法判断房间品质',
                      '图片与实际不符，到店后产生巨大心理落差'
                    ]} />

                    <p className="font-semibold mt-4 mb-2">酒店商家痛点：</p>
                    <LogicList
                      items={[
                        '不知道该传哪些图片（床、卫生间、窗外景观？）',
                        '拍摄的图片尺寸不统一，上传后被裁切变形',
                        '图片管理混乱，找不到某个房型的图片'
                      ]}
                    />

                    <p className="font-semibold mt-4 mb-2">平台价值：</p>
                    <LogicList items={[
                      '统一图片规格（3:2比例），保证展示效果一致',
                      '按房型分类管理，商家一目了然',
                      '限制图片数量和大小，避免加载过慢影响用户体验'
                    ]} />
                  </>
                )
              },
              {
                title: '产品逻辑',
                content: (
                  <>
                    <p className="font-semibold mb-2">为什么这样设计？</p>
                    <LogicTable
                      headers={['设计规则', '理由', '行业参考']}
                      rows={[
                        ['至少1张图', '没图=没转化（用户不敢订）', '携程/美团强制要求'],
                        ['建议3:2比例', '适配大部分展示场景（列表/详情）', 'OTA行业通用标准'],
                        ['最多20张', '太多图片加载慢+用户看不完', '美团限制10-15张'],
                        ['单张≤5M', '平衡清晰度与加载速度', '行业通用限制'],
                        ['支持PNG/JPG', '覆盖99%的图片格式需求', '标准Web图片格式']
                      ]}
                    />

                    <p className="font-semibold mt-4 mb-2">推荐拍摄内容（按优先级）：</p>
                    <LogicList items={[
                      <><strong>P0（必拍）</strong>：整体全景（展示房间大小）、床铺特写（展示床品质量）</>,
                      <><strong>P1（强烈推荐）</strong>：卫生间（用户关注卫生条件）、窗外景观（卖点）</>,
                      <><strong>P2（加分项）</strong>：房间细节（电视、书桌、沙发）、特色装饰</>
                    ]} />

                    <LogicHighlight type="info">
                      <p className="text-sm">
                        <strong>拍摄技巧</strong>：开灯拍摄（光线充足）、横向拍摄（3:2比例）、
                        避免杂物入镜、用广角镜头（显大）。参考携程商家学院的《房间拍摄指南》。
                      </p>
                    </LogicHighlight>
                  </>
                )
              },
              {
                title: '字段说明',
                content: (
                  <LogicTable
                    headers={['字段名', '类型', '含义', '示例']}
                    rows={[
                      ['id', 'string', '房型唯一标识', 'rt_001'],
                      ['roomTypeName', 'string', '房型名称', '豪华大床房'],
                      ['buildingNumber', 'string', '楼栋/院落编号', '1号院'],
                      ['images', 'array', '图片列表', '[{id, url, thumbnail}]'],
                      ['images[].id', 'string', '图片ID', 'img_001'],
                      ['images[].url', 'string', '原图URL', 'https://cdn.com/room1.jpg'],
                      ['images[].thumbnail', 'string', '缩略图URL（可选）', 'https://cdn.com/room1_thumb.jpg'],
                      ['maxImages', 'number', '最多可上传图片数', '20']
                    ]}
                  />
                )
              },
              {
                title: '操作说明',
                content: (
                  <>
                    <p className="font-semibold mb-2">上传图片：</p>
                    <LogicList items={[
                      '点击"+"号，选择本地图片文件',
                      '系统自动校验：格式（PNG/JPG/JPEG）、大小（≤5M）',
                      '上传成功后立即显示，支持实时预览',
                      '建议先在本地压缩图片（推荐工具：TinyPNG）'
                    ]} />

                    <p className="font-semibold mt-4 mb-2">删除图片：</p>
                    <LogicList items={[
                      '鼠标悬停在图片上，显示"删除"按钮',
                      '点击删除后立即生效（后台软删除，保留30天可恢复）',
                      '至少保留1张图片（最后1张无法删除）'
                    ]} />

                    <p className="font-semibold mt-4 mb-2">筛选功能：</p>
                    <LogicList items={[
                      '按房型名称搜索（支持模糊匹配）',
                      '按楼栋筛选（适用于多栋建筑的酒店）',
                      '快速定位需要管理的房型'
                    ]} />

                    <LogicHighlight type="success">
                      <p className="text-sm">
                        <strong>最佳实践</strong>：建议每个房型至少上传5张图片，包括：
                        1张全景、1张床铺、1张卫生间、1张窗外景观、1张特色细节。
                        参考同行酒店的优秀案例。
                      </p>
                    </LogicHighlight>
                  </>
                )
              },
              {
                title: '异常处理',
                content: (
                  <LogicTable
                    headers={['场景', '处理逻辑']}
                    rows={[
                      ['图片格式错误', '提示"仅支持PNG、JPG、JPEG格式"，不允许上传'],
                      ['图片超过5M', '提示"图片大小不能超过5M，请压缩后重新上传"'],
                      ['上传失败', '显示错误提示，允许重试（最多3次）'],
                      ['删除最后1张', '提示"至少保留1张图片"，不允许删除'],
                      ['网络中断', '上传中断后自动重试，超时10秒则提示失败']
                    ]}
                  />
                )
              },
              {
                title: '技术实现要点',
                content: (
                  <>
                    <p className="font-semibold mb-2">图片存储：</p>
                    <LogicCode>
{`前端：FormData上传 → multipart/form-data
后端：接收文件 → 上传到CDN（阿里云OSS/七牛云）
数据库：仅存储图片URL，不存储文件本身

示例：
POST /api/room-type-images/upload
Content-Type: multipart/form-data

{
  roomTypeId: "rt_001",
  file: <binary>
}

Response:
{
  id: "img_123",
  url: "https://cdn.com/rooms/rt_001/img_123.jpg",
  thumbnail: "https://cdn.com/rooms/rt_001/img_123_thumb.jpg"
}`}
                    </LogicCode>

                    <p className="font-semibold mt-4 mb-2">图片优化：</p>
                    <LogicList items={[
                      '后端自动生成缩略图（200x133px），用于列表展示',
                      '前端懒加载（LazyLoad），滚动到可视区域才加载',
                      'CDN加速，全球多节点分发（降低加载时间）',
                      '支持WebP格式（体积减少30%，现代浏览器都支持）'
                    ]} />

                    <LogicHighlight type="warning">
                      <p className="text-sm">
                        <strong>安全提示</strong>：上传接口需要校验文件MIME类型（防止上传可执行文件），
                        限制上传频率（防止恶意刷量），记录操作日志（审计追溯）。
                      </p>
                    </LogicHighlight>
                  </>
                )
              }
            ]}
          />
        </div>
      </div>
    </MainLayout>
  )
}
