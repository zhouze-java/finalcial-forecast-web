<template>

  <tree-and-data-list-layout>
    <template #tree>
      <TypeTree type="expense" :list-func="getExpenseTypeList" :delete-func="deleteExpenseType"
                @selected="handleSelected"/>
    </template>

    <template #search>
      <search-bar @searchBarSubmit="searchBarSubmit"/>
    </template>

    <template #actions>
      <a-button type="primary" @click="onCreate">新建</a-button>
    </template>

    <template #data-list>
      <DataList :columns="columns"
                :list-func="getRecordList"
                :delete-func="deleteRecord"
                :tree-type="treeType"
                :type-id="selectedKey"
                :search-bar-form="searchBarFormRef"
                @edit="onEdit"
                :refresh-data="refreshData"
      />
    </template>

  </tree-and-data-list-layout>
  <EditDrawer v-if="visible"
              v-model:visible="visible"
              :id="editId"
              type="expense"
              :detail-func="getExpenseRecordDetail"
              :type-list-func="getExpenseTypeList"
              :save-func="saveRecord"
              @drawerClosed="drawerClosed"
              @saved="drawerSaved"
  />
</template>

<script setup lang="ts">
import TypeTree from '@/components/incomeAndExpenditure/TypeTree.vue';
import {
  deleteExpenseType,
  getExpenseTypeList,
  getRecordList,
  deleteRecord, getRecordDetail, updateRecord, createRecord
} from "@/api/incomeAndExpenditure/ExpenseApi";
import DataList from "@/components/incomeAndExpenditure/DataList.vue";
import TreeAndDataListLayout from "@/components/common/TreeAndDataListLayout.vue";
import type {TableColumnsType} from "ant-design-vue";
import {cycleEnum} from "@/enums/IncomeAndExpenditure/CycleEnum";
import {ref} from 'vue'
import SearchBar, {FormState} from "@/components/incomeAndExpenditure/SearchBar.vue";
import EditDrawer from "@/components/incomeAndExpenditure/EditDrawer.vue";
import {ExpenseRecordSaveRequest} from "@/api/incomeAndExpenditure/dto/request/ExpenseRequest";

// tree 里选中的类型
const selectedKey = ref<number | string | null>(null);
const treeType = ref<'income' | 'expense'>('expense');

function handleSelected(key: number | string | null, type: 'income' | 'expense') {
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
    width: 111,
  },
];

const searchBarFormRef = ref<FormState | null>(null);

function searchBarSubmit(searchBarForm: FormState) {
  searchBarFormRef.value = searchBarForm;
}

const visible = ref(false);

function onCreate() {
  visible.value = true
}


const editId = ref<number | null>(null);

function onEdit(id: number) {
  visible.value = true
  editId.value = id
}

function drawerClosed() {
  editId.value = null;
}

async function getExpenseRecordDetail(id: number) {
  const res = await getRecordDetail(id)
  return {
    ...res,
    typeId: res.expenseTypeId,
  };
}

async function saveRecord(data: any) {
  const payload: ExpenseRecordSaveRequest = {
    description: data.description,
    amount: data.amount,
    expenseTypeId: data.typeId,
    memberId: data.memberId,
    startDate: data.startDate,
    endDate: data.endDate,
    growthRate: data.growthRate,
  }
  if (data.id) {
    await updateRecord(data.id, payload)
  } else {
    await createRecord(payload)
  }
}


const refreshData = ref(0)
function drawerSaved(){
  visible.value = false
  editId.value = null;

  // 通知DataList刷新列表
  refreshData.value += 1;
}

</script>


<!--
  要点:
    1. 给组件传入一个函数, 可以让组件决定使用不同的数据源
-->