# PolicyInfoPage 重写完成指南

## 已完成的工作

✅ 创建了新的 `PolicyInfoPage_NEW.tsx` 文件，包含完整的重写代码

## 需要手动完成的步骤

### 步骤1: 更新类型定义文件

打开文件: `app/pages/MerchantBackend/StoreInfo/types/storeInfo.types.ts`

找到 `PolicyInfo` 接口中的这段代码（大约在第47-53行）:

```typescript
// 办理入住年龄
ageRestriction: 'no_limit' | 'limited' // 年龄限制
minAge?: number // 最小年龄

// 宠物政策
petPolicy: 'not_allowed' | 'allowed' | 'on_request' // 宠物政策
petNote?: string // 宠物补充说明

// 支付方式
```

替换为:

```typescript
// 办理入住年龄
ageRestriction: 'no_limit' | 'limited' // 年龄限制
minAge?: number // 最小年龄
maxAge?: number // 最大年龄（null表示不限）

// 儿童政策
childPolicy: 'allowed' | 'need_confirm' | 'not_allowed' // 儿童政策
childPolicyNote?: string // 儿童政策说明

// 宠物政策
petPolicy: 'not_allowed' | 'allowed' | 'on_request' // 宠物政策
petNote?: string // 宠物补充说明

// 押金政策
depositRequired: 'no' | 'fixed' | 'per_room' | 'per_night' // 是否收取押金
depositAmount?: number // 押金金额

// 支付方式
```

### 步骤2: 替换页面文件

将 `PolicyInfoPage_NEW.tsx` 的内容复制到 `app/pages/MerchantBackend/StoreInfo/PolicyInfoPage.tsx`

或者直接删除旧文件，重命名新文件:
```bash
# 在项目根目录执行
rm app/pages/MerchantBackend/StoreInfo/PolicyInfoPage.tsx
mv PolicyInfoPage_NEW.tsx app/pages/MerchantBackend/StoreInfo/PolicyInfoPage.tsx
```

### 步骤3: 更新 Mock 数据

打开文件: `app/pages/MerchantBackend/StoreInfo/services/mocks/storeInfo.mock.ts`

在 `policyInfo` 对象中添加新字段的默认值:

```typescript
policyInfo: {
  // ... 现有字段 ...

  // 办理入住年龄 - 添加 maxAge
  ageRestriction: 'limited',
  minAge: 18,
  maxAge: 65,  // ← 新增

  // 儿童政策 - 新增整个部分
  childPolicy: 'allowed',  // ← 新增
  childPolicyNote: '12岁以下儿童需有成人陪同', // ← 新增

  // 宠物政策 (保持不变)
  petPolicy: 'on_request',
  petNote: '需提前联系确认，可能收取额外清洁费',

  // 押金政策 - 新增整个部分
  depositRequired: 'fixed',  // ← 新增
  depositAmount: 500,  // ← 新增

  // ... 其他字段 ...
}
```

### 步骤4: 类型检查

运行类型检查确保没有错误:

```bash
npm run typecheck
```

## 新增功能说明

### 1. 页面分组重组（按PRD）
- ✅ 预订时间 (原"入住及退房时间")
- ✅ 取消规则 (原"取消政策")
- ✅ 办理入住年龄 (新增最大年龄选择)
- ✅ **儿童政策** (全新模块)
- ✅ 宠物政策
- ✅ **押金政策** (全新模块)
- ✅ 前台可用支付方式 (原"支付方式")
- ✅ 预订担保可用银行卡
- ✅ 政策补充

### 2. 新增字段
- `maxAge`: 最大年龄限制（可选"不限"）
- `childPolicy`: 儿童政策（允许/需确认/不接待）
- `childPolicyNote`: 儿童政策说明
- `depositRequired`: 押金类型（否/固定/按房间/按天数）
- `depositAmount`: 押金金额

### 3. UI 组件升级
- 使用 `DisplayValue` 组件统一查看状态显示
- 年龄选择使用 `Select` 下拉框（18-100岁）
- 条件字段使用蓝色左边框标识（`border-l-2 border-blue-200`）
- 所有表单元素高度统一为 `h-9` (36px)

### 4. 表单验证增强
- 验证押金金额（当选择收取押金时）
- 保持原有的入住时间、取消规则、年龄限制验证

## 测试检查清单

- [ ] 类型检查通过
- [ ] 查看状态下所有字段正常显示
- [ ] 编辑状态下所有表单控件可交互
- [ ] 条件显示逻辑正常（限时取消、年龄限制、押金金额）
- [ ] 保存按钮验证逻辑正确
- [ ] 取消按钮有确认提示
- [ ] 年龄下拉框选项正确（18-100岁 + "不限"）
- [ ] 儿童政策和押金政策模块完整显示

## 问题排查

如果遇到类型错误，检查：
1. `storeInfo.types.ts` 是否正确添加了新字段
2. Mock 数据是否包含新字段
3. 是否正确导入了 `Select` 和 `DisplayValue` 组件

如果显示异常，检查：
1. 所有 `FormField` 是否正确使用 `DisplayValue`
2. 条件显示的逻辑是否正确（`&&` 运算符）
3. CSS 类名是否正确应用
