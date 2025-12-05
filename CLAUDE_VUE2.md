# Vue 2.6.12 + Ant Design Vue 1.7.8 项目开发规范

## 目录

### Part 1: 项目设置
- [Overview](#overview)
- [快速开始](#快速开始)
- [配置文件](#配置文件)

### Part 2: 架构规范
- [核心原则](#核心原则)
- [路由规范](#路由规范)
- [模块结构](#模块结构)
- [导入规范](#导入规范)

### Part 3: 开发模块
- [开发顺序](#开发顺序)
- [分步指南](#分步指南)

### 快速参考
- [关键原则](#关键原则)
- [Vue模式](#vue模式)
- [工作流程](#工作流程)
- [文件夹权限规则](#文件夹权限规则)
- [故障排除](#故障排除)
- [开发标准](#开发标准)

---

## Overview

构建完整的 Vue 2 + TypeScript ERP 应用，采用模块化架构。

**核心技术栈:**
- **Vue 2.6.12** + **@vue/composition-api 1.7.2** - 渐进式框架
- **Vue Router 3.5.4** - 路由管理
- **Vuex 3.6.2** - 状态管理
- **Ant Design Vue 1.7.8** + **Less 4.2.0** - UI组件和样式
- **Vite 5.4.11** - 构建工具
- **TypeScript 5.6.3** - 类型安全
- **工具库**: Day.js, Lodash, Moment.js

**⚠️ 重要: Vue 2 + Vite + Less 集成**

Vue 2.6.12 使用 **Vite作为构建工具**, Ant Design使用 **Less作为样式语言**。必须配置:
- `vite.config.js` - 用于运行时模块解析 (路径别名 + Less配置)
- `tsconfig.json` - 用于TypeScript类型检查
- 缺少配置 = "Cannot find module" 错误

---

# Part 1: 项目设置

## 快速开始

```bash
# 1. 安装核心依赖
npm install vue@2.6.12 vue-router@3.5.4 vuex@3.6.2
npm install @vue/composition-api@1.7.2

# 2. 安装 UI 框架
npm install ant-design-vue@1.7.8 moment@2.29.4

# 3. 安装工具库
npm install dayjs@1.11.13 lodash@4.17.21

# 4. 安装开发依赖
npm install -D vite@5.4.11 @vitejs/plugin-vue2@2.3.1
npm install -D vue-template-compiler@2.6.12
npm install -D less@4.2.0 less-loader@11.1.0
npm install -D typescript@5.6.3

# 5. 创建文件夹结构
mkdir -p src/{views,components,router,store,services,styles}
```

## 配置文件

### 1. `vite.config.js` (关键 - 运行时必需)
```javascript
import { defineConfig } from 'vite'
import { createVuePlugin } from 'vite-plugin-vue2'
import path from 'path'

export default defineConfig({
  plugins: [createVuePlugin()],

  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '~': path.resolve(__dirname, 'src')
    }
  },

  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
        modifyVars: {
          // 四季配色系统
          'primary-color': '#2C5F8D',      // 冬·深蓝
          'success-color': '#5A8A65',      // 森林绿
          'error-color': '#B94D3D',        // 砖瓦红
          'warning-color': '#C67A28',      // 秋·深橙
          'info-color': '#4A8FBF',         // 夏·湖蓝
          'border-radius-base': '8px',
          'font-size-base': '14px'
        }
      }
    }
  },

  server: {
    port: 3000  // 固定端口
  }
})
```

### 2. `tsconfig.json`
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "lib": ["ES2020", "DOM"],
    "jsx": "preserve",
    "strict": true,
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"],
      "~/*": ["src/*"]
    },
    "types": ["vite/client", "node"]
  },
  "include": ["src/**/*.ts", "src/**/*.d.ts", "src/**/*.tsx", "src/**/*.vue"]
}
```

### 3. `src/styles/theme.less`
```less
@import '~ant-design-vue/dist/antd.less';

// 四季自然配色系统
@primary-color: #2C5F8D;        // 冬·深蓝
@success-color: #5A8A65;        // 森林绿
@error-color: #B94D3D;          // 砖瓦红
@warning-color: #C67A28;        // 秋·深橙
@info-color: #4A8FBF;           // 夏·湖蓝

// 中性色
@text-color: #2A2A2A;
@text-color-secondary: #6B6B6B;
@border-color-base: #E5E5E5;
@background-color-base: #F8F6F3;

// 圆角
@border-radius-base: 8px;

// 阴影
@box-shadow-base: 0 2px 8px rgba(0, 0, 0, 0.08);

// 字体
@font-family: 'PingFang SC', 'Microsoft YaHei', sans-serif;
@font-size-base: 14px;
```

### 4. `src/main.js`
```javascript
import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import VueCompositionAPI from '@vue/composition-api'
import Antd from 'ant-design-vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './styles/theme.less'

Vue.use(VueRouter)
Vue.use(Vuex)
Vue.use(VueCompositionAPI)
Vue.use(Antd)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
```

### 5. `index.html`
```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>小而美2.0 - 民宿管理系统</title>
</head>
<body>
  <div id="app"></div>
  <script type="module" src="/src/main.js"></script>
</body>
</html>
```

### 6. 目录结构
```
src/
├── views/           ← ✅ 你修改: 你的视图文件 (按模块组织)
├── components/      ← ✅ 你修改: 全局共享组件
├── router/          ← ✅ 你修改: 路由配置
├── store/           ← ✅ 你修改: Vuex状态管理
├── services/        ← ⚠️  共享服务 (慎重添加)
├── styles/          ← ⚠️  必要时修改: 全局样式
└── utils/           ← ❌ 保留: 不要修改 (全局工具)
```

---

# Part 2: 架构规范

## 核心原则

1. **模块独立性**: 每个模块拥有所有代码 (components, types, services, mocks)
2. **主要工作区域**: 仅在 `src/views/` 中工作
3. **类型检查，不要运行**: 使用 `npm run typecheck` (无需运行应用)
4. **服务端数据加载**: 使用路由守卫或组件生命周期
5. **组件大小**: < 300行 (软限制), < 500行 (硬限制)

## 路由规范

**嵌套文件夹结构 (推荐):**
```
src/views/
├── Architecture/
│   ├── ProductArchitecture/
│   │   └── OverviewPage.vue          → /architecture/product/overview
│   └── DesignSystem/
│       ├── ColorSystemPage.vue       → /architecture/design/color-system
│       └── ColorSystem2Page.vue      → /architecture/design/color-system-2
├── PlatformAdmin/
│   ├── OrderManagement/
│   │   └── OrderListPage.vue         → /order/list
│   └── CouponManagement/
│       └── CouponListPage.vue        → /platform-admin/coupon-management/list
└── MerchantBackend/
    └── StoreInfo/
        └── BasicInfoPage.vue         → /merchant-backend/store-info/basic
```

**路由配置 `src/router/index.js`:**
```javascript
import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/architecture/product/overview'
  },
  {
    path: '/architecture/product/overview',
    component: () => import('@/views/Architecture/ProductArchitecture/OverviewPage.vue')
  },
  {
    path: '/platform-admin/coupon-management/list',
    component: () => import('@/views/PlatformAdmin/CouponManagement/CouponListPage.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
```

**约定:**
- 文件夹按模块组织路由
- 使用懒加载 `() => import(...)`
- **必须** 在 `router/index.js` 中定义所有路由
- **页面组件** 命名为 `*Page.vue`

## 模块结构

```
src/views/YourModule/
├── types/
│   └── yourModule.types.ts      # TypeScript 定义
├── services/
│   ├── mocks/                   # Mock 数据 (前端始终使用)
│   │   ├── yourModule.mock.ts
│   │   └── index.ts
│   └── yourModule.service.ts    # 服务层 (仅使用 mocks)
├── components/                  # 模块组件
│   ├── YourModuleFilters.vue
│   └── YourModuleTable.vue
└── YourModulePage.vue           # 主页面组件
```

## 导入规范

**两个独立系统解析 `@/` 别名:**
1. **TypeScript** (`tsconfig.json`) - 仅类型检查
2. **Vite** (`vite.config.js`) - 运行时模块解析

**规则:**
- **模块内部**: 使用相对路径 (`./services/yourModule.service`)
- **跨模块**: 使用绝对路径 (`@/views/YourModule/YourModulePage.vue`)
- **永远不要包含文件扩展名** (`.vue`, `.ts`, `.js`)

---

# Part 3: 开发模块

## 开发顺序

1. **Types** → 定义数据结构
2. **Mocks** → 创建 mock 数据 (前端始终使用)
3. **Service** → 使用 mocks 创建服务
4. **Components** → UI 实现
5. **Route** → 路由配置
6. **Type Check** → `npm run typecheck`

**🚨 重要:**
- 前端工程师始终仅使用 mocks
- 仅在 `src/views/` 中工作

## 分步指南

### 1. 创建模块结构

```bash
mkdir -p src/views/YourModule/{types,components,services/mocks}
```

### 2. 定义类型

**`src/views/YourModule/types/yourModule.types.ts`:**
```typescript
export interface YourModuleItem {
  id: string
  name: string
  status: 'active' | 'inactive'
  created_at: string
}

export interface YourModuleFilterParams {
  search?: string
  status?: string
}
```

### 3. 创建 Mock 数据

**`src/views/YourModule/services/mocks/yourModule.mock.ts`:**
```typescript
import type { YourModuleItem } from '../../types/yourModule.types'

export const mockYourModuleData: YourModuleItem[] = [
  { id: '1', name: 'Acme Corp', status: 'active', created_at: '01/15/25 10:30:00' },
  { id: '2', name: 'TechStart Inc', status: 'active', created_at: '01/16/25 14:20:00' },
]
```

**`src/views/YourModule/services/mocks/index.ts`:**
```typescript
export { mockYourModuleData } from './yourModule.mock'
```

### 4. 创建服务

**`src/views/YourModule/services/yourModule.service.ts`:**
```typescript
import type { YourModuleItem, YourModuleFilterParams } from '../types/yourModule.types'
import { mockYourModuleData } from './mocks'

class YourModuleService {
  private mockData = [...mockYourModuleData]

  async getList(params?: YourModuleFilterParams): Promise<YourModuleItem[]> {
    await new Promise(resolve => setTimeout(resolve, 500)) // 模拟 API 延迟
    let filtered = [...this.mockData]

    if (params?.search) {
      filtered = filtered.filter(item =>
        item.name.toLowerCase().includes(params.search!.toLowerCase())
      )
    }
    if (params?.status) {
      filtered = filtered.filter(item => item.status === params.status)
    }

    return filtered
  }

  async getById(id: string): Promise<YourModuleItem | null> {
    await new Promise(resolve => setTimeout(resolve, 300))
    return this.mockData.find(item => item.id === id) || null
  }

  async create(data: Partial<YourModuleItem>): Promise<YourModuleItem> {
    await new Promise(resolve => setTimeout(resolve, 300))
    const newItem: YourModuleItem = {
      id: String(this.mockData.length + 1),
      ...data as YourModuleItem,
      created_at: new Date().toISOString(),
    }
    this.mockData.push(newItem)
    return newItem
  }
}

export default new YourModuleService()
```

### 5. 创建页面组件

**`src/views/YourModule/YourModulePage.vue`:**
```vue
<template>
  <div class="page-container">
    <a-card title="Your Module">
      <!-- 筛选器 -->
      <div class="filter-section">
        <a-input
          v-model="searchValue"
          placeholder="搜索..."
          style="width: 200px"
          @pressEnter="handleSearch"
        />
        <a-button type="primary" @click="handleSearch" :loading="loading">
          搜索
        </a-button>
      </div>

      <!-- 表格 -->
      <a-table
        :columns="columns"
        :data-source="items"
        :loading="loading"
        row-key="id"
        :pagination="pagination"
        @change="handleTableChange"
      >
        <!-- 状态列 -->
        <template #status="text">
          <a-tag :color="text === 'active' ? 'green' : 'red'">
            {{ text === 'active' ? '启用' : '禁用' }}
          </a-tag>
        </template>

        <!-- 操作列 -->
        <template #action="text, record">
          <a-space>
            <a @click="handleEdit(record)">编辑</a>
            <a-popconfirm
              title="确定删除吗？"
              @confirm="handleDelete(record)"
            >
              <a class="text-red-600">删除</a>
            </a-popconfirm>
          </a-space>
        </template>
      </a-table>
    </a-card>
  </div>
</template>

<script>
import { defineComponent, ref, reactive, onMounted } from '@vue/composition-api'
import YourModuleService from './services/yourModule.service'

export default defineComponent({
  name: 'YourModulePage',
  setup() {
    const loading = ref(false)
    const items = ref([])
    const searchValue = ref('')
    const pagination = reactive({
      current: 1,
      pageSize: 10,
      total: 0
    })

    const columns = [
      { title: 'ID', dataIndex: 'id', key: 'id', width: 100 },
      { title: '名称', dataIndex: 'name', key: 'name' },
      {
        title: '状态',
        dataIndex: 'status',
        key: 'status',
        scopedSlots: { customRender: 'status' }
      },
      { title: '创建时间', dataIndex: 'created_at', key: 'created_at', width: 180 },
      {
        title: '操作',
        key: 'action',
        width: 150,
        scopedSlots: { customRender: 'action' }
      }
    ]

    const loadData = async () => {
      loading.value = true
      try {
        const result = await YourModuleService.getList({
          search: searchValue.value
        })
        items.value = result
        pagination.total = result.length
      } catch (error) {
        console.error('加载失败:', error)
      } finally {
        loading.value = false
      }
    }

    const handleSearch = () => {
      pagination.current = 1
      loadData()
    }

    const handleTableChange = (pag) => {
      pagination.current = pag.current
      pagination.pageSize = pag.pageSize
      loadData()
    }

    const handleEdit = (record) => {
      console.log('编辑:', record)
    }

    const handleDelete = async (record) => {
      console.log('删除:', record)
      await loadData()
    }

    onMounted(loadData)

    return {
      loading,
      items,
      searchValue,
      pagination,
      columns,
      handleSearch,
      handleTableChange,
      handleEdit,
      handleDelete
    }
  }
})
</script>

<style scoped lang="less">
.page-container {
  padding: 24px;
  background: #f0f2f5;
  min-height: 100vh;
}

.filter-section {
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
}
</style>
```

### 6. 配置路由

**在 `src/router/index.js` 中添加:**
```javascript
{
  path: '/your-module',
  component: () => import('@/views/YourModule/YourModulePage.vue')
}
```

### 7. 类型检查

```bash
npm run typecheck
```

---

# 快速参考

## 关键原则

**✅ 总是:**
- Types → Mocks → Service → Components → Routes
- 前端工程师仅使用 mock 数据
- Mock 数据在 `services/mocks/` 中，使用真实业务场景
- 使用 Composition API (`setup()` 函数)
- 组件 < 300行 (软限制), < 500行 (硬限制)
- 使用 `npm run typecheck` 验证

**❌ 永远不要:**
- 修改 `src/utils/`, `src/styles/globals.css`
- 将模块代码放在 `src/views/{YourModule}/` 外
- 使用 `useEffect` 获取数据 (使用 `onMounted`)
- 创建 > 500行的组件
- 忘记 Vite 配置 (导致 "Cannot find module" 错误)
- 在导入中添加文件扩展名

## Vue 模式

**组件结构:**
```vue
<template>
  <!-- HTML -->
</template>

<script>
import { defineComponent, ref, reactive, computed, onMounted } from '@vue/composition-api'

export default defineComponent({
  name: 'ComponentName',
  props: {
    // props 定义
  },
  setup(props, { emit }) {
    // 响应式状态
    const data = ref([])
    const form = reactive({ name: '' })

    // 计算属性
    const filteredData = computed(() => {
      return data.value.filter(...)
    })

    // 方法
    const handleClick = () => {
      emit('click', data)
    }

    // 生命周期
    onMounted(async () => {
      data.value = await fetchData()
    })

    return {
      data,
      form,
      filteredData,
      handleClick
    }
  }
})
</script>

<style scoped lang="less">
/* 组件样式 */
</style>
```

**响应式数据:**
```javascript
import { ref, reactive } from '@vue/composition-api'

// 基本类型
const count = ref(0)
count.value++

// 对象
const form = reactive({ name: '', age: 0 })
form.name = 'John'

// 数组
const list = ref([])
list.value.push(item)
```

## 工作流程

1. `mkdir -p src/views/NewModule/{types,components,services/mocks}`
2. 定义 types
3. 创建 mocks (真实数据)
4. 创建 service (使用 mocks)
5. 在 `router/index.js` 中添加路由
6. 构建组件
7. `npm run typecheck`

## 文件夹权限规则

**✅ 修改:**
- `src/views/{YourModule}/` - 所有你的模块代码
- `src/router/` - 你的路由配置
- `src/store/` - 你的状态管理

**⚠️ 必要时修改:**
- `src/styles/` - 仅全局样式

**❌ 永远不要修改:**
- `src/utils/`

## 故障排除

### "Cannot find module '@/views/...'"
- `npm run typecheck` 通过 ✅ 但 `npm run dev` 失败 ❌
- **修复**: 添加到 `vite.config.js`:
```javascript
resolve: {
  alias: { '@': path.resolve(__dirname, 'src') }
}
```

### 导入错误
- **修复**: 从导入中移除 `.vue`/`.ts` 扩展名

### 调试清单
1. ✅ `tsconfig.json` 有 `"paths": { "@/*": ["src/*"] }`
2. ✅ `vite.config.js` 有 `resolve.alias`
3. ✅ 导入中没有文件扩展名
4. ✅ 路由定义匹配实际文件

---

## 开发标准

### 交流
- **语言**: 中文 (中文解释，技术术语保留英文)
- **时区**: 太平洋时间 (PST/PDT)
- **日期格式**: `MM/DD/YY HH:mm:ss`

### Mock 数据
- 反映真实业务场景
- 使用有意义的名称 (例如 "Acme Corp"，而不是 "Test 1")
- 使用真实的近期日期
- 包含边缘情况 (空状态，长文本)
- 独立存储在 `services/mocks/` 中

### 开发环境
- **前端端口**: 3000 (固定，不可协商)
- **后端端口**: 5000 (如果适用)
- 停止冲突进程，永远不要使用随机端口

**本项目:**
```json
// package.json
"scripts": {
  "dev": "vite --port 3000"
}
```

**结束端口冲突:**
```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# macOS/Linux
lsof -ti:3000 | xargs kill -9
```

---

## 资源

- **Ant Design Vue 1.x**: https://1x.antdv.com/
- **Vue 2**: https://v2.vuejs.org/
- **Vue Router 3**: https://v3.router.vuejs.org/
- **Vuex 3**: https://v3.vuex.vuejs.org/
- **Composition API**: https://github.com/vuejs/composition-api

---

# Part 4: 设计系统 (设计规范)

## 全局配色系统

**⚠️ CRITICAL: 所有开发必须遵循全局配色规范**

本项目使用统一的配色系统，详细规范请参考：**`homestay-color-system.md`**

### 快速参考

#### 主色系统
```less
/* 主色 - 来自四季自然色 */
@primary-color: #2C5F8D;      /* 冬·深蓝 - 主按钮、品牌色 */
@success-color: #5A8A65;      /* 森林绿 - 成功 */
@error-color: #B94D3D;        /* 砖瓦红 - 错误/警示 */
@warning-color: #C67A28;      /* 秋·深橙 - 价格、强调 */
@info-color: #4A8FBF;         /* 夏·湖蓝 - 链接、交互 */

/* 中性色系统 */
@text-color: #2A2A2A;         /* 主文字 (15.8:1) */
@text-color-secondary: #6B6B6B;  /* 次文字 (5.7:1) */
@border-color-base: #E5E5E5;
@background-color-base: #F8F6F3;
```

### 使用规则

**✅ 必须做到：**
1. **使用 Less 变量**：所有颜色必须使用 `@primary-color` 引用
2. **遵循对比度**：文字对比度必须 ≥ 4.5:1 (AA级)
3. **色盲友好**：状态区分不能只靠颜色，需配合图标和文字
4. **统一组件**：使用 Ant Design 组件，不自定义样式

**❌ 禁止行为：**
1. ❌ 硬编码颜色值（如 `color: #FF0000`）
2. ❌ 使用纯黑 `#000000`（用 `#2A2A2A` 代替）
3. ❌ 使用纯色红/绿/蓝（使用自然系配色）
4. ❌ 低对比度组合（浅色文字+浅色背景）

### 常用场景

#### 按钮
```vue
<!-- 主按钮 -->
<a-button type="primary">立即预订</a-button>

<!-- 副按钮 -->
<a-button>查看详情</a-button>

<!-- 警示按钮 -->
<a-button type="danger">取消订单</a-button>
```

#### 状态标签
```vue
<!-- 成功状态 -->
<a-tag color="green">已入住</a-tag>

<!-- 等待状态 -->
<a-tag color="blue">待入住</a-tag>

<!-- 错误状态 -->
<a-tag color="red">已满房</a-tag>
```

---

## 后台页面UI规范

**⚠️ 适用范围**: `src/views/PlatformAdmin/` 和 `src/views/MerchantBackend/`

### 配色方案

后台页面使用现代科技感配色:

```less
/* 品牌色 */
@primary-color: #3b82f6;        /* 品牌蓝 - 主按钮 */

/* 功能色 */
@success-color: #10b981;        /* 成功/完成 */
@warning-color: #f97316;        /* 警告/待处理 */
@error-color: #ef4444;          /* 错误/危险 */
@info-color: #8b5cf6;           /* 信息/链接 */
```

### 组件规范

#### 卡片 (a-card)
```vue
<a-card title="标题" :bordered="true">
  <template #extra>
    <a-button type="primary">操作</a-button>
  </template>
  <!-- 内容 -->
</a-card>
```

#### 表格 (a-table)
```vue
<a-table
  :columns="columns"
  :data-source="data"
  :pagination="pagination"
  :loading="loading"
  row-key="id"
>
  <!-- 自定义列 -->
  <template #status="text">
    <a-tag :color="text === 'active' ? 'green' : 'red'">
      {{ text }}
    </a-tag>
  </template>
</a-table>
```

#### 表单 (a-form)
```vue
<a-form-model
  ref="form"
  :model="formData"
  :rules="rules"
  :label-col="{ span: 6 }"
  :wrapper-col="{ span: 16 }"
>
  <a-form-model-item label="名称" prop="name">
    <a-input v-model="formData.name" />
  </a-form-model-item>

  <a-form-model-item :wrapper-col="{ span: 16, offset: 6 }">
    <a-button type="primary" @click="handleSubmit">
      提交
    </a-button>
  </a-form-model-item>
</a-form-model>
```

---

## 开发检查清单

### 后台页面检查
- [ ] 使用品牌蓝 #3b82f6 作为主色
- [ ] 卡片使用 `a-card` 组件
- [ ] 按钮统一高度
- [ ] 输入框聚焦效果
- [ ] 表格 hover 效果
- [ ] 状态标签使用合适的功能色

### 通用检查
- [ ] 所有颜色从配色系统选取
- [ ] 对比度符合WCAG标准
- [ ] 添加 hover/focus 交互效果
- [ ] 使用 transition 过渡动画
- [ ] 响应式布局适配
- [ ] 类型检查通过

---
