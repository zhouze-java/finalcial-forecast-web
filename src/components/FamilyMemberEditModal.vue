<template>
  <a-modal
      v-model:open="visible"
      :title="formData.id ? '编辑成员' : '新增成员'"
      @ok="handleSubmit"
      @cancel="handleCancel"
      :confirmLoading="submitting"
      width="600px"
  >
    <a-form
        ref="formRef"
        :model="formData"
        :label-col="{ span: 6 }"
        :wrapper-col="{ span: 16 }"
    >
      <a-form-item
          label="姓名"
          name="name"
          :rules="[{ required: true, message: '请输入姓名' }]"
      >
        <a-input v-model:value="formData.name" placeholder="请输入姓名" />
      </a-form-item>

      <a-form-item
          label="年龄"
          name="age"
          :rules="[{ required: true, message: '请输入年龄' }]"
      >
        <a-input-number
            v-model:value="formData.age"
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
        <a-select v-model:value="formData.relation" placeholder="请选择关系">
          <a-select-option value="father">父亲</a-select-option>
          <a-select-option value="mother">母亲</a-select-option>
          <a-select-option value="brother">兄弟</a-select-option>
          <a-select-option value="sister">姐妹</a-select-option>
          <a-select-option value="spouse">配偶</a-select-option>
          <a-select-option value="child">子女</a-select-option>
        </a-select>
      </a-form-item>

      <a-form-item label="头像" name="avatar">
        <a-input v-model:value="formData.avatar" placeholder="请输入头像 URL" />
        <a-avatar
            v-if="formData.avatar"
            :src="formData.avatar"
            :size="64"
            style="margin-top: 8px"
        />
      </a-form-item>
    </a-form>
  </a-modal>
</template>