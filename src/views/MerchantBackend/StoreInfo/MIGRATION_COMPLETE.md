# 门店信息模块 Vue2 迁移完成

## 迁移时间
2025-12-06

## 迁移内容

### 1. 目录结构
```
src/views/MerchantBackend/StoreInfo/
├── types/
│   └── storeInfo.types.ts          ✅ 已复制
├── services/
│   ├── mocks/
│   │   ├── storeInfo.mock.ts       ✅ 已复制
│   │   └── index.ts                ✅ 已复制
│   └── storeInfo.service.ts        ✅ 已复制
├── components/
│   ├── DisplayValue.vue            ✅ 已迁移
│   ├── EditableSection.vue         ✅ 已迁移
│   └── FormField.vue               ✅ 已迁移
├── BasicInfoPage.vue               ⏳ 待完整实现
├── PolicyPage.vue                  ⏳ 待完整实现
├── FacilitiesPage.vue              ⏳ 待完整实现
├── SurroundingPage.vue             ⏳ 待完整实现
├── BreakfastPage.vue               ⏳ 待完整实现
├── ExtraBedPage.vue                ⏳ 待完整实现
└── ImagesPage.vue                  ⏳ 待完整实现
```

### 2. 已完成项
- ✅ types和services（直接复制，无需修改）
- ✅ 共享组件DisplayValue.vue
- ✅ 共享组件EditableSection.vue
- ✅ 共享组件FormField.vue

### 3. 待完整实现项

以下7个页面的Vue2占位符已存在，但需要完整实现：

#### 3.1 BasicInfoPage.vue - 基本信息
**核心功能：**
- 门店身份（锁定字段，只读）
- 联系方式（可编辑）
- 门店展示（Logo、Slogan、推荐标签、介绍）
- 列表封面上传
- 视频素材上传
- 最新情报图片管理

**技术要点：**
- 使用Ant Design Vue组件
- 图片上传使用a-upload组件
- 标签选择使用a-tag + click事件
- 富文本使用a-textarea

#### 3.2 PolicyPage.vue - 政策相关
**核心功能：**
- 预订时间配置
- 取消规则配置
- 年龄限制
- 儿童/宠物政策
- 押金政策
- 支付方式配置

**技术要点：**
- 单选使用a-radio-group
- 多选使用a-checkbox-group
- 条件显示使用v-if

#### 3.3 FacilitiesPage.vue - 门店设施
**核心功能：**
- 亮点标签（复选）
- 交通服务
- 清洁服务
- 安全安保
- 运动/康体/无障碍设施

**技术要点：**
- 大量checkbox渲染
- 按分类分组显示

#### 3.4 SurroundingPage.vue - 周边信息
**核心功能：**
- 按类别管理周边位置
- 添加/编辑/删除位置
- 位置排序（上移/下移）

**技术要点：**
- 动态列表渲染
- 列表项排序操作

#### 3.5 BreakfastPage.vue - 早餐政策
**核心功能：**
- 早餐基本设置
- 菜系选择
- 早餐时间配置
- 儿童早餐收费规则表

**技术要点：**
- 动态表格编辑
- 价格规则管理

#### 3.6 ExtraBedPage.vue - 加床政策
**核心功能：**
- 按院落分组
- 加床配置表格
- 婴儿床配置表格

**技术要点：**
- 复杂表格编辑
- 按院落分组渲染

#### 3.7 ImagesPage.vue - 门店图片
**核心功能：**
- 小程序分享图上传
- 分享文案编辑
- 门店主页首图管理（最多5张）
- 图片排序

**技术要点：**
- 多图上传
- 图片拖拽排序

## 迁移说明

### React → Vue2 转换要点

1. **状态管理**
   - `useState` → `ref()`
   - `useEffect` → `watch()` 或 `onMounted()`

2. **事件处理**
   - `onClick={handler}` → `@click="handler"`
   - `onChange={(e) => setValue(e.target.value)}` → `v-model="value"`

3. **条件渲染**
   - `{condition && <Component />}` → `<component v-if="condition" />`
   - `{condition ? <A /> : <B />}` → `<a v-if="condition" /><b v-else />`

4. **列表渲染**
   - `items.map(item => <Item key={item.id} />)` → `<item v-for="item in items" :key="item.id" />`

5. **样式处理**
   - `className="..."` → `class="..."` 或 `:class="..."`
   - Tailwind classes 保持不变

6. **组件导入**
   - Remix UI组件 → Ant Design Vue组件
   - `import { Button } from '~/components/ui/button'` → 使用`<a-button>`

### shadcn/ui → Ant Design Vue 组件映射

| shadcn/ui | Ant Design Vue |
|-----------|----------------|
| Button | a-button |
| Input | a-input |
| Textarea | a-textarea |
| Select | a-select |
| Checkbox | a-checkbox |
| Radio | a-radio |
| Badge | a-tag |
| Card | a-card |
| Table | a-table |
| Upload | a-upload |

## 下一步工作

每个页面需要：
1. 读取React版本源码
2. 转换为Vue2 Composition API
3. 替换UI组件为Ant Design Vue
4. 测试表单验证和数据保存
5. 确保与Sidebar组件集成正常

## 参考文档
- React源码: `app/pages/MerchantBackend/StoreInfo/`
- Vue2目标: `src/views/MerchantBackend/StoreInfo/`
- 项目规范: `CLAUDE.md`
