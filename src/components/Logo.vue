<template>
    <zen-box class="logo" @click.native="goHome">
        <h2 class="text-center">HHnCode</h2>
    </zen-box>
</template>

<script>
export default {
    computed: {
        currentRoute () {
            return this.$store.state.currentRoute
        }
    },
    methods: {
        goHome () {
            if (this.currentRoute.path !== `/home`) {
                this.$router.push('/home')
            }
            
        }
    }
}
</script>

<style scoped>
.logo h2 {
    margin: 0;
}
.logo {
    cursor: pointer;
}
</style>