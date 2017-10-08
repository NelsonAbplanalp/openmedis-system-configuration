import Vue from 'vue'
import App from './App.vue'
import router from './routing/router'
import store from './vuex-store/store'

new Vue({
    el: '#om-system-configurations',
    router, store,
    render: h => h(App)
})
