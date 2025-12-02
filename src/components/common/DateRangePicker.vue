<template>
  <a-range-picker
      v-model:value="pickerValue"
      format="YYYY-MM-DD"
      @change="onChange"
  />
</template>

<script lang="ts" setup>

import {ref, watch} from 'vue'
import dayjs, {Dayjs} from 'dayjs'

interface Props {
  timeRange?: (string | number | null)[]
}

const props = defineProps<Props>()
const emit = defineEmits<{
  (e: 'update:timeRange', value: number[]): void
}>()

const pickerValue = ref<Dayjs[]>([])

// 初始化回显
watch(
    () => props.timeRange,
    val => {
      if (Array.isArray(val) && val.length === 2) {
        pickerValue.value = (val?.filter(Boolean) || []).map(v =>
            typeof v === 'number' ? dayjs(v) : dayjs(v, 'YYYY-MM-DD')
        )
      } else {
        pickerValue.value = []
      }
    },
    {immediate: true}
)

// 选择变化
function onChange(dates: Dayjs[] | null) {
  if (!dates || dates.length !== 2) {
    emit('update:timeRange', [])
    return
  }
  const startTimestamp = dates[0].startOf('day').valueOf();
  const endTimestamp = dates[1].endOf('day').valueOf();
  emit('update:timeRange', [
    startTimestamp,
    endTimestamp
  ])
}
</script>