<template>
  <q-page-container>
    <q-page class="structure-container">
      <q-toolbar class="bg-grey-3 full-width">
        <q-btn flat @click="navigateTo()" class="text-bold" label="首頁" />
        <span class="separator">/</span>
        <q-btn
          flat
          @click="navigateTo('introduction')"
          class="text-bold"
          label="單位介紹"
        />
        <span class="separator">/</span>
        <q-btn
          flat
          @click="navigateTo('introduction/structure')"
          class="text-bold"
          label="組織架構"
        />
      </q-toolbar>
      <!-- 組織架構 Title -->
      <div class="structure-title">
        <h4>組織架構</h4>
        <p>················</p>
      </div>

      <!-- 組織架構內容 -->
      <div class="org-chart">
        <div class="org-node">
          <div class="node-content">
            <strong>經營管理中心</strong>
            <br />
            <small>Office of Operations and Management</small>
          </div>
        </div>
        <div class="org-branches">
          <div class="org-branch">
            <div class="node-content">
              <strong>規劃評估組</strong>
              <br />
              <small
                >Operational Planning and Organizational Assessment
                Division</small
              >
            </div>
          </div>
          <div class="org-branch">
            <div class="node-content">
              <strong>開發活化組</strong>
              <br />
              <small>Marketing and Spatial Activation Division</small>
            </div>
          </div>
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
    router.push(`/${route}`); // 使用絕對路徑，避免重複拼接
  } else {
    router.push("/");
  }
};
</script>

<style scoped>
.structure-container {
  padding: 20px;
  width: 65%;
  margin: 0% auto;
}

.structure-title {
  flex: 1;
  color: #343a40;
  font-weight: bold;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
}
.structure-title h4 {
  margin-bottom: 5px;
  font-weight: bolder;
}

.structure-title p {
  margin-top: 2px;
  font-weight: bolder;
}

.separator {
  margin: 0 10px;
  font-size: 16px;
  font-weight: bold;
  display: flex;
  align-items: center;
}

/* 組織架構圖樣式 */
.org-chart {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 5%;
}

.org-node {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #2e3e56;
  color: white;
  border-radius: 8px;
  padding: 20px;
  width: 80%;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  text-align: center;
  font-size: 20px; /* 增大字體 */
}

.org-branches {
  display: flex;
  justify-content: center;
  gap: 10%; /* 控制兩個分支之間的距離 */
  width: 80%;
  position: relative;
  margin-top: 2%; /* 增加與上面元素的間距 */
}

.org-branch {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #2e3e56;
  color: white;
  border-radius: 8px;
  padding: 20px;
  width: 60%;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  text-align: center;
  font-size: 18px; /* 增大字體 */
}

@media (max-width: 768px) {
  .structure-container {
    padding: 20px;
    width: 100%;
    margin: 0% auto;
  }
}
</style>
