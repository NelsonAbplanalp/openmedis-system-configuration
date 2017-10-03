<template>
    <main class="main">
        <section class="section">
            <div class="container">
                <employees-grid></employees-grid>
            </div>
        </section>
    </main>
</template>

<script>
    import EmployeesGrid from './../manageEmployees/EmployeesGrid.vue'

    export default {
        components: {
            EmployeesGrid
        }
    }
</script>
