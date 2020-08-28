<template>
    <router-link :class="classes" :to="to" @click.native="linkClicked">
        <slot></slot>
    </router-link>
</template>

<script>
import { injectClass } from '../utils'
export default {
    name: 'zen-link',
    props: {
        to: {
            type: String,
            required: true
        },
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
        primary: {
            type: Boolean
        },
        accent: {
            type: Boolean
        },
        light: {
            type: Boolean
        },
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
            if (this.primary) {
                return 'link-primary'
            } else if (this.accent) {
                return 'link-accent'
            } else if (this.light) {
                return 'link-default light'
            }
            return 'link-default'
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
            const fontSize = this.textFontSize.fontSize ? this.textFontSize : {}
            return {
                ...fontSize,
                fontWeight: this.bold ? 'bold' : '',
                fontStyle: this.italic ? 'italic' : ''
            }
        },
        classes () {
            return [
                this.textColor,
                this.textFontSize.class ? this.textFontSize.class : '',
                this.className,
                'zen-link'
            ]
        }
    },
    methods: {
        linkClicked () {
            this.$emit('click')
        }
    }
}
</script>

<style scoped>
.zen-link {
    text-decoration: none;
    display: block;
    text-align: center;
}
.zen-link:focus {
    /* outline-color: var(--primary-color); */
    outline-color: var(--color-3);
}
.link-default {
    color: var(--color-3);
}
.link-default.light {
    color: var(--color-1);
}
.link-primary {
    color: var(--primary);
}
.link-accent {
    color: var(--accent);
}
</style>