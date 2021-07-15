import {axios} from "../../../../plugins/axios";

const state = {
    items: [],
    item: {}
}

const mutations = {
    SET_ITEMS(state, payload) {
        state.items = payload
    },
    SET_ITEM(state, payload) {
        state.item = payload
    },
    REMOVE_ITEM(state, id) {
        state.items = state.items.filter(i => i.id !== id)
    }
}

const actions = {
    async loadItems({commit}, query = {}) {
        commit('meta/SET_LOADING', true, {root: true})
        try {
            let resp = await axios.get('/api/crm/countries', {params: query})
            commit('SET_ITEMS', resp.data.data)
            commit('meta/SET_LOADING', false, {root: true})
        } catch (err) {
            commit('meta/SET_ERROR', err.response.data, {root: true})
            commit('meta/SET_LOADING', false, {root: true})

            throw err
        }
    },
    async createItem({commit}, payload) {
        commit('meta/SET_LOADING', true, {root: true})
        try {
            let resp = await axios.post('/api/crm/countries', payload)
            commit('meta/SET_SUCCESS', resp.data, {root: true})
            commit('meta/SET_LOADING', false, {root: true})
        } catch (err) {
            commit('meta/SET_ERROR', err.response.data, {root: true})
            commit('meta/SET_LOADING', false, {root: true})

            throw err
        }
    },
    async updateItem({commit}, {id, payload = {}}) {
        commit('meta/SET_LOADING', true, {root: true})
        try {
            let resp = await axios.put(`/api/crm/countries/${id}`, payload)
            commit('meta/SET_SUCCESS', resp.data, {root: true})
            commit('meta/SET_LOADING', false, {root: true})
        } catch (err) {
            commit('meta/SET_ERROR', err.response.data, {root: true})
            commit('meta/SET_LOADING', false, {root: true})

            throw err
        }
    },
    async deleteItem({commit}, {id}) {
        commit('meta/SET_LOADING', true, {root: true})
        try {
            let resp = await axios.delete(`/api/crm/countries/${id}`)
            commit('REMOVE_ITEM', id)
            commit('meta/SET_SUCCESS', resp.data, {root: true})
            commit('meta/SET_LOADING', false, {root: true})
        } catch (err) {
            commit('meta/SET_ERROR', err.response.data, {root: true})
            commit('meta/SET_LOADING', false, {root: true})

            throw err
        }
    }
}

const getters = {
    items(state) {
        return state.items
    },
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters,
}
