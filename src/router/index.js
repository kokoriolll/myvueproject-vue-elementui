import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from "../components/Login";
import Home from "../components/Home";
import Welcome from "../components/Welcome";
import Users from "../components/user/Users";
import Rights from "../components/power/Rights";
import Roles from "../components/power/Roles";
import Cate from "../components/goods/Cate";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    component: Login,
  },
  {
    path: '/home',
    component: Home,
    redirect: '/welcome',
    meta:{
      title: '首页'
    },
    children: [
      {
        path: '/welcome',
        component: Welcome,
        meta:{
          title: '欢迎'
        }
      },
      {
        path: '/users',
        component: Users,
        meta:{
          title: '用户列表'
        }
      },
      {
        path: '/roles',
        component: Roles,
        meta: {
          title: '角色列表'
        }
      },
      {
        path: '/rights',
        component: Rights,
        meta: {
          title: '权限列表'
        }
      },
      {
        path: '/categories',
        component: Cate,
        meta: {
          title: '商品分类'
        }
      }
    ]
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


  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()

})

export default router
