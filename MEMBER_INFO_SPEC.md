# 会员信息字段规范

## 🎯 全局概念统一

**重要**：在整个系统中，**用户 = 会员**，所有涉及"用户"的地方统一称为"会员"。

---

## 📋 会员基本信息字段

### **必填字段**

| 字段名 | 类型 | 说明 | 规则 |
|--------|------|------|------|
| `nickname` | `string` | 昵称 | 必填，可修改 |
| `phone` | `string` | 手机号 | 必填，唯一标识 |

### **选填字段（填写后不可改为空）**

| 字段名 | 类型 | 说明 | 规则 |
|--------|------|------|------|
| `realName` | `string \| null` | 真实姓名 | 选填，**填写后不可改为空** |
| `gender` | `Gender \| null` | 性别 | 选填（男/女），**填写后不可改为空** |
| `region` | `Region \| null` | 地区 | 选填（省市维度），**填写后不可改为空** |

---

## 🔢 类型定义

### **Gender（性别枚举）**

```typescript
export enum Gender {
  MALE = 'male',   // 男
  FEMALE = 'female' // 女
}

export const GenderLabels: Record<Gender, string> = {
  [Gender.MALE]: '男',
  [Gender.FEMALE]: '女'
}
```

### **Region（地区信息）**

```typescript
export interface Region {
  province: string // 省份，如"浙江省"
  city: string     // 城市，如"杭州市"
}
```

---

## 📊 完整的UserMemberInfo接口

```typescript
export interface UserMemberInfo {
  userId: string

  // 基本信息
  nickname: string           // 昵称（必填，可修改）
  realName: string | null    // 真实姓名（选填，填写后不可改为空）
  gender: Gender | null      // 性别（选填，填写后不可改为空）
  region: Region | null      // 地区（选填，填写后不可改为空）
  phone: string

  // 会员等级信息
  currentLevel: number
  currentLevelName: string
  formalLevel: number
  formalValidityDate: string
  trialLevel: number | null
  trialValidityDate: string | null

  // 间夜计数器
  totalNights: number
  yearUpgradeNights: number
  maintainNights: number
  upgradedThisYear: boolean

  // 其他信息
  validityDate: string
  pointsBalance: number
  registeredAt: string
}
```

---

## 🎨 Mock数据示例

### **场景1：完整信息会员**
```typescript
{
  userId: '100000',
  nickname: '旅行达人',
  realName: '张明',
  gender: Gender.MALE,
  region: { province: '浙江省', city: '杭州市' },
  phone: '13812341234',
  // ... 其他字段
}
```

### **场景2：部分信息会员（只填写了性别）**
```typescript
{
  userId: '100001',
  nickname: '阳光少年',
  realName: null,
  gender: Gender.MALE,
  region: null,
  phone: '13923455678',
  // ... 其他字段
}
```

### **场景3：未填写可选信息的会员**
```typescript
{
  userId: '100002',
  nickname: '微笑的猫咪',
  realName: null,
  gender: null,
  region: null,
  phone: '13634569012',
  // ... 其他字段
}
```

---

## ⚠️ 业务规则

### **1. 字段填写规则**

- **昵称**：始终可修改
- **姓名**：
  - 未填写时（`null`）：可以填写
  - 已填写时：可以修改，但**不可删除或改为空**
- **性别**：
  - 未填写时（`null`）：可以选择男或女
  - 已填写时：可以修改（男↔女），但**不可删除或改为空**
- **地区**：
  - 未填写时（`null`）：可以选择省市
  - 已填写时：可以修改省市，但**不可删除或改为空**

### **2. 前端验证逻辑**

```typescript
// 检查是否可以清空字段
function canClearField(fieldName: 'realName' | 'gender' | 'region', currentValue: any): boolean {
  // 如果当前值为null，说明未填写过，不需要限制
  if (currentValue === null) {
    return true
  }
  // 如果已填写，不允许清空
  return false
}

// 提交前验证
function validateMemberInfoUpdate(oldInfo: UserMemberInfo, newInfo: Partial<UserMemberInfo>): boolean {
  // 如果尝试清空已填写的字段，返回false
  if (oldInfo.realName !== null && newInfo.realName === null) {
    throw new Error('姓名已填写，不可清空')
  }
  if (oldInfo.gender !== null && newInfo.gender === null) {
    throw new Error('性别已填写，不可清空')
  }
  if (oldInfo.region !== null && newInfo.region === null) {
    throw new Error('地区已填写，不可清空')
  }
  return true
}
```

### **3. UI交互规则**

#### **输入框状态**

**未填写时：**
```tsx
<Input
  placeholder="请输入真实姓名（选填）"
  value={realName || ''}
/>
```

**已填写时：**
```tsx
<Input
  placeholder="请输入真实姓名"
  value={realName}
  // 不显示清空按钮
/>
```

#### **选择器状态**

**性别选择（未填写时）：**
```tsx
<Select value={gender || ''} placeholder="请选择性别（选填）">
  <option value="">未设置</option>
  <option value="male">男</option>
  <option value="female">女</option>
</Select>
```

**性别选择（已填写时）：**
```tsx
<Select value={gender} placeholder="请选择性别">
  // 不提供"未设置"选项
  <option value="male">男</option>
  <option value="female">女</option>
</Select>
```

---

## 🗂️ 相关文件位置

- **类型定义**：`app/pages/PlatformAdmin/MemberManagement/types/member.types.ts`
- **Mock数据**：`app/pages/PlatformAdmin/MemberManagement/services/mocks/member.mock.ts`

---

## 📍 常用省市数据参考

```typescript
export const commonRegions = [
  { province: '北京市', city: '北京市' },
  { province: '上海市', city: '上海市' },
  { province: '广东省', city: '广州市' },
  { province: '广东省', city: '深圳市' },
  { province: '浙江省', city: '杭州市' },
  { province: '江苏省', city: '南京市' },
  { province: '四川省', city: '成都市' },
  { province: '湖北省', city: '武汉市' },
  { province: '陕西省', city: '西安市' },
  { province: '福建省', city: '厦门市' },
]
```

---

## ✅ 实施检查清单

开发会员信息相关功能时，请确保：

- [ ] 使用 `nickname` 而非 `userName`
- [ ] 姓名、性别、地区字段类型为 `T | null`
- [ ] Mock数据包含各种场景（完整信息、部分信息、未填写）
- [ ] 前端验证：已填写字段不可改为空
- [ ] UI提示：已填写字段不显示"清空"或"未设置"选项
- [ ] 全局统一：所有"用户"改为"会员"
