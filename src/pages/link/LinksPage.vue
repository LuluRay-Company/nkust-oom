<template>
  <q-page-container>
    <q-page class="link-container">
      <q-toolbar class="bg-grey-3 full-width">
        <q-btn flat @click="navigateTo()" class="text-bold" label="首頁" />
        <span class="separator">/</span>
        <q-btn
          flat
          @click="navigateTo('links')"
          class="text-bold"
          label="相關連結"
        />
      </q-toolbar>

      <!--相關連結 Title-->
      <div class="link-title">
        <h4>相關連結</h4>
        <p>················</p>
      </div>

      <div class="link-list">
        <div class="link-item" v-for="(link, index) in links" :key="index">
          <q-icon name="language" color="grey" style="margin-right: 20px" />

          <a :href="link.url" target="_blank">{{ link.name }}</a>
        </div>
      </div>
    </q-page>
  </q-page-container>
</template>

<script setup>
import { reactive } from "vue";
import { useRouter } from "vue-router";

// 使用 Vue Router 來進行導航
const router = useRouter();

// 定義連結資料
const links = reactive([
  {
    name: "財政部促進民間參與公共建設資訊網",
    url: "https://ppp.mof.gov.tw/www/index.aspx",
  },
  { name: "Google", url: "https://www.google.com/" },
  { name: "Youtube", url: "https://www.youtube.com/" },
]);

// 導航至指定路徑
const navigateTo = (route) => {
  if (route) {
    router.push(route);
  } else {
    router.push("/");
  }
};
</script>

<style scoped>
.link-container {
  padding: 20px;
  width: 65%;
  margin: 0% auto;
}

.link-title {
  flex: 1;
  color: #343a40;
  font-weight: bold; /* 設置字體為粗體 */
  display: flex;
  flex-direction: column; /* 垂直排列元素 */
  justify-content: center; /* 垂直居中 */
  align-items: center; /* 水平居中 */
  text-align: center; /* 保證文本居中 */
}
.link-title h4 {
  margin-bottom: 5px; /* 調整 h4 底部的外邊距 */
  font-weight: bolder;
}

.link-title p {
  margin-top: 2px; /* 調整 p 元素的頂部外邊距 */
  font-weight: bolder;
}

.separator {
  margin: 0 10px;
  font-size: 16px;
  font-weight: bold;
  display: flex;
  align-items: center; /* 確保 / 符號和按鈕對齊 */
}

/* 連結區塊樣式 */
.link-list {
  padding: 50px;
  background-color: white;
  border-radius: 10px;
  margin: 20px auto; /* 與上方區域保持一些間距 */
  width: 80%;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3); /* 陰影效果 */
  transition: all 0.3s ease;
}

.link-item {
  display: flex;
  justify-content: start;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid #e0e0e0;
  font-size: 20px;
}

.link-item a {
  color: #7d7d7d; /* 默認灰色 */
  text-decoration: none; /* 去掉下劃線 */
  transition: color 0.3s ease; /* 平滑過渡效果 */
}

.link-item a:hover {
  color: #003366; /* 鼠標懸停時的深藍色 */
}

.link-item:last-child {
  border-bottom: none;
}

.link-index {
  flex: 1;
  color: #343a40;
  font-size: 18px; /* 增加字體大小 */
  font-weight: bold; /* 設置字體為粗體 */
  display: flex;
  flex-direction: column; /* 垂直排列元素 */
  justify-content: center; /* 垂直居中 */
  text-align: left; /* 保證文本左對齊 */
}

@media (max-width: 768px) {
  .link-container {
    padding: 20px;
    width: 100%;
    margin: 0% auto;
  }
}
</style>
