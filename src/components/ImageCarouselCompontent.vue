<template>
  <q-carousel
    animated
    v-model="slide"
    navigation
    infinite
    :autoplay="autoplay"
    :autoplay-interval="autoplayInterval"
    arrows
    control-color="grey"
    height="300px"
    transition-prev="slide-right"
    transition-next="slide-left"
    @mouseenter="autoplay = false"
    @mouseleave="autoplay = true"
  >
    <q-carousel-slide v-for="(img, index) in images" :key="index" :name="index">
      <!-- 你可以在這裡添加圖片的描述或文字 -->
      <img :src="img.src" class="custom-image" @click="showImage(img.src)" />
    </q-carousel-slide>
  </q-carousel>

  <!-- 圖片全屏展示的彈窗 -->
  <q-dialog v-model="dialogVisible" persistent>
    <div class="fullscreen-wrapper">
      <img :src="selectedImage" class="fullscreen-image" />
      <q-btn
        flat
        label="關閉"
        class="close-btn"
        @click="dialogVisible = false"
      />
    </div>
  </q-dialog>
</template>

<script setup>
import { ref } from "vue";

const slide = ref(0); // 控制當前顯示的輪播圖片索引

const autoplayInterval = ref(3000); // 自動播放間隔，單位為毫秒
const autoplay = ref(true); // 是否啟動自動播放

// 定義圖片列表
const images = [
  { src: "/img/carousel/first.jpg" },
  { src: "/img/carousel/yanchao.jpg" },
  { src: "/img/carousel/nanzih.jpg" },
  { src: "/img/carousel/cijin.jpg" },
  { src: "/img/carousel/jiangong.jpg" },
];

// 控制彈窗的顯示
const dialogVisible = ref(false);

// 用於存儲當前選中的圖片 URL
const selectedImage = ref("");

// 點擊圖片後，顯示彈窗並設置選中圖片
const showImage = (imageUrl) => {
  selectedImage.value = imageUrl;
  dialogVisible.value = true;
};
</script>

<style scoped>
.q-carousel {
  justify-content: center;
  width: 65%; /* 預設桌面模式寬度 */
  margin: auto;
}
.custom-image {
  width: 100%;
  height: 100%;
  object-fit: cover; /* 圖片不裁剪，保留完整內容 */
  object-position: top; /* 顯示圖片的上半部 */
}

/* 全屏彈窗樣式 */
.fullscreen-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.9); /* 背景黑色透明 */
  max-width: 100%; /* 滿屏寬度 */
  height: 100%; /* 滿屏高度 */
  overflow: hidden; /* 禁用滾動條 */
  position: relative; /* 用於關閉按鈕的定位 */
}

.fullscreen-image {
  width: 100%; /* 寬度放大兩倍 */
  height: 100%; /* 高度放大兩倍 */
  object-fit: contain; /* 確保圖片完整顯示且不裁切 */
}

.close-btn {
  position: absolute;
  top: 20px;
  right: 20px;
  color: white;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 5px;
  padding: 10px 20px;
  z-index: 10; /* 確保按鈕顯示在最上層 */
}

/* 小螢幕適配 */
@media (max-width: 768px) {
  .q-carousel {
    padding: 0;
    margin: 0;
    width: 100%;
  }
}
</style>
