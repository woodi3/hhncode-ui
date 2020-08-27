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
        bold: {
            type: Boolean
        },
        italic: {
            type: Boolean
        },
        align: {
            type: String
        },
        header: {
            type: String,
            default: '',
        },
        transform: {
            type: String,
            default: '',
        },
        letterSpacing: {
            type: String,
            default: '',
        },
        lineHeight: {
            type: String,
            default: '',
        },
        // hoverColor: {
        //     type: String,
        //     default: ''
        // },
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
        // textHoverColor () {
        //     return this.getColor(this.hoverColor)
        // },
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
            const fontSize = this.textFontSize.fontSize ? this.textFontSize : {}
            return {
                ...fontSize,
                fontWeight: this.bold ? 'bold' : '',
                fontStyle: this.italic ? 'italic' : '',
                textAlign: this.align ? this.align : '',
                textTransform: this.transform,
                letterSpacing: this.letterSpacing,
                lineHeight: this.lineHeight,
            }
        },
        classes () {
            return [
                'zen-text',
                this.textFontSize.class ? this.textFontSize.class : '',
                this.className,
                this.header.toLowerCase(),
            ]
        }
    }
}
</script>