<template>
    <zen-flex class="nav fixed top-center uppercase bg-white" align="center" direction="row">
        <logo class="logo"/>
        <template v-for="link in links">
            <nav-item v-if="showNavItem(link)"
                :key="link.to" 
                :label="link.label" 
                :to="link.to"
                :icon="link.icon"
                :accent="link.accent" 
                :active="isActive(link.to)"/>
        </template>
        <zen-button class="ml-1 mr-1" 
            color="plain-primary" 
            aria-label="Search button"
            @click="goToSearch">
            <span class="sr-only">Search</span>
            <v-icon :icon="['fas', 'search']" size="lg"/>
        </zen-button>
        <template v-for="link in endLinks">
            <nav-item v-if="showNavItem(link)"
                :key="link.to" 
                :label="link.label" 
                :to="link.to"
                :icon="link.icon"
                :accent="link.accent" 
                :active="isActive(link.to)"/>
        </template>
        <zen-button v-if="!isAuthenticated" 
            color="accent"
            class="ml-1 mr-1" 
            :ariaLabel="isNewAccount ? 'Join us button' : 'Login button'"
            @click="pushAuthRoute">
            {{isNewAccount ? 'Login' : 'Join us'}}
        </zen-button>
    </zen-flex>
</template>

<script>
import Logo from './Logo'
import NavItem from './NavItem'

export default {
    components: {
        Logo,
        NavItem,
    },
    computed: {
        currentRoute () {
            return this.$store.state.currentRoute
        },
        isAuthenticated () {
            return this.$store.state.isAuthenticated
        },
        links () {
            return this.$store.state.links.filter(links => !links.end)
        },
        endLinks () {
            return this.$store.state.links.filter(links => links.end)
        },
        isNewAccount () {
            return this.currentRoute.name === 'new-account'
        },
    },
    methods: {
        isActive (route) {
            return this.currentRoute && this.currentRoute.path === route
        },
        showNavItem (navItem) {
            if (navItem.authCheck) {
                return this.isAuthenticated
            }
            return true
        },
        pushAuthRoute () {
            if (this.isNewAccount) {
                this.$router.push({name: 'login'})
            }
            else {
                this.$router.push({name: 'new-account'})
            }
        },
        goToSearch () {
            this.$router.push({name: 'search'})
        }
    },
}
</script>

<style scoped>
.nav {
    padding-top: calc(var(--spacing-rem) * 8);
    padding-bottom: calc(var(--spacing-rem) * 8);
    width: 100%;
    padding-left: calc(var(--spacing-rem) * 4);
    padding-right: calc(var(--spacing-rem) * 4);
    height: 84px;
    z-index: 2;
}
.nav .logo {
    margin-right: auto;
}
</style>