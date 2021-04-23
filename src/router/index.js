import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from "../components/Login";
import Home from "../components/Home";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/home',
    component: Home
  }
]

const router = new VueRouter({
  routes
})

//挂载路由导航守卫
router.beforeEach((to,from,next)=>{
  // to 将要访问的路径
  // from 代表从那个路径跳转而来
  // next 是一个函数，表示放行
  // next()放行 next('/login')强制跳转到登录页面

  //如果访问的是登录页面，直接放行
  if (to.path === '/login') return next();

  //获取token
  const tokenStr = window.sessionStorage.getItem('token');

  //判断是否获取到了token，没有token返回到登录页面
  if(!tokenStr) return next('/login');
  //判断token存在，直接放行
  next()

})

export default router
