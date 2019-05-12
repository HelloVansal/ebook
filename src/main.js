import Vue from 'vue'
import App from './App.vue'
import router from './router'
import 'styles/icon.css'
import 'styles/global.scss'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
