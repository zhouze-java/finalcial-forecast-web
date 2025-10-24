<template>
  <div class="min-h-screen bg-white dark:bg-background">

    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- KPI Cards -->
      <div class="mb-8">
        <KPICards />
      </div>

      <!-- Charts -->
      <div class="mb-8">
        <Charts />
      </div>

      <!-- Transactions Table -->
      <div>
        <TransactionsTable />
      </div>
    </main>

    <!-- Footer -->
    <footer class="border-t border-border mt-12">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 class="font-semibold text-foreground mb-4">产品</h3>
            <ul class="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" class="hover:text-primary transition-colors">财务报表</a></li>
              <li><a href="#" class="hover:text-primary transition-colors">数据分析</a></li>
              <li><a href="#" class="hover:text-primary transition-colors">预算管理</a></li>
            </ul>
          </div>
          <div>
            <h3 class="font-semibold text-foreground mb-4">公司</h3>
            <ul class="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" class="hover:text-primary transition-colors">关于我们</a></li>
              <li><a href="#" class="hover:text-primary transition-colors">博客</a></li>
              <li><a href="#" class="hover:text-primary transition-colors">联系我们</a></li>
            </ul>
          </div>
          <div>
            <h3 class="font-semibold text-foreground mb-4">法律</h3>
            <ul class="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" class="hover:text-primary transition-colors">隐私政策</a></li>
              <li><a href="#" class="hover:text-primary transition-colors">服务条款</a></li>
              <li><a href="#" class="hover:text-primary transition-colors">Cookie设置</a></li>
            </ul>
          </div>
        </div>
        <div class="border-t border-border pt-8">
          <p class="text-center text-sm text-muted-foreground">&copy; 2024 FinanceHub. All rights reserved.</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped>
</style>
