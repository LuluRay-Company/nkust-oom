// src/stores/listStore.js
import { defineStore } from "pinia";

export const useListStore = defineStore("list", {
  state: () => ({
    items: [
      { title: "Vue 3 Introduction", url: "https://vuejs.org/" },
      { title: "Learn Vuex and Pinia", url: "https://pinia.vuejs.org/" },
      { title: "JavaScript Basics", url: "https://developer.mozilla.org/" },
      { title: "Vue Router Guide", url: "https://router.vuejs.org/" },
      { title: "Quasar Framework", url: "https://quasar.dev/" },
      { title: "Frontend Development", url: "https://frontendmasters.com/" },
      { title: "Advanced Vue Patterns", url: "https://advanced-vue.com/" },
      { title: "Vue Use Case Studies", url: "https://vueuse.org/" },
      { title: "Learn JavaScript Fast", url: "https://javascript.info/" },
      { title: "Fullstack Vue Development", url: "https://fullstack.io/" },
    ],
  }),
  getters: {
    // 過濾出符合查詢條件的資料
    filterItems: (state) => (query) => {
      return state.items.filter((item) =>
        item.title.toLowerCase().includes(query.toLowerCase())
      );
    },
  },
});
