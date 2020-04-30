<template>
    <zen-box :d="'flex'" 
        :mb="'1rem'"
        position="relative" 
        class="zen-input-group" 
        ref="zenInputGroup">
        <slot></slot>
    </zen-box>
</template>

<script>
import ZenBox from '../ZenBox'

export default {
    name: 'zen-input-group',
    components: {
        ZenBox,
    },
    props: {
        size: {
            type: String,
            default: 'md'
        }
    },
    mounted () {
        this.setPadding()
    },
    computed: {
        inputClass () {
            switch (this.size.toLowerCase()) {
                case `sm`:
                case `small`:
                    return `zen-input-sm`
                case `md`:
                case `medium`:
                    return `zen-input-md`
                case `lg`:
                case `large`:
                    return `zen-input-lg`
                default:
                    return `zen-input-md`
            }
        },
        fontSize () {
            switch (this.size.toLowerCase()) {
                case `sm`:
                case `small`:
                    return `font-sm`
                case `md`:
                case `medium`:
                    return `font-md`
                case `lg`:
                case `large`:
                    return `font-lg`
                default:
                    return `font-md`
            }
        },
        zenInputElementSize () {
            switch (this.size.toLowerCase()) {
                case `sm`:
                case `small`:
                    return `zen-input-element-sm`
                case `md`:
                case `medium`:
                    return `zen-input-element-md`
                case `lg`:
                case `large`:
                    return `zen-input-element-lg`
                default:
                    return `zen-input-element-md`
            }
        },
        zenInputPaddingX () {
            switch (this.size.toLowerCase()) {
                case `sm`:
                case `small`:
                    return `zen-input-element-sm`
                case `md`:
                case `medium`:
                    return `zen-input-element-md`
                case `lg`:
                case `large`:
                    return `zen-input-element-lg`
                default:
                    return `zen-input-element-md`
            }
        },
    },
    methods: {
        setInputPadding (position) {
            switch (this.size.toLowerCase()) {
                case `sm`:
                case `small`:
                    return `zen-input-element-${position}-sm`
                case `md`:
                case `medium`:
                    return `zen-input-element-${position}-md`
                case `lg`:
                case `large`:
                    return `zen-input-element-${position}-lg`
                default:
                    return `zen-input-element-${position}-md`
            }
        },
        setPadding () {
            // zen-box component
            const inputGroup = this.$refs.zenInputGroup

            // the children vue components
            const children = inputGroup.$children

            // get all the vue zen-input-elements
            const inputZenInputElements = children.filter(child => {
                const el = child.$el
                return el.classList.contains('zen-input-element')
            })

            // get the vue zen-input
            const inputVueElement = children.filter(child => {
                const el = child.$el
                return el.classList.contains('zen-input')
            })[0]

            // only set the padding if we have an input
            if (inputVueElement) {
                const inputEl = inputVueElement.$el
                
                // add the zen-input classes
                inputEl.classList.add(this.inputClass)
                inputEl.classList.add(this.fontSize)

                // for each zen-input-element
                // we need to add class to the zen-input element
                // and we need to add classes to the zen-input-element
                inputZenInputElements.forEach(child => {
                    const el = child.$el
                    if (el.classList.contains('zen-input-element-right')) {
                        inputEl.classList.add(this.setInputPadding('right'))
                    }
                    if (el.classList.contains('zen-input-element-left')) {
                        inputEl.classList.add(this.setInputPadding('left'))
                    }
                    el.classList.add(this.zenInputElementSize)
                    el.classList.add(this.fontSize)
                })
            }
            // TODO
            // log error or warn if no input element
        }
    }
}
</script>