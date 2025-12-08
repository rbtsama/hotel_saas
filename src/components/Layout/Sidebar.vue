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
        :selected-keys="selectedKeys"
        :open-keys="openKeys"
        mode="inline"
        theme="dark"
        class="custom-menu"
        @openChange="onOpenChange"
        @select="onSelect"
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
                  @click="handleMenuClick(leaf.path)"
                >
                  {{ leaf.title }}
                </a-menu-item>
              </a-sub-menu>
              <a-menu-item
                v-else
                :key="child.key"
                @click="handleMenuClick(child.path)"
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
import { defineComponent, ref, computed, watch, onMounted } from '@vue/composition-api'
import { menuConfig } from './menuConfig'

const STORAGE_KEYS = {
  OPEN_KEYS: 'sidebar_open_keys',
  COLLAPSED: 'sidebar_collapsed'
}

export default defineComponent({
  name: 'Sidebar',
  setup(props, { root }) {
    const collapsed = ref(false)
    const openKeys = ref([])

    // 初始化时从 localStorage 读取状态
    onMounted(() => {
      const savedCollapsed = localStorage.getItem(STORAGE_KEYS.COLLAPSED)
      const savedOpenKeys = localStorage.getItem(STORAGE_KEYS.OPEN_KEYS)

      if (savedCollapsed !== null) {
        collapsed.value = savedCollapsed === 'true'
      }

      if (savedOpenKeys) {
        openKeys.value = JSON.parse(savedOpenKeys)
      } else {
        // 默认展开所有一级菜单
        openKeys.value = menuConfig.map(item => item.key)
      }
    })

    // 计算当前选中的菜单项
    const selectedKeys = computed(() => {
      const path = root.$route.path
      // 从菜单配置中找到匹配的key，并同时记录父级key
      const findKey = (items, parents = []) => {
        for (const item of items) {
          if (item.path === path) {
            // 找到匹配项时，自动展开所有父级菜单
            const newOpenKeys = [...new Set([...openKeys.value, ...parents])]
            if (JSON.stringify(newOpenKeys) !== JSON.stringify(openKeys.value)) {
              openKeys.value = newOpenKeys
              localStorage.setItem(STORAGE_KEYS.OPEN_KEYS, JSON.stringify(newOpenKeys))
            }
            return [item.key]
          }
          if (item.children) {
            const childKey = findKey(item.children, [...parents, item.key])
            if (childKey) return childKey
          }
        }
        return []
      }
      return findKey(menuConfig)
    })

    // 监听路由变化
    watch(() => root.$route.path, () => {
      // 路由变化时会自动更新 selectedKeys，进而更新 openKeys
    })

    // 监听折叠状态变化，保存到 localStorage
    watch(collapsed, (newVal) => {
      localStorage.setItem(STORAGE_KEYS.COLLAPSED, String(newVal))
    })

    const onOpenChange = (keys) => {
      openKeys.value = keys
      // 保存展开状态到 localStorage
      localStorage.setItem(STORAGE_KEYS.OPEN_KEYS, JSON.stringify(keys))
    }

    const onSelect = ({ key }) => {
      // 菜单选中时保持展开状态
    }

    const toggleCollapsed = () => {
      collapsed.value = !collapsed.value
    }

    const handleMenuClick = (path) => {
      if (path && root.$route.path !== path) {
        root.$router.push(path)
      }
    }

    return {
      collapsed,
      openKeys,
      selectedKeys,
      menuItems: menuConfig,
      onOpenChange,
      onSelect,
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
