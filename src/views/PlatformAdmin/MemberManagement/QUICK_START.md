# 会员管理模块 - 快速开始

## 5分钟快速入门

### 1. 导入和使用

```vue
<template>
  <MembersPage />
</template>

<script>
import MembersPage from '@/views/PlatformAdmin/MemberManagement/MembersPage.vue'

export default {
  components: { MembersPage }
}
</script>
```

### 2. 直接调用服务

```typescript
import memberService from '@/views/PlatformAdmin/MemberManagement/services/member.service'

// 获取会员列表
const result = await memberService.getMemberQueryList({
  page: 1,
  pageSize: 10,
  accountStatus: 'registered',
  memberLevel: 3
})
console.log(result.list, result.total)

// 导出数据
const data = await memberService.exportMembers({
  memberLevel: 1
})
console.log(data)

// 获取用户详情
const detail = await memberService.getUserDetail('100000')
console.log(detail.userInfo, detail.nightRecords)

// 调整用户等级
await memberService.adjustUserLevel(
  '100000',  // userId
  5,         // toLevel
  365,       // validityDays
  '客诉补偿', // reason
  '管理员'   // operator
)
```

### 3. 导入类型

```typescript
import type {
  UserMemberInfo,
  MemberQueryRecord,
  MemberLevelUpgradeRule,
  AccountStatus,
  Gender
} from '@/views/PlatformAdmin/MemberManagement/types'

const member: MemberQueryRecord = {
  id: '1',
  phone: '13800000000',
  accountStatus: 'registered',
  currentLevel: 3,
  // ... 其他字段
}
```

## 核心概念

### 会员等级
- VIP0: 普通用户（无会员）
- VIP1-VIP9: 付费会员，等级越高权益越多

### 账号状态
- `pre_register`: 预注册（未激活）
- `registered`: 已注册（激活用户）
- `disabled`: 禁用（被封禁）

### 获得方式
- `nights_consume`: 通过入住间夜获得
- `merchant_import`: 商户导入获得

## 组件状态

### 搜索筛选
```vue
<template>
  <!-- 组件内部维护状态 -->
  <div>
    <a-input v-model:value="filters.merchantName" />
    <a-select v-model:value="filters.accountStatus" />
    <a-select v-model:value="filters.memberLevel" />
    <a-button @click="handleSearch">搜索</a-button>
  </div>
</template>
```

### 表格分页
```typescript
data() {
  return {
    tableData: [],      // 表格数据
    pagination: {
      current: 1,      // 当前页
      pageSize: 10,    // 每页条数
      total: 0,        // 总条数
      totalPages: 0    // 总页数
    }
  }
}
```

## 常见操作

### 刷新列表
```typescript
// 重新加载当前页数据
await this.loadData()

// 跳转到第一页
this.pagination.current = 1
await this.loadData()
```

### 修改页码大小
```typescript
// 自动触发 handleTableChange
// 无需手动调用
```

### 导出所有筛选结果
```typescript
// 点击导出按钮自动处理
// 或手动调用：
await this.handleExport()
```

### 清除所有筛选
```typescript
// 点击重置按钮自动处理
// 或手动调用：
this.handleReset()
```

## 修改 Mock 数据

### 修改会员记录

编辑 `services/mocks/member.mock.ts`:

```typescript
export const mockMemberQueryRecords: MemberQueryRecord[] = [
  {
    id: 'member-1',
    phone: '13800000000',  // 修改手机号
    accountStatus: 'registered',  // 修改状态
    currentLevel: 5,  // 修改等级
    // ... 其他字段
  },
  // 添加新记录...
]
```

### 修改升级规则

编辑 `services/mocks/member.mock.ts`:

```typescript
export const mockMemberLevelUpgradeRules: MemberLevelUpgradeRule[] = [
  {
    level: 1,
    levelName: 'VIP1',
    upgradeNights: 5,      // 修改升级间夜数
    validityDays: 365,     // 修改有效期天数
    maintainNights: 3,     // 修改保级间夜数
    updatedAt: '2025-11-01 09:00:00',
  },
  // ...
]
```

## 集成真实 API

### 步骤 1: 更新服务方法

编辑 `services/member.service.ts`:

```typescript
async getMemberQueryList(params?: any): Promise<PaginatedResult<MemberQueryRecord>> {
  // 移除 Mock 调用
  // await new Promise((resolve) => setTimeout(resolve, 400))
  // let filtered = [...this.memberQueryRecords]

  // 添加 API 调用
  const response = await fetch('/api/members', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(params)
  })

  if (!response.ok) throw new Error('API Error')
  return response.json()
}
```

### 步骤 2: 组件无需修改

由于类型和接口保持一致，组件无需任何修改，自动适配真实 API。

## 调试技巧

### 查看请求参数

```typescript
// 在 loadData() 中添加：
console.log('Request params:', params)
```

### 查看响应数据

```typescript
// 在 loadData() 中添加：
console.log('Response:', result)
console.log('Table data:', this.tableData)
```

### 查看组件状态

```typescript
// 在浏览器控制台：
$vm0.filters        // 查看筛选条件
$vm0.pagination     // 查看分页信息
$vm0.tableData      // 查看表格数据
```

## 常见问题

### Q: 表格不显示数据？
A: 检查：
1. `loadData()` 是否被调用
2. `tableData` 是否有值
3. 网络请求是否成功
4. Mock 数据是否存在

### Q: 分页按钮灰显？
A: 这是正常的，表示已在最后一页或首页

### Q: 导出失败？
A: 检查：
1. 浏览器是否允许下载
2. 文件名是否包含特殊字符
3. CSV 编码是否正确

### Q: 搜索无结果？
A: 检查：
1. 搜索关键词是否正确
2. Mock 数据是否包含该内容
3. 筛选条件是否过于严格

## 性能优化

### 大数据列表优化

```typescript
// 在 MembersPage.vue 中：
const MAX_DISPLAY = 1000  // 限制最大显示条数

async loadData() {
  const result = await memberService.getMemberQueryList(params)
  // 限制数据量
  this.tableData = result.list.slice(0, MAX_DISPLAY)
}
```

### 缓存优化

```typescript
// 在 member.service.ts 中：
private cache: Map<string, any> = new Map()

async getMemberQueryList(params?: any) {
  const key = JSON.stringify(params)

  if (this.cache.has(key)) {
    return this.cache.get(key)
  }

  const result = await fetch(...)
  this.cache.set(key, result)
  return result
}
```

## 样式自定义

### 修改颜色

```less
// 在 MembersPage.vue 的 <style> 中：

// 修改等级颜色
span[style*="currentLevel"] {
  color: #ff6b00 !important;  // 改成你的颜色
}

// 修改卡片阴影
.filter-card {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15) !important;
}
```

### 修改布局

```less
// 修改筛选器宽度
.filter-container {
  gap: 16px;  // 改成你喜欢的间距
}

// 修改表格列宽
// 在 columns 定义中修改 width 属性
```

## 更多信息

- 完整文档: [README.md](./README.md)
- 迁移总结: [MEMBER_MANAGEMENT_MIGRATION_SUMMARY.md](../../MEMBER_MANAGEMENT_MIGRATION_SUMMARY.md)
- 项目规范: [CLAUDE.md](../../CLAUDE.md)

## 快捷链接

| 文件 | 用途 |
|------|------|
| `MembersPage.vue` | 页面入口 |
| `services/member.service.ts` | API 调用 |
| `types/member.types.ts` | 类型定义 |
| `services/mocks/member.mock.ts` | 示例数据 |

祝使用愉快！有问题欢迎提交 issue。
