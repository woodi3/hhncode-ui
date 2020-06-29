<template>
    <router-view />
</template>

<script>
import {HIDE_FOOTER_KEY} from '../store/nav'
export default {
    mounted () {
        this.$store.dispatch(HIDE_FOOTER_KEY, true)
        if (!this.isAuthenticated && this.currentRoute.name !== 'admin-login') {
            this.$router.replace({name: 'admin-login'})
        }
    },
    computed: {
        isAuthenticated () {
            return this.$store.state.isAuthenticated
        },
        currentRoute () {
            return this.$store.state.currentRoute
        },
    }
}
</script>