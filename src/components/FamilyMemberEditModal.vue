<template>
  <a-modal
      v-model:open="visible"
      :title="formFamilyMember.id ? '编辑成员' : '新增成员'"
      @ok="handleSubmit"
      @cancel="handleCancel"
      :confirmLoading="submitting"
      width="600px"
  >
    <a-form
        ref="formRef"
        :model="formFamilyMember"
        :label-col="{ span: 6 }"
        :wrapper-col="{ span: 16 }"
    >
      <a-form-item
          label="姓名"
          name="name"
          :rules="[{ required: true, message: '请输入姓名' }]"
      >
        <a-input v-model:value="formFamilyMember.name" placeholder="请输入姓名" />
      </a-form-item>

      <a-form-item
          label="年龄"
          name="age"
          :rules="[{ required: true, message: '请输入年龄' }]"
      >
        <a-input-number
            v-model:value="formFamilyMember.age"
            :min="0"
            :max="150"
            placeholder="请输入年龄"
            style="width: 100%"
        />
      </a-form-item>

      <a-form-item
          label="关系"
          name="relation"
          :rules="[{ required: true, message: '请选择关系' }]"
      >
        <a-select v-model:value="formFamilyMember.relation" placeholder="请选择关系">
          <a-select-option value="father">父亲</a-select-option>
          <a-select-option value="mother">母亲</a-select-option>
          <a-select-option value="brother">兄弟</a-select-option>
          <a-select-option value="sister">姐妹</a-select-option>
          <a-select-option value="spouse">配偶</a-select-option>
          <a-select-option value="child">子女</a-select-option>
        </a-select>
      </a-form-item>

      <a-form-item label="头像" name="avatar">
        <a-input v-model:value="formFamilyMember.avatar" placeholder="请输入头像 URL" />
        <a-avatar
            v-if="formFamilyMember.avatar"
            :src="formFamilyMember.avatar"
            :size="64"
            style="margin-top: 8px"
        />
      </a-form-item>
    </a-form>
  </a-modal>
</template>


<script setup lang="ts">
import {onMounted, ref, watch} from 'vue'
import {getFamilyMemberById} from "@/api/family/familyMember";
import type {FamilyMember} from "@/api/family/familyMember";

// 定义一个参数, 接收父组件传过来的值, item 是名称, 后面的是元数据. 类型/是否为空
const props = defineProps<{
  open: boolean
  item?: FamilyMember | null
}>()

const visible = ref(props.open);
watch(
    () => ,
    (val) => {
      visible.value = val
    }
)


// 表单数据
const formFamilyMember = ref<FamilyMember>({
  avatar: "",
  name: "",
  age: 0,
  relation: "",
  hasIncome: false,
  hasExpense: false,
});
// 当父组件传来的 item 变化时，更新表单
watch(
    () => props.item,
    async (val) => {
      console.log("val", val);
      console.log("val", visible.value);
      // 根据id 调用详情页
      if (val && 'id' in val && val.id !== 0) {
        formFamilyMember.value = await getFamilyMemberById(val.id!);
      }
    },
    { immediate: true }
)

const emit = defineEmits<{
  (e: 'update:open', value: boolean): void
}>()

// 取消事件
function handleCancel() {
  visible.value = false
  // 通知父组件关闭
  emit('update:open', false)
}

</script>