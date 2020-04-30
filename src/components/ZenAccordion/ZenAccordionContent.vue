<template>
    <zen-box class="zen-accordion-content" ref="zenAccordionContent">
        <slot></slot>
    </zen-box>
</template>

<script>
import ZenBox from '../ZenBox'

export default {
    name: 'zen-accordion-content',
    components: {
        ZenBox
    },
}
</script>
<style scoped>
.zen-accordion-content {
    background-color: white;
    /* overflow: hidden; */
    overflow-y: auto;
    opacity: 0;
    height: 0;
    transition: height .3s;
}
.zen-accordion-content.open {
    padding: calc(var(--spacing-rem) * 5);
    height: 120px;
    opacity: 1;
}
</style>