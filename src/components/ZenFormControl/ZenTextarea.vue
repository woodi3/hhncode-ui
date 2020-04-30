<template>
    <textarea 
        class="zen-textarea"
        :aria-label="ariaLabel"
        :aria-describedby="ariaDescribedBy"
        :class="classes"
        :disabled="disabled"
        :id="customId"
        :aria-invalid="invalid"
        :name="name"
        :placeholder="placeholder"
        :required="required"
        :readonly="readonly"
        :ref="'zenTextarea'"
        :title="title"
        :type="type"
        :value="value"
        @input="updateInput()"></textarea>
</template>

<script>
import { injectClass } from '../../utils'
export default {
    name: 'zen-textarea',
    props: {
        ariaLabel: {
            type: String,
            default: ''
        },
        ariaDescribedBy: {
            type: String,
            default: ''
        },
        disabled: {
            type: Boolean
        },
        focusBorderColor: {
            type: String,
            default: 'primary'
        },
        id: {
            type: String,
        },
        invalid: {
            type: Boolean
        },
        name: {
            type: String,
            default: ''
        },
        placeholder: {
            type: String,
            default: ''
        },
        required: {
            type: Boolean
        },
        readonly: {
            type: Boolean
        },
        resize: {
            type: String,
            default: 'vertical'
        },
        size: {
            type: String,
            default: "md"
        },
        title: {
            type: String,
            default: ''
        },
        type: {
            type: String,
            default: "text",
        },
        value: {
            required: false
        },
    },
    data (){
        return {
            className: ''
        }
    },
    mounted () {
        this.className = injectClass(this.customStyles)
    },
    computed: {
        classes () {
            return [
                this.className,
                this.focusBorderColorClass
            ]
        },
        customId () {
           return this.id !== undefined ? this.id : `zen${this._uid}`
        },
        focusBorderColorClass () {
            switch (this.focusBorderColor.toLowerCase()) {
                case `accent`:
                    return `focus-border-color-accent`
                case `primary`:
                    return `focus-border-color-primary`
                default:
                    return `focus-border-color-primary`
            }
        },
        customStyles () {
            return {
                resize: this.resize
            }
        }
    },
    methods: {
        updateInput() {
            this.$emit('input', this.$refs.zenTextarea.value)
        }
    },
}
</script>
<style scoped>
.zen-textarea {
    width: 100%;
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    position: relative;
    -webkit-appearance: none;
    font-size: 0.875rem;
    padding-left: calc(var(--spacing-rem) * 3);
    padding-right: calc(var(--spacing-rem) * 3);
    height: 2rem;
    background-color: var(--white-color);
    padding-top: calc(var(--spacing-rem) * 2);
    padding-bottom: calc(var(--spacing-rem) * 2);
    min-height: 80px;
    line-height: 1.375;
    transition: all 0.2s ease 0s;
    outline: none;
    border-radius: var(--spacing-rem);
    border-width: 1px;
    border-style: solid;
    border-image: initial;
    border-color: var(--gray-lighter-color);
}
.zen-textarea[aria-invalid="true"] {
    border-width: 2px;
}
</style>