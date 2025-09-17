<template>
  <q-layout>
    <q-page-container>
      <q-page class="login-container">
        <div class="login-box">
          <div class="login-header">
            <h4>國立高雄科技大學經營管理中心</h4>
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
import { useQuasar } from 'quasar';

// 使用 Vue Router 來進行導航
const router = useRouter();

const $q = useQuasar();

// 定義用戶名和密碼的響應式變量
const username = ref("");
const password = ref("");

// 登入函數
const login = async () => {
  try {
    // 檢查必填欄位
    if (!username.value || !password.value) {
      $q.notify({
        color: 'negative',
        message: '請輸入帳號和密碼',
        position: 'top',
        timeout: 1500
      });
      return;
    }

    // 發送登入請求
    const response = await fetch('/api/dashboardUsers/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        account: username.value, 
        password: password.value
      })
    });

    if (response.status === 200) {
      const data = await response.json();
      
      // 儲存用戶資訊
      localStorage.setItem('userAccount', data.account);
      
      // 登入成功通知
      $q.notify({
        color: 'positive',
        message: '登入成功',
        position: 'top',
        timeout: 1500
      });
      
      // 檢查是否有重定向路徑
      const redirectPath = router.currentRoute.value.query.redirect || '/dashboard'
      router.push(redirectPath)
    } else if (response.status === 400) {
      // 帳號或密碼錯誤
      $q.notify({
        color: 'negative',
        message: '帳號或密碼錯誤',
        position: 'top',
        timeout: 1500
      });
    }
  } catch (error) {
    $q.notify({
      color: 'negative',
      message: '登入失敗，請稍後再試',
      position: 'top',
      timeout: 1500
    });
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
