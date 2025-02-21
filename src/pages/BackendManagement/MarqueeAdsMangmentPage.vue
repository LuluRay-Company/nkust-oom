<template>
  <q-page-container>
    <q-page class="marquee-ads-management-container">
      <q-toolbar class="bg-grey-3">
        <q-btn flat @click="navigateTo('/dashboard')" class="text-bold" label="後台系統" />
        <span class="separator">/</span>
        <q-btn
          flat
          @click="navigateTo('marqueeAds')"
          class="text-bold"
          label="跑馬燈管理"
        />
      </q-toolbar>
      <h1>跑馬燈管理</h1>
    </q-page>
  </q-page-container>
</template> 

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

// 使用 Vue Router 來進行導航
const router = useRouter();

// 導航至指定路徑
const navigateTo = (route) => {
  if (route) {
    router.push(route);
  } else {
    router.push("/");
  }
};

// 定義最新消息的響應式變量
const news = ref([]);
</script>

<style scoped>
.marquee-ads-management-container {
  padding: 20px;
}

.bg-grey-3 {
  width: 65%;
  margin: 0% auto;
}

.separator {
  margin: 0 10px;
  font-size: 16px;
  font-weight: bold;
  display: flex;
  align-items: center; /* 確保 / 符號和按鈕對齊 */
}

@media (max-width: 768px) {
  .bg-grey-3 {
    padding: 20px;
    width: 100%;
    margin: 0% auto;
    height: 50px;
  }
}
</style>
