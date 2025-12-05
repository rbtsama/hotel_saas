# 会员管理模块 (Member Management Module)

Vue 版本的会员管理模块，从 Remix 完整迁移。

## 目录结构

```
MemberManagement/
├── MembersPage.vue                 # 主页面组件
├── types/
│   ├── member.types.ts            # 类型定义（包含所有接口）
│   └── index.ts                    # 类型导出
├── services/
│   ├── member.service.ts           # 服务层（使用 Mock 数据）
│   └── mocks/
│       ├── member.mock.ts          # Mock 数据集合
│       └── index.ts                # Mock 导出
└── README.md                       # 本文件
```

## 主要功能

### MembersPage.vue
完整的会员查询和管理页面，包含：

- **搜索和筛选**
  - 按商户名称搜索
  - 按账号状态筛选（预注册、注册、禁用）
  - 按会员等级筛选（VIP0-VIP9）

- **会员列表展示**
  - 手机号
  - 账号状态（彩色标签）
  - 当前会员等级（橙色高亮）
  - 正式会员等级
  - 有效期至
  - 导入商户
  - 赠送会员等级
  - 赠送有效期
  - 赠送人
  - 更新时间

- **分页功能**
  - 支持自定义页码大小（10/20/50/100）
  - 快速跳转
  - 总数显示

- **导出功能**
  - 将筛选结果导出为 CSV 文件
  - 包含 UTF-8 BOM 支持中文

- **状态色彩系统**
  - 预注册：蓝色
  - 注册：绿色
  - 禁用：红色

## 类型定义 (types/member.types.ts)

### 核心接口

```typescript
// 会员基本信息
UserMemberInfo {
  userId: string
  nickname: string
  realName: string | null
  gender: Gender | null
  region: Region | null
  phone: string
  currentLevel: number
  formalLevel: number
  trialLevel: number | null
  pointsBalance: number
  // ... 其他字段
}

// 会员查询记录（表格数据）
MemberQueryRecord {
  id: string
  phone: string
  accountStatus: AccountStatus
  currentLevel: number
  formalLevel: number
  formalExpiryDate: string
  obtainMethod: ObtainMethod
  relatedMerchant: string
  giftLevel: number
  giftExpiryDate: string
  giftFrom: string
  updatedAt: string
}

// 等级升级规则
MemberLevelUpgradeRule {
  level: number
  levelName: string
  upgradeNights: number
  validityDays: number
  maintainNights: number
}

// 等级折扣规则
MemberLevelDiscountRule {
  level: number
  levelName: string
  platformDiscount: number  // 0.5-1.0
}

// 会员等级调整记录
MemberLevelAdjustRecord {
  userId: string
  userName: string
  fromLevel: number
  toLevel: number
  adjustType: 'upgrade' | 'downgrade' | 'manual'
  reason: string
  operator: string
  createdAt: string
}
```

## Mock 数据 (services/mocks/member.mock.ts)

包含以下 Mock 数据集合：

- `mockMemberLevelUpgradeRules` - VIP0-VIP9 升级规则 (10项)
- `mockMemberLevelDiscountRules` - VIP0-VIP9 折扣规则 (10项)
- `mockTrialMemberConfig` - 体验会员配置
- `mockUserMemberInfos` - 用户会员信息 (5个用户)
- `mockUserNightRecords` - 用户间夜记录 (3条记录)
- `mockMemberLevelAdjustRecords` - 等级调整记录 (3条记录)
- `mockMemberQueryRecords` - 会员查询数据 (5条记录，用于表格)

## 服务层 (services/member.service.ts)

单例服务，提供以下方法：

### 用户会员管理
```typescript
// 获取用户会员信息列表
getUserInfos(params?: {
  phone?: string
  level?: number
  page?: number
  pageSize?: number
}): Promise<{ list: UserMemberInfo[]; total: number }>

// 获取用户详细信息
getUserDetail(userId: string): Promise<{
  userInfo: UserMemberInfo | null
  nightRecords: UserNightRecord[]
  adjustRecords: MemberLevelAdjustRecord[]
}>

// 手动调整用户会员等级
adjustUserLevel(
  userId: string,
  toLevel: number,
  validityDays: number,
  reason: string,
  operator: string
): Promise<void>
```

### 会员查询（表格数据）
```typescript
// 获取会员查询列表（带分页）
getMemberQueryList(
  params?: MemberQueryFilterParams & {
    page?: number
    pageSize?: number
  }
): Promise<PaginatedResult<MemberQueryRecord>>

// 导出会员数据
exportMembers(
  params?: MemberQueryFilterParams
): Promise<MemberQueryRecord[]>
```

### 等级和折扣规则
```typescript
// 获取升级规则
getUpgradeRules(): Promise<MemberLevelUpgradeRule[]>

// 更新升级规则
updateUpgradeRule(
  level: number,
  data: Partial<MemberLevelUpgradeRule>
): Promise<MemberLevelUpgradeRule>

// 获取折扣规则
getDiscountRules(): Promise<MemberLevelDiscountRule[]>

// 更新折扣规则
updateDiscountRule(
  level: number,
  data: Partial<MemberLevelDiscountRule>
): Promise<MemberLevelDiscountRule>
```

## 组件功能详解

### 状态管理
```typescript
data() {
  return {
    tableData: MemberQueryRecord[]        // 表格数据
    isLoading: boolean                     // 加载中
    isExporting: boolean                   // 导出中
    filters: {                             // 筛选条件
      accountStatus: string | 'all'
      memberLevel: string | 'all'
      merchantName: string
    }
    pagination: {                          // 分页信息
      current: number
      pageSize: number
      total: number
      totalPages: number
    }
  }
}
```

### 核心方法

#### loadData()
加载表格数据，根据筛选条件和分页参数请求服务

```typescript
async loadData() {
  // 构建查询参数
  // 调用 memberService.getMemberQueryList()
  // 更新 tableData 和分页信息
}
```

#### handleSearch()
搜索/筛选，重置到第一页并重新加载

```typescript
async handleSearch() {
  this.pagination.current = 1
  await this.loadData()
}
```

#### handleReset()
重置所有筛选条件

```typescript
handleReset() {
  this.filters = { accountStatus: 'all', memberLevel: 'all', merchantName: '' }
  this.pagination.current = 1
  this.loadData()
}
```

#### handleTableChange(pagination)
表格分页或页码大小变化

```typescript
async handleTableChange(pagination: any) {
  this.pagination.current = pagination.current
  this.pagination.pageSize = pagination.pageSize
  await this.loadData()
}
```

#### handleExport()
导出当前筛选结果为 CSV

```typescript
async handleExport() {
  const data = await memberService.exportMembers(params)
  this.downloadCSV(data)
}
```

#### downloadCSV(data)
生成 CSV 文件并触发下载

- 包含完整表头
- UTF-8 BOM 支持中文
- 文件名：`members-{timestamp}.csv`

### 辅助方法

```typescript
// 获取状态标签文字
getStatusLabel(status: string): string

// 获取状态颜色（用于 Tag）
getStatusColor(status: string): string
```

## 样式

使用 Less，包含：

- `.page-container` - 页面容器（padding 24px，灰色背景）
- `.filter-card` - 筛选卡片（带阴影，下margin）
- `.filter-container` - 筛选控件容器（flex，12px gap）
- `.list-card` - 列表卡片（带阴影）
- `.empty-state` - 空状态文本（居中，灰色）

## 使用方式

### 导入组件
```vue
<template>
  <MembersPage />
</template>

<script>
import MembersPage from '@/views/PlatformAdmin/MemberManagement/MembersPage.vue'
</script>
```

### 直接导入服务
```typescript
import memberService from '@/views/PlatformAdmin/MemberManagement/services/member.service'

// 使用
const members = await memberService.getMemberQueryList({ page: 1, pageSize: 10 })
```

### 导入类型
```typescript
import type { UserMemberInfo, MemberQueryRecord } from '@/views/PlatformAdmin/MemberManagement/types'
```

## Ant Design Vue 组件依赖

- `a-card` - 卡片容器
- `a-input` - 输入框
- `a-select` - 下拉框
- `a-button` - 按钮
- `a-table` - 表格
- `a-tag` - 标签
- `a-message` - 消息提示
- Icons: `SearchOutlined`, `DownloadOutlined`

## 迁移说明

该模块从 Remix 完整迁移而来，保留了所有功能：

- 类型定义完全兼容
- Mock 数据与原始数据一致
- 服务方法对应原始实现
- UI/UX 保持一致

### 主要改动

| 项目 | Remix | Vue |
|------|-------|-----|
| 框架 | Remix React | Vue 2 Composition API |
| UI库 | shadcn/ui | Ant Design Vue |
| 路由 | Remix Routes | Vue Router |
| 状态管理 | React Hooks | Vue data() |
| 表格 | 自定义表格 | ATable 组件 |
| 样式 | Tailwind + CSS Modules | Less Scoped |
| 包装 | MainLayout | Sidebar 组件 |

## 扩展建议

### 添加新的筛选条件
1. 在 `FilterState` 接口中添加字段
2. 在 `filters` 中初始化
3. 在 `loadData()` 中添加筛选逻辑
4. 在 template 中添加输入控件

### 添加操作列（编辑、删除）
1. 在 `columns` 中添加 `render` 自定义渲染
2. 实现对应的处理方法
3. 调用 `memberService` 的相应方法

### 集成真实 API
1. 在 `services/member.service.ts` 中添加 HTTP 请求
2. 修改方法实现，替换 Mock 数据
3. 保持接口签名不变，确保组件兼容

## 许可证

同项目许可证
