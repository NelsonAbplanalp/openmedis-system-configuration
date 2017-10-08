<template>
    <transition name="slide-fade">
        <div id="om-employee-edit-container" class="om-shadow-effect"
             v-if="isEmployeeEditVisible"
             :style="{ height: tableHeight+'px' }">
            <form id="om-edit-employee-form">
                <label for="om-edit-employee-user">User Account</label>
                <span id="om-edit-employee-user" class="glyphicon glyphicon-user"></span>
                <label for="om-edit-employee-id">ID</label>
                <span id="om-edit-employee-id"></span>

                <input id="om-edit-employee-last-name"/>
                <label for="om-edit-employee-last-name">Last name</label>
                <input id="om-edit-employee-first-name"/>
                <label for="om-edit-employee-first-name">First name</label>
                <input id="om-edit-employee-position"/>
                <label for="om-edit-employee-position">Position</label>
                <input id="om-edit-employee-email"/>
                <label for="om-edit-employee-email">Email</label>
                <input id="om-edit-employee-mobile"/>
                <label for="om-edit-employee-mobile">Mobile</label>
                <input id="om-edit-employee-work"/>
                <label for="om-edit-employee-work">Work</label>
                <input id="om-edit-employee-building"/>
                <label for="om-edit-employee-building">Building</label>
                <input id="om-edit-employee-floor"/>
                <label for="om-edit-employee-floor">Floor</label>
                <input id="om-edit-employee-room"/>
                <label for="om-edit-employee-room">Room</label>

                <button id="om-edit-employee-cancel" class="om-cancel-button">Cancel</button>
                <button id="om-edit-employee-save" class="om-default-button">Save Changes</button>
            </form>
        </div>
    </transition>
</template>

<script>
    export default {
        name: 'EditEmployee',
        data() {
            return {
                employeeData: [],
                errors: []
            }
        },
        computed: {
            isEmployeeEditVisible () {
                return this.$store.state.isEmployeeEditVisible
            },
            tableHeight() {
                return this.$store.state.contentHeight + document.getElementById('om-employees-list-header').clientHeight
            }
        }
    }
</script>
