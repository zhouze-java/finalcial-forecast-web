<template>
  <a-modal
      v-model:open="visible"
      :title="typeItem.id ? '编辑类型' : '新增类型'"
      @ok="handleSubmit"
      @cancel="handleCancel"
      :confirmLoading="submitting"
      width="500px"
  >
    <a-form
        ref="formRef"
        :model="typeItem"
        :label-col="{ span: 6 }"
        :wrapper-col="{ span: 16 }"
    >
      <a-form-item
          label="名称"
          name="name"
          :rules="[{ required: true, message: '请输入类型名称' }]"
      >
        <a-input v-model:value="typeItem.name" :maxlength=50 placeholder="请输入类型名称"/>
      </a-form-item>

      <a-form-item
          label="描述"
          name="description"
          :rules="[{ required: false }]"
      >
        <a-input v-model:value="typeItem.description" :maxlength=50 placeholder="请输入描述"/>
      </a-form-item>

      <a-form-item
          label="周期"
          name="defaultCycle"
          :rules="[{ required: true, message: '请选择周期' }]"
      >
        <a-radio-group v-model:value="typeItem.defaultCycle">
          <a-radio-button
              v-for="(label,key) in cycleEnum"
              :key="key"
              :value="key"
          >
            {{ label }}
          </a-radio-button>
        </a-radio-group>
      </a-form-item>

      <a-form-item label="设置">
        <div style="display: flex; gap: 16px;">
          <a-checkbox v-model:checked="typeItem.allowsGrowth">增长率</a-checkbox>
          <a-checkbox v-model:checked="typeItem.allowsAnnualRate" :disabled="props.type ==='expense'">
            年化收益率
          </a-checkbox>
        </div>
      </a-form-item>
    </a-form>
  </a-modal>
</template>


<script setup lang="ts">

import {cycleEnum} from "@/enums/IncomeAndExpenditure/CycleEnum";
import {ref, watch} from "vue";
import {BaseTypeResponse} from "@/api/incomeAndExpenditure/dto/response/BaseTypeResponse";

const props = defineProps<{
  type: 'income' | 'expense',
  api: {
    fetchDetail: (id: number) => Promise<BaseTypeResponse>
    create: (data: any) => Promise<any>,
    update: (id: number, data: any) => Promise<any>
  },
  visible: boolean,
  id: number | null,
}>();

// 表单实例
const formRef = ref<any>(null)

const typeItem = ref<BaseTypeResponse>(defaultEmptyItem());

function defaultEmptyItem() {
  return {

    name: '',
    description: '',
    defaultCycle: '',
    allowsGrowth: false,
  };
}

const visible = ref(props.visible);
watch(
    () => props.visible,
    (val) => {
      visible.value = val;
    }
);

watch(visible, async (val) => {
  if (val) {
    if (props.id) {
      typeItem.value = await props.api.fetchDetail(props.id);
    } else {
      typeItem.value = defaultEmptyItem();
    }
  }
});

function handleCancel() {
  typeItem.value = defaultEmptyItem();
  formRef.value?.resetFields();
  visible.value = false;

  // 通知父组件关闭
  emit('update:visible', false)
}

const submitting = ref(false)

async function handleSubmit() {
  submitting.value = true;

  try {
    // 表单校验
    await formRef.value?.validate();
  }catch (e) {
    submitting.value = false;
    return;
  }

  try {
    if (!typeItem.value.id) {
      await props.api.create(typeItem.value);
    } else {
      await props.api.update(typeItem.value.id!, typeItem.value);
    }

    visible.value = false;

    // 通知父组件关闭
    emit('update:visible', false)
    // 通知父组件刷新列表
    emit('saved')

  }finally {
    submitting.value = false;
  }

}

const emit = defineEmits<{
  (e: 'update:visible', value: boolean): void
  (e: 'saved'): void
}>()
</script>

<style scoped>

</style>