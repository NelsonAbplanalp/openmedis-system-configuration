import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        contentHeight: 0,
        isEmployeeEditVisible: false,
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
        }
    },
    mutations: {
        setContentHeight (state, height) {
            state.contentHeight = height
        },
        setEmployeeEditVisibility (state, visibility) {
            state.isEmployeeEditVisible = visibility
        },
        /**
         * Employee edit values
         */
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
        }
    },
    actions: {
        setContentHeight ({ commit }, height) {
            commit('setContentHeight', height)
        },
        setEmployeeEditVisibility ({ commit }, visibility) {
            commit('setEmployeeEditVisibility', visibility)
        },
        /**
         * Employee edit values
         */
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
        }
    }
})
