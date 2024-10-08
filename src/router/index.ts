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
      { path: "monf/:time(\\d+)", component: () => import("@/pages/monf/[time].vue") }, // monf列表
      { path: "monf/:time(\\d+)/:id(\\d+)", component: () => import("@/pages/monf/[time,id].vue") }, // monf详情
      { path: "bof/:time(\\d+)", component: () => import("@/pages/bof/[time].vue") }, // bof列表
      { path: "partition", component: () => import("@/pages/partition/index.vue") }, // 分区列表
      { path: "partition/:id(\\d+)", component: () => import("@/pages/partition/[id].vue") }, // 分区详情
      { path: "post/:id", component: () => import("@/pages/post/[id].vue") }, // 帖子详情
      { path: "user/:id", component: () => import("@/pages/user/[id].vue") }, // 用户详情
      { path: "setting", component: () => import("@/pages/setting/index.vue") }, // 个人中心
      { path: "noAuth", component: () => import("@/pages/noAuth/index.vue") }, // 无身份验证
      { path: "/creator/monf/:time(\\d+)", component: () => import("@/pages/monf/creator[time].vue") }, // 发布monf
      { path: "/error/monf/:time(\\d+)", component: () => import("@/pages/monf/error[time].vue") }, // 发布monf
    ]
  }, {
    path: "/search",
    component: () => import("@/pages/search/index.vue")
  }, {
    path: "/account",
    component: () => import("@/pages/account/index.vue"),
    redirect: "signin",
    children: [{
      path: "signin",
      component: () => import("@/pages/account/signin.vue")
    }, {
      path: "signup",
      component: () => import("@/pages/account/signup.vue")
    }],
  },


    // { path: "/creator/:id?", component: () => import("@/pages/creator/index.vue") }, // 发帖/编辑
    // { path: "/editer/:id?", component: () => import("@/pages/creator/index.vue") }, // 发帖/编辑
  ]
})

export default router
