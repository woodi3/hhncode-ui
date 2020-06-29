<template>
    <zen-box class="zen-accordion-content" ref="zenAccordionContent">
        <zen-box class="p-5">
            <slot></slot>
        </zen-box>
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
    overflow-y: auto;
    opacity: 0;
    height: 100%;
    max-height: 0;
    transition: max-height .5s ease-in-out;
}
.zen-accordion-content.open {
    max-height: 120px;
    opacity: 1;
}
</style>