<template>
    <div id="om-list-filter" class="om-arrow-box" v-if="isFilterVisible" v-bind:style="{ left: calcLeftPosition, right: calcRightPosition }">
        <form id="om-list-filter-form">
            <select v-model="filteredColumn">
                <option disabled value="">Choose column</option>
                <option v-for="column in listColumns" v-bind:value="column.field">
                    {{ column.text }}
                </option>
            </select>
            <input placeholder="Value" v-model="filterValue"/>
            <div class="om-list-filter-form-buttons">
                <button id="om-list-filter-cancel" class="om-cancel-button" @click.self.prevent="cancelFilter">Cancel</button>
                <button id="om-list-filter-save"  class="om-default-button" @click.self.prevent="useFilter">Save Changes</button>
            </div>
        </form>
    </div>
</template>

<script>
    export default {
        name: 'listFilter',
        props: {
            listName: {
                type: String,
                required: true
            },
            leftPos: {
                type: String,
                required: true
            },
            rightPos: {
                type: String,
                required: true
            }
        },
        data() {
            return {
                listColumns: this.getFilterColumns(),
                filteredColumn: '',
                filterValue: ''
            }
        },
        computed: {
            isFilterVisible: function () {
                return this.$store.state.isFilterVisible
            },
            calcLeftPosition: function () {
                // @todo: set position correctly
//                return parseInt(this.leftPos) - (document.getElementById('om-list-filter').clientWidth / 2) + 'px';
            },
            calcRightPosition: function () {
                // @todo: set position correctly
//                return parseInt(this.rightPos) - (document.getElementById('om-list-filter').clientHeight / 2) + 'px';
            }
        },
        methods: {
            cancelFilter: function () {
                this.filteredColumn = ''
                this.filterValue = ''
            },
            useFilter: function () {
                // @todo: send filter to list and filter data (by given column and value)
            },
            getFilterColumns: function () {
                if (this.listName === 'EMPLOYEES') {
                    console.log('this.employeesToArray(this.$store.state.employeesColumns)', this.employeesToArray(this.$store.state.employeesColumns))
                    return this.employeesToArray(this.$store.state.employeesColumns)
                } else {
                    // @todo: add columns for other lists (operational nodes)
                }
            },
        }
    }
</script>
