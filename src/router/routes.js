const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("src/pages/IndexPage.vue") },
      {
        path: "downloads",
        component: () => import("src/pages/download/DownloadsPage.vue"),
      },
      {
        path: "introduction/overview",
        component: () => import("src/pages/introduction/OverviewPage.vue"),
      },
      {
        path: "introduction/structure",
        component: () => import("src/pages/introduction/StructurePage.vue"),
      },
      {
        path: "news",
        component: () => import("src/pages/news/NewsPage.vue"),
      },
      {
        path: "news/news:id", // 動態新聞詳情頁面
        name: "news-detail",
        component: () => import("src/components/NewsDetailCompontent.vue"),
      },
      {
        path: "news/campusRenovation",  // 校區新貌
        component: () => import("src/pages/news/CampusRenovationPage.vue"),
      },
      {
        path: "links",
        component: () => import("src/pages/link/LinksPage.vue"),
      },
      {
        path: "contact",
        component: () => import("src/pages/contact/ContactPage.vue"),
      },
      {
        path: "introduction",
        component: () => import("src/pages/introduction/IntroductionPage.vue"),
      },
      {
        path: "regulations",
        component: () => import("src/pages/regulations/RegulationsPage.vue"),
      },
      {
        path: "regulations/mof",
        component: () => import("src/pages/regulations/MofPage.vue"),
      },
      {
        path: "regulations/agency",
        component: () => import("src/pages/regulations/AgencyPage.vue"),
      },
      {
        path: "services",
        component: () => import("src/pages/services/ServicesPage.vue"),
      },
      {
        path: "services/headquarters",
        component: () => import("src/pages/services/HeadquartersPage.vue"),
      },
      {
        path: "services/plan",
        component: () => import("src/pages/services/PlanPage.vue"),
      },
      {
        path: "services/develop",
        component: () => import("src/pages/services/DevelopPage.vue"),
      },
    ],
  },
  
  /* 後台登入頁 */
  {
    path: "/login",
    component: () => import("src/pages/BackendManagement/loginPage.vue"),
  },
  /* 後台管理     */
  /* 最新消息管理 */
  /* 跑馬燈管理   */
  {
    path: "/dashboard",
    component: () => import("src/pages/BackendManagement/DashboardPage.vue"),
    meta: { requiresAuth: true },
    children: [
      { 
        path: "news", 
        component: () => import("src/pages/BackendManagement/NewsMangementPage.vue"),
        meta: { requiresAuth: true }
      },
      { 
        path: "marqueeAds", 
        component: () => import("src/pages/BackendManagement/MarqueeAdsMangmentPage.vue"),
        meta: { requiresAuth: true }
      },
    ]
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
