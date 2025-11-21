<template>
  <TypeTree type="expense" :api-func="getExpenseTypeList" />
</template>

<script setup lang="ts">
import TypeTree from '@/components/IncomeAndExpenditure/TypeTree.vue';
import {getExpenseTypeList} from "@/api/incomeAndExpenditure/ExpenseApi";
</script>


<!--
  要点:
    1. 给组件传入一个函数, 可以让组件决定使用不同的数据源
-->