# 后台页面UI优化指南

## 优化目标

1. **现代化表格样式** - 更美观的表格设计
2. **查看/编辑状态区分** - 查看时显示普通文字，编辑时显示输入框
3. **统一按钮配色** - 遵循品牌蓝色系
4. **改进交互体验** - 适度动画和hover效果

---

## 已完成的优化

### 1. 全局Table组件 (`app/components/ui/table.tsx`)

**改进点：**
- TableHead: 浅灰色背景 `bg-slate-50/80`，圆角 `first:rounded-tl-lg last:rounded-tr-lg`
- TableRow: 改进hover效果 `hover:bg-slate-50/80`
- TableCell: 增加行高到 `h-14` 提升可读性

**效果：**
```tsx
<TableHead className="h-11 px-4 text-left align-middle font-semibold text-slate-700 text-sm bg-slate-50/80 first:rounded-tl-lg last:rounded-tr-lg" />
<TableRow className="border-b border-slate-200 transition-colors hover:bg-slate-50/80 data-[state=selected]:bg-blue-50" />
<TableCell className="h-14 px-4 align-middle text-sm text-slate-900" />
```

### 2. EditableSection组件 (`app/pages/MerchantBackend/StoreInfo/components/EditableSection.tsx`)

**改进点：**
- 添加分隔线 `border-b border-slate-100`
- 改进卡片hover效果 `hover:shadow-md transition-shadow`
- 统一按钮样式和间距

**使用方法：**
```tsx
<EditableSection
  title="标题"
  isEditing={isEditing}
  onEdit={handleEdit}
  onSave={handleSave}
  onCancel={handleCancel}
  isSaving={isSaving}
>
  {/* 内容 */}
</EditableSection>
```

### 3. DisplayValue组件 (`app/pages/MerchantBackend/StoreInfo/components/DisplayValue.tsx`)

**用途：** 在查看状态下显示普通黑色文字

**使用方法：**
```tsx
{isEditing ? (
  <Input value={formData.name} onChange={...} />
) : (
  <DisplayValue value={formData.name} />
)}
```

### 4. BasicInfoPage示例

完整实现了查看/编辑状态区分，可作为其他页面的参考模板。

---

## 优化规范

### 配色规范

遵循 `setting_page_color.md` 定义：

#### 按钮配色
```tsx
// 主按钮 (Primary) - 品牌蓝
className="h-9 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium shadow-sm transition-all"

// 次要按钮 (Secondary) - 灰色边框
className="h-9 px-4 border-slate-300 hover:border-slate-400 hover:bg-slate-50 font-medium transition-all"

// 危险按钮 (Destructive) - 红色
className="h-9 px-4 bg-red-600 hover:bg-red-700 text-white font-medium shadow-sm transition-all"
```

#### 输入框样式
```tsx
className="h-9 px-3 border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
```

#### 锁定字段样式
```tsx
<div className="min-h-[36px] flex items-center px-3 py-2 bg-slate-50 text-slate-700 rounded-md border border-slate-200">
  {锁定的值}
</div>
```

### 查看/编辑状态区分

**查看状态：**
- 使用 `<DisplayValue>` 组件显示普通文字
- 文字颜色：`text-slate-900`
- 空值显示：`—`

**编辑状态：**
- 显示Input/Textarea/Select等表单组件
- 统一样式类：`h-9 border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20`

**模板：**
```tsx
<FormField label="字段名" required>
  {isEditing ? (
    <Input
      value={formData.field}
      onChange={(e) => updateField('field', e.target.value)}
      className="h-9 border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
    />
  ) : (
    <DisplayValue value={formData.field} />
  )}
</FormField>
```

### 表格优化

**使用优化后的Table组件：**
```tsx
<Table>
  <TableHeader>
    <TableRow>
      <TableHead>列名</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell>内容</TableCell>
    </TableRow>
  </TableBody>
</Table>
```

**状态Badge：**
```tsx
// 成功状态
<Badge className="border-green-300 text-green-700 bg-green-50">已启用</Badge>

// 警告状态
<Badge className="border-orange-300 text-orange-700 bg-orange-50">待处理</Badge>

// 错误状态
<Badge className="border-red-300 text-red-700 bg-red-50">已禁用</Badge>
```

---

## 待优化页面清单

### 商户端 (MerchantBackend)

- [x] StoreInfo/BasicInfoPage.tsx ✅ 已优化
- [ ] StoreInfo/PolicyInfoPage.tsx
- [ ] StoreInfo/FacilityInfoPage.tsx
- [ ] StoreInfo/SurroundingInfoPage.tsx
- [ ] StoreInfo/BreakfastPolicyPage.tsx
- [ ] StoreInfo/ExtraBedPolicyPage.tsx
- [ ] StoreInfo/ImageInfoPage.tsx
- [ ] PointsService/PointsServiceConfigPage.tsx
- [ ] VIPDiscount/VIPDiscountConfigPage.tsx
- [ ] AgentOrder/AgentOrderCreatePage.tsx
- [ ] OldCustomer/InviteMemberPage.tsx

### 平台后台 (PlatformAdmin)

#### 积分管理
- [ ] PointsManagement/BaseRuleConfigPage.tsx
- [ ] PointsManagement/PointsAdjustmentPage.tsx
- [ ] PointsManagement/ValueAddedServicesPage.tsx
- [ ] PointsManagement/MemberLevelRatesPage.tsx
- [ ] PointsManagement/UserPointsDetailPage.tsx
- [ ] PointsManagement/PointsStatisticsPage.tsx

#### 会员管理
- [ ] MemberManagement/UpgradeRulesPage.tsx
- [ ] MemberManagement/DiscountRulesPage.tsx
- [ ] MemberManagement/UserMemberManagementPage.tsx
- [ ] MemberManagement/MemberInvitationPage.tsx

#### 用户管理
- [ ] UserManagement/UserListPage.tsx
- [ ] UserManagement/UserDetailPage.tsx
- [ ] UserManagement/UserSearchPage.tsx

---

## 优化步骤（逐个页面）

1. **备份原文件**
   ```bash
   cp PageName.tsx PageName.old.tsx
   ```

2. **检查是否有编辑功能**
   - 如果有：实现查看/编辑状态区分
   - 如果没有：只优化样式

3. **应用统一样式**
   - 按钮配色
   - 输入框样式
   - 表格样式

4. **测试功能**
   - 编辑/保存/取消流程
   - 表单验证
   - 交互效果

5. **更新清单**
   - 标记为已完成

---

## 质量检查清单

- [ ] 按钮使用品牌蓝 `bg-blue-600 hover:bg-blue-700`
- [ ] 输入框聚焦效果 `focus:border-blue-500 focus:ring-2`
- [ ] 查看状态显示普通文字，不是灰色输入框
- [ ] 表格使用优化后的样式
- [ ] 锁定字段有明显视觉区分
- [ ] 状态Badge使用合适的颜色
- [ ] 所有按钮高度统一 `h-9`
- [ ] hover效果流畅自然

---

## 注意事项

1. **不要过度动画** - 只保留必要的transition效果
2. **保持一致性** - 所有页面使用相同的设计模式
3. **可访问性** - 确保对比度符合标准
4. **响应式** - 考虑不同屏幕尺寸
5. **性能** - 避免不必要的重渲染

---

## 参考资源

- 配色规范：`f:/pjs/homestay_v1/setting_page_color.md`
- 优化示例：`app/pages/MerchantBackend/StoreInfo/BasicInfoPage.tsx`
- 组件库：shadcn/ui文档
