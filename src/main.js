import Vue from 'vue'

import 'normalize.css/normalize.css'// A modern alternative to CSS resets


import ElementUI from 'element-ui'
import './assets/theme/index.css'

//import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import '@/styles/index.scss' // global css

import App from './App'
import router from './router'
import store from './store'
import '@/icons' // icon
import '@/permission' // permission control
import VueMask from 'di-vue-mask'
import VModal from 'vue-js-modal'


Vue.use(ElementUI, { locale })
Vue.use(VueMask)
Vue.use(VModal)

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
