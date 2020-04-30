<template>
    <zen-box class="zen-accordion" ref="zenAccordion" @click.native="toggle">
        <slot></slot>
    </zen-box>
</template>

<script>
import ZenBox from '../ZenBox'

export default {
    name: 'zen-accordion',
    components: {
        ZenBox
    },
    data () {
        return {
            zenContentRef: null,
            zenHeaderRef: null,
            isOpen: false,
        }
    },
    methods: {
        toggle () {
            this.isOpen = !this.isOpen
            if (this.isOpen) {
                this.open()
            } else {
                this.close()
            }
        },
        /** Gets the header and content elements */
        getChildren () {
            const zenAccordion = this.$refs.zenAccordion
            let header, content 
            if (zenAccordion.$children.length > 0) {
                header = zenAccordion.$children.filter(child => child.$refs && child.$refs.zenAccordionHeader)[0]
                content = zenAccordion.$children.filter(child => child.$refs && child.$refs.zenAccordionContent)[0]
            }
            return {header, content}
        },
        /** Open the accordion */
        open () {
            const { content, header } = this.getChildren()
            if (content) {
                const contentEl = content.$el
                contentEl.classList.add('open')
            }
            if (header) {
                const headerEl = header.$el
                headerEl.classList.add('open')
            }
            this.$emit('open')
        },
        /** Close the accordion */
        close () {
            const { content, header } = this.getChildren()
            if (content) {
                const contentEl = content.$el
                contentEl.classList.remove('open')
            }
            if (header) {
                const headerEl = header.$el
                headerEl.classList.remove('open')
            }
            this.$emit('close')
        },
    },
}
</script>
<style scoped>
.zen-accordion {
    cursor: pointer;
    width: 100%;
    border: none;
    text-align: left;
    outline: none;
    font-size: var(--font-size);
    transition: height 0.4s;
}
</style>