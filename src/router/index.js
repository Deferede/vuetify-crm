import Vue from 'vue'
import VueRouter from 'vue-router'
import {userGuard} from "./middleware/guards"
import Home from '../components/pages/Home'
// import Forbidden from "~/components/pages/Forbidden"
import auth from './auth'
import crm_routes from './modules/crm'

Vue.use(VueRouter)

const router = new VueRouter({
    routes: [
        ...auth,
        {
            path: '/',
            name: 'Home',
            component: Home,
            beforeEnter: userGuard
        },
        ...crm_routes,
        // {
        //     path: '/403',
        //     name: 'Forbidden',
        //     component: Forbidden,
        // },
        {
            path: '*',
            redirect: '/'
        }

    ],
    mode: 'history',
})

export default router
