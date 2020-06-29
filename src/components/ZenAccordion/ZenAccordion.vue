<template>
    <zen-box class="zen-accordion" ref="zenAccordion">
        <slot></slot>
    </zen-box>
</template>

<script>
import ZenBox from '../ZenBox'

export default {
    name: 'zen-accordion',
    props: {
        isOpen: {
            type: Boolean,
        },
        maxHeight: {
            type: String,
            default: "120px"
        }
    },
    components: {
        ZenBox
    },
    data () {
        return {
            zenContentRef: null,
            zenHeaderRef: null,
        }
    },
    watch: {
        isOpen (newVal) {
            if (newVal) {
                this.open()
            } else {
                this.close()
            }
        }
    },
    methods: {
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
                contentEl.style.maxHeight = this.maxHeight
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
                contentEl.style.maxHeight = '0px'
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
    width: 100%;
    border: 1px solid var(--gray-rgb-light);
    text-align: left;
    outline: none;
    font-size: var(--font-size);
}
</style>