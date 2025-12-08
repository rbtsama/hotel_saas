# 前端设计规范

**适用项目**: 小而美 Home Stay 民宿管理系统
**技术栈**: Vue 2 + Ant Design Vue
**最后更新**: 2025-12-08

---

## 🎨 核心设计原则

### 统一圆角规范（重要）

**所有组件圆角统一为 6px，无例外**

```css
/* 所有输入框、筛选组件、按钮 - 圆角统一 6px */
.ant-btn { border-radius: 6px !important; }
.ant-input { border-radius: 6px !important; }
.ant-select-selector { border-radius: 6px !important; }
.ant-picker { border-radius: 6px !important; }
.ant-textarea { border-radius: 6px !important; }
.ant-input-number { border-radius: 6px !important; }
.ant-cascader-picker { border-radius: 6px !important; }
.ant-radio-group-solid .ant-radio-button-wrapper { border-radius: 6px !important; }
.ant-pagination-item { border-radius: 6px !important; }
.ant-dropdown-menu { border-radius: 6px !important; }
.ant-select-dropdown { border-radius: 6px !important; }

/* 唯一例外：标签保持 4px（更小巧） */
.ant-tag { border-radius: 4px !important; }

/* 卡片使用 8px（更大气） */
.ant-card { border-radius: 8px; }
```

**❌ 禁止行为**:
- ❌ 不要使用不同的圆角值
- ❌ 不要有的组件圆有的组件方
- ❌ 不要自定义圆角大小

---

## 🎯 配色系统

### 品牌色
```css
--brand-primary: #3b82f6;        /* 品牌蓝 - 主按钮、选中态 */
--brand-primary-hover: #2563eb;  /* hover 状态 */
--brand-primary-light: #dbeafe;  /* 浅色背景 */
```

### 功能色
```css
--success-color: #10b981;        /* 成功/完成 */
--warning-color: #f97316;        /* 警告/待处理 */
--error-color: #ef4444;          /* 错误/危险 */
--info-color: #8b5cf6;           /* 信息提示 */
```

### 文字色系统（核心）
```css
--text-primary: rgba(0,0,0,0.9); /* 90% 黑色 - 主要内容 */
--text-secondary: #666666;       /* 辅助文字（时间、标签、说明） */
--text-tertiary: #b1b1b1;        /* 暗提示文字（占位符、禁用） */
--text-disabled: #cbd5e1;        /* 禁用状态 */
```

### 背景色
```css
--bg-primary: #ffffff;           /* 主背景 */
--bg-secondary: #f8fafc;         /* 次要背景（表头、只读字段） */
--bg-tertiary: #f1f5f9;          /* 三级背景（hover） */
--bg-hover: #f1f5f9;             /* hover 背景 */
```

### 边框色
```css
--border-primary: #e2e8f0;       /* 主边框（卡片、表格） */
--border-secondary: #cbd5e1;     /* 次要边框（输入框） */
--border-focus: #3b82f6;         /* 聚焦边框（品牌蓝） */
```

---

## 📐 组件尺寸规范

### 按钮
```css
/* 普通按钮 */
height: 32px;
padding: 0 16px;
font-size: 14px;
border-radius: 6px;

/* 小按钮 */
height: 28px;
padding: 0 12px;
font-size: 13px;

/* 大按钮 */
height: 40px;
padding: 0 24px;
font-size: 14px;
```

### 输入框
```css
/* 普通输入框 */
height: 32px;
border-radius: 6px;
font-size: 14px;

/* 大输入框 */
height: 36px;
border-radius: 6px;
```

### 表格
```css
/* 表头 */
background: #f8fafc;
padding: 12px 16px;
font-weight: 600;
color: rgba(0,0,0,0.9);

/* 表格行 */
padding: 12px 16px;
color: rgba(0,0,0,0.9);

/* hover */
background: #f1f5f9;
```

### 标签
```css
padding: 2px 8px;
font-size: 12px;
border-radius: 4px;  /* 标签特殊：4px */
border-width: 1px;
```

---

## 🔤 字体规范

### 字体栈
```css
font-family: -apple-system, BlinkMacSystemFont, "Segoe UI",
             "Noto Sans SC", "Microsoft YaHei", sans-serif;
```

### 字号系统
```css
--font-size-xs: 12px;    /* 标签、辅助文字 */
--font-size-sm: 13px;    /* 小文字 */
--font-size-base: 14px;  /* 基础文字 */
--font-size-lg: 16px;    /* 标题 */
--font-size-xl: 18px;    /* 大标题 */
--font-size-2xl: 24px;   /* 页面标题 */
```

### 字重系统
```css
--font-weight-normal: 400;    /* 普通文字 */
--font-weight-medium: 500;    /* 强调文字 */
--font-weight-semibold: 600;  /* 标题 */
--font-weight-bold: 700;      /* 重要标题 */
```

### 特殊字段字体规范
**重要**: 订单号、手机号、ID等数字字段**不使用等宽字体**，统一使用普通字体：
```css
.order-number,
.phone-number,
.id-number {
  font-family: @font-family;  /* 普通字体，不用 monospace */
  font-weight: 500;
}
```

---

## 📅 日期时间展示规范

### 表格中的日期时间
**所有日期+时间字段必须分行显示**:

```vue
<template slot="createdAt" slot-scope="datetime">
  <div class="datetime-cell">
    <div class="date">{{ formatDate(datetime) }}</div>
    <div class="time">{{ formatTime(datetime) }}</div>
  </div>
</template>
```

**样式**:
```less
.datetime-cell {
  .date {
    display: block;
    color: rgba(0,0,0,0.9);  /* 90% 黑色 */
    font-size: 14px;
    line-height: 1.5;
  }

  .time {
    display: block;
    color: #666666;           /* 辅助色 */
    font-size: 13px;
    line-height: 1.5;
    margin-top: 2px;
  }
}
```

**格式化函数**:
```javascript
formatDate(datetime) {
  if (!datetime) return '-'
  return dayjs(datetime).format('YYYY-MM-DD')
}

formatTime(datetime) {
  if (!datetime) return '-'
  return dayjs(datetime).format('HH:mm:ss')
}
```

---

## 🏷️ 标签颜色规范

### 状态标签
```vue
<!-- 成功/启用 -->
<a-tag color="success">已启用</a-tag>

<!-- 警告/待处理 -->
<a-tag color="warning">待处理</a-tag>

<!-- 错误/禁用 -->
<a-tag color="error">已禁用</a-tag>

<!-- 进行中 -->
<a-tag color="processing">进行中</a-tag>
```

### 自定义彩色标签
```less
// 蓝色标签
.tag-blue {
  color: #1d4ed8;
  background: #eff6ff;
  border-color: #bfdbfe;
}

// 绿色标签
.tag-green {
  color: #15803d;
  background: #f0fdf4;
  border-color: #bbf7d0;
}

// 橙色标签
.tag-orange {
  color: #c2410c;
  background: #fff7ed;
  border-color: #fed7aa;
}

// 红色标签
.tag-red {
  color: #b91c1c;
  background: #fee2e2;
  border-color: #fca5a5;
}

// 紫色标签
.tag-purple {
  color: #7c3aed;
  background: #f5f3ff;
  border-color: #ddd6fe;
}
```

---

## 📦 卡片样式规范

### 标准卡片
```less
.ant-card {
  border-radius: 8px;
  border: 1px solid #e2e8f0;
  box-shadow: 0 1px 2px rgba(0,0,0,0.03);

  .ant-card-head {
    border-bottom: 1px solid #f1f5f9;
    padding: 16px 24px;
  }

  .ant-card-body {
    padding: 24px;
  }
}
```

### 卡片标题
```less
.card-title {
  font-size: 16px;
  font-weight: 600;
  color: rgba(0,0,0,0.9);
}
```

---

## 🔘 按钮规范

### 主按钮（Primary）
```vue
<a-button type="primary">确认</a-button>
```

**样式**:
```css
background: #3b82f6;
border-color: #3b82f6;
color: #ffffff;
border-radius: 6px;
height: 32px;

/* hover */
background: #2563eb;
border-color: #2563eb;
```

### 次要按钮（Default）
```vue
<a-button>取消</a-button>
```

**样式**:
```css
border-color: #cbd5e1;
color: rgba(0,0,0,0.9);
border-radius: 6px;

/* hover */
border-color: #3b82f6;
color: #3b82f6;
```

### 危险按钮（Danger）
```vue
<a-button type="danger">删除</a-button>
```

**样式**:
```css
background: #ef4444;
border-color: #ef4444;
color: #ffffff;
border-radius: 6px;
```

---

## 📋 表格规范

### 表头样式
```css
background: #f8fafc;          /* 浅灰背景 */
color: rgba(0,0,0,0.9);       /* 90% 黑色 */
font-weight: 600;             /* 半粗体 */
font-size: 14px;
padding: 12px 16px;
border-bottom: 1px solid #e2e8f0;
```

### 表格行样式
```css
padding: 12px 16px;
color: rgba(0,0,0,0.9);
border-bottom: 1px solid #e2e8f0;

/* hover */
background: #f1f5f9;
transition: background 0.2s;
```

### 表格文字
- **主要内容**: 90% 黑色（#000000 rgba(0,0,0,0.9)）
- **辅助内容**: #666666
- **日期**: 90% 黑色
- **时间**: #666666（分行显示）

---

## 📝 表单规范

### 表单标签
```css
color: rgba(0,0,0,0.9);
font-weight: 500;
font-size: 14px;
```

### 必填标记
```vue
<label>
  字段名称 <span style="color: #ef4444">*</span>
</label>
```

### 提示文字
```css
font-size: 12px;
color: #b1b1b1;
margin-top: 4px;
```

### 只读字段
```css
background: #f8fafc;
color: rgba(0,0,0,0.9);
border: 1px solid #e2e8f0;
border-radius: 6px;
cursor: not-allowed;
```

---

## 🎭 交互规范

### Hover 效果
```css
/* 按钮 */
transition: all 0.2s ease;

/* 卡片 */
box-shadow: 0 1px 2px rgba(0,0,0,0.03);  /* 默认 */
box-shadow: 0 4px 6px rgba(0,0,0,0.07);  /* hover */

/* 表格行 */
background: transparent;  /* 默认 */
background: #f1f5f9;      /* hover */
```

### Focus 效果
```css
/* 输入框聚焦 */
border-color: #3b82f6;
box-shadow: 0 0 0 2px rgba(59,130,246,0.1);
```

### 过渡动画
```css
/* 标准过渡 */
transition: all 0.2s ease;

/* 快速过渡 */
transition: all 0.15s ease;

/* 慢速过渡 */
transition: all 0.3s ease;
```

---

## 🌓 侧边栏规范

### 黑色主题
```css
background: #001529;         /* 深蓝黑 */
Logo背景: #002140;           /* 稍深 */
选中项: #3b82f6;             /* 品牌蓝高亮 */
hover: rgba(255,255,255,0.08); /* 半透明白 */
```

### 菜单规范
- **默认状态**: 所有一级和二级菜单全部展开
- **选中效果**: 品牌蓝背景，白色文字
- **状态记忆**: LocalStorage 保存展开状态和折叠状态
- **圆角**: 菜单项 6px

---

## 📊 阴影系统

```css
/* 小阴影 - 静态卡片 */
box-shadow: 0 1px 2px rgba(0,0,0,0.03);

/* 基础阴影 - 普通元素 */
box-shadow: 0 1px 3px rgba(0,0,0,0.1);

/* 中阴影 - hover 卡片 */
box-shadow: 0 4px 6px rgba(0,0,0,0.07);

/* 大阴影 - 弹窗 */
box-shadow: 0 10px 15px rgba(0,0,0,0.1);
```

---

## 📏 间距系统

```css
--spacing-xs: 4px;
--spacing-sm: 8px;
--spacing-base: 12px;
--spacing-md: 16px;
--spacing-lg: 20px;
--spacing-xl: 24px;
--spacing-2xl: 32px;
```

### 页面容器
```css
padding: 24px;
max-width: 1800px;
margin: 0 auto;
```

### 卡片间距
```css
margin-bottom: 20px;
```

### 表单项间距
```css
margin-bottom: 20px;
```

---

## 🎨 标签颜色使用场景

### 账号状态
```javascript
'pre_register' → color="processing"  // 蓝色（预注册）
'registered'   → color="success"     // 绿色（已注册）
'disabled'     → color="error"       // 红色（已禁用）
```

### 获得方式（使用自定义类）
```javascript
'purchase' → class="tag-blue"    // 蓝色（购买）
'gift'     → class="tag-purple"  // 紫色（赠送）
'upgrade'  → class="tag-green"   // 绿色（升级）
'import'   → class="tag-orange"  // 橙色（导入）
```

### 优惠券类型
```javascript
'full_reduction'     → class="tag-orange"  // 橙色（满减券）
'discount'           → class="tag-green"   // 绿色（折扣券）
'instant_reduction'  → class="tag-blue"    // 蓝色（立减券）
```

### 订单状态
```javascript
'pending_payment'  → color="orange"   // 橙色（待支付）
'pending_checkin'  → color="orange"   // 橙色（待入住）
'checked_in'       → color="blue"     // 蓝色（入住中）
'checked_out'      → color="blue"     // 蓝色（已离店）
'completed'        → color="default"  // 灰色（已完成）
'cancelled'        → color="default"  // 灰色（已取消）
'refund_requested' → color="error"    // 红色（退款申请）
```

---

## 📱 响应式规范

### 筛选器响应式
```vue
<div class="filter-container">
  <!-- 小屏自动换行，大屏单行 -->
</div>
```

```css
.filter-container {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  align-items: center;
}
```

### 表格响应式
```vue
<a-table :scroll="{ x: 1400 }">
```

---

## ✅ 开发检查清单

### 创建新页面时
- [ ] 引入全局样式 `@import '@/styles/variables.less'`
- [ ] 所有按钮、输入框、筛选组件圆角 6px
- [ ] 标签圆角 4px
- [ ] 卡片圆角 8px
- [ ] 主文字颜色 90% 黑
- [ ] 辅助文字颜色 #666
- [ ] 提示文字颜色 #B1B1B1
- [ ] 日期时间分行显示
- [ ] 不使用等宽字体
- [ ] 表格表头使用 `@bg-secondary`
- [ ] 表格 hover 使用 `@bg-hover`

### 颜色使用检查
- [ ] 主按钮使用品牌蓝 #3b82f6
- [ ] 成功状态使用 #10b981
- [ ] 警告状态使用 #f97316
- [ ] 错误状态使用 #ef4444
- [ ] 无硬编码颜色值

### 交互检查
- [ ] 所有交互元素有 hover 效果
- [ ] 输入框有 focus 效果
- [ ] 过渡动画流畅（0.2s）
- [ ] 无抖动现象

---

## 🚫 禁止行为

### 圆角
- ❌ 不要混用不同的圆角大小
- ❌ 不要有的圆有的方
- ❌ 不要自定义圆角值

### 颜色
- ❌ 不要硬编码颜色值
- ❌ 不要使用纯黑 #000000（用 rgba(0,0,0,0.9)）
- ❌ 不要使用低对比度颜色

### 字体
- ❌ 不要使用等宽字体（monospace）
- ❌ 不要使用特殊字体
- ❌ 不要混用多种字体

### 间距
- ❌ 不要随意使用间距值
- ❌ 不要使用奇数间距（如 13px、17px）
- ❌ 必须使用间距系统变量

---

## 💡 最佳实践

### 1. 使用全局样式变量
```less
@import '@/styles/variables.less';

.my-component {
  color: @text-primary;
  background: @bg-primary;
  border-radius: @border-radius-base;
  padding: @spacing-md;
}
```

### 2. 日期时间分行显示
```vue
<template slot="datetime" slot-scope="dt">
  <div class="datetime-cell">
    <div class="date">{{ formatDate(dt) }}</div>
    <div class="time">{{ formatTime(dt) }}</div>
  </div>
</template>
```

### 3. 统一标签样式
```vue
<a-tag :class="getTagClass(type)">
  {{ getLabel(type) }}
</a-tag>
```

### 4. 表格统一样式
```less
.custom-table {
  :deep(.ant-table-thead > tr > th) {
    background: @bg-secondary;
    color: @text-primary;
    font-weight: @font-weight-semibold;
  }

  :deep(.ant-table-tbody > tr:hover > td) {
    background: @bg-hover;
  }
}
```

---

## 📚 资源引用

**全局样式文件**:
- `src/styles/variables.less` - 全局变量定义
- `src/styles/global.less` - Ant Design 样式覆盖

**参考文档**:
- `setting_page_color.md` - 配色系统详细说明
- `CLAUDE.md` - Vue 2 开发规范

---

**最后更新**: 2025-12-08
**适用版本**: Vue 2.0 全局美化版
