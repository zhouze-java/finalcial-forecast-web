<template>
  <tree-and-data-list-layout>
    <template #tree>
      <TypeTree type="expense" :list-func="getIncomeTypeList" :delete-func="deleteIncomeType"/>
    </template>

    <template #data-list>
      <DataList />
    </template>
  </tree-and-data-list-layout>
</template>

<script setup lang="ts">
import TypeTree from '@/components/incomeAndExpenditure/TypeTree.vue';
import {deleteIncomeType, getIncomeTypeList} from "@/api/incomeAndExpenditure/IncomeApi";
import DataList from "@/components/incomeAndExpenditure/DataList.vue";
import TreeAndDataListLayout from "@/components/common/TreeAndDataListLayout.vue";
</script>


<!--
  要点:
    1. 给组件传入一个函数, 可以让组件决定使用不同的数据源
-->