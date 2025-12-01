<template>
  <div class="two-col-layout">
    <div class="left-area">
      <slot name="tree" ></slot>
    </div>

    <div class="right-area">

      <!-- 搜索栏插槽 -->
      <div class="search-bar">
        <slot name="search"></slot>
        <!-- 新增按钮插槽 -->
        <div class="button-wrapper">
          <slot name="actions"></slot>
        </div>
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
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #fff;
  padding: 12px;
  border: 1px solid #f0f0f0;
  border-radius: 4px;
  margin-bottom: 12px;
}

.search-bar ::v-deep(slot[name="search"]) {
  flex: 1; /* 搜索栏占满左边剩余空间 */
  margin-right: 16px; /* 给按钮留空隙 */
}

.search-bar ::v-deep(slot[name="actions"]) {
  flex-shrink: 0; /* 按钮不缩小 */
}


/* 按钮包裹容器 */
.button-wrapper {
  flex-shrink: 0;
  margin-right: 18px; /* 控制按钮离右边的距离 */
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