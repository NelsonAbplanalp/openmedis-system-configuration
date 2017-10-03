import Vue from 'vue'
import Router from 'vue-router'
import GeneralSettings from '../components/contents/GeneralSettings.vue'
import OperationalNodes from '../components/contents/OperationalNodes.vue'
import ManageEmployees from '../components/contents/ManageEmployees.vue'
import Login from '../components/contents/Login.vue'

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            redirect: '/Login'
        },
        {
            path: '/login',
            name: 'Login',
            component: Login
        },
        {
            path: '/general-settings',
            name: 'GeneralSettings',
            component: GeneralSettings
        },
        {
            path: '/operational-nodes',
            name: 'OperationalNodes',
            component: OperationalNodes
        },
        {
            path: '/manage-employees',
            name: 'ManageEmployees',
            component: ManageEmployees
        },
    ]
})
