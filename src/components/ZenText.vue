<template>
    <p :class="classes">
        <slot></slot>
    </p>
</template>

<script>
import { injectClass } from '../utils'
export default {
    name: "zen-text",
    props: {
        fontSize: {
            type: String,
            default: "md"
        },
        color: {
            type: String,
            default: "black"
        },
        bold: {
            type: Boolean
        },
        italic: {
            type: Boolean
        }
    },
    data () {
        return {
            className: ''
        }
    },
    mounted () {
        this.className = injectClass(this.customStyles)
    },
    computed: {
        textColor () {
            switch (this.color.toLowerCase()) {
                case `primary`:
                    return {
                        class: `text-primary`
                    }
                case `accent`:
                    return {
                        class: `text-accent`
                    }
                case `danger`:
                    return {
                        class: `text-danger`
                    }
                case `gray`:
                case `grey`:
                    return {
                        class: `text-gray`
                    }
                default:
                    return {
                        color: this.color.toLowerCase()
                    }
            }
        },
        textFontSize () {
            switch (this.fontSize.toLowerCase()) {
                case `small`:
                case `sm`:
                    return {
                        class: `font-sm`
                    }
                case `medium`:
                case `md`:
                    return {
                        class: `font-md`
                    }
                case `large`:
                case `lg`:
                    return {
                        class: `font-lg`
                    }
                default:
                    return {
                        fontSize: this.fontSize.toLowerCase()
                    }
            }
        },
        customStyles () {
            const textColor = this.textColor.color ? this.textColor : {}
            const fontSize = this.textFontSize.fontSize ? this.textFontSize : {}
            return {
                ...textColor,
                ...fontSize,
                fontWeight: this.bold ? 'bold' : '',
                fontStyle: this.italic ? 'italic' : ''
            }
        },
        classes () {
            return [
                this.textColor.class ? this.textColor.class : '',
                this.textFontSize.class ? this.textFontSize.class : '',
                this.className
            ]
        }
    }
}
</script>