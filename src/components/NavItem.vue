<template>
    <zen-link class="nav-item ml-1 mr-1" 
        :class="{active: active, primary: !accent, accent: accent, 'text-primary': !accent, 'text-accent': accent}" 
        :to="to" 
        @click="linkClicked">
        <span v-if="icon">
            <v-icon :icon="icon" size="lg"/>
            <span class="sr-only">{{label}}</span>
        </span>
        <span class="label" v-else-if="label">
            {{label}}
        </span>
        <span v-else>
            <slot></slot>
        </span>
    </zen-link>
</template>

<script>

export default {
    props: {
        label: {
            type: String
        },
        to: {
            type: String,
            required: true
        },
        active: {
            type: Boolean
        },
        icon: {
            type: Array,
        },
        accent: {
            type: Boolean,
        },
    },
    methods: {
        linkClicked () {
            this.$emit('click')
        }
    }
}
</script>

<style scoped>
.nav-item {
    padding: .5rem 3rem;
    font-weight: bold;
}
.nav-item .label {
    letter-spacing: 1px;
}
.nav-item.primary:hover, .nav-item.active.primary {
    background-color: var(--primary-super-light);
}
.nav-item.accent:hover, .nav-item.active.accent {
    background-color: var(--accent-rgb-light);
}
</style>