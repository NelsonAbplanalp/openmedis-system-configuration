<template>
    <transition name="slide-fade">
        <div id="om-employee-edit-container" class="om-shadow-effect"
             v-if="isEmployeeEditVisible"
             :style="{ height: tableHeight+'px' }">
            <form id="om-edit-employee-form">
                <fieldset>
                    <label for="om-edit-employee-user">User Account</label>
                    <span id="om-edit-employee-user" class="glyphicon glyphicon-user" :class="{disabled : employeeUserId === 0}"></span>
                </fieldset>

                <fieldset style="margin-top: 1.5em;">
                    <label for="om-edit-employee-id">ID</label>
                    <span id="om-edit-employee-id" v-text="employeeId"></span>
                </fieldset>
                <fieldset>
                    <label for="om-edit-employee-last-name">Last name</label>
                    <input id="om-edit-employee-last-name" class="om-input" v-model="employeeLastName"/>
                </fieldset>
                <fieldset>
                    <label for="om-edit-employee-first-name">First name</label>
                    <input id="om-edit-employee-first-name" class="om-input" v-model="employeeFirstName"/>
                </fieldset>
                <fieldset>
                    <label for="om-edit-employee-position">Position</label>
                    <input id="om-edit-employee-position" class="om-input" v-model="employeePosition"/>
                </fieldset>

                <fieldset style="margin-top: 1.5em;">
                    <label for="om-edit-employee-email">Email</label>
                    <input id="om-edit-employee-email" class="om-input" v-model="employeeEmail" type="email"/>
                </fieldset>
                <fieldset>
                    <label for="om-edit-employee-mobile">Mobile</label>
                    <input id="om-edit-employee-mobile" class="om-input" v-model="employeeMobilePhone" type="tel"/>
                </fieldset>
                <fieldset>
                    <label for="om-edit-employee-work">Work</label>
                    <input id="om-edit-employee-work" class="om-input" v-model="employeeWorkPhone" type="tel"/>
                </fieldset>

                <fieldset style="margin-top: 1.5em;">
                    <label for="om-edit-employee-building">Building</label>
                    <input id="om-edit-employee-building" class="om-input" v-model="employeeBuilding"/>
                </fieldset>
                <fieldset>
                    <label for="om-edit-employee-floor">Floor</label>
                    <input id="om-edit-employee-floor" class="om-input"  v-model="employeeFloor"/>
                </fieldset>
                <fieldset>
                    <label for="om-edit-employee-room">Room</label>
                    <input id="om-edit-employee-room" class="om-input" v-model="employeeRoom"/>
                </fieldset>

                <div class="om-edit-employee-form-buttons">
                    <button id="om-edit-employee-cancel" class="om-cancel-button" @click.self.prevent="cancelEditEmployeeChanges">Cancel</button>
                    <button id="om-edit-employee-save"  class="om-default-button" @click.self.prevent="saveEditEmployeeChanges">Save Changes</button>
                </div>
            </form>
        </div>
    </transition>
</template>

<script>
    export default {
        name: 'EditEmployee',
        data() {
            return {
                errors: []
            }
        },
        methods: {
            saveEditEmployeeChanges: function () {
                let apiIgnore = true;

                if (apiIgnore) {
                    this.updateEmployeeInTable()
                    this.$store.dispatch('setEmployeeEditVisibility', false)
                } else {
                    // create/update employee
                    axios.post(this.$store.state.API_URL + '/api/authenticate', data)
                        .then(response => {
                            axios.post(this.$store.state.API_URL + '/api/employee', this.$store.state.editEmployeeData)
                                .then(response => {
                                    this.updateEmployeeInTable()
                                    this.$store.dispatch('setEmployeeEditVisibility', false)
                                })
                                .catch(e => {
                                    this.errors.push(e)
                                })
                        })
                        .catch(e => {
                            this.errors.push(e)
                        })
                }

                this.$store.dispatch('setEmployeeEditVisibility', false)
            },
            cancelEditEmployeeChanges: function () {
                // reset edit employee data
                this.$store.dispatch('updateEditEmployeeData', this.$store.state.initialEmployeeData)
                this.$store.dispatch('setEmployeeEditVisibility', false)
            },
            updateEmployeeInTable: function () {
                this.$store.dispatch('setDataInAllEmployeesDataByIndex')
            }
        },
        computed: {
            isEmployeeEditVisible () {
                return this.$store.state.isEmployeeEditVisible
            },
            tableHeight() {
                return this.$store.state.contentHeight + document.getElementById('om-employees-list-header').clientHeight
            },
            /**
             * Single employee values (for each form input
             */
            employeeUserId: {
                get: function () { return this.$store.state.editEmployeeData.userId },
                set (value) { this.$store.commit('updateEmployeeUserId', value) }
            },
            employeeId: {
                get: function() { return this.$store.state.editEmployeeData.id },
                set: function (value) { this.$store.commit('updateEmployeeId', value) }
            },
            employeeLastName: {
                get: function () { return this.$store.state.editEmployeeData.lastName },
                set: function (value) { this.$store.commit('updateEmployeeLastName', value) }
            },
            employeeFirstName: {
                get: function () { return this.$store.state.editEmployeeData.firstName },
                set: function (value) { this.$store.commit('updateEmployeeFirstName', value) }
            },
            employeePosition: {
                get: function () { return this.$store.state.editEmployeeData.position },
                set: function (value) { this.$store.commit('updateEmployeePosition', value) }
            },
            employeeEmail: {
                get: function () { return this.$store.state.editEmployeeData.email },
                set: function (value) { this.$store.commit('updateEmployeeEmail', value) }
            },
            employeeMobilePhone: {
                get: function () { return this.$store.state.editEmployeeData.mobilePhone },
                set: function (value) { this.$store.commit('updateEmployeeMobilePhone', value) }
            },
            employeeWorkPhone: {
                get: function () { return this.$store.state.editEmployeeData.workPhone },
                set: function (value) { this.$store.commit('updateEmployeeWorkPhone', value) }
            },
            employeeBuilding: {
                get: function () { return this.$store.state.editEmployeeData.building },
                set: function (value) { this.$store.commit('updateEmployeeBuilding', value) }
            },
            employeeFloor: {
                get: function () { return this.$store.state.editEmployeeData.floor },
                set: function (value) { this.$store.commit('updateEmployeeFloor', value) }
            },
            employeeRoom: {
                get: function () { return this.$store.state.editEmployeeData.roomNumber },
                set: function (value) { this.$store.commit('updateEmployeeRoom', value) }
            },
        }
    }
</script>
