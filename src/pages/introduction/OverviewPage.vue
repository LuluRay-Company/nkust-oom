<template>
  <q-page-container>
    <q-page class="about-container">
      <q-toolbar class="bg-grey-3 full-width">
        <q-btn flat @click="navigateTo()" class="text-bold" label="首頁" />
        <span class="separator">/</span>
        <q-btn
          flat
          @click="navigateTo('introduction')"
          class="text-bold"
          label="單位介紹"
        />
        <span class="separator">/</span>
        <q-btn
          flat
          @click="navigateTo('introduction/overview')"
          class="text-bold"
          label="關於本處"
        />
      </q-toolbar>
      <!-- 關於本處 Title -->
      <div class="about-title">
        <h4>關於本處</h4>
        <p>················</p>
      </div>

      <!-- 關於本處內容 -->
      <div class="about-list">
        <div class="about-item" v-for="(info, index) in aboutInfo" :key="index">
          <p>{{ info.description }}</p>
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

// 定義關於本處的資料
const aboutInfo = reactive([
  { description: "「經營管理處」之核心權責與具體作為：" },
  { description: "1.　核心權責：協助提升本校的經營管理績效。" },
  {
    description:
      "2.　具體作為：掌理本校重大工程之先期評估與規劃設計、資產之開發、營運空間與項目之活化。",
  },
]);

// 導航至指定路徑
const navigateTo = (route) => {
  if (route) {
    router.push(`/${route}`); // 使用絕對路徑，避免重複拼接
  } else {
    router.push("/");
  }
};
</script>

<style scoped>
.about-container {
  padding: 20px;
  width: 65%;
  margin: 0% auto;
}

.about-title {
  flex: 1;
  color: #343a40;
  font-weight: bold;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
}
.about-title h4 {
  margin-bottom: 5px;
  font-weight: bolder;
}

.about-title p {
  margin-top: 2px;
  font-weight: bolder;
}

.separator {
  margin: 0 10px;
  font-size: 16px;
  font-weight: bold;
  display: flex;
  align-items: center;
}

/* 關於本處區塊樣式 */
.about-list {
  padding: 20px;
  background: linear-gradient(135deg, #f0f0f0, #ffffff); /* 添加漸變背景 */
  border-radius: 15px; /* 增加圓角 */
  margin: 20px auto;
  width: 80%;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.15); /* 添加柔和陰影 */
  border: 1px solid #ddd; /* 添加邊框 */
}

.about-item {
  display: flex;
  justify-content: start;
  align-items: center;
  padding: 15px 0;
  font-size: 18px;
  transition: background-color 0.3s ease; /* 增加背景變化的過渡效果 */
}

.about-item:hover {
  background-color: #f9f9f9; /* 懸停時背景顏色變化 */
}

.about-item p {
  color: #343a40;
  margin: 0;
  line-height: 1.6; /* 調整行距，使文本更易讀 */
}

.about-item:not(:last-child) {
  border-bottom: 1px dashed #ccc; /* 非最後一個項目使用虛線分隔 */
}

@media (max-width: 768px) {
  .about-container {
    padding: 20px;
    width: 100%;
    margin: 0% auto;
  }
}
</style>
