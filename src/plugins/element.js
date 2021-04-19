import Vue from 'vue'
import { Button,Form,FormItem,Input,Message } from 'element-ui'

Vue.use(Button)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)

// 导入弹框提示组件
// 把弹框组件挂载到了Vue原型上 用this.$message 访问
Vue.prototype.$message = Message