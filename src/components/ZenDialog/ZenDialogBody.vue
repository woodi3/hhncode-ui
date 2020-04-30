<template>
    <zen-box class="zen-dialog-body" pl="1.5rem" pr="1.5rem" pt=".5rem" pb=".5rem">
        <slot></slot>
    </zen-box>
</template>

<script>
import ZenBox from '../ZenBox'
export default {
    name: `zen-dialog-body`,
    components: {
        ZenBox
    }
}
</script>
<style scoped>
.zen-dialog-body {
    overflow-y: auto;
}
</style>