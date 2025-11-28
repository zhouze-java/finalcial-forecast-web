<template>
  <tree-and-data-list-layout>
    <template #tree>
      <TypeTree type="income" :list-func="getIncomeTypeList" :delete-func="deleteIncomeType"
                @selected="handleSelected"/>
    </template>

    <template #search>
      <SearchBar @searchBarSubmit="searchBarSubmit"/>
    </template>

    <template #data-list>
      <DataList :columns="columns" :list-func="getRecordList" :delete-func="deleteRecord" :type-id="selectedKey"
                :tree-type="treeType" :search-bar-form="searchBarFormRef"/>
    </template>
  </tree-and-data-list-layout>
</template>

<script setup lang="ts">
import TypeTree from '@/components/incomeAndExpenditure/TypeTree.vue';
import {deleteIncomeType, deleteRecord, getIncomeTypeList, getRecordList} from "@/api/incomeAndExpenditure/IncomeApi";
import DataList from "@/components/incomeAndExpenditure/DataList.vue";
import TreeAndDataListLayout from "@/components/common/TreeAndDataListLayout.vue";
import type {TableColumnsType} from "ant-design-vue";
import {cycleEnum} from "@/enums/IncomeAndExpenditure/CycleEnum";
import {ref} from "vue";
import SearchBar, {FormState} from "@/components/incomeAndExpenditure/SearchBar.vue";

// tree 里选中的类型
const selectedKey = ref<number | string | null>(null);
const treeType = ref<'income' | 'expense'>('income');

function handleSelected(key: number | string, type: 'income' | 'expense') {
  if (!key || key === 'root') {
    key = null
  }
  selectedKey.value = key;
  treeType.value = type;
}

const columns: TableColumnsType = [
  {title: '描述', dataIndex: 'description'},
  {title: '收入类型', dataIndex: 'incomeTypeName'},
  {title: '成员', dataIndex: 'memberName'},
  {title: '周期', dataIndex: 'cycle', customRender: ({text}) => (text && cycleEnum[text]) || '-'},
  {title: '金额', dataIndex: 'amount'},
  {title: '开始时间', dataIndex: 'startDate'},
  {title: '结束时间', dataIndex: 'endDate'},
  {title: '增长率', dataIndex: 'growthRate', customRender: ({text}) => text != null && text != 0 ? `${text}%` : '-'},
  {
    title: '年化收益率',
    dataIndex: 'annualRate',
    customRender: ({text}) => text != null && text != 0 ? `${text}%` : '-'
  },
  {
    title: '操作',
    key: 'operation',
    fixed: 'right',
    width: 100,
  },
];

const searchBarFormRef = ref<FormState | null>(null);
function searchBarSubmit(searchBarForm: FormState) {
  searchBarFormRef.value = searchBarForm;
}

</script>


<!--
  要点:
    1. 给组件传入一个函数, 可以让组件决定使用不同的数据源
-->