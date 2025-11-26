<template>

  <tree-and-data-list-layout>
    <template #tree>
      <TypeTree type="expense" :list-func="getExpenseTypeList" :delete-func="deleteExpenseType"
                @selected="handleSelected"/>
    </template>

    <template #data-list>
      <DataList :columns="columns" :list-func="getRecordList" :delete-func="deleteRecord" :tree-type="treeType"
                :type-id="selectedKey"/>
    </template>
  </tree-and-data-list-layout>
</template>

<script setup lang="ts">
import TypeTree from '@/components/incomeAndExpenditure/TypeTree.vue';
import {
  deleteExpenseType,
  getExpenseTypeList,
  getRecordList,
  deleteRecord
} from "@/api/incomeAndExpenditure/ExpenseApi";
import DataList from "@/components/incomeAndExpenditure/DataList.vue";
import TreeAndDataListLayout from "@/components/common/TreeAndDataListLayout.vue";
import type {TableColumnsType} from "ant-design-vue";
import {cycleEnum} from "@/enums/IncomeAndExpenditure/CycleEnum";
import {ref} from 'vue'

// tree 里选中的类型
const selectedKey = ref<number | string | null>(null);
const treeType = ref<'income' | 'expense'>('expense');

function handleSelected(key: number | string, type: 'income' | 'expense') {
  if (!key || key === 'root') {
    key = null
  }
  selectedKey.value = key;
  treeType.value = type;
}


const columns: TableColumnsType = [
  {title: '描述', dataIndex: 'description'},
  {title: '支出类型', dataIndex: 'expenseTypeName'},
  {title: '成员', dataIndex: 'memberName'},
  {title: '周期', dataIndex: 'cycle', customRender: ({text}) => (text && cycleEnum[text]) || '-'},
  {title: '金额', dataIndex: 'amount'},
  {title: '开始时间', dataIndex: 'startDate'},
  {title: '结束时间', dataIndex: 'endDate'},
  {title: '增长率', dataIndex: 'growthRate', customRender: ({text}) => text != null && text != 0 ? `${text}%` : '-'},
  {
    title: '操作',
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