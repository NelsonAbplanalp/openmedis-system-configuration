<template>
    <main class="main">
        <section class="section">
            <div class="container">
                <employees-grid></employees-grid>
                <edit-employee></edit-employee>
            </div>
        </section>
    </main>
</template>

<script>
    import EmployeesGrid from './../manageEmployees/EmployeesGrid.vue'
    import EditEmployee from "../manageEmployees/EditEmployee.vue";

    export default {
        data() {
            return {}
        },
        components: {
            EditEmployee,
            EmployeesGrid
        }
    }
</script>
