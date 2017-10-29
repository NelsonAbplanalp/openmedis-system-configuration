<template>
    <main class="main">
        <section class="section">
            <div class="container">
                <list-header title="EMPLOYEES"></list-header>
                <employees-grid></employees-grid>
                <edit-employee></edit-employee>
            </div>
        </section>
    </main>
</template>

<script>
    import EmployeesGrid from './../manageEmployees/EmployeesGrid.vue'
    import EditEmployee from "../manageEmployees/EditEmployee.vue";
    import ListHeader from "../global/ListHeader.vue";

    export default {
        data() {
            return {}
        },
        components: {
            ListHeader,
            EditEmployee,
            EmployeesGrid
        }
    }
</script>
