import Vue from 'vue'
import Vuex from 'vuex'
import user from '../store/modules/users/user'
import meta from "./modules/meta/meta";
import currencies from './modules/crm/currencies'
import countries from './modules/crm/countries'
import products from './modules/crm/products'
import offers from './modules/crm/offers'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    user,
    meta,
    currencies,
    countries,
    products,
    offers,
  }
})
