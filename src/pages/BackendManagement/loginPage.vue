<template>
  <q-layout>
    <q-page-container>
      <q-page class="login-container">
        <div class="login-box">
          <div class="login-header">
            <h4>國立高雄科技大學經營管理處</h4>
            <h5>後臺管理登入</h5>
          </div>
          <!-- 縮短輸入框 -->
          <q-input
            v-model="username"
            label="帳號"
            class="input-field short-input"
            clearable
            color="grey"
          />
          <q-input
            v-model="password"
            type="password"
            label="密碼"
            class="input-field short-input"
            clearable
            color="grey"
          />
          <div class="btn-container">
            <q-btn
              label="登入"
              color="primary"
              @click="login"
              class="login-btn"
              unelevated
            />
            <q-btn
              flat
              size="20px"
              label="忘記密碼"
              class="forgot-btn"
              color="black"
              style="margin-right: 20%"
              @click="forgotPassword"
            />
          </div>
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

// 使用 Vue Router 來進行導航
const router = useRouter();

// 定義用戶名和密碼的響應式變量
const username = ref("");
const password = ref("");

// 定義登入函數
const login = () => {
  if (username.value === "root" && password.value === "root") {
    // 假設登入成功，重定向到後台首頁
    router.push("/dashboard");
  } else {
    alert("登入失敗，請檢查用戶名和密碼。");
  }
};

// 定義忘記密碼按鈕的函數
const forgotPassword = () => {
  alert("請聯繫系統管理員重設密碼。");
};
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(135deg, #8f8f8f, #8f8f8f);
}

.login-box {
  background-color: white;
  padding: 40px;
  border-radius: 15px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  width: 30%;
  text-align: center;
}

.login-header h4 {
  color: #5c5c5c;
  font-weight: 900;
  margin-bottom: 2%;
}

.login-header h5 {
  font-size: 30px;
  color: #333;
  margin-bottom: 30px;
}

.input-field {
  margin: auto;
  margin-bottom: 5%;
}

.short-input {
  width: 60%; /* 縮短輸入框的寬度 */
}

.full-width {
  width: 100%;
}

.btn-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-left: 20%;
}

.login-btn {
  background-color: #0072ff;
  font-size: 18px;
  border-radius: 8px;
  transition: background-color 0.5s ease;
  width: 30%;
}

.login-btn:hover {
  background-color: #04509b;
}

.forgot-btn {
  color: #0072ff;
  font-size: 14px;
}

.q-input input {
  font-size: 16px;
  margin: auto;
}
</style>
