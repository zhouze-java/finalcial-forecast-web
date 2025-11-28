<template>
  <a-table
      :columns="props.columns"
      :data-source="data"
      :scroll="{ x: 1300, y: 1000 }"
      :pagination="pagination"
      :loading="loading"
      @change="handleTableChange"
  >
    <template #bodyCell="{ column }">
      <template v-if="column.key === 'operation'">
        <a>删除</a>
      </template>
    </template>
  </a-table>
</template>


<script lang="ts" setup>
import type {TableColumnsType, TablePaginationConfig} from 'ant-design-vue';
import {onMounted, ref, watch} from "vue";
import {DefaultPageResponse} from "@/api/common/DefaultPageResponse";
import {BaseListResponse} from "@/api/incomeAndExpenditure/dto/response/BaseListResponse";
import {BasePageQueryRequest} from "@/api/common/BasePageQueryRequest";
import {FormState} from "@/components/incomeAndExpenditure/SearchBar.vue";

const props = defineProps<{
  listFunc: (param: BasePageQueryRequest) => Promise<DefaultPageResponse<BaseListResponse>>,
  deleteFunc: (id: number) => Promise<void>,
  columns: TableColumnsType,
  typeId: number | null,
  treeType: 'income' | 'expense',
  searchBarForm: FormState | null,
}>()


const data = ref<BaseListResponse[]>([]);
const loading = ref(false);

const pagination = ref({
  current: 1,
  pageSize: 10,
  total: 0,
  showTotal: (total: number) => `共 ${total} 条`
});


// 组件加载完之后执行的
onMounted(() => {
  fetchData()
})

watch([()=>props.typeId,() => props.treeType], ()=>{
  pagination.value.current = 1
  fetchData()
})

watch(() => props.searchBarForm, ()=>{
  fetchData()
})

function handleTableChange(
    paginationConfig: TablePaginationConfig
) {
  pagination.value.current = paginationConfig.current || 1 ;
  pagination.value.pageSize = paginationConfig.pageSize || 10 ;

  fetchData()
}

async function fetchData() {
  loading.value = true;

  const params = {
    current: pagination.value.current,
    pageSize: pagination.value.pageSize,
  }

  if (props.typeId) {
    if (props.treeType === 'income') {
      Object.assign(params, {incomeTypeId: props.typeId});
    } else if (props.treeType === 'expense') {
      Object.assign(params, {expenseTypeId: props.typeId});
    }
  }

  if (props.searchBarForm) {
    Object.keys(props.searchBarForm).forEach(key => {
      const value = props.searchBarForm[key];
      if (value !== null && value !== undefined && value !== '') {
        params[key] = value;
      }
    })
  }

  const res = await props.listFunc(params);

  data.value = res.records
  pagination.value.total = res.total || 0;

  loading.value = false;
}

</script>



<style scoped>

</style>