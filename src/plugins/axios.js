import ax from 'axios'

const API_DOMAIN = process.env.VUE_APP_API_DOMAIN
const accessToken = localStorage.getItem("TOKEN")

const baseURL = `${API_DOMAIN}`;

export const axios = ax
axios.defaults.baseURL = `${baseURL}`
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'
axios.defaults.headers.common['Content-Type'] = 'application/json'

// axios.interceptors.response.use(undefined, (error) => {
//     if (error.response && error.response.status === 401) {
//         router.replace({
//             path: '/login',
//             query: { redirect: router.currentRoute.fullPath },
//         });
//     }
//     if (error.response && error.response.status === 403) {
//         router.back();
//     }
//     return Promise.reject(error);
// });



if (accessToken) {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + accessToken
}

export default {
    install (Vue) {
        Vue.prototype.$axios = axios
    }
}