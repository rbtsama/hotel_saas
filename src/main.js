import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import VueCompositionAPI from '@vue/composition-api'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
import App from './App.vue'
import router from './router'
import store from './store'
import './styles/theme.less'

// 使用插件
Vue.use(VueRouter)
Vue.use(Vuex)
Vue.use(VueCompositionAPI)
Vue.use(Antd)

// 关闭生产提示
Vue.config.productionTip = false

// 创建 Vue 实例
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
