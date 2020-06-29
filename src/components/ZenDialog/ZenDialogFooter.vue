<template>
    <footer class="zen-dialog-footer pt-4 pb-4 pl-6 pr-6 bg-white"
        :class="[position]">
        <slot></slot>
    </footer>
</template>

<script>
export default {
    name: `zen-dialog-footer`,
    props: {
        position: {
            type: String,
            default: "fixed"
        }
    }
}
</script>
<style scoped>
.zen-dialog-footer {
    display: flex;
    justify-content: flex-end;
    bottom: 0;
    width: 100%;
}
</style>