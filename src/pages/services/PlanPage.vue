<template>
  <q-page-container>
    <q-page class="headquarters-container">
      <q-toolbar class="bg-grey-3 full-width">
        <q-btn flat @click="navigateTo()" class="text-bold" label="首頁" />
        <span class="separator">/</span>
        <q-btn
          flat
          @click="navigateTo('services')"
          class="text-bold"
          label="業務職掌"
        />
        <span class="separator">/</span>
        <q-btn
          flat
          @click="navigateTo('services/plan')"
          class="text-bold"
          label="規劃評估組"
        />
      </q-toolbar>

      <!-- 關於本中心 Title -->
      <div class="headquarters-title">
        <h4>規劃評估組</h4>
        <p>················</p>
      </div>

      <!-- 關於本中心內容（置頂列表） -->
      <div class="headquarters-list">
        <div
          class="headquarters-item"
          v-for="(info, index) in aboutInfo"
          :key="index"
        >
          <div class="left-image">
            <p v-html="info.title"></p>
            <img :src="info.image" alt="照片" class="profile-image" />
          </div>
          <div class="vertical-line"></div>
          <div class="right-info">
            <div class="info-item">
              <div class="item-label"><p>電話：</p></div>
              <div class="item-content">
                <p>{{ info.phone }}</p>
              </div>
            </div>
            <div class="info-item">
              <div class="item-label"><p>信箱：</p></div>
              <div class="item-content">
                <p>{{ info.email }}</p>
              </div>
            </div>
            <div class="info-item">
              <div class="item-label"><p>工作項目：</p></div>
              <div class="item-content">
                <ul>
                  <li v-for="(task, index) in info.responsibility" :key="index">
                    {{ task }}
                  </li>
                </ul>
              </div>
            </div>
            <div class="info-item">
              <div class="item-label"><p>代理人：</p></div>
              <div class="item-content">
                <ul>
                  <li v-for="(task, index) in info.agent" :key="index">
                    {{ task }}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 第二個列表（另兩個區塊） -->
      <div class="another-list">
        <div
          class="another-item"
          v-for="(info, index) in anotherListData"
          :key="index"
        >
          <div class="left-image">
            <p v-html="info.title"></p>
            <img :src="info.image" alt="照片" class="profile-image" />
          </div>
          <div class="vertical-line"></div>
          <div class="right-info">
            <div class="info-item">
              <div class="item-label"><p>電話：</p></div>
              <div class="item-content">
                <p>{{ info.phone }}</p>
              </div>
            </div>
            <div class="info-item">
              <div class="item-label"><p>信箱：</p></div>
              <div class="item-content">
                <p>{{ info.email }}</p>
              </div>
            </div>
            <div class="info-item">
              <div class="item-label"><p>工作項目：</p></div>
              <div class="item-content">
                <p v-html="info.responsibility"></p>
              </div>
            </div>
            <div class="info-item">
              <div class="item-label"><p>代理人：</p></div>
              <div class="item-content">
                <p>{{ info.agent }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </q-page>
  </q-page-container>
</template>

<script setup>
import { reactive } from "vue";
import { useRouter } from "vue-router";

// 使用 Vue Router 來進行導航
const router = useRouter();

// 定義關於本中心的資料 (置頂的列表)
const aboutInfo = reactive([
  {   
    title: "王君豪<br>專案經理",
    image: "/img/people/wang.png",
    phone: "(07)3617141 轉 22123",
    email: "johnnycooky@nkust.edu.tw",
    responsibility: [
      "經營管理中心各類專案之規劃與執行。",
      "配合全校各單位業務彙整提報資料。",
      "其他行政支援及臨時交辦事項。",
    ],
    agent:  [
      "1.賴杏雲",
      "2.吳永生",
    ],
  },
  
  // {
  //   title: "待補<br>組長",
  //   image: "/img/people/zero.jpg",
  //   phone: "",
  //   email: "",
  //   position: "",
  //   responsibility: "",
  //   agent: "",
  // },
  // 可以添加更多的項目...
]);

// 第二個列表的資料
const anotherListData = reactive([
  {
    title: "待補<br>約用組員",
    image: "/img/people/zero.jpg",
    phone: "",
    email: "",
    responsibility: "",
    agent: "",
  },
]);

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
/* 主要容器样式 */
.headquarters-container {
  padding: 20px;
  width: 65%;
  margin: auto;
}

.separator {
  margin: 0 10px;
  font-size: 16px;
  font-weight: bold;
  display: flex;
  align-items: center; /* 確保 / 符號和按鈕對齊 */
}

/* 標題樣式 */
.headquarters-title {
  flex: 1;
  color: #343a40;
  font-weight: bold;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
}
.headquarters-title h4 {
  margin-bottom: 5px;
  font-weight: bolder;
}
.headquarters-title p {
  margin-top: 2px;
  font-weight: bolder;
}

/* 列表样式 */
.headquarters-list,
.another-list {
  padding: 30px;
  background: linear-gradient(135deg, #f5f7fa, #ffffff);
  border-radius: 20px;
  margin: 20px auto;
  width: 80%;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
  border: 3px solid #ddd;
}

.headquarters-item,
.another-item {
  display: flex;
  justify-content: flex-start;
  align-items: stretch; /* 讓所有子元素的高度撐滿列表項目 */
  padding: 20px 0;
  font-size: 18px;
  border-bottom: 3px dashed #bdc3c7;
  height: auto;
}

.headquarters-item:last-child,
.another-item:last-child {
  border-bottom: none;
}

/* 左邊圖片文字樣式 */
.left-image {
  flex: 0 0 20%; /* 确保宽度占 20% */
  display: flex;
  flex-direction: column; /* 垂直排列文字和图片 */
  align-items: center; /* 水平居中 */
  justify-content: flex-start; /* 垂直对齐到顶部 */
  text-align: center; /* 确保文字居中 */
  color: #2c3e50;
  font-size: 28px; /* 调整文字大小 */
  font-weight: bold; /* 字体加粗 */
}

.left-image p {
  margin: 0; /* 移除默认的上下 margin */
  padding: 0; /* 确保没有 padding */
}

.profile-image {
  width: 100%;
  max-width: 120px; /* 控制图片宽度 */
  height: auto; /* 保持图片比例 */
  border-radius: 50%; /* 圆形头像效果 */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* 添加阴影效果 */
  object-fit: cover; /* 确保图片裁剪后不会失真 */
  margin-top: 10%;
}

/* 中間虛線 */
.vertical-line {
  border-left: 3px dashed #bdc3c7;
  height: auto;
  margin: 0 20px;
}

/* 右邊內容區樣式 */
.right-info {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.info-item {
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  margin-bottom: 10px;
}

.item-label {
  font-weight: bold;
  margin-right: 20px;
  color: #34495e;
}

.item-content {
  flex: 1;
  color: #2c3e50;
  font-size: 20px;
  line-height: 1.6;
  word-break: break-word;
}

.profile-image {
  width: 100%;
  max-width: 120px; /* 控制图片宽度 */
  height: auto; /* 保持图片比例 */
  border-radius: 50%; /* 圆形头像效果 */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* 添加阴影效果 */
  object-fit: cover; /* 确保图片裁剪后不会失真 */
}

/* 小螢幕適配 */
@media (max-width: 768px) {
  .headquarters-item,
  .another-item {
    flex-direction: column; /* 從左右布局改為上下布局 */
    align-items: center; /* 水平居中 */
  }

  .left-image {
    flex: none; /* 不限制寬度 */
    margin-bottom: 20px; /* 圖片與內容區之間的間距 */
  }

  /* 隱藏虛線分隔符 */
  .vertical-line {
    display: none;
  }
  .headquarters-container {
    padding: 20px;
    width: 100%;
    margin: 0% auto;
  }
  .item-content {
    color: #2c3e50;
    font-size: 14px;
    word-break: break-word;
  }

  .item-label {
    white-space: nowrap; /* 禁止換行 */
    text-overflow: ellipsis; /* 超出內容以省略號表示 */
    display: inline-block; /* 確保內容是行內區塊 */
    max-width: 100px; /* 設定最大寬度，根據需要調整 */
    font-weight: bold; /* 保持字體粗體 */
    font-size: 14px;
  }
  .info-item {
    display: flex;
    flex-direction: column; /* 改為垂直排列 */
    align-items: flex-start; /* 垂直方向的對齊方式 */
    margin-bottom: 10px;
  }
}
</style>
