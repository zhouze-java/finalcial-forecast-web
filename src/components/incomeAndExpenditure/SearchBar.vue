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
      <a-input v-model:value="searchBarForm.description"/>
    </a-form-item>

    <a-form-item label="成员" name="memberId">
      <a-select
          v-model:value="value"
          show-search
          placeholder="选择成员"
          style="width: 200px"
          :options="options"
          :filter-option="filterOption"
          @focus="handleFocus"
          @blur="handleBlur"
          @change="handleChange"
      ></a-select>
    </a-form-item>

    <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
      <a-button type="primary" html-type="submit">查询</a-button>
    </a-form-item>
  </a-form>
</template>

<script lang="ts" setup>
import {onMounted, reactive} from 'vue';
import type {SelectProps} from 'ant-design-vue';
import {ref} from 'vue';
import {getFamilyList} from "@/api/family/familyMemberApi";
import {FamilyMemberResponse} from "@/api/family/dto/response/FamilyMemberResponse";


interface FormState {
  description: string;
  memberId?: number;
}

const searchBarForm = reactive<FormState>({
  description: '',
  memberId: null
});

const onFinish = (values: any) => {
  console.log('Success:', values);
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
</script>