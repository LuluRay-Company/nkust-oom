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
          name: 'announcement/news-detail',
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
              :src="item.photo"
              alt="News Image"
              class="news-image"
              referrerpolicy="no-referrer"
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
import { reactive, computed, ref, watch, onMounted } from "vue";
import { QPagination } from "quasar";
import { useRoute, useRouter } from "vue-router";

// 獲取路由和當前路由參數
const route = useRoute();
const router = useRouter();

// 當頁面加載時，如果 URL 中有 page 參數，設置為當前頁碼
const currentPage = ref(parseInt(route.query.page) || 1);

// 定義每頁顯示的最大數量
const itemsPerPage = 8;

// 將靜態news數組改為響應式空數組
const news = ref([]);

// 添加獲取新聞數據的方法
const fetchNews = async () => {
  try {
    const response = await fetch('http://localhost:8080/news');
    if (!response.ok) {
      throw new Error('網路回應不正常');
    }
    const data = await response.json();
    // 將API返回的數據映射到組件使用的格式
    news.value = data.map(item => ({
      id: item.newsId,
      photo: item.imageUrl,
      title: item.title,
      date: new Date(item.publishDate).toLocaleDateString('zh-TW'),
    }));
  } catch (error) {
    console.error('獲取新聞數據失敗:', error);
  }
};

// 在組件掛載時獲取新聞數據
onMounted(() => {
  fetchNews();
});

// 按日期排序並重新賦予 ID 的新聞數據
const sortedNews = computed(() => {
  return [...news.value]
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
const totalPages = computed(() => Math.ceil(news.value.length / itemsPerPage));

// 當 currentPage 改變時更新 URL 中的 page 參數
watch(currentPage, (newPage) => {
  router.replace({ query: { page: newPage } });
});

// 簡化 getImageUrl 方法
const getImageUrl = (photo) => {
  // 如果已經是完整 URL，直接返回
  if (photo && (photo.startsWith('http://') || photo.startsWith('https://'))) {
    return photo;
  }
  
  // 否則假設是本地路徑，添加前綴
  return photo ? new URL(`/public/img/${photo}`, import.meta.url).href : '';
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
