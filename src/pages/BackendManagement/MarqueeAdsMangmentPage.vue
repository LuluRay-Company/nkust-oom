<template>
  <q-page-container>
    <q-page class="marquee-ads-management-container">
      <q-toolbar class="bg-grey-3">
        <q-btn flat @click="navigateTo('/dashboard')" class="text-bold" label="後台系統" />
        <span class="separator">/</span>
        <q-btn
          flat
          @click="navigateTo('marqueeAds')"
          class="text-bold"
          label="跑馬燈管理"
        />
      </q-toolbar>
      <!-- 跑馬燈管理內容 -->
      <div class="marquee-ads-content q-pa-md">
        <div class="header">
          <div style="flex-grow: 1"></div>
          <!-- 新增按鈕 -->
          <q-btn color="primary" label="新增" @click="handleAdd" />
        </div>

        <div class="marquee-ads-table q-mt-md">
          <!-- 表格標題列 -->
          <div class="table-header">
            <div class="header-item">跑馬燈編號</div>
            <div class="header-item">圖片</div>
            <div class="header-item">鏈結</div>
            <div class="header-item">排序</div>
            <div class="header-item">是否啟用</div>
            <div class="header-item">發布時間</div>
            <div class="header-item">更新時間</div>
            <div class="header-item">操作</div>
          </div>

          <!-- 跑馬燈列表 -->
          <div v-for="item in paginatedMarqueeAds" :key="item.adId" class="marquee-ads-row">
            <div class="marquee-ads-item">{{ item.adId }}</div>
            <div class="marquee-ads-item">{{ item.imageUrl }}</div>
            <div class="marquee-ads-item">{{ item.linkUrl }}</div>
            <div class="marquee-ads-item">{{ item.displayOrder }}</div>
            <div class="marquee-ads-item">{{ formatIsEnabled(item.enable) }}</div>
            <div class="marquee-ads-item">{{ item.publishDate }}</div>
            <div class="marquee-ads-item">{{ item.modifyDate }}</div>
            <div class="marquee-ads-item action-buttons">
              <q-btn
                flat
                round
                color="primary"
                icon="edit"
                size="sm"
                @click="handleEdit(item)"
              >
                <q-tooltip>編輯</q-tooltip>
              </q-btn>
              <q-btn
                flat
                round
                color="negative"
                icon="delete"
                size="sm"
                @click="handleDelete(item)"
              >
                <q-tooltip>刪除</q-tooltip>
              </q-btn>
            </div>
          </div>

          <!-- 分頁控制器 -->
          <div class="pagination-container">
            <q-pagination
              v-model="currentPage"
              :max="totalPages"
              :max-pages="7"
              boundary-numbers
              direction-links
              @update:model-value="handlePageChange"
            />
            <div class="page-info">
              共 {{ totalItems }} 筆資料，每頁顯示 {{ itemsPerPage }} 筆
            </div>
          </div>
        </div>
      </div>

      <!-- 新增按鈕彈窗 -->
      <q-dialog v-model="showAddDialog" persistent>
        <q-card style="min-width: 500px">
          <q-card-section class="row items-center q-pb-none">
            <div class="text-h6">新增跑馬燈</div>
            <q-space />
            <q-btn icon="close" flat round dense v-close-popup />
          </q-card-section>

          <q-card-section class="q-pt-sm">
            <q-form @submit="onSubmit" class="q-gutter-md">
              <!-- 圖片上傳 -->
              <div class="row items-center">
                <q-input
                  v-model="formData.imageUrl"
                  label="圖片"
                  outlined
                  dense
                  class="col"
                  readonly
                />
                <q-btn
                  label="上傳圖片"
                  color="primary"
                  class="q-ml-sm"
                  @click="handleImageUpload('add')"
                />
              </div>
              
              <!-- 圖片預覽 -->
              <div v-if="formData.imageUrl" class="image-preview">
                <img :src="formData.imageUrl" alt="圖片預覽" />
              </div>

              <!-- 鏈結 -->
              <q-input
                v-model="formData.linkUrl"
                label="鏈結"
                outlined
                dense
                :rules="[]"
              />

              <!-- 排序 -->
              <q-input
                v-model="formData.displayOrder"
                label="排序"
                type="number"
                outlined
                dense
                :rules="[val => !!val || '請輸入排序']"
              />

              <!-- 啟用狀態 -->
              <div class="row items-center">
                <span class="q-mr-sm">啟用：</span>
                <q-toggle v-model="formData.enable" />
              </div>

              <!-- 按鈕 -->
              <div class="row justify-end q-mt-md">
                <q-btn label="清除" color="grey" flat class="q-mr-sm" @click="resetForm" />
                <q-btn label="新增" type="submit" color="primary" />
              </div>
            </q-form>
          </q-card-section>
        </q-card>
      </q-dialog>

      <!-- 編輯按鈕彈窗 -->
      <q-dialog v-model="showEditDialog" persistent>
        <q-card style="min-width: 500px">
          <q-card-section class="row items-center q-pb-none">
            <div class="text-h6">編輯跑馬燈</div>
            <q-space />
            <q-btn icon="close" flat round dense v-close-popup />
          </q-card-section>

          <q-card-section class="q-pt-sm">
            <q-form @submit="onEditSubmit" class="q-gutter-md">
              <!-- 圖片上傳 -->
              <div class="row items-center">
                <q-input
                  v-model="editFormData.imageUrl"
                  label="圖片"
                  outlined
                  dense
                  class="col"
                  readonly
                />
                <q-btn
                  label="上傳圖片"
                  color="primary"
                  class="q-ml-sm"
                  @click="handleImageUpload('edit')"
                />
              </div>

              <!-- 圖片預覽 -->
              <div v-if="editFormData.imageUrl" class="image-preview">
                <img :src="editFormData.imageUrl" alt="圖片預覽" />
              </div>

              <!-- 鏈結 -->
              <q-input
                v-model="editFormData.linkUrl"
                label="鏈結"
                outlined
                dense
                :rules="[]"
              />

              <!-- 排序 -->
              <q-input
                v-model="editFormData.displayOrder"
                label="排序"
                type="number"
                outlined
                dense
                :rules="[val => !!val || '請輸入排序']"
              />

              <!-- 啟用狀態 -->
              <div class="row items-center">
                <span class="q-mr-sm">啟用：</span>
                <q-toggle v-model="editFormData.enable" />
              </div>

              <!-- 按鈕 -->
              <div class="row justify-end q-mt-md">
                <q-btn label="清除" color="grey" flat class="q-mr-sm" @click="resetEditForm" />
                <q-btn label="更新" type="submit" color="primary" />
              </div>
            </q-form>
          </q-card-section>
        </q-card>
      </q-dialog>

      <!-- 隱藏的檔案上傳輸入框 -->
      <input 
        type="file" 
        ref="fileInput" 
        style="display: none" 
        accept="image/*" 
        @change="onFileSelected" 
      />
    </q-page>
  </q-page-container>
</template> 

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from "vue-router";
import { useQuasar, Notify} from 'quasar';

// 初始化 Quasar
const $q = useQuasar();

// 使用 Vue Router 來進行導航
const router = useRouter();

// 導航至指定路徑
const navigateTo = (route) => {
  if (route) {
    router.push(route);
  } else {
    router.push("/");
  }
};


// 定義跑馬燈的響應式變量
const marqueeAds = ref([]); 

const currentPage = ref(1);
const itemsPerPage = 20; // 每頁顯示 20 筆資料

// 計算總頁數
const totalPages = computed(() => {
  return Math.ceil(marqueeAds.value.length / itemsPerPage);
});

// 計算總筆數
const totalItems = computed(() => {
  return marqueeAds.value.length;
});

// 計算當前頁面應該顯示的資料
const paginatedMarqueeAds = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return marqueeAds.value.slice(start, end);
});

// 在元件掛載時，從 API 獲取跑馬燈
onMounted(async function() {
  let response = await fetch('http://localhost:8080/marquee-ads');
  let data = await response.json();
  marqueeAds.value = data;
});

const handlePageChange = (page) => {
  currentPage.value = page;
};

// 控制彈出視窗顯示
const showAddDialog = ref(false);

// 定義表單資料
const formData = ref({
  imageUrl: '',
  linkUrl: '',
  displayOrder: '',
  enable: true,
  publishDate: '',
  modifyDate: '',
});

// 新增按鈕
const handleAdd = () => {
  showAddDialog.value = true;
};

// 新增跑馬跑馬提交
const onSubmit = async () => {
  try {
    // 將表單數據轉換為 raw 字符串，確保 categoryId 是純數字
    const rawData = JSON.stringify({
      imageUrl: formData.value.imageUrl,
      linkUrl: formData.value.linkUrl,
      displayOrder: formData.value.displayOrder,
      enable: formData.value.enable
    });

    const response = await fetch('http://localhost:8080/marquee-ads', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: rawData
    });

    if (response.ok) {
      // 提交成功後重新獲取數據
      let newData = await fetch('http://localhost:8080/marquee-ads');
      marqueeAds.value = await newData.json();
      
      // 關閉彈窗並重置表單
      showAddDialog.value = false;
      resetForm();
      
      Notify.create({
        color: 'positive',
        message: '新增成功',
        position: 'top',
        timeout: 1500
      });
    }
  } catch (error) {
    Notify.create({
      color: 'negative',
      message: '新增失敗',
      position: 'top',
      timeout: 1500
    });
  }
};

// 重置表單
const resetForm = () => {
  formData.value = {
    imageUrl: '',
    linkUrl: '',
    displayOrder: '',
    enable: true,
    publishDate: '',
    modifyDate: ''
  };
};

// 檔案輸入
const fileInput = ref(null);
// 當前操作模式 (add 或 edit)
const currentMode = ref(null);

// 處理圖片上傳
const handleImageUpload = (mode) => {
  // 設置當前模式
  currentMode.value = mode;
  // 觸發檔案選擇器
  fileInput.value.click();
};

// 處理檔案選擇
const onFileSelected = async (event) => {
  // 檢查事件和檔案是否存在
  if (!event || !event.target || !event.target.files || !event.target.files[0]) {
    console.error('未選擇檔案或檔案選擇事件無效');
    try {
      $q.notify({
        color: 'negative',
        message: '未選擇檔案或檔案選擇事件無效',
        position: 'top',
        timeout: 1500
      });
    } catch (e) {
      console.error('通知顯示失敗:', e);
      alert('未選擇檔案或檔案選擇事件無效');
    }
    return;
  }

  const file = event.target.files[0];
  
  // 使用本地變量來追蹤上傳狀態
  let isUploading = true;
  
  // 使用 notify 來顯示上傳中的狀態，而不是使用 loading
  let uploadingNotification = null;
  try {
    if ($q && $q.notify) {
      uploadingNotification = $q.notify({
        color: 'info',
        message: '正在上傳圖片，請稍候...',
        position: 'top',
        timeout: 0 // 不自動關閉
      });
      console.log('上傳通知已顯示');
    }
  } catch (notifyError) {
    console.error('顯示上傳通知時發生錯誤:', notifyError);
  }

  try {
    // 輸出 $q 物件的狀態，幫助診斷問題
    console.log('$q 物件狀態:', {
      exists: !!$q,
      hasLoading: $q && !!$q.loading,
      hasNotify: $q && !!$q.notify,
      hasDialog: $q && !!$q.dialog
    });
    
    console.log('開始上傳圖片:', file.name, file.type, file.size);

    // 建立 FormData
    const uploadFormData = new FormData();
    uploadFormData.append('image', file);
    
    console.log('FormData 已建立，參數名稱: image');

    // 發送圖片上傳請求
    console.log('開始發送上傳請求到:', 'http://localhost:8080/imgur/upload');
    const response = await fetch('http://localhost:8080/imgur/upload', {
      method: 'POST',
      body: uploadFormData
    });

    console.log('上傳響應狀態:', response.status, response.statusText);
    
    // 獲取響應文本以便調試
    const responseText = await response.text();
    console.log('上傳響應內容:', responseText);
    
    // 嘗試解析 JSON
    let data;
    try {
      data = JSON.parse(responseText);
    } catch (e) {
      console.error('解析響應 JSON 失敗:', e);
      throw new Error(`無法解析伺服器響應: ${responseText}`);
    }

    if (!response.ok) {
      console.error('伺服器返回錯誤狀態碼:', response.status);
      throw new Error(`伺服器錯誤 (${response.status}): ${data.message || responseText}`);
    }

    // 檢查返回的數據格式 - 後端返回格式為 {url: "圖片URL", success: true}
    if (!data.url || !data.success) {
      console.error('伺服器返回的數據格式不正確:', data);
      throw new Error('伺服器返回的數據格式不正確');
    }
    
    // 使用 url 字段
    const imageUrl = data.url;
    
    // 更新對應表單的圖片 URL
    if (currentMode.value === 'add') {
      // 確保 formData.value 存在
      if (!formData.value) {
        console.warn('formData.value 不存在，重新初始化');
        formData.value = {
          imageUrl: '',
          linkUrl: '',
          displayOrder: '',
          enable: true,
          publishDate: '',
          modifyDate: ''
        };
      }
      formData.value.imageUrl = imageUrl;
      console.log('已更新新增表單的圖片 URL:', imageUrl);
    } else if (currentMode.value === 'edit') {
      // 確保 editFormData.value 存在
      if (!editFormData.value) {
        console.warn('editFormData.value 不存在，重新初始化');
        editFormData.value = {
          adId: '',
          imageUrl: '',
          linkUrl: '',
          displayOrder: '',
          enable: true
        };
      }
      editFormData.value.imageUrl = imageUrl;
      console.log('已更新編輯表單的圖片 URL:', imageUrl);
    } else {
      console.warn('未知的操作模式:', currentMode.value);
    }

    // 顯示成功提示
    try {
      if ($q && $q.notify) {
        $q.notify({
          color: 'positive',
          message: '圖片上傳成功',
          position: 'top',
          timeout: 1500
        });
        console.log('成功通知已顯示');
      } else {
        console.warn('無法顯示通知，$q.notify 不可用');
        alert('圖片上傳成功');
      }
    } catch (notifyError) {
      console.error('顯示成功通知時發生錯誤:', notifyError);
      alert('圖片上傳成功');
    }
  } catch (error) {
    console.error('圖片上傳失敗:', error);
    
    // 顯示詳細錯誤信息
    try {
      if ($q && $q.notify) {
        $q.notify({
          color: 'negative',
          message: `圖片上傳失敗: ${error.message}`,
          position: 'top',
          timeout: 3000
        });
        console.log('錯誤通知已顯示');
      } else {
        console.warn('無法顯示通知，$q.notify 不可用');
        alert(`圖片上傳失敗: ${error.message}`);
      }
    } catch (notifyError) {
      console.error('顯示錯誤通知時發生錯誤:', notifyError);
      alert(`圖片上傳失敗: ${error.message}`);
    }
  } finally {
    // 標記上傳已完成
    isUploading = false;
    
    // 關閉上傳中通知
    if (uploadingNotification) {
      try {
        uploadingNotification();  // 在 Quasar 中，通知函數返回的是一個用於關閉通知的函數
        console.log('上傳通知已關閉');
      } catch (e) {
        console.error('關閉上傳通知時發生錯誤:', e);
      }
    }
    
    // 重置檔案輸入以允許再次選擇相同檔案
    if (event.target) {
      event.target.value = null;
      console.log('檔案輸入已重置');
    }
  }
};

// 控制編輯彈窗顯示
const showEditDialog = ref(false);

// 編輯表單數據
const editFormData = ref({
  adId: '',
  imageUrl: '',
  linkUrl: '',
  displayOrder: '',
  enable: true
});

// 編輯跑馬燈功能
const handleEdit = (item) => {
  editFormData.value = {
    ...item,
  };
  showEditDialog.value = true; // 打開編輯對話框
};

// 編輯跑馬燈提交
const onEditSubmit = async () => {
  try {
    // 將編輯表單數據轉換為 raw 字符串
    const rawData = JSON.stringify({
      adId: editFormData.value.adId,
      imageUrl: editFormData.value.imageUrl,
      linkUrl: editFormData.value.linkUrl,
      displayOrder: editFormData.value.displayOrder,
      enable: editFormData.value.enable
    });

    const response = await fetch(`http://localhost:8080/marquee-ads/${editFormData.value.adId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: rawData
    });

    if (response.ok) {
      // 更新成功後重新獲取數據
      let newData = await fetch('http://localhost:8080/marquee-ads');
      marqueeAds.value = await newData.json();
      
      // 關閉彈窗
      showEditDialog.value = false;
      
      Notify.create({
        color: 'positive',
        message: '更新成功',
        position: 'top',
        timeout: 1500
      });
    }
  } catch (error) {
    Notify.create({
      color: 'negative',
      message: '更新失敗',
      position: 'top',
      timeout: 1500
    });
  }
};

// 重置編輯表單
const resetEditForm = () => {
  editFormData.value = {
    imageUrl: '',
    linkUrl: '',
    displayOrder: '',
    enable: true
  };
};

// 刪除跑馬燈功能
const handleDelete = (item) => {
  $q.dialog({
    title: '刪除確認',
    message: `確定要刪除此跑馬燈嗎？`,
    ok: {
      label: '確定',
      flat: true,
      color: 'negative'
    },
    cancel: {
      label: '取消',
      flat: true,
      color: 'grey'
    },
    persistent: true
  }).onOk(async () => {
    try {
      // 發送刪除請求
      const response = await fetch(`http://localhost:8080/marquee-ads/${item.adId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (!response.ok) {
        throw new Error('刪除失敗');
      }

      // 直接從 marqueeAds.value 過濾已刪除的項目
      marqueeAds.value = marqueeAds.value.filter(marqueeAdsItem => marqueeAdsItem.adId !== item.adId);

      // 顯示成功提示
      $q.notify({
        color: 'positive',
        message: '刪除成功',
        position: 'top',
        timeout: 1500
      });
    } catch (error) {
      $q.notify({
        color: 'negative',
        message: '刪除失敗',
        position: 'top',
        timeout: 1500
      });
    }
  });
};

const formatIsEnabled = (value) => {
  return value ? '是' : '否';
};

// 無法透過:deep 設定 tooltip 的樣式，所以使用內聯樣式處理
const tooltipStyle = {
  width: '450px',            // 讓 Tooltip 寬度根據內容變化
  maxWidth: '450px',         // 設定最大寬度
  whiteSpace: 'normal',      // 允許文字換行
  wordWrap: 'break-word',    // 允許文字換行
  background: 'rgba(0, 0, 0, 0.8)',  // 設定背景色
  color: 'white',            // 設定文字顏色
  padding: '10px',           // 設定 padding
  borderRadius: '8px',       // 設定圓角
  fontSize: '14px',          // 調小字體大小
  lineHeight: '1.4'          // 調整行高
};

</script>

<style scoped>
.marquee-ads-management-container {
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
/* 以下為表格樣式 */
.marquee-ads-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

.marquee-ads-table {
  width: 70%;
  margin: 0 auto;
  border: 1px solid #ddd;
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 20px;
}

.header {
  width: 70%;
  margin: 0 auto;
  display: flex;
  justify-content: flex-end;
  margin-bottom: 16px;
}

.table-header {
  display: grid;
  grid-template-columns: 
    1fr    /* 跑馬燈編號 */
    2fr    /* 圖片 */
    2fr    /* 鏈結 */
    1fr    /* 排序 */
    1fr    /* 是否啟用 */
    1.5fr  /* 發布時間 */
    1.5fr  /* 更新時間 */
    1fr;   /* 操作 */
  background-color: #ADADAD;
  font-weight: bold;
  border-bottom: 2px solid #ddd;
}

.header-item, .marquee-ads-item {
  padding: 12px 8px;
  text-align: center;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.marquee-ads-row {
  display: grid;
  grid-template-columns: 
    1fr    /* 跑馬燈編號 */
    2fr    /* 圖片 */
    2fr    /* 鏈結 */
    1fr    /* 排序 */
    1fr    /* 是否啟用 */
    1.5fr  /* 發布時間 */
    1.5fr  /* 更新時間 */
    1fr;   /* 操作 */
  border-bottom: 1px solid #ddd;
}

.marquee-ads-row:nth-child(even) {
  background-color: #f9f9f9;
}

.marquee-ads-row:hover {
  background-color: #f5f5f5;
}


/* 分頁相關樣式 */
.pagination-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 0;
  background-color: white;
  border-top: 1px solid #ddd;
}

.page-info {
  margin-top: 10px;
  color: #666;
  font-size: 14px;
}

.ellipsis {
  position: relative; /* 設定相對定位 */
  cursor: pointer;    /* 滑鼠移上去變成手型 */
}

.ellipsis:hover {
  background-color: rgba(0, 0, 0, 0.05); /* 當滑鼠懸停時改變背景色 (表格欄位) */
}

/* 操作按鈕 */
.action-buttons {
  display: flex;
  justify-content: center;
  gap: 8px;
  align-items: center;
}

/* 新增彈窗 */
.q-card {
  max-width: 500px;
  width: 100%;
}

.q-form {
  padding: 20px;
}

/* 圖片預覽樣式 */
.image-preview {
  max-width: 100%;
  margin-top: 10px;
  text-align: center;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 5px;
}

.image-preview img {
  max-width: 100%;
  max-height: 200px;
  object-fit: contain;
}

@media (max-width: 768px) {
  .bg-grey-3 {
    padding: 20px;
    width: 100%;
    margin: 0% auto;
    height: 50px;
  }
}
</style>
