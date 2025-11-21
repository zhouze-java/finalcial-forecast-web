<template>
  <div>
    <a-tree
        :show-line="showLine"
        :show-icon="showIcon"
        :tree-data="treeData"
        :expanded-keys="expandedKeys"
        @select="onSelect"
    >
      <template #title="{ dataRef }">
        <div style="position: relative; display: inline-block; width: 100%;">
          <!-- 节点文字 -->
          <a-tooltip :title="dataRef.description">
            <span class="node-title-text">{{ dataRef.title }}</span>
          </a-tooltip>
          <!-- 根节点悬浮显示新增按钮，独立于节点 hover区域 -->
          <div v-if="dataRef.key === 'root'" class="node-add-btn-wrapper">
            <PlusCircleOutlined class="node-add-btn" @click.stop="handleAdd(dataRef)" />
          </div>

          <!-- 其他节点展示删除 -->
          <div v-if="dataRef.key !== 'root'" class="node-edit-btn-wrapper">
            <span><EditOutlined  class="node-add-btn" @click.stop="handleAdd(dataRef)" /></span>
            <span><MinusCircleOutlined class="node-add-btn" @click.stop="handleAdd(dataRef)" /></span>
          </div>
        </div>
      </template>
    </a-tree>
  </div>
</template>


<script lang="ts" setup>
import {onMounted, ref} from 'vue';
import type {TreeProps} from 'ant-design-vue';
import {getIncomeTypeList} from "@/api/income/IncomeApi";
import {MinusCircleOutlined, PlusCircleOutlined, EditOutlined} from "@ant-design/icons-vue";

// 不展示层级线, 不展示icon
const showLine = ref<boolean>(false);
const showIcon = ref<boolean>(false);

const treeData = ref<TreeProps['treeData']>([]);
const expandedKeys = ref<string[]>([])

// 组件加载完之后执行的
onMounted(() => {
  fetchData()

  // 展开
  expandedKeys.value = ['root']
})

async function fetchData() {
  const res = await getIncomeTypeList()
  // 假设接口返回的数据结构为数组 [{ id, name }]
  treeData.value = [
    {
      title: '收入类型',
      key: 'root',
      children: res.map((item: any) => ({
        title: item.name,
        key: item.id,
        description: item.description || '暂无描述'
      }))
    }
  ]
}

const onSelect: TreeProps['onSelect'] = (selectedKeys, info) => {
  console.log('selected', selectedKeys, info);
};

function handleAdd(node: any) {
  console.log('新增节点', node);
}
</script>

<style scoped>
.node-add-btn-wrapper {
  position: absolute;
  right: -20px; /* 独立偏移，脱离节点hover */
  top: 50%;
  transform: translateY(-50%);
  opacity: 0;
  transition: opacity 0.2s;
  pointer-events: auto;
}

.node-edit-btn-wrapper {
  position: absolute;
  right: -40px; /* 独立偏移，脱离节点hover */
  top: 50%;
  transform: translateY(-50%);
  opacity: 0;
  transition: opacity 0.2s;
  pointer-events: auto;
}

.node-title-text:hover + .node-edit-btn-wrapper {
  opacity: 1;
}

.node-title-text:hover + .node-add-btn-wrapper {
  opacity: 1;
}
.node-add-btn-wrapper:hover {
  opacity: 1;
}

.node-edit-btn-wrapper:hover {
  opacity: 1;
}

.node-edit-btn-wrapper span + span {
  margin-left: 5px; /* 两个按钮之间 8px */
}
</style>