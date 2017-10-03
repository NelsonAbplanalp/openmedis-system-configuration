<template>
    <div id="om-navigation">
        <router-link class="nav-item" :to="{ name: 'GeneralSettings' }">General Settings</router-link>
        <router-link class="nav-item" :to="{ name: 'OperationalNodes' }">Operational Nodes</router-link>
        <router-link class="nav-item" :to="{ name: 'ManageEmployees' }">Manage Employees</router-link>
    </div>
</template>

<script>
    export default {
        name: 'Navigation'
    }
</script>
