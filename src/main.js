import Vue from 'vue'
import App from './App.vue'
import router from './routing/router'

new Vue({
    el: '#om-system-configurations',
    router,
    render: h => h(App),
})
