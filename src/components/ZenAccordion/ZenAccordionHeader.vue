<template>
    <zen-box class="zen-accordion-header" 
        ref="zenAccordionHeader"
        d="flex"
        justifyContent="space-between"
        alignItems="center"
        @click.native="toggle">
        <slot></slot>
        <v-icon class="text-primary" :icon="isOpen ? icons.open : icons.close"/>
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
        icons: {
            type: Object,
            required: false,
            default: () => ({
                open: ['fas', 'chevron-up'],
                close: ['fas', 'chevron-down']
            })
        }
    },
    data () {
        return {
            isOpen: false,
        }
    },
    methods: {
        toggle () {
            this.isOpen = !this.isOpen
            if (this.isOpen) {
                this.$emit('open')
            } else {
                this.$emit('close')
            }
        },
    }
}
</script>
<style scoped>
.zen-accordion-header {
    cursor: pointer;
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