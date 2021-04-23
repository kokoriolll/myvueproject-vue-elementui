import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'

//导入axios依赖
import axios from "axios";

/*导入字体图标*/
import './assets/fonts/iconfont.css'
/* 引入全局样式 */
import './assets/css/global.css'

// 配置请求的根路径
axios.defaults.baseURL = 'http://timemeetyou.com:8889/api/private/v1/';
//axios请求拦截
axios.interceptors.request.use(config =>{

  //预处理config
  //为请求头对象，添加Token验证的Authorization字段
  config.headers.Authorization = window.sessionStorage.getItem('token')

  //固定写法，最后必须要return config
  return config
})

// 将axios挂载到Vue原型  使用this.$http访问
Vue.prototype.$http = axios




//阻止启动生产消息
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)

}).$mount('#app')
