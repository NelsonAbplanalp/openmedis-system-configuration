import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        /** @type {String} */
        API_URL: 'https://openmedis-api-url/example',
        /** @type {Object} */
        userInformation: {
            userName: '',
            apiToken: ''
        },
        /** @type {number} */
        contentHeight: 0,
        /** @type {Object} */
        allEmployeesData: {},
        /** @type {boolean} */
        isEmployeeEditVisible: false,
        /** @type {Object} */
        editEmployeeData: {
            userId: '',
            id: '',
            lastName: '',
            firstName: '',
            position: '',
            email: '',
            mobilePhone: '',
            workPhone: '',
            building: '',
            floor: '',
            roomNumber: ''
        },
        /** @type {number} */
        employeeIndex: 0,
        /** @type {Object} */
        initialEmployeeData: {}
    },
    mutations: {
        /**
         * @param state
         * @param data
         */
        setAllEmployeesData (state, data) {
            state.allEmployeesData = data
        },
        /**
         * @param state
         */
        setDataInAllEmployeesDataByIndex (state) {
            state.allEmployeesData[state.employeeIndex] = {
                "id": state.editEmployeeData.id,
                "firstName": state.editEmployeeData.firstName,
                "lastName": state.editEmployeeData.lastName,
                "userId": state.editEmployeeData.userId,
                "position": state.editEmployeeData.position,
                "building": state.editEmployeeData.building,
                "floor": state.editEmployeeData.floor,
                "email": state.editEmployeeData.email,
                "mobilePhone": state.editEmployeeData.mobilePhone,
                "roomNumber": state.editEmployeeData.roomNumber,
                "workPhone": state.editEmployeeData.workPhone
            }
        },
        /**
         * @param state
         * @param height
         */
        setContentHeight (state, height) {
            state.contentHeight = height
        },
        /**
         * @param state
         * @param visibility
         */
        setEmployeeEditVisibility (state, visibility) {
            state.isEmployeeEditVisible = visibility
        },
        /**
         * Employee edit values
         */
        updateEditEmployeeData (state, employeeData) {
            state.editEmployeeData.userId = employeeData.userId
            state.editEmployeeData.id = employeeData.id
            state.editEmployeeData.lastName = employeeData.lastName
            state.editEmployeeData.firstName = employeeData.firstName
            state.editEmployeeData.position = employeeData.position
            state.editEmployeeData.email = employeeData.email
            state.editEmployeeData.mobilePhone = employeeData.mobilePhone
            state.editEmployeeData.workPhone = employeeData.workPhone
            state.editEmployeeData.building = employeeData.building
            state.editEmployeeData.floor = employeeData.floor
            state.editEmployeeData.roomNumber = employeeData.roomNumber
        },
        resetEditEmployeeData (state) {
            state.editEmployeeData.userId = ''
            state.editEmployeeData.id = ''
            state.editEmployeeData.lastName = ''
            state.editEmployeeData.firstName = ''
            state.editEmployeeData.position = ''
            state.editEmployeeData.email = ''
            state.editEmployeeData.mobilePhone = ''
            state.editEmployeeData.workPhone = ''
            state.editEmployeeData.building = ''
            state.editEmployeeData.floor = ''
            state.editEmployeeData.roomNumber = ''
        },
        updateEmployeeUserId (state, value) {
            state.editEmployeeData.userId = value
        },
        updateEmployeeId (state, value) {
            state.editEmployeeData.id = value
        },
        updateEmployeeLastName (state, value) {
            state.editEmployeeData.lastName = value
        },
        updateEmployeeFirstName (state, value) {
            state.editEmployeeData.firstName = value
        },
        updateEmployeePosition (state, value) {
            state.editEmployeeData.position = value
        },
        updateEmployeeEmail (state, value) {
            state.editEmployeeData.email = value
        },
        updateEmployeeMobilePhone (state, value) {
            state.editEmployeeData.mobilePhone = value
        },
        updateEmployeeWorkPhone (state, value) {
            state.editEmployeeData.workPhone = value
        },
        updateEmployeeBuilding (state, value) {
            state.editEmployeeData.building = value
        },
        updateEmployeeFloor (state, value) {
            state.editEmployeeData.floor = value
        },
        updateEmployeeRoom (state, value) {
            state.editEmployeeData.roomNumber = value
        },
        setEmployeeIndex (state, index) {
            state.employeeIndex = index
        },
        setInitialEmployeeData (state, employeeData) {
            state.initialEmployeeData = employeeData
        }
    },
    actions: {
        // Manage employees
        setAllEmployeesData ({ commit }, data) {
            commit('setAllEmployeesData', data)
        },
        setDataInAllEmployeesDataByIndex ({ commit }) {
            commit('setDataInAllEmployeesDataByIndex')
        },
        setContentHeight ({ commit }, height) {
            commit('setContentHeight', height)
        },
        setEmployeeEditVisibility ({ commit }, visibility) {
            commit('setEmployeeEditVisibility', visibility)
        },
        // Employee edit values
        updateEditEmployeeData ({ commit}, employeeData) {
            commit('updateEditEmployeeData', employeeData)
        },
        resetEditEmployeeData ({ commit }) {
            commit('updateEditEmployeeData')
        },
        updateEmployeeUserId ({ commit }, value) {
            commit('updateEmployeeUserId', value)
        },
        updateEmployeeId ({ commit }, value) {
            commit('updateEmployeeId', value)
        },
        updateEmployeeLastName ({ commit }, value) {
            commit('updateEmployeeLastName', value)
        },
        updateEmployeeFirstName ({ commit }, value) {
            commit('updateEmployeeFirstName', value)
        },
        updateEmployeePosition ({ commit }, value) {
            commit('updateEmployeePosition', value)
        },
        updateEmployeeEmail ({ commit }, value) {
            commit('updateEmployeeEmail', value)
        },
        updateEmployeeMobilePhone ({ commit }, value) {
            commit('updateEmployeeMobilePhone', value)
        },
        updateEmployeeWorkPhone ({ commit }, value) {
            commit('updateEmployeeWorkPhone', value)
        },
        updateEmployeeBuilding ({ commit }, value) {
            commit('updateEmployeeBuilding', value)
        },
        updateEmployeeFloor ({ commit }, value) {
            commit('updateEmployeeFloor', value)
        },
        updateEmployeeRoom ({ commit }, value) {
            commit('updateEmployeeRoom', value)
        },
        // Employee information data
        setEmployeeIndex ({ commit }, index) {
            commit('setEmployeeIndex', index)
        },
        setInitialEmployeeData ({ commit }, employeeData) {
            commit('setInitialEmployeeData', employeeData)
        }
    }
})
