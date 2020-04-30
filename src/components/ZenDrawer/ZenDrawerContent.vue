<template>
    <div class="zen-drawer-content">
        <slot></slot>
    </div>
</template>

<script>
export default {
    name: 'zen-drawer-content',
}
</script>

<style scoped>
.zen-drawer-content {
    transition: .5s;
    padding: calc(var(--spacing-rem) * 4);
}
</style>