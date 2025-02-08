<template>
  <footer class="footer-section">
    <div class="container">
      <div class="footer-contact">
        <div>電話：07-3617141 Ext. 22112</div>
        <div>信箱：eroffice01@nkust.edu.tw</div>
        <div>地址：811213高雄市楠梓區海專路142號</div>
      </div>
    </div>
  </footer>
</template>

<script setup></script>

<style scoped>
.footer-section {
  background-color: #5c5c5c; /* 頁腳的背景色 */
  color: white;
  position: relative;
  text-align: center;
  margin: 20px; /* 距離內容區的間距 */
  font-size: 18px; /* 整體字體大小 */
  width: 65%;
  margin: 2% auto;
}

.footer-contact {
  display: flex; /* 使用 Flexbox */
  justify-content: space-around; /* 等間距排列 */
  align-items: center; /* 垂直居中 */
  text-align: center; /* 內容水平居中 */
  padding: 20px 0; /* 調整內邊距 */
  font-size: 16px; /* 調整聯繫方式的字體大小 */
  position: relative; /* 為了使用 ::before */
}

.footer-contact::before {
  content: ""; /* 偽元素內容 */
  position: absolute;
  top: 5px; /* 控制虛線的垂直位置 */
  left: 0;
  width: 100%;
  height: 0; /* 沒有高度，只需要線條 */
}

.footer-contact div {
  flex: 1; /* 每個 div 均分 1/3 寬度 */
  display: flex; /* 讓內部元素也使用 Flexbox */
  flex-direction: column; /* 讓內部的內容垂直排列 */
  align-items: center; /* 內部內容水平居中 */
  justify-content: center; /* 內部內容垂直居中 */
  padding: 0 10px; /* 控制內部間距，防止太靠邊 */
}

/* RWD 媒體查詢：小螢幕設置垂直排列 */
@media (max-width: 768px) {
  .footer-contact {
    flex-direction: column; /* 切換為垂直排列 */
  }

  .footer-contact div {
    max-width: 100%; /* 每個聯繫項佔滿寬度 */
    margin-bottom: 10px; /* 每個項目之間增加間距 */
  }

  .footer-contact div:last-child {
    margin-bottom: 0; /* 移除最後一項的多餘間距 */
  }

  .footer-section {
    width: 100%; /* 設定寬度為 100% */
    margin: 0; /* 移除左右外邊距 */
    padding: 0; /* 移除內邊距，確保滿版 */
  }
}
</style>
