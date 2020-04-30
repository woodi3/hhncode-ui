<template>
    <button :id="id" 
    :class="classes"
    :style="customStyles"
    :disabled="disabled"
    :aria-label="ariaLabel" 
    @click="emitClick" 
    @keydown="emitKeyDown">
        <slot></slot>
    </button>
</template>

<script>
export default {
    name: 'zen-button',
    props: {
        color: {
            type: String,
            required: false,
            default: `primary`
        },
        size: {
            type: String,
            required: false,
            default: `medium`
        },
        disabled: {
            type: Boolean,
            required: false,
            default: false
        },
        isLoading: {
            type: Boolean,
            required: false,
            default: false
        },
        allowKeydown: {
            type: Boolean,
            required: false,
            default: false
        },
        margin: {
            type: Object,
            required: false,
            default () {
                return {
                    top: 0,
                    right: 0,
                    bottom: 0,
                    left: 0
                }
            }
        },
        ariaLabel: {
            type: String,
            required: false,
            default: 'A Zen button'
        }
    },
    data () {
        return {
            id: null
        }
    },
    mounted () {
        this.id = `zen${this._uid}`
    },
    computed: {
        btnColorClass () {
            switch (this.color.toLowerCase()) {
                case `primary`:
                    return `btn-primary`
                case `accent`:
                    return `btn-accent`
                case `plain`:
                    return `btn-plain`
                case `plain-primary`: 
                    return `btn-plain text-primary`
                case `plain-accent`:
                    return `btn-plain text-accent`
                case `plain-grey`:
                case `plain-gray`:
                    return `btn-plain text-gray`
                case `plain-black`:
                    return `btn-plain text-black`
                case `primary-outline`:
                case `outline-primary`:
                    return `btn-outline-primary`
                case `accent-outline`:
                case `outline-accent`:
                    return `btn-outline-accent`
                default:
                    return `btn-primary`
            }
        },
        btnSizeClass () {
            switch (this.size.toLowerCase()) {
                case `sm`:
                case `small`:
                    return `btn-sm`
                case `md`:
                case `medium`:
                    return `btn-md`
                case `lg`:
                case `large`:
                    return `btn-lg`
                case `block`:
                    return `btn-block`
                default:
                    return `btn-md`
            }
        },
        classes () {
            return [
                `zen-btn`,
                `zen-${this.btnSizeClass}`,
                `zen-${this.btnColorClass}`,
                this.btnDisabled ? `disabled` : ``
            ]
        },
        customStyles () {
            return {
                marginTop: this.margin.top ? this.margin.top : '0px',
                marginRight: this.margin.right ? this.margin.right : '0px',
                marginBottom: this.margin.bottom ? this.margin.bottom : '0px',
                marginLeft: this.margin.left ? this.margin.left : '0px',
            }
        }
    },
    methods: {
        emitClick () {
            this.$emit('click')
        },
        emitKeyDown (evt) {
            if (this.allowKeydown) {
                if (evt.code === 'Enter' || evt.code === 'Space'){
                    this.emitClick()
                }
            }
        }
    }
}
</script>

<style>
/* button classes */
.zen-btn {
    display: inline-flex;
    justify-content: center;
    font-weight: 400;
    text-align: center;
    white-space: nowrap;
    vertical-align: middle;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    border: 1px solid transparent;
    padding: .25rem .75rem;
    font-size: 1rem;
    line-height: 1.5;
    border-radius: .25rem;
    transition: color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;
}
.zen-btn:hover {
    text-decoration: none;
}
.zen-btn:focus {
    outline: none;
}
.zen-btn:not(:disabled):not(.disabled) {
    cursor: pointer;
}
.zen-btn.disabled, .zen-btn:disabled {
    opacity: .65;
}
.zen-btn-lg {
    padding: .5rem 1rem;
    font-size: 1.25rem;
    line-height: 1.5;
    border-radius: .25rem;
}
.zen-btn-sm {
    padding: .25rem .5rem;
    font-size: .75rem;
    line-height: 1.5;
    border-radius: .25rem;
}
.zen-btn-block {
    width: 100%;
}
.zen-btn-primary {
    color: #fff;
    background-color: var(--primary-color);
    border-color: var(--primary-color);
}
.zen-btn-primary:hover:not(:disabled):not(.disabled) {
    color: #fff;
    background-color: var(--primary-darker-color);
    border-color: var(--primary-darker-color);
}
.zen-btn-primary:focus:not(:disabled):not(.disabled) {
    box-shadow: 0 0 0 0.2rem var(--primary-rgb-light);
}
.zen-btn-outline-primary {
    color: var(--primary-color);
    background-color: transparent;
    background-image: none;
    border-color: var(--primary-color);
}
.zen-btn-outline-primary:hover:not(:disabled):not(.disabled) {
    color: #fff;
    background-color: var(--primary-color);
    border-color: var(--primary-color);
}
.zen-btn-outline-primary:focus:not(:disabled):not(.disabled) {
    box-shadow: 0 0 0 0.2rem var(--primary-rgb-light);
}
.zen-btn-outline-primary.disabled, .zen-btn-outline-primary:disabled {
    color: var(--primary-color);
    background-color: transparent;
}
.zen-btn-accent {
    color: #fff;
    background-color: var(--accent-color);
    border-color: var(--accent-color);
}
.zen-btn-accent:hover:not(:disabled):not(.disabled) {
    color: #fff;
    background-color: var(--accent-darker-color);
    border-color: var(--accent-darker-color);
}
.zen-btn-accent:focus:not(:disabled):not(.disabled) {
    box-shadow: 0 0 0 0.2rem var(--accent-rgb-light);
}
.zen-btn-outline-accent {
    color: var(--accent-color);
    background-color: transparent;
    background-image: none;
    border-color: var(--accent-color);
}
.zen-btn-outline-accent:hover:not(:disabled):not(.disabled) {
    color: #fff;
    background-color: var(--accent-color);
    border-color: var(--accent-color);
}
.zen-btn-outline-accent:focus:not(:disabled):not(.disabled) {
    box-shadow: 0 0 0 0.2rem var(--accent-rgb-light);
}
.zen-btn-outline-accent.disabled, .zen-btn-outline-accent:disabled {
    color: var(--accent-color);
    background-color: transparent;
}
.zen-btn-plain {
    font-weight: 400;
    font-size: inherit;
    color: var(--primary-color);
    background-color: transparent;
}
.zen-btn-plain:hover:not(:disabled):not(.disabled) {
    background-color: var(--primary-rgb-light);
}
.zen-btn-plain:focus:not(:disabled):not(.disabled) {
    box-shadow: 0 0 0 0.2rem var(--primary-rgb-light);
}
.zen-btn-plain.text-accent:hover:not(:disabled):not(.disabled) {
    background-color: var(--accent-rgb-light);
}
.zen-btn-plain.text-accent:focus:not(:disabled):not(.disabled) {
    box-shadow: 0 0 0 0.2rem var(--accent-rgb-light);
}
.zen-btn-plain.text-gray:hover:not(:disabled):not(.disabled) {
    background-color: var(--gray-lighter-color);
}
.zen-btn-plain.text-gray:focus:not(:disabled):not(.disabled) {
    box-shadow: 0 0 0 0.2rem var(--gray-rgb-light);
}
.zen-btn-plain.text-grey:hover:not(:disabled):not(.disabled) {
    background-color: var(--gray-lighter-color);
}
.zen-btn-plain.text-grey:focus:not(:disabled):not(.disabled) {
    box-shadow: 0 0 0 0.2rem var(--gray-rgb-light);
}
.zen-btn-plain.text-black:hover:not(:disabled):not(.disabled) {
    background-color: var(--gray-lighter-color);
}
.zen-btn-plain.text-black:focus:not(:disabled):not(.disabled) {
    box-shadow: 0 0 0 0.2rem var(--shadow-rgb);
}
</style>