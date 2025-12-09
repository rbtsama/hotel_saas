<template>
  <a-layout style="min-height: 100vh">
    <!-- 侧边栏 - 黑色主题 -->
    <a-layout-sider
      v-model="collapsed"
      :trigger="null"
      collapsible
      :width="256"
      theme="dark"
      class="custom-sider"
    >
      <div class="sider-content">
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
    const isNavigating = ref(false) // 添加标志位，防止导航时触发 openKeys 更新

    // 获取所有一级和二级菜单的keys（默认全部展开）
    const getAllMenuKeys = () => {
      const keys = []
      menuConfig.forEach(item => {
        if (item.children) {
          keys.push(item.key)
          item.children.forEach(child => {
            if (child.children) {
              keys.push(child.key)
            }
          })
        }
      })
      return keys
    }

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

      // 2. 默认展开所有菜单
      const allKeys = getAllMenuKeys()

      // 3. 恢复保存的展开状态（如果有）
      const savedOpenKeys = localStorage.getItem(STORAGE_KEYS.OPEN_KEYS)
      if (savedOpenKeys) {
        try {
          const parsed = JSON.parse(savedOpenKeys)
          // 合并默认展开和保存的展开状态
          openKeys.value = [...new Set([...allKeys, ...parsed])]
        } catch (e) {
          openKeys.value = allKeys
        }
      } else {
        openKeys.value = allKeys
        localStorage.setItem(STORAGE_KEYS.OPEN_KEYS, JSON.stringify(allKeys))
      }

      // 4. 根据当前路由设置选中状态
      updateSelectedKeys(root.$route.path, false)
    }

    // 更新选中的菜单项
    const updateSelectedKeys = (path, shouldUpdateOpenKeys = true) => {
      const result = findMenuKeyByPath(path)
      if (result) {
        selectedKeys.value = [result.key]

        // 只在需要时才更新 openKeys（避免点击导航时的抖动）
        if (shouldUpdateOpenKeys && !isNavigating.value) {
          // 确保父级菜单都是展开的
          const allParents = [...new Set([...openKeys.value, ...result.parents])]
          if (JSON.stringify(allParents.sort()) !== JSON.stringify(openKeys.value.sort())) {
            openKeys.value = allParents
            localStorage.setItem(STORAGE_KEYS.OPEN_KEYS, JSON.stringify(allParents))
          }
        }
      }
    }

    // 监听路由变化
    watch(() => root.$route.path, (newPath) => {
      // 如果是主动导航，不更新 openKeys，只更新 selectedKeys
      updateSelectedKeys(newPath, !isNavigating.value)
      // 重置导航标志
      if (isNavigating.value) {
        isNavigating.value = false
      }
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

      // 设置导航标志，防止路由变化时更新 openKeys
      isNavigating.value = true

      // 立即更新选中状态，避免闪烁
      selectedKeys.value = [key]

      // 跳转路由
      if (root.$route.path !== path) {
        root.$router.push(path)
      } else {
        // 如果路由相同，重置标志
        isNavigating.value = false
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
  overflow: auto;
  height: 100vh;
  position: fixed;
  left: 0;
  z-index: 100;

  :deep(.ant-layout-sider-children) {
    display: flex;
    flex-direction: column;
    background: #001529;
    height: 100%;
  }
}

.sider-content {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.logo-container {
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  background: #002140;
  flex-shrink: 0;

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
  overflow-y: auto;
  overflow-x: hidden;

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
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  background: #002140;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.65);
  transition: all 0.2s;
  flex-shrink: 0;

  &:hover {
    color: #ffffff;
    background: rgba(255, 255, 255, 0.05);
  }

  i {
    font-size: 18px;
  }
}

// 滚动条样式
.custom-menu {
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
</style>
