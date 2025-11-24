<template>
  <a-menu
      v-model:selectedKeys="current"
      mode="horizontal"
      :items="items"
      @click="onMenuClick"
  />
</template>

<script lang="ts" setup>
import {h, ref, watch} from 'vue'
import {
  HomeOutlined,
  UserOutlined,
  UnorderedListOutlined,
  DollarOutlined,
  MoneyCollectOutlined
} from '@ant-design/icons-vue'
import {useRoute, useRouter} from 'vue-router'
import type { MenuProps } from 'ant-design-vue'

const router = useRouter()
const route = useRoute()
const current = ref<string[]>([route.path])

const items = ref<MenuProps['items']>([
  {
    key: '/home',
    icon: () => h(HomeOutlined),
    label: '首页',
    title: '首页',
  },
  {
    key: '/incomeAndExpenses',
    icon: () => h(UnorderedListOutlined),
    label: '收支',
    title: '我的页面',
    children:[
      {
        label: '收入',
        icon: () => h(DollarOutlined),
        key: '/income'
      },
      {
        label: '支出',
        icon: () => h(MoneyCollectOutlined),
        key: '/expense',
      }
    ]
  },
  {
    key: '/family-members',
    icon: () => h(UserOutlined),
    label: '成员',
    title: '成员列表',
  }
])

// 路由变化 更新导航选中状态
watch(
    () => route.path,
    (newPath) => {
      current.value = [newPath]
    },
    {
      immediate: true,
    }
)

const onMenuClick = ({ key }: { key: string }) => {
  router.push({ path: key })
}
</script>