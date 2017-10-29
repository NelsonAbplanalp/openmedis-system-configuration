<template>
    <div id="om-system-configurations">
        <div id="om-head" v-if="!this.isLoggedIn()">
            <app-header></app-header>
            <navigation></navigation>
        </div>
        <div id="om-content">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
    import Navigation from './components/header/Navigation.vue'
    import AppHeader from './components/header/AppHeader.vue'
    import router from './routing/router'
    import store from './vuex-store/store'

    export default {
        name: 'om-system-configurations',
        components: {
            Navigation, AppHeader
        },
        data() {
            return {}
        },
        methods: {
            isLoggedIn: function () {
                return this.$router.currentRoute.name === 'Login'
            }
        }
    }
</script>
