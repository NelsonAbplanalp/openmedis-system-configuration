<template>
    <div id="om-list-header">
        <div id="om-list-header-left" class="om-list-header-block">
            <span class="om-title"> {{title}} </span>
            <span id="om-info-icon" class="glyphicon glyphicon-info-sign"></span>
        </div>
        <div id="om-list-header-right" class="om-list-header-block">
            <list-filter listName="title" leftPos="clickPosX" rightPos="clickPosY"></list-filter>
            <span id="om-filter-icon" class="glyphicon glyphicon-filter" @click="onFilterClick"></span>
            <span id="om-plus-icon" class="glyphicon glyphicon-plus" @click="onAddEmployeeClick"></span>
        </div>
    </div>
</template>

<script>
    import listFilter from './ListFilter.vue'

    export default {
        name: 'ListHeader',
        props: {
            title: {
                type: String,
                required: true
            }
        },
        data() {
            return {
                clickPosX: '',
                clickPosY: ''
            }
        },
        components: {
            listFilter
        },
        computed: {
            getFilterLeftPosition: function () {
                return this.$store.state.isFilterVisible
            }
        },
        methods: {
            onFilterClick: function (e) {
                this.$store.dispatch('setFilterVisibility', !this.$store.state.isFilterVisible)

                this.clickPosX = e.pageX
                this.clickPosY = e.pageY
            },
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
