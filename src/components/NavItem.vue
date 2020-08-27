<template>
    <zen-link class="nav-item ml-1 mr-1" 
        :class="{active: active, 'text-primary': primary}" 
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
        primary: {
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
.nav-item:hover, .nav-item.active {
    border-bottom-color: var(--color-4);
    border-bottom-style: solid;
    border-bottom-width: 2px;
    color: var(--color-4);
}
.nav-item.text-primary:hover, .nav-item.text-primary.active {
    border-bottom-color: var(--primary);
}
</style>