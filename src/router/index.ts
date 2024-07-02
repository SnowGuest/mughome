import { createRouter, createWebHistory } from 'vue-router'
import layout from "@/layouts/index.vue"
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [{
    path: "/",
    component: layout,
    children: [
      { path: "/", component: () => import("@/pages/index/index.vue") },
      { path: "competition", component: () => import("@/pages/competition/index.vue") },
      { path: "partition", component: () => import("@/pages/partition/index.vue") },
    ]
  }, {
    path: "/search",
    component: () => import("@/pages/search/index.vue")
  }, {
    path: "/account/signin",
    component: () => import("@/pages/account/signin.vue")
  }]
})

export default router
