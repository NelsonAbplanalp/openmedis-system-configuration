<template>
    <div id="om-login">
        <div id="om-logo-welcome">
            <span>Welcome to</span>
            <img src="./../../assets/openMEDIS_logo.svg"/>
        </div>
        <div id="om-login-container">
            <div id="om-login-header">Login</div>
            <form id="om-login-form">
                <div class="om-login-row">
                    <label for="om-login-username">Username</label>
                    <input id="om-login-username" class="om-input" type="text"/>
                </div>
                <div class="om-login-row">
                    <label for="om-login-password">Password</label>
                    <input id="om-login-password" class="om-input" type="password"/>
                </div>
                <button id="om-login-submit" @click.self.prevent="onLoginClick">LOGIN</button>
                <!--@todo: add forgot-password link-->
            </form>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Login',
        methods: {
            onLoginClick: function () {
                // @todo: get login api request
                this.$router.push({name: 'GeneralSettings'})
            }
        }
    }
</script>
