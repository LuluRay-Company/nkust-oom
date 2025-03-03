<template>
  <q-page-container>
    <q-page class="news-detail-container">
      <q-toolbar class="bg-grey-3 full-width">
        <q-btn flat @click="navigateTo()" class="text-bold" label="首頁" />
        <span class="separator">/</span>
        <q-btn
          flat
          @click="navigateTo('news')"
          class="text-bold"
          label="最新消息"
        />
      </q-toolbar>

      <div class="news-detail-title">
        <h4>{{ newsItem.title }}</h4>
        <p>{{ newsItem.date }}</p>
      </div>
      <div class="news-detail-content">
        <img :src="getImageUrl(newsItem.photo)" alt="News Image" />
        <p v-html="newsItem.content"></p>
        <br />
        <div
          class="file-download"
          v-if="newsItem.files && newsItem.files.length > 0"
        >
          <div
            v-for="(file, index) in newsItem.files"
            :key="index"
            class="file-item"
          >
            <q-icon
              name="insert_drive_file"
              color="grey"
              style="margin-right: 15px"
              size="30px"
            />
            <a :href="getFileUrl(file.name)" download>{{ file.name }}</a>
          </div>
        </div>
      </div>
    </q-page>
  </q-page-container>
</template>

<script setup>
import { computed, onMounted, reactive } from "vue";
import { useRoute, useRouter } from "vue-router";

// 獲取路由參數
const route = useRoute();
const router = useRouter();
// 導航至指定路徑
const navigateTo = (route) => {
  if (route) {
    router.push(`/${route}`);
  } else {
    router.push("/");
  }
};
const getFileUrl = (fileName) => {
  return `/files/${fileName}`;
};

// 模擬的新聞數據
const news = reactive([
  // 添加多筆新聞資料以示範

  {
    id: 1,
    photo: "newszero.jpg",
    title:
      "【轉知】財政部為蒐集114年招商大會商機案源，請於時限內依附表格式提供114年7月至115年6月預計公告招商之民間參與公共建設案件，免備文以電子郵件送部，請查照。",
    date: "2024/11/21",
    content: "",
    files: [
      {
        name: "台財促字第11325535200號.pdf",
      },
      {
        name: "填報表格式.ods",
      },
    ],
  },
  {
    id: 2,
    photo: "newszero.jpg",
    title:
      "【轉知】財政部函示促進民間參與公共建設法第3條第1項第1款「交通建設及共同管道」類別業經政策評估通過，機關得就該類別之個案採行政府有償取得公共服務模式辦理一案，轉請查照。",
    date: "2024/10/28",
    content: "",
    files: [
      {
        name: "台財促字第11325531890號.pdf",
      },
    ],
  },
  {
    id: 3,
    photo: "newszero.jpg",
    title:
      "【轉知】財政部敬邀貴機關及專家學者踴躍投稿「促進民間參與公共建設電子報」，詳如原函說明，轉請查照。",
    date: "2024/10/11",
    content: "",
    files: [
      {
        name: "台財促字第11325529870號.pdf",
      },
    ],
  },
  {
    id: 4,
    photo: "newszero.jpg",
    title: "【轉知】財政部檢送「中華民國112年度促參年報」，轉請查照。",
    date: "2024/08/14",
    content: "",
    files: [
      {
        name: "臺教秘(二)字第1130080395號.pdf",
      },
    ],
  },
  {
    id: 5,
    photo: "newszero.jpg",
    title:
      "【轉知】檢送113年版「民間自備私有土地興建、擁有及營運（B (R)OO）案招商文件（含甄審須知及投資契約）範本」1 份，請查照並轉知所屬。",
    date: "2024/08/08",
    content: "",
    files: [
      {
        name: "台財促字第11325523610號.pdf",
      },
      {
        name: "民間自備私有土地_興建、擁有及營運(B(R)OO)案_投資契約範本.pdf",
      },
      {
        name: "民間自備私有土地_興建、擁有及營運(B(R)OO)案_甄審須知範本.pdf",
      },
    ],
  },
  {
    id: 6,
    photo: "newszero.jpg",
    title:
      "【轉知】財政部自即日起至113年9月30日止，受理各機關申請補助 114年度促進民間參與公共建設案件（下稱促參案件）前 置作業費用，請查照。",
    date: "2024/08/08",
    content: "",
    files: [
      {
        name: "公共建設促參預評估檢核表.odt",
      },
      {
        name: "台財促字第11325523390號.pdf",
      },
      {
        name: "申請補助案件審查項目檢核表.odt",
      },
      {
        name: "委託工作項目及預算分配明細表.odt",
      },
      {
        name: "前置作業費用補助款申請表.odt",
      },
      {
        name: "簡報.pdf",
      },
    ],
  },
  {
    id: 7,
    photo: "newszero.jpg",
    title:
      "【轉知】財政部訂定「促進民間參與公共建設案件全生命週期作業手 冊」(下稱促參作業手冊)第三篇及第四篇，請查照並轉知 所屬機關(構)。",
    date: "2024/08/08",
    content: "",
    files: [
      {
        name: "台財促字第11325523210號.pdf",
      },
    ],
  },
  {
    id: 8,
    photo: "newszero.jpg",
    title:
      "【轉知】檢送「財政部委託辦理促進民間參與公共建設專業人員訓練及考試作業須知」，詳如原函，轉請查照。",
    date: "2024/07/11",
    content: "",
    files: [
      {
        name: "台財促字第11325520590號.pdf",
      },
      {
        name: "財政部委託辦理促進民間參與公共建設專業人員訓練及考試作業須知.pdf",
      },
    ],
  },
  {
    id: 9,
    photo: "newszero.jpg",
    title:
      "【轉知】財政部函示有關促參案件於核定可行性評估報告及先期計畫書後，於招商前遇規劃條件變動之作業程序一案，詳原函說明，轉請查照。1",
    date: "2024/07/11",
    content: "",
    files: [
      {
        name: "台財促字第11325520240號.pdf",
      },
    ],
  },
  {
    id: 10,
    photo: "newszero.jpg",
    title:
      "【轉知】財政部訂於113年8月14日假福爾摩沙遊艇酒店水景廳舉辦「促參執行機關主管研習會」，詳如原函說明，請視業務需求派員參加，請查照。",
    date: "2024/07/11",
    content: "",
    files: [
      {
        name: "台財促字第11325520280號.pdf",
      },
      {
        name: "財政部113年「促參執行機關主管研習會」.odt",
      },
      {
        name: "財政部113年「促參執行機關主管研習會」報名表.pdf",
      },
      {
        name: "財政部113年「促參執行機關主管研習會」意見交流單.pdf",
      },
    ],
  },
  {
    id: 11,
    photo: "newszero.jpg",
    title:
      "【轉知】修正「教育部辦理促進民間參與公共建設案件獎勵金支用 原則」，名稱並修正為「教育部辦理民間參與公共建設案 件獎勵金支用原則」，並自即日生效，請查照。",
    date: "2024/07/02",
    content: "",
    files: [
      {
        name: "教育部辦理民間參與公共建設案件獎勵金支用原則.odt",
      },
      {
        name: "教育部辦理促進民間參與公共建設案件獎勵金支用原則修正對照表.odt",
      },
      {
        name: "教育部辦理促進民間參與公共建設案件獎勵金支用原則修正總說明.odt",
      },
      {
        name: "臺教秘(二)字第1130062615號.pdf",
      },
    ],
  },
  {
    id: 12,
    photo: "newszero.jpg",
    title:
      "【轉知】財政部檢送「促進民間參與公共建設案件財務評估指引」 1份，轉請查照。",
    date: "2024/06/20",
    content: "",
    files: [
      {
        name: "台財促字第11325517840號.pdf",
      },
      {
        name: "促進民間參與公共建設案件財務評估指引.pdf",
      },
    ],
  },
  {
    id: 13,
    photo: "newszero.jpg",
    title:
      "【轉知】財政部訂於113年7月31日(星期三)辦理「促參業務整合窗口主管研習會」，詳如原函說明，請視業務需求派員參加，請查照。",
    date: "2024/06/20",
    content: "",
    files: [
      {
        name: "台財促字第11325517581號.pdf",
      },
      {
        name: "財政部「促參業務整合窗口主管研習會」報名表.odt",
      },
      {
        name: "財政部「促參業務整合窗口主管研習會」意見交流單.odt",
      },
      {
        name: "財政部113年「促參業務整合窗口主管研習會」活動邀請.odt",
      },
    ],
  },
  {
    id: 14,
    photo: "newszero.jpg",
    title:
      "【轉知】財政部訂定「促進民間參與公共建設案件全生命週期作業手冊」第一篇及第二篇，轉請查照。",
    date: "2024/06/14",
    content: "",
    files: [
      {
        name: "台財促字第11325518130號.pdf",
      },
    ],
  },
  {
    id: 15,
    photo: "newszero.jpg",
    title:
      "【轉知】檢送財政部113年版「主辦機關辦理有償新建、移轉及營運（BTO）案招商文件範本」及「新建、營運及移轉（BOT）案招商文件範本」，請查照。",
    date: "2024/06/12",
    content: "",
    files: [
      {
        name: "主辦機關辦理_新建、營運及移轉(BOT)案申請須知範本.pdf",
      },
      {
        name: "主辦機關辦理_新建、營運及移轉(BOT)案投資契約範本.pdf",
      },
      {
        name: "主辦機關辦理有償_新建、移轉及營運(BTO)案公告事項.pdf",
      },
      {
        name: "主辦機關辦理有償_新建、移轉及營運(BTO)案申請須知範本.pdf",
      },
      {
        name: "主辦機關辦理有償_新建、移轉及營運(BTO)案投資契約範本.pdf",
      },
      {
        name: "台財促字第11325517320號.pdf",
      },
    ],
  },
  {
    id: 16,
    photo: "newszero.jpg",
    title:
      "【轉知】財政部函示辦理促參案件，於促進民間參與公共建設法、促參法施行細則暨其相關法令修正施行後，新舊法規適用原則，詳如原函說明，轉請查照。",
    date: "2024/05/28",
    content: "",
    files: [
      {
        name: "台財促字第11325515680號.pdf",
      },
    ],
  },
  {
    id: 17,
    photo: "金擘獎徵選活動海報.jpg",
    title:
      "【轉知】財政部主辦第22屆民間參與公共建設金擘獎受理申請期限至113年5月31日，即將截止，請查照轉知並鼓勵參與案件之民間機構踴躍申請。",
    date: "2024/05/28",
    content: "",
    files: [
      {
        name: "113年度促進民間參與公共建設業務考核計畫.pdf",
      },
      {
        name: "台財促字第11325515840號.pdf",
      },
      {
        name: "金擘獎徵選活動海報.jpg",
      },
      {
        name: "活動客服LINE.jpg",
      },
    ],
  },
  {
    id: 18,
    photo: "newszero.jpg",
    title:
      "【轉知】財政部重申民間參與公共建設案件應依規定期限完成基本資訊登載及民間投資金額認定事宜，以避免發生未獲核發簽約獎勵金情事一案，詳原函說明，轉請查照。",
    date: "2024/05/14",
    content: "",
    files: [
      {
        name: "台財促字第11325514390號.pdf",
      },
    ],
  },
  {
    id: 19,
    photo: "金擘獎徵選活動海報.jpg",
    title:
      "【轉知】第22屆民間參與公共建設金擘獎受理申請期限至113年5月 31日止，期限將屆，請協助轉知並提醒所屬機關（構）及 參與貴管公共建設案件之民間機構踴躍申請，請查照。",
    date: "2024/05/06",
    content: "",
    files: [
      {
        name: "台財促字第11325513350號.pdf",
      },
      {
        name: "金擘獎徵選活動海報.jpg",
      },
      {
        name: "活動客服LINE.jpg",
      },
    ],
  },
  {
    id: 20,
    photo: "newszero.jpg",
    title:
      "【轉知】函轉財政部「第22屆民間參與公共建設金擘獎徵選說明會及觀摩活動計畫」1份，並請依業務需要自行派員於113年4月8日前報名參加前開活動，請查照。",
    date: "2024/04/01",
    content: "",
    files: [
      {
        name: "財政部第22屆民間參與公共建設金擘獎徵選說明會及觀摩活動計畫.pdf",
      },
      {
        name: "台財促字第11325508751號.pdf",
      },
    ],
  },
  {
    id: 21,
    photo: "newszero.jpg",
    title:
      "【轉知】財政部函為促進民間參與公共建設法第3條第1項第2款「環境污染防治設施」類別政策評估通過，主辦機關得就該類別之個案採行政府有償取得公共服務模式辦理一案，轉請查照。",
    date: "2024/03/29",
    content: "",
    files: [
      {
        name: "台財促字第11325508060號.pdf",
      },
    ],
  },
  {
    id: 22,
    photo: "newszero.jpg",
    title:
      "【轉知】函轉財政部「第22屆民間參與公共建設金擘獎」申請作業手冊，請查照踴躍申請。",
    date: "2024/03/29",
    content: "",
    files: [
      {
        name: "台財促字第11325508460號.pdf",
      },
      {
        name: "第22屆民間參與公共建設金擘獎申請作業手冊.pdf",
      },
    ],
  },
  {
    id: 23,
    photo: "newszero.jpg",
    title:
      "經營管理處自111年8月1日成立（任務編組），112年2月1日正式納入本校組織規程。",
    date: "2024/03/25",
    content:
      "經營管理處自111年8月1日成立（任務編組），112年2月1日正式納入本校組織規程。<br>經營管理處置處長一人，掌理重大工程之先期評估與規劃設計、資產之開發、營運空間與項目活化事宜。<br>分設規劃評估、 開發活化 二組，各組置組長一人。<br><br>經營管理處：Office of Operations and Management (OOM)<br>規劃評估組：Operational Planning and Organizational Assessment Division<br>開發活化組：	Marketing and Spatial Activation Division",
    files: [
      {
        name: "1-1.組織規程核定本-1120201生效.pdf",
      },
    ],
  },
  {
    id: 24,
    photo: "newszero.jpg",
    title:
      "【轉知】修正「機關辦理民間參與公共建設案件資訊蒐集及獎勵金核發作業要點」(下稱本作業要點)，自即日生效。",
    date: "2024/03/18",
    content: "",
    files: [
      {
        name: "台財促字第11325502130號.pdf",
      },
      {
        name: "機關辦理民間參與公共建設案件資訊蒐集及獎勵金核發作業要點.pdf",
      },
      {
        name: "機關辦理民間參與公共建設案件資訊蒐集及獎勵金核發作業要點修正對照表.pdf",
      },
      {
        name: "機關辦理民間參與公共建設案件資訊蒐集及獎勵金核發作業要點修正總說明.pdf",
      },
    ],
  },
  {
    id: 25,
    photo: "newszero.jpg",
    title:
      "【轉知】修正「機關辦理民間參與公共建設案件資訊蒐集及獎勵金核發作業要點」(下稱本作業要點)，自即日生效。",
    date: "2024/02/29",
    content: "",
    files: [
      {
        name: "台財促字第11325501900號.pdf",
      },
      {
        name: "民間參與公共建設金擘獎頒發作業要點修正規定.pdf",
      },
      {
        name: "民間參與公共建設金擘獎頒發作業要點修正對照表.pdf",
      },
      {
        name: "民間參與公共建設金擘獎頒發作業要點修正總說明.pdf",
      },
      {
        name: "臺教秘(二)字第1130020604號.pdf",
      },
    ],
  },
  {
    id: 26,
    photo: "newszero.jpg",
    title:
      "【轉知】「促進民間參與公共建設案件招商文件公開閱覽作業要點」，業經財政部訂定發布，轉請查照。",
    date: "2024/01/30",
    content: "",
    files: [
      {
        name: "台財促字第11325500330號.pdf",
      },
      {
        name: "台財促字第11325500331號.pdf",
      },
      {
        name: "促進民間參與公共建設案件招商文件公開閱覽作業要點.pdf",
      },
    ],
  },
  {
    id: 27,
    photo: "newszero.jpg",
    title:
      "【轉知】修正「財政部辦理促進民間參與公共建設案件督導及考核 作業要點」部分規定，並自即日生效，請查照並轉知所屬。",
    date: "2024/01/24",
    content: "",
    files: [
      {
        name: "台財促字第11225541730號.pdf",
      },
      {
        name: "財政部辦理促進民間參與公共建設案件督導及考核作業要點_部分規定_修正規定.pdf",
      },
      {
        name: "財政部辦理促進民間參與公共建設案件督導及考核作業要點_部分規定_修正對照表.pdf",
      },
      {
        name: "財政部辦理促進民間參與公共建設案件督導及考核作業要點部分規定修正總說明.pdf",
      },
    ],
  },
  {
    id: 28,
    photo: "newszero.jpg",
    title:
      "【轉知】修正「行政院促進民間參與公共建設推動小組設置要點」 第三點，並自即日生效，請查照。",
    date: "2023/11/15",
    content: "",
    files: [
      {
        name: "修正行政院促進民間參與公共建設推動小組設置_第三點.pdf",
      },
      {
        name: "院臺財字第1125023224號.pdf",
      },
    ],
  },
  {
    id: 29,
    photo: "newszero.jpg",
    title:
      "【轉知】有關促進民間參與公共建設法（下稱促參法）施行細則第 9條第2項第2款規定適用情形，詳如說明，請查照並轉知所屬。",
    date: "2023/10/20",
    content: "",
    files: [
      {
        name: "台內宗字第1120137077號.pdf",
      },
      {
        name: "台財促字第11200673930號.pdf",
      },
      {
        name: "高市殯處綜字第11270867100號.pdf",
      },
    ],
  },
  {
    id: 30,
    photo: "newszero.jpg",
    title:
      "【轉知】行政院公共工程委員會98年3月19日工程促字第09800114010號函，自即日起停止適用。",
    date: "2023/09/23",
    content: "",
    files: [
      {
        name: "工程促字第09800114010號函.pdf",
      },
      {
        name: "台財促字第11225528100號.pdf",
      },
      {
        name: "臺教秘(二)字第1120091256號.pdf",
      },
    ],
  },
  {
    id: 31,
    photo: "newszero.jpg",
    title:
      "【轉知】財政部修正「促進民間參與公共建設法之重大公共建設範圍」,並自即日生效。",
    date: "2023/08/29",
    content: "",
    files: [
      {
        name: "台財促字第11225526790號.pdf",
      },
      {
        name: "台財促字第11225526793號.pdf",
      },
      {
        name: "促進民間參與公共建設法之重大公共建設範圍.pdf",
      },
      {
        name: "臺教秘(二)字第1120084753號.pdf",
      },
    ],
  },
  {
    id: 32,
    photo: "newszero.jpg",
    title:
      "【轉知】有關「政府有償取得公共服務政策評估作業辦法」，經財政部112年6月20日台財促字第11225516260號令訂定發布",
    date: "2023/06/28",
    content: "",
    files: [
      {
        name: "台財促字第11225516260號令.pdf",
      },
      {
        name: "台財促字第11225516263號.pdf",
      },
      {
        name: "政府有償取得公共服務政策評估作業辦法.pdf",
      },
      {
        name: "臺教秘(二)字第1120062364號.pdf",
      },
    ],
  },
  {
    id: 33,
    photo: "newszero.jpg",
    title:
      "【活動轉知】財政部訂於112年6月8日辦理112年度促參教育訓練「履約管理與資產總檢查及優先定約班」",
    date: "2023/05/19",
    content: "",
    files: [
      {
        name: "臺教秘(二)字第1120049411號.pdf",
      },
      {
        name: "台財促字第11225515350號.pdf",
      },
      {
        name: "112年促參教育訓練「履約管理與資產總檢查及優先定約班」報名簡章.pdf",
      },
    ],
  },
  {
    id: 34,
    photo: "newszero.jpg",
    title:
      "【轉知】財政部更正112年2月20日台財促字第11225504720號函附「促進民間參與公共建設履約爭議協調會作業指引」內容",
    date: "2023/05/19",
    content: "",
    files: [
      {
        name: "台財促字第11225515600號.pdf",
      },
      {
        name: "促進民間參與公共建設履約爭議協調會作業指引.pdf",
      },
      {
        name: "臺教秘(二)字第1120049890號.pdf",
      },
    ],
  },
  {
    id: 35,
    photo: "newszero.jpg",
    title:
      "【轉知】財政部訂定「促進民間參與公共建設案件履約爭議調解會組織準則」、「促進民間參與公共建設案件履約爭議調解規則」及「促進民間參與公共建設案件履約爭議調解收費辦法」",
    date: "2023/05/19",
    content: "",
    files: [
      {
        name: "台財促字第11225512570號.pdf",
      },
      {
        name: "台財促字第11225512573號.pdf",
      },
      {
        name: "促進民間參與公共建設案件履約爭議調解收費辦法.odt",
      },
      {
        name: "促進民間參與公共建設案件履約爭議調解規則_.odt",
      },
      {
        name: "促進民間參與公共建設案件履約爭議調解會組織準則.odt",
      },
      {
        name: "臺教秘(二)字第1120048028號.pdf",
      },
    ],
  },
  {
    id: 36,
    photo: "newszero.jpg",
    title:
      "【轉知】財政部修正「民間參與公共建設申請及審核程序爭議處理規則」部分條文",
    date: "2023/05/08",
    content: "",
    files: [
      {
        name: "台財法字第11213913980號.pdf",
      },
      {
        name: "台財法字第11213913983號.pdf",
      },
      {
        name: "民間參與公共建設申請及審核程序爭議處理規則部分條文修正條文.odt",
      },
      {
        name: "臺教秘(二)臺教秘(二)字第1120044202號.pdf",
      },
    ],
  },
  {
    id: 37,
    photo: "newszero.jpg",
    title:
      "【轉知】財政部函示辦理促進民間參與公共建設案件相關會議時，應審慎處 理委員出席會議相關費用領據資訊，避免個人資料外洩風險一案",
    date: "2023/04/26",
    content: "",
    files: [
      {
        name: "台財促字第11225509350號.pdf",
      },
      {
        name: "臺教秘(二)字第1120035168號.pdf",
      },
    ],
  },
  {
    id: 38,
    photo: "newszero.jpg",
    title: "【轉知】促進民間參與公共建設案件申請保證金收取及返還作業要點",
    date: "2023/03/27",
    content: "",
    files: [
      {
        name: "台財促字第11225500960號.pdf",
      },
      {
        name: "台財促字第11225500961號.pdf",
      },
      {
        name: "促進民間參與公共建設案件申請保證金收取及返還作業要點.odt",
      },
      {
        name: "臺教秘(二)字第1120030962號.pdf",
      },
    ],
  },
  {
    id: 39,
    photo: "newszero.jpg",
    title: "【轉知】促進民間參與公共建設履約爭議協調會作業指引",
    date: "2023/02/24",
    content: "",
    files: [
      {
        name: "台財促字第11225504720號.pdf",
      },
      {
        name: "促進民間參與公共建設履約爭議協調委員會運作指引修正對照表.odt",
      },
      {
        name: "促進民間參與公共建設履約爭議協調會作業指引.odt",
      },
      {
        name: "臺教秘(二)字第1120019064號.pdf",
      },
    ],
  },
  {
    id: 40,
    photo: "newszero.jpg",
    title: "【轉知】促進民間參與公共建設履約爭議協調會作業指引",
    date: "2023/02/23",
    content: "",
    files: [
      {
        name: "1台財促字第11225504680號.pdf",
      },
      {
        name: "主辦機關辦理民間參與公共建設案件民間投資金額試算表.ods",
      },
      {
        name: "臺教秘(二)字第1120018125號.pdf",
      },
    ],
  },
  {
    id: 41,
    photo: "newszero.jpg",
    title: "【轉知】財政部修正「民間參與公共建設金擘獎頒獎作業要點」",
    date: "2023/02/21",
    content: "",
    files: [
      {
        name: "台財促字第11225503050號.pdf",
      },
      {
        name: "民間參與公共建設金擘獎頒發作業要點第四點、第十點修正規定.pdf",
      },
      {
        name: "民間參與公共建設金擘獎頒發作業要點第四點、第十點修正對照表.pdf",
      },
      {
        name: "民間參與公共建設金擘獎頒發作業要點第四點、第十點修正總說明.pdf",
      },
      {
        name: "臺教秘(二)字第1120016947號.pdf",
      },
    ],
  },
  {
    id: 42,
    photo: "newszero.jpg",
    title:
      "【轉知】修正「財政部辦理促進民間參與公共建設案件督導及考核作業要點」",
    date: "2023/02/21",
    content: "",
    files: [
      {
        name: "台財促字第11225502530號.pdf",
      },
      {
        name: "財政部辦理促進民間參與公共建設案件督導及考_核作業要點第十點、第十一點修正規定.pdf",
      },
      {
        name: "財政部辦理促進民間參與公共建設案件督導及考核_作業要點第十點、第十一點修正對照表.pdf",
      },
      {
        name: "財政部辦理促進民間參與公共建設案件督導及考核作業要點第十點、第十一點修正總說明.pdf",
      },
      {
        name: "臺教秘(二)字第1120015287號.pdf",
      },
    ],
  },
  {
    id: 43,
    photo: "newszero.jpg",
    title: "【轉知】教育部辦理促進民間參與公共建設案件獎勵金支用原則",
    date: "2023/02/14",
    content: "",
    files: [
      {
        name: "臺教秘(二)字第1124100189號.pdf",
      },
      {
        name: "教育部辦理促進民間參與公共建設案件獎勵金支用原則.odt",
      },
      {
        name: "教育部辦理促進民間參與公共建設案件獎勵金支用原則說明.odt",
      },
    ],
  },
  {
    id: 44,
    photo: "newszero.jpg",
    title: "【轉知】促進民間參與公共建設法部分條文修正案",
    date: "2023/02/14",
    content: "",
    files: [
      {
        name: "台財促字第11100725690號.pdf",
      },
      {
        name: "華總一經字第11100107760號.pdf",
      },
      {
        name: "臺教秘(二)字第1110127947號.pdf",
      },
      {
        name: "總統府公報第7635號.pdf",
      },
    ],
  },
  {
    id: 45,
    photo: "newszero.jpg",
    title:
      "【轉知】財政部補充說明該部113年5月20日台財促字第11325515680號函說明四，關於促參案件於履約期間遇促進民間參與公共建設法等相關法令修正時之處理原則，詳如原函，轉請查照。",
    date: "2024/12/12",
    content: "",
    files: [
      {
        name: "台財促字第11325532610號.pdf",
      },
    ],
  },
  {
    id: 46,
    photo: "newszero.jpg",
    title:
      "【轉知】財政部訂於113年12月26日舉辦「兆元投資國家發展方案研習會」，檢送簡章及意見交流單各1份，即日起開放報名，得請相關業務同仁報名參加，請查照。",
    date: "2024/12/13",
    content: "",
    files: [
      {
        name: "台財促字第11325538190號.pdf",
      },
      {
        name: "113年度「兆元投資國家發展方案研習會」簡章.pdf",
      },
      {
        name: "「兆元投資國家發展方案研習會」意見交流單.odt",
      },
    ],
  },
  {
    id: 47,
    photo: "newszero.jpg",
    title:
      "【轉知】財政部函為獎勵民間參與公共建設金擘獎民間團隊獎得獎團隊，請機關依促參法辦理民間參與公共建設案件時，將相關獎勵優惠規定納入招商文件一案，轉請查照。",
    date: "2024/12/20",
    content: "",
    files: [
      {
        name: "台財促字第11325539550號.pdf",
      },
      {
        name: "民間參與公共建設金擘獎民間團隊獎得獎名單.pdf",
      },
    ],
  },
  {
    id: 48,
    photo: "newszero.jpg",
    title:
      "【轉知】財政部為促進民間參與公共建設法第3條第1項第5款「社會及勞工福利設施」類別業經政策評估通過，主辦機關得就該類別之個案採行政府有償取得公共服務模式辦理一案，詳如原函說明，轉請查照。",
    date: "2024/12/20",
    content: "",
    files: [
      {
        name: "台財促字第11325539450號.pdf",
      },
    ],
  },
  {
    id: 49,
    photo: "newszero.jpg",
    title:
      "【轉知】財政部函為促進民間參與公共建設法第3條第1項第4款「衛生福利及醫療設施」類別業經政策評估通過，主辦機關得就該類別之個案採行政府有償取得公共服務模式辦理一案，詳如原函說明，轉請查照。",
    date: "2024/12/25",
    content: "",
    files: [
      {
        name: "台財促字第11325539850號.pdf",
      },

    ],
  },
  {
    id: 50,
    photo: "newszero.jpg",
    title:
      "【轉知】財政部檢送「OT案簡化版可行性評估報告撰擬範例」及「OT案簡化版先期計畫書撰擬範例」各1份，轉請查照。",
    date: "2024/12/30",
    content: "",
    files: [
      {
        name: "台財促字第11325540280號.pdf",
      },
      {
        name: "促進民間參與公共建設案件OT案簡化版先期計畫書撰擬範例.pdf",
      },
      {
        name: "促進民間參與公共建設案件OT案簡化版可行性評估撰擬範例.pdf",
      },
    ],
  },
  {
    id: 51,
    photo: "newszero.jpg",
    title:
      "【轉知】財政部113年版「主辦機關辦理有償BTO、BOT、ROT、OT案招商文件範本」及「民間自備私有土地B(R)OO案招商文件範本」，已登載於該部促進民間參與公共建設資訊網頁，轉請查照。",
    date: "2025/01/02",
    content: "",
    files: [
      {
        name: "臺教秘(二)字第1130135110號.pdf",
      },
    ],
  },
  {
    id: 52,
    photo: "newszero.jpg",
    title:
      "【轉知】檢送財政部「公共建設採促參辦理之商業模式」摘要版1份，詳如原函說明，轉請查照。",
    date: "2025/01/03",
    content: "",
    files: [
      {
        name: "台財促字第11325537880號.pdf",
      },
      {
        name: "公共建設採促參辦理之商業模式摘要版.pdf",
      },
    ],
  },
  {
    id: 53,
    photo: "newszero.jpg",
    title:
      "【轉知】檢送財政部「促進民間參與公共建設案件全生命週期作業手冊」及「促進民間參與公共建設案件財務評估指引」，請查照。",
    date: "2025/01/06",
    content: "",
    files: [
      {
        name: "臺教秘(二)字第1130136464號.pdf",
      },
    ],
  },
  {
    id: 54,
    photo: "newszero.jpg",
    title:
      "【轉知】財政部檢送「促進民間參與公共建設案件提前終止契約原因分析及建議改善措施」1份，詳如原函說明，轉請查照。",
    date: "2025/01/07",
    content: "",
    files: [
      {
        name: "台財促字第11325540950號.pdf",
      },
      {
        name: "促進民間參與公共建設案件提前終止契約原因分析及建議改善措施.pdf",
      },
    ],
  },
  {
    id: 55,
    photo: "newszero.jpg",
    title:
      "檢送國家發展委員會「兆元投資國家發展方案(114-117年)」(核定本)，詳如原函說明，轉請查照。",
    date: "2025/01/13",
    content: "",
    files: [
      {
        name: "發經字第1130024065號.pdf",
      },
      {
        name: "院臺經字第1131027540號.pdf",
      },
      {
        name: "兆元投資國家發展方案(114-117年)(核定本).pdf",
      },
      {
        name: "附件2「兆元投資國家發展方案」重要政策措施聯繫窗口.pdf",
      },
    ],
  },
  {
    id: 56,
    photo: "newszero.jpg",
    title:
      "檢送財政部研擬「民間自行規劃申請參與公共建設作業辦法」修正草案對照表，如有意見請於114年2月8日前逕送該部，請查照。",
    date: "2025/01/15",
    content: "",
    files: [
      {
        name: "台財促字第11425500780號.pdf",
      },
      {
        name: "「民間自行規劃申請參與公共建設作業辦法」修正草案建議表.odt",
      },
      {
        name: "民間自行規劃申請參與公共建設作業辦法修正草案條文對照表.odt",
      },
    ],
  },
  {
    id: 57,
    photo: "newszero.jpg",
    title:
      "檢送財政部「兆元投資國家發展方案(114年-117年)」策略一「創新促參推進機制」之提案原則，詳如原函說明，請查照。",
    date: "2025/01/23",
    content: "",
    files: [
      {
        name: "台財促字第11400503310號.pdf",
      },
      {
        name: "行政院促進民間參與公共建設推進專案會議促參提案平台 「促參提案原則」.pdf",
      },
      {
        name: "「兆元投資國家發展方案」策略一「創新促參推進機制」各部會單一聯繫窗口.odt",
      },
    ],
  },
  {
    id: 58,
    photo: "newszero.jpg",
    title:
      "為國家發展委員會調查民間參與公共建設法規調適相關事宜，請於114年2月6日前依附表提供資料到部，請查照。",
    date: "2025/01/23",
    content: "",
    files: [
      {
        name: "臺教秘通字第1140003454號.pdf",
      },
      {
        name: "發法字第1142000030號.pdf",
      },
      {
        name: "111年至113年辦理民參案件有推動價值、但宥於法規疑義無法推動之相關實例(空白).odt",
      },
    ],
  },
  {
    id: 59,
    photo: "newszero.jpg",
    title:
      "財政部重申貴機關辦理民間參與公共建設案件，應確實依限於促進民間參與公共建設資訊網登載相關資訊，詳如原函說明，轉請查照。",
    date: "2025/01/23",
    content: "",
    files: [
      {
        name: "台財促字第11425501420號.pdf",
      },
    ],
  },
]);

// 按日期排序並重新賦予 ID
const sortedNews = computed(() => {
  return [...news]
    .sort((a, b) => new Date(b.date) - new Date(a.date)) // 根據日期降序排序
    .map((item, index) => ({
      ...item,
      id: index + 1, // 重新賦予 ID，從 1 開始
    }));
});

// 根據路由參數動態獲取對應的新聞項目
const newsItem = computed(() => {
  const id = parseInt(route.params.id, 10); // 解析路由參數中的 ID
  return sortedNews.value.find((item) => item.id === id); // 根據新 ID 查找新聞
});

// 定義 getImageUrl 方法
const getImageUrl = (photo) => {
  return new URL(`/public/img/${photo}`, import.meta.url).href;
};
</script>

<style scoped>
/* 設計主容器樣式 */
.news-detail-container {
  padding: 20px;
  width: 65%;
  margin: 0% auto;
}

/* 標題區域設計 */
.news-detail-title {
  background-color: #2e3e56;
  color: white;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
  margin-bottom: 20px;
  margin-top: 2%;
  width: 100%;
}

.news-detail-title h4 {
  font-weight: bold;
  font-size: 26px;
  margin-bottom: 2%;
}

.news-detail-title p {
  font-size: 22px;
  color: #ddd;
}

/* 內容區塊設計 */
.news-detail-content {
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  margin-bottom: 20px;
}

/* 圖片樣式 */
.news-detail-content img {
  max-width: 50%;
  height: auto;
  margin-bottom: 20px;
  border-radius: 10px;
  /* 新增置中樣式 */
  display: block; /* 確保圖片是區塊元素 */
  margin-left: auto; /* 左側自動對齊 */
  margin-right: auto; /* 右側自動對齊 */
}

/* 文字內容樣式 */
.news-detail-content p {
  font-size: 20px;
  line-height: 1.8;
  color: #333;
  margin-bottom: 10px;
  word-break: break-word;
}

/* 附加檔案 */
.news-detail-content a {
  color: #7d7d7d; /* 默認灰色 */
  text-decoration: none; /* 去掉下劃線 */
  transition: color 0.3s ease; /* 平滑過渡效果 */
  font-size: 18px;
}

.news-detail-content a:hover {
  color: #003366; /* 鼠標懸停時的深藍色 */
}

.news-detail-content:last-child {
  border-bottom: none;
}

/* 小螢幕適配 */
@media (max-width: 768px) {
  .news-detail-container {
    padding: 20px;
    margin: 0;
    width: 100%;
  }
}
</style>
