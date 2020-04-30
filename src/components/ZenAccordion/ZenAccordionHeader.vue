<template>
    <zen-box class="zen-accordion-header" 
        ref="zenAccordionHeader"
        d="flex"
        justifyContent="space-between"
        alignItems="center">
        <slot></slot>
        <v-icon :icon="isOpen ? icons.open : icons.close"/>
    </zen-box>
</template>

<script>
import ZenBox from '../ZenBox'

export default {
    name: 'zen-accordion-header',
    components: {
        ZenBox
    },
    props: {
        isOpen: {
            type: Boolean
        },
        icons: {
            type: Object,
            required: false,
            default: () => ({
                open: ['fas', 'chevron-up'],
                close: ['fas', 'chevron-down']
            })
        }
    },
}
</script>
<style scoped>
.zen-accordion-header {
    padding: calc(var(--spacing-rem) * 5);
    border-bottom-style: solid;
    border-bottom-width: 1px;
    border-bottom-color: var(--gray-rgb-light);
}
.zen-accordion-header:hover {
    background-color: var(--gray-rgb-light);
}
.zen-accordion-header.open {
    border-bottom: none;
    background-color: var(--gray-rgb-light);
}
</style>