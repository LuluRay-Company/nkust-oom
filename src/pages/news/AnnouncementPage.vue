<template>
    <q-page-container>
      <q-page class="announcement-container">
        <q-toolbar class="bg-grey-3 full-width">
          <q-btn flat @click="navigateTo()" class="text-bold" label="首頁" />
          <span class="separator">/</span>
          <q-btn
            flat
            @click="navigateTo('announcement')"
            class="text-bold"
            label="最新公告"
          />
        </q-toolbar>
  
        <!--最新公告 Title-->
        <div class="announcement-title">
          <h4>最新公告</h4>
          <p>················</p>
        </div>
  
        <!-- 兩個方塊區域 -->
        <div class="announcement-list">
          <!-- 左邊方塊 - 最新消息 -->
          <div class="announcement-item">
            <q-icon name="info" color="grey" style="margin-right: 20px" />
            <router-link to="/announcement/news" class="announcement-link">最新消息</router-link>
          </div>
  
          <!-- 右邊方塊 - 校區新貌-->
          <div class="announcement-item">
            <q-icon name="info" color="grey" style="margin-right: 20px" />
            <router-link to="/announcement/campusRenovation" class="announcement-link">校區新貌</router-link>
          </div>
        </div>
      </q-page>
    </q-page-container>
  </template>
  
  <script setup>
  import { useRouter } from "vue-router";
  
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
  </script>
  
  <style scoped>
  .announcement-container {
    padding: 20px;
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
  
  .announcement-title {
    flex: 1;
    color: #343a40;
    font-weight: bold; /* 設置字體為粗體 */
    display: flex;
    flex-direction: column; /* 垂直排列元素 */
    justify-content: center; /* 垂直居中 */
    align-items: center; /* 水平居中 */
    text-align: center; /* 保證文本居中 */
  }
  
  .announcement-title h4 {
    margin-bottom: 5px; /* 調整 h4 底部的外邊距 */
    font-weight: bolder;
  }
  
  .announcement-title p {
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
  
  /* 連結區塊樣式 - 改為兩個方塊 */
  .announcement-list {
    display: flex;
    justify-content: space-between; /* 兩個方塊左右對齊 */
    margin: 20px auto;
    width: 100%; /* 占滿整個容器 */
  }
  
  .announcement-item {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 45%; /* 每個方塊佔 45% 寬度，留點空間 */
    padding: 20px;
    background-color: white;
    margin: 0 10px; /* 每個方塊的左右間距 */
    border-radius: 10px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* 添加陰影 */
    transition: all 0.3s ease;
    font-size: 20px;
    text-align: center;
  }
  
  /* 懸停效果 */
  .announcement-item:hover {
    box-shadow: 0 8px 15px rgba(0, 0, 0, 0.2); /* 懸停時增加陰影效果 */
    background-color: #f0f0f0; /* 懸停時背景變淡 */
  }
  
  .announcement-link {
    color: #003366;
    text-decoration: none; /* 去除下劃線 */
    font-weight: bold;
  }
  
  .announcement-link:hover {
    color: #007bff; /* 懸停時變為藍色 */
  }
  
  @media (max-width: 768px) {
    .announcement-container {
      padding: 20px;
      width: 100%;
      margin: 0% auto;
    }
    .announcement-list {
      flex-direction: column; /* 將排列方向改為上下 */
      align-items: center; /* 方塊居中對齊 */
      gap: 20px; /* 每個方塊間距 */
    }
    .announcement-item {
      width: 80%; /* 占滿父容器寬度 */
      margin-bottom: 20px; /* 增加下方間距 */
    }
  }
  </style>
  