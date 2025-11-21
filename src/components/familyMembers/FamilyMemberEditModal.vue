<template>
  <a-modal
      v-model:open="visible"
      :title="formFamilyMember.id ? '编辑成员' : '新增成员'"
      @ok="handleSubmit(formFamilyMember)"
      @cancel="handleCancel"
      :confirmLoading="submitting"
      width="400px"
  >
    <a-form
        ref="formRef"
        :model="formFamilyMember"
        :label-col="{ span: 6 }"
        :wrapper-col="{ span: 16 }"
    >
      <a-form-item label="头像" name="avatar">
        <a-popover
          trigger="click"
          v-model:open="avatarPopoverVisible"
          placement="bottom"
        >
          <template #content>
            <div
                style="
      display: flex;
      flex-wrap: wrap;
      gap: 12px;
      align-items: center;
      max-width: 300px;
    "
            >
              <a-avatar
                  v-for="(avatar, index) in defaultAvatars"
                  :key="index"
                  :src="avatar"
                  :size="48"
                  style="cursor: pointer;"
                  @click="selectAvatar(avatar)"
              />
              <a-upload
                  show-upload-list={false}
                  :before-upload="beforeUpload"
                  :custom-request="handleUpload"
                  style="width: 48px; height: 48px; display: flex; align-items: center; justify-content: center; cursor: pointer;"
              >
                <a-avatar :size="48">
                  <UploadOutlined />
                </a-avatar>
              </a-upload>
            </div>
          </template>
          <a-avatar
            :src="formFamilyMember.avatar"
            :size="64"
            style="cursor: pointer;"
            @click="avatarPopoverVisible = true"
          />
        </a-popover>
      </a-form-item>

      <a-form-item
          label="姓名"
          name="name"
          :rules="[{ required: true, message: '请输入姓名' }]"
      >
        <a-input v-model:value="formFamilyMember.name" :maxlength=50  placeholder="请输入姓名" />
      </a-form-item>

      <a-form-item
          label="年龄"
          name="age"
          :rules="[{ required: true, message: '请输入年龄' }]"
      >
        <a-input-number
            v-model:value="formFamilyMember.age"
            :min="1"
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

        <a-radio-group v-model:value="formFamilyMember.relation">
          <a-radio-button
              v-for="(info, key) in FamilyMemberRelationMap"
              :key="key"
              :value="key"
          >
            {{ info.desc }}
          </a-radio-button>
        </a-radio-group>
      </a-form-item>

      <a-form-item label="是否有收入" name="hasIncome">
        <a-checkbox v-model:checked="formFamilyMember.hasIncome" >
          有收入
        </a-checkbox>
      </a-form-item>

    </a-form>
  </a-modal>
</template>


<script setup lang="ts">
import {ref, watch} from 'vue'
import type {FamilyMemberApi} from "@/api/family/familyMemberApi";
import {addFamilyMember, getFamilyMemberById, updateFamilyMember} from "@/api/family/familyMemberApi";
import {FamilyMemberRelationMap} from "@/enums/family/FamilyMemberEnum";
import {UploadOutlined} from "@ant-design/icons-vue"


// 定义一个参数, 接收父组件传过来的值, item 是名称, 后面的是元数据. 类型/是否为空
const props = defineProps<{
  open: boolean
  item?: FamilyMemberApi | null
}>()

const visible = ref(props.open);
watch(
    () => props.open,
    (val) => {
      visible.value = val
    }
)

// 新增默认表单对象工厂函数
function createDefaultFormFamilyMember(): FamilyMemberApi {
  return {
    avatar: "",
    name: "",
    age: 1,
    relation: "",
    hasIncome: false,
    hasExpense: false,
  }
}

// 表单数据
const formFamilyMember = ref<FamilyMemberApi>(createDefaultFormFamilyMember());

// 默认头像数组
const defaultAvatars = [
  "https://api.dicebear.com/9.x/adventurer/svg?seed=Leo\n",
  "https://api.dicebear.com/9.x/adventurer/svg?seed=Kimberly\n",
  "https://api.dicebear.com/9.x/adventurer/svg?seed=Brooklynn",
  "https://api.dicebear.com/9.x/adventurer/svg?seed=Easton",
  "https://api.dicebear.com/9.x/adventurer/svg?seed=Emery",
  "https://api.dicebear.com/9.x/adventurer/svg?seed=Jude",
  "https://api.dicebear.com/9.x/adventurer/svg?seed=George",
]

// 当父组件传来的 item 变化时，更新表单
watch(visible, async (val) => {
  if (val) {
    if (props.item && 'id' in props.item && props.item.id !== 0) {
      formFamilyMember.value = await getFamilyMemberById(props.item.id!);
    } else {
      formFamilyMember.value = createDefaultFormFamilyMember();
    }
    formRef.value?.resetFields();
  }
})

const emit = defineEmits<{
  (e: 'update:open', value: boolean): void
  (e: 'saved'): void
}>()

// 取消事件
function handleCancel() {
  // 重置表单内容
  formFamilyMember.value = createDefaultFormFamilyMember();

  // 重置表单验证状态
  formRef.value?.resetFields();

  visible.value = false
  // 通知父组件关闭
  emit('update:open', false)
}

// 表单实例, 拿到表单 ref
const formRef = ref<any>(null)

// 提交事件
const submitting = ref(false)
async function handleSubmit(formFamilyMember: FamilyMemberApi){
  submitting.value = true;
  // 表单校验
  try {
    // 组件提供的校验方法
     await formRef.value?.validate()
    if (formFamilyMember.id) {
      // 更新
      await updateFamilyMember(formFamilyMember.id, formFamilyMember);
    } else {
      // 新增
      await addFamilyMember(formFamilyMember)
    }
    visible.value = false
    emit('update:open', false)

    // 通知父组件刷新列表
    emit('saved')

  } finally {
    submitting.value = false
  }
}

// 上传前校验，限制图片大小和类型
function beforeUpload(file: File) {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    // @ts-ignore
    window.$message.error('只能上传 JPG/PNG 格式的图片!');
    return false;
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    // @ts-ignore
    window.$message.error('图片大小不能超过 2MB!');
    return false;
  }
  return true;
}

// 自定义上传请求
function handleUpload({ file, onSuccess }: any) {
  // 模拟上传过程，实际项目中这里调用上传接口
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => {
    formFamilyMember.value.avatar = reader.result as string;
    avatarPopoverVisible.value = false;
    onSuccess("ok");
  };
}

// 头像气泡框
const avatarPopoverVisible = ref(false);
function selectAvatar(avatar: string) {
  formFamilyMember.value.avatar = avatar;
  avatarPopoverVisible.value = false;
}


</script>