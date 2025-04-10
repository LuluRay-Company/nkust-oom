<template>
  <q-page-container>
    <q-page class="news-detail-container">
      <q-toolbar class="bg-grey-3 full-width">
        <q-btn flat @click="navigateTo()" class="text-bold" label="首頁" />
        <span class="separator">/</span>
        <q-btn
          flat
          @click="navigateTo('announcement/news')"
          class="text-bold"
          label="最新消息"
        />
      </q-toolbar>

      <div v-if="newsItem" class="news-detail-title">
        <h4>{{ newsItem.title }}</h4>
        <p>{{ newsItem.date }}</p>
      </div>
      <div v-if="newsItem" class="news-detail-content">
        <img :src="newsItem.photo" alt="News Image" referrerpolicy="no-referrer" />
        <p v-html="newsItem.content"></p>
        <br />
        <div
          class="file-download"
          v-if="files && files.length > 0"
        >
          <div
            v-for="(file, index) in files"
            :key="index"
            class="file-item"
          >
            <q-icon
              name="insert_drive_file"
              color="grey"
              style="margin-right: 15px"
              size="30px"
            />
            <a :href="file.fileUrl" download>{{ file.fileName }}</a>
          </div>
        </div>
      </div>
      <div v-else class="loading-container">
        <q-spinner color="primary" size="3em" />
        <p>資料載入中...</p>
      </div>
    </q-page>
  </q-page-container>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";

// 獲取路由參數
const route = useRoute();
const router = useRouter();

// 創建響應式變量來存儲新聞數據和文件數據
const news = ref([]);
const files = ref([]);
const loading = ref(true);

// 導航至指定路徑
const navigateTo = (route) => {
  if (route) {
    router.push(`/${route}`);
  } else {
    router.push("/");
  }
};

const getFileUrl = (fileName) => {
  return `/files/${fileName}`;
};

// 獲取所有新聞數據
const fetchNews = async () => {
  try {
    const response = await fetch('/api/news');
    if (!response.ok) {
      throw new Error('網路回應不正常');
    }
    const data = await response.json();
    // 將API返回的數據映射到組件使用的格式
    news.value = data.map(item => ({
      id: item.newsId, // 前端顯示用 ID
      newsId: item.newsId, // 保存真實的 newsId 用於 API 調用
      photo: item.imageUrl,
      title: item.title,
      date: new Date(item.publishDate).toLocaleDateString('zh-TW'),
      content: item.content
    }));
    
    // 獲取當前新聞的文件
    if (newsItem.value) {
      await fetchNewsFiles(newsItem.value.newsId); // 使用真實的 newsId
    }
    
    loading.value = false;
  } catch (error) {
    console.error('獲取新聞數據失敗:', error);
    loading.value = false;
  }
};

// 獲取特定新聞的文件
const fetchNewsFiles = async (newsId) => {
  try {
    console.log(`獲取新聞 ID ${newsId} 的文件`);
    const response = await fetch(`/api/files/news/${newsId}`);
    if (!response.ok) {
      throw new Error(`獲取新聞ID ${newsId} 的文件失敗`);
    }
    const data = await response.json();
    files.value = data;
  } catch (error) {
    console.error(`獲取新聞 ${newsId} 文件失敗:`, error);
    files.value = [];
  }
};

// 按日期排序並保留原始 newsId
const sortedNews = computed(() => {
  return [...news.value]
    .sort((a, b) => new Date(b.date) - new Date(a.date)) // 根據日期降序排序
    .map((item, index) => ({
      ...item,
      id: index + 1, // 前端顯示用的 ID，從 1 開始
      // 保留原始的 newsId 用於 API 調用
    }));
});

// 根據路由參數動態獲取對應的新聞項目
const newsItem = computed(() => {
  const id = parseInt(route.params.id, 10); // 解析路由參數中的 ID
  return sortedNews.value.find((item) => item.id === id); // 根據前端 ID 查找新聞
});

// 監聽 newsItem 的變化，當 newsItem 改變時獲取相應的文件
const watchNewsItem = computed(() => {
  if (newsItem.value) {
    fetchNewsFiles(newsItem.value.newsId); // 使用真實的 newsId
  }
  return newsItem.value?.id;
});

// 在組件掛載時獲取新聞數據
onMounted(() => {
  fetchNews();
});
</script>

<style scoped>
/* 設計主容器樣式 */
.news-detail-container {
  padding: 20px;
  width: 65%;
  margin: 0% auto;
}

/* 標題區域設計 */
.news-detail-title {
  background-color: #2e3e56;
  color: white;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
  margin-bottom: 20px;
  margin-top: 2%;
  width: 100%;
}

.news-detail-title h4 {
  font-weight: bold;
  font-size: 26px;
  margin-bottom: 2%;
}

.news-detail-title p {
  font-size: 22px;
  color: #ddd;
}

/* 內容區塊設計 */
.news-detail-content {
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  margin-bottom: 20px;
}

/* 圖片樣式 */
.news-detail-content img {
  max-width: 50%;
  height: auto;
  margin-bottom: 20px;
  border-radius: 10px;
  /* 新增置中樣式 */
  display: block; /* 確保圖片是區塊元素 */
  margin-left: auto; /* 左側自動對齊 */
  margin-right: auto; /* 右側自動對齊 */
}

/* 文字內容樣式 */
.news-detail-content p {
  font-size: 20px;
  line-height: 1.8;
  color: #333;
  margin-bottom: 10px;
  word-break: break-word;
}

/* 附加檔案 */
.news-detail-content a {
  color: #7d7d7d; /* 默認灰色 */
  text-decoration: none; /* 去掉下劃線 */
  transition: color 0.3s ease; /* 平滑過渡效果 */
  font-size: 18px;
}

.news-detail-content a:hover {
  color: #003366; /* 鼠標懸停時的深藍色 */
}

.news-detail-content:last-child {
  border-bottom: none;
}

/* 加載中的樣式 */
.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 300px;
}

/* 小螢幕適配 */
@media (max-width: 768px) {
  .news-detail-container {
    padding: 20px;
    margin: 0;
    width: 100%;
  }
}
</style>
