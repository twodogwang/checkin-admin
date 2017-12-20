import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App'
import router from './router'
import store from './store'
import '@/icons' // icon
import '@/permission' // 权限
import 'babel-polyfill';// polyfill补丁，兼容ie
import VueSocketio from 'vue-socket.io';

Vue.use(ElementUI)

Vue.prototype.sendMsg = function sendMsg(type, id, message) { // 发送消息函数
  if ((type === "msg") && message && message !== null && message !== '') {
    this.$socket.emit('message', {
      msg: message,
      to: id
    })
  } else {
    return false
  }
}

Vue.use(VueSocketio, process.env.BASE_API);

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {
    App
  }
})
