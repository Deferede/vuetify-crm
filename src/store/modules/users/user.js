import {axios} from "../../../plugins/axios";
import User from "../../../entities/User";


const state = {
    authUser: new User({})
}

const mutations = {
    SET_AUTH_USER(state, User) {
        state.authUser = User
    }
}

const actions = {
    async loadAuthUser({commit}) {
        commit('meta/SET_LOADING', true, {root: true})
        try {
            let resp = await axios.get('/api/profile/me')
            commit('SET_AUTH_USER', new User(resp.data.data))
            commit('meta/SET_LOADING', false, {root: true})
        } catch (err) {
            commit('meta/SET_ERROR', err.response.data, {root: true})
            commit('meta/SET_LOADING', false, {root: true})

            throw err
        }
    },
    async loginUser({commit}, user) {
        commit('meta/SET_LOADING', true, {root: true})

        try {
            let resp = await axios.post('/api/auth/login', user)
            let token = resp.data.data.token
            localStorage.setItem("TOKEN", token)
            axios.defaults.headers.common['Authorization'] = 'bearer ' + token

            commit('meta/SET_LOADING', false, {root: true})
            this.dispatch('loadCurrentUser')
        } catch (err) {
            commit('meta/SET_ERROR', err.response.data, {root: true})
            commit('meta/SET_LOADING', false, {root: true})
            throw err
        }
    },
    logout({commit}) {
        return axios.post('/api/auth/logout')
            .then(() => {
                localStorage.removeItem("TOKEN")
                axios.defaults.headers.common['Authorization'] = ''
                commit('SET_AUTH_USER', new User({}))
            })
            .catch(err => {
                commit('meta/SET_ERROR', err.response.data, {root: true})
                commit('meta/SET_LOADING', false, {root: true})
                throw err
            })

    }
}

const getters = {
    authUser(state) {
        return state.authUser
    },
    hasRole: (state) => (roles) => {
        return roles.includes(state.authUser.role) || roles.includes('any')
    },
    hasPermission: (state) => (permissions) => {
        if (Array.isArray(permissions)) {
            return permissions.some(p => state.authUser.permissions.includes(p))
        }
        return state.authUser.permissions.includes(permissions)
    },
    sideMenus() {
        return [
            {title: 'Home', icon: 'mdi-home', roles: ['any'], url: '/'},
            {
                title: 'Admin', icon: 'mdi-view-dashboard', group: 'admin', roles: ['admin'], sub_menu: [
                    {
                        title: 'Settings',
                        icon: 'mdi-view-dashboard',
                        group: 'settings',
                        roles: ['admin'],
                        sub_sub_menu: [
                            {
                                title: 'Currencies',
                                icon: 'mdi-label-outline',
                                roles: ['admin'],
                                url: '/admin/settings/currencies'
                            },
                            {
                                title: 'Countries',
                                icon: 'mdi-label-outline',
                                roles: ['admin'],
                                url: '/admin/settings/countries'
                            },
                            {
                                title: 'Products',
                                icon: 'mdi-label-outline',
                                roles: ['admin'],
                                url: '/admin/settings/products'
                            },
                            {
                                title: 'Offers',
                                icon: 'mdi-label-outline',
                                roles: ['admin'],
                                url: '/admin/settings/offers'
                            },
                        ]
                    },
                ]
            },
            // {title: 'Сегодня', icon: 'mdi-calendar-today',roles:['any'], url: '/schedule'},
            // {title: 'Заметки', icon: 'mdi-square-edit-outline',roles:['any'], url: '/notes'},
            // {title: 'Отчет', icon: 'mdi-flag-outline',roles:['any'], url: '/report'},
            // {title: 'Профиль', icon: 'mdi-account', roles: ['any'], url: '/me'},
        ]
    },
    topMenus() {
        return [
            {title: 'Profile', icon: 'mdi-account', roles: ['any'], url: '/me'},
        ]
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters,
}
