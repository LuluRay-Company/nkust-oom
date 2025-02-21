<template>
  <q-page-container>
    <q-page class="news-management-container">
      <q-toolbar class="bg-grey-3">
        <q-btn flat @click="navigateTo('/dashboard')" class="text-bold" label="後台系統" />
        <span class="separator">/</span>
        <q-btn
          flat
          @click="navigateTo('news')"
          class="text-bold"
          label="最新消息管理"
        />
      </q-toolbar>

      <!-- 最新消息管理內容 -->
      <div class="news-content q-pa-md">
        <div class="header">
          <!-- 搜尋區域 -->
          <div class="search-area">
            <q-input
              v-model="searchText"
              dense
              outlined
              placeholder="請輸入關鍵字"
              class="search-input"
            />
            <q-btn
              color="primary"
              label="查詢"
              class="q-ml-sm"
              @click="handleSearch"
            />
          </div>
          <!-- 新增按鈕 -->
          <q-btn color="primary" label="新增" @click="handleAdd" />
        </div>

        <div class="news-table q-mt-md">
          <!-- 表格標題列 -->
          <div class="table-header">
            <div class="header-item">消息識別碼</div>
            <div class="header-item">分類</div>
            <div class="header-item">作者</div>
            <div class="header-item">標題</div>
            <div class="header-item">內容</div>
            <div class="header-item">是否啟用</div>
            <div class="header-item">圖片</div>
            <div class="header-item">發布時間</div>
            <div class="header-item">更新時間</div>
          </div>

          <!-- 最新消息列表 -->
          <div v-for="item in paginatedNews" :key="item.newsId" class="news-row">
            <div class="news-item">{{ item.newsId }}</div>
            <div class="news-item">{{ item.categoryId }}</div>
            <div class="news-item">{{ item.author }}</div>
            <div class="news-item">{{ item.title }}</div>
            <div class="news-item">{{ item.content }}</div>
            <div class="news-item">{{ item.isEnabled ? '是' : '否' }}</div>
            <div class="news-item">{{ item.image }}</div>
            <div class="news-item">{{ item.publishDate }}</div>
            <div class="news-item">{{ item.modifyDate }}</div>
          </div>

          <!-- 分頁控制器 -->
          <div class="pagination-container">
            <q-pagination
              v-model="currentPage"
              :max="totalPages"
              :max-pages="7"
              boundary-numbers
              direction-links
              @update:model-value="handlePageChange"
            />
            <div class="page-info">
              共 {{ totalItems }} 筆資料，每頁顯示 {{ itemsPerPage }} 筆
            </div>
          </div>
        </div>
      </div>
    </q-page>
  </q-page-container>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
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

const news = ref([]);
const searchText = ref('');
const currentPage = ref(1);
const itemsPerPage = 20; // 每頁顯示 20 筆資料

// 計算總頁數
const totalPages = computed(() => {
  return Math.ceil(news.value.length / itemsPerPage);
});

// 計算總筆數
const totalItems = computed(() => {
  return news.value.length;
});

// 計算當前頁面應該顯示的資料
const paginatedNews = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return news.value.slice(start, end);
});

// 在元件掛載時，從 API 獲取最新消息
onMounted(async function() {
  let response = await fetch('http://localhost:8080/news');
  let data = await response.json();
  news.value = data;
});

const handlePageChange = (page) => {
  currentPage.value = page;
};

const handleSearch = () => {
  console.log('搜尋關鍵字:', searchText.value);
  currentPage.value = 1; // 搜尋時重置頁碼
};

const handleAdd = () => {
  // 處理新增按鈕點擊事件
  console.log('點擊新增按鈕');
};

</script>

<style scoped>
.news-management-container {
  padding: 20px;
}

.bg-grey-3 {
  width: 65%;
  margin: 0% auto;
}

.separator {
  margin: 0 8px;
  font-size: 16px;
  font-weight: bold;
  display: flex;
  align-items: center; /* 確保 / 符號和按鈕對齊 */
}

/* 以下為表格樣式 */
.news-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

.news-table {
  width: 70%;
  margin: 0 auto;
  border: 1px solid #ddd;
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 20px;
}

.header {
  width: 70%;
  margin: 0 auto;
  display: flex;
  justify-content: space-between; 
  align-items: center;
  margin-bottom: 16px;
}

.search-area {
  display: flex;
  align-items: center;
}

.search-input {
  width: 200px;
}

.table-header {
  display: grid;
  grid-template-columns: repeat(9, 1fr);
  background-color: #ADADAD;
  font-weight: bold;
  border-bottom: 2px solid #ddd;
}

.news-row {
  display: grid;
  grid-template-columns: repeat(9, 1fr);
  border-bottom: 1px solid #ddd;
}

.header-item, .news-item {
  padding: 12px 8px;
  text-align: center;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.news-row:nth-child(even) {
  background-color: #f9f9f9;
}

.news-row:hover {
  background-color: #f5f5f5;
}

/* 響應式設計 */
@media (max-width: 768px) {
  .bg-grey-3 {
    padding: 20px;
    width: 100%;
    margin: 0% auto;
    height: 50px;
  }
}

/* 分頁相關樣式 */
.pagination-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 0;
  background-color: white;
  border-top: 1px solid #ddd;
}

.page-info {
  margin-top: 10px;
  color: #666;
  font-size: 14px;
}
</style>
