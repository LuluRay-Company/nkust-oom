<template>
  <div class="news-container">
    <div class="news-title">
      <h4>最新消息</h4>
      <p>················</p>
    </div>
    <!-- 最新消息區域 -->
    <div class="news-list">
      <router-link
        :to="{
          name: 'news-detail',
          params: { id: item.id },
          query: { page: currentPage },
        }"
        v-for="(item, index) in paginatedNews"
        :key="index"
        class="news-item-link"
      >
        <div class="news-item">
          <div class="news-photo">
            <img
              :src="getImageUrl(item.photo)"
              alt="News Image"
              class="news-image"
            />
          </div>
          <div class="news-index">{{ item.id }}.{{ item.title }}</div>
          <div class="news-date">{{ item.date }}</div>
        </div>
      </router-link>
    </div>
    <!-- 分頁元件 -->
    <div class="pagination-container">
      <q-pagination
        v-model="currentPage"
        :max="totalPages"
        max-pages="10"
        boundary-numbers
        class="q-mt-lg"
        color="grey"
      />
    </div>
  </div>
</template>

<script setup>
import { reactive, computed, ref, watch } from "vue";
import { QPagination } from "quasar";
import { useRoute, useRouter } from "vue-router";

// 獲取路由和當前路由參數
const route = useRoute();
const router = useRouter();

// 當頁面加載時，如果 URL 中有 page 參數，設置為當前頁碼
const currentPage = ref(parseInt(route.query.page) || 1);

// 定義每頁顯示的最大數量
const itemsPerPage = 8;

// 定義 news 資料
// 模擬的新聞數據
const news = reactive([
  {
    id: 1,
    photo: "newszero.jpg",
    title:
      "【轉知】財政部為蒐集 114 年招商大會商機案源，請於時限內依附表格式提供114年7月至115年6月預計公告招商之民間參與公共建設案件，免備文以電子郵件送部，請查照。",
    date: "2024/11/21",
  },
  {
    id: 2,
    photo: "newszero.jpg",
    title:
      "【轉知】財政部函示促進民間參與公共建設法第3條第1項第1款「交通建設及共同管道」類別業經政策評估通過，機關得就該類別之個案採行政府有償取得公共服務模式辦理一案，轉請查照。",
    date: "2024/10/28",
  },
  {
    id: 3,
    photo: "newszero.jpg",
    title:
      "【轉知】財政部敬邀貴機關及專家學者踴躍投稿「促進民間參與公共建設電子報」，詳如原函說明，轉請查照。",
    date: "2024/10/11",
  },
  {
    id: 4,
    photo: "newszero.jpg",
    title: "【轉知】財政部檢送「中華民國112年度促參年報」，轉請查照。",
    date: "2024/08/14",
  },
  {
    id: 5,
    photo: "newszero.jpg",
    title:
      "【轉知】檢送113年版「民間自備私有土地興建、擁有及營運（B(R)OO）案招商文件（含甄審須知及投資契約）範本」1 份，請查照並轉知所屬。",
    date: "2024/08/08",
  },
  {
    id: 6,
    photo: "newszero.jpg",
    title:
      "【轉知】財政部自即日起至113年9月30日止，受理各機關申請補助 114年度促進民間參與公共建設案件（下稱促參案件）前 置作業費用，請查照。",
    date: "2024/08/08",
  },
  {
    id: 7,
    photo: "newszero.jpg",
    title:
      "【轉知】財政部訂定「促進民間參與公共建設案件全生命週期作業手冊」(下稱促參作業手冊)第三篇及第四篇，請查照並轉知 所屬機關(構)。",
    date: "2024/08/08",
  },
  {
    id: 8,
    photo: "newszero.jpg",
    title:
      "【轉知】檢送「財政部委託辦理促進民間參與公共建設專業人員訓練及考試作業須知」，詳如原函，轉請查照。",
    date: "2024/07/11",
  },
  {
    id: 9,
    photo: "newszero.jpg",
    title:
      "【轉知】財政部函示有關促參案件於核定可行性評估報告及先期計畫書後，於招商前遇規劃條件變動之作業程序一案，詳原函說明，轉請查照。",
    date: "2024/07/11",
  },
  {
    id: 10,
    photo: "newszero.jpg",
    title:
      "【轉知】財政部訂於113年8月14日假福爾摩沙遊艇酒店水景廳舉辦「促參執行機關主管研習會」，詳如原函說明，請視業務需求派員參加，請查照。",
    date: "2024/07/11",
  },
  {
    id: 11,
    photo: "newszero.jpg",
    title:
      "【轉知】修正「教育部辦理促進民間參與公共建設案件獎勵金支用原則」，名稱並修正為「教育部辦理民間參與公共建設案 件獎勵金支用原則」，並自即日生效，請查照。",
    date: "2024/07/02",
  },
  {
    id: 12,
    photo: "newszero.jpg",
    title:
      "【轉知】財政部檢送「促進民間參與公共建設案件財務評估指引」1份，轉請查照。",
    date: "2024/06/20",
  },
  {
    id: 13,
    photo: "newszero.jpg",
    title:
      "【轉知】財政部訂於113年7月31日(星期三)辦理「促參業務整合窗口主管研習會」，詳如原函說明，請視業務需求派員參加，請查照。",
    date: "2024/06/20",
  },
  {
    id: 14,
    photo: "newszero.jpg",
    title:
      "【轉知】財政部訂定「促進民間參與公共建設案件全生命週期作業手冊」第一篇及第二篇，轉請查照。",
    date: "2024/06/14",
  },
  {
    id: 15,
    photo: "newszero.jpg",
    title:
      "【轉知】檢送財政部113年版「主辦機關辦理有償新建、移轉及營運（BTO）案招商文件範本」及「新建、營運及移轉（BOT）案招商文件範本」，請查照。",
    date: "2024/06/12",
  },
  {
    id: 16,
    photo: "newszero.jpg",
    title:
      "【轉知】財政部函示辦理促參案件，於促進民間參與公共建設法、促參法施行細則暨其相關法令修正施行後，新舊法規適用原則，詳如原函說明，轉請查照。",
    date: "2024/05/28",
  },
  {
    id: 17,
    photo: "金擘獎徵選活動海報.jpg",
    title:
      "【轉知】財政部主辦第22屆民間參與公共建設金擘獎受理申請期限至113年5月31日，即將截止，請查照轉知並鼓勵參與案件之民間機構踴躍申請。",
    date: "2024/05/28",
  },
  {
    id: 18,
    photo: "newszero.jpg",
    title:
      "【轉知】財政部重申民間參與公共建設案件應依規定期限完成基本資訊登載及民間投資金額認定事宜，以避免發生未獲核發簽約獎勵金情事一案，詳原函說明，轉請查照。",
    date: "2024/05/14",
  },
  {
    id: 19,
    photo: "金擘獎徵選活動海報.jpg",
    title:
      "【轉知】第22屆民間參與公共建設金擘獎受理申請期限至113年5月 31日止，期限將屆，請協助轉知並提醒所屬機關（構）及 參與貴管公共建設案件之民間機構踴躍申請，請查照。",
    date: "2024/05/06",
  },
  {
    id: 20,
    photo: "newszero.jpg",
    title:
      "【轉知】函轉財政部「第22屆民間參與公共建設金擘獎徵選說明會及觀摩活動計畫」1份，並請依業務需要自行派員於113年4月8日前報名參加前開活動，請查照。",
    date: "2024/04/01",
  },
  {
    id: 21,
    photo: "newszero.jpg",
    title:
      "【轉知】財政部函為促進民間參與公共建設法第3條第1項第2款「環境污染防治設施」類別政策評估通過，主辦機關得就該類別之個案採行政府有償取得公共服務模式辦理一案，轉請查照。",
    date: "2024/03/29",
  },
  {
    id: 22,
    photo: "newszero.jpg",
    title:
      "【轉知】函轉財政部「第22屆民間參與公共建設金擘獎」申請作業手冊，請查照踴躍申請。",
    date: "2024/03/29",
  },
  {
    id: 23,
    photo: "newszero.jpg",
    title:
      "經營管理處自111年8月1日成立（任務編組），112年2月1日正式納入本校組織規程。",
    date: "2024/03/25",
  },
  {
    id: 24,
    photo: "newszero.jpg",
    title:
      "【轉知】修正「機關辦理民間參與公共建設案件資訊蒐集及獎勵金核發作業要點」(下稱本作業要點)，自即日生效。",
    date: "2024/03/18",
  },
  {
    id: 25,
    photo: "newszero.jpg",
    title:
      "【轉知】財政部修正「民間參與公共建設金擘獎頒發作業要點」，並自即日生效，轉請查照。",
    date: "2024/02/29",
  },
  {
    id: 26,
    photo: "newszero.jpg",
    title:
      "【轉知】「促進民間參與公共建設案件招商文件公開閱覽作業要點」，業經財政部訂定發布，轉請查照。",
    date: "2024/01/30",
  },
  {
    id: 27,
    photo: "newszero.jpg",
    title:
      "【轉知】修正「財政部辦理促進民間參與公共建設案件督導及考核作業要點」部分規定，並自即日生效，請查照並轉知所屬。",
    date: "2024/01/24",
  },
  {
    id: 28,
    photo: "newszero.jpg",
    title:
      "【轉知】修正「行政院促進民間參與公共建設推動小組設置要點」 第三點，並自即日生效，請查照。",
    date: "2023/11/15",
  },
  {
    id: 29,
    photo: "newszero.jpg",
    title:
      "【轉知】有關促進民間參與公共建設法（下稱促參法）施行細則第9條第2項第2款規定適用情形，詳如說明，請查照並轉知所屬。",
    date: "2023/10/20",
  },
  {
    id: 30,
    photo: "newszero.jpg",
    title:
      "【轉知】行政院公共工程委員會98年3月19日工程促字第09800114010號函，自即日起停止適用。",
    date: "2023/09/23",
  },
  {
    id: 31,
    photo: "newszero.jpg",
    title:
      "【轉知】財政部修正「促進民間參與公共建設法之重大公共建設範圍」，並自即日生效。",
    date: "2023/08/29",
  },
  {
    id: 32,
    photo: "newszero.jpg",
    title:
      "【轉知】有關「政府有償取得公共服務政策評估作業辦法」，經財政部112年6月20日台財促字第11225516260號令訂定發布",
    date: "2023/06/28",
  },
  {
    id: 33,
    photo: "newszero.jpg",
    title:
      "【活動轉知】財政部訂於112年6月8日辦理112年度促參教育訓練「履約管理與資產總檢查及優先定約班」",
    date: "2023/05/19",
  },
  {
    id: 34,
    photo: "newszero.jpg",
    title:
      "【轉知】財政部更正112年2月20日台財促字第11225504720號函附「促進民間參與公共建設履約爭議協調會作業指引」內容",
    date: "2023/05/19",
  },
  {
    id: 35,
    photo: "newszero.jpg",
    title:
      "【轉知】財政部訂定「促進民間參與公共建設案件履約爭議調解會組織準則」、「促進民間參與公共建設案件履約爭議調解規則」及「促進民間參與公共建設案件履約爭議調解收費辦法」",
    date: "2023/05/19",
  },
  {
    id: 36,
    photo: "newszero.jpg",
    title:
      "【轉知】財政部修正「民間參與公共建設申請及審核程序爭議處理規則」部分條文",
    date: "2023/05/08",
  },
  {
    id: 37,
    photo: "newszero.jpg",
    title:
      "【轉知】財政部函示辦理促進民間參與公共建設案件相關會議時，應審慎處 理委員出席會議相關費用領據資訊，避免個人資料外洩風險一案",
    date: "2023/04/26",
  },
  {
    id: 38,
    photo: "newszero.jpg",
    title: "【轉知】促進民間參與公共建設案件申請保證金收取及返還作業要點",
    date: "2023/03/27",
  },
  {
    id: 39,
    photo: "newszero.jpg",
    title: "【轉知】促進民間參與公共建設履約爭議協調會作業指引",
    date: "2023/02/24",
  },
  {
    id: 40,
    photo: "newszero.jpg",
    title:
      "【轉知】財政部「主辦機關辦理民間參與公共建設案件民間投資金額試算表」",
    date: "2023/02/23",
  },
  {
    id: 41,
    photo: "newszero.jpg",
    title: "【轉知】財政部修正「民間參與公共建設金擘獎頒獎作業要點」",
    date: "2023/02/21",
  },
  {
    id: 42,
    photo: "newszero.jpg",
    title:
      "【轉知】修正「財政部辦理促進民間參與公共建設案件督導及考核作業要點」",
    date: "2023/02/21",
  },
  {
    id: 43,
    photo: "newszero.jpg",
    title: "【轉知】教育部辦理促進民間參與公共建設案件獎勵金支用原則",
    date: "2023/02/14",
  },
  {
    id: 44,
    photo: "newszero.jpg",
    title: "【轉知】促進民間參與公共建設法部分條文修正案",
    date: "2023/02/14",
  },
  {
    id: 45,
    photo: "newszero.jpg",
    title:
      "【轉知】財政部補充說明該部113年5月20日台財促字第11325515680號函說明四，關於促參案件於履約期間遇促進民間參與公共建設法等相關法令修正時之處理原則，詳如原函，轉請查照。",
    date: "2024/12/12",
  },
  {
    id: 46,
    photo: "newszero.jpg",
    title:
      "【轉知】財政部訂於113年12月26日舉辦「兆元投資國家發展方案研習會」，檢送簡章及意見交流單各1份，即日起開放報名，得請相關業務同仁報名參加，請查照。",
    date: "2024/12/13",
  },
]);

// 按日期排序並重新賦予 ID 的新聞數據
const sortedNews = computed(() => {
  return [...news]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .map((item, index) => ({
      ...item,
      id: index + 1, // 動態生成新 ID，從 1 開始
    }));
});

// 根據當前頁面計算要顯示的新聞資料
const paginatedNews = computed(() => {
  const startIndex = (currentPage.value - 1) * itemsPerPage;
  return sortedNews.value.slice(startIndex, startIndex + itemsPerPage);
});
// 分頁計算總頁數
const totalPages = computed(() => Math.ceil(news.length / itemsPerPage));

// 當 currentPage 改變時更新 URL 中的 page 參數
watch(currentPage, (newPage) => {
  router.replace({ query: { page: newPage } });
});

// 定義 getImageUrl 方法
const getImageUrl = (photo) => {
  return new URL(`/public/img/${photo}`, import.meta.url).href;
};
</script>

<style scoped>
.news-container {
  justify-content: center;
  width: 65%; /* 預設桌面模式寬度 */
  margin: auto;
  padding-bottom: 1%;
}

.news-title {
  flex: 1;
  color: #343a40;
  font-weight: bold; /* 設置字體為粗體 */
  display: flex;
  flex-direction: column; /* 垂直排列元素 */
  justify-content: center; /* 垂直居中 */
  align-items: center; /* 水平居中 */
  text-align: center; /* 保證文本居中 */
}
.news-title h4 {
  margin-bottom: 5px; /* 調整 h4 底部的外邊距 */
  font-weight: bolder;
}

.news-title p {
  margin-top: 2px; /* 調整 p 元素的頂部外邊距 */
  font-weight: bolder;
}

.news-list {
  display: flex;
  flex-direction: column;
  gap: 20px; /* 每個 news-item 之間的間距 */
}

.news-item {
  display: flex;
  justify-content: start;
  align-items: center;
  padding: 20px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* 添加陰影 */
  border: 2px solid #ddd; /* 每個 news-item 的邊框 */
}

.news-photo {
  flex: 0 0 20%;
  padding-right: 20px;
}

.news-image {
  max-width: 200px; /* 調整圖片寬度 */
  height: auto; /* 保持圖片比例 */
  /* border-radius: 10px; 圓角 */
  transition: transform 0.3s ease; /* 添加過渡效果 */
}

.news-image:hover {
  transform: scale(2.5); /* 當滑鼠移上去時圖片放大1.1倍 */
}

.news-index {
  flex: 1;
  color: #343a40;
  font-size: 16px; /* 增加字體大小 */
  font-weight: bold; /* 設置字體為粗體 */
  display: flex;
  flex-direction: column; /* 垂直排列元素 */
  justify-content: center; /* 垂直居中 */
  text-align: left; /* 保證文本左對齊 */
}

.news-date {
  margin-left: 20px;
  color: #888;
  font-size: 14px;
}

.news-title h4 {
  margin-bottom: 5px; /* 調整 h4 底部的外邊距 */
  font-weight: bolder;
}

.news-title p {
  margin-top: 2px; /* 調整 p 元素的頂部外邊距 */
  font-weight: bolder;
}

/* 分頁容器樣式，讓分頁元件居中 */
.pagination-container {
  display: flex;
  justify-content: center; /* 水平居中 */
  margin-top: 20px; /* 與新聞列表保持一些間距 */
}

.news-item-link {
  text-decoration: none; /* 移除超連結的底線 */
  color: inherit; /* 保持字體顏色一致 */
}

.news-item-link:hover {
  text-decoration: none; /* 懸停時不顯示底線 */
}

.news-item-link .news-item {
  color: inherit; /* 保持字體顏色與父級元素一致 */
  transition: background-color 0.3s ease, color 0.3s ease; /* 平滑過渡效果 */
}

/* 小螢幕適配 */
@media (max-width: 768px) {
  .news-container {
    padding: 20px;
    margin: 0;
    width: 100%;
  }

  .news-item {
    flex-direction: row;
    align-items: flex-start;
  }

  .news-photo {
    flex: 0 0 80px; /* 縮小圖片區域寬度 */
    max-width: 100px; /* 確保圖片在小螢幕不超過60px寬 */
  }

  .news-image {
    width: 100%; /* 圖片寬度設定為父容器的 100% */
  }
}
</style>
