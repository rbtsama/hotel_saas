import type { FeatureModule, MembershipLevel } from '../../types/miniprogram.types'

export const miniprogramModules: FeatureModule[] = [
  {
    id: 'home',
    name: '首页模块',
    description: '小程序首页，展示门店推荐和分类筛选',
    features: [
      {
        id: 'home-banner',
        name: '首页轮播与搜索',
        description: '顶部品牌展示、搜索入口和新人优惠横幅',
        screens: ['1.首页.png', '1.首页_上滑.png', '1.首页_图片加载.png'],
        subFeatures: [
          {
            name: '搜索门店',
            description: '点击搜索框进入门店搜索页面',
            screens: ['1.1.1 搜索门店.png']
          },
          {
            name: '新人优惠',
            description: '首次预订享85折优惠，立即领取按钮',
          },
          {
            name: '关于小而美',
            description: '平台介绍页面，包含缘由、性质、路径、愿景',
            screens: ['1.2 关于小而美.png']
          }
        ],
        businessRules: [
          '新用户首次预订可享受85折优惠',
          '搜索支持地理位置定位和关键词搜索',
          '门店按城市分组展示'
        ]
      },
      {
        id: 'home-categories',
        name: 'Pick Up 好店种草间',
        description: '标签分类筛选门店（理想乡居、服务周到、宠物友好、融于自然）',
        screens: ['1.首页.png', '1.首页_tab无结果.png'],
        subFeatures: [
          {
            name: '标签筛选',
            description: '多个主题标签切换，展示不同类型的民宿'
          },
          {
            name: '门店卡片',
            description: '显示门店图片、名称、简介、位置、价格、收藏按钮'
          },
          {
            name: '空状态',
            description: '当标签下无门店时显示空状态提示'
          }
        ],
        interactions: [
          '点击标签切换不同类型门店',
          '点击门店卡片进入门店详情',
          '点击爱心图标收藏/取消收藏门店'
        ]
      }
    ]
  },
  {
    id: 'search-booking',
    name: '搜索与预订模块',
    description: '门店搜索、房间选择、购物车、确认订单、支付流程',
    features: [
      {
        id: 'search',
        name: '门店搜索',
        description: '支持按位置、关键词搜索门店',
        screens: ['1.1.1 搜索门店.png', '1.1.2 搜索结果.png'],
        subFeatures: [
          {
            name: '日期选择',
            description: '选择入住和离店日期'
          },
          {
            name: '位置搜索',
            description: '支持当前位置定位、城市选择、门店列表'
          },
          {
            name: '门店入驻通道',
            description: '底部门店入驻通道入口'
          }
        ],
        businessRules: [
          '门店按城市分组显示',
          '支持GPS定位当前位置',
          '搜索结果显示门店缩略图、名称'
        ]
      },
      {
        id: 'store-detail',
        name: '店铺首页',
        description: '门店详情页，展示房型、礼赠、最新消息',
        screens: ['1.3 店铺首页.png', '1.3 店铺首页-当前门店不可订.png', '1.3 店铺首页-当前日期不可订.png'],
        subFeatures: [
          {
            name: '门店头部信息',
            description: '门店封面图、名称、标签、收藏按钮、联系方式'
          },
          {
            name: '日期与人数选择',
            description: '顶部日期选择器和人数选择'
          },
          {
            name: '房型列表',
            description: '展示所有房型，包含图片、名称、面积、床型、早餐、价格'
          },
          {
            name: '礼赠说明',
            description: '会员专享礼赠，点击查看详情弹窗',
            screens: ['1.3.5 共n项-礼赠半弹窗.png']
          },
          {
            name: '门店详情',
            description: '门店介绍、地址、联系方式',
            screens: ['1.3.3 门店详情.png', '1.3.4 门店联系方式.png']
          },
          {
            name: '最新消息',
            description: '门店发布的最新资讯和活动'
          }
        ],
        interactions: [
          '点击房型卡片进入房间详情',
          '点击预订按钮加入购物车',
          '点击门店详情查看完整介绍',
          '点击电话/导航直接联系门店'
        ],
        businessRules: [
          '显示会员价和原价对比',
          '无房时显示"查看其他天有房"',
          '不可预订时显示相应提示'
        ]
      },
      {
        id: 'room-detail',
        name: '房间详情',
        description: '单个房型的详细信息',
        screens: ['1.3.1 房间详情_有房可订.png', '1.3.2 房间详情_点击查看更多.png', '1.3.2 房间详情_无房.png'],
        subFeatures: [
          {
            name: '房型信息',
            description: '房间照片、面积、床型、可住人数、早餐配置'
          },
          {
            name: '礼赠详情',
            description: '免费自行车租借、mini bar等会员礼赠'
          },
          {
            name: '沿江骑行',
            description: '特色体验项目说明'
          },
          {
            name: '取消政策',
            description: '免费取消时间和取消费用说明'
          },
          {
            name: '相关说明',
            description: 'MINI吧畅饮、观景阳台等房间特色'
          }
        ],
        businessRules: [
          '显示会员专享价和优惠金额',
          '无房时显示"查看哪天有房"按钮',
          '多间房型可独立选择数量'
        ]
      },
      {
        id: 'cart',
        name: '购物车',
        description: '已选房型管理和价格汇总',
        screens: ['1.4 购物车.png', '1.4.1 购物车_修改数量.png', '1.4.2 购物车_优惠明细.png'],
        subFeatures: [
          {
            name: '房型列表',
            description: '显示已选房型、日期、价格、数量'
          },
          {
            name: '数量修改',
            description: '增减房间数量'
          },
          {
            name: '优惠明细',
            description: '会员专享价、优惠券等优惠信息'
          },
          {
            name: '价格汇总',
            description: '预估总价计算'
          }
        ],
        interactions: [
          '点击数量可修改房间数',
          '点击优惠明细查看折扣详情',
          '超出房间数量时Toast提示'
        ],
        businessRules: [
          '房间数量不能超过可订上限',
          '显示临水和非临水差价',
          '自动计算会员折扣'
        ]
      },
      {
        id: 'confirm-order',
        name: '确认订单',
        description: '填写入住信息和确认订单',
        screens: ['1.5 确认订单.png', '1.5.1 确认订单_预定须知.png', '1.5.2 备选要求.png'],
        subFeatures: [
          {
            name: '订房信息',
            description: '每个房间填写入住人真实姓名'
          },
          {
            name: '联系手机',
            description: '预留联系电话'
          },
          {
            name: '预计到店',
            description: '选择到店时间'
          },
          {
            name: '备选要求',
            description: '洗漱用品、房间禁烟、入住需求等特殊要求',
            screens: ['1.5.2 备选要求.png']
          },
          {
            name: '会员开通',
            description: '订单页推广VIP2年卡，88元特惠'
          },
          {
            name: '预定须知',
            description: '入住退房时间、证件要求、儿童政策等',
            screens: ['1.5.1 确认订单_预定须知.png']
          }
        ],
        interactions: [
          '点击房型详情查看房间信息',
          '点击预定须知查看详细政策',
          '点击备选要求选择特殊需求',
          '确认并付款提交订单'
        ],
        businessRules: [
          '必填项：入住人姓名、联系手机',
          '显示取消政策时间',
          '自动关联会员优惠'
        ]
      },
      {
        id: 'payment-success',
        name: '支付成功',
        description: '支付完成后的结果页',
        screens: ['1.6 支付成功.png'],
        subFeatures: [
          {
            name: '支付确认',
            description: '显示支付成功状态和订单信息'
          },
          {
            name: '亲友赠礼',
            description: '赠送VIP2限时体验1次的亲友卡'
          },
          {
            name: '快捷操作',
            description: '查看订单详情、看看其他好店按钮'
          }
        ],
        interactions: [
          '点击查看订单详情跳转订单页',
          '点击看看其他好店返回首页',
          '点击去赠送分享亲友卡'
        ]
      }
    ]
  },
  {
    id: 'membership',
    name: '会员系统模块',
    description: '会员等级、权益、礼遇、开通和邀请功能',
    features: [
      {
        id: 'member-benefits',
        name: '会员礼遇',
        description: '会员专享礼遇和VIP体验卡',
        screens: ['1.7 会员_会员礼遇.png', '1.7.2 会员礼遇落地页.png', '1.7.3 会员礼遇领取成功.png'],
        subFeatures: [
          {
            name: '礼遇明信片',
            description: '设计精美的会员礼遇明信片，可自定义赠言'
          },
          {
            name: '赠送好友',
            description: '可将礼遇卡片分享给好友'
          },
          {
            name: '直接赠送',
            description: '跳过赠言直接赠送'
          },
          {
            name: '领取成功',
            description: '展示平台数据（会员数、好店数、目的地数）和品牌理念'
          }
        ],
        interactions: [
          '输入赠言个性化礼遇卡',
          '点击赠送给好友分享',
          '点击马上领取激活礼遇'
        ],
        businessRules: [
          '礼遇卡含订房9折起优惠',
          'VIP2限时体验1次',
          '展示平台规模：2个会员、50+好店、50+目的地'
        ]
      },
      {
        id: 'member-center',
        name: '会员中心',
        description: '会员等级、权益和规则展示',
        screens: ['3.3.1 会员权益-0.png', '3.3.1 会员权益-1.png', '3.3.1 会员权益-2.png', '3.3(1).1 会员权益-2.png'],
        subFeatures: [
          {
            name: '会员等级卡',
            description: '显示当前等级（VIP0-VIP3）和升级条件'
          },
          {
            name: '快捷开通',
            description: '直通VIP2年卡 ¥99'
          },
          {
            name: '会员权益',
            description: '订房折扣、亲友卡、里程值奖励'
          },
          {
            name: '会员规则',
            description: '等级概览表：获得条件、有效期、保级条件'
          },
          {
            name: '计数规则',
            description: '预订次数累计、里程值累计、有效期说明'
          },
          {
            name: '注释说明',
            description: '会员折扣、里程值使用途径、不可转让规则'
          }
        ],
        businessRules: [
          'VIP0：注册即享，永久有效',
          'VIP1：预订1次及以上，两年有效，需预订1次保级',
          'VIP2：预订5次及以上，两年有效，需预订3次保级',
          'VIP3：预订10次及以上，两年有效，需预订5次保级',
          '消费1元累计1里程值，100里程值=1元',
          '里程值可兑换合作门店房券、现金抵扣、参与活动等'
        ]
      },
      {
        id: 'open-membership',
        name: '开通会员',
        description: 'VIP2年卡购买页面',
        screens: ['3.3.4 开通会员.png', '3.3.4 开通会员-上滑交互.png'],
        subFeatures: [
          {
            name: '会员套餐',
            description: 'VIP2年卡 ¥99/年（原价¥199）'
          },
          {
            name: '会员权益展示',
            description: '订房9折起、亲友卡×2、里程值奖励'
          },
          {
            name: '协议确认',
            description: '小而美HOMESTAY会员服务协议'
          },
          {
            name: 'FAQ',
            description: '会员常见问题解答（续费说明、保级规则、退款政策等）'
          }
        ],
        interactions: [
          '点击确认协议并开通购买会员',
          '查看会员常见问题'
        ],
        businessRules: [
          '订房更低折扣，所有门店通用',
          '具体订房折扣以预订实际价格明细为准',
          '年卡续费后保留VIP2会员天数'
        ]
      },
      {
        id: 'member-invitation',
        name: '会员邀请功能',
        description: '门店邀请用户成为会员',
        screens: ['邀请落地页.png', '邀请落地页(1).png', '会员信息确认.png', '门店扫邀请-定向邀请.png', '门店扫邀请-无限制.png', '门店扫邀请-无权限提示.png', '门店扫邀请会员码-登录.png'],
        subFeatures: [
          {
            name: '邀请落地页',
            description: '门店专属邀请页，展示会员权益'
          },
          {
            name: '定向邀请',
            description: '门店可设置特定客户邀请（输入姓名和手机号）'
          },
          {
            name: '无限制邀请',
            description: '生成通用邀请链接'
          },
          {
            name: '会员信息确认',
            description: '确认姓名、性别、地区、邮箱等信息'
          },
          {
            name: '权限验证',
            description: '验证门店是否有邀请权限'
          }
        ],
        interactions: [
          '用户扫码或点击链接进入',
          '填写或确认个人信息',
          '提交确认成为VIP2会员',
          '未登录用户需先登录'
        ],
        businessRules: [
          '门店需有邀请权限',
          '可设置邀请链接有效时间（如1小时）',
          '可选择定向邀请或无限制邀请',
          '需获取用户协议和隐私政策授权'
        ]
      },
      {
        id: 'mileage-coupon',
        name: '里程值与券包',
        description: '会员里程值和优惠券管理',
        screens: ['3.2.1 里程值.png', '3.2(1).1 里程值.png', '3.2.2 我的券包-无优惠券.png', '3.2.2 我的券包-有优惠券.png', '3.2.3 优惠券使用规则弹窗.png'],
        subFeatures: [
          {
            name: '当前里程值',
            description: '显示用户当前累计的里程值'
          },
          {
            name: '优惠券列表',
            description: '展示可用、已使用、已过期的优惠券'
          },
          {
            name: '券详情',
            description: '折扣券（如8.5折）、抵用券（如¥10）'
          },
          {
            name: '使用规则',
            description: '优惠券使用条件和有效期说明'
          },
          {
            name: '去预定',
            description: '直接跳转到预订页面使用优惠券'
          }
        ],
        businessRules: [
          '消费1元=1里程值，100里程值=1元',
          '里程值可兑换优惠券、现金抵扣',
          '优惠券有有效期限制',
          '新人优惠券85折'
        ]
      }
    ]
  },
  {
    id: 'favorites',
    name: '收藏模块',
    description: '门店收藏功能',
    features: [
      {
        id: 'favorite-list',
        name: '收藏好店',
        description: '用户收藏的门店列表',
        screens: ['2 收藏_未登录.png', '2.1 收藏_登录有收藏.png', '2.1 收藏_登录有收藏删除.png'],
        subFeatures: [
          {
            name: '未登录状态',
            description: '提示登录小而美HOMESTAY查看收藏'
          },
          {
            name: '收藏列表',
            description: '展示收藏的门店卡片'
          },
          {
            name: '取消收藏',
            description: '可删除收藏的门店'
          }
        ],
        interactions: [
          '未登录时点击登录按钮',
          '点击门店卡片进入详情',
          '点击爱心图标取消收藏'
        ],
        businessRules: [
          '需登录才能查看收藏',
          '收藏列表实时同步'
        ]
      }
    ]
  },
  {
    id: 'profile',
    name: '个人中心模块',
    description: '用户个人信息、订单、历史记录等管理',
    features: [
      {
        id: 'my-profile',
        name: '我的页面',
        description: '个人中心主页',
        screens: ['3. 我的_未登录.png', '3. 我的_登录-会员.png'],
        subFeatures: [
          {
            name: '未登录状态',
            description: '显示登录/注册按钮和基础信息'
          },
          {
            name: '会员信息',
            description: '头像、昵称、会员等级、到期时间'
          },
          {
            name: '里程值和优惠券',
            description: '显示当前里程值和可用优惠券数量'
          },
          {
            name: '会员升级提示',
            description: '预订满X次可升级至VIPX'
          },
          {
            name: '我的订单',
            description: '订单快捷入口：待付款、待入住、已完成、退款/售后'
          },
          {
            name: '功能菜单',
            description: '历史浏览记录、关于小而美、门店入驻、用户协议、隐私政策'
          },
          {
            name: '退出登录',
            description: '登出账号'
          }
        ],
        interactions: [
          '点击头像编辑个人信息',
          '点击会员中心查看详细权益',
          '点击订单状态查看对应订单',
          '点击退出登录确认退出'
        ]
      },
      {
        id: 'edit-profile',
        name: '编辑个人信息',
        description: '修改用户资料',
        screens: ['3.1 我的-编辑个人信息.png', '3.1.1 编辑个人信息-更新邮箱.png', '3.1.2 编辑个人信息-生日.png', '3.1.2 编辑个人信息-时间选择.png'],
        subFeatures: [
          {
            name: '基础信息',
            description: '昵称、性别、生日、地区、邮箱'
          },
          {
            name: '邮箱更新',
            description: '输入新邮箱地址'
          },
          {
            name: '生日选择',
            description: '日期选择器'
          }
        ],
        interactions: [
          '点击字段进入编辑模式',
          '选择生日弹出日期选择器',
          '保存更新个人信息'
        ]
      },
      {
        id: 'browse-history',
        name: '浏览历史',
        description: '用户浏览过的门店记录',
        screens: ['3(1).5 浏览历史.png', '3.5 浏览历史.png'],
        subFeatures: [
          {
            name: '历史记录列表',
            description: '展示浏览过的门店卡片'
          },
          {
            name: '清除历史',
            description: '可清空浏览记录'
          }
        ],
        interactions: [
          '点击门店卡片查看详情',
          '点击清除按钮删除记录'
        ]
      }
    ]
  },
  {
    id: 'order',
    name: '订单管理模块',
    description: '订单查询、取消、售后、评价等全流程管理',
    features: [
      {
        id: 'order-list',
        name: '我的订单',
        description: '订单列表和状态筛选',
        screens: ['3.4 我的订单_全部.png', '3.4 我的订单_售后订单.png', '3.4 我的订单_删除订单二次确认.png'],
        subFeatures: [
          {
            name: '订单状态',
            description: '全部、待付款、待入住、已完成、售后'
          },
          {
            name: '订单卡片',
            description: '门店名称、房型、日期、价格、状态'
          },
          {
            name: '快捷操作',
            description: '继续支付、取消订单、删除订单'
          },
          {
            name: '会员订单',
            description: '支持VIP年卡订单显示'
          }
        ],
        interactions: [
          'Tab切换订单状态',
          '点击订单卡片查看详情',
          '点击继续支付完成付款',
          '删除订单需二次确认'
        ],
        businessRules: [
          '待付款订单显示倒计时',
          '已完成订单可评价和推荐',
          '订单按时间倒序排列'
        ]
      },
      {
        id: 'order-detail',
        name: '订单详情',
        description: '订单完整信息展示',
        screens: ['3.4.1 订单详情-待付款.png', '3.4.1 订单详情-预定成功.png', '3.4.1 订单详情-已完成.png', '3.4.1 订单详情-已完成-费用明细.png', '3.4.1 订单详情-商家主动取消.png', '3.4.1 订单详情-VIP2年卡.png'],
        subFeatures: [
          {
            name: '订单状态',
            description: '待付款、预定成功、已完成、已取消等'
          },
          {
            name: '房型信息',
            description: '房间照片、名称、面积、床型、入住日期'
          },
          {
            name: '所属门店',
            description: '门店名称、地址、导航、电话'
          },
          {
            name: '联系人信息',
            description: '姓名、手机号、备注'
          },
          {
            name: '订单其他',
            description: '订单编号、创建时间、支付时间、支付单号'
          },
          {
            name: '费用明细',
            description: '房费、优惠、实付款详细展开'
          },
          {
            name: '预定须知',
            description: '免费取消时间和政策',
            screens: ['3.4.1 订单详情-预定成功.png']
          },
          {
            name: '确认函',
            description: '订单确认文件下载',
            screens: ['3.4.2 确认函.png']
          }
        ],
        interactions: [
          '点击导航定位门店',
          '点击电话直接拨打',
          '点击查看明细展开费用',
          '待付款可确认离开或继续支付',
          '已完成可再次预定'
        ],
        businessRules: [
          '待付款订单超时自动取消',
          '显示免费取消截止时间',
          '会员价订单标注会员优惠'
        ]
      },
      {
        id: 'cancel-order',
        name: '取消预定',
        description: '订单取消流程',
        screens: ['3.4.3 取消预定.png', '3.4.3 取消预定-二次确认.png', '3.4.3 取消预定-超过取消时间.png', '3.4.3 超过取消时间-救济条款.png', '3.4.3 取消预定-成功toast.png', '3.4.3 取消预定成功-订单详情.png'],
        subFeatures: [
          {
            name: '取消政策',
            description: '显示全额退款或收取费用说明'
          },
          {
            name: '取消原因',
            description: '行程变更、信息填错、重复预订、价格因素、服务不满意、其他'
          },
          {
            name: '二次确认',
            description: '确认是否取消订单'
          },
          {
            name: '超时取消',
            description: '超过免费取消时间的提示'
          },
          {
            name: '救济条款',
            description: '特殊情况下的退款说明'
          }
        ],
        interactions: [
          '选择取消原因',
          '点击取消预定',
          '二次确认后提交',
          'Toast提示取消成功'
        ],
        businessRules: [
          '免费取消时间内全额退款',
          '超时取消收取部分费用（如¥600）',
          '订单取消后无法恢复',
          '已支付金额原路退回'
        ]
      },
      {
        id: 'order-review',
        name: '订单评价',
        description: '入住后评价服务',
        screens: ['3.4(1).4 评价_不满意.png', '3.4(2).4 评价_不满意.png', '3.4.4 评价_不满意.png', '3.4.4 评价_未填写内容.png'],
        subFeatures: [
          {
            name: '评分系统',
            description: '满意/不满意评价'
          },
          {
            name: '评价内容',
            description: '文字评价输入框'
          },
          {
            name: '必填验证',
            description: '未填写内容时提示'
          }
        ],
        interactions: [
          '选择满意度',
          '输入评价内容',
          '提交评价'
        ],
        businessRules: [
          '已完成订单才能评价',
          '评价后显示"已吐槽"或"已推荐"'
        ]
      },
      {
        id: 'after-sales',
        name: '售后管理',
        description: '订单售后和争议处理',
        screens: ['3.4.5 售后详情-待商家处理.png', '3.4.5 售后详情-售后委员介入中.png', '3.4.5 售后详情-售后裁决结果.png', '3.4.5 售后详情-售后成功.png', '3.4.6 查看评审委员会的组成和评审规则.png', '3.4.7 售后记录.png'],
        subFeatures: [
          {
            name: '售后状态',
            description: '待商家处理、委员介入中、售后结束'
          },
          {
            name: '退款金额',
            description: '显示退款总金额'
          },
          {
            name: '售后流程',
            description: '门店处理→售后委员介入→售后裁决结果→退款成功'
          },
          {
            name: '退款原因',
            description: '卫生质量差、设施问题等'
          },
          {
            name: '申请时间',
            description: '售后申请时间戳'
          },
          {
            name: '退款编号',
            description: '售后单号'
          },
          {
            name: '评审委员会',
            description: '商家评审委员会组成和评审规则说明'
          },
          {
            name: '售后记录',
            description: '历史售后申请记录'
          }
        ],
        interactions: [
          '查看售后详情',
          '查看评审委员会规则',
          '查看售后记录'
        ],
        businessRules: [
          '门店超时未处理自动进入委员裁决',
          '评审委员会根据规则裁决',
          '退款成功后门店超时未处理也显示成功'
        ]
      }
    ]
  },
  {
    id: 'auth',
    name: '登录注册模块',
    description: '用户认证和授权',
    features: [
      {
        id: 'login',
        name: '登录/注册',
        description: '微信登录和用户协议',
        screens: ['4.1 登录注册.png', '4.1.1 协议与条款.png', '4.1.2 未登录_获取昵称.png'],
        subFeatures: [
          {
            name: '微信登录',
            description: '使用微信账号快捷登录'
          },
          {
            name: '协议确认',
            description: '确认已满18周岁并同意用户协议和隐私政策'
          },
          {
            name: '获取昵称',
            description: '授权获取微信昵称和头像'
          }
        ],
        interactions: [
          '点击登录或注册按钮',
          '勾选协议复选框',
          '点击协议链接查看详情',
          '授权获取微信信息'
        ],
        businessRules: [
          '必须满18周岁',
          '必须同意用户协议和隐私政策',
          '首次登录自动注册'
        ]
      }
    ]
  },
  {
    id: 'merchant',
    name: '门店入驻模块',
    description: '商家入驻申请流程',
    features: [
      {
        id: 'merchant-apply',
        name: '门店入驻通道',
        description: '商家申请入驻平台',
        screens: ['5 门店入驻流程.png', '5 门店入驻流程-内容输入样式.png', '5 门店入驻流程-提交成功.png'],
        subFeatures: [
          {
            name: '介绍门店信息',
            description: '门店基本信息填写步骤'
          },
          {
            name: '店铺视觉',
            description: '上传门店照片和装修图片'
          },
          {
            name: '运营管理',
            description: 'PMS系统对接和联系方式'
          },
          {
            name: '基础信息填写',
            description: '门店名称地址、营业执照、特种行业许可证、公共场所卫生许可证、建造装修年份、耗资、项目占地面积、建筑面积、客房数量、客房平均面积'
          },
          {
            name: '上传照片',
            description: '上传5张展现门店的精美照片'
          },
          {
            name: 'PMS系统',
            description: '选择是否使用PMS管理系统（是/否+系统名称）'
          },
          {
            name: '预订方式',
            description: '自营/托管/连锁/品牌集团化管理'
          },
          {
            name: '联系方式',
            description: '手机号码和邮箱地址'
          },
          {
            name: '提交成功',
            description: '申请提交成功页面'
          }
        ],
        interactions: [
          '填写门店基本信息',
          '上传证件和照片',
          '选择运营管理方式',
          '保存并退出或提交申请'
        ],
        businessRules: [
          '必须提供营业执照',
          '建议提供特种行业许可证和卫生许可证',
          '至少上传5张门店照片',
          '门店建造需2022年及以后',
          '原乡民宿自动分为4栋、1独栋7间房、落成与2016年'
        ]
      }
    ]
  },
  {
    id: 'misc',
    name: '其他功能',
    description: '通用组件和辅助功能',
    features: [
      {
        id: 'about',
        name: '关于小而美',
        description: '平台介绍和品牌理念',
        screens: ['1.2 关于小而美.png', '3.6 协议与条款.png'],
        subFeatures: [
          {
            name: '品牌介绍',
            description: '小而美HOMESTAY的缘由、性质、路径、愿景'
          },
          {
            name: '用户协议',
            description: '服务条款和使用规则'
          },
          {
            name: '隐私政策',
            description: '隐私保护和数据使用说明'
          }
        ]
      },
      {
        id: 'share',
        name: '分享功能',
        description: '分享小程序给好友',
        screens: ['1.7.1 分享小程序.png'],
        subFeatures: [
          {
            name: '分享卡片',
            description: '生成小程序分享卡片'
          }
        ]
      },
      {
        id: 'states',
        name: '状态页面',
        description: '各种特殊状态展示',
        screens: ['异常状态.png', '成功结果页.png', '会员价格展示关系.png'],
        subFeatures: [
          {
            name: '异常状态',
            description: '网络错误、加载失败等异常提示'
          },
          {
            name: '成功结果页',
            description: '操作成功的统一反馈页'
          },
          {
            name: '价格展示',
            description: '会员价和原价的对比展示规则'
          }
        ]
      },
      {
        id: 'bottom-nav',
        name: '底部导航栏',
        description: '全局导航',
        screens: ['1.首页.png'],
        subFeatures: [
          {
            name: '好店',
            description: '首页门店浏览'
          },
          {
            name: '收藏',
            description: '我的收藏列表'
          },
          {
            name: '我的',
            description: '个人中心'
          }
        ]
      }
    ]
  }
]

export const membershipLevels: MembershipLevel[] = [
  {
    level: 'VIP0',
    name: '注册会员',
    requirements: '注册即享',
    validity: '永久有效',
    benefits: ['基础会员权益'],
    conditions: ['预定1次以上可升级至VIP1']
  },
  {
    level: 'VIP1',
    name: '银卡会员',
    requirements: '预订1次及以上',
    validity: '两年',
    benefits: ['订房折扣', '会员专享价'],
    conditions: ['预订1次保级', '预订5次及以上可升级至VIP2']
  },
  {
    level: 'VIP2',
    name: '金卡会员',
    requirements: '预订5次及以上',
    validity: '两年',
    benefits: ['订房9折起', '亲友卡×2', '里程值奖励'],
    conditions: ['预订3次保级', '预订10次及以上可升级至VIP3', '可通过¥99直接开通']
  },
  {
    level: 'VIP3',
    name: '钻石会员',
    requirements: '预订10次及以上',
    validity: '两年',
    benefits: ['最高折扣', '更多亲友卡', '更多里程值'],
    conditions: ['预订5次保级']
  }
]
