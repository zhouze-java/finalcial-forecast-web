<template>
  <a-form
      :model="searchBarForm"
      name="basic"
      labelAlign="left"
      layout="inline"
      :wrapper-col="{ span: 16 }"
      autocomplete="off"
      @finish="onFinish"
      @finishFailed="onFinishFailed"
  >
    <a-form-item label="描述" name="description">
      <a-input v-model:value="searchBarForm.description" placeholder="请输入描述"/>
    </a-form-item>

    <a-form-item label="成员" name="memberId">
      <a-select
          v-model:value="searchBarForm.memberId"
          show-search
          placeholder="选择成员"
          style="width: 200px"
          :options="options"
          :filter-option="filterOption"
          allow-clear
      ></a-select>
    </a-form-item>

    <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
      <a-button type="primary" html-type="submit">查询</a-button>
    </a-form-item>

    <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
      <a-button type="primary" @click="onCreateButton">新建</a-button>
    </a-form-item>
  </a-form>

  <EditModal v-model:visible="visible"  :id="null"/>
</template>

<script lang="ts" setup>
import {onMounted, reactive, ref} from 'vue';
import type {SelectProps} from 'ant-design-vue';
import {getFamilyList} from "@/api/family/familyMemberApi";
import EditModal from "@/components/incomeAndExpenditure/EditModal.vue";


const emit =defineEmits<{
  (e: 'searchBarSubmit', searchBarForm: FormState): void;
}>()

export interface FormState {
  description: string;
  memberId?: number;
}

const searchBarForm = reactive<FormState>({
  description: '',
  memberId: null
});


const onFinish = (values: FormState) => {
  emit("searchBarSubmit", values);
};

const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo);
};


// 选择框的
const options = ref<SelectProps['options']>([]);

onMounted(() => {
  fetchOptionsData()
})

async function fetchOptionsData() {

  options.value = (await getFamilyList())
      .map(it => {
        return {
          value: it.id,
          label: it.name,
        }
      })
}

/**
 * 下拉框筛选
 * @param input 用户输入的内容
 * @param option 选项
 */
function filterOption(input: string, option: any) {
  return option.label.toLowerCase().includes(input.toLowerCase());
}


const visible = ref(false);
function onCreateButton(){
  visible.value = true
}
</script>