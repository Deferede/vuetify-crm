<template>
  <v-app>
    <nav-bars v-if="!hasRole('guest')"></nav-bars>

    <transition name="fade">
      <v-main>

        <router-view></router-view>

      </v-main>
    </transition>
    <v-overlay :value="loading">

    </v-overlay>
    <snackbar v-if="!hasRole('guest')" />
  </v-app>
</template>

<style lang="scss">

</style>

<script>
  import NavBars from "./NavBars"
  import Snackbar from "./Snackbar"
  import {mapGetters} from 'vuex'

  export default {
    components: {
      NavBars,
      Snackbar
    },
    computed: {
      ...mapGetters({
        loading: 'meta/loading',
        hasRole: 'user/hasRole'
      })
    }
  }
</script>
