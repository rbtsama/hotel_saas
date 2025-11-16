import { Form } from '@remix-run/react'
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { ChevronUp, ChevronDown } from 'lucide-react'
import MainLayout from '../PointsSystem/components/MainLayout'
import LogicPanel, { LogicTable, LogicList, LogicHighlight } from '~/pages/PointsSystem/components/LogicPanel'

interface StoreImagesPageProps {
  shareImage?: string
  shareTitle: string
  homeImages: string[]
}

export default function StoreImagesPage({ shareImage, shareTitle, homeImages }: StoreImagesPageProps) {
  return (
    <MainLayout>
      <div className="flex h-full">
        {/* 左侧：实际后台界面 (60%) */}
        <div className="w-[60%] h-full overflow-y-auto bg-slate-50 p-6">
        <div className="space-y-6 max-w-4xl">
        <h1 className="text-2xl font-bold">门店图片</h1>

        <Form method="post" className="space-y-6">
          {/* 小程序分享图 */}
          <Card>
            <CardHeader>
              <CardTitle>小程序分享图</CardTitle>
              <p className="text-sm text-slate-500">
                用于将门店分享给客人时生成链接的封面图片和标题。(建议尺寸5:4,支持png、jpg格式)
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              {shareImage && (
                <div className="relative w-64">
                  <img src={shareImage} alt="分享图" className="w-full border rounded" />
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    className="absolute top-2 right-2"
                  >
                    删除
                  </Button>
                </div>
              )}
              <Input name="shareImage" type="url" placeholder="上传分享图URL" />

              <div>
                <label className="text-sm font-medium mb-2 block">小程序分享展示文案</label>
                <Input name="shareTitle" defaultValue={shareTitle} placeholder="桐庐原乡芦荻" />
              </div>
            </CardContent>
          </Card>

          {/* 门店主页首图 */}
          <Card>
            <CardHeader>
              <CardTitle>门店主页首图</CardTitle>
              <p className="text-sm text-slate-500">
                可以拖动图片顺序调整展现顺序(建议图片比例2:3,图片宽度1000px~2000px,最多5张,支持png、jpg格式,图片不大于5M。)
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-5 gap-4">
                {homeImages.map((img, index) => (
                  <div key={index} className="relative group">
                    <img src={img} alt={`首图${index + 1}`} className="w-full h-48 object-cover border rounded" />
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      className="absolute top-2 right-2"
                    >
                      删除
                    </Button>
                    <div className="absolute top-2 left-2 flex gap-1">
                      {index > 0 && (
                        <Button type="button" variant="secondary" size="sm" className="h-6 w-6 p-0">
                          <ChevronUp className="w-4 h-4" />
                        </Button>
                      )}
                      {index < homeImages.length - 1 && (
                        <Button type="button" variant="secondary" size="sm" className="h-6 w-6 p-0">
                          <ChevronDown className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              {homeImages.length < 5 && (
                <Input name="newHomeImage" type="url" placeholder="添加门店主页首图URL" />
              )}
            </CardContent>
          </Card>

          <div className="flex justify-end">
            <Button type="submit" size="lg">保存门店图片</Button>
          </div>
        </Form>
        </div>
        </div>

        {/* 右侧：产品&业务逻辑说明 (40%) */}
        <div className="w-[40%] h-full border-l">
          <LogicPanel
            title="门店图片"
            sections={[
              {
                title: '业务场景',
                content: (
                  <>
                    <p className="font-semibold mb-2">门店图片的重要性：</p>
                    <LogicList
                      items={[
                        <>小程序分享图是用户<strong>转发给朋友的第一印象</strong>，影响二次传播</>,
                        <>门店主页首图是用户<strong>进入详情页后的视觉焦点</strong>，决定停留时间</>,
                        <>高质量图片可提升<strong>预订转化率15-25%</strong>（OTA行业数据）</>,
                        <>图片顺序影响用户浏览体验，需要<strong>精心排序</strong></>
                      ]}
                    />
                    <LogicHighlight type="warning">
                      <p className="text-sm">
                        <strong>视觉营销</strong>：研究表明，用户在浏览酒店详情时，
                        图片的影响力占70%，文字描述占30%。图片质量直接决定预订意愿。
                      </p>
                    </LogicHighlight>
                  </>
                )
              },
              {
                title: '功能说明',
                content: (
                  <>
                    <p className="font-semibold mb-2">两类图片配置：</p>
                    <LogicTable
                      headers={['图片类型', '用途', '建议尺寸', '数量限制']}
                      rows={[
                        ['小程序分享图', '用户转发给朋友时的封面图', '5:4（如1000×800px）', '1张'],
                        ['门店主页首图', '详情页顶部轮播图', '2:3（如1000×1500px）', '最多5张']
                      ]}
                    />

                    <p className="font-semibold mt-4 mb-2">主页首图排序功能：</p>
                    <LogicList items={[
                      '点击图片上的上下箭头调整顺序',
                      '第1张图片最重要，通常展示门店最佳角度',
                      '图片顺序影响用户浏览体验，建议精心排序',
                      '支持删除不满意的图片，重新上传'
                    ]} />

                    <LogicHighlight type="info">
                      <p className="text-sm">
                        <strong>设计理念</strong>：小程序分享图和门店首图分开管理，
                        分享图强调吸引力（吸引点击），首图强调真实性（展示环境）。
                      </p>
                    </LogicHighlight>
                  </>
                )
              },
              {
                title: '操作指南',
                content: (
                  <>
                    <p className="font-semibold mb-2">上传小程序分享图：</p>
                    <LogicList items={[
                      '输入图片URL或点击上传按钮',
                      '建议尺寸5:4，如1000×800px或1200×960px',
                      '支持PNG、JPG格式，单张图片≤5M',
                      '填写"分享展示文案"，如"桐庐原乡芦荻"'
                    ]} />

                    <p className="font-semibold mt-4 mb-2">上传门店主页首图：</p>
                    <LogicList items={[
                      '输入图片URL添加新图片（最多5张）',
                      '建议尺寸2:3，如1000×1500px或1200×1800px',
                      '支持PNG、JPG格式，单张图片≤5M',
                      '点击删除按钮可移除不满意的图片',
                      '使用上下箭头调整图片展示顺序'
                    ]} />

                    <p className="font-semibold mt-4 mb-2">图片顺序建议：</p>
                    <LogicList items={[
                      <><strong>第1张</strong>：门店外观最佳角度（让用户一眼认出门店）</>,
                      <><strong>第2张</strong>：大堂或公共区域（展示门店品质）</>,
                      <><strong>第3张</strong>：特色房间或景观（吸引预订）</>,
                      <><strong>第4-5张</strong>：其他卖点（餐厅、泳池、周边景观等）</>
                    ]} />

                    <LogicHighlight type="success">
                      <p className="text-sm">
                        <strong>最佳实践</strong>：建议上传满5张首图，
                        多角度展示门店环境。参考携程、美团上高分酒店的图片策略。
                      </p>
                    </LogicHighlight>
                  </>
                )
              },
              {
                title: '图片拍摄技巧',
                content: (
                  <>
                    <p className="font-semibold mb-2">拍摄小程序分享图：</p>
                    <LogicList items={[
                      '选择门店最具代表性的角度（外观、标志性景观）',
                      '光线充足，色彩鲜艳，吸引眼球',
                      '可添加文字标注（如"春日特惠"），但不要过度',
                      '参考小红书、Instagram上网红酒店的分享图'
                    ]} />

                    <p className="font-semibold mt-4 mb-2">拍摄门店主页首图：</p>
                    <LogicList items={[
                      '横向拍摄（2:3比例），使用广角镜头显得空间大',
                      '开灯拍摄，确保光线充足（避免阴暗压抑）',
                      '避免杂物入镜，保持画面整洁',
                      '拍摄前整理环境，确保床品平整、物品摆放整齐',
                      '可使用手机拍摄，但建议后期调色（提升亮度和饱和度）'
                    ]} />

                    <p className="font-semibold mt-4 mb-2">推荐拍摄内容：</p>
                    <LogicTable
                      headers={['拍摄主题', '拍摄要点', '目的']}
                      rows={[
                        ['门店外观', '白天拍摄，展示建筑风格', '让客人认出门店位置'],
                        ['大堂/前台', '展示接待区域，营造温馨感', '体现服务品质'],
                        ['特色房间', '拍摄最好的房型，展示卖点', '吸引预订高价房'],
                        ['窗外景观', '展示山景/湖景/城景', '突出位置优势'],
                        ['公共区域', '餐厅、休闲区、泳池等', '展示配套设施']
                      ]}
                    />

                    <LogicHighlight type="warning">
                      <p className="text-sm">
                        <strong>真实性原则</strong>：图片必须真实反映门店实际情况，
                        过度美颜或使用他人图片属于虚假宣传，会导致差评和投诉。
                        建议使用手机拍摄真实照片，轻度后期即可。
                      </p>
                    </LogicHighlight>
                  </>
                )
              },
              {
                title: '最佳实践',
                content: (
                  <>
                    <p className="font-semibold mb-2">OTA平台的图片要求：</p>
                    <LogicList items={[
                      <><strong>携程</strong>：门店主页至少3张图，建议5张，图片宽度≥1000px</>,
                      <><strong>美团</strong>：首图必须是门店外观或标志性场景，不能是纯文字海报</>,
                      <><strong>飞猪</strong>：图片不能有水印，不能有联系方式（会被拒审）</>,
                      <>所有平台：图片真实性是审核重点，虚假图片会被下架</>
                    ]} />

                    <p className="font-semibold mt-4 mb-2">图片优化检查清单：</p>
                    <LogicList items={[
                      '✓ 小程序分享图已上传，尺寸符合5:4，吸引眼球',
                      '✓ 门店主页首图已上传5张，尺寸符合2:3',
                      '✓ 第1张首图是门店外观，便于识别',
                      '✓ 图片顺序合理，从外观→大堂→房间→特色',
                      '✓ 所有图片真实，无过度PS，无虚假宣传',
                      '✓ 图片清晰，光线充足，色彩自然'
                    ]} />

                    <LogicHighlight type="success">
                      <p className="text-sm">
                        <strong>优化建议</strong>：定期更新门店图片，展示季节变化、新装修、新活动等。
                        可邀请专业摄影师拍摄一组高质量图片，长期使用。
                        参考同类型酒店的图片策略，学习优秀案例。
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
