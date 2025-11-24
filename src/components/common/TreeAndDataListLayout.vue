<template>
  <div class="two-col-layout">
    <div class="left-area">
      <slot name="tree"></slot>
    </div>

    <div class="right-area">

      <!-- 搜索栏插槽 -->
      <div class="search-bar">
        <slot name="search"></slot>
      </div>
      <!-- 列表区域 -->
      <div class="content-area">
        <slot name="data-list"></slot>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
</script>
<style scoped>
.two-col-layout {
  display: flex;
  gap: 16px;
  width: 100%;
  height: calc(100vh - 64px - 60px); /* 去掉 header + footer */
  overflow: hidden;
}

/* 左侧树 */
.left-area {
  width: 260px;
  background: #fff;
  padding: 8px;
  border: 1px solid #f0f0f0;
  border-radius: 4px;
  overflow-y: auto;
}

/* 右侧区域 */
.right-area {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

/* 搜索栏始终保持固定高度 */
.search-bar {
  background: #fff;
  padding: 12px;
  border: 1px solid #f0f0f0;
  border-radius: 4px;
  margin-bottom: 12px;
}

/* 列表内容可滚动 */
.content-area {
  flex: 1;
  overflow-y: auto;
  background: #fff;
  padding: 16px;
  border: 1px solid #f0f0f0;
  border-radius: 4px;
}
</style>