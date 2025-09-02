<template>
  <q-layout view="hHh lpR fFf">
    <!-- 新增的圖片和鏈接區域 -->
    <div class="header-top">
      <div class="logo-container" v-if="!isSmallScreen">
        <img
          src="/img/nkust_oom.png"
          alt="NKUST OOM Logo"
          class="logo"
          @click="hyperlinkTo('https://www.nkust.edu.tw/index.php')"
        />

      </div>
      <div class="links-container" v-if="!isSmallScreen">
        <ul class="link-list">
          <li
            class="link-item"
            @click="hyperlinkTo('https://www.nkust.edu.tw/index.php')"
          >
            學校首頁
          </li>
          <li
            class="link-item"
            @click="hyperlinkTo('https://webap0.nkust.edu.tw/nkust/')"
          >
            校務系統
          </li>
          <li
            class="link-item"
            @click="navigateTo('/login')"
          >
            管理後臺
          </li>
        </ul>
      </div>
    </div>

    <!-- 工具列 -->
    <q-toolbar
      class="toolbar-container bg-grey-3"
      style="justify-content: center"
    >
      <!-- 手機模式下的 Logo -->
      <div class="logo-container mobile-logo" v-if="isSmallScreen">
        <img
          src="/img/nkust_oom.png"
          alt="NKUST OOM Logo"
          class="logo"
          @click="hyperlinkTo('https://www.nkust.edu.tw/index.php')"
        />

      </div>
      <!-- Menu 按鈕 (小視窗) -->
      <q-btn
        flat
        no-border
        :icon="isMenuOpen ? 'close' : 'menu'"
        style="font-size: 14px; margin-left: auto"
        v-if="isSmallScreen"
        @click="toggleMenu"
      />
      <!-- 下拉選單 (小視窗) -->
      <q-menu
        anchor="bottom left"
        self="top left"
        fit
        transition-show="fade"
        persistent
        v-if="isMenuOpen"
      >
        <q-list>
          <q-item
            v-for="(item, index) in navItems"
            :key="index"
            clickable
            @click="
              () => {
                navigateTo(item.route);
                isMenuOpen = false;
              }
            "
          >
            <q-item-section>{{ item.label }}</q-item-section>
          </q-item>
        </q-list>
      </q-menu>

      <!-- 中間的導航欄清單 (大視窗) -->
      <ul class="nav-list" v-if="!isSmallScreen">
        <li
          v-for="(item, index) in navItems"
          :key="index"
          class="nav-item"
          @mouseenter="openMenu(index)"
          @mouseleave="closeMenu(index)"
          @click="navigateTo(item.route)"
          style="font-size: large; font-weight: bolder"
        >
          {{ item.label }}

          <!-- 自定義下拉選單 -->
          <div v-if="item.subItems && menus[index]" class="dropdown-menu">
            <ul>
              <li
                v-for="(subItem, subIndex) in item.subItems"
                :key="subIndex"
                class="dropdown-item"
                @click.stop="navigateTo(subItem.route)"
              >
                {{ subItem.label }}
              </li>
            </ul>
          </div>
        </li>
      </ul>
    </q-toolbar>

    <!-- 主內容 -->
    <router-view />
    <FooterComponent></FooterComponent>
  </q-layout>
</template>

<script setup>
import { onMounted, ref, nextTick } from "vue";
import { useRouter } from "vue-router";
import FooterComponent from "./FooterComponent.vue";

// 使用 Vue Router 來進行導航
const router = useRouter();

const isSearching = ref(false); // 控制是否顯示搜尋輸入框
const query = ref(""); // 綁定輸入框內容

// 導航項目，每個項目可以有下拉選單內容，並包含導航路徑
const navItems = ref([
  {
    label: "單位介紹",
    route: "/introduction",
    subItems: [
      { label: "關於本中心", route: "/introduction/overview" },
      { label: "組織架構", route: "/introduction/structure" },
    ],
  },
  { label: "最新公告", 
    route: "/announcement",
    subItems: [
      { label: "最新消息", route: "/announcement/news" },
      { label: "校區新貌 (Coming soon)", route: "/announcement" }, // 顯示校區新貌 /campusRenovation
    ],
  },
  {
    label: "業務職掌",
    route: "/services",
    subItems: [
      { label: "中心本部", route: "/services/headquarters" },
      { label: "規劃評估組", route: "/services/plan" },
      { label: "開發活化組", route: "/services/develop" },
    ],
  },
  {
    label: "主管法規",
    route: "/regulations",
    subItems: [
      { label: "財政部", route: "/regulations/mof" },
      { label: "本校", route: "/regulations/agency" },
    ],
  },
  { label: "表單下載", route: "/downloads" },
  { label: "相關連結", route: "/links" },
  { label: "聯絡我們", route: "/contact" },
]);

// 響應式狀態
const isSmallScreen = ref(false);
const isMenuOpen = ref(false);
const menuButtonReady = ref(false); // 确保菜单按钮已初始化
// 方法
const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;

  console.log(isMenuOpen.value);
};

// 控制每個下拉選單是否顯示
const menus = ref(Array(navItems.value.length).fill(false));

let closeTimeout = null;

const openMenu = (index) => {
  menus.value = menus.value.map((_, i) => i === index); // 打開當前選單，關閉其他選單
};

const closeMenu = (index) => {
  menus.value[index] = false; // 關閉當前選單
};

// 讓下拉選單在鼠標懸停時保持顯示
const keepMenuOpen = (index) => {
  clearTimeout(closeTimeout); // 當滑鼠進入時清除關閉延遲
  menus.value[index] = true;
};

// 導航至指定路徑
const navigateTo = (route) => {
  if (route) {
    router.push(route);
  } else {
    router.push("/");
  }
};

const hyperlinkTo = (url) => {
  window.open(url, "_blank");
};

// 切換搜尋輸入框顯示
const toggleSearch = () => {
  isSearching.value = !isSearching.value;
  if (!isSearching.value) {
    query.value = ""; // 清空輸入框
  }
};

// 搜尋並導向 /search 頁面
const search = () => {
  if (query.value.trim() !== "") {
    router.push({ name: "search", query: { q: query.value } });
  }
};

// 檢測螢幕尺寸
const checkScreenSize = () => {
  isSmallScreen.value = window.innerWidth <= 768;
};

onMounted(() => {
  checkScreenSize();
  window.addEventListener("resize", checkScreenSize);

  // 确保 menuButton 初始化完成
  nextTick(() => {
    menuButtonReady.value = true;
  });
});
</script>

<style scoped>
/* 頂部區域的樣式 */
.header-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  background-color: white;
  width: 65%; /* 預設桌面模式寬度 */
  margin: 0 auto; /* 居中 */
}

.toolbar-container {
  justify-content: center;
  width: 65%; /* 預設桌面模式寬度 */
  margin: auto;
}

.logo-container {
  flex: 1;
  cursor: pointer; /* 滑鼠移上去變成手型 */
}

.logo {
  height: auto; /* 控制 logo 的大小 */
  width: 60%;
}

.logo2 {
  height: auto;
  width: 20%;
  margin-left: 10px; /* 與虛線保持間距 */
}
.links-container {
  display: flex; /* 使用 Flexbox 來進行佈局 */
  justify-content: center; /* 水平居中 */
  align-items: center; /* 垂直居中 */
}

.link-list {
  list-style-type: none; /* 去除 ul 的原點樣式 */
  padding: 0;
  margin: 0;
  display: flex; /* 使用 Flexbox 讓項目水平排列 */
}

.link-item {
  margin: 0 15px; /* 控制每個項目之間的水平間距 */
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  position: relative; /* 為 ::after 定位準備 */
  font-size: 16px;
  color: black;
  font-weight: bolder;
  background-color: white; /* 背景顏色 */
  padding: 5px 20px; /* 調整內部間距 */
  border-radius: 50px; /* 使按鈕變為橢圓形 */
  transition: background-color 0.3s, color 0.3s; /* 平滑過渡效果 */
  text-align: center;
  border: 2px solid #5c5c5c; /* 添加 2px 灰色的外框線 */
}

.link-item:last-child::after {
  content: none; /* 移除最後一個項目的分隔線 */
}

.link-item:hover {
  background-color: #5c5c5c; /* 懸停時的背景顏色 */
  color: white; /* 懸停時字體顏色 */
}

/* 原本導航欄樣式 */
.nav-list {
  display: flex;
  list-style-type: none; /* 去除li的原點樣式 */
  padding: 0;
  margin: 0;
}

.nav-item {
  position: relative; /* 確保下拉選單相對於它定位 */
  margin: 0 6px; /* 控制li之間的間距 */
  padding: 8px 20px; /* 給li設置內邊距，讓點擊區域更大 */
  cursor: pointer;
  color: black; /* 預設字體顏色為黑色 */
  transition: background-color 0.3s, color 0.3s; /* 平滑變色過渡效果 */
  white-space: nowrap; /* 防止文字換行 */
}

.q-toolbar {
  display: flex;
  justify-content: center;
  align-items: center;
}

.q-tabs {
  display: flex;
  align-items: center;
  justify-content: center;
}

/* 手機模式樣式調整 */
@media (max-width: 768px) {
  .header-top,
  .toolbar-container {
    width: 100%; /* 設定寬度為 100% */
    margin: 0; /* 移除左右外邊距 */
    padding: 0; /* 移除內邊距，確保滿版 */
  }

  .menu-btn {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 40px;
    height: 40px;
    position: relative;
    cursor: pointer;
  }
}

/* 下拉選單容器 */
.dropdown-menu {
  position: absolute;
  top: 100%; /* 放置在導航項目的正下方 */
  left: 0;
  background-color: white;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* 添加陰影 */
  border-radius: 4px;
  z-index: 100; /* 保證選單顯示在最上層 */
  min-width: 100px; /* 設定最小寬度 */
  padding: 10px 0;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.2s ease, visibility 0.2s ease;
}

.dropdown-menu ul {
  list-style: none; /* 移除圓點 */
  margin: 0 auto; /* 移除預設外邊距 */
  padding: 0; /* 移除預設內邊距 */
}

/* 下拉選單項目 */
.dropdown-item {
  font-size: 16px; /* 調整字體大小 */
  font-weight: normal; /* 調整字體粗細，normal 表示不是粗體 */
  padding: 8px 16px; /* 調整內邊距，確保文字有適當的留白 */
  color: black; /* 字體顏色，保持清晰 */
  transition: background-color 0.3s ease; /* 添加滑鼠懸停時的過渡效果 */
}

.dropdown-item:hover {
  background-color: #f0f0f0; /* 滑鼠懸停背景色 */
}

.nav-item:hover {
  background-color: #5c5c5c; /* 懸停時的背景色 */
  color: white; /* 懸停時字體顏色變白 */
}

.nav-item .dropdown-menu {
  opacity: 1;
  visibility: visible;
}
</style>
