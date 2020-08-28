<template>
    <zen-flex class="nav fixed top-center uppercase" 
        align="center" 
        justify="center"
        direction="row"
        wrap="wrap">
        <zen-box f="0 0 100%" class="text-center">
            <logo text/>
        </zen-box>
        <zen-box mt="1rem" f="0 0 100%" d="flex" justifyContent="center">
            <template v-for="link in links">
                <nav-item v-if="showNavItem(link)"
                    :key="link.to" 
                    :label="link.label" 
                    :to="link.to"
                    :icon="link.icon"
                    :accent="link.accent" 
                    :active="isActive(link.to)"/>
            </template>
        </zen-box>
        <zen-box class="nav-actions" position="absolute" d="flex">
            <template v-for="link in endLinks">
                <nav-item v-if="showNavItem(link)"
                    :key="link.to" 
                    :label="link.label" 
                    :to="link.to"
                    :icon="link.icon"
                    :primary="link.primary" 
                    :active="isActive(link.to)"/>
            </template>
            <zen-button v-if="!isAuthenticated" 
                primary
                class="ml-1 mr-1" 
                :ariaLabel="isNewAccount ? 'Join us button' : 'Login button'"
                @click="pushAuthRoute">
                {{isNewAccount ? 'Login' : 'Join us'}}
            </zen-button>
            <zen-button class="ml-1 mr-1"
                ariaLabel="Search button" 
                :class="isActive('/search') ? 'text-black' : ''"
                @click="goToSearch">
                <span class="sr-only">Search</span>
                <v-icon :icon="['fas', 'search']" size="lg"/>
            </zen-button>
        </zen-box>
    </zen-flex>
</template>

<script>
import NavItem from './NavItem'
import Logo from './Logo'

export default {
    components: {
        NavItem,
        Logo,
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
    /* height: 84px; */
    z-index: 2;
    position: relative;
}
.nav .logo {
    margin-right: auto;
}
.nav > .nav-actions {
    right: calc(var(--spacing-rem) * 4);
    bottom: calc(var(--spacing-rem) * 8);
}
</style>