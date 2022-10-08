import Vue from 'vue'
import App from './App.vue'
import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'
import 'bootstrap-vue/dist/bootstrap-vue-icons.min.css'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.config.productionTip = false
axios.defaults.baseURL = 'http://localhost:8080'

Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)

Vue.use(VueAxios, axios)
new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
