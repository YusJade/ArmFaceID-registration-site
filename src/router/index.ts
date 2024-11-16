import { createRouter, createWebHistory } from 'vue-router'

const routesPC = [
  {
    path: '/',
    name: 'register',
    component: () => import('../views/RegisterView.vue'),
  },
]

const routesM = [
  {
    path: '/',
    name: 'register',
    component: () => import('../views/mobile/RegisterViewM.vue'),
  },
]


let routes = []

const flag = navigator.userAgent.match(
  /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
);
// 这里判断后选择使用移动端的路由还是pc端的路由
if(flag) {
  console.log("使用移动端页面...")
  routes = routesM
} else {
  routes = routesPC
}


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes
})

export default router
