<template>
  <a-layout style="min-height: 100vh">
    <!-- 侧边栏 - 黑色主题 -->
    <a-layout-sider
      v-model="collapsed"
      :trigger="null"
      collapsible
      :width="256"
      theme="dark"
      style="overflow: auto; height: 100vh; position: fixed; left: 0; z-index: 100"
      class="custom-sider"
    >
      <!-- Logo 区域 -->
      <div class="logo-container">
        <router-link to="/" class="logo-link">
          <h1 v-if="!collapsed" class="logo-title">小而美 2.0</h1>
          <h1 v-else class="logo-title-collapsed">小</h1>
        </router-link>
      </div>

      <!-- 菜单 -->
      <a-menu
        v-model:selectedKeys="selectedKeys"
        v-model:openKeys="openKeys"
        mode="inline"
        theme="dark"
        class="custom-menu"
        @openChange="onOpenChange"
      >
        <template v-for="item in menuItems">
          <a-sub-menu v-if="item.children" :key="item.key">
            <span slot="title">
              <a-icon v-if="item.icon" :type="item.icon" />
              <span>{{ item.title }}</span>
            </span>
            <template v-for="child in item.children">
              <a-sub-menu v-if="child.children" :key="child.key">
                <span slot="title">{{ child.title }}</span>
                <a-menu-item
                  v-for="leaf in child.children"
                  :key="leaf.key"
                  @click="handleMenuClick(leaf.path, leaf.key)"
                >
                  {{ leaf.title }}
                </a-menu-item>
              </a-sub-menu>
              <a-menu-item
                v-else
                :key="child.key"
                @click="handleMenuClick(child.path, child.key)"
              >
                {{ child.title }}
              </a-menu-item>
            </template>
          </a-sub-menu>
        </template>
      </a-menu>

      <!-- 折叠按钮 -->
      <div class="collapse-trigger" @click="toggleCollapsed">
        <a-icon :type="collapsed ? 'menu-unfold' : 'menu-fold'" />
      </div>
    </a-layout-sider>

    <!-- 主内容区 -->
    <a-layout :style="{ marginLeft: collapsed ? '80px' : '256px', transition: 'margin-left 0.2s' }">
      <a-layout-content style="margin: 0; min-height: 280px; background: #f0f2f5">
        <slot />
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script>
import { defineComponent, ref, watch, onMounted } from '@vue/composition-api'
import { menuConfig } from './menuConfig'

const STORAGE_KEYS = {
  OPEN_KEYS: 'sidebar_open_keys',
  COLLAPSED: 'sidebar_collapsed'
}

export default defineComponent({
  name: 'Sidebar',
  setup(props, { root }) {
    const collapsed = ref(false)
    const selectedKeys = ref([])
    const openKeys = ref([])

    // 从路径查找菜单key和父级keys
    const findMenuKeyByPath = (path, items = menuConfig, parents = []) => {
      for (const item of items) {
        if (item.path === path) {
          return {
            key: item.key,
            parents: parents
          }
        }
        if (item.children) {
          const result = findMenuKeyByPath(path, item.children, [...parents, item.key])
          if (result) return result
        }
      }
      return null
    }

    // 初始化菜单状态
    const initMenuState = () => {
      // 1. 恢复折叠状态
      const savedCollapsed = localStorage.getItem(STORAGE_KEYS.COLLAPSED)
      if (savedCollapsed !== null) {
        collapsed.value = savedCollapsed === 'true'
      }

      // 2. 默认展开所有一级菜单
      const allFirstLevelKeys = menuConfig.map(item => item.key)

      // 3. 恢复保存的展开状态（如果有）
      const savedOpenKeys = localStorage.getItem(STORAGE_KEYS.OPEN_KEYS)
      if (savedOpenKeys) {
        try {
          const parsed = JSON.parse(savedOpenKeys)
          // 合并默认展开和保存的展开状态
          openKeys.value = [...new Set([...allFirstLevelKeys, ...parsed])]
        } catch (e) {
          openKeys.value = allFirstLevelKeys
        }
      } else {
        openKeys.value = allFirstLevelKeys
      }

      // 4. 根据当前路由设置选中状态
      updateSelectedKeys(root.$route.path)
    }

    // 更新选中的菜单项
    const updateSelectedKeys = (path) => {
      const result = findMenuKeyByPath(path)
      if (result) {
        selectedKeys.value = [result.key]

        // 确保父级菜单都是展开的
        const allParents = [...new Set([...openKeys.value, ...result.parents])]
        if (JSON.stringify(allParents) !== JSON.stringify(openKeys.value)) {
          openKeys.value = allParents
          localStorage.setItem(STORAGE_KEYS.OPEN_KEYS, JSON.stringify(allParents))
        }
      }
    }

    // 监听路由变化，立即更新选中状态
    watch(() => root.$route.path, (newPath) => {
      updateSelectedKeys(newPath)
    }, { immediate: false })

    // 监听折叠状态变化
    watch(collapsed, (newVal) => {
      localStorage.setItem(STORAGE_KEYS.COLLAPSED, String(newVal))
    })

    // 菜单展开/收起事件
    const onOpenChange = (keys) => {
      openKeys.value = keys
      localStorage.setItem(STORAGE_KEYS.OPEN_KEYS, JSON.stringify(keys))
    }

    // 折叠切换
    const toggleCollapsed = () => {
      collapsed.value = !collapsed.value
    }

    // 菜单点击事件
    const handleMenuClick = (path, key) => {
      if (!path) return

      // 立即更新选中状态，避免闪烁
      selectedKeys.value = [key]

      // 跳转路由
      if (root.$route.path !== path) {
        root.$router.push(path)
      }
    }

    // 组件挂载时初始化
    onMounted(() => {
      initMenuState()
    })

    return {
      collapsed,
      selectedKeys,
      openKeys,
      menuItems: menuConfig,
      onOpenChange,
      toggleCollapsed,
      handleMenuClick
    }
  }
})
</script>

<style scoped lang="less">
// 自定义侧边栏样式
.custom-sider {
  :deep(.ant-layout-sider-children) {
    display: flex;
    flex-direction: column;
    background: #001529;
  }
}

.logo-container {
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  background: #002140;

  .logo-link {
    text-decoration: none;
  }

  .logo-title {
    font-size: 18px;
    font-weight: 600;
    color: #ffffff;
    margin: 0;
    letter-spacing: 1px;
  }

  .logo-title-collapsed {
    font-size: 24px;
    font-weight: 600;
    color: #ffffff;
    margin: 0;
  }
}

// 自定义菜单样式
.custom-menu {
  flex: 1;
  border-right: none;
  padding: 8px 0;

  :deep(.ant-menu-item),
  :deep(.ant-menu-submenu-title) {
    font-size: 14px;
    height: 40px;
    line-height: 40px;
    margin: 4px 8px;
    border-radius: 6px;
    width: calc(100% - 16px);
    transition: background 0.2s ease, color 0.2s ease;

    &:hover {
      background: rgba(255, 255, 255, 0.08);
    }
  }

  :deep(.ant-menu-item-selected) {
    background: #3b82f6 !important;
    color: #ffffff !important;
    font-weight: 500;

    &::after {
      display: none;
    }

    &:hover {
      background: #2563eb !important;
    }
  }

  :deep(.ant-menu-submenu-active) {
    .ant-menu-submenu-title {
      background: rgba(255, 255, 255, 0.08);
    }
  }

  :deep(.ant-menu-submenu-title) {
    .ant-menu-submenu-arrow {
      color: rgba(255, 255, 255, 0.65);
    }
  }

  :deep(.ant-menu-submenu-open) {
    .ant-menu-submenu-title {
      color: #ffffff;
    }
  }

  :deep(.ant-menu-sub) {
    background: rgba(0, 0, 0, 0.2);
  }

  :deep(.ant-menu-item) {
    a {
      color: inherit;
      text-decoration: none;
    }
  }

  :deep(.anticon) {
    font-size: 16px;
  }
}

.collapse-trigger {
  position: sticky;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  background: #002140;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.65);
  transition: all 0.2s;

  &:hover {
    color: #ffffff;
    background: rgba(255, 255, 255, 0.05);
  }

  i {
    font-size: 18px;
  }
}

// 滚动条样式
.custom-sider {
  :deep(.ant-layout-sider-children) {
    &::-webkit-scrollbar {
      width: 6px;
    }

    &::-webkit-scrollbar-track {
      background: rgba(0, 0, 0, 0.1);
    }

    &::-webkit-scrollbar-thumb {
      background: rgba(255, 255, 255, 0.2);
      border-radius: 3px;

      &:hover {
        background: rgba(255, 255, 255, 0.3);
      }
    }
  }
}
</style>
