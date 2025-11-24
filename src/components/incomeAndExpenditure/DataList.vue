<template>
  <a-table :columns="props.columns" :data-source="data" :scroll="{ x: 1300, y: 1000 }">
    <template #bodyCell="{ column }">
      <template v-if="column.key === 'operation'">
        <a>action</a>
      </template>
    </template>
  </a-table>
</template>


<script lang="ts" setup>
import type { TableColumnsType } from 'ant-design-vue';

const props = defineProps<{
  listFunc: () => Promise<DataItem[]>,
  deleteFunc: (id: number) => Promise<void>,
  columns: TableColumnsType,
}>()

interface DataItem {
  key: string;
  name: string;
  age: number;
  address: string;
}

const data: DataItem[] = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York Park',
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 40,
    address: 'London Park',
  },
];
</script>



<style scoped>

</style>