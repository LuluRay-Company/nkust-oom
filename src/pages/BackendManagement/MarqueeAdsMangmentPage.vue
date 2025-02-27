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
                  @click="handleImageUpload"
                />
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
                  @click="handleImageUpload"
                />
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

// 處理圖片上傳
const handleImageUpload = () => {
  // 這裡添加圖片上傳邏輯
  console.log('上傳圖片');
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

@media (max-width: 768px) {
  .bg-grey-3 {
    padding: 20px;
    width: 100%;
    margin: 0% auto;
    height: 50px;
  }
}
</style>
