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
// 导入vueTable组件
import Treetable from 'vue-table-with-tree-grid'
// 导入富文本编辑器和编辑器样式
import VueQuillEditor from "vue-quill-editor";
// require styles
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

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

// 全局导入Treetable组件
Vue.component('tree-table', Treetable)

// 使用富文本编辑器
Vue.use(VueQuillEditor)

Vue.filter('dateFormat', function (originVal) {
    const dt = new Date(originVal);
    const year = dt.getFullYear();
    const month = (dt.getMonth() + 1 + '').padStart(2, '0');
    const date = (dt.getDate() + '').padStart(2, '0');
    const hour = (dt.getHours() + '').padStart(2, '0');
    const minute = (dt.getMinutes() + '').padStart(2, '0');
    const second = (dt.getSeconds() + '').padStart(2, '0');
    return `${year}-${month}-${date} ${hour}:${minute}:${second}`
})

new Vue({
  router,
  render: h => h(App)

}).$mount('#app')
