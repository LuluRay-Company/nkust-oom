<template>
  <q-page-container>
    <q-page class="search-container" style="width: 65%; margin: 0% auto">
      <div class="news-list">
        <div
          class="news-item"
          v-for="(item, index) in filteredItems"
          :key="index"
        >
          <a :href="item.url" target="_blank">{{ item.title }}</a>
        </div>
      </div>
    </q-page>
  </q-page-container>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import { useRoute } from "vue-router";
import { useListStore } from "src/stores/listStore";

// 使用 Pinia store
const listStore = useListStore();

// 綁定查詢結果
const filteredItems = ref([]);

// 取得目前的路由參數
const route = useRoute();

// 每次進入頁面或 query 變動時，執行查詢
const performSearch = () => {
  const query = route.query.q || ""; // 取得 query 中的 'q' 參數
  filteredItems.value = listStore.filterItems(query);
};

// 監聽路由變化，當 query 變動時重新查詢
watch(() => route.query.q, performSearch);

// 初次進入頁面時執行查詢
onMounted(performSearch);
</script>

<style scoped>
.search-input {
  margin-bottom: 10px;
  padding: 5px;
  width: 100%;
  max-width: 300px;
}

.search-container {
  padding: 20px;
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
</style>
