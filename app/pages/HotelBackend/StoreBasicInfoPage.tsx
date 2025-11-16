/**
 * 门店基本信息编辑页面
 */

import { Form, useNavigation } from '@remix-run/react'
import type { Store } from './types/hotel-backend.types'
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { Label } from '~/components/ui/label'
import MainLayout from '../PointsSystem/components/MainLayout'
import LogicPanel, { LogicTable, LogicList, LogicHighlight } from '~/pages/PointsSystem/components/LogicPanel'

interface StoreBasicInfoPageProps {
  store: Store
}

export default function StoreBasicInfoPage({ store }: StoreBasicInfoPageProps) {
  const navigation = useNavigation()
  const isSubmitting = navigation.state === 'submitting'

  return (
    <MainLayout>
      <div className="flex h-full">
        {/* 左侧：实际后台界面 (60%) */}
        <div className="w-[60%] h-full overflow-y-auto bg-slate-50 p-6">
        <div className="space-y-6 max-w-5xl">
        {/* 页面标题 */}
        <div>
          <h1 className="text-2xl font-bold text-slate-900">门店基本信息</h1>
          <p className="text-sm text-slate-500 mt-1">
            编辑门店的基本信息、媒体资源和推荐内容
          </p>
        </div>

        <Form method="post" className="space-y-6">
          {/* 基本信息 */}
          <Card>
            <CardHeader>
              <CardTitle>基本信息</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                {/* 名称 */}
                <div className="space-y-2">
                  <Label htmlFor="name">
                    名称 <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    defaultValue={store.name}
                    placeholder="如: 原乡芦荻"
                    required
                  />
                </div>

                {/* 城市 */}
                <div className="space-y-2">
                  <Label htmlFor="city">
                    城市 <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="city"
                    name="city"
                    defaultValue={store.city}
                    placeholder="如: 桐庐"
                    required
                  />
                </div>

                {/* 电话 */}
                <div className="space-y-2">
                  <Label htmlFor="phone">
                    电话 <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    defaultValue={store.phone}
                    placeholder="13575481983"
                    required
                  />
                </div>

                {/* 微信号 */}
                <div className="space-y-2">
                  <Label htmlFor="wechat">微信号</Label>
                  <Input
                    id="wechat"
                    name="wechat"
                    defaultValue={store.wechat}
                    placeholder="13575481983"
                  />
                </div>
              </div>

              {/* 地址 */}
              <div className="space-y-2">
                <Label htmlFor="address">
                  地址 <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="address"
                  name="address"
                  defaultValue={store.address}
                  placeholder="桐庐县芦茨村大母山"
                  required
                />
                <p className="text-xs text-slate-500">
                  名称、城市、地址为固定配置信息,如需修改可以联系平台。
                </p>
              </div>

              {/* 经纬度 */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="latitude">纬度</Label>
                  <Input
                    id="latitude"
                    name="latitude"
                    type="number"
                    step="0.0000001"
                    defaultValue={store.latitude}
                    placeholder="29.6890704279134"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="longitude">经度</Label>
                  <Input
                    id="longitude"
                    name="longitude"
                    type="number"
                    step="0.0000001"
                    defaultValue={store.longitude}
                    placeholder="119.668437770"
                  />
                </div>
              </div>

              {/* 开业时间 */}
              <div className="space-y-2">
                <Label htmlFor="openedYear">
                  开业时间 <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="openedYear"
                  name="openedYear"
                  defaultValue={store.openedYear}
                  placeholder="2016"
                  required
                />
              </div>
            </CardContent>
          </Card>

          {/* 推荐信息 */}
          <Card>
            <CardHeader>
              <CardTitle>推荐信息</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* slogan */}
              <div className="space-y-2">
                <Label htmlFor="slogan">
                  slogan或门店推荐语 <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="slogan"
                  name="slogan"
                  defaultValue={store.slogan}
                  placeholder="既是一间民宿，也是一种植根于山野的生活方式。"
                  required
                />
              </div>

              {/* 门店推荐标签 */}
              <div className="space-y-2">
                <Label>门店推荐标签</Label>
                <div className="flex flex-wrap gap-2">
                  {['文艺复古', '有烟火气', '亲子乐享', '奇妙有趣', '融于自然'].map(
                    (tag) => (
                      <label
                        key={tag}
                        className={`flex items-center gap-2 px-3 py-2 border rounded cursor-pointer transition-colors ${
                          store.tags.includes(tag)
                            ? 'bg-blue-50 border-blue-500 text-blue-700'
                            : 'bg-white border-slate-300 hover:bg-slate-50'
                        }`}
                      >
                        <input
                          type="checkbox"
                          name="tags"
                          value={tag}
                          defaultChecked={store.tags.includes(tag)}
                          className="w-4 h-4"
                        />
                        <span className="text-sm">{tag}</span>
                      </label>
                    )
                  )}
                </div>
                <p className="text-xs text-slate-500">
                  注: 此处最多可选择两项,如需新增更多选项可以联系平台。
                </p>
              </div>

              {/* 门店介绍 */}
              <div className="space-y-2">
                <Label htmlFor="description">
                  门店介绍 <span className="text-red-500">*</span>
                </Label>
                <textarea
                  id="description"
                  name="description"
                  defaultValue={store.description}
                  className="w-full min-h-[200px] p-3 border border-slate-300 rounded-md resize-y"
                  placeholder="介绍门店特色、设施、房型等信息..."
                  required
                />
              </div>
            </CardContent>
          </Card>

          {/* 媒体资源 */}
          <Card>
            <CardHeader>
              <CardTitle>媒体资源</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* 门店logo */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="logo">门店logo</Label>
                  <Input
                    id="logo"
                    name="logo"
                    type="url"
                    defaultValue={store.logo}
                    placeholder="图片URL"
                  />
                  {store.logo && (
                    <img
                      src={store.logo}
                      alt="Logo预览"
                      className="w-32 h-32 object-cover border rounded"
                    />
                  )}
                </div>

                {/* 列表封面 */}
                <div className="space-y-2">
                  <Label htmlFor="coverImage">列表封面</Label>
                  <Input
                    id="coverImage"
                    name="coverImage"
                    type="url"
                    defaultValue={store.coverImage}
                    placeholder="图片URL"
                  />
                  {store.coverImage && (
                    <img
                      src={store.coverImage}
                      alt="封面预览"
                      className="w-full h-32 object-cover border rounded"
                    />
                  )}
                </div>
              </div>

              {/* 门店视频 */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="videoUrl">门店视频</Label>
                  <Input
                    id="videoUrl"
                    name="videoUrl"
                    type="url"
                    defaultValue={store.videoUrl}
                    placeholder="视频URL"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="videoCover">视频封面</Label>
                  <Input
                    id="videoCover"
                    name="videoCover"
                    type="url"
                    defaultValue={store.videoCover}
                    placeholder="封面图片URL"
                  />
                  {store.videoCover && (
                    <img
                      src={store.videoCover}
                      alt="视频封面"
                      className="w-full h-32 object-cover border rounded"
                    />
                  )}
                </div>
              </div>

              {/* 最新情报 */}
              <div className="space-y-2">
                <Label>最新情报 (多图)</Label>
                <div className="grid grid-cols-4 gap-3">
                  {store.newsImages.map((img, index) => (
                    <img
                      key={index}
                      src={img}
                      alt={`情报${index + 1}`}
                      className="w-full h-32 object-cover border rounded"
                    />
                  ))}
                </div>
                <Input
                  name="newsImages"
                  type="url"
                  placeholder="添加图片URL"
                />
              </div>
            </CardContent>
          </Card>

          {/* 保存按钮 */}
          <div className="flex justify-end">
            <Button type="submit" size="lg" disabled={isSubmitting}>
              {isSubmitting ? '保存中...' : '保存修改'}
            </Button>
          </div>
        </Form>
        </div>
        </div>

        {/* 右侧：产品&业务逻辑说明 (40%) */}
        <div className="w-[40%] h-full border-l">
          <LogicPanel
            title="门店基本信息"
            sections={[
              {
                title: '业务场景',
                content: (
                  <>
                    <p className="font-semibold mb-2">门店信息的重要性：</p>
                    <LogicList
                      items={[
                        <>门店基本信息是<strong>OTA平台展示的核心内容</strong>（携程、美团、飞猪）</>,
                        <>用户通过门店名称、位置、slogan<strong>快速了解酒店特色</strong></>,
                        <>完善的门店信息可提升<strong>搜索排名和点击率</strong></>,
                        <>门店logo、视频、推荐语是<strong>品牌形象的窗口</strong></>
                      ]}
                    />
                    <LogicHighlight type="info">
                      <p className="text-sm">
                        <strong>行业数据</strong>：携程数据显示，完善门店基本信息的酒店，
                        页面停留时间增加40%，转化率提升25%。slogan和推荐标签是用户决策的关键因素。
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
                      '不知道酒店在哪里、如何联系（缺少位置和电话信息）',
                      '不了解酒店特色和定位（没有slogan和推荐标签）',
                      '无法直观感受酒店环境（缺少logo、视频、最新情报）',
                      '地图导航不准确（经纬度信息缺失或错误）'
                    ]} />

                    <p className="font-semibold mt-4 mb-2">门店经理痛点：</p>
                    <LogicList
                      items={[
                        '不知道该如何撰写吸引人的slogan和门店介绍',
                        '推荐标签选择困难，不知道哪些标签更吸引用户',
                        '媒体资源（logo、视频、图片）分散管理，更新困难',
                        '经纬度信息获取复杂，容易出错'
                      ]}
                    />

                    <p className="font-semibold mt-4 mb-2">平台价值：</p>
                    <LogicList items={[
                      '统一管理门店基本信息、推荐内容、媒体资源',
                      '提供推荐标签选项，方便门店快速配置',
                      '清晰的字段说明和示例，指导门店填写规范内容',
                      '一站式上传logo、视频、最新情报，便于维护'
                    ]} />
                  </>
                )
              },
              {
                title: '功能说明',
                content: (
                  <>
                    <p className="font-semibold mb-2">三大功能模块：</p>
                    <LogicTable
                      headers={['模块', '字段', '说明']}
                      rows={[
                        ['基本信息', '名称、城市、地址', '门店的核心标识信息，固定配置，需联系平台修改'],
                        ['', '电话、微信', '客人联系方式，可随时更新'],
                        ['', '经纬度', '用于地图定位和导航，可从高德/百度地图获取'],
                        ['', '开业时间', '展示门店历史，新开业门店可突出"全新装修"'],
                        ['推荐信息', 'slogan/推荐语', '一句话概括门店特色（30字以内）'],
                        ['', '推荐标签', '最多选2个，突出门店风格（文艺/亲子/自然等）'],
                        ['', '门店介绍', '详细描述门店特色、设施、房型（200-500字）'],
                        ['媒体资源', '门店logo', '品牌标识，建议正方形，支持透明背景'],
                        ['', '列表封面', '在列表页展示，建议3:2比例'],
                        ['', '门店视频', '展示门店环境和特色，建议15-60秒'],
                        ['', '最新情报', '多图展示，用于更新门店动态（活动、美食等）']
                      ]}
                    />

                    <LogicHighlight type="success">
                      <p className="text-sm">
                        <strong>设计理念</strong>：将门店信息分为"固定信息"和"可编辑信息"，
                        固定信息（名称、城市、地址）需联系平台修改，防止随意改动影响订单和评价数据。
                      </p>
                    </LogicHighlight>
                  </>
                )
              },
              {
                title: '字段说明',
                content: (
                  <>
                    <p className="font-semibold mb-3">基本信息字段：</p>
                    <LogicTable
                      headers={['字段名', '必填', '说明', '示例']}
                      rows={[
                        ['名称', '是', '门店完整名称，建议包含品牌+地点', '原乡芦荻·桐庐店'],
                        ['城市', '是', '所在城市名称', '桐庐'],
                        ['电话', '是', '门店联系电话，支持座机和手机', '13575481983 或 0571-12345678'],
                        ['微信号', '否', '方便客人微信联系', '13575481983'],
                        ['地址', '是', '详细地址，便于导航', '桐庐县芦茨村大母山'],
                        ['纬度', '否', '地图定位纬度，精确到小数点后7位', '29.6890704'],
                        ['经度', '否', '地图定位经度，精确到小数点后7位', '119.6684377'],
                        ['开业时间', '是', '年份即可，展示门店历史', '2016']
                      ]}
                    />

                    <p className="font-semibold mt-4 mb-3">推荐信息字段：</p>
                    <LogicTable
                      headers={['字段名', '必填', '说明', '示例']}
                      rows={[
                        ['slogan', '是', '一句话推荐语，30字以内', '既是一间民宿，也是一种植根于山野的生活方式'],
                        ['推荐标签', '否', '最多选2个，突出门店风格', '融于自然、有烟火气'],
                        ['门店介绍', '是', '详细描述，200-500字', '位于富春江畔的芦茨村...']
                      ]}
                    />

                    <LogicHighlight type="warning">
                      <p className="text-sm">
                        <strong>注意事项</strong>：名称、城市、地址是固定配置，一旦设定后需联系平台修改。
                        这是为了防止门店随意改名导致已有订单和评价数据混乱。
                      </p>
                    </LogicHighlight>
                  </>
                )
              },
              {
                title: '操作指南',
                content: (
                  <>
                    <p className="font-semibold mb-2">如何获取经纬度：</p>
                    <LogicList items={[
                      '打开高德地图或百度地图网页版',
                      '搜索门店地址，点击地图标记',
                      '在地图右上角或详情页查看经纬度',
                      '复制经纬度数据，粘贴到对应输入框',
                      '注意：高德地图和百度地图的坐标系不同，建议统一使用高德地图'
                    ]} />

                    <p className="font-semibold mt-4 mb-2">如何撰写吸引人的slogan：</p>
                    <LogicList items={[
                      '突出门店独特卖点（景观、服务、文化）',
                      '控制在30字以内，简洁有力',
                      '避免通用描述（如"环境优美、服务周到"）',
                      '参考同行优秀案例，但不要完全照搬'
                    ]} />

                    <p className="font-semibold mt-4 mb-2">推荐标签选择建议：</p>
                    <LogicTable
                      headers={['标签', '适用场景', '目标客群']}
                      rows={[
                        ['文艺复古', '有特色装修、文化氛围的门店', '文艺青年、摄影爱好者'],
                        ['有烟火气', '贴近当地生活、有人情味的门店', '喜欢体验当地文化的游客'],
                        ['亲子乐享', '有儿童设施、适合家庭的门店', '带孩子的家庭'],
                        ['奇妙有趣', '有独特体验项目的门店', '追求新鲜体验的年轻人'],
                        ['融于自然', '位于自然景观中的门店', '度假、养生客群']
                      ]}
                    />

                    <LogicHighlight type="success">
                      <p className="text-sm">
                        <strong>最佳实践</strong>：slogan + 2个标签 + 300字介绍 = 完整的门店形象。
                        参考携程、美团上评分高的同类酒店，学习他们的文案写作技巧。
                      </p>
                    </LogicHighlight>
                  </>
                )
              },
              {
                title: '媒体资源要求',
                content: (
                  <>
                    <p className="font-semibold mb-2">图片/视频规范：</p>
                    <LogicTable
                      headers={['资源类型', '建议尺寸/时长', '格式', '用途']}
                      rows={[
                        ['门店logo', '正方形（500×500px）', 'PNG（支持透明背景）', '品牌标识，在多处展示'],
                        ['列表封面', '3:2（1200×800px）', 'JPG/PNG', '门店列表页展示'],
                        ['门店视频', '15-60秒', 'MP4', '首页播放，展示门店环境'],
                        ['视频封面', '16:9（1920×1080px）', 'JPG/PNG', '视频播放前的封面图'],
                        ['最新情报', '任意尺寸', 'JPG/PNG', '轮播展示，更新门店动态']
                      ]}
                    />

                    <p className="font-semibold mt-4 mb-2">视频拍摄建议：</p>
                    <LogicList items={[
                      '横屏拍摄（16:9比例），画质清晰',
                      '展示门店外观、大堂、特色房间、周边景观',
                      '配背景音乐（舒缓、符合门店调性），不要配解说',
                      '控制时长15-60秒，过长会影响加载速度',
                      '可使用剪映、快影等工具简单剪辑'
                    ]} />

                    <LogicHighlight type="warning">
                      <p className="text-sm">
                        <strong>法律提示</strong>：使用的图片和视频必须拥有版权，不要从网上随意下载。
                        如使用第三方拍摄的图片，需获得授权。侵权使用会面临法律风险。
                      </p>
                    </LogicHighlight>
                  </>
                )
              },
              {
                title: '最佳实践',
                content: (
                  <>
                    <p className="font-semibold mb-2">携程、美团的要求：</p>
                    <LogicList items={[
                      <><strong>携程</strong>：门店介绍至少200字，slogan突出差异化，必须上传门店视频</>,
                      <><strong>美团</strong>：推荐标签必选，列表封面图必须高清（≥1200px宽）</>,
                      <><strong>飞猪</strong>：门店logo必须上传，用于品牌认证展示</>,
                      <>所有平台都要求：真实、准确、不夸大，虚假宣传会被下架</>
                    ]} />

                    <p className="font-semibold mt-4 mb-2">信息完善度检查清单：</p>
                    <LogicList items={[
                      '✓ 基本信息：名称、城市、地址、电话、开业时间全部填写',
                      '✓ 位置信息：经纬度准确，地图定位无误差',
                      '✓ 推荐内容：slogan有特色、推荐标签已选择、介绍详细（≥200字）',
                      '✓ 媒体资源：logo已上传、列表封面已上传、门店视频已上传',
                      '✓ 最新情报：至少上传4张图片，展示门店动态'
                    ]} />

                    <LogicHighlight type="success">
                      <p className="text-sm">
                        <strong>优化建议</strong>：定期更新"最新情报"，展示门店新活动、时令美食、周边景点等，
                        保持内容新鲜度。参考网红民宿的运营思路，用内容吸引客人。
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
