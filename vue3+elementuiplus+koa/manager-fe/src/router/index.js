import { createRouter, createWebHistory } from 'vue-router'

import Home from '../components/Home.vue'
import Welcome from "../components/Welcome.vue"
import Login from "../components/Login.vue"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      name: "home",
      path: "/",
      meta: {
        title: '首页'
      },
      component: Home,
      redirect: '/welcome',
      children: [
        {
          name: "welcome",
          path: "/welcome",
          meta: {
            title: "欢迎页"
          },
          component: Welcome
        },
        {
          name: "login",
          path: "/login",
          meta: {
            title: "登录页"
          },
          component: Login
        }
      ]
    }
  ]
})

export default router
