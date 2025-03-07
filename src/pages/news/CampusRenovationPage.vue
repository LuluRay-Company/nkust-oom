<template>
  <q-page-container>
    <q-page class="campus-renovation-container">
      <q-toolbar class="bg-grey-3">
        <q-btn flat @click="navigateTo()" class="text-bold" label="首頁" />
        <span class="separator">/</span>
        <q-btn
          flat
          @click="navigateTo('announcement')"
          class="text-bold"
          label="最新公告"
        />
        <span class="separator">/</span>
        <q-btn
          flat
          @click="navigateTo('announcement/campusRenovation')"
          class="text-bold"
          label="校區新貌"
        />
      </q-toolbar>

      <!-- 校區新貌內容區域 -->
      <div class="campus-content">
        <h1 class="page-title">校區新貌</h1>
        
        <div class="campus-layout">
          <!-- 左側校區選單 -->
          <div class="campus-menu">
            <div 
              v-for="(campus, index) in campusList" 
              :key="index"
              class="campus-menu-item"
              :class="{ active: selectedCampus === index }"
              @click="selectedCampus = index"
            >
              {{ campus.name }}
            </div>
          </div>
          
          <!-- 右側校區內容 -->
          <div class="campus-detail">
            <div v-if="selectedCampus !== null" class="campus-item">
              <h2 class="campus-title">{{ campusList[selectedCampus].name }}</h2>
              <div class="campus-image">
                <img :src="campusList[selectedCampus].image" :alt="campusList[selectedCampus].name" />
              </div>
              <div class="campus-description">
                <p>{{ campusList[selectedCampus].description }}</p>
              </div>
            </div>
            <div v-else class="campus-placeholder">
              請從左側選擇校區以查看詳細資訊
            </div>
          </div>
        </div>
      </div>
    </q-page>
  </q-page-container>
</template>

<script setup>
import { useRouter } from "vue-router";
import { ref } from "vue";

// 使用 Vue Router 來進行導航
const router = useRouter();

// 導航至指定路徑
const navigateTo = (route) => {
  if (route) {
    router.push(`/${route}`);
  } else {
    router.push("/");
  }
};

// 校區列表資料
const campusList = [
  {
    name: "湖內校區",
    image: "/img/campus/campustest1.jpg",
    description: "文案待定"
  },
  {
    name: "楠梓校區",
    image: "/img/campus/campustest2.jpg",
    description: "文案待定"
  },
  {
    name: "第一校區",
    image: "/img/campus/campustest3.jpg",
    description: "文案待定"
  },
  {
    name: "建工校區",
    image: "/img/campus/campustest4.jpg",
    description: "文案待定"
  },
  {
    name: "燕巢校區",
    image: "/img/campus/campustest5.jpg",
    description: "文案待定"
  },
  {
    name: "旗津校區",
    image: "/img/campus/campustest6.jpg",
    description: "文案待定"
  }
];

// 當前選中的校區索引
const selectedCampus = ref(0); // 預設選中第一個校區
</script>

<style scoped>
.campus-renovation-container {
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

/* 校區新貌內容樣式 */
.campus-content {
  width: 65%;
  margin: 20px auto;
}

.page-title {
  text-align: center;
  margin-bottom: 30px;
  color: #1976d2;
  font-size: 28px;
  font-weight: bold;
}

/* 校區布局 */
.campus-layout {
  display: flex;
  gap: 30px;
  min-height: 500px;
}

/* 左側選單樣式 */
.campus-menu {
  width: 200px;
  flex-shrink: 0;
  background-color: #f5f5f5;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.campus-menu-item {
  padding: 15px 20px;
  cursor: pointer;
  transition: all 0.3s ease;
  border-left: 4px solid transparent;
}

.campus-menu-item:hover {
  background-color: #e0e0e0;
}

.campus-menu-item.active {
  background-color: #e3f2fd;
  border-left-color: #1976d2;
  font-weight: bold;
  color: #1976d2;
}

/* 右側內容樣式 */
.campus-detail {
  flex-grow: 1;
}

.campus-item {
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.campus-title {
  background-color: #1976d2;
  color: white;
  padding: 15px 20px;
  margin: 0;
  font-size: 20px;
}

.campus-image {
  width: 100%;
  overflow: hidden;
}

.campus-image img {
  width: 100%;
  height: auto;
  display: block;
  transition: transform 0.3s ease;
}

.campus-image img:hover {
  transform: scale(1.03);
}

.campus-description {
  padding: 20px;
}

.campus-description p {
  margin: 0;
  line-height: 1.6;
  font-size: 16px;
  color: #333;
}

.campus-placeholder {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 300px;
  background-color: #f5f5f5;
  border-radius: 8px;
  color: #757575;
  font-size: 16px;
}

@media (max-width: 768px) {
  .bg-grey-3 {
    padding: 20px;
    width: 100%;
    margin: 0% auto;
    height: 50px;
  }
  
  .campus-content {
    width: 90%;
  }
  
  .page-title {
    font-size: 24px;
  }
  
  .campus-layout {
    flex-direction: column;
  }
  
  .campus-menu {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
  }
  
  .campus-menu-item {
    flex: 1;
    min-width: 100px;
    text-align: center;
    padding: 10px;
    border-left: none;
    border-bottom: 3px solid transparent;
  }
  
  .campus-menu-item.active {
    border-left-color: transparent;
    border-bottom-color: #1976d2;
  }
  
  .campus-title {
    font-size: 18px;
    padding: 12px 15px;
  }
  
  .campus-description p {
    font-size: 14px;
  }
}
</style>
