<template>
  <!-- 插槽：在 bar 下面的區域插入內容 -->
  <div>
    <!-- <slot></slot> -->
    <!-- 將輪播圖片作為內容插入 -->
    <ImageCarousel />
  </div>

  <!-- 最新消息區域 -->
  <q-page-container>
    <q-page>
      <NewsCompontent />
    </q-page>
  </q-page-container>

  <MapCompontent />
</template>

<script setup>
import ImageCarousel from "../components/ImageCarouselCompontent.vue"; // 引入輪播圖片元件
import NewsCompontent from "src/components/NewsCompontent.vue"; //最新消息元件
import MapCompontent from "src/components/MapCompontent.vue";
</script>

<style scoped></style>
