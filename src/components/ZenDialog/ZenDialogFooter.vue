<template>
    <footer class="zen-dialog-footer pt-4 pb-4 pl-6 pr-6">
        <slot></slot>
    </footer>
</template>

<script>
export default {
    name: `zen-dialog-footer`
}
</script>
<style scoped>
.zen-dialog-footer {
    display: flex;
    justify-content: flex-end;
}
</style>