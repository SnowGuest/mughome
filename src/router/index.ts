import { createRouter, createWebHistory } from 'vue-router'
import layout from "@/layouts/index.vue"
import { pagePermissionVerify } from '@/utils'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [{
    path: "/",
    component: layout,
    children: [
      { path: "/", component: () => import("@/pages/index/index.vue") }, // 首页
      { path: "competition", component: () => import("@/pages/competition/index.vue") }, // 分区
      { path: "monf/:time", component: () => import("@/pages/monf/[time].vue") }, // monf列表
      { path: "monf/:time/:id", component: () => import("@/pages/monf/[time,id].vue") }, // monf详情
      { path: "bof/:time", component: () => import("@/pages/bof/[time].vue") }, // bof列表
      { path: "bof/:time/:id", component: () => import("@/pages/bof/[time,id].vue") }, // bof详情
      { path: "partition", component: () => import("@/pages/partition/index.vue") }, // 分区列表
      { path: "partition/:id", component: () => import("@/pages/partition/[id].vue") }, // 分区详情
      { path: "user/:id", component: () => import("@/pages/user/[id].vue") }, // 用户详情
      { path: "setting", beforeEnter: [pagePermissionVerify], component: () => import("@/pages/setting/index.vue") }, // 用户详情
      { path: "noAuth", component: () => import("@/pages/noAuth/index.vue") }, // 无身份验证

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
