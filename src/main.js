import Vue from 'vue'
import App from './components/main/App'
import vuetify from './plugins/vuetify'
import router from './router'
import store from './store'

Vue.config.productionTip = false

Vue.prototype.$env = {
  appName: process.env.VUE_APP_NAME,
  appSubName: process.env.VUE_APP_SUB_NAME
}

Vue.filter('capitalize', function (value) {
  if (!value) return ''
  value = value.toString()
  return value.charAt(0).toUpperCase() + value.slice(1)
})

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
