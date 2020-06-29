<template>
    <zen-flex direction="column" align="center">
        <zen-box class="close-btn">
          <zen-button color="plain-danger" @click="close">
            <span class="sr-only">Close</span>  
            <v-icon :icon="['fas', 'times']" />
          </zen-button>
        </zen-box>
        <template v-for="link in links">
            <nav-item class="nav-item"
                v-if="showNavItem(link)"
                :key="link.to" 
                :label="link.label" 
                :to="link.to" 
                :active="isActive(link.to)" 
                @click="navigate" />
        </template>
        <zen-button v-if="!hideActionButton"
            class="ml-1 mr-1 mt-3"
            color="accent" 
            ariaLabel="Join us button" 
            @click="triggerAction">
            {{actionButtonText}}
        </zen-button>
    </zen-flex>
</template>

<script>
import NavItem from './NavItem'

export default {
    components: {
        NavItem,
    },
    props: {
        links: {
            type: Array,
            required: true,
        },
        isAuthenticated: {
            type: Boolean
        },
        currentRoute: {
            type: Object,
            required: true
        },
        actionButtonText: {
            type: String,
            required: true
        },
        hideActionButton: {
            type: Boolean
        }
    },
    methods: {
        close () {
            this.$emit('close')
        },
        navigate () {
            this.$emit('navigate')
        },
        isActive (route) {
            return this.currentRoute && this.currentRoute.path === route
        },
        showNavItem (navItem) {
            if (navItem.authCheck) {
                return this.isAuthenticated
            }
            return true
        },
        triggerAction (evt) {
            this.$emit('actionClicked', evt)
        }
    }
}
</script>
<style scoped>
.close-btn {
  position: absolute;
  top: calc(var(--spacing-rem) * 4);
  right: calc(var(--spacing-rem) * 4);
}
.nav-item {
    margin-top: var(--spacing-rem);
    margin-bottom: var(--spacing-rem);
}
</style>