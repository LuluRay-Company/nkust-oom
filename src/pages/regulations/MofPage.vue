<template>
  <q-page-container>
    <q-page class="law-container">
      <q-toolbar class="bg-grey-3 full-width">
        <q-btn flat @click="navigateTo()" class="text-bold" label="首頁" />
        <span class="separator">/</span>
        <q-btn
          flat
          @click="navigateTo('regulations')"
          class="text-bold"
          label="主管法規"
        />
        <span class="separator">/</span>
        <q-btn
          flat
          @click="navigateTo('regulations/mof')"
          class="text-bold"
          label="財政部"
        />
      </q-toolbar>

      <!--財政部 Title-->
      <div class="law-title">
        <h4>財政部</h4>
        <p>················</p>
      </div>

      <div class="law-list">
        <div
          class="law-item"
          v-for="(law, index) in paginatedLaws"
          :key="index"
        >
          <q-icon name="language" color="grey" style="margin-right: 20px" />

          <a :href="law.url" target="_blank">{{ law.id + 1 }}.{{ law.name }}</a>
          <div class="mof-date">{{ law.date }}</div>
        </div>
      </div>

      <!-- 分頁元件 -->
      <div class="pagination-container">
        <q-pagination
          v-model="currentPage"
          :max="totalPages"
          max-pages="5"
          boundary-numbers
          class="q-mt-lg"
          color="grey"
        />
      </div>
    </q-page>
  </q-page-container>
</template>

<script setup>
import { useRouter } from "vue-router";
import { reactive, computed, ref } from "vue";
import { QPagination } from "quasar";

// 使用 Vue Router 來進行導航
const router = useRouter();

// 定義法律資料
const laws = reactive(
  [
    {
      id: 0,
      date: "111.12.21",
      name: "促進民間參與公共建設法",
      url: "https://law-out.mof.gov.tw/LawContent.aspx?id=GL009096",
    },
    {
      id: 1,
      date: "112.06.20",
      name: "政府有償取得公共服務政策評估作業辦法",
      url: "https://law-out.mof.gov.tw/LawContent.aspx?id=GL011375",
    },
    {
      id: 2,
      date: "112.05.11",
      name: "促進民間參與公共建設案件履約爭議調解收費辦法",
      url: "https://law-out.mof.gov.tw/LawContent.aspx?id=GL011364",
    },
    {
      id: 3,
      date: "112.05.11",
      name: "促進民間參與公共建設案件履約爭議調解規則",
      url: "https://law-out.mof.gov.tw/LawContent.aspx?id=GL011363",
    },
    {
      id: 4,
      date: "112.05.11",
      name: "促進民間參與公共建設案件履約爭議調解會組織準則",
      url: "https://law-out.mof.gov.tw/LawContent.aspx?id=GL011362",
    },
    {
      id: 5,
      date: "112.03.22",
      name: "促進民間參與公共建設案件申請保證金收取及返還作業要點",
      url: "https://law-out.mof.gov.tw/LawContent.aspx?id=GL011345&kw=",
    },
    {
      id: 6,
      date: "111.08.11",
      name: "促進民間參與公共建設專業人員資格考試訓練發證管理及獎勵辦法",
      url: "https://law-out.mof.gov.tw/LawContent.aspx?id=GL010132",
    },
    {
      id: 7,
      date: "110.10.21",
      name: "民間自行規劃申請參與公共建設作業辦法",
      url: "https://law-out.mof.gov.tw/LawContent.aspx?id=GL010130",
    },
    {
      id: 8,
      date: "110.07.23",
      name: "民間參與公共建設甄審委員會組織及評審辦法",
      url: "https://law-out.mof.gov.tw/LawContent.aspx?id=GL009076",
    },
    {
      id: 9,
      date: "110.06.16",
      name: "促進民間參與公共建設法施行細則",
      url: "https://law-out.mof.gov.tw/LawContent.aspx?id=GL009077",
    },
    {
      id: 10,
      date: "109.05.07",
      name: "促進民間參與公共建設公有土地出租及設定地上權租金優惠辦法",
      url: "https://law-out.mof.gov.tw/LawContent.aspx?id=GL011327",
    },
    {
      id: 11,
      date: "108.06.10",
      name: "促進民間參與公共建設法之重大公共建設範圍",
      url: "https://law-out.mof.gov.tw/LawContent.aspx?id=GL010358",
    },
    {
      id: 12,
      date: "112.02.15",
      name: "民間參與公共建設金擘獎頒發作業要點",
      url: "https://law-out.mof.gov.tw/LawContent.aspx?id=GL009070",
    },
    {
      id: 13,
      date: "112.02.10",
      name: "財政部辦理促進民間參與公共建設案件督導及考核作業要點",
      url: "https://law-out.mof.gov.tw/LawContent.aspx?id=GL011047",
    },
    {
      id: 14,
      date: "111.11.29",
      name: "機關辦理民間參與公共建設案件資訊蒐集及獎勵金核發作業要點",
      url: "https://law-out.mof.gov.tw/LawContent.aspx?id=GL011281",
    },
  ]
    .sort((a, b) => {
      const toDate = (dateStr) => {
        const [year, month, day] = dateStr.split(".").map(Number);
        return new Date(year + 1911, month - 1, day); // 民國年轉西元年
      };
      return toDate(b.date) - toDate(a.date); // 按日期降序排序
    })
    .map((law, index) => ({ ...law, id: index })) // 重新分配 ID
);

// 定義每頁顯示的最大數量
const itemsPerPage = 10;

// 分頁的當前頁面
const currentPage = ref(1);

// 分頁計算總頁數
const totalPages = computed(() => Math.ceil(laws.length / itemsPerPage));

// 根據當前頁面計算要顯示的新聞資料
const paginatedLaws = computed(() => {
  const startIndex = (currentPage.value - 1) * itemsPerPage;
  return laws.slice(startIndex, startIndex + itemsPerPage);
});

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
.law-container {
  padding: 20px;
  width: 65%;
  margin: 0% auto;
}

.law-title {
  flex: 1;
  color: #343a40;
  font-weight: bold; /* 設置字體為粗體 */
  display: flex;
  flex-direction: column; /* 垂直排列元素 */
  justify-content: center; /* 垂直居中 */
  align-items: center; /* 水平居中 */
  text-align: center; /* 保證文本居中 */
}
.law-title h4 {
  margin-bottom: 5px; /* 調整 h4 底部的外邊距 */
  font-weight: bolder;
}

.law-title p {
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
.law-list {
  padding: 50px;
  background-color: white;
  border-radius: 10px;
  margin: 20px auto; /* 與上方區域保持一些間距 */
  width: 80%;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3); /* 陰影效果 */
  transition: all 0.3s ease;
}

.law-item {
  display: flex;
  justify-content: start;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid #e0e0e0;
  font-size: 20px;
}

.law-item a {
  color: #7d7d7d; /* 默認灰色 */
  text-decoration: none; /* 去掉下劃線 */
  transition: color 0.3s ease; /* 平滑過渡效果 */
}

.law-item a:hover {
  color: #003366; /* 鼠標懸停時的深藍色 */
}

.law-item:last-child {
  border-bottom: none;
}

.law-index {
  flex: 1;
  color: #343a40;
  font-size: 18px; /* 增加字體大小 */
  font-weight: bold; /* 設置字體為粗體 */
  display: flex;
  flex-direction: column; /* 垂直排列元素 */
  justify-content: center; /* 垂直居中 */
  text-align: left; /* 保證文本左對齊 */
}

/* 分頁容器樣式，讓分頁元件居中 */
.pagination-container {
  display: flex;
  justify-content: center; /* 水平居中 */
  margin-top: 20px; /* 與法律列表保持一些間距 */
}

.mof-date {
  margin-left: auto;
  color: #888;
  font-size: 14px;
}

@media (max-width: 768px) {
  .law-container {
    padding: 20px;
    width: 100%;
    margin: 0% auto;
  }
}
</style>
