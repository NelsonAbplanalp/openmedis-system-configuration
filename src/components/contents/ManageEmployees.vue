<template>
    <main class="main">
        <section class="section">
            <div class="container">
                <employees-grid></employees-grid>
                <transition name="slide-fade" mode="out-in">
                    <edit-employee :is="isRowSelected" :key="isRowSelected"></edit-employee>
                </transition>
            </div>
        </section>
    </main>
</template>

<script>
    import EmployeesGrid from './../manageEmployees/EmployeesGrid.vue'
    import EditEmployee from "../manageEmployees/EditEmployee.vue";

    export default {
        data() {
            return {
                isRowSelected: false
            }
        },
        components: {
            EditEmployee,
            EmployeesGrid
        }
    }
</script>
