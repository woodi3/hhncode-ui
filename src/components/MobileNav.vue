<template>
    <zen-flex align="center" wrap="wrap" class="container mt-3 pb-3">
        <zen-box f="0 0 25%">
            <zen-button color="plain" @click="toggleNav">
                <span class="sr-only">Menu</span>
                <v-icon :icon="['fas', 'bars']" />
            </zen-button>
        </zen-box>
        <zen-box f="0 0 50%" d="flex" justifyContent="center">
            <logo class="logo" width="135px" height="89.25px"/>
        </zen-box>
        <zen-box f="0 0 25%" class="search-container">
            <zen-button v-if="!hideSearch"
                class="ml-1 mr-1" 
                color="plain-primary" 
                aria-label="Search button"
                @click="searchClicked">
                <span class="sr-only">Search</span>
                <v-icon :icon="['fas', 'search']" size="lg"/>
            </zen-button>
        </zen-box>
    </zen-flex>
</template>

<script>
import Logo from './Logo'

export default {
    components: {
        Logo
    },
    props: {
        hideSearch: {
            type: Boolean
        }
    },
    methods: {
        toggleNav () {
            this.$emit('toggle')
        },
        searchClicked () {
            this.$emit('searchClicked')
        }
    }
}
</script>

<style scoped>
.logo {
  overflow-x: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.search-container {
  text-align: right;
}
</style>