<template>
  <a-drawer
      :title="detailInfo.id ? '编辑':'新建'"
      :width="720"
      :open="visible"
      :body-style="{ paddingBottom: '80px' }"
      :footer-style="{ textAlign: 'right' }"
      @close="onClose"
  >

    <template #extra>
      <a-button style="margin-right: 8px" @click="onClose">Cancel</a-button>
      <a-button type="primary" @click="onSubmit" :loading="submitting" >Submit</a-button>
    </template>

    <a-form
        :model="detailInfo"
        :label-col="{ span: 3 }"
        :wrapper-col="{ span: 20 }"
        ref="formRef"
    >
      <a-form-item label="描述" name="description"
                   :rules="[{required: true, message: '请输入描述' }]"
      >
        <a-input v-model:value="detailInfo.description" placeholder="请输入描述" :maxlength=200 />
      </a-form-item>

      <a-form-item label="成员" name="memberId"
                   :rules="[{required:true, message: '请选择成员'}]"
      >
        <a-select
            v-model:value="detailInfo.memberId"
            show-search
            placeholder="选择成员"
            style="width: 200px"
            :options="familyMemberOptions"
            :filter-option="filterMemberOption"
            allow-clear
            @mousedown.prevent
            @click.stop
        ></a-select>
      </a-form-item>

      <a-form-item label="类型" name="typeId"
                   :rules="[{required:true, message: '请选择类型'}]"
      >
        <a-select
            v-model:value="detailInfo.typeId"
            show-search
            placeholder="选择类型"
            style="width: 200px"
            :options="typeOptions"
            :filter-option="filterTypeOption"
            allow-clear
            @mousedown.prevent
            @click.stop
        ></a-select>
      </a-form-item>

      <a-form-item label="周期">
        <a-input :value="detailInfo.cycle" disabled></a-input>
      </a-form-item>

      <a-form-item label="金额" name="amount"
                   :rules="[{required:true, message: '请输入金额'}]"
      >
        <a-input-number placeholder="输入金额" v-model:value="detailInfo.amount"/>
      </a-form-item>

      <a-form-item label="时间"
                   name="timeRange"
                   :rules="[{required:true, validator: validateTimeRange}]"
      >
        <DateRangePicker :timeRange="[detailInfo.startDate,detailInfo.endDate]"
                         @update:timeRange="value => {
                           detailInfo.startDate = value[0]
                           detailInfo.endDate = value[1]
                         }"

        ></DateRangePicker>
      </a-form-item>
      <a-form-item label="增长率" name="growthRate">
        <a-input-number placeholder="增长率" v-model:value="detailInfo.growthRate"
                        addonAfter="%"
        />
      </a-form-item>

      <a-form-item v-if="props.type === 'income'" label="年化率" name="annualRate">
        <a-input-number placeholder="年化率" v-model:value="detailInfo.annualRate"
                        addonAfter="%"
        />
      </a-form-item>

    </a-form>
  </a-drawer>

</template>

<script setup lang="ts">

import {onMounted, ref, watch} from "vue";
import {getFamilyList} from "@/api/family/familyMemberApi";
import type {SelectProps} from "ant-design-vue";
import {cycleEnum} from "@/enums/IncomeAndExpenditure/CycleEnum";
import DateRangePicker from "@/components/common/DateRangePicker.vue";
import dayjs from "dayjs";

const emit = defineEmits<{
  (e: 'update:visible', value: boolean): void,
  (e: 'drawerClosed'): void
  (e: 'saved'): void
}
>()

const props = defineProps<{
  id: number | null,
  visible: boolean,
  type: 'income' | 'expense',
  detailFunc: (id: number) => Promise<any>,
  typeListFunc: () => Promise<any[]>,
  saveFunc: (data: any) => Promise<any>
}>()

const visible = ref(props.visible);
watch(
    () => props.visible,
    (val) => {
      visible.value = val
    }
)


const detailInfo = ref<any>(defaultDetailInfo())

function defaultDetailInfo() {
  return {
    id: null,
    description: null,
    memberId: null,
    amount: null,
    growthRate: null,
    annualRate: null,
    typeId: null,
    cycle: null,
    startDate: null,
    endDate: null,
  }
}

function onClose() {
  emit('update:visible', false);
  emit('drawerClosed');
  formRef.value?.resetFields();
}

// 选择框
const familyMemberOptions = ref<SelectProps['options']>([]);
const typeOptions = ref<SelectProps['options']>([])
onMounted(() => {

  initDetailInfo();

  fetchFamilyOptions();
  fetchTypeOptions();
})

async function initDetailInfo() {

  if (!props.id) {
    return
  }
  detailInfo.value = await props.detailFunc(props.id)
}

async function fetchTypeOptions() {
  typeOptions.value = (await props.typeListFunc())
      .map(it => {
        return {
          label: it.name,
          value: it.id,
          cycle: it.defaultCycle,
        }
      })
}

async function fetchFamilyOptions() {
  familyMemberOptions.value = (await getFamilyList())
      .map(it => {
            return {
              label: it.name,
              value: it.id,
            }
          }
      )
}

function filterMemberOption(input: string, option: any) {
  return option.label.toLowerCase().includes(input.toLowerCase());
}

function filterTypeOption(input: string, option: any) {
  return option.label.toLowerCase().includes(input.toLowerCase());
}

watch(
    () => detailInfo.value.typeId,
    (val) => {
      if (!val) {
        detailInfo.value.cycle = null;
        return;
      }

      const type = typeOptions.value?.find(it => it.value === val);
      if (!type) {
        detailInfo.value.cycle = null;
        return;
      }

      const enumItem = cycleEnum[type.cycle];
      detailInfo.value.cycle = enumItem ? enumItem : null;

    }
)

// 提交
const submitting = ref(false);
const formRef = ref<any>(null)
async function onSubmit() {

  if (!formRef.value) {
    return;
  }
  submitting.value = true;

  try {
    // 表单校验
    await formRef.value?.validate();
  } catch (e){
    submitting.value = false;
    return;
  }

  try {
    // 时间戳转换
    const start = detailInfo.value.startDate ? dayjs(detailInfo.value.startDate).startOf('day').valueOf() : null
    const end = detailInfo.value.endDate ? dayjs(detailInfo.value.endDate).endOf('day').valueOf() : null

    detailInfo.value.startDate = start
    detailInfo.value.endDate = end

    await props.saveFunc(detailInfo.value)

    // 通知父组件保存完成
    emit('saved')
  }finally {
    submitting.value = false;
  }
}


function validateTimeRange(){
  if (!detailInfo.value.startDate || !detailInfo.value.endDate) {
    return Promise.reject("请选择时间");
  }
  return Promise.resolve();
}
</script>
