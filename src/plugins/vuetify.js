import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';
import '@mdi/font/css/materialdesignicons.min.css'

const opts = {
    icons: {
        iconfont: 'mdi', // default - only for display purposes
    },
    theme: {
        dark: localStorage.getItem('app-theme')
    },
}

Vue.use(Vuetify);

export default new Vuetify(opts);
