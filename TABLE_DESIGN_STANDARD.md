# 表格设计标准规范

**基于**: 订单列表页面 & 优惠券列表页面（最佳实践）
**更新时间**: 2025-12-08

---

## 🎯 核心原则

**所有列表页面必须遵循以下标准，保持视觉统一**

---

## 📋 标准表格样式（标杆：订单列表）

### 表格基础样式

```vue
<a-table
  :columns="columns"
  :data-source="tableData"
  :loading="isLoading"
  :pagination="pagination"
  @change="handleTableChange"
  rowKey="id"
  class="custom-table"
>
  <!-- 列模板 -->
</a-table>
```

### 表格样式定义

```less
@import '@/styles/variables.less';

// 自定义表格样式
.custom-table {
  :deep(.ant-table-thead > tr > th) {
    background: @bg-secondary;           // #f8fafc 浅灰
    border-bottom: 1px solid @border-primary;
    color: @text-primary;                // 90% 黑色
    font-weight: @font-weight-semibold;  // 600
    font-size: @font-size-base;          // 14px
    padding: 12px 16px;                  // 固定间距
  }

  :deep(.ant-table-tbody > tr) {
    &:hover > td {
      background: @bg-hover;             // #f1f5f9 hover背景
    }

    > td {
      border-bottom: 1px solid @border-primary;
      padding: 12px 16px;                // 固定间距
      color: @text-primary;              // 90% 黑色
    }
  }

  :deep(.ant-table-pagination) {
    padding: 16px 24px;
  }
}
```

---

## 🏷️ 标准标签样式（标杆：优惠券类型）

### 彩色标签模板

```vue
<!-- 优惠券类型 -->
<template slot="type" slot-scope="type">
  <a-tag :class="getCouponTypeBadgeClass(type)">
    {{ getCouponTypeText(type) }}
  </a-tag>
</template>
```

### 标签样式定义

```less
// 标签样式 - 统一规范
.tag-orange {
  color: #c2410c;
  background: #fff7ed;
  border-color: #fed7aa;
}

.tag-green {
  color: #15803d;
  background: #f0fdf4;
  border-color: #bbf7d0;
}

.tag-blue {
  color: #1d4ed8;
  background: #eff6ff;
  border-color: #bfdbfe;
}

.tag-purple {
  color: #7c3aed;
  background: #f5f3ff;
  border-color: #ddd6fe;
}

.tag-red {
  color: #b91c1c;
  background: #fee2e2;
  border-color: #fca5a5;
}

.tag-gray {
  color: #64748b;
  background: #f8fafc;
  border-color: #cbd5e1;
}

:deep(.ant-tag) {
  margin: 0;
  padding: 2px 8px;
  font-size: 12px;
  font-weight: 500;
  line-height: 20px;
  border-radius: 4px;
  border-width: 1px;
}
```

### 标签使用函数

```javascript
// 获取标签类名
getCouponTypeBadgeClass(type) {
  const classMap = {
    full_reduction: 'tag-orange',      // 满减券 - 橙色
    discount: 'tag-green',             // 折扣券 - 绿色
    instant_reduction: 'tag-blue'      // 立减券 - 蓝色
  }
  return classMap[type] || ''
}

// 获取标签文本
getCouponTypeText(type) {
  const map = {
    full_reduction: '满减券',
    discount: '折扣券',
    instant_reduction: '立减券'
  }
  return map[type] || type
}
```

---

## 📅 标准日期时间显示（标杆：创建时间）

### 日期时间模板

```vue
<!-- 创建时间 -->
<template slot="createdAt" slot-scope="createdAt">
  <div class="datetime-cell">
    <div class="date">{{ formatDate(createdAt) }}</div>
    <div class="time">{{ formatTime(createdAt) }}</div>
  </div>
</template>
```

### 日期时间样式

```less
// 日期时间单元格 - 标准样式
.datetime-cell {
  .date {
    display: block;
    color: @text-primary;      // 90% 黑色
    font-size: @font-size-base; // 14px
    line-height: 1.5;
  }

  .time {
    display: block;
    color: @text-secondary;    // #666666
    font-size: @font-size-sm;  // 13px
    line-height: 1.5;
    margin-top: 2px;
  }
}
```

### 格式化函数

```javascript
import dayjs from 'dayjs'

// 格式化日期
formatDate(datetime) {
  if (!datetime) return '-'
  return dayjs(datetime).format('YYYY-MM-DD')
}

// 格式化时间
formatTime(datetime) {
  if (!datetime) return '-'
  return dayjs(datetime).format('HH:mm:ss')
}
```

---

## 🔘 标准操作按钮（标杆：编辑+启用/停用）

### 操作列模板

```vue
<!-- 操作 -->
<template slot="action" slot-scope="text, record">
  <div class="action-btns">
    <!-- 编辑按钮 -->
    <a-button size="small" @click="handleEdit(record)">
      <a-icon type="edit" />
      编辑
    </a-button>

    <!-- 启用/停用按钮（动态type） -->
    <a-button
      size="small"
      :type="record.status === 'enabled' ? 'danger' : 'primary'"
      @click="handleToggleStatus(record)"
    >
      {{ record.status === 'enabled' ? '停用' : '启用' }}
    </a-button>
  </div>
</template>
```

### 操作按钮样式

```less
// 操作按钮容器 - 标准样式
.action-btns {
  display: flex;
  gap: 8px;
  justify-content: center;

  .ant-btn-sm {
    height: 28px;
    padding: 0 12px;
    font-size: 13px;
    border-radius: 6px;
  }
}
```

### 按钮颜色规则

- **编辑按钮**: Default（白底灰边）
- **删除按钮**: Danger（红色）
- **启用按钮**: Primary（品牌蓝）
- **停用按钮**: Danger（红色）
- **查看按钮**: Default（白底灰边）

---

## 📊 完整表格示例（标准模板）

### Vue 模板

```vue
<template>
  <sidebar>
    <div class="page-container">
      <!-- 列表卡片 -->
      <a-card :bordered="false" class="list-card">
        <div slot="title" class="card-header">
          <span class="card-title">数据列表</span>
          <div class="header-actions">
            <a-button type="primary" @click="handleCreate">
              <a-icon type="plus" />
              创建
            </a-button>
          </div>
        </div>

        <a-table
          :columns="columns"
          :data-source="tableData"
          :loading="isLoading"
          :pagination="pagination"
          @change="handleTableChange"
          rowKey="id"
          class="custom-table"
        >
          <!-- ID列 -->
          <template slot="id" slot-scope="id">
            <span class="id-text">{{ id }}</span>
          </template>

          <!-- 类型标签 -->
          <template slot="type" slot-scope="type">
            <a-tag :class="getTypeClass(type)">
              {{ getTypeText(type) }}
            </a-tag>
          </template>

          <!-- 状态标签 -->
          <template slot="status" slot-scope="status">
            <a-tag :class="status === 'enabled' ? 'tag-green' : 'tag-gray'">
              {{ status === 'enabled' ? '已启用' : '已停用' }}
            </a-tag>
          </template>

          <!-- 日期时间 -->
          <template slot="createdAt" slot-scope="createdAt">
            <div class="datetime-cell">
              <div class="date">{{ formatDate(createdAt) }}</div>
              <div class="time">{{ formatTime(createdAt) }}</div>
            </div>
          </template>

          <!-- 操作按钮 -->
          <template slot="action" slot-scope="text, record">
            <div class="action-btns">
              <a-button size="small" @click="handleEdit(record)">
                <a-icon type="edit" />
                编辑
              </a-button>
              <a-button
                size="small"
                :type="record.status === 'enabled' ? 'danger' : 'primary'"
                @click="handleToggleStatus(record)"
              >
                {{ record.status === 'enabled' ? '停用' : '启用' }}
              </a-button>
            </div>
          </template>
        </a-table>
      </a-card>
    </div>
  </sidebar>
</template>
```

### 完整样式（Less）

```less
@import '@/styles/variables.less';

.page-container {
  padding: 24px;
  max-width: 1800px;
  margin: 0 auto;
}

// 卡片样式
.list-card {
  border-radius: @border-radius-lg;    // 8px
  border: 1px solid @border-primary;
  box-shadow: @shadow-sm;

  :deep(.ant-card-head) {
    border-bottom: 1px solid @bg-tertiary;
    padding: 16px 24px;
  }

  :deep(.ant-card-body) {
    padding: 0;  // 表格卡片body无padding
  }
}

.card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}

.card-title {
  font-size: @font-size-lg;
  font-weight: @font-weight-semibold;
  color: @text-primary;
}

.header-actions {
  display: flex;
  gap: 8px;
}

// 自定义表格样式（标准）
.custom-table {
  :deep(.ant-table-thead > tr > th) {
    background: @bg-secondary;
    border-bottom: 1px solid @border-primary;
    color: @text-primary;
    font-weight: @font-weight-semibold;
    font-size: @font-size-base;
    padding: 12px 16px;
  }

  :deep(.ant-table-tbody > tr) {
    &:hover > td {
      background: @bg-hover;
    }

    > td {
      border-bottom: 1px solid @border-primary;
      padding: 12px 16px;
      color: @text-primary;
    }
  }

  :deep(.ant-table-pagination) {
    padding: 16px 24px;
  }
}

// ID文本（不使用等宽字体）
.id-text {
  font-family: @font-family;
  font-weight: @font-weight-medium;
  color: @text-primary;
  font-size: @font-size-sm;
}

// 日期时间单元格
.datetime-cell {
  .date {
    display: block;
    color: @text-primary;
    font-size: @font-size-base;
    line-height: 1.5;
  }

  .time {
    display: block;
    color: @text-secondary;
    font-size: @font-size-sm;
    line-height: 1.5;
    margin-top: 2px;
  }
}

// 标签样式
.tag-orange {
  color: #c2410c;
  background: #fff7ed;
  border-color: #fed7aa;
}

.tag-green {
  color: #15803d;
  background: #f0fdf4;
  border-color: #bbf7d0;
}

.tag-blue {
  color: #1d4ed8;
  background: #eff6ff;
  border-color: #bfdbfe;
}

.tag-purple {
  color: #7c3aed;
  background: #f5f3ff;
  border-color: #ddd6fe;
}

.tag-red {
  color: #b91c1c;
  background: #fee2e2;
  border-color: #fca5a5;
}

.tag-gray {
  color: #64748b;
  background: #f8fafc;
  border-color: #cbd5e1;
}

:deep(.ant-tag) {
  margin: 0;
  padding: 2px 8px;
  font-size: @font-size-xs;
  font-weight: @font-weight-medium;
  line-height: 20px;
  border-radius: @border-radius-sm;  // 4px
  border-width: 1px;
}

// 操作按钮
.action-btns {
  display: flex;
  gap: 8px;
  justify-content: center;

  .ant-btn-sm {
    height: 28px;
    padding: 0 12px;
    font-size: @font-size-sm;
  }
}
```

---

## 📐 表格列定义规范

### 标准列配置

```javascript
const columns = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
    width: 100,                        // 固定宽度
    scopedSlots: { customRender: 'id' }
  },
  {
    title: '类型',
    dataIndex: 'type',
    key: 'type',
    width: 100,
    scopedSlots: { customRender: 'type' }
  },
  {
    title: '名称',
    dataIndex: 'name',
    key: 'name',
    width: 180,
    scopedSlots: { customRender: 'name' }
  },
  {
    title: '状态',
    dataIndex: 'status',
    key: 'status',
    width: 80,
    scopedSlots: { customRender: 'status' }
  },
  {
    title: '创建时间',
    dataIndex: 'createdAt',
    key: 'createdAt',
    width: 120,                        // 日期时间列固定120px
    scopedSlots: { customRender: 'createdAt' }
  },
  {
    title: '创建人',
    dataIndex: 'createdBy',
    key: 'createdBy',
    width: 100
  },
  {
    title: '操作',
    key: 'action',
    width: 140,                        // 两个按钮：140px
    fixed: 'right',                    // 固定在右侧
    scopedSlots: { customRender: 'action' }
  }
]
```

### 列宽度参考

- **ID列**: 100px
- **类型/状态标签**: 80-100px
- **名称/标题**: 150-200px
- **短文本**: 100-120px
- **日期时间**: 120px（分行显示）
- **操作列（2按钮）**: 140px
- **操作列（3按钮）**: 180px

---

## 🎨 分页器配置

### 标准分页配置

```javascript
pagination: {
  current: 1,
  pageSize: 10,
  total: 0,
  showSizeChanger: true,          // 显示每页数量切换
  showQuickJumper: true,          // 显示快速跳转
  showTotal: (total) => `共 ${total} 条`,
  pageSizeOptions: ['10', '20', '50', '100']
}
```

---

## 🔍 筛选器规范

### 筛选器布局

```vue
<a-card :bordered="false" class="filter-card">
  <div class="filter-container">
    <a-input
      v-model="filters.keyword"
      placeholder="搜索关键词"
      style="width: 200px"
      @pressEnter="handleSearch"
    >
      <a-icon slot="prefix" type="search" />
    </a-input>

    <a-select
      v-model="filters.status"
      style="width: 140px"
      placeholder="全部状态"
      @change="handleSearch"
    >
      <a-select-option value="all">全部状态</a-select-option>
      <a-select-option value="enabled">已启用</a-select-option>
      <a-select-option value="disabled">已停用</a-select-option>
    </a-select>

    <a-button type="primary" @click="handleSearch" :loading="isLoading">
      <a-icon type="search" />
      搜索
    </a-button>

    <a-button @click="handleReset">重置</a-button>
  </div>
</a-card>
```

### 筛选器样式

```less
.filter-card {
  margin-bottom: 20px;
  border-radius: @border-radius-lg;
  border: 1px solid @border-primary;
  box-shadow: @shadow-sm;

  :deep(.ant-card-body) {
    padding: 20px 24px;
  }
}

.filter-container {
  display: flex;
  gap: 12px;
  align-items: center;
  flex-wrap: wrap;
}
```

---

## 💡 最佳实践示例

### 示例1：优惠券列表（完美实现）

**亮点**:
- ✅ 优惠券类型使用彩色标签（橙/绿/蓝）
- ✅ 创建时间分行显示（日期90%黑，时间#666）
- ✅ 操作按钮：编辑+启用/停用（动态type）
- ✅ 表格样式完美（表头、hover、间距）

### 示例2：订单列表（完美实现）

**亮点**:
- ✅ 表格样式标准（浅灰表头、hover效果）
- ✅ 下单时间分行显示
- ✅ 订单号使用普通字体
- ✅ 状态标签颜色丰富

### 示例3：会员列表（完美实现）

**亮点**:
- ✅ VIP等级橙色高亮（#f97316）
- ✅ 获得方式彩色标签（蓝/紫/绿/橙）
- ✅ 更新时间分行显示
- ✅ 导出按钮使用绿色（#10b981）

---

## 📝 快速复制模板

### 1. 表格页面完整模板

```vue
<template>
  <sidebar>
    <div class="your-page">
      <!-- 筛选器 -->
      <a-card :bordered="false" class="filter-card">
        <div class="filter-container">
          <!-- 筛选组件 -->
        </div>
      </a-card>

      <!-- 列表 -->
      <a-card :bordered="false" class="list-card">
        <div slot="title" class="card-header">
          <span class="card-title">列表标题</span>
          <div class="header-actions">
            <a-button type="primary" @click="handleCreate">
              <a-icon type="plus" />
              创建
            </a-button>
          </div>
        </div>

        <a-table
          :columns="columns"
          :data-source="tableData"
          :loading="isLoading"
          :pagination="pagination"
          @change="handleTableChange"
          rowKey="id"
          class="custom-table"
        >
          <!-- 自定义列模板 -->
        </a-table>
      </a-card>
    </div>
  </sidebar>
</template>

<script>
import { defineComponent, ref, reactive, onMounted } from '@vue/composition-api'
import Sidebar from '@/components/Layout/Sidebar.vue'
import dayjs from 'dayjs'

export default defineComponent({
  name: 'YourPage',
  components: { Sidebar },
  setup(props, { root }) {
    const isLoading = ref(false)
    const tableData = ref([])

    const pagination = reactive({
      current: 1,
      pageSize: 10,
      total: 0,
      showSizeChanger: true,
      showQuickJumper: true,
      showTotal: (total) => `共 ${total} 条`,
      pageSizeOptions: ['10', '20', '50', '100']
    })

    const columns = [
      // 列定义
    ]

    const fetchData = async () => {
      isLoading.value = true
      try {
        // 加载数据
      } finally {
        isLoading.value = false
      }
    }

    const formatDate = (datetime) => {
      if (!datetime) return '-'
      return dayjs(datetime).format('YYYY-MM-DD')
    }

    const formatTime = (datetime) => {
      if (!datetime) return '-'
      return dayjs(datetime).format('HH:mm:ss')
    }

    onMounted(() => {
      fetchData()
    })

    return {
      isLoading,
      tableData,
      pagination,
      columns,
      formatDate,
      formatTime
    }
  }
})
</script>

<style scoped lang="less">
@import '@/styles/variables.less';

.your-page {
  padding: 24px;
  max-width: 1800px;
  margin: 0 auto;

  .filter-card {
    margin-bottom: 20px;
    border-radius: @border-radius-lg;
    border: 1px solid @border-primary;
    box-shadow: @shadow-sm;

    :deep(.ant-card-body) {
      padding: 20px 24px;
    }
  }

  .filter-container {
    display: flex;
    gap: 12px;
    align-items: center;
    flex-wrap: wrap;
  }

  .list-card {
    border-radius: @border-radius-lg;
    border: 1px solid @border-primary;
    box-shadow: @shadow-sm;

    :deep(.ant-card-head) {
      border-bottom: 1px solid @bg-tertiary;
      padding: 16px 24px;
    }

    :deep(.ant-card-body) {
      padding: 0;
    }
  }

  .card-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
  }

  .card-title {
    font-size: @font-size-lg;
    font-weight: @font-weight-semibold;
    color: @text-primary;
  }

  .header-actions {
    display: flex;
    gap: 8px;
  }
}

// 自定义表格样式
.custom-table {
  :deep(.ant-table-thead > tr > th) {
    background: @bg-secondary;
    border-bottom: 1px solid @border-primary;
    color: @text-primary;
    font-weight: @font-weight-semibold;
    font-size: @font-size-base;
    padding: 12px 16px;
  }

  :deep(.ant-table-tbody > tr) {
    &:hover > td {
      background: @bg-hover;
    }

    > td {
      border-bottom: 1px solid @border-primary;
      padding: 12px 16px;
      color: @text-primary;
    }
  }

  :deep(.ant-table-pagination) {
    padding: 16px 24px;
  }
}

// ID文本
.id-text {
  font-family: @font-family;
  font-weight: @font-weight-medium;
  color: @text-primary;
  font-size: @font-size-sm;
}

// 日期时间单元格
.datetime-cell {
  .date {
    display: block;
    color: @text-primary;
    font-size: @font-size-base;
    line-height: 1.5;
  }

  .time {
    display: block;
    color: @text-secondary;
    font-size: @font-size-sm;
    line-height: 1.5;
    margin-top: 2px;
  }
}

// 标签样式
.tag-green {
  color: #15803d;
  background: #f0fdf4;
  border-color: #bbf7d0;
}

.tag-gray {
  color: #64748b;
  background: #f8fafc;
  border-color: #cbd5e1;
}

:deep(.ant-tag) {
  margin: 0;
  padding: 2px 8px;
  font-size: @font-size-xs;
  font-weight: @font-weight-medium;
  line-height: 20px;
  border-radius: @border-radius-sm;
  border-width: 1px;
}

// 操作按钮
.action-btns {
  display: flex;
  gap: 8px;
  justify-content: center;

  .ant-btn-sm {
    height: 28px;
    padding: 0 12px;
    font-size: @font-size-sm;
  }
}
</style>
```

---

## ✅ 开发检查清单

创建新的列表页面时，确保：

### 结构
- [ ] 使用 Sidebar 组件包裹
- [ ] 页面容器：`padding: 24px; max-width: 1800px; margin: 0 auto;`
- [ ] 筛选器卡片在上，列表卡片在下
- [ ] 列表卡片 body 的 padding 为 0

### 样式
- [ ] 引入 `@import '@/styles/variables.less'`
- [ ] 使用 `.custom-table` 类名
- [ ] 表格表头背景 `@bg-secondary`
- [ ] 表格 hover 背景 `@bg-hover`
- [ ] 行间距 `12px 16px`

### 日期时间
- [ ] 使用 `.datetime-cell` 结构
- [ ] 日期一行（90%黑，14px）
- [ ] 时间第二行（#666，13px）
- [ ] 导入 dayjs 库

### 标签
- [ ] 使用自定义类（tag-green、tag-blue等）
- [ ] 不使用 `color="default"`（看不清）
- [ ] 标签圆角 4px

### 操作按钮
- [ ] 使用 `.action-btns` 容器
- [ ] 按钮 size="small"（高度28px）
- [ ] gap: 8px
- [ ] 编辑按钮 + 状态切换按钮（动态type）

### 分页
- [ ] showSizeChanger: true
- [ ] showQuickJumper: true
- [ ] showTotal 显示总数

---

## 🚫 禁止行为

- ❌ 不要使用 `size="middle"` 或 `size="large"`（统一不设置，使用默认）
- ❌ 不要使用 `color="default"`（灰色标签看不清）
- ❌ 不要混合日期时间在一行
- ❌ 不要使用等宽字体显示ID
- ❌ 不要自定义表格行间距（统一12px 16px）
- ❌ 不要使用硬编码颜色

---

## 📊 参考页面

**完美示例**:
1. `src/views/PlatformAdmin/OrderManagement/OrderListPage.vue` - 表格样式标杆
2. `src/views/PlatformAdmin/CouponManagement/CouponListPage.vue` - 标签和按钮标杆
3. `src/views/PlatformAdmin/MemberManagement/MembersPage.vue` - 综合示例

---

**最后更新**: 2025-12-08
**适用范围**: 所有列表页面
