<template>
  <TypeTree type="expense" :list-func="getExpenseTypeList" :delete-func="deleteExpenseType" />
</template>

<script setup lang="ts">
import TypeTree from '@/components/incomeAndExpenditure/TypeTree.vue';
import {deleteExpenseType, getExpenseTypeList} from "@/api/incomeAndExpenditure/ExpenseApi";
</script>


<!--
  要点:
    1. 给组件传入一个函数, 可以让组件决定使用不同的数据源
-->