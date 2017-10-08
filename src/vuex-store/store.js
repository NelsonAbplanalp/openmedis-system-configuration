import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        contentHeight: 0,
        isEmployeeEditVisible: false
    },
    mutations: {
        setContentHeight (state, height) {
            state.contentHeight = height
        },
        setEmployeeEditVisibility (state, visibility) {
            state.isEmployeeEditVisible = visibility
        }
    },
    actions: {
        setContentHeight ({ commit }, height) {
            commit('setContentHeight', height)
        },
        setEmployeeEditVisibility ({ commit }, visibility) {
            commit('setEmployeeEditVisibility', visibility)
        }
    }
})
