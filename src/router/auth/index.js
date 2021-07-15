import {userGuard, guestGuard} from "../middleware/guards";
import Me from "../../components/pages/Auth/Me";
import Login from "../../components/pages/Auth/Login";

export default [
    {
        path: '/me',
        name: 'Me',
        component: Me,
        beforeEnter: userGuard
    },
    {
        path: '/login',
        name: 'Login',
        component: Login,
        beforeEnter: guestGuard
    },
]


