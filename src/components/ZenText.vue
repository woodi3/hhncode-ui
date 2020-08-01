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
            default: ""
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
    methods: {
        getColor(key) {
            switch (key.toLowerCase()) {
                case `primary`:
                    return {
                        class: `text-primary`
                    }
                case `dark-primary`:
                    return {
                        class: `text-dark-primary`
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
                case `dark-gray`:
                case `dark-grey`:
                    return {
                        class: `text-dark-gray`
                    }
                case 'white':
                    return {
                        class: 'text-white'
                    }
                default:
                    return {
                        color: key === '' ? '' : `${key.toLowerCase()} !important`
                    }
            }
        }
    },
    computed: {
        textColor () {
            return this.getColor(this.color)
        },
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
            const textColor = this.textColor.color ? this.textColor : {}
            const fontSize = this.textFontSize.fontSize ? this.textFontSize : {}
            return {
                ...textColor,
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
                this.textColor.class ? this.textColor.class : '',
                this.textFontSize.class ? this.textFontSize.class : '',
                this.className,
                this.header.toLowerCase(),
            ]
        }
    }
}
</script>