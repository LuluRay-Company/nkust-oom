<template>
  <q-page-container>
    <q-page class="contact-container">
      <q-toolbar class="bg-grey-3 full-width">
        <q-btn flat @click="navigateTo()" class="text-bold" label="首頁" />
        <span class="separator">/</span>
        <q-btn
          flat
          @click="navigateTo('contact')"
          class="text-bold"
          label="聯絡我們"
        />
      </q-toolbar>

      <!-- 聯絡我們 Title -->
      <div class="contact-title">
        <h4>聯絡我們</h4>
        <p>················</p>
      </div>

      <!-- 每個區塊一個卡片 -->
      <q-card class="q-ma-md q-pa-md card-container">
        <q-card-section>
          <h5 class="main-title">國立高雄科技大學 經營管理處</h5>
          <ul>
            <li>校區位置：楠梓校區 行政大樓三樓1309、1310</li>
            <li>地址：811213 高雄市楠梓區海專路142號</li>
            <li>電話：07-3617141 分機 22101、22114</li>
            <li>
              E-mail：<a
                href="mailto:eroffice01@nkust.edu.tw"
                class="email-link"
                >eroffice01@nkust.edu.tw</a
              >
            </li>
          </ul>
        </q-card-section>
      </q-card>

      <q-card class="q-ma-md q-pa-md card-container">
        <q-card-section>
          <h6 class="sub-title">規劃評估組</h6>
          <ul>
            <li>電話：</li>
            <li>E-mail：</li>
          </ul>
        </q-card-section>
      </q-card>

      <q-card class="q-ma-md q-pa-md card-container">
        <q-card-section>
          <h6 class="sub-title">開發活化組</h6>
          <ul>
            <li>電話：</li>
            <li>E-mail：</li>
          </ul>
        </q-card-section>
      </q-card>
    </q-page>
  </q-page-container>
</template>

<script setup>
import { useRouter } from "vue-router";

// 使用 Vue Router 進行導航
const router = useRouter();

const navigateTo = (route) => {
  if (route) {
    router.push(route);
  } else {
    router.push("/");
  }
};
</script>

<style scoped>
.contact-container {
  padding: 20px;
  width: 65%;
  margin: 0% auto;
}

.contact-title {
  flex: 1;
  color: #343a40;
  font-weight: bold; /* 設置字體為粗體 */
  display: flex;
  flex-direction: column; /* 垂直排列元素 */
  justify-content: center; /* 垂直居中 */
  align-items: center; /* 水平居中 */
  text-align: center; /* 保證文本居中 */
}
.contact-title h4 {
  margin-bottom: 5px; /* 調整 h4 底部的外邊距 */
  font-weight: bolder;
}

.contact-title p {
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

.card-container {
  border-radius: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3); /* 添加卡片的陰影效果 */
  background-color: white; /* 卡片背景色 */
  margin-bottom: 20px; /* 每張卡片的底部間距 */
}

/* 標題樣式 */
.main-title {
  font-size: 30px;
  color: #003366;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.2); /* 輕微的陰影讓文字更突出 */
  border-bottom: 3px solid #003366;
  padding-bottom: 5px;
  margin-bottom: 10px;
}

.sub-title {
  font-size: 25px;
  color: #005580;
  margin-bottom: 5px;
  border-left: 5px solid #005580;
  padding-left: 10px; /* 增加邊距讓文字不貼邊 */
}

/* 列表樣式 */
ul {
  list-style: none;
  padding: 0;
  margin: 10px 0;
}

li {
  font-size: 18px;
  color: #555;
  margin: 5px 0;
}

/* 郵件鏈接樣式 */
.email-link {
  color: #005580;
  font-weight: bold;
  text-decoration: none;
  word-break: break-word; /* 長文字斷行 */
}

.email-link:hover {
  text-decoration: underline;
  color: #003366;
}

@media (max-width: 768px) {
  .contact-container {
    padding: 20px;
    width: 100%;
    margin: 0% auto;
  }
}
</style>
