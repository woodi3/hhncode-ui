<template>
    <div class="zen-drawer-nav" :class="classes">
        <slot></slot>
    </div>
</template>

<script>
export default {
    name: 'zen-drawer-nav',
    props: {
        noScroll: {
            type: Boolean
        }
    },
    computed: {
        classes () {
            return [
                this.noScroll ? `no-scroll` : ''
            ]
        }
    }
}
</script>
<style scoped>
.zen-drawer-nav {
    height: 100%;
    width: 0;
    position: fixed;
    z-index: 1;
    top: 0;
    background-color: var(--white-color);
    border-color: var(--gray-lighter-color);
    overflow-x: hidden;
    transition: 0.5s;
    padding-top: 60px;
}
.zen-drawer-nav.left {
    border-width: 0 1px 0 0;
    border-style: solid;
    left: 0;
}
.zen-drawer-nav.right {
    border-width: 0 0 0 1px;
    border-style: solid;
    right: 0;
}
.zen-drawer-nav.no-scroll {
    overflow: hidden;
    overflow-y: hidden;
}
</style>