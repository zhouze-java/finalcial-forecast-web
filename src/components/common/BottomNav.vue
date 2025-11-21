<template>
  <a-layout-footer
      style="
      position: fixed;
      bottom: 0;
      width: 100%;
      height: 60px;
      padding: 0;
      display: flex;
      justify-content: space-around;
      align-items: center;
      background: #fff;
      border-top: 1px solid #f0f0f0;
      z-index: 999;
    "
  >
    <div
        class="bottom-nav-item"
        @click="goHome"
    >
      <home-outlined class="icon" />
      <span class="label">首页</span>
    </div>
    <div
        class="bottom-nav-item"
        @click="goMembers"
    >
      <user-outlined class="icon" />
      <span class="label">成员</span>
    </div>
    <div
        class="bottom-nav-item"
        @click="goProfile"
    >
      <profile-outlined class="icon" />
      <span class="label">我的</span>
    </div>
  </a-layout-footer>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { HomeOutlined, UserOutlined, ProfileOutlined } from '@ant-design/icons-vue'

const router = useRouter()
const goHome = () => router.push('/')
const goMembers = () => router.push('/family-members')
const goProfile = () => router.push('/profile')
</script>

<style scoped>
.bottom-nav-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  width: 60px;
  height: 100%;
  transition: background 0.2s;
  border-radius: 8px; /* 可选圆角 */
}

.bottom-nav-item:hover {
  /* 自定义 hover 效果，代替 a-button 默认阴影 */
  background: rgba(0, 0, 0, 0.05);
}

.bottom-nav-item .icon {
  font-size: 20px;
}

.bottom-nav-item .label {
  font-size: 12px;
  margin-top: 4px;
}
</style>