<template>
  <sidebar>
    <div class="page-container">
      <h1 class="page-title">房型列表</h1>

      <div class="space-y-6">
        <!-- 顶部操作栏 -->
        <a-card :bordered="false">
          <div class="filter-row">
            <a-select v-model="filterCategory" placeholder="请选择类型" style="width: 150px">
              <a-select-option value="">请选择类型</a-select-option>
              <a-select-option value="普通">普通</a-select-option>
              <a-select-option value="豪华">豪华</a-select-option>
              <a-select-option value="特色">特色</a-select-option>
            </a-select>
            <a-input
              v-model="filterName"
              placeholder="请输入房型名称"
              style="width: 200px"
            />
            <a-button type="primary" @click="handleSearch">搜索</a-button>
            <a-button @click="handleReset">重置</a-button>
            <div class="flex-spacer"></div>
            <a-button type="primary" @click="handleAdd">新增</a-button>
            <a-button>新增假房</a-button>
            <a-button>小程序房型展示排序</a-button>
          </div>
        </a-card>

        <!-- 房型列表 -->
        <a-card :bordered="false">
          <a-alert
            message="如果门店有了房源系统,请务必将有真实房源的房型,如需完全在小程序列表展现,请联系对接PM或DM。选择对接PM或DM后,请务必门店不会在小程序列表展现。"
            type="warning"
            show-icon
            :closable="false"
            style="margin-bottom: 16px"
          />

          <a-table
            :columns="columns"
            :data-source="roomTypes"
            :loading="loading"
            :pagination="false"
            row-key="id"
          >
            <template #category="text">
              <a-tag color="blue">{{ text }}</a-tag>
            </template>

            <template #name="text, record">
              {{ text }} 【{{ record.院 }}】
            </template>

            <template #isOnline="isOnline, record">
              <a-switch
                :checked="isOnline"
                @change="handleToggleOnline(record.id)"
              />
            </template>

            <template #action="text, record">
              <div class="action-buttons">
                <a @click="handleEdit(record)">编辑</a>
                <a-divider type="vertical" />
                <a class="text-danger" @click="handleDelete(record)">删除</a>
              </div>
            </template>
          </a-table>
        </a-card>
      </div>
    </div>
  </sidebar>
</template>

<script>
import { defineComponent, ref, onMounted } from '@vue/composition-api'
import Sidebar from '@/components/Layout/Sidebar.vue'
import RoomTypeService from './services/roomType.service'

export default defineComponent({
  name: 'RoomTypeListPage',
  components: { Sidebar },
  setup(props, { root }) {
    const loading = ref(false)
    const roomTypes = ref([])
    const filterCategory = ref('')
    const filterName = ref('')

    const columns = [
      {
        title: '编号',
        dataIndex: 'sortOrder',
        key: 'sortOrder',
        width: 80
      },
      {
        title: '类型',
        dataIndex: 'category',
        key: 'category',
        width: 100,
        scopedSlots: { customRender: 'category' }
      },
      {
        title: '房型名称',
        dataIndex: 'name',
        key: 'name',
        scopedSlots: { customRender: 'name' }
      },
      {
        title: '卧室数',
        dataIndex: 'bedrooms',
        key: 'bedrooms',
        width: 100
      },
      {
        title: '房间数',
        dataIndex: 'roomCount',
        key: 'roomCount',
        width: 100
      },
      {
        title: '面积',
        dataIndex: 'area',
        key: 'area',
        width: 100
      },
      {
        title: '限住成人数',
        dataIndex: 'maxAdults',
        key: 'maxAdults',
        width: 120
      },
      {
        title: '上架状态',
        dataIndex: 'isOnline',
        key: 'isOnline',
        width: 120,
        scopedSlots: { customRender: 'isOnline' }
      },
      {
        title: '操作',
        key: 'action',
        width: 150,
        scopedSlots: { customRender: 'action' }
      }
    ]

    // 加载房型列表
    const loadRoomTypes = async () => {
      loading.value = true
      try {
        const data = await RoomTypeService.getList({
          category: filterCategory.value,
          name: filterName.value
        })
        roomTypes.value = data
      } catch (error) {
        console.error('Failed to load room types:', error)
        root.$message.error('加载房型列表失败')
      } finally {
        loading.value = false
      }
    }

    // 搜索
    const handleSearch = () => {
      loadRoomTypes()
    }

    // 重置
    const handleReset = () => {
      filterCategory.value = ''
      filterName.value = ''
      loadRoomTypes()
    }

    // 新增
    const handleAdd = () => {
      root.$message.info('新增功能开发中')
    }

    // 编辑
    const handleEdit = (record) => {
      root.$message.info(`编辑房型: ${record.name}`)
    }

    // 删除
    const handleDelete = (record) => {
      root.$confirm({
        title: '确认删除',
        content: `确定要删除房型 "${record.name}" 吗？`,
        onOk: async () => {
          try {
            await RoomTypeService.delete(record.id)
            root.$message.success('删除成功')
            loadRoomTypes()
          } catch (error) {
            console.error('Failed to delete room type:', error)
            root.$message.error('删除失败')
          }
        }
      })
    }

    // 切换上架状态
    const handleToggleOnline = async (id) => {
      try {
        await RoomTypeService.toggleOnline(id)
        root.$message.success('状态已更新')
        loadRoomTypes()
      } catch (error) {
        console.error('Failed to toggle online status:', error)
        root.$message.error('状态更新失败')
      }
    }

    onMounted(() => {
      loadRoomTypes()
    })

    return {
      loading,
      roomTypes,
      filterCategory,
      filterName,
      columns,
      handleSearch,
      handleReset,
      handleAdd,
      handleEdit,
      handleDelete,
      handleToggleOnline
    }
  }
})
</script>

<style scoped lang="less">
.page-container {
  padding: 24px;
  background: #f0f2f5;
  min-height: calc(100vh);
}

.page-title {
  font-size: 24px;
  font-weight: 600;
  color: rgba(0, 0, 0, 0.85);
  margin-bottom: 24px;
}

.space-y-6 > * + * {
  margin-top: 24px;
}

.filter-row {
  display: flex;
  align-items: center;
  gap: 12px;

  .flex-spacer {
    flex: 1;
  }
}

.action-buttons {
  a {
    font-size: 14px;

    &.text-danger {
      color: #ff4d4f;

      &:hover {
        color: #ff7875;
      }
    }
  }
}

:deep(.ant-table) {
  font-size: 14px;
}
</style>
