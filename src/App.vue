<script setup lang="ts">
import MenuBar from "@/components/common/MenuBar.vue";
</script>

<template>
  <a-layout style="min-height: 100vh;">
    <!-- 固定顶部导航 -->
    <a-layout-header
        style="
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        z-index: 1000;
        display: flex;
        align-items: center;
        background: #ffffff;
      "
    >
      <div class="logo"></div>
      <MenuBar/>
    </a-layout-header>

    <!-- 内容区域 -->
    <a-layout-content
        style="
          position: fixed;
          /* Header 高度 */
          top: 64px;
          /* Footer 高度 */
          bottom: 48px;
          left: 0;
          right: 0;
          padding: 16px;
          overflow-y: auto;
          background: #f0f2f5;
        "
    >
      <router-view/>
    </a-layout-content>

    <a-layout-footer
        style="
         background: #ffffff;
         display: flex;
         align-items: center;
         justify-content: center;
         /** fixed 相对于浏览器窗口定位 **/
         position: fixed;
         bottom: 0;
         left: 0;
         width: 100%;
      "
    >
      © 2024 FinanceHub. All rights reserved.
    </a-layout-footer>
  </a-layout>
</template>

<style scoped>
.logo {
  width: 120px;
  height: 31px;
  margin-right: 24px;
  background: rgba(255, 255, 255, 0.3);
}
</style>