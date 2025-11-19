<template>
  <a-list
      :grid="{ gutter: 16, xs: 1, sm: 2, md: 2, lg: 2, xl: 2, xxl: 2 }"
      :data-source="displayList"
  >
    <template #renderItem="{ item }">
      <a-list-item>
        <!-- cursor 是设置鼠标悬停展示什么, 手 还是 默认的 -->
        <a-card
            :ref="(el: any) => setCardRefs(el, item.id)"
            :item="item"
            :key="item.id"
            v-if="!item.isExtra"
            hoverable
            style="min-width: 300px; min-height: 150px; cursor: default"
        >
          <template #actions>
            <edit-outlined key="edit" @click="showSaveModal(item)" />
            <!-- 删除按钮加二次确认 -->
            <a-popconfirm
                title="确定要删除该成员吗？"
                ok-text="确定"
                cancel-text="取消"
                @confirm="() => onDelete(item)"
            >
              <delete-outlined
                  :style="{
                color: 'red',
                cursor: loadingMap[item.id] ? 'not-allowed' : 'pointer',
                opacity: loadingMap[item.id] ? 0.5 : 1
              }"
                  key="delete"
              />
            </a-popconfirm>
          </template>

          <a-card-meta>
            <template #avatar>
               <a-avatar v-if="item.avatar != null" :src="item.avatar"/>
              <a-avatar v-else src="https://joeschmoe.io/api/v1/random"/>
            </template>
            <template #title>
              {{ item.name }}
              <a-tag
                  :color="getRelationDisplay(item.relation).color"
                  style="margin-left: 8px"
              >
                {{ getRelationDisplay(item.relation).desc }}
              </a-tag>
            </template>
            <template #description>
              年龄: {{ item.age }}
            </template>
          </a-card-meta>
        </a-card>
        <!-- 追加卡片 -->
        <a-card
            v-else
            hoverable
            style="min-width: 300px; min-height: 150px; display:flex; align-items:center; justify-content:center; text-align:center;"
            @click="showSaveModal()"
        >
          <plus-outlined style="font-size: 24px; color: #999" @click="showSaveModal()"/>
        </a-card>
      </a-list-item>
    </template>
  </a-list>

  <FamilyMemberEditModal v-model:open="modalVisible" @close="modalVisible = false" @saved="handleSaved"
    :item="selectedMember || null"
  />
</template>

<script setup lang="ts">
import {onMounted, computed, ref, reactive} from 'vue';

import FamilyMemberEditModal from "@/components/FamilyMemberEditModal.vue";

import type {FamilyMember} from '@/api/family/familyMember'
import {getFamilyList, deleteFamilyMember} from '@/api/family/familyMember'
import {getRelationDisplay} from "@/enums/index.js";
import Disintegrate from "@/utils/Disintegrate";


// 初始数据
const data = ref<FamilyMember[]>([])

type FamilyMemberWithExtra = Partial<FamilyMember> & { isExtra?: boolean }
const addCardMember: FamilyMemberWithExtra = { id: 0, isExtra: true }

const displayList = computed(() => [...(data.value || []), addCardMember])

// 调用列表查询接口
async function fetchData() {
  try {
    data.value = await getFamilyList()
  } catch (e) {
    console.error(e)
    // 错误提示已经在 request 拦截器里统一处理
  }
}

// 组件加载完之后执行的
onMounted(() => {
  fetchData()
})

// 用 reactive 包装对象, 点了删除就把 id 放进来,防止重复点击, reactive的作用是响应式的, 对象的属性变化会被 Vue 追踪, 当loadingMap[item.id]改变的时候, 按钮的 cursor 和 opacity 会自动更新
const loadingMap = reactive<Record<number, boolean>>({})

// 点击删除事件
async function onDelete(item: FamilyMember) {
  // 避免重复点击
  if (loadingMap[item.id!]) return
  loadingMap[item.id!] = true

  // 获取当前卡片 DOM
  const cardDom = cardRefs.value.get(item.id!)
  if (!cardDom) {
    loadingMap[item.id!] = false
    return
  }

  try {
    // 调用接口删除数据
    await deleteFamilyMember(item.id!)

    // 执行动画
    await Disintegrate.apply(cardDom, {
      duration: 1,
      callback: () => {
        // 动画结束后只删除当前卡片数据，不刷新整个列表
        data.value = data.value.filter(d => d.id !== item.id)
        cardRefs.value.delete(item.id!)
        loadingMap[item.id!] = false
      }
    })
  } catch (e) {
    console.error(e)
    loadingMap[item.id!] = false
  }
}

// 使用对象存储每个卡片DOM
const cardRefs = ref<Map<number, HTMLElement>>(new Map())

// 获取到每个卡片的 dom
const setCardRefs = (el: any, id: number) => {
  if (el) {
    // 如果是组件实例，取 $el；否则直接使用
    const dom = el.$el || el
    cardRefs.value.set(id, dom as HTMLElement)
  } else {
    // 组件卸载时清理
    cardRefs.value.delete(id)
  }
};


// 新增 / 编辑
const modalVisible = ref(false)
// 被选中的详情成员
const selectedMember = ref<FamilyMember | null>(null)
const showSaveModal = (member = null) => {
  selectedMember.value = member
  modalVisible.value = true
}


// 监听编辑模态框的提交成功事件
function handleSaved() {
  fetchData()
}

</script>

<script lang="ts">
import {DeleteOutlined, EditOutlined, PlusOutlined} from "@ant-design/icons-vue";

export default {
  components: {EditOutlined, DeleteOutlined, PlusOutlined},
}
</script>
