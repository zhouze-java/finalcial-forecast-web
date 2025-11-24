<template>
  <tree-and-data-list-layout>
    <template #tree>
      <TypeTree type="expense" :list-func="getIncomeTypeList" :delete-func="deleteIncomeType"/>
    </template>

    <template #data-list>
      <DataList :columns="columns"/>
    </template>
  </tree-and-data-list-layout>
</template>

<script setup lang="ts">
import TypeTree from '@/components/incomeAndExpenditure/TypeTree.vue';
import {deleteIncomeType, getIncomeTypeList} from "@/api/incomeAndExpenditure/IncomeApi";
import DataList from "@/components/incomeAndExpenditure/DataList.vue";
import TreeAndDataListLayout from "@/components/common/TreeAndDataListLayout.vue";
import type {TableColumnsType} from "ant-design-vue";


const columns: TableColumnsType = [
  { title: 'Full Name', width: 100, dataIndex: 'name', key: 'name', fixed: 'left' },
  { title: 'Age', width: 100, dataIndex: 'age', key: 'age', fixed: 'left' },
  { title: 'Column 1', dataIndex: 'address', key: '1' },
  { title: 'Column 2', dataIndex: 'address', key: '2' },
  { title: 'Column 3', dataIndex: 'address', key: '3' },
  { title: 'Column 4', dataIndex: 'address', key: '4' },
  { title: 'Column 5', dataIndex: 'address', key: '5' },
  { title: 'Column 6', dataIndex: 'address', key: '6' },
  { title: 'Column 7', dataIndex: 'address', key: '7' },
  { title: 'Column 8', dataIndex: 'address', key: '8' },
  {
    title: 'Action',
    key: 'operation',
    fixed: 'right',
    width: 100,
  },
];


</script>


<!--
  要点:
    1. 给组件传入一个函数, 可以让组件决定使用不同的数据源
-->