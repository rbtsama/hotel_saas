# Remix + TypeScript ERP Project - Setup Guide

## Table of Contents

### Part 1: Project Setup
- [Overview](#overview)
- [Quick Setup](#quick-setup)
- [Configuration](#configuration)

### Part 2: Architecture
- [Core Principles](#core-principles)
- [Remix Routing](#remix-routing)
- [Module Structure](#module-structure)
- [Import Patterns](#import-patterns)

### Part 3: Building a Module
- [Development Order](#development-order)
- [Step-by-Step Guide](#step-by-step-guide)

### Quick Reference
- [Key Principles](#key-principles)
- [Remix Patterns](#remix-patterns)
- [Workflow](#workflow)
- [Folder Permission Rules](#folder-permission-rules)
- [Troubleshooting](#troubleshooting)
- [Standards](#standards)

---

## Overview

Build a complete Remix + TypeScript ERP application with modular architecture.

**Core Stack:**
- **Remix** (^2.15.0) + **Vite** - Full-stack React framework
- **TypeScript** (~5.6.0) - Type-safe development
- **shadcn/ui** + **Tailwind CSS** (^3.4.17) - UI components and styling
- **Utilities**: Day.js, Lodash, Lucide React (icons)

**⚠️ IMPORTANT: Remix v2 + Vite Integration**

Remix v2.15.0 uses **Vite as its bundler**. You MUST configure both:
- `tsconfig.json` - For TypeScript type checking
- `vite.config.ts` - For runtime module resolution (path aliases + routes)
- Missing Vite config = "Cannot find module" errors

---

# Part 1: Project Setup

## Quick Setup

```bash
# 1. Create project
npx create-remix@latest your-project-name
cd your-project-name

# 2. Install dependencies
npm install clsx tailwind-merge lucide-react dayjs lodash class-variance-authority
npm install -D tailwindcss postcss autoprefixer @types/node @types/lodash tailwindcss-animate

# 3. Initialize UI
npx tailwindcss init -p
npx shadcn@latest init  # Select: Default, Slate, CSS variables

# 4. Install common UI components
npx shadcn@latest add button card table input label select

# 5. Create folder structure
cd app && mkdir -p pages utils styles components layouts && cd ..
```

## Configuration

### 1. `vite.config.ts` (CRITICAL - Required for runtime)
```typescript
import { vitePlugin as remix } from "@remix-run/dev";
import { defineConfig } from "vite";
import path from "path";

export default defineConfig({
  plugins: [
    remix({
      future: {
        v3_fetcherPersist: true,
        v3_relativeSplatPath: true,
        v3_throwAbortReason: true,
      },
      routes(defineRoutes) {
        return defineRoutes((route) => {
          route("/", "routes/_index.tsx", { index: true });
          route("/phone-management", "routes/phone-management/_index.tsx", { index: true });
          route("/phone-management/:phone", "routes/phone-management/$phone.tsx");
          // Add your module routes here
        });
      },
    }),
  ],
  resolve: {
    alias: {
      "~": path.resolve(__dirname, "./app"),
    },
  },
});
```

### 2. `tailwind.config.ts`
```typescript
import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        // ... add other colors as needed
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
```

### 3. `app/styles/globals.css`
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;
    --primary: 222.2 47.4% 11.2%;
    --primary-foreground: 210 40% 98%;
    --radius: 0.5rem;
    /* Add other CSS variables as needed */
  }
  .dark {
    --background: 222.2 84% 4.9%;
    --foreground: 210 40% 98%;
    /* Add dark theme variables */
  }
}

@layer base {
  * { @apply border-border; }
  body { @apply bg-background text-foreground; }
}
```

### 4. `app/root.tsx`
```typescript
import { Links, Meta, Outlet, Scripts, ScrollRestoration } from "@remix-run/react";
import "./styles/globals.css";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="min-h-screen bg-background text-foreground">
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}
```

### 5. `app/lib/utils.ts`
```typescript
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

### 6. Directory Structure
```
app/
├── routes/          ← ✅ YOU MODIFY: Your route files (nested by module)
├── pages/           ← ✅ YOU MODIFY: Your modules (all module code)
├── components/ui/   ← ⚠️  shadcn/ui ONLY: npx shadcn@latest add <name>
├── lib/utils.ts     ← ⚠️  UI utilities only (cn helper)
├── styles/          ← ⚠️  MODIFY IF NECESSARY: Global styles
├── layouts/         ← ❌ RESERVED: Do not modify
├── utils/           ← ❌ RESERVED: Do not modify (global utilities)
└── root.tsx         ← ❌ RESERVED: Do not modify
```

---

# Part 2: Architecture

## Core Principles

1. **Module Independence**: Each module owns ALL its code (components, hooks, utils, stores)
2. **Primary Work Areas**: `app/pages/` and `app/routes/` only
3. **Type Check, Don't Run**: Use `npm run typecheck` (no need to run the app)
4. **Server-Side Loading**: Use Remix loaders for data fetching
5. **Progressive Enhancement**: Forms work without JavaScript
6. **Component Size**: < 300 lines (soft), < 500 lines (hard)

## Remix Routing

**Nested Folder Structure (Recommended):**
```
app/routes/
├── _index.tsx                  → /
├── phone-management/
│   ├── _index.tsx              → /phone-management
│   └── $phone.tsx              → /phone-management/:phone
└── your-module/
    ├── _index.tsx              → /your-module
    ├── $id.tsx                 → /your-module/:id
    └── create.tsx              → /your-module/create
```

**Conventions:**
- Folders organize routes by module
- `$` = Dynamic parameter (e.g., `$id.tsx` → `:id` in URL)
- `_index` = Index route
- **MUST** define routes in `vite.config.ts` routes() function

**Why nested folders?** Better organization, easier maintenance, scalability, team collaboration.

## Module Structure

```
app/pages/YourModule/
├── types/
│   └── yourModule.types.ts      # TypeScript definitions
├── services/
│   ├── mocks/                   # Mock data (always used by frontend)
│   │   ├── yourModule.mock.ts
│   │   └── index.ts
│   └── yourModule.service.ts    # Service layer (uses mocks only)
├── components/                  # Module components
│   ├── YourModuleFilters.tsx
│   └── YourModuleTable.tsx
├── hooks/                       # Optional: module hooks
├── stores/                      # Optional: module state
├── utils/                       # Optional: module utilities
└── YourModulePage.tsx           # Main page component
```

## Import Patterns

**Two separate systems resolve `~/` alias:**
1. **TypeScript** (`tsconfig.json`) - Type checking only
2. **Vite** (`vite.config.ts`) - Runtime module resolution

**Rules:**
- **Within module**: Use relative paths (`./services/yourModule.service`)
- **In routes**: Use absolute paths (`~/pages/YourModule/YourModulePage`)
- **Never include file extensions** (`.tsx`, `.ts`)

---

# Part 3: Building a Module

## Development Order

1. **Types** → Define data structures
2. **Mocks** → Create mock data (always used by frontend)
3. **Service** → Create service using mocks
4. **Route** → Loader/action functions
5. **Components** → UI implementation
6. **Type Check** → `npm run typecheck`

**🚨 IMPORTANT:**
- Frontend engineers always use mocks only
- Work in `app/pages/` and `app/routes/` only

## Step-by-Step Guide

### 1. Create Module Structure

```bash
mkdir -p app/pages/YourModule/{types,components,hooks,stores,services/mocks}
```

### 2. Define Types

**`app/pages/YourModule/types/yourModule.types.ts`:**
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

### 3. Create Mock Data

**`app/pages/YourModule/services/mocks/yourModule.mock.ts`:**
```typescript
import type { YourModuleItem } from '../../types/yourModule.types'

export const mockYourModuleData: YourModuleItem[] = [
  { id: '1', name: 'Acme Corp', status: 'active', created_at: '01/15/25 10:30:00' },
  { id: '2', name: 'TechStart Inc', status: 'active', created_at: '01/16/25 14:20:00' },
]
```

**`app/pages/YourModule/services/mocks/index.ts`:**
```typescript
export { mockYourModuleData } from './yourModule.mock'
```

### 4. Create Service

**`app/pages/YourModule/services/yourModule.service.ts`:**
```typescript
import type { YourModuleItem, YourModuleFilterParams } from '../types/yourModule.types'
import { mockYourModuleData } from './mocks'

class YourModuleService {
  private mockData = [...mockYourModuleData]

  async getList(params?: YourModuleFilterParams): Promise<YourModuleItem[]> {
    await new Promise(resolve => setTimeout(resolve, 500)) // Simulate API delay
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

### 5. Create Route

**First, create folder and add to `vite.config.ts`:**
```bash
mkdir app/routes/your-module
```

**In `vite.config.ts`:**
```typescript
route("/your-module", "routes/your-module/_index.tsx", { index: true });
```

**`app/routes/your-module/_index.tsx`:**
```typescript
import { json, type LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import YourModulePage from "~/pages/YourModule/YourModulePage";
import YourModuleService from "~/pages/YourModule/services/yourModule.service";

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const search = url.searchParams.get("search") || undefined;

  try {
    const items = await YourModuleService.getList({ search });
    return json({ items, error: null });
  } catch (error) {
    return json({ items: [], error: "Failed to load items" }, { status: 500 });
  }
}

export default function YourModuleRoute() {
  const { items, error } = useLoaderData<typeof loader>();
  return <YourModulePage items={items} error={error} />;
}
```

### 6. Create Page Component

**`app/pages/YourModule/YourModulePage.tsx`:**
```typescript
import { useState } from 'react'
import { Form, useNavigation } from '@remix-run/react'
import type { YourModuleItem } from './types/yourModule.types'
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card'
import { Input } from '~/components/ui/input'
import { Button } from '~/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '~/components/ui/table'

interface YourModulePageProps {
  items: YourModuleItem[]
  error: string | null
}

export default function YourModulePage({ items, error }: YourModulePageProps) {
  const [searchValue, setSearchValue] = useState('')
  const navigation = useNavigation()
  const isLoading = navigation.state === 'loading'

  if (error) return <div className="text-destructive">Error: {error}</div>

  return (
    <div className="p-6">
      <Card>
        <CardHeader>
          <CardTitle>Your Module</CardTitle>
        </CardHeader>
        <CardContent>
          <Form method="get" className="mb-4 flex gap-2">
            <Input
              name="search"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="Search..."
            />
            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Searching...' : 'Search'}
            </Button>
          </Form>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {items.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
```

### 7. Create Form Route (Optional)

**In `vite.config.ts`:**
```typescript
route("/your-module/create", "routes/your-module/create.tsx");
```

**`app/routes/your-module/create.tsx`:**
```typescript
import { json, redirect, type ActionFunctionArgs } from "@remix-run/node";
import { Form, useActionData, useNavigation } from "@remix-run/react";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Button } from "~/components/ui/button";
import YourModuleService from "~/pages/YourModule/services/yourModule.service";

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const name = formData.get("name");

  const errors: Record<string, string> = {};
  if (!name || typeof name !== "string" || name.trim().length === 0) {
    errors.name = "Name is required";
  }
  if (Object.keys(errors).length > 0) {
    return json({ errors }, { status: 400 });
  }

  try {
    await YourModuleService.create({ name, status: 'active' });
    return redirect("/your-module");
  } catch (error) {
    return json({ errors: { general: "Failed to create" } }, { status: 500 });
  }
}

export default function CreateYourModuleRoute() {
  const actionData = useActionData<typeof action>();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  return (
    <div className="p-6">
      <Card>
        <CardHeader>
          <CardTitle>Create New Item</CardTitle>
        </CardHeader>
        <CardContent>
          <Form method="post" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                name="name"
                required
                className={actionData?.errors?.name ? "border-destructive" : ""}
              />
              {actionData?.errors?.name && (
                <p className="text-sm text-destructive">{actionData.errors.name}</p>
              )}
            </div>

            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Creating..." : "Create"}
            </Button>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
```

### 8. Type Check

```bash
npm run typecheck
```

---

# Quick Reference

## Key Principles

**✅ Always:**
- Types → Mocks → Service → Routes → Components
- Frontend engineers use mock data only
- Mock data in `services/mocks/` with realistic business scenarios
- Use Remix loaders/actions, Form component
- Components < 300 lines (soft), < 500 lines (hard)
- Install shadcn/ui: `npx shadcn@latest add <component-name>`
- Validate with `npm run typecheck`

**❌ Never:**
- Modify `app/components/`, `app/layouts/`, `app/utils/`, `app/root.tsx`
- Put module code outside `app/pages/{YourModule}/`
- Fetch data with `useEffect`
- Create components > 500 lines
- Forget Vite config (causes "Cannot find module" errors)
- Forget route definitions in `vite.config.ts`
- Add file extensions to imports

## Remix Patterns

**Loader:**
```typescript
export async function loader({ request, params }: LoaderFunctionArgs) {
  const data = await YourService.getData();
  return json({ data });
}
```

**Action:**
```typescript
export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  await YourService.create(formData);
  return redirect("/success");
}
```

**Component:**
```typescript
export default function YourRoute() {
  const { data } = useLoaderData<typeof loader>();
  return <YourPage data={data} />;
}
```

## Workflow

1. `mkdir -p app/pages/NewModule/{types,components,services/mocks}`
2. Define types
3. Create mocks (realistic data)
4. Create service (uses mocks)
5. `mkdir app/routes/new-module` + add to `vite.config.ts`
6. Build components
7. `npm run typecheck`

## Folder Permission Rules

**✅ Modify:**
- `app/pages/{YourModule}/` - ALL your module code
- `app/routes/{your-module}/` - Your route files
- `vite.config.ts` - Add route definitions

**⚠️ Modify if needed:**
- `app/styles/` - Global styles only

**⚠️ shadcn/ui only:**
- `app/components/ui/` - Via `npx shadcn@latest add`
- `app/lib/utils.ts` - cn() helper

**❌ Never modify:**
- `app/layouts/`, `app/utils/`, `app/root.tsx`

## Troubleshooting

### "Cannot find module '~/pages/...'"
- `npm run typecheck` passes ✅ but `npm run dev` fails ❌
- **Fix**: Add to `vite.config.ts`:
```typescript
resolve: {
  alias: { "~": path.resolve(__dirname, "./app") }
}
```

### "No routes matched location"
- **Fix**: Add route to `vite.config.ts` routes() function

### Import errors
- **Fix**: Remove `.tsx`/`.ts` extensions from imports

### Debugging Checklist
1. ✅ `tsconfig.json` has `"paths": { "~/*": ["./app/*"] }`
2. ✅ `vite.config.ts` has `resolve.alias` AND `routes()` function
3. ✅ No file extensions in imports
4. ✅ Route definitions match actual files

---

## Standards

### Communication
- **Language**: 中文 (Chinese) for explanations, keep technical terms in English
- **Time Zone**: Pacific Time (PST/PDT)
- **Date Format**: `MM/DD/YY HH:mm:ss`

### Mock Data
- Reflect real business scenarios
- Use meaningful names (e.g., "Acme Corp", not "Test 1")
- Use realistic recent dates
- Include edge cases (empty states, long text)
- Store independently in `services/mocks/`

### Development Environment
- **Frontend Port**: 3000 (fixed, non-negotiable)
- **Backend Port**: 5000 (if applicable)
- Stop conflicting processes, never use random ports

**For this project:**
```json
// package.json
"scripts": {
  "dev": "remix vite:dev --port 3000"
}
```

**Kill port conflicts:**
```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# macOS/Linux
lsof -ti:3000 | xargs kill -9
```

---

## Resources

- **shadcn/ui**: https://ui.shadcn.com
- **Remix**: https://remix.run/docs
- **Tailwind**: https://tailwindcss.com

---

# Part 4: Design System (设计规范)

## 全局配色系统

**⚠️ CRITICAL: 所有开发必须遵循全局配色规范**

本项目使用统一的配色系统，详细规范请参考：**`homestay-color-system.md`**

### 快速参考

#### 主色系统
```css
/* 主色 - 来自四季自然色 */
--color-primary: #2C5F8D;      /* 冬·深蓝 - 主按钮、品牌色 */
--color-secondary: #C67A28;    /* 秋·深橙 - 价格、强调 */
--color-accent: #4A8FBF;       /* 夏·湖蓝 - 链接、交互 */
--color-background: #F8F6F3;   /* 春·米白 - 背景色 */

/* 功能色 - 自然系配色 */
--color-success: #5A8A65;      /* 森林绿 - 成功 */
--color-error: #B94D3D;        /* 砖瓦红 - 错误/警示 */
```

#### 中性色系统
```css
/* 文字颜色 */
--text-primary: #2A2A2A;       /* 主文字 (15.8:1) */
--text-secondary: #6B6B6B;     /* 次文字 (5.7:1) */
--text-tertiary: #999999;      /* 占位符 (4.2:1) */
--text-disabled: #CCCCCC;      /* 禁用文字 */

/* 边框和背景 */
--border-normal: #E5E5E5;
--bg-white: #FFFFFF;
--bg-gray: #FAFAFA;
```

### 使用规则

**✅ 必须做到：**
1. **使用CSS变量**：所有颜色必须使用 `var(--color-xxx)` 引用
2. **遵循对比度**：文字对比度必须 ≥ 4.5:1 (AA级)
3. **色盲友好**：状态区分不能只靠颜色，需配合图标和文字
4. **统一组件**：使用shadcn/ui组件，不自定义样式

**❌ 禁止行为：**
1. ❌ 硬编码颜色值（如 `color: #FF0000`）
2. ❌ 使用纯黑 `#000000`（用 `#2A2A2A` 代替）
3. ❌ 使用纯色红/绿/蓝（使用自然系配色）
4. ❌ 低对比度组合（浅色文字+浅色背景）

### 配色比例建议

整个页面配色占比：
- 中性色（白色、灰色）：**75%**
- 主色（深蓝）：**12%**
- 强调色（深橙）：**8%**
- 辅助色（湖蓝）：**3%**
- 功能色（绿、红）：**2%**

### 常用场景

#### 按钮
```tsx
// 主按钮
<Button className="bg-primary hover:bg-primary/90">立即预订</Button>

// 副按钮
<Button variant="outline" className="border-primary text-primary">查看详情</Button>

// 警示按钮
<Button variant="destructive">取消订单</Button>
```

#### 状态标签
```tsx
// 成功状态
<Badge className="bg-success/15 text-success">已入住</Badge>

// 等待状态
<Badge className="bg-accent/12 text-accent">待入住</Badge>

// 错误状态
<Badge className="bg-error/15 text-error">已满房</Badge>
```

#### 价格显示
```tsx
<span className="text-2xl font-semibold text-secondary">¥388</span>
<span className="text-sm text-tertiary line-through ml-2">¥568</span>
```

### Tailwind配置集成

确保 `tailwind.config.ts` 包含以下配置：

```typescript
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: '#2C5F8D',
        secondary: '#C67A28',
        accent: '#4A8FBF',
        success: '#5A8A65',
        error: '#B94D3D',
        // ... 其他颜色
      }
    }
  }
}
```

### 完整规范

详细的设计理念、使用案例、对比度表、可访问性规范等，请参考：
**📄 `homestay-color-system.md`** - 完整配色系统文档

---

## 后台页面UI规范 (平台后台 & 商户端)

**⚠️ 适用范围**: `app/pages/PlatformAdmin/` 和 `app/pages/MerchantBackend/`

### 配色方案

后台页面使用现代科技感配色,基于 `setting_page_color.md`:

```css
/* 品牌色 */
--brand-primary: #3b82f6;        /* 品牌蓝 - 主按钮 */
--brand-primary-hover: #2563eb;  /* hover */
--brand-primary-light: #dbeafe;  /* 浅色背景 */

/* 功能色 */
--success: #10b981;              /* 成功/完成 */
--warning: #f97316;              /* 警告/待处理 */
--error: #ef4444;                /* 错误/危险 */
--info: #8b5cf6;                 /* 信息/链接 */

/* 文字色系 */
--text-primary: #0f172a;         /* 主文字 (slate-900) */
--text-secondary: #475569;       /* 次要文字 (slate-600) */
--text-tertiary: #94a3b8;        /* 辅助文字 (slate-400) */

/* 背景色系 */
--bg-primary: #ffffff;           /* 主背景 */
--bg-secondary: #f8fafc;         /* 次要背景 (slate-50) */
--bg-hover: #f1f5f9;             /* hover背景 (slate-100) */

/* 边框色系 */
--border-primary: #e2e8f0;       /* 主边框 (slate-200) */
--border-focus: #3b82f6;         /* 聚焦边框 */
```

### 组件规范

#### 卡片 (Card)
```tsx
<Card className="rounded-xl border-slate-200 bg-white shadow-sm hover:shadow-md transition-shadow">
  <CardHeader>
    <CardTitle className="text-lg font-semibold text-slate-900">标题</CardTitle>
  </CardHeader>
  <CardContent>
    {/* 内容 */}
  </CardContent>
</Card>
```

**特点**:
- 圆角: `rounded-xl` (12px)
- 边框: `border-slate-200`
- 阴影: `shadow-sm` → `hover:shadow-md`
- 背景: `bg-white`

#### 按钮 (Button)
```tsx
// 主按钮
<Button className="h-9 bg-blue-600 hover:bg-blue-700 text-white font-medium shadow-sm">
  确认
</Button>

// 次要按钮
<Button variant="outline" className="h-9 border-slate-300 hover:border-slate-400">
  取消
</Button>

// 危险按钮
<Button variant="destructive" className="h-9 bg-red-600 hover:bg-red-700">
  删除
</Button>
```

**特点**:
- 统一高度: `h-9` (36px)
- 圆角: `rounded-md` (6px)
- 字重: `font-medium`
- 过渡: `transition-all`

#### 输入框 (Input)
```tsx
<Input className="h-9 border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20" />
```

**特点**:
- 高度: `h-9` (36px)
- 边框: `border-slate-300`
- 聚焦: `focus:border-blue-500` + `focus:ring-2`
- 圆角: `rounded-md`

#### 表格 (Table)
```tsx
<Table>
  <TableHeader>
    <TableRow className="border-slate-200">
      <TableHead className="text-slate-600 font-semibold">列名</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow className="hover:bg-slate-50 transition-colors">
      <TableCell className="text-slate-900">内容</TableCell>
    </TableRow>
  </TableBody>
</Table>
```

**特点**:
- 边框: `border-slate-200`
- 标题: `text-slate-600 font-semibold`
- hover: `hover:bg-slate-50`
- 过渡: `transition-colors`

#### 标签 (Badge)
```tsx
// 状态标签
<Badge className="border-green-300 text-green-700 bg-green-50">已启用</Badge>
<Badge className="border-orange-300 text-orange-700 bg-orange-50">待处理</Badge>
<Badge className="border-red-300 text-red-700 bg-red-50">已禁用</Badge>

// 信息标签
<Badge variant="outline" className="border-slate-300 text-slate-700">
  标签
</Badge>
```

**特点**:
- 圆角: `rounded` (4px)
- 边框: 根据状态选择颜色
- 背景: 浅色背景 (状态色/10)
- 字号: `text-xs`

#### 开关 (Switch)
```tsx
<Switch checked={isEnabled} onCheckedChange={setIsEnabled} />
```

**特点**:
- 开启状态: 绿色背景 `bg-green-600`
- 禁用状态: 灰色背景 `bg-slate-300`
- 高度: `h-6` (24px)
- 宽度: `w-11` (44px)
- 过渡: `transition-colors`
- 滑块: 白色圆形,带阴影

**使用场景**:
```tsx
// 启用/禁用功能
<div className="flex items-center gap-2">
  <Switch checked={status === 'active'} />
  <span className="text-sm text-slate-600">
    {status === 'active' ? '启用' : '禁用'}
  </span>
</div>
```

### 交互动画

#### 按钮交互
```tsx
className="hover:scale-105 active:scale-95 transition-transform"
```

#### 卡片交互
```tsx
className="hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200"
```

#### 表格行交互
```tsx
className="hover:bg-slate-50 transition-colors cursor-pointer"
```

### 布局规范

#### 页面容器
```tsx
<div className="p-6 space-y-6">
  {/* 筛选器 */}
  <Card>...</Card>

  {/* 数据表格 */}
  <Card>...</Card>
</div>
```

#### 筛选器布局
```tsx
<div className="flex flex-wrap gap-2 lg:flex-nowrap">
  <Input placeholder="搜索..." />
  <Select>...</Select>
  <Button>搜索</Button>
</div>
```

**特点**:
- 小屏: `flex-wrap` 自动换行
- 大屏: `lg:flex-nowrap` 单行排列
- 间距: `gap-2`

---

## C端小程序UI规范

**⚠️ 适用范围**: `app/pages/CClient/`

### 配色方案 (配色系统2)

C端使用自然大地配色,基于 `ColorSystem2Page.tsx`:

```css
/* 主色系统 - 四季自然色 */
--spring-sand: #F8F6F3;          /* 春·沙滩 - 背景色 */
--summer-forest: #458559;        /* 夏·森林 - 品牌色/主按钮 */
--autumn-field: #A67B5B;         /* 秋·田野 - 价格/促销 */
--winter-glacier: #4A85B8;       /* 冬·冰川 - 链接/交互 */

/* 功能色 */
--pine-green: #3D7350;           /* 青松 - 成功状态 */
--maple-red: #B94D3D;            /* 枫叶 - 错误/警示 */

/* 文字色系 */
--text-primary: #2A2A2A;         /* 主文字 */
--text-secondary: #6B6B6B;       /* 次要文字 */
--text-tertiary: #999999;        /* 占位符 */
```

### 组件规范

#### 按钮

**主按钮** (高32px, 圆角4px):
```tsx
<button className="px-4 py-1.5 bg-[#458559] text-white rounded font-medium text-sm">
  立即预订
</button>
```

**辅助按钮**:
```tsx
<button className="px-4 py-1.5 bg-[#4A85B8] text-white rounded font-medium text-sm">
  查看详情
</button>
```

**描边按钮**:
```tsx
<button className="px-4 py-1.5 border border-[#458559] text-[#458559] rounded font-medium text-sm">
  取消订单
</button>
```

**小按钮** (高24px, 全圆角):
```tsx
<button className="px-2.5 py-0.5 bg-[#458559] text-white rounded-full font-medium text-xs">
  筛选
</button>
```

**圆形标签按钮** (高22px):
```tsx
<button className="px-2 py-0.5 bg-[#4A85B8]/10 text-[#4A85B8] rounded-full text-xs">
  近地铁
</button>
```

#### 标签

**促销标签** (高20px, 圆角2px):
```tsx
<span className="px-1.5 py-0.5 bg-[#B94D3D] text-white rounded-sm text-xs font-bold leading-tight">
  限时特惠
</span>
```

**订单状态徽章** (高24px, 圆角2px):
```tsx
<span className="px-2 py-0.5 bg-[#3D7350]/10 text-[#3D7350] rounded-sm text-xs font-medium border border-[#3D7350]/20">
  已入住
</span>
<span className="px-2 py-0.5 bg-[#4A85B8]/10 text-[#4A85B8] rounded-sm text-xs font-medium border border-[#4A85B8]/20">
  待入住
</span>
```

**特性标签** (迷你空心, 高22px):
```tsx
<span className="px-1.5 py-0 border border-[#4A85B8] text-[#4A85B8] rounded-sm text-xs inline-flex items-center gap-0.5 leading-[20px]">
  <Wifi className="w-3 h-3" />
  免费WiFi
</span>
```

#### 输入框

**方形输入框** (高36px, 圆角4px):
```tsx
<input
  type="text"
  placeholder="请输入入住人姓名"
  className="w-full px-3 py-2 bg-white border border-gray-300 rounded text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-[#458559]"
/>
```

**搜索框** (全圆角):
```tsx
<div className="relative">
  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
  <input
    type="search"
    placeholder="搜索城市、民宿名称"
    className="w-full pl-9 pr-3 py-2 bg-white border border-gray-300 rounded-full text-sm"
  />
</div>
```

#### 卡片

**价格明细卡片**:
```tsx
<div className="bg-white border border-gray-200 rounded-xl p-4 space-y-3">
  <h5 className="text-sm font-semibold text-gray-900">价格明细</h5>
  <div className="space-y-2.5">
    <div className="flex justify-between text-sm">
      <span className="text-gray-600">¥388 × 2晚</span>
      <span className="text-gray-900">¥776</span>
    </div>
    <div className="border-t border-gray-200 pt-2.5 flex justify-between items-center">
      <span className="text-sm font-semibold text-gray-900">总计</span>
      <span className="text-xl font-bold text-[#A67B5B]">¥776</span>
    </div>
  </div>
</div>
```

#### 设施图标

**直接摆放icon + 文字**:
```tsx
<div className="grid grid-cols-4 md:grid-cols-6 gap-4">
  <div className="flex flex-col items-center gap-1.5 text-center">
    <Wifi className="w-6 h-6 text-[#4A85B8]" />
    <span className="text-xs text-gray-700">免费WiFi</span>
  </div>
  <div className="flex flex-col items-center gap-1.5 text-center">
    <Coffee className="w-6 h-6 text-[#A67B5B]" />
    <span className="text-xs text-gray-700">含早餐</span>
  </div>
</div>
```

### 手机端适配

**使用MobileFrame组件**:
```tsx
import MobileFrame from '~/pages/CClient/components/MobileFrame'

export default function YourCClientPage() {
  return (
    <MobileFrame>
      {/* 页面内容 */}
    </MobileFrame>
  )
}
```

**设计尺寸**:
- 标准宽度: 375px (iPhone标准尺寸)
- 最小触摸区域: 44x44px
- 安全区域: 考虑刘海屏和底部Home条

**响应式要点**:
- 使用 `px` 而非 `rem` (小程序场景)
- 字号: 12px-16px 为主
- 行高: 保证足够点击区域
- 图片: 懒加载,压缩优化

### 颜色使用示例

```tsx
// 主按钮 - 森林绿
<button className="bg-[#458559] text-white">立即预订</button>

// 价格 - 田野色
<span className="text-[#A67B5B] font-semibold">¥388</span>

// 链接 - 冰川蓝
<a href="#" className="text-[#4A85B8]">查看详情</a>

// 成功状态 - 青松
<span className="text-[#3D7350]">已入住</span>

// 错误状态 - 枫叶
<span className="text-[#B94D3D]">已取消</span>
```

---

## 开发检查清单

### 后台页面检查
- [ ] 使用品牌蓝 #3b82f6 作为主色
- [ ] 卡片使用 `rounded-xl border-slate-200 shadow-sm`
- [ ] 按钮统一高度 `h-9`
- [ ] 输入框聚焦效果 `focus:border-blue-500 focus:ring-2`
- [ ] 表格 hover 效果 `hover:bg-slate-50`
- [ ] 状态标签使用合适的功能色

### C端小程序检查
- [ ] 使用自然色系: 森林绿/田野色/冰川蓝
- [ ] 按钮高度: 主按钮32px, 小按钮24px
- [ ] 标签圆角: 方形2px, 圆形full
- [ ] 输入框高度36px, 圆角4px
- [ ] 使用 MobileFrame 组件包裹
- [ ] 字号范围12px-16px
- [ ] 图标尺寸: 3-6个单位 (w-3到w-6)

### 通用检查
- [ ] 所有颜色从配色系统选取
- [ ] 对比度符合WCAG标准
- [ ] 添加 hover/focus 交互效果
- [ ] 使用 transition 过渡动画
- [ ] 响应式布局适配
- [ ] 类型检查通过

---
