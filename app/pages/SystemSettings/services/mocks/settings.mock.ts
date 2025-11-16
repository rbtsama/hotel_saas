/**
 * 系统参数配置Mock数据
 */

import type { Agreement, Tag } from '../../types/settings.types'
import { AgreementType, TagType } from '../../types/settings.types'

// 协议配置Mock数据
export const mockAgreements: Agreement[] = [
  {
    id: 'agr-001',
    type: AgreementType.USER_AGREEMENT,
    title: '用户服务协议',
    content: `# 用户服务协议

## 一、协议的接受

欢迎使用我们的酒店预订服务!本协议是您与本平台之间的法律协议。

### 1.1 协议生效
当您注册成为本平台用户时,即表示您**已充分阅读、理解并同意**接受本协议的全部内容。

### 1.2 协议修订
本平台有权根据需要修改本协议条款,修订后的协议将在平台上公布。

## 二、账号注册与使用

### 2.1 注册资格
- 年满18周岁的自然人
- 具有完全民事行为能力

### 2.2 账号安全
您应当妥善保管账号和密码,如因您保管不当导致的损失,**由您自行承担**。

## 三、服务内容

### 3.1 预订服务
本平台提供酒店预订、查询、评价等相关服务。

### 3.2 服务限制
- 禁止利用本服务从事违法活动
- 禁止恶意下单或刷单行为
- 禁止发布虚假信息

## 四、退款政策

详见《退款政策》条款。

## 五、免责声明

在法律允许的范围内,本平台对以下情况不承担责任:
1. 不可抗力导致的服务中断
2. 第三方原因导致的损失

---

**生效日期**: 2025年1月1日
**联系方式**: support@example.com`,
    version: 'v2.1',
    isActive: true,
    createdAt: '01/01/25 00:00:00',
    updatedAt: '01/10/25 15:30:00',
    updatedBy: '运营管理员',
  },
  {
    id: 'agr-002',
    type: AgreementType.PRIVACY_POLICY,
    title: '隐私政策',
    content: `# 隐私政策

## 信息收集

我们收集以下类型的信息:

### 个人信息
- 姓名、手机号
- 身份证号(入住必需)
- 支付信息

### 使用信息
- 浏览记录
- 设备信息
- IP地址

## 信息使用

我们使用收集的信息用于:
- 提供预订服务
- 改善用户体验
- 发送订单通知

## 信息保护

我们采取以下措施保护您的信息:
- 数据加密传输
- 访问权限控制
- 定期安全审计

## 您的权利

您有权:
- 访问您的个人信息
- 更正错误信息
- 删除个人信息
- 撤回授权

---

**更新日期**: 2025年1月5日`,
    version: 'v1.3',
    isActive: true,
    createdAt: '01/01/25 00:00:00',
    updatedAt: '01/05/25 09:20:00',
    updatedBy: '法务部',
  },
  {
    id: 'agr-003',
    type: AgreementType.REFUND_POLICY,
    title: '退款政策',
    content: `# 退款政策

## 退款条件

### 可全额退款
- 距离入住**7天以上**取消订单
- 酒店原因无法提供服务

### 可部分退款
- 距离入住3-7天取消,退款**50%**
- 入住体验与描述严重不符

### 不可退款
- 距离入住**不足3天**取消
- 已入住后要求退款
- 用户自身原因(除特殊情况)

## 退款流程

1. 发起退款申请
2. 商家审核(48小时内)
3. 平台审核
4. 退款到账(3-5个工作日)

## 争议处理

如对退款决定有异议,可申请仲裁。

---

**执行日期**: 2025年1月1日`,
    version: 'v1.0',
    isActive: true,
    createdAt: '01/01/25 00:00:00',
    updatedAt: '01/01/25 00:00:00',
    updatedBy: '客服部',
  },
]

// 标签配置Mock数据
export const mockTags: Tag[] = [
  // 推荐标签
  {
    id: 'tag-001',
    type: TagType.RECOMMENDATION,
    name: '亲子乐享',
    color: '#FF6B9D',
    icon: '👨‍👩‍👧‍👦',
    order: 1,
    isEnabled: true,
    usageCount: 156,
    createdAt: '01/05/25 10:00:00',
    updatedAt: '01/05/25 10:00:00',
  },
  {
    id: 'tag-002',
    type: TagType.RECOMMENDATION,
    name: '奇妙有趣',
    color: '#FFA500',
    icon: '✨',
    order: 2,
    isEnabled: true,
    usageCount: 203,
    createdAt: '01/05/25 10:00:00',
    updatedAt: '01/05/25 10:00:00',
  },
  {
    id: 'tag-003',
    type: TagType.RECOMMENDATION,
    name: '融于自然',
    color: '#52C41A',
    icon: '🌿',
    order: 3,
    isEnabled: true,
    usageCount: 87,
    createdAt: '01/05/25 10:00:00',
    updatedAt: '01/05/25 10:00:00',
  },
  {
    id: 'tag-004',
    type: TagType.RECOMMENDATION,
    name: '浪漫情侣',
    color: '#FF69B4',
    icon: '💕',
    order: 4,
    isEnabled: true,
    usageCount: 142,
    createdAt: '01/06/25 14:20:00',
    updatedAt: '01/06/25 14:20:00',
  },
  {
    id: 'tag-005',
    type: TagType.RECOMMENDATION,
    name: '商务出行',
    color: '#1890FF',
    icon: '💼',
    order: 5,
    isEnabled: false,
    usageCount: 98,
    createdAt: '01/06/25 14:20:00',
    updatedAt: '01/06/25 14:20:00',
  },

  // 酒店标签
  {
    id: 'tag-006',
    type: TagType.HOTEL,
    name: '五星级',
    color: '#FFD700',
    icon: '⭐',
    order: 1,
    isEnabled: true,
    usageCount: 45,
    createdAt: '01/05/25 10:00:00',
    updatedAt: '01/05/25 10:00:00',
  },
  {
    id: 'tag-007',
    type: TagType.HOTEL,
    name: '连锁品牌',
    color: '#722ED1',
    order: 2,
    isEnabled: true,
    usageCount: 78,
    createdAt: '01/05/25 10:00:00',
    updatedAt: '01/05/25 10:00:00',
  },
  {
    id: 'tag-008',
    type: TagType.HOTEL,
    name: '近地铁',
    color: '#13C2C2',
    icon: '🚇',
    order: 3,
    isEnabled: true,
    usageCount: 234,
    createdAt: '01/05/25 10:00:00',
    updatedAt: '01/05/25 10:00:00',
  },
  {
    id: 'tag-009',
    type: TagType.HOTEL,
    name: '近机场',
    color: '#2F54EB',
    icon: '✈️',
    order: 4,
    isEnabled: true,
    usageCount: 156,
    createdAt: '01/05/25 10:00:00',
    updatedAt: '01/05/25 10:00:00',
  },
  {
    id: 'tag-010',
    type: TagType.HOTEL,
    name: '海景',
    color: '#1890FF',
    icon: '🌊',
    order: 5,
    isEnabled: true,
    usageCount: 67,
    createdAt: '01/07/25 11:30:00',
    updatedAt: '01/07/25 11:30:00',
  },

  // 房间设施标签
  {
    id: 'tag-011',
    type: TagType.ROOM_FACILITY,
    name: 'WiFi',
    color: '#52C41A',
    icon: '📶',
    order: 1,
    isEnabled: true,
    usageCount: 412,
    createdAt: '01/05/25 10:00:00',
    updatedAt: '01/05/25 10:00:00',
  },
  {
    id: 'tag-012',
    type: TagType.ROOM_FACILITY,
    name: '空调',
    color: '#13C2C2',
    icon: '❄️',
    order: 2,
    isEnabled: true,
    usageCount: 398,
    createdAt: '01/05/25 10:00:00',
    updatedAt: '01/05/25 10:00:00',
  },
  {
    id: 'tag-013',
    type: TagType.ROOM_FACILITY,
    name: '独立卫浴',
    color: '#722ED1',
    icon: '🚿',
    order: 3,
    isEnabled: true,
    usageCount: 376,
    createdAt: '01/05/25 10:00:00',
    updatedAt: '01/05/25 10:00:00',
  },
  {
    id: 'tag-014',
    type: TagType.ROOM_FACILITY,
    name: '智能电视',
    color: '#1890FF',
    icon: '📺',
    order: 4,
    isEnabled: true,
    usageCount: 289,
    createdAt: '01/05/25 10:00:00',
    updatedAt: '01/05/25 10:00:00',
  },
  {
    id: 'tag-015',
    type: TagType.ROOM_FACILITY,
    name: '迷你吧',
    color: '#FA8C16',
    icon: '🍷',
    order: 5,
    isEnabled: true,
    usageCount: 123,
    createdAt: '01/05/25 10:00:00',
    updatedAt: '01/05/25 10:00:00',
  },
  {
    id: 'tag-016',
    type: TagType.ROOM_FACILITY,
    name: '浴缸',
    color: '#EB2F96',
    icon: '🛁',
    order: 6,
    isEnabled: true,
    usageCount: 167,
    createdAt: '01/07/25 16:40:00',
    updatedAt: '01/07/25 16:40:00',
  },
  {
    id: 'tag-017',
    type: TagType.ROOM_FACILITY,
    name: '保险箱',
    color: '#8C8C8C',
    icon: '🔒',
    order: 7,
    isEnabled: false,
    usageCount: 45,
    createdAt: '01/07/25 16:40:00',
    updatedAt: '01/07/25 16:40:00',
  },
]
