<template>
  <a-modal v-model:open="visible"
           :title="detailInfo.id ? '编辑':'新建'"
           :confirm-loading="submitting"
           @cancel="handleCancel"
           width="40%"
  >
    <a-form
        :model="detailInfo"
    >
      <a-form-item label="描述" name="description"
                   :rules="[{required: true, message: '请输入描述' }]"
      >
        <a-input v-model="detailInfo.description" placeholder="请输入描述" :maxlength=200 />
      </a-form-item>



    </a-form>

  </a-modal>
</template>

<script setup lang="ts">

import {ref, watch} from "vue";
import {BaseDetailResponse} from "@/api/incomeAndExpenditure/dto/response/BaseDetailResponse";

const emit = defineEmits<{
  (e: 'update:visible', value: boolean): void}
>()

const props = defineProps<{
  id?: number,
  visible: boolean,
}>()

const visible = ref(props.visible);
watch(
    () => props.visible,
    (val) => {
      console.log(props.id);
      visible.value = val
    }
)

const submitting = ref(false);

const detailInfo = ref<BaseDetailResponse>(defaultDetailInfo())

function defaultDetailInfo() {
  return {}
}

function handleCancel() {
  emit('update:visible', false);
}


</script>
