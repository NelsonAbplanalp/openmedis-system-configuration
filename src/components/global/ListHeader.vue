<template>
    <div id="om-list-header">
        <div id="om-list-header-left" class="om-list-header-block">
            <span class="om-title"> {{title}} </span>
            <span id="om-info-icon" class="glyphicon glyphicon-info-sign"></span>
        </div>
        <div id="om-list-header-right" class="om-list-header-block">
            <span id="om-filter-icon" class="glyphicon glyphicon-filter"></span>
            <span id="om-plus-icon" class="glyphicon glyphicon-plus" @click="onAddEmployeeClick"></span>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'ListHeader',
        props: ['title'],
        methods: {
            onAddEmployeeClick: function () {
                // Set empty edit employee form
                this.$store.dispatch('resetEditEmployeeData')
                // show edit employee form
                this.$store.dispatch('setEmployeeEditVisibility', true)
                // set new index for new employee
                this.$store.dispatch('setEmployeeIndex', this.allEmployeesData().length)
            },
            allEmployeesData() {
                return this.employeesToArray(this.$store.state.allEmployeesData)
            },
            /**
             *
             * @param {Object} obj
             * @returns {Array}
             */
            employeesToArray: function (obj) {
                let arr    = [],
                    values = Object.values(obj)

                for (let i = 0; i < values.length; ++i) {
                    arr.push(values[i]);
                }

                return arr
            },
        }
    }
</script>
